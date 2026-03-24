import type { Dispatch, SetStateAction } from "react";
import ProductEntryCard from "@/components/ui/ProductEntryCard";
import type { SubtypeItem } from "@/data/templateSubtypes";
import MyGoTwoDesktopCoverflow, {
  type MyGoTwoDesktopCoverflowItem,
} from "@/platform-ui/web/mygotwo/MyGoTwoDesktopCoverflow";
import MyGoTwoDesktopPage from "@/platform-ui/web/mygotwo/MyGoTwoDesktopPage";

interface CardEntry {
  id: string;
  user_id: string;
  card_key: string;
  group_name: string;
  entry_name: string;
  field_values: Record<string, string>;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

interface MyGoTwoDesktopEntryPageProps {
  leafSubtype: SubtypeItem;
  leafSubcategoryName?: string;
  leafCategoryName?: string;
  leafImage: string;
  entries: CardEntry[];
  productGroups: string[];
  activeGroup: string;
  setActiveGroup: (group: string) => void;
  activeEntryIndexByGroup: Record<string, number>;
  setActiveEntryIndexByGroup: Dispatch<SetStateAction<Record<string, number>>>;
  entryNames: Record<string, string>;
  entryDrafts: Record<string, Record<string, string>>;
  entryImages: Record<string, string>;
  resolvedEntryImages: Record<string, string>;
  defaultFieldValues: Record<string, string>;
  saving: boolean;
  newEntryPrefix: string;
  fallbackImage: string;
  normalizeImageValue: (value?: string | null) => string;
  onBack: () => void;
  onEntryNameChange: (itemId: string, value: string) => void;
  onFieldChange: (itemId: string, fieldLabel: string, value: string) => void;
  onImageChange: (itemId: string, imageUrl: string) => void;
  onSaveEntry: (itemId: string) => void;
  onDeleteEntry: (itemId: string) => void;
  onCreateGroup: () => void;
}

export default function MyGoTwoDesktopEntryPage({
  leafSubtype,
  leafSubcategoryName,
  leafCategoryName,
  leafImage,
  entries,
  productGroups,
  activeGroup,
  setActiveGroup,
  activeEntryIndexByGroup,
  setActiveEntryIndexByGroup,
  entryNames,
  entryDrafts,
  entryImages,
  resolvedEntryImages,
  defaultFieldValues,
  saving,
  newEntryPrefix,
  fallbackImage,
  normalizeImageValue,
  onBack,
  onEntryNameChange,
  onFieldChange,
  onImageChange,
  onSaveEntry,
  onDeleteEntry,
  onCreateGroup,
}: MyGoTwoDesktopEntryPageProps) {
  const currentGroup = productGroups.includes(activeGroup) ? activeGroup : productGroups[0] || leafSubtype.name;
  const groupEntries = entries.filter((entry) => entry.group_name === currentGroup);
  const newEntryId = `${newEntryPrefix}::${currentGroup}`;

  const editorItems: MyGoTwoDesktopCoverflowItem[] = [
    ...groupEntries.map((entry) => ({
      id: entry.id,
      label: entryNames[entry.id] || entry.entry_name,
      image:
        normalizeImageValue(
          resolvedEntryImages[entryImages[entry.id] || entry.image_url || ""]
          || entryImages[entry.id]
          || entry.image_url,
        ) || leafImage || fallbackImage,
    })),
    {
      id: newEntryId,
      label: entryNames[newEntryId]?.trim() || `New ${leafSubtype.name}`,
      image:
        normalizeImageValue(resolvedEntryImages[entryImages[newEntryId] || ""] || entryImages[newEntryId])
        || leafImage
        || fallbackImage,
    },
  ];

  const activeIndex = Math.min(activeEntryIndexByGroup[currentGroup] ?? 0, Math.max(editorItems.length - 1, 0));
  const activeItem = editorItems[activeIndex];

  return (
    <MyGoTwoDesktopPage title={leafSubtype.name} onBack={onBack}>
      <div className="grid h-full min-h-0 grid-rows-[auto_minmax(280px,38%)_minmax(0,1fr)] gap-5">
        <div className="flex flex-wrap items-center justify-center gap-3 px-4">
          {productGroups.map((groupName) => {
            const isActive = groupName === currentGroup;
            return (
              <button
                key={groupName}
                type="button"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                style={{
                  background: isActive ? "rgba(45,104,112,0.16)" : "rgba(255,255,255,0.66)",
                  border: isActive ? "1px solid rgba(45,104,112,0.32)" : "1px solid rgba(45,104,112,0.12)",
                  color: "var(--swatch-teal)",
                  boxShadow: isActive ? "0 10px 24px rgba(45,104,112,0.12)" : "0 6px 18px rgba(0,0,0,0.04)",
                }}
                onClick={() => setActiveGroup(groupName)}
              >
                {groupName.startsWith("__product_group_") ? `Group ${groupName.split("_").pop()}` : groupName}
              </button>
            );
          })}
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: "rgba(255,255,255,0.66)",
              border: "1px dashed rgba(45,104,112,0.22)",
              color: "var(--swatch-teal)",
            }}
            onClick={onCreateGroup}
          >
            New Group
          </button>
        </div>

        <div className="min-h-0">
          <MyGoTwoDesktopCoverflow
            items={editorItems}
            focusedItemId={activeItem?.id}
            onActiveIdChange={(id) => {
              const nextIndex = editorItems.findIndex((item) => item.id === id);
              if (nextIndex < 0) return;
              setActiveEntryIndexByGroup((prev) => ({ ...prev, [currentGroup]: nextIndex }));
            }}
            onCommit={(id) => {
              const nextIndex = editorItems.findIndex((item) => item.id === id);
              if (nextIndex < 0) return;
              setActiveEntryIndexByGroup((prev) => ({ ...prev, [currentGroup]: nextIndex }));
            }}
            stageHeight="100%"
            commitOnCardClick
          />
        </div>

        {activeItem ? (
          <div className="flex min-h-0 items-start justify-center overflow-auto pb-2">
            <div className="w-full max-w-[760px] overflow-hidden rounded-[34px] shadow-[0_22px_70px_rgba(0,0,0,0.16)]">
              <ProductEntryCard
                subtype={leafSubtype}
                subcategoryName={leafSubcategoryName}
                categoryName={leafCategoryName}
                entryName={entryNames[activeItem.id] || ""}
                values={entryDrafts[activeItem.id] || defaultFieldValues}
                imageUrl={normalizeImageValue(entryImages[activeItem.id])}
                saving={saving}
                isEditing={!activeItem.id.startsWith(`${newEntryPrefix}::`)}
                onEntryNameChange={(name) => onEntryNameChange(activeItem.id, name)}
                onChange={(fieldLabel, value) => onFieldChange(activeItem.id, fieldLabel, value)}
                onImageChange={(imageUrl) => onImageChange(activeItem.id, imageUrl)}
                onSave={() => onSaveEntry(activeItem.id)}
                onDelete={() => onDeleteEntry(activeItem.id)}
              />
            </div>
          </div>
        ) : null}
      </div>
    </MyGoTwoDesktopPage>
  );
}
