import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await authClient.auth.getUser();
    const userId = user?.id;

    if (authError || !userId) {
      console.error("ai-quizzes auth error:", authError);
      throw new Error("Unauthorized");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Fetch user data
    const [cachedResult, prefsResult, profileResult] = await Promise.all([
      supabase.from("ai_generated_quizzes").select("quizzes, generated_at").eq("user_id", userId).single(),
      supabase.from("user_preferences").select("profile_answers, favorites, ai_personalization").eq("user_id", userId).single(),
      supabase.from("profiles").select("gender, age").eq("user_id", userId).single(),
    ]);

    const userGender = profileResult.data?.gender || "neutral";
    const userAge = profileResult.data?.age || null;
    const profileAnswers = (prefsResult.data?.profile_answers as Record<string, any>) || {};
    const favorites = (prefsResult.data?.favorites as Record<string, any>) || {};
    const allAnswers = { ...favorites, ...profileAnswers };
    const personalization = (prefsResult.data?.ai_personalization as any) || {};

    // Check cache
    if (cachedResult.data) {
      const age = Date.now() - new Date(cachedResult.data.generated_at).getTime();
      const quizData = cachedResult.data.quizzes as any[];
      const isValid =
        Array.isArray(quizData) &&
        quizData.length > 0 &&
        Array.isArray(quizData[0]?.questions);

      if (isValid && age < SEVEN_DAYS_MS) {
        // Filter out fully answered categories
        const unanswered = quizData.filter((cat: any) =>
          cat.questions.some((q: any) => !allAnswers[q.id])
        );

        // If there are still unanswered questions, serve cached quizzes.
        // If everything has been answered, generate a fresh adaptive set below.
        if (unanswered.length > 0) {
          return new Response(JSON.stringify({ categories: unanswered }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // Generate new questions
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const knownAnswers = Object.entries(allAnswers)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
      .join("\n");

    const prompt = `You are a lifestyle AI for GoTwo, a couples' preference-sharing app.
You are building the DEEPEST possible profile of this user so their partner always knows exactly what to buy, where to go, and how to show love. Every answer feeds gift recommendations, date planning, and shopping decisions.

USER PROFILE:
- Gender: ${userGender}
- Age: ${userAge || "Unknown"}

KNOWN ANSWERS:
${knownAnswers || "Nothing yet — new user."}

AI persona: ${personalization.persona_summary || "Not generated yet."}
Style keywords: ${(personalization.style_keywords || []).join(", ") || "None"}
Brands: ${(personalization.recommended_brands || []).join(", ") || "None"}
Price tier: ${personalization.price_tier || "Unknown"}

Generate exactly 12 CATEGORIES of adaptive questions. Each category should have 4-6 questions with 4-6 options each.
Each category MUST map to one of these types: style, sizing, colors, lifestyle, gifting, products, brands, love-language, dates, food, wellness, home.

TOPIC GUIDANCE — cover ALL of these areas. Go DEEP, not shallow:
- "style": clothing style, aesthetic, fashion era preferences, pattern preferences (stripes, plaid, solid), seasonal wardrobe priorities, dress code comfort level, accessories (watches, jewelry, hats, bags), sunglasses style
- "sizing": clothing sizes (tops, bottoms, shoes), fit preferences (slim, relaxed, oversized), body comfort areas, preferred fabric weights, ring size if applicable
- "colors": favorite colors to wear, colors they avoid, neutral vs bold preference, seasonal color preferences, color in home decor vs clothing
- "lifestyle": hobbies, free time, morning vs night person, travel style, social energy (introvert/extrovert), reading habits, music taste, podcast preferences, sports they follow, creative outlets
- "gifting": gift preferences, wrapping importance, surprise vs planned, sentimental vs practical, price comfort, regifting feelings, gift cards opinion, experience vs physical, DIY gifts
- "products": skincare routine, tech gadgets, home goods, kitchen tools, car preferences, subscription services, fragrance family, grooming essentials, workout gear
- "brands": brand loyalty level, favorite clothing brands, favorite food/drink brands, luxury vs value, brand discovery (social media, friends, ads), stores they frequent
- "love-language": primary love language, how they show affection, what makes them feel most loved, appreciation style, conflict resolution, quality time activities, physical affection comfort, words that matter
- "dates": ideal date nights, adventure level, indoor vs outdoor, budget range for dates, frequency preference, spontaneous vs planned, restaurant preferences, activity dates (bowling, hiking, concerts), staycation vs travel, movie genre
- "food": cuisine preferences, dietary restrictions, cooking skill/interest, comfort foods, food adventurousness, coffee/tea preferences, snack preferences, meal prep habits, restaurant discovery, cocktail/wine/beer preferences
- "wellness": fitness routine, self-care habits, sleep preferences, stress relief methods, spa/massage preferences, mental health practices, supplements/vitamins, health goals
- "home": interior style, room priorities, organization level, plant parent level, candle/scent preferences, bedding preferences, kitchen style, entertaining frequency, smart home interest, seasonal decorating

CRITICAL: FOCUS on GAPS. Analyze what has already been answered and go DEEPER or cover NEW territory.
- If basic style is covered, ask about specific occasions (work, date night, vacation wardrobe)
- If food basics are covered, ask about cooking, specific cuisines, cocktail preferences
- If lifestyle basics are done, ask about media consumption, social habits, bucket list items
- Always think: "What would help a partner buy the PERFECT gift or plan the PERFECT date?"

RULES:
- All text plain English only. No unicode, emoji, or special characters.
- Keep question titles short (5-10 words).
- Keep subtitles one short engaging sentence.
- Option labels 1-4 words, plain English only.
- Each question ID must be unique kebab-case.
- PERSONALIZE to user's gender and age. Be contextually appropriate.
- Each category needs an image_prompt: a vivid 1-sentence description for a warm, golden-hour lifestyle cover photo. No text in the image.
- Make questions feel conversational and fun, not like a survey.

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
              description: "Generate categorized quiz questions with image prompts",
              parameters: {
                type: "object",
                properties: {
                  categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "unique kebab-case category id" },
                        name: { type: "string", description: "Display name, 2-4 words" },
                        category: { type: "string", enum: ["style", "sizing", "colors", "lifestyle", "gifting", "products", "brands", "love-language", "dates", "food", "wellness", "home"] },
                        image_prompt: {
                          type: "string",
                          description: "One vivid sentence describing a lifestyle photo for this category's card cover. E.g. 'A curated flatlay of leather accessories and watches on warm wood'",
                        },
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
                      required: ["id", "name", "category", "image_prompt", "questions"],
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
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiResult = await aiResponse.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const { categories } = JSON.parse(toolCall.function.arguments);

    // Skip image generation to stay within CPU limits — frontend uses placeholder gradients

    // Cache
    await supabase.from("ai_generated_quizzes").upsert(
      {
        user_id: userId,
        quizzes: categories,
        generated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
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
