import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopBar } from "@/components/DashboardTopBar";

const TEST_ITEMS = [
  { id: "1", label: "Clothing",    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  { id: "2", label: "Footwear",    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: "3", label: "Grooming",    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" },
  { id: "4", label: "Vibe",        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: "5", label: "Accessory",   img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { id: "6", label: "Taste",       img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
];

// All cards same vertical center
// Center: biggest, landscape-ish with large radius
// Each step out: smaller in BOTH width and height, pill shape
// No overlay, no blur, no tint
const CARDS = [
  { w: 480, h: 320, radius: 36  }, // center
  { w: 140, h: 280, radius: 999 }, // ±1
  { w: 88,  h: 220, radius: 999 }, // ±2
  { w: 44,  h: 160, radius: 999 }, // ±3
];

const GAP = 20;
const SPRING = { type: "spring", stiffness: 300, damping: 30 };

function getCard(offset: number) {
  const abs = Math.min(Math.abs(offset), CARDS.length - 1);
  const opacity = [1, 0.85, 0.65, 0.4][abs];
  return { ...CARDS[abs], opacity, z: 10 - abs };
}

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

const PillCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const n = TEST_ITEMS.length;
  const slots = [-3, -2, -1, 0, 1, 2, 3];
  const go = (dir: number) => setActiveIndex((i) => (i + dir + n) % n);

  return (
    <div
      className="relative flex items-center justify-center w-full h-full"
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
            style={{ boxShadow: isActive ? "0 20px 48px rgba(0,0,0,0.18)" : "0 4px 16px rgba(0,0,0,0.08)" }}
            onClick={() => { if (!isActive) go(offset > 0 ? 1 : -1); }}
          >
            <motion.img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              animate={{ scale: isActive ? 1 : 1.05 }}
              transition={SPRING}
            />
            {isActive && (
              <div
                className="absolute bottom-4 left-4"
              >
                <span
                  className="text-white text-sm font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(45,104,112,0.9)", letterSpacing: "0.04em" }}
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

const CarouselTest = () => {
  return (
    <div className="app-page h-screen flex flex-col overflow-hidden">
      <DashboardTopBar />
      <main
        className="flex-1 min-h-0 flex flex-col items-center justify-center"
        style={{ paddingBottom: "var(--footer-height)" }}
      >
        <p className="section-header text-center mb-6">Style & Fit</p>
        <PillCarousel />
      </main>
      <AppSidebar />
    </div>
  );
};

export default CarouselTest;
