import { type ReactNode } from "react";
import { CarouselDotsContext, SectionIndexContext, useCarouselDotsProvider, useCarouselDots } from "@/contexts/CarouselDotsContext";

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
          className="rounded-full transition-all duration-300"
          style={{
            width: 8,
            height: 8,
            background: i === carouselState.activeIndex ? "#2D6870" : "rgba(200, 200, 200, 0.6)",
          }}
        />
      ))}
    </div>
  );
};

const CoverFlowWithDots = ({ children }: { children: ReactNode }) => {
  const dotsProvider = useCarouselDotsProvider();

  return (
    <CarouselDotsContext.Provider value={dotsProvider}>
      <SectionIndexContext.Provider value={0}>
        <div className="h-full relative">
          {children}
          <BottomDots />
        </div>
      </SectionIndexContext.Provider>
    </CarouselDotsContext.Provider>
  );
};

export default CoverFlowWithDots;
