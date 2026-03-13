import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GoTwoCard from "@/components/ui/GoTwoCard";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
}

const { xGap, stageHeight, flankOpacity, spring } = CAROUSEL_LAYOUT;
const SCALE_ACTIVE = 1;
const SCALE_FLANK = 0.6;
const VISIBLE = 2;

const GoTwoCoverFlow = ({ items, onSelect }: GoTwoCoverFlowProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = items.length;

  const handlePrev = () => setActiveIndex((i) => (i - 1 + n) % n);
  const handleNext = () => setActiveIndex((i) => (i + 1) % n);

  const handleCardClick = (offset: number) => {
    if (offset === 0) {
      onSelect(items[activeIndex].id);
    } else {
      setActiveIndex((activeIndex + offset + n) % n);
    }
  };

  const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full overflow-hidden" style={{ height: stageHeight }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {slots.map((offset) => {
            const itemIndex = (activeIndex + offset + n) % n;
            const item = items[itemIndex];
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: offset * xGap,
                  scale: isActive ? SCALE_ACTIVE : SCALE_FLANK,
                  opacity: isActive ? 1 : flankOpacity,
                  zIndex: VISIBLE + 1 - absOffset,
                }}
                transition={spring}
                className="absolute"
              >
                <GoTwoCard
                  image={item.image}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => handleCardClick(offset)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GoTwoCoverFlow;
