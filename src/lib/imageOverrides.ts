/**
 * Image overrides — reads and writes category images from Supabase.
 * key + gender → image_url stored in category_images table.
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
  // The unique constraint is (category_key, gender), so we must include both in the upsert
  const { error } = await supabase
    .from("category_images")
    .upsert(
      { category_key: imageKey, image_url: url, gender },
      { onConflict: "category_key,gender" }
    );
  if (error) {
    console.error("setImageUrl failed:", error);
    throw error;
  }
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url } }));
}

export async function deleteImageUrl(imageKey: string): Promise<void> {
  const { error } = await supabase
    .from("category_images")
    .delete()
    .eq("category_key", imageKey);
  if (error) {
    console.error("deleteImageUrl failed:", error);
    throw error;
  }
  window.dispatchEvent(new CustomEvent(OVERRIDE_CHANGED_EVENT, { detail: { imageKey, url: null } }));
}

// Legacy shims — no-ops for backward compat
export function getOverride(_imageKey: string): string | null { return null; }
export function getOverrides(): Record<string, string> { return {}; }
export function setOverride(imageKey: string, url: string): void {
  setImageUrl(imageKey, url).catch(console.error);
}
export function clearOverride(imageKey: string): void {
  deleteImageUrl(imageKey).catch(console.error);
}
