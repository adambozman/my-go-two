import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { fetchKnowledgeCenterState, getCombinedKnowledgeResponses } from "../_shared/knowledgeCenter.ts";
import { generateYourVibeDerivation, upsertYourVibeDerivation } from "../_shared/generateYourVibeDerivation.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const toRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const toResponseRows = (userId: string, input: Record<string, unknown>) =>
  Object.entries(input).map(([questionKey, responseValue]) => ({
    user_id: userId,
    question_key: questionKey,
    response_value: responseValue,
    updated_at: new Date().toISOString(),
  }));

type ResponseTable = {
  upsert: (
    values: Array<Record<string, unknown>>,
    options: { onConflict: string },
  ) => Promise<{ error: unknown }>;
};

type ResponseWriterClient = {
  from: (table: "onboarding_responses" | "know_me_responses") => ResponseTable;
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

    const body = await req.json().catch(() => ({}));
    const onboardingResponses = toRecord(body.onboardingResponses);
    const knowMeResponses = toRecord(body.knowMeResponses);
    const responseWriter = supabase as unknown as ResponseWriterClient;

    if (Object.keys(onboardingResponses).length > 0) {
      const { error } = await responseWriter
        .from("onboarding_responses")
        .upsert(toResponseRows(user.id, onboardingResponses), {
          onConflict: "user_id,question_key",
        });
      if (error) throw error;
    }

    if (Object.keys(knowMeResponses).length > 0) {
      const { error } = await responseWriter
        .from("know_me_responses")
        .upsert(toResponseRows(user.id, knowMeResponses), {
          onConflict: "user_id,question_key",
        });
      if (error) throw error;
    }

    const knowledgeState = await fetchKnowledgeCenterState(supabase, user.id);
    const combinedResponses = getCombinedKnowledgeResponses(knowledgeState.snapshot);
    const yourVibe = await generateYourVibeDerivation(combinedResponses);

    await upsertYourVibeDerivation(
      supabase,
      user.id,
      yourVibe,
      knowledgeState.snapshot?.snapshot_payload ?? null,
    );

    const refreshedState = await fetchKnowledgeCenterState(supabase, user.id);

    return new Response(
      JSON.stringify({
        snapshot: refreshedState.snapshot,
        derivations: refreshedState.derivations,
        refreshed_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("knowledge-center-refresh error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

// Codebase classification: runtime knowledge-center refresh edge function.
