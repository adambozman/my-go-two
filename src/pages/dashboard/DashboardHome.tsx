import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/* ── Store URLs ── */
const storeDomains: Record<string, string> = {
  nordstrom: "https://www.nordstrom.com", zara: "https://www.zara.com",
  uniqlo: "https://www.uniqlo.com", target: "https://www.target.com",
  sephora: "https://www.sephora.com", "h&m": "https://www2.hm.com",
  hm: "https://www2.hm.com", asos: "https://www.asos.com",
  madewell: "https://www.madewell.com", anthropologie: "https://www.anthropologie.com",
  amazon: "https://www.amazon.com", everlane: "https://www.everlane.com",
  lululemon: "https://www.lululemon.com", nike: "https://www.nike.com",
  adidas: "https://www.adidas.com", "common projects": "https://www.commonprojects.com",
  "banana republic": "https://www.bananarepublic.com", "j.crew": "https://www.jcrew.com",
  reformation: "https://www.thereformation.com", aritzia: "https://www.aritzia.com",
  cos: "https://www.cos.com", "free people": "https://www.freepeople.com",
};

function getStoreDomain(name: string): string {
  const key = name.toLowerCase().replace(/\s*(men|women|men's|women's)\s*/gi, "").trim();
  if (storeDomains[key]) return storeDomains[key];
  for (const [k, url] of Object.entries(storeDomains)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return `https://www.${key.replace(/[^a-z0-9]/g, "")}.com`;
}

/* ── Brand logo via Clearbit ── */
const brandDomainMap: Record<string, string> = {
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
  const key = name.toLowerCase().replace(/\s*(men|women|men's|women's)\s*/gi, "").trim();
  const domain = brandDomainMap[key];
  if (domain) return `https://logo.clearbit.com/${domain}?size=80`;
  return `https://logo.clearbit.com/${key.replace(/[^a-z0-9]/g, "")}.com?size=80`;
}

/* ── Store hero imagery ── */
const storeImages: Record<string, string> = {
  nordstrom: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop&q=80",
  everlane: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=300&fit=crop&q=80",
  lululemon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop&q=80",
  uniqlo: "https://images.unsplash.com/photo-1434389677669-e08b4cda3b00?w=600&h=300&fit=crop&q=80",
  nike: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=300&fit=crop&q=80",
  adidas: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=300&fit=crop&q=80",
  "common projects": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=300&fit=crop&q=80",
  sephora: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=300&fit=crop&q=80",
  zara: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop&q=80",
  target: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=300&fit=crop&q=80",
};

const fallbackStoreImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=600&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=300&fit=crop&q=80",
];

function getStoreImage(name: string, i: number): string {
  const key = name.toLowerCase().replace(/\s*(men|women|men's|women's)\s*/gi, "").trim();
  if (storeImages[key]) return storeImages[key];
  for (const [k, url] of Object.entries(storeImages)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return fallbackStoreImages[i % fallbackStoreImages.length];
}

/* ── Gift category images ── */
const giftImages: Record<string, string> = {
  "athletic apparel": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80",
  "high-quality basics": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop&q=80",
  "smart home tech": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop&q=80",
  "minimalist leather goods": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop&q=80",
  "fitness trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop&q=80",
  "ergonomic office accessories": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop&q=80",
  skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop&q=80",
  jewelry: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&q=80",
  fragrances: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&q=80",
  clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&q=80",
  wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&q=80",
};

const fallbackGiftImages = [
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop&q=80",
];

function getGiftImage(name: string, i: number): string {
  const key = name.toLowerCase();
  if (giftImages[key]) return giftImages[key];
  for (const [k, url] of Object.entries(giftImages)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return fallbackGiftImages[i % fallbackGiftImages.length];
}

/* ── Quick action images ── */
const quickActionImages: Record<string, string> = {
  "Buy a Gift": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=300&fit=crop&q=80",
  "Check Sizes": "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop&q=80",
  "Saved Items": "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?w=400&h=300&fit=crop&q=80",
  "Plan a Date": "https://images.unsplash.com/photo-1529903384028-929ae5deeae3?w=400&h=300&fit=crop&q=80",
  "Restock Basics": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop&q=80",
  "Wish List": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop&q=80",
};

/* ── Brand Logo with fallback ── */
const BrandLogo = ({ name, size = 32 }: { name: string; size?: number }) => {
  const [failed, setFailed] = useState(false);
  const logoUrl = getBrandLogoUrl(name);
  const initial = name.charAt(0).toUpperCase();

  if (failed) {
    return (
      <div
        className="rounded-full flex items-center justify-center bg-secondary"
        style={{ width: size + 8, height: size + 8 }}
      >
        <span className="font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif", fontSize: size * 0.45 }}>
          {initial}
        </span>
      </div>
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden"
      style={{ width: size + 8, height: size + 8, background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}
    >
      <img src={logoUrl} alt={name} style={{ width: size, height: size }} className="object-contain" loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
};

/* ── Price tier labels ── */
const priceTierLabels: Record<string, string> = {
  budget: "Under $50", "mid-range": "$50–$150", premium: "$150–$300", luxury: "$300+",
};

interface PartnerData {
  displayName: string;
  styles: string[];
  stores: string[];
  brands: string[];
  giftCategories: string[];
  priceTier: string;
  persona: string;
}

const DashboardHome = () => {
  const { user } = useAuth();
  const { personalization, profileAnswers, loading: persLoading } = usePersonalization();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [hasPartner, setHasPartner] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase.from("profiles").select("display_name").eq("user_id", user.id).single()
      .then(({ data }) => { setDisplayName(data?.display_name ?? ""); setLoading(false); });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchPartner = async () => {
      const { data: couples } = await supabase.from("couples").select("*")
        .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`).eq("status", "accepted");
      if (!couples || couples.length === 0) { setHasPartner(false); return; }
      const couple = couples[0];
      const partnerId = couple.inviter_id === user.id ? couple.invitee_id : couple.inviter_id;
      if (!partnerId) { setHasPartner(false); return; }

      const [profileRes, prefsRes] = await Promise.all([
        supabase.from("profiles").select("display_name, gender").eq("user_id", partnerId).single(),
        supabase.from("user_preferences").select("profile_answers, ai_personalization").eq("user_id", partnerId).single(),
      ]);
      const profile = profileRes.data;
      const aiData = prefsRes.data?.ai_personalization as any;
      const clean = (v: unknown): unknown => {
        if (typeof v === "string") return v.replace(/[^\x20-\x7E\n\r\t]/g, "").replace(/,\s*$/, "").trim();
        if (Array.isArray(v)) return v.map(clean).filter(Boolean);
        return v;
      };
      setPartner({
        displayName: profile?.display_name || "Your Partner",
        styles: (clean(aiData?.style_keywords) as string[]) || [],
        stores: (clean(aiData?.recommended_stores) as string[]) || [],
        brands: (clean(aiData?.recommended_brands) as string[]) || [],
        giftCategories: (clean(aiData?.gift_categories) as string[]) || [],
        priceTier: (clean(aiData?.price_tier) as string) || "",
        persona: (clean(aiData?.persona_summary) as string) || "",
      });
      setHasPartner(true);
    };
    fetchPartner();
  }, [user]);

  const firstName = displayName?.split(" ")[0] || "there";
  const partnerFirstName = partner?.displayName?.split(" ")[0] || "Partner";
  const showData = partner || (personalization ? {
    displayName: displayName || "You",
    styles: personalization.style_keywords || [],
    stores: personalization.recommended_stores || [],
    brands: personalization.recommended_brands || [],
    giftCategories: personalization.gift_categories || [],
    priceTier: personalization.price_tier || "",
    persona: personalization.persona_summary || "",
  } : null);
  const showDataName = hasPartner ? partnerFirstName : firstName;
  const allStoresAndBrands = showData ? [...showData.stores, ...showData.brands] : [];

  return (
    <div className="max-w-3xl space-y-8">
      {/* ─── Greeting ─── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
          Hey, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {hasPartner
            ? `Here's everything you need to shop for ${partnerFirstName}.`
            : "Connect with your partner to unlock shopping for them."
          }
        </p>
      </motion.div>

      {/* ─── No Partner CTA ─── */}
      {hasPartner === false && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="card-design-neumorph overflow-hidden"
          style={{ borderRadius: "1.2rem" }}
        >
          <div
            className="relative h-40 overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <UserPlus className="w-16 h-16 text-primary-foreground opacity-20" />
            </div>
          </div>
          <div className="p-5 text-center">
            <h2 className="text-lg font-bold text-primary mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Connect Your Partner
            </h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              Once they join, you'll see their style, sizes, and preferences — so you never miss.
            </p>
            <Button className="rounded-full" onClick={() => navigate("/dashboard/collaborations")}>
              Invite Partner
            </Button>
          </div>
        </motion.div>
      )}

      {/* ─── Partner Snapshot ─── */}
      {showData && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="card-design-neumorph overflow-hidden"
          style={{ borderRadius: "1.2rem" }}
        >
          {/* Header with gradient */}
          <div className="p-5 pb-4" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                  {hasPartner ? "Partner Snapshot" : "Your Profile"}
                </p>
                <h2 className="text-xl font-bold text-primary mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {showData.displayName}
                </h2>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground"
                onClick={() => navigate(hasPartner ? "/dashboard/shared-lists" : "/dashboard/my-gotwo")}>
                Full Profile <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Style tags */}
            {showData.styles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {showData.styles.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Brand logos row */}
          {allStoresAndBrands.length > 0 && (
            <div className="px-5 py-4 border-t border-border/30">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">Shops At</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allStoresAndBrands.slice(0, 6).map((name) => (
                  <a
                    key={name}
                    href={getStoreDomain(name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 shrink-0 hover:scale-105 active:scale-95 transition-transform"
                    style={{ width: 64 }}
                  >
                    <BrandLogo name={name} size={28} />
                    <span className="text-[10px] text-primary font-medium text-center leading-tight truncate w-full">{name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Price zone */}
          {showData.priceTier && (
            <div className="px-5 py-3 border-t border-border/30 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Price Zone</p>
              <p className="text-sm text-primary font-bold">{priceTierLabels[showData.priceTier] || showData.priceTier}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── Quick Actions — Photo cards ─── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Buy a Gift", desc: "Find something they'll love", route: "/dashboard/templates" },
            { label: "Check Sizes", desc: "Their exact measurements", route: "/dashboard/my-gotwo" },
            { label: "Saved Items", desc: "Things they've mentioned", route: "/dashboard/my-lists" },
            { label: "Plan a Date", desc: "Ideas they'd enjoy", route: "/dashboard/templates" },
            { label: "Restock Basics", desc: "Their everyday essentials", route: "/dashboard/my-lists" },
            { label: "Wish List", desc: "What they actually want", route: "/dashboard/shared-lists" },
          ].map(({ label, desc, route }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.14 + i * 0.03 }}
              onClick={() => navigate(route)}
              className="card-design-neumorph overflow-hidden text-left hover:scale-[1.02] active:scale-[0.97] transition-transform group"
              style={{ borderRadius: "1rem" }}
            >
              <div className="relative h-20 overflow-hidden">
                <img
                  src={quickActionImages[label]}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {label}
                </p>
              </div>
              <div className="px-3 py-2.5">
                <p className="text-[11px] text-muted-foreground leading-snug">{desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── Safe Picks — Store cards with hero images + logos ─── */}
      {showData && allStoresAndBrands.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">
            Safe Picks — Guaranteed {showDataName} Says Yes
          </p>
          <div className="space-y-3">
            {allStoresAndBrands.slice(0, 5).map((store, i) => {
              const url = getStoreDomain(store);
              const img = getStoreImage(store, i);
              return (
                <motion.a
                  key={store}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.04 }}
                  className="card-design-neumorph overflow-hidden flex hover:scale-[1.01] active:scale-[0.99] transition-transform group block"
                  style={{ borderRadius: "1rem", height: 100 }}
                >
                  {/* Image side */}
                  <div className="w-28 sm:w-36 shrink-0 overflow-hidden relative">
                    <img src={img} alt={store} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  </div>
                  {/* Content side */}
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BrandLogo name={store} size={24} />
                      <div>
                        <p className="text-sm font-bold text-primary">{store}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {showData.styles.length > 0
                            ? `${showData.styles[0]} styles · ${priceTierLabels[showData.priceTier] || "Their range"}`
                            : "Their favorite store"
                          }
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Gift Categories — Photo grid ─── */}
      {showData && showData.giftCategories.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">
            What to Get {showDataName}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {showData.giftCategories.map((cat, i) => {
              const img = getGiftImage(cat, i);
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="card-design-neumorph overflow-hidden shrink-0 cursor-default"
                  style={{ borderRadius: "1rem", width: 150, height: 110 }}
                >
                  <div className="relative w-full h-full">
                    <img src={img} alt={cat} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <p className="absolute bottom-2.5 left-3 right-2 text-white text-xs font-semibold capitalize drop-shadow-md leading-tight">
                      {cat}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Persona ─── */}
      {showData?.persona && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
          className="card-design-neumorph p-5"
          style={{ borderRadius: "1.2rem" }}
        >
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            {hasPartner ? `Who ${partnerFirstName} Is` : "Your Persona"}
          </p>
          <p className="text-sm text-primary leading-relaxed italic">"{showData.persona}"</p>
        </motion.div>
      )}

      {/* ─── Not onboarded ─── */}
      {!persLoading && !personalization && !loading && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="card-design-neumorph p-6 text-center" style={{ borderRadius: "1rem" }}>
          <p className="text-sm text-muted-foreground mb-3">
            Complete your profile so your partner knows exactly what you love.
          </p>
          <Button className="rounded-full" onClick={() => navigate("/onboarding")}>Set Up Profile</Button>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;
