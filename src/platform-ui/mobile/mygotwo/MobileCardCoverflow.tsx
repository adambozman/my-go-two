import { forwardRef, useEffect, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileGoTwoCard from "@/platform-ui/mobile/mygotwo/MobileGoTwoCard";

export interface MobileCoverflowItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
}

interface MobileCardCoverflowProps {
  items: MobileCoverflowItem[];
  onSelect: (id: string) => void;
  initialActiveIndex?: number;
  sectionTitle?: string;
}

const MobileCardCoverflow = forwardRef<HTMLDivElement, MobileCardCoverflowProps>(
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

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
      touchStartX.current = event.touches[0].clientX;
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const dx = touchStartX.current - event.changedTouches[0].clientX;
      const dy = touchStartY.current - event.changedTouches[0].clientY;

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
        className="relative flex w-full flex-col items-center"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex w-full justify-center px-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: direction > 0 ? 28 : -28, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -28 : 28, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="flex w-full justify-center"
            >
              <MobileGoTwoCard
                image={activeItem.image}
                label={activeItem.label}
                sectionTitle={sectionTitle}
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

MobileCardCoverflow.displayName = "MobileCardCoverflow";

export default MobileCardCoverflow;
