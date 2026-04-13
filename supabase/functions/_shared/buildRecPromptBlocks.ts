/**
 * buildRecPromptBlocks.ts
 *
 * Extracted, testable prompt-block builders for the recommendation engine.
 * Used by recommendation-engine-v2/index.ts and tested directly — no mocks.
 */

type JsonObject = Record<string, unknown>;

const cleanText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const toObject = (value: unknown): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};

// ── Label maps ──────────────────────────────────────────────────────────────

export const RANGE_LABELS: Record<string, string> = {
  under_25: "under $25", "25_75": "$25-$75", "75_150": "$75-$150", "150_plus": "$150+",
  under_50: "under $50", "50_120": "$50-$120", "120_250": "$120-$250", "250_plus": "$250+",
  under_20: "under $20", "20_50": "$20-$50", "50_100": "$50-$100", "100_plus": "$100+",
  under_300: "under $300", "300_800": "$300-$800", "800_1500": "$800-$1,500", "1500_plus": "$1,500+",
  under_15: "under $15", "15_40": "$15-$40", "40_80": "$40-$80", "80_plus": "$80+",
  "50_150": "$50-$150", "150_500": "$150-$500", "500_plus": "$500+",
  under_20mo: "under $20/mo", "20_60mo": "$20-$60/mo", "60_150mo": "$60-$150/mo", "150_plus_mo": "$150+/mo",
};

export const ITEM_LABELS: Record<string, string> = {
  tshirt: "t-shirt", pants: "jeans/pants", shoes: "shoes", dinner_out: "nice dinner out",
  tv: "TV", plant: "plant", book: "book", coffee: "coffee/drink",
  wine: "bottle of wine", skincare: "skincare product", supplement: "supplement",
  gym: "gym membership", concert: "concert tickets", gaming: "gaming gear",
  luggage: "luggage", kitchen: "kitchen gadget", takeout: "weeknight takeout",
};

// ── Public interfaces ───────────────────────────────────────────────────────

export interface RecPromptBlocks {
  spendAnchorBlock: string;
  overallPriceTier: string;
  categoryPriorityBlock: string;
  brandAffinityBlock: string;
  behaviorBlock: string;
  spendAnchorLines: string[];
}

export interface RecPromptInput {
  yourVibe: JsonObject;
  combinedResponses: JsonObject;
  recommendedBrands: string[];
}

// ── Builder ─────────────────────────────────────────────────────────────────

export const buildRecPromptBlocks = (input: RecPromptInput): RecPromptBlocks => {
  const yourVibePayload = toObject(input.yourVibe);
  const vibeSpendSignals = toObject(yourVibePayload.spend_signals as unknown);
  const vibeCategoryPriority: string[] = Array.isArray(yourVibePayload.category_priority)
    ? (yourVibePayload.category_priority as string[])
    : [];
  const overallPriceTier = cleanText(yourVibePayload.price_tier as unknown) || "mid-range";
  const vibeBrandAffinity: string[] = Array.isArray(yourVibePayload.recommended_brands)
    ? (yourVibePayload.recommended_brands as string[]).slice(0, 12)
    : input.recommendedBrands.slice(0, 12);
  const vibeShoppingBehavior: string[] = Array.isArray(yourVibePayload.shopping_behavior)
    ? (yourVibePayload.shopping_behavior as string[])
    : [];
  const vibeSubscriptions: string[] = Array.isArray(yourVibePayload.subscription_habits)
    ? (yourVibePayload.subscription_habits as string[])
    : [];

  // Build spend anchor lines — per item, from vibe derivation
  const spendAnchorLines: string[] = [];
  for (const [itemId, rangeId] of Object.entries(vibeSpendSignals)) {
    const label = ITEM_LABELS[itemId] ?? itemId.replace(/_/g, " ");
    const range = RANGE_LABELS[cleanText(rangeId as unknown)] ?? cleanText(rangeId as unknown);
    if (range) spendAnchorLines.push(`  ${label}: ${range}`);
  }

  // Fallback: scan combinedResponses directly for spend sub-keys
  for (const [key, value] of Object.entries(input.combinedResponses)) {
    if (!key.startsWith("spend_baseline__") && !key.startsWith("spend_generated__")) continue;
    const itemId = key.replace("spend_baseline__", "").replace("spend_generated__", "");
    if (vibeSpendSignals[itemId]) continue; // already covered by vibe
    const label = ITEM_LABELS[itemId] ?? itemId.replace(/_/g, " ");
    const rangeId = Array.isArray(value) ? cleanText(value[0]) : cleanText(value);
    const range = RANGE_LABELS[rangeId] ?? rangeId;
    if (range) spendAnchorLines.push(`  ${label}: ${range}`);
  }

  const spendAnchorBlock = spendAnchorLines.length > 0
    ? spendAnchorLines.join("\n")
    : "  No per-item spend anchors yet — use overall price tier as fallback.";

  const categoryPriorityBlock = vibeCategoryPriority.length > 0
    ? vibeCategoryPriority.map((cat, i) => `  #${i + 1}: ${cat}`).join("\n")
    : "  Not specified";

  const brandAffinityBlock = vibeBrandAffinity.length > 0
    ? vibeBrandAffinity.join(", ")
    : "None confirmed";

  const behaviorBlock = [
    vibeShoppingBehavior.length ? `Shopping: ${vibeShoppingBehavior.join(", ")}` : "",
    vibeSubscriptions.length ? `Subscriptions/services: ${vibeSubscriptions.join(", ")}` : "",
  ].filter(Boolean).join(" | ") || "Not specified";

  return {
    spendAnchorBlock,
    overallPriceTier,
    categoryPriorityBlock,
    brandAffinityBlock,
    behaviorBlock,
    spendAnchorLines,
  };
};
