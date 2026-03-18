import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCatalogRecommendations, getCatalogVersion } from "../_shared/knowMeCatalog.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALLOWED_CATEGORIES = new Set(["food", "clothes", "tech", "home"]);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const forceRefresh = Boolean(body?.force_refresh);
    const now = new Date();
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - ((now.getUTCDay() + 6) % 7)));
    const weekStartKey = weekStart.toISOString().slice(0, 10);

    if (!forceRefresh) {
      const { data: cachedRecommendations } = await supabase
        .from("weekly_recommendations")
        .select("products, generated_at")
        .eq("user_id", user.id)
        .eq("week_start", weekStartKey)
        .maybeSingle();

      const cachedProducts = Array.isArray(cachedRecommendations?.products)
        ? cachedRecommendations.products as Array<Record<string, unknown>>
        : null;

      const cacheIsCurrent = Boolean(
        cachedProducts?.length &&
        cachedProducts.every((product) => product?.source_version === getCatalogVersion()),
      );

      if (cachedProducts && cacheIsCurrent) {
        return new Response(JSON.stringify({
          products: cachedProducts,
          cached: true,
          generated_at: cachedRecommendations.generated_at,
          week_start: weekStartKey,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Fetch preferences and sponsored products in parallel
    const [prefsResult, sponsoredResult] = await Promise.all([
      supabase
        .from("user_preferences")
        .select("profile_answers, ai_personalization")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("sponsored_products")
        .select("*")
        .eq("is_active", true)
        .eq("placement", "blended"),
    ]);

    const profileAnswers = prefsResult.data?.profile_answers as Record<string, any> || {};
    const personalization = prefsResult.data?.ai_personalization as any || {};

    const gender = profileAnswers?.identity?.[0] || profileAnswers?.identity || "unspecified";
    const { products: catalogProducts, priceTier } = getCatalogRecommendations(profileAnswers, personalization);
    const rawTier = priceTier;

    const sponsoredProducts = (sponsoredResult.data || []).filter((sp: any) => {
      if (sp.start_date && new Date(sp.start_date) > now) return false;
      if (sp.end_date && new Date(sp.end_date) < now) return false;
      if (sp.target_gender?.length && !sp.target_gender.includes(gender)) return false;
      if (sp.target_price_tiers?.length && !sp.target_price_tiers.includes(rawTier)) return false;
      return true;
    });

    const blendedProducts = [...catalogProducts];
    const sponsoredMapped = sponsoredProducts
      .sort((a: any, b: any) => (b.priority || 0) - (a.priority || 0))
      .slice(0, 3)
      .map((sp: any) => ({
        name: sp.name,
        brand: sp.brand,
        price: sp.price || "",
        category: ALLOWED_CATEGORIES.has(sp.category) ? sp.category : "clothes",
        hook: sp.hook || `Curated pick from ${sp.brand}`,
        why: sp.why || `A ${sp.brand} selection matched to your style`,
        is_partner_pick: false,
        is_sponsored: true,
        affiliate_url: sp.affiliate_url
          ? `${sp.affiliate_url}${sp.affiliate_url.includes("?") ? "&" : "?"}utm_source=${sp.utm_source || "gotwo"}&utm_medium=${sp.utm_medium || "app"}&utm_campaign=${sp.utm_campaign || "recs"}`
          : null,
        sponsored_id: sp.id,
        source_kind: "sponsored",
        source_version: getCatalogVersion(),
      }));

    const insertPositions = [2, 6, 10];
    for (let i = 0; i < sponsoredMapped.length; i++) {
      const pos = Math.min(insertPositions[i] || blendedProducts.length, blendedProducts.length);
      blendedProducts.splice(pos, 0, sponsoredMapped[i]);
    }

    await supabase.from("weekly_recommendations").upsert({
      user_id: user.id,
      week_start: weekStartKey,
      products: blendedProducts,
      generated_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,week_start",
    });

    return new Response(JSON.stringify({
      products: blendedProducts,
      cached: false,
      generated_at: new Date().toISOString(),
      week_start: weekStartKey,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-products error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
