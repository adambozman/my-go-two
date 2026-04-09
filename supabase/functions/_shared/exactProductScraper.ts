import { looksLikeProductPageUrl, normalizeLoose } from "./recommendationCatalog.ts";

export interface ExactProductScrapeResult {
  image_url: string | null;
  product_url: string | null;
  price: string | null;
  scraped_description: string | null;
  scraped_product_title: string | null;
  product_match_confidence: number;
  exact_match_confirmed: boolean;
  image_verification_status?: string | null;
  exact_match_reasons?: string[] | null;
}

type SearchResult = Record<string, unknown>;

const IMAGE_REJECT_WORDS = [
  "icon", "logo", "sprite", "1x1", "pixel", ".svg", "badge", "banner-ad",
  "nav", "navtile", "nav-tile", "category-tile", "placeholder", "spacer",
  "tracking", "loading", "spinner", "arrow", "chevron", "caret",
  "social-", "facebook", "twitter", "instagram", "pinterest", "youtube",
  "flag", "payment", "visa", "mastercard", "amex", "paypal",
  "star-rating", "review", "trustpilot",
];

const IMAGE_BOOST_PATTERNS = [
  /product/i, /pdp/i, /hero/i, /main/i, /primary/i,
  /detail/i, /zoom/i, /full/i, /large/i, /1200/i, /2048/i, /1024/i,
];

const TITLE_STOP_WORDS = new Set([
  "the", "and", "with", "for", "from", "this", "that", "your", "our", "new",
  "men", "mens", "women", "womens", "unisex", "size", "color", "colour",
]);

const cleanText = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
};

const toObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};

const tokenize = (value: string) =>
  normalizeLoose(value)
    .split(/\s+/)
    .filter((token) => token.length >= 2 && !TITLE_STOP_WORDS.has(token));

const unique = (values: string[]) => Array.from(new Set(values));

const extractMarkdownHeading = (markdown: string) => {
  const match = markdown.match(/^#\s+(.+)$/m);
  return cleanText(match?.[1] ?? "");
};

const extractTitleCandidates = (metadata: Record<string, unknown>, markdown: string, fallbackTitle: string) =>
  unique([
    cleanText(metadata.ogTitle),
    cleanText(metadata.title),
    cleanText(metadata.twitterTitle),
    extractMarkdownHeading(markdown),
    cleanText(fallbackTitle),
  ].filter(Boolean));

const extractBestTitle = (metadata: Record<string, unknown>, markdown: string, fallbackTitle: string) =>
  extractTitleCandidates(metadata, markdown, fallbackTitle)[0] ?? null;

const extractBestDescription = (markdown: string) => {
  const paragraphs = markdown
    .split(/\n{2,}/)
    .map((part) => cleanText(part.replace(/^#+\s*/, "")))
    .filter((part) => part.length >= 60);
  return paragraphs[0] ?? null;
};

const extractPrice = (input: string) => {
  const match = input.match(/\$[\d,]+(?:\.\d{2})?/);
  return match?.[0] ?? null;
};

export const scoreImageUrl = (url: string, productName: string, brand: string): number => {
  const lower = url.toLowerCase();
  for (const word of IMAGE_REJECT_WORDS) {
    if (lower.includes(word)) return -1;
  }

  const dimMatch = lower.match(/(?:width|w|height|h)[=_](\d+)/i);
  if (dimMatch && parseInt(dimMatch[1], 10) < 200) return -1;

  let score = 0;
  for (const pattern of IMAGE_BOOST_PATTERNS) {
    if (pattern.test(lower)) score += 2;
  }

  if (dimMatch) {
    const dimension = parseInt(dimMatch[1], 10);
    if (dimension >= 600) score += 3;
    else if (dimension >= 400) score += 1;
  }

  const matchTerms = unique([...tokenize(brand), ...tokenize(productName).filter((term) => term.length >= 4)]);
  for (const term of matchTerms) {
    if (lower.includes(term)) score += 2;
  }

  if (/\.(jpg|jpeg|png|webp|avif)/i.test(lower)) score += 1;
  return score;
};

export const pickBestImage = (urls: string[], productName: string, brand: string) => {
  const best = urls
    .map((url) => ({ url, score: scoreImageUrl(url, productName, brand) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score)[0];

  return {
    imageUrl: best?.url ?? null,
    imageScore: best?.score ?? -1,
  };
};

const extractMarkdownImageUrls = (markdown: string) =>
  [...markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/gi)].map((match) => match[1]);

export const scoreTitleAndUrlMatch = (
  brand: string,
  productName: string,
  title: string | null,
  url: string | null,
) => {
  const combinedTokens = new Set(tokenize(`${title ?? ""} ${url ?? ""}`));
  const brandTerms = tokenize(brand);
  const productTerms = tokenize(productName).filter((term) => !brandTerms.includes(term));

  const brandMatches = brandTerms.filter((term) => combinedTokens.has(term));
  const productMatches = productTerms.filter((term) => combinedTokens.has(term));
  const brandCoverage = brandTerms.length ? brandMatches.length / brandTerms.length : 0;
  const nameCoverage = productTerms.length ? productMatches.length / productTerms.length : 0;

  return {
    brandCoverage,
    nameCoverage,
    brandMatched: brandCoverage >= 1,
    productMatched: productTerms.length === 0 ? brandCoverage >= 1 : nameCoverage >= 0.6,
  };
};

export const scoreExactProductMatch = ({
  brand,
  productName,
  title,
  url,
  hasPrice,
  hasConfidentImage,
}: {
  brand: string;
  productName: string;
  title: string | null;
  url: string | null;
  hasPrice: boolean;
  hasConfidentImage: boolean;
}) => {
  const titleScore = scoreTitleAndUrlMatch(brand, productName, title, url);
  const productUrl = looksLikeProductPageUrl(url);
  const confidence = Math.round(
    (titleScore.brandCoverage * 35) +
    (titleScore.nameCoverage * 40) +
    (productUrl ? 15 : 0) +
    (hasConfidentImage ? 5 : 0) +
    (hasPrice ? 5 : 0),
  );

  return {
    confidence,
    exact: titleScore.brandMatched && titleScore.productMatched && productUrl && hasConfidentImage && hasPrice && confidence >= 85,
  };
};

export const verifyRemoteImageUrl = async (url: string | null) => {
  if (!url) return { ok: false, status: "missing" };

  const runRequest = async (method: "HEAD" | "GET") => {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      headers: method === "GET" ? { Range: "bytes=0-0" } : undefined,
    });
    const contentType = cleanText(response.headers.get("content-type"));
    return {
      ok: response.ok && contentType.toLowerCase().startsWith("image/"),
      status: !response.ok
        ? `http-${response.status}`
        : !contentType.toLowerCase().startsWith("image/")
          ? "non-image"
          : "verified",
    };
  };

  try {
    const head = await runRequest("HEAD");
    if (head.ok || head.status === "non-image") return head;
  } catch {
    // Fall through to GET probe.
  }

  try {
    return await runRequest("GET");
  } catch {
    return { ok: false, status: "unreachable" };
  }
};

export const pickBestSearchResult = (results: SearchResult[], brand: string, productName: string) => {
  const ranked = results
    .map((result, index) => {
      const metadata = toObject(result.metadata);
      const url = cleanText(result.url) || cleanText(metadata.sourceURL);
      const title = extractBestTitle(metadata, cleanText(result.markdown), cleanText(result.title));
      const titleScore = scoreTitleAndUrlMatch(brand, productName, title, url);
      const score = Math.round(
        (titleScore.brandCoverage * 45) +
        (titleScore.nameCoverage * 45) +
        (looksLikeProductPageUrl(url) ? 15 : 0) -
        (index * 2),
      );

      return { result, score };
    })
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.result ?? results[0];
};

export const scrapeExactProductWithFirecrawl = async ({
  brand,
  productName,
  searchQuery,
  logPrefix = "[firecrawl]",
}: {
  brand: string;
  productName: string;
  searchQuery: string | null;
  logPrefix?: string;
}): Promise<ExactProductScrapeResult | null> => {
  const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!firecrawlApiKey) return null;

  try {
    const query = searchQuery || `${brand} ${productName} buy`;
    console.log(`${logPrefix} search`, query);

    const searchRes = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit: 5,
        scrapeOptions: { formats: ["markdown"] },
      }),
    });

    if (!searchRes.ok) {
      console.error(`${logPrefix} search failed`, searchRes.status);
      return null;
    }

    const searchData = await searchRes.json();
    const results = Array.isArray(searchData?.data) ? searchData.data as SearchResult[] : Array.isArray(searchData?.results) ? searchData.results as SearchResult[] : [];
    if (results.length === 0) return null;

    const bestResult = pickBestSearchResult(results, brand, productName);
    const bestMetadata = toObject(bestResult.metadata);
    const productUrl = cleanText(bestResult.url) || cleanText(bestMetadata.sourceURL) || null;
    if (!productUrl) return null;

    const scrapeRes = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: productUrl,
        formats: ["markdown"],
        onlyMainContent: true,
        waitFor: 1500,
      }),
    });

    if (!scrapeRes.ok) {
      console.error(`${logPrefix} scrape failed`, scrapeRes.status);
      return null;
    }

    const scrapeData = await scrapeRes.json();
    const metadata = toObject(scrapeData?.data?.metadata ?? scrapeData?.metadata);
    const rawMarkdown = typeof scrapeData?.data?.markdown === "string"
      ? scrapeData.data.markdown
      : typeof scrapeData?.markdown === "string"
        ? scrapeData.markdown
        : "";
    const scrapedProductTitle = extractBestTitle(metadata, rawMarkdown, cleanText(bestResult.title));
    const imageCandidates = unique([
      cleanText(metadata.ogImage),
      ...extractMarkdownImageUrls(rawMarkdown),
    ].filter(Boolean));
    const bestImage = pickBestImage(imageCandidates, productName, brand);
    const scrapedPrice = extractPrice([
      cleanText(metadata.productPrice),
      cleanText(metadata.price),
      cleanText(rawMarkdown),
    ].filter(Boolean).join(" "));
    const scrapedDescription = extractBestDescription(rawMarkdown);
    const imageVerification = await verifyRemoteImageUrl(bestImage.imageUrl);
    const match = scoreExactProductMatch({
      brand,
      productName,
      title: scrapedProductTitle,
      url: productUrl,
      hasPrice: Boolean(scrapedPrice),
      hasConfidentImage: Boolean(bestImage.imageUrl) && bestImage.imageScore >= 3 && imageVerification.ok,
    });
    const exactMatchReasons = [
      match.exact ? "exact-product-verified" : "exact-product-rejected",
      looksLikeProductPageUrl(productUrl) ? "pdp-url" : "non-pdp-url",
      scrapedPrice ? "price-found" : "price-missing",
      imageVerification.status ?? "image-unknown",
      scrapedProductTitle ? "title-found" : "title-missing",
    ];

    console.log(`${logPrefix} resolved`, {
      url: productUrl,
      title: scrapedProductTitle,
      confidence: match.confidence,
      exact: match.exact,
    });

    if (!match.exact) {
      return {
        image_url: null,
        product_url: null,
        price: null,
        scraped_description: null,
        scraped_product_title: scrapedProductTitle,
        product_match_confidence: match.confidence,
        exact_match_confirmed: false,
        image_verification_status: imageVerification.status,
        exact_match_reasons: exactMatchReasons,
      };
    }

    return {
      image_url: bestImage.imageUrl,
      product_url: productUrl,
      price: scrapedPrice,
      scraped_description: scrapedDescription,
      scraped_product_title: scrapedProductTitle,
      product_match_confidence: match.confidence,
      exact_match_confirmed: true,
      image_verification_status: imageVerification.status,
      exact_match_reasons: exactMatchReasons,
    };
  } catch (error) {
    console.error(`${logPrefix} error`, error);
    return null;
  }
};
