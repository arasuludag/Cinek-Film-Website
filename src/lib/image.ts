import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from './sanity';

const builder = createImageUrlBuilder(client);

/** Build a Sanity image URL for use with Astro's <Image> at build time. */
export function urlFor(source: ImageWithMeta) {
  return builder.image(source as unknown as SanityImageSource);
}

/** Shape projected for every image field: asset ref + metadata for sizing/blur. */
export interface ImageWithMeta {
  _type?: 'image';
  alt?: string;
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
}

/** Extract width/height from a Sanity asset _ref (format: image-WxH-ext). */
export function getDimensions(image?: ImageWithMeta): { width: number; height: number } {
  const ref = image?.asset?._ref;
  if (!ref) return { width: 2, height: 3 };
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return { width: 2, height: 3 };
  return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
}
