import { useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface MobileEntryCoverflowItem {
  id: string;
  label: string;
  image?: string;
}

interface MobileEntryCoverflowProps {
  items: MobileEntryCoverflowItem[];
  activeIndex: number;
  previousImage?: string;
  onActiveIndexChange: (index: number) => void;
  renderActiveCard: (item: MobileEntryCoverflowItem) => React.ReactNode;
}

export default function MobileEntryCoverflow({
  items,
  activeIndex,
  previousImage,
  onActiveIndexChange,
  renderActiveCard,
}: MobileEntryCoverflowProps) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  if (items.length === 0) return null;

  const activeItem = items[Math.min(activeIndex, items.length - 1)];
  const previousItem = items[(activeIndex - 1 + items.length) % items.length];
  const nextItem = items[(activeIndex + 1) % items.length];

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null || items.length <= 1) return;

    const dx = touchStartX.current - event.changedTouches[0].clientX;
    const dy = touchStartY.current - event.changedTouches[0].clientY;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        setDirection(1);
        onActiveIndexChange((activeIndex + 1) % items.length);
      } else {
        setDirection(-1);
        onActiveIndexChange((activeIndex - 1 + items.length) % items.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const flankImage = previousImage || previousItem.image || nextItem.image || "";

  return (
    <div
      className="relative flex w-full flex-col items-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex w-full items-center justify-center px-3 pb-3 pt-4">
        {items.length > 1 ? (
          <>
            <div className="absolute left-0 top-8 h-32 w-24 overflow-hidden rounded-[20px] opacity-50 blur-[0.5px]">
              {flankImage ? <img src={flankImage} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="absolute right-0 top-8 h-32 w-24 overflow-hidden rounded-[20px] opacity-50 blur-[0.5px]">
              {flankImage ? <img src={flankImage} alt="" className="h-full w-full object-cover" /> : null}
            </div>
          </>
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -24 : 24, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[28px] shadow-[0_0_24px_6px_rgba(45,104,112,0.45),0_8px_32px_rgba(0,0,0,0.18)]"
            style={{ minHeight: "min(68vh, 720px)" }}
          >
            {renderActiveCard(activeItem)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
