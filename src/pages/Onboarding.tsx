import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, X, ChevronRight, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import { getQuestionsForGender, onboardingCategories, SwipeCard } from "@/data/onboardingQuestions";

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userGender, setUserGender] = useState<string>("non-binary");
  const [questions, setQuestions] = useState<SwipeCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("gender")
        .eq("user_id", user.id)
        .single();
      
      const gender = data?.gender || "non-binary";
      setUserGender(gender);
      setQuestions(getQuestionsForGender(gender));
      setLoading(false);
    };
    fetchUserProfile();
  }, [user]);

  const currentQuestion = questions[currentIndex];
  const currentCategory = onboardingCategories.find(
    (c) => c.id === currentQuestion?.category
  );
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleSwipe = (dir: "left" | "right") => {
    if (!currentQuestion) return;
    setDirection(dir);
    setLikes((prev) => ({
      ...prev,
      [currentQuestion.value]: dir === "right",
    }));

    setTimeout(() => {
      setDirection(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        handleComplete();
      }
    }, 300);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe("right");
    } else if (info.offset.x < -threshold) {
      handleSwipe("left");
    }
  };

  const handleComplete = async () => {
    if (!user) return;
    
    const favorites: Record<string, boolean> = {};
    const dislikes: Record<string, boolean> = {};
    
    Object.entries(likes).forEach(([key, liked]) => {
      if (liked) {
        favorites[key] = true;
      } else {
        dislikes[key] = true;
      }
    });

    try {
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        favorites,
        dislikes,
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
    if (!user) return;
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
          className="w-full max-w-md text-center"
        >
          <div className="card-design-neumorph panel-polish p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-6"
            >
              💕
            </motion.div>
            <h1 className="text-2xl font-bold text-primary mb-3">
              Let's Get to Know You!
            </h1>
            <p className="text-muted-foreground mb-6">
              Swipe right on things you <span className="text-red-400">❤️</span> love, left on things you don't.
              <br />
              <span className="text-sm italic">
                (Your partner will thank us later 😉)
              </span>
            </p>
            <div className="flex gap-3 justify-center mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <span>Nope</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <span>Love it!</span>
              </div>
            </div>
            <Button
              className="w-full rounded-full mb-3"
              onClick={() => setShowIntro(false)}
            >
              <Sparkles className="mr-2 h-4 w-4" />
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

  return (
    <div className="landing-page min-h-screen flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <GoTwoText className="text-2xl" />
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Skip <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="font-medium">
            {currentCategory?.icon} {currentCategory?.name}
          </span>
          <span className="text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="relative w-full max-w-sm h-[480px]">
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                  rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
                }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <div className="card-design-neumorph h-full overflow-hidden">
                  {/* Image */}
                  <div className="h-[60%] relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${currentQuestion.image}?w=400&h=500&fit=crop`}
                      alt={currentQuestion.question}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Swipe indicators */}
                    <motion.div
                      className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold transform -rotate-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: direction === "left" ? 1 : 0 }}
                    >
                      NOPE
                    </motion.div>
                    <motion.div
                      className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold transform rotate-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: direction === "right" ? 1 : 0 }}
                    >
                      LOVE IT!
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="h-[40%] p-6 flex flex-col justify-center text-center">
                    <h2 className="text-xl font-bold text-primary mb-2">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.funnySubtext && (
                      <p className="text-sm text-muted-foreground italic">
                        {currentQuestion.funnySubtext}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 pb-4">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 p-0 border-2 border-red-300 hover:bg-red-50 hover:border-red-400"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-8 w-8 text-red-500" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
