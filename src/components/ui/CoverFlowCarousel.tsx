import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CAROUSEL_LAYOUT, CAROUSEL_LAYOUT_DESKTOP } from "@/lib/carouselConfig";
import GoTwoCard from "@/components/ui/GoTwoCard";

export interface CoverFlowItem {
  id: string;
  label: string;
  image: string;
}

interface CoverFlowCarouselProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
  layoutOverride?: typeof CAROUSEL_LAYOUT;
}

const VISIBLE = 2;

function useLayout() {
  const get = () => window.innerWidth >= 768 ? CAROUSEL_LAYOUT_DESKTOP : CAROUSEL_LAYOUT;
  const [layout, setLayout] = useState(get);
  useEffect(() => {
    const handler = () => setLayout(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return layout;
}

// Compute x position for each slot when per-offset pill sizes are defined
function getXFromPills(offset: number, pills: { w: number; h: number; r: number }[], gap: number): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = pills[Math.min(i, pills.length - 1)];
    const b = pills[Math.min(i + 1, pills.length - 1)];
    x += a.w / 2 + gap + b.w / 2;
  }
  return x * dir;
}

const PILL_GAP = 20; // spacing between cards

const CoverFlowCarousel = ({ items, onSelect, layoutOverride }: CoverFlowCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const defaultLayout = useLayout();
  const layout = layoutOverride ?? defaultLayout;
  const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = layout;
  const n = items.length;
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + n) % n);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % n);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [n]);

  if (n === 0) return null;

  const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) setActiveIndex((i) => (i + 1) % n);
          else setActiveIndex((i) => (i - 1 + n) % n);
        }
        touchStartX.current = null;
      }}
    >
      {/* Stage — shifted down slightly */}
      <div className="relative w-full" style={{ height: stageHeight, marginTop: 16 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {slots.map((offset) => {
            const itemIndex = (activeIndex + offset + n) % n;
            const item = items[itemIndex];
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            const pills = (layout as any).pills;
            const pill = pills ? pills[Math.min(absOffset, pills.length - 1)] : null;
            const w = pill ? pill.w : cardWidth;
            const h = pill ? pill.h : (isActive ? cardHeight : cardHeight * 0.6);
            const r = pill ? pill.r : borderRadius;
            const x = pills ? getXFromPills(offset, pills, PILL_GAP) : offset * xGap;

            return (
              <motion.div
                key={`slot-${offset}`}
                initial={false}
                animate={{
                  x,
                  scale: pill ? 1 : (isActive ? 1 : 0.6),
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
                  cardWidth={w}
                  cardHeight={h}
                  borderRadius={r}
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
    </div>
  );
};

export default CoverFlowCarousel;
