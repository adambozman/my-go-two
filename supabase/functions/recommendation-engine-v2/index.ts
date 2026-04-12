import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient, type User } from "https://esm.sh/@supabase/supabase-js@2";
import {
  buildKeywordSignature,
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
  type RecommendationIntent,
} from "../_shared/recommendationCatalog.ts";
import { scrapeExactProductWithFirecrawl } from "../_shared/exactProductScraper.ts";
import { fetchKnowledgeCenterState } from "../_shared/knowledgeCenter.ts";
import {
  buildProductBankInsertFromExactScrape,
  scoreProductBankReuseCandidate,
} from "../_shared/recommendationProductBank.ts";
import {
  buildRecommendationInputStrength,
  buildRecommendationMatchAssessment,
  buildNormalizedRecommendationState,
  buildRecommendationSignalSummary,
  type NormalizedRecommendationState,
  type UserThisOrThatAnswerRow,
} from "../_shared/recommendationSignals.ts";
import {
  buildRecommendationCategoryPlan,
  generateFallbackRecommendationIntents,
} from "../_shared/recommendationIntentPlanner.ts";
import {
  selectPopularFallbackSeeds,
  type PopularFallbackSeed,
  type TrendCandidateFallbackRow,
} from "../_shared/recommendationPopularFallback.ts";
import { buildSearchFallbackResponseProduct } from "../_shared/recommendationSearchFallback.ts";
import {
  normalizeRecommendationCategoryKey,
  RECOMMENDATION_CATEGORY_ORDER,
} from "../../../src/lib/recommendationCategories.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ENGINE_FAMILY = "recommendation-engine-v2";
const ENGINE_RULESET_VERSION = "2026-04-12-clean-break";
const GENERATION_VERSION = `${ENGINE_FAMILY}:${ENGINE_RULESET_VERSION}`;
const BANK_REVERIFY_MAX_AGE_HOURS = 24 * 14;

const ALLOWED_KINDS = new Set(["specific", "generic", "catalog"]);

type JsonObject = Record<string, unknown>;

type ProductBankRow = Record<string, unknown> & {
  id?: string;
  primary_keyword: string;
  descriptor_keywords: string[] | null;
  keyword_signature: string;
  category: RecommendationIntent["category"];
  brand: string;
  product_title: string;
  product_url: string;
  product_image_url: string;
  product_price_text: string;
  scraped_description: string | null;
  search_query: string | null;
  resolver_source: string;
  source_version: string;
  match_confidence: number;
  exact_match_confirmed: boolean;
  usage_count: number;
  last_verified_at?: string | null;
  bank_state?: string;
  bank_source?: string;
  image_status?: string;
  verification_notes?: Record<string, unknown> | null;
  last_verification_error?: string | null;
};

type RecommendationResponseProduct = Record<string, unknown> & {
  stable_id?: string;
  category?: string;
  affiliate_url?: string | null;
  search_url?: string | null;
  brand?: string;
  name?: string;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const toObject = (value: unknown): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonObject) : {};

const isMissingRecommendationStorage = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String(error.code ?? "") : "";
  const message = "message" in error ? String(error.message ?? "") : "";

  return [
    "PGRST202",
    "PGRST205",
    "42P01",
    "42883",
  ].includes(code)
    || message.includes("schema cache")
    || message.includes("user_weekly_recommendations")
    || message.includes("recommendation_product_bank")
    || message.includes("recommendation_trend_candidates")
    || message.includes("sync_recommendation_normalized_state")
    || message.includes("this_or_that_v2_answers");
};

const sanitizeKeywordList = (rawKeywords: unknown): string[] => {
  if (!Array.isArray(rawKeywords)) return [];
  return normalizeRecommendationKeywords(rawKeywords.map((keyword) => cleanText(keyword)));
};

const sanitizeIntents = (rawIntents: unknown): RecommendationIntent[] => {
  if (!Array.isArray(rawIntents)) return [];

  return rawIntents
    .map((item) => {
      const intent = item as Record<string, unknown>;
      const category = normalizeRecommendationCategoryKey(intent.category);
      const recommendationKind = cleanText(intent.recommendation_kind).toLowerCase();
      if (!category) return null;

      return {
        brand: cleanText(intent.brand),
        name: cleanText(intent.name),
        price: cleanText(intent.price),
        category,
        hook: cleanText(intent.hook),
        why: cleanText(intent.why),
        recommendation_kind: (
          ALLOWED_KINDS.has(recommendationKind) ? recommendationKind : "catalog"
        ) as RecommendationIntent["recommendation_kind"],
        search_query: cleanText(intent.search_query) || null,
        primary_keyword: cleanText(intent.primary_keyword) || null,
        keywords: sanitizeKeywordList(intent.keywords),
      };
    })
    .filter((intent): intent is RecommendationIntent => Boolean(
      intent &&
      intent.brand &&
      intent.name &&
      intent.hook &&
      intent.why &&
      intent.primary_keyword,
    ));
};

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

const getWeekStartKey = (value = new Date()) => {
  const weekStart = new Date(Date.UTC(
    value.getUTCFullYear(),
    value.getUTCMonth(),
    value.getUTCDate() - ((value.getUTCDay() + 6) % 7),
  ));

  return weekStart.toISOString().slice(0, 10);
};

const buildIntentKey = (intent: RecommendationIntent) => [
  intent.category,
  normalizePrimaryKeyword(intent.primary_keyword ?? intent.name) ?? "",
  cleanText(intent.brand).toLowerCase(),
  cleanText(intent.name).toLowerCase(),
].join("::");

const hasExactKeywordSignature = (
  category: RecommendationIntent["category"],
  primaryKeyword: string,
  descriptorKeywords: string[],
  row: ProductBankRow,
) => {
  const requestedSignature = buildKeywordSignature(category, primaryKeyword, descriptorKeywords);
  return Boolean(requestedSignature && row.keyword_signature === requestedSignature);
};

const hasDislikeConflict = (
  intentKeywords: string[],
  negativeKeywords: string[],
  row: ProductBankRow,
) => {
  const negatives = new Set(normalizeRecommendationKeywords(negativeKeywords));
  const haystack = new Set(mergeRecommendationKeywords([
    row.primary_keyword,
    ...(row.descriptor_keywords ?? []),
    row.brand,
    row.product_title,
    ...intentKeywords,
  ]));

  for (const negative of negatives) {
    if (haystack.has(negative)) return true;
  }

  return false;
};

const intentConflictsWithNegatives = (
  intent: RecommendationIntent,
  negativeKeywordSet: Set<string>,
) => {
  const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
  const descriptors = mergeDescriptorKeywords(primaryKeyword, intent.keywords ?? [], [intent.brand, intent.name]);
  const haystack = mergeRecommendationKeywords([primaryKeyword, ...descriptors, intent.brand, intent.name]);
  return haystack.some((keyword) => negativeKeywordSet.has(keyword));
};

const countKeywordOverlap = (left: string[], right: string[]) => {
  const rightSet = new Set(right);
  let overlap = 0;

  for (const keyword of left) {
    if (rightSet.has(keyword)) overlap += 1;
  }

  return overlap;
};

const loadThisOrThatAnswers = async (
  admin: SupabaseClient,
  userId: string,
) => {
  const { data, error } = await admin
    .from("this_or_that_v2_answers")
    .select("id, user_id, question_id, question_key, category_key, subgroup_key, recommendation_category, primary_keyword, descriptor_keywords, brand, location_keys, answer_payload, source_version")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    if (isMissingRecommendationStorage(error)) {
      console.warn("[recommendation-engine-v2] This or That answer storage is unavailable. Continuing without structured answer rows.");
      return [];
    }
    throw error;
  }

  return Array.isArray(data) ? (data as UserThisOrThatAnswerRow[]) : [];
};

const findBestProductBankMatch = async (
  admin: SupabaseClient,
  category: RecommendationIntent["category"],
  primaryKeyword: string,
  descriptorKeywords: string[],
  negativeKeywords: string[],
  requestedBrand: string,
) => {
  const { data, error } = await admin
    .from("recommendation_product_bank")
    .select("id, primary_keyword, descriptor_keywords, keyword_signature, category, brand, product_title, product_url, product_image_url, product_price_text, scraped_description, search_query, resolver_source, source_version, match_confidence, exact_match_confirmed, usage_count, last_verified_at, bank_state, bank_source, image_status, verification_notes, last_verification_error")
    .eq("category", category)
    .eq("primary_keyword", primaryKeyword)
    .eq("exact_match_confirmed", true)
    .eq("bank_state", "exact_verified")
    .eq("image_status", "verified")
    .limit(50);

  if (error) {
    if (isMissingRecommendationStorage(error)) {
      console.warn("[recommendation-engine-v2] Product bank storage is unavailable. Continuing without bank reuse.");
      return null;
    }
    throw error;
  }

  const rows = Array.isArray(data) ? (data as ProductBankRow[]) : [];
  const ranked = rows
    .filter((row) => !hasDislikeConflict(descriptorKeywords, negativeKeywords, row))
    .filter((row) => {
      if (!row.last_verified_at) return false;
      const verifiedAt = new Date(row.last_verified_at);
      if (Number.isNaN(verifiedAt.getTime())) return false;
      const ageHours = (Date.now() - verifiedAt.getTime()) / 36e5;
      return ageHours <= BANK_REVERIFY_MAX_AGE_HOURS;
    })
    .map((row) => ({
      row,
      ...scoreProductBankReuseCandidate({
        category,
        primaryKeyword,
        descriptorKeywords,
        requestedBrand,
        row,
      }),
      exactSignature: hasExactKeywordSignature(category, primaryKeyword, descriptorKeywords, row),
    }))
    .filter((entry) => entry.eligible)
    .sort((a, b) => b.score - a.score)[0];

  return ranked?.row ?? null;
};

const loadTrendCandidateFallbackRows = async (
  admin: SupabaseClient,
  categories: RecommendationIntent["category"][],
) => {
  if (categories.length === 0) return [];

  const { data, error } = await admin
    .from("recommendation_trend_candidates")
    .select("id, source_platform, brand, product_title, primary_keyword, descriptor_keywords, category, product_url, image_url, price_text, trend_score, candidate_state, observed_at")
    .in("category", categories)
    .in("candidate_state", ["approved", "approved_exact", "promoted"])
    .limit(200);

  if (error) {
    if (isMissingRecommendationStorage(error)) {
      console.warn("[recommendation-engine-v2] Trend candidate storage is unavailable. Falling back to search-only popular cards.");
      return [];
    }
    throw error;
  }

  return Array.isArray(data) ? (data as TrendCandidateFallbackRow[]) : [];
};
const toResponseProduct = (
  state: NormalizedRecommendationState,
  intent: RecommendationIntent,
  bankRow: ProductBankRow | null,
) => {
  if (!bankRow) {
    return buildSearchFallbackResponseProduct({
      state,
      intent,
      generationVersion: GENERATION_VERSION,
    });
  }

  const recommendationMatch = buildRecommendationMatchAssessment(state, intent);
  const inputStrength = buildRecommendationInputStrength(state);
  const stableId = cleanText(bankRow.id) || bankRow.keyword_signature || [
    "bank",
    intent.category,
    cleanText(bankRow.brand).toLowerCase(),
    cleanText(bankRow.product_title).toLowerCase(),
    cleanText(bankRow.product_url).toLowerCase(),
  ].join("::");

  return {
    stable_id: stableId,
    name: bankRow.product_title,
    brand: bankRow.brand,
    price: bankRow.product_price_text,
    category: intent.category,
    hook: intent.hook,
    why: intent.why,
    is_connection_pick: false,
    affiliate_url: bankRow.product_url,
    search_url: null,
    product_query: bankRow.search_query ?? `${bankRow.brand} ${bankRow.product_title}`.trim(),
    sponsored_id: null,
    image_url: bankRow.product_image_url,
    source_kind: "specific-product",
    source_version: GENERATION_VERSION,
    exact_match_confirmed: true,
    match_confidence: bankRow.match_confidence,
    resolver_source: bankRow.resolver_source,
    recommendation_match_confidence: recommendationMatch.confidence,
    recommendation_match_reasons: recommendationMatch.reasons,
    explanation: {
      decision: "bank-reuse",
      input_level: inputStrength.level,
      input_score: inputStrength.score,
      match_reasons: recommendationMatch.reasons,
      resolver_source: bankRow.resolver_source,
      bank_state: bankRow.bank_state ?? "exact_verified",
      bank_source: bankRow.bank_source ?? "engine-v2",
      image_status: bankRow.image_status ?? "verified",
    },
  };
};

const toPopularFallbackResponseProduct = ({
  state,
  seed,
}: {
  state: NormalizedRecommendationState;
  seed: PopularFallbackSeed;
}) => {
  const primaryKeyword = normalizePrimaryKeyword(seed.primary_keyword ?? seed.product_title) ?? "";
  const descriptorKeywords = mergeDescriptorKeywords(
    primaryKeyword,
    seed.descriptor_keywords ?? [],
    [seed.brand, seed.product_title],
  );
  const intent: RecommendationIntent = {
    brand: seed.brand,
    name: seed.product_title,
    price: seed.price_text ?? "",
    category: seed.category,
    recommendation_kind: seed.exact_match_confirmed ? "specific" : "generic",
    search_query: `${seed.brand} ${seed.product_title}`.trim(),
    primary_keyword: primaryKeyword,
    keywords: descriptorKeywords,
    hook: `A current popular ${primaryKeyword || seed.product_title.toLowerCase()} pick while your profile is still building.`,
    why: "Pulled from the approved popular-products trend pipeline while Go Two is still learning your preferences.",
  };

  if (!(seed.exact_match_confirmed && seed.product_url && seed.image_url && seed.price_text)) {
    return buildSearchFallbackResponseProduct({
      state,
      intent: {
        ...intent,
        why: "Go Two does not have a verified exact popular-product row for this slot yet, so this stays an honest search-led fallback.",
      },
      generationVersion: GENERATION_VERSION,
    }) as RecommendationResponseProduct;
  }

  const recommendationMatch = buildRecommendationMatchAssessment(state, intent);
  const inputStrength = buildRecommendationInputStrength(state);

  return {
    stable_id: `popular::${seed.dedupe_key}`,
    name: seed.product_title,
    brand: seed.brand,
    price: seed.price_text,
    category: seed.category,
    hook: intent.hook,
    why: intent.why,
    is_connection_pick: false,
    affiliate_url: seed.product_url,
    search_url: null,
    product_query: intent.search_query,
    sponsored_id: null,
    image_url: seed.image_url,
    source_kind: "specific-product",
    source_version: GENERATION_VERSION,
    exact_match_confirmed: true,
    match_confidence: seed.match_confidence,
    resolver_source: seed.resolver_source ?? seed.source_label ?? "trend-candidate",
    recommendation_match_confidence: recommendationMatch.confidence,
    recommendation_match_reasons: recommendationMatch.reasons,
    explanation: {
      decision: "popular-trend-candidate",
      input_level: inputStrength.level,
      input_score: inputStrength.score,
      match_reasons: recommendationMatch.reasons,
      resolver_source: seed.resolver_source ?? seed.source_label ?? "trend-candidate",
      bank_source: seed.source_label ?? "trend-candidate",
      image_status: "approved-trend-image",
    },
  } satisfies RecommendationResponseProduct;
};

const requestAiIntents = async (
  state: NormalizedRecommendationState,
  targetRecommendationCount: number,
) => {
  const categoryPlan = buildRecommendationCategoryPlan(state, targetRecommendationCount);
  const aiEligiblePlans = categoryPlan.filter((entry) => entry.aiTarget > 0);
  const aiTargetCount = aiEligiblePlans.reduce((sum, entry) => sum + entry.aiTarget, 0);

  if (aiTargetCount === 0) {
    return [];
  }

  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
    return [];
  }

  const profileSnapshot = Object.entries(state.combinedResponses)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value ?? "")}`)
    .slice(0, 24)
    .join("\n");

  const savedCardSnapshot = state.productCardKeywords
    .slice(0, 12)
    .map((row) => [
      `primary=${row.primary_keyword}`,
      row.category ? `category=${row.category}` : "",
      row.brand_keywords.length ? `brands=${row.brand_keywords.join(", ")}` : "",
      row.descriptor_keywords.length ? `descriptors=${row.descriptor_keywords.join(", ")}` : "",
      row.negative_keywords.length ? `avoid=${row.negative_keywords.join(", ")}` : "",
    ].filter(Boolean).join(" | "))
    .join("\n");

  const categoryPlanSnapshot = categoryPlan
    .map((entry) => `${entry.category}: state=${entry.state}, total=${entry.totalTarget}, ai=${entry.aiTarget}`)
    .join("\n");
  const categoryEnum = [...RECOMMENDATION_CATEGORY_ORDER];

  const prompt = `You are the Go Two recommendation planner for the replacement recommendation engine.

Your job is to create recommendation intents, not final links.
You may only personalize categories the system has explicitly unlocked.

USER PROFILE SIGNALS:
${profileSnapshot || "No profile answers yet"}

SAVED PRODUCT CARD KEYWORDS:
${savedCardSnapshot || "No structured product-card keywords yet"}

THIS OR THAT V2 SIGNALS:
${state.thisOrThatAnswers
  .slice(0, 20)
  .map((answer) => {
    const answerPayload = toObject(answer.answer_payload);
    const selected = toObject(answerPayload.selected_payload);
    const primaryKeyword = cleanText(selected.primary_keyword);
    const descriptors = Array.isArray(selected.descriptor_keywords) ? selected.descriptor_keywords.join(", ") : "";
    const brands = Array.isArray(selected.brand_keywords) ? selected.brand_keywords.join(", ") : "";
    return [
      answer.question_key || answer.question_id || "this_or_that_v2",
      answer.category_key ? `category=${answer.category_key}` : "",
      cleanText(answer.recommendation_category) ? `recommendation=${cleanText(answer.recommendation_category)}` : "",
      cleanText(answerPayload.selected_label) ? `selected=${cleanText(answerPayload.selected_label)}` : "",
      primaryKeyword ? `primary=${primaryKeyword}` : "",
      descriptors ? `descriptors=${descriptors}` : "",
      brands ? `brands=${brands}` : "",
    ].filter(Boolean).join(" | ");
  })
  .join("\n") || "No structured This or That answers yet"}

RECOMMENDED BRANDS / STORES:
${state.recommendedBrands.slice(0, 24).join(", ") || "None"}

LOCATION SIGNALS:
${state.locationKeys.join(", ") || "None"}

NEGATIVE / AVOID SIGNALS:
${state.negativeKeywords.join(", ") || "None"}

CATEGORY READINESS PLAN:
${categoryPlanSnapshot}

RULES:
1. Generate exactly ${aiTargetCount} recommendation intents.
2. Categories must be exactly: ${categoryEnum.join(", ")}.
3. Only generate intents for categories whose ai count is greater than 0 in the CATEGORY READINESS PLAN.
4. Match the ai count for each eligible category exactly.
5. primary_keyword MUST be the main product type only, like jeans, sneakers, candle, lamp, sushi, headphones, or rug.
6. keywords MUST be 3 to 6 lowercase descriptor keywords only. These narrow the primary keyword using fit, color, brand, material, vibe, or store context.
7. Do not repeat the primary_keyword inside keywords.
8. Never recommend items whose primary keyword or descriptive keywords conflict with the negative signals.
9. Use real brands only.
10. Never output a URL.
11. Keep hook and why concise and profile-specific.
12. Prefer brands and products that are actually supported by the user's saved product cards, This or That answers, Know Me answers, and profile facts.
13. If the profile is thin or a category is not unlocked, prefer no idea over invented niche taste.
14. Do not use luxury, boutique, or hyper-specific brands unless there is direct user evidence.

Use the provided tool.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      tools: [
        {
          type: "function",
          function: {
            name: "generate_recommendation_intents",
            description: "Return recommendation intents for the Go Two replacement recommendation engine",
            parameters: {
              type: "object",
              properties: {
                intents: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      brand: { type: "string" },
                      name: { type: "string" },
                      price: { type: "string" },
                      category: { type: "string", enum: categoryEnum },
                      hook: { type: "string" },
                      why: { type: "string" },
                      recommendation_kind: { type: "string", enum: ["specific", "generic", "catalog"] },
                      search_query: { type: "string" },
                      primary_keyword: { type: "string" },
                      keywords: {
                        type: "array",
                        items: { type: "string" },
                        minItems: 3,
                        maxItems: 6,
                      },
                    },
                    required: ["brand", "name", "price", "category", "hook", "why", "recommendation_kind", "search_query", "primary_keyword", "keywords"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["intents"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "generate_recommendation_intents" } },
    }),
  });

  if (!response.ok) {
    return [];
  }

  const result = await response.json();
  const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
  const parsed = toolCall?.function?.arguments ? JSON.parse(toolCall.function.arguments) : null;
  return sanitizeIntents(parsed?.intents);
};

const selectAcceptedAiIntents = (
  rawIntents: RecommendationIntent[],
  state: NormalizedRecommendationState,
  targetRecommendationCount: number,
) => {
  const categoryPlan = buildRecommendationCategoryPlan(state, targetRecommendationCount);
  const aiTargets = new Map(categoryPlan.map((plan) => [plan.category, plan.aiTarget]));
  const categoryCounts = new Map(categoryPlan.map((plan) => [plan.category, 0]));
  const negativeKeywords = new Set(normalizeRecommendationKeywords(state.negativeKeywords));
  const seen = new Set<string>();
  const accepted: RecommendationIntent[] = [];

  for (const intent of rawIntents) {
    const category = normalizeRecommendationCategoryKey(intent.category);
    if (!category) continue;

    const normalizedIntent: RecommendationIntent = {
      ...intent,
      category,
    };
    const key = buildIntentKey(normalizedIntent);
    if (seen.has(key)) continue;
    if ((categoryCounts.get(category) ?? 0) >= (aiTargets.get(category) ?? 0)) continue;
    if (intentConflictsWithNegatives(normalizedIntent, negativeKeywords)) continue;

    seen.add(key);
    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
    accepted.push(normalizedIntent);
  }

  return accepted;
};

const persistNormalizedState = async (
  admin: SupabaseClient,
  userId: string,
  state: NormalizedRecommendationState,
) => {
  const { error } = await admin.rpc("sync_recommendation_normalized_state", {
    p_user_id: userId,
    p_signals: state.signals,
    p_product_card_keywords: state.productCardKeywords,
    p_like_signals: state.likes,
    p_dislike_signals: state.dislikes,
    p_this_or_that_signal_rows: state.thisOrThatSignalRows,
    p_keyword_bank_rows: state.keywordBankRows,
    p_brand_bank_rows: state.brandBankRows,
    p_brand_location_rows: state.brandLocationRows,
  });

  if (error) {
    if (isMissingRecommendationStorage(error)) {
      console.warn("[recommendation-engine-v2] Recommendation normalization persistence is unavailable. Continuing without bank sync.");
      return;
    }

    throw new Error(`Failed to sync normalized recommendation state: ${error.message}`);
  }
};

const loadCachedRecommendations = async (
  admin: SupabaseClient,
  userId: string,
  weekStartKey: string,
) => {
  const { data, error } = await admin
    .from("user_weekly_recommendations")
    .select("products, generated_at, generation_version, input_snapshot_summary")
    .eq("user_id", userId)
    .eq("week_start", weekStartKey)
    .eq("generation_version", GENERATION_VERSION)
    .maybeSingle();

  if (error) {
    if (isMissingRecommendationStorage(error)) {
      console.warn("[recommendation-engine-v2] Weekly recommendation cache is unavailable. Continuing without cache.");
      return null;
    }

    throw error;
  }

  return data;
};

const persistWeeklyRecommendations = async (
  admin: SupabaseClient,
  userId: string,
  weekStartKey: string,
  products: Array<Record<string, unknown>>,
  inputSnapshotSummary: Record<string, unknown>,
  generatedAt: string,
) => {
  const { error } = await admin.from("user_weekly_recommendations").upsert({
    user_id: userId,
    week_start: weekStartKey,
    generation_version: GENERATION_VERSION,
    products,
    input_snapshot_summary: inputSnapshotSummary,
    generated_at: generatedAt,
  }, {
    onConflict: "user_id,week_start",
    ignoreDuplicates: false,
  });

  if (error && !isMissingRecommendationStorage(error)) {
    throw error;
  }
};

const incrementProductBankUsage = async (
  admin: SupabaseClient,
  bankRow: ProductBankRow,
) => {
  const { error } = await admin
    .from("recommendation_product_bank")
    .update({ usage_count: (bankRow.usage_count ?? 0) + 1, last_verified_at: new Date().toISOString() })
    .eq("product_url", bankRow.product_url);

  if (error && !isMissingRecommendationStorage(error)) {
    throw error;
  }
};

const persistProductBankInsert = async (
  admin: SupabaseClient,
  bankInsert: Record<string, unknown>,
) => {
  const { error } = await admin.from("recommendation_product_bank").upsert(bankInsert, {
    onConflict: "product_url_hash",
    ignoreDuplicates: false,
  });

  if (error && !isMissingRecommendationStorage(error)) {
    throw error;
  }
};

const buildProductResponseKey = (product: RecommendationResponseProduct) =>
  cleanText(product.stable_id) ||
  cleanText(product.affiliate_url) ||
  cleanText(product.search_url) ||
  JSON.stringify([product.category, product.brand, product.name]);

const appendUniqueProduct = (
  products: RecommendationResponseProduct[],
  seenProductKeys: Set<string>,
  product: RecommendationResponseProduct,
) => {
  const key = buildProductResponseKey(product);
  if (!key || seenProductKeys.has(key)) return false;
  seenProductKeys.add(key);
  products.push(product);
  return true;
};

const buildPopularFallbackProducts = async ({
  admin,
  state,
  signalDrivenRecommendationsEnabled,
  targetRecommendationCount,
  currentProducts,
}: {
  admin: SupabaseClient;
  state: NormalizedRecommendationState;
  signalDrivenRecommendationsEnabled: boolean;
  targetRecommendationCount: number;
  currentProducts: RecommendationResponseProduct[];
}) => {
  const popularOnly = !signalDrivenRecommendationsEnabled;
  const categoryPlan = buildRecommendationCategoryPlan(state, targetRecommendationCount, { popularOnly });
  const desiredCounts = new Map(categoryPlan.map((plan) => [plan.category, plan.totalTarget]));
  const currentCounts = new Map<RecommendationIntent["category"], number>();
  const allowedCategories = categoryPlan
    .filter((plan) => plan.totalTarget > 0)
    .map((plan) => plan.category);
  const usedUrls = new Set(
    currentProducts
      .map((product) => cleanText(product.affiliate_url))
      .filter(Boolean),
  );
  const trendCandidateRows = await loadTrendCandidateFallbackRows(admin, allowedCategories);
  const products: RecommendationResponseProduct[] = [];

  for (const product of currentProducts) {
    const category = normalizeRecommendationCategoryKey(product.category);
    if (!category) continue;
    currentCounts.set(category, (currentCounts.get(category) ?? 0) + 1);
  }

  const categoryTargets = categoryPlan
    .map((plan) => {
      const gapCount = Math.max(0, plan.totalTarget - (currentCounts.get(plan.category) ?? 0));
      return gapCount > 0 ? { category: plan.category, targetCount: gapCount } : null;
    })
    .filter((plan): plan is { category: RecommendationIntent["category"]; targetCount: number } => Boolean(plan));

  const fallbackSeeds = selectPopularFallbackSeeds({
    categoryTargets,
    negativeKeywords: state.negativeKeywords,
    productBankRows: [],
    trendCandidateRows,
    targetCount: Math.max(0, targetRecommendationCount - currentProducts.length),
  });

  for (const seed of fallbackSeeds) {
    if ((currentProducts.length + products.length) >= targetRecommendationCount) break;

    const product = toPopularFallbackResponseProduct({ state, seed });
    if (!appendUniqueProduct(products, usedUrls, product)) continue;
    currentCounts.set(seed.category, (currentCounts.get(seed.category) ?? 0) + 1);
  }

  const searchFallbackIntents = generateFallbackRecommendationIntents(state, targetRecommendationCount, { popularOnly });
  for (const intent of searchFallbackIntents) {
    if ((currentProducts.length + products.length) >= targetRecommendationCount) break;

    const category = normalizeRecommendationCategoryKey(intent.category);
    if (!category) continue;

    const currentCount = currentCounts.get(category) ?? 0;
    const desiredCount = desiredCounts.get(category) ?? 0;
    if (currentCount >= desiredCount) continue;

    const product = buildSearchFallbackResponseProduct({
      state,
      intent: {
        ...intent,
        hook: `A broad popular ${(normalizePrimaryKeyword(intent.primary_keyword ?? intent.name) ?? intent.name.toLowerCase())} direction while your profile is still building.`,
        why: "Go Two does not have enough approved popular-product rows for this slot yet, so this stays an honest search-led fallback.",
      },
      generationVersion: GENERATION_VERSION,
    }) as RecommendationResponseProduct;

    if (!appendUniqueProduct(products, usedUrls, product)) continue;
    currentCounts.set(category, currentCount + 1);
  }

  return products;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "Not signed in", products: [] }, 401);

    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const user: User | null = authData?.user ?? null;
    if (authError || !user) return jsonResponse({ error: "Session expired", products: [] }, 401);

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const forceRefresh = Boolean(toObject(body).force_refresh);
    const weekStartKey = getWeekStartKey();

    if (!forceRefresh) {
      const cached = await loadCachedRecommendations(admin, user.id, weekStartKey);
      if (Array.isArray(cached?.products) && cached.products.length) {
        return jsonResponse({
          products: cached.products,
          cached: true,
          generated_at: cached.generated_at,
          week_start: weekStartKey,
          generation_version: cached.generation_version,
          input_snapshot_summary: cached.input_snapshot_summary ?? {},
        });
      }
    }

    const knowledgeState = await fetchKnowledgeCenterState(supabase, user.id);
    const thisOrThatAnswerRows = await loadThisOrThatAnswers(admin, user.id);
    const state = buildNormalizedRecommendationState(
      user.id,
      knowledgeState.snapshot,
      knowledgeState.derivations,
      thisOrThatAnswerRows,
    );
    const inputStrength = buildRecommendationInputStrength(state);
    await persistNormalizedState(admin, user.id, state);

    const products: RecommendationResponseProduct[] = [];
    const seenProductKeys = new Set<string>();
    const acceptedAiIntents = selectAcceptedAiIntents(
      await requestAiIntents(state, inputStrength.targetRecommendationCount),
      state,
      inputStrength.targetRecommendationCount,
    );

    for (const intent of acceptedAiIntents) {
      if (products.length >= inputStrength.targetRecommendationCount) break;

      const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name) ?? "";
      const descriptorKeywords = mergeDescriptorKeywords(primaryKeyword, intent.keywords ?? [], [intent.brand]);
      const bankRow = await findBestProductBankMatch(
        admin,
        intent.category,
        primaryKeyword,
        descriptorKeywords,
        state.negativeKeywords,
        intent.brand,
      );

      if (bankRow) {
        await incrementProductBankUsage(admin, bankRow);
        appendUniqueProduct(products, seenProductKeys, toResponseProduct(state, intent, bankRow));
        continue;
      }

      const scraped = await scrapeExactProductWithFirecrawl({
        brand: intent.brand,
        productName: intent.name,
        searchQuery: intent.search_query ?? null,
        logPrefix: "[recommendation-engine-v2]",
      });

      const bankInsert = buildProductBankInsertFromExactScrape({
        intent,
        scraped: scraped ?? {
          image_url: null,
          product_url: null,
          price: null,
          scraped_description: null,
          scraped_product_title: null,
          product_match_confidence: 0,
          exact_match_confirmed: false,
        },
        sourceVersion: GENERATION_VERSION,
        resolverSource: "firecrawl",
      });

      if (bankInsert) {
        await persistProductBankInsert(admin, bankInsert);
        appendUniqueProduct(
          products,
          seenProductKeys,
          toResponseProduct(state, intent, bankInsert as unknown as ProductBankRow),
        );
        continue;
      }

      appendUniqueProduct(
        products,
        seenProductKeys,
        buildSearchFallbackResponseProduct({
          state,
          intent,
          generationVersion: GENERATION_VERSION,
        }) as RecommendationResponseProduct,
      );
    }

    if (products.length < inputStrength.targetRecommendationCount) {
      const fallbackProducts = await buildPopularFallbackProducts({
        admin,
        state,
        signalDrivenRecommendationsEnabled: inputStrength.signalDrivenRecommendationsEnabled,
        targetRecommendationCount: inputStrength.targetRecommendationCount,
        currentProducts: products,
      });

      for (const product of fallbackProducts) {
        if (products.length >= inputStrength.targetRecommendationCount) break;
        appendUniqueProduct(products, seenProductKeys, product);
      }
    }

    const inputSnapshotSummary = {
      ...buildRecommendationSignalSummary(state),
      recommendation_target_count: inputStrength.targetRecommendationCount,
      recommendation_input_level: inputStrength.level,
      recommendation_input_score: inputStrength.score,
      recommendation_mode: inputStrength.signalDrivenRecommendationsEnabled ? "signal-hybrid" : "popular-fallback",
      profile_core_keys: Object.keys(toObject(knowledgeState.snapshot?.profile_core)).length,
      onboarding_answer_count: Object.keys(toObject(knowledgeState.snapshot?.onboarding_responses)).length,
      know_me_answer_count: Object.keys(toObject(knowledgeState.snapshot?.know_me_responses)).length,
      ai_intent_count: acceptedAiIntents.length,
      populated_product_count: products.length,
    };

    const generatedAt = new Date().toISOString();
    await persistWeeklyRecommendations(
      admin,
      user.id,
      weekStartKey,
      products,
      inputSnapshotSummary,
      generatedAt,
    );

    return jsonResponse({
      products,
      cached: false,
      generated_at: generatedAt,
      week_start: weekStartKey,
      generation_version: GENERATION_VERSION,
      input_snapshot_summary: inputSnapshotSummary,
    });
  } catch (error) {
    console.error("[recommendation-engine-v2]", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unexpected error",
      products: [],
    }, 500);
  }
});

// Codebase classification: runtime recommendation engine v2 edge function.
