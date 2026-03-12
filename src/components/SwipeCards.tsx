import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CAROUSEL_LAYOUT, HEADER_LAYOUT, DOT_LAYOUT } from "@/lib/carouselConfig";

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

const CARD_W = CAROUSEL_LAYOUT.cardWidth;
const CARD_H = CAROUSEL_LAYOUT.cardHeight;
const BORDER_R = CAROUSEL_LAYOUT.borderRadius;

const SwipeCards = ({ questions, categoryName, onComplete, onBack, getImage }: SwipeCardsProps) => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [freeTextAnswers, setFreeTextAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentOptionIdx, setCurrentOptionIdx] = useState(0);
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

  const advanceToNext = () => {
    setCurrentQuestionIdx(i => i + 1);
    setCurrentOptionIdx(0);
  };

  // Free-input uses a simplified card
  if (currentQuestion.type === "free-input") {
    return (
      <div className="relative w-full h-full">
        {/* Title — global header position */}
        <h3
          className="section-header absolute z-20 left-0 right-0 text-center"
          style={{ top: HEADER_LAYOUT.topOffset, transform: HEADER_LAYOUT.transform }}
        >
          {currentQuestion.title}
        </h3>

        {/* Stage — same as global carousel */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full overflow-hidden" style={{ height: CAROUSEL_LAYOUT.stageHeight }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-design-neumorph p-8 text-center"
                style={{ width: CARD_W, borderRadius: BORDER_R }}
              >
                <p className="text-sm text-muted-foreground mb-6">{currentQuestion.subtitle}</p>
                <Input
                  value={freeTextAnswers[currentQuestion.id] || ""}
                  onChange={(e) => setFreeTextAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                  placeholder={currentQuestion.placeholder}
                  className="rounded-xl border-0 bg-white/40 text-base h-12 placeholder:text-muted-foreground/60 mb-4"
                />
                <Button className="rounded-full w-full h-11" onClick={advanceToNext}>
                  {freeTextAnswers[currentQuestion.id] ? "Next" : "Skip"}
                </Button>
              </motion.div>
            </div>
          </div>
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

  const handleAction = (action: "yes" | "no") => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (action === "yes" && currentOption) {
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
          advanceToNext();
          setIsAnimating(false);
        }, 300);
        return;
      }
    }

    setTimeout(() => {
      if (currentOptionIdx < totalOptions - 1) {
        setCurrentOptionIdx(i => i + 1);
      } else {
        advanceToNext();
      }
      setIsAnimating(false);
    }, 300);
  };

  const optImage = currentOption ? getOptionImage(currentOption) : null;
  const hasImage = !!optImage;

  return (
    <div className="relative w-full h-full">
      {/* Title — uses global HEADER_LAYOUT, centered above card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute left-0 right-0 text-center z-20"
        style={{ top: HEADER_LAYOUT.topOffset, transform: HEADER_LAYOUT.transform }}
      >
        <h3 className="section-header">{currentQuestion.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {currentOptionIdx + 1} / {totalOptions}
        </p>
      </motion.div>

      {/* Stage — same height & centering as global carousel */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full overflow-hidden" style={{ height: CAROUSEL_LAYOUT.stageHeight }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ width: CARD_W, height: CARD_H }}>
              {/* Active card */}
              <AnimatePresence mode="wait">
                {currentOption && (
                  <motion.div
                    key={`${currentQuestion.id}-${currentOption.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute inset-0"
                  >
                    <div
                      className={`overflow-hidden relative select-none ring-2 ring-primary shadow-2xl`}
                      style={{ width: CARD_W, height: CARD_H, borderRadius: BORDER_R }}
                    >
                      {hasImage ? (
                        <>
                          <img
                            src={optImage!}
                            alt={currentOption.label}
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="card-title leading-tight">{currentOption.label}</h3>
                          </div>
                        </>
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-center p-8"
                          style={{ background: "linear-gradient(158deg, rgba(232,198,174,0.22), rgba(107,109,98,0.08))" }}
                        >
                          <div
                            className="w-16 h-16 rounded-full mb-6 flex items-center justify-center"
                            style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.15)" }}
                          >
                            <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {currentOption.label.charAt(0)}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-primary text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {currentOption.label}
                          </h3>
                        </div>
                      )}

                      {selectedForQuestion.includes(currentOption.id) && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons — positioned at global bottom dot level (halfway between card bottom and nav) */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center z-10"
        style={{ top: DOT_LAYOUT.bottomTopOffset, transform: "translateY(-50%)" }}
      >
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => handleAction("no")}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: "rgba(var(--swatch-gypsum-rose-rgb), 0.8)",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.6)",
            }}
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
          <button
            onClick={advanceToNext}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: "rgba(var(--swatch-gypsum-rose-rgb), 0.6)",
              boxShadow: "3px 3px 8px rgba(0,0,0,0.06), -1px -1px 4px rgba(255,255,255,0.5)",
            }}
          >
            <SkipForward className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => handleAction("yes")}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: "hsl(var(--primary))",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.08), -2px -2px 6px rgba(255,255,255,0.6)",
            }}
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

export default SwipeCards;
