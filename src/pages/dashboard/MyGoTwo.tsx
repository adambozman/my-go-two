import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { CAROUSEL_LAYOUT, CAROUSEL_LAYOUT_DESKTOP, COVERFLOW_DESKTOP_Y_OFFSET } from "@/lib/carouselConfig";
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
import { resolveStorageUrl } from "@/lib/storageRefs";
import { normalizeIndex, useVerticalCoverFlow } from "@/hooks/useVerticalCoverFlow";
import WebPaginatedCoverflow from "@/platform-ui/web/mygotwo/WebPaginatedCoverflow";
import WebTemplateCoverFlow from "@/platform-ui/web/mygotwo/WebTemplateCoverFlow";

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
  const [leafImage, setLeafImage] = useState<string>("");
  const [leafSubcategoryName, setLeafSubcategoryName] = useState<string | undefined>();
  const [leafCategoryName, setLeafCategoryName] = useState<string | undefined>();
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
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
    // Ensure coverflow layout math uses the global header variable from CSS,
    // not any stale inline override left from a previous runtime.
    document.documentElement.style.removeProperty("--header-height");
  }, []);

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

  const orderedSections = visibleSectionKeys.map((key) => ({
    key,
    label: sectionLabels[key] ?? key,
    items: (sections[key] || []).map((cat) => ({ id: cat.key, label: cat.label, image: cat.image, imageKey: cat.imageKey })),
  }));

  const webLevelOneItems = useMemo(
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
    selectIndex: selectSectionIndex,
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
      if (isDesktopViewport) {
        return (
          <motion.div
            key="drilldown-web"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative"
            style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
          >
            <div className="snap-start snap-always">
              <WebTemplateCoverFlow
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
              />
            </div>
          </motion.div>
        );
      }

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

    if (!isDesktopViewport) {
      const activeSection = orderedSections[activeSectionIndex];

      return (
        <motion.div
          key="main-mobile"
          ref={scrollRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full"
          onPanEnd={(_e, info) => {
            const step = getStepFromSwipe(info.offset.y, info.offset.x, info.velocity.y);
            if (step !== 0) rotateSections(step);
          }}
        >
          {activeSection ? (
            <div
              ref={(node) => {
                sectionRefs.current[activeSection.key] = node;
              }}
            >
              <GoTwoCoverFlow
                items={activeSection.items}
                onSelect={(categoryId) => handleSelect(activeSection.key, categoryId)}
                focusedItemId={focusedMainCategoryBySection[activeSection.key] ?? null}
                showPagination
                sectionTitle={activeSection.label}
              />
            </div>
          ) : (
            <p className="text-muted-foreground text-center mt-12">No categories found.</p>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        key="main-web"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative h-full w-full"
        style={{ touchAction: "pan-y" }}
        onWheel={(event) => {
          if (Math.abs(event.deltaY) < 14) return;
          rotateSections(event.deltaY > 0 ? 1 : -1);
        }}
        onPanEnd={(_e, info) => {
          const step = getStepFromSwipe(0, info.offset.x, info.velocity.x);
          if (step !== 0) rotateSections(step);
        }}
      >
        {webLevelOneItems.length > 0 ? (
          <div className="coverflow-stage-shell">
            <WebPaginatedCoverflow
              items={webLevelOneItems}
              pageSize={webLevelOneItems.length}
              focusedItemId={webFocusedLevelOneId}
              showPagination={false}
              onSelect={(id) => {
                const selected = webLevelOneItems.find((item) => item.id === id);
                if (!selected) return;
                handleSelect(selected.sectionKey, selected.sourceId);
              }}
            />
          </div>
        ) : (
          <p className="text-muted-foreground text-center mt-12">No categories found.</p>
        )}
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
