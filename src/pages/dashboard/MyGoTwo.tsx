import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Check, Plus, Trash2 } from "lucide-react";
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
import FormCoverFlowCarousel from "@/components/ui/FormCoverFlowCarousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  section: string;
  categoryId: string;
}

interface FieldState {
  subtype: SubtypeItem;
  subcategoryName?: string;
  values: Record<string, string>;
}

interface CardEntry {
  id: string;
  user_id: string;
  card_key: string;
  group_name: string;
  entry_name: string;
  field_values: Record<string, string>;
  created_at: string;
  updated_at: string;
}

const BRANDED_CARD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232d6870'/%3E%3Cstop offset='100%25' stop-color='%231e4a52'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' rx='24' fill='url(%23g)'/%3E%3C/svg%3E";
const NEW_ENTRY_ID = "__new_entry__";

const EntryFormCard = ({
  subtype,
  subcategoryName,
  entryName,
  values,
  saving,
  isEditing,
  onEntryNameChange,
  onChange,
  onSave,
  onDelete,
}: {
  subtype: SubtypeItem;
  subcategoryName?: string;
  entryName: string;
  values: Record<string, string>;
  saving: boolean;
  isEditing: boolean;
  onEntryNameChange: (name: string) => void;
  onChange: (fieldLabel: string, value: string) => void;
  onSave: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-card/95 p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
          {subcategoryName || "Preferences"}
        </p>
      </div>

      <Input
        value={entryName}
        onChange={(e) => onEntryNameChange(e.target.value)}
        placeholder={`Name this ${subtype.name.toLowerCase()} entry`}
        className="rounded-xl h-10 mb-4 bg-background/80"
      />

      <div className="flex-1 overflow-y-auto pr-1 space-y-4" style={{ scrollbarWidth: "none" }}>
        {subtype.fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
              {field.label}
            </label>
            {field.type === "select" && field.options ? (
              <div className="flex flex-wrap gap-2">
                {field.options.map((opt) => {
                  const isSelected = values[field.label] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => onChange(field.label, isSelected ? "" : opt)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/40 text-foreground border-border"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <Input
                value={values[field.label] || ""}
                onChange={(e) => onChange(field.label, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="rounded-xl h-10 bg-background/80"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={onSave} disabled={saving} className="flex-1 h-10 rounded-full bg-primary text-primary-foreground">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" />Save</>}
        </Button>
        {isEditing && (
          <Button onClick={onDelete} variant="outline" className="h-10 rounded-full px-3 text-destructive border-destructive/40">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedScrollTop = useRef(0);

  // Multi-entry state
  const [cardKey, setCardKey] = useState<string | null>(null);
  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<CardEntry | null>(null);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();

  // Fetch entries when cardKey changes
  const fetchEntries = useCallback(async () => {
    if (!user || !cardKey) return;
    const { data } = await supabase
      .from("card_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("card_key", cardKey)
      .order("created_at", { ascending: true });
    setEntries((data as CardEntry[]) || []);
  }, [user, cardKey]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const clearCoverFlow = () => {
    setCoverFlowState(null);
    setActiveSubcategory(null);
    setCardKey(null);
    setEditingEntry(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = savedScrollTop.current;
      }
    });
  };

  const goBackFromField = () => {
    setFieldState(null);
    setEditingEntry(null);
  };

  const goBackFromEntries = () => {
    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    if (activeSubcategory && (!activeSubcategory.products || activeSubcategory.products.length === 0)) {
      setActiveSubcategory(null);
    }
  };

  // Back button wiring
  useEffect(() => {
    if (fieldState && editingEntry) {
      setBackState({ label: editingEntry.entry_name, onBack: goBackFromField });
    } else if (fieldState && !editingEntry) {
      setBackState({ label: "New Entry", onBack: goBackFromField });
    } else if (cardKey) {
      setBackState({ label: leafSubtype?.name || "Entries", onBack: goBackFromEntries });
    } else if (activeSubcategory && coverFlowState) {
      setBackState({ label: activeSubcategory.name, onBack: () => setActiveSubcategory(null) });
    } else if (coverFlowState) {
      setBackState({ label: coverFlowState.name, onBack: clearCoverFlow });
    } else {
      setBackState(null);
    }
  }, [coverFlowState, activeSubcategory, fieldState, cardKey, editingEntry, leafSubtype]);

  const handleCategoryClick = (item: CategoryItem) => {
    if (scrollRef.current) {
      savedScrollTop.current = scrollRef.current.scrollTop;
    }
    const subtypes = (item.fields as unknown as SubtypeItem[]) || [];
    const subcategories = item.subcategories as unknown as SubcategoryGroup[] | undefined;
    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setCoverFlowState({ name: item.label, subtypes, subcategories, section: item.section, categoryId: item.key.replace(/-male$|-female$|-nb$/, "") });
    }
  };

  const handleSelect = (categoryKey: string) => {
    for (const sectionKey of sectionOrder) {
      const items = sections[sectionKey] || [];
      const item = items.find((c) => c.key === categoryKey);
      if (item) { handleCategoryClick(item); return; }
    }
  };

  const handleSubcategorySelect = (sc: SubcategoryGroup) => {
    if (sc.products && sc.products.length > 0) {
      setActiveSubcategory(sc);
    } else {
      // Subcategory IS the leaf — go to entries coverflow
      setActiveSubcategory(sc);
      const key = `${coverFlowState?.name}__${coverFlowState?.name || ""}__${sc.name}`;
      setCardKey(key);
      setLeafSubtype(sc as unknown as SubtypeItem);
      setLeafSubcategoryName(coverFlowState?.name);
    }
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    // Go to entries coverflow
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    setCardKey(key);
    setLeafSubtype(subtype);
    setLeafSubcategoryName(subcategoryName);
  };

  // Group coverflow items
  const distinctGroups = [...new Set(entries.map(e => e.group_name))];
  const groupCoverFlowItems = distinctGroups.map(g => ({
    id: g,
    label: g,
    image: BRANDED_CARD_SVG,
  }));

  // Entry coverflow items — flat, no groups
  const entryCoverFlowItems = entries.map(e => ({
    id: e.id,
    label: e.entry_name,
    image: BRANDED_CARD_SVG,
  }));

  const handleEntrySelect = (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (entry && leafSubtype) {
      setEditingEntry(entry);
      setFieldState({
        subtype: leafSubtype,
        subcategoryName: leafSubcategoryName,
        values: (entry.field_values as Record<string, string>) || {},
      });
    }
  };

  const handleCreateEntry = () => {
    if (!newName.trim() || !leafSubtype) return;
    setShowNameDialog(false);
    setEditingEntry({ entry_name: newName.trim() } as any);
    setFieldState({
      subtype: leafSubtype,
      subcategoryName: leafSubcategoryName,
      values: leafSubtype.fields.reduce((acc, f) => ({ ...acc, [f.label]: (f as any).value || "" }), {} as Record<string, string>),
    });
  };

  const handleSave = async (values: Record<string, string>) => {
    if (!user || !cardKey) return;
    setSaving(true);
    try {
      if (editingEntry?.id) {
        const { error } = await supabase
          .from("card_entries")
          .update({ field_values: values })
          .eq("id", editingEntry.id);
        if (error) throw error;
        toast({ title: "Updated!", description: `${editingEntry.entry_name} saved.` });
      } else {
        const entryName = editingEntry?.entry_name || "Untitled";
        const { error } = await supabase
          .from("card_entries")
          .insert({
            user_id: user.id,
            card_key: cardKey,
            group_name: leafSubtype?.name || "",
            entry_name: entryName,
            field_values: values,
          });
        if (error) throw error;
        toast({ title: "Saved!", description: `${entryName} created.` });
      }
      setFieldState(null);
      setEditingEntry(null);
      await fetchEntries();
    } catch (e: any) {
      toast({ title: "Error saving", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingEntry?.id) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("card_entries")
        .delete()
        .eq("id", editingEntry.id);
      if (error) throw error;
      toast({ title: "Deleted", description: `${editingEntry.entry_name} removed.` });
      setFieldState(null);
      setEditingEntry(null);
      await fetchEntries();
    } catch (e: any) {
      toast({ title: "Error deleting", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (registryLoading || genderLoading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const orderedSections = sectionOrder
    .filter((key) => sections[key] && sections[key].length > 0)
    .map((key) => ({
      key,
      label: sectionLabels[key] ?? key,
      items: sections[key].map((cat) => ({ id: cat.key, label: cat.label, image: cat.image, imageKey: cat.imageKey })),
    }));

  // Determine which view to show
  const renderContent = () => {
    // Level 6: Field form (editing/creating an entry)
    if (fieldState && cardKey) {
      return (
        <FieldForm
          key="field-form"
          fieldState={fieldState}
          onSave={handleSave}
          saving={saving}
          entryName={editingEntry?.entry_name || "New Entry"}
          onDelete={editingEntry?.id ? handleDelete : undefined}
          isEditing={!!editingEntry?.id}
        />
      );
    }

    // Entries coverflow
    if (cardKey) {
      return (
        <motion.div
          key="entry-coverflow"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full flex flex-col items-center justify-center"
        >
          {entryCoverFlowItems.length > 0 ? (
            <CoverFlowCarousel
              items={entryCoverFlowItems}
              onSelect={handleEntrySelect}
            />
          ) : (
            <p
              className="text-center mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontStyle: "italic",
                color: "var(--swatch-teal)",
                opacity: 0.6,
              }}
            >
              No entries yet
            </p>
          )}
          <button
            onClick={() => { setNewName(""); setShowNameDialog(true); }}
            className="mt-8 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            style={{
              padding: "12px 28px",
              borderRadius: 999,
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#fff",
              background: "var(--swatch-cedar-grove)",
              boxShadow: "0 4px 16px rgba(212,84,58,0.25)",
            }}
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </motion.div>
      );
    }

    // Level 2-3: TemplateCoverFlow (subcategory/product picker)
    if (coverFlowState) {
      return (
        <TemplateCoverFlow
          key="drilldown"
          templateName={coverFlowState.name}
          subtypes={coverFlowState.subtypes}
          subcategories={coverFlowState.subcategories}
          activeSubcategory={activeSubcategory}
          onSubcategorySelect={handleSubcategorySelect}
          onBack={clearCoverFlow}
          onSelect={handleSubtypeSelect}
          creating={false}
          gender={gender}
          section={coverFlowState.section}
          categoryId={coverFlowState.categoryId}
        />
      );
    }

    // Level 1: Section coverflows
    return (
      <motion.div
        key="main"
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full overflow-y-auto snap-y snap-mandatory relative"
        style={{ scrollbarWidth: "none" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollTop / el.clientHeight);
          setActiveSectionIndex(Math.min(idx, orderedSections.length - 1));
        }}
      >
        {orderedSections.map((section) => (
          <div key={section.key} className="snap-start h-full flex flex-col items-center justify-center">
            <h2 className="section-header text-center mb-6">{section.label}</h2>
            <GoTwoCoverFlow items={section.items} onSelect={handleSelect} />
          </div>
        ))}
        {orderedSections.length === 0 && (
          <p className="text-muted-foreground text-center mt-12">No categories found.</p>
        )}
        <div
          className="fixed flex flex-col items-center gap-2"
          style={{ right: 18, top: "calc(var(--header-height) + (100vh - var(--header-height) - var(--footer-height)) / 2 + 23px)", transform: "translateY(-50%)", zIndex: 50 }}
        >
          {orderedSections.map((_, i) => (
            <div key={i} style={{ width: 7, height: i === activeSectionIndex ? 20 : 7, borderRadius: 4, background: i === activeSectionIndex ? "#2d6870" : "rgba(45,104,112,0.28)", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      {/* Name dialog for creating entries */}
      <Dialog open={showNameDialog} onOpenChange={() => setShowNameDialog(false)}>
        <DialogContent
          className="rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(45,104,112,0.12)",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--swatch-viridian-odyssey)",
              }}
            >
              Name Your Entry
            </DialogTitle>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. My usual, Taco Bell, Late night..."
            className="rounded-xl h-12 mt-2"
            style={{ background: "rgba(45,104,112,0.04)", border: "1.5px solid rgba(45,104,112,0.15)" }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateEntry();
            }}
          />
          <DialogFooter>
            <Button
              onClick={handleCreateEntry}
              disabled={!newName.trim()}
              className="rounded-full px-8 h-11"
              style={{ background: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyGoTwo;
