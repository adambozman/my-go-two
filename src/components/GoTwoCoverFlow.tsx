import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GoTwoCard from "@/components/ui/GoTwoCard";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
}

const { xGap, stageHeight, maxVisibleOffset, flankOpacity, spring } = CAROUSEL_LAYOUT;
const SCALE_ACTIVE = 1;
const SCALE_FLANK = 0.6;
// Label sits above card — add its height + margin so it doesn't clip
const LABEL_HEIGHT = 32;

const GoTwoCoverFlow = ({ items, onSelect }: GoTwoCoverFlowProps) => {
  // Fix 1: Start centered, not at index 0
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  const handlePrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setActiveIndex((i) => Math.min(items.length - 1, i + 1));

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      onSelect(items[activeIndex].id);
    } else {
      setActiveIndex(index);
    }
  };

  const visibleItems = items
    .map((item, index) => ({ ...item, index }))
    .filter(({ index }) => Math.abs(index - activeIndex) <= maxVisibleOffset);

  const activeLabel = items[activeIndex]?.label ?? "";

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Centered title above active card */}
      <p
        className="text-center font-semibold mb-3 truncate"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18,
          letterSpacing: "0.03em",
          color: "var(--swatch-teal)",
          height: LABEL_HEIGHT,
          lineHeight: `${LABEL_HEIGHT}px`,
        }}
      >
        {activeLabel}
      </p>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: stageHeight }}
      >
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
                    // Fix 2: numeric pixels, not CSS variable — Framer Motion can animate these
                    x: offset * xGap,
                    scale: isActive ? SCALE_ACTIVE : SCALE_FLANK,
                    opacity: isActive ? 1 : flankOpacity,
                    zIndex: items.length - absOffset,
                  }}
                  transition={spring}
                  className="absolute"
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

      {/* Navigation */}
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
