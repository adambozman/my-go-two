import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination-controls";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import type { MyGoTwoController } from "@/features/mygotwo/useMyGoTwoController";
import {
  BRANDED_CARD_SVG,
  ENTRY_PAGE_SIZE,
  NEW_ENTRY_ID,
} from "@/features/mygotwo/useMyGoTwoController";
import MobileEntryCard from "@/platform-ui/mobile/mygotwo/MobileEntryCard";
import MobileEntryCoverflow from "@/platform-ui/mobile/mygotwo/MobileEntryCoverflow";

interface MyGoTwoMobileEntryBrowserProps {
  controller: MyGoTwoController;
}

export default function MyGoTwoMobileEntryBrowser({ controller }: MyGoTwoMobileEntryBrowserProps) {
  if (!controller.leafSubtype) return null;

  const getNearestGroupIndex = (scrollTop: number) => {
    if (controller.productGroups.length === 0) return 0;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    controller.productGroups.forEach((groupName, index) => {
      const groupTop = controller.productGroupSectionRefs.current[groupName]?.offsetTop ?? 0;
      const distance = Math.abs(groupTop - scrollTop);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  };

  return (
    <motion.div
      key="entry-mobile"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      ref={controller.productGroupScrollRef}
      className="relative h-full snap-y snap-mandatory overflow-x-hidden overflow-y-auto"
      style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
      onScroll={(event) => {
        const nextGroupIndex = getNearestGroupIndex(event.currentTarget.scrollTop);
        const nextGroup = controller.productGroups[nextGroupIndex];
        if (nextGroup && nextGroup !== controller.activeGroup) {
          controller.setActiveGroup(nextGroup);
        }
      }}
    >
      {controller.productGroups.map((groupName) => {
        const groupEntries = controller.entries.filter((entry) => entry.group_name === groupName);
        const newEntryId = `${NEW_ENTRY_ID}::${groupName}`;
        const items = [
          ...groupEntries.map((entry) => ({
            id: entry.id,
            label: controller.entryNames[entry.id] || entry.entry_name,
            image: controller.normalizeImageValue(
              controller.resolvedEntryImages[controller.entryImages[entry.id] || entry.image_url || ""]
              || controller.entryImages[entry.id]
              || entry.image_url,
            ) || controller.leafImage || BRANDED_CARD_SVG,
          })),
          {
            id: newEntryId,
            label: controller.entryNames[newEntryId]?.trim() || "",
            image: controller.normalizeImageValue(
              controller.resolvedEntryImages[controller.entryImages[newEntryId] || ""]
              || controller.entryImages[newEntryId],
            ) || controller.leafImage || BRANDED_CARD_SVG,
          },
        ];
        const currentPage = controller.activeEntryPageByGroup[groupName] ?? 1;
        const totalPages = Math.max(1, Math.ceil(items.length / ENTRY_PAGE_SIZE));
        const pageStart = (currentPage - 1) * ENTRY_PAGE_SIZE;
        const paginatedItems = items.slice(pageStart, pageStart + ENTRY_PAGE_SIZE);
        const activeIndex = controller.activeEntryIndexByGroup[groupName] ?? 0;
        const activeIndexOnPage = paginatedItems.length === 0
          ? 0
          : Math.min(Math.max(activeIndex - pageStart, 0), paginatedItems.length - 1);
        const previousImage = items.length === 0
          ? ""
          : items[(activeIndex - 1 + items.length) % items.length]?.image || "";
        const isActiveGroup = groupName === controller.activeGroup;

        return (
          <div
            key={groupName}
            ref={(node) => {
              controller.productGroupSectionRefs.current[groupName] = node;
            }}
            className="coverflow-stage-shell snap-always snap-start"
          >
            <CoverflowTitlePill title={controller.leafSubtype.name} showBackArrow onBack={controller.goBackFromEntries} />
            <div className="flex flex-col items-center justify-center">
              <MobileEntryCoverflow
                items={paginatedItems}
                activeIndex={activeIndexOnPage}
                previousImage={previousImage}
                onActiveIndexChange={(index) => {
                  controller.setActiveEntryIndexByGroup((prev) => ({
                    ...prev,
                    [groupName]: pageStart + index,
                  }));
                }}
                renderActiveCard={(item) => (
                  <MobileEntryCard
                    subtype={controller.leafSubtype!}
                    subcategoryName={controller.leafSubcategoryName}
                    categoryName={controller.leafCategoryName}
                    entryName={controller.entryNames[item.id] || ""}
                    values={controller.entryDrafts[item.id] || controller.defaultFieldValues}
                    imageUrl={controller.normalizeImageValue(controller.entryImages[item.id])}
                    saving={controller.saving}
                    isEditing={!item.id.startsWith(`${NEW_ENTRY_ID}::`)}
                    onEntryNameChange={(name) => controller.handleNameChange(item.id, name)}
                    onChange={(fieldLabel, value) => controller.handleFieldChange(item.id, fieldLabel, value)}
                    onImageChange={(imageUrl) => controller.handleImageChange(item.id, imageUrl)}
                    onSave={() => controller.handleSaveEntry(item.id)}
                    onDelete={() => controller.handleDeleteEntry(item.id)}
                  />
                )}
              />
              {isActiveGroup && totalPages > 1 ? (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    controller.setActiveEntryPageByGroup((prev) => ({ ...prev, [groupName]: page }));
                    controller.setActiveEntryIndexByGroup((prev) => ({
                      ...prev,
                      [groupName]: Math.min((page - 1) * ENTRY_PAGE_SIZE, Math.max(items.length - 1, 0)),
                    }));
                  }}
                  orientation="horizontal"
                  className="mt-4"
                />
              ) : null}
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex justify-center pb-6">
        <Button
          variant="outline"
          className="h-10 rounded-full border-border px-6 text-foreground"
          onClick={controller.handleCreateGroup}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>
    </motion.div>
  );
}
