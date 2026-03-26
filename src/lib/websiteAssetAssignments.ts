import { supabase } from "@/integrations/supabase/client";
import { makeStorageRef, parseStorageRef, toStorageRefIfPossible } from "@/lib/storageRefs";

export type WebsiteAssetAssignment = {
  assetKey: string;
  imageUrl: string;
};

export async function getWebsiteAssetAssignments(assetKeys: string[]) {
  if (assetKeys.length === 0) return [] as WebsiteAssetAssignment[];

  const { data, error } = await supabase
    .from("website_asset_assignments")
    .select("asset_key, category_bank_photos!inner(image_url, filename)")
    .in("asset_key", assetKeys);

  if (error) {
    throw error;
  }

  return (data ?? []).flatMap((row) => {
    const bankPhoto = Array.isArray(row.category_bank_photos)
      ? row.category_bank_photos[0]
      : row.category_bank_photos;

    if (!bankPhoto?.image_url) return [];

    const storageRef = parseStorageRef(toStorageRefIfPossible(bankPhoto.image_url));
    const ext = storageRef?.path.split(".").pop() || bankPhoto.filename?.split(".").pop() || "jpg";
    return [{
      assetKey: row.asset_key,
      imageUrl: makeStorageRef("images-mygotwo-strip", `${row.asset_key}.${ext}`),
    }];
  });
}

export async function setWebsiteAssetAssignment(params: {
  assetKey: string;
  bankPhotoId: string;
}) {
  const { error } = await supabase.from("website_asset_assignments").upsert(
    {
      asset_key: params.assetKey,
      bank_photo_id: params.bankPhotoId,
    },
    { onConflict: "asset_key" },
  );

  if (error) {
    throw error;
  }
}
