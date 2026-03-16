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
import PremiumLockCard from "@/components/PremiumLockCard";
import { PaginationControls } from "@/components/ui/pagination-controls";
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
  "personal": "Personal",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "personal", "gifts-wishlist", "home-living", "entertainment"];
const FREE_CARD_KEY_LIMIT = 3;

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
const ENTRY_PAGE_SIZE = 5;

const TagInput = ({ value, onChange, fieldLabel }: { value: string; onChange: (val: string) => void; fieldLabel: string }) => {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isBrand = fieldLabel.toLowerCase().includes("brand");

  const tags = (value || "").split(",").filter(t => t.trim());

  const addTag = () => {
    if (!draft.trim()) return;
    onChange([...tags, draft.trim()].join(", "));
    setDraft("");
  };

  const removeTag = (index: number) => {
    const next = [...tags];
    next.splice(index, 1);
    onChange(next.join(", "));
  };

  useEffect(() => {
    if (adding && inputRef.current) inputRef.current.focus();
  }, [adding]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
      {tags.map((tag, ti) => (
        <span key={ti} onClick={() => removeTag(ti)} style={{
          padding: "4px 11px", borderRadius: 4, fontSize: 13,
          background: isBrand ? "rgba(45,104,112,0.12)" : "rgba(26,26,26,0.07)",
          color: isBrand ? "#2d6870" : "#1a1a1a",
          fontWeight: isBrand ? 600 : 400,
          cursor: "pointer", fontFamily: "'Jost', sans-serif",
        }}>{tag.trim()} ×</span>
      ))}
      {adding ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); addTag(); }
            if (e.key === "Escape") { setAdding(false); setDraft(""); }
          }}
          onBlur={() => { if (draft.trim()) addTag(); setAdding(false); }}
          placeholder={`Add ${fieldLabel.toLowerCase()}…`}
          style={{
            width: 100, padding: "4px 8px", borderRadius: 4, fontSize: 13,
            border: "1px solid rgba(26,26,26,0.22)", background: "transparent",
            outline: "none", fontFamily: "'Jost', sans-serif", color: "#1a1a1a",
          }}
        />
      ) : (
        <button onClick={() => setAdding(true)} style={{
          padding: "4px 12px", borderRadius: 4, fontSize: 12,
          border: "1px dashed rgba(26,26,26,0.22)", background: "transparent",
          color: "rgba(26,26,26,0.32)", fontFamily: "'Jost', sans-serif", cursor: "pointer",
        }}>+ add</button>
      )}
    </div>
  );
};

const AutoFitTitle = ({ value, placeholder, onChange }: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(46);
  const text = value || placeholder;
  const isPlaceholder = !value;

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    if (containerW === 0 || containerH === 0) return;

    let lo = 16, hi = 60, best = 16;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      measure.style.fontSize = `${mid}px`;
      measure.style.width = `${containerW}px`;
      const fits = measure.scrollHeight <= containerH && measure.scrollWidth <= containerW;
      if (fits) { best = mid; lo = mid + 1; }
      else { hi = mid - 1; }
    }
    setFontSize(best);
  }, [text]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={measureRef} aria-hidden style={{
        position: "absolute", visibility: "hidden", top: 0, left: 0,
        fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em",
        fontFamily: "'Cormorant Garamond', serif",
        overflowWrap: "normal", wordBreak: "normal",
        whiteSpace: "pre-wrap",
      }}>{text}</div>

      <textarea
        className="gotwo-title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          display: "block",
          width: "100%", height: "100%",
          background: "transparent",
          border: "none", outline: "none", resize: "none",
          fontSize, fontWeight: 700, lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: isPlaceholder ? undefined : "#1a1a1a",
          fontFamily: "'Cormorant Garamond', serif",
          overflow: "hidden", boxSizing: "border-box", padding: 0,
          overflowWrap: "normal", wordBreak: "normal",
        }}
      />
    </div>
  );
};

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
        .gotwo-title::placeholder { color: #1a1a1a; }
        .gotwo-notes::placeholder { color: rgba(26,26,26,0.3); }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px 8px", flexShrink: 0 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4543a", fontWeight: 700 }}>
          {subcategoryName ? [categoryName, subcategoryName].filter(Boolean).join(" · ") : (categoryName || "")}
        </span>
        <span style={{ fontSize: 11, color: "rgba(26,26,26,0.2)", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>
          {isEditing ? "edit" : "01"}
        </span>
      </div>

      <div style={{ position: "relative", padding: "0 22px", flexShrink: 0, height: 190 }}>
        <div style={{
          position: "absolute",
          top: 0,
          right: 22,
          width: 170,
          height: 190,
          borderRadius: 14,
          background: "#c8bfb4",
        }} />

        <div style={{ maxWidth: "calc(100% - 196px)", height: 190 }}>
          <AutoFitTitle
            value={entryName}
            placeholder={subtype.name}
            onChange={onEntryNameChange}
          />
        </div>

        <div style={{ display: "flex", gap: 3, paddingTop: 8 }}>
          <div style={{ height: 2, width: 22, background: "#d4543a", borderRadius: 1 }} />
          <div style={{ height: 2, width: 8, background: "rgba(212,84,58,0.3)", borderRadius: 1 }} />
        </div>
      </div>

      <div style={{ padding: "6px 22px 10px", flexShrink: 0 }}>
        <div style={{ height: 1, background: "rgba(26,26,26,0.14)" }} />
      </div>

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
              <TagInput
                value={values[field.label] || ""}
                onChange={(val) => onChange(field.label, val)}
                fieldLabel={field.label}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 22px 18px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            flex: 1,
            height: 42,
            borderRadius: 999,
            border: "none",
            background: "#d4543a",
            color: "white",
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving…" : isEditing ? "Save Changes" : "Save Card"}
        </button>
        {isEditing && (
          <button
            onClick={onDelete}
            disabled={saving}
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              border: "1px solid rgba(26,26,26,0.12)",
              background: "transparent",
              color: "#1a1a1a",
              cursor: saving ? "wait" : "pointer",
            }}
          >
            <Trash2 style={{ width: 16, height: 16, margin: "0 auto" }} />
          </button>
        )}
      </div>
    </div>
  );
};

const MyGoTwo = () => {
  const { user, subscribed } = useAuth();
  const { toast } = useToast();
  const { gender, loading: genderLoading } = usePersonalization();
  const { categories, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");
  const { setBackState } = useTopBar();

  const sections = useMemo(() => {
    return categories.reduce<Record<string, CategoryItem[]>>((acc, item) => {
      (acc[item.section] ||= []).push(item);
      return acc;
    }, {});
  }, [categories]);

  const [coverFlowState, setCoverFlowState] = useState<CoverFlowState | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const savedScrollTop = useRef(0);

  const [cardKey, setCardKey] = useState<string | null>(null);
  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [activeEntryIndex, setActiveEntryIndex] = useState(0);
  const [activeEntryPage, setActiveEntryPage] = useState(1);
  const [entryDrafts, setEntryDrafts] = useState<Record<string, Record<string, string>>>({});
  const [entryNames, setEntryNames] = useState<Record<string, string>>({});
  const [groupNameInput, setGroupNameInput] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafImage, setLeafImage] = useState<string>("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();
  const [unlockedCardKeys, setUnlockedCardKeys] = useState<string[]>([]);
  const [showCategoryPaywall, setShowCategoryPaywall] = useState(false);

  const defaultFieldValues = useMemo(() => {
    if (!leafSubtype) return {} as Record<string, string>;
    return leafSubtype.fields.reduce(
      (acc, field) => ({ ...acc, [field.label]: field.value || "" }),
      {} as Record<string, string>
    );
  }, [leafSubtype]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("card_entries")
      .select("card_key")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const keys = Array.from(new Set((data || []).map((row: any) => row.card_key).filter(Boolean)));
        setUnlockedCardKeys(keys);
      });
  }, [user]);

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

  const entryTotalPages = Math.max(1, Math.ceil(entryCoverFlowItems.length / ENTRY_PAGE_SIZE));
  const entryPageStart = (activeEntryPage - 1) * ENTRY_PAGE_SIZE;
  const paginatedEntryItems = entryCoverFlowItems.slice(entryPageStart, entryPageStart + ENTRY_PAGE_SIZE);
  const activeEntryIndexOnPage = paginatedEntryItems.length === 0
    ? 0
    : Math.min(Math.max(activeEntryIndex - entryPageStart, 0), paginatedEntryItems.length - 1);

  useEffect(() => {
    const nextPage = Math.min(entryTotalPages, Math.floor(activeEntryIndex / ENTRY_PAGE_SIZE) + 1);
    setActiveEntryPage(nextPage);
  }, [activeEntryIndex, entryTotalPages]);

  const handleEntryPageChange = (page: number) => {
    setActiveEntryPage(page);
    setActiveEntryIndex(Math.min((page - 1) * ENTRY_PAGE_SIZE, Math.max(entryCoverFlowItems.length - 1, 0)));
  };

  const clearCoverFlow = () => {
    setCoverFlowState(null);
    setActiveSubcategory(null);
    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(undefined);
    setActiveEntryIndex(0);
    setActiveEntryPage(1);
    setShowCategoryPaywall(false);
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
    setLeafCategoryName(undefined);
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

  const canAccessCardKey = useCallback((nextCardKey: string) => {
    if (subscribed) return true;
    if (unlockedCardKeys.includes(nextCardKey)) return true;
    return unlockedCardKeys.length < FREE_CARD_KEY_LIMIT;
  }, [subscribed, unlockedCardKeys]);

  const handleCategoryClick = (item: CategoryItem) => {
    if (scrollRef.current) {
      savedScrollTop.current = scrollRef.current.scrollTop;
    }
    const subtypes = (item.fields as unknown as SubtypeItem[]) || [];
    const subcategories = item.subcategories as unknown as SubcategoryGroup[] | undefined;
    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setCoverFlowState({ name: item.label, subtypes, subcategories, section: item.section, categoryId: item.key.replace(/-male$|-female$|-nb$/, "") });
      setShowCategoryPaywall(false);
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
      return;
    }

    const key = `${coverFlowState?.name}__${coverFlowState?.name || ""}__${sc.name}`;
    if (!canAccessCardKey(key)) {
      setShowCategoryPaywall(true);
      return;
    }

    setShowCategoryPaywall(false);
    setActiveSubcategory(sc);
    setCardKey(key);
    setLeafSubtype(sc as unknown as SubtypeItem);
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage((sc as any).image || "");
    setActiveEntryIndex(0);
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    if (!canAccessCardKey(key)) {
      setShowCategoryPaywall(true);
      return;
    }

    setShowCategoryPaywall(false);
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
        setUnlockedCardKeys((prev) => prev.includes(cardKey) ? prev : [...prev, cardKey]);
        setEntryDrafts((prev) => ({
          ...prev,
          [inserted.id]: fieldValues,
          [NEW_ENTRY_ID]: defaultFieldValues,
        }));
        setEntryNames((prev) => ({
          ...prev,
          [inserted.id]: entryName,
          [NEW_ENTRY_ID]: "",
        }));
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

      setEntries((prev) => {
        const nextEntries = prev.filter((entry) => entry.id !== itemId);
        if (nextEntries.length === 0 && cardKey) {
          setUnlockedCardKeys((prevKeys) => prevKeys.filter((key) => key !== cardKey));
        }
        return nextEntries;
      });
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

  const renderContent = () => {
    if (showCategoryPaywall) {
      return (
        <div className="h-full flex items-center justify-center px-4 py-6">
          <PremiumLockCard
            title="Deeper preference cards are Premium"
            description="Free includes a few categories so people can feel the product. Premium unlocks unlimited categories and entries for real everyday use."
            bullets={[
              `Free includes up to ${FREE_CARD_KEY_LIMIT} saved preference areas`,
              "Unlock unlimited categories, cards, and richer preference tracking",
              "Pair it with recommendations, reminders, and extra connections",
            ]}
            onDismiss={() => setShowCategoryPaywall(false)}
          />
        </div>
      );
    }

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
        className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative"
        style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollTop / el.clientHeight);
          setActiveSectionIndex(Math.min(idx, orderedSections.length - 1));
        }}
      >
        {!subscribed && (
          <div className="px-4 pt-4">
            <div className="rounded-2xl border px-4 py-3" style={{ background: "rgba(255,255,255,0.64)", borderColor: "rgba(255,255,255,0.84)", boxShadow: "0 8px 24px rgba(74,96,104,0.08), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}>
                Free plan
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}>
                You can save up to {FREE_CARD_KEY_LIMIT} preference areas. Premium unlocks unlimited categories and entries.
              </p>
            </div>
          </div>
        )}
        {orderedSections.map((section) => (
          <div key={section.key} className="snap-start snap-always h-full flex flex-col items-center justify-center overflow-hidden flex-shrink-0">
            <h2 className="section-header text-center mb-4">{section.label}</h2>
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
