import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import {
  getQuestionsForGender,
  onboardingCategories,
  OnboardingQuestion,
} from "@/data/onboardingQuestions";

/* ── Cover-flow intro images ── */
const INTRO_IMAGES = [
  { id: "1542291026-7eec264c27ff", label: "Fashion" },
  { id: "1414235077428-338989a2e8c0", label: "Dining" },
  { id: "1509042239860-f550ce710b93", label: "Coffee" },
  { id: "1502602898657-3e91760cbb34", label: "Travel" },
  { id: "1490427712608-588e68359dbd", label: "Luxury" },
  { id: "1568901346375-23c9450c58cd", label: "Food" },
  { id: "1515562141207-7a88fb7ce338", label: "Jewelry" },
  { id: "1555041469-a586c61ea9bc", label: "Home" },
  { id: "1518611012118-696072aa579a", label: "Athleisure" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<OnboardingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [showIntro, setShowIntro] = useState(true);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [introCenter, setIntroCenter] = useState(4);

  // Auto-scroll intro cover flow
  useEffect(() => {
    if (!showIntro) return;
    const interval = setInterval(() => {
      setIntroCenter((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [showIntro]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setQuestions(getQuestionsForGender("non-binary"));
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("gender")
        .eq("user_id", user.id)
        .single();

      const gender = data?.gender || "non-binary";
      setQuestions(getQuestionsForGender(gender));
      setLoading(false);
    };
    fetchUserProfile();
  }, [user]);

  const currentQuestion = questions[currentIndex];
  const currentCategory = onboardingCategories.find(
    (c) => c.id === currentQuestion?.category
  );
  const progress =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const toggleOption = (questionId: string, optionId: string) => {
    setSelections((prev) => {
      const current = prev[questionId] || [];
      if (current.includes(optionId)) {
        return { ...prev, [questionId]: current.filter((id) => id !== optionId) };
      }
      return { ...prev, [questionId]: [...current, optionId] };
    });
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setSlideDir(1);
      setCurrentIndex((i) => i + 1);
    } else {
      handleComplete();
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setSlideDir(-1);
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }

    const favorites: Record<string, string[]> = {};
    Object.entries(selections).forEach(([qId, opts]) => {
      if (opts.length > 0) favorites[qId] = opts;
    });

    try {
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        favorites,
        onboarding_complete: true,
      });

      toast({
        title: "You're all set! 🎉",
        description: "Your partner is gonna love knowing this about you!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error saving preferences",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSkip = async () => {
    if (!user) {
      navigate("/dashboard");
      return;
    }
    try {
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        onboarding_complete: true,
      });
      navigate("/dashboard");
    } catch {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="landing-page min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <GoTwoText className="text-4xl" />
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════
     INTRO — full-screen cover-flow style
     ══════════════════════════════════════ */
  if (showIntro) {
    return (
      <div className="landing-page min-h-screen flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-6 pb-2 relative z-10">
          <GoTwoText className="text-3xl" />
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
            Skip
          </Button>
        </div>

        {/* Cover flow carousel */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Floating cards */}
          <div className="relative w-full max-w-3xl h-[320px] flex items-center justify-center mb-10">
            {INTRO_IMAGES.map((img, i) => {
              const offset = i - introCenter;
              // wrap around
              const wrappedOffset =
                offset > 4 ? offset - INTRO_IMAGES.length :
                offset < -4 ? offset + INTRO_IMAGES.length : offset;
              const isCenter = wrappedOffset === 0;
              const absOffset = Math.abs(wrappedOffset);
              const visible = absOffset <= 3;

              if (!visible) return null;

              return (
                <motion.div
                  key={img.id}
                  animate={{
                    x: wrappedOffset * 160,
                    scale: isCenter ? 1 : 0.75 - absOffset * 0.05,
                    zIndex: 10 - absOffset,
                    opacity: isCenter ? 1 : Math.max(0.3, 0.7 - absOffset * 0.15),
                    rotateY: wrappedOffset * -8,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute"
                  style={{ perspective: "1200px" }}
                >
                  <div
                    className={`card-design-neumorph overflow-hidden transition-shadow duration-300 ${
                      isCenter ? "w-[220px] h-[280px] shadow-2xl" : "w-[180px] h-[230px]"
                    }`}
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

          {/* Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center px-6 max-w-lg"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let Our AI Get to Know You
            </h1>
            <p className="text-muted-foreground mb-1 text-base">
              Tell us your favorite brands, stores, restaurants & more.
            </p>
            <p className="text-sm text-muted-foreground italic mb-8">
              We'll personalize everything just for you ✨
            </p>

            <Button
              className="rounded-full h-13 px-12 text-base shadow-lg"
              onClick={() => setShowIntro(false)}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Let's Go!
            </Button>
            <div className="mt-4">
              <Button
                variant="ghost"
                className="text-muted-foreground text-sm"
                onClick={handleSkip}
              >
                Skip for now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════
     QUESTIONNAIRE — multi-select grid
     ══════════════════════════════════════ */
  const selectedForCurrent = selections[currentQuestion?.id] || [];

  return (
    <div className="landing-page min-h-screen flex flex-col">
      {/* Top bar */}
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
            {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-4 py-4 overflow-hidden">
        <AnimatePresence mode="wait" custom={slideDir}>
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              custom={slideDir}
              initial={{ opacity: 0, x: slideDir * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDir * -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex-1 flex flex-col max-w-3xl mx-auto w-full"
            >
              {/* Header */}
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentQuestion.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.subtitle}
                </p>
                <p className="text-xs text-muted-foreground italic mt-1">
                  {currentQuestion.funnySubtext}
                </p>
              </div>

              {/* Options — cover-flow style cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1 content-start overflow-y-auto pb-4" ref={scrollRef}>
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedForCurrent.includes(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => toggleOption(currentQuestion.id, option.id)}
                      className="text-left group"
                    >
                      <div
                        className={`card-design-neumorph overflow-hidden transition-all duration-200 ${
                          isSelected
                            ? "ring-2 scale-[1.03] shadow-xl"
                            : "hover:scale-[1.02] hover:shadow-lg"
                        }`}
                        style={{
                          borderRadius: "1.2rem",
                          ...(isSelected ? { ringColor: "hsl(var(--primary))" } : {}),
                          borderColor: isSelected ? "hsl(196 40% 31%)" : undefined,
                          borderWidth: isSelected ? "2px" : undefined,
                        }}
                      >
                        {/* Image */}
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={`https://images.unsplash.com/photo-${option.image}?w=350&h=260&fit=crop&q=80`}
                            alt={option.label}
                            className={`w-full h-full object-cover transition-transform duration-300 ${
                              isSelected ? "scale-105" : "group-hover:scale-105"
                            }`}
                            loading="lazy"
                          />
                          {/* Selected overlay */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-primary/20"
                            />
                          )}
                          {/* Check */}
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
                        {/* Label */}
                        <div className="px-3 py-2.5 text-center">
                          <p className="text-sm font-semibold text-primary leading-tight">
                            {option.label}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-6"
            onClick={goBack}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
          <Button
            size="lg"
            className="rounded-full flex-1 h-12"
            onClick={goNext}
          >
            {currentIndex === questions.length - 1 ? (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Finish
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </>
            )}
          </Button>
        </div>
        {selectedForCurrent.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            {selectedForCurrent.length} selected
          </p>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
