/**
 * ============================================================
 * TEST PAGE — src/pages/test/CarouselTest.tsx
 * ============================================================
 * ALL changes stay in THIS FILE ONLY.
 * The following are READ-ONLY and must NEVER be modified:
 *   - src/components/*
 *   - src/lib/*
 *   - src/layouts/*
 *   - src/pages/dashboard/*
 *   - src/pages/*.tsx
 *   - src/App.tsx
 *   - src/index.css
 *   - Any file outside src/pages/test/
 * ============================================================
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopBar } from "@/components/DashboardTopBar";

// ─── Test data ───────────────────────────────────────────────────────────────

const TEST_ITEMS = [
  { id: "1", label: "Clothing",  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  { id: "2", label: "Footwear",  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: "3", label: "Grooming",  image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" },
  { id: "4", label: "Vibe",      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: "5", label: "Accessory", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { id: "6", label: "Taste",     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
];

// ─── Shared label/category style — used for both "Style & Fit" and "Clothing" ─

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#2D6870",
  lineHeight: 1,
};

const LABEL_GAP = 16; // fixed gap between label and top of card, all breakpoints

const MOBILE_LAYOUT = {
  cardWidth: 300, cardHeight: 420, borderRadius: 16,
  xGap: 190, stageHeight: 480, flankOpacity: 0.5,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

// ─── Desktop pill layout (Figma × 1.4) ───────────────────────────────────────

const PILLS = [
  { w: 725, h: 490, r: 36  }, // center
  { w: 125, h: 405, r: 999 }, // ±1
  { w: 74,  h: 333, r: 999 }, // ±2
  { w: 27,  h: 242, r: 999 }, // ±3
];
const PILL_GAP    = 20;
const PILL_STAGE  = 540;
const SPRING      = { type: "spring" as const, stiffness: 300, damping: 30 };
const VISIBLE     = 3;

function getPillX(offset: number): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = PILLS[Math.min(i, PILLS.length - 1)];
    const b = PILLS[Math.min(i + 1, PILLS.length - 1)];
    x += a.w / 2 + PILL_GAP + b.w / 2;
  }
  return x * dir;
}

// ─── Desktop pill carousel ────────────────────────────────────────────────────

const DesktopPillCarousel = ({ items }: { items: typeof TEST_ITEMS }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const n = items.length;
  const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex(i => (i - 1 + n) % n);
      if (e.key === "ArrowRight") setActiveIndex(i => (i + 1) % n);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [n]);

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) setActiveIndex(i => diff > 0 ? (i + 1) % n : (i - 1 + n) % n);
        touchStartX.current = null;
      }}
    >
      {/* Label above center card */}
      <div style={{ marginBottom: LABEL_GAP, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={items[activeIndex].label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={LABEL_STYLE}
          >
            {items[activeIndex].label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Stage */}
      <div className="relative w-full" style={{ height: PILL_STAGE }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {slots.map(offset => {
            const itemIndex = (activeIndex + offset + n) % n;
            const item = items[itemIndex];
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            const pill = PILLS[Math.min(absOffset, PILLS.length - 1)];
            const x = getPillX(offset);
            return (
              <motion.div
                key={`slot-${offset}`}
                initial={false}
                animate={{ x, zIndex: VISIBLE + 1 - absOffset, opacity: 1 }}
                transition={SPRING}
                className="absolute overflow-hidden cursor-pointer"
                style={{
                  width: pill.w, height: pill.h, borderRadius: pill.r,
                  boxShadow: isActive
                    ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                    : "0 4px 16px rgba(0,0,0,0.12)",
                }}
                onClick={() => !isActive && setActiveIndex((activeIndex + offset + n) % n)}
              >
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Mobile carousel (self-contained, mirrors real page) ──────────────────────

const MobileCarousel = ({ items }: { items: typeof TEST_ITEMS }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const { cardWidth, cardHeight, borderRadius, xGap, stageHeight, flankOpacity, spring } = MOBILE_LAYOUT;
  const n = items.length;
  const slots = Array.from({ length: 5 }, (_, i) => i - 2);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex(i => (i - 1 + n) % n);
      if (e.key === "ArrowRight") setActiveIndex(i => (i + 1) % n);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [n]);

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) setActiveIndex(i => diff > 0 ? (i + 1) % n : (i - 1 + n) % n);
        touchStartX.current = null;
      }}
    >
      {/* Label above center card */}
      <div style={{ marginBottom: LABEL_GAP, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={items[activeIndex].label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={LABEL_STYLE}
          >
            {items[activeIndex].label}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative w-full" style={{ height: stageHeight }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {slots.map(offset => {
            const itemIndex = (activeIndex + offset + n) % n;
            const item = items[itemIndex];
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            return (
              <motion.div
                key={`slot-${offset}`}
                initial={false}
                animate={{
                  x: offset * xGap,
                  scale: isActive ? 1 : 0.6,
                  opacity: isActive ? 1 : flankOpacity,
                  zIndex: 3 - absOffset,
                }}
                transition={spring}
                className="absolute overflow-hidden cursor-pointer"
                style={{
                  width: cardWidth, height: cardHeight, borderRadius,
                  boxShadow: isActive
                    ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                    : "0 4px 16px rgba(0,0,0,0.12)",
                }}
                onClick={() => !isActive && setActiveIndex((activeIndex + offset + n) % n)}
              >
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CarouselTest = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="app-page h-screen flex flex-col overflow-hidden">
      <DashboardTopBar />
      <main
        className="flex-1 min-h-0 px-8 flex flex-col items-center justify-center gap-6"
        style={{ paddingBottom: "var(--footer-height)" }}
      >
        <p style={{ ...LABEL_STYLE, marginBottom: 0 }}>Style & Fit</p>
        {isDesktop
          ? <DesktopPillCarousel items={TEST_ITEMS} />
          : <MobileCarousel items={TEST_ITEMS} />
        }
      </main>
      <AppSidebar />
    </div>
  );
};

export default CarouselTest;
