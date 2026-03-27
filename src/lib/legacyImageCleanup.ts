import { supabase } from "@/integrations/supabase/client";

const LEGACY_BANK_URL_PREFIX = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/category-images/bank/`;

export function isLegacyBrokenBankUrl(value?: string | null) {
  return Boolean(value && value.startsWith(LEGACY_BANK_URL_PREFIX));
}

export async function cleanupLegacyBrokenImageRows() {
  const { data: bankRows, error: bankError } = await supabase
    .from("category_bank_photos")
    .select("id, image_url")
    .like("image_url", `${LEGACY_BANK_URL_PREFIX}%`);

  if (bankError) {
    throw bankError;
  }

  const { data: assignedRows, error: assignedError } = await supabase
    .from("category_images")
    .select("category_key, gender, image_url")
    .like("image_url", `${LEGACY_BANK_URL_PREFIX}%`);

  if (assignedError) {
    throw assignedError;
  }

  const bankIds = (bankRows ?? [])
    .filter((row) => isLegacyBrokenBankUrl(row.image_url))
    .map((row) => row.id);
  const assignedKeys = (assignedRows ?? [])
    .filter((row) => isLegacyBrokenBankUrl(row.image_url))
    .map((row) => row.category_key);

  if (bankIds.length > 0) {
    const { error } = await supabase
      .from("category_bank_photos")
      .delete()
      .in("id", bankIds);

    if (error) {
      throw error;
    }
  }

  if (assignedKeys.length > 0) {
    const { error } = await supabase
      .from("category_images")
      .delete()
      .in("category_key", assignedKeys);

    if (error) {
      throw error;
    }
  }

  return {
    deletedBankRows: bankIds.length,
    deletedAssignedRows: assignedKeys.length,
  };
}
