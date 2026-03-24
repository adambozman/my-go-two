import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";
import WebPaginatedCoverflow from "@/platform-ui/web/mygotwo/WebPaginatedCoverflow";
import WebTemplateCoverFlow from "@/platform-ui/web/mygotwo/WebTemplateCoverFlow";
import {
  WEB_MYGOTWO_STAGE_CLASS,
  WEB_MYGOTWO_STAGE_SHELL_CLASS,
  WEB_MYGOTWO_STAGE_STYLE,
} from "@/platform-ui/web/mygotwo/webMyGoTwo.layout";

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
  if (coverFlowState) {
    return (
      <motion.div
        key="drilldown-web"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={WEB_MYGOTWO_STAGE_CLASS}
        style={WEB_MYGOTWO_STAGE_STYLE}
      >
        <div className="snap-start snap-always">
          <WebTemplateCoverFlow
            templateName={coverFlowState.name}
            subtypes={coverFlowState.subtypes}
            subcategories={coverFlowState.subcategories}
            activeSubcategory={activeSubcategory}
            onSubcategorySelect={onSubcategorySelect}
            onBack={activeSubcategory ? onSubcategoryBack : onClearCoverFlow}
            onSelect={onSubtypeSelect}
            focusedSubcategoryId={focusedSubcategoryId}
            focusedLeafItemId={focusedLeafItemId}
          />
        </div>
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
      onPanEnd={(_event, info: PanInfo) => {
        const step = getStepFromSwipe(0, info.offset.x, info.velocity.x);
        if (step !== 0) rotateSections(step);
      }}
    >
      {webLevelOneItems.length > 0 ? (
        <div className={WEB_MYGOTWO_STAGE_SHELL_CLASS}>
          <WebPaginatedCoverflow
            items={webLevelOneItems}
            pageSize={webLevelOneItems.length}
            focusedItemId={webFocusedLevelOneId}
            showPagination={false}
            onSelect={(id) => {
              const selected = webLevelOneItems.find((item) => item.id === id);
              if (!selected) return;
              onRootSelect(selected.sectionKey, selected.sourceId);
            }}
          />
        </div>
      ) : (
        <p className="text-muted-foreground text-center mt-12">No categories found.</p>
      )}
    </motion.div>
  );
}
