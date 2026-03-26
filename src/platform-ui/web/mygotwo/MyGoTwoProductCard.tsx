import { useEffect, useMemo, useState } from "react";

import { createMyGoTwoEntry, updateMyGoTwoEntry } from "@/features/mygotwo/myGoTwoData";
import type { CardEntry } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useToast } from "@/hooks/use-toast";

type ProductField = SubtypeItem["fields"][number];

type MyGoTwoProductCardProps = {
  userId: string;
  categoryLabel: string;
  subcategory: SubcategoryGroup;
  product: SubtypeItem;
  activeEntry: CardEntry | null;
  onSaved: (entryId?: string) => Promise<void> | void;
  compact?: boolean;
  interactive?: boolean;
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

function ProductFieldControl({
  field,
  value,
  onChange,
  compact = false,
}: {
  field: ProductField;
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
}) {
  if (field.type === "select" && field.options?.length) {
    return (
      <div className={compact ? "flex flex-wrap gap-2" : "flex flex-wrap gap-3"}>
        {field.options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={compact ? "min-w-[44px] rounded-full border px-3 py-1.5 text-[11px] transition-colors duration-200" : "min-w-[48px] rounded-full border px-4 py-2 text-sm transition-colors duration-200"}
              style={{
                borderColor: active ? "rgba(216, 88, 54, 0.85)" : "rgba(168, 160, 149, 0.52)",
                background: active ? "rgba(220, 93, 57, 0.12)" : "transparent",
                color: "#1f1d1a",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  const isNotes = field.label.toLowerCase() === "notes";

  return isNotes ? (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Add a note..."
      className={compact ? "min-h-[56px] w-full resize-none bg-transparent text-[12px] leading-[1.35] text-[#46413a] placeholder:text-[#b2a692] focus:outline-none" : "min-h-[86px] w-full resize-none bg-transparent text-[15px] text-[#46413a] placeholder:text-[#b2a692] focus:outline-none"}
    />
  ) : (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="+ add"
      className={compact ? "w-full bg-transparent text-[12px] leading-[1.35] text-[#46413a] placeholder:text-[#b2a692] focus:outline-none" : "w-full bg-transparent text-[15px] text-[#46413a] placeholder:text-[#b2a692] focus:outline-none"}
    />
  );
}

export default function MyGoTwoProductCard({
  userId,
  categoryLabel,
  subcategory,
  product,
  activeEntry,
  onSaved,
  compact = false,
  interactive = true,
}: MyGoTwoProductCardProps) {
  const { toast } = useToast();
  const fields = useMemo(() => product.fields ?? [], [product.fields]);
  const [entryName, setEntryName] = useState(activeEntry?.entry_name || product.name);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(
    buildInitialFieldValues(fields, activeEntry),
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEntryName(activeEntry?.entry_name || product.name);
    setFieldValues(buildInitialFieldValues(fields, activeEntry));
  }, [activeEntry, fields, product.name]);

  const cardEyebrow = useMemo(
    () => `${categoryLabel.toUpperCase()} \u00b7 ${subcategory.name.toUpperCase()}`,
    [categoryLabel, subcategory.name],
  );

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
          cardKey: product.id,
          groupName: subcategory.name,
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

  return (
    <section
      aria-label={`${product.name} product card`}
      className={compact ? "flex h-full w-full flex-col overflow-hidden rounded-[34px] border px-3 py-3" : "absolute z-20 w-[468px] rounded-[32px] border px-8 py-7"}
      style={{
        top: compact ? undefined : "152px",
        right: compact ? undefined : "32px",
        left: compact ? undefined : "auto",
        transform: compact ? undefined : "none",
        background: "#f3eddc",
        borderColor: "rgba(190, 183, 171, 0.54)",
        boxShadow: "0 18px 54px rgba(34, 31, 27, 0.16)",
      }}
    >
      <div className={compact ? "mb-3 flex items-start justify-between gap-2.5" : "mb-6 flex items-start justify-between gap-6"}>
        <div className="min-w-0">
          <p className={compact ? "mb-2 text-[9px] font-medium uppercase tracking-[0.22em] text-[#db623f]" : "mb-4 text-[12px] font-medium uppercase tracking-[0.34em] text-[#db623f]"}>
            {cardEyebrow}
          </p>
          {interactive ? (
            <input
              value={entryName}
              onChange={(event) => setEntryName(event.target.value)}
              className={compact ? "w-full bg-transparent font-serif text-[27px] leading-[0.92] tracking-[-0.05em] text-[#1b1a18] focus:outline-none" : "w-full bg-transparent font-serif text-[64px] leading-[0.92] tracking-[-0.04em] text-[#1b1a18] focus:outline-none"}
            />
          ) : (
            <p className={compact ? "pr-1 font-serif text-[27px] leading-[0.92] tracking-[-0.05em] text-[#1b1a18]" : "font-serif text-[64px] leading-[0.92] tracking-[-0.04em] text-[#1b1a18]"}>
              {entryName}
            </p>
          )}
        </div>

        <div
          className={compact ? "relative flex h-[98px] w-[92px] shrink-0 overflow-hidden rounded-[18px] border" : "relative flex h-[168px] w-[172px] shrink-0 overflow-hidden rounded-[24px] border"}
          style={{
            background: "#d2cbc0",
            borderColor: "rgba(177, 169, 157, 0.46)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-[#857c70]">
            <span className={compact ? "rounded-full border px-2.5 py-1.5 text-[10px] tracking-[0.12em] uppercase" : "rounded-full border px-4 py-2 text-sm tracking-[0.16em] uppercase"}>
              Photo
            </span>
          </div>
        </div>
      </div>

      <div className={compact ? "mb-3 h-px w-full bg-[rgba(182,174,163,0.54)]" : "mb-8 h-px w-full bg-[rgba(182,174,163,0.54)]"} />

      <div className={compact ? "flex-1 space-y-2.5 overflow-hidden" : "space-y-6"}>
        {(compact ? fields.slice(0, 4) : fields).map((field) => {
          const key = slugFieldLabel(field.label);
          return (
            <div key={key} className={compact ? "border-b border-[rgba(182,174,163,0.4)] pb-2.5" : "border-b border-[rgba(182,174,163,0.4)] pb-5"}>
              <p className={compact ? "mb-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#b0a691]" : "mb-3 text-[12px] font-medium uppercase tracking-[0.28em] text-[#b0a691]"}>
                {field.label}
              </p>
              {interactive ? (
                <ProductFieldControl
                  field={field}
                  value={fieldValues[key] || ""}
                  compact={compact}
                  onChange={(nextValue) =>
                    setFieldValues((current) => ({ ...current, [key]: nextValue }))
                  }
                />
              ) : field.type === "select" && field.options?.length ? (
                <div className="flex flex-wrap gap-2">
                  {field.options.slice(0, compact ? 6 : field.options.length).map((option) => {
                    const active = option === (fieldValues[key] || "");
                    return (
                      <span
                        key={option}
                        className={compact ? "rounded-full border px-2.5 py-1.5 text-[10px]" : "rounded-full border px-4 py-2 text-sm"}
                        style={{
                          borderColor: active ? "rgba(216, 88, 54, 0.85)" : "rgba(168, 160, 149, 0.52)",
                          background: active ? "rgba(220, 93, 57, 0.12)" : "transparent",
                          color: "#1f1d1a",
                        }}
                      >
                        {option}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className={compact ? "line-clamp-2 text-[11px] leading-[1.35] text-[#6f665c]" : "text-[15px] text-[#46413a]"}>
                  {fieldValues[key] || (field.label.toLowerCase() === "notes" ? "Add a note..." : "+ add")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {interactive ? (
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={compact ? "mt-3 h-10 w-full rounded-full border-0 text-[13px] font-semibold text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70" : "mt-8 h-14 w-full rounded-full border-0 text-base font-semibold text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"}
          style={{
            background: "linear-gradient(180deg, #dd5d38 0%, #d65334 100%)",
          }}
        >
          {saving ? "Saving..." : "Save Card"}
        </button>
      ) : (
        <div
          className={compact ? "mt-3 flex h-10 w-full items-center justify-center rounded-full text-[13px] font-semibold text-white" : "mt-8 flex h-14 w-full items-center justify-center rounded-full text-base font-semibold text-white"}
          style={{
            background: "linear-gradient(180deg, #dd5d38 0%, #d65334 100%)",
          }}
        >
          Save Card
        </div>
      )}
    </section>
  );
}

export function slugMyGoTwoFieldLabel(label: string) {
  return slugFieldLabel(label);
}
