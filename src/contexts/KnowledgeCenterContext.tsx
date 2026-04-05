import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { KnowledgeCenterContext } from "@/contexts/knowledge-center-context";
import { supabase } from "@/integrations/supabase/client";
import type { UserKnowledgeDerivation, UserKnowledgeSnapshot } from "@/lib/knowledgeCenter";

type KnowledgeSnapshotRow = UserKnowledgeSnapshot | null;
type KnowledgeDerivationRow = UserKnowledgeDerivation;

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

export const KnowledgeCenterProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [knowledgeSnapshot, setKnowledgeSnapshot] = useState<UserKnowledgeSnapshot | null>(null);
  const [knowledgeDerivations, setKnowledgeDerivations] = useState<UserKnowledgeDerivation[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshKnowledge = useCallback(async () => {
    if (!user) {
      setKnowledgeSnapshot(null);
      setKnowledgeDerivations([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [snapshotResult, derivationResult] = await Promise.all([
        (supabase as any)
          .from("user_knowledge_snapshots")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        (supabase as any)
          .from("user_knowledge_derivations")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false }),
      ]);

      if (snapshotResult.error) throw snapshotResult.error;
      if (derivationResult.error) throw derivationResult.error;

      setKnowledgeSnapshot(
        (snapshotResult.data as KnowledgeSnapshotRow | null) ?? emptySnapshot(user.id),
      );
      setKnowledgeDerivations(
        ((derivationResult.data as KnowledgeDerivationRow[] | null) ?? []).filter(Boolean),
      );
    } catch (error) {
      console.error("Failed to load knowledge center data:", error);
      setKnowledgeSnapshot(emptySnapshot(user.id));
      setKnowledgeDerivations([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshKnowledge();
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
