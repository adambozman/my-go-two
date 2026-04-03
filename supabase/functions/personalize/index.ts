import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getBankPersonalization } from "../_shared/knowMeCatalog.ts";

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

    const { profile_answers } = await req.json();
    if (!profile_answers || typeof profile_answers !== "object") {
      throw new Error("profile_answers is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build a rich prompt from the user's profile answers
    const answersText = Object.entries(profile_answers)
      .map(([key, value]) => {
        const display = Array.isArray(value) ? value.join(", ") : String(value);
        return `${key}: ${display}`;
      })
      .join("\n");

    const systemPrompt = `You are a personalization engine for a lifestyle/gifting app called GoTwo. 
Based on the user's profile answers, generate personalized recommendations that will shape their entire app experience.

Return structured data using the provided tool. Consider:
- Gender/identity affects which brands, stores, and imagery to show
- Style personality and aesthetic lean determine the visual tone
- Spending mindset determines which price tiers to prioritize
- Purchase values and free time preferences shape product and experience recommendations
- Gift preferences help with gifting features

Be specific with brand names. Pick real, well-known brands that match the profile.
For image_themes, suggest Unsplash-style search terms that match their aesthetic.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Here are the user's profile answers:\n\n${answersText}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_personalization",
              description: "Generate personalized recommendations based on user profile",
              parameters: {
                type: "object",
                properties: {
                  recommended_brands: {
                    type: "array",
                    items: { type: "string" },
                    description: "10-15 brands that match this person's profile (clothing, accessories, lifestyle)",
                  },
                  recommended_stores: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-8 stores/retailers that match their shopping style and budget",
                  },
                  image_themes: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-8 Unsplash search keywords for imagery that matches their aesthetic (e.g. 'minimal scandinavian', 'streetwear urban', 'luxury gold marble')",
                  },
                  color_palette: {
                    type: "array",
                    items: { type: "string" },
                    description: "5 hex color codes that match their style personality for UI theming",
                  },
                  gift_categories: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-8 gift categories this person would love (e.g. 'tech gadgets', 'skincare', 'experiences')",
                  },
                  price_tier: {
                    type: "string",
                    enum: ["budget", "mid-range", "premium", "luxury"],
                    description: "Primary price tier for recommendations",
                  },
                  style_keywords: {
                    type: "array",
                    items: { type: "string" },
                    description: "5-8 style keywords that describe this person (used for search and filtering)",
                  },
                  persona_summary: {
                    type: "string",
                    description: "A 2-3 sentence summary of this person's taste and preferences",
                  },
                },
                required: [
                  "recommended_brands",
                  "recommended_stores",
                  "image_themes",
                  "color_palette",
                  "gift_categories",
                  "price_tier",
                  "style_keywords",
                  "persona_summary",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_personalization" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiResult = await response.json();
    
    let personalization;
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.arguments) {
      personalization = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse from message content if model didn't use tool
      const content = aiResult.choices?.[0]?.message?.content;
      if (content) {
        try {
          // Try to extract JSON from the content
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            personalization = JSON.parse(jsonMatch[0]);
          }
        } catch {
          // Ignore malformed fallback content and continue to defaults.
        }
      }
      
      // If still no personalization, generate defaults based on answers
      if (!personalization) {
        console.warn("AI did not return structured data, using defaults");
        const identity = profile_answers?.identity;
        const gender = Array.isArray(identity) ? identity[0] : identity || "unspecified";
        const styles = profile_answers?.["style-personality"] || [];
        const styleList = Array.isArray(styles) ? styles : [styles];
        
        personalization = {
          recommended_brands: ["Nike", "Zara", "H&M", "Target", "Amazon"],
          recommended_stores: ["Nordstrom", "Target", "Amazon"],
          image_themes: ["lifestyle", "fashion", "modern"],
          color_palette: ["#2C3E50", "#E8C6AE", "#6B6D62", "#D4A574", "#3A7CA5"],
          gift_categories: ["tech gadgets", "experiences", "clothing"],
          price_tier: "mid-range",
          style_keywords: styleList.length > 0 ? styleList : ["casual", "modern"],
          persona_summary: `A ${gender} with a ${styleList.join(", ") || "versatile"} style who values quality and practicality.`,
        };
      }
    }

    const bankPersonalization = getBankPersonalization(profile_answers, personalization);
    personalization = {
      ...personalization,
      recommended_brands: bankPersonalization.recommended_brands,
      recommended_stores: bankPersonalization.recommended_stores,
    };

    // Save both profile answers and AI personalization to DB
    const { error: updateError } = await supabase
      .from("user_preferences")
      .update({
        profile_answers,
        ai_personalization: personalization,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("DB update error:", updateError);
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        profile_answers,
        ai_personalization: personalization,
      });
    }

    return new Response(JSON.stringify({ personalization }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("personalize error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
