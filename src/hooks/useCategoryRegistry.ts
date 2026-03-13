/**
 * Single hook for loading category data from the category_registry table.
 * This is the ONLY place category data is fetched. No component ever
 * queries category_registry directly.
 */

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type Gender } from "@/lib/gender";
import { preloadImages } from "@/lib/imageResolver";
import type { SubtypeItem } from "@/components/TemplateCoverFlow";
import type { SubcategoryGroup } from "@/data/templateSubtypes";

export interface CategoryItem {
  key: string;
  label: string;
  section: string;
  image: string;
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

        // Preload all images in a single batch query
        const keys = (rows as any[]).map((r: any) => r.key);
        const imageMap = await preloadImages(keys, gender);
        if (cancelled) return;

        const items: CategoryItem[] = (rows as any[]).map((r: any) => ({
          key: r.key,
          label: r.label,
          section: r.section,
          image: imageMap.get(r.key) || "",
          sort_order: r.sort_order,
          fields: (r.fields as SubtypeItem[]) || [],
          subcategories: (r.subcategories as SubcategoryGroup[]) || undefined,
        }));

        // Filter subtypes/subcategories by the user's gender
        for (const item of items) {
          if (item.fields) {
            item.fields = item.fields.filter(
              (f) => !f.gender || f.gender.includes(gender),
            );
          }
          if (item.subcategories) {
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
  }, [gender, page, dbGender]);

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
