import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";

export interface CoverFlowState {
  name: string;
  subtypes: SubtypeItem[];
  subcategories?: SubcategoryGroup[];
  section: string;
  categoryId: string;
}

export interface CardEntry {
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

export interface MyGoTwoRootItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
  sourceId: string;
  sectionKey: string;
}

export type MyGoTwoFlowLevel = 1 | 2 | 3 | 4;

export type MyGoTwoFlowItemKind =
  | "category"
  | "subcategory"
  | "product"
  | "entry"
  | "create-entry";

export interface MyGoTwoFlowItem extends MyGoTwoRootItem {
  level: MyGoTwoFlowLevel;
  kind: MyGoTwoFlowItemKind;
  parentId?: string;
}
