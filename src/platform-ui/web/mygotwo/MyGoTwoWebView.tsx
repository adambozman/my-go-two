import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useCategoryImageMap } from "@/features/mygotwo/useCategoryImageMap";
import MyGoTwoDesktopPage from "@/platform-ui/web/mygotwo/MyGoTwoDesktopPage";
import WebPaginatedCoverflow from "@/platform-ui/web/mygotwo/WebPaginatedCoverflow";
import WebTemplateCoverFlow from "@/platform-ui/web/mygotwo/WebTemplateCoverFlow";
import { WEB_MYGOTWO_STAGE_SHELL_CLASS } from "@/platform-ui/web/mygotwo/webMyGoTwo.layout";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";

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
  onRootSelect: (itemId: string) => void;
  onClearCoverFlow: () => void;
  onSubcategoryBack: () => void;
  onSubcategorySelect: (subcategory: SubcategoryGroup) => void;
  onSubtypeSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
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
    const rootItems = webLevelOneItems.map((item) => ({
      id: item.id,
      label: item.label,
      image: item.image,
      imageKey: item.imageKey,
    }));

    return (
      <MyGoTwoDesktopPage>
        <div className={WEB_MYGOTWO_STAGE_SHELL_CLASS}>
          <CoverflowTitlePill title="My Go Two" />
          <WebPaginatedCoverflow
            items={rootItems}
            focusedItemId={webFocusedLevelOneId}
            onSelect={onRootSelect}
            variant="hero"
          />
        </div>
      </MyGoTwoDesktopPage>
    );
  }

  return (
    <MyGoTwoDesktopPage>
      <WebTemplateCoverFlow
        templateName={coverFlowState.name}
        subtypes={coverFlowState.subtypes.map((subtype) => ({
          ...subtype,
          image: resolveMappedImage(drilldownImageMap, subtype.image, subtype.id),
        }))}
        subcategories={coverFlowState.subcategories?.map((subcategory) => ({
          ...subcategory,
          image: resolveMappedImage(drilldownImageMap, subcategory.image, subcategory.id),
          products: subcategory.products?.map((product) => ({
            ...product,
            image: resolveMappedImage(drilldownImageMap, product.image, product.id),
          })),
        }))}
        activeSubcategory={activeSubcategory}
        onSubcategorySelect={onSubcategorySelect}
        onBack={activeSubcategory ? onSubcategoryBack : onClearCoverFlow}
        onSelect={onSubtypeSelect}
        focusedSubcategoryId={focusedSubcategoryId}
        focusedLeafItemId={focusedLeafItemId}
      />
    </MyGoTwoDesktopPage>
  );
}
