import { createContext, useContext, useCallback, useRef, useSyncExternalStore } from "react";

interface CarouselState {
  count: number;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

interface CarouselDotsContextValue {
  register: (state: CarouselState) => void;
  getState: () => CarouselState | null;
  subscribe: (cb: () => void) => () => void;
}

const CarouselDotsContext = createContext<CarouselDotsContextValue | null>(null);

export function useCarouselDotsProvider() {
  const stateRef = useRef<CarouselState | null>(null);
  const listenersRef = useRef<Set<() => void>>(new Set());

  const register = useCallback((state: CarouselState) => {
    stateRef.current = state;
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const getState = useCallback(() => stateRef.current, []);

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  return { register, getState, subscribe };
}

export function useRegisterCarousel(count: number, activeIndex: number, setActiveIndex: (i: number) => void) {
  const ctx = useContext(CarouselDotsContext);
  // Register on every render so the dots stay in sync
  if (ctx) {
    ctx.register({ count, activeIndex, setActiveIndex });
  }
}

export function useCarouselDots() {
  const ctx = useContext(CarouselDotsContext);
  if (!ctx) return null;

  const state = useSyncExternalStore(ctx.subscribe, ctx.getState);
  return state;
}

export { CarouselDotsContext };
