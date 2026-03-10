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

    // Fetch user's current profile data
    const { data: prefs } = await supabase
      .from("user_preferences")
      .select("profile_answers, ai_personalization")
      .eq("user_id", user.id)
      .single();

    const profileAnswers = prefs?.profile_answers as Record<string, any> || {};
    const personalization = prefs?.ai_personalization as any || {};

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build context of what we already know
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

Generate 4-6 NEW quiz questions that will help us learn MORE about this person to improve product recommendations. 
Focus on GAPS in our knowledge. For example:
- If we don't know their sizes, ask about sizes
- If we don't know their color preferences, ask about colors
- If we don't know their scent preferences, ask about fragrances
- If we don't know their tech preferences, ask about gadgets
- If we know they like luxury, dig deeper into which luxury categories
- Ask about specific product categories relevant to their style

Each question should feel personal and relevant to what we already know.
Do NOT repeat questions we've already answered.

Use the provided tool to return the questions.`;

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
              name: "generate_quizzes",
              description: "Generate personalized quiz questions to deepen user profile",
              parameters: {
                type: "object",
                properties: {
                  quizzes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "unique kebab-case id like 'color-preference'" },
                        title: { type: "string", description: "The question, 5-10 words" },
                        subtitle: { type: "string", description: "Helpful context, 1 sentence" },
                        category: { type: "string", enum: ["style", "sizing", "lifestyle", "gifting", "products"] },
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
                      required: ["id", "title", "subtitle", "category", "multi_select", "options"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["quizzes"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_quizzes" } },
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

    const { quizzes } = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ quizzes }), {
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
