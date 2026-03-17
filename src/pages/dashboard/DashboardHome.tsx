import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarDays, Radio, Sparkles } from "lucide-react";
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
  background: "rgba(var(--swatch-paper-rgb), 0.76)",
  border: "1px solid rgba(var(--swatch-paper-rgb), 0.88)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
} as const;

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

  return (
    <div className="relative h-full overflow-y-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-0 space-y-4">
        <div className="grid gap-4 pb-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_380px]">
            <div
              className="card-design-overlay-teal relative overflow-hidden rounded-[32px] p-6 md:p-7"
              style={shellCardStyle}
            >
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full" style={{ background: "rgba(var(--swatch-teal-rgb), 0.14)" }} />
              <div className="relative">
                <GreetingHeader displayName={displayName} connectionCount={realConnections} />
                <p className="mt-4 max-w-[34rem] text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Home should feel like the front table at your favorite place: your people, your dates, and the social energy around Go Two all in one refined view.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
                  <p className="max-w-[34rem] text-[17px] leading-[1.55]" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--swatch-viridian-odyssey)" }}>
                    Elegant, social, and useful enough to keep opening. This space should guide you into connections now, and into shared lists and activity next.
                  </p>
                  <div className="justify-self-start md:justify-self-end rounded-[28px] px-5 py-4" style={{ background: "rgba(var(--swatch-paper-rgb), 0.56)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.78)" }}>
                    <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                      Home Direction
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Connections first", "Shared lists", "Social feed"].map((label) => (
                        <span
                          key={label}
                          className="rounded-full px-3 py-1.5 text-[11px]"
                          style={pillButtonStyle}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card-design-overlay-teal relative overflow-hidden rounded-[32px] p-6"
              style={shellCardStyle}
            >
              <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.36)" }} />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Social Pulse
                </p>
                <h2 className="mt-3 text-[42px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 600 }}>
                  Gateway
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  This is where the relationship layer opens into community: public Go Two lists, connection activity, and the social trail around what people share.
                </p>
                <div className="mt-6 space-y-2">
                  {[
                    "Public Go Two lists from people you follow",
                    "Connection activity you have permission to see",
                    "Shared social feed modules coming into this layout",
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2 rounded-full px-3 py-2" style={{ background: "rgba(var(--swatch-paper-rgb), 0.58)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.82)" }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: "var(--swatch-cedar-grove)" }} />
                      <span className="text-[12px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-viridian-odyssey)" }}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-design-overlay-teal relative overflow-hidden rounded-[32px] p-6"
            style={shellCardStyle}
          >
            <div className="absolute -right-10 top-0 h-28 w-28 rounded-full" style={{ background: "rgba(var(--swatch-paper-rgb), 0.34)" }} />
            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Connections
                </p>
                <h3 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                  Your people, kept close.
                </h3>
                <p className="mt-3 max-w-[38rem] text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  This row should stay tactile and personal. Open a connection, add someone new, and use Home as the entry point into the people side of the platform.
                </p>
                <div className="mt-5">
                  <ConnectionAvatarRow entries={directoryEntries} onSelect={handleOpenConnectionFromAvatar} onAdd={handleAddConnection} />
                </div>
              </div>
              <div className="rounded-[28px] px-5 py-5" style={{ background: "rgba(var(--swatch-paper-rgb), 0.54)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.82)" }}>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                  Access Layer
                </p>
                <p className="mt-3 text-[34px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)", fontWeight: 700 }}>
                  {realConnections}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                  Active connection{realConnections !== 1 ? "s" : ""} visible now, with room for richer social access rules later.
                </p>
              </div>
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

          <div className="grid gap-4 lg:grid-cols-[520px_minmax(0,1fr)]">
            <div
              className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-3 md:p-4"
              style={{
                ...shellCardStyle,
                width: "100%",
                maxWidth: 520,
              }}
            >
              <EventCalendar milestones={milestones} connections={calendarConnections} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div
                className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-6"
                style={shellCardStyle}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[14px]" style={{ background: "rgba(var(--swatch-paper-rgb), 0.62)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.86)" }}>
                      <Radio className="h-4 w-4" style={{ color: "var(--swatch-cedar-grove)" }} />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                      Shared Feed
                    </p>
                  </div>
                  <h3 className="mt-4 text-[30px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                    Public lists and visible activity belong here.
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    This area is reserved for the social feed layer: public Go Two lists, saved ideas from people you follow, and connection updates you’re allowed to see.
                  </p>
                  <div className="mt-auto pt-6">
                    <button className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] uppercase tracking-[0.14em]" style={pillButtonStyle}>
                      Feed Coming Here
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="card-design-overlay-teal relative overflow-hidden rounded-[30px] p-6"
                style={shellCardStyle}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[14px]" style={{ background: "rgba(var(--swatch-paper-rgb), 0.62)", border: "1px solid rgba(var(--swatch-paper-rgb), 0.86)" }}>
                      <Sparkles className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      Social Access
                    </p>
                  </div>
                  <h3 className="mt-4 text-[30px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--swatch-viridian-odyssey)" }}>
                    Connection sharing should feel curated, not noisy.
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)" }}>
                    As new feed modules arrive, this side can hold selective access, recent contributions, and social signals without turning Home into a giant empty wall.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      { icon: CalendarDays, label: "Dates" },
                      { icon: Radio, label: "Activity" },
                      { icon: Sparkles, label: "Lists" },
                    ].map(({ icon: Icon, label }) => (
                      <span key={label} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]" style={pillButtonStyle}>
                        <Icon className="h-3 w-3" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
