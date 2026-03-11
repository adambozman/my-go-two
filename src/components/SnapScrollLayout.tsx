import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { CarouselDotsContext, useCarouselDotsProvider, useCarouselDots } from "@/contexts/CarouselDotsContext";

interface SnapSection {
  id: string;
  label: string;
  content: ReactNode;
}

interface SnapScrollLayoutProps {
  sections: SnapSection[];
}

const BottomDots = () => {
  const carouselState = useCarouselDots();
  if (!carouselState || carouselState.count <= 1) return null;

  return (
    <div
      className="absolute left-0 right-0 flex justify-center gap-2 z-30"
      style={{ bottom: "4%" }}
    >
      {Array.from({ length: carouselState.count }).map((_, i) => (
        <button
          key={i}
          onClick={() => carouselState.setActiveIndex(i)}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: i === carouselState.activeIndex ? "#2D6870" : "rgba(200, 200, 200, 0.6)",
            transform: i === carouselState.activeIndex ? "scale(1.3)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
};

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
    setActiveIndex(Math.min(idx, sections.length - 1));
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
          {sections.map((section) => (
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
              {/* Carousel centered, title 24px above */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full relative">
                  <h3 className="section-header text-center absolute left-0 right-0" style={{ top: -24, transform: "translateY(-100%)" }}>{section.label}</h3>
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom dots — fixed, controls cards left/right */}
        <BottomDots />

        {/* Dot pagination — right side, controls sections up/down */}
        {sections.length > 1 && (
          <div
            className="absolute right-3 flex flex-col gap-2.5 z-30"
            style={{ top: "25%", transform: "translateY(-50%)" }}
          >
            {sections.map((section, i) => (
              <button
                key={`right-${section.id}`}
                onClick={() => scrollTo(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex ? "#2D6870" : "rgba(200, 200, 200, 0.6)",
                  transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to ${section.label}`}
              />
            ))}
          </div>
        )}
      </div>
    </CarouselDotsContext.Provider>
  );
};

export default SnapScrollLayout;
