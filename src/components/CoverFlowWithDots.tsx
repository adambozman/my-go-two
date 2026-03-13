import { type ReactNode } from "react";
import { CarouselDotsContext, SectionIndexContext, useCarouselDotsProvider } from "@/contexts/CarouselDotsContext";
import { BottomCarouselDots, RightSectionDots } from "@/components/CarouselDotsOverlay";

const CoverFlowWithDots = ({ children }: { children: ReactNode }) => {
  const dotsProvider = useCarouselDotsProvider();

  return (
    <CarouselDotsContext.Provider value={dotsProvider}>
      <div className="relative w-full h-full">
        <div className="w-full h-full">
          <div
            className="w-full flex flex-col"
            style={{ height: "100%", minHeight: "100%" }}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full relative">
                <SectionIndexContext.Provider value={0}>
                  {children}
                </SectionIndexContext.Provider>
              </div>
            </div>
          </div>
        </div>

        <BottomCarouselDots />
        <RightSectionDots count={1} activeIndex={0} />
      </div>
    </CarouselDotsContext.Provider>
  );
};

export default CoverFlowWithDots;
