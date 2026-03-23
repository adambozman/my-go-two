import { useState, useEffect, useReducer, forwardRef } from "react";
import { motion } from "framer-motion";
import { CAROUSEL_LAYOUT_DESKTOP } from "@/lib/carouselConfig";
import GoTwoCard from "@/components/ui/GoTwoCard";
import { Pill } from "@/components/ui/pill";
import InlinePhotoSearch from "@/components/InlinePhotoSearch";
import { OVERRIDE_CHANGED_EVENT } from "@/lib/imageOverrides";

export interface WebCoverFlowItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
}

interface WebCoverFlowProps {
  items: WebCoverFlowItem[];
  onSelect: (id: string) => void;
  initialActiveIndex?: number;
  sectionTitle?: string;
}

const VISIBLE = 2;

const PILL_GAP = 20;

function getPillX(offset: number, pills: { w: number; h: number; r: number }[]): number {
  if (offset === 0) return 0;
  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let x = 0;
  for (let i = 0; i < abs; i++) {
    const a = pills[Math.min(i, pills.length - 1)];
    const b = pills[Math.min(i + 1, pills.length - 1)];
    x += a.w / 2 + PILL_GAP + b.w / 2;
  }
  return x * dir;
}

const WebCoverFlow = forwardRef<HTMLDivElement, WebCoverFlowProps>(
  ({ items, onSelect, initialActiveIndex = 0, sectionTitle }, ref) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
      const handler = () => forceUpdate();
      window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
      return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
    }, []);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + items.length) % items.length);
        if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % items.length);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [items.length]);

    useEffect(() => {
      setActiveIndex((prev) => {
        if (items.length === 0) return 0;
        const normalized = ((initialActiveIndex % items.length) + items.length) % items.length;
        return prev === normalized ? prev : normalized;
      });
    }, [initialActiveIndex, items.length]);

    if (items.length === 0) return null;

    const layout = CAROUSEL_LAYOUT_DESKTOP;
    const { xGap, stageHeight, flankOpacity, spring, cardWidth, cardHeight, borderRadius } = layout;
    const pills = layout.pills;
    const slots = Array.from({ length: VISIBLE * 2 + 1 }, (_, i) => i - VISIBLE);

    return (
      <div ref={ref} className="relative w-full flex flex-col items-center">
        <div
          className="relative w-full"
          style={{
            height: stageHeight,
            marginTop: 44,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {slots.map((offset) => {
              const itemIndex = (activeIndex + offset + items.length) % items.length;
              const item = items[itemIndex];
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const pill = pills[Math.min(absOffset, pills.length - 1)];
              const x = getPillX(offset, pills);

              return (
                <motion.button
                  key={`slot-${offset}`}
                  type="button"
                  initial={false}
                  animate={{ x, zIndex: VISIBLE + 1 - absOffset, opacity: 1 }}
                  transition={spring}
                  className="absolute cursor-pointer bg-transparent p-0 border-0"
                  style={{
                    width: pill.w,
                    height: pill.h,
                    borderRadius: pill.r,
                    pointerEvents: isActive ? "none" : "auto",
                    boxShadow: isActive
                      ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                      : "0 4px 16px rgba(0,0,0,0.12)",
                  }}
                  onClick={() => {
                    if (isActive) onSelect(item.id);
                    else setActiveIndex((current) => (current + offset + items.length) % items.length);
                  }}
                  aria-label={isActive ? `Open ${item.label}` : `Bring ${item.label} forward`}
                >
                  <div className="w-full h-full overflow-hidden" style={{ borderRadius: pill.r }}>
                    <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                  </div>
                  {isActive && (
                    <>
                      <div className="absolute bottom-6 left-6 flex flex-col items-start gap-1.5">
                        {sectionTitle && (
                          <Pill
                            variant="title"
                            size="default"
                            className="text-[var(--swatch-teal)]"
                            style={{
                              background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(250,244,236,0.86) 100%)",
                              border: "1px solid rgba(255,255,255,0.88)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                              fontSize: 14,
                            }}
                          >
                            {sectionTitle}
                          </Pill>
                        )}
                        <Pill variant="title" size="default">
                          {item.label}
                        </Pill>
                      </div>
                      <InlinePhotoSearch
                        imageKey={(item as any).imageKey || item.id}
                        label={item.label}
                        onImageChanged={forceUpdate}
                      />
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

WebCoverFlow.displayName = "WebCoverFlow";

export default WebCoverFlow;
