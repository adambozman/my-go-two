import type { RefObject } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import type { CoverFlowState } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import MobileCardCoverflow from "@/platform-ui/mobile/mygotwo/MobileCardCoverflow";
import MobileTemplateCoverflow from "@/platform-ui/mobile/mygotwo/MobileTemplateCoverflow";

interface ActiveSection {
  key: string;
  label: string;
  items: { id: string; label: string; image: string }[];
}

interface MyGoTwoMobileRootBrowserProps {
  coverFlowState: CoverFlowState | null;
  activeSubcategory: SubcategoryGroup | null;
  focusedSubcategoryId: string | null;
  focusedLeafItemId: string | null;
  activeSection: ActiveSection | null;
  focusedCategoryId: string | null;
  scrollRef: RefObject<HTMLDivElement>;
  sectionRef: (node: HTMLDivElement | null) => void;
  onRotateFromSwipe: (info: PanInfo) => void;
  onSelectRoot: (sectionKey: string, categoryId: string) => void;
  onClearCoverFlow: () => void;
  onSubcategoryBack: () => void;
  onSubcategorySelect: (subcategory: SubcategoryGroup) => void;
  onSubtypeSelect: (subtype: SubtypeItem, subcategoryName?: string) => void;
}

export default function MyGoTwoMobileRootBrowser({
  coverFlowState,
  activeSubcategory,
  focusedSubcategoryId,
  focusedLeafItemId,
  activeSection,
  focusedCategoryId,
  scrollRef,
  sectionRef,
  onRotateFromSwipe,
  onSelectRoot,
  onClearCoverFlow,
  onSubcategoryBack,
  onSubcategorySelect,
  onSubtypeSelect,
}: MyGoTwoMobileRootBrowserProps) {
  if (coverFlowState) {
    return (
      <motion.div
        key="drilldown-mobile"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative h-full snap-y snap-mandatory overflow-x-hidden overflow-y-auto"
        style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
      >
        <div className="snap-always snap-start">
          <MobileTemplateCoverflow
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
          <MobileCardCoverflow
            items={activeSection.items}
            initialActiveIndex={Math.max(0, activeSection.items.findIndex((item) => item.id === focusedCategoryId))}
            sectionTitle={activeSection.label}
            onSelect={(categoryId) => onSelectRoot(activeSection.key, categoryId)}
          />
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">No categories found.</p>
      )}
    </motion.div>
  );
}
