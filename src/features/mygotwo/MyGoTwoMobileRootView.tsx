import type { RefObject } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import TemplateCoverFlow from "@/components/TemplateCoverFlow";
import type { CoverFlowState } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";

interface ActiveSection {
  key: string;
  label: string;
  items: { id: string; label: string; image: string }[];
}

interface MyGoTwoMobileRootViewProps {
  coverFlowState: CoverFlowState | null;
  activeSubcategory: SubcategoryGroup | null;
  focusedSubcategoryId: string | null;
  focusedLeafItemId: string | null;
  activeSection: ActiveSection | null;
  focusedCategoryId: string | null;
  gender: string;
  scrollRef: RefObject<HTMLDivElement>;
  sectionRef: (node: HTMLDivElement | null) => void;
  onRotateFromSwipe: (info: PanInfo) => void;
  onSelectRoot: (sectionKey: string, categoryId: string) => void;
  onClearCoverFlow: () => void;
  onSubcategoryBack: () => void;
  onSubcategorySelect: (subcategory: SubcategoryGroup) => void;
  onSubtypeSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
}

export default function MyGoTwoMobileRootView({
  coverFlowState,
  activeSubcategory,
  focusedSubcategoryId,
  focusedLeafItemId,
  activeSection,
  focusedCategoryId,
  gender,
  scrollRef,
  sectionRef,
  onRotateFromSwipe,
  onSelectRoot,
  onClearCoverFlow,
  onSubcategoryBack,
  onSubcategorySelect,
  onSubtypeSelect,
}: MyGoTwoMobileRootViewProps) {
  if (coverFlowState) {
    return (
      <motion.div
        key="drilldown-mobile"
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
            onSubcategorySelect={onSubcategorySelect}
            onBack={activeSubcategory ? onSubcategoryBack : onClearCoverFlow}
            onSelect={onSubtypeSelect}
            creating={false}
            gender={gender}
            section={coverFlowState.section}
            categoryId={coverFlowState.categoryId}
            focusedSubcategoryId={focusedSubcategoryId}
            focusedLeafItemId={focusedLeafItemId}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="main-mobile"
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full"
      onPanEnd={(_event, info) => onRotateFromSwipe(info)}
    >
      {activeSection ? (
        <div ref={sectionRef}>
          <GoTwoCoverFlow
            items={activeSection.items}
            onSelect={(categoryId) => onSelectRoot(activeSection.key, categoryId)}
            focusedItemId={focusedCategoryId}
            showPagination
            sectionTitle={activeSection.label}
          />
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">No categories found.</p>
      )}
    </motion.div>
  );
}
