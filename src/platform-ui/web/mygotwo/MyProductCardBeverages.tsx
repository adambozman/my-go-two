import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Camera, ChevronDown, ImagePlus, Loader2 } from "lucide-react";

import { createSavedProductCard, updateSavedProductCard } from "@/features/mygotwo/myGoTwoData";
import type { SavedProductCard } from "@/features/mygotwo/types";
import type { SubcategoryGroup, SubtypeItem } from "@/data/templateSubtypes";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { makeStorageRef, resolveStorageUrl } from "@/lib/storageRefs";

type MyProductCardBeveragesProps = {
  userId: string;
  activeSavedProductCard: SavedProductCard | null;
  onSaved: (savedProductCardId?: string) => Promise<void> | void;
  compact?: boolean;
  interactive?: boolean;
};

type FieldKey =
  | "go_to_order"
  | "drink_type"
  | "temperature"
  | "size"
  | "favorite_place"
  | "occasion"
  | "avoid"
  | "keywords";

type BeverageFieldConfig = {
  key: FieldKey;
  label: string;
  placeholder: string;
  options?: readonly string[];
};

const FIELD_CONFIGS: BeverageFieldConfig[] = [
  {
    key: "go_to_order",
    label: "Go-To Order",
    placeholder: "Iced matcha, oat milk, light ice",
  },
  {
    key: "drink_type",
    label: "Drink Type",
    placeholder: "Add drink type",
    options: ["Coffee", "Espresso", "Tea", "Matcha", "Smoothie", "Juice", "Soda", "Cocktail", "Mocktail", "Fresco", "Water"],
  },
  {
    key: "temperature",
    label: "Temperature",
    placeholder: "Add temperature",
    options: ["Iced", "Hot", "Warm", "Frozen", "Room Temp"],
  },
  {
    key: "size",
    label: "Size",
    placeholder: "Add size",
    options: ["Short", "Small", "Medium", "Large", "Extra Large"],
  },
  {
    key: "favorite_place",
    label: "Favorite Place",
    placeholder: "Add place",
    options: ["Home", "Local Cafe", "Office", "Starbucks", "Dunkin", "Dutch Bros", "Juice Bar", "Tea Shop"],
  },
  {
    key: "occasion",
    label: "Occasion",
    placeholder: "Add occasion",
    options: ["Morning", "Afternoon", "Evening", "Workday", "Weekend", "Road Trip", "Treat", "Celebration"],
  },
  {
    key: "avoid",
    label: "Avoid",
    placeholder: "Add avoid",
    options: ["Too Sweet", "Dairy", "Ice", "Foam", "Pulp", "Artificial Sweetener", "Caffeine Late", "Alcohol"],
  },
  {
    key: "keywords",
    label: "Keywords",
    placeholder: "Add keyword",
    options: ["Morning", "Favorite", "Treat", "Patio", "Drive-Thru", "Brunch", "Daily", "Comfort", "Weekend"],
  },
];

const BEVERAGES_PRODUCT: SubtypeItem = {
  id: "beverages-featured-product-card",
  name: "Beverage",
  image: "",
  fields: FIELD_CONFIGS.map((config) => ({
    label: config.label,
    type: "text",
    value: "",
  })),
};

const BEVERAGES_SUBCATEGORY: SubcategoryGroup = {
  id: "beverages-featured",
  name: "Featured",
  image: "",
  products: [BEVERAGES_PRODUCT],
};

function buildInitialFieldValues(activeSavedProductCard: SavedProductCard | null) {
  return FIELD_CONFIGS.reduce<Record<FieldKey, string>>((acc, config) => {
    const storedValue = activeSavedProductCard?.field_values?.[config.key];
    acc[config.key] = typeof storedValue === "string" ? storedValue : "";
    return acc;
  }, {} as Record<FieldKey, string>);
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

function FieldLabel({ children }: { children: string }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.22em]"
      style={{
        fontFamily: "'Jost', sans-serif",
        color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
      }}
    >
      {children}
    </p>
  );
}

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

function parseKeywordValue(value: string) {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function serializeKeywordValue(values: string[]) {
  return values.join(" | ");
}

function SnapshotUploader({
  compact,
  interactive,
  uploading,
  resolvedImageUrl,
  onAddPhoto,
  onTakePhoto,
}: {
  compact: boolean;
  interactive: boolean;
  uploading: boolean;
  resolvedImageUrl: string;
  onAddPhoto: () => void;
  onTakePhoto: () => void;
}) {
  const frameHeight = compact ? 160 : 224;

  return (
    <div className={compact ? "w-[138px] shrink-0" : "w-[188px] shrink-0"}>
      <FieldLabel>Snapshot</FieldLabel>
      <button
        type="button"
        onClick={interactive ? onAddPhoto : undefined}
        disabled={!interactive || uploading}
        className="mt-3 flex w-full flex-col overflow-hidden rounded-[28px] border text-left transition-opacity disabled:cursor-default disabled:opacity-100"
        style={{
          minHeight: frameHeight,
          background: resolvedImageUrl
            ? "rgba(255,255,255,0.22)"
            : "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.14))",
          borderColor: "rgba(var(--swatch-teal-rgb), 0.16)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.56), 0 10px 24px rgba(var(--swatch-viridian-odyssey-rgb), 0.05)",
        }}
      >
        {resolvedImageUrl ? (
          <img
            src={resolvedImageUrl}
            alt="Beverage snapshot"
            className="h-full w-full object-cover"
            style={{ minHeight: frameHeight }}
          />
        ) : (
          <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-3 px-5 py-6 text-center">
            {uploading ? (
              <Loader2
                className="h-6 w-6 animate-spin"
                style={{ color: "rgba(var(--swatch-teal-rgb), 0.72)" }}
              />
            ) : (
              <ImagePlus
                className="h-7 w-7"
                style={{ color: "rgba(var(--swatch-teal-rgb), 0.72)" }}
              />
            )}
            <div>
              <p
                className="text-[12px] uppercase tracking-[0.18em]"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: "rgba(var(--swatch-teal-rgb), 0.72)",
                }}
              >
                {uploading ? "Uploading" : "Add Snapshot"}
              </p>
              <p
                className="mt-2 text-[13px] leading-[1.55]"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: "rgba(var(--swatch-antique-coin-rgb), 0.94)",
                }}
              >
                Add a drink photo or a quick snapshot.
              </p>
            </div>
          </div>
        )}
      </button>

      {interactive ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onAddPhoto}
            disabled={uploading}
            className="rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.82)",
              background: "rgba(255,255,255,0.36)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)",
            }}
          >
            Add Photo
          </button>
          <button
            type="button"
            onClick={onTakePhoto}
            disabled={uploading}
            className="rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "rgba(var(--swatch-teal-rgb), 0.82)",
              background: "rgba(255,255,255,0.36)",
              border: "1px solid rgba(var(--swatch-teal-rgb), 0.14)",
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5" />
              Take Photo
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function GoToOrderField({
  compact,
  interactive,
  value,
  onChange,
}: {
  compact: boolean;
  interactive: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel>Go-To Order</FieldLabel>
      {interactive ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type the exact order"
          className="mt-2 w-full resize-none rounded-[24px] border bg-[rgba(255,255,255,0.22)] px-4 py-4 focus:outline-none"
          style={{
            minHeight: compact ? 72 : 84,
            borderColor: "rgba(var(--swatch-teal-rgb), 0.11)",
            fontFamily: "'Jost', sans-serif",
            color: "rgba(var(--swatch-teal-rgb), 0.86)",
            fontSize: compact ? "14px" : "16px",
            lineHeight: compact ? 1.55 : 1.65,
          }}
        />
      ) : (
        <p
          className="mt-2 rounded-[24px] border px-4 py-4"
          style={{
            minHeight: compact ? 72 : 84,
            background: "rgba(255,255,255,0.22)",
            borderColor: "rgba(var(--swatch-teal-rgb), 0.11)",
            fontFamily: "'Jost', sans-serif",
            color: "rgba(var(--swatch-teal-rgb), 0.86)",
            fontSize: compact ? "14px" : "16px",
            lineHeight: compact ? 1.55 : 1.65,
          }}
        >
          {value || "Type the exact order"}
        </p>
      )}
    </div>
  );
}

function KeywordField({
  compact,
  config,
  interactive,
  value,
  onChange,
}: {
  compact: boolean;
  config: BeverageFieldConfig;
  interactive: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const keywords = useMemo(() => parseKeywordValue(value), [value]);
  const filteredOptions = (config.options || []).filter((option) => {
    const normalizedOption = normalizeKeyword(option);
    const alreadyAdded = keywords.some((keyword) => normalizeKeyword(keyword) === normalizedOption);
    if (alreadyAdded) return false;
    if (!draft.trim()) return true;
    return normalizedOption.includes(normalizeKeyword(draft));
  });

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [menuOpen]);

  function commitKeyword(rawValue: string) {
    const trimmed = rawValue.trim();
    if (!trimmed) return;

    const normalizedNext = normalizeKeyword(trimmed);
    const nextKeywords = keywords.filter(Boolean);
    if (nextKeywords.some((keyword) => normalizeKeyword(keyword) === normalizedNext)) {
      setDraft("");
      setMenuOpen(false);
      return;
    }

    onChange(serializeKeywordValue([...nextKeywords, trimmed]));
    setDraft("");
    setMenuOpen(false);
  }

  function removeKeyword(keywordToRemove: string) {
    onChange(
      serializeKeywordValue(
        keywords.filter((keyword) => normalizeKeyword(keyword) !== normalizeKeyword(keywordToRemove)),
      ),
    );
  }

  return (
    <div ref={fieldRef}>
      <FieldLabel>{config.label}</FieldLabel>
      {interactive ? (
        <div className="mt-2">
          <div
            className="flex items-center rounded-full border bg-[rgba(255,255,255,0.42)] pl-4 pr-2"
            style={{ borderColor: "rgba(var(--swatch-teal-rgb), 0.12)" }}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={config.placeholder}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitKeyword(draft);
                }

                if (event.key === "Backspace" && !draft.trim() && keywords.length > 0) {
                  removeKeyword(keywords[keywords.length - 1]);
                }
              }}
              className="min-w-0 flex-1 bg-transparent py-2.5 focus:outline-none"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-teal-rgb), 0.86)",
                fontSize: compact ? "12px" : "13px",
              }}
            />
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              aria-label={`Open ${config.label} options`}
              style={{ color: "rgba(var(--swatch-teal-rgb), 0.74)" }}
            >
              <ChevronDown
                className="h-4 w-4 transition-transform"
                style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
          {keywords.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <button
                  key={`${config.key}-${keyword}`}
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: "rgba(var(--swatch-teal-rgb), 0.84)",
                    background: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
                  }}
                >
                  {keyword}
                </button>
              ))}
            </div>
          ) : null}
          {menuOpen && filteredOptions.length > 0 ? (
            <div
              className="mt-2 rounded-[22px] border px-2 py-2"
              style={{
                background: "rgba(255,255,255,0.8)",
                borderColor: "rgba(var(--swatch-teal-rgb), 0.12)",
                boxShadow: "0 18px 30px rgba(var(--swatch-viridian-odyssey-rgb), 0.08)",
              }}
            >
              <div className="flex flex-wrap gap-2">
                {filteredOptions.slice(0, 10).map((option) => (
                  <button
                    key={`${config.key}-option-${option}`}
                    type="button"
                    onClick={() => commitKeyword(option)}
                    className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      color: "rgba(var(--swatch-teal-rgb), 0.84)",
                      background: "rgba(255,255,255,0.42)",
                      border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap gap-2">
          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <span
                key={`${config.key}-${keyword}`}
                className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: "rgba(var(--swatch-teal-rgb), 0.84)",
                  background: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(var(--swatch-teal-rgb), 0.12)",
                }}
              >
                {keyword}
              </span>
            ))
          ) : (
            <span
              className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(var(--swatch-antique-coin-rgb), 0.84)",
                background: "rgba(255,255,255,0.22)",
                border: "1px solid rgba(var(--swatch-teal-rgb), 0.1)",
              }}
            >
              {config.placeholder}
            </span>
          )}
        </div>
      )}
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
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [cardTitle, setCardTitle] = useState(
    activeSavedProductCard?.card_title || BEVERAGES_PRODUCT.name,
  );
  const [fieldValues, setFieldValues] = useState<Record<FieldKey, string>>(
    buildInitialFieldValues(activeSavedProductCard),
  );
  const [snapshotValue, setSnapshotValue] = useState<string | null>(
    activeSavedProductCard?.image_url ?? null,
  );
  const [resolvedSnapshotUrl, setResolvedSnapshotUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingSnapshot, setUploadingSnapshot] = useState(false);

  useEffect(() => {
    setCardTitle(activeSavedProductCard?.card_title || BEVERAGES_PRODUCT.name);
    setFieldValues(buildInitialFieldValues(activeSavedProductCard));
    setSnapshotValue(activeSavedProductCard?.image_url ?? null);
  }, [activeSavedProductCard]);

  useEffect(() => {
    let cancelled = false;

    const loadSnapshot = async () => {
      const resolved = await resolveStorageUrl(snapshotValue);
      if (!cancelled) {
        setResolvedSnapshotUrl(resolved || "");
      }
    };

    loadSnapshot();

    return () => {
      cancelled = true;
    };
  }, [snapshotValue]);

  async function handleSnapshotUpload(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Upload failed",
        description: "Choose an image file for the snapshot.",
        variant: "destructive",
      });
      input.value = "";
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast({
        title: "Upload failed",
        description: "Snapshot images need to stay under 8MB.",
        variant: "destructive",
      });
      input.value = "";
      return;
    }

    setUploadingSnapshot(true);

    try {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const cardSegment = activeSavedProductCard?.id || "draft";
      const filePath = `${userId}/saved-product-cards/beverage/${cardSegment}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("card-images")
        .upload(filePath, file, { upsert: true });

      if (error) throw error;

      setSnapshotValue(makeStorageRef("card-images", filePath));
      toast({
        title: "Snapshot added",
        description: "Save the card to keep this beverage photo on the product card.",
      });
    } catch (error) {
      const description = error instanceof Error ? error.message : "The snapshot could not be uploaded.";
      toast({
        title: "Upload failed",
        description,
        variant: "destructive",
      });
    } finally {
      setUploadingSnapshot(false);
      input.value = "";
    }
  }

  async function handleSave() {
    setSaving(true);

    try {
      let savedProductCardId = activeSavedProductCard?.id;

      if (activeSavedProductCard) {
        await updateSavedProductCard({
          savedProductCardId: activeSavedProductCard.id,
          cardTitle,
          fieldValues,
          imageUrl: snapshotValue,
        });
      } else {
        const createdSavedProductCard = await createSavedProductCard({
          userId,
          productCardKey: BEVERAGES_PRODUCT.id,
          subcategoryLabel: BEVERAGES_SUBCATEGORY.name,
          cardTitle,
          fieldValues,
          imageUrl: snapshotValue,
        });
        savedProductCardId = createdSavedProductCard.id;
      }

      await onSaved(savedProductCardId);
      toast({
        title: activeSavedProductCard ? "Saved product card updated" : "Saved product card created",
        description: activeSavedProductCard
          ? "Your beverage card changes were saved."
          : "The new beverage card was added to My Go Two.",
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

  const resolvedCardTitle = cardTitle.trim() || "Beverage";
  const detailFields = FIELD_CONFIGS.filter((config) => config.key !== "go_to_order");

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

        <div className={compact ? "relative flex h-full flex-col px-5 pb-4 pt-5" : "relative flex h-full flex-col px-7 pb-5 pt-7"}>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <SectionEyebrow>My Go Two / Saved Product Card</SectionEyebrow>
              {interactive ? (
                <input
                  value={cardTitle}
                  onChange={(event) => setCardTitle(event.target.value)}
                  className={compact ? "mt-3 w-full bg-transparent text-[30px] leading-[0.94] tracking-[-0.04em] focus:outline-none" : "mt-3 w-full bg-transparent text-[42px] leading-[0.94] tracking-[-0.04em] focus:outline-none"}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    color: "var(--swatch-teal)",
                  }}
                />
              ) : (
                <h2
                  className={compact ? "mt-3 text-[30px] leading-[0.94] tracking-[-0.04em]" : "mt-3 text-[42px] leading-[0.94] tracking-[-0.04em]"}
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
                className={compact ? "mt-3 max-w-[18rem] text-[12px] leading-[1.55]" : "mt-4 max-w-[18rem] text-[13px] leading-[1.6]"}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: "rgba(var(--swatch-antique-coin-rgb), 0.96)",
                }}
              >
                Save the exact drink, the exact build, and the place tied to it. Keep it quick to scan and easy to edit.
              </p>
            </div>

            <SnapshotUploader
              compact={compact}
              interactive={interactive}
              uploading={uploadingSnapshot}
              resolvedImageUrl={resolvedSnapshotUrl}
              onAddPhoto={() => uploadInputRef.current?.click()}
              onTakePhoto={() => cameraInputRef.current?.click()}
            />
          </div>

          <div className="mt-6">
            <GoToOrderField
              compact={compact}
              interactive={interactive}
              value={fieldValues.go_to_order}
              onChange={(nextValue) =>
                setFieldValues((current) => ({
                  ...current,
                  go_to_order: nextValue,
                }))
              }
            />
          </div>

          <div className={compact ? "mt-4 grid grid-cols-1 gap-x-3 gap-y-4" : "mt-4 grid grid-cols-2 gap-x-4 gap-y-4"}>
            {detailFields.map((config) => (
              <KeywordField
                key={config.key}
                compact={compact}
                config={config}
                interactive={interactive}
                value={fieldValues[config.key]}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    [config.key]: nextValue,
                  }))
                }
              />
            ))}
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
              Saved Product Card
            </div>

            {interactive ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || uploadingSnapshot}
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

          <input
            ref={uploadInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSnapshotUpload}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleSnapshotUpload}
          />
        </div>
      </div>
    </section>
  );
}

// Codebase classification: runtime My Go Two beverage saved product card editor.
