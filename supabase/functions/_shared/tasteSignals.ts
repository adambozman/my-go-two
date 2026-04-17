/**
 * tasteSignals.ts — Shared helper for reading/writing user taste signals
 *
 * Any edge function can import this to contribute signals or read the profile.
 * The taste signal bank is the single source of truth for "what does this user like?"
 *
 * Usage:
 *   import { writeTasteSignal, writeTasteSignals, readTasteProfile } from "../_shared/tasteSignals.ts";
 *
 *   // Write a single signal
 *   await writeTasteSignal(adminClient, userId, {
 *     type: "brand", key: "nike", polarity: "positive", category: "clothes", source: "saved_product"
 *   });
 *
 *   // Write multiple signals at once
 *   await writeTasteSignals(adminClient, userId, [
 *     { type: "brand", key: "nike", polarity: "positive", category: "clothes", source: "this_or_that" },
 *     { type: "keyword", key: "running", polarity: "positive", category: "clothes", source: "this_or_that" },
 *   ]);
 *
 *   // Read full taste profile for AI prompt building
 *   const profile = await readTasteProfile(adminClient, userId);
 */

import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface TasteSignalInput {
  type: string;      // brand | keyword | style | vibe | category | product
  key: string;       // lowercase normalized, e.g. "nike", "streetwear"
  polarity?: "positive" | "negative";
  category?: string; // top-level: clothes, personal, dining, etc.
  source: string;    // this_or_that | onboarding | quiz | saved_product | chat
  metadata?: Record<string, unknown>;
}

export interface TasteProfileEntry {
  key: string;
  strength: number;
  category: string | null;
}

export interface TasteProfileGroup {
  signal_type: string;
  polarity: string;
  signals: TasteProfileEntry[];
}

/**
 * Write a single taste signal via the DB upsert function.
 * If the signal already exists, its strength is incremented.
 */
export async function writeTasteSignal(
  adminClient: SupabaseClient,
  userId: string,
  signal: TasteSignalInput,
): Promise<void> {
  const { error } = await adminClient.rpc("upsert_taste_signal", {
    p_user_id: userId,
    p_signal_type: signal.type,
    p_signal_key: signal.key.toLowerCase().trim(),
    p_polarity: signal.polarity ?? "positive",
    p_category: signal.category ?? null,
    p_source: signal.source,
    p_metadata: signal.metadata ?? {},
  });
  if (error) {
    console.warn(`Failed to write taste signal ${signal.type}:${signal.key}:`, error.message);
  }
}

/**
 * Write multiple taste signals in sequence.
 * Each signal that already exists gets its strength incremented.
 */
export async function writeTasteSignals(
  adminClient: SupabaseClient,
  userId: string,
  signals: TasteSignalInput[],
): Promise<{ written: number; failed: number }> {
  let written = 0;
  let failed = 0;
  for (const signal of signals) {
    try {
      await writeTasteSignal(adminClient, userId, signal);
      written++;
    } catch {
      failed++;
    }
  }
  return { written, failed };
}

/**
 * Read the user's full taste profile grouped by signal type and polarity.
 * Returns the same format as the get_user_taste_summary DB function.
 */
export async function readTasteProfile(
  adminClient: SupabaseClient,
  userId: string,
  minStrength = 1,
): Promise<TasteProfileGroup[]> {
  const { data, error } = await adminClient.rpc("get_user_taste_summary", {
    p_user_id: userId,
    p_min_strength: minStrength,
  });
  if (error) {
    console.warn("Failed to read taste profile:", error.message);
    return [];
  }
  return (data as TasteProfileGroup[] | null) ?? [];
}

/**
 * Build a text summary of the taste profile for AI prompts.
 * Returns a human-readable block that can be injected into any system prompt.
 */
export function buildTasteProfileText(groups: TasteProfileGroup[]): string {
  if (groups.length === 0) {
    return "NEW USER — no taste data yet.";
  }

  const lines: string[] = [];
  for (const group of groups) {
    const label = `${group.polarity === "positive" ? "LIKES" : "DISLIKES"} (${group.signal_type})`;
    const items = group.signals
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 20)
      .map((s) => `${s.key}${s.strength > 1 ? ` (×${s.strength})` : ""}${s.category ? ` [${s.category}]` : ""}`)
      .join(", ");
    lines.push(`${label}: ${items}`);
  }
  return lines.join("\n");
}

/**
 * Extract taste signals from a saved product card.
 * Call this whenever a user saves a product.
 */
export function extractSignalsFromSavedProduct(
  productCard: Record<string, unknown>,
): TasteSignalInput[] {
  const signals: TasteSignalInput[] = [];
  const category = (productCard.subcategory_label as string)?.toLowerCase() ?? null;

  // Brand
  const brand = (productCard.brand as string)?.toLowerCase()?.trim();
  if (brand) {
    signals.push({ type: "brand", key: brand, polarity: "positive", category: category ?? undefined, source: "saved_product" });
  }

  // Title keywords
  const title = (productCard.card_title as string)?.toLowerCase() ?? "";
  const titleWords = title.split(/\s+/).filter((w) => w.length > 3);
  for (const word of titleWords.slice(0, 3)) {
    signals.push({ type: "keyword", key: word, polarity: "positive", category: category ?? undefined, source: "saved_product" });
  }

  // Field values
  const fieldValues = productCard.field_values as Record<string, unknown> | null;
  if (fieldValues) {
    for (const [_key, val] of Object.entries(fieldValues)) {
      if (typeof val === "string" && val.length > 2 && val.length < 50) {
        signals.push({ type: "keyword", key: val.toLowerCase().trim(), polarity: "positive", category: category ?? undefined, source: "saved_product" });
      }
    }
  }

  return signals;
}
