import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export interface PillCarouselItem {
  id: string;
  label: string;
  image: string;
}

// Figma originals × 1.4
const PILLS = [
  { w: 725, h: 490, r: 36  }, // center
  { w: 125, h: 405, r: 999 }, // ±1
  { w: 74,  h: 333, r: 999 }, // ±2
  { w: 27,  h: 242, r: 999 }, // ±3
];

const GAP = 20;
const STAGE_HEIGHT = 540;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const VISIBLE = 3;

function getX(offset: number): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = PILLS[Math.min(i, PILLS.length - 1)];
    const b = PILLS[Math.min(i + 1, PILLS.length - 1)];
    x += a.w / 2 + GAP + b.w / 2;
  }
  return x * dir;
}

const PillCarousel = ({ items, onSelect }: { items: PillCarouselItem[]; onSelect: (id: string) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const n = items.length;
  const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + n) % n);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % n);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [n]);

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) setActiveIndex((i) => (i + 1) % n);
          else setActiveIndex((i) => (i - 1 + n) % n);
        }
        touchStartX.current = null;
      }}
    >
      <div className="relative w-full" style={{ height: STAGE_HEIGHT, marginTop: 16 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {slots.map((offset) => {
            const itemIndex = (activeIndex + offset + n) % n;
            const item = items[itemIndex];
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            const pill = PILLS[Math.min(absOffset, PILLS.length - 1)];
            const x = getX(offset);

            return (
              <motion.div
                key={`slot-${offset}`}
                initial={false}
                animate={{ x, zIndex: VISIBLE + 1 - absOffset, opacity: 1 }}
                transition={SPRING}
                className="absolute overflow-hidden cursor-pointer"
                style={{
                  width: pill.w,
                  height: pill.h,
                  borderRadius: pill.r,
                  boxShadow: isActive
                    ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                    : "0 4px 16px rgba(0,0,0,0.12)",
                }}
                onClick={() => {
                  if (isActive) onSelect(item.id);
                  else setActiveIndex((activeIndex + offset + n) % n);
                }}
              >
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                {isActive && (
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="px-3 py-1 font-semibold"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15,
                        color: "#fff",
                        background: "rgba(45,104,112,0.45)",
                        borderRadius: 999,
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PillCarousel;
