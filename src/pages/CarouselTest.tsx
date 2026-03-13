import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

// Figma originals × 1.4:
// Center: 518×350 → 725×490
// ±1:      89×289 → 125×405
// ±2:      53×238 →  74×333
// ±3:      19×173 →  27×242
const DESKTOP = [
  { w: 725, h: 490, radius: 36  }, // center
  { w: 125, h: 405, radius: 999 }, // ±1
  { w: 74,  h: 333, radius: 999 }, // ±2
  { w: 27,  h: 242, radius: 999 }, // ±3
];

const MOBILE = [
  { w: 220, h: 160, radius: 24  },
  { w: 68,  h: 140, radius: 999 },
  { w: 42,  h: 108, radius: 999 },
  { w: 22,  h: 78,  radius: 999 },
];

const DESKTOP_GAP = 20;
const MOBILE_GAP  = 12;

const SPRING = { type: "spring", stiffness: 300, damping: 30 };

function getX(offset: number, cards: typeof DESKTOP, gap: number): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = cards[Math.min(i, cards.length - 1)];
    const b = cards[Math.min(i + 1, cards.length - 1)];
    x += a.w / 2 + gap + b.w / 2;
  }
  return x * dir;
}

const PillCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const cards = isMobile ? MOBILE : DESKTOP;
  const gap   = isMobile ? MOBILE_GAP : DESKTOP_GAP;
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
        const abs = Math.min(Math.abs(offset), cards.length - 1);
        const { w, h, radius } = cards[abs];
        const opacity = 1;
        const z = 10 - abs;
        const isActive = offset === 0;
        const x = getX(offset, cards, gap);

        return (
          <motion.div
            key={`slot-${offset}`}
            initial={false}
            animate={{ x, width: w, height: h, borderRadius: radius, opacity, zIndex: z }}
            transition={SPRING}
            className="absolute overflow-hidden cursor-pointer"
            style={{ boxShadow: isActive ? "0 16px 40px rgba(0,0,0,0.16)" : "0 4px 12px rgba(0,0,0,0.08)" }}
            onClick={() => { if (!isActive) go(offset > 0 ? 1 : -1); }}
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
            />
            {isActive && (
              <div className="absolute bottom-3 left-3">
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

const CarouselTest = () => (
  <div className="app-page h-screen flex flex-col overflow-hidden">
    <DashboardTopBar />
    <main
      className="flex-1 min-h-0 px-8 flex flex-col items-center justify-center gap-6"
      style={{ paddingBottom: "var(--footer-height)" }}
    >
      <p className="section-header text-center">Style & Fit</p>
      <PillCarousel />
    </main>
    <AppSidebar />
  </div>
);

export default CarouselTest;
