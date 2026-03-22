import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Check, Plus, Trash2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useTopBar } from "@/contexts/TopBarContext";
import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import TemplateCoverFlow, { type SubtypeItem, type SubcategoryGroup } from "@/components/TemplateCoverFlow";
import FormCoverFlowCarousel from "@/components/ui/FormCoverFlowCarousel";
import { PaginationControls } from "@/components/ui/pagination-controls";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import ProductEntryCard from "@/components/ui/ProductEntryCard";
import { resolveStorageUrl } from "@/lib/storageRefs";

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

const MyGoTwo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { gender, loading: genderLoading } = usePersonalization();
  const { categories, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");
  const { setBackState } = useTopBar();
  const rotatingQuote = useRotatingQuote();
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));

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
  const [resolvedEntryImages, setResolvedEntryImages] = useState<Record<string, string>>({});
  const [activeGroup, setActiveGroup] = useState("");
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafImage, setLeafImage] = useState<string>("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();
  const productGroupScrollRef = useRef<HTMLDivElement>(null);
  const productGroupSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const stackTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const stackWheelLockRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktopViewport = viewportWidth >= 1024;
  const isTabletViewport = viewportWidth >= 768 && viewportWidth < 1024;
  const stackOffset = isDesktopViewport ? 156 : isTabletViewport ? 124 : 92;
  const stackScale = isDesktopViewport ? 0.92 : isTabletViewport ? 0.84 : 0.76;
  const stackPeekOpacity = isDesktopViewport ? 0.36 : isTabletViewport ? 0.26 : 0.14;
  const stackStageStyle = {
    height: isDesktopViewport
      ? "clamp(760px, 84vh, 980px)"
      : isTabletViewport
        ? "clamp(680px, 80vh, 860px)"
        : "clamp(620px, 78vh, 820px)",
  } as const;

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
    let cancelled = false;

    const loadResolvedImages = async () => {
      const imageValues = Array.from(
        new Set(
          [
            ...entries.map((entry) => entry.image_url || ""),
            ...Object.values(entryImages),
          ].filter(Boolean),
        ),
      );

      if (imageValues.length === 0) {
        if (!cancelled) setResolvedEntryImages({});
        return;
      }

      const nextEntries = await Promise.all(
        imageValues.map(async (value) => [value, await resolveStorageUrl(value)] as const),
      );

      if (!cancelled) {
        setResolvedEntryImages(Object.fromEntries(nextEntries));
      }
    };

    loadResolvedImages();

    return () => {
      cancelled = true;
    };
  }, [entries, entryImages]);

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

  const orderedSections = useMemo(
    () => visibleSectionKeys.map((key) => ({
      key,
      label: sectionLabels[key] ?? key,
      items: (sections[key] || []).map((cat) => ({ id: cat.key, label: cat.label, image: cat.image, imageKey: cat.imageKey })),
    })),
    [visibleSectionKeys, sections],
  );

  const activeStackSection = orderedSections[Math.min(activeSectionIndex, Math.max(orderedSections.length - 1, 0))] ?? null;
  const getSectionPreviewImage = useCallback((section: { key: string; items: { id: string; image: string }[] }) => {
    const focusedItemId = focusedMainCategoryBySection[section.key];
    const focusedItem = focusedItemId ? section.items.find((item) => item.id === focusedItemId) : null;
    return focusedItem?.image || section.items[0]?.image || BRANDED_CARD_SVG;
  }, [focusedMainCategoryBySection]);

  const moveStackSection = useCallback((direction: 1 | -1) => {
    if (orderedSections.length === 0) return;
    setActiveSectionIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return orderedSections.length - 1;
      if (next >= orderedSections.length) return 0;
      return next;
    });
  }, [orderedSections.length]);

  const handleStackWheel = useCallback((event: any) => {
    if (coverFlowState || cardKey || orderedSections.length <= 1) return;

    const vertical = Math.abs(event.deltaY) > Math.abs(event.deltaX) * 1.1;
    if (!vertical || Math.abs(event.deltaY) < 12) return;

    const now = Date.now();
    if (now - stackWheelLockRef.current < 240) return;

    stackWheelLockRef.current = now;
    event.preventDefault();
    moveStackSection(event.deltaY > 0 ? 1 : -1);
  }, [cardKey, coverFlowState, moveStackSection, orderedSections.length]);

  const handleStackTouchStart = useCallback((event: any) => {
    if (coverFlowState || cardKey) return;
    stackTouchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }, [cardKey, coverFlowState]);

  const handleStackTouchEnd = useCallback((event: any) => {
    if (coverFlowState || cardKey) return;
    const start = stackTouchStartRef.current;
    if (!start) return;

    const dx = start.x - event.changedTouches[0].clientX;
    const dy = start.y - event.changedTouches[0].clientY;
    stackTouchStartRef.current = null;

    if (Math.abs(dy) > 56 && Math.abs(dy) > Math.abs(dx) * 1.15) {
      moveStackSection(dy > 0 ? 1 : -1);
    }
  }, [cardKey, coverFlowState, moveStackSection]);

  const quotePanel = (
    <section className="my-go-two-quote-panel shrink-0">
      <div className="my-go-two-quote-frame">
        <p className="my-go-two-quote-text">"{rotatingQuote.text}"</p>
        {rotatingQuote.author !== "Unknown" && (
          <p className="my-go-two-quote-author">— {rotatingQuote.author}</p>
        )}
      </div>
    </section>
  );

  useEffect(() => {
    setActiveSectionIndex((prev) => Math.min(prev, Math.max(orderedSections.length - 1, 0)));
  }, [orderedSections.length]);

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
          {quotePanel}
          {productGroups.map((groupName) => {
            const groupEntries = entries.filter((entry) => entry.group_name === groupName);
            const newEntryId = getNewEntryId(groupName);
            const items = [
              ...groupEntries.map((entry) => ({
                id: entry.id,
                label: entryNames[entry.id] || entry.entry_name,
                image: normalizeImageValue(
                  resolvedEntryImages[entryImages[entry.id] || entry.image_url || ""]
                  || entryImages[entry.id]
                  || entry.image_url,
                ) || leafImage || BRANDED_CARD_SVG,
              })),
              {
                id: newEntryId,
                label: entryNames[newEntryId]?.trim() || "",
                image: normalizeImageValue(
                  resolvedEntryImages[entryImages[newEntryId] || ""]
                  || entryImages[newEntryId],
                ) || leafImage || BRANDED_CARD_SVG,
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
                  <div className="my-go-two-form-scale" data-local-coverflow-scale="form">
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
                  </div>
                  {isActiveGroup ? (
                    <div className="hidden lg:block">
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
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex justify-center lg:absolute lg:bottom-4 lg:left-1/2 lg:z-10 lg:-translate-x-1/2">
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
          {quotePanel}
          <div className="snap-start snap-always">
            <div className="my-go-two-coverflow-scale" data-local-coverflow-scale="main">
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
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full overflow-y-auto overflow-x-hidden relative"
        style={{ scrollbarWidth: "none", overscrollBehavior: "none" }}
      >
        {quotePanel}
        <div
          className="my-go-two-stack-shell"
          onWheel={handleStackWheel}
          onTouchStart={handleStackTouchStart}
          onTouchEnd={handleStackTouchEnd}
          onKeyDown={(event) => {
            if (coverFlowState || cardKey || orderedSections.length <= 1) return;
            if (event.key === "ArrowUp") {
              event.preventDefault();
              moveStackSection(-1);
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              moveStackSection(1);
            }
          }}
          tabIndex={0}
          role="region"
          aria-label="My Go Two categories"
          style={{ ...stackStageStyle, touchAction: "none" }}
        >
          {orderedSections.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
              No categories found.
            </div>
          ) : (
            orderedSections.map((section, index) => {
              const offset = index - activeSectionIndex;
              const absOffset = Math.abs(offset);
              const isActive = index === activeSectionIndex;
              const previewImage = getSectionPreviewImage(section);
              const y = offset * stackOffset;
              const scale = isActive ? 1 : Math.max(0.72, stackScale - absOffset * 0.04);
              const opacity = isActive ? 1 : Math.max(0, stackPeekOpacity - absOffset * 0.08);
              const cardHeight = isActive
                ? "100%"
                : isDesktopViewport
                  ? "clamp(162px, 22vh, 238px)"
                  : isTabletViewport
                    ? "clamp(146px, 20vh, 214px)"
                    : "clamp(128px, 18vh, 176px)";

              return (
                <motion.div
                  key={section.key}
                  initial={false}
                  animate={{ x: "-50%", y, scale, opacity, zIndex: orderedSections.length - absOffset }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className="absolute left-1/2 top-1/2 w-full flex items-center justify-center"
                  style={{
                    transformOrigin: "center center",
                    height: cardHeight,
                    pointerEvents: "auto",
                  }}
                >
                  <div
                    className={`my-go-two-stack-card ${isActive ? "my-go-two-stack-card--active" : "my-go-two-stack-card--peek"}`}
                    onClick={() => {
                      if (!isActive) setActiveSectionIndex(index);
                    }}
                  >
                    <div className={`my-go-two-stack-card-surface ${isActive ? "my-go-two-stack-card-surface--active" : "my-go-two-stack-card-surface--peek"}`}>
                      {isActive ? (
                        <>
                          <div className="my-go-two-stack-card-heading">
                            <CoverflowTitlePill title={section.label} />
                          </div>
                          <div className="my-go-two-coverflow-scale" data-local-coverflow-scale="main">
                            <GoTwoCoverFlow
                              items={section.items}
                              onSelect={(categoryId) => handleSelect(section.key, categoryId)}
                              focusedItemId={focusedMainCategoryBySection[section.key] ?? null}
                              showPagination={isDesktopViewport}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="my-go-two-stack-preview">
                          <div
                            className="my-go-two-stack-preview-image"
                            style={{
                              backgroundImage: previewImage ? `url(${previewImage})` : "linear-gradient(160deg, #c8bfb4 0%, #a89d92 100%)",
                            }}
                          />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <span className="surface-pill pill-asset-title rounded-full px-4 py-1.5 text-[13px] sm:text-[15px]">
                              {section.label}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="my-go-two-page h-full overflow-x-hidden">
      <style>{`
        .my-go-two-stack-shell {
          position: relative;
          width: min(100%, 1240px);
          margin: 0 auto;
          outline: none;
        }

        .my-go-two-stack-card {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .my-go-two-stack-card--active {
          z-index: 3;
        }

        .my-go-two-stack-card--peek {
          z-index: 1;
        }

        .my-go-two-stack-card-surface {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.74);
          border-radius: clamp(28px, 4vw, 40px);
          background: linear-gradient(180deg, rgba(255, 252, 248, 0.96) 0%, rgba(246, 237, 227, 0.88) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 24px 48px rgba(74, 96, 104, 0.08),
            0 8px 24px rgba(74, 96, 104, 0.04);
          overflow: hidden;
        }

        .my-go-two-stack-card-surface--active {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(14px, 2vw, 22px) clamp(14px, 2.2vw, 28px) clamp(14px, 2vw, 22px);
        }

        .my-go-two-stack-card-surface--peek {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.8vw, 18px);
        }

        .my-go-two-stack-card-heading {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: clamp(10px, 2vw, 18px);
        }

        .my-go-two-stack-preview {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: clamp(128px, 18vh, 214px);
          border-radius: inherit;
          overflow: hidden;
        }

        .my-go-two-stack-preview-image {
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: inherit;
          filter: saturate(0.98) contrast(1.01);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.36);
        }

        @media (max-width: 767px) {
          .my-go-two-page {
            overflow-x: hidden;
          }

          .my-go-two-page .my-go-two-quote-panel {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 12px 8px;
            min-height: clamp(104px, 15vh, 128px);
          }

          .my-go-two-page .my-go-two-quote-frame {
            width: min(100%, 720px);
            min-height: clamp(84px, 12vh, 108px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 12px 14px 10px;
            border: 1px solid rgba(255, 255, 255, 0.64);
            border-radius: 22px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.58) 0%, rgba(245, 233, 220, 0.28) 100%);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 10px 26px rgba(74,96,104,0.06);
            overflow: hidden;
          }

          .my-go-two-page .my-go-two-quote-text {
            margin: 0;
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-size: clamp(14px, 2.8vw, 20px);
            line-height: 1.08;
            text-align: center;
            color: var(--logo-two-color);
            text-wrap: balance;
          }

          .my-go-two-page .my-go-two-quote-author {
            margin: 0;
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(9px, 1.4vw, 12px);
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(74, 96, 104, 0.84);
          }

          .my-go-two-page .coverflow-stage-shell {
            height: auto;
            min-height: calc(100dvh - var(--header-height) - 140px);
            padding-top: 6px;
            padding-bottom: 12px;
          }

          .my-go-two-page .coverflow-stage-title-wrap {
            height: 42px;
            flex-basis: 42px;
          }

          .my-go-two-page .coverflow-title-pill {
            max-width: min(100%, 208px);
            padding: 7px 16px 8px;
          }

          .my-go-two-page .coverflow-stage-title {
            font-size: 18px;
          }

          .my-go-two-page .my-go-two-coverflow-scale {
            width: 100%;
            transform: scale(1.18);
            transform-origin: top center;
            margin: 0 auto -64px;
          }

          .my-go-two-page .my-go-two-form-scale {
            width: 100%;
            transform: scale(1.08);
            transform-origin: top center;
            margin: 0 auto -104px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .my-go-two-page .my-go-two-quote-panel {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 16px 6px;
            min-height: clamp(100px, 12vh, 128px);
          }

          .my-go-two-page .my-go-two-quote-frame {
            width: min(100%, 800px);
            min-height: clamp(78px, 9vh, 104px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 10px 14px 8px;
            overflow: hidden;
          }

          .my-go-two-page .my-go-two-quote-text {
            margin: 0;
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-size: clamp(16px, 2.2vw, 24px);
            line-height: 1.1;
            text-align: center;
            color: var(--logo-two-color);
            text-wrap: balance;
          }

          .my-go-two-page .my-go-two-quote-author {
            margin: 0;
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(10px, 1.1vw, 13px);
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(74, 96, 104, 0.84);
          }

          .my-go-two-page .coverflow-stage-shell {
            height: auto;
            min-height: calc(100dvh - var(--header-height) - 152px);
          }

          .my-go-two-page .my-go-two-coverflow-scale {
            width: 100%;
            transform: scale(1.04);
            transform-origin: top center;
            margin: 0 auto -24px;
          }

          .my-go-two-page .my-go-two-form-scale {
            width: 100%;
            transform: scale(0.95);
            transform-origin: top center;
            margin: 0 auto -60px;
          }
        }
      `}</style>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
};

export default MyGoTwo;
