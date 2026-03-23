import { useState, useEffect, useRef, forwardRef, useReducer } from "react";
import { motion } from "framer-motion";
import { CAROUSEL_LAYOUT, CAROUSEL_LAYOUT_DESKTOP } from "@/lib/carouselConfig";
import GoTwoCard from "@/components/ui/GoTwoCard";
import { Pill } from "@/components/ui/pill";
import InlinePhotoSearch from "@/components/InlinePhotoSearch";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";

export interface CoverFlowItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
}

interface CoverFlowCarouselProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
  initialActiveIndex?: number;
  sectionTitle?: string;
}

const VISIBLE = 2;
function useLayout() {
  const get = () => {
    if (window.innerWidth >= 1024) {
      return CAROUSEL_LAYOUT_DESKTOP;
    }
    return CAROUSEL_LAYOUT;
  };
  const [layout, setLayout] = useState(get);
  useEffect(() => {
    const handler = () => setLayout(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return layout;
}

const PILL_GAP = 20;
const FALLBACK_GRAY_BG = "linear-gradient(160deg, #c3c5c8 0%, #9ea2a8 100%)";

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
  ({ items, onSelect, initialActiveIndex = 0, sectionTitle }, ref) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [, forceImages] = useReducer(x => x + 1, 0);

    // Re-render when any image override changes
    useEffect(() => {
      const handler = () => forceImages();
      window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
      return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
    }, []);
    const layout = useLayout();
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = layout;
    const pills = (layout as any).pills as { w: number; h: number; r: number }[] | undefined;
    const n = items.length;
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    // Keyboard navigation
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + n) % n);
        if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % n);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [n]);

    useEffect(() => {
      setActiveIndex((prev) => {
        if (n === 0) return 0;
        const normalized = ((initialActiveIndex % n) + n) % n;
        return prev === normalized ? prev : normalized;
      });
    }, [initialActiveIndex, n]);

    if (n === 0) return null;

    const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

    return (
      <div
        ref={ref}
        className="relative w-full flex flex-col items-center"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; touchStartY.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || touchStartY.current === null) return;
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          const dy = touchStartY.current - e.changedTouches[0].clientY;
          // Only handle horizontal swipes — ignore if vertical movement is greater
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx > 0) setActiveIndex((i) => (i + 1) % n);
            else setActiveIndex((i) => (i - 1 + n) % n);
          }
          touchStartX.current = null;
          touchStartY.current = null;
        }}
      >
        {/* Stage */}
        <div
          className="relative w-full"
          style={{
            height: stageHeight,
            marginTop: isDesktop
              ? 44
              : 24,
          }}
        >
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
                    className="absolute cursor-pointer"
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
                    <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: pill.r }}>
                      <div className="absolute inset-0" style={{ background: FALLBACK_GRAY_BG }} />
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : null}
                    </div>
                    {isActive && (
                      <>
                        <div className="absolute bottom-6 left-6 flex flex-col items-start gap-1.5">
                          {sectionTitle && (
                            <Pill variant="title" size="default" className="text-[var(--swatch-teal)]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(250,244,236,0.86) 100%)", border: "1px solid rgba(255,255,255,0.88)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", fontSize: 14 }}>
                              {sectionTitle}
                            </Pill>
                          )}
                          <Pill variant="title" size="default">
                            {item.label}
                          </Pill>
                        </div>
                        <InlinePhotoSearch imageKey={(item as any).imageKey || item.id} label={item.label} onImageChanged={forceUpdate} />
                      </>
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
                  style={{ position: "absolute" }}
                >
                  <div style={{ position: "relative" }}>
                    <GoTwoCard
                      image={item.image}
                      label={item.label}
                      sectionTitle={sectionTitle}
                      isActive={isActive}
                      cardWidth={cardWidth}
                      cardHeight={cardHeight}
                      borderRadius={borderRadius}
                      onClick={() => {
                        if (isActive) onSelect(item.id);
                        else setActiveIndex((activeIndex + offset + n) % n);
                      }}
                    />
                    {isActive && <InlinePhotoSearch imageKey={(item as any).imageKey || item.id} label={item.label} onImageChanged={forceUpdate} />}
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

CoverFlowCarousel.displayName = "CoverFlowCarousel";

export default CoverFlowCarousel;
