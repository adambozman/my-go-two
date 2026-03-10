import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { Check, X, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SwipeOption {
  id: string;
  label: string;
  emoji?: string;
  image?: string;
  localImage?: string;
}

interface SwipeQuestion {
  id: string;
  title: string;
  subtitle: string;
  type: "image-grid" | "pill-select" | "single-select" | "free-input";
  options?: SwipeOption[];
  placeholder?: string;
  multiSelect?: boolean;
}

interface SwipeCardsProps {
  questions: SwipeQuestion[];
  categoryName: string;
  onComplete: (selections: Record<string, string | string[]>) => void;
  onBack: () => void;
  getImage?: (optionId: string) => string;
}

// Unsplash fallback images by category keyword
const getCategoryFallbackImage = (label: string) => {
  return `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop&q=80`;
};

const SwipeCards = ({ questions, categoryName, onComplete, onBack, getImage }: SwipeCardsProps) => {
  // Flatten all options from all questions into swipeable items
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [freeTextAnswers, setFreeTextAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentQuestionIdx];
  if (!currentQuestion) {
    // All done
    const result: Record<string, string | string[]> = {};
    for (const q of questions) {
      if (q.type === "free-input") {
        if (freeTextAnswers[q.id]) result[q.id] = freeTextAnswers[q.id];
      } else {
        if (selections[q.id]?.length) result[q.id] = selections[q.id];
      }
    }
    onComplete(result);
    return null;
  }

  // Free-input questions get their own card
  if (currentQuestion.type === "free-input") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-design-neumorph p-8 w-full max-w-sm text-center"
          style={{ borderRadius: "1.5rem" }}
        >
          <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {currentQuestion.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{currentQuestion.subtitle}</p>
          <Input
            value={freeTextAnswers[currentQuestion.id] || ""}
            onChange={(e) => setFreeTextAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
            placeholder={currentQuestion.placeholder}
            className="rounded-xl border-0 bg-white/40 text-base h-12 placeholder:text-muted-foreground/60 mb-4"
          />
          <Button
            className="rounded-full w-full h-11"
            onClick={() => {
              setCurrentQuestionIdx(i => i + 1);
              setCurrentOptionIdx(0);
            }}
          >
            {freeTextAnswers[currentQuestion.id] ? "Next" : "Skip"}
          </Button>
        </motion.div>
      </div>
    );
  }

  // For single-select: show one card per option, selecting one auto-advances the question
  // For multi-select (image-grid, pill-select): swipe through each option
  const options = currentQuestion.options || [];
  const currentOption = options[currentOptionIdx];
  const isSingleSelect = currentQuestion.type === "single-select" || currentQuestion.multiSelect === false;
  const totalOptions = options.length;
  const selectedForQuestion = selections[currentQuestion.id] || [];

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExitDirection(direction);

    if (direction === "right" && currentOption) {
      // Select this option
      setSelections(prev => {
        const current = prev[currentQuestion.id] || [];
        if (isSingleSelect) {
          return { ...prev, [currentQuestion.id]: [currentOption.id] };
        }
        if (!current.includes(currentOption.id)) {
          return { ...prev, [currentQuestion.id]: [...current, currentOption.id] };
        }
        return prev;
      });

      // For single-select, advance to next question immediately
      if (isSingleSelect) {
        setTimeout(() => {
          setCurrentQuestionIdx(i => i + 1);
          setCurrentOptionIdx(0);
          setExitDirection(null);
          setIsAnimating(false);
        }, 300);
        return;
      }
    }

    // Advance to next option or next question
    setTimeout(() => {
      if (currentOptionIdx < totalOptions - 1) {
        setCurrentOptionIdx(i => i + 1);
      } else {
        setCurrentQuestionIdx(i => i + 1);
        setCurrentOptionIdx(0);
      }
      setExitDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const getOptionImage = (opt: SwipeOption): string | null => {
    if (getImage) {
      const img = getImage(opt.id);
      if (img) return img;
    }
    if (opt.localImage) return opt.localImage;
    if (opt.image) return `https://images.unsplash.com/photo-${opt.image}?w=400&h=500&fit=crop&q=80`;
    return null;
  };

  const optImage = currentOption ? getOptionImage(currentOption) : null;
  const hasImage = !!optImage;

  // Progress across all questions
  let totalItems = 0;
  let completedItems = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (q.type === "free-input") {
      totalItems += 1;
      if (i < currentQuestionIdx) completedItems += 1;
    } else {
      const optCount = q.options?.length || 0;
      totalItems += optCount;
      if (i < currentQuestionIdx) {
        completedItems += optCount;
      } else if (i === currentQuestionIdx) {
        completedItems += currentOptionIdx;
      }
    }
  }
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="flex flex-col items-center flex-1 px-4 pt-2">
      {/* Question title */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h3 className="text-lg font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          {currentQuestion.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {isSingleSelect ? "Swipe right to choose" : "Swipe right = yes, left = skip"}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {currentOptionIdx + 1} / {totalOptions}
        </p>
      </motion.div>

      {/* Card stack */}
      <div className="relative w-full max-w-[300px] h-[400px] flex items-center justify-center">
        {/* Next card preview */}
        {currentOptionIdx < totalOptions - 1 && options[currentOptionIdx + 1] && (
          <div
            className="absolute card-design-neumorph overflow-hidden"
            style={{
              width: 260,
              height: 360,
              borderRadius: "1.5rem",
              opacity: 0.5,
              transform: "scale(0.92)",
            }}
          >
            {(() => {
              const nextOpt = options[currentOptionIdx + 1];
              const nextImg = getOptionImage(nextOpt);
              return nextImg ? (
                <img src={nextImg} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.4)" }}>
                  <span className="text-5xl">{nextOpt.emoji || "✨"}</span>
                </div>
              );
            })()}
          </div>
        )}

        {/* Active swipe card */}
        <AnimatePresence mode="wait">
          {currentOption && !exitDirection && (
            <SwipeableCard
              key={`${currentQuestion.id}-${currentOption.id}`}
              option={currentOption}
              image={optImage}
              hasImage={hasImage}
              onSwipe={handleSwipe}
              isSelected={selectedForQuestion.includes(currentOption.id)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => handleSwipe("left")}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.8)", border: "2px solid rgba(var(--swatch-antique-coin-rgb), 0.3)" }}
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        <button
          onClick={() => {
            // Skip remaining options in this question
            setCurrentQuestionIdx(i => i + 1);
            setCurrentOptionIdx(0);
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
          style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.6)" }}
        >
          <SkipForward className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ background: "hsl(var(--primary))" }}
        >
          <Check className="w-6 h-6 text-primary-foreground" />
        </button>
      </div>

      {/* Selected count */}
      {selectedForQuestion.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          {selectedForQuestion.length} selected for this question
        </p>
      )}
    </div>
  );
};

// Individual swipeable card
const SwipeableCard = ({
  option,
  image,
  hasImage,
  onSwipe,
  isSelected,
}: {
  option: SwipeOption;
  image: string | null;
  hasImage: boolean;
  onSwipe: (dir: "left" | "right") => void;
  isSelected: boolean;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const yesOpacity = useTransform(x, [0, 80], [0, 1]);
  const noOpacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 300) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 300, rotate: 15 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      <div
        className="card-design-neumorph overflow-hidden relative select-none"
        style={{ width: 280, height: 380, borderRadius: "1.5rem" }}
      >
        {hasImage ? (
          <>
            <img
              src={image!}
              alt={option.label}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h3 className="text-white text-xl font-bold drop-shadow-lg">{option.label}</h3>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6" style={{ background: "linear-gradient(158deg, rgba(232,198,174,0.3), rgba(107,109,98,0.1))" }}>
            <span className="text-6xl mb-4">{option.emoji || "✨"}</span>
            <h3 className="text-xl font-bold text-primary">{option.label}</h3>
          </div>
        )}

        {/* YES overlay */}
        <motion.div
          style={{ opacity: yesOpacity }}
          className="absolute top-6 left-6 px-4 py-2 rounded-xl border-3 font-bold text-2xl uppercase tracking-wider"
          {...{ style: { opacity: yesOpacity, borderWidth: 3, borderColor: "#4CAF50", color: "#4CAF50", transform: "rotate(-15deg)" } }}
        >
          YES
        </motion.div>

        {/* NOPE overlay */}
        <motion.div
          style={{ opacity: noOpacity }}
          className="absolute top-6 right-6 px-4 py-2 rounded-xl font-bold text-2xl uppercase tracking-wider"
          {...{ style: { opacity: noOpacity, borderWidth: 3, borderColor: "#FF5252", color: "#FF5252", transform: "rotate(15deg)" } }}
        >
          NOPE
        </motion.div>

        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SwipeCards;
