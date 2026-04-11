import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ImagePlus, Loader2 } from "lucide-react";

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
  | "go_two_order"
  | "keywords";

type BeverageFieldConfig = {
  key: FieldKey;
  label: string;
  placeholder: string;
  options?: readonly string[];
};

const FIELD_CONFIGS: BeverageFieldConfig[] = [
  {
    key: "go_two_order",
    label: "Go Two Order",
    placeholder: "Iced matcha, oat milk, light ice",
  },
  {
    key: "keywords",
    label: "Keywords",
    placeholder: "Add keyword",
    options: [
      "Coffee",
      "Tea",
      "Matcha",
      "Iced",
      "Hot",
      "Morning",
      "Favorite",
      "Daily",
      "Patio",
      "Drive-Thru",
      "Brunch",
      "Cafe",
      "Treat",
      "Weekend",
    ],
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
  return <p className="surface-eyebrow-coral">{children}</p>;
}

function FieldLabel({ children }: { children: string }) {
  return <p className="surface-eyebrow-teal">{children}</p>;
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
  uploading,
  resolvedImageUrl,
  onAddPhoto,
  interactive: isInteractive,
}: {
  compact: boolean;
  uploading: boolean;
  resolvedImageUrl: string;
  onAddPhoto: () => void;
  interactive?: boolean;
}) {
  const frameHeight = compact ? 160 : 224;

  return (
    <div className={compact ? "w-[148px] shrink-0" : "w-[204px] shrink-0"}>
      <FieldLabel>Snapshot</FieldLabel>
      <button
        type="button"
        onClick={isInteractive ? onAddPhoto : undefined}
        disabled={!isInteractive || uploading}
        className="surface-field mt-3 flex w-full flex-col overflow-hidden rounded-[28px] text-left transition-opacity disabled:cursor-default disabled:opacity-100"
        style={{ minHeight: frameHeight }}
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
              <Loader2 className="h-6 w-6 animate-spin text-[var(--logo-two-color)]" />
            ) : (
              <ImagePlus className="h-7 w-7 text-[var(--logo-two-color)]" />
            )}
            <div>
              <p className="surface-eyebrow-teal">{uploading ? "Uploading" : "Add Snapshot"}</p>
              <p
                className="mt-2 text-[13px] leading-[1.55] text-[rgba(var(--swatch-antique-coin-rgb),0.94)]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Add a drink photo or a quick snapshot.
              </p>
            </div>
          </div>
        )}
      </button>
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
      <FieldLabel>Go Two Order</FieldLabel>
      {interactive ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type the exact order"
          className="surface-field mt-2 w-full resize-none rounded-[28px] px-4 py-4 focus:outline-none"
          style={{
            minHeight: compact ? 72 : 84,
            fontFamily: "'Jost', sans-serif",
            color: "var(--logo-two-color)",
            fontSize: compact ? "14px" : "16px",
            lineHeight: compact ? 1.55 : 1.65,
          }}
        />
      ) : (
        <p
          className="surface-field mt-2 rounded-[28px] px-4 py-4"
          style={{
            minHeight: compact ? 72 : 84,
            fontFamily: "'Jost', sans-serif",
            color: "var(--logo-two-color)",
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
          <div className="surface-field flex items-center rounded-full pl-4 pr-2">
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
              className="min-w-0 flex-1 bg-transparent py-2.5 placeholder:text-[rgba(var(--swatch-antique-coin-rgb),0.72)] focus:outline-none"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: "var(--logo-two-color)",
                fontSize: compact ? "12px" : "13px",
              }}
            />
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="surface-button-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              aria-label={`Open ${config.label} options`}
            >
              <ChevronDown
                className="h-4 w-4 text-[var(--logo-two-color)] transition-transform"
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
                  className="surface-pill pill-asset-ivory rounded-full px-3 py-1.5 text-[12px] leading-none"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {keyword}
                </button>
              ))}
            </div>
          ) : null}
          {menuOpen && filteredOptions.length > 0 ? (
            <div className="surface-pill mt-2 rounded-[22px] border border-white/80 bg-[rgba(255,255,255,0.86)] px-2 py-2 shadow-[0_16px_30px_rgba(var(--swatch-cedar-grove-rgb),0.08)]">
              <div className="flex flex-wrap gap-2">
                {filteredOptions.slice(0, 10).map((option) => (
                  <button
                    key={`${config.key}-option-${option}`}
                    type="button"
                    onClick={() => commitKeyword(option)}
                    className="surface-pill pill-asset-ivory rounded-full px-3 py-1.5 text-[12px] leading-none"
                    style={{ fontFamily: "'Jost', sans-serif" }}
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
                className="surface-pill pill-asset-ivory rounded-full px-3 py-1.5 text-[12px] leading-none"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {keyword}
              </span>
            ))
          ) : (
            <span
              className="surface-pill pill-asset-ivory rounded-full px-3 py-1.5 text-[12px] leading-none opacity-70"
              style={{
                fontFamily: "'Jost', sans-serif",
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
  const keywordsConfig = FIELD_CONFIGS.find((config) => config.key === "keywords");

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
              <SectionEyebrow>My Go Two / Vault</SectionEyebrow>
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
                Your drink, your way, down to the last detail. The exact order, the exact place, the way you always take it. Tagged and searchable so nothing gets lost and nobody has to guess.
              </p>
            </div>

            <SnapshotUploader
              compact={compact}
              uploading={uploadingSnapshot}
              resolvedImageUrl={resolvedSnapshotUrl}
              onAddPhoto={() => uploadInputRef.current?.click()}
            />
          </div>

          <div className="mt-6">
            <GoToOrderField
              compact={compact}
              interactive={interactive}
              value={fieldValues.go_two_order}
              onChange={(nextValue) =>
                setFieldValues((current) => ({
                  ...current,
                  go_two_order: nextValue,
                }))
              }
            />
          </div>

          {keywordsConfig ? (
            <div className="mt-4">
              <KeywordField
                compact={compact}
                config={keywordsConfig}
                interactive={interactive}
                value={fieldValues.keywords}
                onChange={(nextValue) =>
                  setFieldValues((current) => ({
                    ...current,
                    keywords: nextValue,
                  }))
                }
              />
            </div>
          ) : null}

          <div
            className="mt-4 flex items-center justify-between gap-4 border-t pt-4"
            style={{ borderColor: "rgba(var(--swatch-teal-rgb), 0.08)" }}
          >
            <div
              className="surface-pill pill-asset-ivory rounded-full px-4 py-2 text-[12px] leading-none"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Saved Product Card
            </div>

            {interactive ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || uploadingSnapshot}
                className="surface-button-primary h-11 rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.22em] transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {saving ? "Saving..." : "Save Card"}
              </button>
            ) : (
              <div
                className="surface-button-primary flex h-11 items-center rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ fontFamily: "'Jost', sans-serif" }}
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
        </div>
      </div>
    </section>
  );
}

// Codebase classification: runtime My Go Two beverage saved product card editor.
