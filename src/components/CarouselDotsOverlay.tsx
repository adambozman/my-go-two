import React from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { DOT_LAYOUT } from "@/lib/carouselConfig";
import { useCarouselDots } from "@/contexts/CarouselDotsContext";

const CHEVRON_SIZE = 28;
const CHEVRON_COLOR = DOT_LAYOUT.activeColor;

export const BottomCarouselDots = () => {
  const carouselState = useCarouselDots();
  if (!carouselState || carouselState.count <= 1) return null;

  const { activeIndex, setActiveIndex, count } = carouselState;

  return (
    <>
      {activeIndex > 0 && (
        <button
          onClick={() => setActiveIndex(activeIndex - 1)}
          className="absolute z-30 transition-all duration-300"
          style={{ top: "50%", left: 12, transform: "translateY(-50%)" }}
          aria-label="Previous card"
        >
          <ChevronLeft style={{ color: CHEVRON_COLOR, width: CHEVRON_SIZE, height: CHEVRON_SIZE }} />
        </button>
      )}
      {activeIndex < count - 1 && (
        <button
          onClick={() => setActiveIndex(activeIndex + 1)}
          className="absolute z-30 transition-all duration-300"
          style={{ top: "50%", right: 12, transform: "translateY(-50%)" }}
          aria-label="Next card"
        >
          <ChevronRight style={{ color: CHEVRON_COLOR, width: CHEVRON_SIZE, height: CHEVRON_SIZE }} />
        </button>
      )}
    </>
  );
};

interface RightSectionDotsProps {
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
  labels?: string[];
}

export const RightSectionDots = ({ count, activeIndex, onSelect }: RightSectionDotsProps) => {
  if (count <= 1) return null;

  return (
    <>
      {activeIndex > 0 && (
        <button
          onClick={() => onSelect?.(activeIndex - 1)}
          className="absolute z-30 transition-all duration-300"
          style={{ top: 12, left: "50%", transform: "translateX(-50%)" }}
          aria-label="Previous section"
        >
          <ChevronUp style={{ color: CHEVRON_COLOR, width: CHEVRON_SIZE, height: CHEVRON_SIZE }} />
        </button>
      )}
      {activeIndex < count - 1 && (
        <button
          onClick={() => onSelect?.(activeIndex + 1)}
          className="absolute z-30 transition-all duration-300"
          style={{ bottom: 12, left: "50%", transform: "translateX(-50%)" }}
          aria-label="Next section"
        >
          <ChevronDown style={{ color: CHEVRON_COLOR, width: CHEVRON_SIZE, height: CHEVRON_SIZE }} />
        </button>
      )}
    </>
  );
};
