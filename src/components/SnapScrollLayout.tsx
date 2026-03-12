import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { CarouselDotsContext, SectionIndexContext, useCarouselDotsProvider } from "@/contexts/CarouselDotsContext";
import { BottomCarouselDots, RightSectionDots } from "@/components/CarouselDotsOverlay";
import { HEADER_LAYOUT } from "@/lib/carouselConfig";

interface SnapSection {
  id: string;
  label: string;
  content: ReactNode;
}

interface SnapScrollLayoutProps {
  sections: SnapSection[];
}


const SnapScrollLayout = ({ sections }: SnapScrollLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartY = useRef(0);
  const dotsProvider = useCarouselDotsProvider();

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const sectionHeight = el.clientHeight;
    const idx = Math.round(scrollTop / sectionHeight);
    const newIdx = Math.min(idx, sections.length - 1);
    setActiveIndex(newIdx);
    dotsProvider.setActiveSection(newIdx);
  }, [sections.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, sections.length - 1));
    const sectionHeight = el.clientHeight;
    el.scrollTo({ top: clamped * sectionHeight, behavior: "smooth" });
  };

  // Touch swipe for vertical snap
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 50) {
      const next = dy < 0 ? activeIndex + 1 : activeIndex - 1;
      scrollTo(next);
    }
  }, [activeIndex, sections.length]);

  if (sections.length === 0) return null;

  return (
    <CarouselDotsContext.Provider value={dotsProvider}>
      <div className="relative w-full h-full">
        {/* Snap scroll container */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-y-auto"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            scrollSnapType: "y mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {sections.map((section, sectionIdx) => (
            <div
              key={section.id}
              className="w-full flex flex-col"
              style={{
                height: "100%",
                minHeight: "100%",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full relative">
                  <h3
                    className="section-header absolute z-20 left-0 right-0 text-center"
                    style={{
                      top: HEADER_LAYOUT.topOffset,
                      transform: HEADER_LAYOUT.transform,
                    }}
                  >
                    {section.label}
                  </h3>
                  <SectionIndexContext.Provider value={sectionIdx}>
                    {section.content}
                  </SectionIndexContext.Provider>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom dots — fixed, controls cards left/right */}
        <BottomCarouselDots />

        {/* Dot pagination — right side, controls sections up/down */}
        {sections.length > 1 && (
          <RightSectionDots
            count={sections.length}
            activeIndex={activeIndex}
            onSelect={scrollTo}
            labels={sections.map((section) => section.label)}
          />
        )}
      </div>
    </CarouselDotsContext.Provider>
  );
};

export default SnapScrollLayout;
