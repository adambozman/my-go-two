import { useState, useEffect, useRef, useCallback } from "react";
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
import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";
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

// Branded gradient SVG for user-created cards (no photo)
const BRANDED_CARD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232d6870'/%3E%3Cstop offset='100%25' stop-color='%231e4a52'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' rx='24' fill='url(%23g)'/%3E%3C/svg%3E";

// ── Level 4: Field fill-out form ──
const FieldForm = ({
  fieldState,
  onSave,
  saving,
  entryName,
  onDelete,
  isEditing,
}: {
  fieldState: FieldState;
  onSave: (values: Record<string, string>) => void;
  saving: boolean;
  entryName: string;
  onDelete?: () => void;
  isEditing: boolean;
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
      <div
        className="w-full max-w-xl rounded-3xl flex flex-col gap-6 p-8"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 40px rgba(45,104,112,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
          border: "1px solid rgba(45,104,112,0.10)",
        }}
      >
        <div className="flex flex-col gap-1">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--swatch-teal)", opacity: 0.7 }}>
            {fieldState.subcategoryName || "Preferences"}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, letterSpacing: "0.04em", color: "var(--swatch-viridian-odyssey)", lineHeight: 1.1 }}>
            {entryName}
          </h2>
        </div>

        <div style={{ height: 1, background: "rgba(45,104,112,0.12)" }} />

        <div className="flex flex-col gap-6">
          {fieldState.subtype.fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-2">
              <label style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--swatch-teal)" }}>
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

        <div className="flex gap-3 mt-2">
          <Button
            onClick={() => onSave(values)}
            disabled={saving}
            className="flex-1 h-12 rounded-full text-base font-semibold"
            style={{ background: "#d4543a", fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em" }}
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-5 h-5 mr-2" />Save</>}
          </Button>
          {isEditing && onDelete && (
            <Button
              onClick={onDelete}
              variant="outline"
              className="h-12 rounded-full px-4"
              style={{ borderColor: "rgba(212,84,58,0.3)", color: "#d4543a" }}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
        </div>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedScrollTop = useRef(0);

  // New multi-entry state
  const [cardKey, setCardKey] = useState<string | null>(null);
  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<CardEntry | null>(null);
  const [showNameDialog, setShowNameDialog] = useState<"group" | "entry" | null>(null);
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
    setActiveGroup(null);
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
    setActiveGroup(null);
  };

  const goBackFromGroups = () => {
    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    // Go back to subcategory if applicable
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
    } else if (activeGroup && cardKey) {
      setBackState({ label: activeGroup, onBack: goBackFromEntries });
    } else if (cardKey) {
      setBackState({ label: leafSubtype?.name || "Groups", onBack: goBackFromGroups });
    } else if (activeSubcategory && coverFlowState) {
      setBackState({ label: activeSubcategory.name, onBack: () => setActiveSubcategory(null) });
    } else if (coverFlowState) {
      setBackState({ label: coverFlowState.name, onBack: clearCoverFlow });
    } else {
      setBackState(null);
    }
  }, [coverFlowState, activeSubcategory, fieldState, cardKey, activeGroup, editingEntry, leafSubtype]);

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
      // Subcategory IS the leaf — go to groups coverflow
      setActiveSubcategory(sc);
      const key = `${coverFlowState?.name}__${coverFlowState?.name || ""}__${sc.name}`;
      setCardKey(key);
      setLeafSubtype(sc as unknown as SubtypeItem);
      setLeafSubcategoryName(coverFlowState?.name);
    }
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    // Instead of opening FieldForm directly, go to groups coverflow
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

  // Entry coverflow items for active group
  const groupEntries = entries.filter(e => e.group_name === activeGroup);
  const entryCoverFlowItems = groupEntries.map(e => ({
    id: e.id,
    label: e.entry_name,
    image: BRANDED_CARD_SVG,
  }));

  const handleGroupSelect = (id: string) => {
    setActiveGroup(id);
  };

  const handleEntrySelect = (id: string) => {
    if (id === "__new_entry__") {
      setNewName("");
      setShowNameDialog("entry");
    } else {
      const entry = entries.find(e => e.id === id);
      if (entry && leafSubtype) {
        setEditingEntry(entry);
        setFieldState({
          subtype: leafSubtype,
          subcategoryName: leafSubcategoryName,
          values: (entry.field_values as Record<string, string>) || {},
        });
      }
    }
  };

  const handleCreateGroup = () => {
    if (!newName.trim()) return;
    setShowNameDialog(null);
    setActiveGroup(newName.trim());
    // Group is created implicitly when first entry is saved
  };

  const handleCreateEntry = () => {
    if (!newName.trim() || !leafSubtype) return;
    setShowNameDialog(null);
    setEditingEntry(null);
    setFieldState({
      subtype: leafSubtype,
      subcategoryName: leafSubcategoryName,
      values: leafSubtype.fields.reduce((acc, f) => ({ ...acc, [f.label]: (f as any).value || "" }), {} as Record<string, string>),
    });
    // Store the entry name temporarily on the editing entry
    setEditingEntry({ entry_name: newName.trim() } as any);
  };

  const handleSave = async (values: Record<string, string>) => {
    if (!user || !cardKey || !activeGroup) return;
    setSaving(true);
    try {
      if (editingEntry?.id) {
        // Update existing entry
        const { error } = await supabase
          .from("card_entries")
          .update({ field_values: values })
          .eq("id", editingEntry.id);
        if (error) throw error;
        toast({ title: "Updated!", description: `${editingEntry.entry_name} saved.` });
      } else {
        // Insert new entry
        const entryName = editingEntry?.entry_name || "Untitled";
        const { error } = await supabase
          .from("card_entries")
          .insert({
            user_id: user.id,
            card_key: cardKey,
            group_name: activeGroup,
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

    // Level 5: Entry coverflow within a group
    if (activeGroup && cardKey) {
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
              className="text-center mb-8"
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
            onClick={() => { setNewName(""); setShowNameDialog("entry"); }}
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
            New Entry
          </button>
        </motion.div>
      );
    }

    // Level 4: Group coverflow
    if (cardKey) {
      return (
        <motion.div
          key="group-coverflow"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full flex flex-col items-center justify-center"
        >
          {groupCoverFlowItems.length > 0 ? (
            <CoverFlowCarousel
              items={groupCoverFlowItems}
              onSelect={handleGroupSelect}
            />
          ) : (
            <p
              className="text-center mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontStyle: "italic",
                color: "var(--swatch-teal)",
                opacity: 0.6,
              }}
            >
              No groups yet
            </p>
          )}
          <button
            onClick={() => { setNewName(""); setShowNameDialog("group"); }}
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
            New Group
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

      {/* Name dialog for creating groups/entries */}
      <Dialog open={!!showNameDialog} onOpenChange={() => setShowNameDialog(null)}>
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
              {showNameDialog === "group" ? "New Group" : "New Entry"}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={showNameDialog === "group" ? "e.g. Taco Bell, McDonald's..." : "e.g. My usual, Late night order..."}
            className="rounded-xl h-12 mt-2"
            style={{ background: "rgba(45,104,112,0.04)", border: "1.5px solid rgba(45,104,112,0.15)" }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                showNameDialog === "group" ? handleCreateGroup() : handleCreateEntry();
              }
            }}
          />
          <DialogFooter>
            <Button
              onClick={showNameDialog === "group" ? handleCreateGroup : handleCreateEntry}
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
