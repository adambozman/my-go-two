/**
 * Unified image resolver for the entire app.
 *
 * - Async DB-backed resolution (category_images table) for registry-driven pages
 * - Sync static-asset resolution (import.meta.glob) for onboarding, preferences, legacy
 *
 * Three FULLY INDEPENDENT banks: male, female, neutral.
 * Male always reads from male. Female from female. Neutral from neutral.
 * No bank ever crosses into another.
 */

import { supabase } from "@/integrations/supabase/client";
import { isBlocked } from "@/data/imageBlocklist";
import { type Gender, normalizeGender } from "@/lib/gender";

// ── Eager glob of ALL .jpg assets for sync fallback ──
const allModules = import.meta.glob<string>(
  "/src/assets/**/*.jpg",
  { eager: true, import: "default" },
);

// ── Cache for DB-resolved images ──
const imageCache = new Map<string, string>();

function genderToDb(g: Gender): string {
  return g === "male" ? "male" : g === "female" ? "female" : "non-binary";
}

// ── Path resolution helpers ──

function getStylePaths(key: string, gender: Gender): string[] {
  if (gender === "male") return [`/src/assets/styles/male/${key}.jpg`];
  if (gender === "female") return [`/src/assets/styles/female/${key}.jpg`];
  return [`/src/assets/styles/${key}.jpg`];
}

function getCategoryPaths(key: string, gender: Gender): string[] {
  if (gender === "male") return [`/src/assets/categories/male/${key}.jpg`];
  if (gender === "female") return [`/src/assets/categories/female/${key}.jpg`];
  return [`/src/assets/categories/male/${key}.jpg`]; // neutral fallback
}

function getTemplatePaths(key: string, gender: Gender): string[] {
  if (gender === "male") return [`/src/assets/templates/male/${key}.jpg`];
  if (gender === "female") return [`/src/assets/templates/${key}.jpg`];
  return [`/src/assets/templates/neutral/${key}.jpg`];
}

function resolveFromGlob(paths: string[]): string {
  for (const p of paths) {
    const url = allModules[p];
    if (url && !isBlocked(url)) return url;
  }
  return "";
}

// ── Sync resolvers (onboarding, preferences, legacy components) ──

/** Sync style image resolver — used by onboarding and preferences section */
export function getStyleImage(styleId: string, gender?: Gender | string, _categoryId?: string): string {
  const g = normalizeGender(gender as string);
  const key = styleId.toLowerCase().trim();
  const result = resolveFromGlob(getStylePaths(key, g));
  if (result) return result;
  // Try neutral fallback for styles that only exist in root
  if (g !== "neutral") {
    const neutralResult = resolveFromGlob([`/src/assets/styles/${key}.jpg`]);
    if (neutralResult) return neutralResult;
  }
  return "";
}

/** Sync category image resolver — used by onboarding */
export function getCategoryImage(categoryId: string, gender?: Gender | string): string {
  const g = normalizeGender(gender as string);
  const key = categoryId.toLowerCase().trim();
  return resolveFromGlob(getCategoryPaths(key, g));
}

/** Sync template image resolver — used by ConnectionPage, TemplateCoverFlow */
export function getTemplateImage(templateName: string, gender: Gender | string): string {
  const g = normalizeGender(gender as string);
  const key = templateName.toLowerCase().trim().replace(/\s+/g, "-");
  const result = resolveFromGlob(getTemplatePaths(key, g));
  if (result) return result;
  // Try style override for some templates
  const styleResult = resolveFromGlob(getStylePaths(key, g));
  if (styleResult) return styleResult;
  return "";
}

/** Sync product image resolver — used by TemplateCoverFlow */
export function getProductImage(productId: string, gender: Gender | string, fallback?: string): string {
  const g = normalizeGender(gender as string);
  const key = productId.toLowerCase().trim();
  const result = resolveFromGlob(getTemplatePaths(key, g));
  return result || fallback || "";
}

// ── Async DB-backed resolver (registry-driven pages) ──

/** Primary async resolver — checks category_images table first, then static fallback */
export async function getImage(categoryKey: string, gender: Gender): Promise<string> {
  const g = genderToDb(gender);
  const cacheKey = `${categoryKey}:${g}`;

  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;

  const { data } = await supabase
    .from("category_images" as any)
    .select("image_url")
    .eq("category_key", categoryKey)
    .eq("gender", g)
    .single();

  if ((data as any)?.image_url && !isBlocked((data as any).image_url)) {
    imageCache.set(cacheKey, (data as any).image_url);
    return (data as any).image_url;
  }

  // Static fallback — never crosses gender banks
  const key = categoryKey.toLowerCase().trim();
  const fallback = resolveFromGlob([
    ...getTemplatePaths(key, gender),
    ...getStylePaths(key, gender),
    ...getCategoryPaths(key, gender),
  ]);
  imageCache.set(cacheKey, fallback);
  return fallback;
}

/** Batch preload images for an entire page */
export async function preloadImages(
  categoryKeys: string[],
  gender: Gender,
): Promise<Map<string, string>> {
  const g = genderToDb(gender);
  const results = new Map<string, string>();
  const uncached = categoryKeys.filter((k) => !imageCache.has(`${k}:${g}`));

  if (uncached.length > 0) {
    const { data } = await supabase
      .from("category_images" as any)
      .select("category_key, image_url")
      .eq("gender", g)
      .in("category_key", uncached);

    if (data) {
      for (const row of data as any[]) {
        if (row.image_url && !isBlocked(row.image_url)) {
          imageCache.set(`${row.category_key}:${g}`, row.image_url);
        }
      }
    }
  }

  for (const key of categoryKeys) {
    const cacheKey = `${key}:${g}`;
    if (imageCache.has(cacheKey)) {
      results.set(key, imageCache.get(cacheKey)!);
    } else {
      const k = key.toLowerCase().trim();
      const fb = resolveFromGlob([
        ...getTemplatePaths(k, gender),
        ...getStylePaths(k, gender),
        ...getCategoryPaths(k, gender),
      ]);
      imageCache.set(cacheKey, fb);
      results.set(key, fb);
    }
  }

  return results;
}
