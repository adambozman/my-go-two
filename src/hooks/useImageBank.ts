import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ImageBankItem = {
  id: string;
  label: string;
  tag: string;
  url: string;
  storage_path: string;
  created_at: string;
};

/**
 * Simple hook to pull images from the image bank.
 * Pass a tag to filter, or leave empty for all.
 */
export function useImageBank(tag?: string) {
  const [images, setImages] = useState<ImageBankItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("image_bank")
      .select("*")
      .order("created_at", { ascending: false });

    if (tag) query = query.eq("tag", tag);

    const { data } = await query;
    setImages((data as ImageBankItem[]) ?? []);
    setLoading(false);
  }, [tag]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { images, loading, refetch: fetch };
}

/**
 * Get a single random image URL from the bank by tag.
 * Good for hero backgrounds, banners, etc.
 */
export function useImageBankRandom(tag?: string) {
  const { images, loading } = useImageBank(tag);
  const url = images.length > 0
    ? images[Math.floor(Math.random() * images.length)].url
    : null;
  return { url, loading };
}
