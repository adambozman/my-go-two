import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ConnectionPage from "./ConnectionPage";
import { getDefaultPhotoForLabel, assignUniquePhotos } from "@/data/stockPhotos";
import { MilestoneList, type Milestone } from "@/components/home/MilestoneCountdown";
import { ConnectionDirectory, type DirectoryEntry } from "@/components/home/ConnectionDirectory";
import { ConnectionAvatarRow } from "@/components/home/ConnectionAvatarRow";
import { GreetingHeader } from "@/components/home/GreetingHeader";
import { RecentUpdates, type RecentUpdate } from "@/components/home/RecentUpdates";
import { SmartBanner } from "@/components/home/SmartBanner";

const DEFAULT_IMAGE = getDefaultPhotoForLabel("friend");

interface ConnectionCard {
  id: string;
  name: string;
  image: string;
  email: string;
  status: string;
  isNew?: boolean;
  partnerId?: string;
  updatedAt?: string;
}

const PLACEHOLDER_CONNECTIONS: ConnectionCard[] = [
  { id: "placeholder-wife", name: "Wife", image: "", email: "", status: "placeholder" },
  { id: "placeholder-mom", name: "Mom", image: "", email: "", status: "placeholder" },
  { id: "placeholder-dad", name: "Dad", image: "", email: "", status: "placeholder" },
];

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([]);
  const [openConnection, setOpenConnection] = useState<{
    card: ConnectionCard;
    rect: { x: number; y: number; width: number; height: number };
  } | null>(null);

  // Load connections
  const loadConnections = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("couples")
      .select("*")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`);

    if (error || !data) return;

    const cards: ConnectionCard[] = data.map((row: any) => {
      const isInviter = row.inviter_id === user.id;
      const partnerId = isInviter ? row.invitee_id : row.inviter_id;
      const label =
        row.display_label ||
        (isInviter && row.invitee_email ? row.invitee_email.split("@")[0] : "Connection");
      return {
        id: row.id,
        name: label,
        image: row.photo_url || "",
        email: row.invitee_email || "",
        status: row.status,
        partnerId,
        updatedAt: row.updated_at,
      };
    });

    if (cards.length < 3) {
      const remainingSlots = 3 - cards.length;
      const usedNames = new Set(cards.map((c) => c.name.toLowerCase()));
      const placeholders = PLACEHOLDER_CONNECTIONS.filter(
        (p) => !usedNames.has(p.name.toLowerCase())
      )
        .slice(0, remainingSlots)
        .map((p) => ({ ...p, image: "" }));
      const allCards = assignUniquePhotos([...cards, ...placeholders], (c) => !!c.image);
      setConnections(allCards);
    } else {
      setConnections(assignUniquePhotos(cards, (c) => !!c.image));
    }
  }, [user]);

  // Load milestones from linked profiles
  const loadMilestones = useCallback(async () => {
    if (!user) return;

    const { data: couples } = await supabase
      .from("couples")
      .select("inviter_id, invitee_id, display_label, status")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
      .eq("status", "accepted");

    if (!couples?.length) {
      // Show demo milestones for new users
      const now = new Date();
      setMilestones([
        {
          id: "demo-1",
          label: "Birthday",
          person: "Wife",
          date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
          daysOut: 12,
          type: "birthday",
        },
        {
          id: "demo-2",
          label: "Anniversary",
          person: "Significant Other",
          date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
          daysOut: 28,
          type: "anniversary",
        },
      ]);
      return;
    }

    const partnerIds = couples.map((c: any) =>
      c.inviter_id === user.id ? c.invitee_id : c.inviter_id
    ).filter(Boolean);

    if (!partnerIds.length) return;

    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, display_name, birthday, anniversary")
      .in("user_id", partnerIds);

    if (!profiles) return;

    const now = new Date();
    const upcoming: Milestone[] = [];

    for (const p of profiles) {
      const couple = couples.find(
        (c: any) =>
          (c.inviter_id === p.user_id || c.invitee_id === p.user_id) &&
          (c.inviter_id === user.id || c.invitee_id === user.id)
      );
      const name = couple?.display_label || p.display_name || "Connection";

      if (p.birthday) {
        const bd = new Date(p.birthday);
        const next = new Date(now.getFullYear(), bd.getMonth(), bd.getDate());
        if (next < now) next.setFullYear(next.getFullYear() + 1);
        const days = Math.ceil((next.getTime() - now.getTime()) / 86400000);
        if (days <= 90) {
          upcoming.push({ id: `bd-${p.user_id}`, label: "Birthday", person: name, date: next, daysOut: days, type: "birthday" });
        }
      }

      if (p.anniversary) {
        const an = new Date(p.anniversary);
        const next = new Date(now.getFullYear(), an.getMonth(), an.getDate());
        if (next < now) next.setFullYear(next.getFullYear() + 1);
        const days = Math.ceil((next.getTime() - now.getTime()) / 86400000);
        if (days <= 90) {
          upcoming.push({ id: `an-${p.user_id}`, label: "Anniversary", person: name, date: next, daysOut: days, type: "anniversary" });
        }
      }
    }

    upcoming.sort((a, b) => a.daysOut - b.daysOut);
    setMilestones(upcoming.slice(0, 5));
  }, [user]);

  // Load recent updates from linked card_entries
  const loadRecentUpdates = useCallback(async () => {
    if (!user) return;

    const { data: couples } = await supabase
      .from("couples")
      .select("inviter_id, invitee_id, display_label, status")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
      .eq("status", "accepted");

    if (!couples?.length) {
      // Demo updates
      setRecentUpdates([
        { id: "demo-u1", person: "Wife", action: "updated her", category: "Gift Preferences", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: "demo-u2", person: "Mom", action: "added to her", category: "Favorite Restaurants", timestamp: new Date(Date.now() - 86400000).toISOString() },
      ]);
      return;
    }

    const partnerIds = couples
      .map((c: any) => (c.inviter_id === user.id ? c.invitee_id : c.inviter_id))
      .filter(Boolean);

    if (!partnerIds.length) return;

    const { data: entries } = await supabase
      .from("card_entries")
      .select("id, user_id, card_key, group_name, entry_name, updated_at")
      .in("user_id", partnerIds)
      .order("updated_at", { ascending: false })
      .limit(5);

    if (!entries?.length) return;

    const updates: RecentUpdate[] = entries.map((e: any) => {
      const couple = couples.find(
        (c: any) =>
          (c.inviter_id === e.user_id || c.invitee_id === e.user_id)
      );
      return {
        id: e.id,
        person: couple?.display_label || "Connection",
        action: `updated`,
        category: e.group_name || e.card_key,
        timestamp: e.updated_at,
      };
    });

    setRecentUpdates(updates);
  }, [user]);

  useEffect(() => {
    loadConnections();
    loadMilestones();
    loadRecentUpdates();
  }, [loadConnections, loadMilestones, loadRecentUpdates]);

  // Smart banner logic
  const smartBanner = useMemo(() => {
    if (milestones.length > 0 && milestones[0].daysOut <= 21) {
      const m = milestones[0];
      return {
        title: `${m.person}'s ${m.label} in ${m.daysOut} days`,
        subtitle: `Check their Go To list for the perfect gift`,
      };
    }
    return null;
  }, [milestones]);

  const directoryEntries: DirectoryEntry[] = connections.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.image,
    status: c.status,
    lastSync: c.updatedAt,
    isPlaceholder: c.id.startsWith("placeholder-"),
  }));

  const handleOpenConnection = useCallback(
    (entry: DirectoryEntry, rect: DOMRect) => {
      const card = connections.find((c) => c.id === entry.id);
      if (!card) return;
      setOpenConnection({
        card,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      });
    },
    [connections]
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

  return (
    <div className="h-full overflow-y-auto relative">
      <div className="max-w-[520px] mx-auto space-y-5 py-4 px-1">
        {/* Smart notification banner */}
        {smartBanner && (
          <SmartBanner
            title={smartBanner.title}
            subtitle={smartBanner.subtitle}
            onAction={() => navigate("/dashboard/my-go-two")}
            actionLabel="Go To List"
          />
        )}

        {/* Milestone countdowns */}
        <MilestoneList milestones={milestones} />

        {/* Connection directory */}
        <ConnectionDirectory entries={directoryEntries} onSelect={handleOpenConnection} />

        {/* Add connection button */}
        <button
          onClick={handleAddConnection}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all active:scale-[0.98]"
          style={{
            background: "rgba(255,255,255,0.35)",
            border: "1px dashed var(--swatch-text-light)",
            color: "var(--swatch-teal)",
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          <Plus className="w-4 h-4" />
          Add Connection
        </button>

        {/* Recent activity feed */}
        <RecentUpdates updates={recentUpdates} />
      </div>

      {/* Connection detail overlay */}
      <AnimatePresence>
        {openConnection && (
          <ConnectionPage
            key={openConnection.card.id}
            connection={{
              id: openConnection.card.id,
              name: openConnection.card.name,
              image: openConnection.card.image,
              partnerId: openConnection.card.partnerId,
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
