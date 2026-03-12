import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { getCategoryImage } from "@/data/genderImages";
import { getTemplateImage } from "@/data/templateImageResolver";
import {
  onboardingCategories,
  getQuestionsForGender,
} from "@/data/onboardingQuestions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SwipeCards from "@/components/SwipeCards";
import { allTemplateSubtypes, templateSubcategories, filterSubtypesByGender, filterSubcategoriesByGender } from "@/data/templateSubtypes";
import TemplateCoverFlow, { type SubtypeItem } from "@/components/TemplateCoverFlow";
import { useToast } from "@/hooks/use-toast";
import CoverFlowWithDots from "@/components/CoverFlowWithDots";
import SnapScrollLayout from "@/components/SnapScrollLayout";
import KnowMeCarousel, { type KnowMeCard } from "@/components/KnowMeCarousel";

// Template images for preferences category (gender-neutral ones that don't have gendered variants)
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";

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

// Gender-aware template image resolver — uses getTemplateImage for gendered templates,
// falls back to static imports for gender-neutral ones
function getTemplateImageForCard(templateName: string, gender: string): string {
  // Try gendered resolver first
  const gendered = getTemplateImage(templateName, gender);
  if (gendered) return gendered;
  // Static fallbacks for templates without gendered variants
  const staticMap: Record<string, string> = {
    "Love Language": imgLoveLanguage,
    "Pet Peeves": imgPetPeeves,
  };
  return staticMap[templateName] || "";
}

// Which onboarding categories go in which section
const SECTION_MAP: Record<string, string> = {
  style: "style-fit",
  fit: "style-fit",
  shopping: "shopping",
  food: "lifestyle-gifts",
  gifts: "lifestyle-gifts",
  lifestyle: "lifestyle-gifts",
};

// Which templates go in which section
const TEMPLATE_SECTION_MAP: Record<string, string> = {
  "Brand Preferences": "shopping",
  "Specific Product Versions": "shopping",
  "Love Language": "lifestyle-gifts",
  "Pet Peeves": "lifestyle-gifts",
};

// Which AI categories go in which section
const AI_SECTION_MAP: Record<string, string> = {
  style: "style-fit",
  sizing: "style-fit",
  products: "shopping",
  lifestyle: "lifestyle-gifts",
  gifting: "lifestyle-gifts",
};

const Questionnaires = () => {
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const { profileAnswers, gender, loading: genderLoading, refetch } = usePersonalization();

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
  const [coverFlowTemplate, setCoverFlowTemplate] = useState<{ name: string; subtypes: SubtypeItem[]; subcategories?: import("@/data/templateSubtypes").SubcategoryGroup[]; initialSubcategoryId?: string } | null>(() => {
    const saved = sessionStorage.getItem("knowme_coverflow");
    if (saved) {
      sessionStorage.removeItem("knowme_coverflow");
      try {
        const { template, subcategory } = JSON.parse(saved);
        const rawSub = allTemplateSubtypes[template];
        const rawSubcats = templateSubcategories[template];
        if (rawSub || rawSubcats) {
          return {
            name: template,
            subtypes: rawSub ? filterSubtypesByGender(rawSub, gender) : [],
            subcategories: rawSubcats ? filterSubcategoriesByGender(rawSubcats, gender) : undefined,
            initialSubcategoryId: subcategory || undefined,
          };
        }
      } catch {}
    }
    return null;
  });

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
    await createListFromTemplate(cardTitle, subtype.fields as any, undefined, subcategoryName);
  };

  const createListFromTemplate = async (name: string, fields: any, templateId?: string, subcategoryName?: string) => {
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
        if (coverFlowTemplate?.name) {
          const subId = subcategoryName ? coverFlowTemplate.subcategories?.find(sc => sc.name === subcategoryName)?.id : undefined;
          sessionStorage.setItem("knowme_coverflow", JSON.stringify({ template: coverFlowTemplate.name, subcategory: subId || null }));
        }
        setCoverFlowTemplate(null);
        navigate(`/dashboard/lists/${newList.id}`);
      }
    } catch (e: any) {
      uiToast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
  };

  // Handle card click from carousel
  const handleCardClick = (card: KnowMeCard) => {
    if (card.kind === "onboarding") {
      setSelectedCategory(card.id);
    } else if (card.kind === "ai") {
      setSelectedAiCategory(card.id);
    } else if (card.kind === "template") {
      const template = prefTemplates.find((t) => t.id === card.id);
      if (template) handleTemplateClick(template);
    }
  };

  // Build cards grouped by section
  const buildSectionCards = (sectionId: string): KnowMeCard[] => {
    const cards: KnowMeCard[] = [];

    // Onboarding categories for this section
    for (const cat of onboardingCategories) {
      if (SECTION_MAP[cat.id] === sectionId) {
        cards.push({
          id: cat.id,
          kind: "onboarding",
          title: cat.name,
          image: getCategoryImage(cat.id, gender as any),
          isDone: completedCategories.includes(cat.id),
        });
      }
    }

    // Templates for this section
    for (const t of prefTemplates) {
      if (TEMPLATE_SECTION_MAP[t.name] === sectionId) {
        cards.push({
          id: t.id,
          kind: "template",
          title: t.name,
          image: getTemplateImageForCard(t.name, gender),
        });
      }
    }

    // AI quizzes for this section
    for (const ai of aiCategories) {
      if ((AI_SECTION_MAP[ai.category] || "lifestyle-gifts") === sectionId) {
        const mapped = categoryImageMap[ai.category] || "style";
        cards.push({
          id: ai.id,
          kind: "ai",
          title: ai.name,
          image: getCategoryImage(mapped, gender as any),
        });
      }
    }

    return cards;
  };

  // Subtype cover flow view
  if (coverFlowTemplate) {
    return (
      <CoverFlowWithDots>
        <TemplateCoverFlow
          templateName={coverFlowTemplate.name}
          subtypes={coverFlowTemplate.subtypes}
          subcategories={coverFlowTemplate.subcategories}
          initialSubcategoryId={coverFlowTemplate.initialSubcategoryId}
          onBack={() => setCoverFlowTemplate(null)}
          onSelect={handleSubtypeSelect}
          creating={creating !== null}
          gender={gender}
        />
      </CoverFlowWithDots>
    );
  }

  // Onboarding category swipe view
  if (selectedCategory) {
    const catName = onboardingCategories.find((c) => c.id === selectedCategory)?.name || "";
    const categoryQuestions = onboardingQuestions.filter((q) => q.category === selectedCategory);

    return (
      <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
      <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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

  // Main view with snap scroll sections
  if (genderLoading) {
    return <p className="text-muted-foreground p-4">Loading...</p>;
  }

  const sections = [
    { id: "style-fit", label: "Style & Fit" },
    { id: "shopping", label: "Shopping" },
    { id: "lifestyle-gifts", label: "Lifestyle & Gifts" },
  ];

  return (
    <div className="h-full relative">
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#2D6870", fontWeight: 400 }} className="absolute top-0 left-0 px-4 pt-1 z-10">Tap a card to view or edit your details.</p>
      <SnapScrollLayout
        sections={sections.map((section) => ({
          id: section.id,
          label: section.label,
          content: (
            <KnowMeCarousel
              cards={buildSectionCards(section.id)}
              onCardClick={handleCardClick}
              loading={aiLoading && aiCategories.length === 0}
            />
          ),
        }))}
      />
    </div>
  );
};

export default Questionnaires;
