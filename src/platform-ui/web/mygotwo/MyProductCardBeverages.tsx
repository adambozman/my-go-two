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

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.2em]"
      style={{
        fontFamily: "'Jost', sans-serif",
        color: "var(--swatch-cedar-grove)",
      }}
    >
      {children}
    </p>
  );
}

function RecordField({
  field,
  value,
  interactive,
  multiline = false,
  onChange,
}: {
  field: ProductField;
  value: string;
  interactive: boolean;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  const placeholder = FIELD_PLACEHOLDERS[field.label] ?? "+ add";

  return (
    <div className="py-3.5">
      <p
        className="mb-2 text-[9px] uppercase tracking-[0.22em]"
        style={{
          fontFamily: "'Jost', sans-serif",
          color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
        }}
      >
        {field.label}
      </p>
      {interactive ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="min-h-[120px] w-full resize-none bg-transparent text-[15px] leading-[1.65] focus:outline-none"
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
            className="w-full bg-transparent text-[15px] leading-[1.55] focus:outline-none"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.84)",
            }}
          />
        )
      ) : (
        <p
          className={multiline ? "min-h-[120px]" : ""}
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            fontFamily: "'Jost', sans-serif",
            color: "rgba(var(--swatch-teal-rgb), 0.84)",
          }}
        >
          {value || placeholder}
        </p>
      )}
    </div>
  );
}

function SnapshotSlot() {
  return (
    <div
      className="relative h-[136px] w-[112px] shrink-0 rounded-[28px] border p-3"
      style={{
        background: "rgba(255,255,255,0.18)",
        borderColor: "rgba(var(--swatch-teal-rgb), 0.2)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.52)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-3 h-2.5 w-9 -translate-x-1/2 rounded-full"
        style={{
          background: "rgba(var(--swatch-text-light-rgb, 138 158 164), 0.82)",
        }}
      />
      <div
        className="flex h-full items-center justify-center rounded-[18px] border border-dashed"
        style={{
          borderColor: "rgba(var(--swatch-teal-rgb), 0.22)",
        }}
      >
        <div className="text-center">
          <p
            className="text-[10px] uppercase tracking-[0.24em]"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.62)",
            }}
          >
            Snapshot
          </p>
          <p
            className="mt-2 text-[9px] uppercase tracking-[0.18em]"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
            }}
          >
            Add photo
          </p>
        </div>
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
      aria-label="Beverage product card"
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
        className="absolute inset-x-2 bottom-0 top-[10px] rounded-[34px]"
        style={{
          background: "rgba(var(--swatch-cedar-grove-rgb), 0.07)",
          filter: "blur(12px)",
        }}
      />

      <div
        className="card-design-sand relative flex h-full flex-col overflow-hidden rounded-[36px]"
        style={{ borderRadius: 36 }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.12), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.08), transparent 58%)",
          }}
        />

        <div className="relative flex h-full flex-col px-7 pb-5 pt-7">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0 flex-1 max-w-[19rem]">
              <SectionEyebrow>My Go Two / Vault</SectionEyebrow>
              {interactive ? (
                <textarea
                  value={entryName}
                  onChange={(event) => setEntryName(event.target.value)}
                  rows={2}
                  className="mt-3 w-full resize-none bg-transparent text-[58px] leading-[0.9] tracking-[-0.05em] focus:outline-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                />
              ) : (
                <h2
                  className="mt-3 text-[58px] leading-[0.9] tracking-[-0.05em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                >
                  {cardTitle}
                </h2>
              )}
            </div>

            <SnapshotSlot />
          </div>

          <div
            className="mt-6 rounded-[24px] px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.22)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.56)",
            }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.22em]"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
              }}
            >
              Indexed under
            </p>
            <p
              className="mt-2 text-[15px] leading-[1.6]"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-teal-rgb), 0.84)",
              }}
            >
              Taste, ritual, spots, and hard no&apos;s.
            </p>
          </div>

          <div
            className="mt-5 flex-1 rounded-[28px] px-5 py-2"
            style={{
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            {goToOrder ? (
              <RecordField
                field={goToOrder}
                value={fieldValues[slugFieldLabel(goToOrder.label)] || ""}
                interactive={interactive}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [slugFieldLabel(goToOrder.label)]: nextValue,
                  }))
                }
              />
            ) : null}

            <div
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(var(--swatch-teal-rgb), 0.12)" }}
            />

            <div className="grid grid-cols-2 gap-5">
              {favoritePlace ? (
                <RecordField
                  field={favoritePlace}
                  value={fieldValues[slugFieldLabel(favoritePlace.label)] || ""}
                  interactive={interactive}
                  onChange={(nextValue) =>
                    setFieldValues((current) => ({
                      ...current,
                      [slugFieldLabel(favoritePlace.label)]: nextValue,
                    }))
                  }
                />
              ) : null}

              {howITakeIt ? (
                <RecordField
                  field={howITakeIt}
                  value={fieldValues[slugFieldLabel(howITakeIt.label)] || ""}
                  interactive={interactive}
                  onChange={(nextValue) =>
                    setFieldValues((current) => ({
                      ...current,
                      [slugFieldLabel(howITakeIt.label)]: nextValue,
                    }))
                  }
                />
              ) : null}
            </div>

            <div
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(var(--swatch-teal-rgb), 0.12)" }}
            />

            {avoid ? (
              <RecordField
                field={avoid}
                value={fieldValues[slugFieldLabel(avoid.label)] || ""}
                interactive={interactive}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [slugFieldLabel(avoid.label)]: nextValue,
                  }))
                }
              />
            ) : null}
          </div>

          <div
            className="mt-4 rounded-[28px] px-5 py-2"
            style={{
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.46)",
            }}
          >
            {notes ? (
              <RecordField
                field={notes}
                value={fieldValues[slugFieldLabel(notes.label)] || ""}
                interactive={interactive}
                multiline
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [slugFieldLabel(notes.label)]: nextValue,
                  }))
                }
              />
            ) : null}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div
              className="rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em]"
              style={{
                background: "rgba(255,255,255,0.22)",
                border: "1px solid rgba(var(--swatch-teal-rgb), 0.18)",
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
                className="h-11 rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "linear-gradient(180deg, #617984 0%, #4f6770 100%)",
                  boxShadow: "0 8px 18px rgba(37,32,27,0.18), inset 0 1px 0 rgba(255,255,255,0.18)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {saving ? "Saving..." : "Save Card"}
              </button>
            ) : (
              <div
                className="flex h-11 items-center rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0]"
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
