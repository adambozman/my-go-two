import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SubtypeItem {
  id: string;
  name: string;
  image: string;
  fields: { label: string; type: "text" | "select"; value: string; options?: string[] }[];
}

interface TemplateCoverFlowProps {
  templateName: string;
  subtypes: SubtypeItem[];
  onBack: () => void;
  onSelect: (subtype: SubtypeItem) => void;
  creating: boolean;
}

const TemplateCoverFlow = ({ templateName, subtypes, onBack, onSelect, creating }: TemplateCoverFlowProps) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(subtypes.length / 2));

  const goLeft = () => setActiveIndex((i) => (i - 1 + subtypes.length) % subtypes.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % subtypes.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-primary">{templateName}</h1>
      </div>

      <p className="text-muted-foreground text-center mb-6 text-sm">
        Choose a type to get started
      </p>

      {/* Cover Flow */}
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
        <div className="relative w-full h-[340px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {subtypes.map((subtype, index) => {
              // Calculate shortest circular offset
              let offset = index - activeIndex;
              const half = subtypes.length / 2;
              if (offset > half) offset -= subtypes.length;
              if (offset < -half) offset += subtypes.length;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              if (absOffset > 2) return null;

              // Positioning: active card in center, others spread out
              const xOffset = offset * 180;
              const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
              const zIndex = 10 - absOffset;
              const blur = isActive ? 0 : 2;
              const opacity = isActive ? 1 : 0.5;

              return (
                <motion.div
                  key={subtype.id}
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
                      onSelect(subtype);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div
                    className={`card-design-neumorph overflow-hidden rounded-2xl transition-shadow duration-300 ${
                      isActive ? "ring-2 ring-primary shadow-2xl" : ""
                    }`}
                    style={{ width: 220, height: 300 }}
                  >
                    <div className="h-[210px] overflow-hidden">
                      <img
                        src={subtype.image}
                        alt={subtype.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className={`font-semibold text-base ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {subtype.name}
                      </h3>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-muted-foreground mt-1"
                        >
                          Tap to start
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

      {/* Active card info */}
      <div className="text-center mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={subtypes[activeIndex].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-xl font-bold text-primary">{subtypes[activeIndex].name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {subtypes[activeIndex].fields.length} fields to fill out
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TemplateCoverFlow;
