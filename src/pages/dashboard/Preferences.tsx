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
  if (selectedCategory && currentCatQuestion) {
    const progress =
      categoryQuestions.length > 0
        ? ((catQuestionIndex + 1) / categoryQuestions.length) * 100
        : 0;
    const selected = getSelected(currentCatQuestion.id);
    const catName =
      onboardingCategories.find((c) => c.id === selectedCategory)?.name || "";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="text-muted-foreground"
          >
            ← Back
          </Button>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--swatch-teal)" }}
          >
            {catQuestionIndex + 1} / {categoryQuestions.length}
          </span>
        </div>

        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: "var(--swatch-sand-mid)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--swatch-teal)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="text-center mb-2">
          <p
            className="text-xs uppercase tracking-wider font-semibold"
            style={{ color: "var(--swatch-teal)" }}
          >
            {catName}
          </p>
          <h2
            className="text-xl font-bold mt-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--swatch-viridian-odyssey)",
            }}
          >
            {currentCatQuestion.title}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {currentCatQuestion.subtitle}
          </p>
        </div>

        {currentCatQuestion.type === "image-grid" &&
        currentCatQuestion.options ? (
          <SwipeCards
            key={currentCatQuestion.id}
            items={currentCatQuestion.options.map((opt) => ({
              id: opt.id,
              label: opt.label,
              image:
                opt.localImage ||
                (opt.image
                  ? `https://images.unsplash.com/photo-${opt.image}?w=600&h=800&fit=crop&q=80`
                  : ""),
            }))}
            onComplete={(accepted) => {
              setAnswers((prev) => ({
                ...prev,
                [currentCatQuestion.id]: accepted,
              }));
              setTimeout(goNext, 300);
            }}
          />
        ) : currentCatQuestion.options ? (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {currentCatQuestion.options.map((opt) => {
              const isSelected = selected.includes(opt.id);
              return (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (currentCatQuestion.multiSelect === false) {
                      setSingle(currentCatQuestion.id, opt.id);
                    } else {
                      toggleMulti(currentCatQuestion.id, opt.id);
                    }
                  }}
                  className="text-left px-4 py-3.5 rounded-2xl transition-all text-sm font-medium"
                  style={{
                    background: isSelected
                      ? "rgba(45, 104, 112, 0.12)"
                      : "var(--swatch-sand-mid)",
                    border: isSelected
                      ? "2px solid var(--swatch-teal)"
                      : "1px solid var(--chip-border)",
                    color: isSelected
                      ? "var(--swatch-teal)"
                      : "var(--swatch-antique-coin)",
                  }}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </div>
        ) : null}

        {currentCatQuestion.type !== "image-grid" && selected.length > 0 && (
          <div className="text-center pt-2">
            <Button
              onClick={goNext}
              className="rounded-full px-8 text-white font-semibold"
              style={{
                backgroundColor: "var(--swatch-cedar-grove)",
                boxShadow: "0 4px 20px rgba(212, 84, 58, 0.30)",
              }}
            >
              {catQuestionIndex < categoryQuestions.length - 1
                ? "Next"
                : "Done"}
            </Button>
          </div>
        )}
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
