import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 50;

export function useSwipeCarousel(
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  length: number
) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Only handle horizontal swipes; let vertical pass through to snap scroll
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) {
        setActiveIndex((i) => (i + 1) % length);
      } else {
        setActiveIndex((i) => (i - 1 + length) % length);
      }
    }
  }, [setActiveIndex, length]);

  return { onPointerDown, onPointerUp };
}
