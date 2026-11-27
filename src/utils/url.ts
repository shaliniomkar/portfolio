/**
 * Builds a link that works wherever the site is hosted.
 *
 * Right now the site lives at shaliniomkar.github.io/portfolio/, so a link
 * to "workshop/" has to become "/portfolio/workshop/". Astro stores that
 * "/portfolio" prefix in import.meta.env.BASE_URL (from `base` in
 * astro.config.mjs). When you move to your own domain and set base to '/',
 * every link updates by itself.
 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // drop trailing "/"
  return `${base}/${path.replace(/^\//, '')}`; // drop leading "/" from path
}
