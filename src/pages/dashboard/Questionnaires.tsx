import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SwipeCards from "@/components/SwipeCards";
import SnapScrollLayout from "@/components/SnapScrollLayout";
import KnowMeCarousel, { type KnowMeCard } from "@/components/KnowMeCarousel";

/* ── Types ─────────────────────────────────────────── */
interface AICategory {
  id: string;
  name: string;
  category: string; // style | sizing | lifestyle | gifting | products
  image_url: string | null;
  image_prompt: string;
  questions: {
    id: string;
    title: string;
    subtitle: string;
    type: "pill-select" | "single-select";
    multi_select: boolean;
    options: { id: string; label: string }[];
  }[];
}

/* ── Section config ────────────────────────────────── */
const SECTION_FILTERS: Record<string, string[]> = {
  "style-fit": ["style", "sizing"],
  shopping: ["products"],
  "lifestyle-gifts": ["lifestyle", "gifting"],
};

const SECTIONS = [
  { id: "style-fit", label: "Style & Fit" },
  { id: "shopping", label: "Shopping" },
  { id: "lifestyle-gifts", label: "Lifestyle & Gifts" },
];

/* ── Placeholder gradient for cards without AI image ── */
const PLACEHOLDER_GRADIENTS: Record<string, string> = {
  style: "linear-gradient(135deg, #d4a574 0%, #8b6f5a 100%)",
  sizing: "linear-gradient(135deg, #a3b18a 0%, #6b7f5c 100%)",
  products: "linear-gradient(135deg, #c9a96e 0%, #8b7355 100%)",
  lifestyle: "linear-gradient(135deg, #b5838d 0%, #6d6875 100%)",
  gifting: "linear-gradient(135deg, #d4543a 0%, #a84332 100%)",
};

const Questionnaires = () => {
  const { user } = useAuth();
  const { profileAnswers, gender, loading: genderLoading, refetch } = usePersonalization();

  const [categories, setCategories] = useState<AICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<AICategory | null>(null);

  /* ── Fetch AI categories ─────────────────────────── */
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error("Please log in to use Know Me.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.functions.invoke("ai-quizzes", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      if (data?.categories) setCategories(data.categories);
    } catch (e: any) {
      console.error("AI quizzes error:", e);
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
      else toast.error("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* ── Handle card click → open swipe quiz ─────────── */
  const handleCardClick = (card: KnowMeCard) => {
    const cat = categories.find((c) => c.id === card.id);
    if (cat) setSelectedCategory(cat);
  };

  /* ── Build cards for a section ───────────────────── */
  const buildSectionCards = (sectionId: string): KnowMeCard[] => {
    const filters = SECTION_FILTERS[sectionId] || [];
    return categories
      .filter((cat) => filters.includes(cat.category))
      .map((cat) => ({
        id: cat.id,
        kind: "ai" as const,
        title: cat.name,
        image: cat.image_url || "",
        placeholderGradient: !cat.image_url ? PLACEHOLDER_GRADIENTS[cat.category] : undefined,
      }));
  };

  /* ── Swipe quiz view ─────────────────────────────── */
  if (selectedCategory) {
    return (
      <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <SwipeCards
          questions={selectedCategory.questions.map((q) => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            type: q.type as any,
            options: q.options,
            multiSelect: q.multi_select,
          }))}
          categoryName={selectedCategory.name}
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
              // Remove completed category from local state
              setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
            } catch {
              toast.error("Failed to save answers");
            }
            setSelectedCategory(null);
          }}
          onBack={() => setSelectedCategory(null)}
        />
      </motion.div>
    );
  }

  /* ── Main view ───────────────────────────────────── */
  if (genderLoading) {
    return <p className="text-muted-foreground p-4">Loading...</p>;
  }

  return (
    <div className="h-full relative">
      <p
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#2D6870", fontWeight: 400 }}
        className="absolute top-0 left-0 px-4 pt-1 z-10"
      >
        Tap a card to view or edit your details.
      </p>
      <SnapScrollLayout
        sections={SECTIONS.map((section) => ({
          id: section.id,
          label: section.label,
          content: (
            <KnowMeCarousel
              cards={buildSectionCards(section.id)}
              onCardClick={handleCardClick}
              loading={loading}
            />
          ),
        }))}
      />
    </div>
  );
};

export default Questionnaires;
