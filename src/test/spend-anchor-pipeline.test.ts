/**
 * spend-anchor-pipeline.test.ts
 *
 * ZERO MOCKS. Tests the real spend-anchor pipeline end-to-end:
 *
 *   1. Real onboarding responses (the exact keys Onboarding.tsx writes)
 *      → extractV3Signals() → correct spend_signals object
 *
 *   2. Real spend_signals → derivePriceTier() → correct tier
 *
 *   3. Real spend_signals → buildFallbackYourVibe() → full derivation
 *      with spend_signals, price_tier, category_priority attached
 *
 *   4. Real derivation → buildRecPromptBlocks() → prompt text
 *      with actual dollar amounts per item, not "mid-range" filler
 *
 *   5. Real derivation → buildNormalizedRecommendationState() →
 *      state.yourVibe contains the spend_signals the rec engine reads
 *
 * Every function imported here is the SAME code that runs in production.
 * No vi.mock, no vi.stub, no fake fetch. If these tests pass, the
 * pipeline from onboarding save → rec engine prompt is wired.
 *
 * Run: npx vitest run src/test/spend-anchor-pipeline.test.ts
 */

import { describe, expect, it } from "vitest";

// Real production functions — same code that runs in edge functions
import {
  extractV3Signals,
  derivePriceTier,
  buildFallbackYourVibe,
  buildAnswersText,
} from "../../supabase/functions/_shared/generateYourVibeDerivation.ts";

import {
  buildRecPromptBlocks,
  RANGE_LABELS,
  ITEM_LABELS,
} from "../../supabase/functions/_shared/buildRecPromptBlocks.ts";

import {
  buildNormalizedRecommendationState,
} from "../../supabase/functions/_shared/recommendationSignals.ts";

// ─── Onboarding response fixtures ─────────────────────────────────────────────
// These are the EXACT key/value pairs that Onboarding.tsx writes to
// the onboarding_responses table via setSpendItem("spend_baseline", ...) etc.

const BUDGET_ONBOARDING_RESPONSES: Record<string, unknown> = {
  age_range: "18_24",
  gender: "man",
  category_priority: ["clothes", "beverages", "entertainment"],
  style_vibe: "streetwear_forward",
  "spend_baseline__tshirt": "under_25",
  "spend_baseline__pants": "under_25",
  "spend_baseline__shoes": "under_50",
  "spend_baseline__dinner_out": "under_20",
  "spend_baseline__tv": "under_300",
  "spend_generated__concert": "under_50",
  "spend_generated__coffee": "under_15",
  brand_affinity: ["hm", "target", "zara", "asos", "amazon_basics"],
  shopping_behavior: ["online_mostly", "deal_hunter"],
  subscription_habits: ["streaming"],
  gift_personality: "practical",
};

const LUXURY_ONBOARDING_RESPONSES: Record<string, unknown> = {
  age_range: "35_44",
  gender: "woman",
  category_priority: ["clothes", "personal_care", "dining"],
  style_vibe: "quiet_luxury",
  "spend_baseline__tshirt": "150_plus",
  "spend_baseline__pants": "150_plus",
  "spend_baseline__shoes": "250_plus",
  "spend_baseline__dinner_out": "100_plus",
  "spend_baseline__tv": "1500_plus",
  "spend_generated__skincare": "80_plus",
  "spend_generated__wine": "50_150",
  brand_affinity: ["aritzia", "cos", "le_labo", "aesop", "everlane"],
  shopping_behavior: ["in_store_mostly", "brand_loyal"],
  subscription_habits: ["beauty_box", "wine_club", "streaming"],
  gift_personality: "curated",
};

// A mixed profile: budget on clothes but splurges on electronics (Adam's pattern)
const MIXED_ONBOARDING_RESPONSES: Record<string, unknown> = {
  age_range: "35_44",
  gender: "man",
  category_priority: ["entertainment", "clothes", "household"],
  style_vibe: "elevated_casual",
  "spend_baseline__tshirt": "under_25",
  "spend_baseline__pants": "25_75",
  "spend_baseline__shoes": "50_120",
  "spend_baseline__dinner_out": "50_100",
  "spend_baseline__tv": "1500_plus",
  "spend_generated__gaming": "500_plus",
  "spend_generated__kitchen": "50_150",
  brand_affinity: ["nike", "samsung", "target", "amazon"],
  shopping_behavior: ["online_mostly", "deal_hunter"],
  subscription_habits: ["streaming", "amazon_prime"],
  gift_personality: "practical",
};

// ─── Step 1: extractV3Signals ─────────────────────────────────────────────────

describe("extractV3Signals — real onboarding responses", () => {
  it("extracts all spend_baseline__ and spend_generated__ keys", () => {
    const signals = extractV3Signals(BUDGET_ONBOARDING_RESPONSES);

    expect(signals.spendSignals).toEqual({
      tshirt: "under_25",
      pants: "under_25",
      shoes: "under_50",
      dinner_out: "under_20",
      tv: "under_300",
      concert: "under_50",
      coffee: "under_15",
    });
  });

  it("extracts category_priority as array", () => {
    const signals = extractV3Signals(BUDGET_ONBOARDING_RESPONSES);
    expect(signals.categoryPriority).toEqual(["clothes", "beverages", "entertainment"]);
  });

  it("extracts brand_affinity", () => {
    const signals = extractV3Signals(LUXURY_ONBOARDING_RESPONSES);
    expect(signals.brandAffinity).toEqual(["aritzia", "cos", "le_labo", "aesop", "everlane"]);
  });

  it("extracts shopping_behavior and subscription_habits", () => {
    const signals = extractV3Signals(BUDGET_ONBOARDING_RESPONSES);
    expect(signals.shoppingBehavior).toEqual(["online_mostly", "deal_hunter"]);
    expect(signals.subscriptionHabits).toEqual(["streaming"]);
  });

  it("handles mixed profile with both cheap clothes and expensive electronics", () => {
    const signals = extractV3Signals(MIXED_ONBOARDING_RESPONSES);
    expect(signals.spendSignals.tshirt).toBe("under_25");
    expect(signals.spendSignals.tv).toBe("1500_plus");
    expect(signals.spendSignals.gaming).toBe("500_plus");
  });
});

// ─── Step 2: derivePriceTier ──────────────────────────────────────────────────

describe("derivePriceTier — real spend signals", () => {
  it("returns 'budget' for all-cheap clothing anchors", () => {
    const signals = extractV3Signals(BUDGET_ONBOARDING_RESPONSES);
    expect(derivePriceTier(signals.spendSignals)).toBe("budget");
  });

  it("returns 'luxury' for all-expensive clothing anchors", () => {
    const signals = extractV3Signals(LUXURY_ONBOARDING_RESPONSES);
    expect(derivePriceTier(signals.spendSignals)).toBe("luxury");
  });

  it("returns 'mid-range' for mixed clothing (cheap shirts, mid shoes)", () => {
    const signals = extractV3Signals(MIXED_ONBOARDING_RESPONSES);
    // tshirt: under_25 (12), pants: 25_75 (50), shoes: 50_120 (85) → avg ~49 → mid-range
    const tier = derivePriceTier(signals.spendSignals);
    expect(tier).toBe("mid-range");
  });

  it("does NOT let expensive TV inflate clothing tier", () => {
    // This is the "bougie but hates spending on clothes" pattern
    const signals = extractV3Signals(MIXED_ONBOARDING_RESPONSES);
    const tier = derivePriceTier(signals.spendSignals);
    // tv: 1500_plus, gaming: 500_plus — but tier should be mid-range from clothing
    expect(tier).not.toBe("luxury");
    expect(tier).not.toBe("premium");
  });
});

// ─── Step 3: buildFallbackYourVibe ────────────────────────────────────────────

describe("buildFallbackYourVibe — full derivation from real responses", () => {
  it("attaches spend_signals to the derivation payload", () => {
    const vibe = buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES);
    expect(vibe.spend_signals).toBeDefined();
    expect(vibe.spend_signals.tshirt).toBe("under_25");
    expect(vibe.spend_signals.shoes).toBe("under_50");
    expect(vibe.spend_signals.tv).toBe("under_300");
  });

  it("attaches category_priority to derivation", () => {
    const vibe = buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES);
    expect(vibe.category_priority).toEqual(["clothes", "beverages", "entertainment"]);
  });

  it("sets correct price_tier from spend signals", () => {
    const budgetVibe = buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES);
    expect(budgetVibe.price_tier).toBe("budget");

    const luxuryVibe = buildFallbackYourVibe(LUXURY_ONBOARDING_RESPONSES);
    expect(luxuryVibe.price_tier).toBe("luxury");
  });

  it("uses confirmed brand affinity directly", () => {
    const vibe = buildFallbackYourVibe(LUXURY_ONBOARDING_RESPONSES);
    expect(vibe.recommended_brands).toEqual(["aritzia", "cos", "le_labo", "aesop", "everlane"]);
  });

  it("attaches shopping_behavior and subscription_habits", () => {
    const vibe = buildFallbackYourVibe(MIXED_ONBOARDING_RESPONSES);
    expect(vibe.shopping_behavior).toEqual(["online_mostly", "deal_hunter"]);
    expect(vibe.subscription_habits).toEqual(["streaming", "amazon_prime"]);
  });
});

// ─── Step 4: buildRecPromptBlocks ─────────────────────────────────────────────

describe("buildRecPromptBlocks — prompt output from real derivation", () => {
  it("produces spend anchor lines with real dollar amounts for budget user", () => {
    const vibe = buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES);
    const blocks = buildRecPromptBlocks({
      yourVibe: vibe as unknown as Record<string, unknown>,
      combinedResponses: BUDGET_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    expect(blocks.spendAnchorBlock).toContain("t-shirt: under $25");
    expect(blocks.spendAnchorBlock).toContain("shoes: under $50");
    expect(blocks.spendAnchorBlock).toContain("TV: under $300");
    expect(blocks.spendAnchorBlock).not.toContain("No per-item spend anchors");
  });

  it("produces spend anchor lines with real dollar amounts for luxury user", () => {
    const vibe = buildFallbackYourVibe(LUXURY_ONBOARDING_RESPONSES);
    const blocks = buildRecPromptBlocks({
      yourVibe: vibe as unknown as Record<string, unknown>,
      combinedResponses: LUXURY_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    expect(blocks.spendAnchorBlock).toContain("t-shirt: $150+");
    expect(blocks.spendAnchorBlock).toContain("shoes: $250+");
    expect(blocks.spendAnchorBlock).toContain("TV: $1,500+");
  });

  it("shows different price tiers for budget vs luxury", () => {
    const budgetBlocks = buildRecPromptBlocks({
      yourVibe: buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES) as unknown as Record<string, unknown>,
      combinedResponses: BUDGET_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });
    const luxuryBlocks = buildRecPromptBlocks({
      yourVibe: buildFallbackYourVibe(LUXURY_ONBOARDING_RESPONSES) as unknown as Record<string, unknown>,
      combinedResponses: LUXURY_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    expect(budgetBlocks.overallPriceTier).toBe("budget");
    expect(luxuryBlocks.overallPriceTier).toBe("luxury");
  });

  it("shows correct category priority", () => {
    const blocks = buildRecPromptBlocks({
      yourVibe: buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES) as unknown as Record<string, unknown>,
      combinedResponses: BUDGET_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    expect(blocks.categoryPriorityBlock).toContain("#1: clothes");
    expect(blocks.categoryPriorityBlock).toContain("#2: beverages");
    expect(blocks.categoryPriorityBlock).toContain("#3: entertainment");
  });

  it("shows correct brand affinity", () => {
    const blocks = buildRecPromptBlocks({
      yourVibe: buildFallbackYourVibe(LUXURY_ONBOARDING_RESPONSES) as unknown as Record<string, unknown>,
      combinedResponses: LUXURY_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    expect(blocks.brandAffinityBlock).toContain("aritzia");
    expect(blocks.brandAffinityBlock).toContain("everlane");
  });

  it("shows shopping behavior and subscriptions", () => {
    const blocks = buildRecPromptBlocks({
      yourVibe: buildFallbackYourVibe(MIXED_ONBOARDING_RESPONSES) as unknown as Record<string, unknown>,
      combinedResponses: MIXED_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    expect(blocks.behaviorBlock).toContain("deal_hunter");
    expect(blocks.behaviorBlock).toContain("streaming");
    expect(blocks.behaviorBlock).toContain("amazon_prime");
  });

  it("handles mixed profile — cheap clothes AND expensive electronics in same prompt", () => {
    const vibe = buildFallbackYourVibe(MIXED_ONBOARDING_RESPONSES);
    const blocks = buildRecPromptBlocks({
      yourVibe: vibe as unknown as Record<string, unknown>,
      combinedResponses: MIXED_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    // Clothes are cheap
    expect(blocks.spendAnchorBlock).toContain("t-shirt: under $25");
    expect(blocks.spendAnchorBlock).toContain("jeans/pants: $25-$75");
    // Electronics are expensive
    expect(blocks.spendAnchorBlock).toContain("TV: $1,500+");
    expect(blocks.spendAnchorBlock).toContain("gaming gear: $500+");
    // Overall tier reflects clothing, not electronics
    expect(blocks.overallPriceTier).toBe("mid-range");
  });
});

// ─── Step 5: buildNormalizedRecommendationState ───────────────────────────────

describe("buildNormalizedRecommendationState — yourVibe contains spend_signals", () => {
  it("state.yourVibe has spend_signals when derivation is present", () => {
    const vibe = buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES);
    const derivation = {
      id: "test-deriv",
      user_id: "test-user",
      derivation_key: "your_vibe",
      derivation_payload: vibe,
      source_snapshot: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const snapshot = {
      user_id: "test-user",
      profile_core: { display_name: "Test", gender: "man" },
      onboarding_responses: BUDGET_ONBOARDING_RESPONSES,
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    };

    const state = buildNormalizedRecommendationState(
      "test-user",
      snapshot as any,
      [derivation as any],
    );

    // The rec engine reads state.yourVibe.spend_signals
    expect(state.yourVibe).toBeDefined();
    expect((state.yourVibe as any).spend_signals).toBeDefined();
    expect((state.yourVibe as any).spend_signals.tshirt).toBe("under_25");
    expect((state.yourVibe as any).spend_signals.tv).toBe("under_300");
    expect((state.yourVibe as any).price_tier).toBe("budget");
    expect((state.yourVibe as any).category_priority).toEqual(["clothes", "beverages", "entertainment"]);
  });

  it("combinedResponses has spend_baseline keys as direct fallback", () => {
    // Even without a derivation, the rec engine scans combinedResponses directly
    const snapshot = {
      user_id: "test-user",
      profile_core: {},
      onboarding_responses: BUDGET_ONBOARDING_RESPONSES,
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    };

    const state = buildNormalizedRecommendationState("test-user", snapshot as any, []);

    // Even without yourVibe derivation, combinedResponses has the spend keys
    expect(state.combinedResponses["spend_baseline__tshirt"]).toBe("under_25");
    expect(state.combinedResponses["spend_baseline__tv"]).toBe("under_300");
  });

  it("rec prompt blocks work from state even without derivation (fallback path)", () => {
    const snapshot = {
      user_id: "test-user",
      profile_core: {},
      onboarding_responses: MIXED_ONBOARDING_RESPONSES,
      know_me_responses: {},
      saved_product_cards: [],
      user_connections: [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    };

    const state = buildNormalizedRecommendationState("test-user", snapshot as any, []);

    // No yourVibe derivation — prompt builder should fall back to combinedResponses
    const blocks = buildRecPromptBlocks({
      yourVibe: state.yourVibe,
      combinedResponses: state.combinedResponses,
      recommendedBrands: state.recommendedBrands,
    });

    // Spend anchors should come from the combinedResponses fallback scan
    expect(blocks.spendAnchorBlock).toContain("t-shirt: under $25");
    expect(blocks.spendAnchorBlock).toContain("TV: $1,500+");
    expect(blocks.spendAnchorBlock).not.toContain("No per-item spend anchors");
  });
});

// ─── Step 6: buildAnswersText — AI prompt input ───────────────────────────────

describe("buildAnswersText — AI prompt for generateYourVibeDerivation", () => {
  it("includes human-readable spend amounts per item", () => {
    const signals = extractV3Signals(BUDGET_ONBOARDING_RESPONSES);
    const text = buildAnswersText(BUDGET_ONBOARDING_RESPONSES, signals);

    expect(text).toContain("Spend on tshirt: under $25");
    expect(text).toContain("Spend on shoes: under $50");
    expect(text).toContain("Spend on tv: under $300");
  });

  it("includes demographics, categories, brands", () => {
    const signals = extractV3Signals(LUXURY_ONBOARDING_RESPONSES);
    const text = buildAnswersText(LUXURY_ONBOARDING_RESPONSES, signals);

    expect(text).toContain("Age range: 35_44");
    expect(text).toContain("Gender: woman");
    expect(text).toContain("clothes, personal_care, dining");
    expect(text).toContain("aritzia");
    expect(text).toContain("everlane");
  });

  it("includes shopping behavior and subscriptions", () => {
    const signals = extractV3Signals(MIXED_ONBOARDING_RESPONSES);
    const text = buildAnswersText(MIXED_ONBOARDING_RESPONSES, signals);

    expect(text).toContain("deal_hunter");
    expect(text).toContain("amazon_prime");
  });
});

// ─── Step 7: Full pipeline integration ────────────────────────────────────────

describe("Full pipeline: onboarding → derivation → prompt blocks", () => {
  it("budget user: entire chain produces correct prompt for rec engine", () => {
    // Step 1: onboarding responses → extractV3Signals
    const signals = extractV3Signals(BUDGET_ONBOARDING_RESPONSES);
    expect(Object.keys(signals.spendSignals).length).toBeGreaterThanOrEqual(5);

    // Step 2: signals → price tier
    const tier = derivePriceTier(signals.spendSignals);
    expect(tier).toBe("budget");

    // Step 3: responses → full derivation (this is what knowledge-center-refresh produces)
    const vibe = buildFallbackYourVibe(BUDGET_ONBOARDING_RESPONSES);
    expect(vibe.spend_signals.tshirt).toBe("under_25");
    expect(vibe.price_tier).toBe("budget");

    // Step 4: derivation → prompt blocks (this is what the rec engine reads)
    const blocks = buildRecPromptBlocks({
      yourVibe: vibe as unknown as Record<string, unknown>,
      combinedResponses: BUDGET_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });
    expect(blocks.spendAnchorBlock).toContain("under $25");
    expect(blocks.overallPriceTier).toBe("budget");
    expect(blocks.spendAnchorLines.length).toBeGreaterThanOrEqual(5);
  });

  it("luxury user: entire chain produces correct prompt for rec engine", () => {
    const signals = extractV3Signals(LUXURY_ONBOARDING_RESPONSES);
    const tier = derivePriceTier(signals.spendSignals);
    expect(tier).toBe("luxury");

    const vibe = buildFallbackYourVibe(LUXURY_ONBOARDING_RESPONSES);
    expect(vibe.spend_signals.tshirt).toBe("150_plus");
    expect(vibe.price_tier).toBe("luxury");

    const blocks = buildRecPromptBlocks({
      yourVibe: vibe as unknown as Record<string, unknown>,
      combinedResponses: LUXURY_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });
    expect(blocks.spendAnchorBlock).toContain("$150+");
    expect(blocks.spendAnchorBlock).toContain("$250+");
    expect(blocks.spendAnchorBlock).toContain("$1,500+");
    expect(blocks.overallPriceTier).toBe("luxury");
  });

  it("mixed user: cheap clothes + expensive electronics survive full pipeline", () => {
    const signals = extractV3Signals(MIXED_ONBOARDING_RESPONSES);
    expect(signals.spendSignals.tshirt).toBe("under_25");
    expect(signals.spendSignals.tv).toBe("1500_plus");

    const tier = derivePriceTier(signals.spendSignals);
    expect(tier).toBe("mid-range"); // clothing-weighted

    const vibe = buildFallbackYourVibe(MIXED_ONBOARDING_RESPONSES);
    const blocks = buildRecPromptBlocks({
      yourVibe: vibe as unknown as Record<string, unknown>,
      combinedResponses: MIXED_ONBOARDING_RESPONSES,
      recommendedBrands: [],
    });

    // Both cheap and expensive anchors must appear in the same prompt
    expect(blocks.spendAnchorBlock).toContain("t-shirt: under $25");
    expect(blocks.spendAnchorBlock).toContain("TV: $1,500+");
    expect(blocks.spendAnchorBlock).toContain("gaming gear: $500+");
    expect(blocks.overallPriceTier).toBe("mid-range");
  });
});
