/**
 * Single source of truth for gender typing and normalization across the entire app.
 *
 * The app uses three photo banks: male, female, neutral.
 * Every gender value — from signup, DB, realtime, or onboarding — must pass
 * through normalizeGender() before being stored or used.
 */

export type Gender = "male" | "female" | "neutral";

/**
 * Normalize any raw gender string into one of three canonical values.
 * - "male" → "male"
 * - "female" → "female"
 * - everything else (non-binary, prefer-not, null, undefined, neutral, unknown) → "neutral"
 */
export function normalizeGender(raw: string | null | undefined): Gender {
  const value = (raw ?? "").toLowerCase().trim();
  if (value === "male") return "male";
  if (value === "female") return "female";
  return "neutral";
}
