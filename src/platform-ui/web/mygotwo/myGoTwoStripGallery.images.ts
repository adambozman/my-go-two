export type MyGoTwoStripGalleryImage = {
  id: string;
  image: string;
  align?: string;
  label?: string;
};

export type MyGoTwoCollapseImage = {
  id: string;
  image: string;
};

export type MyGoTwoSlotTarget = {
  key: string;
  id: string;
  label: string;
  kind: "strip" | "collapse";
};

type StripLayout = Omit<MyGoTwoStripGalleryImage, "image">;

const STRIP_LAYOUT: StripLayout[] = [
  { id: "01", align: "24%", label: "Clothes" },
  { id: "02", align: "42%" },
  { id: "03", align: "38%", label: "Personal" },
  { id: "04", align: "54%" },
  { id: "05", align: "62%", label: "Health" },
  { id: "06", align: "48%" },
  { id: "07", align: "46%", label: "Gifts" },
  { id: "08", align: "58%" },
  { id: "09", align: "29%", label: "Dining" },
  { id: "10", align: "61%" },
  { id: "11", align: "41%", label: "Beverages" },
  { id: "12", align: "35%" },
  { id: "13", align: "64%", label: "Household" },
  { id: "14", align: "52%" },
  { id: "15", align: "70%", label: "Entertainment" },
  { id: "16", align: "40%" },
  { id: "17", align: "44%", label: "Travel" },
];

const COLLAPSE_LAYOUT = [
  "collapse-01",
  "collapse-02",
  "collapse-03",
  "collapse-04",
  "collapse-05",
];

export const MYGOTWO_STRIP_GALLERY_IMAGES: MyGoTwoStripGalleryImage[] = STRIP_LAYOUT.map((strip) => ({
  ...strip,
  image: "",
}));

export const MYGOTWO_COLLAPSE_IMAGES: MyGoTwoCollapseImage[] = COLLAPSE_LAYOUT.map((id) => ({
  id,
  image: "",
}));

export const MYGOTWO_STRIP_SLOT_TARGETS: MyGoTwoSlotTarget[] = MYGOTWO_STRIP_GALLERY_IMAGES.map((strip, index) => ({
  key: `mygotwo-strip-${strip.id}`,
  id: strip.id,
  label: strip.label ?? `Strip ${index + 1}`,
  kind: "strip",
}));

export const MYGOTWO_COLLAPSE_SLOT_TARGETS: MyGoTwoSlotTarget[] = MYGOTWO_COLLAPSE_IMAGES.map((image, index) => ({
  key: `mygotwo-collapse-${String(index + 1).padStart(2, "0")}`,
  id: image.id,
  label: `Collapse ${String(index + 1).padStart(2, "0")}`,
  kind: "collapse",
}));

export const MYGOTWO_SLOT_TARGETS: MyGoTwoSlotTarget[] = [
  ...MYGOTWO_STRIP_SLOT_TARGETS,
  ...MYGOTWO_COLLAPSE_SLOT_TARGETS,
];
