import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import MyGoTwoMobileEntryView from "@/features/mygotwo/MyGoTwoMobileEntryView";
import MyGoTwoMobileRootView from "@/features/mygotwo/MyGoTwoMobileRootView";
import {
  BRANDED_CARD_SVG,
  NEW_ENTRY_ID,
  useMyGoTwoController,
} from "@/features/mygotwo/useMyGoTwoController";
import MyGoTwoWebEntryView from "@/platform-ui/web/mygotwo/MyGoTwoWebEntryView";
import MyGoTwoWebView from "@/platform-ui/web/mygotwo/MyGoTwoWebView";

const MyGoTwo = () => {
  const controller = useMyGoTwoController();

  if (controller.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const renderContent = () => {
    if (controller.cardKey && controller.leafSubtype) {
      if (controller.isDesktopViewport) {
        return (
          <motion.div
            key="entry-web"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <MyGoTwoWebEntryView
              leafSubtype={controller.leafSubtype}
              leafSubcategoryName={controller.leafSubcategoryName}
              leafCategoryName={controller.leafCategoryName}
              leafImage={controller.leafImage}
              entries={controller.entries}
              productGroups={controller.productGroups}
              activeGroup={controller.activeGroup}
              setActiveGroup={controller.setActiveGroup}
              activeEntryIndexByGroup={controller.activeEntryIndexByGroup}
              setActiveEntryIndexByGroup={controller.setActiveEntryIndexByGroup}
              entryNames={controller.entryNames}
              entryDrafts={controller.entryDrafts}
              entryImages={controller.entryImages}
              resolvedEntryImages={controller.resolvedEntryImages}
              defaultFieldValues={controller.defaultFieldValues}
              saving={controller.saving}
              newEntryPrefix={NEW_ENTRY_ID}
              fallbackImage={BRANDED_CARD_SVG}
              normalizeImageValue={controller.normalizeImageValue}
              onBack={controller.goBackFromEntries}
              onEntryNameChange={controller.handleNameChange}
              onFieldChange={controller.handleFieldChange}
              onImageChange={controller.handleImageChange}
              onSaveEntry={controller.handleSaveEntry}
              onDeleteEntry={controller.handleDeleteEntry}
              onCreateGroup={controller.handleCreateGroup}
            />
          </motion.div>
        );
      }

      return (
        <MyGoTwoMobileEntryView
          leafSubtype={controller.leafSubtype}
          leafSubcategoryName={controller.leafSubcategoryName}
          leafCategoryName={controller.leafCategoryName}
          leafImage={controller.leafImage}
          entries={controller.entries}
          productGroups={controller.productGroups}
          activeGroup={controller.activeGroup}
          productGroupScrollRef={controller.productGroupScrollRef}
          productGroupSectionRefs={controller.productGroupSectionRefs}
          activeEntryIndexByGroup={controller.activeEntryIndexByGroup}
          activeEntryPageByGroup={controller.activeEntryPageByGroup}
          entryNames={controller.entryNames}
          entryDrafts={controller.entryDrafts}
          entryImages={controller.entryImages}
          resolvedEntryImages={controller.resolvedEntryImages}
          defaultFieldValues={controller.defaultFieldValues}
          saving={controller.saving}
          brandedCardSvg={BRANDED_CARD_SVG}
          newEntryPrefix={NEW_ENTRY_ID}
          normalizeImageValue={controller.normalizeImageValue}
          setActiveGroup={controller.setActiveGroup}
          setActiveEntryIndexByGroup={controller.setActiveEntryIndexByGroup}
          setActiveEntryPageByGroup={controller.setActiveEntryPageByGroup}
          onBack={controller.goBackFromEntries}
          onEntryNameChange={controller.handleNameChange}
          onFieldChange={controller.handleFieldChange}
          onImageChange={controller.handleImageChange}
          onSaveEntry={controller.handleSaveEntry}
          onDeleteEntry={controller.handleDeleteEntry}
          onCreateGroup={controller.handleCreateGroup}
        />
      );
    }

    if (!controller.isDesktopViewport) {
      return (
        <MyGoTwoMobileRootView
          coverFlowState={controller.coverFlowState}
          activeSubcategory={controller.activeSubcategory}
          focusedSubcategoryId={controller.focusedSubcategoryId}
          focusedLeafItemId={controller.focusedLeafItemId}
          activeSection={controller.activeSection}
          focusedCategoryId={
            controller.activeSection
              ? controller.focusedMainCategoryBySection[controller.activeSection.key] ?? null
              : null
          }
          gender={controller.gender}
          scrollRef={controller.scrollRef}
          sectionRef={(node) => {
            if (controller.activeSection) {
              controller.sectionRefs.current[controller.activeSection.key] = node;
            }
          }}
          onRotateFromSwipe={(info) => {
            const step = controller.getStepFromSwipe(info.offset.y, info.offset.x, info.velocity.y);
            if (step !== 0) controller.rotateSections(step);
          }}
          onSelectRoot={controller.handleSelect}
          onClearCoverFlow={controller.clearCoverFlow}
          onSubcategoryBack={controller.closeActiveSubcategory}
          onSubcategorySelect={controller.handleSubcategorySelect}
          onSubtypeSelect={controller.handleSubtypeSelect}
        />
      );
    }

    return (
      <MyGoTwoWebView
        coverFlowState={controller.coverFlowState}
        activeSubcategory={controller.activeSubcategory}
        focusedSubcategoryId={controller.focusedSubcategoryId}
        focusedLeafItemId={controller.focusedLeafItemId}
        webLevelOneItems={controller.webLevelOneItems}
        webFocusedLevelOneId={controller.webFocusedLevelOneId}
        rotateSections={controller.rotateSections}
        getStepFromSwipe={controller.getStepFromSwipe}
        onRootSelect={controller.handleSelect}
        onClearCoverFlow={controller.clearCoverFlow}
        onSubcategoryBack={controller.closeActiveSubcategory}
        onSubcategorySelect={controller.handleSubcategorySelect}
        onSubtypeSelect={controller.handleSubtypeSelect}
      />
    );
  };

  return <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>;
};

export default MyGoTwo;
