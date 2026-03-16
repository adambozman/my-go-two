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
        is_sponsored: false,
        affiliate_url: null as string | null,
        sponsored_id: null as string | null,
      };
    })
    .filter((p) => p.name && p.brand && p.hook);
};

const PRICE_TIERS: Record<string, { label: string; clothes: string; food: string; tech: string; home: string }> = {
  budget: { label: "Budget-conscious", clothes: "under $40", food: "under $15", tech: "under $100", home: "under $50" },
  "mid-range": { label: "Mid-range", clothes: "$30-80", food: "$10-30", tech: "$50-300", home: "$30-120" },
  premium: { label: "Premium but not luxury", clothes: "$60-200", food: "$20-60", tech: "$150-800", home: "$80-400" },
  luxury: { label: "Luxury", clothes: "$150-600", food: "$40-150", tech: "$500-3000", home: "$200-2000" },
};

function extractSpendingSignals(quizAnswers: Record<string, string> | null): string {
  if (!quizAnswers || typeof quizAnswers !== "object") return "";
  const signals: string[] = [];
  for (const [promptId, answer] of Object.entries(quizAnswers)) {
    if (typeof answer === "string") {
      const lower = promptId.toLowerCase();
      if (lower.includes("100") || lower.includes("spend") || lower.includes("luxury") || lower.includes("splurge")) {
        signals.push(`"${promptId}": ${answer}`);
      }
    }
  }
  return signals.join("\n");
}

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

    // Fetch preferences, quiz answers, and sponsored products in parallel
    const [prefsResult, quizResult, sponsoredResult] = await Promise.all([
      supabase
        .from("user_preferences")
        .select("profile_answers, ai_personalization")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("ai_generated_quizzes")
        .select("quizzes")
        .eq("user_id", user.id)
        .order("generated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("sponsored_products")
        .select("*")
        .eq("is_active", true)
        .eq("placement", "blended"),
    ]);

    const profileAnswers = prefsResult.data?.profile_answers as Record<string, any> || {};
    const personalization = prefsResult.data?.ai_personalization as any || {};

    if (!personalization.style_keywords?.length) {
      return new Response(JSON.stringify({ products: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const gender = profileAnswers?.identity?.[0] || profileAnswers?.identity || "unspecified";
    const rawTier = (personalization.price_tier || "mid-range").toLowerCase().trim();
    const tier = PRICE_TIERS[rawTier] || PRICE_TIERS["mid-range"];

    const quizData = quizResult?.data?.quizzes as Record<string, string> | null;
    const spendingSignals = extractSpendingSignals(quizData);

    const knowMeSnapshot = Object.entries(profileAnswers)
      .filter(([k]) => k !== "identity")
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .slice(0, 30)
      .join("\n");

    // Filter sponsored products by user targeting
    const sponsoredProducts = (sponsoredResult.data || []).filter((sp: any) => {
      const now = new Date();
      if (sp.start_date && new Date(sp.start_date) > now) return false;
      if (sp.end_date && new Date(sp.end_date) < now) return false;
      if (sp.target_gender?.length && !sp.target_gender.includes(gender)) return false;
      if (sp.target_price_tiers?.length && !sp.target_price_tiers.includes(rawTier)) return false;
      return true;
    });

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
- Price Tier: ${tier.label}
- Persona: ${personalization.persona_summary || ""}

⚠️ STRICT PRICE CONSTRAINTS (DO NOT EXCEED):
- Clothes: ${tier.clothes}
- Food/Drink: ${tier.food}
- Tech/Electronics: ${tier.tech}
- Home/Living: ${tier.home}
These are HARD CEILINGS. Never recommend items above these ranges.

${spendingSignals ? `USER SPENDING SIGNALS (from their quiz answers):
${spendingSignals}
Use these signals to calibrate recommendations.` : ""}

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
   - price: approximate price that MUST fall within the constraints above
   - why: 1 sentence deeper explanation of fit
   - is_partner_pick: true for 2-3 items that are "Partner Picks" (vetted premium selections)
5. Talk like a knowledgeable friend
6. RESPECT their price tier — recommend accessible items they'd actually buy
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
                        name: { type: "string" },
                        brand: { type: "string" },
                        price: { type: "string" },
                        category: { type: "string", enum: ["food", "clothes", "tech", "home"] },
                        hook: { type: "string" },
                        why: { type: "string" },
                        is_partner_pick: { type: "boolean" },
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
    const aiProducts = sanitizeProducts(parsed?.products);

    // Blend sponsored products into the AI results
    const blendedProducts = [...aiProducts];
    const sponsoredMapped = sponsoredProducts
      .sort((a: any, b: any) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 3) // max 3 sponsored per load
      .map((sp: any) => ({
        name: sp.name,
        brand: sp.brand,
        price: sp.price || "",
        category: ALLOWED_CATEGORIES.has(sp.category) ? sp.category : "clothes",
        hook: sp.hook || `Curated pick from ${sp.brand}`,
        why: sp.why || `A ${sp.brand} selection matched to your style`,
        is_partner_pick: false,
        is_sponsored: true,
        affiliate_url: sp.affiliate_url
          ? `${sp.affiliate_url}${sp.affiliate_url.includes("?") ? "&" : "?"}utm_source=${sp.utm_source || "gotwo"}&utm_medium=${sp.utm_medium || "app"}&utm_campaign=${sp.utm_campaign || "recs"}`
          : null,
        sponsored_id: sp.id,
      }));

    // Insert sponsored items at natural positions (after position 2, 6, 10)
    const insertPositions = [2, 6, 10];
    for (let i = 0; i < sponsoredMapped.length; i++) {
      const pos = Math.min(insertPositions[i] || blendedProducts.length, blendedProducts.length);
      blendedProducts.splice(pos, 0, sponsoredMapped[i]);
    }

    return new Response(JSON.stringify({ products: blendedProducts }), {
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
