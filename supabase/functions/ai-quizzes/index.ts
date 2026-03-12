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
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabase.auth.getClaims(token);
    if (authError || !claimsData?.claims) throw new Error("Unauthorized");
    const user = { id: claimsData.claims.sub as string };

    // Check for cached quizzes less than 7 days old
    const { data: cached } = await supabase
      .from("ai_generated_quizzes")
      .select("quizzes, generated_at")
      .eq("user_id", user.id)
      .single();

    const { data: prefs } = await supabase
      .from("user_preferences")
      .select("profile_answers, ai_personalization")
      .eq("user_id", user.id)
      .single();

    const { data: profile } = await supabase
      .from("profiles")
      .select("gender, age")
      .eq("user_id", user.id)
      .single();

    const userGender = profile?.gender || "unknown";
    const userAge = profile?.age || null;
    const profileAnswers = (prefs?.profile_answers as Record<string, any>) || {};

    if (cached) {
      const age = Date.now() - new Date(cached.generated_at).getTime();
      const quizData = cached.quizzes as any[];
      // Validate it's the new category format (each item has .questions array)
      const isNewFormat = Array.isArray(quizData) && quizData.length > 0 && Array.isArray(quizData[0]?.questions);
      if (isNewFormat && age < SEVEN_DAYS_MS) {
        const unanswered = quizData.filter((cat: any) =>
          cat.questions.some((q: any) => !profileAnswers[q.id])
        );
        return new Response(JSON.stringify({ categories: unanswered }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Old format or expired — will regenerate below
    }

    const personalization = (prefs?.ai_personalization as any) || {};

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const knownAnswers = Object.entries(profileAnswers)
      .map(([key, value]) => {
        const display = Array.isArray(value) ? value.join(", ") : String(value);
        return `${key}: ${display}`;
      })
      .join("\n");

    const prompt = `You are a lifestyle AI for GoTwo, a couples' preference-sharing app.
You are building a deep profile of this user to power personalized product and gift recommendations.

Here is what we already know about this user:
${knownAnswers || "Nothing yet — this is a new user."}

Their AI persona summary: ${personalization.persona_summary || "Not generated yet."}
Their style keywords: ${(personalization.style_keywords || []).join(", ") || "None"}
Their brands: ${(personalization.recommended_brands || []).join(", ") || "None"}
Their price tier: ${personalization.price_tier || "Unknown"}

Generate exactly 5 CATEGORIES of questions. Each category should have 3-5 questions.
The categories must map to one of: style, sizing, lifestyle, gifting, products.

Focus on GAPS in knowledge. Do NOT repeat questions already answered.

CRITICAL RULES:
- All text MUST be plain English only. No special characters, no unicode, no emoji, no Chinese/Japanese characters.
- Keep question titles short (5-10 words).
- Keep subtitles to one short sentence.
- Option labels should be 1-4 words, plain English only.
- Each question ID must be unique kebab-case.

Use the provided tool to return the categories.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
              description: "Generate categorized quiz questions to deepen user profile",
              parameters: {
                type: "object",
                properties: {
                  categories: {
                    type: "array",
                    description: "Array of quiz categories, each with multiple questions",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "unique kebab-case category id like 'style-deep-dive'" },
                        name: { type: "string", description: "Display name for the category, 2-4 words" },
                        category: { type: "string", enum: ["style", "sizing", "lifestyle", "gifting", "products"] },
                        questions: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string", description: "unique kebab-case question id" },
                              title: { type: "string", description: "The question, 5-10 words, plain English only" },
                              subtitle: { type: "string", description: "One short sentence of context, plain English only" },
                              type: { type: "string", enum: ["pill-select", "single-select"], description: "Question type" },
                              multi_select: { type: "boolean" },
                              options: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: { type: "string" },
                                    label: { type: "string", description: "1-4 words, plain English only" },
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
                      required: ["id", "name", "category", "questions"],
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

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const { categories } = JSON.parse(toolCall.function.arguments);

    // Cache the generated quizzes
    await supabase
      .from("ai_generated_quizzes")
      .upsert({
        user_id: user.id,
        quizzes: categories,
        generated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

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
