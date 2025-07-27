const PROJECT_ID = 'ursggy12'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`

// Import image URL builder
import imageUrlBuilder from '@sanity/image-url'

// Create image URL builder
const builder = imageUrlBuilder({
    projectId: PROJECT_ID,
    dataset: DATASET,
})

// Simple cache
const cache = new Map()
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

// Image URL cache
const imageUrlCache = new Map()

function getCachedData(key, fetchFunction) {
    if (typeof window === 'undefined') {
        return fetchFunction()
    }

    // Check memory cache first
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return Promise.resolve(cached.data)
    }

    try {
        const stored = localStorage.getItem(`sanity-${key}`)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                // Update memory cache
                cache.set(key, parsed)
                return Promise.resolve(parsed.data)
            }
        }
    } catch (error) {
        // localStorage not available, continue with API call
    }

    return fetchFunction().then(data => {
        const cacheData = {
            data,
            timestamp: Date.now()
        }

        cache.set(key, cacheData)

        try {
            localStorage.setItem(`sanity-${key}`, JSON.stringify(cacheData))
        } catch (error) {
            // localStorage not available, continue
        }

        return data
    })
}

// Cache image URLs to avoid repeated URL generation
function getCachedImageUrl(imageRef, urlGenerator) {
    if (!imageRef || !imageRef.asset || !imageRef.asset._ref) {
        return '/CINEK FILM LOGO.png'
    }

    const cacheKey = imageRef.asset._ref

    // Check memory cache first
    if (imageUrlCache.has(cacheKey)) {
        return imageUrlCache.get(cacheKey)
    }

    // Check localStorage cache
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem(`sanity-image-${cacheKey}`)
            if (stored) {
                const parsed = JSON.parse(stored)
                if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                    // Update memory cache
                    imageUrlCache.set(cacheKey, parsed.url)
                    return parsed.url
                }
            }
        } catch (error) {
            // localStorage not available, continue with generation
        }
    }

    // Generate URL and cache it
    const imageUrl = urlGenerator()
    imageUrlCache.set(cacheKey, imageUrl)

    // Store in localStorage
    if (typeof window !== 'undefined') {
        try {
            const cacheData = {
                url: imageUrl,
                timestamp: Date.now()
            }
            localStorage.setItem(`sanity-image-${cacheKey}`, JSON.stringify(cacheData))
        } catch (error) {
            // localStorage not available, continue
        }
    }

    return imageUrl
}

// Fetch data from Sanity
async function fetchFromSanity(query, params = {}) {
    let url = new URL(SANITY_URL)

    // Replace parameters in the query string directly
    let finalQuery = query
    Object.keys(params).forEach(key => {
        const placeholder = `$${key}`
        const value = typeof params[key] === 'string' ? `"${params[key]}"` : JSON.stringify(params[key])
        finalQuery = finalQuery.replace(new RegExp(placeholder, 'g'), value)
    })

    url.searchParams.set('query', finalQuery)

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
        href
      } | order(date desc)
    `)
    )
}

// Get films by category
export async function getFilmsByCategory(categorySlug) {
    return getCachedData(`films-${categorySlug}`, () =>
        fetchFromSanity(`
      *[_type == "film" && "${categorySlug}" in categories[]->slug.current] {
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
                        href
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
                            href
                        } | order(date desc)
                    }
                },
                "heroImages": *[_type == "hero" && isActive == true] | order(order asc) {
                    _id,
                    title,
                    image,
                    order
                }
            }
        `)
        
        if (registry && registry.categories && registry.categories.orderedCategories) {
            return {
                categories: registry.categories.orderedCategories,
                heroImages: registry.heroImages
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
                        href
                    } | order(date desc)
                } | order(name asc),
                "heroImages": *[_type == "hero" && isActive == true] | order(order asc) {
                    _id,
                    title,
                    image,
                    order
                }
            }
        `)
        
        return fallback
    })
}

export function getImageUrl(image) {
    return getCachedImageUrl(image, () =>
        builder.image(image)
            .url()
    )
}

export function getHeroImageUrl(image) {
    return getCachedImageUrl(image, () =>
        builder.image(image)
            .url()
    )
}

export function clearSanityCache() {
    cache.clear()
    imageUrlCache.clear()

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