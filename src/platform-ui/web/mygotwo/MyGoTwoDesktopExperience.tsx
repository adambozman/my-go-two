import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { MyGoTwoController } from "@/features/mygotwo/useMyGoTwoController";
import { NEW_ENTRY_ID } from "@/features/mygotwo/useMyGoTwoController";
import MyGoTwoDesktopCardBrowser from "@/platform-ui/web/mygotwo/MyGoTwoDesktopCardBrowser";
import MyGoTwoWebPageLayout from "@/platform-ui/web/mygotwo/MyGoTwoWebPageLayout";
import MyGoTwoWebLayout from "@/platform-ui/web/mygotwo/MyGoTwoWebLayout";
import MyGoTwoWebView from "@/platform-ui/web/mygotwo/MyGoTwoWebView";

interface MyGoTwoDesktopExperienceProps {
  controller: MyGoTwoController;
}

export default function MyGoTwoDesktopExperience({ controller }: MyGoTwoDesktopExperienceProps) {

  if (controller.isLoading) {
    return (
      <MyGoTwoWebPageLayout>
        <MyGoTwoWebLayout>
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </MyGoTwoWebLayout>
      </MyGoTwoWebPageLayout>
    );
  }

  return (
    <MyGoTwoWebPageLayout>
      <MyGoTwoWebLayout>
        <AnimatePresence mode="wait">
          {controller.leafSubtype ? (
            <motion.div
              key="desktop-entry"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              <MyGoTwoDesktopCardBrowser
                leafSubtype={controller.leafSubtype}
                leafSubcategoryName={controller.leafSubcategoryName}
                leafCategoryName={controller.leafCategoryName}
                leafImage={controller.leafImage}
                entries={controller.entries}
                productGroups={controller.productGroups}
                activeGroup={controller.activeGroup}
                activeEntryIndexByGroup={controller.activeEntryIndexByGroup}
                setActiveEntryIndexByGroup={controller.setActiveEntryIndexByGroup}
                entryNames={controller.entryNames}
                entryDrafts={controller.entryDrafts}
                entryImages={controller.entryImages}
                resolvedEntryImages={controller.resolvedEntryImages}
                defaultFieldValues={controller.defaultFieldValues}
                saving={controller.saving}
                newEntryPrefix={NEW_ENTRY_ID}
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
          ) : (
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
          )}
        </AnimatePresence>
      </MyGoTwoWebLayout>
    </MyGoTwoWebPageLayout>
  );
}
