import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useRegisterCarousel } from "@/contexts/CarouselDotsContext";
import CardEditButton from "@/components/CardEditButton";

/**
 * CategoryCoverFlow — the single global coverflow used on every page.
 *
 * Visual: GoTwoCard style (frosted glass pill, teal glow, left/right arrows).
 * Behavior: center card is active. Flanking cards are smaller + faded.
 * Click flanking card → centers it. Click active card → fires onSelect.
 * Bottom dots rendered by BottomCarouselDots via CarouselDotsContext.
 */

interface CategoryCoverFlowItem {
  id: string;
  name: string;
  image: string;
  fieldCount?: number;
  isCustom?: boolean;
}

interface CategoryCoverFlowProps {
  items: CategoryCoverFlowItem[];
  onSelect: (id: string) => void;
  onAdd?: () => void;
  onDelete?: (id: string) => void;
  disabled?: boolean;
  initialIndex?: number;
}

const ACTIVE_W = 260;
const ACTIVE_H = 360;
const ACTIVE_W_MD = 300;
const ACTIVE_H_MD = 420;
const FLANK_W = 120;
const FLANK_H = 200;
const FLANK_W_MD = 160;
const FLANK_H_MD = 260;
const X_GAP = 220;
const X_GAP_MD = 260;
const MAX_VISIBLE = 2;
const STAGE_H = 460;
const BORDER_RADIUS = 16;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

const CategoryCoverFlow = ({
  items,
  onSelect,
  onAdd,
  onDelete,
  disabled = false,
  initialIndex,
}: CategoryCoverFlowProps) => {
  const allCards = [
    ...items.map((item) => ({ ...item, isAdd: false as const })),
    ...(onAdd
      ? [{ id: "__add__", name: "Add Your Own", image: "", fieldCount: 0, isAdd: true as const, isCustom: false }]
      : []),
  ];

  const defaultIndex = initialIndex ?? Math.floor(items.length / 2);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useRegisterCarousel(allCards.length, activeIndex, setActiveIndex);

  const isMd = typeof window !== "undefined" && window.innerWidth >= 768;
  const cardW = isMd ? ACTIVE_W_MD : ACTIVE_W;
  const cardH = isMd ? ACTIVE_H_MD : ACTIVE_H;
  const flankW = isMd ? FLANK_W_MD : FLANK_W;
  const flankH = isMd ? FLANK_H_MD : FLANK_H;
  const xGap = isMd ? X_GAP_MD : X_GAP;

  if (allCards.length === 0) return null;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full overflow-hidden" style={{ height: STAGE_H }}>

        {/* Left arrow */}
        {activeIndex > 0 && (
          <button
            onClick={() => !disabled && setActiveIndex((i) => i - 1)}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            aria-label="Previous"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        )}

        {/* Cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          {allCards.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            if (absOffset > MAX_VISIBLE) return null;

            const isActive = offset === 0;
            const w = isActive ? cardW : flankW;
            const h = isActive ? cardH : flankH;
            const scale = isActive ? 1 : Math.max(0.55, 1 - absOffset * 0.18);
            const opacity = isActive ? 1 : Math.max(0.35, 0.65 - absOffset * 0.15);

            return (
              <motion.div
                key={item.id}
                animate={{ x: offset * xGap, scale, opacity, zIndex: MAX_VISIBLE + 1 - absOffset }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ pointerEvents: disabled ? "none" : "auto" }}
                onClick={() => {
                  if (!isActive) { setActiveIndex(index); return; }
                  if (item.isAdd && onAdd) { onAdd(); return; }
                  onSelect(item.id);
                }}
              >
                <div
                  className="overflow-hidden relative"
                  style={{
                    width: w,
                    height: h,
                    borderRadius: BORDER_RADIUS,
                    boxShadow: isActive
                      ? "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)"
                      : "0 4px 16px rgba(0,0,0,0.12)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  {item.isAdd ? (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{ background: "linear-gradient(135deg, var(--swatch-viridian-odyssey), var(--swatch-teal))" }}
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                        <Plus className="w-7 h-7 text-white" />
                      </div>
                      <div
                        className="px-[14px] py-[6px] rounded-full text-white text-[13px] font-semibold"
                        style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}
                      >
                        Add Your Own
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden">
                      {isActive && <CardEditButton title={item.name} />}

                      {item.image ? (
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--swatch-teal-mid), var(--swatch-viridian-odyssey))" }} />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Frosted glass pill */}
                      <div
                        className="absolute bottom-3 left-3 px-[14px] py-[6px] rounded-full text-white text-[13px] font-semibold"
                        style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}
                      >
                        {item.name}
                      </div>

                      {isActive && item.isCustom && onDelete && (
                        <button
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-destructive/80 transition-colors z-10"
                          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow */}
        {activeIndex < allCards.length - 1 && (
          <button
            onClick={() => !disabled && setActiveIndex((i) => i + 1)}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCoverFlow;
