import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, ArrowLeft, SkipForward, Sparkles, X, Shuffle } from "lucide-react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { buildSprints, SECTIONS, THIS_OR_THAT, type QuizQuestion } from "@/data/knowMeQuestions";
import cityFallbackImage from "@/assets/templates/travel-city.jpg";
import natureFallbackImage from "@/assets/templates/travel-mountain.jpg";
const FREE_SPRINT_LIMIT = 2;
const FREE_THIS_OR_THAT_LIMIT = 8;

/* ── AI feedback messages — rotate per question ── */
const AI_FEEDBACK = [
  "Got it! This helps me understand your style better.",
  "Noted — your partner will thank you for this one.",
  "Great choice. Building your blueprint…",
  "Perfect. This is super helpful for recommendations.",
  "Love it. I'm starting to see the full picture.",
  "Interesting! That tells me a lot.",
  "Saved. You're making great progress!",
  "This is gold for gift suggestions down the road.",
  "Smart pick. Your profile is coming together nicely.",
  "Understood. On to the next one!",
];

const Questionnaires = () => {
  const { user, subscribed } = useAuth();
  const { profileAnswers, gender, loading: contextLoading, refetch } = usePersonalization();

  const sprints = useMemo(() => buildSprints(gender), [gender]);

  /* ── Compute per-sprint completion ── */
  const sprintProgress = useMemo(() => {
    return sprints.map((sprint) => {
      const answered = sprint.questions.filter((q) => profileAnswers?.[q.id]).length;
      return { total: sprint.questions.length, answered, complete: answered === sprint.questions.length };
    });
  }, [sprints, profileAnswers]);

  const totalAnswered = sprintProgress.reduce((s, p) => s + p.answered, 0);
  const totalQuestions = 100;

  /* ── Active sprint: first incomplete ── */
  const activeSprintIdx = sprintProgress.findIndex((p) => !p.complete);
  const currentSprintIdx = activeSprintIdx === -1 ? sprints.length - 1 : activeSprintIdx;

  /* ── State ── */
  const [view, setView] = useState<"dashboard" | "quiz" | "thisorthat">("dashboard");
  const [quizSprintIdx, setQuizSprintIdx] = useState(0);
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const selectionsRef = useRef(selections);
  // Keep ref in sync
  const updateSelections = useCallback((updater: (prev: Record<string, string[]>) => Record<string, string[]>) => {
    setSelections((prev) => {
      const next = updater(prev);
      selectionsRef.current = next;
      return next;
    });
  }, []);

  /* ── This or That state ── */
  const totQueue = useMemo(() => {
    const answered = profileAnswers ? Object.keys(profileAnswers).filter(k => k.startsWith("tot-")) : [];
    const unanswered = THIS_OR_THAT.filter(t => !answered.includes(t.id));
    return unanswered.length > 0 ? unanswered : [];
  }, [profileAnswers]);

  const [totIndex, setTotIndex] = useState(0);
  const [totSwipeDir, setTotSwipeDir] = useState<"left" | "right" | null>(null);
  const totCurrent = totQueue[totIndex] || null;
  const totAnsweredCount = THIS_OR_THAT.length - totQueue.length;

  const openThisOrThat = () => {
    if (!subscribed && totQueue.length === 0) return;
    setTotIndex(0);
    setTotSwipeDir(null);
    setView("thisorthat");
  };

  const pickThisOrThat = async (choice: "A" | "B") => {
    if (!totCurrent) return;
    const dir = choice === "A" ? "right" : "left";
    setTotSwipeDir(dir);
    const value = choice === "A" ? "Yes" : "No";
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (userId) {
        const updated = { ...(profileAnswers || {}), [totCurrent.id]: value };
        await supabase.from("user_preferences").update({ profile_answers: updated, updated_at: new Date().toISOString() }).eq("user_id", userId);
        await refetch();
      }
    } catch { /* silent */ }
    setTimeout(() => {
      setTotSwipeDir(null);
      if (totIndex + 1 >= totQueue.length) {
        toast.success("All done! Nice work.");
        setView("dashboard");
      } else {
        setTotIndex(i => i + 1);
      }
    }, 400);
  };

  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* ── Start a sprint quiz ── */
  const startSprint = (idx: number) => {
    if (!subscribed && idx >= FREE_SPRINT_LIMIT) {
      toast("More blueprint sprints unlock with Premium");
      return;
    }
    const sprint = sprints[idx];
    const firstUnanswered = sprint.questions.findIndex((q) => !profileAnswers?.[q.id]);
    setQuizSprintIdx(idx);
    setQuizQuestionIdx(firstUnanswered === -1 ? 0 : firstUnanswered);
    const empty: Record<string, string[]> = {};
    setSelections(empty);
    selectionsRef.current = empty;
    setAiFeedback(null);
    setView("quiz");
  };

  /* ── Save answers ── */
  const saveAndReturn = async () => {
    const currentSelections = selectionsRef.current;
    if (Object.keys(currentSelections).length === 0) {
      setView("dashboard");
      return;
    }
    setSaving(true);
    try {
      const userId = (await supabase.auth.getUser()).data.user!.id;
      const updated = { ...(profileAnswers || {}), ...currentSelections };
      const cleaned: Record<string, string | string[]> = {};
      for (const [k, v] of Object.entries(updated)) {
        cleaned[k] = Array.isArray(v) && v.length === 1 ? v[0] : v;
      }
      const { error } = await supabase
        .from("user_preferences")
        .update({ profile_answers: cleaned, updated_at: new Date().toISOString() })
        .eq("user_id", userId);
      if (error) throw error;
      toast.success(`${Object.keys(currentSelections).length} answers saved!`);
      await refetch();
    } catch {
      toast.error("Failed to save answers");
    }
    setSaving(false);
    setView("dashboard");
  };

  /* ── Quiz interaction ── */
  const currentSprint = sprints[quizSprintIdx];
  const currentQuestion: QuizQuestion | undefined = currentSprint?.questions[quizQuestionIdx];
  const currentSelected = currentQuestion ? (selections[currentQuestion.id] || (profileAnswers?.[currentQuestion.id] ? (Array.isArray(profileAnswers[currentQuestion.id]) ? profileAnswers[currentQuestion.id] as string[] : [profileAnswers[currentQuestion.id] as string]) : [])) : [];

  const toggleOption = (optId: string) => {
    if (!currentQuestion) return;
    const isSingle = !currentQuestion.multiSelect;
    updateSelections((prev) => {
      const current = prev[currentQuestion.id] || [];
      if (isSingle) return { ...prev, [currentQuestion.id]: [optId] };
      if (current.includes(optId)) return { ...prev, [currentQuestion.id]: current.filter((x) => x !== optId) };
      return { ...prev, [currentQuestion.id]: [...current, optId] };
    });

    if (!currentQuestion.multiSelect) {
      setAiFeedback(AI_FEEDBACK[quizQuestionIdx % AI_FEEDBACK.length]);
      setTimeout(() => {
        setAiFeedback(null);
        const latestSelections = selectionsRef.current;
        if (!currentSprint) return;
        let next = quizQuestionIdx + 1;
        while (next < currentSprint.questions.length) {
          const q = currentSprint.questions[next];
          if (!profileAnswers?.[q.id] && !latestSelections[q.id]) break;
          next++;
        }
        if (next >= currentSprint.questions.length) {
          saveAndReturn();
        } else {
          setQuizQuestionIdx(next);
        }
      }, 1200);
    }
  };

  const advanceQuestion = () => {
    if (!currentSprint) return;
    const latestSelections = selectionsRef.current;
    let next = quizQuestionIdx + 1;
    while (next < currentSprint.questions.length) {
      const q = currentSprint.questions[next];
      if (!profileAnswers?.[q.id] && !latestSelections[q.id]) break;
      next++;
    }
    if (next >= currentSprint.questions.length) {
      saveAndReturn();
    } else {
      setQuizQuestionIdx(next);
      setAiFeedback(null);
    }
  };

  const confirmMultiAndAdvance = () => {
    if (currentQuestion) {
      setAiFeedback(AI_FEEDBACK[quizQuestionIdx % AI_FEEDBACK.length]);
      setTimeout(() => {
        setAiFeedback(null);
        advanceQuestion();
      }, 800);
    }
  };

  const getSectionForQuestion = (q: QuizQuestion) => SECTIONS.find((s) => s.id === q.section);

  if (contextLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--swatch-teal)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const freeSprints = sprints.slice(0, FREE_SPRINT_LIMIT);
  const displayedSprints = subscribed ? sprints : freeSprints;
  const displayedSprintProgress = subscribed ? sprintProgress : sprintProgress.slice(0, FREE_SPRINT_LIMIT);
  const visibleThisOrThatCount = subscribed
    ? THIS_OR_THAT.length
    : Math.min(THIS_OR_THAT.length, FREE_THIS_OR_THAT_LIMIT);
  const visibleThisOrThatAnswered = subscribed
    ? totAnsweredCount
    : Math.min(totAnsweredCount, visibleThisOrThatCount);
  const hasKnowMePreviewLimit = !subscribed;


  /* ═══════════════════════════════════════════════════════
     QUIZ VIEW — Active question
     ═══════════════════════════════════════════════════════ */
  if (view === "quiz" && currentQuestion && currentSprint) {
    const sprintQuestionNum = quizQuestionIdx + 1;
    const sprintTotal = currentSprint.questions.length;
    const progress = (sprintQuestionNum / sprintTotal) * 100;
    const section = getSectionForQuestion(currentQuestion);
    const effectiveSelected = selections[currentQuestion.id] || currentSelected;

    return (
      <div className="h-full flex flex-col items-center justify-start px-3 py-3 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="w-full max-w-[520px] rounded-3xl overflow-hidden relative flex flex-col"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 8px 40px rgba(30,74,82,0.08), 0 2px 12px rgba(0,0,0,0.04)",
            maxHeight: "calc(100vh - 180px)",
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={saveAndReturn}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.08)" }}
              >
                <ArrowLeft className="w-4 h-4" style={{ color: "var(--swatch-viridian-odyssey)" }} />
              </button>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-[0.1em] block" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Go Two / Know Me
                </span>
              </div>
            </div>

            {/* Sprint title */}
            <h2 className="text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
              Sprint {quizSprintIdx + 1} of 10: {currentSprint.name}
            </h2>

            {/* Segmented progress */}
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: sprintTotal }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[5px] rounded-full transition-all duration-300"
                  style={{
                    background: i < sprintQuestionNum
                      ? "var(--swatch-teal)"
                      : "rgba(var(--swatch-antique-coin-rgb), 0.12)",
                  }}
                />
              ))}
            </div>
            <p className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              Question {sprintQuestionNum} of {sprintTotal}
            </p>
          </div>

          {/* Question */}
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
                {/* Section badge */}
                {section && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] mb-3 px-2.5 py-1 rounded-full self-start"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(var(--swatch-teal-rgb), 0.08)" }}>
                    {section.icon} {section.label}
                  </span>
                )}

                <h3 className="text-[22px] leading-[1.2] mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                  {currentQuestion.title}
                </h3>
                <p className="text-[12px] mb-5" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                  {currentQuestion.subtitle}
                </p>

                {/* Options grid */}
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
                        onClick={() => toggleOption(opt.id)}
                        className="relative rounded-2xl px-4 py-3.5 text-left transition-all duration-200"
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

          {/* Bottom bar */}
          <div className="px-5 pb-5 pt-3 flex items-center justify-between">
            {/* AI feedback bubble */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}>
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

            {/* Action buttons */}
            {currentQuestion.multiSelect ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={effectiveSelected.length > 0 ? confirmMultiAndAdvance : advanceQuestion}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  background: effectiveSelected.length > 0 ? "var(--swatch-teal)" : "rgba(var(--swatch-antique-coin-rgb), 0.1)",
                  color: effectiveSelected.length > 0 ? "#fff" : "var(--swatch-antique-coin)",
                  boxShadow: effectiveSelected.length > 0 ? "0 4px 16px rgba(45,104,112,0.2)" : "none",
                }}
              >
                {effectiveSelected.length > 0 ? (
                  <>Continue <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>
                    <SkipForward className="w-3.5 h-3.5" /> Skip
                  </>
                )}
              </motion.button>
            ) : (
              <button
                onClick={advanceQuestion}
                className="flex items-center gap-1.5 text-[12px] py-2 px-3 rounded-full transition-colors hover:bg-black/5"
                style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
              >
                <SkipForward className="w-3.5 h-3.5" /> Skip
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     THIS OR THAT — Tinder-style swipe view
     ═══════════════════════════════════════════════════════ */
  if (view === "thisorthat") {
    const remaining = totQueue.length - totIndex;
    const progress = totQueue.length > 0 ? ((totQueue.length - remaining) / totQueue.length) * 100 : 100;
    const fallbackImage = totIndex % 2 === 0 ? cityFallbackImage : natureFallbackImage;
    const cardImage = totCurrent?.image || fallbackImage;

    return (
      <div
        className="h-full min-h-0 flex flex-col overflow-hidden px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(180deg, rgba(var(--swatch-teal-rgb), 0.06) 0%, rgba(var(--swatch-antique-coin-rgb), 0.08) 100%)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => setView("dashboard")}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.12)" }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "var(--swatch-viridian-odyssey)" }} />
          </button>
          <span className="text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
            {Math.max(remaining, 0)} remaining
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-[4px] rounded-full overflow-hidden" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.15)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--swatch-teal)" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* Card area */}
        <div className="flex-1 min-h-0 flex items-center justify-center py-2">
          {totCurrent ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={totCurrent.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: totSwipeDir ? 0 : 1,
                  x: totSwipeDir === "left" ? -260 : totSwipeDir === "right" ? 260 : 0,
                  rotate: totSwipeDir === "left" ? -8 : totSwipeDir === "right" ? 8 : 0,
                  scale: totSwipeDir ? 0.92 : 1,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="w-full max-w-[320px] rounded-3xl overflow-hidden relative"
                style={{
                  height: "clamp(320px, 52vh, 420px)",
                  boxShadow: "0 12px 40px rgba(30,74,82,0.18)",
                  background: "var(--swatch-viridian-odyssey)",
                }}
              >
                <img
                  src={cardImage}
                  alt={totCurrent.prompt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 45%, transparent 72%)" }} />

                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 500,
                      color: "#fff",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {totCurrent.category}
                  </span>
                </div>

                {totSwipeDir === "right" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-5 right-5 px-3 py-1.5 rounded-lg border-2"
                    style={{ borderColor: "var(--swatch-teal)", color: "var(--swatch-teal)", background: "rgba(0,0,0,0.35)" }}
                  >
                    <span className="text-[15px] font-bold" style={{ fontFamily: "'Jost', sans-serif" }}>YES</span>
                  </motion.div>
                )}
                {totSwipeDir === "left" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-5 left-5 px-3 py-1.5 rounded-lg border-2"
                    style={{ borderColor: "var(--swatch-antique-coin)", color: "var(--swatch-antique-coin)", background: "rgba(0,0,0,0.35)" }}
                  >
                    <span className="text-[15px] font-bold" style={{ fontFamily: "'Jost', sans-serif" }}>NO</span>
                  </motion.div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="text-[22px] leading-[1.15] text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}>
                    {totCurrent.prompt}
                  </h2>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center">
              <Check className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--swatch-teal)" }} />
              <p className="text-[20px]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                All done!
              </p>
            </div>
          )}
        </div>

        {/* Yes / No buttons */}
        {totCurrent && (
          <div className="flex items-center justify-center gap-8 pt-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => pickThisOrThat("B")}
              className="w-[64px] h-[64px] rounded-full flex flex-col items-center justify-center gap-0.5"
              style={{
                background: "rgba(var(--swatch-antique-coin-rgb), 0.15)",
                border: "2px solid rgba(var(--swatch-antique-coin-rgb), 0.6)",
              }}
            >
              <X className="w-7 h-7" style={{ color: "var(--swatch-antique-coin)" }} />
              <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>No</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => pickThisOrThat("A")}
              className="w-[64px] h-[64px] rounded-full flex flex-col items-center justify-center gap-0.5"
              style={{
                background: "rgba(var(--swatch-teal-rgb), 0.14)",
                border: "2px solid var(--swatch-teal)",
              }}
            >
              <Check className="w-7 h-7" style={{ color: "var(--swatch-teal)" }} />
              <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>Yes</span>
            </motion.button>
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     DASHBOARD VIEW — Sprint overview
     ═══════════════════════════════════════════════════════ */
  const allDone = sprintProgress.every((p) => p.complete);

  return (
    <div className="h-full flex flex-col overflow-y-auto px-4 pt-4 pb-8">
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-[minmax(160px,auto)]">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="lg:col-span-8 rounded-[34px] p-6 md:p-7 relative overflow-hidden min-h-[320px]"
            style={{
              background: "linear-gradient(135deg, rgba(var(--swatch-teal-rgb), 0.90) 0%, rgba(var(--swatch-teal-rgb), 0.74) 44%, rgba(var(--swatch-antique-coin-rgb), 0.84) 100%)",
              boxShadow: "0 24px 60px rgba(30,74,82,0.22)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 85% 18%, rgba(255,255,255,0.14), transparent 26%), radial-gradient(circle at 100% 100%, rgba(var(--swatch-cedar-grove-rgb), 0.18), transparent 28%)",
              }}
            />
            <div className="relative h-full flex flex-col justify-between gap-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] mb-3 text-primary-foreground/70" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Go Two / Know Me
                  </p>
                  <h1 className="text-[42px] md:text-[56px] leading-[0.92] max-w-[8ch] text-primary-foreground" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                    Your Blueprint
                  </h1>
                </div>

                <div className="rounded-[26px] px-5 py-4 min-w-[150px] backdrop-blur-md" style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                }}>
                  <p className="text-[42px] leading-none text-primary-foreground" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                    {Math.round(
                      subscribed
                        ? (totalAnswered / totalQuestions) * 100
                        : (displayedSprintProgress.reduce((sum, sprint) => sum + sprint.answered, 0) /
                            Math.max(1, freeSprints.reduce((sum, sprint) => sum + sprint.questions.length, 0))) * 100,
                    )}%
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/70" style={{ fontFamily: "'Jost', sans-serif" }}>
                    profile complete
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-[minmax(0,1fr)_220px] gap-4 items-end">
                <div>
                  <p className="text-[14px] leading-relaxed max-w-[60ch] text-primary-foreground/82 mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {subscribed
                      ? allDone
                        ? "All 100 questions answered — your profile now reads like a finished editorial portrait."
                        : `${totalAnswered} of ${totalQuestions} questions answered across your style, habits, rituals, and taste.`
                      : `Free access includes the first ${FREE_SPRINT_LIMIT} blueprint sprints and ${FREE_THIS_OR_THAT_LIMIT} This or That prompts — visible, usable, and never hard-blocked.`}
                  </p>

                  <div className="h-2 rounded-full overflow-hidden bg-primary-foreground/15">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(var(--swatch-cedar-grove-rgb), 0.72))" }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${subscribed
                          ? (totalAnswered / totalQuestions) * 100
                          : (displayedSprintProgress.reduce((sum, sprint) => sum + sprint.answered, 0) /
                              Math.max(1, freeSprints.reduce((sum, sprint) => sum + sprint.questions.length, 0))) * 100}%`,
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </div>
                </div>

                {!subscribed && (
                  <div className="rounded-[28px] p-4 backdrop-blur-md" style={{
                    background: "rgba(var(--swatch-gypsum-rose-rgb), 0.18)",
                    border: "1px solid rgba(255,255,255,0.16)",
                  }}>
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-1 text-primary-foreground/70" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Partial access
                    </p>
                    <p className="text-[12px] leading-relaxed text-primary-foreground/82" style={{ fontFamily: "'Jost', sans-serif" }}>
                      Preview mode stays elegant — content shows up without a full-page wall.
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
            className="lg:col-span-4 rounded-[34px] p-5 md:p-6 relative overflow-hidden text-left min-h-[320px] flex flex-col justify-between"
            style={{
              background: "linear-gradient(160deg, rgba(var(--swatch-cedar-grove-rgb), 0.78) 0%, rgba(var(--swatch-cedar-grove-rgb), 0.56) 50%, rgba(var(--swatch-teal-rgb), 0.64) 100%)",
              boxShadow: "0 22px 54px rgba(212,84,58,0.18)",
            }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.16), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%)" }} />
            <div className="relative flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-primary-foreground/10 text-primary-foreground/80">
                <Shuffle className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif" }}>This or That</span>
              </div>
              <span className="text-[12px] text-primary-foreground/76" style={{ fontFamily: "'Jost', sans-serif" }}>
                {visibleThisOrThatAnswered}/{visibleThisOrThatCount}
              </span>
            </div>

            <div className="relative">
              <p className="text-[30px] md:text-[36px] leading-[0.95] text-primary-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
                {visibleThisOrThatAnswered < visibleThisOrThatCount ? "Quick instinct picks" : "Finished with taste"}
              </p>
              <p className="text-[13px] leading-relaxed text-primary-foreground/82 max-w-[28ch]" style={{ fontFamily: "'Jost', sans-serif" }}>
                {subscribed
                  ? "Fast swipes that sharpen the emotional tone of your profile."
                  : `Your free preview includes ${visibleThisOrThatCount} prompts, so the page still feels alive.`}
              </p>
            </div>

            <div className="relative flex items-end justify-between gap-4">
              <div className="w-16 h-16 rounded-[22px] backdrop-blur-md flex items-center justify-center" style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}>
                <ChevronRight className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60" style={{ fontFamily: "'Jost', sans-serif" }}>
                  swipe deck
                </p>
              </div>
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 24 }}
            className="lg:col-span-5 card-design-overlay-teal rounded-[30px] p-5 relative overflow-hidden min-h-[220px]"
            style={{
              borderRadius: 30,
              boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
            }}
          >
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
            <p className="text-[10px] uppercase tracking-[0.16em] mb-3" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
              Profile reading
            </p>
            <p className="text-[32px] leading-[0.96] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
              Answer depth creates better recommendations.
            </p>
            <p className="text-[13px] leading-relaxed max-w-[32ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
              This page should feel collected and premium, not like stacked default cards. So the layout now breathes and the hierarchy actually reads.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, type: "spring", stiffness: 250, damping: 24 }}
            className="lg:col-span-7 card-design-overlay-teal rounded-[30px] p-5 md:p-6"
            style={{
              borderRadius: 30,
              boxShadow: "0 18px 50px rgba(30,74,82,0.06), inset 0 1px 0 rgba(255,255,255,0.48)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Open sprints
                </p>
                <h2 className="text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                  Editorial sprint lineup
                </h2>
              </div>
              {!subscribed && (
                <p className="text-[12px] max-w-[28ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Only the first sprints are open, but the page stays fully composed.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedSprints.map((sprint, idx) => {
                const prog = displayedSprintProgress[idx];
                const isComplete = prog.complete;
                const hasProgress = prog.answered > 0 && !isComplete;
                const isTall = idx % 3 === 0;
                const overlayTheme = idx % 4;
                const overlayClass = overlayTheme === 0 || overlayTheme === 2
                  ? "card-design-overlay-teal"
                  : overlayTheme === 1
                    ? "card-design-overlay-white"
                    : "card-design-overlay-coral";
                const orbColor = overlayTheme === 0 || overlayTheme === 2
                  ? "rgba(var(--swatch-teal-rgb), 0.12)"
                  : overlayTheme === 3
                    ? "rgba(var(--swatch-cedar-grove-rgb), 0.10)"
                    : "rgba(255,255,255,0.34)";
                const badgeBackground = isComplete
                  ? "rgba(var(--swatch-teal-rgb), 0.84)"
                  : overlayTheme === 3
                    ? "rgba(var(--swatch-cedar-grove-rgb), 0.12)"
                    : overlayTheme === 0 || overlayTheme === 2
                      ? "rgba(var(--swatch-teal-rgb), 0.14)"
                      : "rgba(255,255,255,0.58)";
                const badgeColor = isComplete
                  ? "rgba(255,255,255,0.96)"
                  : overlayTheme === 3
                    ? "var(--swatch-cedar-grove)"
                    : overlayTheme === 0 || overlayTheme === 2
                      ? "var(--swatch-teal)"
                      : "var(--swatch-antique-coin)";
                const accentColor = overlayTheme === 3 ? "var(--swatch-cedar-grove)" : overlayTheme === 0 || overlayTheme === 2 ? "var(--swatch-teal)" : "var(--swatch-antique-coin)";

                return (
                  <motion.button
                    key={sprint.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 280, damping: 25 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => startSprint(idx)}
                    className={`relative overflow-hidden text-left ${overlayClass} rounded-[28px] p-5 transition-all ${isTall ? "md:row-span-2 min-h-[220px]" : "min-h-[168px]"}`}
                    style={{
                      borderRadius: 28,
                      boxShadow: hasProgress
                        ? "0 16px 36px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.46)"
                        : "0 12px 28px rgba(30,74,82,0.05), inset 0 1px 0 rgba(255,255,255,0.42)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="absolute right-0 top-0 w-24 h-24 rounded-full translate-x-7 -translate-y-7" style={{ background: orbColor }} />

                    <div className="relative h-full flex flex-col justify-between gap-6">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="w-12 h-12 rounded-[18px] flex items-center justify-center flex-shrink-0"
                          style={{
                            background: badgeBackground,
                            color: badgeColor,
                            boxShadow: isComplete ? "0 10px 22px rgba(45,104,112,0.16)" : "none",
                          }}
                        >
                          {isComplete ? <Check className="w-5 h-5" /> : <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600 }}>{sprint.id}</span>}
                        </div>

                        <span className="text-[11px] tabular-nums shrink-0" style={{ fontFamily: "'Jost', sans-serif", color: accentColor }}>
                          {prog.answered}/{prog.total}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-[26px] leading-[0.98] mb-2 max-w-[12ch]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                          {sprint.name}
                        </h3>
                        <p className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: accentColor }}>
                          Sprint {sprint.id}
                        </p>

                        <div className="h-[5px] rounded-full overflow-hidden mb-3" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.08)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(prog.answered / prog.total) * 100}%`,
                              background: isComplete
                                ? "linear-gradient(90deg, rgba(var(--swatch-teal-rgb), 0.84), rgba(var(--swatch-teal-rgb), 0.62))"
                                : overlayTheme === 3
                                  ? "linear-gradient(90deg, rgba(var(--swatch-cedar-grove-rgb), 0.44), rgba(var(--swatch-cedar-grove-rgb), 0.66))"
                                  : overlayTheme === 0 || overlayTheme === 2
                                    ? "linear-gradient(90deg, rgba(var(--swatch-teal-rgb), 0.58), rgba(var(--swatch-teal-rgb), 0.82))"
                                    : "linear-gradient(90deg, rgba(var(--swatch-antique-coin-rgb), 0.28), rgba(var(--swatch-antique-coin-rgb), 0.44))",
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                          {isComplete ? "Completed" : hasProgress ? "Continue" : "Start now"}
                        </span>
                        {!isComplete && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />}
                      </div>
                    </div>

                    {hasProgress && (
                      <motion.div
                        layoutId="active-sprint"
                        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full"
                        style={{ background: accentColor }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {!subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, type: "spring", stiffness: 250, damping: 24 }}
              className="lg:col-span-12 card-design-overlay-teal rounded-[28px] px-5 py-4"
              style={{
                borderRadius: 28,
                boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.46)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] mb-1" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    More available with Premium
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    The remaining {sprints.length - displayedSprints.length} blueprint sprints stay hidden, but the dashboard now stays clean, open, and visually rich.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaires;
