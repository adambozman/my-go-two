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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Top 38% — image area with gradient fade into panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "42%",
        background: "linear-gradient(160deg, #1a3a3e 0%, #2d6870 60%, #3d8a96 100%)",
        zIndex: 0,
      }}>
        {/* Subtle noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }} />
        {/* Category label top-left */}
        <div style={{ position: "absolute", top: 18, left: 20 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "'Jost', sans-serif", margin: 0 }}>
            {subcategoryName || subtype.name}
          </p>
        </div>
        {/* Large decorative number/icon top-right */}
        <div style={{ position: "absolute", top: 10, right: 18, opacity: 0.12 }}>
          <span style={{ fontSize: 80, fontFamily: "'Cormorant Garamond', serif", color: "#fff", lineHeight: 1 }}>✦</span>
        </div>
        {/* Entry name — hero text */}
        <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <input
            value={entryName}
            onChange={(e) => onEntryNameChange(e.target.value)}
            placeholder="Name this entry…"
            style={{
              width: "100%", background: "transparent", border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.35)",
              padding: "4px 0 8px", fontSize: 22, fontWeight: 600,
              color: "#fff", outline: "none",
              fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em",
            }}
          />
        </div>
      </div>

      {/* Curved panel rising from bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, top: "36%",
        background: "#efe0cf",
        borderRadius: "28px 28px 0 0",
        zIndex: 1,
        display: "flex", flexDirection: "column",
        padding: "20px 20px 16px",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
      }}>
        {/* Fields */}
        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", gap: 0 }}>
          {subtype.fields.map((field, i) => (
            <div key={field.label} style={{
              paddingBottom: 12,
              marginBottom: 12,
              borderBottom: i < subtype.fields.length - 1 ? "1px solid rgba(45,104,112,0.12)" : "none",
            }}>
              <p style={{ fontSize: 9, fontFamily: "'Jost', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2d6870", marginBottom: 8, fontWeight: 700 }}>
                {field.label}
              </p>
              {field.type === "select" && field.options ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {field.options.map((opt) => {
                    const isSelected = values[field.label] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => onChange(field.label, isSelected ? "" : opt)}
                        style={{
                          padding: "4px 13px", borderRadius: 999, fontSize: 11,
                          fontFamily: "'Jost', sans-serif", fontWeight: 500,
                          border: isSelected ? "1.5px solid #2d6870" : "1px solid rgba(45,104,112,0.2)",
                          background: isSelected ? "#2d6870" : "rgba(255,255,255,0.7)",
                          color: isSelected ? "#fff" : "#3a3a3a",
                          cursor: "pointer", transition: "all 0.15s",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  value={values[field.label] || ""}
                  onChange={(e) => onChange(field.label, e.target.value)}
                  placeholder="—"
                  style={{
                    width: "100%", background: "transparent",
                    border: "none",
                    padding: "2px 0", fontSize: 13, color: "#1a1a1a",
                    outline: "none", fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Save row */}
        <div style={{ display: "flex", gap: 8, paddingTop: 4 }}>
          <button
            onClick={onSave} disabled={saving}
            style={{
              flex: 1, height: 42, borderRadius: 999,
              background: "linear-gradient(135deg, #2d6870 0%, #1a4a52 100%)",
              border: "none", color: "#fff", fontSize: 11, fontWeight: 700,
              fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em",
              textTransform: "uppercase", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(45,104,112,0.4)",
            }}
          >
            {saving ? <Loader2 style={{ width: 13, height: 13 }} className="animate-spin" /> : "Save"}
          </button>
          {isEditing && (
            <button onClick={onDelete} style={{
              width: 42, height: 42, borderRadius: 999,
              background: "rgba(212,84,58,0.1)",
              border: "1px solid rgba(212,84,58,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Trash2 style={{ width: 13, height: 13, color: "#d4543a" }} />
            </button>
          )}
        </div>
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
  const [saving, setSaving] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedScrollTop = useRef(0);

  // Entry coverflow state
  const [cardKey, setCardKey] = useState<string | null>(null);
  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [activeEntryIndex, setActiveEntryIndex] = useState(0);
  const [entryDrafts, setEntryDrafts] = useState<Record<string, Record<string, string>>>({});
  const [entryNames, setEntryNames] = useState<Record<string, string>>({});
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();

  const defaultFieldValues = useMemo(() => {
    if (!leafSubtype) return {} as Record<string, string>;
    return leafSubtype.fields.reduce(
      (acc, field) => ({ ...acc, [field.label]: field.value || "" }),
      {} as Record<string, string>
    );
  }, [leafSubtype]);

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

  useEffect(() => {
    if (!leafSubtype || !cardKey) return;

    const nextDrafts: Record<string, Record<string, string>> = {};
    const nextNames: Record<string, string> = {};

    entries.forEach((entry) => {
      nextDrafts[entry.id] = (entry.field_values as Record<string, string>) || {};
      nextNames[entry.id] = entry.entry_name;
    });

    nextDrafts[NEW_ENTRY_ID] = defaultFieldValues;
    nextNames[NEW_ENTRY_ID] = "";

    setEntryDrafts(nextDrafts);
    setEntryNames(nextNames);
    setActiveEntryIndex((prev) => Math.min(prev, entries.length));

    if (!activeGroup) {
      setActiveGroup(leafSubtype.name);
    }
  }, [entries, leafSubtype, defaultFieldValues, cardKey, activeGroup]);

  const clearCoverFlow = () => {
    setCoverFlowState(null);
    setActiveSubcategory(null);
    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    setActiveEntryIndex(0);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = savedScrollTop.current;
      }
    });
  };

  const goBackFromEntries = () => {
    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    setActiveEntryIndex(0);
    if (activeSubcategory && (!activeSubcategory.products || activeSubcategory.products.length === 0)) {
      setActiveSubcategory(null);
    }
  };

  useEffect(() => {
    if (cardKey) {
      setBackState({ label: leafSubtype?.name || "Entries", onBack: goBackFromEntries });
    } else if (activeSubcategory && coverFlowState) {
      setBackState({ label: activeSubcategory.name, onBack: () => setActiveSubcategory(null) });
    } else if (coverFlowState) {
      setBackState({ label: coverFlowState.name, onBack: clearCoverFlow });
    } else {
      setBackState(null);
    }
  }, [coverFlowState, activeSubcategory, cardKey, leafSubtype]);

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
      if (item) {
        handleCategoryClick(item);
        return;
      }
    }
  };

  const handleSubcategorySelect = (sc: SubcategoryGroup) => {
    if (sc.products && sc.products.length > 0) {
      setActiveSubcategory(sc);
    } else {
      setActiveSubcategory(sc);
      const key = `${coverFlowState?.name}__${coverFlowState?.name || ""}__${sc.name}`;
      setCardKey(key);
      setLeafSubtype(sc as unknown as SubtypeItem);
      setLeafSubcategoryName(coverFlowState?.name);
      setActiveEntryIndex(0);
    }
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    setCardKey(key);
    setLeafSubtype(subtype);
    setLeafSubcategoryName(subcategoryName);
    setActiveEntryIndex(0);
  };

  const entryCoverFlowItems = [
    ...entries.map((entry) => ({
      id: entry.id,
      label: entryNames[entry.id] || entry.entry_name,
      image: BRANDED_CARD_SVG,
    })),
    {
      id: NEW_ENTRY_ID,
      label: entryNames[NEW_ENTRY_ID]?.trim() || "New Card",
      image: BRANDED_CARD_SVG,
    },
  ];

  const handleNameChange = (itemId: string, value: string) => {
    setEntryNames((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleFieldChange = (itemId: string, fieldLabel: string, value: string) => {
    setEntryDrafts((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [fieldLabel]: value,
      },
    }));
  };

  const handleSaveEntry = async (itemId: string) => {
    if (!user || !cardKey || !leafSubtype) return;

    const entryName = (entryNames[itemId] || "").trim() || `${leafSubtype.name} ${entries.length + 1}`;
    const fieldValues = entryDrafts[itemId] || defaultFieldValues;

    setSaving(true);
    try {
      if (itemId === NEW_ENTRY_ID) {
        const { data, error } = await supabase
          .from("card_entries")
          .insert({
            user_id: user.id,
            card_key: cardKey,
            group_name: activeGroup || leafSubtype.name,
            entry_name: entryName,
            field_values: fieldValues,
          })
          .select("*")
          .single();

        if (error) throw error;

        const inserted = data as CardEntry;
        setEntries((prev) => [...prev, inserted]);
        setActiveEntryIndex(entries.length);
        toast({ title: "Saved!", description: `${entryName} created.` });
      } else {
        const { error } = await supabase
          .from("card_entries")
          .update({ entry_name: entryName, field_values: fieldValues })
          .eq("id", itemId);

        if (error) throw error;

        setEntries((prev) => prev.map((entry) => (entry.id === itemId ? { ...entry, entry_name: entryName, field_values: fieldValues } : entry)));
        toast({ title: "Updated!", description: `${entryName} saved.` });
      }
    } catch (e: any) {
      toast({ title: "Error saving", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async (itemId: string) => {
    if (!itemId || itemId === NEW_ENTRY_ID) return;

    setSaving(true);
    try {
      const { error } = await supabase.from("card_entries").delete().eq("id", itemId);
      if (error) throw error;

      setEntries((prev) => prev.filter((entry) => entry.id !== itemId));
      setActiveEntryIndex(0);
      toast({ title: "Deleted", description: "Entry removed." });
    } catch (e: any) {
      toast({ title: "Error deleting", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateGroup = () => {
    if (!groupNameInput.trim()) return;
    setActiveGroup(groupNameInput.trim());
    setShowGroupDialog(false);
    setGroupNameInput("");
    toast({ title: "Group selected", description: `New cards will save under ${groupNameInput.trim()}.` });
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
    if (cardKey && leafSubtype) {
      return (
        <motion.div
          key="entry-coverflow"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full flex flex-col items-center justify-center px-4"
        >
          <FormCoverFlowCarousel
            items={entryCoverFlowItems}
            activeIndex={activeEntryIndex}
            onActiveIndexChange={setActiveEntryIndex}
            renderActiveCard={(item) => (
              <EntryFormCard
                subtype={leafSubtype}
                subcategoryName={leafSubcategoryName}
                entryName={entryNames[item.id] || ""}
                values={entryDrafts[item.id] || defaultFieldValues}
                saving={saving}
                isEditing={item.id !== NEW_ENTRY_ID}
                onEntryNameChange={(name) => handleNameChange(item.id, name)}
                onChange={(fieldLabel, value) => handleFieldChange(item.id, fieldLabel, value)}
                onSave={() => handleSaveEntry(item.id)}
                onDelete={() => handleDeleteEntry(item.id)}
              />
            )}
          />

          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full px-6 h-10 border-border text-foreground"
              onClick={() => setShowGroupDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Group
            </Button>
            {activeGroup && (
              <span className="text-sm text-muted-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>
                Saving to: {activeGroup}
              </span>
            )}
          </div>
        </motion.div>
      );
    }

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

      {/* Group dialog */}
      <Dialog open={showGroupDialog} onOpenChange={() => setShowGroupDialog(false)}>
        <DialogContent className="rounded-3xl bg-card">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'Cormorant Garamond', serif" }}>Create Group</DialogTitle>
          </DialogHeader>
          <Input
            value={groupNameInput}
            onChange={(e) => setGroupNameInput(e.target.value)}
            placeholder="e.g. Taco Bell, McDonald's"
            className="rounded-xl h-12 mt-2"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateGroup();
            }}
          />
          <DialogFooter>
            <Button onClick={handleCreateGroup} disabled={!groupNameInput.trim()} className="rounded-full px-8 h-11">
              <Plus className="w-4 h-4 mr-2" />
              Save Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyGoTwo;
