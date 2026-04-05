import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type SupabaseClient, type User } from "https://esm.sh/@supabase/supabase-js@2";
import {
  buildRecommendationFingerprint,
  getBankPersonalization,
  getCatalogRecommendations,
  getCatalogVersion,
  getSeedCatalogBrands,
  resolveIntentToCatalogEntry,
  type RecommendationIntent,
} from "../_shared/knowMeCatalog.ts";

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
        product_image_url: imageUrl,
      };
    })
    .filter((intent) => intent.brand && intent.name && intent.hook && intent.why);
};

const toObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};

const getUsageCount = (value: unknown): number => {
  const candidate = toObject(value).usage_count;
  return typeof candidate === "number" && Number.isFinite(candidate) ? candidate : 0;
};

/* ── Firecrawl product scraper ─────────────────────────────── */

interface ScrapedProduct {
  image_url: string | null;
  product_url: string | null;
  price: string | null;
}

/** Words in image URLs that signal non-product images */
const IMAGE_REJECT_WORDS = [
  "icon", "logo", "sprite", "1x1", "pixel", ".svg", "badge", "banner-ad",
  "nav", "navtile", "nav-tile", "category-tile", "placeholder", "spacer",
  "tracking", "loading", "spinner", "arrow", "chevron", "caret",
  "social-", "facebook", "twitter", "instagram", "pinterest", "youtube",
  "flag", "payment", "visa", "mastercard", "amex", "paypal",
  "star-rating", "review", "trustpilot",
];

/** Patterns in URLs that suggest a real product image */
const IMAGE_BOOST_PATTERNS = [
  /product/i, /pdp/i, /hero/i, /main/i, /primary/i,
  /detail/i, /zoom/i, /full/i, /large/i, /1200/i, /2048/i, /1024/i,
];

function scoreImageUrl(url: string, productName: string, brand: string): number {
  const lower = url.toLowerCase();

  // Immediate reject
  for (const word of IMAGE_REJECT_WORDS) {
    if (lower.includes(word)) return -1;
  }
  // Reject tiny dimension hints (width=50, height=40, etc.)
  const dimMatch = lower.match(/(?:width|w|height|h)[=_](\d+)/i);
  if (dimMatch && parseInt(dimMatch[1]) < 200) return -1;

  let score = 0;

  // Boost for product-like URL patterns
  for (const pat of IMAGE_BOOST_PATTERNS) {
    if (pat.test(lower)) score += 2;
  }

  // Boost for larger explicit dimensions
  if (dimMatch) {
    const dim = parseInt(dimMatch[1]);
    if (dim >= 600) score += 3;
    else if (dim >= 400) score += 1;
  }

  // Boost if product name words appear in the URL
  const nameWords = productName.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  for (const word of nameWords) {
    if (lower.includes(word)) score += 2;
  }

  // Boost common image extensions
  if (/\.(jpg|jpeg|png|webp|avif)/i.test(lower)) score += 1;

  return score;
}

function pickBestImage(
  urls: string[],
  productName: string,
  brand: string,
): string | null {
  const scored = urls
    .map(url => ({ url, score: scoreImageUrl(url, productName, brand) }))
    .filter(x => x.score >= 0)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.url ?? null;
}

/** Pick best search result — prefer product detail pages over collections */
function pickBestResult(results: Array<Record<string, unknown>>): Record<string, unknown> {
  // Score each result URL
  const scored = results.map((r, i) => {
    const url = cleanText(r.url).toLowerCase();
    let score = 0;
    // Prefer product detail pages
    if (/\/product[s]?\//.test(url)) score += 3;
    if (/\/p\//.test(url)) score += 3;
    if (/\/dp\//.test(url)) score += 3;
    // Penalize collection/category pages
    if (/\/collection[s]?/i.test(url)) score -= 2;
    if (/\/categor/i.test(url)) score -= 2;
    // Prefer first result as tiebreaker
    score -= i * 0.1;
    return { result: r, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.result ?? results[0];
}

async function scrapeProductWithFirecrawl(
  brand: string,
  productName: string,
  searchQuery: string | null,
): Promise<ScrapedProduct | null> {
  const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
  if (!FIRECRAWL_API_KEY) return null;

  try {
    const query = searchQuery || `${brand} ${productName} buy`;
    console.log("[firecrawl] searching:", query);

    const searchRes = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit: 5,
        scrapeOptions: { formats: ["markdown"] },
      }),
    });

    if (!searchRes.ok) {
      console.error("[firecrawl] search failed:", searchRes.status);
      return null;
    }

    const searchData = await searchRes.json();
    const results = searchData?.data ?? searchData?.results ?? [];
    if (!results.length) return null;

    const bestResult = pickBestResult(results);
    const bestResultMetadata = toObject(bestResult.metadata);
    const productUrl = cleanText(bestResult.url) || cleanText(bestResultMetadata.sourceURL) || null;

    let imageUrl: string | null = null;
    let scrapedPrice: string | null = null;

    if (productUrl) {
      try {
        const scrapeRes = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: productUrl,
            formats: ["markdown"],
            onlyMainContent: true,
            waitFor: 1500,
          }),
        });

        if (scrapeRes.ok) {
          const scrapeData = await scrapeRes.json();
          const meta = scrapeData?.data?.metadata ?? scrapeData?.metadata ?? {};
          const md = scrapeData?.data?.markdown ?? scrapeData?.markdown ?? "";

          // Collect ALL candidate images from the page
          const candidates: string[] = [];

          // og:image is a strong candidate but not always the product
          if (meta.ogImage && /^https?:\/\/.+/i.test(meta.ogImage)) {
            candidates.push(meta.ogImage);
          }

          // Extract all markdown images
          const mdImages = [...md.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/gi)]
            .map((m: RegExpMatchArray) => m[1]);
          candidates.push(...mdImages);

          // Score and pick the best
          imageUrl = pickBestImage(candidates, productName, brand);

          // Extract price
          const priceMatch = md.match(/\$[\d,]+\.?\d{0,2}/);
          if (priceMatch) scrapedPrice = priceMatch[0];
        }
      } catch (scrapeErr) {
        console.error("[firecrawl] scrape failed:", scrapeErr);
      }
    }

    // Fallback to search result metadata
    if (!imageUrl) {
      const candidates: string[] = [];
      for (const r of results) {
        const m = toObject(r.metadata);
        const ogImage = cleanText(m.ogImage);
        if (ogImage) candidates.push(ogImage);
        const md = cleanText(r.markdown);
        const imgs = [...md.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/gi)].map((x: RegExpMatchArray) => x[1]);
        candidates.push(...imgs);
      }
      imageUrl = pickBestImage(candidates, productName, brand);
    }

    if (!scrapedPrice) {
      for (const r of results) {
        const md = cleanText(r.markdown);
        const priceMatch = md.match(/\$[\d,]+\.?\d{0,2}/);
        if (priceMatch) { scrapedPrice = priceMatch[0]; break; }
      }
    }

    console.log("[firecrawl] found:", { productUrl, imageUrl: imageUrl?.slice(0, 100), scrapedPrice });

    return {
      image_url: imageUrl,
      product_url: productUrl,
      price: scrapedPrice,
    };
  } catch (err) {
    console.error("[firecrawl] error:", err);
    return null;
  }
}

/* ── Main handler ──────────────────────────────────────────── */

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Not signed in", products: [] }, 401);
    }

    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY");

    let supabase: SupabaseClient;
    let user: User | null = null;
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } },
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

    const { data: prefsData } = await supabase
      .from("user_preferences")
      .select("profile_answers, ai_personalization")
      .eq("user_id", user.id)
      .single();
    const profileAnswers = toObject(prefsData?.profile_answers);
    const personalization = toObject(prefsData?.ai_personalization);
    const bankPersonalization = getBankPersonalization(profileAnswers, personalization);
    const fallbackRecommendations = getCatalogRecommendations(profileAnswers, personalization);

    let blendedProducts = [...fallbackRecommendations.products];

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (LOVABLE_API_KEY) {
      const allowedBrands = Array.from(new Set([
        ...bankPersonalization.recommended_brands,
        ...bankPersonalization.recommended_stores,
        ...getSeedCatalogBrands(),
      ])).slice(0, 28);

      const profileSnapshot = Object.entries(profileAnswers)
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
4. Every intent must choose a recommendation kind:
   - specific: exact product recommendation when you can confidently name a real item.
   - generic: broader branded recommendation when an exact item is too narrow.
   - catalog: recommendation that can reasonably reuse a shared catalog-style item.
5. Use real brands only.
6. Never output a URL.
7. search_query MUST be present — a web search query to find this product on the brand website or a retailer. Be specific, e.g. "Nike Air Max 90 white mens" not just "Nike shoes".
8. Keep hook and why concise and profile-specific.

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
                        },
                        required: ["brand", "name", "price", "category", "hook", "why", "recommendation_kind", "search_query"],
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
          // Scrape all products in parallel via Firecrawl
          const scrapePromises = intents.map((intent) =>
            scrapeProductWithFirecrawl(intent.brand, intent.name, intent.search_query ?? null)
          );
          const scrapeResults = await Promise.all(scrapePromises);

          const resolvedProducts = [];

          for (let i = 0; i < intents.length; i++) {
            const intent = intents[i];
            const scraped = scrapeResults[i];

            const fingerprint = buildRecommendationFingerprint(
              intent.category,
              intent.brand,
              intent.name,
              intent.recommendation_kind,
            );

            const { data: existing } = await supabase
              .from("resolved_recommendation_catalog")
              .select("fingerprint, brand, product_name, category, recommendation_kind, link_kind, link_url, search_query, price, image_url, source_version, resolver_source, usage_count")
              .eq("fingerprint", fingerprint)
              .maybeSingle();

            const resolved = existing ?? resolveIntentToCatalogEntry(intent);

            // Prefer Firecrawl-scraped data over everything else
            const finalImageUrl = scraped?.image_url || intent.product_image_url || resolved.image_url;
            const finalProductUrl = scraped?.product_url || (resolved.link_kind === "product" ? resolved.link_url : null);
            const finalPrice = scraped?.price || intent.price;

            if (!existing) {
              // Store with scraped data
              const enrichedResolved = {
                ...resolved,
                image_url: finalImageUrl,
                link_url: finalProductUrl || resolved.link_url,
                link_kind: finalProductUrl ? "product" : resolved.link_kind,
                resolver_source: scraped?.product_url ? "firecrawl" : resolved.resolver_source,
              };
              await supabase.from("resolved_recommendation_catalog").upsert(enrichedResolved, {
                onConflict: "fingerprint",
              });
            } else {
              await supabase
                .from("resolved_recommendation_catalog")
                .update({
                  usage_count: getUsageCount(existing) + 1,
                  // Update image if we got a better one from Firecrawl
                  ...(scraped?.image_url ? { image_url: scraped.image_url } : {}),
                  ...(scraped?.product_url ? { link_url: scraped.product_url, link_kind: "product", resolver_source: "firecrawl" } : {}),
                })
                .eq("fingerprint", fingerprint);
            }

            resolvedProducts.push({
              name: intent.name,
              brand: intent.brand,
              price: finalPrice,
              category: intent.category,
              hook: intent.hook,
              why: intent.why,
              is_partner_pick: intent.recommendation_kind === "specific",
              is_sponsored: false,
              affiliate_url: finalProductUrl,
              search_url: !finalProductUrl && resolved.link_kind === "search" ? resolved.link_url : null,
              product_query: resolved.search_query,
              sponsored_id: null,
              image_url: finalImageUrl,
              source_kind: finalProductUrl ? "specific-product" : "brand-search",
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
