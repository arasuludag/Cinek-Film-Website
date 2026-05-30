import { client, hasSanity } from './sanity';
import type { ImageWithMeta } from './image';

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!hasSanity) return fallback;
  try {
    const result = await client.fetch<T>(query, params);
    return (result ?? fallback) as T;
  } catch (err) {
    console.warn('[sanity] query failed, using fallback:', (err as Error).message);
    return fallback;
  }
}

// Reusable image projection with metadata for sizing and blur placeholder.
const IMG = `{
  _type, alt, ...,
  asset->{ _ref, url, metadata { lqip, dimensions } }
}`;

/* ----------------------------- Types ----------------------------- */

export interface Film {
  _id: string;
  title: string;
  date?: string;
  poster?: ImageWithMeta;
  categories?: { _id: string; name: string; slug: { current: string } }[];
  href?: string;
  description?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  films: Film[];
}

export interface HeroImage {
  _id: string;
  title?: string;
  image: ImageWithMeta;
  order: number;
}

export interface TopTen {
  _id: string;
  title?: string;
  films: Film[];
}

export interface AboutSection {
  title?: string;
  body?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  photo?: ImageWithMeta;
  bio?: string;
  order?: number;
}

export interface GalleryImage extends ImageWithMeta {
  _key: string;
  caption?: string;
}

export interface GalleryProject {
  _id: string;
  title: string;
  filmTitle?: string;
  date?: string;
  description?: string;
  images: GalleryImage[];
}

export interface HomepageData {
  heroImages: HeroImage[];
  categories: Category[];
  topTen?: TopTen;
  aboutSection?: AboutSection;
  teamMembers: TeamMember[];
}

/* ----------------------------- Queries ----------------------------- */

export async function getHomepageData(): Promise<HomepageData> {
  return safeFetch(
    `{
      "heroImages": *[_type == "hero" && isActive == true] | order(order asc) {
        _id, title, order, image ${IMG}
      },
      "categories": coalesce(
        *[_type == "categoryRegistry" && isActive == true][0].orderedCategories[]-> {
          _id, name, slug,
          "films": *[_type == "film" && references(^._id)] | order(date desc) {
            _id, title, date, href, description,
            poster ${IMG},
            categories[]->{ _id, name, slug }
          }
        },
        *[_type == "category"] | order(name asc) {
          _id, name, slug,
          "films": *[_type == "film" && references(^._id)] | order(date desc) {
            _id, title, date, href, description,
            poster ${IMG},
            categories[]->{ _id, name, slug }
          }
        }
      ),
      "topTen": *[_type == "topTen" && isActive == true][0] {
        _id, title,
        "films": films[]-> {
          _id, title, date, href, description,
          poster ${IMG},
          categories[]->{ _id, name, slug }
        }
      },
      "aboutSection": *[_type == "aboutSection"][0] { title, body },
      "teamMembers": *[_type == "teamMember"] | order(order asc) {
        _id, name, role, bio, order, photo ${IMG}
      }
    }`,
    {},
    { heroImages: [], categories: [], teamMembers: [] } as HomepageData,
  );
}

export async function getGalleryProjects(): Promise<GalleryProject[]> {
  return safeFetch(
    `*[_type == "galleryProject" && isActive == true] | order(order asc, date desc) {
      _id, title, date, description,
      "filmTitle": film->title,
      "images": images[]{
        _key, _type, alt, caption,
        asset->{ _ref, url, metadata { lqip, dimensions } }
      }
    }`,
    {},
    [] as GalleryProject[],
  );
}
