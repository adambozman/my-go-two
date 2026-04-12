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

const isMissingKnowledgeCenterSchema = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String(error.code ?? "") : "";
  const message = "message" in error ? String(error.message ?? "") : "";
  return code === "PGRST205" || message.includes("schema cache") || message.includes("user_knowledge_");
};

const toResponseRecord = (
  rows: Array<{ question_key: string; response_value: unknown }> | null | undefined,
): JsonObject =>
  Object.fromEntries(
    (rows ?? [])
      .filter((row) => typeof row?.question_key === "string" && row.question_key.length > 0)
      .map((row) => [row.question_key, row.response_value]),
  );

const fetchKnowledgeCenterFallbackState = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const baseClient = supabase as unknown as {
    from: (table: string) => {
      select: (columns: string) => {
        eq: (column: string, value: string) => {
          maybeSingle: () => Promise<{ data: unknown; error: unknown }>;
          order: (
            column: string,
            options: { ascending: boolean },
          ) => Promise<{ data: unknown; error: unknown }>;
          then?: never;
        };
      };
    };
  };

  const [
    profileResult,
    onboardingResult,
    knowMeResult,
    savedCardsResult,
    connectionsResult,
    derivationsResult,
  ] = await Promise.all([
    baseClient.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
    baseClient.from("onboarding_responses").select("question_key, response_value").eq("user_id", userId).order("question_key", { ascending: true }),
    baseClient.from("know_me_responses").select("question_key, response_value").eq("user_id", userId).order("question_key", { ascending: true }),
    baseClient.from("saved_product_cards").select("*").eq("user_id", userId).order("updated_at", { ascending: false }),
    baseClient.from("user_connections").select("id, connection_user_id, invitee_email, display_label, photo_url, status, role, updated_at").eq("owner_user_id", userId).order("updated_at", { ascending: false }),
    baseClient.from("knowledge_derivations").select("id, user_id, derivation_key, derivation_payload, source_snapshot, created_at, updated_at").eq("user_id", userId).order("updated_at", { ascending: false }),
  ]);

  if (profileResult.error) throw profileResult.error;
  if (onboardingResult.error) throw onboardingResult.error;
  if (knowMeResult.error) throw knowMeResult.error;
  if (savedCardsResult.error) throw savedCardsResult.error;
  if (connectionsResult.error) throw connectionsResult.error;
  if (derivationsResult.error) throw derivationsResult.error;

  const profileData = toRecord(profileResult.data);
  const { user_id: _userId, ...profileCore } = profileData;

  return {
    snapshot: {
      user_id: userId,
      profile_core: profileCore,
      onboarding_responses: toResponseRecord(onboardingResult.data as Array<{ question_key: string; response_value: unknown }> | null),
      know_me_responses: toResponseRecord(knowMeResult.data as Array<{ question_key: string; response_value: unknown }> | null),
      saved_product_cards: toRecordArray(savedCardsResult.data),
      user_connections: toRecordArray(connectionsResult.data),
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    } as KnowledgeSnapshotRow,
    derivations: Array.isArray(derivationsResult.data) ? (derivationsResult.data as KnowledgeDerivationRow[]) : [],
  };
};

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

  if (snapshotError || derivationError) {
    const primaryError = snapshotError ?? derivationError;
    if (isMissingKnowledgeCenterSchema(primaryError)) {
      return fetchKnowledgeCenterFallbackState(supabase, userId);
    }
    throw primaryError;
  }

  return {
    snapshot: (snapshotData as KnowledgeSnapshotRow | null) ?? null,
    derivations: Array.isArray(derivationData) ? (derivationData as KnowledgeDerivationRow[]) : [],
  };
};

// Codebase classification: runtime knowledge-center edge-function helper.
