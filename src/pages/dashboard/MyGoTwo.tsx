import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import CreateCustomCardSheet from "@/components/CreateCustomCardSheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import GoTwoText from "@/components/GoTwoText";
import TemplateCoverFlow, { type SubtypeItem } from "@/components/TemplateCoverFlow";
import { allTemplateSubtypes, templateSubcategories, filterSubtypesByGender, filterSubcategoriesByGender } from "@/data/templateSubtypes";
import CategoryCoverFlow from "@/components/CategoryCoverFlow";
import { AnimatePresence } from "framer-motion";
import { profileQuestions } from "@/data/profileQuestions";
import { getStyleImage } from "@/data/genderImages";
import { getTemplateImage as resolveTemplateImage } from "@/data/templateImageResolver";

const categoryLabels: Record<string, string> = {
  personal: "Personal",
  "food-drink": "Food & Drink",
  "gifts-occasions": "Gifts & Occasions",
  experiences: "Experiences",
  preferences: "Preferences",
};

const categoryOrder = ["personal", "food-drink", "gifts-occasions", "experiences"];

// ── Preferences Section (profile questions cover flow) ──
const PreferencesSection = () => {
  const { profileAnswers } = usePersonalization();
  const gender = (profileAnswers?.identity as string) || "male";
  const imageQuestions = profileQuestions.filter((q) => q.type === "image-grid");

  const [activeIndex, setActiveIndex] = useState(Math.floor(imageQuestions.length / 2));
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

  const getQuestionCoverImage = (q: (typeof imageQuestions)[0]) => {
    const firstOpt = q.options[0];
    const genderImg = getStyleImage(firstOpt.id, gender as any);
    if (genderImg) return genderImg;
    return firstOpt.localImage || firstOpt.image || "";
  };

  const getOptionImage = (optionId: string, fallbackLocal?: string, fallbackUrl?: string) => {
    const genderImg = getStyleImage(optionId, gender as any);
    if (genderImg) return genderImg;
    return fallbackLocal || fallbackUrl || "";
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
                  <img src={getOptionImage(opt.id, opt.localImage, opt.image)} alt={opt.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
                    <span className="text-sm font-semibold text-white leading-tight drop-shadow">{opt.label}</span>
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
    <div className="mb-10">
      <h3 className="text-base font-semibold text-muted-foreground mb-2 text-center">My Preferences</h3>
      <p className="text-muted-foreground text-xs text-center mb-4">Tap a card to review your preferences.</p>

      <div className="relative flex items-center justify-center">
        <Button variant="ghost" size="icon" onClick={goLeft} className="absolute left-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="relative w-full h-[420px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {imageQuestions.map((q, index) => {
              let offset = index - activeIndex;
              const half = imageQuestions.length / 2;
              if (offset > half) offset -= imageQuestions.length;
              if (offset < -half) offset += imageQuestions.length;
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
              const answered = (selections[q.id] || []).length > 0;

              return (
                <motion.div
                  key={q.id}
                  animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute cursor-pointer"
                  style={{ zIndex }}
                  onClick={() => (isActive ? setSelectedQuestion(q.id) : setActiveIndex(index))}
                >
                  <div
                    className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${isActive ? "ring-2 ring-primary shadow-2xl" : ""}`}
                    style={{ width: cardW, height: cardH }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img src={getQuestionCoverImage(q)} alt={q.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-sm leading-tight drop-shadow" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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

        <Button variant="ghost" size="icon" onClick={goRight} className="absolute right-0 z-20 rounded-full bg-background/80 backdrop-blur shadow-md">
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
  const { profileAnswers } = usePersonalization();
  const navigate = useNavigate();
  const location = useLocation();
  const gender = (profileAnswers?.identity as string) || "male";

  const getTemplateImage = (name: string) => resolveTemplateImage(name, gender);

  interface Template {
    id: string;
    name: string;
    icon: string | null;
    category: string;
    default_fields: any;
  }


  const [templates, setTemplates] = useState<Template[]>([]);
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [createSheetCategory, setCreateSheetCategory] = useState<{ key: string; label: string }>({ key: "", label: "" });
  const [coverFlowTemplate, setCoverFlowTemplate] = useState<{ name: string; subtypes: SubtypeItem[]; subcategories?: import("@/data/templateSubtypes").SubcategoryGroup[] } | null>(null);

  useEffect(() => {
    const state = location.state as { openTemplate?: string } | null;
    if (state?.openTemplate && allTemplateSubtypes[state.openTemplate]) {
      setCoverFlowTemplate({ name: state.openTemplate, subtypes: allTemplateSubtypes[state.openTemplate] });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchTemplates = () => {
    supabase.from("card_templates").select("*").then(({ data }) => {
      setTemplates(data ?? []);
      setLoading(false);
    });
    if (user) {
      supabase.from("custom_templates").select("*").eq("user_id", user.id).then(({ data }) => {
        setCustomTemplates(data ?? []);
      });
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [user]);

  const openCreateSheet = (categoryKey: string, categoryLabel: string) => {
    setCreateSheetCategory({ key: categoryKey, label: categoryLabel });
    setCreateSheetOpen(true);
  };

  const handleTemplateClick = async (template: Template) => {
    if (!user) {
      toast({ title: "Please log in first", variant: "destructive" });
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
        toast({ title: "Error creating list", description: listError.message, variant: "destructive" });
        setCreating(null);
        return;
      }
      if (newList) {
        const { error: cardError } = await supabase.from("cards").insert({
          title: name, fields, list_id: newList.id, user_id: user.id,
          ...(templateId ? { template_id: templateId } : {}),
        });
        if (cardError) toast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });
        const fromTemplate = coverFlowTemplate?.name;
        setCoverFlowTemplate(null);
        navigate(`/dashboard/lists/${newList.id}`, { state: { fromTemplate } });
      }
    } catch (e: any) {
      toast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
  };

  const grouped = categoryOrder
    .map((cat) => {
      const systemItems = templates.filter((t) => t.category === cat);
      const customItems = customTemplates.filter((ct) => ct.category === cat);
      return {
        key: cat,
        label: categoryLabels[cat] ?? cat,
        items: systemItems,
        customItems,
      };
    })
    .filter((g) => g.items.length > 0 || g.customItems.length > 0);

  const handleCustomTemplateClick = async (ct: any) => {
    if (!user) return;
    await createListFromTemplate(ct.name, ct.default_fields, undefined);
  };

  const handleDeleteCustomTemplate = async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from("custom_templates").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Template deleted" });
      fetchTemplates();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {coverFlowTemplate ? (
        <TemplateCoverFlow
          key="coverflow"
          templateName={coverFlowTemplate.name}
          subtypes={coverFlowTemplate.subtypes}
          subcategories={coverFlowTemplate.subcategories}
          onBack={() => setCoverFlowTemplate(null)}
          onSelect={handleSubtypeSelect}
          creating={creating !== null}
          gender={gender}
        />
      ) : (
        <div className="max-w-5xl">
          {/* Templates by Category */}
          <div className="mb-10">
            {loading ? (
              <p className="text-muted-foreground">Loading templates...</p>
            ) : (
              grouped.map((group) => {
                const allItems = [
                  ...group.items.map((t) => ({
                    id: t.id,
                    name: t.name,
                    image: getTemplateImage(t.name),
                    fieldCount: Array.isArray(t.default_fields) ? t.default_fields.length : 0,
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

                return (
                  <div key={group.key} className="mb-10">
                    <h3 className="text-base font-semibold text-muted-foreground mb-4 text-center">{group.label}</h3>
                    <CategoryCoverFlow
                      items={allItems}
                      onSelect={(id) => {
                        const t = templates.find((tpl) => tpl.id === id);
                        if (t) {
                          handleTemplateClick(t);
                          return;
                        }
                        const ct = customTemplates.find((c) => c.id === id);
                        if (ct) handleCustomTemplateClick(ct);
                      }}
                      onAdd={() => openCreateSheet(group.key, group.label)}
                      onDelete={handleDeleteCustomTemplate}
                      disabled={creating !== null}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Preferences Section */}
          <PreferencesSection />

          {/* Custom Card Creation Sheet */}
          <CreateCustomCardSheet
            open={createSheetOpen}
            onOpenChange={setCreateSheetOpen}
            category={createSheetCategory.key}
            categoryLabel={createSheetCategory.label}
            onCreated={fetchTemplates}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
