import { useEffect, useMemo, useState } from "react";

import type { CategoryItem } from "@/hooks/useCategoryRegistry";
import { BRANDED_CARD_SVG } from "@/features/mygotwo/shared";
import { fetchMyGoTwoEntries, resolveMyGoTwoImages } from "@/features/mygotwo/myGoTwoData";
import type {
  CardEntry,
  MyGoTwoFlowItem,
  MyGoTwoFlowLevel,
  MyGoTwoRootItem,
} from "@/features/mygotwo/types";
import { useCategoryImageMap } from "@/features/mygotwo/useCategoryImageMap";

type UseMyGoTwoFlowInput = {
  userId: string;
  categories: CategoryItem[];
  levelOneItems: MyGoTwoRootItem[];
};

function resolveImage(
  imageKey: string | undefined,
  directImage: string | undefined,
  imageMap: Record<string, string>,
) {
  if (imageKey && imageMap[imageKey]) {
    return imageMap[imageKey];
  }

  if (directImage) {
    return directImage;
  }

  return BRANDED_CARD_SVG;
}

export function useMyGoTwoFlow({
  userId,
  categories,
  levelOneItems,
}: UseMyGoTwoFlowInput) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productEntries, setProductEntries] = useState<CardEntry[]>([]);
  const [entryImageMap, setEntryImageMap] = useState<Record<string, string>>({});

  async function loadProductEntries(productId: string) {
    if (!productId || !userId) {
      setProductEntries([]);
      setEntryImageMap({});
      return;
    }

    const entries = await fetchMyGoTwoEntries(userId, productId);
    setProductEntries(entries);

    const resolvedImages = await resolveMyGoTwoImages(
      entries.map((entry) => entry.image_url || ""),
    );
    setEntryImageMap(resolvedImages);
  }

  const selectedCategory = useMemo(
    () => categories.find((category) => category.key === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  const selectedSubcategory = useMemo(
    () =>
      selectedCategory?.subcategories?.find((subcategory) => subcategory.id === selectedSubcategoryId) ??
      null,
    [selectedCategory, selectedSubcategoryId],
  );

  const selectedProduct = useMemo(
    () => selectedSubcategory?.products.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId, selectedSubcategory],
  );

  const levelTwoImageKeys = useMemo(
    () =>
      (selectedCategory?.subcategories ?? [])
        .map((subcategory) => subcategory.image)
        .filter(Boolean),
    [selectedCategory],
  );

  const levelThreeImageKeys = useMemo(
    () =>
      (selectedSubcategory?.products ?? [])
        .map((product) => product.image)
        .filter(Boolean),
    [selectedSubcategory],
  );

  const levelTwoImageMap = useCategoryImageMap(levelTwoImageKeys);
  const levelThreeImageMap = useCategoryImageMap(levelThreeImageKeys);

  useEffect(() => {
    let cancelled = false;

    if (!selectedProduct || !userId) {
      setProductEntries([]);
      setEntryImageMap({});
      return;
    }

    async function loadEntries() {
      const entries = await fetchMyGoTwoEntries(userId, selectedProduct.id);
      if (cancelled) return;

      setProductEntries(entries);

      const resolvedImages = await resolveMyGoTwoImages(
        entries.map((entry) => entry.image_url || ""),
      );

      if (!cancelled) {
        setEntryImageMap(resolvedImages);
      }
    }

    loadEntries();

    return () => {
      cancelled = true;
    };
  }, [selectedProduct, userId]);

  const levelOneFlowItems = useMemo<MyGoTwoFlowItem[]>(
    () =>
      levelOneItems.map((item) => ({
        ...item,
        level: 1,
        kind: "category",
      })),
    [levelOneItems],
  );

  const levelTwoFlowItems = useMemo<MyGoTwoFlowItem[]>(
    () =>
      (selectedCategory?.subcategories ?? []).map((subcategory) => ({
        id: `${selectedCategory?.key}::${subcategory.id}`,
        label: subcategory.name,
        image: resolveImage(subcategory.image, subcategory.image, levelTwoImageMap),
        imageKey: subcategory.image,
        sourceId: subcategory.id,
        sectionKey: selectedCategory?.section ?? "",
        level: 2,
        kind: "subcategory",
        parentId: selectedCategory?.key,
      })),
    [levelTwoImageMap, selectedCategory],
  );

  const levelThreeFlowItems = useMemo<MyGoTwoFlowItem[]>(
    () =>
      (selectedSubcategory?.products ?? []).map((product) => ({
        id: `${selectedCategory?.key}::${selectedSubcategory?.id}::${product.id}`,
        label: product.name,
        image: resolveImage(product.image, product.image, levelThreeImageMap),
        imageKey: product.image,
        sourceId: product.id,
        sectionKey: selectedCategory?.section ?? "",
        level: 3,
        kind: "product",
        parentId: selectedSubcategory?.id,
      })),
    [levelThreeImageMap, selectedCategory, selectedSubcategory],
  );

  const levelFourFlowItems = useMemo<MyGoTwoFlowItem[]>(() => {
    if (!selectedProduct || !selectedSubcategory || !selectedCategory) {
      return [];
    }

    const productImage = resolveImage(
      selectedProduct.image,
      selectedProduct.image,
      levelThreeImageMap,
    );

    const createItem: MyGoTwoFlowItem = {
      id: `${selectedCategory.key}::${selectedSubcategory.id}::${selectedProduct.id}::__create__`,
      label: `New ${selectedProduct.name}`,
      image: productImage,
      imageKey: selectedProduct.image,
      sourceId: selectedProduct.id,
      sectionKey: selectedCategory.section,
      level: 4,
      kind: "create-entry",
      parentId: selectedProduct.id,
    };

    const entryItems = productEntries.map<MyGoTwoFlowItem>((entry) => ({
      id: entry.id,
      label: entry.entry_name || selectedProduct.name,
      image: entry.image_url ? entryImageMap[entry.image_url] || productImage : productImage,
      sourceId: entry.id,
      sectionKey: selectedCategory.section,
      level: 4,
      kind: "entry",
      parentId: selectedProduct.id,
    }));

    return [createItem, ...entryItems];
  }, [
    entryImageMap,
    levelThreeImageMap,
    productEntries,
    selectedCategory,
    selectedProduct,
    selectedSubcategory,
  ]);

  const currentLevel = (selectedProduct
    ? 4
    : selectedSubcategory
      ? 3
      : selectedCategory
        ? 2
        : 1) as MyGoTwoFlowLevel;

  const items = useMemo(() => {
    switch (currentLevel) {
      case 1:
        return levelOneFlowItems;
      case 2:
        return levelTwoFlowItems;
      case 3:
        return levelThreeFlowItems;
      case 4:
        return levelFourFlowItems;
      default:
        return levelOneFlowItems;
    }
  }, [currentLevel, levelFourFlowItems, levelOneFlowItems, levelThreeFlowItems, levelTwoFlowItems]);

  function selectItem(item: MyGoTwoFlowItem) {
    switch (item.kind) {
      case "category":
        setSelectedCategoryId(item.sourceId);
        setSelectedSubcategoryId(null);
        setSelectedProductId(null);
        break;
      case "subcategory":
        setSelectedSubcategoryId(item.sourceId);
        setSelectedProductId(null);
        break;
      case "product":
        setSelectedProductId(item.sourceId);
        break;
      case "entry":
      case "create-entry":
        break;
    }
  }

  function goBack() {
    if (selectedProductId) {
      setSelectedProductId(null);
      return;
    }

    if (selectedSubcategoryId) {
      setSelectedSubcategoryId(null);
      return;
    }

    if (selectedCategoryId) {
      setSelectedCategoryId(null);
    }
  }

  return {
    currentLevel,
    items,
    hasBack: currentLevel > 1,
    goBack,
    selectItem,
    selectedCategory,
    selectedSubcategory,
    selectedProduct,
    productEntries,
    refreshProductEntries: selectedProduct
      ? () => loadProductEntries(selectedProduct.id)
      : async () => undefined,
  };
}
