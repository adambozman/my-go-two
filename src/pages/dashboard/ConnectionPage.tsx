import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { resolveStorageUrl } from "@/lib/storageRefs";

interface ConnectionRecord {
  id: string;
  name: string;
  image: string;
  email: string;
  status: string;
  partnerId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface EntryRecord {
  id: string;
  user_id?: string;
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

interface ConnectionFeedRow {
  feed_item_id: string;
  item_kind: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  section: string | null;
  event_at: string | null;
  meta: Record<string, unknown> | null;
}

interface SharedProfileRecord {
  display_name: string | null;
  avatar_url: string | null;
  birthday: string | null;
  anniversary: string | null;
}

type ProfileFieldKey = "display_name" | "avatar_url" | "birthday" | "anniversary";

type ProfileFieldState = Record<ProfileFieldKey, boolean>;

interface SharedProfileFieldRow {
  id: string;
  field_key: ProfileFieldKey;
  is_shared: boolean;
}

interface SharedCardEntryRow {
  id: string;
  card_entry_id: string;
}

type DerivedFeatureKey = "your_vibe" | "for_you_recommendations" | "ai_conversation_access";
type ConnectionKind = "significant_other" | "wife" | "husband" | "girlfriend" | "boyfriend" | "parent" | "family" | "friend" | "coworker" | "custom";

type DerivedFeatureState = Record<DerivedFeatureKey, boolean>;

interface SharedDerivedFeatureRow {
  id: string;
  feature_key: DerivedFeatureKey;
  is_shared: boolean;
}

interface SharedVibeRecord {
  persona_summary: string | null;
}

interface SharedRecommendationsRecord {
  id: string;
  week_start: string;
  generated_at: string;
  products: Array<{
    name?: string;
    brand?: string;
    hook?: string;
    why?: string;
  }> | null;
}

interface OutgoingSharingStateRecord {
  profile_fields?: Partial<Record<ProfileFieldKey, boolean>> | null;
  derived_features?: Partial<Record<DerivedFeatureKey, boolean>> | null;
  shared_card_entry_ids?: string[] | null;
  connection_kind?: ConnectionKind | null;
}

const editableConnectionKinds: Array<{ key: ConnectionKind; label: string; description: string }> = [
  { key: "significant_other", label: "Significant Other", description: "Enables anniversary and romantic occasion logic." },
  { key: "wife", label: "Wife", description: "Treat this relationship with spouse-level romantic logic." },
  { key: "husband", label: "Husband", description: "Treat this relationship with spouse-level romantic logic." },
  { key: "girlfriend", label: "Girlfriend", description: "Treat this relationship with romantic occasion logic." },
  { key: "boyfriend", label: "Boyfriend", description: "Treat this relationship with romantic occasion logic." },
  { key: "parent", label: "Parent", description: "Keeps gifting focused on family and parent-relevant occasions." },
  { key: "family", label: "Family", description: "Use for siblings and broader family gift context." },
  { key: "friend", label: "Friend", description: "Use for personal but non-family gift context." },
  { key: "coworker", label: "Coworker", description: "Keeps gifting suggestions more neutral and occasion-safe." },
  { key: "custom", label: "Custom", description: "Fallback type when this connection does not fit a standard relationship." },
];

const acceptanceRequiredKinds = new Set<ConnectionKind>(["significant_other", "wife", "husband", "girlfriend", "boyfriend"]);

const emptyProfileFieldState: ProfileFieldState = {
  display_name: false,
  avatar_url: false,
  birthday: false,
  anniversary: false,
};

const editableProfileFields: Array<{ key: ProfileFieldKey; label: string; description: string }> = [
  { key: "display_name", label: "Display name", description: "Let this connection see the name you want attached to your shared data." },
  { key: "avatar_url", label: "Profile photo", description: "Allow this connection to see your private profile image." },
  { key: "birthday", label: "Birthday", description: "Share your birthday for reminders and calendar support." },
  { key: "anniversary", label: "Anniversary", description: "Share your anniversary for reminders and calendar support." },
];

const emptyDerivedFeatureState: DerivedFeatureState = {
  your_vibe: false,
  for_you_recommendations: false,
  ai_conversation_access: false,
};

const editableDerivedFeatures: Array<{ key: DerivedFeatureKey; label: string; description: string }> = [
  { key: "your_vibe", label: "Your Vibe", description: "Share your derived vibe summary without exposing raw Know Me answers." },
  { key: "for_you_recommendations", label: "For You recommendations", description: "Share recommendation results generated from your approved signals." },
  { key: "ai_conversation_access", label: "AI conversation access", description: "Allow AI conversations grounded in your shared vibe and recommendations." },
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

function mapFeedSection(value: string | null | undefined): FeedSectionKey {
  switch (value) {
    case "style":
      return "style";
    case "food":
      return "food";
    case "favorites":
      return "favorites";
    case "personal":
      return "personal";
    default:
      return "everyday";
  }
}

function deriveFeedTagsFromMeta(meta: Record<string, unknown> | null, section: FeedSectionKey) {
  if (!meta || typeof meta !== "object") return [feedSectionConfig[section].label];

  const values = Object.values(meta)
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .slice(0, 3);

  const unique = Array.from(new Set([feedSectionConfig[section].label, ...values]));
  return unique.slice(0, 4);
}

function isRpcMissingError(error: { message?: string } | null | undefined) {
  const message = error?.message || "";
  return /schema cache|Could not find the function|function .* does not exist|PGRST/i.test(message);
}

function buildAiSuggestions(
  connectionName: string,
  visibleItems: FeedItem[],
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

  return suggestions.slice(0, 4);
}

export default function ConnectionPage() {
  const { connectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [sharingBusy, setSharingBusy] = useState(false);
  const [cardSearch, setCardSearch] = useState("");
  const [connection, setConnection] = useState<ConnectionRecord | null>(null);
  const [connectionFeedRows, setConnectionFeedRows] = useState<ConnectionFeedRow[]>([]);
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url: string | null; birthday: string | null; anniversary: string | null } | null>(null);
  const [myEntries, setMyEntries] = useState<EntryRecord[]>([]);
  const [outgoingProfileFields, setOutgoingProfileFields] = useState<ProfileFieldState>(emptyProfileFieldState);
  const [incomingProfileFields, setIncomingProfileFields] = useState<ProfileFieldState>(emptyProfileFieldState);
  const [outgoingDerivedFeatures, setOutgoingDerivedFeatures] = useState<DerivedFeatureState>(emptyDerivedFeatureState);
  const [incomingDerivedFeatures, setIncomingDerivedFeatures] = useState<DerivedFeatureState>(emptyDerivedFeatureState);
  const [sharedCardEntryIds, setSharedCardEntryIds] = useState<string[]>([]);
  const [sharedVibe, setSharedVibe] = useState<string | null>(null);
  const [sharedRecommendations, setSharedRecommendations] = useState<SharedRecommendationsRecord | null>(null);
  const [resolvedConnectionImage, setResolvedConnectionImage] = useState("");
  const [resolvedFeedImages, setResolvedFeedImages] = useState<Record<string, string>>({});
  const [connectionKind, setConnectionKind] = useState<ConnectionKind>("custom");
  const [savingConnectionKind, setSavingConnectionKind] = useState(false);
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
    const fallbackName = couple.invitee_email ? couple.invitee_email.split("@")[0] : "Connection";

    const [
      { data: profileRows },
      { data: incomingProfileRows },
      outgoingSharingStateResult,
      { data: outgoingProfileRows },
      { data: incomingDerivedRows },
      { data: outgoingDerivedRows },
      { data: sharedVibeRows },
      { data: sharedRecommendationRows },
      { data: incomingSharedCardRows },
      { data: ownEntryRows },
      { data: connectionFeedRowsData },
      { data: connectionPreferenceRow },
      { data: partnerProfileRow },
    ] = await Promise.all([
      partnerId
        ? (supabase.rpc as any)("get_connection_shared_profile", {
            p_couple_id: couple.id,
            p_owner_user_id: partnerId,
            p_connection_user_id: user.id,
          })
        : Promise.resolve({ data: null }),
      partnerId
        ? (supabase as any)
            .from("shared_profile_fields")
            .select("id, field_key, is_shared")
            .eq("couple_id", couple.id)
            .eq("owner_user_id", partnerId)
            .eq("connection_user_id", user.id)
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase.rpc as any)("get_connection_outgoing_sharing_state", {
            p_couple_id: couple.id,
            p_connection_user_id: partnerId,
          })
        : Promise.resolve({ data: null, error: null }),
      partnerId
        ? (supabase as any)
            .from("shared_profile_fields")
            .select("id, field_key, is_shared")
            .eq("couple_id", couple.id)
            .eq("owner_user_id", user.id)
            .eq("connection_user_id", partnerId)
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase as any)
            .from("shared_derived_features")
            .select("id, feature_key, is_shared")
            .eq("couple_id", couple.id)
            .eq("owner_user_id", partnerId)
            .eq("connection_user_id", user.id)
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase as any)
            .from("shared_derived_features")
            .select("id, feature_key, is_shared")
            .eq("couple_id", couple.id)
            .eq("owner_user_id", user.id)
            .eq("connection_user_id", partnerId)
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase.rpc as any)("get_connection_shared_vibe", {
            p_couple_id: couple.id,
            p_owner_user_id: partnerId,
            p_connection_user_id: user.id,
          })
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase.rpc as any)("get_connection_shared_recommendations", {
            p_couple_id: couple.id,
            p_owner_user_id: partnerId,
            p_connection_user_id: user.id,
          })
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase as any)
            .from("shared_card_entries")
            .select("id, card_entry_id")
            .eq("couple_id", couple.id)
            .eq("owner_user_id", user.id)
            .eq("connection_user_id", partnerId)
        : Promise.resolve({ data: [] }),
      supabase
        .from("card_entries")
        .select("id, user_id, entry_name, group_name, card_key, field_values, image_url, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(200),
      partnerId
        ? (supabase.rpc as any)("get_connection_feed", {
            p_limit: 80,
            p_couple_id: couple.id,
          })
        : Promise.resolve({ data: [] }),
      partnerId
        ? (supabase as any)
            .from("connection_context_preferences")
            .select("connection_kind")
            .eq("couple_id", couple.id)
            .eq("owner_user_id", user.id)
            .eq("connection_user_id", partnerId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      partnerId
        ? (supabase as any)
            .from("profiles")
            .select("display_name, avatar_url")
            .eq("user_id", partnerId)
            .maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    const profileData = Array.isArray(profileRows) ? (profileRows[0] as SharedProfileRecord | undefined) ?? null : null;
    const feedRows = Array.isArray(connectionFeedRowsData) ? (connectionFeedRowsData as ConnectionFeedRow[]) : [];
    const incomingFieldRows = (incomingProfileRows || []) as SharedProfileFieldRow[];
    const outgoingFieldRows = (outgoingProfileRows || []) as SharedProfileFieldRow[];
    const incomingFeatureRows = (incomingDerivedRows || []) as SharedDerivedFeatureRow[];
    const outgoingFeatureRows = (outgoingDerivedRows || []) as SharedDerivedFeatureRow[];
    const vibeData = Array.isArray(sharedVibeRows) ? (sharedVibeRows[0] as SharedVibeRecord | undefined) ?? null : null;
    const recommendationData = Array.isArray(sharedRecommendationRows) ? (sharedRecommendationRows[0] as SharedRecommendationsRecord | undefined) ?? null : null;
    const cardRows = (incomingSharedCardRows || []) as SharedCardEntryRow[];
    const ownEntries = Array.isArray(ownEntryRows) ? (ownEntryRows as EntryRecord[]) : [];
    const outgoingSharingState = (outgoingSharingStateResult?.data as OutgoingSharingStateRecord | null) || null;
    const outgoingProfileFieldState = outgoingSharingState?.profile_fields;
    const outgoingDerivedFeatureState = outgoingSharingState?.derived_features;
    const outgoingSharedCardEntryIds = Array.isArray(outgoingSharingState?.shared_card_entry_ids)
      ? outgoingSharingState?.shared_card_entry_ids
      : null;

    const partnerProfile = (partnerProfileRow as SharedProfileRecord | null) || null;
    const resolvedName = partnerProfile?.display_name || profileData?.display_name || couple.display_label || fallbackName;

    const initialConnection: ConnectionRecord = {
      id: couple.id,
      name: resolvedName,
      image: partnerProfile?.avatar_url || profileData?.avatar_url || couple.photo_url || "",
      email: couple.invitee_email || "",
      status: couple.status,
      partnerId,
      createdAt: couple.created_at,
      updatedAt: couple.updated_at,
    };
    setConnection(initialConnection);
    setProfile(profileData || null);
    setIncomingProfileFields({
      display_name: !!incomingFieldRows.find((row) => row.field_key === "display_name" && row.is_shared),
      avatar_url: !!incomingFieldRows.find((row) => row.field_key === "avatar_url" && row.is_shared),
      birthday: !!incomingFieldRows.find((row) => row.field_key === "birthday" && row.is_shared),
      anniversary: !!incomingFieldRows.find((row) => row.field_key === "anniversary" && row.is_shared),
    });
    setOutgoingProfileFields({
      display_name: typeof outgoingProfileFieldState?.display_name === "boolean"
        ? outgoingProfileFieldState.display_name
        : !!outgoingFieldRows.find((row) => row.field_key === "display_name" && row.is_shared),
      avatar_url: typeof outgoingProfileFieldState?.avatar_url === "boolean"
        ? outgoingProfileFieldState.avatar_url
        : !!outgoingFieldRows.find((row) => row.field_key === "avatar_url" && row.is_shared),
      birthday: typeof outgoingProfileFieldState?.birthday === "boolean"
        ? outgoingProfileFieldState.birthday
        : !!outgoingFieldRows.find((row) => row.field_key === "birthday" && row.is_shared),
      anniversary: typeof outgoingProfileFieldState?.anniversary === "boolean"
        ? outgoingProfileFieldState.anniversary
        : !!outgoingFieldRows.find((row) => row.field_key === "anniversary" && row.is_shared),
    });
    setIncomingDerivedFeatures({
      your_vibe: !!incomingFeatureRows.find((row) => row.feature_key === "your_vibe" && row.is_shared),
      for_you_recommendations: !!incomingFeatureRows.find((row) => row.feature_key === "for_you_recommendations" && row.is_shared),
      ai_conversation_access: !!incomingFeatureRows.find((row) => row.feature_key === "ai_conversation_access" && row.is_shared),
    });
    setOutgoingDerivedFeatures({
      your_vibe: typeof outgoingDerivedFeatureState?.your_vibe === "boolean"
        ? outgoingDerivedFeatureState.your_vibe
        : !!outgoingFeatureRows.find((row) => row.feature_key === "your_vibe" && row.is_shared),
      for_you_recommendations: typeof outgoingDerivedFeatureState?.for_you_recommendations === "boolean"
        ? outgoingDerivedFeatureState.for_you_recommendations
        : !!outgoingFeatureRows.find((row) => row.feature_key === "for_you_recommendations" && row.is_shared),
      ai_conversation_access: typeof outgoingDerivedFeatureState?.ai_conversation_access === "boolean"
        ? outgoingDerivedFeatureState.ai_conversation_access
        : !!outgoingFeatureRows.find((row) => row.feature_key === "ai_conversation_access" && row.is_shared),
    });
    setSharedVibe(vibeData?.persona_summary || null);
    setSharedRecommendations(recommendationData || null);
    setSharedCardEntryIds(outgoingSharedCardEntryIds || cardRows.map((row) => row.card_entry_id));
    setMyEntries(ownEntries);
    setConnectionFeedRows(feedRows);
    setConnectionKind((outgoingSharingState?.connection_kind || (connectionPreferenceRow as { connection_kind?: ConnectionKind } | null)?.connection_kind || "custom") as ConnectionKind);

    const needsIdentityBackfill =
      !!partnerId &&
      (!initialConnection.name || initialConnection.name.trim().toLowerCase() === "connection" || !initialConnection.image);
    if (needsIdentityBackfill) {
      try {
        const { data: identityData, error: identityError } = await supabase.functions.invoke("searchforaddprofile", {
          body: {
            action: "resolve-connection-identity",
            target_user_id: partnerId,
            couple_id: couple.id,
          },
        });
        if (!identityError && identityData?.identity) {
          const resolvedIdentityName = String(identityData.identity.display_name ?? "").trim();
          const resolvedIdentityImage = typeof identityData.identity.avatar_url === "string"
            ? identityData.identity.avatar_url
            : null;
          if (resolvedIdentityName || resolvedIdentityImage) {
            setConnection((previous) => {
              if (!previous) return previous;
              return {
                ...previous,
                name: resolvedIdentityName || previous.name,
                image: resolvedIdentityImage || previous.image,
              };
            });
          }
        }
      } catch {
        // Ignore fallback identity failures; initial connection state already loaded.
      }
    }
    setLoading(false);
  }, [connectionId, user]);

  useEffect(() => {
    loadConnection();
  }, [loadConnection]);

  const visibleFeedItems = useMemo(() => {
    return connectionFeedRows
      .map((row) => {
        const section = mapFeedSection(row.section);
        const title = row.title || row.body || "Shared update";
        const subtitle = row.subtitle || feedSectionConfig[section].label;
        const updatedAt = row.event_at || new Date().toISOString();
        return {
          id: row.feed_item_id,
          title,
          subtitle,
          updatedAt,
          imageUrl: row.image_url,
          tags: deriveFeedTagsFromMeta(row.meta, section),
          section,
        } satisfies FeedItem;
      });
  }, [connectionFeedRows]);

  const connectionRelationshipLabel = editableConnectionKinds.find((item) => item.key === connectionKind)?.label || "Connection";
  const connectionAgeLabel = connection ? formatRelativeDateLabel(connection.createdAt) : "Today";
  const connectionTimelineLabel = connection?.status === "accepted" ? "Connected" : "Invited";
  const connectionSharedCountLabel = `${visibleFeedItems.length} shared item${visibleFeedItems.length === 1 ? "" : "s"}`;

  useEffect(() => {
    let cancelled = false;

    const loadConnectionImage = async () => {
      const resolved = await resolveStorageUrl(connection?.image);
      if (!cancelled) {
        setResolvedConnectionImage(resolved || connection?.image || "");
      }
    };

    loadConnectionImage();

    return () => {
      cancelled = true;
    };
  }, [connection?.image]);

  useEffect(() => {
    let cancelled = false;

    const loadFeedImages = async () => {
      const imageValues = Array.from(new Set(visibleFeedItems.map((item) => item.imageUrl).filter(Boolean)));
      if (imageValues.length === 0) {
        if (!cancelled) setResolvedFeedImages({});
        return;
      }

      const nextEntries = await Promise.all(
        imageValues.map(async (value) => [value as string, await resolveStorageUrl(value)] as const),
      );

      if (!cancelled) {
        setResolvedFeedImages(Object.fromEntries(nextEntries));
      }
    };

    loadFeedImages();

    return () => {
      cancelled = true;
    };
  }, [visibleFeedItems]);

  const incomingEnabled = useMemo(() => editableProfileFields.filter((field) => incomingProfileFields[field.key]), [incomingProfileFields]);
  const outgoingEnabled = useMemo(() => editableProfileFields.filter((field) => outgoingProfileFields[field.key]), [outgoingProfileFields]);
  const incomingDerivedEnabled = useMemo(() => editableDerivedFeatures.filter((feature) => incomingDerivedFeatures[feature.key]), [incomingDerivedFeatures]);
  const outgoingDerivedEnabled = useMemo(() => editableDerivedFeatures.filter((feature) => outgoingDerivedFeatures[feature.key]), [outgoingDerivedFeatures]);

  const filteredMyEntries = useMemo(() => {
    const needle = cardSearch.trim().toLowerCase();
    if (!needle) return myEntries;
    return myEntries.filter((entry) => {
      const haystack = `${entry.entry_name} ${entry.group_name} ${entry.card_key}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [cardSearch, myEntries]);

  const aiSuggestions = useMemo(
    () => buildAiSuggestions(connection?.name || "They", visibleFeedItems, profile),
    [connection?.name, profile, visibleFeedItems],
  );
  const canConfigureOutgoing = Boolean(connection?.partnerId);

  const handleToggleOutgoingProfileField = useCallback(async (key: ProfileFieldKey, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    setOutgoingProfileFields((current) => ({ ...current, [key]: nextValue }));

    let { error } = await (supabase.rpc as any)("set_connection_profile_field_share", {
      p_couple_id: connection.id,
      p_connection_user_id: connection.partnerId,
      p_field_key: key,
      p_is_shared: nextValue,
    });

    if (error && isRpcMissingError(error)) {
      ({ error } = await (supabase as any)
        .from("shared_profile_fields")
        .upsert(
          {
            couple_id: connection.id,
            owner_user_id: user.id,
            connection_user_id: connection.partnerId,
            field_key: key,
            is_shared: nextValue,
          },
          { onConflict: "couple_id,owner_user_id,connection_user_id,field_key" },
        ));
    }

    if (error) {
      setOutgoingProfileFields((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update field sharing", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: nextValue ? "Field shared" : "Field hidden", description: `${connection?.name || "They"} will ${nextValue ? "now" : "no longer"} see ${editableProfileFields.find((field) => field.key === key)?.label.toLowerCase()}.` });
  }, [connection, loadConnection, toast, user]);

  const handleToggleCardShare = useCallback(async (entry: EntryRecord, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    setSharedCardEntryIds((current) => nextValue ? Array.from(new Set([...current, entry.id])) : current.filter((id) => id !== entry.id));

    if (nextValue) {
      let { error } = await (supabase.rpc as any)("set_connection_card_share", {
        p_couple_id: connection.id,
        p_connection_user_id: connection.partnerId,
        p_card_entry_id: entry.id,
        p_is_shared: true,
      });

      if (error && isRpcMissingError(error)) {
        ({ error } = await (supabase as any)
          .from("shared_card_entries")
          .upsert(
            {
              couple_id: connection.id,
              owner_user_id: user.id,
              connection_user_id: connection.partnerId,
              card_entry_id: entry.id,
            },
            { onConflict: "couple_id,owner_user_id,connection_user_id,card_entry_id" },
          ));
      }

      if (error) {
        setSharedCardEntryIds((current) => current.filter((id) => id !== entry.id));
        toast({ title: "Could not share card", description: error.message, variant: "destructive" });
        return;
      }
    } else {
      let { error } = await (supabase.rpc as any)("set_connection_card_share", {
        p_couple_id: connection.id,
        p_connection_user_id: connection.partnerId,
        p_card_entry_id: entry.id,
        p_is_shared: false,
      });

      if (error && isRpcMissingError(error)) {
        ({ error } = await (supabase as any)
          .from("shared_card_entries")
          .delete()
          .eq("couple_id", connection.id)
          .eq("owner_user_id", user.id)
          .eq("connection_user_id", connection.partnerId)
          .eq("card_entry_id", entry.id));
      }

      if (error) {
        setSharedCardEntryIds((current) => Array.from(new Set([...current, entry.id])));
        toast({ title: "Could not unshare card", description: error.message, variant: "destructive" });
        return;
      }
    }

    await loadConnection();

    toast({ title: nextValue ? "Card shared" : "Card hidden", description: `${entry.entry_name} is ${nextValue ? "now" : "no longer"} shared with ${connection?.name || "them"}.` });
  }, [connection, loadConnection, toast, user]);

  const handleToggleDerivedFeature = useCallback(async (key: DerivedFeatureKey, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    setOutgoingDerivedFeatures((current) => ({ ...current, [key]: nextValue }));

    let { error } = await (supabase.rpc as any)("set_connection_derived_feature_share", {
      p_couple_id: connection.id,
      p_connection_user_id: connection.partnerId,
      p_feature_key: key,
      p_is_shared: nextValue,
    });

    if (error && isRpcMissingError(error)) {
      ({ error } = await (supabase as any)
        .from("shared_derived_features")
        .upsert(
          {
            couple_id: connection.id,
            owner_user_id: user.id,
            connection_user_id: connection.partnerId,
            feature_key: key,
            is_shared: nextValue,
          },
          { onConflict: "couple_id,owner_user_id,connection_user_id,feature_key" },
        ));
    }

    if (error) {
      setOutgoingDerivedFeatures((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update derived sharing", description: error.message, variant: "destructive" });
      return;
    }

    await loadConnection();

    toast({
      title: nextValue ? "Derived feature shared" : "Derived feature hidden",
      description: `${connection?.name || "They"} will ${nextValue ? "now" : "no longer"} see ${editableDerivedFeatures.find((feature) => feature.key === key)?.label.toLowerCase()}.`,
    });
  }, [connection, loadConnection, toast, user]);

  const handleBulkShare = useCallback(async (mode: "share" | "unshare") => {
    if (!user || !connection || !connection.partnerId) return;

    setSharingBusy(true);
    const rpcName = mode === "share" ? "share_all_card_entries_with_connection" : "unshare_all_card_entries_with_connection";
    const { data, error } = await (supabase.rpc as any)(rpcName, {
      p_couple_id: connection.id,
      p_owner_user_id: user.id,
      p_connection_user_id: connection.partnerId,
    });
    setSharingBusy(false);

    if (error) {
      toast({ title: `Could not ${mode} cards`, description: error.message, variant: "destructive" });
      return;
    }

    if (mode === "share") {
      setSharedCardEntryIds(myEntries.map((entry) => entry.id));
    } else {
      setSharedCardEntryIds([]);
    }

    await loadConnection();

    toast({
      title: mode === "share" ? "All cards shared" : "All cards hidden",
      description: `${connection.name} ${mode === "share" ? "can now see" : "can no longer see"} your product cards. ${typeof data === "number" ? `(${data} changed)` : ""}`.trim(),
    });
  }, [connection, loadConnection, myEntries, toast, user]);

  const handleConnectionKindChange = useCallback(async (nextKind: ConnectionKind) => {
    if (!user || !connection || !connection.partnerId || nextKind === connectionKind) return;
    const requiresAcceptance = acceptanceRequiredKinds.has(nextKind);
    if (connection.status !== "accepted" && requiresAcceptance) {
      toast({
        title: "Connection not accepted yet",
        description: "Only romantic types require acceptance first (Significant Other, Wife, Husband, Girlfriend, Boyfriend).",
        variant: "destructive",
      });
      return;
    }

    const previousKind = connectionKind;
    setConnectionKind(nextKind);
    setSavingConnectionKind(true);

    let { error } = await (supabase.rpc as any)("set_connection_kind_preference", {
      p_couple_id: connection.id,
      p_connection_user_id: connection.partnerId,
      p_connection_kind: nextKind,
    });

    if (error && isRpcMissingError(error)) {
      ({ error } = await (supabase as any)
        .from("connection_context_preferences")
        .upsert(
          {
            couple_id: connection.id,
            owner_user_id: user.id,
            connection_user_id: connection.partnerId,
            connection_kind: nextKind,
          },
          { onConflict: "couple_id,owner_user_id,connection_user_id" },
        ));
    }

    setSavingConnectionKind(false);

    if (error) {
      const isSchemaMissing =
        /connection_context_preferences/i.test(error.message || "") ||
        /schema cache/i.test(error.message || "");
      if (isSchemaMissing) {
        if (connection.status !== "accepted" && !acceptanceRequiredKinds.has(nextKind)) {
          toast({
            title: "Connection type updated",
            description: "Saved for this session. The backend table for persistent connection types is not deployed yet.",
          });
          return;
        }
      }
      setConnectionKind(previousKind);
      toast({
        title: "Could not update connection type",
        description: isSchemaMissing
          ? "Connection type backend is not deployed in this environment yet."
          : error.message,
        variant: "destructive",
      });
      return;
    }

    await loadConnection();

    toast({
      title: "Connection type updated",
      description: `${connection.name} is now set as ${editableConnectionKinds.find((item) => item.key === nextKind)?.label.toLowerCase()}.`,
    });
  }, [connection, connectionKind, loadConnection, toast, user]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="surface-meta">Loading connection...</p>
      </div>
    );
  }

  if (!connection) {
    return (
      <div className="mx-auto flex h-full max-w-[960px] items-center justify-center px-6">
        <div className="card-design-neumorph w-full rounded-[30px] p-8 text-center">
          <p className="surface-eyebrow-coral">
            Connection
          </p>
          <h1 className="surface-display-lg mt-2">
            This connection could not be opened.
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="surface-button-secondary mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto h-full max-w-[1320px] overflow-y-auto px-4 pb-10 pt-4 md:px-6">
      <div className="space-y-5">
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/dashboard")}
            className="surface-pill pill-asset-ivory inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </button>
        </div>

        <section className="card-design-neumorph relative w-full max-w-[1120px] overflow-visible p-5 pt-12 md:p-6 md:pt-12 xl:h-[236px]">
            <p className="surface-eyebrow-coral absolute left-5 top-5 md:left-6 md:top-6">
              Go Two / Connection feed
            </p>

            <div className="grid gap-5 xl:h-full xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0 xl:flex xl:h-full xl:flex-col">
                <div className="flex items-center gap-4">
                  <div
                    className="surface-avatar-teal flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border"
                  >
                    {resolvedConnectionImage ? (
                      <img src={resolvedConnectionImage} alt={connection.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl font-semibold text-white">{connection.name[0]?.toUpperCase() || "?"}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h1 className="surface-display-lg mt-2">
                      {connection.name}
                    </h1>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="surface-pill pill-asset-ivory inline-flex items-center rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]">
                    {connectionRelationshipLabel}
                  </span>
                  <span className="surface-pill pill-asset-ivory inline-flex items-center rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]">
                    {connectionTimelineLabel} {connectionAgeLabel}
                  </span>
                  <span className="surface-pill pill-asset-ivory inline-flex items-center rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]">
                    {connectionSharedCountLabel}
                  </span>
                </div>
              </div>

              <div className="surface-inset-panel relative z-20 flex h-full flex-col rounded-[28px] px-5 py-5">
                <div className="flex items-start gap-3">
                  <span className="surface-icon-spot inline-flex h-10 w-10 items-center justify-center rounded-full">
                    <Lock className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="surface-eyebrow-coral">What they can see</p>
                    <h2 className="surface-display-md mt-2">
                      Sharing settings
                    </h2>
                  </div>
                </div>
                <Accordion type="single" collapsible className="relative mt-5">
                  <AccordionItem value="sharing-controls" className="surface-inset-panel relative overflow-visible rounded-[28px] border-0">
                    <AccordionTrigger className="px-5 py-5 text-left hover:no-underline">
                      <p className="surface-eyebrow-teal">Open settings</p>
                    </AccordionTrigger>
                    <AccordionContent className="absolute left-0 right-0 top-full z-30 pt-3">
                      <div className="surface-inset-panel max-h-[420px] overflow-y-auto rounded-[28px] px-5 py-5 shadow-[0_24px_44px_rgba(30,74,82,0.12)]">
                        <div className="surface-inset-panel rounded-[22px] px-4 py-4">
                          <p className="surface-eyebrow-teal">Connection type</p>
                          <div className="mt-4">
                            <Select
                              value={connectionKind}
                              onValueChange={(value) => handleConnectionKindChange(value as ConnectionKind)}
                              disabled={!canConfigureOutgoing || savingConnectionKind}
                            >
                              <SelectTrigger className="surface-field surface-action-text rounded-[18px] px-4 py-3 text-sm">
                                <SelectValue placeholder="Select connection type" />
                              </SelectTrigger>
                              <SelectContent>
                                {editableConnectionKinds.map((item) => (
                                  <SelectItem key={item.key} value={item.key}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="surface-inset-panel mt-4 rounded-[22px] px-4 py-4">
                          <p className="surface-eyebrow-teal">Profile fields</p>
                          <div className="mt-4 space-y-4">
                            {editableProfileFields.map((field) => (
                              <div key={field.key} className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <p className="surface-action-text text-sm font-medium">{field.label}</p>
                                  <p className="surface-meta mt-1">
                                    {field.description}
                                  </p>
                                </div>
                                <Switch
                                  checked={outgoingProfileFields[field.key]}
                                  onCheckedChange={(checked) => handleToggleOutgoingProfileField(field.key, checked)}
                                  disabled={!canConfigureOutgoing}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="surface-inset-panel mt-4 rounded-[22px] px-4 py-4">
                          <p className="surface-eyebrow-teal">Derived features</p>

                          <div className="mt-4 space-y-4">
                            {editableDerivedFeatures.map((feature) => (
                              <div key={feature.key} className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <p className="surface-action-text text-sm font-medium">{feature.label}</p>
                                  <p className="surface-meta mt-1">
                                    {feature.description}
                                  </p>
                                </div>
                                <Switch
                                  checked={outgoingDerivedFeatures[feature.key]}
                                  onCheckedChange={(checked) => handleToggleDerivedFeature(feature.key, checked)}
                                  disabled={!canConfigureOutgoing}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="surface-inset-panel mt-4 rounded-[22px] px-4 py-4">
                          <div className="flex flex-wrap items-end justify-between gap-3">
                            <div>
                              <p className="surface-eyebrow-teal">Product cards</p>
                              <p className="surface-body mt-2">
                                Share one card, a few cards, or everything with one click.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleBulkShare("share")}
                                disabled={!canConfigureOutgoing || sharingBusy || myEntries.length === 0}
                                className="surface-button-primary inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em] disabled:opacity-50"
                              >
                                Share all
                              </button>
                              <button
                                onClick={() => handleBulkShare("unshare")}
                                disabled={!canConfigureOutgoing || sharingBusy || sharedCardEntryIds.length === 0}
                                className="surface-button-secondary inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em] disabled:opacity-50"
                              >
                                Hide all
                              </button>
                            </div>
                          </div>

                          <label className="mt-4 block">
                            <span className="sr-only">Search your product cards</span>
                            <input
                              value={cardSearch}
                              onChange={(event) => setCardSearch(event.target.value)}
                              placeholder="Search your product cards..."
                              className="surface-field surface-action-text w-full rounded-[18px] border px-4 py-3 text-sm outline-none"
                            />
                          </label>

                          <div className="mt-4 max-h-[170px] space-y-3 overflow-y-auto pr-1">
                            {filteredMyEntries.map((entry) => {
                              const isShared = sharedCardEntryIds.includes(entry.id);
                              return (
                                <div key={entry.id} className="surface-inset-panel flex items-start justify-between gap-4 rounded-[18px] px-4 py-3">
                                  <div className="min-w-0">
                                    <p className="surface-action-text text-sm font-medium">{entry.entry_name}</p>
                                    <p className="surface-meta mt-1">
                                      {entry.group_name} | {entry.card_key?.split("__").pop() || "Product card"}
                                    </p>
                                  </div>
                                  <Switch
                                    checked={isShared}
                                    onCheckedChange={(checked) => handleToggleCardShare(entry, checked)}
                                    disabled={!canConfigureOutgoing}
                                  />
                                </div>
                              );
                            })}
                            {filteredMyEntries.length === 0 && (
                              <p className="surface-body text-sm leading-relaxed">
                                No product cards match this search yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] xl:items-stretch">
          <div className="space-y-5">
            <section className="card-design-neumorph flex min-h-[calc(100vh-320px)] flex-col p-6 md:p-7">
              <div>
                <p className="surface-eyebrow-coral">
                  AI Connection
                </p>
              </div>

              <div className="mt-5 grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.18fr)_250px] lg:grid-rows-[minmax(0,1fr)_minmax(180px,auto)]">
                {incomingDerivedFeatures.for_you_recommendations && sharedRecommendations?.products?.length ? (
                  <>
                    <div className="card-design-neumorph flex h-full flex-col justify-between px-5 py-5">
                      <div className="flex items-start gap-3">
                        <span className="surface-icon-spot mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="surface-heading-lg">
                            {sharedRecommendations.products[0]?.name || "Gift recommendation"}
                          </p>
                          <p className="surface-eyebrow-coral mt-2">
                            {sharedRecommendations.products[0]?.brand || "For this connection"}
                          </p>
                          <p className="surface-body mt-3">
                            {sharedRecommendations.products[0]?.hook || sharedRecommendations.products[0]?.why || `Pulled from ${connection.name}'s shared recommendations.`}
                          </p>
                        </div>
                      </div>
                      {sharedRecommendations.products[0]?.why && sharedRecommendations.products[0]?.hook !== sharedRecommendations.products[0]?.why ? (
                        <p className="surface-meta mt-4">
                          {sharedRecommendations.products[0]?.why}
                        </p>
                      ) : null}
                    </div>

                    <div className="card-design-neumorph flex h-full flex-col justify-between px-5 py-5">
                      <div>
                        <p className="surface-eyebrow-coral">
                          Next gift
                        </p>
                        <p className="surface-heading-lg mt-3">
                          {sharedRecommendations.products[1]?.name || "More to unlock"}
                        </p>
                        <p className="surface-meta mt-3">
                          {sharedRecommendations.products[1]?.brand || `${sharedRecommendations.products.length} shared gift signals`}
                        </p>
                      </div>
                      <p className="surface-body mt-4">
                        {sharedRecommendations.products[1]?.hook || sharedRecommendations.products[1]?.why || `Go Two already has enough signals from ${connection.name} to start shaping better gifts here.`}
                      </p>
                    </div>

                    <div className="card-design-neumorph grid gap-4 px-5 py-5 lg:col-span-2 md:grid-cols-2">
                      {(sharedRecommendations.products.slice(2, 4).length > 0 ? sharedRecommendations.products.slice(2, 4) : sharedRecommendations.products.slice(0, 2)).map((product, index) => (
                        <div
                          key={`${product.brand || "gift"}-${product.name || index}-secondary`}
                          className="surface-inset-panel flex h-full flex-col rounded-[24px] px-4 py-4"
                        >
                          <p className="surface-heading-sm">
                            {product.name || "Gift recommendation"}
                          </p>
                          <p className="surface-eyebrow-coral mt-2">
                            {product.brand || "Shared signal"}
                          </p>
                          <p className="surface-body mt-3">
                            {product.hook || product.why || `Another signal Go Two can use for ${connection.name}.`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-design-neumorph flex h-full flex-col justify-between px-5 py-5">
                      <div>
                        <p className="surface-heading-lg">
                          Gifts are not ready yet.
                        </p>
                        <p className="surface-body mt-3">
                          There are not enough shared recommendation signals yet.
                        </p>
                      </div>
                      <p className="surface-meta mt-4">
                        Tell {connection.name} to share more so Go Two can start filling this area with real gift picks.
                      </p>
                    </div>

                    <div className="card-design-neumorph flex h-full flex-col justify-between px-5 py-5">
                      <div>
                        <p className="surface-eyebrow-coral">
                          Status
                        </p>
                        <p className="surface-heading-lg mt-3">
                          Waiting on more signals
                        </p>
                      </div>
                      <p className="surface-body mt-4">
                        Product cards, preferences, and This or That answers will turn this panel into gift recommendations.
                      </p>
                    </div>

                    <div className="card-design-neumorph flex h-full flex-col justify-between px-5 py-5 lg:col-span-2">
                      <div>
                        <p className="surface-eyebrow-coral">
                          What belongs here
                        </p>
                        <p className="surface-heading-lg mt-3">
                          Gift ideas shaped to {connection.name}.
                        </p>
                      </div>
                      <p className="surface-body mt-4">
                        Once {connection.name} shares enough cards and recommendation signals, this lower box fills with more gifts instead of placeholder copy.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
