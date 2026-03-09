import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Store, Gift, Compass, ChevronRight, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import GoTwoText from "@/components/GoTwoText";
import { Button } from "@/components/ui/button";

interface FeedCard {
  title: string;
  description: string;
  category: "trending_style" | "store_pick" | "gift_idea" | "lifestyle";
  image_query: string;
  source_label: string;
}

const categoryMeta: Record<string, { icon: typeof TrendingUp; label: string; accent: string }> = {
  trending_style: { icon: TrendingUp, label: "Trending", accent: "var(--swatch-cedar-grove)" },
  store_pick: { icon: Store, label: "For You", accent: "var(--swatch-viridian-odyssey)" },
  gift_idea: { icon: Gift, label: "Gift Ideas", accent: "var(--swatch-cedar-grove)" },
  lifestyle: { icon: Compass, label: "Lifestyle", accent: "var(--swatch-viridian-odyssey)" },
};

const DashboardHome = () => {
  const { user } = useAuth();
  const { personalization, profileAnswers, loading: persLoading } = usePersonalization();
  const [displayName, setDisplayName] = useState("");
  const [feed, setFeed] = useState<FeedCard[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch profile
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? "");
        setLoading(false);
      });
  }, [user]);

  // Fetch trending feed
  const fetchFeed = useCallback(async () => {
    if (!user || !personalization) return;
    setFeedLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("trending-feed");
      if (!error && data?.feed) {
        setFeed(data.feed);
      }
    } catch (e) {
      console.error("Feed fetch error:", e);
    } finally {
      setFeedLoading(false);
    }
  }, [user, personalization]);

  useEffect(() => {
    if (personalization && !feed.length) fetchFeed();
  }, [personalization]);

  const firstName = displayName?.split(" ")[0] || "there";
  const styles = profileAnswers?.["style-personality"] as string[] | undefined;
  const stores = personalization?.recommended_stores || [];
  const brands = personalization?.recommended_brands || [];
  const giftCats = personalization?.gift_categories || [];

  return (
    <div className="max-w-5xl space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-design-neumorph panel-polish p-8"
      >
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Hey, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Your <GoTwoText className="text-base" /> dashboard — curated just for you.
        </p>
      </motion.div>

      {/* Your Style DNA */}
      {styles && styles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Style
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {styles.map((style, i) => (
              <motion.div
                key={style}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                className="card-design-neumorph px-5 py-3 shrink-0"
                style={{ borderRadius: "1rem" }}
              >
                <p className="text-sm font-semibold text-primary capitalize whitespace-nowrap">{style}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommended Stores & Brands */}
      {(stores.length > 0 || brands.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Picked for You
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {stores.slice(0, 4).map((store, i) => (
              <motion.div
                key={store}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="card-design-neumorph p-4 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ borderRadius: "1.2rem" }}
              >
                <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center"
                  style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.5)" }}>
                  <Store className="w-5 h-5" style={{ color: "var(--swatch-viridian-odyssey)" }} />
                </div>
                <p className="text-sm font-semibold text-primary">{store}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Recommended store</p>
              </motion.div>
            ))}
            {brands.slice(0, 4).map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (i + 4) }}
                className="card-design-neumorph p-4 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ borderRadius: "1.2rem" }}
              >
                <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center"
                  style={{ background: "rgba(var(--swatch-cedar-grove-rgb), 0.15)" }}>
                  <TrendingUp className="w-5 h-5" style={{ color: "var(--swatch-cedar-grove)" }} />
                </div>
                <p className="text-sm font-semibold text-primary">{brand}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Your brand</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gift Categories */}
      {giftCats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gift Ideas You'd Love
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {giftCats.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.04 * i }}
                className="card-design-neumorph px-5 py-4 shrink-0 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{ borderRadius: "1.2rem" }}
              >
                <Gift className="w-5 h-5 mb-2" style={{ color: "var(--swatch-cedar-grove)" }} />
                <p className="text-sm font-semibold text-primary capitalize whitespace-nowrap">{cat}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trending Feed */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trending for You
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchFeed}
            disabled={feedLoading}
            className="text-muted-foreground text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${feedLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {feedLoading && !feed.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-design-neumorph p-4 animate-pulse" style={{ borderRadius: "1.2rem" }}>
                <div className="h-36 rounded-xl mb-3" style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.4)" }} />
                <div className="h-4 rounded w-3/4 mb-2" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.3)" }} />
                <div className="h-3 rounded w-full" style={{ background: "rgba(var(--swatch-antique-coin-rgb), 0.2)" }} />
              </div>
            ))}
          </div>
        ) : feed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feed.map((card, i) => {
              const meta = categoryMeta[card.category] || categoryMeta.lifestyle;
              const Icon = meta.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="card-design-neumorph overflow-hidden hover:scale-[1.01] transition-transform cursor-pointer group"
                  style={{ borderRadius: "1.2rem" }}
                >
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src={`https://images.unsplash.com/photo-${card.image_query}?w=500&h=300&fit=crop&q=80`}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to search-based URL
                        (e.target as HTMLImageElement).src = `https://source.unsplash.com/500x300/?${encodeURIComponent(card.image_query)}`;
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                        style={{
                          background: "rgba(255,255,255,0.75)",
                          color: meta.accent,
                        }}
                      >
                        <Icon className="w-3 h-3 inline mr-1" style={{ verticalAlign: "-1px" }} />
                        {meta.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-primary mb-1 leading-snug">{card.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{card.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        {card.source_label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : !persLoading && !personalization ? (
          <div className="card-design-neumorph p-8 text-center" style={{ borderRadius: "1.2rem" }}>
            <p className="text-muted-foreground text-sm">
              Complete your profile to get personalized recommendations.
            </p>
            <Button className="mt-4 rounded-full" onClick={() => window.location.href = "/onboarding"}>
              Set Up Profile
            </Button>
          </div>
        ) : null}
      </motion.div>

      {/* Persona Summary */}
      {personalization?.persona_summary && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-design-neumorph p-6"
          style={{ borderRadius: "1.2rem" }}
        >
          <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">Your Persona</p>
          <p className="text-sm text-primary leading-relaxed italic">"{personalization.persona_summary}"</p>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;
