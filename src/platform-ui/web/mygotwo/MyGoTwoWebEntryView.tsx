import type { Dispatch, SetStateAction } from "react";
import type { SubtypeItem } from "@/data/templateSubtypes";
import MyGoTwoDesktopEntryPage from "@/platform-ui/web/mygotwo/MyGoTwoDesktopEntryPage";

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

export default function MyGoTwoWebEntryView(props: MyGoTwoWebEntryViewProps) {
  return <MyGoTwoDesktopEntryPage {...props} />;
}
