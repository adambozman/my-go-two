/**
 * Single hook for loading category data from the category_registry table.
 * This is the ONLY place category data is fetched. No component ever
 * queries category_registry directly.
 */

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type Gender } from "@/lib/gender";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";
import { CATEGORY_REGISTRY_SEED } from "@/data/categoryRegistrySeed";

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
  // Optimistically update the image in local state when an override fires
  useEffect(() => {
    const handler = (e: any) => {
      const { imageKey, url } = e.detail || {};
      if (!imageKey) return;
      setCategories(prev =>
        prev.map(cat =>
          cat.imageKey === imageKey ? { ...cat, image: url || "" } : cat
        )
      );
    };
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
        const { data: dbRows, error: fetchError } = await supabase
          .from("category_registry" as any)
          .select("*")
          .eq("page", page)
          .eq("is_active", true)
          .contains("genders", [dbGender])
          .order("sort_order");

        const fallbackRows = CATEGORY_REGISTRY_SEED.filter(
          (row) => row.page === page && row.is_active && row.genders?.includes(dbGender),
        );
        const rows = ((dbRows as any[])?.length ? dbRows : fallbackRows) as any[];

        if (fetchError && rows.length === 0) throw fetchError;
        if (cancelled) return;

        if (rows.length === 0) {
          setCategories([]);
          setLoading(false);
          return;
        }

        if (cancelled) return;

        // Fetch all image URLs for this page from category_images table
        const keys = Array.from(new Set(rows.map((r: any) => r.key).filter(Boolean)));
        const { data: imageRows } = await supabase
          .from("category_images")
          .select("category_key, image_url")
          .in("category_key", keys);
        const imageMap: Record<string, string> = {};
        for (const row of imageRows || []) {
          imageMap[row.category_key] = row.image_url;
        }

        const items: CategoryItem[] = rows.map((r: any) => {
          const imageKey: string = r.key || "";
          return {
            key: r.key,
            label: r.label,
            section: r.section,
            image: imageMap[imageKey] ?? "",
            imageKey,
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
