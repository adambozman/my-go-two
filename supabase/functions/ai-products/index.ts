import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    .replace(/\s+,/g, ",")
    .trim()
    .replace(/,$/, "");
};

const ALLOWED_CATEGORIES = new Set([
  "clothing",
  "accessories",
  "grooming",
  "lifestyle",
  "experiences",
  "tech",
  "home",
  "fragrance",
]);

const sanitizeProducts = (rawProducts: unknown) => {
  if (!Array.isArray(rawProducts)) return [];

  return rawProducts
    .map((item) => {
      const p = item as Record<string, unknown>;
      const category = cleanText(p.category).toLowerCase();
      return {
        name: cleanText(p.name),
        brand: cleanText(p.brand),
        price_range: cleanText(p.price_range),
        category: ALLOWED_CATEGORIES.has(category) ? category : "lifestyle",
        why_picked: cleanText(p.why_picked),
        is_discovery: Boolean(p.is_discovery),
      };
    })
    .filter((p) => p.name && p.brand && p.price_range && p.why_picked);
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

    // Get ALL user data for deep personalization
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

    const prompt = `You are a product recommendation AI for GoTwo, a couples' preference app.

Generate 12 specific, real product recommendations for this user:

Profile:
- Gender: ${gender}
- Style: ${(personalization.style_keywords || []).join(", ")}
- Brands they like: ${(personalization.recommended_brands || []).join(", ")}
- Stores they prefer: ${(personalization.recommended_stores || []).join(", ")}
- Price tier: ${personalization.price_tier || "mid-range"}
- Gift categories: ${(personalization.gift_categories || []).join(", ")}
- Persona: ${personalization.persona_summary || ""}

Rules:
- Recommend REAL products with real brand names and approximate prices
- Mix categories: clothing, accessories, grooming, lifestyle, experiences, tech
- Match their price tier exactly
- Match their style and brand preferences
- Include 2-3 "discovery" picks — products from brands they might not know but would love
- Each product needs: name, brand, price_range, category, why_picked (1 sentence explaining why this matches them)

Use the provided tool to return the products.`;

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
              description: "Generate personalized product recommendations",
              parameters: {
                type: "object",
                properties: {
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        brand: { type: "string" },
                        price_range: { type: "string", description: "e.g. '$45-65' or '$200+'" },
                        category: { type: "string", enum: ["clothing", "accessories", "grooming", "lifestyle", "experiences", "tech", "home", "fragrance"] },
                        why_picked: { type: "string", description: "1 sentence why this matches the user" },
                        is_discovery: { type: "boolean", description: "true if this is a brand they might not know" },
                      },
                      required: ["name", "brand", "price_range", "category", "why_picked", "is_discovery"],
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
