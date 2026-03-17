import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ConnectionPage from "./ConnectionPage";
import { assignUniquePhotos } from "@/data/stockPhotos";
import { type Milestone } from "@/components/home/MilestoneCountdown";
import { EventCalendar } from "@/components/home/EventCalendar";
import { type DirectoryEntry } from "@/components/home/ConnectionDirectory";
import { ConnectionAvatarRow } from "@/components/home/ConnectionAvatarRow";
import { GreetingHeader } from "@/components/home/GreetingHeader";
import { AddConnectionModal } from "@/components/home/AddConnectionModal";
import PremiumLockCard from "@/components/PremiumLockCard";

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
  const { user, subscribed } = useAuth();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [openConnection, setOpenConnection] = useState<{
    card: ConnectionCard;
    rect: { x: number; y: number; width: number; height: number };
  } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConnectionsPaywall, setShowConnectionsPaywall] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setDisplayName(data?.display_name || user.user_metadata?.display_name || null);
      });
  }, [user]);

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
      const label = row.display_label || (isInviter && row.invitee_email ? row.invitee_email.split("@")[0] : "Connection");

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
      const placeholders = PLACEHOLDER_CONNECTIONS.filter((p) => !usedNames.has(p.name.toLowerCase()))
        .slice(0, remainingSlots)
        .map((p) => ({ ...p, image: "" }));

      setConnections(assignUniquePhotos([...cards, ...placeholders], (c) => !!c.image));
      return;
    }

    setConnections(assignUniquePhotos(cards, (c) => !!c.image));
  }, [user]);

  const loadMilestones = useCallback(async () => {
    if (!user) return;

    const { data: couples } = await supabase
      .from("couples")
      .select("inviter_id, invitee_id, display_label, status")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
      .eq("status", "accepted");

    if (!couples?.length) {
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

    const partnerIds = couples.map((c: any) => (c.inviter_id === user.id ? c.invitee_id : c.inviter_id)).filter(Boolean);
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
        if (days <= 90) upcoming.push({ id: `bd-${p.user_id}`, label: "Birthday", person: name, date: next, daysOut: days, type: "birthday" });
      }

      if (p.anniversary) {
        const an = new Date(p.anniversary);
        const next = new Date(now.getFullYear(), an.getMonth(), an.getDate());
        if (next < now) next.setFullYear(next.getFullYear() + 1);
        const days = Math.ceil((next.getTime() - now.getTime()) / 86400000);
        if (days <= 90) upcoming.push({ id: `an-${p.user_id}`, label: "Anniversary", person: name, date: next, daysOut: days, type: "anniversary" });
      }
    }

    upcoming.sort((a, b) => a.daysOut - b.daysOut);
    setMilestones(upcoming.slice(0, 5));
  }, [user]);

  useEffect(() => {
    loadConnections();
    loadMilestones();
  }, [loadConnections, loadMilestones]);

  const directoryEntries: DirectoryEntry[] = connections.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.image,
    status: c.status,
    lastSync: c.updatedAt,
    isPlaceholder: c.id.startsWith("placeholder-"),
  }));

  const realConnections = connections.filter((c) => !c.id.startsWith("placeholder-")).length;
  const canAddAnotherConnection = subscribed || realConnections < 1;

  const handleOpenConnectionFromAvatar = useCallback(
    (entry: DirectoryEntry) => {
      if (entry.isPlaceholder) {
        if (!canAddAnotherConnection) {
          setShowConnectionsPaywall(true);
          return;
        }
        setShowAddModal(true);
        return;
      }

      const card = connections.find((c) => c.id === entry.id);
      if (!card) return;

      setOpenConnection({
        card,
        rect: { x: window.innerWidth / 2 - 50, y: 100, width: 100, height: 100 },
      });
    },
    [canAddAnotherConnection, connections]
  );

  const handleAddConnection = useCallback(() => {
    if (!canAddAnotherConnection) {
      setShowConnectionsPaywall(true);
      return;
    }
    setShowAddModal(true);
  }, [canAddAnotherConnection]);

  return (
    <div className="relative h-full overflow-y-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-0 space-y-4">
        <div className="grid gap-4 pb-8">

          {/* Row 1: Greeting card alone — top left, natural size */}
          <div className="flex">
            <div
              className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-5"
              style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)", width: "fit-content", minWidth: 320, maxWidth: 420 }}
            >
              <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
              <div className="relative">
                <GreetingHeader displayName={displayName} connectionCount={realConnections} />
                <p className="mt-3 text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Keep your closest people, upcoming dates, and fresh updates in one calm place built for everyday use.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Connections card */}
          <div
            className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-5"
            style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
          >
            <div className="relative">
              <p className="mb-4 text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                Connections
              </p>
              <ConnectionAvatarRow entries={directoryEntries} onSelect={handleOpenConnectionFromAvatar} onAdd={handleAddConnection} />
            </div>
          </div>

          {showConnectionsPaywall && !canAddAnotherConnection && (
            <PremiumLockCard
              title="More than one connection is Premium"
              description="Free is built to show the value. Premium unlocks family, friends, and deeper everyday use."
              bullets={[
                "Keep one connection free to understand the core experience",
                "Unlock multiple connections for family and friends",
                "Combine this with reminders, recommendations, and richer preference tracking",
              ]}
              compact
              onDismiss={() => setShowConnectionsPaywall(false)}
            />
          )}

          {/* Row 3: Calendar — quarter width, own row */}
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1 card-design-overlay-teal rounded-[30px] p-5 relative overflow-hidden" style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}>
              <EventCalendar milestones={milestones} />
            </div>
          </div>
        </div>
      </div>

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

      <AddConnectionModal open={showAddModal} onClose={() => setShowAddModal(false)} onConnectionCreated={loadConnections} />
    </div>
  );
};

export default DashboardHome;
