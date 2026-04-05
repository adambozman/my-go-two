import { normalizeGender, type Gender } from "@/lib/gender";
import type { Json } from "@/integrations/supabase/runtime-types";

type JsonObject = Record<string, unknown>;

export type KnowledgeResponseValue = string | string[] | null;
export type KnowledgeResponseRecord = Record<string, KnowledgeResponseValue>;

export interface OnboardingResponse {
  id: string;
  user_id: string;
  question_key: string;
  response_value: Json;
  created_at: string;
  updated_at: string;
}

export interface KnowMeResponse {
  id: string;
  user_id: string;
  question_key: string;
  response_value: Json;
  created_at: string;
  updated_at: string;
}

export interface SavedProductCard {
  id: string;
  user_id: string;
  product_card_key: string;
  subcategory_label: string;
  card_title: string;
  field_values: Record<string, string>;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SharedSavedProductCard {
  id: string;
  owner_user_id: string;
  connection_user_id: string;
  user_connection_id: string;
  saved_product_card_id: string;
  created_at: string;
}

export interface UserConnection {
  id: string;
  connection_user_id?: string | null;
  invitee_email?: string | null;
  display_label?: string | null;
  photo_url?: string | null;
  status: string;
  role?: string | null;
  updated_at?: string | null;
}

export interface ConnectionAccessSettings {
  id: string;
  owner_user_id: string;
  connection_user_id: string;
  user_connection_id: string;
  connection_kind: string;
  access_tier: string;
  feed_enabled: boolean;
  occasion_tracking_enabled: boolean;
  for_them_enabled: boolean;
  gifting_enabled: boolean;
  feature_gates: Json;
  created_at: string;
  updated_at: string;
}

export interface UserKnowledgeFact {
  user_id: string;
  fact_source: string;
  fact_key: string;
  fact_value: Json;
  recorded_at: string;
}

export interface UserKnowledgeDerivation {
  id: string;
  user_id: string;
  derivation_key: string;
  derivation_payload: JsonObject;
  source_snapshot: Json | null;
  created_at: string;
  updated_at: string;
}

export interface UserKnowledgeSnapshot {
  user_id: string;
  profile_core: JsonObject;
  onboarding_responses: JsonObject;
  know_me_responses: JsonObject;
  saved_product_cards: SavedProductCard[];
  user_connections: UserConnection[];
  snapshot_payload: JsonObject;
  updated_at: string;
}

export interface UseKnowledgeCenterResult {
  knowledgeSnapshot: UserKnowledgeSnapshot | null;
  knowledgeDerivations: UserKnowledgeDerivation[];
  loading: boolean;
  refreshKnowledge: () => Promise<void>;
}

export interface YourVibeDerivation {
  recommended_brands: string[];
  recommended_stores: string[];
  image_themes: string[];
  color_palette: string[];
  gift_categories: string[];
  price_tier: string;
  style_keywords: string[];
  persona_summary: string;
}

const toStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
};

const sanitizeDerivationValue = (value: unknown): unknown => {
  if (typeof value === "string") {
    let cleaned = value.replace(/[^\x20-\x7E\n\r\t]/g, "").trim();
    cleaned = cleaned.replace(/^[[]{},\s:]+/, "").replace(/[[]{},\s:]+$/, "").trim();
    if (/[[\]{}]/.test(cleaned) || cleaned.includes("_keywords") || cleaned.length < 2) {
      return "";
    }
    return cleaned;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeDerivationValue).filter((item) => {
      if (typeof item === "string") return item.length > 0;
      return Boolean(item);
    });
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, sanitizeDerivationValue(entry)]),
    );
  }

  return value;
};

export const sanitizeKnowledgeDerivationPayload = <T extends JsonObject>(
  value: T | null | undefined,
): T | null => {
  if (!value || typeof value !== "object") return null;
  return sanitizeDerivationValue(value) as T;
};

export const asKnowledgeResponseValue = (value: unknown): KnowledgeResponseValue => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const values = value.filter((item): item is string => typeof item === "string");
    return values;
  }
  return null;
};

export const toKnowledgeResponseRecord = (value: unknown): KnowledgeResponseRecord => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, asKnowledgeResponseValue(entry)]),
  );
};

export const getCombinedKnowledgeResponses = (
  snapshot: UserKnowledgeSnapshot | null,
): KnowledgeResponseRecord => ({
  ...toKnowledgeResponseRecord(snapshot?.onboarding_responses),
  ...toKnowledgeResponseRecord(snapshot?.know_me_responses),
});

export const getYourVibeDerivation = (
  derivations: UserKnowledgeDerivation[],
): YourVibeDerivation | null => {
  const record = derivations.find((item) => item.derivation_key === "your_vibe");
  const payload = sanitizeKnowledgeDerivationPayload(record?.derivation_payload);
  if (!payload) return null;

  return {
    recommended_brands: toStringArray(payload.recommended_brands),
    recommended_stores: toStringArray(payload.recommended_stores),
    image_themes: toStringArray(payload.image_themes),
    color_palette: toStringArray(payload.color_palette),
    gift_categories: toStringArray(payload.gift_categories),
    price_tier: typeof payload.price_tier === "string" ? payload.price_tier : "",
    style_keywords: toStringArray(payload.style_keywords),
    persona_summary: typeof payload.persona_summary === "string" ? payload.persona_summary : "",
  };
};

export const getKnowledgeGender = (snapshot: UserKnowledgeSnapshot | null): Gender => {
  const rawGender =
    snapshot?.profile_core && typeof snapshot.profile_core.gender === "string"
      ? snapshot.profile_core.gender
      : null;

  return normalizeGender(rawGender);
};

export const buildKnowledgeAiAdapter = (
  snapshot: UserKnowledgeSnapshot | null,
  derivations: UserKnowledgeDerivation[],
) => ({
  knowledgeSnapshot: snapshot?.snapshot_payload ?? {},
  knowledgeDerivations: derivations.map((item) => ({
    derivationKey: item.derivation_key,
    derivationPayload: item.derivation_payload,
  })),
  combinedResponses: getCombinedKnowledgeResponses(snapshot),
  yourVibe: getYourVibeDerivation(derivations),
});

// Codebase classification: runtime knowledge-center utilities.
