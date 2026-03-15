import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CAROUSEL_LAYOUT, CAROUSEL_LAYOUT_DESKTOP } from "@/lib/carouselConfig";

export interface FormCoverFlowItem {
  id: string;
  label: string;
}

interface FormCoverFlowCarouselProps {
  items: FormCoverFlowItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  renderActiveCard: (item: FormCoverFlowItem) => React.ReactNode;
}

const VISIBLE = 2;
const PILL_GAP = 20;

const getLayout = () =>
  window.innerWidth >= 1024 ? CAROUSEL_LAYOUT_DESKTOP : CAROUSEL_LAYOUT;

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

const FormCoverFlowCarousel = ({
  items,
  activeIndex,
  onActiveIndexChange,
  renderActiveCard,
}: FormCoverFlowCarouselProps) => {
  const touchStartX = useRef<number | null>(null);
  const layout = getLayout();
  const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = layout;
  const pills = (layout as any).pills as { w: number; h: number; r: number }[] | undefined;

  const n = items.length;
  if (n === 0) return null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onActiveIndexChange((activeIndex - 1 + n) % n);
      if (e.key === "ArrowRight") onActiveIndexChange((activeIndex + 1) % n);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, n, onActiveIndexChange]);

  const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) onActiveIndexChange((activeIndex + 1) % n);
          else onActiveIndexChange((activeIndex - 1 + n) % n);
        }
        touchStartX.current = null;
      }}
    >
      <div className="relative w-full" style={{ height: stageHeight, marginTop: 16 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {slots.map((offset) => {
            const itemIndex = (activeIndex + offset + n) % n;
            const item = items[itemIndex];
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            if (pills) {
              const pill = pills[Math.min(absOffset, pills.length - 1)];
              const x = getPillX(offset, pills);

              return (
                <motion.div
                  key={`slot-${offset}`}
                  initial={false}
                  animate={{ x, zIndex: VISIBLE + 1 - absOffset, opacity: 1 }}
                  transition={spring}
                  className="absolute"
                  style={{
                    width: pill.w,
                    height: pill.h,
                    borderRadius: pill.r,
                    boxShadow: isActive
                      ? "0 0 24px 6px hsl(var(--primary) / 0.3), 0 8px 32px hsl(var(--foreground) / 0.18)"
                      : "0 4px 16px hsl(var(--foreground) / 0.12)",
                  }}
                  onClick={() => {
                    if (!isActive) onActiveIndexChange((activeIndex + offset + n) % n);
                  }}
                >
                  {isActive ? (
                    <div className="w-full h-full rounded-[inherit] overflow-hidden bg-card">
                      {renderActiveCard(item)}
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-[inherit] bg-card/80 border border-border/40 flex items-end p-3 cursor-pointer">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium truncate max-w-full bg-muted/70 text-foreground"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            }

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
                <div
                  className="border border-border/40 bg-card"
                  style={{ width: cardWidth, height: cardHeight, borderRadius }}
                  onClick={() => {
                    if (!isActive) onActiveIndexChange((activeIndex + offset + n) % n);
                  }}
                >
                  {isActive ? (
                    renderActiveCard(item)
                  ) : (
                    <div className="w-full h-full flex items-end p-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium truncate max-w-full bg-muted/70 text-foreground"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormCoverFlowCarousel;
