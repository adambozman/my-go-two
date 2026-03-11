import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
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

const CategoryCoverFlow = ({ items, onSelect, onAdd, onDelete, disabled }: CategoryCoverFlowProps) => {
  // Append a virtual "add" card at the end
  const allCards = [
    ...items.map((item) => ({ ...item, isAdd: false as const })),
    ...(onAdd ? [{ id: "__add__", name: "Add Your Own", image: "", fieldCount: 0, isAdd: true as const, isCustom: false }] : []),
  ];

  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  const goLeft = () => setActiveIndex((i) => (i - 1 + allCards.length) % allCards.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % allCards.length);

  if (allCards.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={goLeft}
        className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

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

            const xOffset = offset * (isActive ? 190 : 170);
            const cardW = isActive ? 280 : 200;
            const cardH = isActive ? 380 : 250;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : 2;
            const opacity = isActive ? 1 : 0.5;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: xOffset,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                      <h3
                        className="text-white font-semibold text-sm"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Add Your Own
                      </h3>
                      <p className="text-white/60 text-xs px-6 text-center">
                        Create a custom list
                      </p>
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
                        <h3 className="text-white font-semibold text-sm leading-tight drop-shadow">
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

      <Button
        variant="ghost"
        size="icon"
        onClick={goRight}
        className="absolute right-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CategoryCoverFlow;
