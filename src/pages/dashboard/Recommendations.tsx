import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { Sparkles, ShoppingBag, Gift, Heart, TrendingUp, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface FeedCard {
  title: string;
  description: string;
  category: "trending_style" | "store_pick" | "gift_idea" | "lifestyle";
  image_query: string;
  source_label: string;
}

const categoryMeta: Record<string, { icon: typeof Sparkles; label: string; color: string }> = {
  trending_style: { icon: TrendingUp, label: "Trending", color: "var(--swatch-terracotta)" },
  store_pick: { icon: ShoppingBag, label: "Store Pick", color: "var(--swatch-teal)" },
  gift_idea: { icon: Gift, label: "Gift Idea", color: "var(--swatch-rose)" },
  lifestyle: { icon: Heart, label: "Lifestyle", color: "var(--swatch-olive)" },
};

const Recommendations = () => {
  const { personalization, loading: personalizationLoading } = usePersonalization();
  const [feed, setFeed] = useState<FeedCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("trending-feed");
      if (error) throw error;
      if (data?.feed) {
        setFeed(data.feed);
      }
    } catch (e: any) {
      console.error("Feed error:", e);
      if (e?.message?.includes("429") || e?.status === 429) {
        toast.error("Rate limit reached. Please try again in a moment.");
      } else if (e?.message?.includes("402") || e?.status === 402) {
        toast.error("AI credits exhausted. Please add funds.");
      } else {
        toast.error("Failed to load recommendations");
      }
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    if (!personalizationLoading && personalization && !hasLoaded) {
      fetchFeed();
    }
  }, [personalizationLoading, personalization]);

  if (personalizationLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!personalization) {
    return (
      <div className="space-y-4 text-center py-12">
        <Sparkles className="h-10 w-10 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">Complete your profile preferences to get personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">For You</h1>
        <button
          onClick={fetchFeed}
          disabled={loading}
          className="p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading && feed.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-design-neumorph rounded-2xl overflow-hidden animate-pulse">
              <div className="h-40 bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : feed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {feed.map((card, i) => {
            const meta = categoryMeta[card.category] || categoryMeta.lifestyle;
            const Icon = meta.icon;
            return (
              <div
                key={i}
                className="card-design-neumorph rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/600x400/?${encodeURIComponent(card.image_query)}`}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-3 left-3 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    <Icon className="h-3 w-3" />
                    {meta.label}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-semibold text-sm text-foreground leading-tight">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium pt-1">{card.source_label}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : hasLoaded ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No recommendations yet. Tap refresh to generate.</p>
        </div>
      ) : null}
    </div>
  );
};

export default Recommendations;
