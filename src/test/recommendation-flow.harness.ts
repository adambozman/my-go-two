import {
  buildKeywordSignature,
  buildRecommendationFingerprint,
  getCatalogVersion,
  normalizeRecommendationKeywords,
  resolveIntentToCatalogEntry,
  type RecommendationIntent,
} from "../../supabase/functions/_shared/knowMeCatalog.ts";

export type ScrapedProduct = {
  image_url: string | null;
  product_url: string | null;
  price: string | null;
  scraped_description: string | null;
};

export type RecommendationCard = {
  name: string;
  brand: string;
  price: string;
  category: RecommendationIntent["category"];
  hook: string;
  why: string;
  is_connection_pick: boolean;
  is_sponsored: boolean;
  affiliate_url: string | null;
  search_url: string | null;
  product_query: string;
  sponsored_id: string | null;
  image_url: string | null;
  source_kind: string;
  source_version: string;
};

export type SharedBankRecord = {
  fingerprint: string;
  brand: string;
  product_name: string;
  category: RecommendationIntent["category"];
  recommendation_kind: RecommendationIntent["recommendation_kind"];
  link_kind: "product" | "search";
  link_url: string;
  search_query: string | null;
  price: string | null;
  image_url: string | null;
  intent_keywords: string[] | null;
  keyword_signature: string | null;
  scraped_description: string | null;
  source_version: string;
  resolver_source: string;
  usage_count: number;
};

export type FlowSource = "weekly" | "connection";

export type FlowContext = {
  source: FlowSource;
  userId: string;
  weekStartKey?: string;
  connectionUserId?: string;
  recommendationKind?: "gift" | "occasion" | "general";
  knowledgeResponses: Record<string, unknown>;
  sharedCards: Array<Record<string, unknown>>;
  yourVibe: Record<string, unknown>;
};

export type GenerateIntents = (context: FlowContext) => RecommendationIntent[];
export type ScrapeProduct = (intent: RecommendationIntent, context: FlowContext) => ScrapedProduct | null;

export type RecommendationFlowResult = {
  cacheHit: boolean;
  products: RecommendationCard[];
  weeklyCacheKey?: string;
  connectionCacheKey?: string;
  aiCalls: number;
  firecrawlCalls: number;
  bankHits: number;
  bankMisses: number;
};

type CachedEntry = {
  products: RecommendationCard[];
};

const toProductCard = (
  intent: RecommendationIntent,
  resolved: SharedBankRecord,
): RecommendationCard => {
  const productUrl = resolved.link_kind === "product" ? resolved.link_url : null;
  return {
    name: intent.name,
    brand: intent.brand,
    price: resolved.price ?? intent.price,
    category: intent.category,
    hook: intent.hook,
    why: intent.why,
    is_connection_pick: intent.recommendation_kind === "specific",
    is_sponsored: false,
    affiliate_url: productUrl,
    search_url: productUrl ? null : resolved.link_url,
    product_query: resolved.search_query ?? `${intent.brand} ${intent.name}`.trim(),
    sponsored_id: null,
    image_url: productUrl ? resolved.image_url : null,
    source_kind: productUrl ? "specific-product" : "brand-search",
    source_version: resolved.source_version,
  };
};

const ensureStringArray = (value: Array<string | null | undefined>) =>
  normalizeRecommendationKeywords(value);

export class RecommendationFlowHarness {
  private readonly weeklyCache = new Map<string, CachedEntry>();
  private readonly connectionCache = new Map<string, CachedEntry>();
  private readonly sharedBankByFingerprint = new Map<string, SharedBankRecord>();
  private readonly sharedBankBySignature = new Map<string, SharedBankRecord>();

  public readonly aiCalls: FlowContext[] = [];
  public readonly firecrawlCalls: Array<{ intent: RecommendationIntent; context: FlowContext }> = [];

  constructor(
    private readonly deps: {
      generateIntents: GenerateIntents;
      scrapeProduct: ScrapeProduct;
    },
  ) {}

  snapshotBank() {
    return Array.from(this.sharedBankByFingerprint.values()).map((entry) => ({ ...entry }));
  }

  async runWeekly(context: Omit<FlowContext, "source" | "connectionUserId" | "recommendationKind">): Promise<RecommendationFlowResult> {
    const flowContext: FlowContext = { ...context, source: "weekly" };
    const cacheKey = `weekly:${flowContext.userId}:${flowContext.weekStartKey ?? "unknown"}`;
    const cached = this.weeklyCache.get(cacheKey);
    if (cached) {
      return {
        cacheHit: true,
        products: cached.products.map((product) => ({ ...product })),
        weeklyCacheKey: cacheKey,
        aiCalls: this.aiCalls.length,
        firecrawlCalls: this.firecrawlCalls.length,
        bankHits: 0,
        bankMisses: 0,
      };
    }

    const { products, bankHits, bankMisses } = await this.resolveFlow(flowContext);
    this.weeklyCache.set(cacheKey, { products });

    return {
      cacheHit: false,
      products: products.map((product) => ({ ...product })),
      weeklyCacheKey: cacheKey,
      aiCalls: this.aiCalls.length,
      firecrawlCalls: this.firecrawlCalls.length,
      bankHits,
      bankMisses,
    };
  }

  async runConnection(
    context: Omit<FlowContext, "source" | "weekStartKey"> & { recommendationKind: "gift" | "occasion" | "general" },
  ): Promise<RecommendationFlowResult> {
    const flowContext: FlowContext = { ...context, source: "connection" };
    const cacheKey = `connection:${flowContext.userId}:${flowContext.connectionUserId ?? "unknown"}:${flowContext.recommendationKind ?? "gift"}`;
    const cached = this.connectionCache.get(cacheKey);
    if (cached) {
      return {
        cacheHit: true,
        products: cached.products.map((product) => ({ ...product })),
        connectionCacheKey: cacheKey,
        aiCalls: this.aiCalls.length,
        firecrawlCalls: this.firecrawlCalls.length,
        bankHits: 0,
        bankMisses: 0,
      };
    }

    const { products, bankHits, bankMisses } = await this.resolveFlow(flowContext);
    this.connectionCache.set(cacheKey, { products });

    return {
      cacheHit: false,
      products: products.map((product) => ({ ...product })),
      connectionCacheKey: cacheKey,
      aiCalls: this.aiCalls.length,
      firecrawlCalls: this.firecrawlCalls.length,
      bankHits,
      bankMisses,
    };
  }

  private async resolveFlow(context: FlowContext): Promise<{ products: RecommendationCard[]; bankHits: number; bankMisses: number }> {
    this.aiCalls.push(context);
    const intents = this.deps.generateIntents(context);
    const products: RecommendationCard[] = [];
    let bankHits = 0;
    let bankMisses = 0;

    for (const intent of intents) {
      const normalizedKeywords = ensureStringArray([
        ...(intent.keywords ?? []),
        intent.brand,
        intent.name,
        intent.category,
      ]);
      const keywordSignature = buildKeywordSignature(intent.category, normalizedKeywords);
      const fingerprint = buildRecommendationFingerprint(
        intent.category,
        intent.brand,
        intent.name,
        intent.recommendation_kind,
      );

      const existing = (keywordSignature && this.sharedBankBySignature.get(keywordSignature)) ||
        this.sharedBankByFingerprint.get(fingerprint) ||
        null;

      let resolved: SharedBankRecord;
      if (existing) {
        bankHits += 1;
        resolved = {
          ...existing,
          usage_count: existing.usage_count + 1,
        };
        this.sharedBankByFingerprint.set(fingerprint, resolved);
        if (resolved.keyword_signature) {
          this.sharedBankBySignature.set(resolved.keyword_signature, resolved);
        }
      } else {
        bankMisses += 1;
        const scraped = this.deps.scrapeProduct(intent, context);
        this.firecrawlCalls.push({ intent, context });
        const fallback = resolveIntentToCatalogEntry(intent);
        const productUrl = scraped?.product_url || (fallback.link_kind === "product" ? fallback.link_url : null);
        const linkKind = productUrl ? "product" : fallback.link_kind;
        resolved = {
          fingerprint,
          brand: intent.brand,
          product_name: intent.name,
          category: intent.category,
          recommendation_kind: intent.recommendation_kind,
          link_kind: linkKind,
          link_url: productUrl || fallback.link_url,
          search_query: fallback.search_query ?? intent.search_query ?? null,
          price: scraped?.price ?? fallback.price ?? intent.price,
          image_url: scraped?.image_url ?? fallback.image_url ?? null,
          intent_keywords: normalizedKeywords,
          keyword_signature: keywordSignature,
          scraped_description: scraped?.scraped_description ?? null,
          source_version: getCatalogVersion(),
          resolver_source: scraped?.product_url ? "firecrawl" : fallback.resolver_source,
          usage_count: 0,
        };

        this.sharedBankByFingerprint.set(fingerprint, resolved);
        if (keywordSignature) {
          this.sharedBankBySignature.set(keywordSignature, resolved);
        }
      }

      products.push(toProductCard(intent, resolved));
    }

    return { products, bankHits, bankMisses };
  }
}

export const isProductOnlyBankRecord = (entry: SharedBankRecord) => {
  const keys = Object.keys(entry).sort();
  return keys.join(",") === [
    "brand",
    "category",
    "fingerprint",
    "image_url",
    "intent_keywords",
    "keyword_signature",
    "link_kind",
    "link_url",
    "price",
    "product_name",
    "recommendation_kind",
    "resolver_source",
    "scraped_description",
    "search_query",
    "source_version",
    "usage_count",
  ].join(",");
};
