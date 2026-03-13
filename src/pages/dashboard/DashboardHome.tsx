import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ConnectionPage from "./ConnectionPage";
import { getDefaultPhotoForLabel, assignUniquePhotos } from "@/data/stockPhotos";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";

const DEFAULT_IMAGE = getDefaultPhotoForLabel("friend");

interface ConnectionCard {
  id: string;
  name: string;
  image: string;
  email: string;
  status: string;
  isNew?: boolean;
}

const PLACEHOLDER_CONNECTIONS: ConnectionCard[] = [
  { id: "placeholder-wife", name: "Wife", image: "", email: "", status: "placeholder" },
  { id: "demo-sig-other", name: "Significant Other", image: "", email: "demo@example.com", status: "accepted" },
  { id: "placeholder-mom", name: "Mom", image: "", email: "", status: "placeholder" },
  { id: "placeholder-dad", name: "Dad", image: "", email: "", status: "placeholder" },
];

const DashboardHome = () => {
  const { user } = useAuth();
  const { gender } = usePersonalization();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [openConnection, setOpenConnection] = useState<{ card: ConnectionCard; rect: { x: number; y: number; width: number; height: number } } | null>(null);

  const { sections: dashboardSections, loading: registryLoading } = useCategoryRegistry(gender, 'dashboard');

  const SECTION_LABELS: Record<string, string> = {
    calendar: "Shared Calendar",
    activity: "Recent Activity",
    occasions: "Occasions",
    memories: "Memories",
  };

  const otherCategories = useMemo(() => {
    return Object.entries(dashboardSections).map(([sectionId, items]) => ({
      id: sectionId,
      label: SECTION_LABELS[sectionId] || sectionId,
      cards: items.map(item => ({
        id: item.key,
        name: item.label,
        image: item.image,
      })),
    }));
  }, [dashboardSections]);

  // Load connections from couples table
  const loadConnections = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("couples")
      .select("*")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`);

    if (error) {
      console.error("Failed to load connections:", error);
      return;
    }

    if (!data) return;

    const cards: ConnectionCard[] = data.map((row: any) => {
      const isInviter = row.inviter_id === user.id;
      const label = row.display_label || (isInviter && row.invitee_email ? row.invitee_email.split("@")[0] : "Connection");
      return {
        id: row.id,
        name: label,
        image: row.photo_url || "",
        email: row.invitee_email || "",
        status: row.status,
      };
    });

    if (cards.length < 4) {
      const remainingSlots = 4 - cards.length;
      const usedNames = new Set(cards.map(c => c.name.toLowerCase()));
      const placeholders = PLACEHOLDER_CONNECTIONS
        .filter(p => !usedNames.has(p.name.toLowerCase()))
        .slice(0, remainingSlots)
        .map(p => ({ ...p, image: "" }));
      const allCards = assignUniquePhotos([...cards, ...placeholders], (c) => !!c.image);
      setConnections(allCards);
    } else {
      const uniqueCards = assignUniquePhotos(cards, (c) => !!c.image);
      setConnections(uniqueCards);
    }
  }, [user]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  const handleSaveConnection = useCallback(
    async (cardId: string, newLabel: string, newImage: string, _email?: string) => {
      if (!user) return;

      if (cardId.startsWith("new-") || cardId.startsWith("placeholder-")) {
        const { error } = await supabase.from("couples").insert({
          inviter_id: user.id,
          invitee_email: _email || null,
          display_label: newLabel,
          photo_url: newImage || null,
          status: _email ? "pending" : "draft",
        });

        if (error) {
          console.error("Failed to create connection:", error);
          toast.error("Failed to create connection");
          return;
        }

        toast.success(_email ? "Connection invitation sent!" : "Connection saved!");
        setConnections((prev) => prev.filter((c) => c.id !== cardId));
        loadConnections();
        return;
      }

      const { error } = await supabase
        .from("couples")
        .update({
          display_label: newLabel,
          photo_url: newImage || null,
        })
        .eq("id", cardId);

      if (error) {
        console.error("Failed to save connection:", error);
        toast.error("Failed to save connection");
        return;
      }

      setConnections((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, name: newLabel, image: newImage || DEFAULT_IMAGE } : c
        )
      );
      toast.success("Connection updated!");
    },
    [user, loadConnections]
  );

  const handleAddConnection = useCallback(() => {
    const tempId = `new-${Date.now()}`;
    setConnections((prev) => [
      ...prev,
      {
        id: tempId,
        name: "New Connection",
        image: DEFAULT_IMAGE,
        email: "",
        status: "pending",
        isNew: true,
      },
    ]);
  }, []);

  const handleOpenConnection = useCallback((card: ConnectionCard, rect: DOMRect) => {
    setOpenConnection({ card, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } });
  }, []);

  return (
    <div className="h-full relative">
      <AnimatePresence>
        {openConnection && (
          <ConnectionPage
            key={openConnection.card.id}
            connection={{
              id: openConnection.card.id,
              name: openConnection.card.name,
              image: openConnection.card.image,
            }}
            cardRect={openConnection.rect}
            onClose={() => setOpenConnection(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardHome;
