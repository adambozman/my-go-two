import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";
import WebPaginatedCoverflow from "@/platform-ui/web/mygotwo/WebPaginatedCoverflow";

interface WebTemplateCoverFlowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  activeSubcategory: SubcategoryGroup | null;
  onSubcategorySelect: (sc: SubcategoryGroup) => void;
  onBack?: () => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  focusedSubcategoryId?: string | null;
  focusedLeafItemId?: string | null;
}

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

export default function WebTemplateCoverFlow({
  templateName,
  subtypes,
  subcategories,
  activeSubcategory,
  onSubcategorySelect,
  onBack,
  onSelect,
  focusedSubcategoryId,
  focusedLeafItemId,
}: WebTemplateCoverFlowProps) {
  const hasSubcategories = Boolean(subcategories && subcategories.length > 0);

  const allKeys: string[] = [];
  if (hasSubcategories && !activeSubcategory) {
    subcategories!.forEach((subcategory) => allKeys.push(subcategory.image || subcategory.id));
  } else {
    const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;
    products.forEach((product) => allKeys.push((product as any).image || product.id));
  }

  const imageMap = useImageMap(allKeys);

  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories!.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.name,
      image: imageMap[subcategory.image || subcategory.id] || "",
      imageKey: subcategory.image || subcategory.id,
    }));

    return (
      <div className="coverflow-stage-shell">
        <CoverflowTitlePill title={templateName} showBackArrow={Boolean(onBack)} onBack={onBack} />
        <WebPaginatedCoverflow
          items={items}
          focusedItemId={focusedSubcategoryId}
          onSelect={(id) => {
            const selectedSubcategory = subcategories!.find((subcategory) => subcategory.id === id);
            const selectedItem = items.find((item) => item.id === id);
            if (selectedSubcategory) {
              onSubcategorySelect({ ...selectedSubcategory, image: selectedItem?.image || selectedSubcategory.image });
            }
          }}
        />
      </div>
    );
  }

  const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;
  const productItems = products.map((product) => ({
    id: product.id,
    label: product.name,
    image: imageMap[(product as any).image || product.id] || "",
    imageKey: (product as any).image || product.id,
  }));

  return (
    <div className="coverflow-stage-shell">
      <CoverflowTitlePill
        title={activeSubcategory?.name || templateName}
        showBackArrow={Boolean(onBack)}
        onBack={onBack}
      />
      <WebPaginatedCoverflow
        items={productItems}
        focusedItemId={focusedLeafItemId}
        onSelect={(id) => {
          const selectedProduct = products.find((product) => product.id === id);
          const selectedItem = productItems.find((item) => item.id === id);
          if (selectedProduct) {
            onSelect({ ...selectedProduct, image: selectedItem?.image || selectedProduct.image }, activeSubcategory?.name);
          }
        }}
      />
    </div>
  );
}
