import { supabase } from "@/integrations/supabase/client";

const WEBSITE_ASSET_GENDER = "male";

export type WebsiteAssetAssignment = {
  assetKey: string;
  imageUrl: string;
};

export async function getWebsiteAssetAssignments(assetKeys: string[]) {
  if (assetKeys.length === 0) return [] as WebsiteAssetAssignment[];

  const { data, error } = await supabase
    .from("category_images")
    .select("category_key, image_url")
    .eq("gender", WEBSITE_ASSET_GENDER)
    .in("category_key", assetKeys);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    assetKey: row.category_key,
    imageUrl: row.image_url,
  }));
}

export async function setWebsiteAssetAssignment(params: {
  assetKey: string;
  imageUrl: string;
}) {
  const { error } = await supabase.from("category_images").upsert(
    {
      category_key: params.assetKey,
      gender: WEBSITE_ASSET_GENDER,
      image_url: params.imageUrl,
    },
    { onConflict: "category_key,gender" },
  );

  if (error) {
    throw error;
  }
}
