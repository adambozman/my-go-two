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
  name: "Beverage",
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
      className={`relative overflow-hidden rounded-[20px] border px-4 ${isNotes ? "py-3" : "py-3.5"} ${
        compact ? "" : ""
      }`}
      style={{
        background: "rgba(255,255,255,0.56)",
        borderColor: "rgba(255,255,255,0.8)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.96), 0 10px 24px rgba(var(--swatch-viridian-odyssey-rgb), 0.04)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-0 h-px"
        style={{
          background: "rgba(255,255,255,0.96)",
        }}
      />
      {!isNotes ? (
        <div
          aria-hidden="true"
          className="absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: "rgba(var(--swatch-teal-rgb), 0.18)",
            background: "rgba(255,255,255,0.42)",
          }}
        />
      ) : null}
      <div className="relative">
        <p
          className="mb-2 font-medium uppercase tracking-[0.24em]"
          style={{
            color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
            fontSize: compact ? "9px" : "10px",
            fontFamily: "'Jost', sans-serif",
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
              className="min-h-[78px] w-full resize-none bg-transparent text-[14px] leading-[1.55] focus:outline-none"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-teal-rgb), 0.84)",
              }}
            />
          ) : (
            <input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent pr-10 text-[14px] leading-[1.45] focus:outline-none"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-teal-rgb), 0.84)",
              }}
            />
          )
        ) : (
          <p
            className={isNotes ? "min-h-[78px]" : ""}
            style={{
              fontSize: "14px",
              lineHeight: 1.5,
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.84)",
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

  const cardTitle = entryName.trim() || "Beverage";

  return (
    <section
      aria-label="Favorite Drink product card"
      className={compact ? "relative z-20 w-full" : "absolute z-20"}
      style={{
        top: compact ? undefined : "14px",
        right: compact ? undefined : "14px",
        bottom: compact ? undefined : "14px",
        width: compact ? "100%" : "min(37.5%, 560px)",
        minWidth: compact ? undefined : "480px",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-2 bottom-0 top-[8px] rounded-[34px]"
        style={{
          background: "rgba(var(--swatch-cedar-grove-rgb), 0.08)",
          filter: "blur(10px)",
        }}
      />

      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[36px] border"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.94) 0%, rgba(250,244,236,0.9) 42%, rgba(239,224,207,0.8) 100%)",
          borderColor: "rgba(255,255,255,0.92)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.96), 0 22px 52px rgba(var(--swatch-cedar-grove-rgb), 0.12), 0 10px 28px rgba(var(--swatch-viridian-odyssey-rgb), 0.08), 0 2px 8px rgba(255,255,255,0.34)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.14), transparent 30%), linear-gradient(130deg, rgba(255,255,255,0.05), transparent 55%)",
          }}
        />

        <div className="relative flex h-full flex-col px-7 pb-5 pt-8">
          <div className="mb-5 flex items-start justify-between gap-5">
            <div className="min-w-0 flex-1 pr-1">
              <div
                className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: "var(--swatch-cedar-grove)" }}
                >
                  My Go Two / Vault
                </span>
              </div>

              {interactive ? (
                <textarea
                  value={entryName}
                  onChange={(event) => setEntryName(event.target.value)}
                  rows={2}
                  className="w-full resize-none bg-transparent text-[58px] leading-[0.86] tracking-[-0.05em] focus:outline-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                />
              ) : (
                <p
                  className="text-[58px] leading-[0.86] tracking-[-0.05em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                >
                  {cardTitle}
                </p>
              )}

            </div>

            <div
              className="relative mt-1 h-[138px] w-[118px] shrink-0 rounded-[24px] border p-3"
              style={{
                background: "rgba(255,255,255,0.24)",
                borderColor: "rgba(var(--swatch-teal-rgb), 0.18)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)",
              }}
            >
              <div
                className="absolute left-1/2 top-3 h-2.5 w-9 -translate-x-1/2 rounded-full"
                style={{
                  background: "rgba(var(--swatch-text-light-rgb, 138 158 164), 0.88)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.24)",
                }}
              />
              <div
                className="flex h-full items-center justify-center rounded-[14px] border border-dashed"
                style={{
                  borderColor: "rgba(var(--swatch-teal-rgb), 0.2)",
                  color: "rgba(var(--swatch-teal-rgb), 0.58)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                <div className="text-center">
                  <span className="block text-[10px] uppercase tracking-[0.24em]">Snapshot</span>
                  <span
                    className="mt-2 block text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: "rgba(var(--swatch-antique-coin-rgb), 0.96)" }}
                  >
                    add photo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mb-4 rounded-[20px] border px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.56)",
              borderColor: "rgba(255,255,255,0.8)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.96)",
            }}
          >
            <p
              className="mb-1 text-[9px] uppercase tracking-[0.24em]"
              style={{
                color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Indexed under
            </p>
            <p
              className="text-[14px]"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-teal-rgb), 0.84)",
              }}
            >
              Taste, ritual, spots, and hard no's.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3">
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

            <div className="flex-1">
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
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div
              className="rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.24em]"
              style={{
                borderColor: "rgba(var(--swatch-teal-rgb), 0.16)",
                background: "rgba(255,255,255,0.38)",
                color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Indexed card
            </div>

            {interactive ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="h-11 rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "linear-gradient(180deg, #617984 0%, #4f6770 100%)",
                  boxShadow: "0 8px 18px rgba(37,32,27,0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {saving ? "Saving..." : "Save Card"}
              </button>
            ) : (
              <div
                className="flex h-11 items-center rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0]"
                style={{
                  background: "linear-gradient(180deg, #617984 0%, #4f6770 100%)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                Save Card
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
