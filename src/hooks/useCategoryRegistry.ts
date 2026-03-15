/**
 * Single hook for loading category data from the category_registry table.
 * This is the ONLY place category data is fetched. No component ever
 * queries category_registry directly.
 */

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type Gender } from "@/lib/gender";
import { getTemplateImage } from "@/lib/imageResolver";
import { getOverride, OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";

/** Pull the image key out of a registry row's subcategories JSONB.
 *  Each subtype has an `image` string (e.g. "clothing-tops").
 *  We grab the first non-empty one to use as the card cover. */
function extractImageKey(row: any): string {
  return row.key ? row.key.replace(/-male$|-female$|-nb$/, "") : "";
}

export interface CategoryItem {
  key: string;
  label: string;
  section: string;
  image: string;
  imageKey: string;
  sort_order: number;
  fields: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
}

export function useCategoryRegistry(
  gender: Gender,
  page: "mygotwo" | "dashboard",
) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overrideVersion, setOverrideVersion] = useState(0);

  useEffect(() => {
    const handler = () => setOverrideVersion(v => v + 1);
    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, []);

  const dbGender =
    gender === "male" ? "male" : gender === "female" ? "female" : "non-binary";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const { data: rows, error: fetchError } = await supabase
          .from("category_registry" as any)
          .select("*")
          .eq("page", page)
          .eq("is_active", true)
          .contains("genders", [dbGender])
          .order("sort_order");

        if (fetchError) throw fetchError;
        if (cancelled) return;

        if (!rows || rows.length === 0) {
          setCategories([]);
          setLoading(false);
          return;
        }

        if (cancelled) return;

        const items: CategoryItem[] = (rows as any[]).map((r: any) => {
          const imageKey: string = r.image || r.key || "";
          const resolvedImage = imageKey ? getOverride(imageKey) ?? "" : "";
          return {
            key: r.key,
            label: r.label,
            section: r.section,
            image: resolvedImage,
            imageKey: imageKey,
            sort_order: r.sort_order,
            fields: (r.fields as SubtypeItem[]) || [],
            subcategories: (r.subcategories as SubcategoryGroup[]) || undefined,
          };
        });

        // Filter subtypes/subcategories by the user's gender
        for (const item of items) {
          if (Array.isArray(item.fields)) {
            item.fields = item.fields.filter(
              (f) => !f.gender || f.gender.includes(gender),
            );
          }
          if (Array.isArray(item.subcategories)) {
            item.subcategories = item.subcategories.filter(
              (sc) => !sc.gender || sc.gender.includes(gender),
            );
          }
        }

        setCategories(items);
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [gender, page, dbGender, overrideVersion]);

  const sections = useMemo(() => {
    const grouped: Record<string, CategoryItem[]> = {};
    for (const cat of categories) {
      if (!grouped[cat.section]) grouped[cat.section] = [];
      grouped[cat.section].push(cat);
    }
    return grouped;
  }, [categories]);

  return { sections, categories, loading, error };
}
