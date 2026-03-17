import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, SkipForward, Sparkles, Shuffle, Send, Lock } from "lucide-react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTopBar } from "@/contexts/TopBarContext";
import { buildSprints, SECTIONS, THIS_OR_THAT, THIS_OR_THAT_CATEGORIES, type QuizQuestion } from "@/data/knowMeQuestions";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const FREE_CATEGORY_LIMIT = 4;
const FREE_THIS_OR_THAT_LIMIT = 8;

const AI_FEEDBACK = [
  "Got it! This helps me understand your style better.",
  "Noted — your partner will thank you for this one.",
  "Great choice. Building your vibe…",
  "Perfect. This is super helpful for recommendations.",
  "Love it. I'm starting to see the full picture.",
  "Interesting! That tells me a lot.",
  "Saved. You're making great progress!",
  "This is gold for gift suggestions down the road.",
  "Smart pick. Your profile is coming together nicely.",
  "Understood. On to the next one!",
];

const STYLE_CHAT_SUGGESTIONS = [
  "What vibe do you think I have so far?",
  "Why are you asking me these questions?",
  "What kinds of brands would you recommend for me right now?",
];

const CATEGORY_COPY: Record<string, { title: string; description: string }> = {
  "style-fit": {
    title: "Clothes & Style",
    description: "Fit, fashion taste, brand lean, and how polished or casual your look tends to be.",
  },
  "food-drink": {
    title: "Food & Drink",
    description: "Restaurants, cravings, comfort picks, and the flavors or places that feel most like you.",
  },
  "gifts-wishlist": {
    title: "Gifts",
    description: "What you love receiving, what feels thoughtful, and the kinds of things you actually want saved.",
  },
  "home-living": {
    title: "Home",
    description: "Your comfort zone, everyday living habits, and the spaces, products, and rituals that fit your life.",
  },
  entertainment: {
    title: "Everything Else",
    description: "Travel, hobbies, entertainment, and the extra signals that sharpen the AI's read on you.",
  },
};

const Questionnaires = () => {
  const { subscribed } = useAuth();
  const { personalization, profileAnswers, gender, loading: contextLoading, refetch } = usePersonalization();
  const { setBackState } = useTopBar();

  const allQuestions = useMemo(() => buildSprints(gender).flatMap((sprint) => sprint.questions), [gender]);

  const categories = useMemo(() => {
    return SECTIONS.map((section) => {
      const questions = allQuestions.filter((question) => question.section === section.id);
      const answered = questions.filter((question) => profileAnswers?.[question.id]).length;
      const visibleTotal = subscribed ? questions.length : Math.min(questions.length, FREE_CATEGORY_LIMIT);
      const visibleAnswered = subscribed ? answered : Math.min(answered, visibleTotal);
      const firstUnanswered = questions.findIndex((question) => !profileAnswers?.[question.id]);
      const nextQuestionIndex = firstUnanswered === -1 ? Math.max(questions.length - 1, 0) : firstUnanswered;
      const isLocked = !subscribed && answered >= FREE_CATEGORY_LIMIT;

      return {
        ...section,
        title: CATEGORY_COPY[section.id]?.title ?? section.label,
        description: CATEGORY_COPY[section.id]?.description ?? "",
        questions,
        answered,
        visibleTotal,
        visibleAnswered,
        nextQuestionIndex,
        complete: answered === questions.length,
        isLocked,
      };
    });
  }, [allQuestions, profileAnswers, subscribed]);

  const totalAnswered = categories.reduce((sum, category) => sum + category.answered, 0);
  const totalQuestions = allQuestions.length;
  const totalFreeQuestions = categories.reduce((sum, category) => sum + category.visibleTotal, 0);
  const totalVisibleAnswered = categories.reduce((sum, category) => sum + category.visibleAnswered, 0);
  const vibeProgressPercent = Math.round(
    subscribed
      ? (totalAnswered / Math.max(1, totalQuestions)) * 100
      : (totalVisibleAnswered / Math.max(1, totalFreeQuestions)) * 100,
  );
  const allDone = totalAnswered >= totalQuestions;

  const [view, setView] = useState<"dashboard" | "categories" | "quiz" | "thisorthat_dashboard" | "thisorthat">("dashboard");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SECTIONS[0].id);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [savingAnswer, setSavingAnswer] = useState(false);

  const [styleChatOpen, setStyleChatOpen] = useState(false);
  const [stylePrompt, setStylePrompt] = useState("");
  const [styleChatLoading, setStyleChatLoading] = useState(false);
  const [styleChatMessages, setStyleChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        personalization?.persona_summary ||
        "Ask me what your style looks like so far, why I'm asking certain questions, or what kinds of recommendations I'm building toward.",
    },
  ]);

  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  const currentQuestion: QuizQuestion | undefined = activeCategory?.questions[quizQuestionIdx];
  const currentSelected = currentQuestion
    ? selections[currentQuestion.id] ||
      (profileAnswers?.[currentQuestion.id]
        ? Array.isArray(profileAnswers[currentQuestion.id])
          ? (profileAnswers[currentQuestion.id] as string[])
          : [profileAnswers[currentQuestion.id] as string]
        : [])
    : [];

  const updateSelections = useCallback((questionId: string, values: string[]) => {
    setSelections((prev) => ({ ...prev, [questionId]: values }));
  }, []);

  const openCategoriesDashboard = () => setView("categories");

  const openStyleChat = () => {
    setStyleChatMessages([
      {
        role: "assistant",
        content:
          personalization?.persona_summary ||
          "Ask me what your style looks like so far, why I'm asking certain questions, or what kinds of recommendations I'm building toward.",
      },
    ]);
    setStylePrompt("");
    setStyleChatOpen(true);
  };

  const sendStyleChat = async (messageOverride?: string) => {
    const message = (messageOverride ?? stylePrompt).trim();
    if (!message || styleChatLoading) return;

    const nextMessages = [...styleChatMessages, { role: "user", content: message } as ChatMessage];
    setStyleChatMessages(nextMessages);
    setStylePrompt("");
    setStyleChatLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("style-chat", {
        body: {
          message,
          profile_answers: profileAnswers || {},
          ai_personalization: personalization || null,
        },
      });

      if (error) throw error;

      setStyleChatMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data?.reply || "I have a rough read on your vibe already—answer a few more questions and I can get sharper.",
        },
      ]);
    } catch (error: any) {
      const messageText = error?.message?.includes("429")
        ? "The style chat is busy right now. Try again in a moment."
        : error?.message?.includes("402")
          ? "AI credits are unavailable right now. Please try again later."
          : "I couldn't reach the style chat right now.";
      toast.error(messageText);
    } finally {
      setStyleChatLoading(false);
    }
  };

  const persistProfileAnswers = async (patch: Record<string, string | string[]>) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("No user");

    const updated = { ...(profileAnswers || {}), ...patch };
    const cleaned: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(updated)) {
      cleaned[key] = Array.isArray(value) && value.length === 1 ? value[0] : value;
    }

    const { error } = await supabase
      .from("user_preferences")
      .update({ profile_answers: cleaned, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) throw error;
  };

  const goToNextQuestion = async () => {
    if (!activeCategory) return;

    const nextIndex = quizQuestionIdx + 1;
    const freeLockReached = !subscribed && nextIndex >= FREE_CATEGORY_LIMIT;
    if (freeLockReached) {
      await refetch();
      setView("dashboard");
      toast("Premium unlocks more than 4 questions in each category");
      return;
    }

    if (nextIndex >= activeCategory.questions.length) {
      await refetch();
      setView("dashboard");
      toast.success("Category saved");
      return;
    }

    setQuizQuestionIdx(nextIndex);
  };

  const saveAnswerAndContinue = async (questionId: string, values: string[]) => {
    if (!currentQuestion || savingAnswer) return;

    setSavingAnswer(true);
    updateSelections(questionId, values);

    try {
      await persistProfileAnswers({ [questionId]: currentQuestion.multiSelect ? values : values[0] });
      setAiFeedback(AI_FEEDBACK[quizQuestionIdx % AI_FEEDBACK.length]);
      await refetch();
      await goToNextQuestion();
    } catch {
      toast.error("Failed to save answer");
    } finally {
      setSavingAnswer(false);
      setTimeout(() => setAiFeedback(null), 900);
    }
  };

  const startCategory = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;
    if (category.isLocked) {
      toast("Premium unlocks more than 4 questions in each category");
      return;
    }

    setActiveCategoryId(categoryId);
    setQuizQuestionIdx(Math.min(category.nextQuestionIndex, subscribed ? category.questions.length - 1 : FREE_CATEGORY_LIMIT - 1));
    setAiFeedback(null);
    setView("quiz");
  };

  const totQueue = useMemo(() => {
    const answered = profileAnswers ? Object.keys(profileAnswers).filter((key) => key.startsWith("tot-")) : [];
    const unanswered = THIS_OR_THAT.filter((item) => !answered.includes(item.id));
    return unanswered.length > 0 ? unanswered : [];
  }, [profileAnswers]);

  const [totIndex, setTotIndex] = useState(0);
  const [totSwipeDir, setTotSwipeDir] = useState<"left" | "right" | null>(null);
  const totCurrent = totQueue[totIndex] || null;
  const totAnsweredCount = THIS_OR_THAT.length - totQueue.length;
  const visibleThisOrThatCount = subscribed ? THIS_OR_THAT.length : Math.min(THIS_OR_THAT.length, FREE_THIS_OR_THAT_LIMIT);
  const visibleThisOrThatAnswered = subscribed ? totAnsweredCount : Math.min(totAnsweredCount, visibleThisOrThatCount);

  const openThisOrThat = () => {
    setView("thisorthat_dashboard");
  };

  const getSectionForQuestion = (q: QuizQuestion) => SECTIONS.find((section) => section.id === q.section);

  const pickThisOrThat = async (choice: "A" | "B") => {
    if (!totCurrent) return;

    const dir = choice === "A" ? "right" : "left";
    setTotSwipeDir(dir);
    const value = choice === "A" ? "Yes" : "No";

    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (userId) {
        const updated = { ...(profileAnswers || {}), [totCurrent.id]: value };
        await supabase
          .from("user_preferences")
          .update({ profile_answers: updated, updated_at: new Date().toISOString() })
          .eq("user_id", userId);
        await refetch();
      }
    } catch {
      // silent
    }

    setTimeout(() => {
      setTotSwipeDir(null);
      if (totIndex + 1 >= totQueue.length) {
        toast.success("All done! Nice work.");
        setView("dashboard");
      } else {
        setTotIndex((index) => index + 1);
      }
    }, 400);
  };

  useEffect(() => {
    if (view === "quiz") {
      setBackState({ label: "", onBack: () => setView("categories") });
      return;
    }

    if (view === "thisorthat_dashboard") {
      setBackState({ label: "", onBack: () => setView("dashboard") });
      return;
    }

    setBackState(null);
  }, [setBackState, view]);

  if (contextLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--swatch-teal)", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (view === "quiz" && currentQuestion && activeCategory) {
    const categoryQuestionNum = quizQuestionIdx + 1;
    const categoryTotal = activeCategory.questions.length;
    const visibleCategoryTotal = subscribed ? categoryTotal : Math.min(categoryTotal, FREE_CATEGORY_LIMIT);
    const section = getSectionForQuestion(currentQuestion);
    const effectiveSelected = selections[currentQuestion.id] || currentSelected;
    const categoryTitle = activeCategory.title;

    return (
      <div className="h-full flex flex-col items-center justify-start px-3 py-3 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="w-full max-w-[520px] rounded-3xl overflow-hidden relative flex flex-col"
          style={{
            background: "hsl(var(--background))",
            boxShadow: "0 8px 40px rgba(30,74,82,0.08), 0 2px 12px rgba(0,0,0,0.04)",
            maxHeight: "calc(100vh - 180px)",
          }}
        >
          <div className="px-5 pt-5 pb-3">
            <div className="flex justify-end mb-3">
              <div className="text-right">
                <span
                  className="text-[10px] uppercase tracking-[0.1em] block"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                >
                  Go Two / Know Me
                </span>
              </div>
            </div>

            <h2
              className="text-lg mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}
            >
              {categoryTitle}
            </h2>

            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: visibleCategoryTotal }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[5px] rounded-full transition-all duration-300"
                  style={{
                    background: i < Math.min(categoryQuestionNum, visibleCategoryTotal) ? "var(--swatch-teal)" : "rgba(var(--swatch-antique-coin-rgb), 0.12)",
                  }}
                />
              ))}
            </div>
            <p className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Question {Math.min(categoryQuestionNum, visibleCategoryTotal)} of {visibleCategoryTotal}
            </p>
          </div>

          <div className="px-5 pt-4 pb-2 flex-1 overflow-y-auto flex flex-col min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex-1 flex flex-col"
              >
                {section && (
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] mb-3 px-2.5 py-1 rounded-full self-start"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(var(--swatch-teal-rgb), 0.08)" }}
                  >
                    {section.icon} {categoryTitle}
                  </span>
                )}

                <h3
                  className="text-[22px] leading-[1.2] mb-1.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}
                >
                  {currentQuestion.title}
                </h3>
                <p className="text-[12px] mb-5" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                  {currentQuestion.subtitle}
                </p>

                <div className="grid grid-cols-2 gap-2.5 mt-auto">
                  {currentQuestion.options.map((opt, i) => {
                    const isSelected = effectiveSelected.includes(opt.id);
                    return (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 25 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (currentQuestion.multiSelect) {
                            const current = effectiveSelected;
                            const nextValues = current.includes(opt.id)
                              ? current.filter((value) => value !== opt.id)
                              : [...current, opt.id];
                            updateSelections(currentQuestion.id, nextValues);
                          } else {
                            void saveAnswerAndContinue(currentQuestion.id, [opt.id]);
                          }
                        }}
                        disabled={savingAnswer}
                        className="relative rounded-2xl px-4 py-3.5 text-left transition-all duration-200 disabled:opacity-60"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 13,
                          fontWeight: isSelected ? 600 : 400,
                          background: isSelected ? "rgba(var(--swatch-teal-rgb), 0.1)" : "rgba(var(--swatch-antique-coin-rgb), 0.04)",
                          border: isSelected ? "1.5px solid var(--swatch-teal)" : "1.5px solid rgba(var(--swatch-antique-coin-rgb), 0.12)",
                          color: isSelected ? "var(--swatch-viridian-odyssey)" : "var(--swatch-antique-coin)",
                          boxShadow: isSelected ? "0 2px 12px rgba(45,104,112,0.1)" : "none",
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

          <div className="px-5 pb-5 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--swatch-teal)" }} />
              </div>
              <AnimatePresence mode="wait">
                {aiFeedback && (
                  <motion.p
                    key={aiFeedback}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-[11px] leading-snug truncate"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                  >
                    {aiFeedback}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {currentQuestion.multiSelect ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => void saveAnswerAndContinue(currentQuestion.id, effectiveSelected)}
                disabled={savingAnswer || effectiveSelected.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full disabled:opacity-50"
                style={{
                  background: effectiveSelected.length > 0 ? "var(--swatch-viridian-odyssey)" : "rgba(var(--swatch-antique-coin-rgb), 0.08)",
                  color: effectiveSelected.length > 0 ? "hsl(var(--background))" : "var(--swatch-antique-coin)",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 12,
                }}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <button
                onClick={() => void goToNextQuestion()}
                className="text-[12px] px-3 py-2 rounded-full"
                style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
              >
                <SkipForward className="w-3.5 h-3.5 inline mr-1" />
                Skip
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (view === "thisorthat_dashboard") {
    return (
      <div className="h-full overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 md:pt-6">

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-3 md:gap-4 md:aspect-square">
            {[
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[0],  layoutClass: "md:col-start-1  md:col-span-3 md:row-start-1  md:row-span-4" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[1],  layoutClass: "md:col-start-4  md:col-span-5 md:row-start-1  md:row-span-3" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[2],  layoutClass: "md:col-start-9  md:col-span-4 md:row-start-1  md:row-span-5" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[3],  layoutClass: "md:col-start-1  md:col-span-2 md:row-start-5  md:row-span-4" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[4],  layoutClass: "md:col-start-3  md:col-span-2 md:row-start-4  md:row-span-3" },
              { type: "feature" as const,                                          layoutClass: "md:col-start-5  md:col-span-4 md:row-start-4  md:row-span-5" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[5],  layoutClass: "md:col-start-9  md:col-span-3 md:row-start-6  md:row-span-3" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[6],  layoutClass: "md:col-start-12 md:col-span-1 md:row-start-6  md:row-span-7" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[7],  layoutClass: "md:col-start-1  md:col-span-4 md:row-start-9  md:row-span-4" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[8],  layoutClass: "md:col-start-5  md:col-span-3 md:row-start-9  md:row-span-4" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[9],  layoutClass: "md:col-start-8  md:col-span-4 md:row-start-9  md:row-span-4" },
              { type: "category" as const, category: THIS_OR_THAT_CATEGORIES[10], layoutClass: "md:col-start-3  md:col-span-2 md:row-start-7  md:row-span-2" },
            ].map((item, index) => {
              if (item.type === "feature") {
                return (
                  <motion.div
                    key="this-or-that-feature-tile"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, type: "spring", stiffness: 250, damping: 24 }}
                    className={`rounded-[28px] p-6 md:p-7 text-left relative overflow-hidden aspect-square min-h-[220px] ${item.layoutClass}`}
                    style={{ background: "#d4543a", boxShadow: "0 18px 44px rgba(212,84,58,0.3)" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", height: "100%", textAlign: "center", padding: "20px", gap: 12 }}>
                      <p style={{ fontSize: 38, lineHeight: 1.0, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", margin: 0 }}>This or That</p>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", fontFamily: "'Jost', sans-serif", margin: 0 }}>Two Options. One Choice.</p>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", fontFamily: "'Jost', sans-serif", margin: 0 }}>Your Pattern Builds Over Time.</p>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "'Jost', sans-serif", margin: 0 }}>Help the AI learn your vibe.</p>
                    </div>
                  </motion.div>
                );
              }

              const category = item.category;
              const isTall = [0, 2, 7, 9, 10].includes(index);

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, type: "spring", stiffness: 250, damping: 24 }}
                  disabled
                  className={`card-design-overlay-teal rounded-[28px] p-5 md:p-6 text-left relative overflow-hidden disabled:opacity-95 min-h-[148px] ${item.layoutClass}`}
                  style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.48)" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isTall
                        ? "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.16), transparent 34%), linear-gradient(145deg, rgba(255,255,255,0.16), transparent 58%)"
                        : "radial-gradient(circle at bottom left, rgba(var(--swatch-cedar-grove-rgb), 0.08), transparent 30%), linear-gradient(145deg, rgba(255,255,255,0.14), transparent 60%)",
                    }}
                  />

                  <div className="relative flex h-full flex-col justify-between gap-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                        {category.eyebrow}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)", background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                        <Lock className="w-3 h-3" />
                        Coming soon
                      </span>
                    </div>

                    <div className="relative max-w-[26ch]">
                      <h3 className="text-[24px] md:text-[28px] leading-[0.96] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                        {category.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        {category.description}
                      </p>
                    </div>

                    <div className="relative flex items-end justify-between gap-4">
                      <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        0 answered • per-category limit ready
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                        Disabled
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 md:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-auto">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="lg:col-span-8 card-design-overlay-teal rounded-[34px] p-6 md:p-7 relative overflow-hidden min-h-[340px]"
              style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.14), transparent 30%), linear-gradient(130deg, rgba(255,255,255,0.05), transparent 55%)" }} />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="max-w-[29rem]">
                    <p className="text-[10px] uppercase tracking-[0.22em] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                      Go Two / Know Me
                    </p>
                    <h1 className="text-[44px] md:text-[60px] leading-[0.9] max-w-[9ch] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                      Your Vibe
                    </h1>
                    <p className="text-[16px] leading-relaxed max-w-[44ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      Your Vibe is the AI's live read of your taste so far. It watches for patterns across what you answer, what you skip, what you value, and how you react to quick instinct prompts.
                    </p>
                  </div>

                  <div className="rounded-[26px] px-5 py-4 min-w-[172px] backdrop-blur-md" style={{ background: "rgba(255,255,255,0.24)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.22)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)" }}>
                    <p className="text-[42px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                      {vibeProgressPercent}%
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                      profile read
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[minmax(0,1fr)_260px] gap-4 items-end">
                  <div>
                    <p className="text-[18px] leading-snug mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                      {personalization?.persona_summary || "You're still early, but the AI is already building a point of view on whether your style leans cleaner, louder, softer, practical, elevated, or more trend-driven."}
                    </p>
                    <p className="text-[14px] leading-relaxed max-w-[62ch] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                      {subscribed
                        ? allDone
                          ? "You've given the system a full profile, so your vibe summary and downstream recommendations can now get much more specific."
                          : `${totalAnswered} of ${totalQuestions} questions answered so far. Every answer sharpens how the AI describes your style and what it recommends next.`
                        : `Free access includes up to ${FREE_CATEGORY_LIMIT} questions in each category before Premium unlocks the rest.`}
                    </p>

                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, rgba(var(--swatch-teal-rgb), 0.92), rgba(var(--swatch-cedar-grove-rgb), 0.72))" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${vibeProgressPercent}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      />
                    </div>
                  </div>

                  {!subscribed && (
                    <div className="rounded-[28px] p-4 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                      <p className="text-[10px] uppercase tracking-[0.18em] mb-1" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                        Free access
                      </p>
                      <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        You can answer {FREE_CATEGORY_LIMIT} questions in each category for free before Premium opens the full profile map.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, type: "spring", stiffness: 260, damping: 24 }}
              whileTap={{ scale: 0.985 }}
              onClick={openThisOrThat}
              className="lg:col-span-4 card-design-overlay-teal rounded-[34px] p-5 md:p-6 relative overflow-hidden text-left min-h-[340px] flex flex-col justify-between"
              style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.14), transparent 32%), linear-gradient(180deg, rgba(var(--swatch-teal-rgb), 0.04), transparent 40%)" }} />
              <div className="relative flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "rgba(255,255,255,0.24)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                  <Shuffle className="w-4 h-4" style={{ color: "var(--swatch-viridian-odyssey)" }} />
                  <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>This or That</span>
                </div>
                <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  {visibleThisOrThatAnswered}/{visibleThisOrThatCount}
                </span>
              </div>
              <div className="relative">
                <p className="text-[34px] md:text-[40px] leading-[0.95] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                  Browse instinct categories
                </p>
                <p className="text-[14px] leading-relaxed max-w-[30ch] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  This or That now opens a dedicated category dashboard. The categories are fixed, the future question banks are fixed by gender, and the AI only interprets the patterns in your answers.
                </p>
                <p className="text-[13px] leading-relaxed max-w-[32ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  {subscribed
                    ? "The flow is built and ready for your category banks next."
                    : "The new per-category flow is ready — once banks are added, free limits can apply inside each category."}
                </p>
              </div>
              <div className="relative flex items-end justify-between gap-4">
                <div className="w-16 h-16 rounded-[22px] backdrop-blur-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                  <ChevronRight className="w-6 h-6" style={{ color: "var(--swatch-viridian-odyssey)" }} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    instinct deck
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 24 }}
              className="lg:col-span-5 card-design-overlay-teal rounded-[30px] p-5 relative overflow-hidden min-h-[260px]"
              style={{ borderRadius: 30, boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
            >
              <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
              <p className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                Style chat with AI
              </p>
              <p className="text-[34px] leading-[0.96] mb-4 max-w-[12ch]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                Ask the AI what it thinks your style is.
              </p>
              <p className="text-[14px] leading-relaxed max-w-[34ch] mb-5" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                Open a live style chat to ask how the AI sees your vibe so far, why it is asking certain questions, how it picks what comes next, and what kinds of recommendations it is building toward from your answers.
              </p>
              <div className="rounded-[24px] p-4 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                <p className="text-[11px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                  Open style chat
                </p>
                <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Ask about your vibe, logic, and next recommendations.
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, type: "spring", stiffness: 250, damping: 24 }}
              whileTap={{ scale: 0.99 }}
              onClick={openCategoriesDashboard}
              className="lg:col-span-7 card-design-overlay-teal rounded-[30px] p-5 md:p-6 text-left"
              style={{ borderRadius: 30, boxShadow: "0 18px 50px rgba(30,74,82,0.06), inset 0 1px 0 rgba(255,255,255,0.48)", backdropFilter: "blur(10px)" }}
            >
              <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    Get to know you
                  </p>
                  <h2 className="text-[28px] leading-none mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                    Questions by category
                  </h2>
                  <p className="text-[14px] leading-relaxed max-w-[42ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Open a separate dashboard with all categories, descriptions, and your progress. Then choose where you want to continue.
                  </p>
                </div>
                {!subscribed && (
                  <p className="text-[13px] max-w-[28ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Free users can answer 4 questions in each category before Premium continues deeper.
                  </p>
                )}
              </div>

              <div className="flex items-end justify-between gap-4">
                <div className="max-w-[30ch]">
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Nice and neat boxes, uneven layout, and resume exactly where you left off.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-[22px] backdrop-blur-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                  <ChevronRight className="w-6 h-6" style={{ color: "var(--swatch-viridian-odyssey)" }} />
                </div>
              </div>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, type: "spring", stiffness: 250, damping: 24 }}
              className="lg:col-span-12 card-design-overlay-teal rounded-[28px] px-5 py-5"
              style={{ borderRadius: 28, boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.46)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="max-w-[58rem]">
                  <p className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    How the AI gets to know you
                  </p>
                  <p className="text-[28px] leading-none mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                    It learns from patterns, not one answer.
                  </p>
                  <p className="text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    The AI combines your long-form profile answers and your future fixed This or That category answers to read patterns across your style, gifting, lifestyle, and preferences. It does not invent those category questions — it interprets what your answers reveal.
                  </p>
                </div>
                <div className="rounded-[24px] p-4 backdrop-blur-md md:min-w-[320px]" style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                  <p className="text-[11px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Recommendation logic
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    More clarity in your answers means fewer generic suggestions and a sharper read on style, gifts, brands, and experiences once each fixed bank is filled in.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Dialog open={styleChatOpen} onOpenChange={setStyleChatOpen}>
        <DialogContent className="max-w-2xl rounded-[28px] border-border/40 bg-card p-0 overflow-hidden">
          <div className="card-design-overlay-teal">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/30">
              <DialogTitle style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "var(--swatch-viridian-odyssey)" }}>
                Style chat
              </DialogTitle>
              <DialogDescription style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                Ask the AI what it thinks your vibe is, why it's asking certain questions, and what recommendations it's forming from your answers.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
              {STYLE_CHAT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendStyleChat(suggestion)}
                  className="rounded-full px-3 py-2 text-[12px]"
                  style={{ fontFamily: "'Jost', sans-serif", background: "rgba(255,255,255,0.22)", color: "var(--swatch-viridian-odyssey)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="px-6 py-4 space-y-3 max-h-[420px] overflow-y-auto">
              {styleChatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-[24px] px-4 py-3 ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
                  style={{ background: message.role === "user" ? "rgba(var(--swatch-teal-rgb), 0.18)" : "rgba(255,255,255,0.24)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)" }}
                >
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}>
                    {message.content}
                  </p>
                </div>
              ))}
              {styleChatLoading && (
                <div className="max-w-[85%] rounded-[24px] px-4 py-3 mr-auto" style={{ background: "rgba(255,255,255,0.24)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)" }}>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    Thinking about your style…
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="flex gap-3 items-end">
                <Textarea
                  value={stylePrompt}
                  onChange={(e) => setStylePrompt(e.target.value)}
                  placeholder="Ask about your vibe, your taste, or why the AI is asking these questions..."
                  className="min-h-[96px] resize-none rounded-[22px] border-border/40 bg-background/70 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => sendStyleChat()}
                  disabled={styleChatLoading || !stylePrompt.trim()}
                  className="rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-50"
                  style={{ background: "rgba(var(--swatch-teal-rgb), 0.18)", color: "var(--swatch-viridian-odyssey)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.22)" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Questionnaires;
