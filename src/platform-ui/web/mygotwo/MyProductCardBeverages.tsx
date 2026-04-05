import { useEffect, useMemo, useState } from "react";

import { createSavedProductCard, updateSavedProductCard } from "@/features/mygotwo/myGoTwoData";
import type { SavedProductCard } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useToast } from "@/hooks/use-toast";

type MyProductCardBeveragesProps = {
  userId: string;
  activeSavedProductCard: SavedProductCard | null;
  onSaved: (savedProductCardId?: string) => Promise<void> | void;
  compact?: boolean;
  interactive?: boolean;
};

type ProductField = SubtypeItem["fields"][number];
type FieldKey = "go_to_order" | "favorite_place" | "how_i_take_it" | "avoid" | "notes";
type FieldPresentation = "searchable" | "freeform";

type BeverageFieldConfig = {
  key: FieldKey;
  label: string;
  placeholder: string;
  presentation: FieldPresentation;
  multiline?: boolean;
};

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

const FIELD_CONFIGS: BeverageFieldConfig[] = [
  {
    key: "go_to_order",
    label: "Go-to order",
    placeholder: "Iced matcha, half sweet, oat milk",
    presentation: "searchable",
  },
  {
    key: "favorite_place",
    label: "Favorite place",
    placeholder: "Cafe, bar, or spot",
    presentation: "searchable",
  },
  {
    key: "how_i_take_it",
    label: "How I take it",
    placeholder: "Extra cold, strong, no foam",
    presentation: "searchable",
  },
  {
    key: "avoid",
    label: "Avoid",
    placeholder: "Too sweet, watery, no pulp",
    presentation: "searchable",
  },
  {
    key: "notes",
    label: "Notes",
    placeholder: "Add a note...",
    presentation: "freeform",
    multiline: true,
  },
];

function slugFieldLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function buildInitialFieldValues(fields: ProductField[], activeSavedProductCard: SavedProductCard | null) {
  return fields.reduce<Record<string, string>>((acc, field) => {
    const key = slugFieldLabel(field.label);
    const storedValue = activeSavedProductCard?.field_values?.[key];

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

function getFieldConfig(field: ProductField): BeverageFieldConfig {
  const key = slugFieldLabel(field.label) as FieldKey;
  return (
    FIELD_CONFIGS.find((config) => config.key === key) ?? {
      key,
      label: field.label,
      placeholder: "+ add",
      presentation: "freeform",
    }
  );
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
  emphasis = false,
  multilineMinHeight,
  onChange,
}: {
  field: ProductField;
  value: string;
  interactive: boolean;
  emphasis?: boolean;
  multilineMinHeight?: number;
  onChange: (value: string) => void;
}) {
  const config = getFieldConfig(field);
  const placeholder = config.placeholder;
  const multiline = Boolean(config.multiline);
  const minHeight = multilineMinHeight ?? 120;

  return (
    <div className="py-4">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <p
          className="text-[9px] uppercase tracking-[0.22em]"
          style={{
            fontFamily: "'Jost', sans-serif",
            color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
          }}
        >
          {field.label}
        </p>
        {config.presentation === "searchable" ? (
          <span
            className="rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.18em]"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.76)",
              background: "rgba(255,255,255,0.34)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
            }}
          >
            Search
          </span>
        ) : null}
      </div>
      {interactive ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent focus:outline-none"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.84)",
              minHeight,
              fontSize: emphasis ? "16px" : "15px",
              lineHeight: emphasis ? 1.75 : 1.7,
            }}
          />
        ) : (
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent focus:outline-none"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.84)",
              fontSize: emphasis ? "24px" : "16px",
              lineHeight: emphasis ? 1.2 : 1.65,
              fontWeight: emphasis ? 500 : 400,
            }}
          />
        )
      ) : (
        <p
          className={multiline ? "" : ""}
          style={{
            fontSize: multiline ? (emphasis ? "16px" : "15px") : emphasis ? "24px" : "16px",
            lineHeight: multiline ? (emphasis ? 1.75 : 1.7) : emphasis ? 1.2 : 1.65,
            fontFamily: "'Jost', sans-serif",
            color: "rgba(var(--swatch-teal-rgb), 0.84)",
            fontWeight: multiline ? 400 : emphasis ? 500 : 400,
            minHeight: multiline ? minHeight : undefined,
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
      className="relative h-[128px] w-[106px] shrink-0 overflow-hidden rounded-[26px] border p-3"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.14))",
        borderColor: "rgba(var(--swatch-teal-rgb), 0.16)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.56), 0 10px 24px rgba(var(--swatch-viridian-odyssey-rgb), 0.05)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-3 h-2.5 w-9 -translate-x-1/2 rounded-full"
        style={{
          background: "rgba(var(--swatch-text-light-rgb, 138 158 164), 0.7)",
        }}
      />
      <div
        className="flex h-full items-center justify-center rounded-[18px] border"
        style={{
          borderColor: "rgba(var(--swatch-teal-rgb), 0.14)",
          background: "rgba(255,255,255,0.18)",
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
            className="mt-2 text-[9px] uppercase tracking-[0.16em]"
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
  activeSavedProductCard,
  onSaved,
  compact = false,
  interactive = true,
}: MyProductCardBeveragesProps) {
  const { toast } = useToast();
  const fields = useMemo(() => BEVERAGES_PRODUCT.fields ?? [], []);
  const [cardTitle, setCardTitle] = useState(
    activeSavedProductCard?.card_title || BEVERAGES_PRODUCT.name,
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(
    buildInitialFieldValues(fields, activeSavedProductCard),
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCardTitle(activeSavedProductCard?.card_title || BEVERAGES_PRODUCT.name);
    setFieldValues(buildInitialFieldValues(fields, activeSavedProductCard));
  }, [activeSavedProductCard, fields]);

  async function handleSave() {
    setSaving(true);

    try {
      let savedProductCardId = activeSavedProductCard?.id;

      if (activeSavedProductCard) {
        await updateSavedProductCard({
          savedProductCardId: activeSavedProductCard.id,
          cardTitle,
          fieldValues,
        });
      } else {
        const createdSavedProductCard = await createSavedProductCard({
          userId,
          productCardKey: BEVERAGES_PRODUCT.id,
          subcategoryLabel: BEVERAGES_SUBCATEGORY.name,
          cardTitle,
          fieldValues,
        });
        savedProductCardId = createdSavedProductCard.id;
      }

      await onSaved(savedProductCardId);
      toast({
        title: activeSavedProductCard ? "Saved product card updated" : "Saved product card created",
        description: activeSavedProductCard
          ? "Your changes were saved."
          : "The new saved product card was added to the coverflow.",
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

  const fieldsByKey = useMemo(() => {
    return fields.reduce<Partial<Record<FieldKey, ProductField>>>((acc, field) => {
      acc[slugFieldLabel(field.label) as FieldKey] = field;
      return acc;
    }, {});
  }, [fields]);
  const resolvedCardTitle = cardTitle.trim() || "Beverage";

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
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 max-w-[17rem] flex-1">
              <SectionEyebrow>My Go Two / Vault</SectionEyebrow>
              {interactive ? (
                <textarea
                  value={cardTitle}
                  onChange={(event) => setCardTitle(event.target.value)}
                  rows={2}
                  className="mt-3 w-full resize-none bg-transparent text-[56px] leading-[0.9] tracking-[-0.05em] focus:outline-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                />
              ) : (
                <h2
                  className="mt-3 text-[56px] leading-[0.9] tracking-[-0.05em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                >
                  {resolvedCardTitle}
                </h2>
              )}
              <p
                className="mt-4 max-w-[16rem] text-[13px] leading-[1.6]"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
                }}
              >
                Save the exact drink, the exact spot, and the way you always get it. Built to be searched, saved, and shared.
              </p>
            </div>

            <SnapshotSlot />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
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
              className="text-[14px] leading-[1.6]"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-teal-rgb), 0.78)",
              }}
            >
              Taste, ritual, spots, and hard no&apos;s.
            </p>
          </div>

          <div
            className="mt-5 flex-1 rounded-[30px] px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.09)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.48)",
            }}
          >
            {fieldsByKey.go_to_order ? (
              <RecordField
                field={fieldsByKey.go_to_order}
                value={fieldValues.go_to_order || ""}
                interactive={interactive}
                emphasis
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    go_to_order: nextValue,
                  }))
                }
              />
            ) : null}

            <div
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}
            />

            <div className="grid grid-cols-2 gap-0">
              <div className="pr-5">
                {fieldsByKey.favorite_place ? (
                  <RecordField
                    field={fieldsByKey.favorite_place}
                    value={fieldValues.favorite_place || ""}
                    interactive={interactive}
                    onChange={(nextValue) =>
                      setFieldValues((current) => ({
                        ...current,
                        favorite_place: nextValue,
                      }))
                    }
                  />
                ) : null}
              </div>

              <div
                className="pl-5"
                style={{ borderLeft: "1px solid rgba(var(--swatch-teal-rgb), 0.1)" }}
              >
                {fieldsByKey.how_i_take_it ? (
                  <RecordField
                    field={fieldsByKey.how_i_take_it}
                    value={fieldValues.how_i_take_it || ""}
                    interactive={interactive}
                    onChange={(nextValue) =>
                      setFieldValues((current) => ({
                        ...current,
                        how_i_take_it: nextValue,
                      }))
                    }
                  />
                ) : null}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}
            />

            {fieldsByKey.avoid ? (
              <RecordField
                field={fieldsByKey.avoid}
                value={fieldValues.avoid || ""}
                interactive={interactive}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    avoid: nextValue,
                  }))
                }
              />
            ) : null}

            <div
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(var(--swatch-teal-rgb), 0.1)" }}
            />

            {fieldsByKey.notes ? (
              <RecordField
                field={fieldsByKey.notes}
                value={fieldValues.notes || ""}
                interactive={interactive}
                multilineMinHeight={130}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    notes: nextValue,
                  }))
                }
              />
            ) : null}
          </div>

          <div
            className="mt-4 flex items-center justify-between gap-4 border-t pt-4"
            style={{ borderColor: "rgba(var(--swatch-teal-rgb), 0.08)" }}
          >
            <div
              className="rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em]"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)",
                color: "rgba(var(--swatch-antique-coin-rgb), 0.92)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Vault card
            </div>

            {interactive ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="h-11 rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4ead0] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "linear-gradient(180deg, #617984 0%, #506973 100%)",
                  boxShadow:
                    "0 12px 28px rgba(var(--swatch-viridian-odyssey-rgb), 0.18), inset 0 1px 0 rgba(255,255,255,0.18)",
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

// Codebase classification: runtime My Go Two beverage saved product card editor.
