import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import InlinePhotoSearch from "@/components/InlinePhotoSearch";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

export interface MyGoTwoDesktopCoverflowItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
}

interface MyGoTwoDesktopCoverflowProps {
  items: MyGoTwoDesktopCoverflowItem[];
  focusedItemId?: string | null;
  onCommit?: (id: string) => void;
  onActiveIdChange?: (id: string) => void;
  stageHeight?: string;
  commitOnCardClick?: boolean;
}

interface PosePoint {
  x: number;
  y: number;
  rotateY: number;
  scale: number;
  opacity: number;
}

function normalizeIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function shortestRelative(index: number, activeIndex: number, length: number) {
  if (length <= 0) return 0;
  let delta = normalizeIndex(index - activeIndex, length);
  if (delta > length / 2) delta -= length;
  return delta;
}

const BASE_POSE_BY_DEPTH: readonly PosePoint[] = [
  { x: 0, y: -22, rotateY: 0, scale: 1, opacity: 1 },
  { x: 248, y: -4, rotateY: -8, scale: 0.93, opacity: 1 },
  { x: 404, y: 10, rotateY: -13, scale: 0.85, opacity: 0.98 },
  { x: 526, y: 24, rotateY: -18, scale: 0.76, opacity: 0.94 },
] as const;

function MyGoTwoDesktopCoverflowCard({
  item,
  isActive,
  isVisible,
  width,
  height,
  pose,
  zIndex,
  imageFailed,
  onImageError,
  onClick,
}: {
  item: MyGoTwoDesktopCoverflowItem;
  isActive: boolean;
  isVisible: boolean;
  width: number;
  height: number;
  pose: PosePoint;
  zIndex: number;
  imageFailed: boolean;
  onImageError: () => void;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  const hoverLift = isHovered ? (isActive ? -12 : -8) : 0;
  const hoverScale = isHovered ? (isActive ? 1.025 : 1.01) : 1;

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{
        transform: `translate(-50%, -50%) translate3d(${pose.x}px, ${pose.y + hoverLift}px, 0) rotateY(${pose.rotateY}deg) scale(${pose.scale * hoverScale})`,
        opacity: pose.opacity,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="absolute left-1/2 top-1/2 overflow-hidden border-0 bg-transparent p-0"
      style={{
        width,
        height,
        borderRadius: 34,
        zIndex,
        boxShadow: isActive
          ? "0 26px 80px rgba(20,20,30,0.28)"
          : "0 16px 38px rgba(20,20,30,0.18)",
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={item.label}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[linear-gradient(160deg,#d0d2d6_0%,#b2b6bc_100%)]">
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.label}
            className="absolute inset-0 h-full w-full object-cover"
            onError={onImageError}
          />
        ) : null}
        {isActive ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Pill variant="title" size="default">
                {item.label}
              </Pill>
            </div>
            <InlinePhotoSearch imageKey={item.imageKey || item.id} label={item.label} />
          </>
        ) : null}
      </div>
    </motion.button>
  );
}

export default function MyGoTwoDesktopCoverflow({
  items,
  focusedItemId,
  onCommit,
  onActiveIdChange,
  stageHeight = "100%",
  commitOnCardClick = false,
}: MyGoTwoDesktopCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartMs = useRef<number | null>(null);

  const itemCount = items.length;

  useEffect(() => {
    if (!stageRef.current) return;

    const updateSize = () => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      setStageSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(stageRef.current);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    if (itemCount === 0) return;
    if (focusedItemId) {
      const focusedIndex = items.findIndex((item) => item.id === focusedItemId);
      if (focusedIndex >= 0) {
        setActiveIndex(focusedIndex);
        return;
      }
    }
    setActiveIndex((prev) => normalizeIndex(prev, itemCount));
  }, [focusedItemId, items, itemCount]);

  useEffect(() => {
    if (itemCount <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setActiveIndex((prev) => normalizeIndex(prev - 1, itemCount));
      if (event.key === "ArrowRight") setActiveIndex((prev) => normalizeIndex(prev + 1, itemCount));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemCount]);

  useEffect(() => {
    const activeItem = items[activeIndex];
    if (activeItem) onActiveIdChange?.(activeItem.id);
  }, [activeIndex, items, onActiveIdChange]);

  if (itemCount === 0) return null;

  const sizeScale = Math.max(
    0.72,
    Math.min(
      1,
      stageSize.width > 0 && stageSize.height > 0
        ? Math.min(stageSize.width / 1400, stageSize.height / 900)
        : 1,
    ),
  );
  const cardHeight = Math.max(
    MYGOTWO_DESKTOP_TOKENS.minCardHeight,
    Math.min(MYGOTWO_DESKTOP_TOKENS.maxCardHeight, Math.round(MYGOTWO_DESKTOP_TOKENS.maxCardHeight * sizeScale)),
  );
  const cardWidth = Math.round(cardHeight * MYGOTWO_DESKTOP_TOKENS.cardAspectRatio);

  return (
    <div
      ref={stageRef}
      className="relative w-full min-h-0"
      style={{
        height: stageHeight,
        minHeight: 0,
        perspective: "1800px",
        perspectiveOrigin: "50% 48%",
      }}
      onPointerDown={(event) => {
        dragStartX.current = event.clientX;
        dragStartMs.current = performance.now();
      }}
      onPointerUp={(event) => {
        if (dragStartX.current === null || dragStartMs.current === null || itemCount <= 1) return;

        const deltaX = event.clientX - dragStartX.current;
        const elapsedMs = Math.max(1, performance.now() - dragStartMs.current);
        const velocity = Math.abs(deltaX / elapsedMs);
        const qualifies = Math.abs(deltaX) >= 70 || velocity >= 0.55;

        if (qualifies) {
          if (deltaX < 0) setActiveIndex((prev) => normalizeIndex(prev + 1, itemCount));
          if (deltaX > 0) setActiveIndex((prev) => normalizeIndex(prev - 1, itemCount));
        }

        dragStartX.current = null;
        dragStartMs.current = null;
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[30px]" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, index) => {
          const relative = shortestRelative(index, activeIndex, itemCount);
          const depth = Math.abs(relative);
          const direction = relative === 0 ? 0 : relative > 0 ? 1 : -1;
          const basePose = BASE_POSE_BY_DEPTH[Math.min(depth, BASE_POSE_BY_DEPTH.length - 1)];
          const pose = {
            x: basePose.x * sizeScale * direction,
            y: basePose.y * sizeScale,
            rotateY: basePose.rotateY * direction,
            scale: basePose.scale,
            opacity: basePose.opacity,
          };
          const imageKey = `${item.id}::${item.image || ""}`;

          return (
            <MyGoTwoDesktopCoverflowCard
              key={item.id}
              item={item}
              isActive={depth === 0}
              isVisible={depth <= MYGOTWO_DESKTOP_TOKENS.visibleEachSide}
              width={cardWidth}
              height={cardHeight}
              pose={pose}
              zIndex={200 - depth}
              imageFailed={Boolean(failedImages[imageKey])}
              onImageError={() => setFailedImages((prev) => ({ ...prev, [imageKey]: true }))}
              onClick={() => {
                if (depth !== 0) {
                  setActiveIndex(index);
                  if (commitOnCardClick) onCommit?.(item.id);
                  return;
                }
                onCommit?.(item.id);
              }}
            />
          );
        })}
      </div>

      {itemCount > 1 ? (
        <div
          className="absolute left-1/2 z-[60] flex -translate-x-1/2 items-center gap-4"
          style={{ bottom: MYGOTWO_DESKTOP_TOKENS.controlsBottom }}
        >
          <button
            type="button"
            aria-label="Previous"
            className="h-12 w-12 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] text-[var(--swatch-teal)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur"
            onClick={() => setActiveIndex((prev) => normalizeIndex(prev - 1, itemCount))}
          >
            <ChevronLeft className="mx-auto h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-white/60 bg-[rgba(255,255,255,0.34)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.10)] backdrop-blur">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={`dot-${item.id}`}
                  type="button"
                  aria-label={`Go to ${item.label}`}
                  animate={{ width: isActive ? 22 : 7, opacity: isActive ? 1 : 0.45 }}
                  transition={{ duration: 0.18 }}
                  className="h-[7px] rounded-full bg-white"
                  onClick={() => setActiveIndex(index)}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next"
            className="h-12 w-12 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] text-[var(--swatch-teal)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur"
            onClick={() => setActiveIndex((prev) => normalizeIndex(prev + 1, itemCount))}
          >
            <ChevronRight className="mx-auto h-5 w-5" />
          </button>
        </div>
      ) : null}

      <div className="sr-only" aria-live="polite">
        {items[activeIndex]?.label || ""}
      </div>
    </div>
  );
}
