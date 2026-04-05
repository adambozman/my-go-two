import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user?.id) throw new Error("Unauthorized");

    const quizSetKey = "universal";

    // Check if we already have the shared universal question set.
    const admin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: existing } = await admin
      .from("quiz_question_sets")
      .select("questions, generated_at")
      .eq("gender", quizSetKey)
      .single();

    if (existing) {
      const age = Date.now() - new Date(existing.generated_at).getTime();
      const questions = existing.questions;
      if (Array.isArray(questions) && questions.length > 0 && age < THIRTY_DAYS_MS) {
        return new Response(JSON.stringify({ categories: questions }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Generate the universal question set.
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

const prompt = `You are a lifestyle AI for GoTwo, a connection-centered preference-sharing app.
Generate one UNIVERSAL set of questions for every user. The AI learns about each person from HOW they answer, not from what questions they see.

Generate exactly 5 SECTIONS with exactly 4 CATEGORIES per section, and exactly 5 QUESTIONS per category = 100 questions total.

The 5 sections and their category types:
1. "style-fit" — categories: style, sizing, colors, accessories
2. "food-drink" — categories: cuisine, cooking, beverages, dining
3. "gifts-wishlist" — categories: gifting, products, brands, shopping
4. "home-living" — categories: home-decor, home-comfort, organization, entertaining
5. "entertainment" — categories: dates, lifestyle, wellness, love-language

Each category must have exactly 5 questions with 4-6 options each.

QUESTION DEPTH — these questions should cover:
STYLE-FIT:
- style: overall aesthetic, pattern preferences, seasonal priorities, dress code comfort, fashion eras
- sizing: fit preferences (slim/relaxed/oversized), fabric weight, shoe style priority, comfort vs fashion, layering habits
- colors: colors to wear, colors to avoid, neutral vs bold, seasonal colors, metals (gold/silver/rose gold)
- accessories: watch style, jewelry preference, bag style, sunglasses, hat preference

FOOD-DRINK:
- cuisine: favorite cuisines, dietary needs, food adventurousness, comfort foods, spice tolerance
- cooking: skill level, meal prep habits, kitchen gadget interest, recipe discovery, cooking together
- beverages: coffee/tea preference, cocktail style, wine preference, hydration habits, smoothie/juice
- dining: restaurant style, tipping philosophy, takeout frequency, food delivery apps, brunch preference

GIFTS-WISHLIST:
- gifting: surprise vs planned, sentimental vs practical, wrapping importance, experience vs physical, DIY gifts
- products: skincare priority, tech gadgets, fragrance family, grooming essentials, subscription boxes
- brands: brand loyalty, luxury vs value, brand discovery, favorite stores, online vs in-store
- shopping: impulse vs planner, sale hunter, window shopping, return habits, shopping companion

HOME-LIVING:
- home-decor: interior style, color palette, art preference, plant parent level, seasonal decorating
- home-comfort: bedding preference, candle/scent, temperature preference, lighting mood, bath vs shower
- organization: clutter tolerance, storage philosophy, cleaning frequency, minimalist vs collector, closet style
- entertaining: hosting frequency, party style, game night preference, dinner party vs casual, outdoor entertaining

ENTERTAINMENT:
- dates: ideal date night, adventure level, indoor vs outdoor, spontaneous vs planned, budget comfort
- lifestyle: morning vs night, travel style, social energy, hobbies, weekend priorities
- wellness: fitness routine, self-care, sleep habits, stress relief, spa preference
- love-language: primary love language, affection style, quality time activities, appreciation style, conflict resolution

RULES:
- All text plain English only. No unicode, emoji, or special characters.
- Question titles: 5-10 words, conversational and fun.
- Subtitles: one short engaging sentence.
- Option labels: 1-4 words, plain English only.
- Each question ID must be globally unique kebab-case.
- Make every question broadly usable for any adult user.
- Each category needs an image_prompt for a lifestyle cover photo.

Use the provided tool.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_quiz_categories",
              description: "Generate categorized quiz questions",
              parameters: {
                type: "object",
                properties: {
                  categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string", description: "Display name, 2-4 words" },
                        section: { type: "string", enum: ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"] },
                        category: { type: "string" },
                        image_prompt: { type: "string" },
                        questions: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              title: { type: "string" },
                              subtitle: { type: "string" },
                              type: { type: "string", enum: ["pill-select", "single-select"] },
                              multi_select: { type: "boolean" },
                              options: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: { type: "string" },
                                    label: { type: "string" },
                                  },
                                  required: ["id", "label"],
                                  additionalProperties: false,
                                },
                              },
                            },
                            required: ["id", "title", "subtitle", "type", "multi_select", "options"],
                            additionalProperties: false,
                          },
                        },
                      },
                      required: ["id", "name", "section", "category", "image_prompt", "questions"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["categories"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_quiz_categories" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiResult = await aiResponse.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const { categories } = JSON.parse(toolCall.function.arguments);

    // Store one universal question set, not per-user and not per-gender.
    await admin.from("quiz_question_sets").upsert(
      { gender: quizSetKey, questions: categories, generated_at: new Date().toISOString() },
      { onConflict: "gender" }
    );

    return new Response(JSON.stringify({ categories }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-quizzes error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Codebase classification: runtime Know Me question generation edge function.
