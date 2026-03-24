import type { Dispatch, SetStateAction } from "react";
import { ChevronLeft } from "lucide-react";
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
  activeEntryIndexByGroup: Record<string, number>;
  setActiveEntryIndexByGroup: Dispatch<SetStateAction<Record<string, number>>>;
  entryNames: Record<string, string>;
  entryDrafts: Record<string, Record<string, string>>;
  entryImages: Record<string, string>;
  resolvedEntryImages: Record<string, string>;
  defaultFieldValues: Record<string, string>;
  saving: boolean;
  newEntryPrefix: string;
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
  setActiveEntryIndexByGroup,
  entryNames,
  entryDrafts,
  entryImages,
  resolvedEntryImages,
  defaultFieldValues,
  saving,
  newEntryPrefix,
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
  const activeItemName =
    entryNames[activeItemId]?.trim()
    || activeEntry?.entry_name
    || `New ${leafSubtype.name}`;
  const editorItems: MyGoTwoDesktopCoverflowItem[] = [
    ...groupEntries.map((entry) => ({
      id: entry.id,
      label: entryNames[entry.id] || entry.entry_name,
      image:
        normalizeImageValue(
          resolvedEntryImages[entryImages[entry.id] || entry.image_url || ""]
          || entryImages[entry.id]
          || entry.image_url,
        ) || "",
    })),
    {
      id: newEntryId,
      label: entryNames[newEntryId]?.trim() || `New ${leafSubtype.name}`,
      image: normalizeImageValue(resolvedEntryImages[entryImages[newEntryId] || ""] || entryImages[newEntryId]) || "",
    },
  ];
  const showCoverflow = groupEntries.length > 0;

  return (
    <MyGoTwoDesktopPage
      topSlot={
        <button
          type="button"
          aria-label="Go back"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/75 bg-[rgba(255,255,255,0.72)] text-[var(--logo-two-color)] shadow-[0_10px_26px_rgba(20,20,30,0.08)]"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      }
    >
      <div className="grid h-full min-h-0 grid-rows-[minmax(280px,38%)_minmax(0,1fr)] gap-5">
        <div className="min-h-0">
          <div className={showCoverflow ? "h-full" : "pointer-events-none h-full opacity-0"}>
            <MyGoTwoDesktopCoverflow
              items={editorItems}
              focusedItemId={activeItemId}
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
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col items-center justify-start gap-5 overflow-auto pb-2">
          <div className="w-full max-w-[680px] overflow-hidden rounded-[34px] shadow-[0_22px_70px_rgba(0,0,0,0.16)]">
            <ProductEntryCard
              subtype={leafSubtype}
              subcategoryName={leafSubcategoryName}
              categoryName={leafCategoryName}
              entryName={entryNames[activeItemId] || ""}
              values={entryDrafts[activeItemId] || defaultFieldValues}
              imageUrl={
                normalizeImageValue(entryImages[activeItemId])
                || normalizeImageValue(activeEntry?.image_url)
                || ""
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

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full border px-7 py-3 text-[clamp(18px,1.5vw,22px)] font-medium leading-none shadow-[0_10px_26px_rgba(20,20,30,0.08)]"
              style={{
                background: "rgba(255,255,255,0.78)",
                borderColor: "rgba(45,104,112,0.18)",
                borderStyle: "dashed",
                color: "var(--swatch-teal)",
                fontFamily: "'Cormorant Garamond', serif",
              }}
              onClick={onCreateGroup}
            >
              New Group
            </button>

            <div
              className="text-sm"
              style={{
                color: "rgba(45,104,112,0.72)",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {saving ? "Saving..." : `Saving to: ${activeItemName}`}
            </div>
          </div>
        </div>
      </div>
    </MyGoTwoDesktopPage>
  );
}
