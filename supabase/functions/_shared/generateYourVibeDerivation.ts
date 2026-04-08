import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getBankKnowledgeDerivation } from "./recommendationCatalog.ts";

type ResponseMap = Record<string, unknown>;

type YourVibeDerivation = {
  recommended_brands: string[];
  recommended_stores: string[];
  image_themes: string[];
  color_palette: string[];
  gift_categories: string[];
  price_tier: "budget" | "mid-range" | "premium" | "luxury";
  style_keywords: string[];
  persona_summary: string;
};

type UpsertableTable = {
  upsert: (
    values: Record<string, unknown>,
    options: { onConflict: string },
  ) => Promise<{ error: unknown }>;
};

type UpsertCapableClient = {
  from: (table: string) => UpsertableTable;
};

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];

const getStyleSummary = (combinedResponses: ResponseMap) => {
  const rawStyle = combinedResponses["style-personality"];
  const styles = toStringArray(rawStyle);
  return styles.length > 0 ? styles : ["versatile"];
};

const buildFallbackYourVibe = (combinedResponses: ResponseMap): YourVibeDerivation => {
  const styleKeywords = getStyleSummary(combinedResponses);
  const catalogKnowledgeProfile = getBankKnowledgeDerivation(combinedResponses, {});

  return {
    recommended_brands: catalogKnowledgeProfile.recommended_brands,
    recommended_stores: catalogKnowledgeProfile.recommended_stores,
    image_themes: ["lifestyle", "modern wardrobe", "elevated essentials"],
    color_palette: ["#2C3E50", "#E8C6AE", "#6B6D62", "#D4A574", "#3A7CA5"],
    gift_categories: ["thoughtful essentials", "experiences", "style upgrades"],
    price_tier: "mid-range",
    style_keywords: styleKeywords,
    persona_summary: `A person with a ${styleKeywords.join(", ")} style who values thoughtful, practical choices and consistent taste signals.`,
  };
};

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

export const generateYourVibeDerivation = async (
  combinedResponses: ResponseMap,
): Promise<YourVibeDerivation> => {
  const LOVABLE_API_KEY = getRequiredEnv("LOVABLE_API_KEY");

  const answersText = Object.entries(combinedResponses)
    .map(([key, value]) => {
      const display = Array.isArray(value) ? value.join(", ") : String(value);
      return `${key}: ${display}`;
    })
    .join("\n");

  const systemPrompt = `You are GoTwo's Knowledge Center derivation engine.
Based on the user's onboarding and Know Me responses, generate one structured "Your Vibe" derivation that can power recommendations and summaries across the app.

Rules:
- Do not segment recommendations by gender.
- Derive the output from the user's actual answers only.
- Keep the persona summary concise, specific, and grounded in the user's signals.
- Use real brand and store names.
- For image_themes, use search-friendly phrases that match the user's aesthetic.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here are the user's Knowledge Center responses:\n\n${answersText}` },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "generate_your_vibe_derivation",
            description: "Generate the user's Your Vibe derivation from Knowledge Center responses",
            parameters: {
              type: "object",
              properties: {
                recommended_brands: { type: "array", items: { type: "string" } },
                recommended_stores: { type: "array", items: { type: "string" } },
                image_themes: { type: "array", items: { type: "string" } },
                color_palette: { type: "array", items: { type: "string" } },
                gift_categories: { type: "array", items: { type: "string" } },
                price_tier: {
                  type: "string",
                  enum: ["budget", "mid-range", "premium", "luxury"],
                },
                style_keywords: { type: "array", items: { type: "string" } },
                persona_summary: { type: "string" },
              },
              required: [
                "recommended_brands",
                "recommended_stores",
                "image_themes",
                "color_palette",
                "gift_categories",
                "price_tier",
                "style_keywords",
                "persona_summary",
              ],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "generate_your_vibe_derivation" } },
    }),
  });

  if (!response.ok) {
    throw new Error(`AI gateway error (${response.status})`);
  }

  const aiResult = await response.json();
  const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
  const parsed =
    toolCall?.function?.arguments
      ? JSON.parse(toolCall.function.arguments)
      : buildFallbackYourVibe(combinedResponses);

  const catalogKnowledgeProfile = getBankKnowledgeDerivation(combinedResponses, parsed);

  return {
    ...buildFallbackYourVibe(combinedResponses),
    ...parsed,
    recommended_brands: catalogKnowledgeProfile.recommended_brands,
    recommended_stores: catalogKnowledgeProfile.recommended_stores,
  };
};

export const upsertYourVibeDerivation = async (
  supabase: SupabaseClient,
  userId: string,
  derivationPayload: YourVibeDerivation,
  sourceSnapshot: unknown,
) => {
  const { error } = await (supabase as unknown as UpsertCapableClient)
    .from("knowledge_derivations")
    .upsert(
      {
        user_id: userId,
        derivation_key: "your_vibe",
        derivation_payload: derivationPayload,
        source_snapshot: sourceSnapshot ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,derivation_key" },
    );

  if (error) throw error;
};

// Codebase classification: runtime knowledge-derivation helper.
