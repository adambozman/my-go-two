import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MyGoTwoPageLayout from "@/features/mygotwo/MyGoTwoPageLayout";
import MyGoTwoMobileEntryView from "@/features/mygotwo/MyGoTwoMobileEntryView";
import MyGoTwoMobileRootView from "@/features/mygotwo/MyGoTwoMobileRootView";
import {
  BRANDED_CARD_SVG,
  NEW_ENTRY_ID,
  useMyGoTwoController,
} from "@/features/mygotwo/useMyGoTwoController";
import MyGoTwoDesktopExperience from "@/platform-ui/web/mygotwo/MyGoTwoDesktopExperience";

function LegacyMobileMyGoTwo() {
  const controller = useMyGoTwoController();

  if (controller.isLoading) {
    return (
      <MyGoTwoPageLayout isDesktopViewport={false}>
        <main className="flex flex-1 items-center justify-center overflow-x-hidden px-3 pb-6 sm:px-4 md:px-6 lg:px-8 lg:pb-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </MyGoTwoPageLayout>
    );
  }

  const content = controller.cardKey && controller.leafSubtype ? (
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
  ) : (
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

  return (
    <MyGoTwoPageLayout isDesktopViewport={false}>
      <main className="flex-1 min-h-0 overflow-x-hidden px-3 pb-6 sm:px-4 md:px-6 lg:px-8 lg:pb-8">
        {content}
      </main>
    </MyGoTwoPageLayout>
  );
}

const MyGoTwo = () => {
  const { user, loading } = useAuth();
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false,
  );

  useEffect(() => {
    const updateViewport = () => setIsDesktopViewport(window.innerWidth >= 1024);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

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

  return isDesktopViewport ? <MyGoTwoDesktopExperience /> : <LegacyMobileMyGoTwo />;
};

export default MyGoTwo;
