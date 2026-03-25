import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTopBar } from "@/contexts/TopBarContext";
import { useToast } from "@/hooks/use-toast";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import type { CardEntry, CoverFlowState } from "@/features/mygotwo/types";
import { useMyGoTwoCatalogData } from "@/features/mygotwo/useMyGoTwoCatalogData";
import {
  createMyGoTwoEntry,
  deleteMyGoTwoEntry,
  fetchMyGoTwoEntries,
  resolveMyGoTwoImages,
  updateMyGoTwoEntry,
} from "@/features/mygotwo/myGoTwoData";
import { NEW_ENTRY_ID, getNewEntryId, normalizeImageValue } from "@/features/mygotwo/shared";

export function useMyGoTwoWebController() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { setBackState } = useTopBar();
  const { categories, webLevelOneItems, isLoading } = useMyGoTwoCatalogData();

  const [focusedRootItemId, setFocusedRootItemId] = useState<string | null>(null);
  const [coverFlowState, setCoverFlowState] = useState<CoverFlowState | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryGroup | null>(null);
  const [focusedSubcategoryId, setFocusedSubcategoryId] = useState<string | null>(null);
  const [focusedLeafItemId, setFocusedLeafItemId] = useState<string | null>(null);

  const [cardKey, setCardKey] = useState<string | null>(null);
  const [leafSubtype, setLeafSubtype] = useState<SubtypeItem | null>(null);
  const [leafImage, setLeafImage] = useState("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();

  const [entries, setEntries] = useState<CardEntry[]>([]);
  const [entryDrafts, setEntryDrafts] = useState<Record<string, Record<string, string>>>({});
  const [entryNames, setEntryNames] = useState<Record<string, string>>({});
  const [entryImages, setEntryImages] = useState<Record<string, string>>({});
  const [resolvedEntryImages, setResolvedEntryImages] = useState<Record<string, string>>({});
  const [activeGroup, setActiveGroup] = useState("");
  const [focusedEntryIdByGroup, setFocusedEntryIdByGroup] = useState<Record<string, string>>({});
  const [draftProductGroups, setDraftProductGroups] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !cardKey) {
      setEntries([]);
      return;
    }

    let cancelled = false;
    fetchMyGoTwoEntries(user.id, cardKey).then((nextEntries) => {
      if (!cancelled) setEntries(nextEntries);
    });

    return () => {
      cancelled = true;
    };
  }, [user, cardKey]);

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
    const orderedGroups = leafSubtype?.name ? [leafSubtype.name] : [];

    groupsForCardKey.forEach((groupName) => {
      if (!orderedGroups.includes(groupName)) orderedGroups.push(groupName);
    });

    draftProductGroups.forEach((groupName) => {
      if (!orderedGroups.includes(groupName)) orderedGroups.push(groupName);
    });

    return orderedGroups;
  }, [draftProductGroups, groupsForCardKey, leafSubtype?.name]);

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

    productGroups.forEach((groupName) => {
      const newEntryId = getNewEntryId(groupName);
      nextDrafts[newEntryId] = defaultFieldValues;
      nextNames[newEntryId] = "";
      nextImages[newEntryId] = "";
    });

    setEntryDrafts(nextDrafts);
    setEntryNames(nextNames);
    setEntryImages(nextImages);
  }, [cardKey, defaultFieldValues, entries, leafSubtype, productGroups]);

  useEffect(() => {
    let cancelled = false;
    resolveMyGoTwoImages([
      ...entries.map((entry) => entry.image_url || ""),
      ...Object.values(entryImages),
    ]).then((nextMap) => {
      if (!cancelled) setResolvedEntryImages(nextMap);
    });

    return () => {
      cancelled = true;
    };
  }, [entries, entryImages]);

  useEffect(() => {
    if (!leafSubtype || !cardKey) return;
    setActiveGroup((prev) => {
      if (prev && productGroups.includes(prev)) return prev;
      return productGroups[0] || leafSubtype.name;
    });
  }, [cardKey, leafSubtype, productGroups]);

  useEffect(() => {
    if (!activeGroup) return;
    const newEntryId = getNewEntryId(activeGroup);
    setFocusedEntryIdByGroup((prev) => {
      if (prev[activeGroup]) return prev;
      const firstEntry = entries.find((entry) => entry.group_name === activeGroup);
      return { ...prev, [activeGroup]: firstEntry?.id || newEntryId };
    });
  }, [activeGroup, entries]);

  const clearCoverFlow = useCallback(() => {
    setCoverFlowState(null);
    setActiveSubcategory(null);
    setFocusedSubcategoryId(null);
    setFocusedLeafItemId(null);
    setCardKey(null);
    setLeafSubtype(null);
    setLeafImage("");
    setLeafSubcategoryName(undefined);
    setLeafCategoryName(undefined);
    setEntries([]);
    setEntryDrafts({});
    setEntryNames({});
    setEntryImages({});
    setResolvedEntryImages({});
    setActiveGroup("");
    setFocusedEntryIdByGroup({});
    setDraftProductGroups([]);
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
    setEntryDrafts({});
    setEntryNames({});
    setEntryImages({});
    setResolvedEntryImages({});
    setActiveGroup("");
    setFocusedEntryIdByGroup({});
    setDraftProductGroups([]);

    if (isLeafSubcategory) {
      setActiveSubcategory(null);
      setFocusedSubcategoryId(selectedSubcategory?.id ?? null);
      setFocusedLeafItemId(null);
      return;
    }

    setFocusedLeafItemId(focusId);
  }, [activeSubcategory, leafSubtype]);

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
  }, [activeSubcategory, cardKey, clearCoverFlow, closeActiveSubcategory, coverFlowState, goBackFromEntries, setBackState]);

  const handleRootSelect = useCallback((itemId: string) => {
    const selectedRoot = webLevelOneItems.find((item) => item.id === itemId);
    if (!selectedRoot) return;

    const selectedCategory = categories.find(
      (item) => item.section === selectedRoot.sectionKey && item.key === selectedRoot.sourceId,
    );
    if (!selectedCategory) return;

    const subtypes = (selectedCategory.fields as unknown as SubtypeItem[]) || [];
    const subcategories = selectedCategory.subcategories as unknown as SubcategoryGroup[] | undefined;
    if (subtypes.length === 0 && (!subcategories || subcategories.length === 0)) return;

    setFocusedRootItemId(itemId);
    setCoverFlowState({
      name: selectedCategory.label,
      subtypes,
      subcategories,
      section: selectedCategory.section,
      categoryId: selectedCategory.key.replace(/-male$|-female$|-nb$/, ""),
    });
    setFocusedSubcategoryId(null);
    setFocusedLeafItemId(null);
  }, [categories, webLevelOneItems]);

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
    setActiveGroup("");
    setFocusedEntryIdByGroup({});
    setDraftProductGroups([]);
  }, [coverFlowState?.name]);

  const handleSubtypeSelect = useCallback((subtype: SubtypeItem, subcategoryName?: string) => {
    const key = `${coverFlowState?.name}__${subcategoryName || ""}__${subtype.name}`;
    setFocusedLeafItemId(subtype.id);
    setCardKey(key);
    setLeafSubtype(subtype);
    setLeafSubcategoryName(subcategoryName);
    setLeafCategoryName(coverFlowState?.name);
    setLeafImage(subtype.image || "");
    setActiveGroup("");
    setFocusedEntryIdByGroup({});
    setDraftProductGroups([]);
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
        const inserted = await createMyGoTwoEntry({
          userId: user.id,
          cardKey,
          groupName: targetGroup,
          entryName,
          fieldValues,
          imageUrl,
        });

        setEntries((prev) => [...prev, inserted]);
        setEntryDrafts((prev) => ({ ...prev, [inserted.id]: fieldValues, [itemId]: defaultFieldValues }));
        setEntryNames((prev) => ({ ...prev, [inserted.id]: entryName, [itemId]: "" }));
        setEntryImages((prev) => ({ ...prev, [inserted.id]: imageUrl || "", [itemId]: "" }));
        setActiveGroup(targetGroup);
        setFocusedEntryIdByGroup((prev) => ({ ...prev, [targetGroup]: inserted.id }));
        toast({ title: "Saved!", description: `${entryName} created.` });
      } else {
        await updateMyGoTwoEntry({
          entryId: itemId,
          entryName,
          fieldValues,
          imageUrl,
        });

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
  }, [activeGroup, cardKey, defaultFieldValues, entries, entryDrafts, entryImages, entryNames, leafSubtype, toast, user]);

  const handleDeleteEntry = useCallback(async (itemId: string) => {
    if (!itemId || itemId.startsWith(`${NEW_ENTRY_ID}::`)) return;

    setSaving(true);
    try {
      await deleteMyGoTwoEntry(itemId);
      setEntries((prev) => prev.filter((entry) => entry.id !== itemId));
      setFocusedEntryIdByGroup((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((groupName) => {
          if (next[groupName] === itemId) {
            next[groupName] = getNewEntryId(groupName);
          }
        });
        return next;
      });
      toast({ title: "Deleted", description: "Entry removed." });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to delete entry.";
      toast({ title: "Error deleting", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }, [toast]);

  const handleCreateGroup = useCallback(() => {
    const existingGroups = new Set([...productGroups, ...draftProductGroups]);
    let nextNumber = 1;
    let nextGroupName = "__product_group_1";

    while (existingGroups.has(nextGroupName)) {
      nextNumber += 1;
      nextGroupName = `__product_group_${nextNumber}`;
    }

    setDraftProductGroups((prev) => (prev.includes(nextGroupName) ? prev : [...prev, nextGroupName]));
    setActiveGroup(nextGroupName);
    setFocusedEntryIdByGroup((prev) => ({ ...prev, [nextGroupName]: getNewEntryId(nextGroupName) }));
    toast({ title: "Group created" });
  }, [draftProductGroups, productGroups, toast]);

  return {
    isLoading,
    coverFlowState,
    activeSubcategory,
    focusedSubcategoryId,
    focusedLeafItemId,
    focusedRootItemId,
    webLevelOneItems,
    cardKey,
    leafSubtype,
    leafImage,
    leafSubcategoryName,
    leafCategoryName,
    entries,
    productGroups,
    activeGroup,
    focusedEntryIdByGroup,
    entryDrafts,
    entryNames,
    entryImages,
    resolvedEntryImages,
    defaultFieldValues,
    saving,
    normalizeImageValue,
    setActiveGroup,
    setFocusedEntryIdByGroup,
    handleRootSelect,
    clearCoverFlow,
    closeActiveSubcategory,
    goBackFromEntries,
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

export type MyGoTwoWebController = ReturnType<typeof useMyGoTwoWebController>;
