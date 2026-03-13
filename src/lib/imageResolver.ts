/**
 * Unified image resolver for the entire app.
 *
 * Asset banks:
 *   female  → /src/assets/templates/          (root, largest set)
 *   male    → /src/assets/templates/male/
 *   non-binary → no dedicated folder; falls back to root then male
 *
 * Fallback chain per gender:
 *   male:        male/ → root → (empty)
 *   female:      root  → male/ → (empty)
 *   non-binary:  root  → male/ → (empty)
 */

import { type Gender, normalizeGender } from "@/lib/gender";

// ── Eager glob of ALL template .jpg assets ──
const rootModules = import.meta.glob<string>(
  "/src/assets/templates/*.jpg",
  { eager: true, import: "default" },
);

const maleModules = import.meta.glob<string>(
  "/src/assets/templates/male/*.jpg",
  { eager: true, import: "default" },
);

function resolveKey(key: string, gender: Gender): string {
  const k = key.toLowerCase().trim().replace(/\s+/g, "-");

  if (gender === "male") {
    // male/ first, then root fallback
    const m = maleModules[`/src/assets/templates/male/${k}.jpg`];
    if (m) return m;
    const r = rootModules[`/src/assets/templates/${k}.jpg`];
    if (r) return r;
    return "";
  }

  // female and non-binary: root first, then male/
  const r = rootModules[`/src/assets/templates/${k}.jpg`];
  if (r) return r;
  const m = maleModules[`/src/assets/templates/male/${k}.jpg`];
  if (m) return m;
  return "";
}

// ── Public API ──

export function getTemplateImage(key: string, gender: Gender | string): string {
  const g = normalizeGender(gender as string);
  return resolveKey(key, g);
}

export function getStyleImage(styleId: string, gender?: Gender | string): string {
  const g = normalizeGender((gender ?? "non-binary") as string);
  return resolveKey(styleId, g);
}

export function getCategoryImage(categoryId: string, gender?: Gender | string): string {
  const g = normalizeGender((gender ?? "non-binary") as string);
  return resolveKey(categoryId, g);
}

export function getProductImage(productId: string, gender: Gender | string, fallback?: string): string {
  const g = normalizeGender(gender as string);
  return resolveKey(productId, g) || fallback || "";
}

// Async shim — kept for API compatibility, resolves synchronously now
export async function getImage(categoryKey: string, gender: Gender): Promise<string> {
  return resolveKey(categoryKey, gender);
}

export async function preloadImages(
  categoryKeys: string[],
  gender: Gender,
): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  for (const key of categoryKeys) {
    results.set(key, resolveKey(key, gender));
  }
  return results;
}
