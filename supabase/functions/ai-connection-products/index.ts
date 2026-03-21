import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  buildRecommendationFingerprint,
  getCatalogVersion,
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

const CATEGORY_KEYWORDS: Record<RecommendationIntent["category"], string[]> = {
  clothes: [
    "style",
    "fit",
    "shirt",
    "t-shirt",
    "tee",
    "dress",
    "pants",
    "jeans",
    "shoe",
    "boot",
    "outerwear",
    "tops",
    "bottoms",
    "footwear",
    "accessories",
    "underwear",
    "jacket",
    "coat",
  ],
  food: [
    "food",
    "drink",
    "dining",
    "grocery",
    "pantry",
    "beverage",
    "coffee",
    "tea",
    "snack",
    "restaurant",
    "cocktail",
    "wine",
    "meal",
  ],
  tech: [
    "tech",
    "electronics",
    "gadget",
    "device",
    "phone",
    "laptop",
    "headphones",
    "camera",
    "gaming",
    "smart",
  ],
  home: [
    "home",
    "living",
    "decor",
    "kitchen",
    "bath",
    "bed",
    "bedding",
    "furniture",
    "organization",
    "cleaning",
    "garden",
  ],
};

const inferCategoryFromSharedCard = (card: Record<string, unknown>): RecommendationIntent["category"] | null => {
  const haystack = [
    cleanText(card.card_key),
    cleanText(card.group_name),
    cleanText(card.entry_name),
  ].join(" ").toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as Array<[RecommendationIntent["category"], string[]]>) {
    if (keywords.some((keyword) => haystack.includes(keyword))) {
      return category;
    }
  }

  return null;
};

const getAllowedCategories = (context: Record<string, unknown>): Set<RecommendationIntent["category"]> => {
  const allowed = new Set<RecommendationIntent["category"]>();
  const sharedCards = toArray<Record<string, unknown>>(context.shared_card_entries);

  for (const card of sharedCards) {
    const category = inferCategoryFromSharedCard(card);
    if (category) allowed.add(category);
  }

  return allowed;
};

const toObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};

const toArray = <T = unknown>(value: unknown): T[] => (Array.isArray(value) ? value as T[] : []);

const buildGeneratorContext = (context: Record<string, unknown>) => {
  const allowedCategories = getAllowedCategories(context);
  const sharedCards = toArray<Record<string, unknown>>(context.shared_card_entries).filter((card) => {
    const category = inferCategoryFromSharedCard(card);
    return category ? allowedCategories.has(category) : false;
  });
  const derived = toObject(context.derived);

  return {
    allowedCategories,
    context: {
      ...context,
      shared_card_entries: sharedCards,
      derived: {
        your_vibe: cleanText(derived.your_vibe) || null,
      },
    } as Record<string, unknown>,
  };
};

const buildStoredSourceSnapshot = (
  generatorContext: Record<string, unknown>,
  allowedCategories: Set<RecommendationIntent["category"]>,
  selectedOccasion: Record<string, unknown> | null,
) => {
  const sharedCards = toArray<Record<string, unknown>>(generatorContext.shared_card_entries);
  const derived = toObject(generatorContext.derived);

  return {
    connection_kind: cleanText(generatorContext.connection_kind || "custom") || "custom",
    connection_label: cleanText(generatorContext.connection_label || "Connection") || "Connection",
    allowed_categories: Array.from(allowedCategories),
    shared_card_count: sharedCards.length,
    has_shared_vibe: Boolean(cleanText(derived.your_vibe)),
    occasion: selectedOccasion
      ? {
          occasion_type: cleanText(selectedOccasion.occasion_type) || null,
          occasion_label: cleanText(selectedOccasion.occasion_label) || null,
          occasion_date: cleanText(selectedOccasion.occasion_date) || null,
          source_type: cleanText(selectedOccasion.source_type) || null,
        }
      : null,
  };
};

const fallbackFromSharedRecommendations = (context: Record<string, unknown>, selectedOccasionLabel: string | null) => {
  const allowedCategories = getAllowedCategories(context);
  if (allowedCategories.size === 0) return [];
  const derived = toObject(context.derived);
  const sharedRecommendationGroups = toArray<Record<string, unknown>>(derived.shared_recommendations);
  const firstGroup = sharedRecommendationGroups[0] ? toObject(sharedRecommendationGroups[0]) : {};
  const products = toArray<Record<string, unknown>>(firstGroup.products)
    .slice(0, 6)
    .map((product) => {
      const name = cleanText(product.name);
      const brand = cleanText(product.brand);
      const price = cleanText(product.price) || "$$";
      const category = cleanText(product.category).toLowerCase();
      const safeCategory = (ALLOWED_CATEGORIES.has(category) ? category : "clothes") as RecommendationIntent["category"];
      if (allowedCategories.size > 0 && !allowedCategories.has(safeCategory)) return null;
      const baseWhy = cleanText(product.why) || "Shared recommendation carried forward into connection gifting context.";
      return {
        name,
        brand,
        price,
        category: safeCategory,
        hook: selectedOccasionLabel
          ? `A thoughtful ${selectedOccasionLabel.toLowerCase()} pick based on what they already like.`
          : "A thoughtful pick based on what they already like.",
        why: selectedOccasionLabel
          ? `${baseWhy} Prioritized for ${selectedOccasionLabel.toLowerCase()}.`
          : baseWhy,
        is_partner_pick: true,
        is_sponsored: false,
        affiliate_url: cleanText(product.affiliate_url) || null,
        search_url: cleanText(product.search_url) || null,
        product_query: cleanText(product.product_query) || `${brand} ${name}`.trim(),
        sponsored_id: null,
        image_url: cleanText(product.image_url) || null,
        source_kind: cleanText(product.source_kind) || "connection-shared-recommendation",
        source_version: cleanText(product.source_version) || getCatalogVersion(),
      };
    })
    .filter((product): product is NonNullable<typeof product> => Boolean(product?.name && product?.brand));

  return products;
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
    const connectionUserId = cleanText(body?.connection_user_id);
    const recommendationKind = cleanText(body?.recommendation_kind || "gift").toLowerCase();
    const forceRefresh = Boolean(body?.force_refresh);
    const requestedOccasionType = cleanText(body?.occasion_type || "");
    const requestedOccasionDate = cleanText(body?.occasion_date || "");

    if (!connectionUserId) throw new Error("connection_user_id is required");
    if (!["gift", "occasion", "general"].includes(recommendationKind)) {
      throw new Error("Invalid recommendation_kind");
    }

    const { data: contextData, error: contextError } = await supabase.rpc("get_connection_for_you_context", {
      p_connection_user_id: connectionUserId,
      p_days_ahead: 120,
    });

    if (contextError) throw contextError;
    const context = toObject(contextData);
    if (!Object.keys(context).length) throw new Error("Connection context unavailable");

    const { context: generatorContext, allowedCategories } = buildGeneratorContext(context);
    const giftingEnabled = Boolean(generatorContext.gifting_enabled);
    const featureGates = toObject(generatorContext.feature_gates);
    if (!giftingEnabled || featureGates.connection_context === false) {
      throw new Error("Connection gifting is disabled for this connection");
    }
    if (allowedCategories.size === 0) {
      throw new Error("No shareable recommendation categories are available for this connection");
    }

    const occasionOptions = toArray<Record<string, unknown>>(generatorContext.upcoming_occasions);
    const selectedOccasion =
      occasionOptions.find((occasion) => {
        const occasionType = cleanText(occasion.occasion_type);
        const occasionDate = cleanText(occasion.occasion_date);
        if (requestedOccasionType && occasionType !== requestedOccasionType) return false;
        if (requestedOccasionDate && occasionDate !== requestedOccasionDate) return false;
        return true;
      }) ?? occasionOptions[0] ?? null;

    const occasionType = selectedOccasion ? cleanText(selectedOccasion.occasion_type) || null : null;
    const occasionDate = selectedOccasion ? cleanText(selectedOccasion.occasion_date) || null : null;
    const occasionLabel = selectedOccasion ? cleanText(selectedOccasion.occasion_label) || null : null;

    if (!forceRefresh) {
      let cachedQuery = supabase
        .from("connection_recommendations")
        .select("id, recommendations, updated_at, occasion_type, occasion_date")
        .eq("viewer_user_id", user.id)
        .eq("connection_user_id", connectionUserId)
        .eq("recommendation_scope", "for_you")
        .eq("recommendation_kind", recommendationKind)
        .eq("status", "ready")
        .order("updated_at", { ascending: false })
        .limit(1);

      if (occasionType) cachedQuery = cachedQuery.eq("occasion_type", occasionType);
      if (occasionDate) cachedQuery = cachedQuery.eq("occasion_date", occasionDate);

      const { data: cachedRecommendation } = await cachedQuery.maybeSingle();
      const cachedProducts = Array.isArray(cachedRecommendation?.recommendations)
        ? cachedRecommendation.recommendations as Array<Record<string, unknown>>
        : null;

      const cacheIsCurrent = Boolean(
        cachedProducts?.length &&
        cachedProducts.every((product) => cleanText(product?.source_version) === getCatalogVersion()),
      );

      if (cachedProducts && cacheIsCurrent) {
        return new Response(JSON.stringify({
          id: cachedRecommendation?.id ?? null,
          products: cachedProducts,
          cached: true,
          context: buildStoredSourceSnapshot(generatorContext, allowedCategories, selectedOccasion),
          occasion: selectedOccasion,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: draftId, error: draftError } = await supabase.rpc("prepare_connection_recommendation", {
      p_connection_user_id: connectionUserId,
      p_recommendation_kind: recommendationKind,
      p_occasion_type: occasionType,
      p_occasion_date: occasionDate,
      p_gate_key: "connection_gifting",
    });

    if (draftError) throw draftError;

    let blendedProducts = fallbackFromSharedRecommendations(generatorContext, occasionLabel);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (LOVABLE_API_KEY) {
      const profile = toObject(generatorContext.profile);
      const sharedCards = toArray<Record<string, unknown>>(generatorContext.shared_card_entries);
      const derived = toObject(generatorContext.derived);
      const connectionKind = cleanText(generatorContext.connection_kind || "custom");
      const connectionLabel = cleanText(generatorContext.connection_label || "Connection");

      const profileSnapshot = [
        `display_name: ${cleanText(profile.display_name) || "Not shared"}`,
        `birthday: ${cleanText(profile.birthday) || "Not shared"}`,
        `anniversary: ${cleanText(profile.anniversary) || "Not shared"}`,
        `your_vibe: ${cleanText(derived.your_vibe) || "Not shared"}`,
      ].join("\n");

      const cardSnapshot = sharedCards
        .slice(0, 18)
        .map((card) => {
          const entryName = cleanText(card.entry_name);
          const groupName = cleanText(card.group_name);
          const cardKey = cleanText(card.card_key);
          return `- ${entryName} (${groupName || "ungrouped"} / ${cardKey})`;
        })
        .join("\n");

      const occasionSnapshot = selectedOccasion
        ? `${occasionLabel} on ${occasionDate}`
        : "No immediate occasion selected";

      const prompt = `You are the Go Two connection gifting planner.

Your job is to create gift recommendation intents for the viewer about a specific connection.
This is NOT the connection's own For You feed. It is gift/helpful recommendation logic for the viewer.

CONNECTION TYPE:
${connectionKind}

CONNECTION LABEL:
${connectionLabel}

UPCOMING OCCASION:
${occasionSnapshot}

SHARED PROFILE SIGNALS:
${profileSnapshot}

SHARED PRODUCT CARDS:
${cardSnapshot || "- None shared yet"}

IMPORTANT:
- Only use the shared product cards and explicitly shared profile signals above.
- Do not infer categories or interests outside those shared inputs.
- Do not use broad site-wide taste or recommendation history beyond what is explicitly represented here.

RULES:
1. Generate exactly 8 recommendation intents.
2. Categories must be chosen only from this allowed set: ${Array.from(allowedCategories).join(", ")}.
3. Recommendations should be suitable for the viewer to buy, plan, or act on for this connection.
4. Prioritize the occasion when one exists.
5. Use only signals that were explicitly shared.
6. Every intent must choose a recommendation kind:
   - specific
   - generic
   - catalog
7. Use real brands only.
8. Never output a URL.
9. search_query should be present for generic recommendations when useful.
10. Keep hook and why concise and occasion-aware.

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
                description: "Return connection-aware gift recommendation intents for later resolution into official brand links",
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

          for (const intent of intents.filter((candidate) => allowedCategories.has(candidate.category))) {
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
              const usageCount = typeof (existing as Record<string, unknown>).usage_count === "number"
                ? (existing as Record<string, unknown>).usage_count as number
                : 0;
              await supabase
                .from("resolved_recommendation_catalog")
                .update({ usage_count: usageCount + 1 })
                .eq("fingerprint", fingerprint);
            }

            resolvedProducts.push({
              name: intent.name,
              brand: intent.brand,
              price: intent.price,
              category: intent.category,
              hook: intent.hook,
              why: intent.why,
              is_partner_pick: true,
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

    const storedSourceSnapshot = buildStoredSourceSnapshot(generatorContext, allowedCategories, selectedOccasion);

    await supabase
      .from("connection_recommendations")
      .update({
        source_snapshot: storedSourceSnapshot,
        recommendations: blendedProducts,
        status: "ready",
        updated_at: new Date().toISOString(),
      })
      .eq("id", draftId)
      .eq("viewer_user_id", user.id);

    return new Response(JSON.stringify({
      id: draftId,
      products: blendedProducts,
      cached: false,
      context: storedSourceSnapshot,
      occasion: selectedOccasion,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-connection-products error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
