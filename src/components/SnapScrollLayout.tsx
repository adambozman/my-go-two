import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselDotsContext, SectionIndexContext, useCarouselDotsProvider } from "@/contexts/CarouselDotsContext";
import { BottomCarouselDots, RightSectionDots } from "@/components/CarouselDotsOverlay";
import { HEADER_LAYOUT } from "@/lib/carouselConfig";

interface SnapSection {
  id: string;
  label: string;
  content: ReactNode;
}

interface SnapScrollLayoutProps {
  sections: SnapSection[];
}

// Swipe detection thresholds
const SWIPE_MIN_DISTANCE = 60;   // px — must travel this far vertically
const SWIPE_MIN_VELOCITY = 0.25; // px/ms — must be moving this fast
const COOLDOWN_MS = 450;         // ms — lock out re-triggers during transition

const VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 50 : -50 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -50 : 50 }),
};

const TRANSITION = { duration: 0.38, ease: [0.32, 0, 0.18, 1] as [number, number, number, number] };

const SnapScrollLayout = ({ sections }: SnapScrollLayoutProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dotsProvider = useCarouselDotsProvider();

  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isCoolingDown = useRef(false);

  const goTo = useCallback((next: number) => {
    if (isCoolingDown.current) return;
    const clamped = Math.max(0, Math.min(next, sections.length - 1));
    if (clamped === activeIndex) return;

    const dir = clamped > activeIndex ? 1 : -1;
    setDirection(dir);
    setActiveIndex(clamped);
    dotsProvider.setActiveSection(clamped);

    isCoolingDown.current = true;
    setTimeout(() => { isCoolingDown.current = false; }, COOLDOWN_MS);
  }, [activeIndex, sections.length, dotsProvider]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dy = touchStartY.current - e.changedTouches[0].clientY; // positive = swipe up = next
    const dt = Date.now() - touchStartTime.current;
    const velocity = Math.abs(dy) / dt;

    // Must meet distance OR velocity threshold (not both — catches both slow drags and fast flicks)
    if (Math.abs(dy) >= SWIPE_MIN_DISTANCE || velocity >= SWIPE_MIN_VELOCITY) {
      goTo(dy > 0 ? activeIndex + 1 : activeIndex - 1);
    }
  }, [activeIndex, goTo]);

  if (sections.length === 0) return null;

  const section = sections[activeIndex];

  return (
    <CarouselDotsContext.Provider value={dotsProvider}>
      <div
        className="relative w-full h-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Single section rendered at a time — framer-motion handles transition */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={section.id}
            custom={direction}
            variants={VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={TRANSITION}
            className="w-full h-full flex flex-col"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full relative">
                {/* Section label — centered above the coverflow */}
                <h3
                  className="section-header absolute z-20 left-0 right-0 text-center"
                  style={{
                    top: HEADER_LAYOUT.topOffset,
                    transform: HEADER_LAYOUT.transform,
                  }}
                >
                  {section.label}
                </h3>

                <SectionIndexContext.Provider value={activeIndex}>
                  {section.content}
                </SectionIndexContext.Provider>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom dots — card position within the active section's coverflow */}
        <BottomCarouselDots />

        {/* Right dots — which section we're on */}
        {sections.length > 1 && (
          <RightSectionDots
            count={sections.length}
            activeIndex={activeIndex}
            onSelect={goTo}
            labels={sections.map((s) => s.label)}
          />
        )}
      </div>
    </CarouselDotsContext.Provider>
  );
};

export default SnapScrollLayout;
