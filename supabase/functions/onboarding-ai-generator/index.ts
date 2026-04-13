// onboarding-ai-generator — Edge Function
//
// Serves AI-generated content for onboarding Screens 3, 5, and 6.
// Cache-first: checks the relevant cache table first, returns immediately on hit.
// On miss: calls Gemini Flash, writes result to cache, returns result.
//
// Request body:
//   {
//     screen: 3 | 5 | 6,
//     age_range: string,          // e.g. "25_34"
//     gender: string,             // e.g. "woman"
//     top_categories: string[],   // e.g. ["clothes","dining","entertainment"]
//     spend_tier: string,         // e.g. "mid"  (required for screen 6)
//   }
//
// Response body:
//   { cached: boolean, screen: number, data: VibeOptions | SpendItems | BrandOptions }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface VibeOption {
  id: string;
  label: string;
  description: string;
  keywords: string[];
}

interface SpendRange {
  id: string;
  label: string;
  value: number;
}

interface SpendItem {
  id: string;
  label: string;
  ranges: SpendRange[];
}

interface BrandOption {
  id: string;
  label: string;
  category: string;
  tier: string;
}

// ─── Cache key builders (must match frontend profileQuestions.ts) ─────────────

const buildVibeCacheKey = (ageRange: string, gender: string) =>
  `${ageRange}__${gender}`;

const buildSpendCacheKey = (topCategories: string[]) =>
  [...topCategories].slice(0, 3).sort().join("__");

const buildBrandCacheKey = (
  ageRange: string,
  gender: string,
  topCategory: string,
  spendTier: string,
) => `${ageRange}__${gender}__${topCategory}__${spendTier}`;

// ─── TTL check ────────────────────────────────────────────────────────────────

const isStale = (updatedAt: string, ttlDays: number): boolean => {
  const updated = new Date(updatedAt).getTime();
  const now = Date.now();
  return now - updated > ttlDays * 24 * 60 * 60 * 1000;
};

// ─── Gemini caller ────────────────────────────────────────────────────────────

const callGemini = async (prompt: string, apiKey: string): Promise<string> => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";
};

// ─── Screen 3: Vibe Options ───────────────────────────────────────────────────

const generateVibeOptions = async (
  ageRange: string,
  gender: string,
  apiKey: string,
): Promise<VibeOption[]> => {
  const ageLabel: Record<string, string> = {
    "13_17": "teenager (13–17)",
    "18_24": "young adult (18–24)",
    "25_34": "mid-20s to early-30s adult",
    "35_44": "adult in their late 30s to early 40s",
    "45_54": "adult in their late 40s to early 50s",
    "55_plus": "adult 55 or older",
  };

  const prompt = `You are Go Two's onboarding AI. Generate 6 style vibe options for a ${ageLabel[ageRange] ?? ageRange} who identifies as ${gender}.

Each vibe option must:
- Use a CURRENT, culturally relevant aesthetic name (not generic words like "casual" or "sporty").
- Feel specific and recognizable to someone in this demographic.
- Have a 1-sentence description written in second person ("You...").
- Include 3–5 search-friendly keywords that describe the look (used internally for product rec filtering).

Examples of good labels: "Quiet Luxury", "Dark Academia", "Gorpcore", "Clean Girl", "Old Money", "Y2K Revival", "Coastal Grandmother", "Streetwear Forward", "Tech Minimalist", "Elevated Everyday".
Do NOT use those exact examples if they don't fit this demographic. Generate 6 that are right for a ${ageLabel[ageRange] ?? ageRange}.

Return ONLY a JSON array with exactly 6 objects, no explanation:
[
  {
    "id": "snake_case_id",
    "label": "Aesthetic Name",
    "description": "One sentence describing this vibe in second person.",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
]`;

  const raw = await callGemini(prompt, apiKey);
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Gemini vibe response is not an array");
  return parsed as VibeOption[];
};

// ─── Screen 5: Generated Spend Items ─────────────────────────────────────────

const STANDARD_RANGES = {
  low: [
    { id: "under_15",  label: "Under $15",  value: 7   },
    { id: "15_40",     label: "$15 – $40",  value: 27  },
    { id: "40_80",     label: "$40 – $80",  value: 60  },
    { id: "80_plus",   label: "$80+",       value: 120 },
  ],
  mid: [
    { id: "under_25",  label: "Under $25",  value: 12  },
    { id: "25_75",     label: "$25 – $75",  value: 50  },
    { id: "75_150",    label: "$75 – $150", value: 112 },
    { id: "150_plus",  label: "$150+",      value: 200 },
  ],
  high: [
    { id: "under_50",   label: "Under $50",    value: 25   },
    { id: "50_150",     label: "$50 – $150",   value: 100  },
    { id: "150_500",    label: "$150 – $500",  value: 325  },
    { id: "500_plus",   label: "$500+",        value: 750  },
  ],
  subscription: [
    { id: "under_20mo",  label: "Under $20/mo",  value: 10  },
    { id: "20_60mo",     label: "$20 – $60/mo",  value: 40  },
    { id: "60_150mo",    label: "$60 – $150/mo", value: 105 },
    { id: "150_plus_mo", label: "$150+/mo",       value: 200 },
  ],
};

const generateSpendItems = async (
  topCategories: string[],
  apiKey: string,
): Promise<SpendItem[]> => {
  const prompt = `You are Go Two's onboarding AI. A user's top 3 product categories are: ${topCategories.join(", ")}.

Generate 3–4 specific purchase anchor items that are highly relevant to these categories. These are used to calibrate the recommendation engine's price expectations.

Rules:
- Items must be concrete, everyday purchases — not vague ("a nice thing") or too rare ("a yacht").
- Each item must have a "range_type" of either "low", "mid", "high", or "subscription" to determine what dollar ranges to show.
  - "low": $0–$80 items (coffee, candle, book, plant, supplement)
  - "mid": $25–$150 items (skincare product, kitchen gadget, gym gear, wine bottle)
  - "high": $50–$500+ items (electronics, furniture, luggage, fitness equipment)
  - "subscription": monthly recurring cost (gym membership, streaming, meal kit)
- Do NOT repeat items that are already standard anchors: t-shirt, jeans, shoes, nice dinner out, TV.

Return ONLY a JSON array with 3–4 objects, no explanation:
[
  {
    "id": "snake_case_id",
    "label": "Item description starting with 'A' or 'An'",
    "range_type": "low" | "mid" | "high" | "subscription"
  }
]`;

  const raw = await callGemini(prompt, apiKey);
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Gemini spend response is not an array");

  return parsed.map((item: { id: string; label: string; range_type: string }) => ({
    id: item.id,
    label: item.label,
    ranges: STANDARD_RANGES[item.range_type as keyof typeof STANDARD_RANGES] ?? STANDARD_RANGES.mid,
  }));
};

// ─── Screen 6: Brand Options ──────────────────────────────────────────────────

const generateBrandOptions = async (
  ageRange: string,
  gender: string,
  topCategory: string,
  spendTier: string,
  apiKey: string,
): Promise<BrandOption[]> => {
  const ageLabel: Record<string, string> = {
    "13_17": "teenager",
    "18_24": "young adult (18–24)",
    "25_34": "25–34 year old",
    "35_44": "35–44 year old",
    "45_54": "45–54 year old",
    "55_plus": "55+ adult",
  };

  const tierLabel: Record<string, string> = {
    budget: "budget-conscious (prefers low prices, shops sales, value brands)",
    mid: "mid-range (willing to pay for quality but not luxury)",
    premium: "premium (regularly buys quality brands, avoids cheap options)",
    luxury: "luxury (shops high-end, brand names matter, rarely budgets)",
  };

  const prompt = `You are Go Two's onboarding AI. Generate 15–18 brand options for a ${ageLabel[ageRange] ?? ageRange} (${gender}) whose top product category is ${topCategory} and who is ${tierLabel[spendTier] ?? spendTier}.

Rules:
- Only include brands this person would REALISTICALLY buy from given their age, gender, and spend tier.
- Cover a range of plausible brands for this profile — don't only show luxury or only show budget.
- Include real, currently active brands. No obscure or defunct brands.
- Mix in brands from related categories if relevant (e.g. top category "clothes" can include shoe brands, accessory brands).
- Each brand needs a "tier": "budget", "mid", "premium", or "luxury".

Return ONLY a JSON array with 15–18 objects, no explanation:
[
  {
    "id": "snake_case_brand_id",
    "label": "Brand Name",
    "category": "${topCategory}",
    "tier": "budget" | "mid" | "premium" | "luxury"
  }
]`;

  const raw = await callGemini(prompt, apiKey);
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Gemini brand response is not an array");
  return parsed as BrandOption[];
};

// ─── Main Handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const geminiKey = Deno.env.get("GEMINI_API_KEY") ?? Deno.env.get("LOVABLE_API_KEY")!;

    // Use service role for cache writes; user client just for auth verification
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const body = await req.json();
    const { screen, age_range, gender, top_categories, spend_tier } = body;

    if (!screen || ![3, 5, 6].includes(screen)) {
      throw new Error("screen must be 3, 5, or 6");
    }

    // ── Screen 3: Vibe ─────────────────────────────────────────────────────────
    if (screen === 3) {
      const cacheKey = buildVibeCacheKey(age_range ?? "25_34", gender ?? "prefer_not");

      const { data: cached } = await adminClient
        .from("onboarding_vibe_cache")
        .select("*")
        .eq("cache_key", cacheKey)
        .maybeSingle();

      if (cached && !isStale(cached.updated_at, cached.ttl_days)) {
        return new Response(
          JSON.stringify({ cached: true, screen: 3, data: cached.vibe_options }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const vibeOptions = await generateVibeOptions(
        age_range ?? "25_34",
        gender ?? "prefer_not",
        geminiKey,
      );

      await adminClient.from("onboarding_vibe_cache").upsert(
        {
          cache_key: cacheKey,
          age_range: age_range ?? "25_34",
          gender: gender ?? "prefer_not",
          vibe_options: vibeOptions,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "cache_key" },
      );

      return new Response(
        JSON.stringify({ cached: false, screen: 3, data: vibeOptions }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // ── Screen 5: Generated Spend Items ───────────────────────────────────────
    if (screen === 5) {
      const cats = Array.isArray(top_categories) ? top_categories : [];
      const cacheKey = buildSpendCacheKey(cats);

      const { data: cached } = await adminClient
        .from("onboarding_spend_cache")
        .select("*")
        .eq("cache_key", cacheKey)
        .maybeSingle();

      if (cached && !isStale(cached.updated_at, cached.ttl_days)) {
        return new Response(
          JSON.stringify({ cached: true, screen: 5, data: cached.spend_items }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const spendItems = await generateSpendItems(cats, geminiKey);

      await adminClient.from("onboarding_spend_cache").upsert(
        {
          cache_key: cacheKey,
          top_categories: cats,
          spend_items: spendItems,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "cache_key" },
      );

      return new Response(
        JSON.stringify({ cached: false, screen: 5, data: spendItems }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // ── Screen 6: Brand Grid ──────────────────────────────────────────────────
    if (screen === 6) {
      const cats = Array.isArray(top_categories) ? top_categories : [];
      const topCat = cats[0] ?? "clothes";
      const tier = spend_tier ?? "mid";
      const cacheKey = buildBrandCacheKey(age_range ?? "25_34", gender ?? "prefer_not", topCat, tier);

      const { data: cached } = await adminClient
        .from("onboarding_brand_cache")
        .select("*")
        .eq("cache_key", cacheKey)
        .maybeSingle();

      if (cached && !isStale(cached.updated_at, cached.ttl_days)) {
        return new Response(
          JSON.stringify({ cached: true, screen: 6, data: cached.brand_options }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const brandOptions = await generateBrandOptions(
        age_range ?? "25_34",
        gender ?? "prefer_not",
        topCat,
        tier,
        geminiKey,
      );

      await adminClient.from("onboarding_brand_cache").upsert(
        {
          cache_key: cacheKey,
          age_range: age_range ?? "25_34",
          gender: gender ?? "prefer_not",
          top_category: topCat,
          spend_tier: tier,
          brand_options: brandOptions,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "cache_key" },
      );

      return new Response(
        JSON.stringify({ cached: false, screen: 6, data: brandOptions }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    throw new Error("Unhandled screen");
  } catch (error) {
    console.error("onboarding-ai-generator error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

// Codebase classification: cache-first AI generator for onboarding screens 3, 5, and 6.
