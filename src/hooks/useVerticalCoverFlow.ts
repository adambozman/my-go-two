import { useCallback, useEffect, useMemo, useState } from "react";

export interface VerticalCoverFlowOptions {
  itemCount: number;
  initialActiveIndex?: number;
}

export interface VerticalCoverFlowItemMeta {
  index: number;
  distance: number;
  absDistance: number;
  isActive: boolean;
  isAdjacent: boolean;
}

const normalizeIndex = (index: number, itemCount: number) => {
  if (itemCount <= 0) return 0;
  return ((index % itemCount) + itemCount) % itemCount;
};

const getCircularDistance = (fromIndex: number, toIndex: number, itemCount: number) => {
  if (itemCount <= 0) return 0;

  const forward = normalizeIndex(toIndex - fromIndex, itemCount);
  if (forward === 0) return 0;

  return forward > itemCount / 2 ? forward - itemCount : forward;
};

export function useVerticalCoverFlow({
  itemCount,
  initialActiveIndex = 0,
}: VerticalCoverFlowOptions) {
  const [activeIndex, setActiveIndex] = useState(() => normalizeIndex(initialActiveIndex, itemCount));

  useEffect(() => {
    setActiveIndex((current) => {
      if (itemCount <= 0) return 0;
      return normalizeIndex(current, itemCount);
    });
  }, [itemCount]);

  useEffect(() => {
    setActiveIndex((current) => {
      if (itemCount <= 0) return 0;
      const normalizedInitial = normalizeIndex(initialActiveIndex, itemCount);
      return current === normalizedInitial ? current : normalizedInitial;
    });
  }, [initialActiveIndex, itemCount]);

  const rotate = useCallback((step: number) => {
    if (itemCount <= 0 || step === 0) return;
    setActiveIndex((current) => normalizeIndex(current + step, itemCount));
  }, [itemCount]);

  const selectIndex = useCallback((index: number) => {
    if (itemCount <= 0) return;
    setActiveIndex(normalizeIndex(index, itemCount));
  }, [itemCount]);

  const getItemMeta = useCallback((index: number): VerticalCoverFlowItemMeta => {
    const normalizedIndex = normalizeIndex(index, itemCount);
    const distance = getCircularDistance(activeIndex, normalizedIndex, itemCount);
    const absDistance = Math.abs(distance);

    return {
      index: normalizedIndex,
      distance,
      absDistance,
      isActive: distance === 0,
      isAdjacent: absDistance === 1,
    };
  }, [activeIndex, itemCount]);

  const getStepFromSwipe = useCallback((offsetY: number, offsetX: number, velocityY = 0) => {
    if (itemCount <= 1) return 0;

    const absY = Math.abs(offsetY);
    const absX = Math.abs(offsetX);
    const absVelocityY = Math.abs(velocityY);

    if (absY <= 40 || absY <= absX) return 0;
    if (absVelocityY <= 100 && absY <= 56) return 0;

    return offsetY < 0 ? 1 : -1;
  }, [itemCount]);

  const visibleIndices = useMemo(() => {
    if (itemCount <= 0) return [] as number[];

    return [-2, -1, 0, 1, 2].map((offset) => normalizeIndex(activeIndex + offset, itemCount));
  }, [activeIndex, itemCount]);

  return {
    activeIndex,
    setActiveIndex,
    rotate,
    selectIndex,
    getItemMeta,
    getStepFromSwipe,
    visibleIndices,
  };
}

export { getCircularDistance, normalizeIndex };
