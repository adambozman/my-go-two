import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import spare001 from "@/assets/spare/spare-001.jpg";
import spare002 from "@/assets/spare/spare-002.jpg";
import spare003 from "@/assets/spare/spare-003.jpg";
import spare004 from "@/assets/spare/spare-004.jpg";
import spare005 from "@/assets/spare/spare-005.jpg";
import spare006 from "@/assets/spare/spare-006.jpg";
import spare007 from "@/assets/spare/spare-007.jpg";

type CoverflowItem = {
  id: string;
  image: string;
  alt: string;
};

type CardPose = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  rotateY: number;
  zIndex: number;
  brightness: number;
};

const CARD_WIDTH = 244;
const CARD_HEIGHT = 376;

const POSES: Record<number, CardPose> = {
  [-3]: { x: -452, y: 138, scale: 0.71, rotate: -24, rotateY: 32, zIndex: 10, brightness: 0.66 },
  [-2]: { x: -320, y: 76, scale: 0.81, rotate: -16, rotateY: 22, zIndex: 20, brightness: 0.78 },
  [-1]: { x: -172, y: 22, scale: 0.94, rotate: -8, rotateY: 11, zIndex: 30, brightness: 0.92 },
  [0]: { x: 0, y: 0, scale: 1.17, rotate: 0, rotateY: 0, zIndex: 40, brightness: 1 },
  [1]: { x: 172, y: 22, scale: 0.94, rotate: 8, rotateY: -11, zIndex: 30, brightness: 0.92 },
  [2]: { x: 320, y: 76, scale: 0.81, rotate: 16, rotateY: -22, zIndex: 20, brightness: 0.78 },
  [3]: { x: 452, y: 138, scale: 0.71, rotate: 24, rotateY: -32, zIndex: 10, brightness: 0.66 },
};

const ITEMS: CoverflowItem[] = [
  { id: "spare-001", image: spare001, alt: "Floral astronaut editorial portrait" },
  { id: "spare-002", image: spare002, alt: "Portrait with flower crown cap" },
  { id: "spare-003", image: spare003, alt: "Glitch fashion editorial portrait" },
  { id: "spare-004", image: spare004, alt: "Underwater cinematic portrait" },
  { id: "spare-005", image: spare005, alt: "Stone statue portrait with purple flowers" },
  { id: "spare-006", image: spare006, alt: "Prismatic portrait with bright reflections" },
  { id: "spare-007", image: spare007, alt: "Red neon visor editorial portrait" },
];

function normalizeIndex(index: number, length: number) {
  return (index + length) % length;
}

function getWrappedOffset(index: number, activeIndex: number, length: number) {
  const raw = index - activeIndex;
  const half = Math.floor(length / 2);

  if (raw > half) {
    return raw - length;
  }

  if (raw < -half) {
    return raw + length;
  }

  return raw;
}

export default function MyGoTwoWebCoverflowStage() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const visibleItems = useMemo(
    () =>
      ITEMS.map((item, index) => ({
        ...item,
        offset: getWrappedOffset(index, activeIndex, ITEMS.length),
      })).filter((item) => Math.abs(item.offset) <= 3),
    [activeIndex],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => normalizeIndex(current - 1, ITEMS.length));
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => normalizeIndex(current + 1, ITEMS.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  return (
    <section
      aria-label="My Go Two coverflow"
      className="relative mx-auto w-full max-w-[1220px]"
      style={{ height: "500px" }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute inset-x-0 top-0 bottom-[80px] overflow-hidden"
          style={{ perspective: "1400px" }}
        >
          <div className="absolute inset-x-0 top-[6px] flex h-[380px] items-start justify-center">
            {visibleItems.map((item) => {
              const pose = POSES[item.offset];
              const itemIndex = ITEMS.findIndex((entry) => entry.id === item.id);
              const isHovered = hoveredIndex === itemIndex && item.offset !== 0;
              const hoverScale = isHovered ? 0.03 : 0;
              const hoverLift = isHovered ? -10 : 0;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(itemIndex)}
                  onMouseEnter={() => setHoveredIndex(itemIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  aria-label={`Show slide ${itemIndex + 1}`}
                  className="absolute overflow-hidden rounded-[34px] border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.45)]"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    zIndex: pose.zIndex,
                    transformOrigin: "center bottom",
                    transformStyle: "preserve-3d",
                  }}
                  initial={false}
                  animate={{
                    x: pose.x,
                    y: pose.y + hoverLift,
                    scale: pose.scale + hoverScale,
                    rotate: pose.rotate,
                    rotateY: pose.rotateY,
                    opacity: 1,
                    filter: `brightness(${pose.brightness}) saturate(${item.offset === 0 ? 1.02 : 0.94})`,
                    boxShadow:
                      item.offset === 0
                        ? "0 28px 64px rgba(18,35,54,0.24)"
                        : "0 16px 42px rgba(18,35,54,0.18)",
                  }}
                  transition={transition}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => setActiveIndex((current) => normalizeIndex(current - 1, ITEMS.length))}
            aria-label="Previous card"
            className="flex h-14 w-14 items-center justify-center rounded-full border-0 text-[#26495d] shadow-[0_16px_30px_rgba(38,73,93,0.16)] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.42)]"
            style={{
              background: "rgba(255,255,255,0.68)",
              backdropFilter: "blur(14px)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {ITEMS.map((item, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={active}
                  className="rounded-full border-0 p-0 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.42)]"
                  style={{
                    width: active ? "28px" : "8px",
                    height: "8px",
                    background: active ? "#101010" : "rgba(255,255,255,0.38)",
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((current) => normalizeIndex(current + 1, ITEMS.length))}
            aria-label="Next card"
            className="flex h-14 w-14 items-center justify-center rounded-full border-0 text-[#4f2f08] shadow-[0_18px_36px_rgba(255,110,20,0.22)] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,123,32,0.45)]"
            style={{
              background: "linear-gradient(180deg, #ff9133 0%, #ff6b17 100%)",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
