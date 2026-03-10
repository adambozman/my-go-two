import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileQuestions } from "@/data/profileQuestions";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { getStyleImage } from "@/data/genderImages";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AIQuiz {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  multi_select: boolean;
  options: { id: string; label: string }[];
}

const categoryColors: Record<string, string> = {
  style: "var(--swatch-terracotta, #c4785a)",
  sizing: "var(--swatch-teal)",
  lifestyle: "var(--swatch-olive, #6B6D62)",
  gifting: "var(--swatch-cedar-grove)",
  products: "var(--swatch-teal-mid)",
};

const Questionnaires = () => {
  const { profileAnswers, refetch } = usePersonalization();
  const gender = (profileAnswers?.identity as string) || "male";
  const imageQuestions = profileQuestions.filter((q) => q.type === "image-grid");

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

  // AI quizzes
  const [aiQuizzes, setAiQuizzes] = useState<AIQuiz[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSelections, setAiSelections] = useState<Record<string, string[]>>({});
  const [selectedAiQuiz, setSelectedAiQuiz] = useState<string | null>(null);
  const [savingQuiz, setSavingQuiz] = useState(false);

  const fetchAiQuizzes = useCallback(async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-quizzes");
      if (error) throw error;
      if (data?.quizzes) setAiQuizzes(data.quizzes);
    } catch (e: any) {
      console.error("AI quizzes error:", e);
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => { fetchAiQuizzes(); }, []);

  const getQuestionCoverImage = (q: typeof imageQuestions[0]) => {
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

  const toggleAiOption = (quizId: string, optionId: string, multiSelect: boolean) => {
    setAiSelections((prev) => {
      const current = prev[quizId] || [];
      if (!multiSelect) {
        return { ...prev, [quizId]: current.includes(optionId) ? [] : [optionId] };
      }
      return {
        ...prev,
        [quizId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const saveAiQuizAnswer = async (quizId: string) => {
    const selected = aiSelections[quizId];
    if (!selected?.length) return;
    setSavingQuiz(true);
    try {
      const updatedAnswers = { ...(profileAnswers || {}), [quizId]: selected };
      const { error } = await supabase
        .from("user_preferences")
        .update({ profile_answers: updatedAnswers, updated_at: new Date().toISOString() })
        .eq("user_id", (await supabase.auth.getUser()).data.user!.id);
      if (error) throw error;
      toast.success("Answer saved!");
      await refetch();
      setSelectedAiQuiz(null);
      setAiQuizzes((prev) => prev.filter((q) => q.id !== quizId));
    } catch {
      toast.error("Failed to save answer");
    } finally {
      setSavingQuiz(false);
    }
  };

  // ── AI Quiz detail view ──
  if (selectedAiQuiz) {
    const quiz = aiQuizzes.find((q) => q.id === selectedAiQuiz);
    if (!quiz) { setSelectedAiQuiz(null); return null; }
    const selected = aiSelections[quiz.id] || [];

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setSelectedAiQuiz(null)} className="text-muted-foreground">
          ← Back
        </Button>
        <div className="text-center mb-4">
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white mb-3"
            style={{ backgroundColor: categoryColors[quiz.category] || "var(--swatch-teal)" }}
          >
            {quiz.category}
          </span>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
            {quiz.title}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{quiz.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {quiz.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleAiOption(quiz.id, opt.id, quiz.multi_select)}
                className="text-left px-4 py-3.5 rounded-2xl transition-all text-sm font-medium"
                style={{
                  background: isSelected ? "rgba(45, 104, 112, 0.12)" : "var(--swatch-sand-mid)",
                  border: isSelected ? "2px solid var(--swatch-teal)" : "1px solid var(--chip-border)",
                  color: isSelected ? "var(--swatch-teal)" : "var(--swatch-antique-coin)",
                }}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div className="text-center pt-2">
            <Button
              onClick={() => saveAiQuizAnswer(quiz.id)}
              disabled={savingQuiz}
              className="rounded-full px-8 text-white font-semibold"
              style={{ backgroundColor: "var(--swatch-cedar-grove)", boxShadow: "0 4px 20px rgba(212, 84, 58, 0.30)" }}
            >
              {savingQuiz ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Answer"}
            </Button>
          </div>
        )}
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

  // ── Main scrollable grid view ──
  return (
    <div className="space-y-8 pb-4">
      {/* Profile question cards — scrollable grid */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-4">
          Your Profile
        </p>
        <div className="grid grid-cols-2 gap-4">
          {imageQuestions.map((q, i) => {
            const answered = (selections[q.id] || []).length > 0;
            return (
              <motion.button
                key={q.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 0.68, 0, 1.2] }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedQuestion(q.id)}
                className="relative overflow-hidden text-left group aspect-[4/5]"
                style={{ borderRadius: "1.4rem" }}
              >
                <img
                  src={getQuestionCoverImage(q)}
                  alt={q.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {answered && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--swatch-teal)" }}>
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <h3
                    className="text-white font-semibold leading-tight drop-shadow"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}
                  >
                    {q.title}
                  </h3>
                  <p className="text-white/60 text-[11px] mt-0.5">
                    {answered ? `${(selections[q.id] || []).length} selected` : "Tap to answer"}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* AI-generated quizzes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--swatch-teal)" }} />
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground">
            Learn More About You
          </p>
        </div>

        {aiLoading ? (
          <div className="flex items-center gap-3 py-8 justify-center">
            <Loader2 className="h-5 w-5 animate-spin" style={{ color: "var(--swatch-teal)" }} />
            <p className="text-sm text-muted-foreground">Generating personalized questions...</p>
          </div>
        ) : aiQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiQuizzes.map((quiz, i) => {
              const answered = profileAnswers?.[quiz.id];
              return (
                <motion.button
                  key={quiz.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !answered && setSelectedAiQuiz(quiz.id)}
                  className="text-left p-4 rounded-2xl transition-all"
                  style={{
                    background: answered ? "rgba(45, 104, 112, 0.06)" : "var(--swatch-sand-mid)",
                    border: answered ? "1px solid rgba(45, 104, 112, 0.2)" : "1px solid var(--chip-border)",
                    opacity: answered ? 0.6 : 1,
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span
                        className="inline-block text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: categoryColors[quiz.category] || "var(--swatch-teal)" }}
                      >
                        {quiz.category}
                      </span>
                      <h3 className="text-sm font-semibold" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                        {quiz.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{quiz.subtitle}</p>
                    </div>
                    {answered && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: "var(--swatch-teal)" }}>
                        <span className="text-white text-[10px]">✓</span>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">
            You've answered all the questions we have for now. Check back later!
          </p>
        )}
      </div>
    </div>
  );
};

export default Questionnaires;
