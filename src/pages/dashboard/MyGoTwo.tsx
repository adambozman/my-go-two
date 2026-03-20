import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Check, Plus, Trash2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useTopBar } from "@/contexts/TopBarContext";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import TemplateCoverFlow, { type SubtypeItem, type SubcategoryGroup } from "@/components/TemplateCoverFlow";
import FormCoverFlowCarousel from "@/components/ui/FormCoverFlowCarousel";
import { PaginationControls } from "@/components/ui/pagination-controls";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import ProductEntryCard from "@/components/ui/ProductEntryCard";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "personal": "Personal",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "personal", "gifts-wishlist", "home-living", "entertainment"];

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
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

const BRANDED_CARD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232d6870'/%3E%3Cstop offset='100%25' stop-color='%231e4a52'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' rx='24' fill='url(%23g)'/%3E%3C/svg%3E";
const NEW_ENTRY_ID = "__new_entry__";
const ENTRY_PAGE_SIZE = 5;

const normalizeImageValue = (value?: string | null) => {
  if (!value) return "";
  return value.includes("/") ? value : "";
};

const getNewEntryId = (groupName: string) => `${NEW_ENTRY_ID}::${groupName}`;

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
  imageUrl,
  saving,
  isEditing,
  onEntryNameChange,
  onChange,
  onImageChange,
  onSave,
  onDelete,
}: {
  subtype: SubtypeItem;
  subcategoryName?: string;
  categoryName?: string;
  entryName: string;
  values: Record<string, string>;
  imageUrl?: string;
  saving: boolean;
  isEditing: boolean;
  onEntryNameChange: (name: string) => void;
  onChange: (fieldLabel: string, value: string) => void;
  onImageChange: (imageUrl: string) => void;
  onSave: () => void;
  onDelete: () => void;
}) => {
  const { toast } = useToast();
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please choose an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please choose an image under 5MB.", variant: "destructive" });
      return;
    }

    setUploadingImage(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in to upload photos.");

      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("card-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("card-images")
        .getPublicUrl(filePath);

      onImageChange(publicUrl);
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message || "Could not upload image.", variant: "destructive" });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            position: "absolute",
            top: 0,
            right: 22,
            width: 170,
            height: 190,
            borderRadius: 14,
            border: "none",
            padding: 0,
            overflow: "hidden",
            background: imageUrl
              ? `center / cover no-repeat url(${imageUrl})`
              : "#c8bfb4",
            cursor: uploadingImage ? "wait" : "pointer",
          }}
          aria-label="Upload image"
          disabled={uploadingImage}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: imageUrl ? "rgba(26,26,26,0.12)" : "transparent",
          }}>
            {uploadingImage ? (
              <Loader2 style={{ width: 24, height: 24, color: "rgba(255,255,255,0.92)", animation: "spin 1s linear infinite" }} />
            ) : (
              <Camera style={{ width: 24, height: 24, color: imageUrl ? "rgba(255,255,255,0.92)" : "rgba(26,26,26,0.42)" }} />
            )}
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

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
        {(subtype.fields || []).map((field, i) => (
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
  const { user } = useAuth();
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

  const visibleSectionKeys = useMemo(() => {
    const customKeys = Object.keys(sections).filter((key) => !sectionOrder.includes(key));
    return [...sectionOrder, ...customKeys];
  }, [sections]);

  const [coverFlowState, setCoverFlowState] = useState<CoverFlowState | null>(null);
  const [focusedSubcategoryId, setFocusedSubcategoryId] = useState<string | null>(null);
  const [focusedLeafItemId, setFocusedLeafItemId] = useState<string | null>(null);
  const [focusedMainCategoryBySection, setFocusedMainCategoryBySection] = useState<Record<string, string>>({});
  const [lastMainSectionKey, setLastMainSectionKey] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const savedScrollTop = useRef(0);

  const [cardKey, setCardKey] = useState<string | null>(null);
  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [activeEntryIndexByGroup, setActiveEntryIndexByGroup] = useState<Record<string, number>>({});
  const [activeEntryPageByGroup, setActiveEntryPageByGroup] = useState<Record<string, number>>({});
  const [draftProductGroups, setDraftProductGroups] = useState<string[]>([]);
  const [entryDrafts, setEntryDrafts] = useState<Record<string, Record<string, string>>>({});
  const [entryNames, setEntryNames] = useState<Record<string, string>>({});
  const [entryImages, setEntryImages] = useState<Record<string, string>>({});
  const [activeGroup, setActiveGroup] = useState("");
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafImage, setLeafImage] = useState<string>("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();
  const productGroupScrollRef = useRef<HTMLDivElement>(null);
  const productGroupSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const defaultFieldValues = useMemo(() => {
    if (!leafSubtype?.fields) return {} as Record<string, string>;
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

  const groupsForCardKey = useMemo(() => {
    return Array.from(new Set(entries.map((entry) => entry.group_name).filter(Boolean)));
  }, [entries]);

  const activeGroupEntries = useMemo(
    () => entries.filter((entry) => entry.group_name === activeGroup),
    [entries, activeGroup],
  );

  const productGroups = useMemo(() => {
    const baseGroup = leafSubtype?.name;
    const orderedGroups = baseGroup ? [baseGroup] : [];

    groupsForCardKey.forEach((groupName) => {
      if (!orderedGroups.includes(groupName)) {
        orderedGroups.push(groupName);
      }
    });

    draftProductGroups.forEach((groupName) => {
      if (!orderedGroups.includes(groupName)) {
        orderedGroups.push(groupName);
      }
    });

    return orderedGroups;
  }, [groupsForCardKey, draftProductGroups, leafSubtype?.name]);

  useEffect(() => {
    if (!leafSubtype || !cardKey) return;

    const nextDrafts: Record<string, Record<string, string>> = {};
    const nextNames: Record<string, string> = {};
    const nextImages: Record<string, string> = {};

    entries.forEach((entry) => {
      nextDrafts[entry.id] = (entry.field_values as Record<string, string>) || {};
      nextNames[entry.id] = entry.entry_name;
      nextImages[entry.id] = entry.image_url || "";
    });

    const placeholderGroups = new Set([
      ...(groupsForCardKey.length > 0 ? groupsForCardKey : []),
      activeGroup || leafSubtype.name,
    ]);

    placeholderGroups.forEach((groupName) => {
      const newEntryId = getNewEntryId(groupName);
      nextDrafts[newEntryId] = defaultFieldValues;
      nextNames[newEntryId] = "";
      nextImages[newEntryId] = "";
    });

    setEntryDrafts(nextDrafts);
    setEntryNames(nextNames);
    setEntryImages(nextImages);
  }, [entries, leafSubtype, defaultFieldValues, cardKey, groupsForCardKey, activeGroup]);

  useEffect(() => {
    if (!leafSubtype || !cardKey) return;

    setActiveGroup((prev) => {
      if (prev && productGroups.includes(prev)) return prev;
      if (productGroups.length > 0) return productGroups[0];
      return leafSubtype.name;
    });
  }, [leafSubtype, cardKey, productGroups]);

  useEffect(() => {
    if (!activeGroup) return;

    setActiveEntryIndexByGroup((prev) => ({
      ...prev,
      [activeGroup]: Math.min(prev[activeGroup] ?? 0, activeGroupEntries.length),
    }));
    setActiveEntryPageByGroup((prev) => ({
      ...prev,
      [activeGroup]: Math.min(
        prev[activeGroup] ?? 1,
        Math.max(1, Math.ceil((activeGroupEntries.length + 1) / ENTRY_PAGE_SIZE)),
      ),
    }));
  }, [activeGroupEntries.length, activeGroup]);

  useEffect(() => {
    if (!cardKey || !activeGroup) return;
    requestAnimationFrame(() => {
      const container = productGroupScrollRef.current;
      const section = productGroupSectionRefs.current[activeGroup];
      if (!container || !section) return;
      container.scrollTop = section.offsetTop;
    });
  }, [activeGroup, cardKey, productGroups.length]);

  const getNearestSectionIndex = useCallback(
    (scrollTop: number) => {
      if (visibleSectionKeys.length === 0) return 0;

      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      visibleSectionKeys.forEach((key, index) => {
        const sectionTop = sectionRefs.current[key]?.offsetTop ?? 0;
        const distance = Math.abs(sectionTop - scrollTop);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    },
    [visibleSectionKeys],
  );

  useEffect(() => {
    setActiveSectionIndex((prev) => Math.min(prev, Math.max(visibleSectionKeys.length - 1, 0)));
  }, [visibleSectionKeys.length]);

  useEffect(() => {
    if (coverFlowState || cardKey) return;

    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;

      const targetSectionTop =
        lastMainSectionKey && sectionRefs.current[lastMainSectionKey]
          ? sectionRefs.current[lastMainSectionKey]!.offsetTop
          : null;

      const targetScrollTop = targetSectionTop ?? savedScrollTop.current;

      el.scrollTop = targetScrollTop;
      savedScrollTop.current = targetScrollTop;
      setActiveSectionIndex(getNearestSectionIndex(targetScrollTop));
    });
  }, [coverFlowState, cardKey, lastMainSectionKey, getNearestSectionIndex]);

  const clearCoverFlow = () => {
    setCoverFlowState(null);
    setFocusedSubcategoryId(null);
    setFocusedLeafItemId(null);
    setActiveSubcategory(null);
    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(undefined);
    setActiveEntryIndexByGroup({});
    setActiveEntryPageByGroup({});
    setDraftProductGroups([]);
    setActiveGroup("");
  };

  const goBackFromEntries = () => {
    const selectedLeafId = leafSubtype?.id ?? null;
    const selectedSubcategory = activeSubcategory;
    const isLeafSubcategory = Boolean(
      selectedSubcategory && (!selectedSubcategory.products || selectedSubcategory.products.length === 0)
    );
    const focusId = isLeafSubcategory
      ? selectedSubcategory?.id ?? selectedLeafId
      : selectedLeafId ?? selectedSubcategory?.id ?? null;

    setCardKey(null);
    setLeafSubtype(null);
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(undefined);
    setActiveEntryIndexByGroup({});
    setActiveEntryPageByGroup({});
    setDraftProductGroups([]);
    setActiveGroup("");

    if (isLeafSubcategory) {
      setActiveSubcategory(null);
      setFocusedSubcategoryId(selectedSubcategory?.id ?? null);
      setFocusedLeafItemId(null);
      return;
    }

    setFocusedLeafItemId(focusId);
  };

  useEffect(() => {
    if (cardKey) {
      setBackState({ label: "", onBack: goBackFromEntries });
    } else if (activeSubcategory && coverFlowState) {
      setBackState({
        label: "",
        onBack: () => {
          setFocusedSubcategoryId(activeSubcategory.id);
          setFocusedLeafItemId(null);
          setActiveSubcategory(null);
        },
      });
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
      setLastMainSectionKey(item.section);
      setFocusedMainCategoryBySection((prev) => ({ ...prev, [item.section]: item.key }));
      setCoverFlowState({ name: item.label, subtypes, subcategories, section: item.section, categoryId: item.key.replace(/-male$|-female$|-nb$/, "") });
      setFocusedSubcategoryId(null);
      setFocusedLeafItemId(null);
    }
  };

  const handleSelect = (sectionKey: string, categoryKey: string) => {
    const sectionItems = sections[sectionKey] || [];
    const directMatch = sectionItems.find((c) => c.key === categoryKey);
    if (directMatch) {
      handleCategoryClick(directMatch);
      return;
    }

    // Defensive fallback if section data shifts while user is interacting.
    for (const key of sectionOrder) {
      const item = (sections[key] || []).find((c) => c.key === categoryKey);
      if (item) {
        handleCategoryClick(item);
        return;
      }
    }
  };

  const handleSubcategorySelect = (sc: SubcategoryGroup) => {
    if (sc.products && sc.products.length > 0) {
      setFocusedSubcategoryId(sc.id);
      setFocusedLeafItemId(null);
      setActiveSubcategory(sc);
      return;
    }

    const key = `${coverFlowState?.name}__${coverFlowState?.name || ""}__${sc.name}`;
    setFocusedSubcategoryId(sc.id);
    setFocusedLeafItemId(null);
    setActiveSubcategory(sc);
    setCardKey(key);
    setLeafSubtype(sc as unknown as SubtypeItem);
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage((sc as any).image || "");
    setActiveEntryIndexByGroup({});
    setActiveEntryPageByGroup({});
    setDraftProductGroups([]);
    setActiveGroup("");
  };

  const handleSubtypeSelect = (subtype: SubtypeItem, subcategoryName?: string) => {
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    setFocusedLeafItemId(subtype.id);
    setCardKey(key);
    setLeafSubtype(subtype);
    setLeafSubcategoryName(subcategoryName);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage((subtype as any).image || "");
    setActiveEntryIndexByGroup({});
    setActiveEntryPageByGroup({});
    setDraftProductGroups([]);
    setActiveGroup("");
  };

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

  const handleImageChange = (itemId: string, imageUrl: string) => {
    setEntryImages((prev) => ({ ...prev, [itemId]: imageUrl }));
  };

  const handleSaveEntry = async (itemId: string) => {
    if (!user || !cardKey || !leafSubtype) return;

    const isNewEntry = itemId.startsWith(`${NEW_ENTRY_ID}::`);
    const targetGroup = isNewEntry ? itemId.replace(`${NEW_ENTRY_ID}::`, "") : (entries.find((entry) => entry.id === itemId)?.group_name || activeGroup || leafSubtype.name);
    const targetGroupEntries = entries.filter((entry) => entry.group_name === targetGroup);
    const entryName = (entryNames[itemId] || "").trim() || `${leafSubtype.name} ${targetGroupEntries.length + 1}`;
    const fieldValues = entryDrafts[itemId] || defaultFieldValues;
    const imageUrl = entryImages[itemId] || null;

    setSaving(true);
    try {
      if (isNewEntry) {
        const { data, error } = await supabase
          .from("card_entries")
          .insert({
            user_id: user.id,
            card_key: cardKey,
            group_name: targetGroup,
            entry_name: entryName,
            field_values: fieldValues,
            image_url: imageUrl,
          })
          .select("*")
          .single();

        if (error) throw error;

        const inserted = data as CardEntry;
        setEntries((prev) => [...prev, inserted]);
        setEntryDrafts((prev) => ({
          ...prev,
          [inserted.id]: fieldValues,
          [itemId]: defaultFieldValues,
        }));
        setEntryNames((prev) => ({
          ...prev,
          [inserted.id]: entryName,
          [itemId]: "",
        }));
        setEntryImages((prev) => ({
          ...prev,
          [inserted.id]: imageUrl || "",
          [itemId]: "",
        }));
        setActiveGroup(targetGroup);
        setActiveEntryIndexByGroup((prev) => ({
          ...prev,
          [targetGroup]: targetGroupEntries.length,
        }));
        toast({ title: "Saved!", description: `${entryName} created.` });
      } else {
        const { error } = await supabase
          .from("card_entries")
          .update({ entry_name: entryName, field_values: fieldValues, image_url: imageUrl })
          .eq("id", itemId);

        if (error) throw error;

        setEntries((prev) => prev.map((entry) => (
          entry.id === itemId ? { ...entry, entry_name: entryName, field_values: fieldValues, image_url: imageUrl } : entry
        )));
        toast({ title: "Updated!", description: `${entryName} saved.` });
      }
    } catch (e: any) {
      toast({ title: "Error saving", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async (itemId: string) => {
    if (!itemId || itemId.startsWith(`${NEW_ENTRY_ID}::`)) return;

    setSaving(true);
    try {
      const { error } = await supabase.from("card_entries").delete().eq("id", itemId);
      if (error) throw error;

      setEntries((prev) => prev.filter((entry) => entry.id !== itemId));
      toast({ title: "Deleted", description: "Entry removed." });
    } catch (e: any) {
      toast({ title: "Error deleting", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const getNextGeneratedGroupName = useCallback(() => {
    const existingGroups = new Set([...productGroups, ...groupsForCardKey, ...draftProductGroups]);
    let nextNumber = 1;
    let nextGroupName = "__product_group_1";

    while (existingGroups.has(nextGroupName)) {
      nextNumber += 1;
      nextGroupName = `__product_group_${nextNumber}`;
    }

    return nextGroupName;
  }, [productGroups, groupsForCardKey, draftProductGroups]);

  const handleCreateGroup = () => {
    const nextGroupName = getNextGeneratedGroupName();
    setDraftProductGroups((prev) => (
      prev.includes(nextGroupName) ? prev : [...prev, nextGroupName]
    ));
    setActiveGroup(nextGroupName);
    setActiveEntryIndexByGroup((prev) => ({ ...prev, [nextGroupName]: 0 }));
    setActiveEntryPageByGroup((prev) => ({ ...prev, [nextGroupName]: 1 }));
    toast({ title: "Group created" });
  };

  if (registryLoading || genderLoading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const orderedSections = visibleSectionKeys.map((key) => ({
    key,
    label: sectionLabels[key] ?? key,
    items: (sections[key] || []).map((cat) => ({ id: cat.key, label: cat.label, image: cat.image, imageKey: cat.imageKey })),
  }));

  const renderContent = () => {
    if (cardKey && leafSubtype) {
      const getNearestGroupIndex = (scrollTop: number) => {
        if (productGroups.length === 0) return 0;

        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        productGroups.forEach((groupName, index) => {
          const groupTop = productGroupSectionRefs.current[groupName]?.offsetTop ?? 0;
          const distance = Math.abs(groupTop - scrollTop);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        return nearestIndex;
      };

      return (
        <motion.div
          key="entry-coverflow"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          ref={productGroupScrollRef}
          className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative"
          style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
          onScroll={(e) => {
            const nextGroupIndex = getNearestGroupIndex(e.currentTarget.scrollTop);
            const nextGroup = productGroups[nextGroupIndex];
            if (nextGroup && nextGroup !== activeGroup) {
              setActiveGroup(nextGroup);
            }
          }}
        >
          {productGroups.map((groupName) => {
            const groupEntries = entries.filter((entry) => entry.group_name === groupName);
            const newEntryId = getNewEntryId(groupName);
            const items = [
              ...groupEntries.map((entry) => ({
                id: entry.id,
                label: entryNames[entry.id] || entry.entry_name,
                image: normalizeImageValue(entryImages[entry.id] || entry.image_url) || leafImage || BRANDED_CARD_SVG,
              })),
              {
                id: newEntryId,
                label: entryNames[newEntryId]?.trim() || "",
                image: normalizeImageValue(entryImages[newEntryId]) || leafImage || BRANDED_CARD_SVG,
              },
            ];
            const currentPage = activeEntryPageByGroup[groupName] ?? 1;
            const totalPages = Math.max(1, Math.ceil(items.length / ENTRY_PAGE_SIZE));
            const pageStart = (currentPage - 1) * ENTRY_PAGE_SIZE;
            const paginatedItems = items.slice(pageStart, pageStart + ENTRY_PAGE_SIZE);
            const activeIndex = activeEntryIndexByGroup[groupName] ?? 0;
            const activeIndexOnPage = paginatedItems.length === 0
              ? 0
              : Math.min(Math.max(activeIndex - pageStart, 0), paginatedItems.length - 1);
            const previousImage = items.length === 0
              ? ""
              : items[(activeIndex - 1 + items.length) % items.length]?.image || "";
            const isActiveGroup = groupName === activeGroup;

            return (
              <div
                key={groupName}
                ref={(node) => {
                  productGroupSectionRefs.current[groupName] = node;
                }}
                className="coverflow-stage-shell snap-start snap-always"
              >
                <CoverflowTitlePill title={leafSubtype.name} showBackArrow onBack={goBackFromEntries} />
                <div className="flex flex-col items-center justify-center">
                  <FormCoverFlowCarousel
                    items={paginatedItems}
                    activeIndex={activeIndexOnPage}
                    previousImage={previousImage}
                    onActiveIndexChange={(index) => {
                      setActiveEntryIndexByGroup((prev) => ({
                        ...prev,
                        [groupName]: pageStart + index,
                      }));
                    }}
                    renderActiveCard={(item) => (
                      <ProductEntryCard
                        subtype={leafSubtype}
                        subcategoryName={leafSubcategoryName}
                        categoryName={leafCategoryName}
                        entryName={entryNames[item.id] || ""}
                        values={entryDrafts[item.id] || defaultFieldValues}
                        imageUrl={normalizeImageValue(entryImages[item.id])}
                        saving={saving}
                        isEditing={!item.id.startsWith(`${NEW_ENTRY_ID}::`)}
                        onEntryNameChange={(name) => handleNameChange(item.id, name)}
                        onChange={(fieldLabel, value) => handleFieldChange(item.id, fieldLabel, value)}
                        onImageChange={(imageUrl) => handleImageChange(item.id, imageUrl)}
                        onSave={() => handleSaveEntry(item.id)}
                        onDelete={() => handleDeleteEntry(item.id)}
                      />
                    )}
                  />
                  {isActiveGroup ? (
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setActiveEntryPageByGroup((prev) => ({ ...prev, [groupName]: page }));
                        setActiveEntryIndexByGroup((prev) => ({
                          ...prev,
                          [groupName]: Math.min((page - 1) * ENTRY_PAGE_SIZE, Math.max(items.length - 1, 0)),
                        }));
                      }}
                      orientation="vertical"
                      className="fixed"
                    style={{ right: 18, top: "calc(var(--header-height) + (100vh - var(--header-height)) / 2 + 23px)", transform: "translateY(-50%)", zIndex: 50 }}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}

          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10">
            <Button
              variant="outline"
              className="rounded-full px-6 h-10 border-border text-foreground"
              onClick={handleCreateGroup}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Group
            </Button>
          </div>
        </motion.div>
      );
    }

    if (coverFlowState) {
      return (
        <motion.div
          key="drilldown"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative"
          style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
        >
          <div className="snap-start snap-always">
            <TemplateCoverFlow
              templateName={coverFlowState.name}
              subtypes={coverFlowState.subtypes}
              subcategories={coverFlowState.subcategories}
              activeSubcategory={activeSubcategory}
              onSubcategorySelect={handleSubcategorySelect}
              onBack={activeSubcategory ? () => {
                setFocusedSubcategoryId(activeSubcategory.id);
                setFocusedLeafItemId(null);
                setActiveSubcategory(null);
              } : clearCoverFlow}
              onSelect={handleSubtypeSelect}
              focusedSubcategoryId={focusedSubcategoryId}
              focusedLeafItemId={focusedLeafItemId}
              creating={false}
              gender={gender}
              section={coverFlowState.section}
              categoryId={coverFlowState.categoryId}
            />
          </div>
        </motion.div>
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
          setActiveSectionIndex(getNearestSectionIndex(el.scrollTop));
        }}
      >
        {orderedSections.map((section, index) => (
          <div
            key={section.key}
            data-section-key={section.key}
            ref={(node) => {
              sectionRefs.current[section.key] = node;
            }}
            className="coverflow-stage-shell snap-start snap-always"
          >
            <CoverflowTitlePill title={section.label} />
            <GoTwoCoverFlow
              items={section.items}
              onSelect={(categoryId) => handleSelect(section.key, categoryId)}
              focusedItemId={focusedMainCategoryBySection[section.key] ?? null}
              showPagination={index === activeSectionIndex}
            />
          </div>
        ))}
        {orderedSections.length === 0 && (
          <p className="text-muted-foreground text-center mt-12">No categories found.</p>
        )}
        <div
          className="fixed flex flex-col items-center gap-2"
              style={{ right: 18, top: "calc(var(--header-height) + (100vh - var(--header-height)) / 2 + 23px)", transform: "translateY(-50%)", zIndex: 50 }}
        >
          {orderedSections.map((_, i) => (
            <div key={i} style={{ width: 7, height: i === activeSectionIndex ? 20 : 7, borderRadius: 4, background: i === activeSectionIndex ? "var(--swatch-teal)" : "rgba(45,104,112,0.28)", transition: "all 0.3s ease" }} />
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
    </>
  );
};

export default MyGoTwo;
