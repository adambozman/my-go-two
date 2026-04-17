/**
 * thisOrThatV2Bank.ts — Shared question bank loader
 *
 * PATTERN: AI generates questions → saves to DB → all users pull from this shared bank.
 * Same pattern as recommendation_product_bank.
 *
 * - Loads questions from `this_or_that_v2_questions` + `this_or_that_v2_options`
 * - Merges with static fallback from `thisOrThatV2Authored.ts` (the 85 seed questions)
 * - Deduplicates by question_key / question_id
 * - Triggers bank growth (calls this-or-that-ai) when bank is below threshold
 */

import { supabase } from "@/integrations/supabase/client";
import {
  buildThisOrThatV2RuntimeQuestionBank,
  type ThisOrThatV2QuestionLike,
} from "./thisOrThatV2";

// ── Types ──

export interface BankQuestion extends ThisOrThatV2QuestionLike {
  /** "authored" = from static file, "ai" = from DB (AI-generated) */
  source: "authored" | "ai";
  /** DB UUID if from DB, null if static */
  dbQuestionId: string | null;
  /** DB UUID for option A if from DB */
  dbOptionAId: string | null;
  /** DB UUID for option B if from DB */
  dbOptionBId: string | null;
  /** category_key from DB */
  categoryKey: string | null;
  /** brand for option A */
  brandA: string;
  /** brand for option B */
  brandB: string;
}

interface DbQuestion {
  id: string;
  question_key: string;
  prompt: string;
  category_key: string;
  subgroup_key: string | null;
  recommendation_category: string | null;
  metadata: Record<string, unknown>;
  is_active: boolean;
}

interface DbOption {
  id: string;
  question_id: string;
  option_key: string;
  option_label: string;
  category_key: string | null;
  descriptor_keywords: string[];
  brand: string | null;
  entity_key: string | null;
  primary_keyword: string | null;
  tags: string[];
  is_active: boolean;
}

// ── Cache ──

let _cachedBank: BankQuestion[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// ── Bank growth trigger ──

let _growthInFlight = false;

/**
 * Trigger bank growth by calling the this-or-that-ai edge function.
 * Fire-and-forget — does not block the UI.
 */
async function triggerBankGrowth(): Promise<void> {
  if (_growthInFlight) return;
  _growthInFlight = true;

  try {
    const { error } = await supabase.functions.invoke("this-or-that-ai", {
      body: {},
    });
    if (error) {
      console.warn("[thisOrThatV2Bank] Bank growth trigger failed:", error);
    } else {
      // Invalidate cache so next load picks up new questions
      _cachedBank = null;
      _cacheTimestamp = 0;
    }
  } catch (err) {
    console.warn("[thisOrThatV2Bank] Bank growth trigger error:", err);
  } finally {
    _growthInFlight = false;
  }
}

// ── Main loader ──

/**
 * Load the full question bank: DB (AI-generated) + static (authored) merged.
 * Returns a flat array of BankQuestion, deduplicated.
 *
 * Uses a 5-minute in-memory cache to avoid hammering the DB.
 */
export async function loadQuestionBank(): Promise<BankQuestion[]> {
  const now = Date.now();
  if (_cachedBank && now - _cacheTimestamp < CACHE_TTL_MS) {
    return _cachedBank;
  }

  // 1. Load static questions as base
  const staticBank = buildStaticBankQuestions();
  const seenIds = new Set(staticBank.map((q) => q.id));

  // 2. Load DB questions
  let dbQuestions: BankQuestion[] = [];
  try {
    const { data: questions, error: qError } = await supabase
      .from("this_or_that_v2_questions" as "profiles")
      .select("id, question_key, prompt, category_key, subgroup_key, recommendation_category, metadata, is_active")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (qError) {
      console.warn("[thisOrThatV2Bank] Failed to load DB questions:", qError);
    } else if (questions && questions.length > 0) {
      // Load all options in one go
      const questionIds = questions.map((q: DbQuestion) => q.id);
      const { data: options, error: oError } = await supabase
        .from("this_or_that_v2_options" as "profiles")
        .select("id, question_id, option_key, option_label, category_key, descriptor_keywords, brand, entity_key, primary_keyword, tags, is_active")
        .in("question_id", questionIds)
        .eq("is_active", true);

      if (oError) {
        console.warn("[thisOrThatV2Bank] Failed to load DB options:", oError);
      }

      // Group options by question_id
      const optionsByQuestion = new Map<string, DbOption[]>();
      for (const opt of (options ?? []) as DbOption[]) {
        const existing = optionsByQuestion.get(opt.question_id) ?? [];
        existing.push(opt);
        optionsByQuestion.set(opt.question_id, existing);
      }

      // Build BankQuestion from each DB row
      for (const q of questions as DbQuestion[]) {
        if (seenIds.has(q.question_key)) continue; // skip if static already has it

        const opts = optionsByQuestion.get(q.id) ?? [];
        const optA = opts.find((o) => o.option_key === "A");
        const optB = opts.find((o) => o.option_key === "B");

        if (!optA || !optB) continue; // need both options

        dbQuestions.push({
          id: q.question_key,
          prompt: q.prompt,
          categoryA: optA.option_label,
          categoryB: optB.option_label,
          tagsForA: optA.descriptor_keywords ?? [],
          tagsForB: optB.descriptor_keywords ?? [],
          source: "ai",
          dbQuestionId: q.id,
          dbOptionAId: optA.id,
          dbOptionBId: optB.id,
          categoryKey: q.category_key,
          brandA: optA.brand ?? "",
          brandB: optB.brand ?? "",
        });

        seenIds.add(q.question_key);
      }
    }
  } catch (err) {
    console.warn("[thisOrThatV2Bank] DB load error:", err);
  }

  // 3. Merge: static first, then DB (AI-generated)
  const merged = [...staticBank, ...dbQuestions];

  // 4. Cache it
  _cachedBank = merged;
  _cacheTimestamp = now;

  // 5. If bank is below threshold, trigger growth (fire-and-forget)
  const BANK_MIN_THRESHOLD = 120;
  if (merged.length < BANK_MIN_THRESHOLD) {
    void triggerBankGrowth();
  }

  return merged;
}

/**
 * Force-refresh the cache (e.g. after answering a batch of questions).
 */
export function invalidateBankCache(): void {
  _cachedBank = null;
  _cacheTimestamp = 0;
}

// ── Static question adapter ──

function buildStaticBankQuestions(): BankQuestion[] {
  const bank = buildThisOrThatV2RuntimeQuestionBank();
  const result: BankQuestion[] = [];

  for (const [_categoryId, questions] of Object.entries(bank)) {
    for (const q of questions) {
      result.push({
        id: q.id,
        prompt: q.prompt,
        categoryA: q.categoryA,
        categoryB: q.categoryB,
        tagsForA: q.tagsForA,
        tagsForB: q.tagsForB,
        source: "authored",
        dbQuestionId: null,
        dbOptionAId: null,
        dbOptionBId: null,
        categoryKey: q.category_slug,
        brandA: "",
        brandB: "",
      });
    }
  }

  return result;
}
