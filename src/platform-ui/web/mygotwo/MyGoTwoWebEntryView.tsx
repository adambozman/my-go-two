import type { Dispatch, SetStateAction } from "react";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import ProductEntryCard from "@/components/ui/ProductEntryCard";
import type { SubtypeItem } from "@/data/templateSubtypes";

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

interface MyGoTwoWebEntryViewProps {
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

export default function MyGoTwoWebEntryView({
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
}: MyGoTwoWebEntryViewProps) {
  const currentGroup = productGroups.includes(activeGroup) ? activeGroup : productGroups[0] || leafSubtype.name;
  const groupEntries = entries.filter((entry) => entry.group_name === currentGroup);
  const newEntryId = `${newEntryPrefix}::${currentGroup}`;
  const editorItems = [
    ...groupEntries.map((entry) => ({
      id: entry.id,
      label: entryNames[entry.id] || entry.entry_name,
      image: normalizeImageValue(
        resolvedEntryImages[entryImages[entry.id] || entry.image_url || ""]
        || entryImages[entry.id]
        || entry.image_url,
      ) || leafImage || fallbackImage,
    })),
    {
      id: newEntryId,
      label: entryNames[newEntryId]?.trim() || `New ${leafSubtype.name}`,
      image: normalizeImageValue(resolvedEntryImages[entryImages[newEntryId] || ""] || entryImages[newEntryId]) || leafImage || fallbackImage,
    },
  ];

  const activeIndex = Math.min(activeEntryIndexByGroup[currentGroup] ?? 0, Math.max(editorItems.length - 1, 0));
  const activeItem = editorItems[activeIndex];

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-8 px-6 pb-10 pt-6">
      <CoverflowTitlePill title={leafSubtype.name} showBackArrow onBack={onBack} />

      <div className="flex flex-wrap items-center justify-center gap-3">
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

      <div className="flex w-full items-center justify-center gap-4 overflow-x-auto px-2 pb-2">
        {editorItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              className="relative shrink-0 overflow-hidden rounded-[28px] transition-all"
              style={{
                width: isActive ? 188 : 124,
                height: isActive ? 248 : 168,
                border: isActive ? "2px solid rgba(45,104,112,0.3)" : "1px solid rgba(45,104,112,0.12)",
                boxShadow: isActive ? "0 18px 40px rgba(0,0,0,0.14)" : "0 10px 24px rgba(0,0,0,0.08)",
              }}
              onClick={() => {
                setActiveEntryIndexByGroup((prev) => ({ ...prev, [currentGroup]: index }));
              }}
            >
              <img src={item.image} alt={item.label} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent p-4 text-left text-white">
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {activeItem ? (
        <div className="w-full max-w-[720px] overflow-hidden rounded-[34px] shadow-[0_22px_70px_rgba(0,0,0,0.16)]">
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
      ) : null}
    </div>
  );
}
