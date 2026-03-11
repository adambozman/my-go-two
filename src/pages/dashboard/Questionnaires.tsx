import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { getCategoryImage } from "@/data/genderImages";
import {
  onboardingCategories,
  onboardingQuestions,
} from "@/data/onboardingQuestions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SwipeCards from "@/components/SwipeCards";
import { allTemplateSubtypes, templateSubcategories, filterSubtypesByGender, filterSubcategoriesByGender } from "@/data/templateSubtypes";
import TemplateCoverFlow, { type SubtypeItem } from "@/components/TemplateCoverFlow";
import { useToast } from "@/hooks/use-toast";

// Template images for preferences category
import imgBrandPreferences from "@/assets/templates/brand-preferences.jpg";
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";
import imgSpecificProducts from "@/assets/templates/specific-products.jpg";

interface AIQuizCategory {
  id: string;
  name: string;
  category: string;
  questions: {
    id: string;
    title: string;
    subtitle: string;
    type: "pill-select" | "single-select";
    multi_select: boolean;
    options: { id: string; label: string }[];
  }[];
}

interface Template {
  id: string;
  name: string;
  icon: string | null;
  category: string;
  default_fields: any;
}

const categoryImageMap: Record<string, string> = {
  style: "style",
  sizing: "fit",
  lifestyle: "lifestyle",
  gifting: "gifts",
  products: "shopping",
};

const templateImageMap: Record<string, string> = {
  "Brand Preferences": imgBrandPreferences,
  "Love Language": imgLoveLanguage,
  "Pet Peeves": imgPetPeeves,
  "Specific Product Versions": imgSpecificProducts,
};

const Questionnaires = () => {
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const { profileAnswers, gender, loading: genderLoading, refetch } = usePersonalization();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAiCategory, setSelectedAiCategory] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);

  // AI quizzes
  const [aiCategories, setAiCategories] = useState<AIQuizCategory[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Preferences templates
  const [prefTemplates, setPrefTemplates] = useState<Template[]>([]);
  const [creating, setCreating] = useState<string | null>(null);
  const [coverFlowTemplate, setCoverFlowTemplate] = useState<{ name: string; subtypes: SubtypeItem[]; subcategories?: import("@/data/templateSubtypes").SubcategoryGroup[] } | null>(null);

  // Load existing answers
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("user_preferences")
        .select("favorites")
        .eq("user_id", user.id)
        .single();
      if (data?.favorites && typeof data.favorites === "object") {
        setAnswers(data.favorites as Record<string, string | string[]>);
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
    load();
  }, [user, profileAnswers]);

  // Load preferences category templates
  useEffect(() => {
    supabase
      .from("card_templates")
      .select("*")
      .eq("category", "preferences")
      .then(({ data }) => {
        setPrefTemplates(data ?? []);
      });
  }, []);

  const fetchAiQuizzes = useCallback(async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-quizzes");
      if (error) throw error;
      if (data?.categories) setAiCategories(data.categories);
    } catch (e: any) {
      console.error("AI quizzes error:", e);
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAiQuizzes();
  }, []);

  // Build combined card list: onboarding categories + preferences templates + AI categories
  type CoverCard =
    | { kind: "onboarding"; cat: (typeof onboardingCategories)[0] }
    | { kind: "ai"; category: AIQuizCategory }
    | { kind: "template"; template: Template };

  const coverCards: CoverCard[] = [
    ...onboardingCategories.map((c) => ({ kind: "onboarding" as const, cat: c })),
    ...prefTemplates.map((t) => ({ kind: "template" as const, template: t })),
    ...aiCategories.map((c) => ({ kind: "ai" as const, category: c })),
  ];

  useEffect(() => {
    if (coverCards.length > 0 && activeIndex === 0) {
      setActiveIndex(Math.floor(onboardingCategories.length / 2));
    }
  }, [onboardingCategories.length]);

  const goLeft = () => setActiveIndex((i) => (i - 1 + coverCards.length) % coverCards.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % coverCards.length);

  // Template list creation
  const handleTemplateClick = async (template: Template) => {
    if (!user) {
      uiToast({ title: "Please log in first", variant: "destructive" });
      return;
    }
    const rawSubtypes = allTemplateSubtypes[template.name];
    const rawSubcategories = templateSubcategories[template.name];
    const subtypes = rawSubtypes ? filterSubtypesByGender(rawSubtypes, gender) : undefined;
    const subcategories = rawSubcategories ? filterSubcategoriesByGender(rawSubcategories, gender) : undefined;
    if (subtypes || subcategories) {
      setCoverFlowTemplate({ name: template.name, subtypes: subtypes || [], subcategories });
      return;
    }
    await createListFromTemplate(template.name, template.default_fields, template.id);
  };

  const handleSubtypeSelect = async (subtype: SubtypeItem, subcategoryName?: string) => {
    if (!user) return;
    const templateName = coverFlowTemplate?.name;
    const cardTitle = subcategoryName
      ? `${templateName} - ${subcategoryName} - ${subtype.name}`
      : `${templateName} - ${subtype.name}`;
    await createListFromTemplate(cardTitle, subtype.fields as any, undefined);
  };

  const createListFromTemplate = async (name: string, fields: any, templateId?: string) => {
    if (!user) return;
    setCreating(name);
    try {
      const { data: newList, error: listError } = await supabase
        .from("lists")
        .insert({ title: name, description: `Created from template`, user_id: user.id })
        .select()
        .single();
      if (listError) {
        uiToast({ title: "Error creating list", description: listError.message, variant: "destructive" });
        setCreating(null);
        return;
      }
      if (newList) {
        const { error: cardError } = await supabase.from("cards").insert({
          title: name, fields, list_id: newList.id, user_id: user.id,
          ...(templateId ? { template_id: templateId } : {}),
        });
        if (cardError) uiToast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });
        const fromTemplate = coverFlowTemplate?.name;
        setCoverFlowTemplate(null);
        navigate(`/dashboard/lists/${newList.id}`, { state: { fromTemplate } });
      }
    } catch (e: any) {
      uiToast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
  };

  // Subtype cover flow view
  if (coverFlowTemplate) {
    return (
      <TemplateCoverFlow
        templateName={coverFlowTemplate.name}
        subtypes={coverFlowTemplate.subtypes}
        subcategories={coverFlowTemplate.subcategories}
        onBack={() => setCoverFlowTemplate(null)}
        onSelect={handleSubtypeSelect}
        creating={creating !== null}
        gender={gender}
      />
    );
  }

  // Onboarding category swipe view
  if (selectedCategory) {
    const catName = onboardingCategories.find((c) => c.id === selectedCategory)?.name || "";
    const categoryQuestions = onboardingQuestions.filter((q) => q.category === selectedCategory);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
            if (!completedCategories.includes(selectedCategory)) {
              setCompletedCategories((prev) => [...prev, selectedCategory]);
            }
            if (user) {
              try {
                await supabase
                  .from("user_preferences")
                  .update({ favorites: newAnswers, updated_at: new Date().toISOString() })
                  .eq("user_id", user.id);
                toast.success("Answers saved!");
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

  // AI category swipe view
  if (selectedAiCategory) {
    const cat = aiCategories.find((c) => c.id === selectedAiCategory);
    if (!cat) { setSelectedAiCategory(null); return null; }

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <SwipeCards
          questions={cat.questions.map((q) => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            type: q.type as any,
            options: q.options,
            multiSelect: q.multi_select,
          }))}
          categoryName={cat.name}
          onComplete={async (selections) => {
            try {
              const userId = (await supabase.auth.getUser()).data.user!.id;
              const updatedAnswers = { ...(profileAnswers || {}), ...selections };
              const { error } = await supabase
                .from("user_preferences")
                .update({ profile_answers: updatedAnswers, updated_at: new Date().toISOString() })
                .eq("user_id", userId);
              if (error) throw error;
              toast.success("Answers saved!");
              await refetch();
              setAiCategories((prev) => prev.filter((c) => c.id !== cat.id));
            } catch {
              toast.error("Failed to save answers");
            }
            setSelectedAiCategory(null);
          }}
          onBack={() => setSelectedAiCategory(null)}
        />
      </motion.div>
    );
  }

  // Main cover flow
  if (genderLoading) {
    return <p className="text-muted-foreground p-4">Loading...</p>;
  }

  return (
    <div className="h-full flex flex-col pb-16">
      <div className="flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm mb-2">Tap a card to answer questions.</p>

        <div className="relative flex items-center justify-center py-4">
          <Button variant="ghost" size="icon" onClick={goLeft} className="absolute left-4 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="relative w-full h-[420px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {coverCards.map((card, index) => {
                let offset = index - activeIndex;
                const half = coverCards.length / 2;
                if (offset > half) offset -= coverCards.length;
                if (offset < -half) offset += coverCards.length;
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                if (absOffset > 2) return null;

                const xOffset = offset * 180;
                const cardW = isActive ? 260 : 200;
                const cardH = isActive ? 350 : 260;
                const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
                const zIndex = 10 - absOffset;
                const blur = isActive ? 0 : 2;
                const opacity = isActive ? 1 : 0.5;

                const isAi = card.kind === "ai";
                const isTemplate = card.kind === "template";
                const cardId = isAi ? card.category.id : isTemplate ? card.template.id : card.cat.id;

                // Image
                let coverImage = "";
                if (isAi) {
                  const mapped = categoryImageMap[card.category.category] || "style";
                  coverImage = getCategoryImage(mapped, gender as any);
                } else if (isTemplate) {
                  coverImage = templateImageMap[card.template.name] || "";
                } else {
                  coverImage = getCategoryImage(card.cat.id, gender as any);
                }

                // Title & subtitle
                let title = "";
                let subtitle = "";
                if (isAi) {
                  title = card.category.name;
                  subtitle = `${card.category.questions.length} questions`;
                } else if (isTemplate) {
                  title = card.template.name;
                  subtitle = "Tap to fill out";
                } else {
                  const isDone = completedCategories.includes(card.cat.id);
                  const catQCount = onboardingQuestions.filter((q) => q.category === card.cat.id).length;
                  title = card.cat.name;
                  subtitle = isDone ? "Completed" : `${catQCount} questions`;
                }

                const isDone = !isAi && !isTemplate && completedCategories.includes(card.cat.id);

                return (
                  <motion.div
                    key={cardId}
                    animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    style={{ zIndex }}
                    onClick={() => {
                      if (isActive) {
                        if (isAi) setSelectedAiCategory(card.category.id);
                        else if (isTemplate) handleTemplateClick(card.template);
                        else setSelectedCategory(card.cat.id);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${isActive ? "ring-2 ring-primary shadow-2xl" : ""}`}
                      style={{ width: cardW, height: cardH }}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="card-title leading-tight">
                            {title}
                          </h3>
                        </div>
                        {isDone && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--swatch-teal)" }}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {aiLoading && aiCategories.length === 0 && (
                <div className="absolute bottom-4 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: "var(--swatch-teal)" }} />
                  <span className="text-xs text-muted-foreground">Loading more cards...</span>
                </div>
              )}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={goRight} className="absolute right-4 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaires;
