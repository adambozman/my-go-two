import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CategoryItem } from "@/hooks/useCategoryRegistry";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";
import { useVerticalCoverFlow } from "@/hooks/useVerticalCoverFlow";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useTopBar } from "@/contexts/TopBarContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { resolveStorageUrl } from "@/lib/storageRefs";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import type { CardEntry, CoverFlowState, MyGoTwoRootItem } from "@/features/mygotwo/types";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "personal": "Personal",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "personal", "gifts-wishlist", "home-living", "entertainment"];

export const BRANDED_CARD_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%232d6870'/%3E%3Cstop offset='100%25' stop-color='%231e4a52'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' rx='24' fill='url(%23g)'/%3E%3C/svg%3E";
export const NEW_ENTRY_ID = "__new_entry__";
export const ENTRY_PAGE_SIZE = 5;

export const normalizeImageValue = (value?: string | null) => {
  if (!value) return "";
  return value.includes("/") ? value : "";
};

const getNewEntryId = (groupName: string) => `${NEW_ENTRY_ID}::${groupName}`;

export function useMyGoTwoController() {
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
  const [leafImage, setLeafImage] = useState("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false,
  );
  const productGroupScrollRef = useRef<HTMLDivElement>(null);
  const productGroupSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateViewport = () => setIsDesktopViewport(window.innerWidth >= 1024);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    document.documentElement.style.removeProperty("--header-height");
  }, []);

  const defaultFieldValues = useMemo(() => {
    if (!leafSubtype?.fields) return {} as Record<string, string>;
    return leafSubtype.fields.reduce(
      (acc, field) => ({ ...acc, [field.label]: field.value || "" }),
      {} as Record<string, string>,
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

  const groupsForCardKey = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.group_name).filter(Boolean))),
    [entries],
  );

  const activeGroupEntries = useMemo(
    () => entries.filter((entry) => entry.group_name === activeGroup),
    [entries, activeGroup],
  );

  const productGroups = useMemo(() => {
    const baseGroup = leafSubtype?.name;
    const orderedGroups = baseGroup ? [baseGroup] : [];

    groupsForCardKey.forEach((groupName) => {
      if (!orderedGroups.includes(groupName)) orderedGroups.push(groupName);
    });

    draftProductGroups.forEach((groupName) => {
      if (!orderedGroups.includes(groupName)) orderedGroups.push(groupName);
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

  const orderedSections = useMemo(
    () =>
      visibleSectionKeys.map((key) => ({
        key,
        label: sectionLabels[key] ?? key,
        items: (sections[key] || []).map((cat) => ({
          id: cat.key,
          label: cat.label,
          image: cat.image,
          imageKey: cat.imageKey,
        })),
      })),
    [sections, visibleSectionKeys],
  );

  const webLevelOneItems = useMemo<MyGoTwoRootItem[]>(
    () =>
      orderedSections.flatMap((section) =>
        section.items.map((item) => ({
          id: `${section.key}::${item.id}`,
          label: item.label,
          image: item.image,
          imageKey: item.imageKey,
          sourceId: item.id,
          sectionKey: section.key,
        })),
      ),
    [orderedSections],
  );

  const webFocusedLevelOneId = useMemo(() => {
    if (!lastMainSectionKey) return null;
    const categoryId = focusedMainCategoryBySection[lastMainSectionKey];
    if (!categoryId) return null;
    return `${lastMainSectionKey}::${categoryId}`;
  }, [focusedMainCategoryBySection, lastMainSectionKey]);

  const {
    activeIndex: activeSectionIndex,
    setActiveIndex: setSectionIndex,
    rotate: rotateSections,
    getStepFromSwipe,
  } = useVerticalCoverFlow({
    itemCount: orderedSections.length,
    initialActiveIndex: 0,
  });

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
    if (isDesktopViewport || coverFlowState || cardKey) return;

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
      setSectionIndex(getNearestSectionIndex(targetScrollTop));
    });
  }, [isDesktopViewport, coverFlowState, cardKey, lastMainSectionKey, getNearestSectionIndex, setSectionIndex]);

  const clearCoverFlow = useCallback(() => {
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
  }, []);

  const closeActiveSubcategory = useCallback(() => {
    if (!activeSubcategory) return;
    setFocusedSubcategoryId(activeSubcategory.id);
    setFocusedLeafItemId(null);
    setActiveSubcategory(null);
  }, [activeSubcategory]);

  const goBackFromEntries = useCallback(() => {
    const selectedLeafId = leafSubtype?.id ?? null;
    const selectedSubcategory = activeSubcategory;
    const isLeafSubcategory = Boolean(
      selectedSubcategory && (!selectedSubcategory.products || selectedSubcategory.products.length === 0),
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
  }, [leafSubtype, activeSubcategory]);

  useEffect(() => {
    if (cardKey) {
      setBackState({ label: "", onBack: goBackFromEntries });
    } else if (activeSubcategory && coverFlowState) {
      setBackState({ label: "", onBack: closeActiveSubcategory });
    } else if (coverFlowState) {
      setBackState({ label: "", onBack: clearCoverFlow });
    } else {
      setBackState(null);
    }
  }, [setBackState, coverFlowState, activeSubcategory, cardKey, clearCoverFlow, closeActiveSubcategory, goBackFromEntries]);

  const handleCategoryClick = useCallback((item: CategoryItem) => {
    if (scrollRef.current) {
      savedScrollTop.current = scrollRef.current.scrollTop;
    }
    const subtypes = (item.fields as unknown as SubtypeItem[]) || [];
    const subcategories = item.subcategories as unknown as SubcategoryGroup[] | undefined;
    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setLastMainSectionKey(item.section);
      setFocusedMainCategoryBySection((prev) => ({ ...prev, [item.section]: item.key }));
      setCoverFlowState({
        name: item.label,
        subtypes,
        subcategories,
        section: item.section,
        categoryId: item.key.replace(/-male$|-female$|-nb$/, ""),
      });
      setFocusedSubcategoryId(null);
      setFocusedLeafItemId(null);
    }
  }, []);

  const handleSelect = useCallback((sectionKey: string, categoryKey: string) => {
    const sectionItems = sections[sectionKey] || [];
    const directMatch = sectionItems.find((item) => item.key === categoryKey);
    if (directMatch) {
      handleCategoryClick(directMatch);
      return;
    }

    for (const key of sectionOrder) {
      const item = (sections[key] || []).find((category) => category.key === categoryKey);
      if (item) {
        handleCategoryClick(item);
        return;
      }
    }
  }, [sections, handleCategoryClick]);

  const handleSubcategorySelect = useCallback((subcategory: SubcategoryGroup) => {
    if (subcategory.products && subcategory.products.length > 0) {
      setFocusedSubcategoryId(subcategory.id);
      setFocusedLeafItemId(null);
      setActiveSubcategory(subcategory);
      return;
    }

    const key = `${coverFlowState?.name}__${coverFlowState?.name || ""}__${subcategory.name}`;
    setFocusedSubcategoryId(subcategory.id);
    setFocusedLeafItemId(null);
    setActiveSubcategory(subcategory);
    setCardKey(key);
    setLeafSubtype(subcategory as unknown as SubtypeItem);
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage(subcategory.image || "");
    setActiveEntryIndexByGroup({});
    setActiveEntryPageByGroup({});
    setDraftProductGroups([]);
    setActiveGroup("");
  }, [coverFlowState?.name]);

  const handleSubtypeSelect = useCallback((subtype: SubtypeItem, subcategoryName?: string) => {
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    setFocusedLeafItemId(subtype.id);
    setCardKey(key);
    setLeafSubtype(subtype);
    setLeafSubcategoryName(subcategoryName);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage(subtype.image || "");
    setActiveEntryIndexByGroup({});
    setActiveEntryPageByGroup({});
    setDraftProductGroups([]);
    setActiveGroup("");
  }, [coverFlowState?.name]);

  const handleNameChange = useCallback((itemId: string, value: string) => {
    setEntryNames((prev) => ({ ...prev, [itemId]: value }));
  }, []);

  const handleFieldChange = useCallback((itemId: string, fieldLabel: string, value: string) => {
    setEntryDrafts((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [fieldLabel]: value,
      },
    }));
  }, []);

  const handleImageChange = useCallback((itemId: string, imageUrl: string) => {
    setEntryImages((prev) => ({ ...prev, [itemId]: imageUrl }));
  }, []);

  const handleSaveEntry = useCallback(async (itemId: string) => {
    if (!user || !cardKey || !leafSubtype) return;

    const isNewEntry = itemId.startsWith(`${NEW_ENTRY_ID}::`);
    const targetGroup = isNewEntry
      ? itemId.replace(`${NEW_ENTRY_ID}::`, "")
      : (entries.find((entry) => entry.id === itemId)?.group_name || activeGroup || leafSubtype.name);
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to save entry.";
      toast({ title: "Error saving", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }, [
    user,
    cardKey,
    leafSubtype,
    entries,
    activeGroup,
    entryNames,
    entryDrafts,
    defaultFieldValues,
    entryImages,
    toast,
  ]);

  const handleDeleteEntry = useCallback(async (itemId: string) => {
    if (!itemId || itemId.startsWith(`${NEW_ENTRY_ID}::`)) return;

    setSaving(true);
    try {
      const { error } = await supabase.from("card_entries").delete().eq("id", itemId);
      if (error) throw error;

      setEntries((prev) => prev.filter((entry) => entry.id !== itemId));
      toast({ title: "Deleted", description: "Entry removed." });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to delete entry.";
      toast({ title: "Error deleting", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }, [toast]);

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

  const handleCreateGroup = useCallback(() => {
    const nextGroupName = getNextGeneratedGroupName();
    setDraftProductGroups((prev) => (
      prev.includes(nextGroupName) ? prev : [...prev, nextGroupName]
    ));
    setActiveGroup(nextGroupName);
    setActiveEntryIndexByGroup((prev) => ({ ...prev, [nextGroupName]: 0 }));
    setActiveEntryPageByGroup((prev) => ({ ...prev, [nextGroupName]: 1 }));
    toast({ title: "Group created" });
  }, [getNextGeneratedGroupName, toast]);

  const activeSection = orderedSections[activeSectionIndex] ?? null;

  return {
    isLoading: registryLoading || genderLoading,
    gender,
    isDesktopViewport,
    coverFlowState,
    activeSubcategory,
    focusedSubcategoryId,
    focusedLeafItemId,
    focusedMainCategoryBySection,
    cardKey,
    leafSubtype,
    leafImage,
    leafSubcategoryName,
    leafCategoryName,
    entries,
    productGroups,
    activeGroup,
    activeEntryIndexByGroup,
    activeEntryPageByGroup,
    entryDrafts,
    entryNames,
    entryImages,
    resolvedEntryImages,
    defaultFieldValues,
    saving,
    activeSection,
    scrollRef,
    sectionRefs,
    productGroupScrollRef,
    productGroupSectionRefs,
    webLevelOneItems,
    webFocusedLevelOneId,
    rotateSections,
    getStepFromSwipe,
    normalizeImageValue,
    clearCoverFlow,
    closeActiveSubcategory,
    goBackFromEntries,
    setActiveGroup,
    setActiveEntryIndexByGroup,
    setActiveEntryPageByGroup,
    handleSelect,
    handleSubcategorySelect,
    handleSubtypeSelect,
    handleNameChange,
    handleFieldChange,
    handleImageChange,
    handleSaveEntry,
    handleDeleteEntry,
    handleCreateGroup,
  };
}
