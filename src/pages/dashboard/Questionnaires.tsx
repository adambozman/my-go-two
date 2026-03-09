import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileQuestions } from "@/data/profileQuestions";
import { usePersonalization } from "@/contexts/PersonalizationContext";

const Questionnaires = () => {
  const { profileAnswers } = usePersonalization();
  const imageQuestions = profileQuestions.filter((q) => q.type === "image-grid");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>(() => {
    const saved: Record<string, string[]> = {};
    if (profileAnswers) {
      for (const q of imageQuestions) {
        if (profileAnswers[q.id]) {
          const val = profileAnswers[q.id];
          saved[q.id] = Array.isArray(val) ? val as string[] : [val as string];
        }
      }
    }
    return saved;
  });

  const goLeft = () => setActiveIndex((i) => (i - 1 + imageQuestions.length) % imageQuestions.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % imageQuestions.length);

  const toggleOption = (questionId: string, optionId: string, multiSelect: boolean) => {
    setSelections((prev) => {
      const current = prev[questionId] || [];
      if (!multiSelect) {
        return { ...prev, [questionId]: current.includes(optionId) ? [] : [optionId] };
      }
      return {
        ...prev,
        [questionId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  // Detail view for a selected question
  if (selectedQuestion) {
    const question = imageQuestions.find((q) => q.id === selectedQuestion)!;
    const isMulti = question.multiSelect !== false;
    const selected = selections[question.id] || [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedQuestion(null)}
            className="text-muted-foreground"
          >
            ← Back
          </Button>
        </div>

        <div className="text-center mb-6">
          <h1
            className="text-2xl font-bold text-primary mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {question.title}
          </h1>
          <p className="text-muted-foreground text-sm">{question.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleOption(question.id, opt.id, isMulti)}
                className={`relative rounded-2xl overflow-hidden aspect-[3/4] card-design-neumorph transition-all ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={opt.localImage || opt.image}
                  alt={opt.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-0 right-0 text-center text-white font-semibold text-sm drop-shadow">
                  {opt.label}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Cover flow view
  return (
    <div className="space-y-6">
      <h1
        className="text-2xl font-bold text-primary"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Questionnaires
      </h1>
      <p className="text-muted-foreground text-sm -mt-4">
        Tap a card to view and answer each question.
      </p>

      <div className="relative flex items-center justify-center min-h-[400px]">
        {/* Left arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goLeft}
          className="absolute left-0 z-20 rounded-full card-design-neumorph w-10 h-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Cards */}
        <div className="relative w-full max-w-2xl h-[380px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {imageQuestions.map((q, i) => {
              const offset = i - activeIndex;
              const wrappedOffset =
                ((offset + imageQuestions.length / 2) % imageQuestions.length) -
                imageQuestions.length / 2;
              const absOffset = Math.abs(wrappedOffset);

              if (absOffset > 2) return null;

              const answered = (selections[q.id] || []).length > 0;

              return (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: wrappedOffset * 160,
                    scale: 1 - absOffset * 0.15,
                    opacity: 1 - absOffset * 0.3,
                    zIndex: 10 - absOffset,
                    rotateY: wrappedOffset * -8,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute cursor-pointer"
                  onClick={() => {
                    if (absOffset === 0) {
                      setSelectedQuestion(q.id);
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                  style={{ perspective: 1200 }}
                >
                  <div className="w-[220px] h-[300px] rounded-2xl overflow-hidden card-design-neumorph relative">
                    {/* Use first option's image as cover */}
                    <img
                      src={q.options[0]?.localImage || q.options[0]?.image || ""}
                      alt={q.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm leading-tight drop-shadow">
                        {q.title}
                      </h3>
                      <p className="text-white/70 text-xs mt-1">
                        {answered
                          ? `${(selections[q.id] || []).length} selected`
                          : "Tap to answer"}
                      </p>
                    </div>
                    {answered && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goRight}
          className="absolute right-0 z-20 rounded-full card-design-neumorph w-10 h-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Questionnaires;
