import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardEditButton from "@/components/CardEditButton";
import { useRegisterCarousel } from "@/contexts/CarouselDotsContext";
import type { SubcategoryGroup } from "@/data/templateSubtypes";
import { getProductImage } from "@/data/templateImageResolver";
import { CAROUSEL_LAYOUT, HEADER_LAYOUT } from "@/lib/carouselConfig";

export interface SubtypeItem {
  id: string;
  name: string;
  image: string;
  gender?: string[];
  fields: { label: string; type: "text" | "select"; value: string; options?: string[] }[];
}

interface TemplateCoverFlowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  initialSubcategoryId?: string;
  onBack: () => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  creating: boolean;
  gender?: string;
}

const CARD_W = CAROUSEL_LAYOUT.cardWidth;
const CARD_H = CAROUSEL_LAYOUT.cardHeight;
const FLANK_W = CAROUSEL_LAYOUT.flankWidth;
const FLANK_H = CAROUSEL_LAYOUT.flankHeight;
const X_GAP = CAROUSEL_LAYOUT.xGap;
const SPRING = CAROUSEL_LAYOUT.spring;

const CoverFlowCarousel = ({
  items,
  onItemClick,
}: {
  items: { id: string; name: string; image: string; subtitle?: string }[];
  onItemClick: (index: number, isActive: boolean) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));
  useRegisterCarousel(items.length, activeIndex, setActiveIndex);

  if (items.length === 0) return null;

  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className="relative w-full overflow-hidden" style={{ height: CAROUSEL_LAYOUT.stageHeight }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              let offset = index - activeIndex;
              const half = items.length / 2;
              if (offset > half) offset -= items.length;
              if (offset < -half) offset += items.length;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              if (absOffset > CAROUSEL_LAYOUT.maxVisibleOffset) return null;

              const xOffset = offset * X_GAP;
              const cardW = isActive ? CARD_W : FLANK_W;
              const cardH = isActive ? CARD_H : FLANK_H;
              const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
              const zIndex = 10 - absOffset;
              const blur = isActive ? 0 : CAROUSEL_LAYOUT.flankBlur;
              const opacity = isActive ? 1 : CAROUSEL_LAYOUT.flankOpacity;

              return (
                <motion.div
                  key={item.id}
                  animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                  transition={SPRING}
                  className="absolute cursor-pointer"
                  style={{ zIndex }}
                  onClick={() => {
                    if (isActive) {
                      onItemClick(index, true);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div
                    className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                      isActive ? "ring-2 ring-primary shadow-2xl" : ""
                    }`}
                    style={{ width: cardW, height: cardH }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <CardEditButton title={item.name} />
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="card-title leading-tight">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
};

const TemplateCoverFlow = ({ templateName, subtypes, subcategories, initialSubcategoryId, onBack, onSelect, creating, gender = "male" }: TemplateCoverFlowProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(() => {
    if (initialSubcategoryId && subcategories) {
      return subcategories.find(sc => sc.id === initialSubcategoryId) || null;
    }
    return null;
  });
  const hasSubcategories = subcategories && subcategories.length > 0;

  // Resolve images based on gender
  const resolveImage = (id: string, fallback: string) => getProductImage(id, gender, fallback);

  // If we have subcategories and none is selected, show subcategory picker
  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories.map((sc) => ({
      id: sc.id,
      name: sc.name,
      image: resolveImage(sc.id, sc.image),
      subtitle: `${sc.products.length} products`,
    }));

    return (
      <div className="max-w-5xl mx-auto relative">
        <div
          className="absolute z-20 flex items-center gap-2"
          style={{ top: HEADER_LAYOUT.topOffset, transform: HEADER_LAYOUT.transform, left: HEADER_LAYOUT.leftMargin - 16 }}
        >
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" style={{ color: "#2D6870" }} />
          </Button>
          <h1 className="section-header">{templateName}</h1>
        </div>

        <CoverFlowCarousel
          items={items}
          onItemClick={(index) => setActiveSubcategory(subcategories[index])}
        />
      </div>
    );
  }

  // Show products (either from subcategory or flat subtypes)
  const products = activeSubcategory ? activeSubcategory.products : subtypes;
  const breadcrumb = activeSubcategory ? `${templateName} › ${activeSubcategory.name}` : templateName;

  const productItems = products.map((p) => ({
    id: p.id,
    name: p.name,
    image: resolveImage(p.id, p.image),
    subtitle: `${p.fields.length} fields`,
  }));

  return (
    <div className="max-w-5xl mx-auto relative">
      <div
        className="absolute left-0 right-0 z-20 flex items-center gap-3 px-4"
        style={{ top: HEADER_LAYOUT.topOffset, transform: HEADER_LAYOUT.transform }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (activeSubcategory) {
              setActiveSubcategory(null);
            } else {
              onBack();
            }
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="section-header">{breadcrumb}</h1>
      </div>

      <CoverFlowCarousel
        items={productItems}
        onItemClick={(index) => onSelect(products[index], activeSubcategory?.name)}
      />
    </div>
  );
};

export default TemplateCoverFlow;
