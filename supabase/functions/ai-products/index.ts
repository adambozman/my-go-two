import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
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

    // Step 1: search for the product
    const searchRes = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit: 3,
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

    const bestResult = results[0];
    const productUrl = bestResult?.url ?? bestResult?.metadata?.sourceURL ?? null;

    // Step 2: scrape the actual product page for high-res images
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
            waitFor: 1000,
          }),
        });

        if (scrapeRes.ok) {
          const scrapeData = await scrapeRes.json();
          const meta = scrapeData?.data?.metadata ?? scrapeData?.metadata ?? {};
          const md = scrapeData?.data?.markdown ?? scrapeData?.markdown ?? "";

          // Priority 1: og:image — usually the hero product shot, high-res
          if (meta.ogImage && /^https?:\/\/.+/i.test(meta.ogImage)) {
            imageUrl = meta.ogImage;
          }

          // Priority 2: large product images from markdown (skip icons/logos by filtering small dimensions)
          if (!imageUrl) {
            const allImages = [...md.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/gi)]
              .map((m: RegExpMatchArray) => m[1])
              .filter((url: string) => {
                const lower = url.toLowerCase();
                // Skip tiny assets, svgs, tracking pixels
                if (lower.includes("icon") || lower.includes("logo") || lower.includes("sprite")) return false;
                if (lower.includes("1x1") || lower.includes("pixel") || lower.includes(".svg")) return false;
                if (lower.includes("badge") || lower.includes("banner-ad")) return false;
                // Prefer known image extensions
                return /\.(jpg|jpeg|png|webp|avif)/i.test(lower) || lower.includes("image");
              });
            if (allImages.length > 0) imageUrl = allImages[0];
          }

          // Extract price
          const priceMatch = md.match(/\$[\d,]+\.?\d{0,2}/);
          if (priceMatch) scrapedPrice = priceMatch[0];
        }
      } catch (scrapeErr) {
        console.error("[firecrawl] scrape failed, falling back to search data:", scrapeErr);
      }
    }

    // Fallback: use search result metadata / markdown if scrape didn't yield an image
    if (!imageUrl) {
      const fallbackMeta = bestResult?.metadata ?? {};
      if (fallbackMeta.ogImage) imageUrl = fallbackMeta.ogImage;
    }
    if (!imageUrl) {
      const fallbackMd = bestResult?.markdown ?? "";
      const imgMatch = fallbackMd.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|webp|avif)[^\s)]*)\)/i);
      if (imgMatch) imageUrl = imgMatch[1];
    }
    if (!scrapedPrice) {
      const fallbackMd = bestResult?.markdown ?? "";
      const priceMatch = fallbackMd.match(/\$[\d,]+\.?\d{0,2}/);
      if (priceMatch) scrapedPrice = priceMatch[0];
    }

    console.log("[firecrawl] found:", { productUrl, imageUrl: imageUrl?.slice(0, 80), scrapedPrice });

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
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const forceRefresh = Boolean(body?.force_refresh);
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
        return new Response(JSON.stringify({
          products: cachedProducts,
          cached: true,
          generated_at: cachedRecommendations!.generated_at,
          week_start: weekStartKey,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
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
            scrapeProductWithFirecrawl(intent.brand, intent.name, intent.search_query)
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

    return new Response(JSON.stringify({
      products: blendedProducts,
      cached: false,
      generated_at: new Date().toISOString(),
      week_start: weekStartKey,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-products error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
