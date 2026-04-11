import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, ChevronLeft, ChevronRight, ClipboardList, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useKnowledgeCenter } from "@/contexts/knowledge-center-context";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import { profileQuestions } from "@/data/profileQuestions";
import { getCategoryImage, getStyleImage } from "@/lib/imageResolver";
import { getYourVibeDerivation } from "@/lib/knowledgeCenter";

type Phase = "intro" | "profile" | "personalizing" | "complete";

const INTRO_IMAGES = [
  { id: "shopping", label: "Shopping" },
  { id: "style", label: "Style" },
  { id: "food", label: "Food" },
  { id: "gifts", label: "Gifting" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "fit", label: "Fit" },
  { id: "style", label: "Taste" },
];

const getProfileAccent = () => ({
  solid: "hsl(196 40% 31%)",
  ring: "hsl(196 40% 31%)",
  bg: "rgba(45, 104, 112, 0.16)",
  bgStrong: "rgba(45, 104, 112, 0.34)",
});

const normalizeOptionalDate = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const writeLegacyOnboardingProfile = async (
  userId: string,
  profileAnswerData: Record<string, string | string[]>,
) => {
  const { data: existingPreference } = await supabase
    .from("user_preferences")
    .select("profile_answers")
    .eq("user_id", userId)
    .maybeSingle();

  const existingAnswers =
    existingPreference?.profile_answers && typeof existingPreference.profile_answers === "object"
      ? (existingPreference.profile_answers as Record<string, string | string[]>)
      : {};

  const { error } = await supabase.from("user_preferences").upsert(
    {
      user_id: userId,
      profile_answers: {
        ...existingAnswers,
        ...profileAnswerData,
      },
      onboarding_complete: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) throw error;
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const { user } = useAuth();
  const { knowledgeDerivations, refreshKnowledge } = useKnowledgeCenter();
  const { toast } = useToast();

  const [phase, setPhase] = useState<Phase>(isEditMode ? "profile" : "intro");
  const [profileIndex, setProfileIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [introCenter, setIntroCenter] = useState(3);
  const accent = getProfileAccent();

  useEffect(() => {
    if (phase !== "intro") return;
    const interval = setInterval(() => {
      setIntroCenter((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "intro") return;
    window.history.pushState({ phase }, "");

    const handlePopState = () => {
      if (phase === "profile") {
        if (profileIndex > 0) {
          setSlideDir(-1);
          setProfileIndex((index) => index - 1);
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

  const currentQuestion = profileQuestions[profileIndex];
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
    return "You now have a saved profile read, and everything that gets more personal from here can build from it instead of living in disconnected onboarding data.";
  }, [knowledgeDerivations]);

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
    if (!error) return;

    await writeLegacyOnboardingProfile(user.id, profileAnswerData);
  };

  const markOnboardingComplete = async (profileAnswerData: Record<string, string | string[]>) => {
    if (!user) return;

    const identityAnswer = profileAnswerData.identity;
    const rawIdentity = Array.isArray(identityAnswer) ? identityAnswer[0] : identityAnswer;
    const birthday = normalizeOptionalDate(profileAnswerData.birthday);
    const anniversary = normalizeOptionalDate(profileAnswerData.anniversary);

    const primaryResult = await supabase
      .from("profiles")
      .update({
        gender: typeof rawIdentity === "string" && rawIdentity !== "prefer-not" ? rawIdentity : null,
        birthday,
        anniversary,
        onboarding_completed_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (!primaryResult.error) return;

    const profileFallback = await supabase
      .from("profiles")
      .update({
        gender: typeof rawIdentity === "string" && rawIdentity !== "prefer-not" ? rawIdentity : null,
        birthday,
        anniversary,
      })
      .eq("user_id", user.id);

    if (profileFallback.error) {
      throw profileFallback.error;
    }

    await writeLegacyOnboardingProfile(user.id, profileAnswerData);
  };

  const handleSkip = async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }

    try {
      const markCompleteResult = await supabase
        .from("profiles")
        .update({ updated_at: new Date().toISOString() } as any)
        .eq("user_id", user.id);

      if (markCompleteResult.error) {
        const legacyFallback = await supabase.from("user_preferences").upsert(
          {
            user_id: user.id,
            onboarding_complete: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );

        if (legacyFallback.error) {
          throw legacyFallback.error;
        }
      }
    } catch (error) {
      console.error("Onboarding skip save failed:", error);
    }

    navigate("/dashboard");
  };

  const runKnowledgeRefresh = async () => {
    setPhase("personalizing");

    const profileAnswerData: Record<string, string | string[]> = {};
    for (const question of profileQuestions) {
      if (answers[question.id] !== undefined) {
        profileAnswerData[question.id] = answers[question.id];
      }
    }

    try {
      if (user) {
        await markOnboardingComplete(profileAnswerData);
        await persistOnboardingResponses(profileAnswerData);
      }

      const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 30000));
      const knowledgeRefreshPromise = (async () => {
        try {
          const { data, error } = await supabase.functions.invoke("knowledge-center-refresh", {
            body: {
              onboardingResponses: profileAnswerData,
            },
          });

          if (error) {
            console.error("Knowledge center refresh error:", error);
            toast({
              title: "Profile saved",
              description: "Your onboarding is safely stored. Knowledge Center derivations will catch up shortly.",
            });
          } else {
            await refreshKnowledge();
            toast({
              title: "Knowledge Center refreshed",
              description:
                data?.knowledgeDerivation?.persona_summary ||
                "Your first Knowledge Center read is ready.",
            });
          }
        } catch (error) {
          console.error("Knowledge center refresh failed:", error);
          toast({
            title: "Profile saved",
            description: "Your answers are safely stored. Knowledge Center derivations can catch up in the background.",
          });
        }
      })();

      await Promise.race([knowledgeRefreshPromise, timeoutPromise]);
      await refreshKnowledge();
      setPhase("complete");
    } catch (error: unknown) {
      console.error("Onboarding save error:", error);
      toast({ title: "Error", description: getErrorMessage(error), variant: "destructive" });
      setPhase("profile");
    }
  };

  const setSingle = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }));
  };

  const toggleMulti = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      return current.includes(optionId)
        ? { ...prev, [questionId]: current.filter((value) => value !== optionId) }
        : { ...prev, [questionId]: [...current, optionId] };
    });
  };

  const setFreeText = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const goNext = () => {
    if (profileIndex < profileQuestions.length - 1) {
      setSlideDir(1);
      setProfileIndex((index) => index + 1);
      return;
    }

    runKnowledgeRefresh();
  };

  const goBack = () => {
    if (profileIndex > 0) {
      setSlideDir(-1);
      setProfileIndex((index) => index - 1);
      return;
    }

    if (!isEditMode) {
      setPhase("intro");
    } else {
      navigate("/dashboard");
    }
  };

  if (phase === "intro") {
    return (
      <div className="landing-page min-h-screen overflow-x-hidden">
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex items-center justify-between px-4 pb-2 pt-6 sm:px-6 md:px-8">
            <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
              Skip
            </Button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 sm:px-6">
            <div className="relative mb-8 flex h-[360px] w-full max-w-4xl items-center justify-center sm:h-[420px] md:h-[460px]">
              {INTRO_IMAGES.map((image, index) => {
                const offset = index - introCenter;
                const wrapped =
                  offset > 3
                    ? offset - INTRO_IMAGES.length
                    : offset < -3
                      ? offset + INTRO_IMAGES.length
                      : offset;
                const abs = Math.abs(wrapped);
                if (abs > 3) return null;
                const isCenter = wrapped === 0;

                return (
                  <motion.div
                    key={`${image.id}-${index}`}
                    animate={{
                      x: wrapped * 180,
                      scale: isCenter ? 1 : 0.77 - abs * 0.06,
                      zIndex: 10 - abs,
                      opacity: isCenter ? 1 : Math.max(0.28, 0.72 - abs * 0.16),
                      rotateY: wrapped * -8,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute"
                    style={{ perspective: "1200px" }}
                  >
                    <div
                      className={`relative overflow-hidden ${isCenter ? "h-[300px] w-[220px] shadow-2xl sm:h-[360px] sm:w-[270px] md:h-[410px] md:w-[305px]" : "h-[240px] w-[176px] sm:h-[300px] sm:w-[216px] md:h-[340px] md:w-[245px]"}`}
                      style={{ borderRadius: "1.4rem" }}
                    >
                      <img
                        src={getCategoryImage(image.id)}
                        alt={image.label}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="card-title">{image.label}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-[760px] text-center"
            >
              <p className="surface-eyebrow-coral text-center">Go Two / Onboarding</p>
              <h1
                className="mt-4 text-[34px] leading-[0.96] sm:text-[38px] md:text-[56px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: "var(--swatch-teal)",
                }}
              >
                Built around you,
                <br />
                not a template.
              </h1>
              <p
                className="mx-auto mt-5 max-w-[720px] text-[19px] leading-[1.24] sm:text-[23px] md:text-[28px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "var(--swatch-teal)",
                }}
              >
                We prioritize your personal signals taste, spending, and lifestyle to create a foundation that grows with you. Start with a profile that actually knows you.
              </p>

              <button
                onClick={() => setPhase("profile")}
                className="mt-8 rounded-full px-10 py-3.5"
                style={{
                  background: "var(--logo-go-color)",
                  color: "#ffffff",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  boxShadow: "0 8px 24px rgba(212, 84, 58, 0.28)",
                }}
              >
                Build My Profile <ArrowRight className="ml-2 inline h-4 w-4" />
              </button>

              <div className="mt-3">
                <Button variant="ghost" className="text-muted-foreground text-sm" onClick={handleSkip}>
                  Skip for now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              color: "var(--swatch-teal)",
            }}
          >
            Your answers are being written to the profile first.
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

  if (phase === "complete") {
    return (
      <div className="landing-page min-h-screen overflow-x-hidden px-4 py-8 sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1120px] flex-col justify-center">
          <div className="surface-card-warm-glow grid gap-5 rounded-[36px] p-6 md:p-8 xl:grid-cols-[minmax(0,1.35fr)_320px]">
            <div>
              <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
              <p className="surface-eyebrow-coral mt-8">Profile complete</p>
              <h1
                className="mt-4 text-[40px] leading-[0.94] md:text-[58px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: "var(--swatch-teal)",
                }}
              >
                You are set up the right way now.
              </h1>
              <p
                className="mt-5 max-w-[780px] text-[24px] leading-[1.2] md:text-[30px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "var(--swatch-teal)",
                }}
              >
                {completionSummary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center rounded-full px-6 py-3.5"
                  style={{
                    background: "var(--logo-go-color)",
                    color: "#fff",
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 600,
                    boxShadow: "0 8px 24px rgba(212, 84, 58, 0.28)",
                  }}
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/dashboard/know-me"
                  className="surface-button-soft-glow inline-flex items-center gap-2 rounded-full px-6 py-3.5"
                >
                  <ClipboardList className="h-4 w-4" style={{ color: "var(--logo-two-color)" }} />
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 600,
                      color: "var(--logo-two-color)",
                    }}
                  >
                    Keep Going in Know Me
                  </span>
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="card-inset-white rounded-[26px] px-5 py-5">
                <p className="surface-eyebrow-teal">Safety</p>
                <p
                  className="mt-3 text-[24px] leading-[1.02]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: "var(--swatch-teal)",
                  }}
                >
                  Your onboarding answers now belong to your profile.
                </p>
              </div>

              <div className="card-inset-white rounded-[26px] px-5 py-5">
                <p className="surface-eyebrow-teal">What changed</p>
                <p className="surface-body mt-3 text-[13px]">
                  Onboarding is now the first profile read. Deeper taste-building can happen later in Know Me without splitting your answers across old onboarding-only storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="landing-page min-h-screen overflow-hidden">
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 pb-3 pt-5">
          <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
            Skip <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="px-6 mb-2">
          <div className="mx-auto max-w-3xl">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold text-primary text-base">Your Profile</span>
              <span className="text-muted-foreground text-xs">
                {profileIndex + 1} of {profileQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>

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
              <div className="mb-6 text-center">
                <p className="surface-eyebrow-coral mb-3">Profile read</p>
                <h2
                  className="text-2xl font-bold text-primary mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {currentQuestion.title}
                </h2>
                <p className="text-sm text-muted-foreground">{currentQuestion.subtitle}</p>
              </div>

              {currentQuestion.type === "image-grid" && currentQuestion.options && (
                <div className="grid flex-1 content-start gap-4 overflow-y-auto pb-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedForQuestion.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() =>
                          currentQuestion.multiSelect === false
                            ? setSingle(currentQuestion.id, option.id)
                            : toggleMulti(currentQuestion.id, option.id)
                        }
                        className="group text-left"
                      >
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            isSelected ? "scale-[1.03] shadow-xl ring-2" : "hover:scale-[1.02] hover:shadow-lg"
                          }`}
                          style={{
                            borderRadius: "1.2rem",
                            ...(isSelected ? { borderColor: accent.solid, ringColor: accent.solid, outlineColor: accent.solid } : {}),
                            ...(isSelected ? { boxShadow: `0 0 0 2px ${accent.solid}` } : {}),
                          }}
                        >
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                              src={getStyleImage(option.id)}
                              alt={option.label}
                              className={`h-full w-full object-cover transition-transform duration-300 ${
                                isSelected ? "scale-105" : "group-hover:scale-105"
                              }`}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            {isSelected && <div className="absolute inset-0 bg-primary/20" />}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full shadow-md"
                                style={{ background: accent.solid }}
                              >
                                <Check className="h-4 w-4 text-white" />
                              </motion.div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
                              <p className="text-sm font-semibold leading-tight text-white drop-shadow">{option.label}</p>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "single-select" && currentQuestion.options && (
                <div className="mx-auto flex max-w-md flex-1 w-full flex-col gap-3 overflow-y-auto pb-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedForQuestion.includes(option.id);
                    const optionAccent = accent;

                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSingle(currentQuestion.id, option.id)}
                        className={`flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 ${
                          isSelected ? "shadow-md" : "hover:shadow-sm"
                        }`}
                        style={{
                          background: isSelected
                            ? `linear-gradient(158deg, ${optionAccent.bgStrong}, ${optionAccent.bg})`
                            : "linear-gradient(158deg, rgba(232,198,174,0.2), rgba(107,109,98,0.08))",
                          border: isSelected ? `2px solid ${optionAccent.solid}` : "2px solid transparent",
                        }}
                      >
                        <div
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                          style={{
                            borderColor: isSelected ? optionAccent.solid : "rgba(107,109,98,0.4)",
                            background: isSelected ? optionAccent.solid : "transparent",
                          }}
                        >
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-2.5 w-2.5 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-primary">{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

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

              {(currentQuestion.type === "free-input" || currentQuestion.type === "date-input") && (
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-start pt-4">
                  <div className="card-design-neumorph p-6" style={{ borderRadius: "1.2rem" }}>
                    <Input
                      type={currentQuestion.type === "date-input" ? "date" : "text"}
                      value={currentFreeText}
                      onChange={(event) => setFreeText(currentQuestion.id, event.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="rounded-xl border-0 bg-white/40 text-base h-12 placeholder:text-muted-foreground/60"
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

        <div className="px-6 pb-6 pt-2">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <Button variant="outline" size="lg" className="rounded-full px-6" onClick={goBack}>
              <ChevronLeft className="mr-1 h-5 w-5" /> Back
            </Button>
            <Button size="lg" className="rounded-full flex-1 h-12" onClick={goNext}>
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
          {selectedForQuestion.length > 0 && currentQuestion.type !== "free-input" && currentQuestion.type !== "date-input" && (
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
// Codebase classification: runtime onboarding flow.
