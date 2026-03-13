import React from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { DOT_LAYOUT } from "@/lib/carouselConfig";
import { useCarouselDots } from "@/contexts/CarouselDotsContext";

const ARROW_COLOR = "#2d6870";

export const BottomCarouselDots = () => {
  const carouselState = useCarouselDots();
  if (!carouselState || carouselState.count <= 1) return null;

  const isFirst = carouselState.activeIndex === 0;
  const isLast = carouselState.activeIndex === carouselState.count - 1;

  return (
    <div
      className="absolute left-0 right-0 flex justify-center items-center gap-6 z-30"
      style={{ top: DOT_LAYOUT.bottomTopOffset, transform: DOT_LAYOUT.bottomTransform }}
    >
      {!isFirst && (
        <button
          onClick={() => carouselState.setActiveIndex(carouselState.activeIndex - 1)}
          className="transition-opacity duration-300"
          aria-label="Previous card"
        >
          <ChevronLeft size={24} color={ARROW_COLOR} strokeWidth={2.5} />
        </button>
      )}
      {!isLast && (
        <button
          onClick={() => carouselState.setActiveIndex(carouselState.activeIndex + 1)}
          className="transition-opacity duration-300"
          aria-label="Next card"
        >
          <ChevronRight size={24} color={ARROW_COLOR} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

interface RightSectionDotsProps {
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
  labels?: string[];
}

export const RightSectionDots = ({
  count,
  activeIndex,
  onSelect,
  labels = [],
}: RightSectionDotsProps) => {
  if (count <= 1) return null;

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === count - 1;
  const interactive = typeof onSelect === "function";

  return (
    <div
      className="absolute flex flex-col items-center gap-2 z-30"
      style={{
        right: DOT_LAYOUT.rightOffset,
        top: DOT_LAYOUT.rightTopOffset,
        transform: "translateY(-50%)",
      }}
    >
      {!isFirst && (
        <button
          onClick={() => interactive && onSelect(activeIndex - 1)}
          className="transition-opacity duration-300"
          aria-label={labels[activeIndex - 1] ? `Go to ${labels[activeIndex - 1]}` : "Previous section"}
        >
          <ChevronUp size={24} color={ARROW_COLOR} strokeWidth={2.5} />
        </button>
      )}
      {!isLast && (
        <button
          onClick={() => interactive && onSelect(activeIndex + 1)}
          className="transition-opacity duration-300"
          aria-label={labels[activeIndex + 1] ? `Go to ${labels[activeIndex + 1]}` : "Next section"}
        >
          <ChevronDown size={24} color={ARROW_COLOR} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};