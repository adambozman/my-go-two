import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight, UserPlus, CalendarHeart, AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SnapScrollLayout from "@/components/SnapScrollLayout";

import quickSizesImg from "@/assets/dashboard/quick-their-sizes.jpg";
import quickSavedImg from "@/assets/dashboard/quick-saved-items.jpg";
import quickBrandsImg from "@/assets/dashboard/quick-their-brands.jpg";
import quickGiftImg from "@/assets/dashboard/quick-gift-ideas.jpg";

/* ═══════════════════════════════════════════
   STORE / BRAND DATA
   ═══════════════════════════════════════════ */

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

const storeSearchUrls: Record<string, string> = {
  nordstrom: "https://www.nordstrom.com/sr?keyword=",
  zara: "https://www.zara.com/us/en/search?searchTerm=",
  uniqlo: "https://www.uniqlo.com/us/en/search?q=",
  target: "https://www.target.com/s?searchTerm=",
  sephora: "https://www.sephora.com/search?keyword=",
  "h&m": "https://www2.hm.com/en_us/search-results.html?q=",
  hm: "https://www2.hm.com/en_us/search-results.html?q=",
  asos: "https://www.asos.com/us/search/?q=",
  madewell: "https://www.madewell.com/search?q=",
  anthropologie: "https://www.anthropologie.com/search?q=",
  everlane: "https://www.everlane.com/search?q=",
  lululemon: "https://www.lululemon.com/search?Ntt=",
  nike: "https://www.nike.com/w?q=",
  adidas: "https://www.adidas.com/us/search?q=",
  amazon: "https://www.amazon.com/s?k=",
};

function cleanStoreName(name: string): string {
  return name.toLowerCase().replace(/\s*(men|women|men's|women's)\s*/gi, "").trim();
}

function getStoreDomain(name: string): string {
  const key = cleanStoreName(name);
  if (storeDomains[key]) return storeDomains[key];
  for (const [k, url] of Object.entries(storeDomains)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return `https://www.${key.replace(/[^a-z0-9]/g, "")}.com`;
}

function getStoreSearchUrl(name: string, query: string): string {
  const key = cleanStoreName(name);
  for (const [k, base] of Object.entries(storeSearchUrls)) {
    if (key.includes(k) || k.includes(key)) return base + encodeURIComponent(query);
  }
  return getStoreDomain(name);
}

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
  const key = cleanStoreName(name);
  const domain = brandDomainMap[key];
  if (domain) return `https://logo.clearbit.com/${domain}?size=80`;
  return `https://logo.clearbit.com/${key.replace(/[^a-z0-9]/g, "")}.com?size=80`;
}

/* ── Imagery ── */
const storeHeroImages: Record<string, string> = {
  nordstrom: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&q=80",
  everlane: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=500&fit=crop&q=80",
  lululemon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&q=80",
  uniqlo: "https://images.unsplash.com/photo-1434389677669-e08b4cda3b00?w=800&h=500&fit=crop&q=80",
  nike: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=500&fit=crop&q=80",
  adidas: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop&q=80",
  sephora: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=500&fit=crop&q=80",
  zara: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&q=80",
  target: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=500&fit=crop&q=80",
};
const fallbackStoreImgs = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490427712608-588e68359dbd?w=800&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&q=80",
];
function getStoreImage(name: string, i: number): string {
  const key = cleanStoreName(name);
  if (storeHeroImages[key]) return storeHeroImages[key];
  for (const [k, url] of Object.entries(storeHeroImages)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return fallbackStoreImgs[i % fallbackStoreImgs.length];
}

const giftImages: Record<string, string> = {
  "athletic apparel": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&q=80",
  "high-quality basics": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=400&fit=crop&q=80",
  "smart home tech": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&h=400&fit=crop&q=80",
  "minimalist leather goods": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=400&fit=crop&q=80",
  "fitness trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=400&fit=crop&q=80",
  skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=400&fit=crop&q=80",
  jewelry: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop&q=80",
  fragrances: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=400&fit=crop&q=80",
  clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=400&fit=crop&q=80",
  wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop&q=80",
};
const fallbackGiftImgs = [
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&h=400&fit=crop&q=80",
];
function getGiftImage(name: string, i: number): string {
  const key = name.toLowerCase();
  if (giftImages[key]) return giftImages[key];
  for (const [k, url] of Object.entries(giftImages)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  return fallbackGiftImgs[i % fallbackGiftImgs.length];
}

const quickActionData = [
  { label: "Their Sizes", desc: "Clothing, shoes, ring — no guessing", route: "/dashboard/my-go-two", img: quickSizesImg },
  { label: "Their Saved Items", desc: "Things they've mentioned wanting", route: "/dashboard/my-go-two", img: quickSavedImg },
  { label: "Their Brands", desc: "The stores and labels they love", route: "/dashboard/my-go-two", img: quickBrandsImg },
  { label: "Gift Ideas", desc: "Curated picks based on their taste", route: "/dashboard/recommendations", img: quickGiftImg },
];

/* ── Brand logo component ── */
const BrandLogo = ({ name, size = 28 }: { name: string; size?: number }) => {
  const [failed, setFailed] = useState(false);
  const logoUrl = getBrandLogoUrl(name);
  if (failed) {
    return (
      <div className="rounded-full flex items-center justify-center"
        style={{ width: size + 10, height: size + 10, background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <span className="font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif", fontSize: size * 0.45 }}>
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }
  return (
    <div className="rounded-full flex items-center justify-center overflow-hidden"
      style={{ width: size + 10, height: size + 10, background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <img src={logoUrl} alt={name} style={{ width: size, height: size }}
        className="object-contain" loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
};

const priceTierLabels: Record<string, string> = {
  budget: "Under $50", "mid-range": "$50–$150", premium: "$150–$300", luxury: "$300+",
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  const d = new Date(dateStr);
  d.setFullYear(today.getFullYear());
  if (d < today) d.setFullYear(today.getFullYear() + 1);
  return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

interface PartnerData {
  displayName: string;
  styles: string[];
  stores: string[];
  brands: string[];
  giftCategories: string[];
  priceTier: string;
  persona: string;
  birthday: string | null;
  anniversary: string | null;
}

/* ═══════════════════════════════════════════
   DASHBOARD COMPONENT
   ═══════════════════════════════════════════ */

const DashboardHome = () => {
  const { user } = useAuth();
  const { personalization, loading: persLoading } = usePersonalization();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [hasPartner, setHasPartner] = useState<boolean | null>(null);
  const [ownBirthday, setOwnBirthday] = useState<string | null>(null);
  const [ownAnniversary, setOwnAnniversary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase.from("profiles").select("display_name, birthday, anniversary")
      .eq("user_id", user.id).single()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? "");
        setOwnBirthday((data as any)?.birthday ?? null);
        setOwnAnniversary((data as any)?.anniversary ?? null);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchPartner = async () => {
      const { data: couples } = await supabase.from("couples").select("*")
        .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`).eq("status", "accepted");
      if (!couples?.length) { setHasPartner(false); return; }
      const couple = couples[0];
      const partnerId = couple.inviter_id === user.id ? couple.invitee_id : couple.inviter_id;
      if (!partnerId) { setHasPartner(false); return; }
      const [profileRes, prefsRes] = await Promise.all([
        supabase.from("profiles").select("display_name, gender, birthday, anniversary").eq("user_id", partnerId).single(),
        supabase.from("user_preferences").select("ai_personalization").eq("user_id", partnerId).single(),
      ]);
      const profile = profileRes.data as any;
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
        birthday: profile?.birthday || null,
        anniversary: profile?.anniversary || null,
      });
      setHasPartner(true);
    };
    fetchPartner();
  }, [user]);

  const firstName = displayName?.split(" ")[0] || "there";
  const partnerFirstName = partner?.displayName?.split(" ")[0] || "Partner";

  // Dashboard is entirely partner-centric — only show partner data
  const showData = partner;
  const showDataName = partnerFirstName;
  const allStoresAndBrands = showData ? [...showData.stores, ...showData.brands] : [];

  const triggers: { label: string; urgency: "urgent" | "soon"; days: number | null; action: () => void }[] = [];
  if (showData?.birthday) {
    const days = daysUntil(showData.birthday);
    if (days !== null && days <= 30) {
      triggers.push({ label: `${showDataName}'s birthday in ${days} day${days === 1 ? "" : "s"}`, urgency: days <= 7 ? "urgent" : "soon", days, action: () => navigate("/dashboard/templates") });
    }
  }
  if (showData?.anniversary) {
    const days = daysUntil(showData.anniversary);
    if (days !== null && days <= 30) {
      triggers.push({ label: `Anniversary in ${days} day${days === 1 ? "" : "s"}`, urgency: days <= 7 ? "urgent" : "soon", days, action: () => navigate("/dashboard/templates") });
    }
  }

  const missingDates = showData && (!showData.birthday || !showData.anniversary);

  const safePicks = showData ? allStoresAndBrands.slice(0, 5).map((store) => {
    const styleQuery = showData.styles.length > 0
      ? showData.styles[0].toLowerCase() + " " + (showData.giftCategories[0]?.toLowerCase() || "essentials")
      : "bestseller";
    return {
      store,
      searchUrl: getStoreSearchUrl(store, styleQuery),
      image: getStoreImage(store, allStoresAndBrands.indexOf(store)),
      query: styleQuery,
    };
  }) : [];

  const containerVariant = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const itemVariant = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

  const sections: { id: string; label: string; content: ReactNode }[] = [];

  // Hero section
  if (showData) {
    sections.push({
      id: "snapshot",
      label: `${showDataName}'s Snapshot`,
      content: (
        <div className="space-y-6 max-w-4xl mx-auto">
          <motion.div variants={itemVariant} className="relative overflow-hidden" style={{ borderRadius: "1.8rem", minHeight: 300 }}>
            <div className="absolute inset-0">
              <img
                src={allStoresAndBrands.length > 0 ? getStoreImage(allStoresAndBrands[0], 0) : fallbackStoreImgs[0]}
                alt="" className="w-full h-full object-cover" loading="eager"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(160deg, rgba(47,95,109,0.92) 0%, rgba(47,95,109,0.7) 40%, rgba(217,101,79,0.5) 100%)",
              }} />
              <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at 70% 20%, rgba(232,198,174,0.25) 0%, transparent 60%)",
              }} />
            </div>
            <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between" style={{ minHeight: 300 }}>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                  style={{ color: "rgba(246,226,212,0.7)" }}
                >
                  {showDataName}'s Snapshot
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl sm:text-5xl font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f6e2d4" }}
                >
                  {showData.displayName}
                </motion.h1>
                {showData.persona && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="mt-3 text-sm max-w-md leading-relaxed italic"
                    style={{ color: "rgba(246,226,212,0.65)" }}
                  >
                    "{showData.persona}"
                  </motion.p>
                )}
              </div>
              <div className="mt-6 space-y-5">
                {showData.styles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {showData.styles.map((s) => (
                      <span key={s} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md"
                        style={{ background: "rgba(255,255,255,0.15)", color: "#f6e2d4", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {s}
                      </span>
                    ))}
                    {showData.priceTier && (
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md"
                        style={{ background: "rgba(217,101,79,0.35)", color: "#f6e2d4", border: "1px solid rgba(217,101,79,0.4)" }}>
                        {priceTierLabels[showData.priceTier] || showData.priceTier}
                      </span>
                    )}
                  </div>
                )}
                {allStoresAndBrands.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest font-semibold shrink-0" style={{ color: "rgba(246,226,212,0.5)" }}>
                      {showDataName} shops at
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {allStoresAndBrands.slice(0, 7).map((name) => (
                        <a key={name} href={getStoreDomain(name)} target="_blank" rel="noopener noreferrer"
                          className="shrink-0 hover:scale-110 active:scale-95 transition-transform">
                          <BrandLogo name={name} size={26} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => navigate("/dashboard/collaborations")}
                className="absolute top-8 right-8 flex items-center gap-1.5 text-xs font-semibold backdrop-blur-md px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform"
                style={{ background: "rgba(255,255,255,0.15)", color: "#f6e2d4", border: "1px solid rgba(255,255,255,0.2)" }}>
                {showDataName}'s Full Profile <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {triggers.length > 0 && (
            <div className="space-y-3">
              {triggers.map((trigger, i) => (
                <motion.button key={i} onClick={trigger.action}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="w-full relative overflow-hidden flex items-center gap-4 p-5 text-left group"
                  style={{
                    borderRadius: "1.2rem",
                    background: trigger.urgency === "urgent"
                      ? "linear-gradient(135deg, rgba(217,101,79,0.15) 0%, rgba(217,101,79,0.05) 100%)"
                      : "linear-gradient(135deg, rgba(47,95,109,0.1) 0%, rgba(47,95,109,0.03) 100%)",
                    border: trigger.urgency === "urgent"
                      ? "1px solid rgba(217,101,79,0.3)"
                      : "1px solid rgba(47,95,109,0.2)",
                  }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: trigger.urgency === "urgent" ? "rgba(217,101,79,0.2)" : "rgba(47,95,109,0.15)" }}>
                    <AlertCircle className={`w-5 h-5 ${trigger.urgency === "urgent" ? "text-destructive" : "text-primary"}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${trigger.urgency === "urgent" ? "text-destructive" : "text-primary"}`}>
                      {trigger.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Don't wait — find the perfect gift now</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      ),
    });
  }

  // Quick Actions
  sections.push({
    id: "quick-actions",
    label: "Quick Actions",
    content: (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {quickActionData.map(({ label, desc, route, img }) => (
            <motion.button key={label}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate(route)}
              className="relative overflow-hidden text-left group aspect-[4/5]"
              style={{ borderRadius: "1.4rem" }}>
              <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-5">
                <h3 className="card-title text-lg leading-tight">
                  {label}
                </h3>
                <p className="text-[11px] mt-1 leading-snug" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.75)" }}>
                  {desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    ),
  });

  // Safe Picks
  if (safePicks.length > 0) {
    sections.push({
      id: "safe-picks",
      label: `Based on ${showDataName}'s Go-Tos`,
      content: (
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] text-muted-foreground mb-4 text-center">
            Filtered by their stores, style & price range
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safePicks.map(({ store, searchUrl, image }, i) => (
              <motion.a key={store} href={searchUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group block"
                style={{ borderRadius: "1.4rem", height: i === 0 ? 220 : 180 }}>
                <img src={image} alt={store} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(47,95,109,0.75) 100%)",
                }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <BrandLogo name={store} size={32} />
                    <div>
                      <p className="text-base font-bold drop-shadow-lg" style={{ color: "#f6e2d4" }}>{store}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "rgba(246,226,212,0.6)" }}>
                        {showData!.styles.length > 0 ? `${showData!.styles[0]} picks` : "Curated for them"}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform"
                    style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                    <ArrowRight className="w-4 h-4" style={{ color: "#f6e2d4" }} />
                  </div>
                </div>
                {showData!.priceTier && (
                  <div className="absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "rgba(255,255,255,0.15)", color: "#f6e2d4", border: "1px solid rgba(255,255,255,0.2)" }}>
                    {priceTierLabels[showData!.priceTier] || showData!.priceTier}
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      ),
    });
  }

  // Gift Categories
  if (showData && showData.giftCategories.length > 0) {
    sections.push({
      id: "gift-categories",
      label: `What to Get ${showDataName}`,
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2">
            {showData.giftCategories.map((cat, i) => {
              const img = getGiftImage(cat, i);
              const searchStore = allStoresAndBrands[0];
              const url = searchStore ? getStoreSearchUrl(searchStore, cat) : "#";
              return (
                <motion.a key={cat} href={url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden shrink-0 group"
                  style={{ borderRadius: "1.2rem", width: 160, height: 200 }}>
                  <img src={img} alt={cat} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, transparent 40%, rgba(47,95,109,0.85) 100%)",
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-bold capitalize drop-shadow-lg leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#f6e2d4" }}>
                      {cat}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      ),
    });
  }

  // Not onboarded prompt
  if (!persLoading && !personalization && !loading) {
    sections.push({
      id: "onboard-prompt",
      label: "Get Started",
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden" style={{ borderRadius: "1.4rem" }}>
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))",
              border: "1px solid hsl(var(--primary) / 0.1)",
              borderRadius: "1.4rem",
            }} />
            <div className="relative p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Complete your profile so {hasPartner ? partnerFirstName : "your partner"} knows exactly what to get you.
              </p>
              <Button className="rounded-full px-8" onClick={() => navigate("/onboarding")}>Set Up My Profile</Button>
            </div>
          </div>
        </div>
      ),
    });
  }

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <SnapScrollLayout sections={sections} />
    </div>
  );
};

export default DashboardHome;
