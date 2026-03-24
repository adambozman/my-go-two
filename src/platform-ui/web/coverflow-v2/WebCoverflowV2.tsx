import { useEffect, useRef, useState } from "react";
import { WebCoverflowCard } from "@/platform-ui/web/coverflow-v2/WebCoverflowCard";
import { WebCoverflowControls } from "@/platform-ui/web/coverflow-v2/WebCoverflowControls";
import type { WebCoverflowProps } from "@/platform-ui/web/coverflow-v2/types";
import { normalizeActiveIndex, getWebCoverflowPose } from "@/platform-ui/web/coverflow-v2/useWebCoverflowMath";
import { WEB_COVERFLOW_TOKENS } from "@/platform-ui/web/coverflow-v2/webCoverflow.tokens";

export default function WebCoverflowV2({
  items,
  onSelect,
  initialActiveIndex = 0,
  sectionTitle,
  className,
  variant = "default",
  stageHeight,
}: WebCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const dragStartX = useRef<number | null>(null);
  const dragStartMs = useRef<number | null>(null);

  const itemCount = items.length;

  useEffect(() => {
    if (itemCount === 0) return;
    setActiveIndex(normalizeActiveIndex(initialActiveIndex, itemCount));
  }, [initialActiveIndex, itemCount]);

  useEffect(() => {
    if (itemCount <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => normalizeActiveIndex(prev - 1, itemCount));
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => normalizeActiveIndex(prev + 1, itemCount));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [itemCount]);

  if (itemCount === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <div
      className={className ?? "relative w-full"}
      onPointerDown={(event) => {
        dragStartX.current = event.clientX;
        dragStartMs.current = performance.now();
      }}
      onPointerUp={(event) => {
        if (dragStartX.current === null || dragStartMs.current === null || itemCount <= 1) return;

        const deltaX = event.clientX - dragStartX.current;
        const elapsedMs = Math.max(1, performance.now() - dragStartMs.current);
        const velocity = Math.abs(deltaX / elapsedMs);

        const qualifies = Math.abs(deltaX) >= WEB_COVERFLOW_TOKENS.dragThresholdPx
          || velocity >= WEB_COVERFLOW_TOKENS.dragVelocityThreshold;

        if (qualifies) {
          if (deltaX < 0) setActiveIndex((prev) => normalizeActiveIndex(prev + 1, itemCount));
          if (deltaX > 0) setActiveIndex((prev) => normalizeActiveIndex(prev - 1, itemCount));
        }

        dragStartX.current = null;
        dragStartMs.current = null;
      }}
      style={{
        height: stageHeight ?? WEB_COVERFLOW_TOKENS.stageHeight,
        perspective: "1600px",
        perspectiveOrigin: variant === "hero" ? "50% 44%" : "50% 38%",
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[36px]" style={{ transformStyle: "preserve-3d" }}>
        {items.map((item, index) => {
          const pose = getWebCoverflowPose(index, activeIndex, itemCount, variant);
          const imageKey = `${item.id}::${item.image || ""}`;

          return (
            <WebCoverflowCard
              key={item.id}
              item={item}
              pose={pose}
              sectionTitle={sectionTitle}
              onActivate={() => setActiveIndex(index)}
              onCommit={() => onSelect(item.id)}
              imageFailed={Boolean(failedImages[imageKey])}
              onImageError={() => setFailedImages((prev) => ({ ...prev, [imageKey]: true }))}
            />
          );
        })}
      </div>

      <WebCoverflowControls
        itemCount={itemCount}
        activeIndex={activeIndex}
        onPrevious={() => setActiveIndex((prev) => normalizeActiveIndex(prev - 1, itemCount))}
        onNext={() => setActiveIndex((prev) => normalizeActiveIndex(prev + 1, itemCount))}
        onDotSelect={(index) => setActiveIndex(normalizeActiveIndex(index, itemCount))}
      />

      {activeItem ? (
        <div className="sr-only" aria-live="polite">
          {activeItem.label}
        </div>
      ) : null}
    </div>
  );
}
