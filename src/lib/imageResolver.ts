/**
 * Unified image resolver for the entire app.
 *
 * Three equal gender banks — no fallbacks, no crossover:
 *   male       → /src/assets/templates/male/
 *   female     → /src/assets/templates/female/
 *   non-binary → /src/assets/templates/non-binary/
 */

import { type Gender, normalizeGender } from "@/lib/gender";
import { getOverride } from "@/lib/imageOverrides";

const maleModules = import.meta.glob<string>(
  "/src/assets/templates/male/*.jpg",
  { eager: true, import: "default" },
);

const femaleModules = import.meta.glob<string>(
  "/src/assets/templates/female/*.jpg",
  { eager: true, import: "default" },
);

const nonBinaryModules = import.meta.glob<string>(
  "/src/assets/templates/non-binary/*.jpg",
  { eager: true, import: "default" },
);

function resolveKey(key: string, gender: Gender): string {
  const k = key.toLowerCase().trim().replace(/\s+/g, "-");

  // Check user override first (spare bank assignment)
  const override = getOverride(k);
  if (override) return override;

  if (gender === "male") {
    return maleModules[`/src/assets/templates/male/${k}.jpg`] ?? "";
  }

  if (gender === "female") {
    return femaleModules[`/src/assets/templates/female/${k}.jpg`] ?? "";
  }

  if (gender === "non-binary") {
    return nonBinaryModules[`/src/assets/templates/non-binary/${k}.jpg`] ?? "";
  }

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
