import {
  buildKeywordSignature,
  buildRecommendationFingerprint,
  extractNegativePreferenceKeywords,
  getCatalogVersion,
  mergeDescriptorKeywords,
  mergeRecommendationKeywords,
  normalizePrimaryKeyword,
  resolveIntentToCatalogEntry,
  scoreKeywordBankCandidate,
  type RecommendationIntent,
} from "../../supabase/functions/_shared/recommendationCatalog.ts";
import {
  buildProductBankInsertFromExactScrape,
  scoreProductBankReuseCandidate,
} from "../../supabase/functions/_shared/recommendationProductBank.ts";

export type ScrapedProduct = {
  image_url: string | null;
  product_url: string | null;
  price: string | null;
  scraped_description: string | null;
  scraped_product_title: string | null;
  product_match_confidence: number;
  exact_match_confirmed: boolean;
  image_verification_status?: string | null;
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
  primary_keyword: string | null;
  descriptor_keywords: string[] | null;
  link_kind: "product" | "search";
  link_url: string;
  search_query: string | null;
  price: string | null;
  image_url: string | null;
  intent_keywords: string[] | null;
  keyword_signature: string | null;
  scraped_description: string | null;
  scraped_product_title: string | null;
  product_match_confidence: number;
  exact_match_confirmed: boolean;
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
  const sourceKind = productUrl
    ? (resolved.exact_match_confirmed ? "specific-product" : "catalog-product")
    : "brand-search";
  return {
    name: resolved.product_name,
    brand: resolved.brand,
    price: resolved.price ?? intent.price,
    category: intent.category,
    hook: intent.hook,
    why: intent.why,
    is_connection_pick: intent.recommendation_kind === "specific",
    is_sponsored: false,
    affiliate_url: productUrl,
    search_url: productUrl ? null : resolved.link_url,
    product_query: resolved.search_query ?? `${resolved.brand} ${resolved.product_name}`.trim(),
    sponsored_id: null,
    image_url: productUrl ? resolved.image_url : null,
    source_kind: sourceKind,
    source_version: resolved.source_version,
    exact_match_confirmed: Boolean(resolved.exact_match_confirmed),
    match_confidence: resolved.product_match_confidence,
    resolver_source: resolved.resolver_source,
  };
};

const ensureStringArray = (value: Array<string | null | undefined>) => mergeRecommendationKeywords(value);

const tokenizeKeywords = (values: string[]) =>
  Array.from(
    new Set(
      values.flatMap((value) =>
        value
          .split(/[^a-z0-9]+/i)
          .map((token) => token.trim().toLowerCase())
          .filter(Boolean),
      ),
    ),
  );

const extractHarnessNegativePreferenceKeywords = (knowledgeResponses: Record<string, unknown>) => {
  const negatives = new Set(extractNegativePreferenceKeywords(knowledgeResponses));

  for (const [key, value] of Object.entries(knowledgeResponses)) {
    if (!/(avoid|dislike|hate|turnoff|turn off|pet[-\s]?peeve|no go)/i.test(key)) continue;

    const phrases = Array.isArray(value)
      ? value.flatMap((entry) =>
          typeof entry === "string"
            ? entry.split(/[;,/|]+/).map((phrase) => phrase.trim()).filter(Boolean)
            : [],
        )
      : typeof value === "string"
        ? value.split(/[;,/|]+/).map((phrase) => phrase.trim()).filter(Boolean)
        : [];

    for (const phrase of phrases) {
      negatives.add(phrase);
      for (const token of phrase.split(/\s+/).filter((token) => token.length >= 3)) {
        negatives.add(token);
      }
    }
  }

  return ensureStringArray(Array.from(negatives));
};

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
    const rawPetPeeves = context.knowledgeResponses["pet-peeves"];
    const negativeKeywords = [
      ...extractHarnessNegativePreferenceKeywords(context.knowledgeResponses),
      ...(Array.isArray(rawPetPeeves)
        ? rawPetPeeves.flatMap((entry) =>
            typeof entry === "string" ? entry.split(/[^a-z0-9]+/i).filter(Boolean) : [],
          )
        : typeof rawPetPeeves === "string"
          ? rawPetPeeves.split(/[^a-z0-9]+/i).filter(Boolean)
          : []),
    ];
    const negativeTokens = tokenizeKeywords(ensureStringArray(negativeKeywords));

    const hasNegativeKeywordConflict = (candidate: SharedBankRecord) => {
      const candidateTokens = tokenizeKeywords(
        ensureStringArray([
          candidate.brand,
          candidate.product_name,
          candidate.search_query,
          candidate.scraped_product_title,
          ...(candidate.intent_keywords ?? []),
        ]),
      );
      return negativeTokens.some((keyword) => candidateTokens.includes(keyword));
    };

    for (const intent of intents) {
      const primaryKeyword = normalizePrimaryKeyword(intent.primary_keyword ?? intent.name);
      const descriptorKeywords = mergeDescriptorKeywords(
        primaryKeyword,
        intent.keywords ?? [],
        [intent.brand],
      );
      const normalizedKeywords = ensureStringArray([primaryKeyword, ...descriptorKeywords]);
      const keywordSignature = buildKeywordSignature(intent.category, primaryKeyword, descriptorKeywords);
      const fingerprint = buildRecommendationFingerprint(
        intent.category,
        intent.brand,
        intent.name,
        intent.recommendation_kind,
      );

      const exactKeywordMatch = keywordSignature ? this.sharedBankBySignature.get(keywordSignature) ?? null : null;
      const exactFingerprintMatch = this.sharedBankByFingerprint.get(fingerprint) ?? null;
      const bestSimilarityMatch = Array.from(this.sharedBankByFingerprint.values())
        .map((candidate) => {
          const reuse = scoreProductBankReuseCandidate({
            category: intent.category,
            primaryKeyword,
            descriptorKeywords,
            requestedBrand: intent.brand,
            row: candidate,
          });
          const legacyScore = scoreKeywordBankCandidate(
            intent.category,
            descriptorKeywords,
            primaryKeyword,
            negativeKeywords,
            candidate,
          );
          return { candidate, score: reuse.score, legacyScore, ...reuse };
        })
        .filter((entry) =>
          entry.legacyScore >= 0 &&
          entry.eligible &&
          !hasNegativeKeywordConflict(entry.candidate) &&
          !entry.descriptorConflict
        )
        .sort((a, b) => b.score - a.score)[0]?.candidate ?? null;

      const existing = [exactKeywordMatch, exactFingerprintMatch, bestSimilarityMatch].find(
        (candidate): candidate is SharedBankRecord => Boolean(candidate && !hasNegativeKeywordConflict(candidate)),
      ) ?? null;
      const reuseScore = existing
        ? scoreKeywordBankCandidate(
            intent.category,
            descriptorKeywords,
            primaryKeyword,
            negativeKeywords,
            existing,
          )
        : -1;
      const hasExactProductRecord = Boolean(
        existing?.link_kind === "product" &&
          existing?.exact_match_confirmed &&
          !hasNegativeKeywordConflict(existing) &&
          reuseScore >= 0,
      );

      let resolved: SharedBankRecord;
      if (existing && hasExactProductRecord) {
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
        const bankInsert = buildProductBankInsertFromExactScrape({
          intent,
          scraped: scraped ?? {
            image_url: null,
            product_url: null,
            price: null,
            scraped_description: null,
            scraped_product_title: null,
            product_match_confidence: 0,
            exact_match_confirmed: false,
          },
          sourceVersion: getCatalogVersion(),
          resolverSource: "firecrawl-exact",
          verifiedAt: "2026-04-08T00:00:00.000Z",
        });
        const productUrl = bankInsert?.product_url
          ? bankInsert.product_url
          : fallback.exact_match_confirmed && fallback.link_kind === "product"
            ? fallback.link_url
            : null;
        const linkKind = productUrl ? "product" : fallback.link_kind;
        resolved = {
          fingerprint,
          brand: intent.brand,
          product_name: intent.name,
          category: intent.category,
          recommendation_kind: intent.recommendation_kind,
          primary_keyword: primaryKeyword,
          descriptor_keywords: descriptorKeywords,
          link_kind: linkKind,
          link_url: productUrl || fallback.link_url,
          search_query: fallback.search_query ?? intent.search_query ?? null,
          price: productUrl ? (bankInsert?.product_price_text ?? fallback.price ?? intent.price) : fallback.price ?? intent.price,
          image_url: productUrl ? (bankInsert?.product_image_url ?? fallback.image_url ?? null) : null,
          intent_keywords: normalizedKeywords,
          keyword_signature: keywordSignature,
          scraped_description: bankInsert?.scraped_description ?? fallback.scraped_description,
          scraped_product_title: bankInsert?.product_title ?? fallback.scraped_product_title,
          product_match_confidence: bankInsert?.match_confidence ?? scraped?.product_match_confidence ?? fallback.product_match_confidence,
          exact_match_confirmed: bankInsert?.exact_match_confirmed ?? false,
          source_version: getCatalogVersion(),
          resolver_source: bankInsert ? "firecrawl-exact" : fallback.resolver_source,
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
    "descriptor_keywords",
    "exact_match_confirmed",
    "fingerprint",
    "image_url",
    "intent_keywords",
    "keyword_signature",
    "link_kind",
    "link_url",
    "price",
    "primary_keyword",
    "product_match_confidence",
    "product_name",
    "recommendation_kind",
    "resolver_source",
    "scraped_description",
    "scraped_product_title",
    "search_query",
    "source_version",
    "usage_count",
  ].join(",");
};
