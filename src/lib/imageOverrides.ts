/**
 * Image overrides — reads and writes category images from Supabase.
 * key → image_url stored in category_images table.
 * localStorage is NOT used for images.
 */

import { supabase } from "@/integrations/supabase/client";

export const OVERRIDE_CHANGED_EVENT = "gotwo_override_changed";

export async function getImageUrl(imageKey: string): Promise<string> {
  const { data } = await supabase
    .from("category_images")
    .select("image_url")
    .eq("category_key", imageKey)
    .maybeSingle();
  return data?.image_url ?? "";
}

export async function setImageUrl(imageKey: string, url: string, gender = "male"): Promise<void> {
  await supabase
    .from("category_images")
    .upsert({ category_key: imageKey, image_url: url, gender }, { onConflict: "category_key" });
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url } }));
}

export async function deleteImageUrl(imageKey: string): Promise<void> {
  await supabase
    .from("category_images")
    .delete()
    .eq("category_key", imageKey);
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url: null } }));
}

// Legacy sync shims — kept for compatibility with any remaining callers
export function getOverride(imageKey: string): string | null { return null; }
export function getOverrides(): Record<string, string> { return {}; }
export function setOverride(imageKey: string, url: string): void {
  setImageUrl(imageKey, url).catch(console.error);
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url } }));
}
export function clearOverride(imageKey: string): void {
  deleteImageUrl(imageKey).catch(console.error);
}
