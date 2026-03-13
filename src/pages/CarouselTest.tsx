import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEST_ITEMS = [
  { id: "1", label: "Tops", color: "#2d6870", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" },
  { id: "2", label: "Bottoms", color: "#8B6F47", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: "3", label: "Outerwear", color: "#4a5568", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80" },
  { id: "4", label: "Basics", color: "#6B7280", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: "5", label: "Formal", color: "#1a202c", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { id: "6", label: "Accessories", color: "#744210", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
];

// ── Layout constants — tune these ──
const ACTIVE_W  = 280;
const ACTIVE_H  = 380;

const NEAR_W    = 180;  // offset ±1
const NEAR_H    = 300;

const FAR_W     = 100;  // offset ±2
const FAR_H     = 220;

const X_GAP     = 200;  // equal center-to-center spacing

const SPRING = { type: "spring", stiffness: 320, damping: 32 };

function getCardSize(offset: number) {
  const abs = Math.abs(offset);
  if (abs === 0) return { w: ACTIVE_W, h: ACTIVE_H, radius: 999, opacity: 1,    z: 10 };
  if (abs === 1) return { w: NEAR_W,   h: NEAR_H,   radius: 999, opacity: 0.85, z: 5  };
  return           { w: FAR_W,    h: FAR_H,    radius: 999, opacity: 0.65, z: 2  };
}

const PillCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const n = TEST_ITEMS.length;
  const slots = [-2, -1, 0, 1, 2];

  const go = (dir: number) => setActiveIndex((i) => (i + dir + n) % n);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: ACTIVE_H + 60, width: "100%" }}
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
        const { w, h, radius, opacity, z } = getCardSize(offset);
        const isActive = offset === 0;

        return (
          <motion.div
            key={`slot-${offset}`}
            initial={false}
            animate={{
              x: offset * X_GAP,
              width: w,
              height: h,
              borderRadius: radius,
              opacity,
              zIndex: z,
            }}
            transition={SPRING}
            className="absolute overflow-hidden cursor-pointer"
            style={{ boxShadow: isActive ? "0 24px 60px rgba(0,0,0,0.22)" : "0 8px 24px rgba(0,0,0,0.12)" }}
            onClick={() => {
              if (!isActive) go(offset > 0 ? 1 : -1);
            }}
          >
            {/* Image */}
            <motion.img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              animate={{ scale: isActive ? 1 : 1.1 }}
              transition={SPRING}
            />

            {/* Active card overlay + label */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col justify-end p-5"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)" }}
              >
                <span
                  className="text-white text-sm font-semibold px-3 py-1.5 rounded-full self-start"
                  style={{ background: "rgba(45,104,112,0.85)", backdropFilter: "blur(8px)", letterSpacing: "0.04em" }}
                >
                  {item.label}
                </span>
              </motion.div>
            )}

            {/* Flank tint overlay */}
            {!isActive && (
              <div
                className="absolute inset-0"
                style={{ background: "rgba(239,224,207,0.15)" }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const CarouselTest = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ background: "#efe0cf" }}
    >
      <div className="text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(45,104,112,0.6)" }}>
          Style &amp; Fit
        </p>
        <h1
          className="font-bold"
          style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, color: "#2d6870", letterSpacing: "-0.01em" }}
        >
          Clothing
        </h1>
      </div>

      <PillCarousel />

      <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(45,104,112,0.5)" }}>
        Swipe or click to explore
      </p>
    </div>
  );
};

export default CarouselTest;
