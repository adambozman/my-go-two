import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock3, Lock, PencilLine, RefreshCw, Sparkles, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type PermissionKey =
  | "sizes"
  | "brands"
  | "food_preferences"
  | "gift_ideas"
  | "wish_list"
  | "occasions"
  | "memories"
  | "saved_items";

type PermissionState = Record<PermissionKey, boolean>;

interface ConnectionRecord {
  id: string;
  name: string;
  image: string;
  email: string;
  status: string;
  partnerId: string | null;
  updatedAt: string;
}

interface EntryRecord {
  id: string;
  entry_name: string;
  group_name: string;
  card_key: string;
  field_values: Record<string, string> | null;
  image_url: string | null;
  updated_at: string;
}

type FeedSectionKey = "style" | "food" | "favorites" | "personal" | "everyday";

interface FeedItem {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  imageUrl: string | null;
  tags: string[];
  section: FeedSectionKey;
}

const shellCardStyle = {
  boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
} as const;

const emptyPermissions: PermissionState = {
  sizes: false,
  brands: false,
  food_preferences: false,
  gift_ideas: false,
  wish_list: false,
  occasions: false,
  memories: false,
  saved_items: false,
};

const editablePermissionFields: Array<{ key: PermissionKey; label: string; description: string }> = [
  { key: "sizes", label: "Sizes & fit", description: "Clothing, fit, and sizing details." },
  { key: "brands", label: "Brands & go-to picks", description: "Preferred brands, staples, and personal care choices." },
  { key: "food_preferences", label: "Food & drink", description: "Meals, snacks, coffee orders, and grocery specifics." },
  { key: "gift_ideas", label: "Gift ideas", description: "Ideas worth keeping in reach for birthdays or surprises." },
  { key: "wish_list", label: "Wish list", description: "Specific wants they can browse when they need a clue." },
  { key: "occasions", label: "Dates & occasions", description: "Birthdays, anniversaries, and meaningful calendar moments." },
  { key: "memories", label: "Memories", description: "Notes, moments, and emotional context worth remembering." },
  { key: "saved_items", label: "Saved items", description: "Everyday products and repeat buys you want handy." },
];

const feedSectionConfig: Record<FeedSectionKey, { label: string; eyebrow: string; description: string }> = {
  style: {
    label: "Style & fit",
    eyebrow: "Style",
    description: "The silhouettes, staples, and fit cues that help you get it right.",
  },
  food: {
    label: "Food & drink",
    eyebrow: "Food",
    description: "Orders, cravings, grocery shortcuts, and the things they reach for often.",
  },
  favorites: {
    label: "Favorites & signals",
    eyebrow: "Favorites",
    description: "Wish-list clues, memorable ideas, and things worth keeping in mind.",
  },
  personal: {
    label: "Personal care",
    eyebrow: "Personal",
    description: "Routine products, hygiene essentials, and everyday specifics.",
  },
  everyday: {
    label: "Everyday feed",
    eyebrow: "Shared",
    description: "Everything else they have chosen to make easy for you to remember.",
  },
};

function formatRelativeDateLabel(value?: string | null) {
  if (!value) return "Just updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just updated";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.round(diffMs / 86400000);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function normalizeText(...parts: Array<string | null | undefined>) {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function inferFeedSection(entry: Pick<EntryRecord, "entry_name" | "group_name" | "card_key">): FeedSectionKey {
  const text = normalizeText(entry.entry_name, entry.group_name, entry.card_key);

  if (/(food|drink|coffee|tea|taco|restaurant|snack|grocery|meal|milk|pizza|kitchen)/.test(text)) {
    return "food";
  }

  if (/(wish|gift|favorite|favourite|save|saved|memory|anniversary|birthday|occasion)/.test(text)) {
    return "favorites";
  }

  if (/(skin|makeup|hygiene|personal|tooth|shampoo|conditioner|pads|razor|soap|care)/.test(text)) {
    return "personal";
  }

  if (/(style|fit|top|bottom|shoe|footwear|outfit|shirt|jacket|jean|dress|closet|size|brand|accessor)/.test(text)) {
    return "style";
  }

  return "everyday";
}

function entryIsVisible(section: FeedSectionKey, permissions: PermissionState) {
  switch (section) {
    case "style":
      return permissions.sizes || permissions.brands;
    case "food":
      return permissions.food_preferences;
    case "favorites":
      return permissions.gift_ideas || permissions.wish_list || permissions.occasions || permissions.memories || permissions.saved_items;
    case "personal":
      return permissions.brands || permissions.saved_items || permissions.sizes;
    case "everyday":
      return Object.values(permissions).some(Boolean);
    default:
      return false;
  }
}

function deriveTags(fieldValues: Record<string, string> | null, fallback: string) {
  const values = fieldValues && typeof fieldValues === "object"
    ? Object.values(fieldValues).filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];

  const unique = Array.from(new Set([fallback, ...values])).filter(Boolean);
  return unique.slice(0, 4);
}

function buildAiSuggestions(
  connectionName: string,
  visibleItems: FeedItem[],
  permissionsSharedWithYou: PermissionState,
  profile: { birthday: string | null; anniversary: string | null } | null,
) {
  const styleItems = visibleItems.filter((item) => item.section === "style");
  const foodItems = visibleItems.filter((item) => item.section === "food");
  const favoriteItems = visibleItems.filter((item) => item.section === "favorites");
  const personalItems = visibleItems.filter((item) => item.section === "personal");

  const suggestions: Array<{ title: string; body: string }> = [];

  if (styleItems.length) {
    suggestions.push({
      title: "Build from their safest style anchors",
      body: `${connectionName}'s shared style entries point to ${styleItems[0].title} first. Start there when you need a reliable gift or restock decision.`,
    });
  }

  if (foodItems.length) {
    suggestions.push({
      title: "Turn food notes into a quick-run list",
      body: `Use ${foodItems[0].title} as a grocery shortcut for ${connectionName}. This is the kind of detail that saves you from a bad guess in a hurry.`,
    });
  }

  if (favoriteItems.length) {
    suggestions.push({
      title: "Keep one celebratory fallback ready",
      body: `${connectionName} has already left you a signal with ${favoriteItems[0].title}. That is a strong starting point for birthdays, anniversaries, or last-minute surprises.`,
    });
  }

  if (!foodItems.length && personalItems.length) {
    suggestions.push({
      title: "Round out their everyday essentials next",
      body: `${connectionName} is already sharing personal specifics like ${personalItems[0].title}. Ask for one food or favorite card next so daily errands become even easier.`,
    });
  }

  if (profile?.birthday || profile?.anniversary) {
    const nextDateLabel = profile.birthday ? "birthday" : "anniversary";
    suggestions.push({
      title: "Pair their preferences with the calendar",
      body: `${connectionName}'s ${nextDateLabel} is already in the system. Use this page as the exact reference point before that date sneaks up on you.`,
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      title: "Open one category deeper",
      body: `${connectionName} has not shared much yet. A single food, fit, or personal-care card would instantly make this page more useful in real life.`,
    });
  }

  if (!permissionsSharedWithYou.food_preferences) {
    suggestions.push({
      title: "Food is the highest-value next share",
      body: `If ${connectionName} ever adds food preferences, you unlock one of the fastest real-world uses of GoTwo: getting the exact order or grocery item right.`,
    });
  }

  return suggestions.slice(0, 4);
}

export default function ConnectionPage() {
  const { connectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [savingLabel, setSavingLabel] = useState(false);
  const [connection, setConnection] = useState<ConnectionRecord | null>(null);
  const [labelDraft, setLabelDraft] = useState("");
  const [incomingPermissions, setIncomingPermissions] = useState<PermissionState>(emptyPermissions);
  const [outgoingPermissions, setOutgoingPermissions] = useState<PermissionState>(emptyPermissions);
  const [entries, setEntries] = useState<EntryRecord[]>([]);
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null; birthday: string | null; anniversary: string | null } | null>(null);

  const loadConnection = useCallback(async () => {
    if (!user || !connectionId) return;

    setLoading(true);

    const { data: couple, error: coupleError } = await supabase
      .from("couples")
      .select("*")
      .eq("id", connectionId)
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
      .maybeSingle();

    if (coupleError || !couple) {
      setConnection(null);
      setLoading(false);
      return;
    }

    const isInviter = couple.inviter_id === user.id;
    const partnerId = isInviter ? couple.invitee_id : couple.inviter_id;
    const fallbackName = couple.display_label || (couple.invitee_email ? couple.invitee_email.split("@")[0] : "Connection");

    const [{ data: profileData }, { data: incoming }, { data: outgoing }, { data: entryData }] = await Promise.all([
      partnerId
        ? supabase
            .from("profiles")
            .select("display_name, avatar_url, birthday, anniversary")
            .eq("user_id", partnerId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      partnerId
        ? supabase
            .from("sharing_permissions")
            .select("*")
            .eq("couple_id", couple.id)
            .eq("user_id", partnerId)
            .eq("partner_id", user.id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      partnerId
        ? supabase
            .from("sharing_permissions")
            .select("*")
            .eq("couple_id", couple.id)
            .eq("user_id", user.id)
            .eq("partner_id", partnerId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      partnerId
        ? supabase
            .from("card_entries")
            .select("id, entry_name, group_name, card_key, field_values, image_url, updated_at")
            .eq("user_id", partnerId)
            .order("updated_at", { ascending: false })
            .limit(80)
        : Promise.resolve({ data: [] }),
    ]);

    const resolvedName = couple.display_label || profileData?.display_name || fallbackName;

    setConnection({
      id: couple.id,
      name: resolvedName,
      image: couple.photo_url || profileData?.avatar_url || "",
      email: couple.invitee_email || "",
      status: couple.status,
      partnerId,
      updatedAt: couple.updated_at,
    });
    setLabelDraft(resolvedName);
    setProfile(profileData || null);
    setIncomingPermissions({
      sizes: incoming?.sizes ?? false,
      brands: incoming?.brands ?? false,
      food_preferences: incoming?.food_preferences ?? false,
      gift_ideas: incoming?.gift_ideas ?? false,
      wish_list: incoming?.wish_list ?? false,
      occasions: incoming?.occasions ?? false,
      memories: incoming?.memories ?? false,
      saved_items: incoming?.saved_items ?? false,
    });
    setOutgoingPermissions({
      sizes: outgoing?.sizes ?? false,
      brands: outgoing?.brands ?? false,
      food_preferences: outgoing?.food_preferences ?? false,
      gift_ideas: outgoing?.gift_ideas ?? false,
      wish_list: outgoing?.wish_list ?? false,
      occasions: outgoing?.occasions ?? false,
      memories: outgoing?.memories ?? false,
      saved_items: outgoing?.saved_items ?? false,
    });
    setEntries((entryData as EntryRecord[] | null) || []);
    setLoading(false);
  }, [connectionId, user]);

  useEffect(() => {
    loadConnection();
  }, [loadConnection]);

  const visibleFeedItems = useMemo(() => {
    return entries
      .map((entry) => {
        const section = inferFeedSection(entry);
        return {
          id: entry.id,
          title: entry.entry_name,
          subtitle: entry.group_name,
          updatedAt: entry.updated_at,
          imageUrl: entry.image_url,
          tags: deriveTags(entry.field_values, entry.group_name),
          section,
        } satisfies FeedItem;
      })
      .filter((item) => entryIsVisible(item.section, incomingPermissions));
  }, [entries, incomingPermissions]);

  const feedSections = useMemo(() => {
    return (Object.keys(feedSectionConfig) as FeedSectionKey[])
      .map((sectionKey) => ({
        key: sectionKey,
        config: feedSectionConfig[sectionKey],
        items: visibleFeedItems.filter((item) => item.section === sectionKey),
      }))
      .filter((section) => section.items.length > 0);
  }, [visibleFeedItems]);

  const incomingEnabled = useMemo(
    () => editablePermissionFields.filter((field) => incomingPermissions[field.key]),
    [incomingPermissions],
  );

  const outgoingEnabled = useMemo(
    () => editablePermissionFields.filter((field) => outgoingPermissions[field.key]),
    [outgoingPermissions],
  );

  const aiSuggestions = useMemo(
    () => buildAiSuggestions(connection?.name || "They", visibleFeedItems, incomingPermissions, profile),
    [connection?.name, incomingPermissions, profile, visibleFeedItems],
  );

  const handleSaveLabel = useCallback(async () => {
    if (!connection || !labelDraft.trim() || labelDraft.trim() === connection.name) return;

    setSavingLabel(true);
    const nextLabel = labelDraft.trim();
    const { error } = await supabase
      .from("couples")
      .update({ display_label: nextLabel })
      .eq("id", connection.id);

    if (error) {
      toast({ title: "Could not save label", description: error.message, variant: "destructive" });
      setSavingLabel(false);
      return;
    }

    setConnection((current) => current ? { ...current, name: nextLabel } : current);
    toast({ title: "Connection label updated" });
    setSavingLabel(false);
  }, [connection, labelDraft, toast]);

  const handleToggleOutgoingPermission = useCallback(async (key: PermissionKey, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    const nextPermissions = { ...outgoingPermissions, [key]: nextValue };
    setOutgoingPermissions(nextPermissions);

    const { data: existingRow } = await supabase
      .from("sharing_permissions")
      .select("id")
      .eq("couple_id", connection.id)
      .eq("user_id", user.id)
      .eq("partner_id", connection.partnerId)
      .maybeSingle();

    const payload = {
      ...nextPermissions,
      couple_id: connection.id,
      user_id: user.id,
      user_email: user.email || "",
      partner_id: connection.partnerId,
      partner_email: connection.email || "",
      updated_at: new Date().toISOString(),
    };

    const query = existingRow
      ? supabase.from("sharing_permissions").update(payload).eq("id", existingRow.id)
      : supabase.from("sharing_permissions").insert(payload);

    const { error } = await query;

    if (error) {
      setOutgoingPermissions((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update access", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: nextValue ? "Access added" : "Access revoked", description: `${connection.name} will ${nextValue ? "now" : "no longer"} see ${editablePermissionFields.find((field) => field.key === key)?.label.toLowerCase()}.` });
  }, [connection, outgoingPermissions, toast, user]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm" style={{ color: "var(--swatch-text-light)" }}>Loading connection...</p>
      </div>
    );
  }

  if (!connection) {
    return (
      <div className="mx-auto flex h-full max-w-[960px] items-center justify-center px-6">
        <div
          className="w-full rounded-[30px] p-8 text-center"
          style={{
            ...shellCardStyle,
            background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(245,233,220,0.6) 100%)",
            border: "1px solid rgba(255,255,255,0.85)",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
            Connection
          </p>
          <h1 className="mt-2 text-[36px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
            This connection could not be opened.
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
            style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.82)", color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1480px] px-4 pb-8 pt-3 md:px-6">
      <section
        className="overflow-hidden rounded-[30px] p-5 md:p-6"
        style={{
          ...shellCardStyle,
          background: "linear-gradient(165deg, rgba(255,255,255,0.78) 0%, rgba(245,233,220,0.58) 100%)",
          border: "1px solid rgba(255,255,255,0.86)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.82)" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back home
            </button>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div
                className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border"
                style={{ borderColor: "rgba(45,104,112,0.2)", background: "linear-gradient(135deg, rgba(45,104,112,0.88), rgba(30,74,82,0.88))" }}
              >
                {connection.image ? (
                  <img src={connection.image} alt={connection.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-semibold text-white">{connection.name[0]?.toUpperCase() || "?"}</span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Connection Feed
                </p>
                <h1 className="mt-2 text-[38px] leading-none md:text-[46px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                  {connection.name}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                  Their favorites, styles, food signals, and everyday specifics live here, filtered to what they have chosen to share with you.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.84)" }}>
              {visibleFeedItems.length} shared cards
            </div>
            <div className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)", background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.84)" }}>
              {incomingEnabled.length} open access windows
            </div>
            <button
              onClick={loadConnection}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.84)" }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)]">
          <div className="space-y-5">
            <section
              className="rounded-[28px] p-4 md:p-5"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(247,239,229,0.72) 100%)",
                border: "1px solid rgba(255,255,255,0.84)",
              }}
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Relationship label
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <label className="min-w-[240px] flex-1">
                      <span className="sr-only">Connection label</span>
                      <input
                        value={labelDraft}
                        onChange={(event) => setLabelDraft(event.target.value)}
                        onBlur={handleSaveLabel}
                        className="w-full rounded-[18px] border px-4 py-3 text-sm outline-none"
                        style={{
                          background: "rgba(255,255,255,0.72)",
                          borderColor: "rgba(45,104,112,0.14)",
                          color: "var(--swatch-teal)",
                          fontFamily: "'Jost', sans-serif",
                        }}
                      />
                    </label>
                    <button
                      onClick={handleSaveLabel}
                      disabled={savingLabel || !labelDraft.trim() || labelDraft.trim() === connection.name}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] disabled:opacity-50"
                      style={{ fontFamily: "'Jost', sans-serif", color: "white", background: "var(--swatch-teal)" }}
                    >
                      <PencilLine className="h-3.5 w-3.5" />
                      {savingLabel ? "Saving" : "Save label"}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm" style={{ color: "var(--swatch-antique-coin)" }}>
                  <p>Status: <span style={{ color: "var(--swatch-teal)" }}>{connection.status}</span></p>
                  <p>Updated: <span style={{ color: "var(--swatch-teal)" }}>{formatRelativeDateLabel(connection.updatedAt)}</span></p>
                </div>
              </div>
            </section>

            {feedSections.length === 0 ? (
              <section
                className="rounded-[28px] p-5"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(248,240,230,0.72) 100%)",
                  border: "1px solid rgba(255,255,255,0.84)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                  Shared feed
                </p>
                <h2 className="mt-2 text-[30px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                  Nothing is landing here yet.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                  This page is ready for the moment {connection.name} shares style, food, favorites, or personal-care specifics with you.
                </p>
              </section>
            ) : (
              feedSections.map((section) => (
                <section
                  key={section.key}
                  className="rounded-[28px] p-4 md:p-5"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(248,240,230,0.72) 100%)",
                    border: "1px solid rgba(255,255,255,0.84)",
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    {section.config.eyebrow}
                  </p>
                  <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h2 className="text-[30px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                        {section.config.label}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                        {section.config.description}
                      </p>
                    </div>
                    <div className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.82)" }}>
                      {section.items.length} items
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {section.items.map((item) => (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-[24px] border"
                        style={{ background: "rgba(255,255,255,0.64)", borderColor: "rgba(255,255,255,0.82)" }}
                      >
                        {item.imageUrl ? (
                          <div className="h-44 overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div
                            className="flex h-44 items-end p-4"
                            style={{ background: "linear-gradient(145deg, rgba(45,104,112,0.2), rgba(245,233,220,0.5))" }}
                          >
                            <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "white", background: "rgba(30,74,82,0.76)" }}>
                              {section.config.eyebrow}
                            </span>
                          </div>
                        )}

                        <div className="p-4">
                          <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                            {item.subtitle}
                          </p>
                          <h3 className="mt-2 text-[24px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                            {item.title}
                          </h3>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={`${item.id}-${tag}`}
                                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
                                style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.82)" }}
                              >
                                <Tag className="h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex items-center gap-2 text-[11px]" style={{ color: "var(--swatch-text-light)" }}>
                            <Clock3 className="h-3.5 w-3.5" />
                            <span>{formatRelativeDateLabel(item.updatedAt)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>

          <aside className="space-y-5">
            <section
              className="rounded-[28px] p-5"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(247,239,229,0.72) 100%)",
                border: "1px solid rgba(255,255,255,0.84)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                AI for {connection.name}
              </p>
              <h2 className="mt-2 text-[30px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                Suggestions shaped to this person.
              </h2>
              <div className="mt-4 space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.title}-${index}`}
                    className="rounded-[22px] px-4 py-4"
                    style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.82)" }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(45,104,112,0.12)", color: "var(--swatch-teal)" }}>
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[19px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                          {suggestion.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                          {suggestion.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-[28px] p-5"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(247,239,229,0.72) 100%)",
                border: "1px solid rgba(255,255,255,0.84)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(45,104,112,0.12)", color: "var(--swatch-teal)" }}>
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                    Your access controls
                  </p>
                  <h2 className="mt-1 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                    Add or revoke instantly.
                  </h2>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {editablePermissionFields.map((field) => (
                  <div key={field.key} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--swatch-teal)" }}>{field.label}</p>
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--swatch-text-light)" }}>
                        {field.description}
                      </p>
                    </div>
                    <Switch
                      checked={outgoingPermissions[field.key]}
                      onCheckedChange={(checked) => handleToggleOutgoingPermission(field.key, checked)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] px-4 py-4" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.8)" }}>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                  Live now
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                  {outgoingEnabled.length
                    ? `${connection.name} can currently see ${outgoingEnabled.map((field) => field.label.toLowerCase()).join(", ")} from your side.`
                    : `You have not opened any permission windows for ${connection.name} yet.`}
                </p>
              </div>
            </section>

            <section
              className="rounded-[28px] p-5"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(247,239,229,0.72) 100%)",
                border: "1px solid rgba(255,255,255,0.84)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                What they share with you
              </p>
              <h2 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                Open windows into their profile.
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {incomingEnabled.length ? incomingEnabled.map((field) => (
                  <span
                    key={field.key}
                    className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.82)" }}
                  >
                    {field.label}
                  </span>
                )) : (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                    They have not granted any specific access yet.
                  </p>
                )}
              </div>

              {(profile?.birthday || profile?.anniversary) && (
                <div className="mt-5 rounded-[22px] px-4 py-4" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.8)" }}>
                  <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                    Connection dates
                  </p>
                  <div className="mt-3 space-y-2 text-sm" style={{ color: "var(--swatch-antique-coin)" }}>
                    {profile?.birthday && <p>Birthday: <span style={{ color: "var(--swatch-teal)" }}>{new Date(profile.birthday).toLocaleDateString(undefined, { month: "long", day: "numeric" })}</span></p>}
                    {profile?.anniversary && <p>Anniversary: <span style={{ color: "var(--swatch-teal)" }}>{new Date(profile.anniversary).toLocaleDateString(undefined, { month: "long", day: "numeric" })}</span></p>}
                  </div>
                </div>
              )}
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
