import { DOT_LAYOUT } from "@/lib/carouselConfig";
import { useCarouselDots } from "@/contexts/CarouselDotsContext";

export const BottomCarouselDots = () => {
  const carouselState = useCarouselDots();
  if (!carouselState || carouselState.count <= 1) return null;

  return (
    <div
      className="absolute left-0 right-0 flex justify-center gap-2 z-30"
      style={{ top: DOT_LAYOUT.bottomTopOffset, transform: DOT_LAYOUT.bottomTransform }}
    >
      {Array.from({ length: carouselState.count }).map((_, i) => (
        <button
          key={i}
          onClick={() => carouselState.setActiveIndex(i)}
          className="transition-all duration-300"
          style={{
            width: DOT_LAYOUT.size,
            height: DOT_LAYOUT.size,
            minWidth: DOT_LAYOUT.size,
            minHeight: DOT_LAYOUT.size,
            borderRadius: "50%",
            background:
              i === carouselState.activeIndex
                ? DOT_LAYOUT.activeColor
                : DOT_LAYOUT.inactiveColor,
          }}
          aria-label={`Go to card ${i + 1}`}
        />
      ))}
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
  if (count <= 0) return null;

  return (
    <div
      className="absolute flex flex-col gap-2.5 z-30"
      style={{
        right: DOT_LAYOUT.rightOffset,
        top: DOT_LAYOUT.rightTopOffset,
        transform: "translateY(-50%)",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const interactive = typeof onSelect === "function";
        const commonStyle: React.CSSProperties = {
          width: DOT_LAYOUT.size,
          height: DOT_LAYOUT.size,
          minWidth: DOT_LAYOUT.size,
          minHeight: DOT_LAYOUT.size,
          borderRadius: "50%",
          background:
            i === activeIndex
              ? DOT_LAYOUT.activeColor
              : DOT_LAYOUT.inactiveColor,
        };

        if (!interactive) {
          return (
            <div key={`right-${i}`} style={commonStyle} />
          );
        }

        return (
          <button
            key={`right-${i}`}
            onClick={() => onSelect(i)}
            className="rounded-full transition-all duration-300"
            style={commonStyle}
            aria-label={
              labels[i] ? `Go to ${labels[i]}` : `Go to section ${i + 1}`
            }
          />
        );
      })}
    </div>
  );
};
