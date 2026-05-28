const PROJECT_ID = 'ursggy12'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const SANITY_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`

// Import image URL builder
import imageUrlBuilder from '@sanity/image-url'

// Create image URL builder
const builder = imageUrlBuilder({
    projectId: PROJECT_ID,
    dataset: DATASET,
})

const cache = new Map()
const inflight = new Map()
const imageUrlCache = new Map()
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

function getCachedData(key, fetchFunction) {
    if (typeof window === 'undefined') {
        return fetchFunction()
    }

    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return Promise.resolve(cached.data)
    }

    try {
        const stored = localStorage.getItem(`sanity-${key}`)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                cache.set(key, parsed)
                return Promise.resolve(parsed.data)
            }
        }
    } catch (error) {
        // localStorage not available, continue with API call
    }

    if (inflight.has(key)) {
        return inflight.get(key)
    }

    const promise = fetchFunction().then(data => {
        const cacheData = { data, timestamp: Date.now() }
        cache.set(key, cacheData)
        try {
            localStorage.setItem(`sanity-${key}`, JSON.stringify(cacheData))
        } catch (error) {
            // localStorage full or unavailable, continue
        }
        return data
    }).finally(() => {
        inflight.delete(key)
    })

    inflight.set(key, promise)
    return promise
}

// Image URLs are deterministic from the asset _ref, so an in-memory map is enough —
// no TTL, no localStorage. Builder calls are pure URL string construction (no API hit).
function getCachedImageUrl(imageRef) {
    if (!imageRef || !imageRef.asset || !imageRef.asset._ref) {
        return '/CINEK FILM LOGO.png'
    }
    const cacheKey = imageRef.asset._ref
    let url = imageUrlCache.get(cacheKey)
    if (!url) {
        url = builder.image(imageRef).url()
        imageUrlCache.set(cacheKey, url)
    }
    return url
}

// Fetch data from Sanity
async function fetchFromSanity(query, params = {}) {
    let url = new URL(SANITY_URL)

    url.searchParams.set('query', query)
    Object.keys(params).forEach(key => {
        url.searchParams.set(`$${key}`, JSON.stringify(params[key]))
    })

    const response = await fetch(url.toString())
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Sanity API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    return result.result
}

// Get all categories
export async function getCategories() {
    return getCachedData('categories', () =>
        fetchFromSanity(`
      *[_type == "category"] {
        _id,
        name,
        slug
      } | order(name asc)
    `)
    )
}

// Get ordered categories from registry
export async function getOrderedCategories() {
    return getCachedData('ordered-categories', async () => {
        // First, get the active category registry
        const registry = await fetchFromSanity(`
            *[_type == "categoryRegistry" && isActive == true][0] {
                orderedCategories[]-> {
                    _id,
                    name,
                    slug
                }
            }
        `)
        
        if (registry && registry.orderedCategories) {
            return registry.orderedCategories
        }
        
        // Fallback to regular categories if no registry is found
        return getCategories()
    })
}

// Get all films
export async function getFilms() {
    return getCachedData('films', () =>
        fetchFromSanity(`
      *[_type == "film"] {
        _id,
        title,
        date,
        poster,
        categories[]-> {
          _id,
          name,
          slug
        },
        href,
        description
      } | order(date desc)
    `)
    )
}

// Get films by category
export async function getFilmsByCategory(categorySlug) {
    return getCachedData(`films-${categorySlug}`, () =>
        fetchFromSanity(`
      *[_type == "film" && $categorySlug in categories[]->slug.current] {
        _id,
        title,
        date,
        poster,
        categories[]-> {
          _id,
          name,
          slug
        },
        href,
        description
      } | order(date desc)
    `, { categorySlug })
    )
}

// Get Top 10 list (ordered films)
export async function getTopTen() {
    return getCachedData('top-ten', () =>
        fetchFromSanity(`
      *[_type == "topTen" && isActive == true][0] {
        _id,
        title,
        "films": films[]-> {
          _id,
          title,
          date,
          poster,
          categories[]-> {
            _id,
            name,
            slug
          },
          href,
          description
        }
      }
    `)
    )
}

// Get hero images
export async function getHeroImages() {
    return getCachedData('hero-images', () =>
        fetchFromSanity(`
      *[_type == "hero" && isActive == true] | order(order asc) {
        _id,
        title,
        image,
        order
      }
    `)
    )
}

// Get all categories with their films in one query
export async function getCategoriesWithFilms() {
    return getCachedData('categories-with-films', async () => {
        // First, get the active category registry
        const registry = await fetchFromSanity(`
            *[_type == "categoryRegistry" && isActive == true][0] {
                orderedCategories[]-> {
                    _id,
                    name,
                    slug,
                    "films": *[_type == "film" && references(^._id)] {
                        _id,
                        title,
                        date,
                        poster,
                        categories[]-> {
                            _id,
                            name,
                            slug
                        },
                        href,
                        description
                    } | order(date desc)
                }
            }
        `)
        
        if (registry && registry.orderedCategories) {
            return registry.orderedCategories
        }
        
        // Fallback to regular categories if no registry is found
        return fetchFromSanity(`
            *[_type == "category"] {
                _id,
                name,
                slug,
                "films": *[_type == "film" && references(^._id)] {
                    _id,
                    title,
                    date,
                    poster,
                    categories[]-> {
                        _id,
                        name,
                        slug
                    },
                    href
                } | order(date desc)
            } | order(name asc)
        `)
    })
}

// Get all homepage data in one query (categories with films + hero images)
export async function getHomepageData() {
    return getCachedData('homepage-data', async () => {
        // First, get the active category registry with films and hero images
        const registry = await fetchFromSanity(`
            {
                "categories": *[_type == "categoryRegistry" && isActive == true][0] {
                    orderedCategories[]-> {
                        _id,
                        name,
                        slug,
                        "films": *[_type == "film" && references(^._id)] {
                            _id,
                            title,
                            date,
                            poster,
                            categories[]-> {
                                _id,
                                name,
                                slug
                            },
                            href,
                            description
                        } | order(date desc)
                    }
                },
                "heroImages": *[_type == "hero" && isActive == true] | order(order asc) {
                    _id,
                    title,
                    image,
                    order
                },
                "aboutSection": *[_type == "aboutSection"][0] {
                    title,
                    body
                },
                "teamMembers": *[_type == "teamMember"] | order(order asc) {
                    _id,
                    name,
                    role,
                    photo,
                    bio,
                    order
                },
                "topTen": *[_type == "topTen" && isActive == true][0] {
                    _id,
                    title,
                    "films": films[]-> {
                        _id,
                        title,
                        date,
                        poster,
                        categories[]-> {
                            _id,
                            name,
                            slug
                        },
                        href,
                        description
                    }
                }
            }
        `)

        if (registry && registry.categories && registry.categories.orderedCategories) {
            return {
                categories: registry.categories.orderedCategories,
                heroImages: registry.heroImages,
                aboutSection: registry.aboutSection,
                teamMembers: registry.teamMembers,
                topTen: registry.topTen
            }
        }
        
        // Fallback to regular categories if no registry is found
        const fallback = await fetchFromSanity(`
            {
                "categories": *[_type == "category"] {
                    _id,
                    name,
                    slug,
                    "films": *[_type == "film" && references(^._id)] {
                        _id,
                        title,
                        date,
                        poster,
                        categories[]-> {
                            _id,
                            name,
                            slug
                        },
                        href,
                        description
                    } | order(date desc)
                } | order(name asc),
                "heroImages": *[_type == "hero" && isActive == true] | order(order asc) {
                    _id,
                    title,
                    image,
                    order
                },
                "aboutSection": *[_type == "aboutSection"][0] {
                    title,
                    body
                },
                "teamMembers": *[_type == "teamMember"] | order(order asc) {
                    _id,
                    name,
                    role,
                    photo,
                    bio,
                    order
                },
                "topTen": *[_type == "topTen" && isActive == true][0] {
                    _id,
                    title,
                    "films": films[]-> {
                        _id,
                        title,
                        date,
                        poster,
                        categories[]-> {
                            _id,
                            name,
                            slug
                        },
                        href,
                        description
                    }
                }
            }
        `)

        return fallback
    })
}

export async function getAboutSection() {
    return getCachedData('about-section', () =>
        fetchFromSanity(`*[_type == "aboutSection"][0] { title, body }`)
    )
}

export async function getTeamMembers() {
    return getCachedData('team-members', () =>
        fetchFromSanity(`*[_type == "teamMember"] | order(order asc) {
            _id, name, role, photo, bio, order
        }`)
    )
}

export function getImageUrl(image) {
    return getCachedImageUrl(image)
}

export function clearSanityCache() {
    cache.clear()
    imageUrlCache.clear()
    inflight.clear()

    if (typeof window !== 'undefined') {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sanity-')) {
                    localStorage.removeItem(key)
                }
            })
        } catch (error) {
            // localStorage not available
        }
    }
}
