import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowLeft } from "lucide-react";

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
    // All done
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
      // Auto-advance for single-select after brief delay
      setTimeout(() => setCurrentIdx((i) => i + 1), 350);
    }
  };

  const advance = () => setCurrentIdx((i) => i + 1);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--swatch-viridian-odyssey)" }} />
        </button>
        <div className="flex-1 min-w-0">
          <h2
            className="text-lg font-semibold truncate"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}
          >
            {categoryName}
          </h2>
        </div>
        <span
          className="text-xs tabular-nums"
          style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}
        >
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mx-4 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.15)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--swatch-teal)" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Question card */}
      <div className="flex-1 flex flex-col px-4 pt-6 pb-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col"
          >
            {/* Question text */}
            <h3
              className="text-2xl leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}
            >
              {q.title}
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}
            >
              {q.subtitle}
            </p>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt) => {
                const isSelected = selected.includes(opt.id);
                return (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggleOption(opt.id)}
                    className="relative rounded-2xl px-4 py-4 text-left transition-all duration-200 border"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 14,
                      fontWeight: isSelected ? 600 : 400,
                      background: isSelected
                        ? "rgba(var(--swatch-teal-rgb), 0.12)"
                        : "rgba(255,255,255,0.5)",
                      borderColor: isSelected
                        ? "var(--swatch-teal)"
                        : "rgba(var(--swatch-antique-coin-rgb), 0.2)",
                      color: isSelected
                        ? "var(--swatch-viridian-odyssey)"
                        : "var(--swatch-antique-coin)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {opt.label}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
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

      {/* Bottom action — only for multi-select */}
      {!isSingle && (
        <div className="px-4 pb-6 pt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={advance}
            className="w-full py-3.5 rounded-2xl text-sm font-medium transition-all"
            style={{
              fontFamily: "'Jost', sans-serif",
              background: selected.length > 0 ? "var(--swatch-teal)" : "rgba(var(--swatch-antique-coin-rgb), 0.15)",
              color: selected.length > 0 ? "#fff" : "var(--swatch-antique-coin)",
            }}
          >
            {selected.length > 0 ? `Continue · ${selected.length} selected` : "Skip"}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default KnowMeQuizCard;
