import { supabase } from "@/integrations/supabase/client";

export type WebsiteAssetAssignment = {
  assetKey: string;
  bankPhotoId: string;
  imageUrl: string;
};

export async function getWebsiteAssetAssignments(assetKeys: string[]) {
  if (assetKeys.length === 0) return [] as WebsiteAssetAssignment[];

  const { data: assignmentRows, error: assignmentError } = await (supabase as any)
    .from("website_asset_assignments")
    .select("asset_key, bank_photo_id")
    .in("asset_key", assetKeys);

  if (assignmentError) {
    throw assignmentError;
  }

  const bankPhotoIds = Array.from(
    new Set((assignmentRows ?? []).map((row) => row.bank_photo_id).filter(Boolean)),
  );

  if (bankPhotoIds.length === 0) return [] as WebsiteAssetAssignment[];

  const { data: bankRows, error: bankError } = await supabase
    .from("category_bank_photos")
    .select("id, image_url")
    .in("id", bankPhotoIds);

  if (bankError) {
    throw bankError;
  }

  const bankMap = new Map((bankRows ?? []).map((row) => [row.id, row.image_url]));

  return (assignmentRows ?? [])
    .map((row) => {
      const imageUrl = bankMap.get(row.bank_photo_id);
      if (!imageUrl) return null;

      return {
        assetKey: row.asset_key,
        bankPhotoId: row.bank_photo_id,
        imageUrl,
      } satisfies WebsiteAssetAssignment;
    })
    .filter((value): value is WebsiteAssetAssignment => value !== null);
}

export async function setWebsiteAssetAssignment(params: {
  assetKey: string;
  bankPhotoId: string;
  updatedBy?: string | null;
}) {
  const { error } = await (supabase as any).from("website_asset_assignments").upsert(
    {
      asset_key: params.assetKey,
      bank_photo_id: params.bankPhotoId,
      updated_by: params.updatedBy ?? null,
    },
    { onConflict: "asset_key" },
  );

  if (error) {
    throw error;
  }
}
