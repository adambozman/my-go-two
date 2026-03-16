import { useState, useEffect, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { FORM_CAROUSEL_LAYOUT, FORM_CAROUSEL_LAYOUT_DESKTOP } from "@/lib/carouselConfig";

export interface FormCoverFlowItem {
  id: string;
  label: string;
  image?: string;
}

interface FormCoverFlowCarouselProps {
  items: FormCoverFlowItem[];
  activeIndex: number;
  previousImage?: string;
  onActiveIndexChange: (index: number) => void;
  renderActiveCard: (item: FormCoverFlowItem) => React.ReactNode;
}

const VISIBLE = 2;
const PILL_GAP = 20;

function useLayout() {
  const get = () => window.innerWidth >= 1024 ? FORM_CAROUSEL_LAYOUT_DESKTOP : FORM_CAROUSEL_LAYOUT;
  const [layout, setLayout] = useState(get);
  useEffect(() => {
    const handler = () => setLayout(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return layout;
}

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

const FALLBACK_GRADIENT = "linear-gradient(160deg, #2d6870 0%, #1e4a52 100%)";

const getFlankBackground = (image?: string) =>
  image ? `center / cover no-repeat url(${image})` : FALLBACK_GRADIENT;

const FormCoverFlowCarousel = forwardRef<HTMLDivElement, FormCoverFlowCarouselProps>(
  ({ items, activeIndex, previousImage, onActiveIndexChange, renderActiveCard }, ref) => {
    const touchStartX = useRef<number | null>(null);
    const layout = useLayout();
    const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = layout;
    const pills = (layout as any).pills as { w: number; h: number; r: number }[] | undefined;
    const n = items.length;

    useEffect(() => {
      if (n === 0) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") onActiveIndexChange((activeIndex - 1 + n) % n);
        if (e.key === "ArrowRight") onActiveIndexChange((activeIndex + 1) % n);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [activeIndex, n, onActiveIndexChange]);

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

              // Desktop pill path — identical to CoverFlowCarousel
              if (pills) {
                const pill = pills[Math.min(absOffset, pills.length - 1)];
                const x = getPillX(offset, pills);

                return (
                  <motion.div
                    key={`slot-${offset}`}
                    initial={false}
                    animate={{ x, zIndex: VISIBLE + 1 - absOffset, opacity: 1 }}
                    transition={spring}
                    className="absolute cursor-pointer"
                    style={{
                      width: pill.w,
                      height: pill.h,
                      borderRadius: pill.r,
                      boxShadow: isActive
                        ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                        : "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                    onClick={() => {
                      if (!isActive) onActiveIndexChange((activeIndex + offset + n) % n);
                    }}
                  >
                    <div
                      className="w-full h-full overflow-hidden relative"
                      style={{ borderRadius: pill.r }}
                    >
                      {/* Active card — render form content */}
                      {isActive ? (
                        <div className="absolute inset-0 overflow-hidden">
                          {renderActiveCard(item)}
                        </div>
                      ) : (
                        <>
                          {/* Flanking cards — use previous card image */}
                          <div className="absolute inset-0" style={{ background: getFlankBackground(previousImage || item.image) }} />
                          <div className="absolute bottom-6 left-6">
                            <span
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 16,
                                letterSpacing: "0.02em",
                                fontWeight: 600,
                                color: "#fff",
                                background: "rgba(255,255,255,0.18)",
                                borderRadius: 999,
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: "1px solid rgba(255,255,255,0.35)",
                                padding: "6px 18px",
                                display: "inline-block",
                              }}
                            >
                              {item.label}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              }

              // Mobile path — identical to CoverFlowCarousel
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
                  className="absolute cursor-pointer"
                  onClick={() => {
                    if (!isActive) onActiveIndexChange((activeIndex + offset + n) % n);
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      borderRadius,
                      boxShadow: isActive
                        ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                        : "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    {isActive ? (
                      <div className="absolute inset-0 overflow-hidden">
                        {renderActiveCard(item)}
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0" style={{ background: getFlankBackground(previousActiveItem?.image) }} />
                        <div className="absolute bottom-4 left-4">
                          <span
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: 13,
                              color: "#fff",
                              background: "rgba(255,255,255,0.18)",
                              borderRadius: 999,
                              backdropFilter: "blur(12px)",
                              border: "1px solid rgba(255,255,255,0.35)",
                              padding: "4px 14px",
                              display: "inline-block",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

FormCoverFlowCarousel.displayName = "FormCoverFlowCarousel";

export default FormCoverFlowCarousel;
