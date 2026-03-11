import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";

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
    const sectionHeight = el.clientHeight;
    el.scrollTo({ top: index * sectionHeight, behavior: "smooth" });
  };

  if (sections.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {/* Snap scroll container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto"
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
            {/* Carousel centered, title 24px above, dots 24px below */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full relative">
                <h3 className="section-header text-center absolute left-0 right-0" style={{ top: -24, transform: "translateY(-100%)" }}>{section.label}</h3>
                {section.content}
                {/* Bottom dot pagination */}
                {sections.length > 1 && (
                  <div className="absolute left-0 right-0 flex justify-center gap-2.5 z-30" style={{ bottom: -24, transform: "translateY(100%)" }}>
                    {sections.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(i)}
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          background: i === activeIndex ? "#2D6870" : "rgba(200, 200, 200, 0.6)",
                          transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
                        }}
                        aria-label={`Go to ${s.label}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot pagination — right side, moved up */}
      {sections.length > 1 && (
        <div
          className="absolute right-3 flex flex-col gap-2.5 z-30"
          style={{ top: "40%", transform: "translateY(-50%)" }}
        >
          {sections.map((section, i) => (
            <button
              key={section.id}
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
  );
};

export default SnapScrollLayout;
