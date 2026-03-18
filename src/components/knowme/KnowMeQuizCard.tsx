import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ChevronRight, SkipForward } from "lucide-react";

interface QuizOption {
  id: string;
  label: string;
}

interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  type: "pill-select" | "single-select";
  options: QuizOption[];
  multiSelect: boolean;
}

interface KnowMeQuizCardProps {
  questions: QuizQuestion[];
  categoryName: string;
  onComplete: (selections: Record<string, string | string[]>) => void;
  onBack: () => void;
}

const KnowMeQuizCard = ({ questions, categoryName, onComplete, onBack }: KnowMeQuizCardProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const q = questions[currentIdx];

  if (!q) {
    const result: Record<string, string | string[]> = {};
    for (const question of questions) {
      if (selections[question.id]?.length) result[question.id] = selections[question.id];
    }
    onComplete(result);
    return null;
  }

  const selected = selections[q.id] || [];
  const isSingle = q.type === "single-select" || !q.multiSelect;
  const progress = ((currentIdx) / questions.length) * 100;

  const toggleOption = (optId: string) => {
    setSelections((prev) => {
      const current = prev[q.id] || [];
      if (isSingle) {
        return { ...prev, [q.id]: [optId] };
      }
      return {
        ...prev,
        [q.id]: current.includes(optId)
          ? current.filter((x) => x !== optId)
          : [...current, optId],
      };
    });

    if (isSingle) {
      setTimeout(() => setCurrentIdx((i) => i + 1), 400);
    }
  };

  const advance = () => setCurrentIdx((i) => i + 1);

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-6">
      {/* Elevated card container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="w-full max-w-[480px] rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(245,237,224,0.9) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 8px 40px rgba(30,74,82,0.08), 0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: "rgba(var(--swatch-antique-coin-rgb), 0.12)",
            }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "var(--swatch-teal)" }} />
          </button>
          <div className="flex-1 min-w-0">
            <h2
              className="text-xl truncate"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                color: "var(--swatch-teal)",
                letterSpacing: "0.01em",
              }}
            >
              {categoryName}
            </h2>
          </div>
          <span
            className="text-xs tabular-nums px-2.5 py-1 rounded-full"
            style={{
              color: "var(--swatch-teal)",
              background: "rgba(var(--swatch-teal-rgb), 0.08)",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
            }}
          >
            {currentIdx + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="mx-5 h-[3px] rounded-full overflow-hidden"
          style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.12)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--swatch-teal), var(--swatch-teal-mid))" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Question area */}
        <div className="px-5 pt-6 pb-2 min-h-[360px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex-1 flex flex-col"
            >
              {/* Question */}
              <h3
                className="text-[26px] leading-[1.15] mb-1.5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: "var(--swatch-teal)",
                }}
              >
                {q.title}
              </h3>
              <p
                className="text-[13px] mb-5"
                style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}
              >
                {q.subtitle}
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2.5 mt-auto">
                {q.options.map((opt, i) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 25 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleOption(opt.id)}
                      className="relative rounded-2xl px-4 py-3.5 text-left transition-all duration-200"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 14,
                        fontWeight: isSelected ? 600 : 400,
                        letterSpacing: "0.01em",
                        background: isSelected
                          ? "rgba(var(--swatch-teal-rgb), 0.1)"
                          : "rgba(255,255,255,0.55)",
                        border: isSelected
                          ? "1.5px solid var(--swatch-teal)"
                          : "1.5px solid rgba(var(--swatch-antique-coin-rgb), 0.18)",
                        color: isSelected
                          ? "var(--swatch-teal)"
                          : "var(--swatch-antique-coin)",
                        boxShadow: isSelected
                          ? "0 2px 12px rgba(45,104,112,0.1)"
                          : "0 1px 4px rgba(0,0,0,0.03)",
                      }}
                    >
                      {opt.label}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "var(--swatch-teal)" }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom action bar */}
        <div className="px-5 pb-5 pt-3 flex items-center gap-3">
          {isSingle ? (
            /* Single-select: skip button */
            <button
              onClick={advance}
              className="flex items-center gap-1.5 text-xs py-2 px-3 rounded-full transition-colors hover:bg-black/5"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "var(--swatch-antique-coin)",
              }}
            >
              <SkipForward className="w-3.5 h-3.5" />
              Skip
            </button>
          ) : (
            /* Multi-select: continue / skip */
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={advance}
              className="flex-1 py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2"
              style={{
                fontFamily: "'Jost', sans-serif",
                background: selected.length > 0
                  ? "var(--swatch-teal)"
                  : "rgba(var(--swatch-antique-coin-rgb), 0.12)",
                color: selected.length > 0 ? "#fff" : "var(--swatch-antique-coin)",
                boxShadow: selected.length > 0
                  ? "0 4px 16px rgba(30,74,82,0.2)"
                  : "none",
              }}
            >
              {selected.length > 0 ? (
                <>
                  Continue
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    {selected.length}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <SkipForward className="w-3.5 h-3.5" />
                  Skip
                </>
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default KnowMeQuizCard;
