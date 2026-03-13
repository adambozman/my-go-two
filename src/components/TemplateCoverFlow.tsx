import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductImage, getTemplateImage } from "@/lib/imageResolver";
import { CAROUSEL_LAYOUT, HEADER_LAYOUT } from "@/lib/carouselConfig";
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
  items: { id: string; name: string; image: string }[];
  onItemClick: (index: number) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  if (items.length === 0) return null;

  return (
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

          return (
            <motion.div
              key={item.id}
              animate={{
                x: offset * X_GAP,
                scale: isActive ? 1 : 0.7 - absOffset * 0.05,
                opacity: isActive ? 1 : CAROUSEL_LAYOUT.flankOpacity,
              }}
              transition={SPRING}
              className="absolute cursor-pointer"
              style={{ zIndex: 10 - absOffset }}
              onClick={() => {
                if (isActive) onItemClick(index);
                else setActiveIndex(index);
              }}
            >
              <div
                className={`overflow-hidden transition-shadow duration-300 ${
                  isActive ? "ring-2 ring-primary shadow-2xl" : ""
                }`}
                style={{
                  width: isActive ? CARD_W : FLANK_W,
                  height: isActive ? CARD_H : FLANK_H,
                  borderRadius: CAROUSEL_LAYOUT.borderRadius,
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="inline-block px-[14px] py-[6px] rounded-full text-white text-[13px] font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const TemplateCoverFlow = ({
  templateName,
  subtypes,
  subcategories,
  onBack,
  onSelect,
  creating,
  gender = "male",
}: TemplateCoverFlowProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const hasSubcategories = subcategories && subcategories.length > 0;

  const templateFallback = getTemplateImage(templateName, gender);
  const resolveImage = (id: string) => getProductImage(id, gender, templateFallback);

  // Level 3 — subcategory picker
  if (hasSubcategories && !activeSubcategory) {
    const items = subcategories.map((sc) => ({
      id: sc.id,
      name: sc.name,
      image: resolveImage(sc.id),
    }));

    return (
      <div className="max-w-5xl mx-auto relative">
        <div
          className="absolute z-20 flex items-center gap-3"
          style={{
            top: HEADER_LAYOUT.topOffset,
            transform: HEADER_LAYOUT.transform,
            left: HEADER_LAYOUT.leftMargin,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-6 w-6 p-0 hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
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

  // Level 4 — product / field picker
  const products = activeSubcategory ? activeSubcategory.products : subtypes;
  const breadcrumb = activeSubcategory ? `${templateName} › ${activeSubcategory.name}` : templateName;

  const productItems = products.map((p) => ({
    id: p.id,
    name: p.name,
    image: resolveImage(p.id),
  }));

  return (
    <div className="max-w-5xl mx-auto relative">
      <div
        className="absolute z-20 flex items-center gap-3"
        style={{
          top: HEADER_LAYOUT.topOffset,
          transform: HEADER_LAYOUT.transform,
          left: HEADER_LAYOUT.leftMargin,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (activeSubcategory) setActiveSubcategory(null);
            else onBack();
          }}
          className="h-6 w-6 p-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
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
