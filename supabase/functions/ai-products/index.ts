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
6. Never output a URL except for product_image_url.
7. search_query should be present for generic recommendations when useful.
8. Keep hook and why concise and profile-specific.
9. For product_image_url: provide a direct URL to an official product image from the brand's website, CDN, or a major retailer (e.g. the .jpg or .png URL of the product photo). This must be a real, publicly accessible image URL — not a page URL. If you cannot confidently provide one, leave it as an empty string.

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
                          search_query: { type: "string" },
                          product_image_url: { type: "string", description: "Direct URL to an official product image (.jpg/.png/.webp). Leave empty string if unsure." },
                        },
                        required: ["brand", "name", "price", "category", "hook", "why", "recommendation_kind"],
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

            const { data: existing } = await supabase
              .from("resolved_recommendation_catalog")
              .select("fingerprint, brand, product_name, category, recommendation_kind, link_kind, link_url, search_query, price, image_url, source_version, resolver_source, usage_count")
              .eq("fingerprint", fingerprint)
              .maybeSingle();

            const resolved = existing ?? resolveIntentToCatalogEntry(intent);

            if (!existing) {
              await supabase.from("resolved_recommendation_catalog").upsert(resolved, {
                onConflict: "fingerprint",
              });
            } else {
              await supabase
                .from("resolved_recommendation_catalog")
                .update({ usage_count: getUsageCount(existing) + 1 })
                .eq("fingerprint", fingerprint);
            }

            resolvedProducts.push({
              name: intent.name,
              brand: intent.brand,
              price: intent.price,
              category: intent.category,
              hook: intent.hook,
              why: intent.why,
              is_partner_pick: intent.recommendation_kind === "specific",
              is_sponsored: false,
              affiliate_url: resolved.link_kind === "product" ? resolved.link_url : null,
              search_url: resolved.link_kind === "search" ? resolved.link_url : null,
              product_query: resolved.search_query,
              sponsored_id: null,
              image_url: resolved.image_url,
              source_kind: resolved.link_kind === "product" ? "specific-product" : "brand-search",
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
