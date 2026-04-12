import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { KnowledgeCenterContext } from "@/contexts/knowledge-center-context";
import { supabase } from "@/integrations/supabase/client";
import type { UserKnowledgeDerivation, UserKnowledgeSnapshot } from "@/lib/knowledgeCenter";

type KnowledgeSnapshotRow = UserKnowledgeSnapshot | null;
type KnowledgeDerivationRow = UserKnowledgeDerivation;

const isMissingKnowledgeCenterSchema = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String(error.code ?? "") : "";
  const message = "message" in error ? String(error.message ?? "") : "";
  return code === "PGRST205" || message.includes("schema cache") || message.includes("user_knowledge_");
};

const emptySnapshot = (userId: string): UserKnowledgeSnapshot => ({
  user_id: userId,
  profile_core: {},
  onboarding_responses: {},
  know_me_responses: {},
  saved_product_cards: [],
  user_connections: [],
  snapshot_payload: {},
  updated_at: new Date(0).toISOString(),
});

const toResponseRecord = (
  rows: Array<{ question_key: string; response_value: unknown }> | null | undefined,
) =>
  Object.fromEntries(
    (rows ?? [])
      .filter((row) => typeof row?.question_key === "string" && row.question_key.length > 0)
      .map((row) => [row.question_key, row.response_value]),
  );

const loadBaseKnowledgeState = async (userId: string) => {
  const [
    profileResult,
    onboardingResult,
    knowMeResult,
    savedCardsResult,
    connectionsResult,
    derivationsResult,
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("onboarding_responses").select("question_key, response_value").eq("user_id", userId),
    supabase.from("know_me_responses").select("question_key, response_value").eq("user_id", userId),
    supabase.from("saved_product_cards").select("*").eq("user_id", userId).order("updated_at", { ascending: false }),
    supabase.from("user_connections").select("id, connection_user_id, invitee_email, display_label, photo_url, status, role, updated_at").eq("owner_user_id", userId),
    supabase.from("knowledge_derivations").select("*").eq("user_id", userId).order("updated_at", { ascending: false }),
  ]);

  if (profileResult.error) throw profileResult.error;
  if (onboardingResult.error) throw onboardingResult.error;
  if (knowMeResult.error) throw knowMeResult.error;
  if (savedCardsResult.error) throw savedCardsResult.error;
  if (connectionsResult.error) throw connectionsResult.error;
  if (derivationsResult.error) throw derivationsResult.error;

  const { user_id: _userId, ...profileCore } = (profileResult.data ?? {}) as Record<string, unknown>;

  return {
    snapshot: {
      user_id: userId,
      profile_core: profileCore,
      onboarding_responses: toResponseRecord(onboardingResult.data as Array<{ question_key: string; response_value: unknown }> | null),
      know_me_responses: toResponseRecord(knowMeResult.data as Array<{ question_key: string; response_value: unknown }> | null),
      saved_product_cards: (savedCardsResult.data as UserKnowledgeSnapshot["saved_product_cards"]) ?? [],
      user_connections: (connectionsResult.data as UserKnowledgeSnapshot["user_connections"]) ?? [],
      snapshot_payload: {},
      updated_at: new Date().toISOString(),
    } satisfies UserKnowledgeSnapshot,
    derivations: (derivationsResult.data as UserKnowledgeDerivation[]) ?? [],
  };
};

export const KnowledgeCenterProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [knowledgeSnapshot, setKnowledgeSnapshot] = useState<UserKnowledgeSnapshot | null>(null);
  const [knowledgeDerivations, setKnowledgeDerivations] = useState<UserKnowledgeDerivation[]>([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const latestRefreshRequestRef = useRef(0);
  const schemaFallbackLoggedRef = useRef(false);

  const refreshKnowledge = useCallback(async () => {
    const activeUser = user;
    if (!user) {
      setKnowledgeSnapshot(null);
      setKnowledgeDerivations([]);
      setLoading(false);
      return;
    }

    const requestId = latestRefreshRequestRef.current + 1;
    latestRefreshRequestRef.current = requestId;
    setLoading(true);

    try {
      const [snapshotResult, derivationResult] = await Promise.all([
        supabase
          .from("user_knowledge_snapshots")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("user_knowledge_derivations")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false }),
      ]);

      if (snapshotResult.error) throw snapshotResult.error;
      if (derivationResult.error) throw derivationResult.error;

      if (!mountedRef.current || latestRefreshRequestRef.current !== requestId) return;

      setKnowledgeSnapshot(
        (snapshotResult.data as unknown as KnowledgeSnapshotRow | null) ?? emptySnapshot(activeUser.id),
      );
      setKnowledgeDerivations(
        ((derivationResult.data as KnowledgeDerivationRow[] | null) ?? []).filter(Boolean),
      );
    } catch (error) {
      if (isMissingKnowledgeCenterSchema(error)) {
        if (!schemaFallbackLoggedRef.current) {
          console.warn("Knowledge Center views are unavailable. Falling back to base-table reads.", error);
          schemaFallbackLoggedRef.current = true;
        }

        try {
          const fallbackState = await loadBaseKnowledgeState(activeUser.id);
          if (!mountedRef.current || latestRefreshRequestRef.current !== requestId) return;
          setKnowledgeSnapshot(fallbackState.snapshot);
          setKnowledgeDerivations(fallbackState.derivations);
          return;
        } catch (fallbackError) {
          console.error("Knowledge Center base-table fallback failed:", fallbackError);
        }
      } else {
        console.error("Failed to load knowledge center data:", error);
      }
      if (!mountedRef.current || latestRefreshRequestRef.current !== requestId) return;
      setKnowledgeSnapshot(emptySnapshot(activeUser.id));
      setKnowledgeDerivations([]);
    } finally {
      if (mountedRef.current && latestRefreshRequestRef.current === requestId) {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    mountedRef.current = true;
    void refreshKnowledge();
    return () => {
      mountedRef.current = false;
      latestRefreshRequestRef.current += 1;
    };
  }, [refreshKnowledge]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`knowledge-center-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles", filter: `user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "onboarding_responses", filter: `user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "know_me_responses", filter: `user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "saved_product_cards", filter: `user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "this_or_that_v2_answers", filter: `user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_connections", filter: `owner_user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "knowledge_derivations", filter: `user_id=eq.${user.id}` },
        () => void refreshKnowledge(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshKnowledge, user]);

  return (
    <KnowledgeCenterContext.Provider
      value={{ knowledgeSnapshot, knowledgeDerivations, loading, refreshKnowledge }}
    >
      {children}
    </KnowledgeCenterContext.Provider>
  );
};

// Codebase classification: runtime knowledge-center provider.
