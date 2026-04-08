import { describe, expect, it } from "vitest";
import {
  pickBestImage,
  pickBestSearchResult,
  scoreExactProductMatch,
  scoreImageUrl,
  scoreTitleAndUrlMatch,
} from "../../supabase/functions/_shared/exactProductScraper.ts";

describe("exact product scraper scoring", () => {
  it("rejects tiny or non-product images and prefers strong PDP images", () => {
    expect(
      scoreImageUrl(
        "https://cdn.example.com/nav/logo.svg",
        "Skinny Blue Jeans",
        "American Eagle",
      ),
    ).toBe(-1);

    expect(
      scoreImageUrl(
        "https://cdn.example.com/images/skinny-blue-jeans.jpg?w=1200",
        "Skinny Blue Jeans",
        "American Eagle",
      ),
    ).toBeGreaterThan(
      scoreImageUrl(
        "https://cdn.example.com/images/skinny-blue-jeans.jpg?w=180",
        "Skinny Blue Jeans",
        "American Eagle",
      ),
    );

    expect(
      pickBestImage(
        [
          "https://cdn.example.com/nav/logo.svg",
          "https://cdn.example.com/products/american-eagle-skinny-blue-jeans-main.jpg?w=1200",
          "https://cdn.example.com/products/american-eagle-skinny-blue-jeans-side.jpg?w=420",
        ],
        "Skinny Blue Jeans",
        "American Eagle",
      ),
    ).toEqual({
      imageUrl: "https://cdn.example.com/products/american-eagle-skinny-blue-jeans-main.jpg?w=1200",
      imageScore: expect.any(Number),
    });
  });

  it("requires the scraped title and url to align with the requested brand and product", () => {
    const exact = scoreTitleAndUrlMatch(
      "American Eagle",
      "Skinny Blue Jeans",
      "American Eagle Skinny Blue Jeans",
      "https://www.ae.com/us/en/p/skinny-blue-jeans",
    );
    expect(exact.brandMatched).toBe(true);
    expect(exact.productMatched).toBe(true);
    expect(exact.brandCoverage).toBe(1);
    expect(exact.nameCoverage).toBeGreaterThanOrEqual(0.66);

    const wrongBrand = scoreTitleAndUrlMatch(
      "American Eagle",
      "Skinny Blue Jeans",
      "H&M Skinny Blue Jeans",
      "https://www2.hm.com/en_us/productpage.skinny-blue-jeans.html",
    );
    expect(wrongBrand.brandMatched).toBe(false);

    const collectionPage = scoreTitleAndUrlMatch(
      "American Eagle",
      "Skinny Blue Jeans",
      "American Eagle Denim Collection",
      "https://www.ae.com/us/en/c/women/jeans",
    );
    expect(collectionPage.productMatched).toBe(false);
  });

  it("only confirms exact products when title, pdp url, price, and confident image all line up", () => {
    expect(
      scoreExactProductMatch({
        brand: "American Eagle",
        productName: "Skinny Blue Jeans",
        title: "American Eagle Skinny Blue Jeans",
        url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
        hasPrice: true,
        hasConfidentImage: true,
      }),
    ).toEqual({
      confidence: 100,
      exact: true,
    });

    const noPrice = scoreExactProductMatch({
      brand: "American Eagle",
      productName: "Skinny Blue Jeans",
      title: "American Eagle Skinny Blue Jeans",
      url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
      hasPrice: false,
      hasConfidentImage: true,
    });
    expect(noPrice.exact).toBe(false);

    const noImage = scoreExactProductMatch({
      brand: "American Eagle",
      productName: "Skinny Blue Jeans",
      title: "American Eagle Skinny Blue Jeans",
      url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
      hasPrice: true,
      hasConfidentImage: false,
    });
    expect(noImage.exact).toBe(false);

    const wrongUrl = scoreExactProductMatch({
      brand: "American Eagle",
      productName: "Skinny Blue Jeans",
      title: "American Eagle Skinny Blue Jeans",
      url: "https://www.ae.com/us/en/c/women/jeans",
      hasPrice: true,
      hasConfidentImage: true,
    });
    expect(wrongUrl.exact).toBe(false);

    const wrongBrand = scoreExactProductMatch({
      brand: "American Eagle",
      productName: "Skinny Blue Jeans",
      title: "H&M Skinny Blue Jeans",
      url: "https://www2.hm.com/en_us/productpage.skinny-blue-jeans.html",
      hasPrice: true,
      hasConfidentImage: true,
    });
    expect(wrongBrand.exact).toBe(false);
    expect(wrongBrand.confidence).toBeLessThan(85);
  });

  it("prefers the best product-like search result over higher-ranked non-product pages", () => {
    const result = pickBestSearchResult(
      [
        {
          url: "https://www.ae.com/us/en/c/women/jeans",
          title: "American Eagle Denim Collection",
          markdown: "# American Eagle Denim Collection",
          metadata: {
            title: "American Eagle Denim Collection",
          },
        },
        {
          url: "https://www.ae.com/us/en/p/skinny-blue-jeans",
          title: "American Eagle Skinny Blue Jeans",
          markdown: "# American Eagle Skinny Blue Jeans",
          metadata: {
            title: "American Eagle Skinny Blue Jeans",
          },
        },
      ],
      "American Eagle",
      "Skinny Blue Jeans",
    ) as { url: string };

    expect(result.url).toBe("https://www.ae.com/us/en/p/skinny-blue-jeans");
  });
});
