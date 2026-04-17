import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callGeminiWithTool, MODELS } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * this-or-that-ai — INTELLIGENT question server + generator
 *
 * FLOW:
 * 1. Read user's taste signals (the per-user signal bank)
 * 2. Match existing shared bank questions to user signals (DB-side scoring)
 * 3. If enough relevant matches → return them, no AI call
 * 4. If user has signals but few matches → call Gemini with taste profile
 *    to generate NEW questions seeded by their tastes → save to shared bank
 * 5. If brand new user → generate mainstream starter matchups
 *
 * The frontend calls this to get its next batch of questions.
 * Questions come back RANKED by relevance to the user.
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
  description: "Generate brand-vs-brand This or That tournament questions personalized to the user's taste profile",
  parameters: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        description: "Array of This or That matchup questions",
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "Unique question ID, format: ai-{category}-{short-slug}-{random4digits}" },
            prompt: { type: "string", description: "The matchup question, e.g. 'Which brand do you prefer?'" },
            categoryA: { type: "string", description: "Option A label — specific brand, product, or preference (1-4 words)" },
            categoryB: { type: "string", description: "Option B label — specific brand, product, or preference (1-4 words)" },
            category: { type: "string", description: "Top-level category", enum: [...CATEGORIES] },
            brandA: { type: "string", description: "Brand name for option A (lowercase), empty string if not a brand" },
            brandB: { type: "string", description: "Brand name for option B (lowercase), empty string if not a brand" },
            tagsA: { type: "array", items: { type: "string" }, description: "3-5 descriptor keywords for option A (lowercase)" },
            tagsB: { type: "array", items: { type: "string" }, description: "3-5 descriptor keywords for option B (lowercase)" },
          },
          required: ["id", "prompt", "categoryA", "categoryB", "category", "brandA", "brandB", "tagsA", "tagsB"],
        },
      },
    },
    required: ["questions"],
  },
};

type AiQuestion = {
  id: string; prompt: string; categoryA: string; categoryB: string;
  category: string; brandA: string; brandB: string; tagsA: string[]; tagsB: string[];
};

type TasteSignalGroup = {
  signal_type: string;
  polarity: string;
  signals: Array<{ key: string; strength: number; category: string | null }>;
};

type MatchedQuestion = {
  question_id: string;
  question_key: string;
  relevance_score: number;
};

const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const getRequiredEnv = (name: string): string => {
  const v = Deno.env.get(name)?.trim();
  if (!v) throw new Error(`${name} is not set`);
  return v;
};
const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

// How many questions the frontend wants per batch
const SERVE_BATCH = 10;
// Minimum relevant matches before we skip AI generation
const MATCH_THRESHOLD = 5;
// How many to generate if we need to call AI
const GENERATE_BATCH_SIZE = 10;

// ── Build taste profile text block for Gemini prompt ──

function buildTasteProfileBlock(tasteGroups: TasteSignalGroup[]): string {
  if (tasteGroups.length === 0) {
    return "NEW USER — no preferences yet. Generate popular, mainstream brand matchups that everyone has an opinion on.";
  }

  const lines: string[] = [];

  for (const group of tasteGroups) {
    const label = `${group.polarity === "positive" ? "LIKES" : "DISLIKES"} (${group.signal_type})`;
    const items = group.signals
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 15)
      .map((s) => `${s.key}${s.strength > 1 ? ` (×${s.strength})` : ""}${s.category ? ` [${s.category}]` : ""}`)
      .join(", ");
    lines.push(`${label}: ${items}`);
  }

  return lines.join("\n");
}

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

    // Auth check
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    // Service-role client for writing to shared bank + reading taste signals
    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    // ── 1. Read user's taste profile ──
    const { data: tasteRows, error: tasteError } = await admin
      .rpc("get_user_taste_summary", { p_user_id: user.id });
    if (tasteError) console.warn("Taste summary error (non-fatal):", tasteError.message);
    const tasteGroups: TasteSignalGroup[] = (tasteRows as TasteSignalGroup[] | null) ?? [];

    const hasSignals = tasteGroups.length > 0;
    const positiveSignalCount = tasteGroups
      .filter((g) => g.polarity === "positive")
      .reduce((sum, g) => sum + (g.signals?.length ?? 0), 0);

    // ── 2. Try to match existing bank questions to user ──
    let matchedQuestions: MatchedQuestion[] = [];
    if (hasSignals) {
      const { data: matchRows, error: matchError } = await admin
        .rpc("match_questions_to_user", {
          p_user_id: user.id,
          p_limit: SERVE_BATCH + 5, // fetch a few extra for variety
        });
      if (matchError) console.warn("Match error (non-fatal):", matchError.message);
      matchedQuestions = (matchRows as MatchedQuestion[] | null) ?? [];
    }

    // ── 3. If enough relevant matches, serve them — no AI needed ──
    if (matchedQuestions.length >= MATCH_THRESHOLD) {
      // Also grab some random unmatched questions to mix in for exploration
      const matchedKeys = matchedQuestions.map((m) => m.question_key);
      const { data: randomRows } = await admin
        .from("this_or_that_v2_questions")
        .select("id, question_key")
        .eq("is_active", true)
        .not("question_key", "in", `(${matchedKeys.join(",")})`)
        .limit(3);

      // Interleave: ~70% matched, ~30% exploration
      const serveList = matchedQuestions.slice(0, 7).map((m) => m.question_key);
      if (randomRows) {
        for (const r of randomRows) {
          if (!serveList.includes(r.question_key)) serveList.push(r.question_key);
        }
      }

      return jsonResponse({
        mode: "matched",
        question_keys: serveList.slice(0, SERVE_BATCH),
        matched_count: matchedQuestions.length,
        signal_count: positiveSignalCount,
        generated: 0,
        message: `Served ${serveList.length} questions (${matchedQuestions.length} matched to taste profile)`,
      });
    }

    // ── 4. Not enough matches — generate new questions with AI ──

    // Load existing question keys to avoid duplicates
    const { data: existingQuestions, error: existingError } = await admin
      .from("this_or_that_v2_questions")
      .select("question_key, prompt")
      .eq("is_active", true);
    if (existingError) throw existingError;

    const existingKeys = new Set((existingQuestions ?? []).map((q: { question_key: string }) => q.question_key));
    const existingPrompts = (existingQuestions ?? []).map((q: { prompt: string }) => q.prompt).slice(-30);

    // Build taste profile for Gemini
    const tasteProfileBlock = buildTasteProfileBlock(tasteGroups);

    const count = GENERATE_BATCH_SIZE;
    const systemPrompt = `You are the This or That question engine for GoTwo, a preference-learning app that builds ranked brand hierarchies per user — data sold to companies.

YOUR MISSION: Generate ${count} brand-vs-brand, product-vs-product, or concrete-preference tournament matchups. These must be RELEVANT to the user's taste profile.

═══════════════════════════════════════
USER TASTE PROFILE
═══════════════════════════════════════
${tasteProfileBlock}

HOW TO USE THE PROFILE:
- LIKES with high strength (×2, ×3) = strong signal. Generate drill-down questions around those brands/vibes.
- If they like Nike, generate Nike vs Adidas, Nike Running vs Nike Basketball, etc.
- If they like "deal_hunter" + "mid-range", pair mid-range brands not luxury ones.
- If they DISLIKE a brand, NEVER put it as an option. Find competitors of what they LIKE instead.
- Cover categories they haven't engaged with yet — broaden the profile.
- Always push toward HIERARCHY — "you chose Nike, now Nike Running or Nike Lifestyle?"
- For new users: generate popular mainstream matchups everyone has an opinion on.

QUESTION TYPES (mix these):
1. BRAND VS BRAND — "Nike or Adidas?", "Target or Amazon?"
2. PRODUCT VS PRODUCT — "AirPods or Galaxy Buds?", "Yeti or Stanley?"
3. STYLE VS STYLE — "Streetwear or Minimalist?", "Boho or Preppy?"
4. PREFERENCE VS PREFERENCE — "Hot coffee or Iced coffee?", "Beach or Mountains?"
5. DRILL-DOWN — "Nike Running or Nike Lifestyle?", "Northern Italian or Southern Italian?"

RULES:
- Every option SPECIFIC AND CONCRETE. "Zara" not "affordable fashion brand".
- Option labels: 1-4 words max. Short and punchy.
- Prompts: casual. "Which do you prefer?", "Which brand do you reach for?"
- Mix categories — don't only generate for categories they've already answered
- Do NOT repeat questions already in the bank
- Include brandA/brandB when the option IS a brand. Empty string for vibes/styles.
- Include tagsA/tagsB with 3-5 lowercase descriptors per option. THESE ARE CRITICAL — they are how future users get matched to this question.
- Generate EXACTLY ${count} questions.
- IDs: ai-{category}-{slug}-{random4digits}

EXISTING QUESTIONS (do NOT repeat):
${existingPrompts.join("\n")}`;

    const result = await callGeminiWithTool<{ questions: AiQuestion[] }>(
      MODELS.FLASH,
      [{ role: "user", content: `Generate ${count} personalized brand-vs-brand tournament questions based on the user's taste profile.` }],
      toolDef,
      systemPrompt,
    );

    if (!result?.questions || !Array.isArray(result.questions)) {
      throw new Error("AI returned invalid response");
    }

    // ── 5. Validate, deduplicate, INSERT into shared bank ──
    const validQuestions = result.questions.filter(
      (q) => q.id && q.prompt && q.categoryA && q.categoryB && q.category
        && CATEGORIES.includes(q.category as CategorySlug)
        && !existingKeys.has(q.id),
    );

    const currentBankSize = existingKeys.size;
    let inserted = 0;
    const insertedKeys: string[] = [];

    for (const q of validQuestions) {
      const catMeta = CATEGORY_META[q.category as CategorySlug];
      if (!catMeta) continue;

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
          metadata: { source: "ai-generated", brandA: q.brandA || null, brandB: q.brandB || null, seeded_by: user.id },
          is_active: true,
          sort_order: currentBankSize + inserted,
          source_version: "this-or-that-v2-ai",
        })
        .select("id")
        .single();

      if (qError) { console.warn(`Failed to insert question ${q.id}:`, qError.message); continue; }
      const questionUuid = questionRow.id;

      // Insert options A and B
      for (const [optKey, label, brand, tags] of [
        ["A", q.categoryA, q.brandA, q.tagsA] as const,
        ["B", q.categoryB, q.brandB, q.tagsB] as const,
      ]) {
        const { error: optError } = await admin
          .from("this_or_that_v2_options")
          .insert({
            question_id: questionUuid,
            option_key: optKey,
            option_label: label,
            category_key: q.category,
            subgroup_key: catMeta.subcategory,
            recommendation_category: catMeta.recommendation_category,
            entity_type: catMeta.entity_type,
            entity_key: slugify(label),
            entity_label: label,
            primary_keyword: brand || slugify(label),
            descriptor_keywords: Array.isArray(tags) ? tags : [],
            brand: brand || null,
            tags: Array.isArray(tags) ? tags : [],
            signal_tags: brand ? [brand, ...tags] : tags,
            preference_polarity: "positive",
            metadata: {
              brand_keywords: brand ? [brand] : [],
              entity_kind: catMeta.entity_type,
              category_slug: q.category,
              subcategory_slug: catMeta.subcategory,
            },
            is_active: true,
            sort_order: optKey === "A" ? 0 : 1,
            source_version: "this-or-that-v2-ai",
          });
        if (optError) console.warn(`Failed to insert option ${optKey} for ${q.id}:`, optError.message);
      }

      inserted++;
      insertedKeys.push(q.id);
    }

    // ── 6. Build serve list: newly generated + any matched ──
    const serveList = [
      ...insertedKeys,
      ...matchedQuestions.map((m) => m.question_key),
    ].slice(0, SERVE_BATCH);

    return jsonResponse({
      mode: hasSignals ? "personalized_generation" : "starter_generation",
      question_keys: serveList,
      generated: inserted,
      matched_count: matchedQuestions.length,
      signal_count: positiveSignalCount,
      bank_size: currentBankSize + inserted,
      message: inserted > 0
        ? `Generated ${inserted} questions seeded by taste profile (${positiveSignalCount} signals)`
        : "AI generated questions but all were duplicates",
    });
  } catch (error) {
    console.error("this-or-that-ai error:", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});
