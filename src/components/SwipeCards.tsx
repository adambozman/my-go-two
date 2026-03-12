import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { Check, X, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUESTION_CARD } from "@/lib/carouselConfig";

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

const SwipeCards = ({ questions, categoryName, onComplete, onBack, getImage }: SwipeCardsProps) => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [freeTextAnswers, setFreeTextAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[currentQuestionIdx];
  if (!currentQuestion) {
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

  // Free-input questions get a clean input card
  if (currentQuestion.type === "free-input") {
    return (
      <div className="absolute inset-0" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, background: 'var(--swatch-sand)' }}>
        {/* Question text — 24px below header divider */}
        <div className="absolute left-0 right-0 text-center" style={{ top: QUESTION_CARD.textTopOffset }}>
          <h3 className="text-lg font-bold text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {currentQuestion.title}
          </h3>
        </div>

        {/* Card — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-design-neumorph p-8 text-center"
            style={{ width: QUESTION_CARD.width, borderRadius: QUESTION_CARD.borderRadius }}
          >
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
      </div>
    );
  }

  const options = currentQuestion.options || [];
  const currentOption = options[currentOptionIdx];
  const isSingleSelect = currentQuestion.type === "single-select" || currentQuestion.multiSelect === false;
  const totalOptions = options.length;
  const selectedForQuestion = selections[currentQuestion.id] || [];

  const getOptionImage = (opt: SwipeOption): string | null => {
    if (getImage) {
      const img = getImage(opt.id);
      if (img) return img;
    }
    if (opt.localImage) return opt.localImage;
    if (opt.image) return `https://images.unsplash.com/photo-${opt.image}?w=400&h=500&fit=crop&q=80`;
    return null;
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExitDirection(direction);

    if (direction === "right" && currentOption) {
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

  const optImage = currentOption ? getOptionImage(currentOption) : null;
  const hasImage = !!optImage;

  return (
    <div className="relative w-full h-full">
      {/* Question text & counter — 24px below header divider, horizontally centered */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-0 right-0 text-center z-10"
        style={{ top: QUESTION_CARD.textTopOffset }}
      >
        <h3 className="text-lg font-bold text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {currentQuestion.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {isSingleSelect ? "Swipe right to choose" : "Swipe right = yes, left = skip"}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {currentOptionIdx + 1} / {totalOptions}
        </p>
      </motion.div>

      {/* Card — centered horizontally and vertically */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: QUESTION_CARD.width, height: QUESTION_CARD.height }}>
          {/* Next card preview */}
          {currentOptionIdx < totalOptions - 1 && options[currentOptionIdx + 1] && (
            <div
              className="absolute inset-0 m-auto card-design-neumorph overflow-hidden"
              style={{
                width: 260,
                height: 380,
                borderRadius: QUESTION_CARD.borderRadius,
                opacity: 0.4,
                transform: "scale(0.92)",
              }}
            >
              {(() => {
                const nextOpt = options[currentOptionIdx + 1];
                const nextImg = getOptionImage(nextOpt);
                return nextImg ? (
                  <img src={nextImg} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(158deg, rgba(232,198,174,0.25), rgba(107,109,98,0.08))" }}>
                    <span className="text-lg font-semibold text-muted-foreground">{nextOpt.label}</span>
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
      </div>

      {/* Action buttons — 32px above bottom nav, horizontally centered */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center z-10"
        style={{ bottom: QUESTION_CARD.buttonsBottomOffset }}
      >
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => handleSwipe("left")}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.8)", border: "2px solid rgba(var(--swatch-antique-coin-rgb), 0.3)" }}
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
          <button
            onClick={() => {
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

        {selectedForQuestion.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            {selectedForQuestion.length} selected
          </p>
        )}
      </div>
    </div>
  );
};

// Individual swipeable card — clean, professional, no emojis
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
        style={{ width: QUESTION_CARD.width, height: QUESTION_CARD.height, borderRadius: QUESTION_CARD.borderRadius }}
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
              <h3 className="text-white text-xl font-bold drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                {option.label}
              </h3>
            </div>
          </>
        ) : (
          /* Clean typographic card — no emojis */
          <div
            className="w-full h-full flex flex-col items-center justify-center p-8"
            style={{ background: "linear-gradient(158deg, rgba(232,198,174,0.22), rgba(107,109,98,0.08))" }}
          >
            <div
              className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
              style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.15)" }}
            >
              <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                {option.label.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-primary text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              {option.label}
            </h3>
          </div>
        )}

        {/* YES overlay */}
        <motion.div
          className="absolute top-6 left-6 px-4 py-2 rounded-xl font-bold text-xl uppercase tracking-wider"
          style={{
            opacity: yesOpacity,
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: "hsl(var(--primary))",
            color: "hsl(var(--primary))",
            transform: "rotate(-15deg)",
          }}
        >
          YES
        </motion.div>

        {/* NOPE overlay */}
        <motion.div
          className="absolute top-6 right-6 px-4 py-2 rounded-xl font-bold text-xl uppercase tracking-wider"
          style={{
            opacity: noOpacity,
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: "var(--swatch-antique-coin)",
            color: "var(--swatch-antique-coin)",
            transform: "rotate(15deg)",
          }}
        >
          PASS
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
