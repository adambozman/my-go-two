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
  const [activeIndex, setActiveIndex] = useState(0);

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
      <div className="relative w-full h-[280px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {items.map((item, index) => {
            let offset = index - activeIndex;
            const half = items.length / 2;
            if (offset > half) offset -= items.length;
            if (offset < -half) offset += items.length;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            const xOffset = offset * 170;
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
                  className={`card-design-neumorph overflow-hidden rounded-2xl transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: 200, height: 250 }}
                >
                  <div className="h-[175px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className={`font-semibold text-sm ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {item.name}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-muted-foreground mt-0.5"
                      >
                        {item.fieldCount} fields · Tap to start
                      </motion.p>
                    )}
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
