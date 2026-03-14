/**
 * Unified image resolver for the entire app.
 *
 * Path: /src/assets/{gender}/{section}/{categoryId}/{subcategoryId}/{imageKey}.jpg
 *
 * Rules:
 * - Follow the exact path. If the file does not exist at that path, return "".
 * - No cross-gender fallback. No cross-section fallback. Empty is empty.
 * - User override (spare bank assignment) is checked first.
 */

import { type Gender, normalizeGender } from "@/lib/gender";
import { getOverride } from "@/lib/imageOverrides";

// Eager glob of ALL images in the new hierarchy
const allModules = import.meta.glob<string>(
  "/src/assets/{male,female,non-binary}/**/*.jpg",
  { eager: true, import: "default" },
);

function resolveKey(
  imageKey: string,
  gender: Gender,
  section: string,
  categoryId: string,
  subcategoryId: string,
): string {
  const k = imageKey.toLowerCase().trim().replace(/\s+/g, "-");

  // Check user override first (spare bank assignment)
  const override = getOverride(k);
  if (override) return override;

  const genderFolder = gender === "non-binary" ? "non-binary" : gender;
  const path = `/src/assets/${genderFolder}/${section}/${categoryId}/${subcategoryId}/${k}.jpg`;

  return allModules[path] ?? "";
}

// ── Public API ──

export function getTemplateImage(
  imageKey: string,
  gender: Gender | string,
  section = "",
  categoryId = "",
  subcategoryId = "",
): string {
  const g = normalizeGender(gender as string);
  return resolveKey(imageKey, g, section, categoryId, subcategoryId);
}

export function getStyleImage(styleId: string, gender: Gender | string): string {
  // Style images don't follow the hierarchy — not used in new arch
  return "";
}

export function getCategoryImage(
  categoryId: string,
  gender: Gender | string,
  section = "",
  subcategoryId = "",
): string {
  const g = normalizeGender(gender as string);
  return resolveKey(categoryId, g, section, categoryId, subcategoryId);
}

export function getProductImage(
  productId: string,
  gender: Gender | string,
  fallback?: string,
  section = "",
  categoryId = "",
  subcategoryId = "",
): string {
  const g = normalizeGender(gender as string);
  return resolveKey(productId, g, section, categoryId, subcategoryId) || fallback || "";
}

// Async shim — kept for API compatibility
export async function getImage(
  imageKey: string,
  gender: Gender,
  section = "",
  categoryId = "",
  subcategoryId = "",
): Promise<string> {
  return resolveKey(imageKey, gender, section, categoryId, subcategoryId);
}

export async function preloadImages(
  categoryKeys: string[],
  gender: Gender,
): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  for (const key of categoryKeys) {
    results.set(key, "");
  }
  return results;
}
