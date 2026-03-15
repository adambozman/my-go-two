import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, Check, Heart } from "lucide-react";
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
  { id: "all", label: "All" },
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

  return { id, name, category, image_url: toSafeString(raw?.image_url) || null, image_prompt: toSafeString(raw?.image_prompt), questions };
};

const Questionnaires = () => {
  const { user } = useAuth();
  const { profileAnswers, loading: contextLoading, refetch } = usePersonalization();

  const [categories, setCategories] = useState<AICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AICategory | null>(null);
  const [activeSection, setActiveSection] = useState("all");

  const fetchCategories = useCallback(async () => {
    if (!user) { setCategories([]); setLoading(false); return; }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("AUTH_REQUIRED");

      const { data: rawData, error } = await supabase.functions.invoke("ai-quizzes", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;

      // supabase.functions.invoke may return string or object
      const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      console.log("ai-quizzes response:", JSON.stringify(data).slice(0, 300), "categories count:", Array.isArray(data?.categories) ? data.categories.length : "NOT_ARRAY");

      const normalized = (Array.isArray(data?.categories) ? data.categories : [])
        .map(sanitizeCategory)
        .filter(Boolean) as AICategory[];

      console.log("Normalized categories:", normalized.length, normalized.map(c => `${c.id}(${c.category})`));
      setCategories(normalized);
      if (!normalized.length) toast.message("No new Know Me quizzes yet — try again in a moment.");
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

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleRefresh = () => { setRefreshing(true); setLoading(true); fetchCategories(); };

  const handleCardClick = (cat: AICategory) => {
    if (!cat.questions.length) { toast.error("That quiz is incomplete. Refreshing..."); fetchCategories(); return; }
    setSelectedCategory(cat);
  };

  const getSectionCategories = (sectionId: string) => {
    if (sectionId === "all") return categories;
    const filters = SECTION_FILTERS[sectionId] || [];
    return categories.filter((cat) => filters.includes(cat.category));
  };

  const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0);
  const sectionsWithCounts = SECTIONS.map((s) => ({ ...s, count: getSectionCategories(s.id).length }));

  /* ── Quiz view ─────────────────────────────── */
  if (selectedCategory) {
    return (
      <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <KnowMeQuizCard
          questions={selectedCategory.questions.map((q) => ({
            id: q.id, title: q.title, subtitle: q.subtitle, type: q.type, options: q.options, multiSelect: q.multi_select,
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
            } catch { toast.error("Failed to save answers"); }
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
      <div className="h-full flex flex-col items-center justify-center gap-5 px-6">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(var(--swatch-teal-rgb), 0.08)" }}
          >
            <Sparkles className="w-7 h-7" style={{ color: "var(--swatch-teal)" }} />
          </div>
        </motion.div>
        <div className="text-center">
          <p
            className="text-base mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}
          >
            Learning about you...
          </p>
          <p className="text-xs" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
            Generating personalized questions
          </p>
        </div>
      </div>
    );
  }

  const currentCards = getSectionCategories(activeSection);
  const heroCard = currentCards[0];
  const restCards = currentCards.slice(1);

  /* ── Main UI ─────────────────────────────── */
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Hero header area */}
      <div className="px-5 pt-4 pb-1">
        <div className="flex items-start justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-1"
            >
              <Heart className="w-4 h-4" style={{ color: "var(--swatch-cedar-grove)" }} />
              <span
                className="text-[11px] uppercase tracking-[0.15em] font-medium"
                style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}
              >
                Personalized for you
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-[32px] leading-[1.05] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}
            >
              Know Me
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[13px]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
            >
              Help your partner find exactly what you love
            </motion.p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {totalQuestions > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{
                  background: "rgba(var(--swatch-cedar-grove-rgb), 0.1)",
                  color: "var(--swatch-cedar-grove)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {totalQuestions} Qs
              </motion.span>
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50"
              style={{ background: "rgba(var(--swatch-teal-rgb), 0.08)" }}
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                style={{ color: "var(--swatch-teal)" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Divider accent */}
      <div className="px-5 py-3">
        <div className="h-px" style={{ background: "linear-gradient(90deg, var(--swatch-teal), transparent 60%)", opacity: 0.2 }} />
      </div>

      {/* Section tabs */}
      <KnowMeSectionTabs
        sections={sectionsWithCounts}
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      {/* Category cards */}
      <div className="flex-1 px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {currentCards.length > 0 ? (
              <div className="space-y-3">
                {/* Hero card — first item gets full-width treatment */}
                {heroCard && (
                  <KnowMeCategoryCard
                    key={heroCard.id}
                    name={heroCard.name}
                    imageUrl={heroCard.image_url}
                    questionCount={heroCard.questions.length}
                    category={heroCard.category}
                    gradientFallback={PLACEHOLDER_GRADIENTS[heroCard.category]}
                    onClick={() => handleCardClick(heroCard)}
                    index={0}
                    isHero
                  />
                )}

                {/* Remaining cards in 2-col masonry-style grid */}
                {restCards.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {restCards.map((cat, i) => (
                      <KnowMeCategoryCard
                        key={cat.id}
                        name={cat.name}
                        imageUrl={cat.image_url}
                        questionCount={cat.questions.length}
                        category={cat.category}
                        gradientFallback={PLACEHOLDER_GRADIENTS[cat.category]}
                        onClick={() => handleCardClick(cat)}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(var(--swatch-teal-rgb), 0.08), rgba(var(--swatch-teal-rgb), 0.15))",
                    boxShadow: "0 8px 24px rgba(var(--swatch-teal-rgb), 0.06)",
                  }}
                >
                  <Check className="w-8 h-8" style={{ color: "var(--swatch-teal)" }} />
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--swatch-cedar-grove)" }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p
                  className="text-lg mb-1 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}
                >
                  All caught up!
                </p>
                <p
                  className="text-xs text-center mb-5 max-w-[220px]"
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}
                >
                  You've answered everything in this section. Want fresh questions?
                </p>
                <button
                  onClick={handleRefresh}
                  className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-all hover:scale-105"
                  style={{
                    color: "#fff",
                    background: "var(--swatch-cedar-grove)",
                    boxShadow: "0 4px 16px rgba(212, 84, 58, 0.25)",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  Generate new questions
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Questionnaires;
