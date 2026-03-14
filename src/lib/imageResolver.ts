/**
 * Image resolver — manual assignment only.
 * All images are assigned via the spare bank in PhotoGallery.
 * No automatic path resolution. If no override exists, return "".
 */

import { type Gender } from "@/lib/gender";
import { getOverride } from "@/lib/imageOverrides";

export function getTemplateImage(imageKey: string, _gender?: any, ...rest: any[]): string {
  return getOverride(imageKey) ?? "";
}

export function getStyleImage(styleId: string, _gender?: any): string {
  return getOverride(styleId) ?? "";
}

export function getCategoryImage(categoryId: string, _gender?: any, ...rest: any[]): string {
  return getOverride(categoryId) ?? "";
}

export function getProductImage(productId: string, _gender?: any, fallback?: string, ...rest: any[]): string {
  return getOverride(productId) ?? fallback ?? "";
}

export async function getImage(imageKey: string, _gender?: Gender, ...rest: any[]): Promise<string> {
  return getOverride(imageKey) ?? "";
}

export async function preloadImages(categoryKeys: string[], _gender?: Gender): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  for (const key of categoryKeys) {
    results.set(key, getOverride(key) ?? "");
  }
  return results;
}
