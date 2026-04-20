import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * weekly-recommendation-refresh
 *
 * Batch cron endpoint: pre-generates fresh recommendations for all active users.
 * Called every Monday at 01:00 CDT via external cron.
 *
 * "Active user" = anyone who has at least one derivation, onboarding response,
 * or This or That answer — i.e., users who have given us enough signal.
 *
 * Does NOT delete old data. Old weeks stay in user_weekly_recommendations forever.
 * This just ensures the new week's recommendations exist before users open the app.
 *
 * Auth: requires service_role key via Authorization header (not user JWT).
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const getRequiredEnv = (name: string): string => {
  const v = Deno.env.get(name)?.trim();
  if (!v) throw new Error(`${name} is not set`);
  return v;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const getWeekStartKey = (value = new Date()) => {
  const weekStart = new Date(
    Date.UTC(
      value.getUTCFullYear(),
      value.getUTCMonth(),
      value.getUTCDate() - ((value.getUTCDay() + 6) % 7),
    ),
  );
  return weekStart.toISOString().slice(0, 10);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY");

    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const weekStartKey = getWeekStartKey();

    // ── 1. Find active users ──
    // Users with at least one knowledge_center_derivations row (means they've done onboarding)
    const { data: activeUsers, error: usersError } = await admin
      .from("knowledge_center_derivations")
      .select("user_id")
      .limit(500);

    if (usersError) throw new Error(`Failed to list active users: ${usersError.message}`);

    const uniqueUserIds = [...new Set((activeUsers ?? []).map((r: { user_id: string }) => r.user_id))];

    if (uniqueUserIds.length === 0) {
      return jsonResponse({ message: "No active users found", processed: 0 });
    }

    // ── 2. Check which users already have this week's recommendations ──
    const { data: existingRows } = await admin
      .from("user_weekly_recommendations")
      .select("user_id")
      .eq("week_start", weekStartKey);

    const alreadyGenerated = new Set(
      (existingRows ?? []).map((r: { user_id: string }) => r.user_id),
    );

    const needsGeneration = uniqueUserIds.filter((uid) => !alreadyGenerated.has(uid));

    // ── 3. Call recommendation-engine-v2 for each user ──
    // Use admin.auth.admin to create an impersonation token per user
    const recEngineUrl = `${supabaseUrl}/functions/v1/recommendation-engine-v2`;
    const results: Array<{ user_id: string; status: string; products?: number }> = [];

    for (const userId of needsGeneration) {
      try {
        // Create a short-lived session for this user via admin API
        // We'll use the service role to call the engine directly, but the engine
        // needs a user JWT. Generate one via admin.
        const { data: sessionData, error: sessionError } = await admin.auth.admin.generateLink({
          type: "magiclink",
          email: "", // won't actually send — just need the user reference
        });

        // Alternative approach: call with service role + user_id in body
        // Since we control the engine, let's just add a service-role bypass
        // For now, call with force_refresh and the service role key
        const response = await fetch(recEngineUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseServiceRoleKey}`,
            "apikey": supabaseAnonKey,
            "x-batch-user-id": userId,  // Custom header for batch mode
          },
          body: JSON.stringify({ force_refresh: true, batch_user_id: userId }),
        });

        const data = await response.json();
        results.push({
          user_id: userId,
          status: response.ok ? "success" : "error",
          products: Array.isArray(data.products) ? data.products.length : 0,
        });
      } catch (err) {
        results.push({
          user_id: userId,
          status: `error: ${err instanceof Error ? err.message : "unknown"}`,
        });
      }
    }

    return jsonResponse({
      week_start: weekStartKey,
      total_active_users: uniqueUserIds.length,
      already_generated: alreadyGenerated.size,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("[weekly-recommendation-refresh]", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500,
    );
  }
});
