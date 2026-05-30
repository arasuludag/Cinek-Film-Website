import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const hasSanity = Boolean(projectId);

if (!hasSanity) {
  // Don't hard-crash: let the site build empty so `npm run dev` works before .env
  // is set. Queries guard on `hasSanity` and return empties.
  console.warn(
    '[sanity] PUBLIC_SANITY_PROJECT_ID is not set — building with empty content. ' +
      'Copy .env.example to .env and fill it in.',
  );
}

export const client: SanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export { projectId, dataset };
