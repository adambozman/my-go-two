import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import MyGoTwoDesktopBrowser from "@/platform-ui/web/mygotwo/MyGoTwoDesktopBrowser";
import type { MyGoTwoWebCoverflowItem } from "@/platform-ui/web/mygotwo/MyGoTwoWebCoverflow";
import { useMyGoTwoDesktopImageMap } from "@/platform-ui/web/mygotwo/useMyGoTwoDesktopImageMap";

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
  const drilldownImageKeys = coverFlowState
    ? activeSubcategory?.products?.length
      ? activeSubcategory.products.map((product) => (product as any).image || product.id)
      : coverFlowState.subcategories?.length
        ? coverFlowState.subcategories.map((subcategory) => subcategory.image || subcategory.id)
        : coverFlowState.subtypes.map((subtype) => (subtype as any).image || subtype.id)
    : [];

  const drilldownImageMap = useMyGoTwoDesktopImageMap(drilldownImageKeys);

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

  const products = activeSubcategory?.products?.length ? activeSubcategory.products : coverFlowState.subtypes;
  const productItems = products.map((product) => ({
    id: product.id,
    label: product.name,
    image: resolveMappedImage(drilldownImageMap, (product as any).image, product.id),
    imageKey: (product as any).image || product.id,
  }));

  return (
    <MyGoTwoDesktopBrowser
      pageKey={`leaf-browser:${activeSubcategory?.id || coverFlowState.name}`}
      title={activeSubcategory?.name || coverFlowState.name}
      onBack={activeSubcategory ? onSubcategoryBack : onClearCoverFlow}
      items={productItems}
      focusedItemId={focusedLeafItemId}
      onCommit={(id) => {
        const selectedProduct = products.find((product) => product.id === id);
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
