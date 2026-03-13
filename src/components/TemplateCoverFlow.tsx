import { useState } from "react";
import { getProductImage, getTemplateImage } from "@/lib/imageResolver";
import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";

export type { SubtypeItem, SubcategoryGroup };

interface TemplateCoverFlowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  onBack: () => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  creating: boolean;
  gender?: string;
}

const TemplateCoverFlow = ({
  templateName,
  subtypes,
  subcategories,
  onSelect,
  gender = "non-binary",
}: TemplateCoverFlowProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const hasSubcategories = subcategories && subcategories.length > 0;

  const templateFallback = getTemplateImage(templateName, gender);
  const resolveImage = (id: string) => getProductImage(id, gender, templateFallback);

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
            if (sc) setActiveSubcategory(sc);
          }}
        />
      </div>
    );
  }

  const products = activeSubcategory ? (activeSubcategory.products ?? []) : subtypes;

  if (activeSubcategory && products.length === 0 && (activeSubcategory as any).fields) {
    onSelect(activeSubcategory as unknown as SubtypeItem, templateName);
    return null;
  }

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
