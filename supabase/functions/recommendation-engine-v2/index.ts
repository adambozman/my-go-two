import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient, type User } from "https://esm.sh/@supabase/supabase-js@2";
import {
  buildKeywordSignature,
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
  resolveIntentToCatalogEntry,
  type RecommendationIntent,
} from "../_shared/knowMeCatalog.ts";
import { scrapeExactProductWithFirecrawl } from "../_shared/exactProductScraper.ts";
import { buildCatalogAiAdapter, fetchKnowledgeCenterState } from "../_shared/knowledgeCenter.ts";
import { buildProductBankInsertFromExactScrape } from "../_shared/recommendationProductBank.ts";
import {
  buildNormalizedRecommendationState,
  buildRecommendationSignalSummary,
  type NormalizedRecommendationState,
} from "../_shared/recommendationSignals.ts";
import {
  completeRecommendationIntentSet,
  generateFallbackRecommendationIntents,
} from "../_shared/recommendationIntentPlanner.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GENERATION_VERSION = "recommendation-engine-v2";

const ALLOWED_CATEGORIES = new Set(["food", "clothes", "tech", "home"]);
const ALLOWED_KINDS = new Set(["specific", "generic", "catalog"]);

type JsonObject = Record<string, unknown>;

type ProductBankRow = {
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

const sanitizeKeywordList = (rawKeywords: unknown): string[] => {
  if (!Array.isArray(rawKeywords)) return [];
  return normalizeRecommendationKeywords(rawKeywords.map((keyword) => cleanText(keyword)));
};

const sanitizeIntents = (rawIntents: unknown): RecommendationIntent[] => {
  if (!Array.isArray(rawIntents)) return [];
  return rawIntents
    .map((item) => {
      const intent = item as Record<string, unknown>;
      const category = cleanText(intent.category).toLowerCase();
      const recommendationKind = cleanText(intent.recommendation_kind).toLowerCase();
      return {
        brand: cleanText(intent.brand),
        name: cleanText(intent.name),
        price: cleanText(intent.price),
        category: (ALLOWED_CATEGORIES.has(category) ? category : "clothes") as RecommendationIntent["category"],
        hook: cleanText(intent.hook),
        why: cleanText(intent.why),
        recommendation_kind: (ALLOWED_KINDS.has(recommendationKind) ? recommendationKind : "catalog") as RecommendationIntent["recommendation_kind"],
        search_query: cleanText(intent.search_query) || null,
        primary_keyword: cleanText(intent.primary_keyword) || null,
        keywords: sanitizeKeywordList(intent.keywords),
      };
    })
    .filter((intent) => intent.brand && intent.name && intent.hook && intent.why && intent.primary_keyword);
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

const hashDescriptorOverlap = (needles: string[], haystack: string[]) => {
  const needleSet = new Set(needles);
  const haystackSet = new Set(haystack);
  let matches = 0;
  for (const keyword of needleSet) {
    if (haystackSet.has(keyword)) matches += 1;
  }
  return matches;
};

const hasExactKeywordSignature = (
  category: RecommendationIntent["category"],
  primaryKeyword: string,
  descriptorKeywords: string[],
  row: ProductBankRow,
) => {
  const requestedSignature = buildKeywordSignature(category, primaryKeyword, descriptorKeywords);
  return Boolean(requestedSignature && row.keyword_signature === requestedSignature);
};

const scoreBrandFit = (requestedBrand: string, candidateBrand: string) => {
  const requested = normalizeRecommendationKeywords([requestedBrand]);
  const candidate = normalizeRecommendationKeywords([candidateBrand]);
  if (!requested.length || !candidate.length) return 0;
  const requestedJoined = requested.join(" ");
  const candidateJoined = candidate.join(" ");
  if (requestedJoined === candidateJoined) return 25;
  const overlap = hashDescriptorOverlap(requested, candidate);
  return overlap > 0 ? 10 + overlap * 5 : 0;
};

const hasDislikeConflict = (intentKeywords: string[], negativeKeywords: string[], row: ProductBankRow) => {
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

const findBestProductBankMatch = async (
  admin: SupabaseClient,
  category: RecommendationIntent["category"],
  primaryKeyword: string,
  descriptorKeywords: string[],
  negativeKeywords: string[],
  requestedBrand: string,
) => {
  const { data } = await admin
    .from("recommendation_product_bank")
    .select("id, primary_keyword, descriptor_keywords, keyword_signature, category, brand, product_title, product_url, product_image_url, product_price_text, scraped_description, search_query, resolver_source, source_version, match_confidence, exact_match_confirmed, usage_count")
    .eq("category", category)
    .eq("primary_keyword", primaryKeyword)
    .eq("exact_match_confirmed", true)
    .limit(50);

  const rows = Array.isArray(data) ? (data as ProductBankRow[]) : [];
  const ranked = rows
    .filter((row) => !hasDislikeConflict(descriptorKeywords, negativeKeywords, row))
    .map((row) => {
      const overlap = hashDescriptorOverlap(descriptorKeywords, row.descriptor_keywords ?? []);
      const exactSignature = hasExactKeywordSignature(category, primaryKeyword, descriptorKeywords, row);
      const brandFit = scoreBrandFit(requestedBrand, row.brand);
      const confidence = Math.min(Number(row.match_confidence) || 0, 100);
      const score = (exactSignature ? 1000 : 0) + (overlap * 30) + brandFit + Math.round(confidence * 0.2);
      return { row, score, overlap, brandFit, exactSignature };
    })
    .filter((entry) =>
      entry.brandFit > 0 && (entry.exactSignature || entry.overlap >= 2 || (entry.overlap >= 1 && entry.brandFit >= 25))
    )
    .sort((a, b) => b.score - a.score)[0];

  return ranked?.row ?? null;
};

const toResponseProduct = (intent: RecommendationIntent, bankRow: ProductBankRow | null) => {
  if (bankRow) {
    return {
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
    };
  }

  const fallback = resolveIntentToCatalogEntry(intent);
  const productUrl = fallback.link_kind === "product" ? fallback.link_url : null;

  return {
    name: intent.name,
    brand: intent.brand,
    price: fallback.price || intent.price,
    category: intent.category,
    hook: intent.hook,
    why: intent.why,
    is_connection_pick: false,
    affiliate_url: productUrl,
    search_url: productUrl ? null : fallback.link_url,
    product_query: fallback.search_query ?? intent.search_query ?? `${intent.brand} ${intent.name}`.trim(),
    sponsored_id: null,
    image_url: productUrl ? fallback.image_url ?? null : null,
    source_kind: productUrl ? "specific-product" : "brand-search",
    source_version: GENERATION_VERSION,
  };
};

const generateAiIntents = async (state: NormalizedRecommendationState) => {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) return generateFallbackRecommendationIntents(state);

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

  const prompt = `You are the Go Two recommendation planner for the replacement recommendation engine.

Your job is to create recommendation intents, not final links.

USER PROFILE SIGNALS:
${profileSnapshot || "No profile answers yet"}

SAVED PRODUCT CARD KEYWORDS:
${savedCardSnapshot || "No structured product-card keywords yet"}

RECOMMENDED BRANDS / STORES:
${state.recommendedBrands.slice(0, 24).join(", ") || "None"}

LOCATION SIGNALS:
${state.locationKeys.join(", ") || "None"}

NEGATIVE / AVOID SIGNALS:
${state.negativeKeywords.join(", ") || "None"}

RULES:
1. Generate exactly 12 recommendation intents.
2. Categories must be exactly: clothes, food, tech, home.
3. Produce 3 per category.
4. primary_keyword MUST be the main product type only, like jeans, sneakers, candle, lamp, sushi, headphones, or rug.
5. keywords MUST be 3 to 6 lowercase descriptor keywords only. These narrow the primary keyword using fit, color, brand, material, vibe, or store context.
6. Do not repeat the primary_keyword inside keywords.
7. Never recommend items whose primary keyword or descriptive keywords conflict with the negative signals.
8. Use real brands only.
9. Never output a URL.
10. Keep hook and why concise and profile-specific.
11. Prefer brands and products that are actually supported by the user's saved product cards, This or That answers, Know Me answers, and profile facts.

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
                      category: { type: "string", enum: ["food", "clothes", "tech", "home"] },
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

  if (!response.ok) return generateFallbackRecommendationIntents(state);
  const result = await response.json();
  const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
  const parsed = toolCall?.function?.arguments ? JSON.parse(toolCall.function.arguments) : null;
  const intents = sanitizeIntents(parsed?.intents);
  return completeRecommendationIntentSet(state, intents);
};

const persistNormalizedState = async (admin: SupabaseClient, userId: string, state: NormalizedRecommendationState) => {
  await Promise.all([
    admin.from("user_preference_signals").delete().eq("user_id", userId),
    admin.from("user_product_card_keywords").delete().eq("user_id", userId),
    admin.from("user_like_signals").delete().eq("user_id", userId),
    admin.from("user_dislike_signals").delete().eq("user_id", userId),
  ]);

  if (state.signals.length) await admin.from("user_preference_signals").insert(state.signals);
  if (state.productCardKeywords.length) await admin.from("user_product_card_keywords").insert(state.productCardKeywords);
  if (state.likes.length) await admin.from("user_like_signals").insert(state.likes);
  if (state.dislikes.length) await admin.from("user_dislike_signals").insert(state.dislikes);

  if (state.keywordBankRows.length) {
    await admin.from("recommendation_keyword_bank").upsert(state.keywordBankRows, {
      onConflict: "primary_keyword,descriptor_keyword,category",
      ignoreDuplicates: false,
    });
  }

  if (state.brandBankRows.length) {
    await admin.from("recommendation_brand_bank").upsert(state.brandBankRows, {
      onConflict: "brand,primary_keyword,category",
      ignoreDuplicates: false,
    });
  }

  if (state.brandLocationRows.length) {
    await admin.from("recommendation_brand_location_bank").upsert(state.brandLocationRows, {
      onConflict: "location_key,brand,category",
      ignoreDuplicates: false,
    });
  }
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
      const { data: cached } = await admin
        .from("user_weekly_recommendations")
        .select("products, generated_at, generation_version, input_snapshot_summary")
        .eq("user_id", user.id)
        .eq("week_start", weekStartKey)
        .eq("generation_version", GENERATION_VERSION)
        .maybeSingle();

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
    const state = buildNormalizedRecommendationState(user.id, knowledgeState.snapshot, knowledgeState.derivations);
    await persistNormalizedState(admin, user.id, state);

    const aiAdapter = buildCatalogAiAdapter(knowledgeState.snapshot, knowledgeState.derivations);
    const intents = await generateAiIntents(state);

    const products = [];
    for (const intent of intents) {
      const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
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
        await admin
          .from("recommendation_product_bank")
          .update({ usage_count: (bankRow.usage_count ?? 0) + 1, last_verified_at: new Date().toISOString() })
          .eq("product_url", bankRow.product_url);
        products.push(toResponseProduct(intent, bankRow));
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
        await admin.from("recommendation_product_bank").upsert(bankInsert, {
          onConflict: "product_url_hash",
          ignoreDuplicates: false,
        });

        products.push(toResponseProduct(intent, {
          ...bankInsert,
          id: undefined,
        }));
        continue;
      }

      products.push(toResponseProduct(intent, null));
    }

    const inputSnapshotSummary = {
      ...buildRecommendationSignalSummary(state),
      profile_core_keys: Object.keys(aiAdapter.profileCore || {}).length,
      onboarding_answer_count: Object.keys(toObject(knowledgeState.snapshot?.onboarding_responses)).length,
      know_me_answer_count: Object.keys(toObject(knowledgeState.snapshot?.know_me_responses)).length,
    };

    await admin.from("user_weekly_recommendations").upsert({
      user_id: user.id,
      week_start: weekStartKey,
      generation_version: GENERATION_VERSION,
      products,
      input_snapshot_summary: inputSnapshotSummary,
      generated_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,week_start",
      ignoreDuplicates: false,
    });

    return jsonResponse({
      products,
      cached: false,
      generated_at: new Date().toISOString(),
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
