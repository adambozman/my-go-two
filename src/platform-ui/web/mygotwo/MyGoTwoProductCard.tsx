import { useEffect, useMemo, useState } from "react";

import { createMyGoTwoEntry, updateMyGoTwoEntry } from "@/features/mygotwo/myGoTwoData";
import type { CardEntry } from "@/features/mygotwo/types";
import { useMyGoTwoImageField } from "@/features/mygotwo/useMyGoTwoImageField";
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
}: {
  field: ProductField;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "select" && field.options?.length) {
    return (
      <div className="flex flex-wrap gap-3">
        {field.options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className="min-w-[48px] rounded-full border px-4 py-2 text-sm transition-colors duration-200"
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
      className="min-h-[86px] w-full resize-none bg-transparent text-[15px] text-[#46413a] placeholder:text-[#b2a692] focus:outline-none"
    />
  ) : (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="+ add"
      className="w-full bg-transparent text-[15px] text-[#46413a] placeholder:text-[#b2a692] focus:outline-none"
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
}: MyGoTwoProductCardProps) {
  const { toast } = useToast();
  const fields = product.fields ?? [];
  const [entryName, setEntryName] = useState(activeEntry?.entry_name || product.name);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(
    buildInitialFieldValues(fields, activeEntry),
  );
  const [imageUrl, setImageUrl] = useState(activeEntry?.image_url || "");
  const [saving, setSaving] = useState(false);

  const { fileInputRef, resolvedImageUrl, uploadingImage, handleImageUpload } = useMyGoTwoImageField(
    imageUrl,
    setImageUrl,
  );

  useEffect(() => {
    setEntryName(activeEntry?.entry_name || product.name);
    setFieldValues(buildInitialFieldValues(fields, activeEntry));
    setImageUrl(activeEntry?.image_url || "");
  }, [activeEntry, fields, product.name]);

  const cardEyebrow = useMemo(
    () => `${categoryLabel.toUpperCase()} \u00b7 ${subcategory.name.toUpperCase()}`,
    [categoryLabel, subcategory.name],
  );

  async function handleSave() {
    setSaving(true);

    try {
      if (activeEntry) {
        await updateMyGoTwoEntry({
          entryId: activeEntry.id,
          entryName,
          fieldValues,
          imageUrl: imageUrl || null,
        });
      } else {
        await createMyGoTwoEntry({
          userId,
          cardKey: product.id,
          groupName: subcategory.name,
          entryName,
          fieldValues,
          imageUrl: imageUrl || null,
        });
      }

      await onSaved(activeEntry?.id);
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
      className="absolute right-8 top-[152px] z-20 w-[468px] rounded-[32px] border px-8 py-7"
      style={{
        background: "#f3eddc",
        borderColor: "rgba(190, 183, 171, 0.54)",
        boxShadow: "0 18px 54px rgba(34, 31, 27, 0.16)",
      }}
    >
      <div className="mb-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.34em] text-[#db623f]">
            {cardEyebrow}
          </p>
          <input
            value={entryName}
            onChange={(event) => setEntryName(event.target.value)}
            className="w-full bg-transparent font-serif text-[64px] leading-[0.92] tracking-[-0.04em] text-[#1b1a18] focus:outline-none"
          />
        </div>

        <div
          className="relative flex h-[168px] w-[172px] shrink-0 overflow-hidden rounded-[24px] border"
          style={{
            background: "#d2cbc0",
            borderColor: "rgba(177, 169, 157, 0.46)",
          }}
        >
          {resolvedImageUrl ? (
            <img
              src={resolvedImageUrl}
              alt={entryName}
              className="h-full w-full object-cover"
            />
          ) : null}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center text-[#857c70] transition-colors duration-200 hover:text-[#5e574f] focus:outline-none"
          >
            <span className="rounded-full border px-4 py-2 text-sm tracking-[0.16em] uppercase">
              {uploadingImage ? "Uploading" : "Photo"}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="mb-8 h-px w-full bg-[rgba(182,174,163,0.54)]" />

      <div className="space-y-6">
        {fields.map((field) => {
          const key = slugFieldLabel(field.label);
          return (
            <div key={key} className="border-b border-[rgba(182,174,163,0.4)] pb-5">
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.28em] text-[#b0a691]">
                {field.label}
              </p>
              <ProductFieldControl
                field={field}
                value={fieldValues[key] || ""}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({ ...current, [key]: nextValue }))
                }
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || uploadingImage}
        className="mt-8 h-14 w-full rounded-full border-0 text-base font-semibold text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          background: "linear-gradient(180deg, #dd5d38 0%, #d65334 100%)",
        }}
      >
        {saving ? "Saving..." : "Save Card"}
      </button>
    </section>
  );
}
