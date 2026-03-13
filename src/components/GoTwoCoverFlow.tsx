import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import GoTwoCard from "@/components/ui/GoTwoCard";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
}

const SPRING = { type: "spring" as const, stiffness: 280, damping: 32 };

// Gap = active card width + desired peek amount for side cards
// Active card: 260px mobile / 300px desktop
// We want side cards to peek ~80px on mobile, ~100px on desktop
const MOBILE_GAP = 220; // 260 active - enough to show side card peeking
const DESKTOP_GAP = 260; // 300 active card width centered, side cards visible

const SCALE_STEP = 0.18;
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

  const visibleItems = items
    .map((item, index) => ({ ...item, index }))
    .filter(({ index }) => Math.abs(index - activeIndex) <= MAX_VISIBLE);

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Stage */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 460 }}
      >
        {/* Prev arrow — left side, vertically centered in stage */}
        {hasPrev && (
          <button
            onClick={handlePrev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            aria-label="Previous"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        )}

        {/* Cards centered in stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {visibleItems.map(({ id, label, image, index }) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              const gap = typeof window !== "undefined" && window.innerWidth >= 768
                ? DESKTOP_GAP
                : MOBILE_GAP;

              return (
                <motion.div
                  key={id}
                  layout
                  initial={false}
                  animate={{
                    x: offset * gap,
                    scale: isActive ? 1 : Math.max(0.55, 1 - absOffset * SCALE_STEP),
                    opacity: isActive ? 1 : Math.max(0.35, 0.65 - absOffset * 0.15),
                    zIndex: MAX_VISIBLE + 1 - absOffset,
                  }}
                  transition={SPRING}
                  className="absolute"
                  style={{ pointerEvents: isActive || absOffset === 1 ? "auto" : "none" }}
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

        {/* Next arrow — right side, vertically centered in stage */}
        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="flex items-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="transition-all duration-300"
              aria-label={`Go to item ${i + 1}`}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex ? "var(--swatch-teal)" : "var(--swatch-teal-mid)",
                  opacity: i === activeIndex ? 1 : 0.4,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoTwoCoverFlow;
