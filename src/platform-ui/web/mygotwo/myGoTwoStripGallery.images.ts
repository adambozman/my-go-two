export type MyGoTwoStripGalleryImage = {
  id: string;
  image: string;
  detailImage?: string;
  align?: string;
  label?: string;
  categorySlug?: string;
};

export type MyGoTwoCollapseImage = {
  id: string;
  image: string;
};

export type MyGoTwoSlotTarget = {
  key: string;
  id: string;
  label: string;
  kind: "strip" | "card" | "collapse";
  slug?: string;
  folder: string;
};

export type MyGoTwoCategoryTarget = {
  id: string;
  label: string;
  slug: string;
  stripKey: string;
  cardKey: string;
  stripFolder: string;
  cardFolder: string;
};

type StripLayout = Omit<MyGoTwoStripGalleryImage, "image" | "detailImage">;

const STRIP_LAYOUT: StripLayout[] = [
  { id: "01", align: "24%", label: "Clothes", categorySlug: "clothes" },
  { id: "02", align: "42%" },
  { id: "03", align: "38%", label: "Personal", categorySlug: "personal" },
  { id: "04", align: "54%" },
  { id: "05", align: "62%", label: "Health", categorySlug: "health" },
  { id: "06", align: "48%" },
  { id: "07", align: "46%", label: "Gifts", categorySlug: "gifts" },
  { id: "08", align: "58%" },
  { id: "09", align: "29%", label: "Dining", categorySlug: "dining" },
  { id: "10", align: "61%" },
  { id: "11", align: "41%", label: "Beverages", categorySlug: "beverages" },
  { id: "12", align: "35%" },
  { id: "13", align: "64%", label: "Household", categorySlug: "household" },
  { id: "14", align: "52%" },
  { id: "15", align: "70%", label: "Entertainment", categorySlug: "entertainment" },
  { id: "16", align: "40%" },
  { id: "17", align: "44%", label: "Travel", categorySlug: "travel" },
];

const COLLAPSE_LAYOUT = [
  "collapse-01",
  "collapse-02",
  "collapse-03",
  "collapse-04",
  "collapse-05",
] as const;

function hasCategoryTarget(
  strip: StripLayout,
): strip is StripLayout & { label: string; categorySlug: string } {
  return Boolean(strip.label && strip.categorySlug);
}

const CATEGORY_LAYOUT = STRIP_LAYOUT.filter(hasCategoryTarget);

export const MYGOTWO_STRIP_GALLERY_IMAGES: MyGoTwoStripGalleryImage[] = STRIP_LAYOUT.map((strip) => ({
  ...strip,
  image: "",
  detailImage: "",
}));

export const MYGOTWO_COLLAPSE_IMAGES: MyGoTwoCollapseImage[] = COLLAPSE_LAYOUT.map((id) => ({
  id,
  image: "",
}));

export const MYGOTWO_CATEGORY_TARGETS: MyGoTwoCategoryTarget[] = CATEGORY_LAYOUT.map((strip) => ({
  id: strip.id,
  label: strip.label,
  slug: strip.categorySlug,
  stripKey: `mygotwo-strip-${strip.id}`,
  cardKey: `mygotwo-card-${strip.categorySlug}`,
  stripFolder: `mygotwo/categories/${strip.categorySlug}/small`,
  cardFolder: `mygotwo/categories/${strip.categorySlug}/card`,
}));

export const MYGOTWO_STRIP_SLOT_TARGETS: MyGoTwoSlotTarget[] = MYGOTWO_CATEGORY_TARGETS.map((target) => ({
  key: target.stripKey,
  id: target.id,
  label: target.label,
  kind: "strip",
  slug: target.slug,
  folder: target.stripFolder,
}));

export const MYGOTWO_CARD_SLOT_TARGETS: MyGoTwoSlotTarget[] = MYGOTWO_CATEGORY_TARGETS.map((target) => ({
  key: target.cardKey,
  id: target.id,
  label: `${target.label} Card`,
  kind: "card",
  slug: target.slug,
  folder: target.cardFolder,
}));

export const MYGOTWO_COLLAPSE_SLOT_TARGETS: MyGoTwoSlotTarget[] = MYGOTWO_COLLAPSE_IMAGES.map((image, index) => ({
  key: `mygotwo-collapse-${String(index + 1).padStart(2, "0")}`,
  id: image.id,
  label: `Repeat ${String(index + 1).padStart(2, "0")}`,
  kind: "collapse",
  folder: `mygotwo/repeat/${String(index + 1).padStart(2, "0")}`,
}));

export const MYGOTWO_SLOT_TARGETS: MyGoTwoSlotTarget[] = [
  ...MYGOTWO_STRIP_SLOT_TARGETS,
  ...MYGOTWO_CARD_SLOT_TARGETS,
  ...MYGOTWO_COLLAPSE_SLOT_TARGETS,
];

export const MYGOTWO_ALL_STRIP_KEYS = STRIP_LAYOUT.map((strip) => `mygotwo-strip-${strip.id}`);
export const MYGOTWO_ASSIGNMENT_KEYS = [
  ...MYGOTWO_STRIP_SLOT_TARGETS.map((target) => target.key),
  ...MYGOTWO_CARD_SLOT_TARGETS.map((target) => target.key),
  ...MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => target.key),
];
export const MYGOTWO_RESET_KEYS = [
  ...MYGOTWO_ALL_STRIP_KEYS,
  ...MYGOTWO_CARD_SLOT_TARGETS.map((target) => target.key),
  ...MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => target.key),
];

const CATEGORY_TARGET_BY_STRIP_ID = new Map(MYGOTWO_CATEGORY_TARGETS.map((target) => [target.id, target]));
const CATEGORY_TARGET_BY_STRIP_KEY = new Map(MYGOTWO_CATEGORY_TARGETS.map((target) => [target.stripKey, target]));
const CATEGORY_TARGET_BY_CARD_KEY = new Map(MYGOTWO_CATEGORY_TARGETS.map((target) => [target.cardKey, target]));

export function getMyGoTwoCategoryTargetByStripId(stripId: string) {
  return CATEGORY_TARGET_BY_STRIP_ID.get(stripId) ?? null;
}

export function getMyGoTwoCategoryTargetByStripKey(stripKey: string) {
  return CATEGORY_TARGET_BY_STRIP_KEY.get(stripKey) ?? null;
}

export function getMyGoTwoCategoryTargetByCardKey(cardKey: string) {
  return CATEGORY_TARGET_BY_CARD_KEY.get(cardKey) ?? null;
}

// Codebase classification: runtime My Go Two slot map for strip, card, and collapse image assignments.
