import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock3, Lock, PencilLine, RefreshCw, Sparkles, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
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

interface ConnectionPermissionState {
  sizes: boolean;
  brands: boolean;
  food_preferences: boolean;
  gift_ideas: boolean;
  wish_list: boolean;
  occasions: boolean;
  memories: boolean;
  saved_items: boolean;
}

interface FeedItem {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  imageUrl: string | null;
  tags: string[];
  section: FeedSectionKey;
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

const shellCardStyle = {
  boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
} as const;

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

function entryIsVisible(section: FeedSectionKey, permissions: ConnectionPermissionState) {
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
  const [savingLabel, setSavingLabel] = useState(false);
  const [sharingBusy, setSharingBusy] = useState(false);
  const [cardSearch, setCardSearch] = useState("");
  const [connection, setConnection] = useState<ConnectionRecord | null>(null);
  const [labelDraft, setLabelDraft] = useState("");
  const [entries, setEntries] = useState<EntryRecord[]>([]);
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

    const [
      { data: profileRows },
      { data: incomingProfileRows },
      { data: outgoingProfileRows },
      { data: incomingDerivedRows },
      { data: outgoingDerivedRows },
      { data: sharedVibeRows },
      { data: sharedRecommendationRows },
      { data: incomingSharedCardRows },
      { data: ownEntryRows },
      { data: entryRows },
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
        ? (supabase.rpc as any)("get_connection_visible_card_entries", {
            p_couple_id: couple.id,
            p_owner_user_id: partnerId,
            p_connection_user_id: user.id,
          })
        : Promise.resolve({ data: [] }),
    ]);

    const profileData = Array.isArray(profileRows) ? (profileRows[0] as SharedProfileRecord | undefined) ?? null : null;
    const entryData = Array.isArray(entryRows) ? (entryRows as EntryRecord[]) : [];
    const incomingFieldRows = (incomingProfileRows || []) as SharedProfileFieldRow[];
    const outgoingFieldRows = (outgoingProfileRows || []) as SharedProfileFieldRow[];
    const incomingFeatureRows = (incomingDerivedRows || []) as SharedDerivedFeatureRow[];
    const outgoingFeatureRows = (outgoingDerivedRows || []) as SharedDerivedFeatureRow[];
    const vibeData = Array.isArray(sharedVibeRows) ? (sharedVibeRows[0] as SharedVibeRecord | undefined) ?? null : null;
    const recommendationData = Array.isArray(sharedRecommendationRows) ? (sharedRecommendationRows[0] as SharedRecommendationsRecord | undefined) ?? null : null;
    const cardRows = (incomingSharedCardRows || []) as SharedCardEntryRow[];
    const ownEntries = Array.isArray(ownEntryRows) ? (ownEntryRows as EntryRecord[]) : [];

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
    setIncomingProfileFields({
      display_name: !!incomingFieldRows.find((row) => row.field_key === "display_name" && row.is_shared),
      avatar_url: !!incomingFieldRows.find((row) => row.field_key === "avatar_url" && row.is_shared),
      birthday: !!incomingFieldRows.find((row) => row.field_key === "birthday" && row.is_shared),
      anniversary: !!incomingFieldRows.find((row) => row.field_key === "anniversary" && row.is_shared),
    });
    setOutgoingProfileFields({
      display_name: !!outgoingFieldRows.find((row) => row.field_key === "display_name" && row.is_shared),
      avatar_url: !!outgoingFieldRows.find((row) => row.field_key === "avatar_url" && row.is_shared),
      birthday: !!outgoingFieldRows.find((row) => row.field_key === "birthday" && row.is_shared),
      anniversary: !!outgoingFieldRows.find((row) => row.field_key === "anniversary" && row.is_shared),
    });
    setIncomingDerivedFeatures({
      your_vibe: !!incomingFeatureRows.find((row) => row.feature_key === "your_vibe" && row.is_shared),
      for_you_recommendations: !!incomingFeatureRows.find((row) => row.feature_key === "for_you_recommendations" && row.is_shared),
      ai_conversation_access: !!incomingFeatureRows.find((row) => row.feature_key === "ai_conversation_access" && row.is_shared),
    });
    setOutgoingDerivedFeatures({
      your_vibe: !!outgoingFeatureRows.find((row) => row.feature_key === "your_vibe" && row.is_shared),
      for_you_recommendations: !!outgoingFeatureRows.find((row) => row.feature_key === "for_you_recommendations" && row.is_shared),
      ai_conversation_access: !!outgoingFeatureRows.find((row) => row.feature_key === "ai_conversation_access" && row.is_shared),
    });
    setSharedVibe(vibeData?.persona_summary || null);
    setSharedRecommendations(recommendationData || null);
    setSharedCardEntryIds(cardRows.map((row) => row.card_entry_id));
    setMyEntries(ownEntries);
    setEntries(entryData);
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
      });
  }, [entries]);

  useEffect(() => {
    let cancelled = false;

    const loadConnectionImage = async () => {
      const resolved = await resolveStorageUrl(connection?.image);
      if (!cancelled) {
        setResolvedConnectionImage(resolved || "");
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

  const feedSections = useMemo(() => {
    return (Object.keys(feedSectionConfig) as FeedSectionKey[])
      .map((sectionKey) => ({
        key: sectionKey,
        config: feedSectionConfig[sectionKey],
        items: visibleFeedItems.filter((item) => item.section === sectionKey),
      }))
      .filter((section) => section.items.length > 0);
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

  const handleToggleOutgoingProfileField = useCallback(async (key: ProfileFieldKey, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    setOutgoingProfileFields((current) => ({ ...current, [key]: nextValue }));

    const { data: existingRow, error: loadError } = await (supabase as any)
      .from("shared_profile_fields")
      .select("id")
      .eq("couple_id", connection.id)
      .eq("owner_user_id", user.id)
      .eq("connection_user_id", connection.partnerId)
      .eq("field_key", key)
      .maybeSingle();

    if (loadError) {
      setOutgoingProfileFields((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update field sharing", description: loadError.message, variant: "destructive" });
      return;
    }

    const payload = {
      couple_id: connection.id,
      owner_user_id: user.id,
      connection_user_id: connection.partnerId,
      field_key: key,
      is_shared: nextValue,
    };

    const query = existingRow
      ? (supabase as any).from("shared_profile_fields").update({ is_shared: nextValue }).eq("id", existingRow.id)
      : (supabase as any).from("shared_profile_fields").insert(payload);

    const { error } = await query;

    if (error) {
      setOutgoingProfileFields((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update field sharing", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: nextValue ? "Field shared" : "Field hidden", description: `${connection.name} will ${nextValue ? "now" : "no longer"} see ${editableProfileFields.find((field) => field.key === key)?.label.toLowerCase()}.` });
  }, [connection, toast, user]);

  const handleToggleCardShare = useCallback(async (entry: EntryRecord, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    setSharedCardEntryIds((current) => nextValue ? Array.from(new Set([...current, entry.id])) : current.filter((id) => id !== entry.id));

    if (nextValue) {
      const { error } = await (supabase as any).from("shared_card_entries").insert({
        couple_id: connection.id,
        owner_user_id: user.id,
        connection_user_id: connection.partnerId,
        card_entry_id: entry.id,
      });

      if (error) {
        setSharedCardEntryIds((current) => current.filter((id) => id !== entry.id));
        toast({ title: "Could not share card", description: error.message, variant: "destructive" });
        return;
      }
    } else {
      const { error } = await (supabase as any)
        .from("shared_card_entries")
        .delete()
        .eq("couple_id", connection.id)
        .eq("owner_user_id", user.id)
        .eq("connection_user_id", connection.partnerId)
        .eq("card_entry_id", entry.id);

      if (error) {
        setSharedCardEntryIds((current) => Array.from(new Set([...current, entry.id])));
        toast({ title: "Could not unshare card", description: error.message, variant: "destructive" });
        return;
      }
    }

    toast({ title: nextValue ? "Card shared" : "Card hidden", description: `${entry.entry_name} is ${nextValue ? "now" : "no longer"} shared with ${connection.name}.` });
  }, [connection, toast, user]);

  const handleToggleDerivedFeature = useCallback(async (key: DerivedFeatureKey, nextValue: boolean) => {
    if (!user || !connection || !connection.partnerId) return;

    setOutgoingDerivedFeatures((current) => ({ ...current, [key]: nextValue }));

    const { data: existingRow, error: loadError } = await supabase
      .from("shared_derived_features")
      .select("id")
      .eq("couple_id", connection.id)
      .eq("owner_user_id", user.id)
      .eq("connection_user_id", connection.partnerId)
      .eq("feature_key", key)
      .maybeSingle();

    if (loadError) {
      setOutgoingDerivedFeatures((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update derived sharing", description: loadError.message, variant: "destructive" });
      return;
    }

    const payload = {
      couple_id: connection.id,
      owner_user_id: user.id,
      connection_user_id: connection.partnerId,
      feature_key: key,
      is_shared: nextValue,
    };

    const query = existingRow
      ? supabase.from("shared_derived_features").update({ is_shared: nextValue }).eq("id", existingRow.id)
      : supabase.from("shared_derived_features").insert(payload);

    const { error } = await query;

    if (error) {
      setOutgoingDerivedFeatures((current) => ({ ...current, [key]: !nextValue }));
      toast({ title: "Could not update derived sharing", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: nextValue ? "Derived feature shared" : "Derived feature hidden",
      description: `${connection.name} will ${nextValue ? "now" : "no longer"} see ${editableDerivedFeatures.find((feature) => feature.key === key)?.label.toLowerCase()}.`,
    });
  }, [connection, toast, user]);

  const handleBulkShare = useCallback(async (mode: "share" | "unshare") => {
    if (!user || !connection || !connection.partnerId) return;

    setSharingBusy(true);
    const rpcName = mode === "share" ? "share_all_card_entries_with_connection" : "unshare_all_card_entries_with_connection";
    const { data, error } = await supabase.rpc(rpcName, {
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

    toast({
      title: mode === "share" ? "All cards shared" : "All cards hidden",
      description: `${connection.name} ${mode === "share" ? "can now see" : "can no longer see"} your product cards. ${typeof data === "number" ? `(${data} changed)` : ""}`.trim(),
    });
  }, [connection, myEntries, toast, user]);

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
                {resolvedConnectionImage ? (
                  <img src={resolvedConnectionImage} alt={connection.name} className="h-full w-full object-cover" />
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
              {incomingEnabled.length} shared profile fields
            </div>
            <div className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)", background: "rgba(255,255,255,0.68)", border: "1px solid rgba(255,255,255,0.84)" }}>
              {incomingDerivedEnabled.length} shared derived features
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
                  This page is ready for the moment {connection.name} shares product cards, profile fields, or derived features with you.
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
                        {(resolvedFeedImages[item.imageUrl || ""] || item.imageUrl) ? (
                          <div className="h-44 overflow-hidden">
                            <img src={resolvedFeedImages[item.imageUrl || ""] || item.imageUrl || ""} alt={item.title} className="h-full w-full object-cover" />
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
                {incomingDerivedFeatures.for_you_recommendations ? (
                  sharedRecommendations?.products?.length ? (
                    sharedRecommendations.products.slice(0, 3).map((product, index) => (
                      <div
                        key={`${product.brand || "brand"}-${product.name || index}`}
                        className="rounded-[22px] px-4 py-4"
                        style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.82)" }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(45,104,112,0.12)", color: "var(--swatch-teal)" }}>
                            <Sparkles className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-[19px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                              {product.name || "Recommendation"}
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                              {product.brand || "For You"}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                              {product.hook || product.why || "Shared from their latest For You recommendations."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    aiSuggestions.map((suggestion, index) => (
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
                    ))
                  )
                ) : (
                  <div
                    className="rounded-[22px] px-4 py-4"
                    style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.82)" }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      {connection.name} has not shared derived recommendations with you yet.
                    </p>
                  </div>
                )}
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
                    What you share with this connection
                  </p>
                  <h2 className="mt-1 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                    Control fields and cards directly.
                  </h2>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {editableProfileFields.map((field) => (
                  <div key={field.key} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--swatch-teal)" }}>{field.label}</p>
                      <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--swatch-text-light)" }}>
                        {field.description}
                      </p>
                    </div>
                    <Switch
                      checked={outgoingProfileFields[field.key]}
                      onCheckedChange={(checked) => handleToggleOutgoingProfileField(field.key, checked)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] px-4 py-4" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.8)" }}>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                  Derived features
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                  Share AI outputs like Your Vibe and recommendation results without sharing raw answers.
                </p>

                <div className="mt-4 space-y-4">
                  {editableDerivedFeatures.map((feature) => (
                    <div key={feature.key} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium" style={{ color: "var(--swatch-teal)" }}>{feature.label}</p>
                        <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--swatch-text-light)" }}>
                          {feature.description}
                        </p>
                      </div>
                      <Switch
                        checked={outgoingDerivedFeatures[feature.key]}
                        onCheckedChange={(checked) => handleToggleDerivedFeature(feature.key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[22px] px-4 py-4" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.8)" }}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                      Product cards
                    </p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      Share one card, a few cards, or everything with one click.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkShare("share")}
                      disabled={sharingBusy || myEntries.length === 0}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em] disabled:opacity-50"
                      style={{ fontFamily: "'Jost', sans-serif", color: "white", background: "var(--swatch-teal)" }}
                    >
                      Share all
                    </button>
                    <button
                      onClick={() => handleBulkShare("unshare")}
                      disabled={sharingBusy || sharedCardEntryIds.length === 0}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em] disabled:opacity-50"
                      style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.84)" }}
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
                    className="w-full rounded-[18px] border px-4 py-3 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.72)",
                      borderColor: "rgba(45,104,112,0.14)",
                      color: "var(--swatch-teal)",
                      fontFamily: "'Jost', sans-serif",
                    }}
                  />
                </label>

                <div className="mt-4 max-h-[340px] space-y-3 overflow-y-auto pr-1">
                  {filteredMyEntries.map((entry) => {
                    const isShared = sharedCardEntryIds.includes(entry.id);
                    return (
                      <div key={entry.id} className="flex items-start justify-between gap-4 rounded-[18px] px-4 py-3" style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.78)" }}>
                        <div className="min-w-0">
                          <p className="text-sm font-medium" style={{ color: "var(--swatch-teal)" }}>{entry.entry_name}</p>
                          <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--swatch-text-light)" }}>
                            {entry.group_name} · {entry.card_key?.split("__").pop() || "Product card"}
                          </p>
                        </div>
                        <Switch
                          checked={isShared}
                          onCheckedChange={(checked) => handleToggleCardShare(entry, checked)}
                        />
                      </div>
                    );
                  })}
                  {filteredMyEntries.length === 0 && (
                    <p className="text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      No product cards match this search yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 rounded-[22px] px-4 py-4" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.8)" }}>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                  Shared vibe
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                  {incomingDerivedFeatures.your_vibe && sharedVibe
                    ? sharedVibe
                    : `${connection.name} has not shared their vibe summary with you yet.`}
                </p>
              </div>

              <div className="mt-5 rounded-[22px] px-4 py-4" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.8)" }}>
                <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)" }}>
                  Live now
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                  {outgoingEnabled.length
                    ? `${connection.name} can currently see ${outgoingEnabled.map((field) => field.label.toLowerCase()).join(", ")}, ${outgoingDerivedEnabled.length} derived feature${outgoingDerivedEnabled.length === 1 ? "" : "s"}, and ${sharedCardEntryIds.length} shared product card${sharedCardEntryIds.length === 1 ? "" : "s"}.`
                    : sharedCardEntryIds.length || outgoingDerivedEnabled.length
                      ? `${connection.name} can currently see ${outgoingDerivedEnabled.length} derived feature${outgoingDerivedEnabled.length === 1 ? "" : "s"} and ${sharedCardEntryIds.length} shared product card${sharedCardEntryIds.length === 1 ? "" : "s"}.`
                      : `You have not shared any fields, derived features, or product cards with ${connection.name} yet.`}
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
                {incomingEnabled.length || incomingDerivedEnabled.length ? (
                  <>
                    {incomingEnabled.map((field) => (
                      <span
                        key={field.key}
                        className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.82)" }}
                      >
                        {field.label}
                      </span>
                    ))}
                    {incomingDerivedEnabled.map((feature) => (
                      <span
                        key={feature.key}
                        className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.82)" }}
                      >
                        {feature.label}
                      </span>
                    ))}
                  </>
                ) : (
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
