import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConnectionPage from "./ConnectionPage";
import { assignUniquePhotos } from "@/data/stockPhotos";
import { type Milestone } from "@/components/home/MilestoneCountdown";
import { EventCalendar } from "@/components/home/EventCalendar";
import { type DirectoryEntry } from "@/components/home/ConnectionDirectory";
import { ConnectionAvatarRow } from "@/components/home/ConnectionAvatarRow";
import { RecentUpdates, type RecentUpdate } from "@/components/home/RecentUpdates";
import { HomeNotifications, type HomeNotificationItem } from "@/components/home/HomeNotifications";
import { AddConnectionModal } from "@/components/home/AddConnectionModal";
import PremiumLockCard from "@/components/PremiumLockCard";
import { ChevronRight } from "lucide-react";

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
  const navigate = useNavigate();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [notifications, setNotifications] = useState<HomeNotificationItem[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdate[]>([]);
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
      return { id: row.id, name: label, image: row.photo_url || "", email: row.invitee_email || "", status: row.status, partnerId, updatedAt: row.updated_at };
    });
    if (cards.length < 3) {
      const remainingSlots = 3 - cards.length;
      const usedNames = new Set(cards.map((c) => c.name.toLowerCase()));
      const placeholders = PLACEHOLDER_CONNECTIONS.filter((p) => !usedNames.has(p.name.toLowerCase())).slice(0, remainingSlots).map((p) => ({ ...p, image: "" }));
      setConnections(assignUniquePhotos([...cards, ...placeholders], (c) => !!c.image));
      return;
    }
    setConnections(assignUniquePhotos(cards, (c) => !!c.image));
  }, [user]);

  const loadMilestones = useCallback(async () => {
    if (!user) return;
    const { data: couples } = await supabase.from("couples").select("inviter_id, invitee_id, display_label, status").or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`).eq("status", "accepted");
    if (!couples?.length) {
      const now = new Date();
      setMilestones([
        { id: "demo-1", label: "Birthday", person: "Wife", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12), daysOut: 12, type: "birthday" },
        { id: "demo-2", label: "Anniversary", person: "Significant Other", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28), daysOut: 28, type: "anniversary" },
      ]);
      return;
    }
    const partnerIds = couples.map((c: any) => (c.inviter_id === user.id ? c.invitee_id : c.inviter_id)).filter(Boolean);
    if (!partnerIds.length) return;
    const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, birthday, anniversary").in("user_id", partnerIds);
    if (!profiles) return;
    const now = new Date();
    const upcoming: Milestone[] = [];
    for (const p of profiles) {
      const couple = couples.find((c: any) => (c.inviter_id === p.user_id || c.invitee_id === p.user_id) && (c.inviter_id === user.id || c.invitee_id === user.id));
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

  const loadNotifications = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.from("notifications").select("id, type, title, body, created_at, is_read").eq("user_id", user.id).order("created_at", { ascending: false }).limit(4);
    if (error || !data) return;
    setNotifications(data.map((n) => ({ id: n.id, type: n.type, title: n.title, body: n.body, createdAt: n.created_at, isRead: n.is_read })));
  }, [user]);

  const loadRecentUpdates = useCallback(async () => {
    if (!user) return;
    const { data: couples } = await supabase.from("couples").select("inviter_id, invitee_id, display_label, status").or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`).eq("status", "accepted");
    if (!couples?.length) {
      setRecentUpdates([
        { id: "demo-u1", person: "Wife", action: "updated her", category: "Gift Preferences", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: "demo-u2", person: "Mom", action: "added to her", category: "Favorite Restaurants", timestamp: new Date(Date.now() - 86400000).toISOString() },
      ]);
      return;
    }
    const partnerIds = couples.map((c: any) => (c.inviter_id === user.id ? c.invitee_id : c.inviter_id)).filter(Boolean);
    if (!partnerIds.length) return;
    const { data: entries } = await supabase.from("card_entries").select("id, user_id, card_key, group_name, entry_name, updated_at").in("user_id", partnerIds).order("updated_at", { ascending: false }).limit(5);
    if (!entries?.length) return;
    setRecentUpdates(entries.map((entry: any) => {
      const couple = couples.find((c: any) => c.inviter_id === entry.user_id || c.invitee_id === entry.user_id);
      return { id: entry.id, person: couple?.display_label || "Connection", action: "updated", category: entry.group_name || entry.card_key, timestamp: entry.updated_at };
    }));
  }, [user]);

  useEffect(() => {
    loadConnections();
    loadNotifications();
    loadMilestones();
    loadRecentUpdates();
  }, [loadConnections, loadNotifications, loadMilestones, loadRecentUpdates]);

  const directoryEntries: DirectoryEntry[] = connections.map((c) => ({
    id: c.id, name: c.name, image: c.image, status: c.status, lastSync: c.updatedAt, isPlaceholder: c.id.startsWith("placeholder-"),
  }));

  const realConnections = connections.filter((c) => !c.id.startsWith("placeholder-")).length;
  const canAddAnotherConnection = subscribed || realConnections < 1;
  const firstName = displayName?.split(/\s+/)[0] || "";

  const handleOpenConnectionFromAvatar = useCallback((entry: DirectoryEntry) => {
    if (entry.isPlaceholder) {
      if (!canAddAnotherConnection) { setShowConnectionsPaywall(true); return; }
      setShowAddModal(true);
      return;
    }
    const card = connections.find((c) => c.id === entry.id);
    if (!card) return;
    setOpenConnection({ card, rect: { x: window.innerWidth / 2 - 50, y: 100, width: 100, height: 100 } });
  }, [canAddAnotherConnection, connections]);

  const handleAddConnection = useCallback(() => {
    if (!canAddAnotherConnection) { setShowConnectionsPaywall(true); return; }
    setShowAddModal(true);
  }, [canAddAnotherConnection]);

  return (
    <div className="relative h-full overflow-y-auto px-1 pb-6">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 md:pt-6 space-y-4">

        {/* ── Row 1: Hero + Connections ── */}
        <div className="grid lg:grid-cols-12 gap-4">

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="lg:col-span-5 card-design-overlay-teal rounded-[34px] p-6 md:p-7 relative overflow-hidden"
            style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at top right, rgba(var(--swatch-teal-rgb), 0.14), transparent 30%), linear-gradient(130deg, rgba(255,255,255,0.05), transparent 55%)" }} />
            <div className="relative flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                The Vibe Today{firstName ? `, ${firstName}` : ""}
              </p>
              <h1 className="text-[44px] md:text-[56px] leading-[0.9]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "var(--swatch-viridian-odyssey)" }}>
                Your<br />Dashboard
              </h1>
              <p className="text-[14px] leading-relaxed max-w-[38ch]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                Everything happening across your connections — dates, updates, and what matters next.
              </p>
            </div>
          </motion.div>

          {/* Connections card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, type: "spring", stiffness: 260, damping: 24 }}
            className="lg:col-span-7 card-design-overlay-teal rounded-[34px] p-5 md:p-6 relative overflow-hidden"
            style={{ boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
          >
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                Your People
              </p>
              <ConnectionAvatarRow entries={directoryEntries} onSelect={handleOpenConnectionFromAvatar} onAdd={handleAddConnection} />
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Notifications + Calendar ── */}
        <div className="grid lg:grid-cols-12 gap-4">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 24 }}
            className="lg:col-span-7 card-design-overlay-teal rounded-[30px] p-5 relative overflow-hidden min-h-[420px]"
            style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)" }}
          >
            <div className="relative">
              <EventCalendar milestones={milestones} />
            </div>
          </motion.div>
        </div>

        {/* ── Row 3: Recent Activity ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 250, damping: 24 }}
          className="card-design-overlay-teal rounded-[28px] p-5 relative overflow-hidden"
          style={{ boxShadow: "0 14px 34px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.46)" }}
        >
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.16em] mb-4" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
              Recent Activity
            </p>
            <RecentUpdates updates={recentUpdates} />
          </div>
        </motion.div>

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

      </div>

      <AnimatePresence>
        {openConnection && (
          <ConnectionPage
            key={openConnection.card.id}
            connection={{ id: openConnection.card.id, name: openConnection.card.name, image: openConnection.card.image, partnerId: openConnection.card.partnerId }}
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
