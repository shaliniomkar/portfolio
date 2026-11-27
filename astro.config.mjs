// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// `site` is the site's full public address (used for links and meta tags).
// `base` is the sub-folder it lives in. The repo is called "portfolio",
// so for now GitHub serves it at shaliniomkar.github.io/portfolio/.
// When you add a custom domain: set `site` to it (e.g. 'https://shalini.dev'),
// set `base` back to '/', and add a public/CNAME file with the domain.
export default defineConfig({
  site: 'https://shaliniomkar.github.io',
  base: '/portfolio',
  integrations: [preact()],
});
