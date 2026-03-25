import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useCategoryImageMap } from "@/features/mygotwo/useCategoryImageMap";
import MyGoTwoDesktopBrowser from "@/platform-ui/web/mygotwo/MyGoTwoDesktopBrowser";
import type { MyGoTwoWebCoverflowItem } from "@/platform-ui/web/mygotwo/MyGoTwoWebCoverflow";

interface WebRootItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
  sourceId: string;
  sectionKey: string;
}

interface WebCoverFlowState {
  name: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
}

interface MyGoTwoWebViewProps {
  coverFlowState: WebCoverFlowState | null;
  activeSubcategory: SubcategoryGroup | null;
  focusedSubcategoryId: string | null;
  focusedLeafItemId: string | null;
  webLevelOneItems: WebRootItem[];
  webFocusedLevelOneId: string | null;
  rotateSections: (step: number) => void;
  getStepFromSwipe: (primaryOffset: number, crossOffset: number, primaryVelocity?: number) => number;
  onRootSelect: (sectionKey: string, categoryId: string) => void;
  onClearCoverFlow: () => void;
  onSubcategoryBack: () => void;
  onSubcategorySelect: (subcategory: SubcategoryGroup) => void;
  onSubtypeSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
}

function toDesktopItems(
  items: Array<{ id: string; label: string; image: string; imageKey?: string }>,
): MyGoTwoWebCoverflowItem[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    image: item.image,
    imageKey: item.imageKey,
  }));
}

function resolveMappedImage(imageMap: Record<string, string>, source: string | undefined, fallbackId: string) {
  const imageKey = source || fallbackId;
  const mapped = imageMap[imageKey];
  if (mapped) return mapped;
  if (source && source.includes("/")) return source;
  return "";
}

function resolveSubtypeItems(
  coverFlowState: WebCoverFlowState,
  activeSubcategory: SubcategoryGroup | null,
): SubtypeItem[] {
  return activeSubcategory?.products?.length ? activeSubcategory.products : coverFlowState.subtypes;
}

export default function MyGoTwoWebView({
  coverFlowState,
  activeSubcategory,
  focusedSubcategoryId,
  focusedLeafItemId,
  webLevelOneItems,
  webFocusedLevelOneId,
  rotateSections,
  getStepFromSwipe,
  onRootSelect,
  onClearCoverFlow,
  onSubcategoryBack,
  onSubcategorySelect,
  onSubtypeSelect,
}: MyGoTwoWebViewProps) {
  const leafItems = coverFlowState ? resolveSubtypeItems(coverFlowState, activeSubcategory) : [];
  const drilldownImageKeys = coverFlowState
    ? activeSubcategory?.products?.length
      ? activeSubcategory.products.map((product) => product.image || product.id)
      : coverFlowState.subcategories?.length
        ? coverFlowState.subcategories.map((subcategory) => subcategory.image || subcategory.id)
        : leafItems.map((subtype) => subtype.image || subtype.id)
    : [];

  const drilldownImageMap = useCategoryImageMap(drilldownImageKeys);

  if (!coverFlowState) {
    return (
      <MyGoTwoDesktopBrowser
        pageKey="root"
        items={toDesktopItems(webLevelOneItems)}
        focusedItemId={webFocusedLevelOneId}
        onRotateSections={rotateSections}
        getStepFromSwipe={getStepFromSwipe}
        onCommit={(id) => {
          const selected = webLevelOneItems.find((item) => item.id === id);
          if (!selected) return;
          onRootSelect(selected.sectionKey, selected.sourceId);
        }}
      />
    );
  }

  const hasSubcategories = Boolean(coverFlowState.subcategories?.length);

  if (hasSubcategories && !activeSubcategory) {
    const items = coverFlowState.subcategories!.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.name,
      image: resolveMappedImage(drilldownImageMap, subcategory.image, subcategory.id),
      imageKey: subcategory.image || subcategory.id,
    }));

    return (
      <MyGoTwoDesktopBrowser
        pageKey={`subcategory-browser:${coverFlowState.name}`}
        title={coverFlowState.name}
        onBack={onClearCoverFlow}
        items={items}
        focusedItemId={focusedSubcategoryId}
        onCommit={(id) => {
          const selectedSubcategory = coverFlowState.subcategories!.find((subcategory) => subcategory.id === id);
          const selectedItem = items.find((item) => item.id === id);
          if (!selectedSubcategory) return;
          onSubcategorySelect({ ...selectedSubcategory, image: selectedItem?.image || selectedSubcategory.image });
        }}
      />
    );
  }

  const productItems = leafItems.map((product) => ({
    id: product.id,
    label: product.name,
    image: resolveMappedImage(drilldownImageMap, product.image, product.id),
    imageKey: product.image || product.id,
  }));

  return (
    <MyGoTwoDesktopBrowser
      pageKey={`leaf-browser:${activeSubcategory?.id || coverFlowState.name}`}
      title={activeSubcategory?.name || coverFlowState.name}
      onBack={activeSubcategory ? onSubcategoryBack : onClearCoverFlow}
      items={productItems}
      focusedItemId={focusedLeafItemId}
      onCommit={(id) => {
        const selectedProduct = leafItems.find((product) => product.id === id);
        const selectedItem = productItems.find((item) => item.id === id);
        if (!selectedProduct) return;
        onSubtypeSelect(
          { ...selectedProduct, image: selectedItem?.image || selectedProduct.image },
          activeSubcategory?.name,
        );
      }}
    />
  );
}
