import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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

const {
  cardWidth,
  cardHeight,
  flankWidth,
  flankHeight,
  xGap,
  stageHeight,
  maxVisibleOffset,
  flankOpacity,
  borderRadius,
  spring,
} = CAROUSEL_LAYOUT;

// Fix 3: Finite-list carousel — no circular wrapping math, clean linear offsets
const CoverFlowCarousel = ({
  items,
  onItemClick,
}: {
  items: { id: string; name: string; image: string }[];
  onItemClick: (index: number) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  if (items.length === 0) return null;

  const handlePrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setActiveIndex((i) => Math.min(items.length - 1, i + 1));

  const visibleItems = items
    .map((item, index) => ({ ...item, index }))
    .filter(({ index }) => Math.abs(index - activeIndex) <= maxVisibleOffset);

  return (
    <div className="relative w-full" style={{ height: stageHeight }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {visibleItems.map(({ id, name, image, index }) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            return (
              <motion.div
                key={id}
                layout
                initial={false}
                animate={{
                  x: offset * xGap,
                  scale: isActive ? 1 : 0.6,
                  opacity: isActive ? 1 : flankOpacity,
                  zIndex: items.length - absOffset,
                }}
                transition={spring}
                className="absolute cursor-pointer"
                onClick={() => {
                  if (isActive) onItemClick(index);
                  else setActiveIndex(index);
                }}
              >
                {/* Fix 5: Use CAROUSEL_LAYOUT dimensions, matching GoTwoCard */}
                <div
                  className="overflow-hidden"
                  style={{
                    width: isActive ? cardWidth : flankWidth,
                    height: isActive ? cardHeight : flankHeight,
                    borderRadius,
                    boxShadow: isActive
                      ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                      : "0 4px 16px rgba(0,0,0,0.12)",
                    transition: "width 0.3s, height 0.3s",
                  }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div
                        className="px-[14px] py-[6px] rounded-full text-white text-[13px] font-semibold"
                        style={{
                          background: "rgba(255,255,255,0.18)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.25)",
                        }}
                      >
                        {name}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div
        className="absolute flex items-center gap-6"
        style={{ bottom: 0, left: "50%", transform: "translateX(-50%)" }}
      >
        {activeIndex > 0 && (
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {activeIndex < items.length - 1 && (
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
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
      name: sc.name,
      image: resolveImage(sc.id),
    }));

    return (
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute z-20 flex items-center gap-3" style={headerStyle}>
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

  // Level 3b / Level 4 — product picker
  const products = activeSubcategory ? activeSubcategory.products : subtypes;
  const breadcrumb = activeSubcategory
    ? `${templateName} › ${activeSubcategory.name}`
    : templateName;

  const productItems = products.map((p) => ({
    id: p.id,
    name: p.name,
    image: resolveImage(p.id),
  }));

  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="absolute z-20 flex items-center gap-3" style={headerStyle}>
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
