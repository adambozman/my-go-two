import { ChevronLeft } from "lucide-react";
import ProductEntryCard from "@/components/ui/ProductEntryCard";
import type { SubtypeItem } from "@/data/templateSubtypes";
import MyGoTwoDesktopFrame from "@/platform-ui/web/mygotwo/MyGoTwoDesktopFrame";
import MyGoTwoDesktopQuoteBox from "@/platform-ui/web/mygotwo/MyGoTwoDesktopQuoteBox";

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
  activeEntryIndexByGroup: Record<string, number>;
  entryNames: Record<string, string>;
  entryDrafts: Record<string, Record<string, string>>;
  entryImages: Record<string, string>;
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
  activeEntryIndexByGroup,
  entryNames,
  entryDrafts,
  entryImages,
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
  const activeIndex = Math.min(activeEntryIndexByGroup[currentGroup] ?? 0, Math.max(groupEntries.length, 0));
  const activeEntry = groupEntries[activeIndex] ?? null;
  const activeItemId = activeEntry?.id ?? newEntryId;

  return (
    <MyGoTwoDesktopFrame quote={<MyGoTwoDesktopQuoteBox />}>
      <div className="relative h-full min-h-0 px-3 pb-3">
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20">
          <div className="mx-auto flex w-full max-w-[920px] items-center justify-between gap-6 px-2">
            <button
              type="button"
              aria-label="Go back"
              className="pointer-events-auto inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/75 bg-[rgba(255,255,255,0.72)] text-[var(--logo-two-color)] shadow-[0_10px_26px_rgba(20,20,30,0.08)]"
              onClick={onBack}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              className="pointer-events-auto rounded-full border px-6 py-3 text-[clamp(18px,1.5vw,22px)] font-medium leading-none shadow-[0_10px_26px_rgba(20,20,30,0.08)]"
              style={{
                background: "rgba(255,255,255,0.72)",
                borderColor: "rgba(45,104,112,0.18)",
                borderStyle: "dashed",
                color: "var(--swatch-teal)",
                fontFamily: "'Cormorant Garamond', serif",
              }}
              onClick={onCreateGroup}
            >
              New Group
            </button>
          </div>
        </div>

        <div className="flex h-full min-h-0 items-center justify-center overflow-auto pb-2 pt-14">
          <div className="w-full max-w-[920px] overflow-hidden rounded-[34px] shadow-[0_22px_70px_rgba(0,0,0,0.16)]">
            <ProductEntryCard
              subtype={leafSubtype}
              subcategoryName={leafSubcategoryName}
              categoryName={leafCategoryName}
              entryName={entryNames[activeItemId] || ""}
              values={entryDrafts[activeItemId] || defaultFieldValues}
              imageUrl={
                normalizeImageValue(entryImages[activeItemId])
                || normalizeImageValue(activeEntry?.image_url)
                || leafImage
                || fallbackImage
              }
              saving={saving}
              isEditing={!activeItemId.startsWith(`${newEntryPrefix}::`)}
              onEntryNameChange={(name) => onEntryNameChange(activeItemId, name)}
              onChange={(fieldLabel, value) => onFieldChange(activeItemId, fieldLabel, value)}
              onImageChange={(imageUrl) => onImageChange(activeItemId, imageUrl)}
              onSave={() => onSaveEntry(activeItemId)}
              onDelete={() => onDeleteEntry(activeItemId)}
            />
          </div>
        </div>
      </div>
    </MyGoTwoDesktopFrame>
  );
}
