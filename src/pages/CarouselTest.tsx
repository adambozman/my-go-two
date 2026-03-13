import { useState, useRef } from "react";
import { motion } from "framer-motion";

const TEST_ITEMS = [
  { id: "1", label: "Tops",        img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80" },
  { id: "2", label: "Bottoms",     img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id: "3", label: "Outerwear",   img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
  { id: "4", label: "Basics",      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
  { id: "5", label: "Formal",      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { id: "6", label: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
];

// ── Exact Figma measurements ──
const CARDS = [
  { w: 518, h: 350, radius: 42 }, // center (0)
  { w: 89,  h: 289, radius: 42 }, // ±1
  { w: 53,  h: 238, radius: 42 }, // ±2
  { w: 19,  h: 173, radius: 42 }, // ±3
];

const GAP = 30;
const SPRING = { type: "spring", stiffness: 320, damping: 32 };

function getCard(offset: number) {
  const abs = Math.min(Math.abs(offset), CARDS.length - 1);
  const opacity = [1, 0.88, 0.7, 0.45][abs];
  return { ...CARDS[abs], opacity, z: 10 - abs };
}

// Position x so there's exactly GAP pixels between each card's edges
function getX(offset: number): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = CARDS[Math.min(i, CARDS.length - 1)];
    const b = CARDS[Math.min(i + 1, CARDS.length - 1)];
    x += a.w / 2 + GAP + b.w / 2;
  }
  return x * dir;
}

const STAGE_H = CARDS[0].h + 80;

const PillCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const n = TEST_ITEMS.length;
  const slots = [-3, -2, -1, 0, 1, 2, 3];
  const go = (dir: number) => setActiveIndex((i) => (i + dir + n) % n);

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ height: STAGE_H }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {slots.map((offset) => {
        const itemIndex = (activeIndex + offset + n) % n;
        const item = TEST_ITEMS[itemIndex];
        const { w, h, radius, opacity, z } = getCard(offset);
        const isActive = offset === 0;
        const x = getX(offset);

        return (
          <motion.div
            key={`slot-${offset}`}
            initial={false}
            animate={{ x, width: w, height: h, borderRadius: radius, opacity, zIndex: z }}
            transition={SPRING}
            className="absolute overflow-hidden cursor-pointer"
            style={{
              boxShadow: isActive
                ? "0 20px 50px rgba(0,0,0,0.20)"
                : "0 4px 16px rgba(0,0,0,0.10)",
            }}
            onClick={() => { if (!isActive) go(offset > 0 ? 1 : -1); }}
          >
            <motion.img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              animate={{ scale: isActive ? 1 : 1.06 }}
              transition={SPRING}
            />
            {isActive && (
              <div className="absolute bottom-5 left-5">
                <span
                  className="text-white text-sm font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(45,104,112,0.85)", letterSpacing: "0.04em" }}
                >
                  {item.label}
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const CarouselTest = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-8"
    style={{ background: "#efe0cf" }}
  >
    <div className="text-center">
      <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(45,104,112,0.6)" }}>
        Style &amp; Fit
      </p>
      <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, fontWeight: 600, color: "#2d6870" }}>
        Clothing
      </h1>
    </div>
    <PillCarousel />
    <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(45,104,112,0.45)" }}>
      Swipe or click to explore
    </p>
  </div>
);

export default CarouselTest;
