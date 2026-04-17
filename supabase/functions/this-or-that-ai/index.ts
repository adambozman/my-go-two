import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callGeminiWithTool, MODELS } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * this-or-that-ai — AI-driven brand-vs-brand tournament question generator
 *
 * SHARED BANK PATTERN:
 * 1. Check how many active questions exist in `this_or_that_v2_questions`
 * 2. If the bank is below the threshold → call Gemini to generate new ones
 * 3. INSERT new questions + options into the shared DB bank (service role)
 * 4. Return { generated: N, bank_size: N } — frontend loads from DB separately
 *
 * The frontend does NOT receive questions from this endpoint.
 * It reads from the DB bank (shared across all users).
 *
 * Business model: ranked brand hierarchies per user segment, sold to companies.
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

type CategorySlug = (typeof CATEGORIES)[number];

/** Map AI category → subcategory_slug + entity_type for the options table */
const CATEGORY_META: Record<
  CategorySlug,
  { subcategory: string; entity_type: string; recommendation_category: string }
> = {
  clothes:       { subcategory: "brands-shopping",     entity_type: "brand-cluster",       recommendation_category: "clothes" },
  personal:      { subcategory: "colors-palette",      entity_type: "brand-cluster",       recommendation_category: "personal" },
  health:        { subcategory: "health-wellness",     entity_type: "brand-cluster",       recommendation_category: "health" },
  gifts:         { subcategory: "gifting-actually-want",entity_type: "gift-preference",    recommendation_category: "gifts" },
  dining:        { subcategory: "food-dining",         entity_type: "taste-cluster",       recommendation_category: "dining" },
  beverages:     { subcategory: "beverages",           entity_type: "taste-cluster",       recommendation_category: "beverages" },
  household:     { subcategory: "home-living",         entity_type: "home-style",          recommendation_category: "household" },
  entertainment: { subcategory: "hobbies-weekend",     entity_type: "interest-cluster",    recommendation_category: "entertainment" },
  travel:        { subcategory: "travel-trips",        entity_type: "destination-cluster", recommendation_category: "travel" },
};

const toolDef = {
  name: "generate_questions",
  description: "Generate brand-vs-brand This or That tournament questions",
  parameters: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        description: "Array of This or That matchup questions",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description:
                "Unique question ID, format: ai-{category}-{short-slug}-{random4digits}",
            },
            prompt: {
              type: "string",
              description:
                "The matchup question, e.g. 'Which brand do you prefer?' or 'Which do you reach for?'",
            },
            categoryA: {
              type: "string",
              description:
                "Option A label — a specific brand, product, or concrete preference (1-4 words)",
            },
            categoryB: {
              type: "string",
              description:
                "Option B label — a specific brand, product, or concrete preference (1-4 words)",
            },
            category: {
              type: "string",
              description: "Which top-level category this question belongs to",
              enum: [...CATEGORIES],
            },
            brandA: {
              type: "string",
              description:
                "The brand name for option A (lowercase). If the option IS a brand, this matches. If it's a style/vibe, leave empty string.",
            },
            brandB: {
              type: "string",
              description:
                "The brand name for option B (lowercase). If the option IS a brand, this matches. If it's a style/vibe, leave empty string.",
            },
            tagsA: {
              type: "array",
              items: { type: "string" },
              description:
                "3-5 descriptor keywords for option A (lowercase), e.g. ['affordable', 'trendy', 'fast fashion']",
            },
            tagsB: {
              type: "array",
              items: { type: "string" },
              description:
                "3-5 descriptor keywords for option B (lowercase), e.g. ['premium', 'minimal', 'sustainable']",
            },
          },
          required: [
            "id",
            "prompt",
            "categoryA",
            "categoryB",
            "category",
            "brandA",
            "brandB",
            "tagsA",
            "tagsB",
          ],
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
  brandA: string;
  brandB: string;
  tagsA: string[];
  tagsB: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// ── Minimum bank size before we generate more ──
const BANK_MIN_THRESHOLD = 120;
const GENERATE_BATCH_SIZE = 10;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

    // Auth check (any authenticated user can trigger bank growth)
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    // Service-role client for writing to shared bank (bypasses RLS)
    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // ── 1. Check current bank size ──
    const { count: bankSize, error: countError } = await admin
      .from("this_or_that_v2_questions")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true);

    if (countError) throw countError;

    const currentBankSize = bankSize ?? 0;

    // If bank is already above threshold, skip generation
    if (currentBankSize >= BANK_MIN_THRESHOLD) {
      return jsonResponse({
        generated: 0,
        bank_size: currentBankSize,
        message: "Bank is healthy, no generation needed",
      });
    }

    // ── 2. Load existing question keys to avoid duplicates ──
    const { data: existingQuestions, error: existingError } = await admin
      .from("this_or_that_v2_questions")
      .select("question_key, prompt")
      .eq("is_active", true);

    if (existingError) throw existingError;

    const existingKeys = new Set(
      (existingQuestions ?? []).map((q: { question_key: string }) => q.question_key),
    );
    const existingPrompts = (existingQuestions ?? [])
      .map((q: { prompt: string }) => q.prompt)
      .slice(-40);

    // ── 3. Call Gemini to generate new questions ──
    const count = GENERATE_BATCH_SIZE;

    const systemPrompt = `You are the This or That question engine for GoTwo, a preference-learning app that builds ranked brand hierarchies.

YOUR MISSION: Generate ${count} brand-vs-brand, product-vs-product, or concrete-preference tournament matchups. The goal is to build a ranked hierarchy of user preferences across brands, styles, vibes, and products — data that gets sold to companies.

Example of what we're building: "Women 30-40 in Tacoma prefer H&M over American Eagle, prefer Dyson over Shark, prefer Native shampoo over Olaplex, prefer hot coffee over iced."

QUESTION TYPES TO GENERATE (mix these across your ${count} questions):
1. BRAND VS BRAND — "Nike or Adidas?", "Chipotle or Sweetgreen?", "Target or Amazon?"
2. PRODUCT VS PRODUCT — "AirPods or Galaxy Buds?", "Yeti or Stanley?", "Olaplex or Native?"
3. STYLE VS STYLE — "Streetwear or Minimalist?", "Boho or Preppy?"
4. PREFERENCE VS PREFERENCE — "Hot coffee or Iced coffee?", "Beach or Mountains?", "Gold or Silver jewelry?"
5. DRILL-DOWN — hierarchical refinements like "Nike Running or Nike Lifestyle?", "Northern Italian or Southern Italian?"

RULES:
- Every option should be SPECIFIC AND CONCRETE. Never vague. "Zara" not "affordable fashion brand".
- Option labels: 1-4 words max. Short and punchy.
- Prompts: casual and conversational. "Which do you prefer?", "Which brand do you reach for?", "Hot or iced?"
- Mix categories — spread across clothes, food, household, beverages, travel, entertainment, health, gifts, personal.
- Cover EVERYDAY practical items too: toilet paper, shampoo, toothpaste, cleaning products, water bottles, phone brands, streaming services.
- Do NOT repeat any question that already exists in the bank.
- Include brandA/brandB (the actual brand name, lowercase) when the option IS a specific brand. Use empty string "" for vibes/styles/preferences.
- Include tagsA/tagsB with 3-5 lowercase descriptor keywords per option.
- Generate EXACTLY ${count} questions.
- Make IDs unique: ai-{category}-{slug}-{random4digits}

EXISTING QUESTIONS IN BANK (do NOT repeat these or similar matchups):
${existingPrompts.join("\n")}`;

    const result = await callGeminiWithTool<{ questions: AiQuestion[] }>(
      MODELS.FLASH,
      [
        {
          role: "user",
          content: `Generate ${count} new brand-vs-brand tournament questions for the shared question bank. Mix across all categories. Make them specific, brand-focused, and useful for building preference hierarchies.`,
        },
      ],
      toolDef,
      systemPrompt,
    );

    if (!result?.questions || !Array.isArray(result.questions)) {
      throw new Error("AI returned invalid response");
    }

    // ── 4. Validate, deduplicate, and INSERT into shared bank ──
    const validQuestions = result.questions.filter(
      (q) =>
        q.id &&
        q.prompt &&
        q.categoryA &&
        q.categoryB &&
        q.category &&
        CATEGORIES.includes(q.category as CategorySlug) &&
        !existingKeys.has(q.id), // skip if ID already exists
    );

    let inserted = 0;

    for (const q of validQuestions) {
      const catMeta = CATEGORY_META[q.category as CategorySlug];
      if (!catMeta) continue;

      // Insert into this_or_that_v2_questions
      const { data: questionRow, error: qError } = await admin
        .from("this_or_that_v2_questions")
        .insert({
          question_key: q.id,
          prompt: q.prompt,
          category_key: q.category,
          subgroup_key: catMeta.subcategory,
          recommendation_category: catMeta.recommendation_category,
          answer_type: "this_or_that_v2",
          selection_mode: "single",
          metadata: {
            source: "ai-generated",
            brandA: q.brandA || null,
            brandB: q.brandB || null,
          },
          is_active: true,
          sort_order: currentBankSize + inserted,
          source_version: "this-or-that-v2-ai",
        })
        .select("id")
        .single();

      if (qError) {
        console.warn(`Failed to insert question ${q.id}:`, qError.message);
        continue;
      }

      const questionUuid = questionRow.id;

      // Insert option A
      const { error: optAError } = await admin
        .from("this_or_that_v2_options")
        .insert({
          question_id: questionUuid,
          option_key: "A",
          option_label: q.categoryA,
          category_key: q.category,
          subgroup_key: catMeta.subcategory,
          recommendation_category: catMeta.recommendation_category,
          entity_type: catMeta.entity_type,
          entity_key: slugify(q.categoryA),
          entity_label: q.categoryA,
          primary_keyword: q.brandA || slugify(q.categoryA),
          descriptor_keywords: Array.isArray(q.tagsA) ? q.tagsA : [],
          brand: q.brandA || null,
          tags: Array.isArray(q.tagsA) ? q.tagsA : [],
          signal_tags: q.brandA ? [q.brandA, ...q.tagsA] : q.tagsA,
          preference_polarity: "positive",
          metadata: {
            brand_keywords: q.brandA ? [q.brandA] : [],
            entity_kind: catMeta.entity_type,
            category_slug: q.category,
            subcategory_slug: catMeta.subcategory,
          },
          is_active: true,
          sort_order: 0,
          source_version: "this-or-that-v2-ai",
        });

      if (optAError) {
        console.warn(`Failed to insert option A for ${q.id}:`, optAError.message);
      }

      // Insert option B
      const { error: optBError } = await admin
        .from("this_or_that_v2_options")
        .insert({
          question_id: questionUuid,
          option_key: "B",
          option_label: q.categoryB,
          category_key: q.category,
          subgroup_key: catMeta.subcategory,
          recommendation_category: catMeta.recommendation_category,
          entity_type: catMeta.entity_type,
          entity_key: slugify(q.categoryB),
          entity_label: q.categoryB,
          primary_keyword: q.brandB || slugify(q.categoryB),
          descriptor_keywords: Array.isArray(q.tagsB) ? q.tagsB : [],
          brand: q.brandB || null,
          tags: Array.isArray(q.tagsB) ? q.tagsB : [],
          signal_tags: q.brandB ? [q.brandB, ...q.tagsB] : q.tagsB,
          preference_polarity: "positive",
          metadata: {
            brand_keywords: q.brandB ? [q.brandB] : [],
            entity_kind: catMeta.entity_type,
            category_slug: q.category,
            subcategory_slug: catMeta.subcategory,
          },
          is_active: true,
          sort_order: 1,
          source_version: "this-or-that-v2-ai",
        });

      if (optBError) {
        console.warn(`Failed to insert option B for ${q.id}:`, optBError.message);
      }

      inserted++;
    }

    return jsonResponse({
      generated: inserted,
      bank_size: currentBankSize + inserted,
      message: inserted > 0
        ? `Generated ${inserted} new questions for the shared bank`
        : "AI generated questions but all were duplicates",
    });
  } catch (error) {
    console.error("this-or-that-ai error:", error);
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500,
    );
  }
});
