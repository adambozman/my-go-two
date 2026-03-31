import { useEffect, useMemo, useState } from "react";

import { createMyGoTwoEntry, updateMyGoTwoEntry } from "@/features/mygotwo/myGoTwoData";
import type { CardEntry } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useToast } from "@/hooks/use-toast";

type MyProductCardBeveragesProps = {
  userId: string;
  activeEntry: CardEntry | null;
  onSaved: (entryId?: string) => Promise<void> | void;
  compact?: boolean;
  interactive?: boolean;
};

type ProductField = SubtypeItem["fields"][number];

const BEVERAGES_PRODUCT: SubtypeItem = {
  id: "beverages-featured-product-card",
  name: "Favorite Drink",
  image: "",
  fields: [
    {
      label: "Go-to order",
      type: "text",
      value: "",
    },
    {
      label: "Favorite place",
      type: "text",
      value: "",
    },
    {
      label: "How I take it",
      type: "text",
      value: "",
    },
    {
      label: "Avoid",
      type: "text",
      value: "",
    },
    {
      label: "Notes",
      type: "text",
      value: "",
    },
  ],
};

const BEVERAGES_SUBCATEGORY: SubcategoryGroup = {
  id: "beverages-featured",
  name: "Featured",
  image: "",
  products: [BEVERAGES_PRODUCT],
};

const FIELD_PLACEHOLDERS: Record<string, string> = {
  "Go-to order": "Iced matcha, half sweet, oat milk",
  "Favorite place": "Cafe, bar, or spot",
  "How I take it": "Extra cold, strong, no foam",
  Avoid: "Too sweet, watery, no pulp",
  Notes: "Add a note...",
};

function slugFieldLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function buildInitialFieldValues(fields: ProductField[], activeEntry: CardEntry | null) {
  return fields.reduce<Record<string, string>>((acc, field) => {
    const key = slugFieldLabel(field.label);
    const storedValue = activeEntry?.field_values?.[key];

    if (typeof storedValue === "string") {
      acc[key] = storedValue;
    } else if (typeof field.value === "string") {
      acc[key] = field.value;
    } else {
      acc[key] = "";
    }

    return acc;
  }, {});
}

function BeverageField({
  field,
  value,
  interactive,
  compact,
  onChange,
}: {
  field: ProductField;
  value: string;
  interactive: boolean;
  compact: boolean;
  onChange: (value: string) => void;
}) {
  const isNotes = field.label === "Notes";
  const placeholder = FIELD_PLACEHOLDERS[field.label] ?? "+ add";

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border px-4 ${isNotes ? "py-3" : "py-3.5"} ${
        compact ? "" : ""
      }`}
      style={{
        background: "rgba(247, 236, 209, 0.78)",
        borderColor: "rgba(126, 97, 49, 0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.38)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(121, 95, 57, 0) 0px, rgba(121, 95, 57, 0) 29px, rgba(121, 95, 57, 0.08) 29px, rgba(121, 95, 57, 0.08) 30px)",
        }}
      />
      <div className="relative">
        <p
          className="mb-2 font-medium uppercase tracking-[0.24em]"
          style={{
            color: "#8d7140",
            fontSize: compact ? "9px" : "10px",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {field.label}
        </p>
        {interactive ? (
          isNotes ? (
            <textarea
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              className="min-h-[78px] w-full resize-none bg-transparent text-[14px] leading-[1.5] text-[#2d2417] placeholder:text-[#ab9775] focus:outline-none"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            />
          ) : (
            <input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-[14px] leading-[1.45] text-[#2d2417] placeholder:text-[#ab9775] focus:outline-none"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            />
          )
        ) : (
          <p
            className={`text-[#2d2417] ${isNotes ? "min-h-[78px]" : ""}`}
            style={{
              fontSize: "14px",
              lineHeight: 1.45,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            {value || placeholder}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MyProductCardBeverages({
  userId,
  activeEntry,
  onSaved,
  compact = false,
  interactive = true,
}: MyProductCardBeveragesProps) {
  const { toast } = useToast();
  const fields = useMemo(() => BEVERAGES_PRODUCT.fields ?? [], []);
  const [entryName, setEntryName] = useState(activeEntry?.entry_name || BEVERAGES_PRODUCT.name);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(
    buildInitialFieldValues(fields, activeEntry),
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEntryName(activeEntry?.entry_name || BEVERAGES_PRODUCT.name);
    setFieldValues(buildInitialFieldValues(fields, activeEntry));
  }, [activeEntry, fields]);

  async function handleSave() {
    setSaving(true);

    try {
      let savedEntryId = activeEntry?.id;

      if (activeEntry) {
        await updateMyGoTwoEntry({
          entryId: activeEntry.id,
          entryName,
          fieldValues,
        });
      } else {
        const createdEntry = await createMyGoTwoEntry({
          userId,
          cardKey: BEVERAGES_PRODUCT.id,
          groupName: BEVERAGES_SUBCATEGORY.name,
          entryName,
          fieldValues,
        });
        savedEntryId = createdEntry.id;
      }

      await onSaved(savedEntryId);
      toast({
        title: activeEntry ? "Card updated" : "Card saved",
        description: activeEntry ? "Your changes were saved." : "The new card was added to the coverflow.",
      });
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "The card could not be saved.";

      toast({
        title: "Save failed",
        description,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  const goToOrder = fields.find((field) => field.label === "Go-to order");
  const favoritePlace = fields.find((field) => field.label === "Favorite place");
  const howITakeIt = fields.find((field) => field.label === "How I take it");
  const avoid = fields.find((field) => field.label === "Avoid");
  const notes = fields.find((field) => field.label === "Notes");

  const cardTitle = entryName.trim() || "Favorite Drink";

  return (
    <section
      aria-label="Favorite Drink product card"
      className={compact ? "relative z-20 w-full" : "absolute z-20"}
      style={{
        top: compact ? undefined : "122px",
        right: compact ? undefined : "48px",
        width: compact ? "100%" : "432px",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-3 top-[9px] h-full rounded-[34px]"
        style={{
          background: "rgba(94, 77, 47, 0.16)",
          filter: "blur(0.5px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-1 top-[4px] h-full rounded-[36px] border"
        style={{
          background: "rgba(239, 226, 191, 0.72)",
          borderColor: "rgba(102, 82, 48, 0.12)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[36px] border"
        style={{
          background: "linear-gradient(180deg, #f3e2b8 0%, #ecd8ab 100%)",
          borderColor: "rgba(108, 84, 44, 0.28)",
          boxShadow: "0 28px 58px rgba(23, 17, 10, 0.24), inset 0 1px 0 rgba(255,255,255,0.44)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 22%), radial-gradient(circle at top left, rgba(255,255,255,0.28), rgba(255,255,255,0) 48%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute left-6 top-0 flex -translate-y-[58%] gap-2"
        >
          {["Order", "Place", "Ritual", "Notes"].map((tab, index) => (
            <span
              key={tab}
              className="flex h-9 items-end rounded-t-[12px] border border-b-0 px-3 pb-1.5 text-[9px] font-medium uppercase tracking-[0.22em]"
              style={{
                background: index % 2 === 0 ? "#e6cf9f" : "#edd9ad",
                borderColor: "rgba(108, 84, 44, 0.24)",
                color: "#7d6130",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="absolute right-6 top-6 h-[132px] w-[120px] rounded-[24px]"
          style={{
            background: "linear-gradient(180deg, rgba(82,97,104,0.92) 0%, rgba(57,69,74,0.96) 100%)",
            boxShadow: "inset 0 2px 10px rgba(255,255,255,0.06)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute right-[62px] top-[54px] h-[84px] w-[34px] rounded-full"
          style={{
            background: "linear-gradient(180deg, #6f8289 0%, #51636b 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.18)",
          }}
        />

        <div className="relative px-7 pb-6 pt-8">
          <div className="mb-6 flex items-start justify-between gap-5">
            <div className="min-w-0 flex-1 pr-1">
              <div
                className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1"
                style={{
                  color: "#cb6843",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
                  Beverages
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
                  Featured
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#8d7140]">
                  Card B-01
                </span>
              </div>

              {interactive ? (
                <textarea
                  value={entryName}
                  onChange={(event) => setEntryName(event.target.value)}
                  rows={2}
                  className="w-full resize-none bg-transparent font-serif text-[52px] leading-[0.86] tracking-[-0.05em] text-[#1d1710] focus:outline-none"
                />
              ) : (
                <p className="font-serif text-[52px] leading-[0.86] tracking-[-0.05em] text-[#1d1710]">
                  {cardTitle}
                </p>
              )}

              <p
                className="mt-3 text-[10px] uppercase tracking-[0.28em]"
                style={{
                  color: "#8d7140",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                Personal beverage file
              </p>
            </div>

            <div
              className="relative mt-1 h-[138px] w-[126px] shrink-0 rounded-[20px] border p-3"
              style={{
                background: "linear-gradient(180deg, rgba(243,232,205,0.92) 0%, rgba(235,219,184,0.92) 100%)",
                borderColor: "rgba(108, 84, 44, 0.2)",
                boxShadow: "0 4px 14px rgba(55,42,21,0.12)",
              }}
            >
              <div
                className="absolute left-1/2 top-2 h-3 w-10 -translate-x-1/2 rounded-full"
                style={{
                  background: "rgba(97, 120, 130, 0.84)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.24)",
                }}
              />
              <div
                className="flex h-full items-center justify-center rounded-[14px] border border-dashed"
                style={{
                  borderColor: "rgba(117, 139, 146, 0.58)",
                  color: "#6e8085",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                <div className="text-center">
                  <span className="block text-[10px] uppercase tracking-[0.24em]">Snapshot</span>
                  <span className="mt-2 block text-[9px] uppercase tracking-[0.18em] text-[#96856a]">
                    add photo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mb-5 rounded-[20px] border px-4 py-3"
            style={{
              background: "rgba(246, 235, 206, 0.72)",
              borderColor: "rgba(108, 84, 44, 0.16)",
            }}
          >
            <p
              className="mb-1 text-[9px] uppercase tracking-[0.24em]"
              style={{
                color: "#8d7140",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Indexed under
            </p>
            <p className="text-[14px] text-[#342818]" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              Taste, ritual, spots, and hard no's.
            </p>
          </div>

          <div className="space-y-3">
            {goToOrder ? (
              <BeverageField
                field={goToOrder}
                value={fieldValues[slugFieldLabel(goToOrder.label)] || ""}
                interactive={interactive}
                compact={compact}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [slugFieldLabel(goToOrder.label)]: nextValue,
                  }))
                }
              />
            ) : null}

            <div className="grid grid-cols-2 gap-3">
              {favoritePlace ? (
                <BeverageField
                  field={favoritePlace}
                  value={fieldValues[slugFieldLabel(favoritePlace.label)] || ""}
                  interactive={interactive}
                  compact={compact}
                  onChange={(nextValue) =>
                    setFieldValues((current) => ({
                      ...current,
                      [slugFieldLabel(favoritePlace.label)]: nextValue,
                    }))
                  }
                />
              ) : null}

              {howITakeIt ? (
                <BeverageField
                  field={howITakeIt}
                  value={fieldValues[slugFieldLabel(howITakeIt.label)] || ""}
                  interactive={interactive}
                  compact={compact}
                  onChange={(nextValue) =>
                    setFieldValues((current) => ({
                      ...current,
                      [slugFieldLabel(howITakeIt.label)]: nextValue,
                    }))
                  }
                />
              ) : null}
            </div>

            {avoid ? (
              <BeverageField
                field={avoid}
                value={fieldValues[slugFieldLabel(avoid.label)] || ""}
                interactive={interactive}
                compact={compact}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [slugFieldLabel(avoid.label)]: nextValue,
                  }))
                }
              />
            ) : null}

            {notes ? (
              <BeverageField
                field={notes}
                value={fieldValues[slugFieldLabel(notes.label)] || ""}
                interactive={interactive}
                compact={compact}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [slugFieldLabel(notes.label)]: nextValue,
                  }))
                }
              />
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div
              className="rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.24em]"
              style={{
                borderColor: "rgba(108, 84, 44, 0.22)",
                color: "#86693a",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Rolodex file
            </div>

            {interactive ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="h-11 rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "linear-gradient(180deg, #62545f 0%, #424c53 100%)",
                  boxShadow: "0 8px 18px rgba(37,32,27,0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {saving ? "Filing..." : "File Card"}
              </button>
            ) : (
              <div
                className="flex h-11 items-center rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0]"
                style={{
                  background: "linear-gradient(180deg, #62545f 0%, #424c53 100%)",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                File Card
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
