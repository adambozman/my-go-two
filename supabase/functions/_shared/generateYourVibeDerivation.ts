// generateYourVibeDerivation.ts
// Updated for onboarding v3: now reads spend anchor signals, brand affinity,
// category priority, shopping behavior, subscription habits, and AI-generated
// vibe/spend/brand cache outputs alongside legacy keys (backwards-compatible).

import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

type ResponseMap = Record<string, unknown>;

type YourVibeDerivation = {
  recommended_brands: string[];
  recommended_stores: string[];
  image_themes: string[];
  color_palette: string[];
  gift_categories: string[];
  price_tier: "budget" | "mid-range" | "premium" | "luxury";
  style_keywords: string[];
  persona_summary: string;
  // v3 additions
  category_priority: string[];
  spend_signals: Record<string, string>;  // e.g. { tshirt: "25_75", tv: "1500_plus" }
  shopping_behavior: string[];
  subscription_habits: string[];
};

type UpsertableTable = {
  upsert: (
    values: Record<string, unknown>,
    options: { onConflict: string },
  ) => Promise<{ error: unknown }>;
};

type UpsertCapableClient = {
  from: (table: string) => UpsertableTable;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : typeof value === "string" && value.trim()
      ? [value.trim()]
      : [];

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

// ─── Extract v3 signals from combined responses ───────────────────────────────
// Reads new onboarding v3 keys. Falls back to legacy keys where needed.

const extractV3Signals = (responses: ResponseMap) => {
  // Category priority
  const categoryPriority = toStringArray(responses["category_priority"]);

  // Spend signals: all keys starting with spend_baseline__ or spend_generated__
  const spendSignals: Record<string, string> = {};
  for (const [key, val] of Object.entries(responses)) {
    if ((key.startsWith("spend_baseline__") || key.startsWith("spend_generated__"))) {
      const itemId = key.replace("spend_baseline__", "").replace("spend_generated__", "");
      const rangeId = typeof val === "string" ? val : Array.isArray(val) ? String(val[0] ?? "") : "";
      if (rangeId) spendSignals[itemId] = rangeId;
    }
  }

  // Shopping behavior
  const shoppingBehavior = toStringArray(responses["shopping_behavior"]);

  // Subscription habits
  const subscriptionHabits = toStringArray(responses["subscription_habits"]);

  // Style vibe (v3 AI-generated)
  const styleVibe = toStringArray(responses["style_vibe"]);

  // Brand affinity (v3 AI-curated)
  const brandAffinity = toStringArray(responses["brand_affinity"]);

  // Gift personality
  const giftPersonality = toStringArray(responses["gift_personality"]);

  // Age + gender (v3)
  const ageRange = typeof responses["age_range"] === "string" ? responses["age_range"] : "";
  const gender = typeof responses["gender"] === "string" ? responses["gender"] : "";

  // Legacy fallbacks
  const legacyStyle = toStringArray(responses["style-personality"]);
  const legacyAesthetic = toStringArray(responses["aesthetic-lean"]);
  const legacyVibe = toStringArray(responses["daily-vibe"]);

  return {
    categoryPriority,
    spendSignals,
    shoppingBehavior,
    subscriptionHabits,
    styleVibe: styleVibe.length ? styleVibe : [...legacyStyle, ...legacyAesthetic, ...legacyVibe],
    brandAffinity,
    giftPersonality,
    ageRange,
    gender,
  };
};

// ─── Derive price_tier from spend signals ─────────────────────────────────────

const derivePriceTier = (spendSignals: Record<string, string>): "budget" | "mid-range" | "premium" | "luxury" => {
  // Use clothing items as the primary anchor (tshirt, pants, shoes)
  const clothingRangeValues: Record<string, number> = {
    under_25: 12, "25_75": 50, "75_150": 112, "150_plus": 200,
    under_50: 25, "50_120": 85, "120_250": 185, "250_plus": 350,
  };

  const clothingItems = ["tshirt", "pants", "shoes"];
  const values: number[] = [];

  for (const item of clothingItems) {
    const rangeId = spendSignals[item];
    if (rangeId && clothingRangeValues[rangeId] !== undefined) {
      values.push(clothingRangeValues[rangeId]);
    }
  }

  if (values.length === 0) return "mid-range";
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  if (avg < 40)  return "budget";
  if (avg < 120) return "mid-range";
  if (avg < 220) return "premium";
  return "luxury";
};

// ─── Fallback derivation ──────────────────────────────────────────────────────

const buildFallbackYourVibe = (responses: ResponseMap): YourVibeDerivation => {
  const signals = extractV3Signals(responses);
  const priceTier = derivePriceTier(signals.spendSignals);
  const styleLabel = signals.styleVibe[0] ?? "versatile";

  return {
    recommended_brands: signals.brandAffinity,
    recommended_stores: [],
    image_themes: ["lifestyle", "modern wardrobe", "elevated essentials"],
    color_palette: ["#2C3E50", "#E8C6AE", "#6B6D62", "#D4A574", "#3A7CA5"],
    gift_categories: signals.giftPersonality.length
      ? signals.giftPersonality
      : ["thoughtful essentials", "experiences", "style upgrades"],
    price_tier: priceTier,
    style_keywords: signals.styleVibe.length ? signals.styleVibe : ["versatile"],
    persona_summary: `A ${styleLabel} person who prioritizes ${signals.categoryPriority.slice(0, 2).join(" and ") || "quality finds"} and shops at a ${priceTier} level.`,
    category_priority: signals.categoryPriority,
    spend_signals: signals.spendSignals,
    shopping_behavior: signals.shoppingBehavior,
    subscription_habits: signals.subscriptionHabits,
  };
};

// ─── Build AI prompt ──────────────────────────────────────────────────────────

const buildAnswersText = (responses: ResponseMap, signals: ReturnType<typeof extractV3Signals>): string => {
  const lines: string[] = [];

  // Demographics
  if (signals.ageRange) lines.push(`Age range: ${signals.ageRange}`);
  if (signals.gender)   lines.push(`Gender: ${signals.gender}`);

  // Category priority
  if (signals.categoryPriority.length)
    lines.push(`Top categories (in order): ${signals.categoryPriority.join(", ")}`);

  // Style vibe
  if (signals.styleVibe.length)
    lines.push(`Style vibe: ${signals.styleVibe.join(", ")}`);

  // Spend signals — translate to human-readable
  const spendReadable: Record<string, string> = {
    under_25: "under $25", "25_75": "$25–$75", "75_150": "$75–$150", "150_plus": "$150+",
    under_50: "under $50", "50_120": "$50–$120", "120_250": "$120–$250", "250_plus": "$250+",
    under_20: "under $20", "20_50": "$20–$50", "50_100": "$50–$100", "100_plus": "$100+",
    under_300: "under $300", "300_800": "$300–$800", "800_1500": "$800–$1,500", "1500_plus": "$1,500+",
    under_15: "under $15", "15_40": "$15–$40", "40_80": "$40–$80", "80_plus": "$80+",
    under_25b: "under $25", "25_75b": "$25–$75", "75_150b": "$75–$150", "150_plus_b": "$150+",
    under_50b: "under $50", "50_150": "$50–$150", "150_500": "$150–$500", "500_plus": "$500+",
    under_20mo: "under $20/mo", "20_60mo": "$20–$60/mo", "60_150mo": "$60–$150/mo", "150_plus_mo": "$150+/mo",
  };
  for (const [item, rangeId] of Object.entries(signals.spendSignals)) {
    lines.push(`Spend on ${item}: ${spendReadable[rangeId] ?? rangeId}`);
  }

  // Brand affinity
  if (signals.brandAffinity.length)
    lines.push(`Brands they buy from: ${signals.brandAffinity.join(", ")}`);

  // Shopping behavior
  if (signals.shoppingBehavior.length)
    lines.push(`Shopping behavior: ${signals.shoppingBehavior.join(", ")}`);

  // Subscriptions
  if (signals.subscriptionHabits.length)
    lines.push(`Subscriptions/services: ${signals.subscriptionHabits.join(", ")}`);

  // Gift personality
  if (signals.giftPersonality.length)
    lines.push(`Gift preference: ${signals.giftPersonality.join(", ")}`);

  // Include any additional Know Me responses not already covered
  const coveredKeys = new Set([
    "age_range", "gender", "category_priority", "style_vibe", "brand_affinity",
    "shopping_behavior", "subscription_habits", "gift_personality",
  ]);
  for (const [key, value] of Object.entries(responses)) {
    if (!coveredKeys.has(key) && !key.startsWith("spend_")) {
      const display = Array.isArray(value) ? value.join(", ") : String(value);
      lines.push(`${key}: ${display}`);
    }
  }

  return lines.join("\n");
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const generateYourVibeDerivation = async (
  combinedResponses: ResponseMap,
): Promise<YourVibeDerivation> => {
  const LOVABLE_API_KEY = getRequiredEnv("LOVABLE_API_KEY");
  const signals = extractV3Signals(combinedResponses);
  const answersText = buildAnswersText(combinedResponses, signals);
  const priceTierFromSpend = derivePriceTier(signals.spendSignals);

  const systemPrompt = `You are GoTwo's Knowledge Center derivation engine.
Based on the user's onboarding responses, generate one structured "Your Vibe" derivation to power recommendations across the app.

Key signals available (v3 onboarding):
- Spend anchors per item (e.g. "spends $75–$150 on shoes but under $25 on t-shirts") — use these to derive SPECIFIC price expectations per category, not one global tier.
- Brand affinity — confirmed brands the user actually buys from. Use these directly in recommended_brands.
- Category priority — their top 3 categories in order. Weight recommendations toward these.
- Style vibe — AI-generated aesthetic label specific to their age/gender.
- Shopping behavior — channel and deal-seeking behavior.
- Subscription habits — services they pay for regularly.

Rules:
- DO NOT homogenize spend across categories. Someone who spends $150+ on a TV but under $25 on clothes has different expectations per category.
- Use confirmed brand affinity data directly — don't invent brands.
- Keep the persona summary to 2 sentences, specific and grounded in their actual signals.
- Use real, currently active brand and store names.
- price_tier should reflect their OVERALL profile, weighted toward their top categories.
- For image_themes, use search-friendly phrases matching their aesthetic (e.g. "quiet luxury editorial", "streetwear layering").`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `User's Knowledge Center responses:\n\n${answersText}` },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "generate_your_vibe_derivation",
            description: "Generate the user's Your Vibe derivation from Knowledge Center responses",
            parameters: {
              type: "object",
              properties: {
                recommended_brands:  { type: "array", items: { type: "string" }, description: "Real brands from their affinity + inferred from signals" },
                recommended_stores:  { type: "array", items: { type: "string" }, description: "Retail stores (online or physical) that match their shopping behavior" },
                image_themes:        { type: "array", items: { type: "string" }, description: "Search-friendly aesthetic phrases for product image filtering" },
                color_palette:       { type: "array", items: { type: "string" }, description: "5 hex colors matching their aesthetic" },
                gift_categories:     { type: "array", items: { type: "string" }, description: "Gift category types that match their gift personality" },
                price_tier:          { type: "string", enum: ["budget", "mid-range", "premium", "luxury"], description: "Overall spend tier weighted by top categories" },
                style_keywords:      { type: "array", items: { type: "string" }, description: "3–6 keywords describing their style and taste" },
                persona_summary:     { type: "string", description: "2-sentence specific summary of who this person is as a consumer" },
              },
              required: [
                "recommended_brands", "recommended_stores", "image_themes", "color_palette",
                "gift_categories", "price_tier", "style_keywords", "persona_summary",
              ],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "generate_your_vibe_derivation" } },
    }),
  });

  if (!response.ok) {
    console.error(`AI gateway error (${response.status}) — using fallback`);
    return buildFallbackYourVibe(combinedResponses);
  }

  const aiResult = await response.json();
  const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
  const parsed = toolCall?.function?.arguments
    ? JSON.parse(toolCall.function.arguments)
    : null;

  if (!parsed) return buildFallbackYourVibe(combinedResponses);

  return {
    ...buildFallbackYourVibe(combinedResponses),
    ...parsed,
    // Always override price_tier with our spend-signal derivation if AI returns something generic
    price_tier: parsed.price_tier ?? priceTierFromSpend,
    recommended_brands: toStringArray(parsed.recommended_brands),
    recommended_stores: toStringArray(parsed.recommended_stores),
    // Always attach v3 raw signals to derivation so the rec engine can use them directly
    category_priority: signals.categoryPriority,
    spend_signals: signals.spendSignals,
    shopping_behavior: signals.shoppingBehavior,
    subscription_habits: signals.subscriptionHabits,
  };
};

// ─── Upsert ───────────────────────────────────────────────────────────────────

export const upsertYourVibeDerivation = async (
  supabase: SupabaseClient,
  userId: string,
  derivationPayload: YourVibeDerivation,
  sourceSnapshot: unknown,
) => {
  const { error } = await (supabase as unknown as UpsertCapableClient)
    .from("knowledge_derivations")
    .upsert(
      {
        user_id: userId,
        derivation_key: "your_vibe",
        derivation_payload: derivationPayload,
        source_snapshot: sourceSnapshot ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,derivation_key" },
    );

  if (error) throw error;
};

// Codebase classification: runtime knowledge-derivation helper — v3 signal-aware.
