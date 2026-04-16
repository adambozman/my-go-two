import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, SkipForward, Sparkles, Shuffle, Send, Lock } from "lucide-react";
import { useUserProfile } from "@/contexts/user-profile-context";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTopBar } from "@/contexts/top-bar-context";
import { buildSprints, SECTIONS, type QuizQuestion } from "@/data/knowMeQuestions";
import { buildThisOrThatAnswerUpsertPayload } from "@/data/thisOrThatV2Persistence";
import {
  buildThisOrThatV2RuntimeQuestionBank,
  getThisOrThatV2CategoryDefinitions,
  type ThisOrThatV2CategoryDefinition,
  type ThisOrThatV2QuestionLike,
} from "@/data/thisOrThatV2";
import {
  buildKnowledgeAiAdapter,
  getCombinedKnowledgeResponses,
  toKnowledgeResponseRecord,
  getYourVibeDerivation,
} from "@/lib/knowledgeCenter";
import GoTwoInline from "@/components/GoTwoInline";
import { CardEditTrigger, useCardOverrides } from "@/components/CardEditor";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type KnowledgeResponseValue = string | string[] | undefined;
type KnowledgeResponseMap = Record<string, KnowledgeResponseValue> | null | undefined;
type SectionDefinition = (typeof SECTIONS)[number];
type CategoryState = SectionDefinition & {
  title: string;
  description: string;
  questions: QuizQuestion[];
  answered: number;
  visibleTotal: number;
  visibleAnswered: number;
  nextQuestionIndex: number;
  complete: boolean;
  isLocked: boolean;
};

type ThisOrThatCategoryState = ThisOrThatV2CategoryDefinition & {
  questions: ThisOrThatV2QuestionLike[];
  answered: number;
  visibleTotal: number;
  visibleAnswered: number;
  nextQuestionIndex: number;
  complete: boolean;
  isLocked: boolean;
  isLive: boolean;
};

type ThisOrThatDashboardItem =
  | { type: "category"; category: ThisOrThatCategoryState; layoutClass: string }
  | { type: "feature"; layoutClass: string };

type ThisOrThatAnswerPayload = ReturnType<typeof buildThisOrThatAnswerUpsertPayload>;
type ThisOrThatAnswerWriter = {
  from: (table: "this_or_that_v2_answers") => {
    upsert: (
      values: ThisOrThatAnswerPayload,
      options: { onConflict: string },
    ) => Promise<{ error: unknown | null }>;
  };
};

const FREE_CATEGORY_LIMIT = 4;
const FREE_THIS_OR_THAT_LIMIT = 8;

const AI_FEEDBACK = [
  "Got it! This helps me understand your style better.",
  "Noted — your connection will thank you for this one.",
  "Great choice. Building your vibe…",
  "Perfect. This is super helpful for recommendations.",
  "Love it. I'm starting to see the full picture.",
  "Interesting! That tells me a lot.",
  "Saved. You're making great progress!",
  "This is gold for gift suggestions down the road.",
  "Smart pick. Your profile is coming together nicely.",
  "Understood. On to the next one!",
];

const THIS_OR_THAT_DASHBOARD_LAYOUT = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

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

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "I couldn't reach the style chat right now.";

const getStyleChatIntro = (personaSummary?: string | null) =>
  personaSummary ||
  "Ask me what your style looks like so far, why I'm asking certain questions, or what kinds of recommendations I'm building toward.";

const getAnswerValues = (value: KnowledgeResponseValue): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  return typeof value === "string" ? [value] : [];
};

const buildCategoryState = (
  section: SectionDefinition,
  allQuestions: QuizQuestion[],
  knowMeResponses: KnowledgeResponseMap,
  subscribed: boolean,
): CategoryState => {
  const questions = allQuestions.filter((question) => question.section === section.id);
  const answered = questions.filter((question) => getAnswerValues(knowMeResponses?.[question.id]).length > 0).length;
  const visibleTotal = subscribed ? questions.length : Math.min(questions.length, FREE_CATEGORY_LIMIT);
  const visibleAnswered = subscribed ? answered : Math.min(answered, visibleTotal);
  const firstUnanswered = questions.findIndex((question) => getAnswerValues(knowMeResponses?.[question.id]).length === 0);
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
};

const buildThisOrThatCategoryState = (
  category: ThisOrThatV2CategoryDefinition,
  questions: ThisOrThatV2QuestionLike[],
  knowMeResponses: KnowledgeResponseMap,
  subscribed: boolean,
): ThisOrThatCategoryState => {
  const answered = questions.filter((question) => getAnswerValues(knowMeResponses?.[question.id]).length > 0).length;
  const visibleTotal = subscribed ? questions.length : Math.min(questions.length, FREE_THIS_OR_THAT_LIMIT);
  const visibleAnswered = subscribed ? answered : Math.min(answered, visibleTotal);
  const firstUnanswered = questions.findIndex((question) => getAnswerValues(knowMeResponses?.[question.id]).length === 0);
  const nextQuestionIndex = firstUnanswered === -1 ? Math.max(questions.length - 1, 0) : firstUnanswered;
  const isLocked = !subscribed && answered >= FREE_THIS_OR_THAT_LIMIT;
  const isLive = category.status === "live" && questions.length > 0;

  return {
    ...category,
    questions,
    answered,
    visibleTotal,
    visibleAnswered,
    nextQuestionIndex,
    complete: questions.length > 0 && answered === questions.length,
    isLocked,
    isLive,
  };
};

const KnowMePage = () => {
  const { subscribed, subscriptionLoading } = useAuth();
  const { knowledgeSnapshot, knowledgeDerivations, loading: contextLoading, refreshKnowledge } =
    useUserProfile();
  const { setBackState } = useTopBar();
  const yourVibe = useMemo(() => getYourVibeDerivation(knowledgeDerivations), [knowledgeDerivations]);
  const { overrides, refresh: refreshOverrides } = useCardOverrides();
  const knowMeResponses = useMemo(
    () => toKnowledgeResponseRecord(knowledgeSnapshot?.know_me_responses),
    [knowledgeSnapshot],
  );
  const allQuestions = useMemo(() => buildSprints().flatMap((sprint) => sprint.questions), []);

  const categories = useMemo(() => {
    return SECTIONS.map((section) => buildCategoryState(section, allQuestions, knowMeResponses, subscribed));
  }, [allQuestions, knowMeResponses, subscribed]);

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

  const [view, setView] = useState<"dashboard" | "categories" | "quiz" | "thisorthat_dashboard" | "thisorthat_splash" | "thisorthat">("dashboard");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SECTIONS[0].id);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [activeTotCategoryId, setActiveTotCategoryId] = useState<string | null>(null);
  const [totSwipeDir, setTotSwipeDir] = useState<"left" | "right" | null>(null);
  const [totSplashSeen, setTotSplashSeen] = useState(false);

  const [styleChatOpen, setStyleChatOpen] = useState(false);
  const [stylePrompt, setStylePrompt] = useState("");
  const [styleChatLoading, setStyleChatLoading] = useState(false);
  const [styleChatMessages, setStyleChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: getStyleChatIntro(yourVibe?.persona_summary),
    },
  ]);

  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  const currentQuestion: QuizQuestion | undefined = activeCategory?.questions[quizQuestionIdx];
  const currentSelected = currentQuestion
    ? selections[currentQuestion.id] || getAnswerValues(knowMeResponses?.[currentQuestion.id])
    : [];

  const thisOrThatCategories = useMemo(() => {
    const questionBank = buildThisOrThatV2RuntimeQuestionBank();
    return getThisOrThatV2CategoryDefinitions().map((category) =>
      buildThisOrThatCategoryState(category, questionBank[category.id] ?? [], knowMeResponses, subscribed),
    );
  }, [knowMeResponses, subscribed]);
  const thisOrThatDashboardItems = useMemo<ThisOrThatDashboardItem[]>(() => {
    const categories = thisOrThatCategories.map((category, index) => ({
      type: "category" as const,
      category,
      layoutClass:
        THIS_OR_THAT_DASHBOARD_LAYOUT[index] ??
        THIS_OR_THAT_DASHBOARD_LAYOUT[THIS_OR_THAT_DASHBOARD_LAYOUT.length - 1],
    }));
    const featureIndex = Math.min(6, categories.length);

    return [
      ...categories.slice(0, featureIndex),
      { type: "feature" as const, layoutClass: "lg:col-span-4" },
      ...categories.slice(featureIndex),
    ];
  }, [thisOrThatCategories]);

  const activeTotCategory = thisOrThatCategories.find((category) => category.id === activeTotCategoryId) ?? null;
  const activeTotQuestion = activeTotCategory?.questions[quizQuestionIdx] ?? null;
  const totalThisOrThatQuestions = thisOrThatCategories.reduce((sum, category) => sum + category.questions.length, 0);
  const totalThisOrThatAnswered = thisOrThatCategories.reduce((sum, category) => sum + category.answered, 0);
  const visibleThisOrThatCount = subscribed ? totalThisOrThatQuestions : Math.min(totalThisOrThatQuestions, FREE_THIS_OR_THAT_LIMIT * thisOrThatCategories.filter((category) => category.isLive).length);
  const visibleThisOrThatAnswered = subscribed ? totalThisOrThatAnswered : thisOrThatCategories.reduce((sum, category) => sum + category.visibleAnswered, 0);

  const updateSelections = useCallback((questionId: string, values: string[]) => {
    setSelections((prev) => ({ ...prev, [questionId]: values }));
  }, []);

  const openCategoriesDashboard = () => setView("categories");

  const openStyleChat = () => {
    setStyleChatMessages([
      {
        role: "assistant",
        content: getStyleChatIntro(yourVibe?.persona_summary),
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
          knowledgeSnapshot: knowledgeSnapshot?.snapshot_payload || {},
          knowledgeDerivations,
          aiAdapter: buildKnowledgeAiAdapter(knowledgeSnapshot, knowledgeDerivations),
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
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      const messageText = message.includes("429")
        ? "The style chat is busy right now. Try again in a moment."
        : message.includes("402")
          ? "AI credits are unavailable right now. Please try again later."
          : "I couldn't reach the style chat right now.";
      toast.error(messageText);
    } finally {
      setStyleChatLoading(false);
    }
  };

  const persistKnowMeResponses = async (patch: Record<string, string | string[]>) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("No user");

    const updatedAt = new Date().toISOString();
    const payload = Object.entries(patch).map(([questionKey, responseValue]) => ({
      user_id: userId,
      question_key: questionKey,
      response_value:
        Array.isArray(responseValue) && responseValue.length === 1
          ? responseValue[0]
          : responseValue,
      updated_at: updatedAt,
    }));

    const { error } = await supabase
      .from("know_me_responses")
      .upsert(payload, { onConflict: "user_id,question_key" });

    if (error) throw error;
  };

  const persistThisOrThatAnswerRecord = async (
    categoryId: string,
    question: ThisOrThatV2QuestionLike,
    choice: "A" | "B",
  ) => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error("No user");

    const updatedAt = new Date().toISOString();
    const payload = buildThisOrThatAnswerUpsertPayload({
      userId,
      categoryId,
      question,
      choice,
      answeredAt: updatedAt,
    });

    const { error } = await (supabase as unknown as ThisOrThatAnswerWriter).from("this_or_that_v2_answers").upsert(payload, {
      onConflict: "user_id,question_key",
    });

    if (error) {
      throw error;
    }
  };

  const runKnowledgeRefresh = async (patch: Record<string, string | string[]>) => {
    try {
      const { error } = await supabase.functions.invoke("knowledge-center-refresh", {
        body: {
          knowMeResponses: patch,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Know Me refresh failed:", error);
    } finally {
      await refreshKnowledge();
    }
  };

  const goToNextQuestion = async () => {
    if (!activeCategory) return;

    const nextIndex = quizQuestionIdx + 1;
    const freeLockReached = !subscribed && nextIndex >= FREE_CATEGORY_LIMIT;
    if (freeLockReached) {
      await refreshKnowledge();
      setView("dashboard");
      toast("Premium unlocks more than 4 questions in each category");
      return;
    }

    if (nextIndex >= activeCategory.questions.length) {
      await refreshKnowledge();
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
      await persistKnowMeResponses({ [questionId]: currentQuestion.multiSelect ? values : values[0] });
      setAiFeedback(AI_FEEDBACK[quizQuestionIdx % AI_FEEDBACK.length]);
      await runKnowledgeRefresh({ [questionId]: currentQuestion.multiSelect ? values : values[0] });
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

  const openThisOrThat = () => {
    // Go straight into the game — pick the first live category that isn't complete
    const nextCategory = thisOrThatCategories.find((c) => c.isLive && !c.complete && c.questions.length > 0)
      ?? thisOrThatCategories.find((c) => c.isLive && c.questions.length > 0);
    if (!nextCategory) {
      toast("No categories available yet");
      return;
    }
    setActiveTotCategoryId(nextCategory.id);
    setQuizQuestionIdx(Math.min(nextCategory.nextQuestionIndex, subscribed ? nextCategory.questions.length - 1 : FREE_THIS_OR_THAT_LIMIT - 1));
    setTotSwipeDir(null);
    if (!totSplashSeen) {
      setView("thisorthat_splash");
    } else {
      setView("thisorthat");
    }
  };

  const startThisOrThatCategory = (categoryId: string) => {
    const category = thisOrThatCategories.find((item) => item.id === categoryId);
    if (!category || !category.isLive) return;
    if (category.isLocked) {
      toast("Premium unlocks more than 8 instinct questions in each category");
      return;
    }

    setActiveTotCategoryId(categoryId);
    setQuizQuestionIdx(Math.min(category.nextQuestionIndex, subscribed ? category.questions.length - 1 : FREE_THIS_OR_THAT_LIMIT - 1));
    setTotSwipeDir(null);
    setView("thisorthat");
  };

  const getSectionForQuestion = (q: QuizQuestion) => SECTIONS.find((section) => section.id === q.section);

  const pickThisOrThat = async (question: ThisOrThatV2QuestionLike, choice: "A" | "B") => {
    if (!question || !activeTotCategory) return;

    const dir = choice === "A" ? "right" : "left";
    setTotSwipeDir(dir);
    const value = choice === "A" ? question.categoryA : question.categoryB;

    try {
      await persistKnowMeResponses({ [question.id]: value });
      await persistThisOrThatAnswerRecord(activeTotCategory.id, question, choice);
      await runKnowledgeRefresh({ [question.id]: value });
    } catch {
      toast.error("Failed to save answer");
      setTotSwipeDir(null);
      return;
    }

    setTimeout(() => {
      setTotSwipeDir(null);
      const nextIndex = quizQuestionIdx + 1;
      const freeLockReached = !subscribed && nextIndex >= FREE_THIS_OR_THAT_LIMIT;
      if (freeLockReached || nextIndex >= activeTotCategory.questions.length) {
        toast.success("Category saved");
        setView("thisorthat_dashboard");
        return;
      }

      setQuizQuestionIdx(nextIndex);
    }, 400);
  };

  useEffect(() => {
    if (view === "quiz") {
      setBackState({ label: "", onBack: () => setView("categories") });
      return;
    }

    if (view === "thisorthat" || view === "thisorthat_splash") {
      setBackState({ label: "", onBack: () => setView("dashboard") });
      return;
    }

    if (view === "thisorthat_dashboard") {
      setBackState({ label: "", onBack: () => setView("dashboard") });
      return;
    }

    setBackState(null);
  }, [setBackState, view]);

  if (contextLoading || subscriptionLoading) {
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
                  <GoTwoInline /> / Know Me
                </span>
              </div>
            </div>

            <h2
              className="text-lg mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}
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
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-teal)" }}
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
                          color: isSelected ? "var(--swatch-teal)" : "var(--swatch-antique-coin)",
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
                  background: effectiveSelected.length > 0 ? "var(--swatch-teal)" : "rgba(var(--swatch-antique-coin-rgb), 0.08)",
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
      <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
        <div className="mx-auto max-w-[1280px] px-3 pt-4 sm:px-4 md:px-6 md:pt-6">

        <div className="grid grid-cols-1 gap-3 auto-rows-[minmax(180px,auto)] sm:gap-4 sm:auto-rows-[minmax(190px,auto)] md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(210px,auto)] xl:auto-rows-[minmax(230px,auto)]">
            {thisOrThatDashboardItems.map((item, index) => {
              if (item.type === "feature") {
                return (
                  <motion.div
                    key="this-or-that-feature-tile"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, type: "spring", stiffness: 250, damping: 24 }}
                    className={`rounded-[24px] p-5 sm:p-6 md:rounded-[28px] md:p-7 text-left relative overflow-hidden min-h-[180px] md:min-h-[200px] ${item.layoutClass}`}
                    style={{ background: "#d4543a", boxShadow: "0 18px 44px rgba(212,84,58,0.3)" }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-2 px-1 text-center sm:gap-3 sm:px-3">
                      <p className="text-[30px] leading-[0.94] sm:text-[34px] md:text-[38px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", margin: 0 }}>This or That</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px]" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Jost', sans-serif", margin: 0 }}>Two Options. One Choice.</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px]" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Jost', sans-serif", margin: 0 }}>Your Pattern Builds Over Time.</p>
                      <p className="text-[11px] sm:text-[12px] md:text-[13px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Jost', sans-serif", margin: 0 }}>Help the AI learn your vibe.</p>
                    </div>
                  </motion.div>
                );
              }

              const category = item.category;
              const isTall = [0, 2, 7, 9, 10].includes(index);
              const isDisabled = !category?.isLive || category?.questions.length === 0;
              const statusLabel = isDisabled ? "Coming soon" : category.complete ? "Complete" : category.isLocked ? "Locked" : "Ready";

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, type: "spring", stiffness: 250, damping: 24 }}
                  disabled={isDisabled}
                  onClick={() => startThisOrThatCategory(category.id)}
                  className={`card-design-sand rounded-[24px] p-4 sm:p-5 md:rounded-[28px] md:p-6 text-left relative overflow-hidden min-h-[180px] sm:min-h-[190px] lg:min-h-0 ${item.layoutClass}`}
                  style={{ opacity: isDisabled ? 0.8 : 1 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isTall
                        ? "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.16), transparent 34%), linear-gradient(145deg, rgba(255,255,255,0.16), transparent 58%)"
                        : "radial-gradient(circle at bottom left, rgba(var(--swatch-cedar-grove-rgb), 0.08), transparent 30%), linear-gradient(145deg, rgba(255,255,255,0.14), transparent 60%)",
                    }}
                  />

                  <div className="relative flex h-full flex-col justify-between gap-4 sm:gap-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                        {category.eyebrow}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)", background: "rgba(255,255,255,0.22)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}>
                        {isDisabled && <Lock className="w-3 h-3" />}
                        {statusLabel}
                      </span>
                    </div>

                    <div className="relative max-w-[24ch] sm:max-w-[26ch]">
                      <h3 className="text-[21px] leading-[0.98] mb-2 sm:text-[24px] sm:mb-3 md:text-[28px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
                        {category.title}
                      </h3>
                      <p className="text-[12px] leading-relaxed sm:text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                        {category.description}
                      </p>
                    </div>

                    <div className="relative flex items-end justify-end gap-4">
                      <span className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                        {isDisabled ? "Unavailable" : "Open"}
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

  /* ── THIS OR THAT: SPLASH ── */
  if (view === "thisorthat_splash") {
    return (
      <div className="h-full flex">
        {/* Full-screen split */}
        <div className="flex-1 flex flex-col items-center justify-center relative" style={{ background: "var(--swatch-teal)" }}>
          <p className="text-[48px] md:text-[72px] leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>Go</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative" style={{ background: "var(--swatch-cedar-grove)" }}>
          <p className="text-[48px] md:text-[72px] leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>Two</p>
        </div>

        {/* Centered overlay card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="pointer-events-auto rounded-[24px] px-8 py-8 md:px-12 md:py-10 text-center max-w-[400px] mx-4"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
          >
            <h2 className="text-[32px] md:text-[40px] leading-[0.92] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
              This or That
            </h2>
            <p className="text-[13px] md:text-[14px] leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Two options. One instinct. Tap the side you lean toward — there's no wrong answer. Your pattern builds over time.
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => { setTotSplashSeen(true); setView("thisorthat"); }}
              className="rounded-full px-8 py-3 text-[12px] uppercase tracking-[0.14em]"
              style={{ fontFamily: "'Jost', sans-serif", background: "var(--swatch-teal)", color: "#fff" }}
            >
              Start
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── THIS OR THAT: GAME (tinder-style split) ── */
  if (view === "thisorthat" && activeTotCategory && activeTotQuestion) {
    const questionNumber = quizQuestionIdx + 1;
    const visibleCategoryTotal = subscribed ? activeTotCategory.questions.length : Math.min(activeTotCategory.questions.length, FREE_THIS_OR_THAT_LIMIT);

    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Progress bar at very top */}
        <div className="flex items-center gap-1 px-4 pt-3 pb-2">
          {Array.from({ length: Math.min(visibleCategoryTotal, 12) }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                height: i < questionNumber ? 4 : 3,
                flex: 1,
                background: i < questionNumber
                  ? "linear-gradient(90deg, var(--swatch-teal), var(--swatch-cedar-grove))"
                  : "rgba(var(--swatch-antique-coin-rgb), 0.15)",
              }}
            />
          ))}
          <span className="text-[10px] tabular-nums ml-2 shrink-0" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
            {questionNumber}/{visibleCategoryTotal}
          </span>
        </div>

        {/* Split panels */}
        <div className="flex-1 flex relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTotQuestion.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              {/* Left: teal — option A */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => void pickThisOrThat(activeTotQuestion, "A")}
                className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-10 text-center cursor-pointer group"
                style={{ background: "var(--swatch-teal)" }}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.5)" }}>This</p>
                <p className="text-[28px] md:text-[38px] leading-[1.0] max-w-[16ch]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                  {activeTotQuestion.categoryA}
                </p>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.button>

              {/* Center divider with prompt */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 md:left-1/2 md:top-1/2">
                <div
                  className="rounded-full px-5 py-3 md:px-6 md:py-4 text-center"
                  style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                >
                  <p className="text-[11px] md:text-[12px] leading-[1.3] max-w-[20ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", fontWeight: 500 }}>
                    {activeTotQuestion.prompt}
                  </p>
                </div>
              </div>

              {/* Right: coral — option B */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => void pickThisOrThat(activeTotQuestion, "B")}
                className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-10 text-center cursor-pointer group"
                style={{ background: "var(--swatch-cedar-grove)" }}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.5)" }}>That</p>
                <p className="text-[28px] md:text-[38px] leading-[1.0] max-w-[16ch]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                  {activeTotQuestion.categoryB}
                </p>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  const kmVibeOvr = overrides["km-vibe"];
  const kmTotOvr = overrides["km-thisorthat"];
  const kmChatOvr = overrides["km-chat"];
  const kmCatOvr = overrides["km-categories"];
  const kmInfoOvr = overrides["km-info"];
  const kmAd1Ovr = overrides["km-ad1"];
  const kmAd2Ovr = overrides["km-ad2"];

  return (
    <>
      <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
          {/*
            Bento mosaic — 7 tiles, same pattern as For You
            6 cols × 6 rows on desktop
            vibe(4×2)  tot(2×2)
            chat(2×2)  ad1(1×1)  cats(3×2)
                       ad2(1×1)
            info(6×1)
          */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 768px) {
              .km-bento {
                grid-template-columns: repeat(6, 1fr) !important;
                grid-template-rows: repeat(5, 120px) !important;
                grid-template-areas:
                  "vibe vibe vibe vibe tot  tot"
                  "vibe vibe vibe vibe tot  tot"
                  "chat chat ad1  cats cats cats"
                  "chat chat ad2  cats cats cats"
                  "info info info info info info" !important;
              }
              .km-area-vibe { grid-area: vibe !important; }
              .km-area-tot  { grid-area: tot  !important; }
              .km-area-chat { grid-area: chat !important; }
              .km-area-ad1  { grid-area: ad1  !important; }
              .km-area-ad2  { grid-area: ad2  !important; }
              .km-area-cats { grid-area: cats !important; }
              .km-area-info { grid-area: info !important; }
            }
          `}} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="km-bento grid grid-cols-2 gap-1.5 md:gap-2"
          >

            {/* ── VIBE: 4×2 hero ── */}
            <div
              className="km-area-vibe col-span-2 md:col-span-1 overflow-hidden relative"
              style={{ borderRadius: 20, background: kmVibeOvr?.image_url ? "transparent" : "var(--swatch-teal)" }}
            >
              <CardEditTrigger cardId="km-vibe" override={kmVibeOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmVibeOvr?.image_url && (
                <>
                  <img src={kmVibeOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)" }} />
                </>
              )}

              {/* Floating stat badge top-right */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 rounded-[16px] px-4 py-3 text-center backdrop-blur-md" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <p className="text-[36px] leading-none md:text-[44px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                  {vibeProgressPercent}<span className="text-[18px] md:text-[22px]">%</span>
                </p>
                <p className="text-[9px] uppercase tracking-[0.16em] mt-0.5" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>Profile read</p>
              </div>

              {/* Content */}
              <div className="relative z-[1] flex flex-col justify-between h-full p-5 md:p-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                    <GoTwoInline /> / Know Me
                  </p>
                  <h1 className="text-[36px] leading-[0.88] max-w-[9ch] sm:text-[46px] md:text-[56px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                    {kmVibeOvr?.heading || "Your Vibe"}
                  </h1>
                </div>

                <p className="text-[13px] leading-snug sm:text-[14px] max-w-[36ch] mt-4" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.85)" }}>
                  {kmVibeOvr?.subheading || yourVibe?.persona_summary || "Building a read on whether your style leans cleaner, louder, softer, practical, or elevated."}
                </p>

                {/* Progress bar */}
                <div className="mt-auto pt-4">
                  <div className="h-[4px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.9), var(--swatch-cedar-grove))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${vibeProgressPercent}%` }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </div>
                  <div className="flex items-center gap-5 mt-2">
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.65)" }}>{totalAnswered} answered</span>
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.45)" }}>{totalQuestions} total</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── THIS OR THAT: 2×2 ── */}
            <motion.button
              whileTap={{ scale: 0.985 }}
              onClick={openThisOrThat}
              className="km-area-tot overflow-hidden relative text-left group"
              style={{ borderRadius: 20, background: kmTotOvr?.image_url ? "transparent" : "linear-gradient(135deg, #d4543a 0%, #c44430 100%)" }}
            >
              <CardEditTrigger cardId="km-thisorthat" override={kmTotOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmTotOvr?.image_url && (
                <>
                  <img src={kmTotOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                </>
              )}

              {/* Pill badge top-right */}
              <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                {visibleThisOrThatCount} prompts
              </span>

              <div className="relative z-[1] flex flex-col justify-between h-full p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.65)" }}>Instinct deck</p>

                <div>
                  <p className="text-[28px] leading-[0.94] sm:text-[34px] md:text-[40px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                    {kmTotOvr?.heading || "This or That"}
                  </p>
                  <p className="text-[12px] leading-relaxed mt-2 max-w-[22ch] sm:text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>
                    {kmTotOvr?.subheading || "Two options. One instinct. Your pattern builds over time."}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.6)" }}>{visibleThisOrThatAnswered} done</span>
                  <div className="rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:translate-x-0.5" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* ── STYLE CHAT: 2×2 ── */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={openStyleChat}
              className="km-area-chat overflow-hidden relative text-left group"
              style={{ borderRadius: 20, background: kmChatOvr?.image_url ? "transparent" : "var(--swatch-cream-light)" }}
            >
              <CardEditTrigger cardId="km-chat" override={kmChatOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmChatOvr?.image_url && (
                <>
                  <img src={kmChatOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)" }} />
                </>
              )}

              <div className={`relative z-[1] flex flex-col justify-between h-full p-5 md:p-6 ${kmChatOvr?.image_url ? "" : ""}`}>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: kmChatOvr?.image_url ? "rgba(255,255,255,0.7)" : "var(--swatch-cedar-grove)" }}>Style chat with AI</p>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: kmChatOvr?.image_url ? "rgba(255,255,255,0.15)" : "rgba(var(--swatch-teal-rgb), 0.1)" }}>
                    <Sparkles className="w-4 h-4" style={{ color: kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)" }} />
                  </div>
                </div>

                <div>
                  <h2 className="text-[24px] leading-[0.96] sm:text-[28px] md:text-[32px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)", maxWidth: "14ch" }}>
                    {kmChatOvr?.heading || "Ask the AI about your style."}
                  </h2>
                  <p className="text-[12px] leading-relaxed mt-2 max-w-[28ch] sm:text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: kmChatOvr?.image_url ? "rgba(255,255,255,0.8)" : "var(--swatch-antique-coin)" }}>
                    {kmChatOvr?.subheading || "Hear how the AI reads your vibe and what it's building toward."}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <div className="rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:translate-x-0.5" style={{ background: kmChatOvr?.image_url ? "rgba(255,255,255,0.15)" : "rgba(var(--swatch-teal-rgb), 0.1)", border: `1px solid ${kmChatOvr?.image_url ? "rgba(255,255,255,0.2)" : "rgba(var(--swatch-teal-rgb), 0.18)"}` }}>
                    <ChevronRight className="w-4 h-4" style={{ color: kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)" }} />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* ── AD TILE 1: 1×1 ── */}
            <div
              className="km-area-ad1 overflow-hidden relative"
              style={{ borderRadius: 20, background: kmAd1Ovr?.image_url ? "transparent" : "linear-gradient(135deg, #ef8555 0%, #eb4b3f 100%)" }}
            >
              <CardEditTrigger cardId="km-ad1" override={kmAd1Ovr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmAd1Ovr?.image_url && (
                <img src={kmAd1Ovr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-1 p-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.9)" }} />
                </div>
                <p className="text-[15px] font-bold leading-tight text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                  {kmAd1Ovr?.heading || "Ad Space"}
                </p>
                <p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                  {kmAd1Ovr?.subheading || "Sponsored"}
                </p>
              </div>
            </div>

            {/* ── AD TILE 2: 1×1 ── */}
            <div
              className="km-area-ad2 overflow-hidden relative"
              style={{ borderRadius: 20, background: kmAd2Ovr?.image_url ? "transparent" : "var(--swatch-teal)" }}
            >
              <CardEditTrigger cardId="km-ad2" override={kmAd2Ovr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmAd2Ovr?.image_url && (
                <img src={kmAd2Ovr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-1 p-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.14)" }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.85)" }} />
                </div>
                <p className="text-[15px] font-bold leading-tight text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                  {kmAd2Ovr?.heading || "Ad Space"}
                </p>
                <p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                  {kmAd2Ovr?.subheading || "Sponsored"}
                </p>
              </div>
            </div>

            {/* ── CATEGORIES: 3×2 ── */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={openCategoriesDashboard}
              className="km-area-cats col-span-2 md:col-span-1 overflow-hidden relative text-left group"
              style={{ borderRadius: 20, background: kmCatOvr?.image_url ? "transparent" : "var(--swatch-cream-light)" }}
            >
              <CardEditTrigger cardId="km-categories" override={kmCatOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmCatOvr?.image_url && (
                <>
                  <img src={kmCatOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)" }} />
                </>
              )}

              <div className="relative z-[1] flex flex-col justify-between h-full p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: kmCatOvr?.image_url ? "rgba(255,255,255,0.7)" : "var(--swatch-cedar-grove)" }}>Get to know you</p>
                  <span className="rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", background: kmCatOvr?.image_url ? "rgba(255,255,255,0.15)" : "rgba(var(--swatch-teal-rgb), 0.08)", color: kmCatOvr?.image_url ? "rgba(255,255,255,0.9)" : "var(--swatch-teal)", border: `1px solid ${kmCatOvr?.image_url ? "rgba(255,255,255,0.2)" : "rgba(var(--swatch-teal-rgb), 0.14)"}`, backdropFilter: "blur(8px)" }}>
                    {categories.length} categories
                  </span>
                </div>

                <div>
                  <h2 className="text-[24px] leading-[0.96] sm:text-[28px] md:text-[34px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: kmCatOvr?.image_url ? "#fff" : "var(--swatch-teal)", maxWidth: "16ch" }}>
                    {kmCatOvr?.heading || "Questions by Category"}
                  </h2>

                  {/* Category pill chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="rounded-full px-2.5 py-1 text-[10px]"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          background: kmCatOvr?.image_url
                            ? (cat.complete ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)")
                            : (cat.complete ? "rgba(var(--swatch-teal-rgb), 0.1)" : "rgba(255,255,255,0.55)"),
                          color: kmCatOvr?.image_url
                            ? "rgba(255,255,255,0.9)"
                            : (cat.complete ? "var(--swatch-teal)" : "var(--swatch-antique-coin)"),
                          border: kmCatOvr?.image_url
                            ? "1px solid rgba(255,255,255,0.15)"
                            : (cat.complete ? "1px solid rgba(var(--swatch-teal-rgb), 0.2)" : "1px solid rgba(var(--swatch-antique-coin-rgb), 0.15)"),
                        }}
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: kmCatOvr?.image_url ? "rgba(255,255,255,0.6)" : "var(--swatch-antique-coin)" }}>{totalAnswered} answered</span>
                    <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: kmCatOvr?.image_url ? "rgba(255,255,255,0.4)" : "var(--swatch-antique-coin)" }}>{totalQuestions} total</span>
                  </div>
                  <div className="rounded-full w-9 h-9 flex items-center justify-center transition-transform group-hover:translate-x-0.5" style={{ background: kmCatOvr?.image_url ? "rgba(255,255,255,0.15)" : "rgba(var(--swatch-teal-rgb), 0.1)", border: `1px solid ${kmCatOvr?.image_url ? "rgba(255,255,255,0.2)" : "rgba(var(--swatch-teal-rgb), 0.18)"}` }}>
                    <ChevronRight className="w-4 h-4" style={{ color: kmCatOvr?.image_url ? "#fff" : "var(--swatch-teal)" }} />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* ── INFO BAR: 6×1 ── */}
            {(() => {
              return (
                <div
                  className="km-area-info col-span-2 overflow-hidden relative flex items-center justify-center px-6 md:px-10"
                  style={{ borderRadius: 20, background: kmInfoOvr?.image_url ? "transparent" : "var(--swatch-cream-light)" }}
                >
                  <CardEditTrigger cardId="km-info" override={kmInfoOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
                  {kmInfoOvr?.image_url && (
                    <>
                      <img src={kmInfoOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
                    </>
                  )}
                  <div className="relative z-[1] flex items-center gap-4 md:gap-6 w-full">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: kmInfoOvr?.image_url ? "rgba(255,255,255,0.15)" : "rgba(var(--swatch-teal-rgb), 0.1)" }}>
                      <Sparkles className="w-4 h-4" style={{ color: kmInfoOvr?.image_url ? "#fff" : "var(--swatch-teal)" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] md:text-[18px] leading-[1.2] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: kmInfoOvr?.image_url ? "#fff" : "var(--swatch-teal)" }}>
                        {kmInfoOvr?.heading || "It reads patterns, not one answer."}
                      </p>
                      <p className="text-[11px] md:text-[12px] mt-0.5" style={{ fontFamily: "'Jost', sans-serif", color: kmInfoOvr?.image_url ? "rgba(255,255,255,0.7)" : "var(--swatch-antique-coin)" }}>
                        {kmInfoOvr?.subheading || "The AI combines your Know Me answers with This or That instinct picks to read patterns across style, gifting, lifestyle, and preferences."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

          </motion.div>
        </div>
      </div>

      <Dialog open={styleChatOpen} onOpenChange={setStyleChatOpen}>
        <DialogContent className="max-w-2xl rounded-[28px] border-border/40 bg-card p-0 overflow-hidden">
          <div className="card-design-sand">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/30">
              <DialogTitle style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "var(--swatch-teal)" }}>
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
                  style={{ fontFamily: "'Jost', sans-serif", background: "rgba(255,255,255,0.22)", color: "var(--swatch-teal)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.2)" }}
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
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
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
                  style={{ background: "rgba(var(--swatch-teal-rgb), 0.18)", color: "var(--swatch-teal)", border: "1px solid rgba(var(--swatch-teal-rgb), 0.22)" }}
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

export default KnowMePage;

// Codebase classification: runtime Know Me page.

