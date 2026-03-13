import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

export interface CoverFlowItem {
  id: string;
  label: string;
  image: string;
}

interface CoverFlowCarouselProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
}

const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = CAROUSEL_LAYOUT;
const VISIBLE = 2;

const CoverFlowCarousel = ({ items, onSelect }: CoverFlowCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = items.length;
  if (n === 0) return null;

  const handlePrev = () => setActiveIndex((i) => (i - 1 + n) % n);
  const handleNext = () => setActiveIndex((i) => (i + 1) % n);
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
                  scale: isActive ? 1 : 0.6,
                  opacity: isActive ? 1 : flankOpacity,
                  zIndex: VISIBLE + 1 - absOffset,
                }}
                transition={spring}
                className="absolute cursor-pointer"
                onClick={() => {
                  if (isActive) onSelect(item.id);
                  else setActiveIndex((activeIndex + offset + n) % n);
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius,
                    boxShadow: isActive
                      ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                      : "0 4px 16px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="relative w-full h-full">
                    {item.image ? (
                      <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #c8bfb4 0%, #a89d92 100%)" }} />
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="px-3 py-1 rounded-full text-white text-[13px] font-semibold block"
                        style={{
                          background: "rgba(45,104,112,0.45)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors" aria-label="Previous">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={handleNext} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoverFlowCarousel;
