import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient, type User } from "https://esm.sh/@supabase/supabase-js@2";
import {
  buildRecommendationFingerprint,
  buildKeywordSignature,
  extractNegativePreferenceKeywords,
  getBankKnowledgeDerivation,
  getCatalogRecommendations,
  getCatalogVersion,
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  normalizeRecommendationKeywords,
  looksLikeProductPageUrl,
  scoreKeywordBankCandidate,
  getSeedCatalogBrands,
  resolveIntentToCatalogEntry,
  type RecommendationIntent,
} from "../_shared/recommendationCatalog.ts";
import {
  getExactProductImageReadiness,
  scrapeExactProductWithFirecrawl,
  type ExactProductScrapeResult,
} from "../_shared/exactProductScraper.ts";
import { buildCatalogAiAdapter, fetchKnowledgeCenterState } from "../_shared/knowledgeCenter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, " ").trim();
};

const ALLOWED_CATEGORIES = new Set(["food", "clothes", "tech", "home"]);
const ALLOWED_KINDS = new Set(["specific", "generic", "catalog"]);

const sanitizeKeywordList = (rawKeywords: unknown): string[] => {
  if (!Array.isArray(rawKeywords)) return [];
  return normalizeRecommendationKeywords(
    rawKeywords.map((keyword) => cleanText(keyword)),
  );
};

const sanitizeIntents = (rawIntents: unknown): (RecommendationIntent & { product_image_url?: string })[] => {
  if (!Array.isArray(rawIntents)) return [];
  return rawIntents
    .map((item) => {
      const intent = item as Record<string, unknown>;
      const category = cleanText(intent.category).toLowerCase();
      const recommendationKind = cleanText(intent.recommendation_kind).toLowerCase();
      const rawImageUrl = cleanText(intent.product_image_url);
      const imageUrl = rawImageUrl && /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif)/i.test(rawImageUrl) ? rawImageUrl : undefined;
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
        product_image_url: imageUrl,
      };
    })
    .filter((intent) => intent.brand && intent.name && intent.hook && intent.why && intent.primary_keyword);
};

const toObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};

const getUsageCount = (value: unknown): number => {
  const candidate = toObject(value).usage_count;
  return typeof candidate === "number" && Number.isFinite(candidate) ? candidate : 0;
};

/* ── Firecrawl product scraper ─────────────────────────────── */

type ScrapedProduct = ExactProductScrapeResult;

type ResolvedRecommendationCatalogRow = {
  fingerprint: string;
  brand: string;
  product_name: string;
  category: RecommendationIntent["category"];
  recommendation_kind: RecommendationIntent["recommendation_kind"];
  primary_keyword: string | null;
  descriptor_keywords: string[] | null;
  link_kind: "product" | "search";
  link_url: string;
  search_query: string | null;
  price: string | null;
  image_url: string | null;
  intent_keywords: string[] | null;
  keyword_signature: string | null;
  scraped_description: string | null;
  scraped_product_title: string | null;
  product_match_confidence: number;
  exact_match_confirmed: boolean;
  source_version: string;
  resolver_source: string;
  usage_count: number;
};

const RESOLVED_RECOMMENDATION_SELECT =
  "fingerprint, brand, product_name, category, recommendation_kind, primary_keyword, descriptor_keywords, link_kind, link_url, search_query, price, image_url, intent_keywords, keyword_signature, scraped_description, scraped_product_title, product_match_confidence, exact_match_confirmed, source_version, resolver_source, usage_count";

const findBestKeywordBankMatch = async (
  admin: SupabaseClient,
  category: RecommendationIntent["category"],
  primaryKeyword: string | null,
  descriptorKeywords: string[],
  negativeKeywords: string[],
): Promise<ResolvedRecommendationCatalogRow | null> => {
  const { data: candidates } = await admin
    .from("resolved_recommendation_catalog")
    .select(RESOLVED_RECOMMENDATION_SELECT)
    .eq("category", category)
    .eq("primary_keyword", primaryKeyword)
    .limit(50);

  const best = (Array.isArray(candidates) ? candidates as ResolvedRecommendationCatalogRow[] : [])
    .map((candidate) => ({
      candidate,
      score: scoreKeywordBankCandidate(category, descriptorKeywords, primaryKeyword, negativeKeywords, candidate),
    }))
    .filter((entry) => entry.score >= 70)
    .sort((a, b) => b.score - a.score)[0];

  return best?.candidate ?? null;
};

const hasExactProductRecord = (entry: ResolvedRecommendationCatalogRow | null) =>
  Boolean(entry?.link_kind === "product" && entry?.exact_match_confirmed);

const getResolvedExactProductState = async (
  entry: ResolvedRecommendationCatalogRow | null,
): Promise<{
  usable: boolean;
  imageUrl: string | null;
  productUrl: string | null;
  price: string | null;
  status: string;
}> => {
  if (!entry || !hasExactProductRecord(entry)) {
    return { usable: false, imageUrl: null, productUrl: null, price: null, status: "not-exact" };
  }

  if (!looksLikeProductPageUrl(entry.link_url)) {
    return { usable: false, imageUrl: null, productUrl: null, price: null, status: "bad-product-url" };
  }

  if (!cleanText(entry.price)) {
    return { usable: false, imageUrl: null, productUrl: null, price: null, status: "missing-price" };
  }

  const imageReadiness = await getExactProductImageReadiness(
    entry.image_url,
    entry.product_name,
    entry.brand,
  );

  if (!imageReadiness.ok) {
    return {
      usable: false,
      imageUrl: null,
      productUrl: entry.link_url,
      price: entry.price,
      status: imageReadiness.status,
    };
  }

  return {
    usable: true,
    imageUrl: entry.image_url,
    productUrl: entry.link_url,
    price: entry.price,
    status: imageReadiness.status,
  };
};

const getScrapedExactProductState = async (
  scraped: ExactProductScrapeResult | null,
  intent: RecommendationIntent,
): Promise<{
  usable: boolean;
  imageUrl: string | null;
  productUrl: string | null;
  price: string | null;
  status: string;
}> => {
  if (!scraped?.exact_match_confirmed || !scraped.product_url || !scraped.price) {
    return { usable: false, imageUrl: null, productUrl: null, price: null, status: "not-exact" };
  }

  const imageReadiness = await getExactProductImageReadiness(
    scraped.image_url,
    intent.name,
    intent.brand,
  );

  if (!imageReadiness.ok) {
    return {
      usable: false,
      imageUrl: null,
      productUrl: scraped.product_url,
      price: scraped.price,
      status: imageReadiness.status,
    };
  }

  return {
    usable: true,
    imageUrl: scraped.image_url,
    productUrl: scraped.product_url,
    price: scraped.price,
    status: imageReadiness.status,
  };
};

const scrapeProductWithFirecrawl = (
  brand: string,
  productName: string,
  searchQuery: string | null,
) =>
  scrapeExactProductWithFirecrawl({
    brand,
    productName,
    searchQuery,
    logPrefix: "[firecrawl ai-products]",
  });

/* Main handler */

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Not signed in", products: [] }, 401);
    }

    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

    let supabase: SupabaseClient;
    let admin: SupabaseClient;
    let user: User | null = null;
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false },
      });
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError || !data?.user) throw new Error(authError?.message ?? "No user");
      user = data.user;
    } catch (authErr: unknown) {
      console.warn("[ai-products] auth failed:", authErr instanceof Error ? authErr.message : authErr);
      return jsonResponse({ error: "Session expired", products: [] }, 401);
    }

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const forceRefresh = Boolean(toObject(body).force_refresh);
    const now = new Date();
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - ((now.getUTCDay() + 6) % 7)));
    const weekStartKey = weekStart.toISOString().slice(0, 10);

    if (!forceRefresh) {
      const { data: cachedRecommendations } = await supabase
        .from("weekly_recommendations")
        .select("products, generated_at")
        .eq("user_id", user.id)
        .eq("week_start", weekStartKey)
        .maybeSingle();

      const cachedProducts = Array.isArray(cachedRecommendations?.products)
        ? cachedRecommendations.products as Array<Record<string, unknown>>
        : null;

      const cacheIsCurrent = Boolean(
        cachedProducts?.length &&
        cachedProducts.every((product) => product?.source_version === getCatalogVersion()),
      );

      if (cachedProducts && cacheIsCurrent) {
        return jsonResponse({
          products: cachedProducts,
          cached: true,
          generated_at: cachedRecommendations!.generated_at,
          week_start: weekStartKey,
        });
      }
    }

    const knowledgeState = await fetchKnowledgeCenterState(supabase, user.id);
    const aiAdapter = buildCatalogAiAdapter(knowledgeState.snapshot, knowledgeState.derivations);
    const combinedResponses = toObject(aiAdapter.combinedResponses);
    const yourVibe = toObject(aiAdapter.yourVibe);
    const bankKnowledgeDerivation = getBankKnowledgeDerivation(combinedResponses, yourVibe);
    const fallbackRecommendations = getCatalogRecommendations(combinedResponses, yourVibe);
    const negativePreferenceKeywords = extractNegativePreferenceKeywords(combinedResponses);

    let blendedProducts = [...fallbackRecommendations.products];

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (LOVABLE_API_KEY) {
      const allowedBrands = Array.from(new Set([
        ...bankKnowledgeDerivation.recommended_brands,
        ...bankKnowledgeDerivation.recommended_stores,
        ...getSeedCatalogBrands(),
      ])).slice(0, 28);

      const profileSnapshot = Object.entries(combinedResponses)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
        .slice(0, 20)
        .join("\n");

      const prompt = `You are the Go Two recommendation planner.

Your job is to create recommendation intents, not final links.

USER PROFILE:
${profileSnapshot || "No profile answers yet"}

PREFERRED BRANDS / STORES:
${allowedBrands.join(", ")}

RULES:
1. Generate exactly 12 recommendation intents.
2. Categories must be exactly: clothes, food, tech, home.
3. Produce 3 per category.
PRIMARY / DESCRIPTOR STRUCTURE:
- primary_keyword MUST be present and should be the main product type only, like jeans, sneakers, lamp, headphones, sushi, or candle.
- keywords MUST be present and should be 3 to 6 lowercase descriptive keywords only, like blue, bootcut, leather, minimal, american eagle, or noise-canceling.
- Do not repeat the primary keyword inside keywords.
- Never recommend items whose primary keyword or descriptive keywords conflict with the user's negative / avoid signals.
4. Every intent must choose a recommendation kind:
   - specific: exact product recommendation when you can confidently name a real item.
   - generic: broader branded recommendation when an exact item is too narrow.
   - catalog: recommendation that can reasonably reuse a shared catalog-style item.
5. Use real brands only.
6. Never output a URL.
7. search_query MUST be present — a web search query to find this product on the brand website or a retailer. Be specific, e.g. "Nike Air Max 90 white mens" not just "Nike shoes".
8. keywords MUST be present — 3 to 6 lowercase descriptor keywords only. These must narrow the primary_keyword using fit, color, brand, material, or style, like skinny, blue, american eagle, bootcut, leather, or minimal. Do not include URLs and do not repeat the primary_keyword.
9. Keep hook and why concise and profile-specific.

NEGATIVE / AVOID SIGNALS:
${negativePreferenceKeywords.join(", ") || "None provided"}

Use the provided tool.`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
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
                description: "Return recommendation intents for later resolution into official brand links",
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
                          search_query: { type: "string", description: "Specific web search query to find this exact product, e.g. 'Nike Air Max 90 white mens size 10'" },
                          primary_keyword: {
                            type: "string",
                            description: "Main product type only, like jeans, hoodie, candle, sushi, headphones, or rug",
                          },
                          keywords: {
                            type: "array",
                            items: { type: "string" },
                            minItems: 3,
                            maxItems: 6,
                            description: "Lowercase descriptive keywords only, like fit, color, material, vibe, or brand. Do not repeat the primary product keyword.",
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

      if (response.ok) {
        const aiResult = await response.json();
        const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
        const parsed = toolCall?.function?.arguments ? JSON.parse(toolCall.function.arguments) : null;
        const intents = sanitizeIntents(parsed?.intents);

        if (intents.length > 0) {
          const resolvedProducts = [];

          for (const intent of intents) {
            const fingerprint = buildRecommendationFingerprint(
              intent.category,
              intent.brand,
              intent.name,
              intent.recommendation_kind,
            );
            const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
            const descriptorKeywords = mergeDescriptorKeywords(
              primaryKeyword,
              intent.keywords ?? [],
              [intent.brand],
            );
            const normalizedKeywords = mergeRecommendationKeywords([
              primaryKeyword,
              ...descriptorKeywords,
            ]);
            const keywordSignature = buildKeywordSignature(intent.category, primaryKeyword, descriptorKeywords);

            let existing: ResolvedRecommendationCatalogRow | null = null;
            if (keywordSignature) {
              const { data: byKeywords } = await admin
                .from("resolved_recommendation_catalog")
                .select(RESOLVED_RECOMMENDATION_SELECT)
                .eq("keyword_signature", keywordSignature)
                .maybeSingle();
              existing = byKeywords as ResolvedRecommendationCatalogRow | null;
            }
            if (!existing) {
              const { data: byFingerprint } = await admin
                .from("resolved_recommendation_catalog")
                .select(RESOLVED_RECOMMENDATION_SELECT)
                .eq("fingerprint", fingerprint)
                .maybeSingle();
              existing = byFingerprint as ResolvedRecommendationCatalogRow | null;
            }
            if (!existing) {
              existing = await findBestKeywordBankMatch(
                admin,
                intent.category,
                primaryKeyword,
                descriptorKeywords,
                negativePreferenceKeywords,
              );
            }

            const fallbackResolved = resolveIntentToCatalogEntry(intent);
            const resolved = existing ?? fallbackResolved;
            const existingExactState = await getResolvedExactProductState(existing);
            const resolvedExactState = existing
              ? existingExactState
              : await getResolvedExactProductState(resolved as ResolvedRecommendationCatalogRow);
            const shouldScrapeExactProduct = !existingExactState.usable;
            const scraped = shouldScrapeExactProduct
              ? await scrapeProductWithFirecrawl(intent.brand, intent.name, intent.search_query ?? null)
              : null;

            const scrapedExactState = await getScrapedExactProductState(scraped, intent);
            const exactProductState = scrapedExactState.usable
              ? scrapedExactState
              : existingExactState.usable
                ? existingExactState
                : resolvedExactState.usable
                  ? resolvedExactState
                  : { usable: false, imageUrl: null, productUrl: null, price: null, status: "not-exact" };

            const exactProductUrl = exactProductState.usable ? exactProductState.productUrl : null;
            const finalImageUrl = exactProductState.usable ? exactProductState.imageUrl : null;
            const finalPrice = exactProductState.usable
              ? exactProductState.price || intent.price
              : resolved.price || intent.price;
            const finalDescription = exactProductState.usable
              ? scraped?.scraped_description || existing?.scraped_description || resolved.scraped_description || null
              : existing?.scraped_description || resolved.scraped_description || null;
            const finalSearchUrl = exactProductUrl
              ? null
                : existing?.search_query
                  ? existing.link_url
                  : resolved.link_kind === "search"
                  ? resolved.link_url
                  : fallbackResolved.link_url;
            const finalProductQuery = resolved.search_query || intent.search_query || `${intent.brand} ${intent.name}`;
            const responseImageUrl = exactProductUrl ? finalImageUrl : null;

            if (!existing) {
              const enrichedResolved = {
                ...resolved,
                primary_keyword: primaryKeyword,
                descriptor_keywords: descriptorKeywords,
                image_url: finalImageUrl,
                intent_keywords: normalizedKeywords,
                keyword_signature: keywordSignature,
                scraped_description: finalDescription,
                scraped_product_title: scraped?.scraped_product_title || resolved.scraped_product_title,
                product_match_confidence: scrapedExactState.usable
                  ? scraped?.product_match_confidence ?? resolved.product_match_confidence
                  : resolved.product_match_confidence,
                exact_match_confirmed: Boolean(exactProductState.usable),
                link_url: exactProductUrl || finalSearchUrl || resolved.link_url,
                link_kind: exactProductUrl ? "product" : "search",
                search_query: exactProductUrl ? null : finalProductQuery,
                resolver_source: scrapedExactState.usable ? "firecrawl-exact" : resolved.resolver_source,
              };
              await admin.from("resolved_recommendation_catalog").upsert(enrichedResolved, {
                onConflict: "fingerprint",
              });
            } else {
              await admin
                .from("resolved_recommendation_catalog")
                .update({
                  usage_count: getUsageCount(existing) + 1,
                  primary_keyword: existing.primary_keyword || primaryKeyword,
                  descriptor_keywords: mergeDescriptorKeywords(
                    existing.primary_keyword || primaryKeyword,
                    existing.descriptor_keywords,
                    descriptorKeywords,
                    [existing.brand, intent.brand],
                  ),
                  intent_keywords: mergeRecommendationKeywords(existing.intent_keywords, normalizedKeywords),
                  keyword_signature: keywordSignature,
                  ...(scraped ? {
                    scraped_product_title: scraped.scraped_product_title,
                    product_match_confidence: scraped.product_match_confidence,
                    exact_match_confirmed: scrapedExactState.usable,
                  } : {}),
                  ...(!existingExactState.usable && existing?.exact_match_confirmed ? {
                    exact_match_confirmed: false,
                    resolver_source: `legacy-recheck-${existingExactState.status}`,
                  } : {}),
                  ...(scrapedExactState.usable ? {
                    image_url: scrapedExactState.imageUrl,
                    scraped_description: scraped.scraped_description,
                    price: scrapedExactState.price,
                    link_url: scrapedExactState.productUrl,
                    link_kind: "product",
                    search_query: null,
                    resolver_source: "firecrawl-exact",
                  } : {}),
                })
                .eq("fingerprint", existing.fingerprint);
            }

            resolvedProducts.push({
              name: intent.name,
              brand: intent.brand,
              price: finalPrice,
              category: intent.category,
              hook: intent.hook,
              why: intent.why,
              is_connection_pick: intent.recommendation_kind === "specific",
              is_sponsored: false,
              affiliate_url: exactProductUrl,
              search_url: finalSearchUrl,
              product_query: finalProductQuery,
              sponsored_id: null,
              image_url: responseImageUrl,
              source_kind: exactProductUrl ? "specific-product" : "brand-search",
              source_version: resolved.source_version,
            });
          }

          if (resolvedProducts.length > 0) {
            blendedProducts = resolvedProducts;
          }
        }
      }
    }

    await supabase.from("weekly_recommendations").upsert({
      user_id: user.id,
      week_start: weekStartKey,
      products: blendedProducts,
      generated_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,week_start",
    });

    return jsonResponse({
      products: blendedProducts,
      cached: false,
      generated_at: new Date().toISOString(),
      week_start: weekStartKey,
    });
  } catch (e) {
    console.error("ai-products error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    const status = /is not set/i.test(message) ? 503 : 500;
    return jsonResponse({ error: message }, status);
  }
});

