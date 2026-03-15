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

/**
 * EntryFormCard — editorial magazine-style form rendered inside the coverflow card.
 * Inspired by fashion lookbook layouts: generous whitespace, serif display type,
 * coral accents, and clean field styling on a warm linen background.
 */
const EntryFormCard = ({
  subtype,
  subcategoryName,
  categoryName,
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
  categoryName?: string;
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
    <div style={{
      width: "100%", height: "100%",
      background: "#f0e8d8",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      fontFamily: "'Jost', sans-serif",
    }}>
      <style>{`
        .gotwo-title::placeholder { color: rgba(26,26,26,0.2); }
        .gotwo-notes::placeholder { color: rgba(26,26,26,0.3); }
      `}</style>

      {/* ── SECTION LABEL + INDEX ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px 8px", flexShrink: 0 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4543a", fontWeight: 700 }}>
          {[categoryName, subcategoryName, subtype.name].filter(Boolean).join(" · ")}
        </span>
        <span style={{ fontSize: 11, color: "rgba(26,26,26,0.2)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
          {isEditing ? "edit" : "01"}
        </span>
      </div>

      {/* ── TITLE + PHOTO BLOCK ── */}
      <div style={{ position: "relative", padding: "0 22px", flexShrink: 0, minHeight: 220 }}>
        {/* Photo thumbnail — locked top-right proportions */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 22,
          width: 170,
          height: 190,
          borderRadius: 14,
          background: "#c8bfb4",
        }} />

        {/* Invisible title box (fixed) — prevents random wraps */}
        <div style={{ width: 190, maxWidth: "calc(100% - 196px)" }}>
          <textarea
            className="gotwo-title"
            value={entryName}
            onChange={(e) => onEntryNameChange(e.target.value)}
            placeholder={subtype.name}
            style={{
              display: "block",
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: 46,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
              fontFamily: "'Cormorant Garamond', serif",
              overflow: "hidden",
              boxSizing: "border-box",
              padding: 0,
              overflowWrap: "normal",
              wordBreak: "keep-all",
              hyphens: "manual",
            }}
            rows={3}
          />
        </div>

        {/* Coral accent — anchored under title */}
        <div style={{ display: "flex", gap: 3, paddingTop: 8 }}>
          <div style={{ height: 2, width: 22, background: "#d4543a", borderRadius: 1 }} />
          <div style={{ height: 2, width: 8, background: "rgba(212,84,58,0.3)", borderRadius: 1 }} />
        </div>
      </div>

      {/* ── FIELDS ── */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0 22px" }}>
        {subtype.fields.map((field, i) => (
          <div key={field.label} style={{
            paddingBottom: 12, marginBottom: 12,
            borderBottom: i < subtype.fields.length - 1 ? "1px solid rgba(26,26,26,0.1)" : "none",
          }}>
            <p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,26,26,0.38)", fontWeight: 700, margin: "0 0 8px" }}>
              {field.label}
            </p>

            {field.type === "select" && field.options ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {field.options.map((opt) => {
                  const sel = values[field.label] === opt;
                  return (
                    <button key={opt} onClick={() => onChange(field.label, sel ? "" : opt)} style={{
                      padding: "5px 14px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s",
                      border: sel ? "1.5px solid #d4543a" : "1px solid rgba(26,26,26,0.18)",
                      background: sel ? "#d4543a" : "transparent",
                      color: sel ? "#fff" : "#1a1a1a",
                      fontFamily: "'Jost', sans-serif",
                    }}>{opt}</button>
                  );
                })}
              </div>
            ) : field.label.toLowerCase() === "notes" ? (
              <textarea
                className="gotwo-notes"
                value={values[field.label] || ""}
                onChange={(e) => onChange(field.label, e.target.value)}
                placeholder="Add a note…"
                rows={2}
                style={{
                  width: "100%", background: "transparent", border: "none", outline: "none",
                  resize: "none", fontSize: 14, color: "#1a1a1a", lineHeight: 1.5,
                  fontFamily: "'Jost', sans-serif",
                }}
              />
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {(values[field.label] || "").split(",").filter(t => t.trim()).map((tag, ti) => (
                  <span key={ti} onClick={() => {
                    const tags = (values[field.label] || "").split(",").filter(t => t.trim());
                    tags.splice(ti, 1);
                    onChange(field.label, tags.join(", "));
                  }} style={{
                    padding: "4px 11px", borderRadius: 4, fontSize: 13,
                    background: field.label.toLowerCase().includes("brand") ? "rgba(45,104,112,0.12)" : "rgba(26,26,26,0.07)",
                    color: field.label.toLowerCase().includes("brand") ? "#2d6870" : "#1a1a1a",
                    fontWeight: field.label.toLowerCase().includes("brand") ? 600 : 400,
                    cursor: "pointer", fontFamily: "'Jost', sans-serif",
                  }}>{tag.trim()}</span>
                ))}
                <button onClick={() => {
                  const val = window.prompt(`Add ${field.label}`);
                  if (val?.trim()) {
                    const existing = (values[field.label] || "").split(",").filter(t => t.trim());
                    onChange(field.label, [...existing, val.trim()].join(", "));
                  }
                }} style={{
                  padding: "4px 12px", borderRadius: 4, fontSize: 12,
                  border: "1px dashed rgba(26,26,26,0.22)", background: "transparent",
                  color: "rgba(26,26,26,0.32)", fontFamily: "'Jost', sans-serif", cursor: "pointer",
                }}>+ add</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── SAVE BAR ── */}
      <div style={{ flexShrink: 0, padding: "10px 22px 18px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onSave} disabled={saving} style={{
            flex: 1, height: 44, borderRadius: 10,
            background: "#1a1a1a", border: "none",
            color: "#f0e8d8", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "'Jost', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {saving ? <Loader2 style={{ width: 13, height: 13 }} className="animate-spin" /> : "Save Entry"}
          </button>
          {isEditing && (
            <button onClick={onDelete} style={{
              width: 44, height: 44, borderRadius: 10,
              background: "rgba(212,84,58,0.08)", border: "1px solid rgba(212,84,58,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Trash2 style={{ width: 14, height: 14, color: "#d4543a" }} />
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
  const [leafImage, setLeafImage] = useState<string>("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();

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
    setLeafCategoryName(undefined);
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
      setBackState({ label: "", onBack: goBackFromEntries });
    } else if (activeSubcategory && coverFlowState) {
      setBackState({ label: "", onBack: () => setActiveSubcategory(null) });
    } else if (coverFlowState) {
      setBackState({ label: "", onBack: clearCoverFlow });
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
      setLeafSubcategoryName(sc.name);
      setLeafCategoryName(coverFlowState?.name);
      setLeafImage((sc as any).image || "");
      setActiveEntryIndex(0);
    }
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    setCardKey(key);
    setLeafSubtype(subtype);
    setLeafSubcategoryName(subcategoryName);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage((subtype as any).image || "");
    setActiveEntryIndex(0);
  };

  const entryCoverFlowItems = [
    ...entries.map((entry) => ({
      id: entry.id,
      label: entryNames[entry.id] || entry.entry_name,
      image: leafImage || BRANDED_CARD_SVG,
    })),
    {
      id: NEW_ENTRY_ID,
      label: entryNames[NEW_ENTRY_ID]?.trim() || "New Card",
      image: leafImage || BRANDED_CARD_SVG,
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
          <h2 className="section-header text-center mb-6">{leafSubtype?.name || ""}</h2>
          <div className="flex items-center justify-center">
            <FormCoverFlowCarousel
              items={entryCoverFlowItems}
              activeIndex={activeEntryIndex}
              onActiveIndexChange={setActiveEntryIndex}
              renderActiveCard={(item) => (
                <EntryFormCard
                  subtype={leafSubtype}
                  subcategoryName={leafSubcategoryName}
                  categoryName={leafCategoryName}
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
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-3 z-10">
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
