import fs from "node:fs";
import path from "node:path";

/**
 * Every page here is statically prerendered, so this runs at build time only.
 * It lets photo slots fall back to a solid color tile until the real images
 * are dropped into public/images/ — an empty folder still renders a
 * deliberate-looking page rather than broken image icons.
 *
 * Server Components only. Do not import from a "use client" module.
 */
const cache = new Map<string, boolean>();

export function hasImage(src: string): boolean {
  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  const clean = src.split("?")[0];
  const exists = fs.existsSync(path.join(process.cwd(), "public", clean));
  cache.set(src, exists);
  return exists;
}
