/**
 * Permanent image blocklist.
 * Add source paths here to remove images from all resolvers app-wide.
 * Paths are relative to the project root, matching import.meta.glob keys.
 *
 * Example:
 *   "/src/assets/styles/male/minimal.jpg"
 *   "/src/assets/templates/neutral/shoe-size.jpg"
 */
const BLOCKLISTED_PATHS: string[] = [
  // Add paths here — images will be hidden from all resolvers and the gallery
];

/* ── Build-time resolution ──
 * Glob every asset once at module load, then map blocklisted source paths
 * to their Vite-resolved runtime URLs so resolvers can do a fast Set lookup.
 */
const allAssets = import.meta.glob<string>(
  "/src/assets/**/*.{jpg,jpeg,png,webp,svg}",
  { eager: true, import: "default" },
);

/** Runtime-resolved URLs that resolvers check before returning an image */
export const blockedUrls = new Set<string>(
  BLOCKLISTED_PATHS.map((p) => allAssets[p]).filter(Boolean),
);

/** Source paths for the gallery to filter raw glob results */
export const blockedPaths = new Set<string>(BLOCKLISTED_PATHS);

/** Check if a resolved image URL is blocklisted */
export function isBlocked(url: string): boolean {
  return blockedUrls.has(url);
}
