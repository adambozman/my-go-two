import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductImage, getTemplateImage } from "@/lib/imageResolver";
import { HEADER_LAYOUT } from "@/lib/carouselConfig";
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
  onBack,
  onSelect,
  gender = "non-binary",
}: TemplateCoverFlowProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const hasSubcategories = subcategories && subcategories.length > 0;

  const templateFallback = getTemplateImage(templateName, gender);
  const resolveImage = (id: string) => getProductImage(id, gender, templateFallback);

  const headerStyle = {
    top: HEADER_LAYOUT.topOffset,
    transform: HEADER_LAYOUT.transform,
    left: HEADER_LAYOUT.leftMargin,
  };

  // Level 3a — subcategory picker
  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories.map((sc) => ({
      id: sc.id,
      label: sc.name,
      image: resolveImage(sc.id),
    }));

    return (
      <div className="max-w-5xl mx-auto relative" style={{ paddingTop: 100 }}>
        <div className="absolute z-20 flex items-center gap-3" style={headerStyle}>
          <Button variant="ghost" size="icon" onClick={onBack} className="h-6 w-6 p-0 hover:bg-transparent">
            <ArrowLeft className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
          </Button>
          <h1 className="section-header">{templateName}</h1>
        </div>
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
  const breadcrumb = activeSubcategory ? `${templateName} › ${activeSubcategory.name}` : templateName;

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
    <div className="max-w-5xl mx-auto relative" style={{ paddingTop: 100 }}>
      <div className="absolute z-20 flex items-center gap-3" style={headerStyle}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { if (activeSubcategory) setActiveSubcategory(null); else onBack(); }}
          className="h-6 w-6 p-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
        </Button>
        <h1 className="section-header">{breadcrumb}</h1>
      </div>
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
