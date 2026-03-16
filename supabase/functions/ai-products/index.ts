import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

const sanitizeProducts = (rawProducts: unknown) => {
  if (!Array.isArray(rawProducts)) return [];
  return rawProducts
    .map((item) => {
      const p = item as Record<string, unknown>;
      const category = cleanText(p.category).toLowerCase();
      return {
        name: cleanText(p.name),
        brand: cleanText(p.brand),
        price: cleanText(p.price),
        category: ALLOWED_CATEGORIES.has(category) ? category : "clothes",
        hook: cleanText(p.hook),
        why: cleanText(p.why),
        is_partner_pick: Boolean(p.is_partner_pick),
      };
    })
    .filter((p) => p.name && p.brand && p.hook);
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

    const { data: prefs } = await supabase
      .from("user_preferences")
      .select("profile_answers, ai_personalization")
      .eq("user_id", user.id)
      .single();

    const profileAnswers = prefs?.profile_answers as Record<string, any> || {};
    const personalization = prefs?.ai_personalization as any || {};

    if (!personalization.style_keywords?.length) {
      return new Response(JSON.stringify({ products: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const gender = profileAnswers?.identity?.[0] || profileAnswers?.identity || "unspecified";

    // Build a condensed "Know Me" snapshot from profile answers
    const knowMeSnapshot = Object.entries(profileAnswers)
      .filter(([k]) => k !== "identity")
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .slice(0, 30)
      .join("\n");

    const prompt = `You are the Go Two Personal Curator — a high-end, AI-driven shopping and lifestyle concierge.

CORE PHILOSOPHY:
- Curated, Not Overbearing: Only recommend items that solve a problem or enhance the user's documented lifestyle
- Brand-Specific: Focus on specific real brands that align with the user's aesthetic and quality preferences
- Every recommendation should feel like a "discovery," not an "ad"

USER PROFILE:
- Gender: ${gender}
- Style Keywords: ${(personalization.style_keywords || []).join(", ")}
- Brands They Like: ${(personalization.recommended_brands || []).join(", ")}
- Stores They Prefer: ${(personalization.recommended_stores || []).join(", ")}
- Price Tier: ${personalization.price_tier || "mid-range"}
- Persona: ${personalization.persona_summary || ""}

KNOW ME DATA (their answers):
${knowMeSnapshot || "No detailed answers yet"}

RULES:
1. Generate exactly 12 recommendations — 3 per category
2. Categories are EXACTLY: food, clothes, tech, home
3. Cross-reference their "Know Me" answers with brand/style data
4. Each recommendation needs:
   - hook: 1 sentence explaining WHY this matches their profile (be specific, reference their data)
   - brand: the specific brand name
   - name: the specific product name  
   - price: approximate price (e.g. "$45" or "$120-180")
   - why: 1 sentence deeper explanation of fit
   - is_partner_pick: true for 2-3 items that are "Partner Picks" (vetted premium selections)
5. Talk like a knowledgeable friend: "Since you prefer dark roasts but hate acidity, this blend is your new go-to"
6. Match their price tier exactly
7. Use REAL products from REAL brands

Use the provided tool to return the recommendations.`;

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
              name: "recommend_products",
              description: "Return curated product recommendations organized by pillar",
              parameters: {
                type: "object",
                properties: {
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", description: "Specific product name" },
                        brand: { type: "string", description: "Brand name" },
                        price: { type: "string", description: "e.g. '$45' or '$120-180'" },
                        category: { type: "string", enum: ["food", "clothes", "tech", "home"] },
                        hook: { type: "string", description: "1 sentence why this matches their profile" },
                        why: { type: "string", description: "Deeper 1-sentence explanation" },
                        is_partner_pick: { type: "boolean", description: "true if this is a vetted Partner Pick" },
                      },
                      required: ["name", "brand", "price", "category", "hook", "why", "is_partner_pick"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["products"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "recommend_products" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const parsed = JSON.parse(toolCall.function.arguments);
    const products = sanitizeProducts(parsed?.products);

    return new Response(JSON.stringify({ products }), {
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
