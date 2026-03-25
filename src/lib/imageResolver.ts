/**
 * Image resolver — legacy sync API.
 * All image data now comes from the category_images table via hooks.
 * These functions exist only for backward compatibility and return "".
 */

import { type Gender } from "@/lib/gender";

export function getTemplateImage(_imageKey: string, ..._rest: unknown[]): string {
  return "";
}

export function getStyleImage(_styleId: string, ..._rest: unknown[]): string {
  return "";
}

export function getCategoryImage(_categoryId: string, ..._rest: unknown[]): string {
  return "";
}

export function getProductImage(_productId: string, ..._rest: unknown[]): string {
  return "";
}

export async function getImage(_imageKey: string, _gender?: Gender): Promise<string> {
  return "";
}

export async function preloadImages(categoryKeys: string[], _gender?: Gender): Promise<Map<string, string>> {
  return new Map(categoryKeys.map((key) => [key, ""]));
}
