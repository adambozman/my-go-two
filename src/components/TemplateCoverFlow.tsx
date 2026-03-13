import { getProductImage, getTemplateImage } from "@/lib/imageResolver";
import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";

export type { SubtypeItem, SubcategoryGroup };

interface TemplateCoverFlowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  activeSubcategory: SubcategoryGroup | null;
  onSubcategorySelect: (sc: SubcategoryGroup) => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  creating: boolean;
  gender?: string;
}

const TemplateCoverFlow = ({
  templateName,
  subtypes,
  subcategories,
  activeSubcategory,
  onSubcategorySelect,
  onSelect,
  gender = "non-binary",
}: TemplateCoverFlowProps) => {
  const hasSubcategories = subcategories && subcategories.length > 0;
  const templateFallback = getTemplateImage(templateName, gender);
  const resolveImage = (id: string) => getProductImage(id, gender, templateFallback);

  // Level 3 — subcategory coverflow (e.g. Tops, Bottoms, Outerwear)
  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories.map((sc) => ({
      id: sc.id,
      label: sc.name,
      image: resolveImage(sc.id),
    }));

    return (
      <div className="h-full flex items-center justify-center">
        <CoverFlowCarousel
          items={items}
          onSelect={(id) => {
            const sc = subcategories.find((s) => s.id === id);
            if (sc) onSubcategorySelect(sc);
          }}
        />
      </div>
    );
  }

  // Level 4 — individual item coverflow (e.g. T-Shirt, Jeans)
  const products = activeSubcategory
    ? (activeSubcategory.products ?? [])
    : subtypes;

  const productItems = products.map((p) => ({
    id: p.id,
    label: p.name,
    image: resolveImage(p.id),
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
