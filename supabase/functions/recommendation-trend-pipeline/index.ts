import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, type User } from "https://esm.sh/@supabase/supabase-js@2";
import {
  buildTrendPromotionArtifacts,
  normalizeTrendCandidateInput,
  verifyTrendCandidateForPromotion,
  type TrendCandidateInput,
  type TrendCandidateRow,
} from "../_shared/recommendationTrendPipeline.ts";
import { verifyRemoteImageUrl } from "../_shared/exactProductScraper.ts";

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

const toArray = (value: unknown) => (Array.isArray(value) ? value : []);
const cleanText = (value: unknown) =>
  typeof value === "string" ? value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim() : "";

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
    const action = cleanText(body?.action).toLowerCase() || "stage";

    if (action === "stage") {
      const candidates = toArray(body?.candidates)
        .map((entry) => normalizeTrendCandidateInput(entry as TrendCandidateInput))
        .filter(Boolean) as TrendCandidateRow[];

      if (!candidates.length) return jsonResponse({ error: "No valid candidates to stage" }, 400);

      const { data, error } = await admin.from("recommendation_trend_candidates").upsert(candidates, {
        onConflict: "source_platform,product_url_hash",
        ignoreDuplicates: false,
      }).select("id, source_platform, brand, product_title, category, candidate_state");

      if (error) throw error;

      return jsonResponse({
        action: "stage",
        staged_count: data?.length ?? 0,
        candidates: data ?? [],
      });
    }

    if (action === "promote") {
      const ids = toArray(body?.ids).map((entry) => cleanText(entry)).filter(Boolean);
      let query = admin
        .from("recommendation_trend_candidates")
        .select("*")
        .in("candidate_state", ["approved", "approved_exact"])
        .order("updated_at", { ascending: true })
        .limit(Math.max(1, Math.min(Number(body?.limit) || 25, 100)));

      if (ids.length) query = admin
        .from("recommendation_trend_candidates")
        .select("*")
        .in("id", ids);

      const { data: rows, error } = await query;
      if (error) throw error;

      const promoted: Array<Record<string, unknown>> = [];

      for (const row of rows ?? []) {
        const candidate = normalizeTrendCandidateInput(row as TrendCandidateInput);
        if (!candidate) continue;

        const imageVerification = await verifyRemoteImageUrl(candidate.image_url);
        const exactVerification = verifyTrendCandidateForPromotion(candidate, imageVerification.status);
        const artifacts = buildTrendPromotionArtifacts(candidate, exactVerification);

        if (artifacts.keywordRows.length) {
          await admin.from("recommendation_keyword_bank").upsert(artifacts.keywordRows, {
            onConflict: "primary_keyword,descriptor_keyword,category",
            ignoreDuplicates: false,
          });
        }

        if (artifacts.brandRow) {
          await admin.from("recommendation_brand_bank").upsert(artifacts.brandRow, {
            onConflict: "brand,primary_keyword,category",
            ignoreDuplicates: false,
          });
        }

        if (artifacts.brandLocationRows.length) {
          await admin.from("recommendation_brand_location_bank").upsert(artifacts.brandLocationRows, {
            onConflict: "location_key,brand,category",
            ignoreDuplicates: false,
          });
        }

        if (artifacts.productBankRow) {
          await admin.from("recommendation_product_bank").upsert(artifacts.productBankRow, {
            onConflict: "product_url_hash",
            ignoreDuplicates: false,
          });
        }

        await admin.from("recommendation_trend_candidates").update({
          candidate_state: artifacts.productBankRow ? "promoted" : "reviewed",
          promotion_notes: {
            promoted_at: new Date().toISOString(),
            keyword_rows: artifacts.keywordRows.length,
            brand_promoted: Boolean(artifacts.brandRow),
            location_rows: artifacts.brandLocationRows.length,
            product_promoted: Boolean(artifacts.productBankRow),
            image_status: imageVerification.status,
            exact_confidence: exactVerification.match_confidence,
          },
        }).eq("id", row.id);

        promoted.push({
          id: row.id,
          category: candidate.category,
          brand: candidate.brand,
          product_title: candidate.product_title,
          keyword_rows: artifacts.keywordRows.length,
          product_promoted: Boolean(artifacts.productBankRow),
        });
      }

      return jsonResponse({
        action: "promote",
        promoted_count: promoted.length,
        promoted,
      });
    }

    return jsonResponse({ error: "Unsupported action" }, 400);
  } catch (error) {
    console.error("[recommendation-trend-pipeline]", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unexpected error",
    }, 500);
  }
});
