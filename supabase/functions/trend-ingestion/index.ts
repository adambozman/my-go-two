import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  normalizeTrendCandidateInput,
  type TrendCandidateInput,
  type TrendCandidateRow,
} from "../_shared/recommendationTrendPipeline.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

const ALL_CATEGORIES = ["clothes", "food", "tech", "home", "personal", "gifts", "entertainment", "travel"] as const;
type Category = typeof ALL_CATEGORIES[number];

// Category → default target demographics
// IMPORTANT: age_range format uses underscores (18_24) to match onboarding/product bank convention
// Gender format uses man/woman/non-binary to match onboarding convention
const CATEGORY_DEMOGRAPHICS: Record<Category, { target_age_ranges: string[]; target_genders: string[] }> = {
  clothes: { target_age_ranges: ["18_24", "25_34", "35_44"], target_genders: ["man", "woman", "non-binary"] },
  food: { target_age_ranges: ["18_24", "25_34", "35_44", "45_54"], target_genders: ["man", "woman", "non-binary"] },
  tech: { target_age_ranges: ["18_24", "25_34", "35_44"], target_genders: ["man", "woman", "non-binary"] },
  home: { target_age_ranges: ["25_34", "35_44", "45_54"], target_genders: ["man", "woman", "non-binary"] },
  personal: { target_age_ranges: ["18_24", "25_34", "35_44"], target_genders: ["man", "woman", "non-binary"] },
  gifts: { target_age_ranges: ["18_24", "25_34", "35_44", "45_54"], target_genders: ["man", "woman", "non-binary"] },
  entertainment: { target_age_ranges: ["18_24", "25_34"], target_genders: ["man", "woman", "non-binary"] },
  travel: { target_age_ranges: ["25_34", "35_44", "45_54"], target_genders: ["man", "woman", "non-binary"] },
};

// Firecrawl search result shape
type FirecrawlResult = {
  url: string;
  title: string;
  description: string;
  markdown: string;
};

type FirecrawlResponse = {
  success: boolean;
  data: FirecrawlResult[];
};

// Heuristics to extract brand from title / description
const extractBrand = (title: string, description: string, url: string): string => {
  // Try to get hostname as a brand fallback
  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace(/^www\./, "").split(".")[0];
  } catch {
    hostname = "";
  }

  // Look for "by [Brand]" or "[Brand] -" patterns in title
  const byMatch = title.match(/\bby\s+([A-Z][A-Za-z0-9& ]{1,30})/);
  if (byMatch) return byMatch[1].trim();

  const dashMatch = title.match(/^([A-Z][A-Za-z0-9&' ]{1,25})\s*[-|–]/);
  if (dashMatch) return dashMatch[1].trim();

  // Use well-known retailer/brand domain patterns
  const knownBrands: Record<string, string> = {
    amazon: "Amazon",
    apple: "Apple",
    samsung: "Samsung",
    sony: "Sony",
    nike: "Nike",
    adidas: "Adidas",
    target: "Target",
    walmart: "Walmart",
    bestbuy: "Best Buy",
    etsy: "Etsy",
    wayfair: "Wayfair",
    ikea: "IKEA",
    zara: "Zara",
    hm: "H&M",
    nordstrom: "Nordstrom",
    macys: "Macy's",
    sephora: "Sephora",
    ulta: "Ulta",
    airbnb: "Airbnb",
    booking: "Booking.com",
    expedia: "Expedia",
    netflix: "Netflix",
    spotify: "Spotify",
    steam: "Steam",
  };

  if (hostname && knownBrands[hostname]) return knownBrands[hostname];

  // Fall back to first capitalized word sequence in description
  const descMatch = description.match(/^([A-Z][A-Za-z0-9&' ]{1,25}(?:\s+[A-Z][A-Za-z0-9&']{1,15})?)/);
  if (descMatch) return descMatch[1].trim();

  // Last resort: capitalize the hostname
  if (hostname) return hostname.charAt(0).toUpperCase() + hostname.slice(1);

  return "Unknown";
};

// Extract a price string from text content
const extractPrice = (text: string): string | null => {
  const match = text.match(/\$[\d,]+(?:\.\d{2})?/);
  return match ? match[0] : null;
};

// Extract a plausible image URL from markdown content
const extractImageUrl = (markdown: string): string | null => {
  const imgMatch = markdown.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  if (imgMatch) return imgMatch[1];
  // Also look for raw image URLs in content
  const rawMatch = markdown.match(/(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|avif)(?:\?[^\s"'<>]*)?)/i);
  if (rawMatch) return rawMatch[1];
  return null;
};

// Derive a product URL — prefer the result URL if it looks like a product page,
// otherwise return the raw URL as-is (best effort).
const deriveProductUrl = (url: string, title: string): string => {
  return url;
};

// Map a search result to a TrendCandidateInput
const mapResultToCandidate = (
  result: FirecrawlResult,
  category: Category,
  searchQuery: string,
): TrendCandidateInput | null => {
  const { url, title, description, markdown } = result;

  if (!url || !title) return null;

  // Skip obvious non-product pages: listicles without product info, etc.
  // We keep the result as long as we can extract a product title.
  const productTitle = title.replace(/^\d+\.\s*/, "").replace(/\s*[-|–].*$/, "").trim() || title.trim();
  if (productTitle.length < 3) return null;

  const combinedText = `${title} ${description} ${markdown.slice(0, 2000)}`;
  const brand = extractBrand(title, description, url);
  const price = extractPrice(combinedText);
  const imageUrl = extractImageUrl(markdown);
  const productUrl = deriveProductUrl(url, title);

  return {
    source_platform: "firecrawl-search",
    source_category: category,
    source_url: url,
    external_candidate_id: null,
    brand,
    product_title: productTitle,
    primary_keyword: null, // will be derived from product_title in normalizeTrendCandidateInput
    descriptor_keywords: [],
    category,
    product_url: productUrl,
    image_url: imageUrl || null,
    price_text: price || null,
    trend_score: 65, // reasonable default for search-sourced results
    observed_at: new Date().toISOString(),
    candidate_state: "approved",
  };
};

// Call Firecrawl search API for a given query
const firecrawlSearch = async (
  apiKey: string,
  query: string,
  limit: number,
): Promise<FirecrawlResult[]> => {
  const response = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, limit }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Firecrawl search failed (${response.status}): ${errorText}`);
  }

  const json: FirecrawlResponse = await response.json();
  if (!json.success || !Array.isArray(json.data)) return [];
  return json.data;
};

// Build the search query for a category
const buildSearchQuery = (category: Category): string => {
  const queryMap: Record<Category, string> = {
    clothes: "trending clothes products 2026",
    food: "popular food products 2026",
    tech: "trending tech products 2026",
    home: "trending home products 2026",
    personal: "popular personal care products 2026",
    gifts: "trending gift ideas products 2026",
    entertainment: "popular entertainment products 2026",
    travel: "trending travel products 2026",
  };
  return queryMap[category] ?? `trending ${category} products 2026`;
};

// Per-category ingestion result
type CategoryResult = {
  category: Category;
  query: string;
  fetched: number;
  inserted: number;
  skipped: number;
  error?: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const firecrawlApiKey = getRequiredEnv("FIRECRAWL_API_KEY");

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // Parse optional request body
    let requestedCategories: string[] = [];
    let limitPerCategory = 5;

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (Array.isArray(body?.categories) && body.categories.length > 0) {
        requestedCategories = body.categories.map((c: unknown) =>
          typeof c === "string" ? c.toLowerCase().trim() : ""
        ).filter(Boolean);
      }
      if (typeof body?.limit_per_category === "number" && body.limit_per_category > 0) {
        limitPerCategory = Math.min(Math.max(1, Math.floor(body.limit_per_category)), 20);
      }
    }

    // Validate and resolve categories
    const validCategories: Category[] = requestedCategories.length > 0
      ? (requestedCategories.filter((c): c is Category =>
          (ALL_CATEGORIES as readonly string[]).includes(c)
        ))
      : [...ALL_CATEGORIES];

    if (validCategories.length === 0) {
      return jsonResponse({ error: "No valid categories specified" }, 400);
    }

    const results: CategoryResult[] = [];
    let totalInserted = 0;
    let totalSkipped = 0;

    for (const category of validCategories) {
      const query = buildSearchQuery(category);
      const categoryResult: CategoryResult = {
        category,
        query,
        fetched: 0,
        inserted: 0,
        skipped: 0,
      };

      try {
        const searchResults = await firecrawlSearch(firecrawlApiKey, query, limitPerCategory);
        categoryResult.fetched = searchResults.length;

        // Map results → normalized candidates
        const candidates: TrendCandidateRow[] = [];
        for (const result of searchResults) {
          const input = mapResultToCandidate(result, category, query);
          if (!input) {
            categoryResult.skipped++;
            continue;
          }
          const normalized = normalizeTrendCandidateInput(input);
          if (!normalized) {
            categoryResult.skipped++;
            continue;
          }
          candidates.push(normalized);
        }

        if (candidates.length === 0) {
          categoryResult.skipped += searchResults.length;
          results.push(categoryResult);
          continue;
        }

        // Attach demographic targeting
        const demographics = CATEGORY_DEMOGRAPHICS[category];
        const rows = candidates.map((c) => ({
          source_platform: c.source_platform,
          source_category: c.source_category,
          source_url: c.source_url,
          external_candidate_id: c.external_candidate_id,
          brand: c.brand,
          product_title: c.product_title,
          primary_keyword: c.primary_keyword,
          descriptor_keywords: c.descriptor_keywords,
          category: c.category,
          product_url: c.product_url,
          image_url: c.image_url,
          price_text: c.price_text,
          trend_score: c.trend_score,
          candidate_state: c.candidate_state,
          normalized_payload: c.normalized_payload,
          promotion_notes: typeof c.promotion_notes === 'object' ? JSON.stringify(c.promotion_notes) : (c.promotion_notes ?? null),
          observed_at: c.observed_at,
          target_age_ranges: demographics.target_age_ranges,
          target_genders: demographics.target_genders,
          // NOTE: product_url_hash is a GENERATED column — excluded intentionally
        }));

        // Upsert using product_url as the dedup key via source_platform + product_url_hash.
        // Since product_url_hash is GENERATED from product_url, we rely on the unique
        // constraint on (source_platform, product_url_hash) which is equivalent.
        const { data: upserted, error: upsertError } = await admin
          .from("recommendation_trend_candidates")
          .upsert(rows, {
            onConflict: "source_platform,product_url_hash",
            ignoreDuplicates: false,
          })
          .select("id, source_platform, brand, product_title, category, candidate_state");

        if (upsertError) {
          throw upsertError;
        }

        categoryResult.inserted = upserted?.length ?? 0;
        categoryResult.skipped += candidates.length - categoryResult.inserted;
      } catch (err) {
        console.error(`[trend-ingestion] Error processing category "${category}":`, err);
        categoryResult.error = err instanceof Error ? err.message : String(err);
      }

      totalInserted += categoryResult.inserted;
      totalSkipped += categoryResult.skipped;
      results.push(categoryResult);
    }

    return jsonResponse({
      success: true,
      summary: {
        categories_processed: validCategories.length,
        total_inserted: totalInserted,
        total_skipped: totalSkipped,
        limit_per_category: limitPerCategory,
      },
      results,
    });
  } catch (error) {
    console.error("[trend-ingestion] Fatal error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      500,
    );
  }
});
