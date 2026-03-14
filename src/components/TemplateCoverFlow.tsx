import { getProductImage } from "@/lib/imageResolver";
import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";
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
}

const TemplateCoverFlow = ({
  subtypes,
  subcategories,
  activeSubcategory,
  onSubcategorySelect,
  onSelect,
  gender,
  section = "",
  categoryId = "",
}: TemplateCoverFlowProps) => {
  const hasSubcategories = subcategories && subcategories.length > 0;
  const resolveImage = (imageKey: string, subcategoryId = "") =>
    getProductImage(imageKey, gender, "", section, categoryId, subcategoryId);

  // Level 3 — subcategory picker (e.g. Tops, Bottoms / Asian, Italian)
  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories.map((sc) => ({
      id: sc.id,
      label: sc.name,
      image: resolveImage(sc.image || sc.id, sc.id),
    }));

    return (
      <div className="h-full flex items-center justify-center">
        <CoverFlowCarousel
          items={items}
          onSelect={(id) => {
            const sc = subcategories.find((s) => s.id === id);
            if (sc) {
              // If subcategory has products, drill into them
              if (sc.products && sc.products.length > 0) {
                onSubcategorySelect(sc);
              } else {
                // Subcategory IS the final card — go straight to form
                onSelect(sc as unknown as SubtypeItem, sc.name);
              }
            }
          }}
        />
      </div>
    );
  }

  // Level 4 — product picker (e.g. T-Shirt, Jeans)
  const products = activeSubcategory
    ? (activeSubcategory.products ?? [])
    : subtypes;

  const productItems = products.map((p) => ({
    id: p.id,
    label: p.name,
    image: resolveImage((p as any).image || p.id, activeSubcategory?.id || ""),
  }));

  return (
    <div className="h-full flex items-center justify-center">
      <CoverFlowCarousel
        items={productItems}
        onSelect={(id) => {
          const p = products.find((x) => x.id === id);
          if (p) onSelect(p, activeSubcategory?.name);
        }}
      />
    </div>
  );
};

export default TemplateCoverFlow;
