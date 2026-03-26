import { supabase } from "@/integrations/supabase/client";

export type WebsiteAssetAssignment = {
  assetKey: string;
  imageUrl: string;
};

export async function getWebsiteAssetAssignments(assetKeys: string[]) {
  if (assetKeys.length === 0) return [] as WebsiteAssetAssignment[];

  const { data, error } = await supabase
    .from("website_asset_assignments")
    .select("asset_key, image_url")
    .in("asset_key", assetKeys);

  if (error) {
    throw error;
  }

  return (data ?? []).flatMap((row) =>
    row.image_url ? [{
      assetKey: row.asset_key,
      imageUrl: row.image_url,
    }] : [],
  );
}

export async function setWebsiteAssetAssignment(params: {
  assetKey: string;
  bankPhotoId: string;
  imageUrl: string;
}) {
  const { error } = await supabase.from("website_asset_assignments").upsert(
    {
      asset_key: params.assetKey,
      bank_photo_id: params.bankPhotoId,
      image_url: params.imageUrl,
    },
    { onConflict: "asset_key" },
  );

  if (error) {
    throw error;
  }
}

export async function setWebsiteAssetAssignments(
  rows: Array<{
    assetKey: string;
    bankPhotoId: string;
    imageUrl: string;
  }>,
) {
  if (rows.length === 0) {
    return;
  }

  const { error } = await supabase.from("website_asset_assignments").upsert(
    rows.map((row) => ({
      asset_key: row.assetKey,
      bank_photo_id: row.bankPhotoId,
      image_url: row.imageUrl,
    })),
    { onConflict: "asset_key" },
  );

  if (error) {
    throw error;
  }
}
