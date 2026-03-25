import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";
import { useCategoryImageMap } from "@/features/mygotwo/useCategoryImageMap";
import WebPaginatedCoverflow from "@/platform-ui/web/mygotwo/WebPaginatedCoverflow";
import { WEB_MYGOTWO_STAGE_SHELL_CLASS } from "@/platform-ui/web/mygotwo/webMyGoTwo.layout";

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
  const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;

  const allKeys: string[] = [];
  if (hasSubcategories && !activeSubcategory) {
    subcategories!.forEach((subcategory) => allKeys.push(subcategory.image || subcategory.id));
  } else {
    products.forEach((product) => allKeys.push(product.image || product.id));
  }

  const imageMap = useCategoryImageMap(allKeys);

  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories!.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.name,
      image: imageMap[subcategory.image || subcategory.id] || "",
      imageKey: subcategory.image || subcategory.id,
    }));

    return (
      <div className={WEB_MYGOTWO_STAGE_SHELL_CLASS}>
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

  const productItems = products.map((product) => ({
    id: product.id,
    label: product.name,
    image: imageMap[product.image || product.id] || "",
    imageKey: product.image || product.id,
  }));

  return (
    <div className={WEB_MYGOTWO_STAGE_SHELL_CLASS}>
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
