import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callGeminiWithTool, MODELS } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * this-or-that-ai — generates new This or That questions dynamically
 *
 * Takes the user's previous answers and generates fresh questions
 * designed to drill deeper into their preference hierarchy across
 * brands, styles, places, food, household items, etc.
 */

const CATEGORIES = [
  "clothes",
  "personal",
  "health",
  "gifts",
  "dining",
  "beverages",
  "household",
  "entertainment",
  "travel",
] as const;

const toolDef = {
  name: "generate_questions",
  description: "Generate This or That questions for the user",
  parameters: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        description: "Array of This or That questions",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description:
                "Unique question ID, format: ai-{category}-{short-slug}",
            },
            prompt: {
              type: "string",
              description:
                "The question prompt shown in the center card, e.g. 'Which weekend sounds better?'",
            },
            categoryA: {
              type: "string",
              description:
                "Option A label (the 'This' side), e.g. 'Hiking trail'",
            },
            categoryB: {
              type: "string",
              description:
                "Option B label (the 'That' side), e.g. 'Beach day'",
            },
            category: {
              type: "string",
              description: "Which top-level category this question belongs to",
              enum: [...CATEGORIES],
            },
          },
          required: ["id", "prompt", "categoryA", "categoryB", "category"],
        },
      },
    },
    required: ["questions"],
  },
};

type AiQuestion = {
  id: string;
  prompt: string;
  categoryA: string;
  categoryB: string;
  category: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) throw new Error("Unauthorized");

    const { previousAnswers, count = 5 } = await req.json();

    // Build a summary of what we know about the user so far
    const answerSummary =
      previousAnswers && Array.isArray(previousAnswers) && previousAnswers.length > 0
        ? previousAnswers
            .slice(-40) // last 40 answers for context
            .map(
              (a: { prompt: string; chosen: string; rejected: string; category?: string }) =>
                `Q: ${a.prompt} → Chose "${a.chosen}" over "${a.rejected}"${a.category ? ` [${a.category}]` : ""}`,
            )
            .join("\n")
        : "No previous answers yet — generate broad introductory questions across all categories.";

    const systemPrompt = `You are the This or That question generator for GoTwo, a preference-learning app.

Your job: generate ${count} fresh "This or That" questions that help pin down the user's preference hierarchy across brands, styles, places, food, household items, and lifestyle.

Rules:
- Each question has exactly TWO options (categoryA and categoryB).
- Questions should feel natural and conversational, not clinical.
- Mix categories — don't cluster all questions in one area.
- If the user has previous answers, use them to drill DEEPER. For example, if they chose "Nike" over "Adidas", ask about specific Nike sub-preferences (running vs lifestyle, bold vs minimal, etc).
- Progressively narrow: start broad, then get specific as you learn more.
- Keep option labels SHORT (1-4 words max). The prompt can be a bit longer.
- Make IDs unique using format: ai-{category}-{short-hyphenated-slug}-{random4digits}
- Cover practical everyday items too: toilet paper brands, shampoo, toothpaste, cleaning products, etc. — not just aspirational lifestyle choices.
- Be creative and specific. Avoid generic questions.
- Generate exactly ${count} questions.`;

    const result = await callGeminiWithTool<{ questions: AiQuestion[] }>(
      MODELS.FLASH,
      [
        {
          role: "user",
          content: `Here are the user's previous This or That answers:\n\n${answerSummary}\n\nGenerate ${count} new This or That questions to further refine their preferences. Mix across different categories.`,
        },
      ],
      toolDef,
      systemPrompt,
    );

    if (!result?.questions || !Array.isArray(result.questions)) {
      throw new Error("AI returned invalid response");
    }

    // Ensure all questions have valid structure
    const questions = result.questions
      .filter(
        (q) =>
          q.id &&
          q.prompt &&
          q.categoryA &&
          q.categoryB &&
          q.category &&
          CATEGORIES.includes(q.category as (typeof CATEGORIES)[number]),
      )
      .map((q) => ({
        id: q.id,
        prompt: q.prompt,
        categoryA: q.categoryA,
        categoryB: q.categoryB,
        category: q.category,
        tagsForA: [],
        tagsForB: [],
        isAiGenerated: true,
      }));

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("this-or-that-ai error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

// Codebase classification: runtime this-or-that-ai edge function.
