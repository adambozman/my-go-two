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
      className="h-full flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-8 pt-4 pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8 p-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
        </Button>
        <div>
          <h2 className="section-header">{fieldState.subtype.name}</h2>
          {fieldState.subcategoryName && (
            <p className="text-xs" style={{ color: "var(--swatch-teal)", fontStyle: "italic" }}>
              {fieldState.subcategoryName}
            </p>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 px-4 md:px-8 py-4 space-y-4 max-w-lg">
        {fieldState.subtype.fields.map((field) => (
          <div key={field.label} className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--swatch-viridian-odyssey)" }}
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
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: isSelected ? "var(--swatch-teal)" : "rgba(45,104,112,0.08)",
                        color: isSelected ? "#fff" : "var(--swatch-teal)",
                        border: `1.5px solid ${isSelected ? "var(--swatch-teal)" : "rgba(45,104,112,0.2)"}`,
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
              />
            )}
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="px-4 md:px-8 pb-8 pt-2">
        <Button
          onClick={() => onSave(values)}
          disabled={saving}
          className="w-full max-w-lg h-12 rounded-full text-base font-semibold"
          style={{ background: "#d4543a" }}
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
  const [fieldState, setFieldState] = useState<FieldState | null>(null);
  const [saving, setSaving] = useState(false);

  // Sync back button to top bar
  useEffect(() => {
    if (fieldState) {
      setBackState({ label: fieldState.subtype.name, onBack: () => setFieldState(null) });
    } else if (coverFlowState) {
      setBackState({ label: coverFlowState.name, onBack: () => setCoverFlowState(null) });
    } else {
      setBackState(null);
    }
  }, [coverFlowState, fieldState, setBackState]);

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
          onBack={() => setCoverFlowState(null)}
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
          className="h-full overflow-y-auto snap-y snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {orderedSections.map((section) => (
            <div
              key={section.key}
              className="snap-start h-full flex flex-col items-center justify-center"
            >
              <h2 className="section-header text-center mb-6">{section.label}</h2>
              <div className="gotwo-coverflow-scale">
                <GoTwoCoverFlow items={section.items} onSelect={handleSelect} />
              </div>
            </div>
          ))}
          {orderedSections.length === 0 && (
            <p className="text-muted-foreground text-center mt-12">No categories found.</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
