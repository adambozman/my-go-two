import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/** Generate a single category cover image and upload to storage */
async function generateCategoryImage(
  categoryId: string,
  imagePrompt: string,
  gender: string,
  userId: string,
  apiKey: string,
  supabaseUrl: string,
  serviceKey: string
): Promise<string | null> {
  try {
    const genderStyle =
      gender === "male"
        ? "masculine lifestyle, warm amber and earth tones, rugged yet refined"
        : gender === "female"
        ? "feminine lifestyle, warm rose and golden tones, soft and elegant"
        : "gender-neutral lifestyle, warm earth tones, modern and inclusive";

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        messages: [
          {
            role: "user",
            content: `Generate a beautiful editorial lifestyle photograph: ${imagePrompt}. Style: ${genderStyle}, golden-hour photography, soft natural lighting, intimate feel. Absolutely no text, labels, or words in the image.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!resp.ok) {
      console.error(`Image gen failed for ${categoryId}: status ${resp.status}`);
      return null;
    }

    const result = await resp.json();
    const imgData = result.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imgData) return null;

    const m = imgData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!m) return null;

    const ext = m[1];
    const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));

    const admin = createClient(supabaseUrl, serviceKey);
    const path = `knowme/${userId}/${categoryId}.${ext}`;

    await admin.storage.from("card-images").upload(path, bytes, {
      contentType: `image/${ext}`,
      upsert: true,
    });

    const { data } = admin.storage.from("card-images").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.error(`Image gen error for ${categoryId}:`, e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabase.auth.getClaims(token);
    if (authError || !claimsData?.claims) throw new Error("Unauthorized");
    const userId = claimsData.claims.sub as string;

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

    // Check cache — must have image_urls and be fresh
    if (cachedResult.data) {
      const age = Date.now() - new Date(cachedResult.data.generated_at).getTime();
      const quizData = cachedResult.data.quizzes as any[];
      const isValid =
        Array.isArray(quizData) &&
        quizData.length > 0 &&
        Array.isArray(quizData[0]?.questions) &&
        quizData[0]?.image_url; // has images

      if (isValid && age < SEVEN_DAYS_MS) {
        // Filter out fully answered categories
        const unanswered = quizData.filter((cat: any) =>
          cat.questions.some((q: any) => !allAnswers[q.id])
        );
        return new Response(JSON.stringify({ categories: unanswered }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Generate new questions
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const knownAnswers = Object.entries(allAnswers)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
      .join("\n");

    const prompt = `You are a lifestyle AI for GoTwo, a couples' preference-sharing app.
You are building a deep profile of this user to power personalized product, gift, and style recommendations.

USER PROFILE:
- Gender: ${userGender}
- Age: ${userAge || "Unknown"}

KNOWN ANSWERS:
${knownAnswers || "Nothing yet — new user."}

AI persona: ${personalization.persona_summary || "Not generated yet."}
Style keywords: ${(personalization.style_keywords || []).join(", ") || "None"}
Brands: ${(personalization.recommended_brands || []).join(", ") || "None"}
Price tier: ${personalization.price_tier || "Unknown"}

Generate exactly 6 CATEGORIES of adaptive questions. Each category should have 3-5 questions.
Each category MUST map to one of: style, sizing, lifestyle, gifting, products.

FOCUS on GAPS. Do NOT repeat answered topics. Be specific and personal.
If the user has answered basic style questions, go deeper (specific aesthetics, occasions, colors).
If they've answered food basics, ask about specific cuisines, dining habits, cooking.

CRITICAL RULES:
- All text plain English only. No unicode, emoji, or special characters.
- Keep question titles short (5-10 words).
- Keep subtitles one short sentence.
- Option labels 1-4 words, plain English only.
- Each question ID must be unique kebab-case.
- PERSONALIZE to user's gender. Do NOT show gender-inappropriate items.
- Each category needs an image_prompt: a 1-sentence description for generating a lifestyle cover photo for that category card. Make it vivid and specific to the category topic.

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
                        category: { type: "string", enum: ["style", "sizing", "lifestyle", "gifting", "products"] },
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

    // Generate cover images for all categories in parallel
    const imagePromises = categories.map((cat: any) =>
      generateCategoryImage(
        cat.id,
        cat.image_prompt,
        userGender,
        userId,
        LOVABLE_API_KEY,
        supabaseUrl,
        supabaseServiceKey
      )
    );

    const imageUrls = await Promise.all(imagePromises);
    categories.forEach((cat: any, i: number) => {
      cat.image_url = imageUrls[i];
    });

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
