import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, Check } from "lucide-react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import KnowMeSectionTabs from "@/components/knowme/KnowMeSectionTabs";
import KnowMeCategoryCard from "@/components/knowme/KnowMeCategoryCard";
import KnowMeQuizCard from "@/components/knowme/KnowMeQuizCard";

/* ── Types ─────────────────────────────────────────── */
interface AICategory {
  id: string;
  name: string;
  category: string;
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
  "style-fit": ["style", "sizing", "colors"],
  shopping: ["products", "brands"],
  "lifestyle-gifts": ["lifestyle", "gifting", "love-language", "dates"],
};

const SECTIONS = [
  { id: "style-fit", label: "Style & Fit" },
  { id: "shopping", label: "Shopping" },
  { id: "lifestyle-gifts", label: "Lifestyle & Gifts" },
];

const PLACEHOLDER_GRADIENTS: Record<string, string> = {
  style: "linear-gradient(135deg, #d4a574 0%, #8b6f5a 100%)",
  sizing: "linear-gradient(135deg, #a3b18a 0%, #6b7f5c 100%)",
  colors: "linear-gradient(135deg, #c9a96e 0%, #e8c6ae 100%)",
  products: "linear-gradient(135deg, #c9a96e 0%, #8b7355 100%)",
  brands: "linear-gradient(135deg, #8b7355 0%, #6b5b45 100%)",
  lifestyle: "linear-gradient(135deg, #b5838d 0%, #6d6875 100%)",
  gifting: "linear-gradient(135deg, #d4543a 0%, #a84332 100%)",
  "love-language": "linear-gradient(135deg, #c9707d 0%, #a84332 100%)",
  dates: "linear-gradient(135deg, #d4a574 0%, #b5838d 100%)",
};

const VALID_CATEGORY_TYPES = new Set([
  "style", "sizing", "colors", "lifestyle", "gifting", "products", "brands", "love-language", "dates",
]);

const toSafeString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const sanitizeCategory = (raw: any): AICategory | null => {
  const category = toSafeString(raw?.category);
  if (!VALID_CATEGORY_TYPES.has(category)) return null;

  const name = toSafeString(raw?.name) || toSafeString(raw?.title);
  const fallbackIdSource = toSafeString(raw?.id) || name;
  const id = fallbackIdSource
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const questions = (Array.isArray(raw?.questions) ? raw.questions : [])
    .map((q: any) => {
      const title = toSafeString(q?.title);
      const subtitle = toSafeString(q?.subtitle);
      const options = (Array.isArray(q?.options) ? q.options : [])
        .map((opt: any) => {
          const label = toSafeString(opt?.label) || toSafeString(opt?.title);
          const optionIdSource = toSafeString(opt?.id) || label;
          const optionId = optionIdSource
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          if (!label || !optionId) return null;
          return { id: optionId, label };
        })
        .filter(Boolean) as { id: string; label: string }[];

      const type = q?.type === "single-select" ? "single-select" : "pill-select";
      if (!title || options.length === 0) return null;

      return {
        id: toSafeString(q?.id) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title,
        subtitle: subtitle || "Pick what fits best.",
        type,
        multi_select: q?.multi_select !== false,
        options,
      };
    })
    .filter(Boolean) as AICategory["questions"];

  if (!id || !name || questions.length === 0) return null;

  return {
    id,
    name,
    category,
    image_url: toSafeString(raw?.image_url) || null,
    image_prompt: toSafeString(raw?.image_prompt),
    questions,
  };
};

const Questionnaires = () => {
  const { user } = useAuth();
  const { profileAnswers, loading: contextLoading, refetch } = usePersonalization();

  const [categories, setCategories] = useState<AICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AICategory | null>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  const fetchCategories = useCallback(async () => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("AUTH_REQUIRED");

      const { data, error } = await supabase.functions.invoke("ai-quizzes", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;

      const normalized = (Array.isArray(data?.categories) ? data.categories : [])
        .map(sanitizeCategory)
        .filter(Boolean) as AICategory[];

      setCategories(normalized);

      if (!normalized.length) {
        toast.message("No new Know Me quizzes yet — try again in a moment.");
      }
    } catch (e: any) {
      console.error("AI quizzes error:", e);
      if (e?.message === "AUTH_REQUIRED") return;
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
      else toast.error("Failed to load questions.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    fetchCategories();
  };

  const handleCardClick = (cat: AICategory) => {
    if (!cat.questions.length) {
      toast.error("That quiz is incomplete. Refreshing...");
      fetchCategories();
      return;
    }
    setSelectedCategory(cat);
  };

  const getSectionCategories = (sectionId: string) => {
    const filters = SECTION_FILTERS[sectionId] || [];
    return categories.filter((cat) => filters.includes(cat.category));
  };

  const sectionsWithCounts = SECTIONS.map((s) => ({
    ...s,
    count: getSectionCategories(s.id).length,
  }));

  /* ── Quiz view ─────────────────────────────── */
  if (selectedCategory) {
    return (
      <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <KnowMeQuizCard
          questions={selectedCategory.questions.map((q) => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            type: q.type,
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

  /* ── Loading state ─────────────────────────── */
  if (contextLoading || loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8" style={{ color: "var(--swatch-teal)" }} />
        </motion.div>
        <p
          className="text-sm text-center"
          style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
        >
          Generating your personalized questions...
        </p>
      </div>
    );
  }

  const currentCards = getSectionCategories(activeSection);

  /* ── Main UI ─────────────────────────────── */
  return (
    <div className="h-full flex flex-col">
      {/* Title area */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}
          >
            Know Me
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
          >
            Help your partner find exactly what you love
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2.5 rounded-full transition-colors hover:bg-black/5 disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4.5 h-4.5 ${refreshing ? "animate-spin" : ""}`}
            style={{ color: "var(--swatch-teal)" }}
          />
        </button>
      </div>

      {/* Section tabs */}
      <KnowMeSectionTabs
        sections={sectionsWithCounts}
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      {/* Category cards grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid grid-cols-2 gap-3"
          >
            {currentCards.length > 0 ? (
              currentCards.map((cat, i) => (
                <KnowMeCategoryCard
                  key={cat.id}
                  name={cat.name}
                  imageUrl={cat.image_url}
                  questionCount={cat.questions.length}
                  gradientFallback={PLACEHOLDER_GRADIENTS[cat.category]}
                  onClick={() => handleCardClick(cat)}
                  index={i}
                />
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center py-16">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}
                >
                  <Check className="w-6 h-6" style={{ color: "var(--swatch-teal)" }} />
                </div>
                <p
                  className="text-sm text-center"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                >
                  All caught up in this section!
                </p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 text-xs font-medium px-4 py-2 rounded-full transition-colors"
                  style={{ color: "var(--swatch-teal)", background: "rgba(var(--swatch-teal-rgb), 0.1)" }}
                >
                  Generate new questions
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Questionnaires;
