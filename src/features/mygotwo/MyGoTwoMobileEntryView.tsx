import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination-controls";
import FormCoverFlowCarousel from "@/components/ui/FormCoverFlowCarousel";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import ProductEntryCard from "@/components/ui/ProductEntryCard";
import type { CardEntry } from "@/features/mygotwo/types";
import type { SubtypeItem } from "@/data/templateSubtypes";
import { ENTRY_PAGE_SIZE } from "@/features/mygotwo/useMyGoTwoController";

interface MyGoTwoMobileEntryViewProps {
  leafSubtype: SubtypeItem;
  leafSubcategoryName?: string;
  leafCategoryName?: string;
  leafImage: string;
  entries: CardEntry[];
  productGroups: string[];
  activeGroup: string;
  productGroupScrollRef: RefObject<HTMLDivElement>;
  productGroupSectionRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  activeEntryIndexByGroup: Record<string, number>;
  activeEntryPageByGroup: Record<string, number>;
  entryNames: Record<string, string>;
  entryDrafts: Record<string, Record<string, string>>;
  entryImages: Record<string, string>;
  resolvedEntryImages: Record<string, string>;
  defaultFieldValues: Record<string, string>;
  saving: boolean;
  brandedCardSvg: string;
  newEntryPrefix: string;
  normalizeImageValue: (value?: string | null) => string;
  setActiveGroup: (group: string) => void;
  setActiveEntryIndexByGroup: Dispatch<SetStateAction<Record<string, number>>>;
  setActiveEntryPageByGroup: Dispatch<SetStateAction<Record<string, number>>>;
  onBack: () => void;
  onEntryNameChange: (itemId: string, value: string) => void;
  onFieldChange: (itemId: string, fieldLabel: string, value: string) => void;
  onImageChange: (itemId: string, imageUrl: string) => void;
  onSaveEntry: (itemId: string) => void;
  onDeleteEntry: (itemId: string) => void;
  onCreateGroup: () => void;
}

export default function MyGoTwoMobileEntryView({
  leafSubtype,
  leafSubcategoryName,
  leafCategoryName,
  leafImage,
  entries,
  productGroups,
  activeGroup,
  productGroupScrollRef,
  productGroupSectionRefs,
  activeEntryIndexByGroup,
  activeEntryPageByGroup,
  entryNames,
  entryDrafts,
  entryImages,
  resolvedEntryImages,
  defaultFieldValues,
  saving,
  brandedCardSvg,
  newEntryPrefix,
  normalizeImageValue,
  setActiveGroup,
  setActiveEntryIndexByGroup,
  setActiveEntryPageByGroup,
  onBack,
  onEntryNameChange,
  onFieldChange,
  onImageChange,
  onSaveEntry,
  onDeleteEntry,
  onCreateGroup,
}: MyGoTwoMobileEntryViewProps) {
  const getNearestGroupIndex = (scrollTop: number) => {
    if (productGroups.length === 0) return 0;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    productGroups.forEach((groupName, index) => {
      const groupTop = productGroupSectionRefs.current[groupName]?.offsetTop ?? 0;
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
      ref={productGroupScrollRef}
      className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative"
      style={{ scrollbarWidth: "none", overscrollBehavior: "none", touchAction: "pan-y" }}
      onScroll={(event) => {
        const nextGroupIndex = getNearestGroupIndex(event.currentTarget.scrollTop);
        const nextGroup = productGroups[nextGroupIndex];
        if (nextGroup && nextGroup !== activeGroup) {
          setActiveGroup(nextGroup);
        }
      }}
    >
      {productGroups.map((groupName) => {
        const groupEntries = entries.filter((entry) => entry.group_name === groupName);
        const newEntryId = `${newEntryPrefix}::${groupName}`;
        const items = [
          ...groupEntries.map((entry) => ({
            id: entry.id,
            label: entryNames[entry.id] || entry.entry_name,
            image: normalizeImageValue(
              resolvedEntryImages[entryImages[entry.id] || entry.image_url || ""]
              || entryImages[entry.id]
              || entry.image_url,
            ) || leafImage || brandedCardSvg,
          })),
          {
            id: newEntryId,
            label: entryNames[newEntryId]?.trim() || "",
            image: normalizeImageValue(
              resolvedEntryImages[entryImages[newEntryId] || ""]
              || entryImages[newEntryId],
            ) || leafImage || brandedCardSvg,
          },
        ];
        const currentPage = activeEntryPageByGroup[groupName] ?? 1;
        const totalPages = Math.max(1, Math.ceil(items.length / ENTRY_PAGE_SIZE));
        const pageStart = (currentPage - 1) * ENTRY_PAGE_SIZE;
        const paginatedItems = items.slice(pageStart, pageStart + ENTRY_PAGE_SIZE);
        const activeIndex = activeEntryIndexByGroup[groupName] ?? 0;
        const activeIndexOnPage = paginatedItems.length === 0
          ? 0
          : Math.min(Math.max(activeIndex - pageStart, 0), paginatedItems.length - 1);
        const previousImage = items.length === 0
          ? ""
          : items[(activeIndex - 1 + items.length) % items.length]?.image || "";
        const isActiveGroup = groupName === activeGroup;

        return (
          <div
            key={groupName}
            ref={(node) => {
              productGroupSectionRefs.current[groupName] = node;
            }}
            className="coverflow-stage-shell snap-start snap-always"
          >
            <CoverflowTitlePill title={leafSubtype.name} showBackArrow onBack={onBack} />
            <div className="flex flex-col items-center justify-center">
              <FormCoverFlowCarousel
                items={paginatedItems}
                activeIndex={activeIndexOnPage}
                previousImage={previousImage}
                onActiveIndexChange={(index) => {
                  setActiveEntryIndexByGroup((prev) => ({
                    ...prev,
                    [groupName]: pageStart + index,
                  }));
                }}
                renderActiveCard={(item) => (
                  <ProductEntryCard
                    subtype={leafSubtype}
                    subcategoryName={leafSubcategoryName}
                    categoryName={leafCategoryName}
                    entryName={entryNames[item.id] || ""}
                    values={entryDrafts[item.id] || defaultFieldValues}
                    imageUrl={normalizeImageValue(entryImages[item.id])}
                    saving={saving}
                    isEditing={!item.id.startsWith(`${newEntryPrefix}::`)}
                    onEntryNameChange={(name) => onEntryNameChange(item.id, name)}
                    onChange={(fieldLabel, value) => onFieldChange(item.id, fieldLabel, value)}
                    onImageChange={(imageUrl) => onImageChange(item.id, imageUrl)}
                    onSave={() => onSaveEntry(item.id)}
                    onDelete={() => onDeleteEntry(item.id)}
                  />
                )}
              />
              {isActiveGroup ? (
                <div className="hidden lg:block">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setActiveEntryPageByGroup((prev) => ({ ...prev, [groupName]: page }));
                      setActiveEntryIndexByGroup((prev) => ({
                        ...prev,
                        [groupName]: Math.min((page - 1) * ENTRY_PAGE_SIZE, Math.max(items.length - 1, 0)),
                      }));
                    }}
                    orientation="vertical"
                    className="fixed"
                    style={{
                      right: 18,
                      top: "calc(var(--header-height) + (100vh - var(--header-height)) / 2 + 23px)",
                      transform: "translateY(-50%)",
                      zIndex: 50,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex justify-center lg:absolute lg:bottom-4 lg:left-1/2 lg:z-10 lg:-translate-x-1/2">
        <Button
          variant="outline"
          className="h-10 rounded-full border-border px-6 text-foreground"
          onClick={onCreateGroup}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>
    </motion.div>
  );
}
