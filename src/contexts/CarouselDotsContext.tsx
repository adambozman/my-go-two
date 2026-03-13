import { createContext, useContext, useCallback, useRef, useSyncExternalStore } from "react";

interface CarouselState {
  count: number;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

interface CarouselDotsContextValue {
  register: (sectionIndex: number, state: CarouselState) => void;
  activeSectionIndex: React.MutableRefObject<number>;
  getState: () => CarouselState | null;
  subscribe: (cb: () => void) => () => void;
}

const CarouselDotsContext = createContext<CarouselDotsContextValue | null>(null);

/** Provide from SnapScrollLayout */
const SectionIndexContext = createContext<number>(0);

export function useCarouselDotsProvider() {
  const statesRef = useRef<Map<number, CarouselState>>(new Map());
  const activeSectionIndex = useRef(0);
  const listenersRef = useRef<Set<() => void>>(new Set());

  const notify = () => listenersRef.current.forEach((cb) => cb());

  const register = useCallback((sectionIndex: number, state: CarouselState) => {
    statesRef.current.set(sectionIndex, state);
    if (sectionIndex === activeSectionIndex.current) {
      notify();
    }
  }, []);

  const getState = useCallback((): CarouselState | null => {
    return statesRef.current.get(activeSectionIndex.current) ?? null;
  }, []);

  const subscribe = useCallback((cb: () => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const setActiveSection = useCallback((idx: number) => {
    activeSectionIndex.current = idx;
    notify();
  }, []);

  return { register, activeSectionIndex, getState, subscribe, setActiveSection };
}

export function useRegisterCarousel(count: number, activeIndex: number, setActiveIndex: (i: number) => void) {
  const ctx = useContext(CarouselDotsContext);
  const sectionIndex = useContext(SectionIndexContext);
  if (ctx) {
    ctx.register(sectionIndex, { count, activeIndex, setActiveIndex });
  }
}

export function useCarouselDots(): CarouselState | null {
  const ctx = useContext(CarouselDotsContext);
  const emptySubscribe = useCallback((cb: () => void) => () => {}, []);
  const emptyGetState = useCallback(() => null, []);
  const state = useSyncExternalStore(
    ctx ? ctx.subscribe : emptySubscribe,
    ctx ? ctx.getState : emptyGetState
  );
  return state;
}

export { CarouselDotsContext, SectionIndexContext };
