import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { HandDrawnArrowLeft, HandDrawnArrowRight } from "@/components/ui/hand-drawn-arrows";
import type { MyGoTwoRootItem } from "@/features/mygotwo/types";
import { BRANDED_CARD_SVG } from "@/features/mygotwo/shared";
import type { ReactNode } from "react";

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
  left: { x: -320, y: 57, scale: 0.81, rotate: -16, rotateY: 22, zIndex: 15 },
  right: { x: 320, y: 57, scale: 0.81, rotate: 16, rotateY: -22, zIndex: 15 },
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

function isVisibleOffset(offset: number, length: number, visibleRadius: number) {
  const half = Math.floor(length / 2);
  const maxVisibleOffset = Math.min(visibleRadius, half);

  if (Math.abs(offset) > maxVisibleOffset) {
    return false;
  }

  if (length % 2 === 0 && Math.abs(offset) === half) {
    return false;
  }

  return true;
}

function isRightHiddenStackOffset(offset: number, length: number, visibleRadius: number) {
  const half = Math.floor(length / 2);
  return length % 2 === 0 && half <= visibleRadius && Math.abs(offset) === half;
}

type MyGoTwoWebCoverflowStageProps = {
  items: MyGoTwoRootItem[];
  onActiveCardSelect?: (item: MyGoTwoRootItem) => void;
  onActiveItemChange?: (item: MyGoTwoRootItem) => void;
  renderCard?: (item: MyGoTwoRootItem, isActive: boolean) => ReactNode;
  interactiveItemId?: string | null;
  visibleRadius?: number;
};

function buildCoverflowItems(items: MyGoTwoRootItem[]): CoverflowItem[] {
  return items.map((item) => ({
    id: item.id,
    image: item.image || BRANDED_CARD_SVG,
    alt: item.label,
  }));
}

export default function MyGoTwoWebCoverflowStage({
  items,
  onActiveCardSelect,
  onActiveItemChange,
  renderCard,
  interactiveItemId = null,
  visibleRadius = 3,
}: MyGoTwoWebCoverflowStageProps) {
  const coverflowItems = useMemo(() => buildCoverflowItems(items), [items]);
  const itemSignature = useMemo(() => items.map((item) => item.id).join("|"), [items]);
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

    setActiveIndex(0);
    setPreviousActiveIndex(0);
  }, [itemCount, itemSignature]);

  const visibleItems = useMemo(
    () =>
      coverflowItems
        .map((item, index) => ({
          ...item,
          offset: getWrappedOffset(index, activeIndex, itemCount),
          previousOffset: getWrappedOffset(index, previousActiveIndex, itemCount),
        }))
        .filter(
          (item) =>
            isVisibleOffset(item.offset, itemCount, visibleRadius) ||
            isVisibleOffset(item.previousOffset, itemCount, visibleRadius) ||
            isRightHiddenStackOffset(item.offset, itemCount, visibleRadius) ||
            isRightHiddenStackOffset(item.previousOffset, itemCount, visibleRadius),
        ),
    [activeIndex, coverflowItems, itemCount, previousActiveIndex, visibleRadius],
  );

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

  useEffect(() => {
    if (!onActiveItemChange || itemCount === 0) return;

    const activeItem = items[activeIndex];
    if (activeItem) {
      onActiveItemChange(activeItem);
    }
  }, [activeIndex, itemCount, items, onActiveItemChange]);

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
        const sourceItem = items[itemIndex];
        const inRightHiddenStack = isRightHiddenStackOffset(item.offset, itemCount, visibleRadius);
        const currentVisible = isVisibleOffset(item.offset, itemCount, visibleRadius);
        const isHovered = hoveredIndex === itemIndex && item.offset !== 0 && currentVisible;
        const hoverScale = isHovered ? 0.03 : 0;
        const hoverLift = isHovered ? -10 : 0;
        const enteringSide =
          currentVisible &&
          !isVisibleOffset(item.previousOffset, itemCount, visibleRadius) &&
          !isRightHiddenStackOffset(item.previousOffset, itemCount, visibleRadius)
            ? navigationDirection === 1
              ? "right"
              : "left"
            : null;
        const enteringPose = enteringSide ? HIDDEN_POSES[enteringSide] : null;
        const exitingSide =
          !currentVisible &&
          !inRightHiddenStack &&
          isVisibleOffset(item.previousOffset, itemCount, visibleRadius)
            ? navigationDirection === 1
              ? "right"
              : "left"
            : null;
        const pose = currentVisible
          ? POSES[item.offset]
          : inRightHiddenStack
            ? HIDDEN_POSES.right
            : exitingSide
              ? HIDDEN_POSES[exitingSide]
              : null;
        const isActive = currentVisible && itemIndex === activeIndex;
        const isInteractive = Boolean(renderCard && sourceItem && interactiveItemId === item.id && isActive);
        const baseStyle = {
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          zIndex: pose.zIndex,
          marginLeft: `${-CARD_WIDTH / 2}px`,
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d" as const,
          pointerEvents: currentVisible ? "auto" : "none" as const,
        };
        const animation = {
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
        };

        if (!pose) {
          return null;
        }

        if (isInteractive) {
          return (
            <motion.div
              key={item.id}
              className="absolute left-1/2 top-0 overflow-hidden rounded-[34px] border-0 bg-transparent"
              style={baseStyle}
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
              animate={animation}
              transition={transition}
            >
              <div className="h-full w-full">{renderCard(sourceItem, true)}</div>
            </motion.div>
          );
        }

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => {
              if (currentVisible && itemIndex === activeIndex && sourceItem && onActiveCardSelect) {
                onActiveCardSelect(sourceItem);
                return;
              }

              navigateToIndex(itemIndex);
            }}
            onMouseEnter={() => setHoveredIndex(itemIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={`Show slide ${itemIndex + 1}`}
            className="absolute left-1/2 top-0 overflow-hidden rounded-[34px] border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.45)]"
            style={baseStyle}
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
            animate={animation}
            transition={transition}
          >
            {renderCard && sourceItem ? (
              <div className="h-full w-full">{renderCard(sourceItem, false)}</div>
            ) : (
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            )}
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
          <HandDrawnArrowLeft className="h-5 w-5" />
        </button>

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
          <HandDrawnArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
