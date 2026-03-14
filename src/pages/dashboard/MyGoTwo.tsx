import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useTopBar } from "@/contexts/TopBarContext";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import TemplateCoverFlow, { type SubtypeItem, type SubcategoryGroup } from "@/components/TemplateCoverFlow";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"];

interface CoverFlowState {
  name: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
}

interface FieldState {
  subtype: SubtypeItem;
  subcategoryName?: string;
  values: Record<string, string>;
}

// ── Level 4: Field fill-out form ──
const FieldForm = ({
  fieldState,
  onBack,
  onSave,
  saving,
}: {
  fieldState: FieldState;
  onBack: () => void;
  onSave: (values: Record<string, string>) => void;
  saving: boolean;
}) => {
  const [values, setValues] = useState<Record<string, string>>(fieldState.values);

  const handleChange = (label: string, value: string) => {
    setValues((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <motion.div
      key="field-form"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full flex flex-col items-center justify-start overflow-y-auto py-8 px-4 md:px-8"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-xl rounded-3xl flex flex-col gap-6 p-8"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 40px rgba(45,104,112,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
          border: "1px solid rgba(45,104,112,0.10)",
        }}
      >
        {/* Card header */}
        <div className="flex flex-col gap-1">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--swatch-teal)",
              opacity: 0.7,
            }}
          >
            {fieldState.subcategoryName || "Preferences"}
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--swatch-viridian-odyssey)",
              lineHeight: 1.1,
            }}
          >
            {fieldState.subtype.name}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(45,104,112,0.12)" }} />

        {/* Fields */}
        <div className="flex flex-col gap-6">
          {fieldState.subtype.fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--swatch-teal)",
                }}
              >
                {field.label}
              </label>
              {field.type === "select" && field.options ? (
                <div className="flex flex-wrap gap-2">
                  {field.options.map((opt) => {
                    const isSelected = values[field.label] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleChange(field.label, isSelected ? "" : opt)}
                        className="transition-all"
                        style={{
                          padding: "8px 18px",
                          borderRadius: 999,
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          background: isSelected ? "var(--swatch-teal)" : "rgba(45,104,112,0.06)",
                          color: isSelected ? "#fff" : "var(--swatch-teal)",
                          border: `1.5px solid ${isSelected ? "var(--swatch-teal)" : "rgba(45,104,112,0.18)"}`,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <Input
                  value={values[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="rounded-xl h-11"
                  style={{ background: "rgba(45,104,112,0.04)", border: "1.5px solid rgba(45,104,112,0.15)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Save button */}
        <Button
          onClick={() => onSave(values)}
          disabled={saving}
          className="w-full h-12 rounded-full text-base font-semibold mt-2"
          style={{ background: "#d4543a", fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em" }}
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Check className="w-5 h-5 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

// ── Main Page ──
const MyGoTwo = () => {
  const { user } = useAuth();
  const { gender, loading: genderLoading } = usePersonalization();
  const { toast } = useToast();
  const { sections, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");

  const { setBackState } = useTopBar();

  const [coverFlowState, setCoverFlowState] = useState<CoverFlowState | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const [fieldState, setFieldState] = useState<FieldState | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Clear subcategory when leaving the coverflow entirely
  const clearCoverFlow = () => {
    setCoverFlowState(null);
    setActiveSubcategory(null);
  };

  // Sync back button to top bar — full 4-level chain
  useEffect(() => {
    if (fieldState) {
      // Level 4 → back to Level 3 (item list inside subcategory)
      setBackState({ label: fieldState.subtype.name, onBack: () => setFieldState(null) });
    } else if (activeSubcategory && coverFlowState) {
      // Level 3 (items) → back to Level 2 (subcategory selector)
      setBackState({ label: activeSubcategory.name, onBack: () => setActiveSubcategory(null) });
    } else if (coverFlowState) {
      // Level 2 (subcategory selector) → back to Level 1 (main scroll)
      setBackState({ label: coverFlowState.name, onBack: clearCoverFlow });
    } else {
      setBackState(null);
    }
  }, [coverFlowState, activeSubcategory, fieldState, setBackState]);

  const handleSelect = (categoryKey: string) => {
    for (const sectionKey of sectionOrder) {
      const items = sections[sectionKey] || [];
      const item = items.find((c) => c.key === categoryKey);
      if (item) {
        handleCategoryClick(item);
        return;
      }
    }
  };

  const handleCategoryClick = (item: CategoryItem) => {
    const subtypes = (item.fields as unknown as SubtypeItem[]) || [];
    const subcategories = item.subcategories as unknown as SubcategoryGroup[] | undefined;

    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setCoverFlowState({ name: item.label, subtypes, subcategories });
    }
  };

  // Fix 4: Actually navigate to field form instead of dead-end console.log
  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    setFieldState({
      subtype,
      subcategoryName,
      values: subtype.fields.reduce((acc, f) => ({ ...acc, [f.label]: f.value || "" }), {}),
    });
  };

  const handleSave = async (values: Record<string, string>) => {
    if (!user || !fieldState) return;
    setSaving(true);
    try {
      const key = `${coverFlowState?.name}__${fieldState.subcategoryName || ""}__${fieldState.subtype.name}`;
      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          favorites: { [key]: values },
        }, { onConflict: "user_id" });

      if (error) throw error;

      toast({ title: "Saved!", description: `${fieldState.subtype.name} updated.` });
      setFieldState(null);
    } catch (e: any) {
      toast({ title: "Error saving", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (registryLoading || genderLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const orderedSections = sectionOrder
    .filter((key) => sections[key] && sections[key].length > 0)
    .map((key) => ({
      key,
      label: sectionLabels[key] ?? key,
      items: sections[key].map((cat) => ({
        id: cat.key,
        label: cat.label,
        image: cat.image,
      })),
    }));

  return (
    <AnimatePresence mode="wait">
      {fieldState ? (
        <FieldForm
          key="field-form"
          fieldState={fieldState}
          onBack={() => setFieldState(null)}
          onSave={handleSave}
          saving={saving}
        />
      ) : coverFlowState ? (
        <TemplateCoverFlow
          key="drilldown"
          templateName={coverFlowState.name}
          subtypes={coverFlowState.subtypes}
          subcategories={coverFlowState.subcategories}
          activeSubcategory={activeSubcategory}
          onSubcategorySelect={setActiveSubcategory}
          onBack={clearCoverFlow}
          onSelect={handleSubtypeSelect}
          creating={false}
          gender={gender}
        />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full overflow-y-auto snap-y snap-mandatory relative"
          style={{ scrollbarWidth: 'none' }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollTop / el.clientHeight);
            setActiveSectionIndex(Math.min(idx, orderedSections.length - 1));
          }}
        >
          {orderedSections.map((section) => (
            <div
              key={section.key}
              className="snap-start h-full flex flex-col items-center justify-center"
            >
              <h2 className="section-header text-center mb-6">{section.label}</h2>
              <GoTwoCoverFlow items={section.items} onSelect={handleSelect} />
            </div>
          ))}
          {orderedSections.length === 0 && (
            <p className="text-muted-foreground text-center mt-12">No categories found.</p>
          )}

          {/* Right-side vertical dots — centered to card stage */}
          <div
            className="fixed flex flex-col items-center gap-2"
            style={{
              right: 18,
              top: 'calc(var(--header-height) + (100vh - var(--header-height) - var(--footer-height)) / 2 + 23px)',
              transform: 'translateY(-50%)',
              zIndex: 50,
            }}
          >
            {orderedSections.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 7,
                  height: i === activeSectionIndex ? 20 : 7,
                  borderRadius: 4,
                  background: i === activeSectionIndex ? '#2d6870' : 'rgba(45,104,112,0.28)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
