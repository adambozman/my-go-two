import { forwardRef, useEffect, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GoTwoCard from "@/components/ui/GoTwoCard";
import type { CoverFlowItem } from "@/components/ui/CoverFlowCarousel";

interface MobileCoverFlowProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
  initialActiveIndex?: number;
  sectionTitle?: string;
}

const MobileCoverFlow = forwardRef<HTMLDivElement, MobileCoverFlowProps>(
  ({ items, onSelect, initialActiveIndex = 0, sectionTitle }, ref) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [direction, setDirection] = useState<1 | -1>(1);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const suppressNextClickRef = useRef(false);

    useEffect(() => {
      setActiveIndex((prev) => {
        if (items.length === 0) return 0;
        const normalized = ((initialActiveIndex % items.length) + items.length) % items.length;
        return prev === normalized ? prev : normalized;
      });
    }, [initialActiveIndex, items.length]);

    if (items.length === 0) return null;

    const activeItem = items[activeIndex];
    const mobileCardWidth = "min(calc(100vw - 24px), 460px)";
    const mobileCardHeight = "min(58vh, 560px)";

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;

      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        suppressNextClickRef.current = true;
        window.setTimeout(() => {
          suppressNextClickRef.current = false;
        }, 240);

        if (dx > 0) {
          setDirection(1);
          setActiveIndex((index) => (index + 1) % items.length);
        } else {
          setDirection(-1);
          setActiveIndex((index) => (index - 1 + items.length) % items.length);
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    return (
      <div
        ref={ref}
        className="relative w-full flex flex-col items-center"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full flex justify-center px-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: direction > 0 ? 28 : -28, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -28 : 28, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="w-full flex justify-center"
            >
              <GoTwoCard
                image={activeItem.image}
                label={activeItem.label}
                sectionTitle={sectionTitle}
                isActive
                cardWidth={mobileCardWidth as never}
                cardHeight={mobileCardHeight as never}
                borderRadius={24}
                onClick={() => {
                  if (!suppressNextClickRef.current) onSelect(activeItem.id);
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

MobileCoverFlow.displayName = "MobileCoverFlow";

export default MobileCoverFlow;
