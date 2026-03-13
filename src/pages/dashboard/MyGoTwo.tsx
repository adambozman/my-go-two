import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CreateCustomCardSheet from "@/components/CreateCustomCardSheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import TemplateCoverFlow, { type SubtypeItem } from "@/components/TemplateCoverFlow";
import type { SubcategoryGroup } from "@/data/templateSubtypes";
import CategoryCoverFlow from "@/components/CategoryCoverFlow";
import { AnimatePresence } from "framer-motion";
import { profileQuestions } from "@/data/profileQuestions";
import { getStyleImage } from "@/lib/imageResolver";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"];

// ── Preferences Section (profile questions cover flow) ──
const PreferencesSection = () => {
  const { profileAnswers, gender, loading: genderLoading } = usePersonalization();
  const imageQuestions = profileQuestions.filter((q) => q.type === "image-grid");

  const [activeIndex, setActiveIndex] = useState(Math.floor(imageQuestions.length / 2));
  useRegisterCarousel(imageQuestions.length, activeIndex, setActiveIndex);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>(() => {
    const saved: Record<string, string[]> = {};
    if (profileAnswers) {
      for (const q of imageQuestions) {
        if (profileAnswers[q.id]) {
          const val = profileAnswers[q.id];
          saved[q.id] = Array.isArray(val) ? (val as string[]) : [val as string];
        }
      }
    }
    return saved;
  });

  const goLeft = () => setActiveIndex((i) => (i - 1 + imageQuestions.length) % imageQuestions.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % imageQuestions.length);

  const questionCoverImages = useMemo(() => {
    const used = new Set<string>();
    const covers: Record<string, string> = {};

    for (const question of imageQuestions) {
      const candidates = question.options
        .map((opt) => getStyleImage(opt.id, gender, question.category))
        .filter((src): src is string => Boolean(src));

      const uniqueCandidate = candidates.find((src) => !used.has(src));
      const selected = uniqueCandidate || candidates[0] || getStyleImage("classic", gender, question.category);

      if (selected) used.add(selected);
      covers[question.id] = selected;
    }

    return covers;
  }, [imageQuestions, gender]);

  const getQuestionCoverImage = (q: (typeof imageQuestions)[0]) => {
    return questionCoverImages[q.id] || getStyleImage("classic", gender, q.category);
  };

  const getOptionImage = (optionId: string, categoryId: string) => {
    return getStyleImage(optionId, gender, categoryId);
  };

  const toggleOption = (questionId: string, optionId: string, multiSelect: boolean) => {
    setSelections((prev) => {
      const current = prev[questionId] || [];
      if (!multiSelect) {
        return { ...prev, [questionId]: current.includes(optionId) ? [] : [optionId] };
      }
      return {
        ...prev,
        [questionId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  // Detail view
  if (selectedQuestion) {
    const question = imageQuestions.find((q) => q.id === selectedQuestion)!;
    const isMulti = question.multiSelect !== false;
    const selected = selections[question.id] || [];

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setSelectedQuestion(null)} className="text-muted-foreground">
          ← Back
        </Button>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
            {question.title}
          </h1>
          <p className="text-muted-foreground text-sm">{question.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleOption(question.id, opt.id, isMulti)}
                className={`relative overflow-hidden transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary scale-[1.03] shadow-xl" : "hover:scale-[1.02] hover:shadow-lg"
                }`}
                style={{ borderRadius: "1.2rem" }}
              >
                <div className="aspect-[4/5] relative">
                  <img src={getOptionImage(opt.id, question.category)} alt={opt.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
                    <span className="card-title leading-tight">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md" style={{ background: "var(--swatch-teal)" }}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Cover flow
  return (
    <div>
      <p className="text-muted-foreground text-xs text-center mb-4">Tap a card to review your preferences.</p>

      <div className="relative flex items-center justify-center py-4">
        <Button variant="ghost" size="icon" onClick={goLeft} className="absolute left-4 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="relative w-full overflow-hidden" style={{ height: CAROUSEL_LAYOUT.stageHeight }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {imageQuestions.map((q, index) => {
              let offset = index - activeIndex;
              const half = imageQuestions.length / 2;
              if (offset > half) offset -= imageQuestions.length;
              if (offset < -half) offset += imageQuestions.length;
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              if (absOffset > CAROUSEL_LAYOUT.maxVisibleOffset) return null;

              const xOffset = offset * CAROUSEL_LAYOUT.xGap;
              const cardW = isActive ? CAROUSEL_LAYOUT.cardWidth : CAROUSEL_LAYOUT.flankWidth;
              const cardH = isActive ? CAROUSEL_LAYOUT.cardHeight : CAROUSEL_LAYOUT.flankHeight;
              const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
              const zIndex = 10 - absOffset;
              const blur = isActive ? 0 : CAROUSEL_LAYOUT.flankBlur;
              const opacity = isActive ? 1 : CAROUSEL_LAYOUT.flankOpacity;
              const answered = (selections[q.id] || []).length > 0;

              return (
                <motion.div
                  key={q.id}
                  animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                  transition={CAROUSEL_LAYOUT.spring}
                  className="absolute cursor-pointer"
                  style={{ zIndex }}
                  onClick={() => (isActive ? setSelectedQuestion(q.id) : setActiveIndex(index))}
                >
                  <div
                    className={`overflow-hidden transition-shadow duration-300 ${isActive ? "ring-2 ring-primary shadow-2xl" : ""}`}
                    style={{ width: cardW, height: cardH, borderRadius: CAROUSEL_LAYOUT.borderRadius }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img src={getQuestionCoverImage(q)} alt={q.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="card-title leading-tight">
                          {q.title}
                        </h3>
                        <p className="text-white/70 text-xs mt-1">
                          {answered ? `${(selections[q.id] || []).length} selected` : "Tap to answer"}
                        </p>
                      </div>
                      {answered && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--swatch-teal)" }}>
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

        <Button variant="ghost" size="icon" onClick={goRight} className="absolute right-4 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

// ── Main MyGoTwo Page ──
const MyGoTwo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { gender, loading: genderLoading } = usePersonalization();
  const navigate = useNavigate();

  const { sections, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");

  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [creating, setCreating] = useState<string | null>(null);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [createSheetCategory, setCreateSheetCategory] = useState<{ key: string; label: string }>({ key: "", label: "" });
  const [coverFlowState, setCoverFlowState] = useState<{
    name: string;
    subtypes: SubtypeItem[];
    subcategories?: SubcategoryGroup[];
    initialSubcategoryId?: string;
  } | null>(null);

  const fetchCustomTemplates = () => {
    if (user) {
      supabase
        .from("custom_templates")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data }) => {
          setCustomTemplates(data ?? []);
        });
    }
  };

  useEffect(() => {
    fetchCustomTemplates();
  }, [user]);

  const openCreateSheet = (categoryKey: string, categoryLabel: string) => {
    setCreateSheetCategory({ key: categoryKey, label: categoryLabel });
    setCreateSheetOpen(true);
  };

  const handleCategoryClick = (item: CategoryItem) => {
    if (!user) {
      toast({ title: "Please log in first", variant: "destructive" });
      return;
    }

    const subtypes = item.fields || [];
    const subcategories = item.subcategories;

    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setCoverFlowState({
        name: item.label,
        subtypes,
        subcategories,
      });
      return;
    }

    // No subtypes — create list directly
    createListFromTemplate(item.label, []);
  };

  const handleSubtypeSelect = async (subtype: SubtypeItem, subcategoryName?: string) => {
    if (!user) return;
    const templateName = coverFlowState?.name;
    const cardTitle = subcategoryName
      ? `${templateName} - ${subcategoryName} - ${subtype.name}`
      : `${templateName} - ${subtype.name}`;
    await createListFromTemplate(cardTitle, subtype.fields as any, undefined, subcategoryName);
  };

  const createListFromTemplate = async (
    name: string,
    fields: any,
    templateId?: string,
    subcategoryName?: string,
  ) => {
    if (!user) return;
    setCreating(name);
    try {
      const { data: newList, error: listError } = await supabase
        .from("lists")
        .insert({ title: name, description: "Created from template", user_id: user.id })
        .select()
        .single();

      if (listError) {
        toast({ title: "Error creating list", description: listError.message, variant: "destructive" });
        setCreating(null);
        return;
      }

      if (newList) {
        const { error: cardError } = await supabase.from("cards").insert({
          title: name,
          fields,
          list_id: newList.id,
          user_id: user.id,
          ...(templateId ? { template_id: templateId } : {}),
        });
        if (cardError)
          toast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });

        setCoverFlowState(null);
        navigate(`/dashboard/lists/${newList.id}`);
      }
    } catch (e: any) {
      toast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
  };

  const handleCustomTemplateClick = async (ct: any) => {
    if (!user) return;
    await createListFromTemplate(ct.name, ct.default_fields);
  };

  const handleDeleteCustomTemplate = async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from("custom_templates").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Template deleted" });
      fetchCustomTemplates();
    }
  };

  // Build grouped sections from registry data
  const grouped = sectionOrder
    .map((sectionKey) => {
      const items = sections[sectionKey] || [];
      const customItems = customTemplates.filter((ct) => ct.category === sectionKey);
      return {
        key: sectionKey,
        label: sectionLabels[sectionKey] ?? sectionKey,
        items,
        customItems,
      };
    })
    .filter((g) => g.items.length > 0 || g.customItems.length > 0);

  return (
    <AnimatePresence mode="wait">
      {coverFlowState ? (
        <CoverFlowWithDots>
          <TemplateCoverFlow
            key="coverflow"
            templateName={coverFlowState.name}
            subtypes={coverFlowState.subtypes}
            subcategories={coverFlowState.subcategories}
            initialSubcategoryId={coverFlowState.initialSubcategoryId}
            onBack={() => setCoverFlowState(null)}
            onSelect={handleSubtypeSelect}
            creating={creating !== null}
            gender={gender}
          />
        </CoverFlowWithDots>
      ) : (
        <div className="h-full relative">
          {registryLoading || genderLoading ? (
            <p className="text-muted-foreground p-4">Loading templates...</p>
          ) : (
            <>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  color: "var(--swatch-teal)",
                  fontWeight: 400,
                }}
                className="absolute top-0 left-0 px-4 pt-1 z-10"
              >
                Tap a card to view or edit your details.
              </p>
              <SnapScrollLayout
                sections={[
                  ...grouped.map((group) => {
                    const allItems = [
                      ...group.items.map((cat) => ({
                        id: cat.key,
                        name: cat.label,
                        image: cat.image,
                        fieldCount: cat.fields?.length || 0,
                        isCustom: false,
                      })),
                      ...group.customItems.map((ct) => ({
                        id: ct.id,
                        name: ct.name,
                        image: ct.image_url || "",
                        fieldCount: Array.isArray(ct.default_fields) ? ct.default_fields.length : 0,
                        isCustom: true,
                      })),
                    ];
                    return {
                      id: group.key,
                      label: group.label,
                      content: (
                        <CategoryCoverFlow
                          items={allItems}
                          onSelect={(id) => {
                            const cat = group.items.find((c) => c.key === id);
                            if (cat) {
                              handleCategoryClick(cat);
                              return;
                            }
                            const ct = customTemplates.find((c) => c.id === id);
                            if (ct) handleCustomTemplateClick(ct);
                          }}
                          onAdd={() => openCreateSheet(group.key, group.label)}
                          onDelete={handleDeleteCustomTemplate}
                          disabled={creating !== null}
                        />
                      ),
                    };
                  }),
                  {
                    id: "preferences",
                    label: "My Preferences",
                    content: <PreferencesSection />,
                  },
                ]}
              />
            </>
          )}

          <CreateCustomCardSheet
            open={createSheetOpen}
            onOpenChange={setCreateSheetOpen}
            category={createSheetCategory.key}
            categoryLabel={createSheetCategory.label}
            onCreated={fetchCustomTemplates}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
