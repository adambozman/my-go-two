import { useState, useEffect, useRef, forwardRef, useReducer } from "react";
import { motion } from "framer-motion";
import { CAROUSEL_LAYOUT, CAROUSEL_LAYOUT_DESKTOP } from "@/lib/carouselConfig";
import GoTwoCard from "@/components/ui/GoTwoCard";
import { Pill } from "@/components/ui/pill";
import InlinePhotoSearch from "@/components/InlinePhotoSearch";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";
import { useIsMobile } from "@/hooks/use-mobile";
import CoverflowWheel from "@/components/ui/CoverflowWheel";

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

const CoverFlowCarousel = forwardRef<HTMLDivElement, CoverFlowCarouselProps>(
  ({ items, onSelect, initialActiveIndex = 0, sectionTitle }, ref) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [, forceImages] = useReducer((x) => x + 1, 0);
    const isMobile = useIsMobile();

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
    const suppressNextClickRef = useRef(false);

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

    const handleTouchStart = isMobile
      ? (e: { touches: { clientX: number; clientY: number }[] }) => {
          touchStartX.current = e.touches[0].clientX;
          touchStartY.current = e.touches[0].clientY;
        }
      : undefined;

    const handleTouchEnd = isMobile
      ? (e: { changedTouches: { clientX: number; clientY: number }[] }) => {
          if (touchStartX.current === null || touchStartY.current === null) return;

          const dx = touchStartX.current - e.changedTouches[0].clientX;
          const dy = touchStartY.current - e.changedTouches[0].clientY;

          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            suppressNextClickRef.current = true;
            window.setTimeout(() => {
              suppressNextClickRef.current = false;
            }, 250);

            if (dx > 0) setActiveIndex((i) => (i + 1) % n);
            else setActiveIndex((i) => (i - 1 + n) % n);
          }

          touchStartX.current = null;
          touchStartY.current = null;
        }
      : undefined;

    return (
      <div
        ref={ref}
        className="relative w-full flex flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isMobile ? (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(250,244,236,0.88)_100%)] px-4 py-2 text-[12px] font-medium tracking-[0.08em] text-[var(--swatch-teal)] shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
            <span className="text-[10px] leading-none">&lt;-&gt;</span>
            Swipe left or right to browse
          </div>
        ) : null}
        <div
          className="relative w-full"
          style={{
            height: stageHeight,
            marginTop: isDesktop ? 44 : 24,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {pills ? (
              <CoverflowWheel
                items={items}
                activeIndex={activeIndex}
                pills={pills}
                spring={spring}
                onItemClick={({ item, isActive, offset }) => {
                  if (isMobile) {
                    if (isActive && !suppressNextClickRef.current) onSelect(item.id);
                    return;
                  }

                  if (isActive) onSelect(item.id);
                  else setActiveIndex((current) => (current + offset + n) % n);
                }}
                renderItem={({ item, isActive, pill }) => (
                  <div
                    className="relative h-full w-full cursor-pointer"
                    style={{
                      borderRadius: pill.r,
                      boxShadow: isActive
                        ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                        : "0 4px 16px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div className="w-full h-full overflow-hidden" style={{ borderRadius: pill.r }}>
                      <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    </div>
                    {isActive && (
                      <>
                        <div className="absolute bottom-6 left-6 flex flex-col items-start gap-1.5">
                          {sectionTitle && (
                            <Pill
                              variant="title"
                              size="default"
                              className="text-[var(--swatch-teal)]"
                              style={{
                                background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(250,244,236,0.86) 100%)",
                                border: "1px solid rgba(255,255,255,0.88)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                fontSize: 14,
                              }}
                            >
                              {sectionTitle}
                            </Pill>
                          )}
                          <Pill variant="title" size="default">
                            {item.label}
                          </Pill>
                        </div>
                        <InlinePhotoSearch
                          imageKey={(item as any).imageKey || item.id}
                          label={item.label}
                          onImageChanged={forceUpdate}
                        />
                      </>
                    )}
                  </div>
                )}
              />
            ) : (
              Array.from({ length: 5 }, (_, i) => i - 2).map((offset) => {
                const itemIndex = (activeIndex + offset + n) % n;
                const item = items[itemIndex];
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`slot-${offset}`}
                    initial={false}
                    animate={{
                      x: offset * xGap,
                      scale: isActive ? 1 : 0.6,
                      opacity: isActive ? 1 : flankOpacity,
                      zIndex: 3 - absOffset,
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
                          if (isMobile) {
                            if (isActive && !suppressNextClickRef.current) onSelect(item.id);
                            return;
                          }

                          if (isActive) onSelect(item.id);
                          else setActiveIndex((activeIndex + offset + n) % n);
                        }}
                      />
                      {isActive && (
                        <InlinePhotoSearch
                          imageKey={(item as any).imageKey || item.id}
                          label={item.label}
                          onImageChanged={forceUpdate}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
);

CoverFlowCarousel.displayName = "CoverFlowCarousel";

export default CoverFlowCarousel;
