import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useCategoryImageMap } from "@/features/mygotwo/useCategoryImageMap";
import MobileCardCoverflow from "@/platform-ui/mobile/mygotwo/MobileCardCoverflow";

interface MobileTemplateCoverflowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  activeSubcategory: SubcategoryGroup | null;
  onSubcategorySelect: (subcategory: SubcategoryGroup) => void;
  onBack?: () => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  focusedSubcategoryId?: string | null;
  focusedLeafItemId?: string | null;
}

export default function MobileTemplateCoverflow({
  templateName,
  subtypes,
  subcategories,
  activeSubcategory,
  onSubcategorySelect,
  onBack,
  onSelect,
  focusedSubcategoryId,
  focusedLeafItemId,
}: MobileTemplateCoverflowProps) {
  const hasSubcategories = Boolean(subcategories && subcategories.length > 0);
  const allKeys: string[] = [];

  if (hasSubcategories && !activeSubcategory) {
    subcategories!.forEach((subcategory) => allKeys.push(subcategory.image || subcategory.id));
  } else {
    const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;
    products.forEach((product) => allKeys.push((product as { image?: string }).image || product.id));
  }

  const imageMap = useCategoryImageMap(allKeys);

  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories!.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.name,
      image: imageMap[subcategory.image || subcategory.id] || "",
      imageKey: subcategory.image || subcategory.id,
    }));
    const activeIndex = Math.max(0, items.findIndex((item) => item.id === focusedSubcategoryId));

    return (
      <div className="coverflow-stage-shell">
        <CoverflowTitlePill title={templateName} showBackArrow={Boolean(onBack)} onBack={onBack} />
        <MobileCardCoverflow
          items={items}
          initialActiveIndex={activeIndex}
          onSelect={(id) => {
            const selectedSubcategory = subcategories!.find((subcategory) => subcategory.id === id);
            const selectedItem = items.find((item) => item.id === id);
            if (selectedSubcategory) {
              onSubcategorySelect({
                ...selectedSubcategory,
                image: selectedItem?.image || selectedSubcategory.image,
              });
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
    image: imageMap[(product as { image?: string }).image || product.id] || "",
    imageKey: (product as { image?: string }).image || product.id,
  }));
  const activeIndex = Math.max(0, productItems.findIndex((item) => item.id === focusedLeafItemId));

  return (
    <div className="coverflow-stage-shell">
      <CoverflowTitlePill
        title={activeSubcategory?.name || templateName}
        showBackArrow={Boolean(onBack)}
        onBack={onBack}
      />
      <MobileCardCoverflow
        items={productItems}
        initialActiveIndex={activeIndex}
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
