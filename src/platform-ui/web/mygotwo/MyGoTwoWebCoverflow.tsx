import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

export interface MyGoTwoWebCoverflowItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
  previewTitle?: string;
}

interface MyGoTwoWebCoverflowProps {
  items: MyGoTwoWebCoverflowItem[];
  focusedItemId?: string | null;
  onCommit?: (id: string) => void;
  onActiveIdChange?: (id: string) => void;
  stageHeight?: string;
  showControls?: boolean;
  visibleEachSide?: number;
}

interface CardPose {
  relative: number;
  depth: number;
  x: number;
  y: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isActive: boolean;
}

const BASE_POSES = [
  { x: 0, y: -20, rotateY: 0, scale: 1, opacity: 1 },
  { x: 252, y: -2, rotateY: -9, scale: 0.93, opacity: 1 },
  { x: 410, y: 12, rotateY: -14, scale: 0.85, opacity: 0.98 },
  { x: 530, y: 24, rotateY: -18, scale: 0.76, opacity: 0.94 },
] as const;

function normalizeIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function getRelativeIndex(index: number, activeIndex: number, length: number) {
  if (length <= 0) return 0;
  let delta = normalizeIndex(index - activeIndex, length);
  if (delta > length / 2) delta -= length;
  return delta;
}

function buildPose(index: number, activeIndex: number, count: number, scaleFactor: number): CardPose {
  const relative = getRelativeIndex(index, activeIndex, count);
  const depth = Math.abs(relative);
  const direction = relative === 0 ? 0 : relative > 0 ? 1 : -1;
  const template = BASE_POSES[Math.min(depth, BASE_POSES.length - 1)];

  return {
    relative,
    depth,
    x: template.x * scaleFactor * direction,
    y: template.y * scaleFactor,
    rotateY: template.rotateY * direction,
    scale: template.scale,
    opacity: template.opacity,
    zIndex: 200 - depth,
    isActive: depth === 0,
  };
}

function EntryPreviewCard({
  item,
  pose,
  width,
  height,
  imageFailed,
  onImageError,
  onClick,
}: {
  item: MyGoTwoWebCoverflowItem;
  pose: CardPose;
  width: number;
  height: number;
  imageFailed: boolean;
  onImageError: () => void;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverLift = isHovered ? (pose.isActive ? -10 : -6) : 0;
  const hoverScale = isHovered ? (pose.isActive ? 1.02 : 1.01) : 1;

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{
        transform: `translate(-50%, -50%) translate3d(${pose.x}px, ${pose.y + hoverLift}px, 0) rotateY(${pose.rotateY}deg) scale(${pose.scale * hoverScale})`,
        opacity: pose.opacity,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="absolute left-1/2 top-1/2 overflow-hidden border-0 bg-transparent p-0"
      style={{
        width,
        height,
        borderRadius: 34,
        zIndex: pose.zIndex,
        boxShadow: pose.isActive
          ? "0 26px 80px rgba(20,20,30,0.28)"
          : "0 16px 38px rgba(20,20,30,0.18)",
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={item.label}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px]">
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.label}
            className="absolute inset-0 h-full w-full object-cover"
            onError={onImageError}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col justify-between"
            style={{
              background: "#eee7d6",
              padding: "22px 20px 18px",
              color: "#1a1a1a",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#d4543a",
                  fontWeight: 700,
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                Product Card
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 42,
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {item.previewTitle || item.label}
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(68,58,40,0.14)" }} />
          </div>
        )}

        {pose.isActive ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
            <div
              className="absolute bottom-6 left-6 inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2"
              style={{
                background: "rgba(255,248,240,0.92)",
                borderColor: "rgba(255,255,255,0.72)",
                color: "var(--logo-two-color)",
                boxShadow: "0 10px 22px rgba(20,20,30,0.12)",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 0.9,
              }}
            >
              {item.label}
            </div>
          </>
        ) : null}
      </div>
    </motion.button>
  );
}

export default function MyGoTwoWebCoverflow({
  items,
  focusedItemId,
  onCommit,
  onActiveIdChange,
  stageHeight = "100%",
  showControls = true,
  visibleEachSide = MYGOTWO_DESKTOP_TOKENS.visibleEachSide,
}: MyGoTwoWebCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartMs = useRef<number | null>(null);
  const lastWheelMs = useRef(0);

  const itemCount = items.length;
  const commitPreviewIndex = (nextIndex: number) => {
    if (itemCount <= 0) return;
    const normalizedIndex = normalizeIndex(nextIndex, itemCount);
    setActiveIndex(normalizedIndex);
    const nextItem = items[normalizedIndex];
    if (nextItem) onActiveIdChange?.(nextItem.id);
  };

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
    if (!focusedItemId) {
      setActiveIndex((current) => normalizeIndex(current, itemCount));
      return;
    }

    const nextIndex = items.findIndex((item) => item.id === focusedItemId);
    if (nextIndex >= 0) setActiveIndex(nextIndex);
  }, [focusedItemId, items, itemCount]);

  useEffect(() => {
    if (itemCount <= 1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") commitPreviewIndex(activeIndex - 1);
      if (event.key === "ArrowRight") commitPreviewIndex(activeIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, itemCount]);

  const scaleFactor = useMemo(() => {
    if (stageSize.width <= 0 || stageSize.height <= 0) return 1;
    return Math.max(0.72, Math.min(1, Math.min(stageSize.width / 1400, stageSize.height / 900)));
  }, [stageSize.height, stageSize.width]);

  if (itemCount === 0) return null;

  const cardHeight = Math.max(
    MYGOTWO_DESKTOP_TOKENS.minCardHeight,
    Math.min(MYGOTWO_DESKTOP_TOKENS.maxCardHeight, Math.round(MYGOTWO_DESKTOP_TOKENS.maxCardHeight * scaleFactor)),
  );
  const cardWidth = Math.round(cardHeight * MYGOTWO_DESKTOP_TOKENS.cardAspectRatio);

  return (
    <div
      ref={stageRef}
      className="relative w-full min-h-0"
      style={{
        height: stageHeight,
        minHeight: 0,
        perspective: "1600px",
        perspectiveOrigin: "50% 46%",
      }}
      onWheel={(event) => {
        if (itemCount <= 1) return;
        const primaryDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        if (Math.abs(primaryDelta) < 20) return;

        const now = performance.now();
        if (now - lastWheelMs.current < 180) {
          return;
        }

        lastWheelMs.current = now;
        commitPreviewIndex(activeIndex + (primaryDelta > 0 ? 1 : -1));
      }}
      onPointerDown={(event) => {
        pointerStartX.current = event.clientX;
        pointerStartMs.current = performance.now();
      }}
      onPointerCancel={() => {
        pointerStartX.current = null;
        pointerStartMs.current = null;
      }}
      onPointerLeave={() => {
        pointerStartX.current = null;
        pointerStartMs.current = null;
      }}
      onPointerUp={(event) => {
        if (pointerStartX.current === null || pointerStartMs.current === null || itemCount <= 1) return;

        const deltaX = event.clientX - pointerStartX.current;
        const elapsedMs = Math.max(1, performance.now() - pointerStartMs.current);
        const velocity = Math.abs(deltaX / elapsedMs);

        if (Math.abs(deltaX) >= 70 || velocity >= 0.55) {
          commitPreviewIndex(activeIndex + (deltaX < 0 ? 1 : -1));
        }

        pointerStartX.current = null;
        pointerStartMs.current = null;
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[30px]" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, index) => {
          const pose = buildPose(index, activeIndex, itemCount, scaleFactor);
          if (pose.depth > visibleEachSide) return null;

          const imageKey = `${item.id}::${item.image || ""}`;
          return (
            <EntryPreviewCard
              key={item.id}
              item={item}
              pose={pose}
              width={cardWidth}
              height={cardHeight}
              imageFailed={Boolean(failedImages[imageKey])}
              onImageError={() => setFailedImages((current) => ({ ...current, [imageKey]: true }))}
              onClick={() => {
                if (!pose.isActive) {
                  commitPreviewIndex(index);
                  return;
                }
                onCommit?.(item.id);
              }}
            />
          );
        })}
      </div>

      {showControls && itemCount > 1 ? (
        <div
          className="absolute left-1/2 z-[60] flex -translate-x-1/2 items-center gap-4"
          style={{ bottom: MYGOTWO_DESKTOP_TOKENS.controlsBottom }}
        >
          <button
            type="button"
            aria-label="Previous"
            className="h-12 w-12 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] text-[var(--swatch-teal)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur"
            onClick={() => commitPreviewIndex(activeIndex - 1)}
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
                  onClick={() => commitPreviewIndex(index)}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next"
            className="h-12 w-12 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] text-[var(--swatch-teal)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur"
            onClick={() => commitPreviewIndex(activeIndex + 1)}
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
