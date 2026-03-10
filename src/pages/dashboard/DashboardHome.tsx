import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, ShoppingBag, Heart, CalendarHeart, Bookmark, Ruler, ChevronRight, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/* ── Store URLs for "Shop at" links ── */
const storeDomains: Record<string, string> = {
  nordstrom: "https://www.nordstrom.com",
  zara: "https://www.zara.com",
  uniqlo: "https://www.uniqlo.com",
  target: "https://www.target.com",
  sephora: "https://www.sephora.com",
  "h&m": "https://www2.hm.com",
  hm: "https://www2.hm.com",
  asos: "https://www.asos.com",
  madewell: "https://www.madewell.com",
  anthropologie: "https://www.anthropologie.com",
  amazon: "https://www.amazon.com",
  everlane: "https://www.everlane.com",
  lululemon: "https://www.lululemon.com",
  nike: "https://www.nike.com",
  adidas: "https://www.adidas.com",
  "common projects": "https://www.commonprojects.com",
  "banana republic": "https://www.bananarepublic.com",
  "j.crew": "https://www.jcrew.com",
  reformation: "https://www.thereformation.com",
  aritzia: "https://www.aritzia.com",
  cos: "https://www.cos.com",
  "free people": "https://www.freepeople.com",
};

function getStoreDomain(name: string): string {
  const key = name.toLowerCase().replace(/\s*(men|women|men's|women's)\s*/gi, "").trim();
  if (storeDomains[key]) return storeDomains[key];
  for (const [k, url] of Object.entries(storeDomains)) {
    if (key.includes(k) || k.includes(key)) return url;
  }
  const sanitized = key.replace(/[^a-z0-9]/g, "");
  return `https://www.${sanitized}.com`;
}

/* ── Price tier labels ── */
const priceTierLabels: Record<string, string> = {
  budget: "Under $50",
  "mid-range": "$50–$150",
  premium: "$150–$300",
  luxury: "$300+",
};

/* ── Partner data types ── */
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

  // Fetch own display name
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

  // Fetch partner data
  useEffect(() => {
    if (!user) return;
    const fetchPartner = async () => {
      // Get accepted couple
      const { data: couples } = await supabase
        .from("couples")
        .select("*")
        .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
        .eq("status", "accepted");

      if (!couples || couples.length === 0) {
        setHasPartner(false);
        return;
      }

      const couple = couples[0];
      const partnerId = couple.inviter_id === user.id ? couple.invitee_id : couple.inviter_id;
      if (!partnerId) { setHasPartner(false); return; }

      // Fetch partner profile + preferences in parallel
      const [profileRes, prefsRes] = await Promise.all([
        supabase.from("profiles").select("display_name, gender").eq("user_id", partnerId).single(),
        supabase.from("user_preferences").select("profile_answers, ai_personalization").eq("user_id", partnerId).single(),
      ]);

      const profile = profileRes.data;
      const prefs = prefsRes.data;
      const aiData = prefs?.ai_personalization as any;
      const answers = prefs?.profile_answers as any;

      // Sanitize helper
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

  // For users without a partner, show their OWN data as a preview
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

  return (
    <div className="max-w-2xl space-y-6">
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-design-neumorph p-6 text-center"
          style={{ borderRadius: "1rem" }}
        >
          <UserPlus className="w-10 h-10 text-primary mx-auto mb-3 opacity-60" />
          <h2 className="text-lg font-bold text-primary mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Connect Your Partner
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
            Once they join, you'll see their style, sizes, and preferences right here — so you never miss again.
          </p>
          <Button className="rounded-full" onClick={() => navigate("/dashboard/collaborations")}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Partner
          </Button>
        </motion.div>
      )}

      {/* ─── Partner Snapshot Card ─── */}
      {showData && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="card-design-neumorph p-5"
          style={{ borderRadius: "1rem" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                {hasPartner ? "Partner Snapshot" : "Your Profile"}
              </p>
              <h2 className="text-xl font-bold text-primary mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {showData.displayName}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() => navigate(hasPartner ? "/dashboard/shared-lists" : "/dashboard/my-gotwo")}
            >
              View Full Profile <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          {/* Style Tags */}
          {showData.styles.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Style</p>
              <div className="flex flex-wrap gap-2">
                {showData.styles.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stores & Price Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
            {showData.stores.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Shops At</p>
                <p className="text-sm text-primary font-medium">
                  {[...showData.stores, ...showData.brands].slice(0, 4).join(" · ")}
                </p>
              </div>
            )}
            {showData.priceTier && (
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Price Zone</p>
                <p className="text-sm text-primary font-medium">
                  {priceTierLabels[showData.priceTier] || showData.priceTier}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── Quick Wins ─── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: Gift, label: "Buy a Gift", desc: "Find something they'll love", action: () => navigate("/dashboard/templates") },
            { icon: Ruler, label: "Check Sizes", desc: "Their exact measurements", action: () => navigate("/dashboard/my-gotwo") },
            { icon: Heart, label: "Saved Items", desc: "Things they've mentioned", action: () => navigate("/dashboard/my-lists") },
            { icon: CalendarHeart, label: "Plan a Date", desc: "Ideas they'd enjoy", action: () => navigate("/dashboard/templates") },
            { icon: ShoppingBag, label: "Restock Basics", desc: "Their everyday essentials", action: () => navigate("/dashboard/my-lists") },
            { icon: Bookmark, label: "Wish List", desc: "What they actually want", action: () => navigate("/dashboard/shared-lists") },
          ].map(({ icon: Icon, label, desc, action }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + i * 0.03 }}
              onClick={action}
              className="card-design-neumorph p-4 text-left hover:scale-[1.02] active:scale-[0.98] transition-transform group"
              style={{ borderRadius: "0.9rem" }}
            >
              <Icon className="w-5 h-5 text-primary mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              <p className="text-sm font-semibold text-primary leading-tight">{label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── Safe Picks — filtered by their stores ─── */}
      {showData && showData.stores.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
            Safe Picks — Guaranteed {showDataName} Says Yes
          </p>
          <div className="space-y-2">
            {[...showData.stores, ...showData.brands].slice(0, 5).map((store, i) => {
              const url = getStoreDomain(store);
              return (
                <motion.a
                  key={store}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 + i * 0.03 }}
                  className="card-design-neumorph p-4 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition-transform group block"
                  style={{ borderRadius: "0.9rem" }}
                >
                  <div>
                    <p className="text-sm font-semibold text-primary">{store}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {showData.styles.length > 0
                        ? `Shop ${showData.styles[0].toLowerCase()} styles in their price range`
                        : "Shop their favorite store"
                      }
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── Gift Categories ─── */}
      {showData && showData.giftCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
            What to Get {showDataName}
          </p>
          <div className="flex flex-wrap gap-2">
            {showData.giftCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-primary cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Persona ─── */}
      {showData?.persona && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="card-design-neumorph p-5"
          style={{ borderRadius: "1rem" }}
        >
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            {hasPartner ? `Who ${partnerFirstName} Is` : "Your Persona"}
          </p>
          <p className="text-sm text-primary leading-relaxed italic">"{showData.persona}"</p>
        </motion.div>
      )}

      {/* ─── Not onboarded ─── */}
      {!persLoading && !personalization && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-design-neumorph p-6 text-center"
          style={{ borderRadius: "1rem" }}
        >
          <p className="text-sm text-muted-foreground mb-3">
            Complete your profile so your partner knows exactly what you love.
          </p>
          <Button className="rounded-full" onClick={() => navigate("/onboarding")}>
            Set Up Profile
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;
