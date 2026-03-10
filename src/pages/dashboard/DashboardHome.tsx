import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight, RefreshCw } from "lucide-react";
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

const categoryLabel: Record<string, string> = {
  trending_style: "Trending",
  store_pick: "For You",
  gift_idea: "Gift Ideas",
  lifestyle: "Lifestyle",
};

// Curated Unsplash images for stores/brands/gifts
const storeImages: Record<string, string> = {
  nordstrom: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=80",
  zara: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop&q=80",
  uniqlo: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop&q=80",
  target: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=300&fit=crop&q=80",
  sephora: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&q=80",
};

const brandImages: Record<string, string> = {
  nike: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&q=80",
  lululemon: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
  everlane: "https://images.unsplash.com/photo-1434389677669-e08b4cda3b00?w=400&h=300&fit=crop&q=80",
  patagonia: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&q=80",
  "common projects": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop&q=80",
};

const giftImages: Record<string, string> = {
  "athletic apparel": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop&q=80",
  "high-quality basics": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=240&fit=crop&q=80",
  "smart home tech": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=240&fit=crop&q=80",
  "minimalist leather goods": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=240&fit=crop&q=80",
  "fitness trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=240&fit=crop&q=80",
  "ergonomic office": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=240&fit=crop&q=80",
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop&q=80",
];

function getImageFor(name: string, map: Record<string, string>, index: number): string {
  const key = name.toLowerCase();
  if (map[key]) return map[key];
  // Partial match
  for (const k of Object.keys(map)) {
    if (key.includes(k) || k.includes(key)) return map[k];
  }
  return fallbackImages[index % fallbackImages.length];
}

const styleImages: Record<string, string> = {
  classic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&q=80",
  "laid-back": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=200&fit=crop&q=80",
  minimal: "https://images.unsplash.com/photo-1434389677669-e08b4cda3b00?w=300&h=200&fit=crop&q=80",
  trendy: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop&q=80",
  edgy: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop&q=80",
  luxury: "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=300&h=200&fit=crop&q=80",
  sporty: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop&q=80",
  boho: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop&q=80",
};

const DashboardHome = () => {
  const { user } = useAuth();
  const { personalization, profileAnswers, loading: persLoading } = usePersonalization();
  const [displayName, setDisplayName] = useState("");
  const [feed, setFeed] = useState<FeedCard[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const fetchFeed = useCallback(async () => {
    if (!user || !personalization) return;
    setFeedLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("trending-feed");
      if (!error && data?.feed) setFeed(data.feed);
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
    <div className="max-w-5xl space-y-8">
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

      {/* Your Style */}
      {styles && styles.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Style
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {styles.map((style, i) => {
              const img = styleImages[style.toLowerCase()] || fallbackImages[i % fallbackImages.length];
              return (
                <motion.div
                  key={style}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="card-design-neumorph overflow-hidden shrink-0 group cursor-pointer"
                  style={{ borderRadius: "1.2rem", width: 160, height: 100 }}
                >
                  <div className="relative w-full h-full">
                    <img src={img} alt={style} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <p className="absolute bottom-2.5 left-3 text-white text-sm font-semibold capitalize drop-shadow-md">{style}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Picked for You — stores & brands with images */}
      {(stores.length > 0 || brands.length > 0) && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Picked for You
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...stores.slice(0, 4), ...brands.slice(0, 4)].map((name, i) => {
              const isStore = i < Math.min(stores.length, 4);
              const img = isStore
                ? getImageFor(name, storeImages, i)
                : getImageFor(name, brandImages, i);
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="card-design-neumorph overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer group"
                  style={{ borderRadius: "1.2rem" }}
                >
                  <div className="relative h-28 overflow-hidden">
                    <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-primary truncate">{name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{isStore ? "Recommended store" : "Your brand"}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Gift Ideas */}
      {giftCats.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gift Ideas You'd Love
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {giftCats.map((cat, i) => {
              const img = getImageFor(cat, giftImages, i);
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.04 * i }}
                  className="card-design-neumorph overflow-hidden shrink-0 hover:scale-[1.02] transition-transform cursor-pointer group"
                  style={{ borderRadius: "1.2rem", width: 180, height: 130 }}
                >
                  <div className="relative w-full h-full">
                    <img src={img} alt={cat} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold capitalize drop-shadow-md leading-tight">{cat}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Trending Feed */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
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
              const label = categoryLabel[card.category] || "Lifestyle";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="card-design-neumorph overflow-hidden hover:scale-[1.01] transition-transform cursor-pointer group"
                  style={{ borderRadius: "1.2rem" }}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={`https://images.unsplash.com/photo-${card.image_query}?w=500&h=300&fit=crop&q=80`}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImages[i % fallbackImages.length];
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                        style={{ background: "rgba(255,255,255,0.75)", color: "var(--swatch-viridian-odyssey)" }}
                      >
                        {label}
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
