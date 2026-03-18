import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import PaginatedCoverFlow from "@/components/PaginatedCoverFlow";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";

export type { SubtypeItem, SubcategoryGroup };

interface TemplateCoverFlowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  activeSubcategory: SubcategoryGroup | null;
  onSubcategorySelect: (sc: SubcategoryGroup) => void;
  onBack?: () => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  creating: boolean;
  gender: string;
  section?: string;
  categoryId?: string;
  focusedItemId?: string | null;
}

/** Hook to batch-fetch images from category_images for a list of keys */
function useImageMap(keys: string[]) {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (keys.length === 0) return;
    supabase
      .from("category_images")
      .select("category_key, image_url")
      .in("category_key", keys)
      .then(({ data }) => {
        const map: Record<string, string> = {};
        for (const row of data || []) map[row.category_key] = row.image_url;
        setImageMap(map);
      });
  }, [keys.join(",")]);

  // Listen for override changes
  useEffect(() => {
    const handler = (e: any) => {
      const { imageKey, url } = e.detail || {};
      if (imageKey) {
        setImageMap(prev => ({ ...prev, [imageKey]: url || "" }));
      }
    };
    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, []);

  return imageMap;
}

const TemplateCoverFlow = ({
  templateName,
  subtypes,
  subcategories,
  activeSubcategory,
  onSubcategorySelect,
  onSelect,
  focusedItemId,
}: TemplateCoverFlowProps) => {
  const hasSubcategories = subcategories && subcategories.length > 0;

  // Collect all image keys we need
  const allKeys: string[] = [];
  if (hasSubcategories && !activeSubcategory) {
    subcategories!.forEach(sc => allKeys.push(sc.image || sc.id));
  } else {
    const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;
    products.forEach(p => allKeys.push((p as any).image || p.id));
  }

  const imageMap = useImageMap(allKeys);

  // Level 3 — subcategory picker
  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories!.map(sc => ({
      id: sc.id,
      label: sc.name,
      image: imageMap[sc.image || sc.id] || "",
      imageKey: sc.image || sc.id,
    }));
    return (
      <div className="coverflow-stage-shell">
        <div className="coverflow-stage-title-wrap">
          <h2 className="section-header coverflow-stage-title text-center">{templateName}</h2>
        </div>
        <PaginatedCoverFlow
          items={items}
          focusedItemId={focusedItemId}
          onSelect={(id) => {
            const sc = subcategories!.find(s => s.id === id);
            const selectedItem = items.find((item) => item.id === id);
            if (sc) onSubcategorySelect({ ...sc, image: selectedItem?.image || sc.image });
          }}
        />
      </div>
    );
  }

  // Level 4 — product picker
  const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;
  const productItems = products.map(p => ({
    id: p.id,
    label: p.name,
    image: imageMap[(p as any).image || p.id] || "",
    imageKey: (p as any).image || p.id,
  }));

  return (
    <div className="coverflow-stage-shell">
      <div className="coverflow-stage-title-wrap">
        <h2 className="section-header coverflow-stage-title text-center">{activeSubcategory?.name || templateName}</h2>
      </div>
      <PaginatedCoverFlow
        items={productItems}
        focusedItemId={focusedItemId}
        onSelect={(id) => {
          const p = products.find(x => x.id === id);
          const selectedItem = productItems.find((item) => item.id === id);
          if (p) onSelect({ ...p, image: selectedItem?.image || p.image }, activeSubcategory?.name);
        }}
      />
    </div>
  );
};

export default TemplateCoverFlow;
