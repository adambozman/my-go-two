import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock3, Search, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { assignUniquePhotos } from "@/data/stockPhotos";
import { initBlocklist } from "@/data/imageBlocklist";
import { type Milestone } from "@/components/home/MilestoneCountdown";
import { EventCalendar } from "@/components/home/EventCalendar";
import { type DirectoryEntry } from "@/components/home/ConnectionDirectory";
import { GreetingHeader } from "@/components/home/GreetingHeader";
import { AddConnectionModal } from "@/components/home/AddConnectionModal";
import PremiumLockCard from "@/components/PremiumLockCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resolveStorageUrl } from "@/lib/storageRefs";
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

interface HomeSearchResult {
  id: string;
  kind: "entry";
  ownerId: string;
  ownerLabel: string;
  title: string;
  subtitle: string;
  meta: string;
}

interface ActivityFeedItem {
  id: string;
  coupleId: string;
  title: string;
  detail: string;
  meta: string;
  accent: string;
}

interface ConnectionFeedRow {
  feed_item_id: string;
  couple_id: string;
  connection_label: string | null;
  item_kind: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  event_at: string | null;
}

interface SearchableEntryRow {
  id: string;
  user_id: string;
  entry_name: string;
  group_name: string;
  card_key: string;
}

interface HomeSearchEdgePayload {
  my_entries?: SearchableEntryRow[];
  circle_entries?: Array<SearchableEntryRow & { owner_label?: string }>;
}

interface CoupleRow {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  invitee_email: string | null;
  display_label: string | null;
  status: string;
  photo_url: string | null;
  updated_at: string | null;
}

interface RelevantOccasionRow {
  occasion_type: string;
  occasion_label: string;
  occasion_date: string;
}

interface PartnerOccasionSet {
  user_id: string;
  couple: CoupleRow;
  occasions: RelevantOccasionRow[];
}

type RpcResult<T> = {
  data: T | null;
  error: { message?: string } | null;
};

const rpc = supabase.rpc as unknown as <T>(
  fn: string,
  args?: Record<string, unknown>,
) => Promise<RpcResult<T>>;

const DashboardHome = () => {
  const { user, subscribed } = useAuth();
  const navigate = useNavigate();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [resolvedConnectionImages, setResolvedConnectionImages] = useState<Record<string, string>>({});
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [homeSearch, setHomeSearch] = useState("");
  const [searchScope, setSearchScope] = useState("everyone");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [mySearchResults, setMySearchResults] = useState<HomeSearchResult[]>([]);
  const [circleSearchResults, setCircleSearchResults] = useState<HomeSearchResult[]>([]);
  const [recentActivityItems, setRecentActivityItems] = useState<ActivityFeedItem[]>([]);
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

    await initBlocklist();

    const { data, error } = await supabase
      .from("couples")
      .select("*")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`);

    if (error || !data) return;

    const rows = (data || []) as CoupleRow[];
    const cards: ConnectionCard[] = rows.map((row) => {
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

    const [{ data: ownProfile }, partnerOccasionSets] = await Promise.all([
      supabase
        .from("profiles")
        .select("user_id, display_name, birthday, anniversary")
        .eq("user_id", user.id)
        .maybeSingle(),
      Promise.all(
        ((couples || []) as CoupleRow[]).map(async (couple) => {
          const partnerId = couple.inviter_id === user.id ? couple.invitee_id : couple.inviter_id;
          if (!partnerId) return null;

          const { data } = await rpc<RelevantOccasionRow[]>("get_connection_relevant_occasions", {
            p_connection_user_id: partnerId,
            p_days_ahead: 365,
          });

          return {
            user_id: partnerId,
            couple,
            occasions: Array.isArray(data) ? data : [],
          };
        })
      ),
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

    for (const p of partnerOccasionSets.filter(Boolean) as PartnerOccasionSet[]) {
      const name = p.couple?.display_label || "Connection";

      for (const occasion of p.occasions) {
        if (occasion.occasion_type === "birthday") {
          addMilestone(`bd-${p.user_id}`, "Birthday", name, occasion.occasion_date, "birthday", "connection", p.user_id);
        }

        if (occasion.occasion_type === "anniversary") {
          addMilestone(`an-${p.user_id}`, "Anniversary", name, occasion.occasion_date, "anniversary", "connection", p.user_id);
        }
      }
    }

    upcoming.sort((a, b) => a.daysOut - b.daysOut);
    setMilestones(upcoming);
  }, [user]);

  useEffect(() => {
    loadConnections();
    loadMilestones();
  }, [loadConnections, loadMilestones]);

  useEffect(() => {
    let cancelled = false;

    const loadConnectionImages = async () => {
      const imageValues = Array.from(new Set(connections.map((connection) => connection.image).filter(Boolean)));
      if (imageValues.length === 0) {
        if (!cancelled) setResolvedConnectionImages({});
        return;
      }

      const nextEntries = await Promise.all(
        imageValues.map(async (value) => [value, await resolveStorageUrl(value)] as const),
      );

      if (!cancelled) {
        setResolvedConnectionImages(Object.fromEntries(nextEntries));
      }
    };

    loadConnectionImages();

    return () => {
      cancelled = true;
    };
  }, [connections]);

  const directoryEntries: DirectoryEntry[] = connections.map((c) => ({
    id: c.id,
    name: c.name,
    image: resolvedConnectionImages[c.image] || c.image,
    status: c.status,
    lastSync: c.updatedAt,
    isPlaceholder: false,
  }));

  const realConnections = connections.length;
  const canAddAnotherConnection = subscribed || realConnections < 1;
  const calendarConnections = connections
    .filter((c) => c.partnerId)
    .map((c) => ({ id: c.partnerId!, name: c.name }));
  const visibleConnectionEntries = directoryEntries.slice(0, 5);
  const liveConnections = connections.filter((connection) => connection.partnerId);
  const searchScopeLabel = searchScope === "everyone"
    ? "Everyone"
    : searchScope === "self"
      ? "You"
      : liveConnections.find((connection) => connection.partnerId === searchScope)?.name || "Connection";

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

      navigate(`/dashboard/connections/${card.id}`);
    },
    [canAddAnotherConnection, connections, navigate]
  );

  const handleAddConnection = useCallback(() => {
    if (!canAddAnotherConnection) {
      setShowConnectionsPaywall(true);
      return;
    }
    setShowAddModal(true);
  }, [canAddAnotherConnection]);

  useEffect(() => {
    let cancelled = false;

    const loadRecentActivity = async () => {
      if (!user) return;

      if (cancelled) return;
      const { data } = await rpc<ConnectionFeedRow[]>("get_connection_feed_preview", {
        p_limit: 12,
      });

      if (cancelled) return;

      const feedRows = (Array.isArray(data) ? data : []) as ConnectionFeedRow[];

      const nextItems = feedRows.map((row) => ({
        id: row.feed_item_id,
        coupleId: row.couple_id,
        title: row.connection_label || row.subtitle || "Connection",
        detail: row.body || row.title || "Shared an update.",
        meta: formatRelativeDateLabel(row.event_at),
        accent: row.item_kind === "occasion" ? "var(--swatch-coral)" : "var(--swatch-cedar-grove)",
      }));

      setRecentActivityItems(nextItems);
    };

    loadRecentActivity();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const buildEntryResult = useCallback((row: SearchableEntryRow, ownerLabel: string): HomeSearchResult => ({
    id: row.id,
    kind: "entry",
    ownerId: row.user_id,
    ownerLabel,
    title: row.entry_name,
    subtitle: row.group_name,
    meta: row.card_key?.split("__").pop() || "Entry",
  }), []);

  const runHomeSearch = useCallback(async () => {
    const query = homeSearch.trim();
    if (!query || !user) return;

    setIsSearchOpen(true);
    setSearchLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("connection-data-search", {
        body: {
          action: "home-search",
          query,
          scope: searchScope,
          limit: 20,
        },
      });

      if (error) {
        throw error;
      }

      const payload = (data || {}) as HomeSearchEdgePayload;
      const nextMine: HomeSearchResult[] = (payload.my_entries || []).map((row) => buildEntryResult(row, "You"));
      const nextCircle: HomeSearchResult[] = (payload.circle_entries || []).map((row) =>
        buildEntryResult(row, row.owner_label || "Connection")
      );

      setMySearchResults(nextMine);
      setCircleSearchResults(nextCircle);
    } catch {
      setMySearchResults([]);
      setCircleSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [buildEntryResult, homeSearch, searchScope, user]);

  return (
    <div className="relative h-full min-h-0 overflow-x-hidden overflow-y-auto">
      <div className="mx-auto max-w-[1480px] px-4 pb-8 md:px-6">
        <div className="pb-5">
          <GreetingHeader displayName={displayName} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,300px)_minmax(0,1.18fr)_minmax(0,300px)]">
          <div>
            <section
              className="card-design-sand relative flex h-full min-h-0 flex-col overflow-hidden rounded-[30px] p-5 xl:min-h-[740px]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="surface-eyebrow-coral">
                    Public Feed
                  </p>
                  <h3 className="surface-heading-lg mt-2">
                    Public feed.
                  </h3>
                </div>
                <button
                  onClick={() => navigate("/dashboard/public-feed")}
                  className="surface-action-text surface-button-soft-glow inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
                >
                  Go to feed
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="card-inset-white rounded-[22px] px-4 py-4">
                <p className="surface-eyebrow-coral">
                  Discovery
                </p>
                <p className="surface-heading-md mt-2">
                  Follow style without turning it into chat.
                </p>
                <p className="surface-body mt-2">
                  This feed is for published looks, outfit bundles, trending public cards, and popular picks near you. Likes, loves, follows, and browsing all happen on the full page.
                </p>
              </div>
            </section>
          </div>

          <div className="min-w-0">
            <section className="px-1 pt-1">
              <div className="flex items-start justify-center gap-4 overflow-x-auto pb-2">
                <button
                  onClick={handleAddConnection}
                  className="flex shrink-0 flex-col items-center gap-2"
                >
                  <div
                    className="flex h-[68px] w-[68px] items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,104,112,0.08), rgba(45,104,112,0.03))",
                      border: "2px dashed rgba(45,104,112,0.30)",
                    }}
                  >
                    <span className="text-[30px] leading-none" style={{ color: "var(--swatch-teal)" }}>+</span>
                  </div>
                  <span className="text-[11px]" style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
                    Add
                  </span>
                </button>

                {visibleConnectionEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => handleOpenConnectionFromAvatar(entry)}
                    className="flex shrink-0 flex-col items-center gap-2"
                  >
                    <div
                      className="rounded-full p-[3px]"
                      style={{
                        background: entry.isPlaceholder
                          ? "linear-gradient(135deg, #8a9ea4, #b0bec5)"
                          : entry.status === "accepted"
                            ? "linear-gradient(135deg, var(--swatch-cedar-grove), var(--swatch-teal))"
                            : "linear-gradient(135deg, var(--swatch-teal), var(--swatch-teal-mid))",
                      }}
                    >
                      <Avatar className="h-[68px] w-[68px] border-[3px]" style={{ borderColor: "var(--swatch-sand)" }}>
                        {entry.image ? <AvatarImage src={entry.image} alt={entry.name} className="object-cover" /> : null}
                        <AvatarFallback
                          className="text-sm font-bold"
                          style={{
                            background: "linear-gradient(135deg, var(--swatch-teal), var(--swatch-teal))",
                            color: "#fff",
                          }}
                        >
                          {entry.name[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span
                      className="max-w-[72px] truncate text-[11px]"
                      style={{
                        color: entry.isPlaceholder ? "var(--swatch-text-light)" : "var(--swatch-teal)",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      {entry.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section
              className="card-design-sand mt-3 rounded-[28px] p-3 md:p-4"
            >
              <div className="mb-3">
                <Select value={searchScope} onValueChange={setSearchScope}>
                  <SelectTrigger
                    className="surface-field h-11 rounded-[18px] border px-4 text-sm shadow-none focus:ring-1"
                  >
                    <SelectValue placeholder="Choose who to search" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="self">You</SelectItem>
                    {liveConnections.map((connection) => (
                      <SelectItem key={connection.id} value={connection.partnerId!}>
                        {connection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className="surface-field flex items-center gap-3 rounded-[22px] border px-4 py-3 md:px-5 md:py-4"
              >
                <button onClick={runHomeSearch} aria-label="Search home" className="shrink-0">
                  <Search className="h-4 w-4" style={{ color: "var(--swatch-text-light)" }} />
                </button>
                <input
                  value={homeSearch}
                  onChange={(event) => setHomeSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      runHomeSearch();
                    }
                  }}
                  placeholder="Search a person, reminder, date, or idea"
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                />
              </div>
            </section>

            <section
              className="card-design-sand mt-5 overflow-hidden rounded-[30px] p-3 md:p-4"
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
            className="card-design-sand overflow-hidden rounded-[30px] p-4"
          >
            <div className="pb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                <p className="surface-eyebrow-coral">
                  Connection Feed
                </p>
                <h3 className="surface-heading-lg mt-2">
                  From your people.
                </h3>
                </div>
                <button
                  onClick={() => navigate("/dashboard/connection-feed")}
                  className="surface-action-text surface-button-soft-glow inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
                >
                  Go to feed
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3 xl:max-h-[calc(100vh-240px)] xl:overflow-y-auto xl:pr-1">
              {recentActivityItems.length === 0 ? (
                <div className="card-inset-white rounded-[22px] px-4 py-4">
                  <p className="surface-eyebrow-coral">
                    Connections
                  </p>
                  <p className="surface-heading-md mt-2">
                    Start with one person who matters most.
                  </p>
                  <p className="surface-body mt-2">
                    Once you add them, this area becomes your shared pulse for updates, reminders, and profile changes.
                  </p>
                  <p className="surface-meta mt-3">
                    Ready when you are
                  </p>
                </div>
              ) : (
                recentActivityItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/dashboard/connection-feed?coupleId=${item.coupleId}`)}
                    className="card-inset-white rounded-[22px] px-4 py-4"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: item.accent }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="surface-heading-md text-[17px]">
                          {item.title}
                        </p>
                        <p className="surface-body mt-2">
                          {item.detail}
                        </p>
                        <div className="surface-meta mt-3 flex items-center gap-2">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span>{item.meta}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(30,74,82,0.22)] px-4 py-6 backdrop-blur-sm">
            <div
              className="card-design-login relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-[32px]"
              style={{ boxShadow: "0 30px 80px rgba(30,74,82,0.20)" }}
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="surface-button-secondary absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full"
                style={{ color: "var(--swatch-teal)" }}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="border-b border-white/70 px-6 py-5">
                <p className="surface-eyebrow-coral">
                  Home Search
                </p>
                <h2 className="surface-heading-lg mt-2 text-[32px]">
                  Results for "{homeSearch.trim()}"
                </h2>
                <p className="surface-meta mt-2 text-sm">
                  Scope: {searchScopeLabel}
                </p>
              </div>

              <div className="grid max-h-[calc(85vh-110px)] gap-0 overflow-y-auto md:grid-cols-2">
                <section className="border-b border-white/60 px-6 py-5 md:border-b-0 md:border-r">
                  <p className="surface-eyebrow-teal">
                    {searchScope === "self" ? "Your Results" : searchScope === "everyone" ? "Your Results" : "Your Results"}
                  </p>
                  <div className="mt-4 space-y-3">
                    {searchLoading && <p className="surface-meta text-sm">Searching...</p>}
                    {!searchLoading && mySearchResults.length === 0 && (
                      <p className="surface-meta text-sm">
                        Nothing on your page matches this search yet.
                      </p>
                    )}
                    {mySearchResults.map((result) => (
                      <button
                        key={`mine-${result.id}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate("/dashboard/my-go-two");
                        }}
                        className="card-inset-white block w-full rounded-[22px] px-4 py-3 text-left"
                      >
                        <p className="surface-eyebrow-teal">
                          {result.meta}
                        </p>
                        <p className="surface-heading-md mt-2">
                          {result.title}
                        </p>
                        <p className="surface-body mt-2">
                          {result.subtitle}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="px-6 py-5">
                  <p className="surface-eyebrow-coral">
                    {searchScope === "self" ? "Your Circle" : searchScope === "everyone" ? "Your Circle" : searchScopeLabel}
                  </p>
                  <div className="mt-4 space-y-3">
                    {searchLoading && <p className="surface-meta text-sm">Searching your circle...</p>}
                    {!searchLoading && circleSearchResults.length === 0 && (
                      <p className="surface-meta text-sm">
                        No shared matches were found across your connections.
                      </p>
                    )}
                    {circleSearchResults.map((result) => (
                      <div
                        key={`circle-${result.id}`}
                        className="card-inset-white rounded-[22px] px-4 py-3"
                      >
                        <p className="surface-eyebrow-coral">
                          {result.ownerLabel}
                        </p>
                        <p className="surface-heading-md mt-2">
                          {result.title}
                        </p>
                        <p className="surface-body mt-2">
                          {result.subtitle}
                        </p>
                        <p className="surface-meta mt-3">
                          {result.meta}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AddConnectionModal open={showAddModal} onClose={() => setShowAddModal(false)} onConnectionCreated={loadConnections} />
    </div>
  );
};

export default DashboardHome;
