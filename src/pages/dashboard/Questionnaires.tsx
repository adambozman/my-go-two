import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileQuestions } from "@/data/profileQuestions";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { getStyleImage, getCategoryImage } from "@/data/genderImages";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SwipeCards from "@/components/SwipeCards";

interface AIQuizCategory {
  id: string;
  name: string;
  category: string; // style | sizing | lifestyle | gifting | products
  questions: {
    id: string;
    title: string;
    subtitle: string;
    type: "pill-select" | "single-select";
    multi_select: boolean;
    options: { id: string; label: string }[];
  }[];
}

// Map AI category types to onboarding category IDs for cover images
const categoryImageMap: Record<string, string> = {
  style: "style",
  sizing: "fit",
  lifestyle: "lifestyle",
  gifting: "gifts",
  products: "shopping",
};

const Questionnaires = () => {
  const { profileAnswers, refetch } = usePersonalization();
  const gender = (profileAnswers?.identity as string) || "male";
  const imageQuestions = profileQuestions.filter((q) => q.type === "image-grid");

  // Merge profile question cards + AI category cards into one array
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedAiCategory, setSelectedAiCategory] = useState<string | null>(null);
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

  // AI quizzes
  const [aiCategories, setAiCategories] = useState<AIQuizCategory[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const fetchAiQuizzes = useCallback(async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-quizzes");
      if (error) throw error;
      if (data?.categories) setAiCategories(data.categories);
    } catch (e: any) {
      console.error("AI quizzes error:", e);
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAiQuizzes();
  }, []);

  // Build combined card list: profile questions + AI categories
  type CoverCard =
    | { kind: "profile"; question: (typeof imageQuestions)[0] }
    | { kind: "ai"; category: AIQuizCategory };

  const coverCards: CoverCard[] = [
    ...imageQuestions.map((q) => ({ kind: "profile" as const, question: q })),
    ...aiCategories.map((c) => ({ kind: "ai" as const, category: c })),
  ];

  // Center the active index when cards load
  useEffect(() => {
    if (coverCards.length > 0 && activeIndex >= coverCards.length) {
      setActiveIndex(Math.floor(coverCards.length / 2));
    }
  }, [coverCards.length]);

  // Set initial center
  useEffect(() => {
    if (coverCards.length > 0 && activeIndex === 0) {
      setActiveIndex(Math.floor(imageQuestions.length / 2));
    }
  }, [imageQuestions.length]);

  const goLeft = () => setActiveIndex((i) => (i - 1 + coverCards.length) % coverCards.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % coverCards.length);

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

  // ── AI category swipe view ──
  if (selectedAiCategory) {
    const cat = aiCategories.find((c) => c.id === selectedAiCategory);
    if (!cat) {
      setSelectedAiCategory(null);
      return null;
    }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <SwipeCards
          questions={cat.questions.map((q) => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            type: q.type as any,
            options: q.options,
            multiSelect: q.multi_select,
          }))}
          categoryName={cat.name}
          onComplete={async (answers) => {
            try {
              const userId = (await supabase.auth.getUser()).data.user!.id;
              const updatedAnswers = { ...(profileAnswers || {}), ...answers };
              const { error } = await supabase
                .from("user_preferences")
                .update({ profile_answers: updatedAnswers, updated_at: new Date().toISOString() })
                .eq("user_id", userId);
              if (error) throw error;
              toast.success("Answers saved!");
              await refetch();
              // Remove completed category
              setAiCategories((prev) => prev.filter((c) => c.id !== cat.id));
            } catch {
              toast.error("Failed to save answers");
            }
            setSelectedAiCategory(null);
          }}
          onBack={() => setSelectedAiCategory(null)}
        />
      </motion.div>
    );
  }

  // ── Profile question detail view ──
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
                  <img
                    src={getOptionImage(opt.id, opt.localImage, opt.image)}
                    alt={opt.label}
                    className="w-full h-full object-cover"
                  />
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

  // ── Main cover flow view ──
  return (
    <div className="space-y-8 pb-4">
      <div>
        <p className="text-muted-foreground text-sm mb-2">Tap a card to review your answers.</p>

        <div className="relative flex items-center justify-center pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={goLeft}
            className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="relative w-full h-[420px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {coverCards.map((card, index) => {
                let offset = index - activeIndex;
                const half = coverCards.length / 2;
                if (offset > half) offset -= coverCards.length;
                if (offset < -half) offset += coverCards.length;
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

                const cardId = card.kind === "profile" ? card.question.id : card.category.id;
                const isAi = card.kind === "ai";

                // Card image
                let coverImage = "";
                if (card.kind === "profile") {
                  coverImage = getQuestionCoverImage(card.question);
                } else {
                  const mappedCat = categoryImageMap[card.category.category] || "style";
                  coverImage = getCategoryImage(mappedCat, gender as any);
                }

                // Card title & subtitle
                let title = "";
                let subtitle = "";
                if (card.kind === "profile") {
                  const answered = (selections[card.question.id] || []).length > 0;
                  title = card.question.title;
                  subtitle = answered ? `${(selections[card.question.id] || []).length} selected` : "Tap to answer";
                } else {
                  title = card.category.name;
                  subtitle = `${card.category.questions.length} questions`;
                }

                const answered =
                  card.kind === "profile"
                    ? (selections[card.question.id] || []).length > 0
                    : false;

                return (
                  <motion.div
                    key={cardId}
                    animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    onClick={() => {
                      if (isActive) {
                        if (card.kind === "profile") setSelectedQuestion(card.question.id);
                        else setSelectedAiCategory(card.category.id);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                        isActive ? "ring-2 ring-primary shadow-2xl" : ""
                      }`}
                      style={{ width: cardW, height: cardH }}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          {isAi && (
                            <div className="flex items-center gap-1 mb-1">
                              <Sparkles className="h-3 w-3 text-white/80" />
                              <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">
                                AI Generated
                              </span>
                            </div>
                          )}
                          <h3
                            className="text-white font-semibold text-sm leading-tight drop-shadow"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {title}
                          </h3>
                          <p className="text-white/70 text-xs mt-1">{subtitle}</p>
                        </div>
                        {answered && (
                          <div
                            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "var(--swatch-teal)" }}
                          >
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading indicator when AI quizzes are being fetched */}
              {aiLoading && coverCards.length === imageQuestions.length && (
                <div className="absolute bottom-4 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: "var(--swatch-teal)" }} />
                  <span className="text-xs text-muted-foreground">Loading more cards...</span>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goRight}
            className="absolute right-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaires;
