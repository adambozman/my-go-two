import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, SkipForward, Sparkles, Send, Lock } from "lucide-react";
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
import { loadQuestionBank, invalidateBankCache, type BankQuestion } from "@/data/thisOrThatV2Bank";
import {
  buildKnowledgeAiAdapter,
  getCombinedKnowledgeResponses,
  toKnowledgeResponseRecord,
  getYourVibeDerivation,
} from "@/lib/knowledgeCenter";
import GoTwoInline from "@/components/GoTwoInline";
import { CardEditTrigger, useCardOverrides } from "@/components/CardEditor";
import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { INSPIRATIONAL_QUOTES } from "@/lib/quotes";

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

/** Shuffle an array in-place using Fisher–Yates. */
const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

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

const KnowMe = () => {
  const { subscribed, subscriptionLoading } = useAuth();
  const { knowledgeSnapshot, knowledgeDerivations, loading: contextLoading, refreshKnowledge } =
    useUserProfile();
  const { setBackState } = useTopBar();
  const yourVibe = useMemo(() => getYourVibeDerivation(knowledgeDerivations), [knowledgeDerivations]);
  const { overrides, refresh: refreshOverrides } = useCardOverrides();
  const { index: quoteIndex } = useRotatingQuote();
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

  const [view, setView] = useState<"dashboard" | "categories" | "quiz" | "thisorthat_splash" | "thisorthat">("dashboard");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SECTIONS[0].id);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [activeTotCategoryId, setActiveTotCategoryId] = useState<string | null>(null);
  const [totSwipeDir, setTotSwipeDir] = useState<"left" | "right" | null>(null);
  const [totSplashSeen, setTotSplashSeen] = useState(false);

  // Infinite This or That queue — loaded from shared bank (DB + static merged)
  const [totQueue, setTotQueue] = useState<BankQuestion[]>([]);
  const [totQueueIndex, setTotQueueIndex] = useState(0);
  const [totAnswerHistory, setTotAnswerHistory] = useState<{ prompt: string; chosen: string; rejected: string; category?: string }[]>([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [totalTotAnswered, setTotalTotAnswered] = useState(0);

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
  const activeTotCategory = thisOrThatCategories.find((category) => category.id === activeTotCategoryId) ?? null;
  const activeTotQuestion: BankQuestion | null = totQueue[totQueueIndex] ?? null;
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

  const loadBankQueue = useCallback(async () => {
    if (bankLoading) return;
    setBankLoading(true);
    try {
      const bank = await loadQuestionBank();
      // Filter out already-answered questions, then shuffle
      const unanswered = bank.filter(
        (q) => getAnswerValues(knowMeResponses?.[q.id]).length === 0,
      );
      return shuffleArray(unanswered);
    } catch (err) {
      console.warn("Failed to load question bank:", err);
      return [];
    } finally {
      setBankLoading(false);
    }
  }, [bankLoading, knowMeResponses]);

  const openThisOrThat = () => {
    // Set the first category for persistence context
    const firstCat = thisOrThatCategories.find((c) => c.isLive && c.questions.length > 0);
    setActiveTotCategoryId(firstCat?.id ?? null);
    setTotQueueIndex(0);
    setTotAnswerHistory([]);
    setTotalTotAnswered(0);
    setTotSwipeDir(null);

    // Load from shared bank (DB + static merged) — async but fast (cached)
    void (async () => {
      const queue = await loadBankQueue();
      setTotQueue(queue ?? []);
    })();

    if (!totSplashSeen) {
      setView("thisorthat_splash");
    } else {
      setView("thisorthat");
    }
  };



  const getSectionForQuestion = (q: QuizQuestion) => SECTIONS.find((section) => section.id === q.section);

  const pickThisOrThat = (question: BankQuestion, choice: "A" | "B") => {
    if (!question) return;

    const chosenLabel = choice === "A" ? question.categoryA : question.categoryB;
    const rejectedLabel = choice === "A" ? question.categoryB : question.categoryA;

    // ── Advance UI immediately (optimistic) ──
    setTotAnswerHistory((prev) => [
      ...prev,
      { prompt: question.prompt, chosen: chosenLabel, rejected: rejectedLabel, category: question.categoryKey ?? undefined },
    ]);
    setTotalTotAnswered((prev) => prev + 1);

    const nextIndex = totQueueIndex + 1;
    if (nextIndex < totQueue.length) {
      setTotQueueIndex(nextIndex);
    }
    // No more per-session AI fetching — bank growth is triggered automatically by loadQuestionBank

    // ── Persist in background (fire-and-forget) ──
    void (async () => {
      try {
        await persistKnowMeResponses({ [question.id]: chosenLabel });

        if (question.source === "authored" && activeTotCategory) {
          // Static question — use the scaffold-based persistence
          try {
            await persistThisOrThatAnswerRecord(activeTotCategory.id, question, choice);
          } catch {
            console.warn("Could not persist detailed answer record for:", question.id);
          }
        } else if (question.source === "ai") {
          // AI-generated question from shared bank — persist with DB UUIDs + brand info
          const userId = (await supabase.auth.getUser()).data.user?.id;
          if (userId) {
            const selectedBrand = choice === "A" ? question.brandA : question.brandB;
            const rejectedBrand = choice === "A" ? question.brandB : question.brandA;
            const selectedTags = choice === "A" ? question.tagsForA : question.tagsForB;
            const rejectedTags = choice === "A" ? question.tagsForB : question.tagsForA;
            const catKey = question.categoryKey || "personal";
            const now = new Date().toISOString();
            try {
              await (supabase as unknown as ThisOrThatAnswerWriter).from("this_or_that_v2_answers").upsert({
                user_id: userId,
                question_id: question.dbQuestionId,
                question_key: question.id,
                selected_option_id: choice === "A" ? question.dbOptionAId : question.dbOptionBId,
                selected_option_key: choice,
                rejected_option_id: choice === "A" ? question.dbOptionBId : question.dbOptionAId,
                rejected_option_key: choice === "A" ? "B" : "A",
                category_key: catKey,
                subgroup_key: `ai-${catKey}`,
                recommendation_category: catKey,
                primary_keyword: "brand preference",
                descriptor_keywords: selectedTags,
                brand: selectedBrand || null,
                location_keys: [],
                answer_payload: {
                  question_prompt: question.prompt,
                  bank_gender: "shared" as const,
                  selected_label: chosenLabel,
                  rejected_label: rejectedLabel,
                  selected_payload: {
                    primary_keyword: "brand preference",
                    descriptor_keywords: selectedTags,
                    brand_keywords: selectedBrand ? [selectedBrand] : [],
                    avoid_keywords: rejectedTags,
                    category_slug: catKey,
                    subcategory_slug: `ai-${catKey}`,
                    entity_kind: "brand-cluster",
                    entity_slug: chosenLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    location_keywords: [],
                    weight: 0.9,
                  },
                  rejected_payload: {
                    primary_keyword: "brand preference",
                    descriptor_keywords: rejectedTags,
                    brand_keywords: rejectedBrand ? [rejectedBrand] : [],
                    avoid_keywords: selectedTags,
                    category_slug: catKey,
                    subcategory_slug: `ai-${catKey}`,
                    entity_kind: "brand-cluster",
                    entity_slug: rejectedLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    location_keywords: [],
                    weight: 0.9,
                  },
                  response_payload: {
                    category_slug: catKey,
                    subcategory_slug: `ai-${catKey}`,
                    selected: {
                      option_key: choice,
                      label: chosenLabel,
                      metadata: {
                        primary_keyword: "brand preference",
                        descriptor_keywords: selectedTags,
                        brand_keywords: selectedBrand ? [selectedBrand] : [],
                        avoid_keywords: rejectedTags,
                        category_slug: catKey,
                        subcategory_slug: `ai-${catKey}`,
                        entity_kind: "brand-cluster",
                        entity_slug: chosenLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        location_keywords: [],
                        weight: 0.9,
                      },
                    },
                    rejected: {
                      option_key: choice === "A" ? "B" : "A",
                      label: rejectedLabel,
                      metadata: {
                        primary_keyword: "brand preference",
                        descriptor_keywords: rejectedTags,
                        brand_keywords: rejectedBrand ? [rejectedBrand] : [],
                        avoid_keywords: selectedTags,
                        category_slug: catKey,
                        subcategory_slug: `ai-${catKey}`,
                        entity_kind: "brand-cluster",
                        entity_slug: rejectedLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        location_keywords: [],
                        weight: 0.9,
                      },
                    },
                    source_kind: "authored-v2" as const,
                    weight: 0.9,
                  },
                },
                response_source: "this_or_that_v2" as const,
                source_version: "this-or-that-v2-ai",
                answered_at: now,
                updated_at: now,
              } as unknown as ThisOrThatAnswerPayload, { onConflict: "user_id,question_key" });
            } catch {
              console.warn("Could not persist AI answer record for:", question.id);
            }
          }
        }

        void runKnowledgeRefresh({ [question.id]: chosenLabel });
      } catch {
        console.error("Background persist failed for:", question.id);
      }
    })();
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

    setBackState(null);
  }, [setBackState, view]);

  // (Bank growth is handled by loadQuestionBank automatically — no per-session AI polling needed)

  // Only show full-screen loading spinner on initial load, NOT during background refreshes
  // while the user is actively playing This or That or viewing a quiz
  const isInActiveView = view === "thisorthat" || view === "thisorthat_splash" || view === "quiz";
  if ((contextLoading || subscriptionLoading) && !isInActiveView) {
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

  /* ── THIS OR THAT: SPLASH ── */
  if (view === "thisorthat_splash") {
    return (
      <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
          <div className="relative overflow-hidden" style={{ borderRadius: 20, minHeight: "min(calc(100dvh - 180px), 600px)" }}>
        {/* Left side — Go color (coral/orange gradient) */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.1 }}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #ef8555 0%, #eb4b3f 100%)",
            clipPath: "polygon(0 0, 58% 0, 42% 100%, 0 100%)",
          }}
        />
        {/* Right side — Two color (teal) */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.15 }}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(200deg, #00687a 0%, var(--swatch-teal) 100%)",
            clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)",
          }}
        />

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

        {/* "This" watermark — teal side */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 0.10, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute left-[8%] top-1/2 -translate-y-1/2 text-[100px] md:text-[160px] leading-[0.8] select-none pointer-events-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}
        >
          This
        </motion.p>
        {/* "That" watermark — coral side */}
        <motion.p
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.10, x: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="absolute right-[6%] top-1/2 -translate-y-1/2 text-[100px] md:text-[160px] leading-[0.8] select-none pointer-events-none text-right"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}
        >
          That
        </motion.p>

        {/* Floating soft glow behind center card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)", filter: "blur(40px)" }} />

        {/* Centered overlay card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.35 }}
            className="pointer-events-auto text-center mx-4 max-w-[380px]"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              borderRadius: 28,
              padding: "40px 36px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.5) inset",
            }}
          >
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mx-auto mb-5 h-[2px] w-12"
              style={{ background: "linear-gradient(90deg, var(--swatch-teal), var(--swatch-cedar-grove))" }}
            />
            <h2 className="text-[36px] md:text-[44px] leading-[0.92] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
              This or That
            </h2>
            <p className="text-[11px] uppercase tracking-[0.2em] mb-5" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)", fontWeight: 500 }}>
              Quick-fire instincts
            </p>
            <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] mb-7" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Two options appear. Tap the side you lean toward — no wrong answers. Your pattern reveals itself over time.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setTotSplashSeen(true); setView("thisorthat"); }}
              className="relative overflow-hidden rounded-full px-10 py-3.5 text-[11px] uppercase tracking-[0.16em]"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                background: "linear-gradient(135deg, var(--swatch-teal), #3a7a8a)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(47,95,109,0.35)",
              }}
            >
              Let's Go
            </motion.button>
          </motion.div>
        </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── THIS OR THAT: GAME (tinder-style infinite) ── */
  if (view === "thisorthat" && activeTotQuestion) {
    return (
      <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
          {/* Game card — sits on page like every other card */}
          <div className="relative overflow-hidden" style={{ borderRadius: 20, minHeight: "min(calc(100dvh - 180px), 600px)" }}>
            {/* Left side — Go color (coral/orange gradient) */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #ef8555 0%, #eb4b3f 100%)", clipPath: "polygon(0 0, 58% 0, 42% 100%, 0 100%)" }} />
            {/* Right side — Two color (teal) */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(200deg, #00687a 0%, var(--swatch-teal) 100%)", clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)" }} />

            {/* Diagonal seam — thin luminous edge where the two halves meet */}
            <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: "linear-gradient(160deg, transparent 47.5%, rgba(255,255,255,0.22) 49.5%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.22) 50.5%, transparent 52.5%)" }} />

            {/* "or" badge on the diagonal seam */}
            <div className="absolute left-1/2 top-[22%] -translate-x-1/2 z-[3] pointer-events-none">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <span className="text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>or</span>
              </div>
            </div>

            {/* Grain overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

            {/* Inner vignette for depth */}
            <div className="absolute inset-0 pointer-events-none z-[1]" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.18)" }} />

            {/* Question counter badge — top right */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                <span className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                  {totalTotAnswered + 1}
                </span>
              </div>
            </div>

            {/* Tap zones — left = option A, right = option B */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTotQuestion.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-[5]"
              >
                {/* Left: coral side — option A */}
                <button
                  onClick={() => void pickThisOrThat(activeTotQuestion, "A")}
                  className="absolute top-0 left-0 bottom-0 cursor-pointer group"
                  style={{ width: "50%" }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(circle at 35% 40%, rgba(255,255,255,0.10) 0%, transparent 55%)" }} />
                  {/* Active press scale */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pr-[28%] pl-4 md:pl-8 text-center transition-transform duration-150 group-active:scale-[0.97]">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06, type: "spring", stiffness: 320, damping: 28 }}
                      className="text-[10px] uppercase tracking-[0.28em] mb-3"
                      style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.28em" }}
                    >This</motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 24 }}
                      className="text-[24px] md:text-[34px] leading-[1.08]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}
                    >{activeTotQuestion.categoryA}</motion.p>
                    {/* Subtle underline accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="mt-3 h-[1.5px] w-10 opacity-30"
                      style={{ background: "rgba(255,255,255,0.6)" }}
                    />
                  </div>
                </button>

                {/* Right: teal side — option B */}
                <button
                  onClick={() => void pickThisOrThat(activeTotQuestion, "B")}
                  className="absolute top-0 right-0 bottom-0 cursor-pointer group"
                  style={{ width: "50%" }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(circle at 65% 40%, rgba(255,255,255,0.10) 0%, transparent 55%)" }} />
                  {/* Active press scale */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pl-[28%] pr-4 md:pr-8 text-center transition-transform duration-150 group-active:scale-[0.97]">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06, type: "spring", stiffness: 320, damping: 28 }}
                      className="text-[10px] uppercase tracking-[0.28em] mb-3"
                      style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.28em" }}
                    >That</motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 24 }}
                      className="text-[24px] md:text-[34px] leading-[1.08]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}
                    >{activeTotQuestion.categoryB}</motion.p>
                    {/* Subtle underline accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="mt-3 h-[1.5px] w-10 opacity-30"
                      style={{ background: "rgba(255,255,255,0.6)" }}
                    />
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Soft glow behind center card */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)", filter: "blur(40px)" }} />

            {/* Centered frosted card — question prompt */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeTotQuestion.id + "-card"}
                  initial={{ opacity: 0, scale: 0.94, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-auto text-center mx-4 w-full max-w-[380px]"
                  style={{
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    borderRadius: 28,
                    padding: "48px 36px",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.55) inset",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Decorative line — gradient accent */}
                  <div className="mx-auto mb-5 h-[2px] w-14" style={{ background: "linear-gradient(90deg, var(--swatch-teal), var(--swatch-cedar-grove))" }} />

                  {/* Question prompt — same size as splash title */}
                  <h2 className="text-[28px] md:text-[36px] leading-[1.1] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
                    {activeTotQuestion.prompt}
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)", fontWeight: 500, opacity: 0.75 }}>
                    Tap a side to choose
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── THIS OR THAT: LOADING AI QUESTIONS ── */
  if (view === "thisorthat" && !activeTotQuestion) {
    return (
      <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
          <div className="relative overflow-hidden flex items-center justify-center" style={{ borderRadius: 20, minHeight: "min(calc(100dvh - 180px), 600px)" }}>
            {/* Left side — Go color */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #ef8555 0%, #eb4b3f 100%)", clipPath: "polygon(0 0, 58% 0, 42% 100%, 0 100%)" }} />
            {/* Right side — Two color */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(200deg, #00687a 0%, var(--swatch-teal) 100%)", clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)", filter: "blur(40px)" }} />
            <div className="relative z-10 text-center mx-4 w-full max-w-[380px]" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)", borderRadius: 28, padding: "48px 36px", boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.5) inset" }}>
              <div className="mx-auto mb-5 h-[2px] w-12" style={{ background: "linear-gradient(90deg, var(--swatch-teal), var(--swatch-cedar-grove))" }} />
              <div className="flex justify-center mb-4">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--swatch-teal)", borderTopColor: "transparent" }} />
              </div>
              <h2 className="text-[24px] md:text-[28px] leading-[1.1] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}>
                The AI is thinking...
              </h2>
              <p className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                Generating questions based on your answers
              </p>
            </div>
          </div>
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
  const kmAd3Ovr = overrides["km-ad3"];
  const kmAd4Ovr = overrides["km-ad4"];

  return (
    <>
      <div className="h-full overflow-x-hidden overflow-y-auto px-1 pb-6">
        <div className="max-w-[1280px] mx-auto px-3 pt-4 sm:px-4 md:px-6 md:pt-6">
          {/* Bento — absolute positioned, same layout as My Go Two & For You */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full"
            style={{ paddingBottom: "85%" }}
          >
            {/* Slot 1 — YOUR VIBE (left:0 top:0 w:26 h:45) */}
            <div
              className="absolute overflow-hidden"
              style={{ borderRadius: 20, background: kmVibeOvr?.image_url ? "transparent" : "var(--swatch-teal)", left: "0%", top: "0%", width: "26%", height: "45%" }}
            >
              <CardEditTrigger cardId="km-vibe" override={kmVibeOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmVibeOvr?.image_url && (
                <>
                  <img src={kmVibeOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)" }} />
                </>
              )}
              <div className="relative z-[1] flex flex-col h-full p-5 md:p-6">
                <p className="text-[9px] uppercase tracking-[0.18em] mb-auto" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.6)" }}>Your Vibe</p>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                  {yourVibe?.style_keywords && yourVibe.style_keywords.length > 0 ? (
                    <h2 className="text-[26px] leading-[0.92] sm:text-[30px] md:text-[36px] italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                      {kmVibeOvr?.heading || yourVibe.style_keywords.slice(0, 3).join(" &\n")}
                    </h2>
                  ) : (
                    <h2 className="text-[26px] leading-[0.92] sm:text-[30px] md:text-[36px] italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>
                      {kmVibeOvr?.heading || "Not enough\nanswers yet"}
                    </h2>
                  )}
                  <p className="text-[11px] leading-[1.55] mt-3 max-w-[22ch] sm:text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.78)" }}>
                    {kmVibeOvr?.subheading || yourVibe?.persona_summary || "Answer more questions so the AI can start reading your style."}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-[10px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.5)" }}>{totalAnswered} / {totalQuestions}</span>
                  <div className="h-[3px] flex-1 mx-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <div className="h-full rounded-full" style={{ width: `${vibeProgressPercent}%`, background: "rgba(255,255,255,0.7)", transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Slot 2 — AD (left:27.5 top:0 w:27 h:22) */}
            <div className="absolute overflow-hidden p-3 cursor-pointer" style={{ borderRadius: 20, background: kmAd1Ovr?.image_url ? "transparent" : "linear-gradient(135deg, #ef8555 0%, #eb4b3f 100%)", left: "27.5%", top: "0%", width: "27%", height: "22%" }}>
              <CardEditTrigger cardId="km-ad1" override={kmAd1Ovr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmAd1Ovr?.image_url && (<img src={kmAd1Ovr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />)}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}><Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.9)" }} /></div>
                <p className="text-[15px] font-bold leading-tight text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>{kmAd1Ovr?.heading || "Ad Space"}</p>
                <div className="rounded-lg px-2.5 py-1" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)" }}><p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>{kmAd1Ovr?.subheading || "Sponsored"}</p></div>
              </div>
            </div>

            {/* Slot 3 — THIS OR THAT (left:56 top:0 w:44 h:22) */}
            <motion.button
              whileTap={{ scale: 0.985 }}
              onClick={openThisOrThat}
              className="absolute overflow-hidden text-left group cursor-pointer"
              style={{ borderRadius: 20, left: "56%", top: "0%", width: "44%", height: "22%" }}
            >
              {/* Diagonal split — Go (coral/orange) left, Two (teal) right */}
              {!kmTotOvr?.image_url && (
                <>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #ef8555 0%, #eb4b3f 100%)", clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(200deg, #00687a 0%, var(--swatch-teal) 100%)", clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }} />
                  {/* Diagonal seam glow */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(160deg, transparent 47%, rgba(255,255,255,0.2) 49.5%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 50.5%, transparent 53%)" }} />
                </>
              )}
              <CardEditTrigger cardId="km-thisorthat" override={kmTotOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmTotOvr?.image_url && (
                <>
                  <img src={kmTotOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                </>
              )}
              {/* "This" on left (coral) side, "or" on seam, "That" on right (teal) side */}
              <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                {/* This — left side */}
                <p className="absolute text-[26px] sm:text-[32px] md:text-[38px] leading-[0.94]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.12)", left: "12%", top: "50%", transform: "translateY(-50%)" }}>
                  This
                </p>
                {/* "or" badge on diagonal seam */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <span className="text-[9px] uppercase tracking-[0.06em]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>or</span>
                </div>
                {/* That — right side */}
                <p className="absolute text-[26px] sm:text-[32px] md:text-[38px] leading-[0.94]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.12)", right: "12%", top: "50%", transform: "translateY(-50%)" }}>
                  That
                </p>
              </div>
              {/* Description — bottom left */}
              <div className="absolute bottom-4 left-5 z-[1] pointer-events-none md:bottom-5 md:left-6">
                <p className="text-[11px] leading-relaxed max-w-[20ch] sm:text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>
                  {kmTotOvr?.subheading || "Two options. One instinct. Your pattern builds over time."}
                </p>
              </div>
            </motion.button>

            {/* Slot 4 — ASK THE AI (left:27.5 top:24 w:24 h:45) */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={openStyleChat}
              className="absolute overflow-hidden text-left group"
              style={{ borderRadius: 20, background: kmChatOvr?.image_url ? "transparent" : "var(--swatch-cream-light)", left: "27.5%", top: "24%", width: "24%", height: "45%" }}
            >
              <CardEditTrigger cardId="km-chat" override={kmChatOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmChatOvr?.image_url && (
                <>
                  <img src={kmChatOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)" }} />
                </>
              )}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full p-5 md:p-6 text-center">
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.08 }}>
                  <div className="rounded-full" style={{ width: "85%", aspectRatio: "1", border: `1.5px solid ${kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)"}` }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.04 }}>
                  <div className="rounded-full" style={{ width: "110%", aspectRatio: "1", border: `1.5px solid ${kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)"}` }} />
                </div>
                {/* Sparkle icon */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: kmChatOvr?.image_url ? "rgba(255,255,255,0.15)" : "rgba(var(--swatch-teal-rgb), 0.08)" }}>
                  <Sparkles className="w-5 h-5" style={{ color: kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)" }} />
                </div>
                <h2 className="text-[24px] leading-[0.96] sm:text-[28px] md:text-[32px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)" }}>
                  {kmChatOvr?.heading || "Ask the AI"}
                </h2>
                <p className="text-[12px] mt-2 sm:text-[13px]" style={{ fontFamily: "'Jost', sans-serif", color: kmChatOvr?.image_url ? "rgba(255,255,255,0.7)" : "var(--swatch-antique-coin)" }}>
                  {kmChatOvr?.subheading || "about your style"}
                </p>
                <div className="mt-6 rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.14em] transition-transform group-hover:scale-105" style={{ fontFamily: "'Jost', sans-serif", color: kmChatOvr?.image_url ? "#fff" : "var(--swatch-teal)", border: `1px solid ${kmChatOvr?.image_url ? "rgba(255,255,255,0.3)" : "rgba(var(--swatch-teal-rgb), 0.2)"}` }}>
                  Start →
                </div>
              </div>
            </motion.button>

            {/* Slot 5 — AD tall (left:53 top:24 w:20 h:76) */}
            <div className="absolute overflow-hidden p-3 cursor-pointer" style={{ borderRadius: 20, background: kmAd2Ovr?.image_url ? "transparent" : "var(--swatch-teal)", left: "53%", top: "24%", width: "20%", height: "76%" }}>
              <CardEditTrigger cardId="km-ad2" override={kmAd2Ovr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmAd2Ovr?.image_url && (<img src={kmAd2Ovr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />)}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.14)" }}><Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.85)" }} /></div>
                <p className="text-[15px] font-bold leading-tight text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>{kmAd2Ovr?.heading || "Ad Space"}</p>
                <div className="rounded-lg px-2.5 py-1" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}><p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>{kmAd2Ovr?.subheading || "Sponsored"}</p></div>
              </div>
            </div>

            {/* Slot 6 — AD (left:74.5 top:24 w:25.5 h:22) */}
            <div className="absolute overflow-hidden p-3 cursor-pointer" style={{ borderRadius: 20, background: kmAd3Ovr?.image_url ? "transparent" : "linear-gradient(135deg, #ef8555 0%, #eb4b3f 100%)", left: "74.5%", top: "24%", width: "25.5%", height: "22%" }}>
              <CardEditTrigger cardId="km-ad3" override={kmAd3Ovr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmAd3Ovr?.image_url && (<img src={kmAd3Ovr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />)}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}><Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.9)" }} /></div>
                <p className="text-[15px] font-bold leading-tight text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>{kmAd3Ovr?.heading || "Ad Space"}</p>
                <div className="rounded-lg px-2.5 py-1" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)" }}><p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>{kmAd3Ovr?.subheading || "Sponsored"}</p></div>
              </div>
            </div>

            {/* Slot 7 — AD (left:0 top:47.5 w:26 h:22) */}
            <div className="absolute overflow-hidden p-3 cursor-pointer" style={{ borderRadius: 20, background: kmAd4Ovr?.image_url ? "transparent" : "linear-gradient(135deg, #ef8555 0%, #eb4b3f 100%)", left: "0%", top: "47.5%", width: "26%", height: "22%" }}>
              <CardEditTrigger cardId="km-ad4" override={kmAd4Ovr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmAd4Ovr?.image_url && (<img src={kmAd4Ovr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />)}
              <div className="relative z-[1] flex flex-col items-center justify-center h-full gap-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}><Sparkles className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.9)" }} /></div>
                <p className="text-[15px] font-bold leading-tight text-center" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>{kmAd4Ovr?.heading || "Ad Space"}</p>
                <div className="rounded-lg px-2.5 py-1" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)" }}><p className="text-[7px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)" }}>{kmAd4Ovr?.subheading || "Sponsored"}</p></div>
              </div>
            </div>

            {/* Slot 8 — CATEGORIES (left:74.5 top:48.5 w:25.5 h:51.5) */}
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={openCategoriesDashboard}
              className="absolute overflow-hidden text-left group"
              style={{ borderRadius: 20, background: kmCatOvr?.image_url ? "transparent" : "var(--swatch-cream-light)", left: "74.5%", top: "48.5%", width: "25.5%", height: "51.5%" }}
            >
              <CardEditTrigger cardId="km-categories" override={kmCatOvr} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
              {kmCatOvr?.image_url && (
                <>
                  <img src={kmCatOvr.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)" }} />
                </>
              )}
              <div className="relative z-[1] flex flex-col h-full p-4 md:p-5">
                <h2 className="text-[20px] leading-[0.96] sm:text-[24px] md:text-[28px] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: kmCatOvr?.image_url ? "#fff" : "var(--swatch-teal)" }}>
                  {kmCatOvr?.heading || "Questions\nby Category"}
                </h2>
                {/* Category list */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: kmCatOvr?.image_url ? "rgba(255,255,255,0.9)" : "var(--swatch-teal)" }}>{cat.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>

            {/* Slot 9 — QUOTES (left:0 top:72 w:51.5 h:28) */}
            {(() => {
              const quoteOverride = overrides["km-quote"];
              const quoteText = quoteOverride?.heading || INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length].text;
              const quoteAuthor = quoteOverride?.subheading || INSPIRATIONAL_QUOTES[quoteIndex % INSPIRATIONAL_QUOTES.length].author;
              return (
                <div
                  className="absolute overflow-hidden flex items-center justify-center px-6 md:px-10"
                  style={{ borderRadius: 20, background: quoteOverride?.image_url ? "transparent" : "var(--swatch-teal)", left: "0%", top: "72%", width: "51.5%", height: "28%" }}
                >
                  <CardEditTrigger cardId="km-quote" override={quoteOverride} onSaved={refreshOverrides} fields={["image_url", "heading", "subheading"]} />
                  {quoteOverride?.image_url && (
                    <>
                      <img src={quoteOverride.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
                    </>
                  )}
                  <div className="relative z-[1] flex items-center gap-4 md:gap-6 w-full">
                    <p className="text-[18px] md:text-[22px] leading-[1.2] flex-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 600, color: "#fff" }}>
                      \u201c{quoteText}\u201d
                    </p>
                    <p className="text-[10px] md:text-[11px] shrink-0 uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                      — {quoteAuthor}
                    </p>
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

export default KnowMe;

// Codebase classification: runtime Know Me page.


