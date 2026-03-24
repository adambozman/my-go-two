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
    <>
      <div className="absolute right-8 top-8 z-[250] flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          className="h-12 w-12 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55"
          onClick={onPrevious}
        >
          <ChevronLeft className="mx-auto h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Next"
          className="h-12 w-12 rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/55"
          onClick={onNext}
        >
          <ChevronRight className="mx-auto h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 z-[250] flex -translate-x-1/2 items-center gap-2">
        {Array.from({ length: itemCount }).map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.button
              key={`dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              animate={{ width: isActive ? 24 : 8, opacity: isActive ? 1 : 0.35 }}
              transition={WEB_COVERFLOW_MOTION.controls}
              className="h-2 rounded-full bg-white"
              onClick={() => onDotSelect(index)}
            />
          );
        })}
      </div>
    </>
  );
}
