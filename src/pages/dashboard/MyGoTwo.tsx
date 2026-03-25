import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { HandDrawnArrowLeft } from "@/components/ui/hand-drawn-arrows";
import { useAuth } from "@/contexts/AuthContext";
import { useMyGoTwoCatalogData } from "@/features/mygotwo/useMyGoTwoCatalogData";
import type { MyGoTwoFlowItem } from "@/features/mygotwo/types";
import { useMyGoTwoFlow } from "@/features/mygotwo/useMyGoTwoFlow";
import MyGoTwoProductCard from "@/platform-ui/web/mygotwo/MyGoTwoProductCard";
import MyGoTwoWebHeader from "@/platform-ui/web/mygotwo/MyGoTwoWebHeader";
import MyGoTwoWebCoverflowStage from "@/platform-ui/web/mygotwo/MyGoTwoWebCoverflowStage";

const MyGoTwo = () => {
  const { user, loading } = useAuth();
  const { categories, webLevelOneItems, isLoading } = useMyGoTwoCatalogData();
  const {
    currentLevel,
    items,
    hasBack,
    goBack,
    selectItem,
    selectedCategory,
    selectedSubcategory,
    selectedProduct,
    productEntries,
    refreshProductEntries,
  } = useMyGoTwoFlow({
    userId: user?.id ?? "",
    categories,
    levelOneItems: webLevelOneItems,
  });
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  useEffect(() => {
    setActiveItemId((current) => {
      if (current && items.some((item) => item.id === current)) {
        return current;
      }

      return items[0]?.id ?? null;
    });
  }, [items]);

  const activeLevelFourItem = useMemo(
    () => items.find((item) => item.id === activeItemId) as MyGoTwoFlowItem | undefined,
    [activeItemId, items],
  );

  const productEntryMap = useMemo(
    () => Object.fromEntries(productEntries.map((entry) => [entry.id, entry])),
    [productEntries],
  );
  const handleActiveItemChange = useCallback((item: MyGoTwoFlowItem) => {
    setActiveItemId(item.id);
  }, []);

  if (loading || isLoading) {
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
    <div className="app-page relative flex h-screen flex-col overflow-hidden">
      <MyGoTwoWebHeader />
      {hasBack ? (
        <button
          type="button"
          onClick={goBack}
          aria-label={`Back from level ${currentLevel}`}
          className="absolute left-4 top-[122px] z-20 flex items-center gap-2 text-[#26495d] transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(31,88,120,0.42)] sm:left-6 md:left-8"
          style={{
            background: "transparent",
          }}
        >
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(145deg, rgba(222,234,238,0.62) 0%, rgba(176,201,210,0.28) 100%)",
              backdropFilter: "blur(22px) saturate(160%)",
              border: "1px solid rgba(214,239,246,0.52)",
              boxShadow:
                "inset 8px 8px 18px rgba(255,255,255,0.22), inset -10px -12px 20px rgba(33,88,107,0.18), 0 10px 22px rgba(31,88,120,0.16)",
            }}
          >
            <HandDrawnArrowLeft className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium tracking-[0.18em] uppercase">
            Back
          </span>
        </button>
      ) : null}
      <MyGoTwoWebCoverflowStage
        items={items}
        onActiveCardSelect={selectItem}
        activeItemId={activeItemId}
        onActiveItemChange={handleActiveItemChange}
        interactiveItemId={currentLevel === 4 ? activeItemId : null}
        visibleRadius={currentLevel === 4 ? 2 : 3}
        renderCard={
          currentLevel === 4 && selectedCategory && selectedSubcategory && selectedProduct
            ? (item, isActive) => {
                const flowItem = item as MyGoTwoFlowItem;
                const activeEntry =
                  flowItem.kind === "entry" ? productEntryMap[flowItem.sourceId] ?? null : null;

                return (
                  <MyGoTwoProductCard
                    userId={user.id}
                    categoryLabel={selectedCategory.label}
                    subcategory={selectedSubcategory}
                    product={selectedProduct}
                    activeEntry={activeEntry}
                    compact
                    interactive={isActive}
                    onSaved={async (entryId) => {
                      await refreshProductEntries();
                      if (entryId) {
                        setActiveItemId(entryId);
                      }
                    }}
                  />
                );
              }
            : undefined
        }
      />
    </div>
  );
};

export default MyGoTwo;
