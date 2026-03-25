import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";

export function useCategoryImageMap(keys: string[]) {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (keys.length === 0) {
      setImageMap({});
      return;
    }

    let cancelled = false;

    supabase
      .from("category_images")
      .select("category_key, image_url")
      .in("category_key", keys)
      .then(({ data }) => {
        if (cancelled) return;
        const nextMap: Record<string, string> = {};
        for (const row of data || []) nextMap[row.category_key] = row.image_url;
        setImageMap(nextMap);
      });

    return () => {
      cancelled = true;
    };
  }, [keys.join(",")]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const { imageKey, url } = detail;
      if (imageKey) {
        setImageMap((prev) => ({ ...prev, [imageKey]: url || "" }));
      }
    };

    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, []);

  return imageMap;
}
