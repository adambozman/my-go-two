/**
 * Single-flight session refresh lock.
 *
 * Multiple callers (subscription check, recommendation fetch, foreground
 * resume, etc.) may all discover an expired token at the same instant and
 * each independently call `supabase.auth.refreshSession()`.  Supabase uses
 * refresh-token rotation, so the *first* refresh succeeds and revokes the
 * old token — every subsequent concurrent refresh using the same old token
 * then fails.  Under load this cascades into a 429 rate-limit from the
 * Supabase Auth API, which destroys the session entirely.
 *
 * This module exports a thin lock: `refreshSessionOnce(supabase)`.
 * The first caller starts the refresh; all concurrent callers receive the
 * same promise.  The lock resets after the promise settles (success or
 * failure) so the next call after settlement can try again.
 */

import type { SupabaseClient, AuthResponse } from "@supabase/supabase-js";

let inflightRefresh: Promise<AuthResponse["data"]> | null = null;

export async function refreshSessionOnce(
  supabase: SupabaseClient,
): Promise<AuthResponse["data"]> {
  if (inflightRefresh) {
    // Another caller is already refreshing — piggy-back on that.
    return inflightRefresh;
  }

  inflightRefresh = (async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data;
    } finally {
      // Allow future calls after this one settles.
      inflightRefresh = null;
    }
  })();

  return inflightRefresh;
}
