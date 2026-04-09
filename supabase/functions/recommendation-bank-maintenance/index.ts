import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type User } from "https://esm.sh/@supabase/supabase-js@2";
import { getExactProductImageReadiness } from "../_shared/exactProductScraper.ts";
import { reassessProductBankRow } from "../_shared/recommendationProductBank.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEV_USER_IDS = new Set(["e78cff1c-54e3-4365-b172-461b7b6f25e6"]);

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "Not signed in" }, 401);

    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const user: User | null = authData?.user ?? null;
    if (authError || !user) return jsonResponse({ error: "Session expired" }, 401);
    if (!DEV_USER_IDS.has(user.id)) return jsonResponse({ error: "Forbidden" }, 403);

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const limit = Math.max(1, Math.min(Number(body?.limit) || 25, 100));

    const { data: rows, error } = await admin
      .from("recommendation_product_bank")
      .select("id, primary_keyword, descriptor_keywords, keyword_signature, category, brand, product_title, product_url, product_image_url, product_price_text, bank_state, exact_match_confirmed")
      .order("updated_at", { ascending: true })
      .limit(limit);

    if (error) throw error;

    const results = [];

    for (const row of rows ?? []) {
      const verification = await getExactProductImageReadiness(
        row.product_image_url,
        row.product_title,
        row.brand,
      );
      const reassessment = reassessProductBankRow(
        {
          id: row.id,
          primary_keyword: row.primary_keyword,
          descriptor_keywords: row.descriptor_keywords ?? [],
          keyword_signature: row.keyword_signature,
          category: row.category,
          brand: row.brand,
          product_title: row.product_title,
          product_url: row.product_url,
          product_price_text: row.product_price_text,
          bank_state: row.bank_state,
          exact_match_confirmed: row.exact_match_confirmed,
          match_confidence: 0,
        },
        verification.status,
      );

      await admin
        .from("recommendation_product_bank")
        .update({
          bank_state: reassessment.bank_state,
          image_status: verification.status,
          image_verified_at: new Date().toISOString(),
          last_verification_error: reassessment.last_verification_error,
          verification_notes: reassessment.verification_notes,
          match_confidence: reassessment.match_confidence,
          exact_match_confirmed: reassessment.exact_match_confirmed,
          last_verified_at: new Date().toISOString(),
        })
        .eq("id", row.id);

      results.push({
        id: row.id,
        image_status: verification.status,
        image_score: verification.score,
        bank_state: reassessment.bank_state,
        match_confidence: reassessment.match_confidence,
      });
    }

    return jsonResponse({
      checked: results.length,
      results,
    });
  } catch (error) {
    console.error("[recommendation-bank-maintenance]", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unexpected error",
    }, 500);
  }
});
