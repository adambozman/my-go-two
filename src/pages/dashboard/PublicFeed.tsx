import { useMemo, useState } from "react";
import { ArrowLeft, Heart, MapPin, Sparkles, Star, ThumbsUp, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getPublicFeedViewItems,
  togglePublicFeedFollow,
  togglePublicFeedReaction,
  type PublicFeedCategory,
} from "@/data/publicFeed";

const shellCardStyle = {
  boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
} as const;

export default function PublicFeed() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"All" | PublicFeedCategory>("All");
  const [refreshKey, setRefreshKey] = useState(0);

  const items = useMemo(() => getPublicFeedViewItems(), [refreshKey]);
  const visibleItems = filter === "All" ? items : items.filter((item) => item.category === filter);

  const refresh = () => setRefreshKey((value) => value + 1);

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
            <h1 className="mt-2 text-[36px] leading-none md:text-[44px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
              Public looks and popular picks.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
              This is discovery, not messaging. Follow creators for style, browse public outfits and bundles, and react with a like or love when something feels worth saving.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", "Outfit", "Bundle", "Popular Near You"] as const).map((option) => (
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
                  <img src={item.coverImage} alt={item.title} className="h-full min-h-[220px] w-full object-cover" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
                        {item.category}
                      </p>
                      <h2 className="mt-2 text-[28px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
                        {item.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => {
                        togglePublicFeedFollow(item.creatorId);
                        refresh();
                      }}
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
                      onClick={() => {
                        togglePublicFeedReaction(item.id, "like");
                        refresh();
                      }}
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
                      onClick={() => {
                        togglePublicFeedReaction(item.id, "love");
                        refresh();
                      }}
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

        {!visibleItems.length && (
          <div className="mt-6 rounded-[24px] border px-5 py-6" style={{ background: "rgba(255,255,255,0.58)", borderColor: "rgba(255,255,255,0.82)" }}>
            <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
              Public Feed
            </p>
            <p className="mt-2 text-[24px] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
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
