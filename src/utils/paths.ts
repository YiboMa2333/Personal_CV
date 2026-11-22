/** Resolve hand-written site paths; imported assets are already based by Astro/Vite. */
export function sitePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path === base || path.startsWith(base + '/') ? path : base + path;
}
