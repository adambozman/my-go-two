/**
 * Unified image resolver for the entire app.
 *
 * Three FULLY INDEPENDENT banks: male, female, non-binary.
 * - male   → /src/assets/.../male/
 * - female → /src/assets/.../female/ (or root for templates)
 * - non-binary → /src/assets/.../non-binary/
 *
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
  if (g === "male") return "male";
  if (g === "female") return "female";
  return "non-binary";
}

// ── Path resolution helpers ──

function getStylePaths(key: string, gender: Gender): string[] {
  if (gender === "male") return [`/src/assets/styles/male/${key}.jpg`];
  if (gender === "female") return [`/src/assets/styles/female/${key}.jpg`];
  return [`/src/assets/styles/non-binary/${key}.jpg`, `/src/assets/styles/male/${key}.jpg`];
}

function getCategoryPaths(key: string, gender: Gender): string[] {
  if (gender === "male") return [`/src/assets/categories/male/${key}.jpg`];
  if (gender === "female") return [`/src/assets/categories/female/${key}.jpg`];
  return [`/src/assets/categories/non-binary/${key}.jpg`, `/src/assets/categories/male/${key}.jpg`];
}

function getTemplatePaths(key: string, gender: Gender): string[] {
  if (gender === "male") return [`/src/assets/templates/male/${key}.jpg`];
  if (gender === "female") return [`/src/assets/templates/${key}.jpg`];
  return [`/src/assets/templates/non-binary/${key}.jpg`, `/src/assets/templates/male/${key}.jpg`];
}

function resolveFromGlob(paths: string[]): string {
  for (const p of paths) {
    const url = allModules[p];
    if (url && !isBlocked(url)) return url;
  }
  return "";
}

// ── Sync resolvers ──

export function getStyleImage(styleId: string, gender?: Gender | string, _categoryId?: string): string {
  const g = normalizeGender(gender as string);
  const key = styleId.toLowerCase().trim();
  return resolveFromGlob(getStylePaths(key, g));
}

export function getCategoryImage(categoryId: string, gender?: Gender | string): string {
  const g = normalizeGender(gender as string);
  const key = categoryId.toLowerCase().trim();
  return resolveFromGlob(getCategoryPaths(key, g));
}

export function getTemplateImage(templateName: string, gender: Gender | string): string {
  const g = normalizeGender(gender as string);
  const key = templateName.toLowerCase().trim().replace(/\s+/g, "-");
  const result = resolveFromGlob(getTemplatePaths(key, g));
  if (result) return result;
  return resolveFromGlob(getStylePaths(key, g));
}

export function getProductImage(productId: string, gender: Gender | string, fallback?: string): string {
  const g = normalizeGender(gender as string);
  const key = productId.toLowerCase().trim();
  const result = resolveFromGlob(getTemplatePaths(key, g));
  return result || fallback || "";
}

// ── Async DB-backed resolver ──

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

  const key = categoryKey.toLowerCase().trim();
  const fallback = resolveFromGlob([
    ...getTemplatePaths(key, gender),
    ...getStylePaths(key, gender),
    ...getCategoryPaths(key, gender),
  ]);
  imageCache.set(cacheKey, fallback);
  return fallback;
}

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
