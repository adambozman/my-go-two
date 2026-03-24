import { ChevronLeft, ChevronRight } from "lucide-react";
import { WEB_COVERFLOW_MOTION } from "@/platform-ui/web/coverflow-v2/webCoverflow.motion";
import { motion } from "framer-motion";

interface WebCoverflowControlsProps {
  itemCount: number;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotSelect: (index: number) => void;
}

export function WebCoverflowControls({ itemCount, activeIndex, onPrevious, onNext, onDotSelect }: WebCoverflowControlsProps) {
  if (itemCount <= 1) return null;

  return (
    <div className="absolute bottom-3 left-1/2 z-[250] flex -translate-x-1/2 items-center gap-4">
      <button
        type="button"
        aria-label="Previous"
        className="h-11 w-11 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] text-[var(--swatch-teal)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur hover:bg-[rgba(255,255,255,0.88)]"
        onClick={onPrevious}
      >
        <ChevronLeft className="mx-auto h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 rounded-full border border-white/60 bg-[rgba(255,255,255,0.34)] px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.10)] backdrop-blur">
        {Array.from({ length: itemCount }).map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              key={`dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              animate={{ width: isActive ? 22 : 7, opacity: isActive ? 1 : 0.45 }}
              transition={WEB_COVERFLOW_MOTION.controls}
              className="h-[7px] rounded-full bg-white"
              onClick={() => onDotSelect(index)}
            />
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next"
        className="h-11 w-11 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] text-[var(--swatch-teal)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur hover:bg-[rgba(255,255,255,0.88)]"
        onClick={onNext}
      >
        <ChevronRight className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
}
