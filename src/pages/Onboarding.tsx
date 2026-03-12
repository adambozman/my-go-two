import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import SwipeCards from "@/components/SwipeCards";
import { AppSidebar } from "@/components/AppSidebar";
import {
  onboardingCategories,
  onboardingQuestions,
  OnboardingQuestion,
} from "@/data/onboardingQuestions";
import { profileQuestions } from "@/data/profileQuestions";
import { getStyleImage, getCategoryImage } from "@/data/genderImages";

type Phase = "intro" | "profile" | "personalizing" | "category-picker" | "category-questions";

const INTRO_IMAGES = [
  { id: "shopping", label: "Shopping" },
  { id: "style", label: "Style" },
  { id: "food", label: "Food" },
  { id: "gifts", label: "Gifts" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "fit", label: "Fit" },
  { id: "style", label: "Fashion" },
  { id: "food", label: "Dining" },
  { id: "gifts", label: "Occasions" },
];

// Gender helper — reads the identity answer from state
const useSelectedGender = (answers: Record<string, string | string[]>) => {
  const identity = answers["identity"];
  if (!identity) return undefined;
  const val = Array.isArray(identity) ? identity[0] : identity;
  return val as "male" | "female" | "non-binary" | "prefer-not" | undefined;
};

// Accent color — always teal
const getGenderAccent = (_gender?: string) => ({
  solid: "hsl(196 40% 31%)", ring: "hsl(196 40% 31%)", bg: "rgba(45, 104, 112, 0.2)", bgStrong: "rgba(45, 104, 112, 0.5)",
});

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const { user } = useAuth();
  const { refetch: refetchPersonalization } = usePersonalization();
  const { toast } = useToast();

  const [phase, setPhase] = useState<Phase>(isEditMode ? "category-picker" : "intro");
  const [profileIndex, setProfileIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0); // for cover-flow
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [catQuestionIndex, setCatQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [introCenter, setIntroCenter] = useState(4);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);
  const selectedGender = useSelectedGender(answers);
  const accent = getGenderAccent(selectedGender);

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
      // Separate category answers from profile answers
      const profileIds = profileQuestions.map((q) => q.id);
      const categoryAnswers: Record<string, string | string[]> = {};
      for (const [key, val] of Object.entries(answers)) {
        if (!profileIds.includes(key)) categoryAnswers[key] = val;
      }

      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        favorites: categoryAnswers,
        onboarding_complete: true,
      });
      await refetchPersonalization();
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
        <div className="flex items-center justify-between px-8 pt-6 pb-1 relative z-10">
          <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">Skip</Button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative pb-4">
          <div className="relative w-full max-w-4xl h-[480px] flex items-center justify-center mb-4">
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
                    x: wrapped * 195,
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
                    className={`overflow-hidden relative ${isCenter ? "w-[310px] h-[420px] shadow-2xl" : "w-[255px] h-[345px]"}`}
                    style={{ borderRadius: "1.4rem" }}
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${img.id}?w=400&h=500&fit=crop&q=80`}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="card-title">{img.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center px-6 max-w-lg">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "28px", color: "var(--swatch-viridian-odyssey)", lineHeight: 1.4 }} className="mb-6 text-center">
              We'll learn your brands, style, food, and gift preferences. So your significant other is always on point.
            </p>
            <button
              onClick={() => setPhase("profile")}
              className="rounded-full"
              style={{
                padding: "14px 40px",
                background: "#d4543a",
                color: "#ffffff",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: "13.5px",
                boxShadow: "0 4px 20px rgba(212, 84, 58, 0.35)",
              }}
            >
              Start My Profile →
            </button>
            <div className="mt-3">
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
  // RENDER: PERSONALIZING (AI loading screen)
  // ══════════════════════════════════════════
  if (phase === "personalizing") {
    return (
      <div className="landing-page min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 max-w-md"
        >
          <GoTwoText className="text-[48px] [&_.two]:text-[60px] mb-8" />
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-[2px] mx-auto mb-8"
            style={{ background: "var(--swatch-teal)" }}
          />

          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
            Building Your Profile...
          </h2>
          <p className="text-muted-foreground mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
            Matching brands, stores, and styles to your taste.
          </p>
          <p className="text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--swatch-teal)" }}>
            This only takes a moment.
          </p>
        </motion.div>
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
      <div className={`landing-page min-h-screen flex flex-col overflow-hidden ${isEditMode ? "pb-24" : ""}`}>
        <div className="flex items-center justify-between px-8 pt-6 pb-2 relative z-10">
          <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">Skip</Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          {!isEditMode && (
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
          )}
          {isEditMode && (
            <p className="text-muted-foreground text-sm mb-2 self-start px-6">
              Tap a card to retake a category.
            </p>
          )}

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
                    className={`overflow-hidden transition-shadow duration-300 ${
                      isActive ? "ring-2 ring-primary shadow-2xl" : ""
                    }`}
                    style={{ width: 210, height: 280, borderRadius: "1.4rem" }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={getCategoryImage(cat.id, selectedGender)}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      {isDone && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--swatch-teal)" }}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3.5">
                        <h3 className="card-title leading-tight">
                          {cat.name}
                        </h3>
                        <p className="text-white/70 text-xs mt-0.5">
                          {isDone ? "Done" : `${catQCount} questions`}
                        </p>
                      </div>
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
        {isEditMode && <AppSidebar />}
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
    ? { name: "About You" }
    : onboardingCategories.find((c) => c.id === selectedCategory);

  const goNext = () => {
    if (qIndex < totalQ - 1) {
      setSlideDir(1);
      if (isProfilePhase) setProfileIndex((i) => i + 1);
      else setCatQuestionIndex((i) => i + 1);
    } else {
      if (isProfilePhase) {
        // Trigger AI personalization
        runPersonalization();
      } else {
        // Mark category as completed
        if (selectedCategory && !completedCategories.includes(selectedCategory)) {
          setCompletedCategories((prev) => [...prev, selectedCategory]);
        }
        setPhase("category-picker");
      }
    }
  };

  const runPersonalization = async () => {
    setPhase("personalizing");
    
    // Collect only profile answers
    const profileAnswerData: Record<string, string | string[]> = {};
    for (const q of profileQuestions) {
      if (answers[q.id]) profileAnswerData[q.id] = answers[q.id];
    }

    // Save gender to profile
    if (user) {
      const identityAnswer = profileAnswerData["identity"];
      const gender = Array.isArray(identityAnswer) ? identityAnswer[0] : identityAnswer;
      if (gender && gender !== "prefer-not") {
        await supabase.from("profiles").update({ gender }).eq("user_id", user.id);
      }
    }

    // Call AI personalization with a timeout to prevent infinite loading
    if (user) {
      const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 30000));
      const personalizationPromise = (async () => {
        try {
          const { data, error } = await supabase.functions.invoke("personalize", {
            body: { profile_answers: profileAnswerData },
          });

          if (error) {
            console.error("Personalization error:", error);
            toast({ title: "Personalization saved", description: "We'll refine as you answer more!" });
          } else {
            await refetchPersonalization();
            toast({ title: "Profile analyzed! ✨", description: data?.personalization?.persona_summary || "Your experience is now personalized!" });
          }
        } catch (e) {
          console.error("Personalization failed:", e);
          toast({ title: "Profile saved", description: "We'll personalize your experience shortly!" });
        }
      })();

      await Promise.race([personalizationPromise, timeoutPromise]);
    }

    setPhase("category-picker");
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

  // ══════════════════════════════════════════
  // RENDER: CATEGORY QUESTIONS (Swipe cards)
  // ══════════════════════════════════════════
  if (phase === "category-questions" && selectedCategory) {
    const catName = onboardingCategories.find(c => c.id === selectedCategory)?.name || "";
    return (
      <div className={`landing-page min-h-screen flex flex-col ${isEditMode ? "pb-24" : ""}`}>
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
          <Button variant="ghost" size="sm" onClick={() => setPhase("category-picker")} className="text-muted-foreground">
            Back
          </Button>
        </div>
        <div className="px-6 mb-2">
          <span className="font-semibold text-primary text-base">{catName}</span>
        </div>
        <SwipeCards
          questions={categoryQuestions}
          categoryName={catName}
          getImage={(optionId) => getStyleImage(optionId, selectedGender) || ""}
          onBack={() => setPhase("category-picker")}
          onComplete={(catSelections) => {
            // Merge selections into answers
            setAnswers(prev => ({ ...prev, ...catSelections }));
            if (!completedCategories.includes(selectedCategory)) {
              setCompletedCategories(prev => [...prev, selectedCategory]);
            }
            setPhase("category-picker");
          }}
        />
        {isEditMode && <AppSidebar />}
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className={`landing-page min-h-screen flex flex-col ${isEditMode ? "pb-24" : ""}`}>
      {/* Top */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
        <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
          Skip <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="px-6 mb-1">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="font-semibold text-primary text-base">
            {currentCategory?.name}
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
              {currentQuestion.funnySubtext && (
                <p className="text-xs text-muted-foreground italic mt-1">{currentQuestion.funnySubtext}</p>
              )}
            </div>

            {/* ── IMAGE GRID ── */}
            {currentQuestion.type === "image-grid" && currentQuestion.options && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1 content-start overflow-y-auto pb-4">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => currentQuestion.multiSelect === false ? setSingle(currentQuestion.id, opt.id) : toggleMulti(currentQuestion.id, opt.id)}
                      className="text-left group"
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
                        <div className="aspect-[4/5] overflow-hidden relative">
                          <img
                            src={getStyleImage(opt.id, selectedGender) || opt.localImage || `https://images.unsplash.com/photo-${opt.image}?w=350&h=440&fit=crop&q=80`}
                            alt={opt.label}
                            className={`w-full h-full object-cover transition-transform duration-300 ${
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
                              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                              style={{ background: accent.solid }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
                            <p className="text-sm font-semibold text-white leading-tight drop-shadow">{opt.label}</p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ── SINGLE SELECT (radio-style) ── */}
            {currentQuestion.type === "single-select" && currentQuestion.options && (
              <div className="flex flex-col gap-3 max-w-md mx-auto w-full flex-1 content-start overflow-y-auto pb-4">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selected.includes(opt.id);
                  // For identity question, each option gets its own accent color
                  const optAccent = currentQuestion.id === "identity"
                    ? getGenderAccent(opt.id)
                    : accent;
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSingle(currentQuestion.id, opt.id)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 ${
                        isSelected
                          ? "shadow-md"
                          : "hover:shadow-sm"
                      }`}
                      style={{
                        background: isSelected
                          ? `linear-gradient(158deg, ${optAccent.bgStrong}, ${optAccent.bg})`
                          : "linear-gradient(158deg, rgba(232,198,174,0.2), rgba(107,109,98,0.08))",
                        border: isSelected
                          ? `2px solid ${optAccent.solid}`
                          : "2px solid transparent",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor: isSelected ? optAccent.solid : "rgba(107,109,98,0.4)",
                          background: isSelected ? optAccent.solid : "transparent",
                        }}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-white"
                          />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-primary">{opt.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

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
                          ? accent.solid
                          : "linear-gradient(158deg, rgba(232,198,174,0.38), rgba(107,109,98,0.15))",
                        color: isSelected ? "#fff" : "hsl(196 40% 31%)",
                        border: isSelected
                          ? `2px solid ${accent.solid}`
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
      {isEditMode && <AppSidebar />}
    </div>
  );
};

export default Onboarding;
