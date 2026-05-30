// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cinekfilm.com', // update to actual domain before deploy
  output: 'static',
  integrations: [sitemap()],
  image: {
    // Allow build-time <Image> optimizer to fetch & process Sanity assets.
    domains: ['cdn.sanity.io'],
  },
  build: {
    format: 'directory',
  },
});
