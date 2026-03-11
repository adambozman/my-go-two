import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryCoverFlowProps {
  items: {
    id: string;
    name: string;
    image: string;
    fieldCount: number;
    isCustom?: boolean;
  }[];
  onSelect: (id: string) => void;
  onAdd?: () => void;
  onDelete?: (id: string) => void;
  disabled: boolean;
}

const CARD_W = 280;
const CARD_H = 380;
const FLANK_W = 160;
const FLANK_H = 260;
const X_GAP = 180;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

const CategoryCoverFlow = ({ items, onSelect, onAdd, onDelete, disabled }: CategoryCoverFlowProps) => {
  const allCards = [
    ...items.map((item) => ({ ...item, isAdd: false as const })),
    ...(onAdd ? [{ id: "__add__", name: "Add Your Own", image: "", fieldCount: 0, isAdd: true as const, isCustom: false }] : []),
  ];

  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));
  const swipe = useSwipeCarousel(setActiveIndex, allCards.length);

  const goLeft = () => setActiveIndex((i) => (i - 1 + allCards.length) % allCards.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % allCards.length);

  if (allCards.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="relative w-full h-[420px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {allCards.map((item, index) => {
            let offset = index - activeIndex;
            const half = allCards.length / 2;
            if (offset > half) offset -= allCards.length;
            if (offset < -half) offset += allCards.length;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : 1.8;
            const opacity = isActive ? 1 : 0.5;

            return (
              <motion.div
                key={item.id}
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ zIndex }}
                onClick={() => {
                  if (isActive) {
                    if (item.isAdd && onAdd) onAdd();
                    else onSelect(item.id);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                <div
                  className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: cardW, height: cardH }}
                >
                  {item.isAdd ? (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{
                        background: "linear-gradient(135deg, var(--swatch-viridian-odyssey), var(--swatch-teal))",
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                      >
                        <Plus className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="card-title">
                        Add Your Own
                      </h3>
                    </div>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="card-title leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      {isActive && item.isCustom && onDelete && (
                        <button
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-destructive/80 transition-colors z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                          }}
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
      </div>
    </div>
  );
};

export default CategoryCoverFlow;
