import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BRANDED_CARD_SVG } from "@/features/mygotwo/shared";
import type { MyGoTwoRootItem } from "@/features/mygotwo/types";
import { useCategoryImageMap } from "@/features/mygotwo/useCategoryImageMap";
import { useMyGoTwoCatalogData } from "@/features/mygotwo/useMyGoTwoCatalogData";
import MyGoTwoWebHeader from "@/platform-ui/web/mygotwo/MyGoTwoWebHeader";
import MyGoTwoWebCoverflowStage from "@/platform-ui/web/mygotwo/MyGoTwoWebCoverflowStage";

const MyGoTwo = () => {
  const { user, loading } = useAuth();
  const { categories, webLevelOneItems } = useMyGoTwoCatalogData();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.key === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  );

  const levelTwoImageKeys = useMemo(() => {
    if (!selectedCategory?.subcategories) return [];

    return selectedCategory.subcategories
      .map((subcategory) => (typeof subcategory.image === "string" ? subcategory.image : ""))
      .filter(Boolean);
  }, [selectedCategory]);

  const levelTwoImageMap = useCategoryImageMap(levelTwoImageKeys);

  const levelTwoItems = useMemo<MyGoTwoRootItem[]>(() => {
    if (!selectedCategory?.subcategories) return [];

    return selectedCategory.subcategories.map((subcategory) => {
      const imageKey = typeof subcategory.image === "string" ? subcategory.image : "";

      return {
        id: `${selectedCategory.key}::${subcategory.id}`,
        label: subcategory.name,
        image: levelTwoImageMap[imageKey] || imageKey || BRANDED_CARD_SVG,
        imageKey,
        sourceId: subcategory.id,
        sectionKey: selectedCategory.section,
      };
    });
  }, [levelTwoImageMap, selectedCategory]);

  const visibleItems = selectedCategory ? levelTwoItems : webLevelOneItems;

  if (loading) {
    return (
      <div className="app-page flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-page flex h-screen flex-col overflow-hidden">
      <MyGoTwoWebHeader />
      <MyGoTwoWebCoverflowStage
        items={visibleItems}
        onActiveCardSelect={(item) => {
          if (selectedCategory) {
            return;
          }

          setSelectedCategoryId(item.sourceId);
        }}
      />
    </div>
  );
};

export default MyGoTwo;
