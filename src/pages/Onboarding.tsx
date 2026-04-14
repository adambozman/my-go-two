import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useUserProfile } from "@/contexts/user-profile-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import {
  profileQuestions,
  deriveSpendTier,
  buildVibeCacheKey,
  buildSpendCacheKey,
  buildBrandCacheKey,
  type OnboardingQuestion,
  type SpendItem,
  type SpendRange,
} from "@/data/profileQuestions";
import { getYourVibeDerivation } from "@/lib/knowledgeCenter";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "intro" | "profile" | "personalizing" | "complete";

interface AiScreenState {
  loading: boolean;
  error: string | null;
  // For vibe + brand: injected as options into the question
  vibeOptions?: Array<{ id: string; label: string; description: string; keywords: string[] }>;
  brandOptions?: Array<{ id: string; label: string; category: string; tier: string }>;
  // For spend: injected as spendItems
  spendItems?: SpendItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INTRO_CARDS = [
  { id: "shopping",  label: "Shopping",  note: "What you buy and how you spend." },
  { id: "style",     label: "Style",     note: "The aesthetics and signals that feel like you." },
  { id: "food",      label: "Food",      note: "What you order, crave, and return to." },
  { id: "gifts",     label: "Gifting",   note: "What lands well when someone shops for you." },
  { id: "lifestyle", label: "Lifestyle", note: "How your free time and routines actually feel." },
  { id: "taste",     label: "Taste",     note: "The aesthetic direction underneath all of it." },
];

const accent = {
  solid:   "hsl(196 40% 31%)",
  ring:    "hsl(196 40% 31%)",
  bg:      "rgba(45, 104, 112, 0.16)",
  bgStrong:"rgba(45, 104, 112, 0.34)",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const normalizeOptionalDate = (value: string | string[] | undefined): string | null => {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
};

const getErrorMessage = (error: unknown): string => {
  const message =
    error instanceof Error
      ? error.message
      : error && typeof error === "object" && "message" in error
        ? String((error as Record<string, unknown>).message)
        : "Something went wrong";

  if (
    message.includes("onboarding_responses") ||
    message.includes("onboarding_completed_at") ||
    message.includes("user_knowledge_snapshots")
  ) {
    return "The Supabase schema is missing onboarding tables or columns.";
  }
  return message;
};

// Extract a flat string value from answers (first item if array)
const flatAnswer = (answers: Record<string, string | string[]>, key: string): string => {
  const val = answers[key];
  if (!val) return "";
  return Array.isArray(val) ? val[0] ?? "" : val;
};

// Derive spend tier from baseline spend answers for brand cache key
const buildBaselineSpendRecord = (answers: Record<string, string | string[]>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(answers)) {
    if (key.startsWith("spend_baseline__")) {
      result[key] = Array.isArray(val) ? val[0] ?? "" : val;
    }
  }
  return result;
};

// ─── AI Screen Fetcher ────────────────────────────────────────────────────────

const fetchAiScreen = async (
  screen: 3 | 5 | 6,
  params: {
    age_range?: string;
    gender?: string;
    top_categories?: string[];
    spend_tier?: string;
  },
): Promise<{ data: unknown }> => {
  const { data, error } = await supabase.functions.invoke("onboarding-ai-generator", {
    body: { screen, ...params },
  });
  if (error) throw error;
  return data as { data: unknown };
};

// ─── Spend Select Component ───────────────────────────────────────────────────

const SpendSelectRow = ({
  item,
  selectedRangeId,
  onSelect,
}: {
  item: SpendItem;
  selectedRangeId?: string;
  onSelect: (itemId: string, rangeId: string) => void;
}) => (
  <div className="mb-5">
    <p
      className="mb-2 text-sm font-semibold"
      style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
    >
      {item.label}
    </p>
    <div className="flex flex-wrap gap-2">
      {item.ranges.map((range: SpendRange) => {
        const isSelected = selectedRangeId === range.id;
        return (
          <button
            key={range.id}
            onClick={() => onSelect(item.id, range.id)}
            className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              background: isSelected
                ? accent.solid
                : "linear-gradient(158deg, rgba(232,198,174,0.3), rgba(107,109,98,0.1))",
              color: isSelected ? "#fff" : "hsl(196 40% 31%)",
              border: isSelected
                ? `2px solid ${accent.solid}`
                : "1px solid rgba(107,109,98,0.35)",
              boxShadow: isSelected ? "0 4px 14px rgba(45,104,112,0.22)" : undefined,
            }}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  </div>
);

// ─── Rank Select Component ────────────────────────────────────────────────────

const RankSelect = ({
  question,
  answers,
  onToggle,
}: {
  question: OnboardingQuestion;
  answers: Record<string, string | string[]>;
  onToggle: (questionId: string, optionId: string) => void;
}) => {
  const selected = (() => {
    const val = answers[question.id];
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  })();
  const maxRank = question.maxRank ?? 3;

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-2 overflow-y-auto pb-4">
      <p className="mb-1 text-center text-xs text-muted-foreground">
        Pick your top {maxRank} — tap to select, tap again to remove
      </p>
      {(question.options ?? []).map((option, index) => {
        const rank = selected.indexOf(option.id);
        const isSelected = rank !== -1;
        const rankLabel = isSelected ? `#${rank + 1}` : null;

        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => {
              if (!isSelected && selected.length >= maxRank) return; // cap at maxRank
              onToggle(question.id, option.id);
            }}
            disabled={!isSelected && selected.length >= maxRank}
            className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-left transition-all duration-200 ${
              isSelected ? "shadow-md" : "hover:shadow-sm"
            } ${!isSelected && selected.length >= maxRank ? "opacity-40 cursor-not-allowed" : ""}`}
            style={{
              background: isSelected
                ? `linear-gradient(158deg, ${accent.bgStrong}, ${accent.bg})`
                : "linear-gradient(158deg, rgba(232,198,174,0.2), rgba(107,109,98,0.08))",
              border: isSelected ? `2px solid ${accent.solid}` : "2px solid transparent",
            }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all"
              style={{
                background: isSelected ? accent.solid : "rgba(107,109,98,0.15)",
                color: isSelected ? "#fff" : "rgba(107,109,98,0.7)",
              }}
            >
              {rankLabel ?? (option.emoji ?? "")}
            </div>
            <span className="text-sm font-semibold text-primary">{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

// ─── AI Loading Placeholder ───────────────────────────────────────────────────

const AiLoadingCard = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <Loader2
      className="h-8 w-8 animate-spin"
      style={{ color: accent.solid }}
    />
    <p
      className="text-sm"
      style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
    >
      {label}
    </p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const { user } = useAuth();
  const { knowledgeDerivations, refreshKnowledge } = useUserProfile();
  const { toast } = useToast();

  const [phase, setPhase] = useState<Phase>(isEditMode ? "profile" : "intro");
  const [profileIndex, setProfileIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  // AI screen state: keyed by question id (style_vibe, spend_generated, brand_affinity)
  const [aiScreens, setAiScreens] = useState<Record<string, AiScreenState>>({
    style_vibe:     { loading: false, error: null },
    spend_generated:{ loading: false, error: null },
    brand_affinity: { loading: false, error: null },
  });

  // Track which AI screens have been fetched to avoid duplicate calls
  const fetchedAiScreens = useRef<Set<string>>(new Set());

  // ── Popstate ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase === "intro") return;
    window.history.pushState({ phase }, "");

    const handlePopState = () => {
      if (phase === "profile") {
        if (profileIndex > 0) {
          setSlideDir(-1);
          setProfileIndex((i) => i - 1);
        } else if (!isEditMode) {
          setPhase("intro");
        }
      } else if (phase === "complete") {
        setPhase("profile");
        setProfileIndex(profileQuestions.length - 1);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [phase, profileIndex, isEditMode]);

  // ── AI Screen Prefetch ────────────────────────────────────────────────────
  // Fires when the user reaches an AI-driven question for the first time.

  const triggerAiScreenFetch = useCallback(
    async (questionId: string) => {
      if (fetchedAiScreens.current.has(questionId)) return;
      fetchedAiScreens.current.add(questionId);

      setAiScreens((prev) => ({
        ...prev,
        [questionId]: { ...prev[questionId], loading: true, error: null },
      }));

      try {
        const ageRange  = flatAnswer(answers, "age_range") || "25_34";
        const gender    = flatAnswer(answers, "gender") || "prefer_not";
        const topCats   = (() => {
          const val = answers["category_priority"];
          return Array.isArray(val) ? val : val ? [val] : [];
        })();

        if (questionId === "style_vibe") {
          const result = await fetchAiScreen(3, { age_range: ageRange, gender });
          setAiScreens((prev) => ({
            ...prev,
            style_vibe: { loading: false, error: null, vibeOptions: result.data as AiScreenState["vibeOptions"] },
          }));
        }

        if (questionId === "spend_generated") {
          const result = await fetchAiScreen(5, { top_categories: topCats });
          setAiScreens((prev) => ({
            ...prev,
            spend_generated: { loading: false, error: null, spendItems: result.data as SpendItem[] },
          }));
        }

        if (questionId === "brand_affinity") {
          const baselineRecord = buildBaselineSpendRecord(answers);
          const spendTier = deriveSpendTier(baselineRecord);
          const result = await fetchAiScreen(6, {
            age_range: ageRange,
            gender,
            top_categories: topCats,
            spend_tier: spendTier,
          });
          setAiScreens((prev) => ({
            ...prev,
            brand_affinity: { loading: false, error: null, brandOptions: result.data as AiScreenState["brandOptions"] },
          }));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Could not load personalized options";
        setAiScreens((prev) => ({
          ...prev,
          [questionId]: { loading: false, error: msg },
        }));
      }
    },
    [answers],
  );

  const currentQuestion = profileQuestions[profileIndex];

  // Trigger AI fetch when landing on an AI question
  useEffect(() => {
    if (!currentQuestion) return;
    const aiTypes = ["ai-vibe", "ai-spend-items", "ai-brand-grid"];
    if (aiTypes.includes(currentQuestion.type)) {
      triggerAiScreenFetch(currentQuestion.id);
    }
  }, [currentQuestion, triggerAiScreenFetch]);

  const progress = ((profileIndex + 1) / profileQuestions.length) * 100;

  const selectedForQuestion = currentQuestion
    ? (() => {
        const value = answers[currentQuestion.id];
        if (!value) return [];
        return Array.isArray(value) ? value : [];
      })()
    : [];

  const currentFreeText =
    currentQuestion && typeof answers[currentQuestion.id] === "string"
      ? String(answers[currentQuestion.id])
      : "";

  const completionSummary = useMemo(() => {
    const yourVibe = getYourVibeDerivation(knowledgeDerivations);
    if (yourVibe?.persona_summary?.trim()) return yourVibe.persona_summary.trim();
    return "Your profile is saved. Everything in Go Two builds from here — recommendations, connections, gift suggestions.";
  }, [knowledgeDerivations]);

  // ── Answer Setters ─────────────────────────────────────────────────────────

  const setSingle = (questionId: string, optionId: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }));

  const toggleMulti = (questionId: string, optionId: string) =>
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      return current.includes(optionId)
        ? { ...prev, [questionId]: current.filter((v) => v !== optionId) }
        : { ...prev, [questionId]: [...current, optionId] };
    });

  const setFreeText = (questionId: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  // For spend items: stored as spend_baseline__itemId or spend_generated__itemId
  const setSpendItem = (prefix: string, itemId: string, rangeId: string) =>
    setAnswers((prev) => ({ ...prev, [`${prefix}__${itemId}`]: rangeId }));

  const getSpendItemAnswer = (prefix: string, itemId: string): string | undefined => {
    const val = answers[`${prefix}__${itemId}`];
    return typeof val === "string" ? val : undefined;
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const goNext = () => {
    if (profileIndex < profileQuestions.length - 1) {
      setSlideDir(1);
      setProfileIndex((i) => i + 1);
      return;
    }
    runKnowledgeRefresh();
  };

  const goBack = () => {
    if (profileIndex > 0) {
      setSlideDir(-1);
      setProfileIndex((i) => i - 1);
      return;
    }
    if (!isEditMode) {
      setPhase("intro");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSkip = async () => {
    if (!user) { navigate("/dashboard"); return; }
    try {
      await supabase
        .from("profiles")
        .update({ onboarding_completed_at: new Date().toISOString() })
        .eq("user_id", user.id);
    } catch (err) {
      console.error("Onboarding skip save failed:", err);
    }
    navigate("/dashboard");
  };

  // ── Persist & Complete ─────────────────────────────────────────────────────

  const persistOnboardingResponses = async (profileAnswerData: Record<string, string | string[]>) => {
    if (!user) return;
    const updatedAt = new Date().toISOString();
    const payload = Object.entries(profileAnswerData).map(([questionKey, responseValue]) => ({
      user_id: user.id,
      question_key: questionKey,
      response_value:
        Array.isArray(responseValue) && responseValue.length === 1
          ? responseValue[0]
          : responseValue,
      updated_at: updatedAt,
    }));
    const { error } = await supabase
      .from("onboarding_responses")
      .upsert(payload, { onConflict: "user_id,question_key" });
    if (error) throw error;
  };

  const markOnboardingComplete = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_completed_at: new Date().toISOString() })
      .eq("user_id", user.id);
    if (error) throw error;
  };

  const runKnowledgeRefresh = async () => {
    setPhase("personalizing");

    // Collect all answers — include spend item sub-keys
    const profileAnswerData: Record<string, string | string[]> = { ...answers };

    try {
      if (user) {
        await markOnboardingComplete();
        await persistOnboardingResponses(profileAnswerData);
      }

      const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 30000));
      const refreshPromise = (async () => {
        try {
          const { data, error } = await supabase.functions.invoke("knowledge-center-refresh", {
            body: { onboardingResponses: profileAnswerData },
          });
          if (error) {
            console.error("Knowledge center refresh error:", error);
            toast({
              title: "Profile saved",
              description: "Your profile is stored. Personalization will catch up shortly.",
            });
          } else {
            await refreshKnowledge();
            // knowledge-center-refresh returns { snapshot, derivations, refreshed_at }
            const vibeDerivation = Array.isArray(data?.derivations)
              ? data.derivations.find((d: Record<string, unknown>) => d.derivation_key === "your_vibe")
              : null;
            const personaSummary =
              (vibeDerivation?.derivation_payload as Record<string, unknown>)?.persona_summary;
            toast({
              title: "Profile complete",
              description:
                (typeof personaSummary === "string" && personaSummary.trim())
                  ? personaSummary.trim()
                  : "Your Go Two profile is ready.",
            });
          }
        } catch (err) {
          console.error("Knowledge center refresh failed:", err);
          toast({
            title: "Profile saved",
            description: "Your answers are safely stored.",
          });
        }
      })();

      await Promise.race([refreshPromise, timeoutPromise]);
      await refreshKnowledge();
      setPhase("complete");
    } catch (error: unknown) {
      console.error("Onboarding save error:", error);
      toast({ title: "Error", description: getErrorMessage(error), variant: "destructive" });
      setPhase("profile");
    }
  };

  // ── INTRO PHASE ────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="landing-page min-h-screen overflow-x-hidden">
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Nav */}
          <nav className="flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 lg:px-16">
            <GoTwoText style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }} />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-sm font-semibold"
              style={{ color: "var(--swatch-teal)" }}
            >
              Skip
            </Button>
          </nav>

          {/* Hero */}
          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 sm:px-6">
            <div className="max-w-[640px] text-center">
              <p
                style={{
                  fontSize: 10.5,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#d4543a",
                  fontWeight: 500,
                  marginBottom: 16,
                }}
              >
                Let's set up your profile
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 700,
                  color: "var(--swatch-teal)",
                  lineHeight: 1,
                }}
              >
                Built around you,
                <br />
                not a template.
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(16px, 2.2vw, 22px)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "var(--swatch-teal)",
                  lineHeight: 1.3,
                  marginTop: 16,
                  maxWidth: 520,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                We use your real taste, spend, and habits to build a profile that
                actually knows you. The AI personalizes every step.
              </p>

              <button
                onClick={() => setPhase("profile")}
                className="mt-8 rounded-full px-10 py-3.5 transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--swatch-cedar-grove)",
                  color: "#ffffff",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.3px",
                  boxShadow: "0 8px 24px rgba(212, 84, 58, 0.22)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Build My Profile <ArrowRight className="ml-2 inline h-4 w-4" />
              </button>

              <div className="mt-3">
                <button
                  onClick={handleSkip}
                  className="text-xs hover:underline"
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--swatch-antique-coin)",
                    cursor: "pointer",
                    fontWeight: 400,
                  }}
                >
                  Skip for now
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div
              className="mt-10 flex flex-wrap justify-center"
              style={{ gap: 10, maxWidth: 600 }}
            >
              {INTRO_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="rounded-full px-5 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(45,104,112,0.15)",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--swatch-teal)",
                    }}
                  >
                    {card.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PERSONALIZING PHASE ────────────────────────────────────────────────────

  if (phase === "personalizing") {
    return (
      <div className="landing-page flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[560px] text-center"
        >
          <GoTwoText className="mb-10 text-[48px] [&_.two]:text-[60px]" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
            className="mx-auto mb-8 h-[2px]"
            style={{ background: "var(--logo-two-color)" }}
          />
          <p className="surface-eyebrow-coral">Saving your profile</p>
          <h2
            className="mt-4 text-[34px] leading-[0.96] md:text-[44px]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-teal)" }}
          >
            Your answers are being written to your profile.
          </h2>
          <p
            className="mt-5 text-[20px] leading-[1.28]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 600,
              color: "var(--swatch-teal)",
            }}
          >
            Then we build your first Knowledge Center read from the same source of truth.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── COMPLETE PHASE ─────────────────────────────────────────────────────────

  if (phase === "complete") {
    return (
      <div className="landing-page min-h-screen overflow-x-hidden">
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Nav */}
          <nav className="flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 lg:px-16">
            <GoTwoText style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }} />
          </nav>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl text-center"
            >
              {/* Check icon */}
              <div
                className="mx-auto mb-6 flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--swatch-teal)",
                  boxShadow: "0 8px 28px rgba(45,104,112,0.3)",
                }}
              >
                <Check className="h-7 w-7 text-white" />
              </div>

              <p
                style={{
                  fontSize: 10.5,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#d4543a",
                  fontWeight: 500,
                  marginBottom: 16,
                }}
              >
                Profile complete
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "var(--swatch-teal)",
                  lineHeight: 1,
                }}
              >
                You're all set.
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "var(--swatch-teal)",
                  lineHeight: 1.35,
                  marginTop: 16,
                  maxWidth: 480,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {completionSummary}
              </p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center rounded-full px-8 py-3.5 transition-all hover:scale-[1.02]"
                  style={{
                    background: "var(--swatch-cedar-grove)",
                    color: "#fff",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.3px",
                    boxShadow: "0 8px 24px rgba(212, 84, 58, 0.22)",
                    textDecoration: "none",
                  }}
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/dashboard/know-me"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(45,104,112,0.2)",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--swatch-teal)",
                    textDecoration: "none",
                  }}
                >
                  <ClipboardList className="h-4 w-4" />
                  Keep Going in Know Me
                </Link>
              </div>

              {/* Info cards */}
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <div
                  className="rounded-[20px] p-5 text-left"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(45,104,112,0.12)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: "var(--swatch-teal)",
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    What's next
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--swatch-teal)",
                      lineHeight: 1.2,
                    }}
                  >
                    Play This or That on the dashboard to keep sharpening your recs.
                  </p>
                </div>
                <div
                  className="rounded-[20px] p-5 text-left"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(45,104,112,0.12)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: "var(--swatch-teal)",
                      fontWeight: 500,
                      marginBottom: 8,
                    }}
                  >
                    Your data
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#4a6068",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    Your spend anchors, brand picks, and style signals are saved to your profile.
                    The recommendation engine uses all of it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // ── NULL GUARD ─────────────────────────────────────────────────────────────

  if (!currentQuestion) return null;

  // ── Resolve AI screen data into the current question for rendering ─────────

  const aiState = aiScreens[currentQuestion.id] ?? { loading: false, error: null };

  // For ai-vibe: merge AI options into question shape
  const resolvedVibeOptions = aiState.vibeOptions?.map((v) => ({
    id: v.id,
    label: v.label,
    description: v.description,
  }));

  // For ai-brand-grid: merge AI brand options
  const resolvedBrandOptions = aiState.brandOptions?.map((b) => ({
    id: b.id,
    label: b.label,
  }));

  // For ai-spend-items: use injected spend items
  const resolvedSpendItems = aiState.spendItems;

  // ── PROFILE PHASE ──────────────────────────────────────────────────────────

  return (
    <div className="landing-page min-h-screen overflow-hidden">
      <div className="flex min-h-screen flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-3 pt-5">
          <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
            Skip <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-2 px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-base font-semibold text-primary">Your Profile</span>
              <span className="text-xs text-muted-foreground">
                {profileIndex + 1} of {profileQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>

        {/* Question area */}
        <div className="flex flex-1 flex-col overflow-hidden px-4 py-4">
          <AnimatePresence mode="wait" custom={slideDir}>
            <motion.div
              key={currentQuestion.id}
              custom={slideDir}
              initial={{ opacity: 0, x: slideDir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDir * -80 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mx-auto flex w-full max-w-3xl flex-1 flex-col"
            >
              {/* Question title */}
              <div className="mb-6 text-center">
                <p className="surface-eyebrow-coral mb-3">Profile read</p>
                <h2
                  className="mb-1 text-2xl font-bold text-primary"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {currentQuestion.title}
                </h2>
                <p className="text-sm text-muted-foreground">{currentQuestion.subtitle}</p>
              </div>

              {/* ── single-select ─────────────────────────────────────────── */}
              {currentQuestion.type === "single-select" && currentQuestion.options && (
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-3 overflow-y-auto pb-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedForQuestion.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSingle(currentQuestion.id, option.id)}
                        className={`flex items-start gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 ${
                          isSelected ? "shadow-md" : "hover:shadow-sm"
                        }`}
                        style={{
                          background: isSelected
                            ? `linear-gradient(158deg, ${accent.bgStrong}, ${accent.bg})`
                            : "linear-gradient(158deg, rgba(232,198,174,0.2), rgba(107,109,98,0.08))",
                          border: isSelected ? `2px solid ${accent.solid}` : "2px solid transparent",
                        }}
                      >
                        <div
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                          style={{
                            borderColor: isSelected ? accent.solid : "rgba(107,109,98,0.4)",
                            background: isSelected ? accent.solid : "transparent",
                          }}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-2.5 w-2.5 rounded-full bg-white"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">{option.label}</p>
                          {option.description && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{option.description}</p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* ── multi-select ──────────────────────────────────────────── */}
              {currentQuestion.type === "multi-select" && currentQuestion.options && (
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-3 overflow-y-auto pb-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedForQuestion.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => toggleMulti(currentQuestion.id, option.id)}
                        className={`flex items-start gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 ${
                          isSelected ? "shadow-md" : "hover:shadow-sm"
                        }`}
                        style={{
                          background: isSelected
                            ? `linear-gradient(158deg, ${accent.bgStrong}, ${accent.bg})`
                            : "linear-gradient(158deg, rgba(232,198,174,0.2), rgba(107,109,98,0.08))",
                          border: isSelected ? `2px solid ${accent.solid}` : "2px solid transparent",
                        }}
                      >
                        <div
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-2 transition-all"
                          style={{
                            borderColor: isSelected ? accent.solid : "rgba(107,109,98,0.4)",
                            background: isSelected ? accent.solid : "transparent",
                          }}
                        >
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">{option.label}</p>
                          {option.description && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{option.description}</p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* ── rank-select ───────────────────────────────────────────── */}
              {currentQuestion.type === "rank-select" && (
                <RankSelect
                  question={currentQuestion}
                  answers={answers}
                  onToggle={toggleMulti}
                />
              )}

              {/* ── pill-select ───────────────────────────────────────────── */}
              {currentQuestion.type === "pill-select" && currentQuestion.options && (
                <div className="flex flex-1 flex-wrap content-start justify-center gap-3 overflow-y-auto pb-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedForQuestion.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => toggleMulti(currentQuestion.id, option.id)}
                        className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                          isSelected ? "scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"
                        }`}
                        style={{
                          background: isSelected
                            ? accent.solid
                            : "linear-gradient(158deg, rgba(232,198,174,0.38), rgba(107,109,98,0.15))",
                          color: isSelected ? "#fff" : "hsl(196 40% 31%)",
                          border: isSelected ? `2px solid ${accent.solid}` : "1px solid rgba(107,109,98,0.4)",
                        }}
                      >
                        {option.emoji && <span className="text-base">{option.emoji}</span>}
                        {option.label}
                        {isSelected && <Check className="h-4 w-4" />}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* ── spend-select (fixed baseline) ─────────────────────────── */}
              {currentQuestion.type === "spend-select" && currentQuestion.spendItems && (
                <div className="mx-auto w-full max-w-lg flex-1 overflow-y-auto pb-4">
                  {currentQuestion.spendItems.map((item) => (
                    <SpendSelectRow
                      key={item.id}
                      item={item}
                      selectedRangeId={getSpendItemAnswer("spend_baseline", item.id)}
                      onSelect={(itemId, rangeId) => setSpendItem("spend_baseline", itemId, rangeId)}
                    />
                  ))}
                </div>
              )}

              {/* ── ai-vibe ───────────────────────────────────────────────── */}
              {currentQuestion.type === "ai-vibe" && (
                <>
                  {aiState.loading && <AiLoadingCard label="Finding your vibe..." />}
                  {aiState.error && (
                    <p className="text-center text-sm text-destructive">{aiState.error}</p>
                  )}
                  {!aiState.loading && !aiState.error && resolvedVibeOptions && (
                    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-3 overflow-y-auto pb-4">
                      {resolvedVibeOptions.map((option, index) => {
                        const isSelected = selectedForQuestion.includes(option.id);
                        return (
                          <motion.button
                            key={option.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSingle(currentQuestion.id, option.id)}
                            className={`flex items-start gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 ${
                              isSelected ? "shadow-md" : "hover:shadow-sm"
                            }`}
                            style={{
                              background: isSelected
                                ? `linear-gradient(158deg, ${accent.bgStrong}, ${accent.bg})`
                                : "linear-gradient(158deg, rgba(232,198,174,0.2), rgba(107,109,98,0.08))",
                              border: isSelected ? `2px solid ${accent.solid}` : "2px solid transparent",
                            }}
                          >
                            <div
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                              style={{
                                borderColor: isSelected ? accent.solid : "rgba(107,109,98,0.4)",
                                background: isSelected ? accent.solid : "transparent",
                              }}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="h-2.5 w-2.5 rounded-full bg-white"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-primary">{option.label}</p>
                              {"description" in option && option.description && (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {(option as { description: string }).description}
                                </p>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* ── ai-spend-items (generated) ────────────────────────────── */}
              {currentQuestion.type === "ai-spend-items" && (
                <>
                  {aiState.loading && <AiLoadingCard label="Picking items for your priorities..." />}
                  {aiState.error && (
                    <p className="text-center text-sm text-destructive">{aiState.error}</p>
                  )}
                  {!aiState.loading && !aiState.error && resolvedSpendItems && (
                    <div className="mx-auto w-full max-w-lg flex-1 overflow-y-auto pb-4">
                      {resolvedSpendItems.map((item) => (
                        <SpendSelectRow
                          key={item.id}
                          item={item}
                          selectedRangeId={getSpendItemAnswer("spend_generated", item.id)}
                          onSelect={(itemId, rangeId) => setSpendItem("spend_generated", itemId, rangeId)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── ai-brand-grid ─────────────────────────────────────────── */}
              {currentQuestion.type === "ai-brand-grid" && (
                <>
                  {aiState.loading && <AiLoadingCard label="Curating brands for you..." />}
                  {aiState.error && (
                    <p className="text-center text-sm text-destructive">{aiState.error}</p>
                  )}
                  {!aiState.loading && !aiState.error && resolvedBrandOptions && (
                    <div className="flex flex-1 flex-wrap content-start justify-center gap-2.5 overflow-y-auto pb-4">
                      {resolvedBrandOptions.map((option, index) => {
                        const isSelected = selectedForQuestion.includes(option.id);
                        const maxBrands = 5;
                        const atMax = !isSelected && selectedForQuestion.length >= maxBrands;
                        return (
                          <motion.button
                            key={option.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.025 }}
                            onClick={() => {
                              if (atMax) return;
                              toggleMulti(currentQuestion.id, option.id);
                            }}
                            disabled={atMax}
                            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                              isSelected ? "scale-105 shadow-lg" : atMax ? "opacity-40 cursor-not-allowed" : "hover:scale-105 hover:shadow-md"
                            }`}
                            style={{
                              background: isSelected
                                ? accent.solid
                                : "linear-gradient(158deg, rgba(232,198,174,0.38), rgba(107,109,98,0.15))",
                              color: isSelected ? "#fff" : "hsl(196 40% 31%)",
                              border: isSelected ? `2px solid ${accent.solid}` : "1px solid rgba(107,109,98,0.35)",
                            }}
                          >
                            {option.label}
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                          </motion.button>
                        );
                      })}
                      <p className="w-full text-center text-xs text-muted-foreground pt-1">
                        {selectedForQuestion.length}/5 selected
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* ── free-input / date-input ───────────────────────────────── */}
              {(currentQuestion.type === "free-input" || currentQuestion.type === "date-input") && (
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-start pt-4">
                  <div className="card-design-neumorph p-6" style={{ borderRadius: "1.2rem" }}>
                    <Input
                      type={currentQuestion.type === "date-input" ? "date" : "text"}
                      value={currentFreeText}
                      onChange={(e) => setFreeText(currentQuestion.id, e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="h-12 rounded-xl border-0 bg-white/40 text-base placeholder:text-muted-foreground/60"
                      maxLength={500}
                    />
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      {currentQuestion.type === "date-input"
                        ? "Optional. Leave blank if you do not want to save a date."
                        : "Separate multiple items with commas"}
                    </p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="px-6 pb-6 pt-2">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={goBack}>
              <ChevronLeft className="mr-1 h-5 w-5" /> Back
            </Button>
            <Button
              size="lg"
              className="h-12 flex-1 rounded-full"
              onClick={goNext}
              disabled={aiState.loading}
            >
              {profileIndex === profileQuestions.length - 1 ? (
                <>
                  Build My Profile <Sparkles className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Next <ChevronRight className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
          {selectedForQuestion.length > 0 &&
            !["free-input", "date-input", "spend-select", "ai-spend-items"].includes(currentQuestion.type) && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {selectedForQuestion.length} selected
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
// Codebase classification: runtime onboarding flow — v3 architecture with AI-personalized screens.
