import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { useAuth } from "@/contexts/AuthContext";
import MyGoTwoMobileEntryView from "@/features/mygotwo/MyGoTwoMobileEntryView";
import MyGoTwoMobileRootView from "@/features/mygotwo/MyGoTwoMobileRootView";
import {
  BRANDED_CARD_SVG,
  NEW_ENTRY_ID,
  useMyGoTwoController,
} from "@/features/mygotwo/useMyGoTwoController";
import MyGoTwoWebEntryView from "@/platform-ui/web/mygotwo/MyGoTwoWebEntryView";
import MyGoTwoWebLayout from "@/platform-ui/web/mygotwo/MyGoTwoWebLayout";
import MyGoTwoWebView from "@/platform-ui/web/mygotwo/MyGoTwoWebView";

const MyGoTwo = () => {
  const { user, loading } = useAuth();
  const controller = useMyGoTwoController();

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

  if (controller.isLoading) {
    return (
      <div className="app-page flex min-h-screen flex-col overflow-x-hidden">
        <DashboardTopBar />
        <main className="flex flex-1 items-center justify-center overflow-x-hidden px-3 pb-6 sm:px-4 md:px-6 lg:px-8 lg:pb-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
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

  const content = <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>;

  return (
    <div className="app-page flex min-h-screen flex-col overflow-x-hidden">
      <DashboardTopBar />
      {controller.isDesktopViewport ? (
        <MyGoTwoWebLayout>{content}</MyGoTwoWebLayout>
      ) : (
        <main className="flex-1 min-h-0 overflow-x-hidden px-3 pb-6 sm:px-4 md:px-6 lg:px-8 lg:pb-8">
          {content}
        </main>
      )}
    </div>
  );
};

export default MyGoTwo;
