import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SubcategoryGroup } from "@/data/templateSubtypes";
import { getProductImage } from "@/data/templateImageResolver";

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
  onBack: () => void;
  onSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
  creating: boolean;
  gender?: string;
}

const CoverFlowCarousel = ({
  items,
  onItemClick,
}: {
  items: { id: string; name: string; image: string; subtitle?: string }[];
  onItemClick: (index: number, isActive: boolean) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  if (items.length === 0) return null;

  const goLeft = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={goLeft}
          className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="relative w-full h-[340px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              let offset = index - activeIndex;
              const half = items.length / 2;
              if (offset > half) offset -= items.length;
              if (offset < -half) offset += items.length;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              if (absOffset > 2) return null;

              const xOffset = offset * 180;
              const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
              const zIndex = 10 - absOffset;
              const blur = isActive ? 0 : 2;
              const opacity = isActive ? 1 : 0.5;

              return (
                <motion.div
                  key={item.id}
                  animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                    style={{ width: 220, height: 300 }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="card-title leading-tight">
                          {item.name}
                        </h3>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-white/70 mt-1"
                          >
                            {item.subtitle || "Tap to start"}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goRight}
          className="absolute right-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Active item info */}
      <div className="text-center mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[activeIndex].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-xl font-bold text-primary">{items[activeIndex].name}</h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

const TemplateCoverFlow = ({ templateName, subtypes, subcategories, onBack, onSelect, creating, gender = "male" }: TemplateCoverFlowProps) => {
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-5xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">{templateName}</h1>
        </div>
        <p className="text-muted-foreground text-center mb-6 text-sm">Choose a category</p>
        <CoverFlowCarousel
          items={items}
          onItemClick={(index) => setActiveSubcategory(subcategories[index])}
        />
      </motion.div>
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
    <motion.div
      key={activeSubcategory?.id || "flat"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl"
    >
      <div className="flex items-center gap-3 mb-8">
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
        <h1 className="text-2xl font-bold text-primary">{breadcrumb}</h1>
      </div>
      <p className="text-muted-foreground text-center mb-6 text-sm">Choose a product to get started</p>
      <CoverFlowCarousel
        items={productItems}
        onItemClick={(index) => onSelect(products[index], activeSubcategory?.name)}
      />
    </motion.div>
  );
};

export default TemplateCoverFlow;