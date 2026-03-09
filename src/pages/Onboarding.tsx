import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        // No user — use default questions
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

  if (showIntro) {
    return (
      <div className="landing-page min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg text-center"
        >
          <div className="card-design-neumorph panel-polish p-10">
            {/* Hero image mosaic */}
            <div className="grid grid-cols-3 gap-2 mb-8 max-w-xs mx-auto">
              {[
                "1507525428034-b723cf961d3e",
                "1414235077428-338989a2e8c0",
                "1542291026-7eec264c27ff",
                "1502602898657-3e91760cbb34",
                "1509042239860-f550ce710b93",
                "1470229722913-5180ce5f1572",
              ].map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, type: "spring" }}
                  className="aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${img}?w=150&h=150&fit=crop`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-primary mb-3">
              Let's Get to Know You!
            </h1>
            <p className="text-muted-foreground mb-2 text-base">
              Pick your favorites across food, brands, places & more.
            </p>
            <p className="text-sm text-muted-foreground italic mb-8">
              Your partner will thank us later 😉
            </p>

            <Button
              className="w-full rounded-full mb-3 h-12 text-base"
              onClick={() => setShowIntro(false)}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Let's Go!
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={handleSkip}
            >
              Skip for now
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

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

      {/* Question card */}
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
              className="flex-1 flex flex-col max-w-2xl mx-auto w-full"
            >
              {/* Question header */}
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-primary mb-1">
                  {currentQuestion.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.subtitle}
                </p>
                <p className="text-xs text-muted-foreground italic mt-1">
                  {currentQuestion.funnySubtext}
                </p>
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 flex-1 content-start overflow-y-auto pb-4">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedForCurrent.includes(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => toggleOption(currentQuestion.id, option.id)}
                      className={`relative group rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-200 ${
                        isSelected
                          ? "ring-3 ring-primary scale-[1.02] shadow-lg"
                          : "hover:scale-[1.03] hover:shadow-md"
                      }`}
                    >
                      {/* Image */}
                      <img
                        src={`https://images.unsplash.com/photo-${option.image}?w=300&h=400&fit=crop`}
                        alt={option.label}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 transition-colors duration-200 ${
                          isSelected
                            ? "bg-primary/30"
                            : "bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70"
                        }`}
                      />

                      {/* Check mark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md"
                        >
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      )}

                      {/* Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-white font-semibold text-sm drop-shadow-lg">
                          {option.emoji} {option.label}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
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
