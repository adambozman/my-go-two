import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryCoverFlowProps {
  items: {
    id: string;
    name: string;
    image: string;
    fieldCount: number;
  }[];
  onSelect: (id: string) => void;
  disabled: boolean;
}

const CategoryCoverFlow = ({ items, onSelect, disabled }: CategoryCoverFlowProps) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));

  const goLeft = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % items.length);

  if (items.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center">
      {/* Left arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goLeft}
        className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Cards container */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {items.map((item, index) => {
            let offset = index - activeIndex;
            const half = items.length / 2;
            if (offset > half) offset -= items.length;
            if (offset < -half) offset += items.length;
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
                    onSelect(item.id);
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
                      <p className="text-white/70 text-xs mt-1">
                        {item.fieldCount} {item.fieldCount === 1 ? "field" : "fields"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right arrow */}
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
