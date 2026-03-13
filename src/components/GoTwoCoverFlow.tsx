import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GoTwoCard from "@/components/ui/GoTwoCard";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
}

const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const DESKTOP_GAP = 190;
const MOBILE_GAP = 150;
const SCALE_STEP = 0.15;
const MAX_VISIBLE = 2;

const GoTwoCoverFlow = ({ items, onSelect }: GoTwoCoverFlowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (activeIndex < items.length - 1) setActiveIndex((i) => i + 1);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      onSelect(items[activeIndex].id);
    } else {
      setActiveIndex(index);
    }
  };

  // Only render cards within MAX_VISIBLE range
  const visibleItems = items
    .map((item, index) => ({ ...item, index }))
    .filter(({ index }) => Math.abs(index - activeIndex) <= MAX_VISIBLE);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Stage */}
      <div className="relative w-full overflow-hidden" style={{ height: 440 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {visibleItems.map(({ id, label, image, index }) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              return (
                <motion.div
                  key={id}
                  layout
                  initial={false}
                  animate={{
                    x: `calc(${offset} * var(--coverflow-gap))`,
                    scale: isActive ? 1 : Math.max(0.55, 1 - absOffset * SCALE_STEP),
                    opacity: isActive ? 1 : 0.5,
                    zIndex: items.length - absOffset,
                  }}
                  transition={SPRING}
                  className="absolute"
                  style={
                    {
                      "--coverflow-gap": `${MOBILE_GAP}px`,
                      ...(typeof window !== "undefined" && window.innerWidth >= 768
                        ? { "--coverflow-gap": `${DESKTOP_GAP}px` }
                        : {}),
                    } as React.CSSProperties
                  }
                >
                  <GoTwoCard
                    image={image}
                    label={label}
                    isActive={isActive}
                    onClick={() => handleCardClick(index)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-6 mt-4">
        {activeIndex > 0 && (
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {activeIndex < items.length - 1 && (
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GoTwoCoverFlow;
