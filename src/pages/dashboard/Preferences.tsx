import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SwipeCards from "@/components/SwipeCards";
import {
  onboardingCategories,
  onboardingQuestions,
} from "@/data/onboardingQuestions";
import { getCategoryImage } from "@/data/genderImages";

const Preferences = () => {
  const { user } = useAuth();
  const { profileAnswers, refetch } = usePersonalization();
  const gender = (profileAnswers?.identity as string) || "male";
  const selectedGender = gender as "male" | "female" | "non-binary" | undefined;

  const [categoryIndex, setCategoryIndex] = useState(
    Math.floor(onboardingCategories.length / 2)
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [catQuestionIndex, setCatQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);

  // Load existing answers from favorites
  useEffect(() => {
    if (!profileAnswers) return;
    // favorites stores the category answers
    const loadExisting = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("user_preferences")
        .select("favorites")
        .eq("user_id", user.id)
        .single();
      if (data?.favorites && typeof data.favorites === "object") {
        setAnswers(data.favorites as Record<string, string | string[]>);
        // Mark categories that have answers as completed
        const answered = new Set(Object.keys(data.favorites as object));
        const done = onboardingCategories
          .filter((cat) => {
            const catQs = onboardingQuestions.filter((q) => q.category === cat.id);
            return catQs.some((q) => answered.has(q.id));
          })
          .map((c) => c.id);
        setCompletedCategories(done);
      }
    };
    loadExisting();
  }, [user, profileAnswers]);

  const categoryQuestions = selectedCategory
    ? onboardingQuestions.filter((q) => q.category === selectedCategory)
    : [];
  const currentCatQuestion = categoryQuestions[catQuestionIndex];

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

  const getSelected = (qId: string): string[] => {
    const val = answers[qId];
    if (!val) return [];
    return Array.isArray(val) ? val : [];
  };

  const goNext = async () => {
    if (catQuestionIndex < categoryQuestions.length - 1) {
      setSlideDir(1);
      setCatQuestionIndex((i) => i + 1);
    } else {
      // Save and go back to picker
      if (selectedCategory && !completedCategories.includes(selectedCategory)) {
        setCompletedCategories((prev) => [...prev, selectedCategory]);
      }
      // Save answers
      if (user) {
        try {
          await supabase
            .from("user_preferences")
            .update({
              favorites: answers,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);
          toast.success("Preferences saved!");
          await refetch();
        } catch {
          toast.error("Failed to save");
        }
      }
      setSelectedCategory(null);
    }
  };

  const goBack = () => {
    if (catQuestionIndex > 0) {
      setSlideDir(-1);
      setCatQuestionIndex((i) => i - 1);
    } else {
      setSelectedCategory(null);
    }
  };

  // Category questions (swipe) view
  if (selectedCategory) {
    const catName =
      onboardingCategories.find((c) => c.id === selectedCategory)?.name || "";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <SwipeCards
          questions={categoryQuestions.map((q) => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            type: q.type,
            options: q.options,
            placeholder: q.placeholder,
            multiSelect: q.multiSelect,
          }))}
          categoryName={catName}
          onComplete={async (selections) => {
            const newAnswers = { ...answers, ...selections };
            setAnswers(newAnswers);
            if (selectedCategory && !completedCategories.includes(selectedCategory)) {
              setCompletedCategories((prev) => [...prev, selectedCategory]);
            }
            if (user) {
              try {
                await supabase
                  .from("user_preferences")
                  .update({
                    favorites: newAnswers,
                    updated_at: new Date().toISOString(),
                  })
                  .eq("user_id", user.id);
                toast.success("Preferences saved!");
                await refetch();
              } catch {
                toast.error("Failed to save");
              }
            }
            setSelectedCategory(null);
          }}
          onBack={() => setSelectedCategory(null)}
        />
      </motion.div>
    );
  }

  // Main cover flow view — matches Questionnaires style
  const cats = onboardingCategories;
  const goLeftCat = () =>
    setCategoryIndex((i) => (i - 1 + cats.length) % cats.length);
  const goRightCat = () =>
    setCategoryIndex((i) => (i + 1) % cats.length);

  return (
    <div className="space-y-8 pb-4">
      <div>
        <p className="text-muted-foreground text-sm mb-2">
          Tap a card to retake a category.
        </p>

        <div className="relative flex items-center justify-center pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={goLeftCat}
            className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="relative w-full h-[420px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {cats.map((cat, index) => {
                let offset = index - categoryIndex;
                const half = cats.length / 2;
                if (offset > half) offset -= cats.length;
                if (offset < -half) offset += cats.length;
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                if (absOffset > 2) return null;

                const xOffset = offset * (isActive ? 190 : 170);
                const cardW = isActive ? 280 : 200;
                const cardH = isActive ? 380 : 250;
                const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
                const zIndex = 10 - absOffset;
                const blur = isActive ? 0 : 2;
                const opacity = isActive ? 1 : 0.5;
                const isDone = completedCategories.includes(cat.id);
                const catQCount = onboardingQuestions.filter(
                  (q) => q.category === cat.id
                ).length;

                return (
                  <motion.div
                    key={cat.id}
                    animate={{
                      x: xOffset,
                      scale,
                      opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    onClick={() => {
                      if (isActive) {
                        setSelectedCategory(cat.id);
                        setCatQuestionIndex(0);
                        setSlideDir(1);
                      } else {
                        setCategoryIndex(index);
                      }
                    }}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                        isActive ? "ring-2 ring-primary shadow-2xl" : ""
                      }`}
                      style={{ width: cardW, height: cardH }}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={getCategoryImage(cat.id, selectedGender)}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3
                            className="text-white font-semibold text-sm leading-tight drop-shadow"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            {cat.name}
                          </h3>
                          <p className="text-white/70 text-xs mt-1">
                            {isDone
                              ? "Completed"
                              : `${catQCount} questions`}
                          </p>
                        </div>
                        {isDone && (
                          <div
                            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "var(--swatch-teal)" }}
                          >
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goRightCat}
            className="absolute right-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
