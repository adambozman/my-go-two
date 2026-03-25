import { Loader2 } from "lucide-react";
import type { MyGoTwoController } from "@/features/mygotwo/useMyGoTwoController";
import MyGoTwoMobileEntryBrowser from "@/platform-ui/mobile/mygotwo/MyGoTwoMobileEntryBrowser";
import MyGoTwoMobilePageLayout from "@/platform-ui/mobile/mygotwo/MyGoTwoMobilePageLayout";
import MyGoTwoMobileRootBrowser from "@/platform-ui/mobile/mygotwo/MyGoTwoMobileRootBrowser";

interface MyGoTwoMobileExperienceProps {
  controller: MyGoTwoController;
}

export default function MyGoTwoMobileExperience({ controller }: MyGoTwoMobileExperienceProps) {
  if (controller.isLoading) {
    return (
      <MyGoTwoMobilePageLayout>
        <div className="flex h-full min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MyGoTwoMobilePageLayout>
    );
  }

  return (
    <MyGoTwoMobilePageLayout>
      {controller.cardKey && controller.leafSubtype ? (
        <MyGoTwoMobileEntryBrowser controller={controller} />
      ) : (
        <MyGoTwoMobileRootBrowser
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
      )}
    </MyGoTwoMobilePageLayout>
  );
}
