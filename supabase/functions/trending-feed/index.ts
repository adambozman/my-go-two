import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildCatalogAiAdapter, fetchKnowledgeCenterState } from "../_shared/knowledgeCenter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};


const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/,$/, "");
};

const ALLOWED_FEED_CATEGORIES = new Set(["trending_style", "store_pick", "gift_idea", "lifestyle"]);

type KnowledgeProfile = {
  style_keywords?: string[];
  recommended_brands?: string[];
  recommended_stores?: string[];
  price_tier?: string;
  gift_categories?: string[];
  persona_summary?: string;
};

type KnowledgeResponses = {
  identity?: string[] | string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const normalizeKnowledgeProfile = (value: unknown): KnowledgeProfile | null => {
  if (!isRecord(value)) return null;

  return {
    style_keywords: isStringArray(value.style_keywords) ? value.style_keywords : undefined,
    recommended_brands: isStringArray(value.recommended_brands) ? value.recommended_brands : undefined,
    recommended_stores: isStringArray(value.recommended_stores) ? value.recommended_stores : undefined,
    price_tier: typeof value.price_tier === "string" ? value.price_tier : undefined,
    gift_categories: isStringArray(value.gift_categories) ? value.gift_categories : undefined,
    persona_summary: typeof value.persona_summary === "string" ? value.persona_summary : undefined,
  };
};

const normalizeKnowledgeResponses = (value: unknown): KnowledgeResponses | null => {
  if (!isRecord(value)) return null;

  return {
    identity: isStringArray(value.identity)
      ? value.identity
      : typeof value.identity === "string"
        ? [value.identity]
        : undefined,
  };
};

type FeedItem = {
  title: string;
  description: string;
  category: string;
  image_query: string;
  source_label: string;
};

const sanitizeFeed = (rawFeed: unknown) => {
  if (!Array.isArray(rawFeed)) return [];

  return rawFeed
    .map((item) => {
      if (!isRecord(item)) return null;
      const category = cleanText(item.category).toLowerCase();
      return {
        title: cleanText(item.title),
        description: cleanText(item.description),
        category: ALLOWED_FEED_CATEGORIES.has(category) ? category : "lifestyle",
        image_query: cleanText(item.image_query),
        source_label: cleanText(item.source_label),
      };
    })
    .filter((f): f is FeedItem => Boolean(f && f.title && f.description && f.image_query && f.source_label));
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

    const knowledgeState = await fetchKnowledgeCenterState(supabase, user.id);
    const aiAdapter = buildCatalogAiAdapter(knowledgeState.snapshot, knowledgeState.derivations);
    const knowledgeProfile = normalizeKnowledgeProfile(aiAdapter.yourVibe);
    const knowledgeResponses = normalizeKnowledgeResponses(aiAdapter.combinedResponses);

    if (!knowledgeProfile) {
      return new Response(JSON.stringify({ feed: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const identity = knowledgeResponses?.identity?.[0] || "unspecified";
    const styles = knowledgeProfile.style_keywords?.join(", ") || "";
    const brands = knowledgeProfile.recommended_brands?.join(", ") || "";
    const stores = knowledgeProfile.recommended_stores?.join(", ") || "";
    const priceTier = knowledgeProfile.price_tier || "mid-range";
    const giftCats = knowledgeProfile.gift_categories?.join(", ") || "";

    const prompt = `You are a lifestyle content curator for GoTwo, a connection-centered preference-sharing app.

Generate a curated dashboard feed for this user:
- Identity: ${identity}
- Style: ${styles}
- Favorite brands: ${brands}
- Preferred stores: ${stores}
- Price tier: ${priceTier}
- Gift interests: ${giftCats}
- Persona: ${knowledgeProfile.persona_summary || ""}

Generate exactly 8 feed cards in these categories (2 each):
1. "trending_style" - Trending fashion/style articles relevant to their aesthetic
2. "store_pick" - Featured products or deals from their preferred stores  
3. "gift_idea" - Gift ideas matching their taste and price tier
4. "lifestyle" - Lifestyle tips, date ideas, or experiences they'd enjoy

Each card needs: title (catchy, 6-10 words), description (1-2 sentences), category, image_query (a specific Unsplash search term for a beautiful photo), and source_label (e.g. "Style Insider", "Gift Guide", store name).

Use the provided tool to return the feed.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_feed",
              description: "Generate curated dashboard feed cards",
              parameters: {
                type: "object",
                properties: {
                  feed: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        category: { type: "string", enum: ["trending_style", "store_pick", "gift_idea", "lifestyle"] },
                        image_query: { type: "string" },
                        source_label: { type: "string" },
                      },
                      required: ["title", "description", "category", "image_query", "source_label"],
                    },
                  },
                },
                required: ["feed"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_feed" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const parsed = JSON.parse(toolCall.function.arguments);
    const feed = sanitizeFeed(parsed?.feed);

    return new Response(JSON.stringify({ feed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("trending-feed error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Codebase classification: runtime trending-feed edge function.
