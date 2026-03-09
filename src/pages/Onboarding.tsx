import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import {
  onboardingCategories,
  onboardingQuestions,
  OnboardingQuestion,
} from "@/data/onboardingQuestions";
import { profileQuestions } from "@/data/profileQuestions";

type Phase = "intro" | "profile" | "category-picker" | "category-questions";

const INTRO_IMAGES = [
  { id: "1542291026-7eec264c27ff", label: "Fashion" },
  { id: "1414235077428-338989a2e8c0", label: "Dining" },
  { id: "1509042239860-f550ce710b93", label: "Coffee" },
  { id: "1502602898657-3e91760cbb34", label: "Travel" },
  { id: "1490427712608-588e68359dbd", label: "Luxury" },
  { id: "1568901346375-23c9450c58cd", label: "Food" },
  { id: "1515562141207-7a88fb7ce338", label: "Gifts" },
  { id: "1555041469-a586c61ea9bc", label: "Home" },
  { id: "1518611012118-696072aa579a", label: "Style" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  shopping: "1441986300917-64674bd600d8",
  style: "1558171813-4c2ab4ef9793",
  food: "1498579150354-977475b7ea0b",
  gifts: "1515562141207-7a88fb7ce338",
  lifestyle: "1502602898657-3e91760cbb34",
  fit: "1489987707025-afc232f7ea0f",
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [phase, setPhase] = useState<Phase>("intro");
  const [profileIndex, setProfileIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0); // for cover-flow
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [catQuestionIndex, setCatQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [introCenter, setIntroCenter] = useState(4);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);

  // Browser back button
  useEffect(() => {
    if (phase === "intro") return;
    window.history.pushState({ phase }, "");

    const handlePopState = () => {
      if (phase === "profile") {
        if (profileIndex > 0) {
          setSlideDir(-1);
          setProfileIndex((i) => i - 1);
        } else {
          setPhase("intro");
        }
      } else if (phase === "category-picker") {
        setPhase("profile");
        setProfileIndex(profileQuestions.length - 1);
      } else if (phase === "category-questions") {
        if (catQuestionIndex > 0) {
          setSlideDir(-1);
          setCatQuestionIndex((i) => i - 1);
        } else {
          setPhase("category-picker");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [phase, profileIndex, catQuestionIndex]);

  // Auto-rotate intro
  useEffect(() => {
    if (phase !== "intro") return;
    const interval = setInterval(() => {
      setIntroCenter((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [phase]);

  // Current category questions
  const categoryQuestions = selectedCategory
    ? onboardingQuestions.filter((q) => q.category === selectedCategory)
    : [];
  const currentCatQuestion = categoryQuestions[catQuestionIndex];

  // ── Answer helpers ──
  const toggleMulti = (qId: string, optId: string) => {
    setAnswers((prev) => {
      const current = (prev[qId] as string[]) || [];
      return current.includes(optId)
        ? { ...prev, [qId]: current.filter((id) => id !== optId) }
        : { ...prev, [qId]: [...current, optId] };
    });
  };

  const setSingle = (qId: string, optId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: [optId] }));
  };

  const setFreeText = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const getSelected = (qId: string): string[] => {
    const val = answers[qId];
    if (!val) return [];
    return Array.isArray(val) ? val : [];
  };

  const getFreeText = (qId: string): string => {
    const val = answers[qId];
    return typeof val === "string" ? val : "";
  };

  const handleComplete = async () => {
    if (!user) { navigate("/dashboard"); return; }
    try {
      // Save identity to profile
      const identityAnswer = answers["identity"];
      const gender = Array.isArray(identityAnswer) ? identityAnswer[0] : identityAnswer;
      if (gender && gender !== "prefer-not") {
        await supabase.from("profiles").update({ gender }).eq("user_id", user.id);
      }

      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        favorites: answers,
        onboarding_complete: true,
      });
      toast({ title: "You're all set! 🎉", description: "Your profile is personalized!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleSkip = async () => {
    if (!user) { navigate("/dashboard"); return; }
    try {
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        onboarding_complete: true,
      });
    } catch {}
    navigate("/dashboard");
  };

  // ══════════════════════════════════════════
  // RENDER: INTRO
  // ══════════════════════════════════════════
  if (phase === "intro") {
    return (
      <div className="landing-page min-h-screen flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-6 pb-2 relative z-10">
          <GoTwoText className="text-3xl" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">Skip</Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-3xl h-[320px] flex items-center justify-center mb-10">
            {INTRO_IMAGES.map((img, i) => {
              const offset = i - introCenter;
              const wrapped = offset > 4 ? offset - INTRO_IMAGES.length : offset < -4 ? offset + INTRO_IMAGES.length : offset;
              const abs = Math.abs(wrapped);
              if (abs > 3) return null;
              const isCenter = wrapped === 0;
              return (
                <motion.div
                  key={img.id}
                  animate={{
                    x: wrapped * 160,
                    scale: isCenter ? 1 : 0.75 - abs * 0.05,
                    zIndex: 10 - abs,
                    opacity: isCenter ? 1 : Math.max(0.3, 0.7 - abs * 0.15),
                    rotateY: wrapped * -8,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute"
                  style={{ perspective: "1200px" }}
                >
                  <div
                    className={`card-design-neumorph overflow-hidden ${isCenter ? "w-[220px] h-[280px] shadow-2xl" : "w-[180px] h-[230px]"}`}
                    style={{ borderRadius: "1.4rem" }}
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${img.id}?w=400&h=500&fit=crop&q=80`}
                      alt={img.label}
                      className="w-full h-[75%] object-cover"
                    />
                    <div className="p-3 text-center">
                      <p className="text-sm font-semibold text-primary">{img.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center px-6 max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let Our AI Get to Know You
            </h1>
            <p className="text-muted-foreground mb-1 text-base">
              We'll learn your brands, style, food, and gift preferences.
            </p>
            <p className="text-sm text-muted-foreground italic mb-8">
              Every question reduces friction & improves accuracy ✨
            </p>
            <Button className="rounded-full h-13 px-12 text-base shadow-lg" onClick={() => setPhase("profile")}>
              <Sparkles className="mr-2 h-5 w-5" />
              Let's Go!
            </Button>
            <div className="mt-4">
              <Button variant="ghost" className="text-muted-foreground text-sm" onClick={handleSkip}>
                Skip for now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  // RENDER: CATEGORY PICKER (cover flow)
  // ══════════════════════════════════════════
  if (phase === "category-picker") {
    const cats = onboardingCategories;
    const goLeftCat = () => setCategoryIndex((i) => (i - 1 + cats.length) % cats.length);
    const goRightCat = () => setCategoryIndex((i) => (i + 1) % cats.length);

    return (
      <div className="landing-page min-h-screen flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-6 pb-2 relative z-10">
          <GoTwoText className="text-3xl" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">Skip</Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose a Category
            </h1>
            <p className="text-muted-foreground text-base">
              Tap a category to answer questions about it
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCategories.length} of {cats.length} completed
            </p>
          </motion.div>

          {/* Cover flow */}
          <div className="relative w-full max-w-3xl h-[320px] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={goLeftCat}
              className="absolute left-4 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {cats.map((cat, i) => {
              let offset = i - categoryIndex;
              const half = cats.length / 2;
              if (offset > half) offset -= cats.length;
              if (offset < -half) offset += cats.length;
              const isActive = offset === 0;
              const abs = Math.abs(offset);
              if (abs > 2) return null;

              const isDone = completedCategories.includes(cat.id);
              const catQCount = onboardingQuestions.filter((q) => q.category === cat.id).length;

              return (
                <motion.div
                  key={cat.id}
                  animate={{
                    x: offset * 170,
                    scale: isActive ? 1 : 0.7 - abs * 0.05,
                    zIndex: 10 - abs,
                    opacity: isActive ? 1 : 0.5,
                    filter: `blur(${isActive ? 0 : 2}px)`,
                    rotateY: offset * -8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute cursor-pointer"
                  style={{ perspective: "1200px" }}
                  onClick={() => {
                    if (isActive) {
                      setSelectedCategory(cat.id);
                      setCatQuestionIndex(0);
                      setSlideDir(1);
                      setPhase("category-questions");
                    } else {
                      setCategoryIndex(i);
                    }
                  }}
                >
                  <div
                    className={`card-design-neumorph overflow-hidden transition-shadow duration-300 ${
                      isActive ? "ring-2 ring-primary shadow-2xl" : ""
                    }`}
                    style={{ width: 210, height: 270, borderRadius: "1.4rem" }}
                  >
                    <div className="h-[175px] overflow-hidden relative">
                      <img
                        src={`https://images.unsplash.com/photo-${CATEGORY_IMAGES[cat.id] || "1542291026-7eec264c27ff"}?w=400&h=300&fit=crop&q=80`}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                      {isDone && (
                        <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <Check className="w-6 h-6 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-lg mb-0.5">{cat.icon}</p>
                      <h3 className={`font-semibold text-sm ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isDone ? "✅ Done" : `${catQCount} questions`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <Button
              variant="ghost"
              size="icon"
              onClick={goRightCat}
              className="absolute right-4 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Done button */}
          {completedCategories.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
              <Button className="rounded-full h-12 px-10 text-base shadow-lg" onClick={handleComplete}>
                <Sparkles className="mr-2 h-5 w-5" />
                {completedCategories.length === cats.length ? "All Done!" : "Finish & Save"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  // SHARED QUESTION RENDERER
  // ══════════════════════════════════════════
  const isProfilePhase = phase === "profile";
  const currentQuestion: OnboardingQuestion | undefined = isProfilePhase
    ? profileQuestions[profileIndex]
    : currentCatQuestion;
  const questionList = isProfilePhase ? profileQuestions : categoryQuestions;
  const qIndex = isProfilePhase ? profileIndex : catQuestionIndex;
  const totalQ = questionList.length;
  const progress = totalQ > 0 ? ((qIndex + 1) / totalQ) * 100 : 0;
  const selected = currentQuestion ? getSelected(currentQuestion.id) : [];
  const currentCategory = isProfilePhase
    ? { icon: "🧠", name: "About You" }
    : onboardingCategories.find((c) => c.id === selectedCategory);

  const goNext = () => {
    if (qIndex < totalQ - 1) {
      setSlideDir(1);
      if (isProfilePhase) setProfileIndex((i) => i + 1);
      else setCatQuestionIndex((i) => i + 1);
    } else {
      if (isProfilePhase) {
        setPhase("category-picker");
      } else {
        // Mark category as completed
        if (selectedCategory && !completedCategories.includes(selectedCategory)) {
          setCompletedCategories((prev) => [...prev, selectedCategory]);
        }
        setPhase("category-picker");
      }
    }
  };

  const goBack = () => {
    if (qIndex > 0) {
      setSlideDir(-1);
      if (isProfilePhase) setProfileIndex((i) => i - 1);
      else setCatQuestionIndex((i) => i - 1);
    } else {
      if (isProfilePhase) {
        setPhase("intro");
      } else {
        setPhase("category-picker");
      }
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="landing-page min-h-screen flex flex-col">
      {/* Top */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <GoTwoText className="text-2xl" />
        <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
          Skip <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="px-6 mb-1">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="font-semibold text-primary text-base">
            {currentCategory?.icon} {currentCategory?.name}
          </span>
          <span className="text-muted-foreground text-xs">
            {qIndex + 1} of {totalQ}
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-4 py-4 overflow-hidden">
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={currentQuestion.id}
            custom={slideDir}
            initial={{ opacity: 0, x: slideDir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDir * -80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col max-w-3xl mx-auto w-full"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentQuestion.title}
              </h2>
              <p className="text-sm text-muted-foreground">{currentQuestion.subtitle}</p>
              <p className="text-xs text-muted-foreground italic mt-1">{currentQuestion.funnySubtext}</p>
            </div>

            {/* ── IMAGE GRID ── */}
            {currentQuestion.type === "image-grid" && currentQuestion.options && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1 content-start overflow-y-auto pb-4">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => toggleMulti(currentQuestion.id, opt.id)}
                      className="text-left group"
                    >
                      <div
                        className={`card-design-neumorph overflow-hidden transition-all duration-200 ${
                          isSelected ? "scale-[1.03] shadow-xl" : "hover:scale-[1.02] hover:shadow-lg"
                        }`}
                        style={{
                          borderRadius: "1.2rem",
                          borderColor: isSelected ? "hsl(196 40% 31%)" : undefined,
                          borderWidth: isSelected ? "2px" : undefined,
                        }}
                      >
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={`https://images.unsplash.com/photo-${opt.image}?w=350&h=260&fit=crop&q=80`}
                            alt={opt.label}
                            className={`w-full h-full object-cover transition-transform duration-300 ${
                              isSelected ? "scale-105" : "group-hover:scale-105"
                            }`}
                            loading="lazy"
                          />
                          {isSelected && <div className="absolute inset-0 bg-primary/20" />}
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                              style={{ background: "hsl(196 40% 31%)" }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <div className="px-3 py-2.5 text-center">
                          <p className="text-sm font-semibold text-primary leading-tight">{opt.label}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ── PILL SELECT ── */}
            {currentQuestion.type === "pill-select" && currentQuestion.options && (
              <div className="flex flex-wrap gap-3 justify-center flex-1 content-start overflow-y-auto pb-4">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => toggleMulti(currentQuestion.id, opt.id)}
                      className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                        isSelected ? "shadow-lg scale-105" : "hover:scale-105 hover:shadow-md"
                      }`}
                      style={{
                        background: isSelected
                          ? "hsl(196 40% 31%)"
                          : "linear-gradient(158deg, rgba(232,198,174,0.38), rgba(107,109,98,0.15))",
                        color: isSelected ? "hsl(42 25% 92%)" : "hsl(196 40% 31%)",
                        border: isSelected
                          ? "2px solid hsl(196 40% 31%)"
                          : "1px solid rgba(107,109,98,0.4)",
                      }}
                    >
                      {opt.emoji && <span className="text-base">{opt.emoji}</span>}
                      {opt.label}
                      {isSelected && <Check className="w-4 h-4" />}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ── SINGLE SELECT ── */}
            {currentQuestion.type === "single-select" && currentQuestion.options && (
              <div className="flex flex-col gap-3 max-w-md mx-auto w-full flex-1 content-start overflow-y-auto pb-4">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSingle(currentQuestion.id, opt.id)}
                      className={`card-design-neumorph px-6 py-4 text-left flex items-center gap-4 transition-all duration-200 ${
                        isSelected ? "scale-[1.02] shadow-xl" : "hover:scale-[1.01] hover:shadow-lg"
                      }`}
                      style={{
                        borderRadius: "1rem",
                        borderColor: isSelected ? "hsl(196 40% 31%)" : undefined,
                        borderWidth: isSelected ? "2px" : undefined,
                      }}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="text-sm font-semibold text-primary flex-1">{opt.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(196 40% 31%)" }}
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ── FREE INPUT ── */}
            {currentQuestion.type === "free-input" && (
              <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-start pt-4">
                <div className="card-design-neumorph p-6" style={{ borderRadius: "1.2rem" }}>
                  <Input
                    value={getFreeText(currentQuestion.id)}
                    onChange={(e) => setFreeText(currentQuestion.id, e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="rounded-xl border-0 bg-white/40 text-base h-12 placeholder:text-muted-foreground/60"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Separate multiple items with commas
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <Button variant="outline" size="lg" className="rounded-full px-6" onClick={goBack}>
            <ChevronLeft className="h-5 w-5 mr-1" /> Back
          </Button>
          <Button size="lg" className="rounded-full flex-1 h-12" onClick={goNext}>
            {qIndex === totalQ - 1 ? (
              isProfilePhase ? (
                <>Choose Categories <ChevronRight className="h-5 w-5 ml-1" /></>
              ) : (
                <><Check className="h-5 w-5 mr-2" /> Done</>
              )
            ) : (
              <>Next <ChevronRight className="h-5 w-5 ml-1" /></>
            )}
          </Button>
        </div>
        {selected.length > 0 && currentQuestion?.type !== "free-input" && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            {selected.length} selected
          </p>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
