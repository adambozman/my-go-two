import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";
import GoTwoCard from "@/components/ui/GoTwoCard";

export interface CoverFlowItem {
  id: string;
  label: string;
  image: string;
}

interface CoverFlowCarouselProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
}

const { xGap, stageHeight, flankOpacity, spring } = CAROUSEL_LAYOUT;
const VISIBLE = 2;

const CoverFlowCarousel = ({ items, onSelect }: CoverFlowCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = items.length;
  if (n === 0) return null;

  const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

  return (
    <div className="relative w-full flex flex-col items-center" style={{ paddingTop: 48 }}>
      <div className="relative w-full" style={{ height: stageHeight }}>
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
                  scale: isActive ? 1 : 0.6,
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
                  onClick={() => {
                    if (isActive) onSelect(item.id);
                    else setActiveIndex((activeIndex + offset + n) % n);
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <button onClick={() => setActiveIndex((i) => (i - 1 + n) % n)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors" aria-label="Previous">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setActiveIndex((i) => (i + 1) % n)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoverFlowCarousel;
