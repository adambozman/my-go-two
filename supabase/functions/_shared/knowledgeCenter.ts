import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

type JsonObject = Record<string, unknown>;

type SnapshotQuery = {
  select: (columns: string) => {
    eq: (column: string, value: string) => {
      maybeSingle: () => Promise<{ data: unknown; error: unknown }>;
    };
  };
};

type DerivationQuery = {
  select: (columns: string) => {
    eq: (column: string, value: string) => {
      order: (
        column: string,
        options: { ascending: boolean },
      ) => Promise<{ data: unknown; error: unknown }>;
    };
  };
};

interface KnowledgeCenterClient {
  from(table: "user_knowledge_snapshots"): SnapshotQuery;
  from(table: "user_knowledge_derivations"): DerivationQuery;
  from(table: string): SnapshotQuery | DerivationQuery;
}

export interface KnowledgeSnapshotRow {
  user_id: string;
  profile_core: JsonObject | null;
  onboarding_responses: JsonObject | null;
  know_me_responses: JsonObject | null;
  saved_product_cards: Array<Record<string, unknown>> | null;
  user_connections: Array<Record<string, unknown>> | null;
  snapshot_payload: JsonObject | null;
  updated_at: string | null;
}

export interface KnowledgeDerivationRow {
  id: string;
  user_id: string;
  derivation_key: string;
  derivation_payload: JsonObject | null;
  source_snapshot: unknown;
  created_at: string;
  updated_at: string;
}

export const toRecord = (value: unknown): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};

export const toRecordArray = <T = Record<string, unknown>>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

export const toStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];

export const getCombinedKnowledgeResponses = (
  snapshot: KnowledgeSnapshotRow | null,
): JsonObject => ({
  ...toRecord(snapshot?.onboarding_responses),
  ...toRecord(snapshot?.know_me_responses),
});

export const getKnowledgeDerivationPayload = (
  derivations: KnowledgeDerivationRow[],
  derivationKey: string,
): JsonObject => {
  const match = derivations.find((item) => item.derivation_key === derivationKey);
  return toRecord(match?.derivation_payload);
};

export const buildCatalogAiAdapter = (
  snapshot: KnowledgeSnapshotRow | null,
  derivations: KnowledgeDerivationRow[],
) => ({
  combinedResponses: getCombinedKnowledgeResponses(snapshot),
  profileCore: toRecord(snapshot?.profile_core),
  yourVibe: getKnowledgeDerivationPayload(derivations, "your_vibe"),
  snapshotPayload: toRecord(snapshot?.snapshot_payload),
  derivations: derivations.map((item) => ({
    derivationKey: item.derivation_key,
    derivationPayload: toRecord(item.derivation_payload),
  })),
});

export const fetchKnowledgeCenterState = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const knowledgeClient = supabase as unknown as KnowledgeCenterClient;
  const [{ data: snapshotData, error: snapshotError }, { data: derivationData, error: derivationError }] =
    await Promise.all([
      knowledgeClient
        .from("user_knowledge_snapshots")
        .select("user_id, profile_core, onboarding_responses, know_me_responses, saved_product_cards, user_connections, snapshot_payload, updated_at")
        .eq("user_id", userId)
        .maybeSingle(),
      knowledgeClient
        .from("user_knowledge_derivations")
        .select("id, user_id, derivation_key, derivation_payload, source_snapshot, created_at, updated_at")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false }),
    ]);

  if (snapshotError) throw snapshotError;
  if (derivationError) throw derivationError;

  return {
    snapshot: (snapshotData as KnowledgeSnapshotRow | null) ?? null,
    derivations: Array.isArray(derivationData) ? (derivationData as KnowledgeDerivationRow[]) : [],
  };
};

// Codebase classification: runtime knowledge-center edge-function helper.
