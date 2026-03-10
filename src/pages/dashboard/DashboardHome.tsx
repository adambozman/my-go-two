import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight, RefreshCw, ExternalLink } from "lucide-react";
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

/* ── Brand / store search URLs ── */
const storeSearchUrls: Record<string, string> = {
  nordstrom: "https://www.nordstrom.com",
  zara: "https://www.zara.com",
  uniqlo: "https://www.uniqlo.com",
  target: "https://www.target.com",
  sephora: "https://www.sephora.com",
  "h&m": "https://www.hm.com",
  hm: "https://www.hm.com",
  asos: "https://www.asos.com",
  madewell: "https://www.madewell.com",
  anthropologie: "https://www.anthropologie.com",
  amazon: "https://www.amazon.com",
};

function getStoreUrl(name: string): string {
  const key = name.toLowerCase().replace(/[^a-z0-9&]/g, "");
  for (const [k, url] of Object.entries(storeSearchUrls)) {
    if (key.includes(k.replace(/[^a-z0-9&]/g, "")) || k.replace(/[^a-z0-9&]/g, "").includes(key)) return url;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(name + " store")}`;
}

function getBrandUrl(name: string): string {
  const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://www.google.com/search?q=${encodeURIComponent(name + " shop")}`;
}

/* ── Brand logo via Clearbit ── */
const brandDomains: Record<string, string> = {
  nordstrom: "nordstrom.com", zara: "zara.com", uniqlo: "uniqlo.com",
  target: "target.com", sephora: "sephora.com", nike: "nike.com",
  lululemon: "lululemon.com", everlane: "everlane.com", patagonia: "patagonia.com",
  "common projects": "commonprojects.com", adidas: "adidas.com",
  "j.crew": "jcrew.com", gucci: "gucci.com", prada: "prada.com",
  "ralph lauren": "ralphlauren.com", "banana republic": "bananarepublic.com",
  hm: "hm.com", "h&m": "hm.com", asos: "asos.com", cos: "cosstores.com",
  madewell: "madewell.com", anthropologie: "anthropologie.com",
  "free people": "freepeople.com", reformation: "thereformation.com",
  aritzia: "aritzia.com", amazon: "amazon.com",
};

function getBrandLogoUrl(name: string): string {
  const key = name.toLowerCase().trim();
  const domain = brandDomains[key];
  if (domain) return `https://logo.clearbit.com/${domain}?size=80`;
  const sanitized = key.replace(/[^a-z0-9]/g, "");
  return `https://logo.clearbit.com/${sanitized}.com?size=80`;
}

/* ── Gift category images ── */
const giftImages: Record<string, string> = {
  "athletic apparel": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop&q=80",
  "high-quality basics": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=240&fit=crop&q=80",
  "smart home tech": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=240&fit=crop&q=80",
  "minimalist leather goods": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=240&fit=crop&q=80",
  "fitness trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=240&fit=crop&q=80",
  "ergonomic office": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=240&fit=crop&q=80",
  "tech gadgets": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=240&fit=crop&q=80",
  skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=240&fit=crop&q=80",
  experiences: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=240&fit=crop&q=80",
  clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=240&fit=crop&q=80",
  jewelry: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=240&fit=crop&q=80",
  fragrances: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=240&fit=crop&q=80",
  books: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=240&fit=crop&q=80",
  wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop&q=80",
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop&q=80",
];

function getImageFor(name: string, map: Record<string, string>, index: number): string {
  const key = name.toLowerCase();
  if (map[key]) return map[key];
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

/* ── Brand Logo Component (no DOM hacks) ── */
const BrandLogo = ({ name }: { name: string }) => {
  const [failed, setFailed] = useState(false);
  const logoUrl = getBrandLogoUrl(name);
  const initial = name.charAt(0).toUpperCase();

  if (failed) {
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(var(--swatch-gypsum-rose-rgb), 0.5)" }}
      >
        <span className="text-lg font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          {initial}
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
      style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
    >
      <img
        src={logoUrl}
        alt={name}
        className="w-8 h-8 object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
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

  const openExternal = (url: string) => window.open(url, "_blank", "noopener");

  const firstName = displayName?.split(" ")[0] || "there";
  const styles = profileAnswers?.["style-personality"] as string[] | undefined;
  const stores = personalization?.recommended_stores || [];
  const brands = personalization?.recommended_brands || [];
  const giftCats = personalization?.gift_categories || [];
  const allPicks = [
    ...stores.slice(0, 4).map((s) => ({ name: s, type: "store" as const })),
    ...brands.slice(0, 5).map((b) => ({ name: b, type: "brand" as const })),
  ];

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
                  onClick={() => openExternal(`https://www.google.com/search?q=${encodeURIComponent(style + " style inspiration")}&tbm=isch`)}
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

      {/* Picked for You — brand logos, clickable */}
      {allPicks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Picked for You
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {allPicks.map(({ name, type }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="card-design-neumorph overflow-hidden hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer group shrink-0 flex flex-col items-center justify-center text-center p-4"
                style={{ borderRadius: "1.2rem", width: 130, height: 130 }}
                onClick={() => openExternal(type === "store" ? getStoreUrl(name) : getBrandUrl(name))}
              >
                <BrandLogo name={name} />
                <p className="text-xs font-semibold text-primary truncate max-w-[110px] mt-3">{name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">{type}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gift Ideas — clickable */}
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
                  className="card-design-neumorph overflow-hidden shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer group"
                  style={{ borderRadius: "1.2rem", width: 180, height: 130 }}
                  onClick={() => openExternal(`https://www.google.com/search?q=${encodeURIComponent(cat + " gift ideas")}&tbm=shop`)}
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

      {/* Trending Feed — hero + varied grid */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center justify-between mb-4">
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
          <div className="space-y-4">
            <div className="card-design-neumorph animate-pulse" style={{ borderRadius: "1.2rem", height: 280 }} />
            <div className="grid grid-cols-2 gap-4">
              <div className="card-design-neumorph animate-pulse" style={{ borderRadius: "1.2rem", height: 200 }} />
              <div className="card-design-neumorph animate-pulse" style={{ borderRadius: "1.2rem", height: 200 }} />
            </div>
          </div>
        ) : feed.length > 0 ? (
          <div className="space-y-4">
            {/* Hero — first card, full-width */}
            {(() => {
              const card = feed[0];
              const label = categoryLabel[card.category] || "Lifestyle";
              const imgUrl = `https://images.unsplash.com/featured/?${encodeURIComponent(card.image_query)}&w=900&h=500&fit=crop&q=80`;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-design-neumorph overflow-hidden hover:scale-[1.005] active:scale-[0.998] transition-transform cursor-pointer group"
                  style={{ borderRadius: "1.4rem" }}
                  onClick={() => openExternal(`https://www.google.com/search?q=${encodeURIComponent(card.title)}`)}
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = fallbackImages[0]; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md"
                        style={{ background: "rgba(255,255,255,0.8)", color: "var(--swatch-viridian-odyssey)" }}
                      >
                        {label}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold mb-1.5 leading-snug drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-2 max-w-xl">{card.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                          {card.source_label}
                        </span>
                        <ExternalLink className="w-3 h-3 text-white/40" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Remaining — varied grid */}
            {feed.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feed.slice(1).map((card, i) => {
                  const label = categoryLabel[card.category] || "Lifestyle";
                  const isWide = i % 3 === 2;
                  const imgUrl = `https://images.unsplash.com/featured/?${encodeURIComponent(card.image_query)}&w=${isWide ? 900 : 500}&h=${isWide ? 400 : 300}&fit=crop&q=80`;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * (i + 1) }}
                      className={`card-design-neumorph overflow-hidden hover:scale-[1.01] active:scale-[0.99] transition-transform cursor-pointer group ${isWide ? "sm:col-span-2" : ""}`}
                      style={{ borderRadius: "1.2rem" }}
                      onClick={() => openExternal(`https://www.google.com/search?q=${encodeURIComponent(card.title)}`)}
                    >
                      <div className={`${isWide ? "h-48" : "h-36"} overflow-hidden relative`}>
                        <img
                          src={imgUrl}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImages[(i + 1) % fallbackImages.length]; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{card.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            {card.source_label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
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
