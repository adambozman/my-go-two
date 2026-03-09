import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

    // Get user's personalization data
    const { data: prefs } = await supabase
      .from("user_preferences")
      .select("ai_personalization, profile_answers")
      .eq("user_id", user.id)
      .single();

    const personalization = prefs?.ai_personalization as any;
    const profileAnswers = prefs?.profile_answers as any;

    if (!personalization) {
      return new Response(JSON.stringify({ feed: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const gender = profileAnswers?.identity?.[0] || "unspecified";
    const styles = personalization.style_keywords?.join(", ") || "";
    const brands = personalization.recommended_brands?.join(", ") || "";
    const stores = personalization.recommended_stores?.join(", ") || "";
    const priceTier = personalization.price_tier || "mid-range";
    const giftCats = personalization.gift_categories?.join(", ") || "";

    const prompt = `You are a lifestyle content curator for GoTwo, a couples' preference-sharing app.

Generate a personalized dashboard feed for this user:
- Gender: ${gender}
- Style: ${styles}
- Favorite brands: ${brands}
- Preferred stores: ${stores}
- Price tier: ${priceTier}
- Gift interests: ${giftCats}
- Persona: ${personalization.persona_summary || ""}

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
              description: "Generate personalized dashboard feed cards",
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

    const { feed } = JSON.parse(toolCall.function.arguments);

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
