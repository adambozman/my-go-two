import { useState, useEffect, useRef, forwardRef } from "react";
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
}

const VISIBLE = 2;

function useLayout() {
  const get = () => window.innerWidth >= 1024 ? CAROUSEL_LAYOUT_DESKTOP : CAROUSEL_LAYOUT;
  const [layout, setLayout] = useState(get);
  useEffect(() => {
    const handler = () => setLayout(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return layout;
}

const PILL_GAP = 20;

function getPillX(offset: number, pills: { w: number; h: number; r: number }[]): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = pills[Math.min(i, pills.length - 1)];
    const b = pills[Math.min(i + 1, pills.length - 1)];
    x += a.w / 2 + PILL_GAP + b.w / 2;
  }
  return x * dir;
}

const CoverFlowCarousel = forwardRef<HTMLDivElement, CoverFlowCarouselProps>(
  ({ items, onSelect }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const layout = useLayout();
    const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = layout;
    const pills = (layout as any).pills as { w: number; h: number; r: number }[] | undefined;
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
        ref={ref}
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
        {/* Stage */}
        <div className="relative w-full" style={{ height: stageHeight, marginTop: 16 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {slots.map((offset) => {
              const itemIndex = (activeIndex + offset + n) % n;
              const item = items[itemIndex];
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              // Desktop pill path
              if (pills) {
                const pill = pills[Math.min(absOffset, pills.length - 1)];
                const x = getPillX(offset, pills);
                return (
                  <motion.div
                    key={`slot-${offset}`}
                    initial={false}
                    animate={{ x, zIndex: VISIBLE + 1 - absOffset, opacity: 1 }}
                    transition={spring}
                    className="absolute overflow-hidden cursor-pointer"
                    style={{
                      width: pill.w, height: pill.h, borderRadius: pill.r,
                      boxShadow: isActive
                        ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                        : "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                    onClick={() => {
                      if (isActive) onSelect(item.id);
                      else setActiveIndex((activeIndex + offset + n) % n);
                    }}
                  >
                    <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    {isActive && (
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="px-3 py-1 font-semibold truncate block"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 15,
                            letterSpacing: "0.02em",
                            color: "#fff",
                            background: "rgba(255,255,255,0.18)",
                            borderRadius: 999,
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.35)",
                            maxWidth: 220,
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              }

              // Mobile/tablet path — completely untouched
              return (
                <motion.div
                  key={`slot-${offset}`}
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
                    cardWidth={cardWidth}
                    cardHeight={cardHeight}
                    borderRadius={borderRadius}
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
  }
);

CoverFlowCarousel.displayName = "CoverFlowCarousel";

export default CoverFlowCarousel;
