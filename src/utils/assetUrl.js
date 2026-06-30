/** Resolve public-folder paths for GitHub Pages subpath (/our-scrapbook/). */
export function assetUrl(path) {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
