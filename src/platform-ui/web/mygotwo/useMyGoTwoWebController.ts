import { useCallback, useEffect, useMemo, useState } from "react";
import type { CategoryItem } from "@/hooks/useCategoryRegistry";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useTopBar } from "@/contexts/TopBarContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { resolveStorageUrl } from "@/lib/storageRefs";
import { useVerticalCoverFlow } from "@/hooks/useVerticalCoverFlow";
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

export const WEB_NEW_ENTRY_ID = "__new_entry__";

const getNewEntryId = (groupName: string) => `${WEB_NEW_ENTRY_ID}::${groupName}`;

export const normalizeImageValue = (value?: string | null) => {
  if (!value) return "";
  return value.includes("/") ? value : "";
};

export function useMyGoTwoWebController() {
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

  const {
    rotate: rotateSections,
    getStepFromSwipe,
  } = useVerticalCoverFlow({
    itemCount: orderedSections.length,
    initialActiveIndex: 0,
  });

  const [coverFlowState, setCoverFlowState] = useState<CoverFlowState | null>(null);
  const [focusedMainCategoryBySection, setFocusedMainCategoryBySection] = useState<Record<string, string>>({});
  const [lastMainSectionKey, setLastMainSectionKey] = useState<string | null>(null);
  const [focusedSubcategoryId, setFocusedSubcategoryId] = useState<string | null>(null);
  const [focusedLeafItemId, setFocusedLeafItemId] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);

  const [cardKey, setCardKey] = useState<string | null>(null);
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafImage, setLeafImage] = useState("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();

  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const [activeEntryIndexByGroup, setActiveEntryIndexByGroup] = useState<Record<string, number>>({});
  const [draftProductGroups, setDraftProductGroups] = useState<string[]>([]);
  const [entryDrafts, setEntryDrafts] = useState<Record<string, Record<string, string>>>({});
  const [entryNames, setEntryNames] = useState<Record<string, string>>({});
  const [entryImages, setEntryImages] = useState<Record<string, string>>({});
  const [resolvedEntryImages, setResolvedEntryImages] = useState<Record<string, string>>({});
  const [activeGroup, setActiveGroup] = useState("");

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

  const defaultFieldValues = useMemo(() => {
    if (!leafSubtype?.fields) return {} as Record<string, string>;
    return leafSubtype.fields.reduce(
      (acc, field) => ({ ...acc, [field.label]: field.value || "" }),
      {} as Record<string, string>,
    );
  }, [leafSubtype]);

  const groupsForCardKey = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.group_name).filter(Boolean))),
    [entries],
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
  }, [draftProductGroups, groupsForCardKey, leafSubtype?.name]);

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
  }, [entries, leafSubtype, cardKey, groupsForCardKey, activeGroup, defaultFieldValues]);

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
      [activeGroup]: Math.min(prev[activeGroup] ?? 0, entries.filter((entry) => entry.group_name === activeGroup).length),
    }));
  }, [activeGroup, entries]);

  const clearCoverFlow = useCallback(() => {
    setCoverFlowState(null);
    setFocusedSubcategoryId(null);
    setFocusedLeafItemId(null);
    setActiveSubcategory(null);
    setCardKey(null);
    setLeafSubtype(null);
    setLeafImage("");
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(undefined);
    setEntries([]);
    setActiveEntryIndexByGroup({});
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
    setLeafImage("");
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(undefined);
    setEntries([]);
    setActiveEntryIndexByGroup({});
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
  }, [setBackState, cardKey, activeSubcategory, coverFlowState, clearCoverFlow, closeActiveSubcategory, goBackFromEntries]);

  const handleCategoryClick = useCallback((item: CategoryItem) => {
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
    const directMatch = (sections[sectionKey] || []).find((item) => item.key === categoryKey);
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

    const isNewEntry = itemId.startsWith(`${WEB_NEW_ENTRY_ID}::`);
    const targetGroup = isNewEntry
      ? itemId.replace(`${WEB_NEW_ENTRY_ID}::`, "")
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
  }, [user, cardKey, leafSubtype, entries, activeGroup, entryNames, entryDrafts, defaultFieldValues, entryImages, toast]);

  const handleDeleteEntry = useCallback(async (itemId: string) => {
    if (!itemId || itemId.startsWith(`${WEB_NEW_ENTRY_ID}::`)) return;

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

  const handleCreateGroup = useCallback(() => {
    const existingGroups = new Set([...productGroups, ...groupsForCardKey, ...draftProductGroups]);
    let nextNumber = 1;
    let nextGroupName = "__product_group_1";

    while (existingGroups.has(nextGroupName)) {
      nextNumber += 1;
      nextGroupName = `__product_group_${nextNumber}`;
    }

    setDraftProductGroups((prev) => (
      prev.includes(nextGroupName) ? prev : [...prev, nextGroupName]
    ));
    setActiveGroup(nextGroupName);
    setActiveEntryIndexByGroup((prev) => ({ ...prev, [nextGroupName]: 0 }));
    toast({ title: "Group created" });
  }, [productGroups, groupsForCardKey, draftProductGroups, toast]);

  return {
    isLoading: registryLoading || genderLoading,
    coverFlowState,
    activeSubcategory,
    focusedSubcategoryId,
    focusedLeafItemId,
    webLevelOneItems,
    webFocusedLevelOneId,
    rotateSections,
    getStepFromSwipe,
    clearCoverFlow,
    closeActiveSubcategory,
    goBackFromEntries,
    handleSelect,
    handleSubcategorySelect,
    handleSubtypeSelect,
    leafSubtype,
    leafSubcategoryName,
    leafCategoryName,
    leafImage,
    entries,
    productGroups,
    activeGroup,
    activeEntryIndexByGroup,
    setActiveEntryIndexByGroup,
    entryNames,
    entryDrafts,
    entryImages,
    resolvedEntryImages,
    defaultFieldValues,
    saving,
    handleNameChange,
    handleFieldChange,
    handleImageChange,
    handleSaveEntry,
    handleDeleteEntry,
    handleCreateGroup,
    normalizeImageValue,
  };
}
