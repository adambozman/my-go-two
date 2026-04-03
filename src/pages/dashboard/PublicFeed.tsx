import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Heart, Loader2, MapPin, Sparkles, ThumbsUp, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

const shellCardStyle = {
  boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
} as const;

type PublicFeedCategory = "Outfit" | "Product";

interface PublicFeedRow {
  published_entity_id: string;
  entity_kind: "outfit" | "product";
  title: string;
  summary: string | null;
  lead_image_url: string | null;
  owner_user_id: string;
  creator_name: string | null;
  creator_tag: string | null;
  creator_avatar_url: string | null;
  published_at: string | null;
  card_count: number;
  like_count: number;
  love_count: number;
  viewer_liked: boolean;
  viewer_loved: boolean;
  viewer_follows: boolean;
}

interface PublicFeedItem {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorTag: string;
  title: string;
  summary: string;
  category: PublicFeedCategory;
  location: string;
  coverImage: string;
  parts: string[];
  likes: number;
  loves: number;
  isLiked: boolean;
  isLoved: boolean;
  isFollowing: boolean;
}

type RpcError = { message?: string; status?: number } | null;
type RpcResult<T> = { data: T | null; error: RpcError };

const rpc = supabase.rpc as unknown as <T>(
  fn: string,
  args?: Record<string, unknown>,
) => Promise<RpcResult<T>>;

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

function toViewItem(row: PublicFeedRow): PublicFeedItem {
  const category: PublicFeedCategory = row.entity_kind === "outfit" ? "Outfit" : "Product";
  const partCount = Math.max(Number(row.card_count || 0), 1);
  const parts = Array.from({ length: partCount }).map((_, index) => `Part ${index + 1}`);
  return {
    id: row.published_entity_id,
    creatorId: row.owner_user_id,
    creatorName: row.creator_name || "Creator",
    creatorTag: row.creator_tag || "@creator",
    title: row.title,
    summary: row.summary || "Published from Go Two.",
    category,
    location: "Public",
    coverImage: row.lead_image_url || "",
    parts,
    likes: Number(row.like_count || 0),
    loves: Number(row.love_count || 0),
    isLiked: Boolean(row.viewer_liked),
    isLoved: Boolean(row.viewer_loved),
    isFollowing: Boolean(row.viewer_follows),
  };
}

export default function PublicFeed() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [filter, setFilter] = useState<"All" | PublicFeedCategory>("All");
  const [loading, setLoading] = useState(true);
  const [actionBusyKey, setActionBusyKey] = useState<string | null>(null);
  const [items, setItems] = useState<PublicFeedItem[]>([]);

  const visibleItems = filter === "All" ? items : items.filter((item) => item.category === filter);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    try {
      const entityKindFilter = filter === "All" ? null : filter.toLowerCase();
      const { data, error } = await rpc<PublicFeedRow[]>("get_public_feed_items", {
        p_limit: 40,
        p_entity_kind: entityKindFilter,
        p_creator_user_id: null,
      });

      if (error) throw error;
      const rows = Array.isArray(data) ? (data as PublicFeedRow[]) : [];
      setItems(rows.map(toViewItem));
    } catch (error: unknown) {
      toast({
        title: "Public feed unavailable",
        description: getErrorMessage(error),
        variant: "destructive",
      });
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter, toast]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const toggleFollow = async (creatorId: string, isFollowing: boolean) => {
    if (!user) return;
    setActionBusyKey(`follow:${creatorId}`);
    try {
      if (isFollowing) {
        await rpc("unfollow_public_creator", {
          p_creator_user_id: creatorId,
        });
      } else {
        await rpc("follow_public_creator", {
          p_creator_user_id: creatorId,
        });
      }
      await loadFeed();
    } catch (error: unknown) {
      toast({
        title: "Follow update failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setActionBusyKey(null);
    }
  };

  const toggleReaction = async (itemId: string, reaction: "like" | "love") => {
    if (!user) return;
    setActionBusyKey(`reaction:${itemId}:${reaction}`);
    try {
      const { error } = await rpc("toggle_public_entity_reaction", {
        p_published_entity_id: itemId,
        p_reaction_type: reaction,
      });
      if (error) throw error;
      await loadFeed();
    } catch (error: unknown) {
      toast({
        title: "Reaction failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setActionBusyKey(null);
    }
  };

  return (
    <div className="mx-auto max-w-[1480px] px-3 pb-8 pt-3 sm:px-4 md:px-6">
      <section
        className="overflow-hidden rounded-[30px] p-5 md:p-6"
        style={{
          ...shellCardStyle,
          background: "linear-gradient(165deg, rgba(255,255,255,0.78) 0%, rgba(245,233,220,0.58) 100%)",
          border: "1px solid rgba(255,255,255,0.86)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.82)" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back home
            </button>
            <p className="mt-4 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
              Public Feed
            </p>
            <h1 className="mt-2 text-[32px] leading-none sm:text-[36px] md:text-[44px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
              Public looks and popular picks.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
              This is discovery, not messaging. Follow creators for style, browse public outfits and bundles, and react with a like or love when something feels worth saving.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", "Outfit", "Product"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  color: filter === option ? "var(--swatch-paper)" : "var(--swatch-teal)",
                  background: filter === option ? "var(--swatch-teal)" : "rgba(255,255,255,0.62)",
                  border: "1px solid rgba(255,255,255,0.84)",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 flex items-center justify-center py-12">
            <Loader2 className="h-7 w-7 animate-spin" style={{ color: "var(--swatch-teal)" }} />
          </div>
        ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[28px] border p-3 md:p-4"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(248,240,230,0.72) 100%)",
                borderColor: "rgba(255,255,255,0.84)",
              }}
            >
              <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="overflow-hidden rounded-[22px]">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt={item.title} className="h-full min-h-[220px] w-full object-cover" />
                  ) : (
                    <div className="flex min-h-[220px] items-center justify-center bg-white/50 text-xs uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-text-light)" }}>
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                        {item.category}
                      </p>
                      <h2 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                        {item.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => toggleFollow(item.creatorId, item.isFollowing)}
                      disabled={actionBusyKey === `follow:${item.creatorId}`}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color: item.isFollowing ? "var(--swatch-paper)" : "var(--swatch-teal)",
                        background: item.isFollowing ? "var(--swatch-cedar-grove)" : "rgba(255,255,255,0.68)",
                        border: "1px solid rgba(255,255,255,0.82)",
                      }}
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      {item.isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-text-light)" }}>
                    <span>{item.creatorName}</span>
                    <span>{item.creatorTag}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                    {item.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.parts.map((part) => (
                      <span
                        key={part}
                        className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.66)", border: "1px solid rgba(255,255,255,0.82)" }}
                      >
                        {part}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => toggleReaction(item.id, "like")}
                      disabled={actionBusyKey === `reaction:${item.id}:like`}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color: item.isLiked ? "var(--swatch-paper)" : "var(--swatch-teal)",
                        background: item.isLiked ? "var(--swatch-teal)" : "rgba(255,255,255,0.68)",
                        border: "1px solid rgba(255,255,255,0.82)",
                      }}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {item.likes}
                    </button>

                    <button
                      onClick={() => toggleReaction(item.id, "love")}
                      disabled={actionBusyKey === `reaction:${item.id}:love`}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        color: item.isLoved ? "var(--swatch-paper)" : "var(--swatch-cedar-grove)",
                        background: item.isLoved ? "var(--swatch-cedar-grove)" : "rgba(255,255,255,0.68)",
                        border: "1px solid rgba(255,255,255,0.82)",
                      }}
                    >
                      <Heart className="h-3.5 w-3.5" />
                      {item.loves}
                    </button>

                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-antique-coin)", background: "rgba(255,255,255,0.58)", border: "1px solid rgba(255,255,255,0.78)" }}>
                      <Sparkles className="h-3.5 w-3.5" />
                      Public card
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

        {!loading && !visibleItems.length && (
          <div className="mt-6 rounded-[24px] border px-5 py-6" style={{ background: "rgba(255,255,255,0.58)", borderColor: "rgba(255,255,255,0.82)" }}>
            <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
              Public Feed
            </p>
            <p className="mt-2 text-[24px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
              This page is ready for real public content.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
              Published outfits, public bundles, trending cards, popular picks near you, followable creators, and lightweight reactions will live here. Nothing is being faked into the feed while the real data model catches up.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
