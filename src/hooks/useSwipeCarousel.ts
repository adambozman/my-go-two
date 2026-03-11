import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 50;

export function useSwipeCarousel(
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  length: number
) {
  const startX = useRef(0);
  const isDragging = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0) {
        setActiveIndex((i) => (i + 1) % length);
      } else {
        setActiveIndex((i) => (i - 1 + length) % length);
      }
    }
  }, [setActiveIndex, length]);

  return { onPointerDown, onPointerUp };
}
