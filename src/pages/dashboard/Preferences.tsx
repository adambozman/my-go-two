import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileQuestions } from "@/data/profileQuestions";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { getStyleImage } from "@/data/genderImages";

const Preferences = () => {
  const { profileAnswers } = usePersonalization();
  const rawIdentity = profileAnswers?.identity;
  const gender = (Array.isArray(rawIdentity) ? rawIdentity[0] : rawIdentity) as string || "male";
  const imageQuestions = profileQuestions.filter((q) => q.type === "image-grid");

  const [activeIndex, setActiveIndex] = useState(Math.floor(imageQuestions.length / 2));
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>(() => {
    const saved: Record<string, string[]> = {};
    if (profileAnswers) {
      for (const q of imageQuestions) {
        if (profileAnswers[q.id]) {
          const val = profileAnswers[q.id];
          saved[q.id] = Array.isArray(val) ? (val as string[]) : [val as string];
        }
      }
    }
    return saved;
  });

  const goLeft = () => setActiveIndex((i) => (i - 1 + imageQuestions.length) % imageQuestions.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % imageQuestions.length);

  const getQuestionCoverImage = (q: (typeof imageQuestions)[0]) => {
    const firstOpt = q.options[0];
    const genderImg = getStyleImage(firstOpt.id, gender as any);
    if (genderImg) return genderImg;
    return firstOpt.localImage || firstOpt.image || "";
  };

  const getOptionImage = (optionId: string, fallbackLocal?: string, fallbackUrl?: string) => {
    const genderImg = getStyleImage(optionId, gender as any);
    if (genderImg) return genderImg;
    return fallbackLocal || fallbackUrl || "";
  };

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

  // Detail view for a profile question
  if (selectedQuestion) {
    const question = imageQuestions.find((q) => q.id === selectedQuestion)!;
    const isMulti = question.multiSelect !== false;
    const selected = selections[question.id] || [];

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setSelectedQuestion(null)} className="text-muted-foreground">
          ← Back
        </Button>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
            {question.title}
          </h1>
          <p className="text-muted-foreground text-sm">{question.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleOption(question.id, opt.id, isMulti)}
                className={`relative overflow-hidden transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary scale-[1.03] shadow-xl" : "hover:scale-[1.02] hover:shadow-lg"
                }`}
                style={{ borderRadius: "1.2rem" }}
              >
                <div className="aspect-[4/5] relative">
                  <img src={getOptionImage(opt.id, opt.localImage, opt.image)} alt={opt.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
                    <span className="text-sm font-semibold text-white leading-tight drop-shadow">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md" style={{ background: "var(--swatch-teal)" }}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Main cover flow
  return (
    <div className="space-y-8 pb-4">
      <div>
        <p className="text-muted-foreground text-sm mb-2">Tap a card to review your preferences.</p>

        <div className="relative flex items-center justify-center pt-8">
          <Button variant="ghost" size="icon" onClick={goLeft} className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="relative w-full h-[420px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {imageQuestions.map((q, index) => {
                let offset = index - activeIndex;
                const half = imageQuestions.length / 2;
                if (offset > half) offset -= imageQuestions.length;
                if (offset < -half) offset += imageQuestions.length;
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                if (absOffset > 2) return null;

                const xOffset = offset * (isActive ? 190 : 170);
                const cardW = isActive ? 280 : 200;
                const cardH = isActive ? 380 : 250;
                const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
                const zIndex = 10 - absOffset;
                const blur = isActive ? 0 : 2;
                const opacity = isActive ? 1 : 0.5;
                const answered = (selections[q.id] || []).length > 0;

                return (
                  <motion.div
                    key={q.id}
                    animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    onClick={() => (isActive ? setSelectedQuestion(q.id) : setActiveIndex(index))}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${isActive ? "ring-2 ring-primary shadow-2xl" : ""}`}
                      style={{ width: cardW, height: cardH }}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <img src={getQuestionCoverImage(q)} alt={q.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm leading-tight drop-shadow" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {q.title}
                          </h3>
                          <p className="text-white/70 text-xs mt-1">
                            {answered ? `${(selections[q.id] || []).length} selected` : "Tap to answer"}
                          </p>
                        </div>
                        {answered && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--swatch-teal)" }}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={goRight} className="absolute right-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
