import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { MyGoTwoRootItem } from "@/features/mygotwo/types";
import { BRANDED_CARD_SVG } from "@/features/mygotwo/shared";

type CoverflowItem = {
  id: string;
  image: string;
  alt: string;
};

type CardPose = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  rotateY: number;
  zIndex: number;
};

const CARD_WIDTH = 244;
const CARD_HEIGHT = 376;
const STAGE_OFFSET_Y = 56;

const POSES: Record<number, CardPose> = {
  [-3]: { x: -452, y: 104, scale: 0.71, rotate: -24, rotateY: 32, zIndex: 10 },
  [-2]: { x: -320, y: 57, scale: 0.81, rotate: -16, rotateY: 22, zIndex: 20 },
  [-1]: { x: -172, y: 17, scale: 0.94, rotate: -8, rotateY: 11, zIndex: 30 },
  [0]: { x: 0, y: 0, scale: 1.17, rotate: 0, rotateY: 0, zIndex: 40 },
  [1]: { x: 172, y: 17, scale: 0.94, rotate: 8, rotateY: -11, zIndex: 30 },
  [2]: { x: 320, y: 57, scale: 0.81, rotate: 16, rotateY: -22, zIndex: 20 },
  [3]: { x: 452, y: 104, scale: 0.71, rotate: 24, rotateY: -32, zIndex: 10 },
};

const HIDDEN_POSES: Record<"left" | "right", CardPose> = {
  left: { x: -452, y: 104, scale: 0.71, rotate: -24, rotateY: 32, zIndex: 5 },
  right: { x: 452, y: 104, scale: 0.71, rotate: 24, rotateY: -32, zIndex: 5 },
};

function normalizeIndex(index: number, length: number) {
  return (index + length) % length;
}

function getWrappedOffset(index: number, activeIndex: number, length: number) {
  const raw = index - activeIndex;
  const half = Math.floor(length / 2);

  if (raw > half) {
    return raw - length;
  }

  if (raw < -half) {
    return raw + length;
  }

  return raw;
}

type MyGoTwoWebCoverflowStageProps = {
  items: MyGoTwoRootItem[];
};

function buildCoverflowItems(items: MyGoTwoRootItem[]): CoverflowItem[] {
  return items.map((item) => ({
    id: item.id,
    image: item.image || BRANDED_CARD_SVG,
    alt: item.label,
  }));
}

export default function MyGoTwoWebCoverflowStage({ items }: MyGoTwoWebCoverflowStageProps) {
  const coverflowItems = useMemo(() => buildCoverflowItems(items), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousActiveIndex, setPreviousActiveIndex] = useState(0);
  const [navigationDirection, setNavigationDirection] = useState<-1 | 1>(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const itemCount = coverflowItems.length;

  useEffect(() => {
    if (itemCount === 0) {
      setActiveIndex(0);
      setPreviousActiveIndex(0);
      return;
    }

    setActiveIndex((current) => normalizeIndex(current, itemCount));
    setPreviousActiveIndex((current) => normalizeIndex(current, itemCount));
  }, [itemCount]);

  const visibleItems = useMemo(
    () =>
      coverflowItems
        .map((item, index) => ({
          ...item,
          offset: getWrappedOffset(index, activeIndex, itemCount),
          previousOffset: getWrappedOffset(index, previousActiveIndex, itemCount),
        }))
        .filter((item) => Math.abs(item.offset) <= 3 || Math.abs(item.previousOffset) <= 3),
    [activeIndex, coverflowItems, itemCount, previousActiveIndex],
  );

  const visibleDotIndices = useMemo(() => {
    if (itemCount <= 7) {
      return Array.from({ length: itemCount }, (_, index) => index);
    }

    return [-3, -2, -1, 0, 1, 2, 3].map((offset) => normalizeIndex(activeIndex + offset, itemCount));
  }, [activeIndex, itemCount]);

  const navigateToIndex = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) return;

      const normalizedNext = normalizeIndex(nextIndex, itemCount);
      const wrappedStep = getWrappedOffset(normalizedNext, activeIndex, itemCount);

      setPreviousActiveIndex(activeIndex);
      setNavigationDirection(wrappedStep < 0 ? -1 : 1);
      setHoveredIndex(null);

      setActiveIndex(normalizedNext);
    },
    [activeIndex, itemCount],
  );

  const handleArrowKey = useCallback(
    (key: string) => {
      if (key === "ArrowLeft") {
        navigateToIndex(activeIndex - 1);
      }

      if (key === "ArrowRight") {
        navigateToIndex(activeIndex + 1);
      }
    },
    [activeIndex, navigateToIndex],
  );

  useEffect(() => {
    if (itemCount === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      handleArrowKey(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleArrowKey, itemCount]);

  const transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  if (itemCount === 0) {
    return null;
  }

  return (
    <section
      aria-label="My Go Two coverflow"
      className="relative mx-auto mt-[26vh] w-full max-w-[1220px] px-4 sm:px-6 md:px-8"
      style={{ minHeight: "520px" }}
    >
      {visibleItems.map((item) => {
        const itemIndex = coverflowItems.findIndex((entry) => entry.id === item.id);
        const currentVisible = Math.abs(item.offset) <= 3;
        const isHovered = hoveredIndex === itemIndex && item.offset !== 0 && currentVisible;
        const hoverScale = isHovered ? 0.03 : 0;
        const hoverLift = isHovered ? -10 : 0;
        const enteringSide =
          currentVisible && Math.abs(item.previousOffset) > 3
            ? navigationDirection === 1
              ? "right"
              : "left"
            : null;
        const enteringPose = enteringSide ? HIDDEN_POSES[enteringSide] : null;
        const exitingSide =
          !currentVisible && Math.abs(item.previousOffset) <= 3
            ? navigationDirection === 1
              ? "right"
              : "left"
            : null;
        const pose = currentVisible ? POSES[item.offset] : exitingSide ? HIDDEN_POSES[exitingSide] : null;

        if (!pose) {
          return null;
        }

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => navigateToIndex(itemIndex)}
            onMouseEnter={() => setHoveredIndex(itemIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`Show slide ${itemIndex + 1}`}
            className="absolute left-1/2 top-0 overflow-hidden rounded-[34px] border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.45)]"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              zIndex: pose.zIndex,
              marginLeft: `${-CARD_WIDTH / 2}px`,
              transformOrigin: "center bottom",
              transformStyle: "preserve-3d",
              pointerEvents: currentVisible ? "auto" : "none",
            }}
            initial={
              enteringPose && !reduceMotion
                ? {
                    x: enteringPose.x,
                    y: enteringPose.y + STAGE_OFFSET_Y,
                    scale: enteringPose.scale,
                    rotate: enteringPose.rotate,
                    rotateY: enteringPose.rotateY,
                  }
                : false
            }
            animate={{
              x: pose.x,
              y: pose.y + STAGE_OFFSET_Y + hoverLift,
              scale: pose.scale + hoverScale,
              rotate: pose.rotate,
              rotateY: pose.rotateY,
              opacity: 1,
              boxShadow:
                item.offset === 0 && currentVisible
                  ? "0 28px 64px rgba(18,35,54,0.24)"
                  : "0 16px 42px rgba(18,35,54,0.18)",
            }}
            transition={transition}
          >
            <img
              src={item.image}
              alt={item.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.button>
        );
      })}

      <div
        className="absolute inset-x-0 flex items-center justify-center gap-5"
        style={{ top: `${438 + STAGE_OFFSET_Y}px` }}
      >
        <button
          type="button"
          onClick={() => navigateToIndex(activeIndex - 1)}
          aria-label="Previous card"
          className="flex h-14 w-14 items-center justify-center rounded-full border-0 text-[#26495d] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.42)]"
          style={{
            background: "linear-gradient(145deg, rgba(222,234,238,0.62) 0%, rgba(176,201,210,0.28) 100%)",
            backdropFilter: "blur(22px) saturate(160%)",
            border: "1px solid rgba(214,239,246,0.52)",
            boxShadow:
              "inset 8px 8px 18px rgba(255,255,255,0.22), inset -10px -12px 20px rgba(33,88,107,0.18), 0 10px 22px rgba(31,88,120,0.16)",
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {visibleDotIndices.map((index) => {
            const active = index === activeIndex;
            const item = coverflowItems[index];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={active}
                className="rounded-full border-0 p-0 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.42)]"
                style={{
                  width: active ? "28px" : "8px",
                  height: "8px",
                  background: active
                    ? "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(239,233,225,0.92) 100%)"
                    : "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(14px)",
                  border: active
                    ? "1px solid rgba(255,255,255,0.58)"
                    : "1px solid rgba(255,255,255,0.22)",
                  boxShadow: active
                    ? "inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 1px rgba(180,165,148,0.28), 0 8px 18px rgba(31,88,120,0.12)"
                    : "inset 0 1px 0 rgba(255,255,255,0.36), 0 4px 10px rgba(31,88,120,0.08)",
                }}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => navigateToIndex(activeIndex + 1)}
          aria-label="Next card"
          className="flex h-14 w-14 items-center justify-center rounded-full border-0 text-[#26495d] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.42)]"
          style={{
            background: "linear-gradient(145deg, rgba(222,234,238,0.62) 0%, rgba(176,201,210,0.28) 100%)",
            backdropFilter: "blur(22px) saturate(160%)",
            border: "1px solid rgba(214,239,246,0.52)",
            boxShadow:
              "inset 8px 8px 18px rgba(255,255,255,0.22), inset -10px -12px 20px rgba(33,88,107,0.18), 0 10px 22px rgba(31,88,120,0.16)",
          }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
