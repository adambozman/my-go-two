import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock3, Search, Sparkles } from "lucide-react";
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

const shellCardStyle = {
  boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
} as const;

const pillButtonStyle = {
  fontFamily: "'Jost', sans-serif",
  color: "var(--swatch-teal)",
  background: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(255,255,255,0.78)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.76)",
} as const;

function formatRelativeDateLabel(value?: string | Date | null) {
  if (!value) return "Just updated";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Just updated";

  const diffMs = date.getTime() - Date.now();
  const diffDays = Math.round(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays > 1) return `In ${diffDays} days`;
  if (diffDays === -1) return "Yesterday";
  return `${Math.abs(diffDays)} days ago`;
}

const DashboardHome = () => {
  const { user, subscribed } = useAuth();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [homeSearch, setHomeSearch] = useState("");
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
          day: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12).getDate(),
          month: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12).getMonth(),
          source: "connection",
        },
        {
          id: "demo-2",
          label: "Anniversary",
          person: "Significant Other",
          date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
          daysOut: 28,
          type: "anniversary",
          day: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28).getDate(),
          month: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28).getMonth(),
          source: "connection",
        },
      ]);
      return;
    }

    const partnerIds = couples.map((c: any) => (c.inviter_id === user.id ? c.invitee_id : c.inviter_id)).filter(Boolean);
    const [{ data: ownProfile }, { data: profiles }] = await Promise.all([
      supabase
        .from("profiles")
        .select("user_id, display_name, birthday, anniversary")
        .eq("user_id", user.id)
        .maybeSingle(),
      partnerIds.length
        ? supabase
            .from("profiles")
            .select("user_id, display_name, birthday, anniversary")
            .in("user_id", partnerIds)
        : Promise.resolve({ data: [] as Array<{ user_id: string; display_name: string | null; birthday: string | null; anniversary: string | null }> }),
    ]);

    const now = new Date();
    const upcoming: Milestone[] = [];
    const addMilestone = (
      id: string,
      label: "Birthday" | "Anniversary",
      person: string,
      isoDate: string,
      type: "birthday" | "anniversary",
      source: "self" | "connection",
      personId?: string,
    ) => {
      const original = new Date(isoDate);
      const next = new Date(now.getFullYear(), original.getMonth(), original.getDate());
      if (next < now) next.setFullYear(next.getFullYear() + 1);
      const days = Math.ceil((next.getTime() - now.getTime()) / 86400000);

      upcoming.push({
        id,
        label,
        person,
        date: next,
        daysOut: days,
        type,
        day: original.getDate(),
        month: original.getMonth(),
        personId,
        source,
      });
    };

    if (ownProfile?.birthday) {
      addMilestone("self-birthday", "Birthday", ownProfile.display_name || "You", ownProfile.birthday, "birthday", "self", ownProfile.user_id);
    }

    if (ownProfile?.anniversary) {
      addMilestone("self-anniversary", "Anniversary", ownProfile.display_name || "You", ownProfile.anniversary, "anniversary", "self", ownProfile.user_id);
    }

    for (const p of profiles ?? []) {
      const couple = couples.find(
        (c: any) =>
          (c.inviter_id === p.user_id || c.invitee_id === p.user_id) &&
          (c.inviter_id === user.id || c.invitee_id === user.id)
      );
      const name = couple?.display_label || p.display_name || "Connection";

      if (p.birthday) {
        addMilestone(`bd-${p.user_id}`, "Birthday", name, p.birthday, "birthday", "connection", p.user_id);
      }

      if (p.anniversary) {
        addMilestone(`an-${p.user_id}`, "Anniversary", name, p.anniversary, "anniversary", "connection", p.user_id);
      }
    }

    upcoming.sort((a, b) => a.daysOut - b.daysOut);
    setMilestones(upcoming);
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
  const calendarConnections = connections
    .filter((c) => !c.id.startsWith("placeholder-") && c.partnerId)
    .map((c) => ({ id: c.partnerId!, name: c.name }));

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

  const sharedFeedItems = useMemo(() => {
    const realEntries = connections.filter((c) => !c.id.startsWith("placeholder-"));
    if (realEntries.length) {
      return realEntries.slice(0, 3).map((connection) => ({
        id: connection.id,
        eyebrow: connection.status === "accepted" ? "Connected" : "Invite",
        title: connection.name,
        detail: connection.status === "accepted" ? "Profile syncing and preference sharing are active." : "Waiting for them to accept your invite.",
        meta: formatRelativeDateLabel(connection.updatedAt),
      }));
    }

    return [
      {
        id: "feed-demo-1",
        eyebrow: "Connections",
        title: "Start with one person who matters most.",
        detail: "Once you add them, this area becomes your shared pulse for updates, reminders, and profile changes.",
        meta: "Ready when you are",
      },
    ];
  }, [connections]);

  const notableItems = useMemo(() => {
    if (milestones.length) {
      return milestones.slice(0, 3).map((milestone) => ({
        id: milestone.id,
        eyebrow: milestone.label,
        title: milestone.person,
        detail: `${milestone.daysOut} day${milestone.daysOut === 1 ? "" : "s"} away`,
      }));
    }

    return [
      {
        id: "notable-demo",
        eyebrow: "Calendar",
        title: "Your next big date lands here.",
        detail: "Birthdays, anniversaries, and reminders will float up as soon as they exist.",
      },
    ];
  }, [milestones]);

  const recentActivityItems = useMemo(() => {
    const milestoneActivity = milestones.slice(0, 5).map((milestone) => ({
      id: `activity-${milestone.id}`,
      title: milestone.person,
      detail: `${milestone.label} is ${milestone.daysOut} day${milestone.daysOut === 1 ? "" : "s"} away.`,
      meta: formatRelativeDateLabel(milestone.date),
      accent: milestone.type === "birthday" ? "var(--swatch-cedar-grove)" : "var(--swatch-teal)",
    }));

    const connectionActivity = connections
      .filter((c) => !c.id.startsWith("placeholder-"))
      .slice(0, 4)
      .map((connection) => ({
        id: `connection-${connection.id}`,
        title: connection.name,
        detail: connection.status === "accepted" ? "Connection is live and ready for recommendations." : "Invite is still pending.",
        meta: formatRelativeDateLabel(connection.updatedAt),
        accent: "var(--swatch-viridian-odyssey)",
      }));

    return [...milestoneActivity, ...connectionActivity].slice(0, 8);
  }, [connections, milestones]);

  return (
    <div className="relative h-full overflow-y-auto">
      <div className="mx-auto max-w-[1480px] px-4 pb-8 md:px-6">
        <div className="pb-5">
          <GreetingHeader displayName={displayName} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,290px)]">
          <div className="grid gap-5 xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
            <section
              className="relative overflow-hidden rounded-[30px] p-5"
              style={{
                ...shellCardStyle,
                background: "linear-gradient(165deg, rgba(255,255,255,0.72) 0%, rgba(245,233,220,0.5) 100%)",
                border: "1px solid rgba(255,255,255,0.85)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    Shared Feed
                  </p>
                  <h3 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                    Signals from your people.
                  </h3>
                </div>
                <ArrowUpRight className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
              </div>

              <div className="space-y-3">
                {sharedFeedItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[22px] px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.52)",
                      border: "1px solid rgba(255,255,255,0.76)",
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      {item.eyebrow}
                    </p>
                    <p className="mt-2 text-[18px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      {item.detail}
                    </p>
                    <p className="mt-3 text-[11px]" style={{ color: "var(--swatch-text-light)" }}>
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="relative overflow-hidden rounded-[30px] p-5"
              style={{
                ...shellCardStyle,
                background: "linear-gradient(165deg, rgba(45,104,112,0.12) 0%, rgba(245,233,220,0.46) 100%)",
                border: "1px solid rgba(45,104,112,0.18)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    Notable
                  </p>
                  <h3 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                    What needs you next.
                  </h3>
                </div>
                <Sparkles className="h-4 w-4" style={{ color: "var(--swatch-cedar-grove)" }} />
              </div>

              <div className="space-y-3">
                {notableItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[22px] px-4 py-3"
                    style={{
                      background: "rgba(245,233,220,0.58)",
                      border: "1px solid rgba(255,255,255,0.7)",
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                      {item.eyebrow}
                    </p>
                    <p className="mt-2 text-[18px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="min-w-0">
            <section
              className="rounded-[30px] px-2 py-1 md:px-3"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.52)",
              }}
            >
              <div className="mb-3 px-3 pt-3">
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Connections
                </p>
                <h2 className="mt-2 text-[34px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                  Your circle at a glance.
                </h2>
              </div>
              <ConnectionAvatarRow entries={directoryEntries} onSelect={handleOpenConnectionFromAvatar} onAdd={handleAddConnection} />
            </section>

            <section
              className="mt-5 rounded-[26px] p-3 md:p-4"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(245,233,220,0.56) 100%)",
                border: "1px solid rgba(255,255,255,0.84)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.92), 0 10px 24px rgba(74,96,104,0.08)",
              }}
            >
              <div className="flex items-center gap-3 rounded-[20px] px-4 py-3" style={{ background: "rgba(255,255,255,0.46)" }}>
                <Search className="h-4 w-4 shrink-0" style={{ color: "var(--swatch-text-light)" }} />
                <input
                  value={homeSearch}
                  onChange={(event) => setHomeSearch(event.target.value)}
                  placeholder="Search a person, reminder, date, or idea"
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                />
              </div>
            </section>

            <section
              className="mt-5 overflow-hidden rounded-[30px] p-3 md:p-4"
              style={{
                ...shellCardStyle,
                background: "linear-gradient(165deg, rgba(45,104,112,0.12) 0%, rgba(245,233,220,0.48) 100%)",
                border: "1px solid rgba(45,104,112,0.18)",
              }}
            >
              <EventCalendar milestones={milestones} connections={calendarConnections} />
            </section>

            {showConnectionsPaywall && !canAddAnotherConnection && (
              <div className="mt-5">
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
              </div>
            )}
          </div>

          <aside
            className="overflow-hidden rounded-[30px] p-4"
            style={{
              ...shellCardStyle,
              background: "linear-gradient(180deg, rgba(255,255,255,0.76) 0%, rgba(245,233,220,0.56) 100%)",
              border: "1px solid rgba(255,255,255,0.84)",
            }}
          >
            <div className="flex items-center justify-between border-b border-white/50 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Recent Activity
                </p>
                <h3 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                  The long view.
                </h3>
              </div>
              <CalendarDays className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
            </div>

            <div className="mt-4 space-y-3 xl:max-h-[calc(100vh-240px)] xl:overflow-y-auto xl:pr-1">
              {recentActivityItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] px-4 py-4"
                  style={{
                    background: "rgba(255,255,255,0.54)",
                    border: "1px solid rgba(255,255,255,0.78)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: item.accent }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[17px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                        {item.detail}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[11px]" style={{ color: "var(--swatch-text-light)" }}>
                        <Clock3 className="h-3.5 w-3.5" />
                        <span>{item.meta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
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
