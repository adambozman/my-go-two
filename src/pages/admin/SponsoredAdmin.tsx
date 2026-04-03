import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, ExternalLink, BarChart3, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SponsoredProduct = Tables<"sponsored_products">;

interface AdStats {
  product_id: string;
  impressions: number;
  clicks: number;
}

const CATEGORIES = ["food", "clothes", "tech", "home"];
const PLACEMENTS = ["blended", "dedicated", "both"];
const GENDERS = ["male", "female", "non-binary"];
const PRICE_TIERS = ["budget", "mid-range", "premium", "luxury"];

const emptyProduct: Partial<SponsoredProduct> = {
  name: "",
  brand: "",
  description: "",
  price: "",
  category: "clothes",
  image_url: "",
  affiliate_url: "",
  utm_source: "gotwo",
  utm_medium: "app",
  utm_campaign: "",
  hook: "",
  why: "",
  target_gender: ["male", "female", "non-binary"],
  target_price_tiers: ["budget", "mid-range", "premium", "luxury"],
  target_style_keywords: [],
  placement: "blended",
  priority: 0,
  is_active: true,
  start_date: null,
  end_date: null,
};

export default function SponsoredAdmin() {
  const { user } = useAuth();
  const [products, setProducts] = useState<SponsoredProduct[]>([]);
  const [stats, setStats] = useState<AdStats[]>([]);
  const [editing, setEditing] = useState<Partial<SponsoredProduct> | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form" | "analytics">("list");

  const isAdmin = user?.email === "adambozman@gmail.com";

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase
      .from("sponsored_products")
      .select("*")
      .order("priority", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }, []);

  const fetchStats = useCallback(async () => {
    // Get aggregated stats using manual counting
    const { data: events } = await supabase
      .from("ad_events")
      .select("product_id, event_type");

    if (!events) return;

    const statsMap: Record<string, AdStats> = {};
    for (const e of events) {
      if (!statsMap[e.product_id]) {
        statsMap[e.product_id] = { product_id: e.product_id, impressions: 0, clicks: 0 };
      }
      if (e.event_type === "impression") statsMap[e.product_id].impressions++;
      if (e.event_type === "click") statsMap[e.product_id].clicks++;
    }
    setStats(Object.values(statsMap));
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchStats();
    }
  }, [isAdmin, fetchProducts, fetchStats]);

  const buildProductPayload = (): TablesUpdate<"sponsored_products"> => ({
    name: editing?.name || "",
    brand: editing?.brand || "",
    description: editing?.description || null,
    price: editing?.price || null,
    category: editing?.category || "clothes",
    image_url: editing?.image_url || null,
    affiliate_url: editing?.affiliate_url || null,
    utm_source: editing?.utm_source || "gotwo",
    utm_medium: editing?.utm_medium || "app",
    utm_campaign: editing?.utm_campaign || null,
    hook: editing?.hook || null,
    why: editing?.why || null,
    target_gender: editing?.target_gender || [],
    target_price_tiers: editing?.target_price_tiers || [],
    target_style_keywords: editing?.target_style_keywords || null,
    placement: editing?.placement || "blended",
    priority: editing?.priority || 0,
    is_active: editing?.is_active ?? true,
    start_date: editing?.start_date || null,
    end_date: editing?.end_date || null,
  });

  const handleSave = async () => {
    if (!editing?.name || !editing?.brand) {
      toast.error("Name and brand are required");
      return;
    }

    if (editing.id) {
      const payload: TablesUpdate<"sponsored_products"> = buildProductPayload();
      const { error } = await supabase
        .from("sponsored_products")
        .update(payload)
        .eq("id", editing.id);

      if (error) { toast.error("Save failed"); return; }
      toast.success("Product updated");
    } else {
      const payload: TablesInsert<"sponsored_products"> = {
        ...buildProductPayload(),
        created_by: user?.id ?? null,
      };
      const { error } = await supabase.from("sponsored_products").insert(payload);

      if (error) { toast.error("Create failed"); return; }
      toast.success("Product created");
    }

    setEditing(null);
    setView("list");
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("sponsored_products").delete().eq("id", id);
    if (error) { toast.error("Delete failed"); return; }
    toast.success("Product deleted");
    fetchProducts();
  };

  const toggleActive = async (product: SponsoredProduct) => {
    await supabase
      .from("sponsored_products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);
    fetchProducts();
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Admin access required.</p>
      </div>
    );
  }

  const getStatsForProduct = (id: string) => stats.find((s) => s.product_id === id);

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-24">
      <div className="mx-auto max-w-[520px] space-y-4 px-3 py-4 sm:px-4 md:px-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          {view !== "list" ? (
            <button
              onClick={() => { setView("list"); setEditing(null); }}
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "var(--swatch-teal)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}
            >
              Sponsored Products
            </h1>
          )}
          <div className="flex gap-2">
            {view === "list" && (
              <>
                <button
                  onClick={() => setView("analytics")}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                  style={{ background: "var(--swatch-sand-mid)", color: "var(--swatch-antique-coin)" }}
                >
                  <BarChart3 className="w-3.5 h-3.5 inline mr-1" />
                  Analytics
                </button>
                <button
                  onClick={() => { setEditing({ ...emptyProduct }); setView("form"); }}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                  style={{ background: "var(--swatch-teal)", color: "var(--swatch-cream-light)" }}
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" />
                  Add Product
                </button>
              </>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {loading ? (
                <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
              ) : products.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No sponsored products yet.</p>
              ) : (
                products.map((p) => {
                  const pStats = getStatsForProduct(p.id);
                  return (
                    <div
                      key={p.id}
                      className="rounded-2xl p-3.5"
                      style={{
                        background: p.is_active ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.30)",
                        border: "1px solid rgba(255,255,255,0.75)",
                        opacity: p.is_active ? 1 : 0.6,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-semibold truncate" style={{ color: "var(--swatch-teal)" }}>
                            {p.name}
                          </p>
                          <p className="text-[12px]" style={{ color: "var(--swatch-teal)" }}>{p.brand}</p>
                          <div className="flex gap-2 mt-1.5 flex-wrap">
                            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--swatch-sand-mid)", color: "var(--swatch-antique-coin)" }}>
                              {p.category}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--swatch-sand-mid)", color: "var(--swatch-antique-coin)" }}>
                              {p.placement}
                            </span>
                            {p.price && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--swatch-sand-mid)", color: "var(--swatch-antique-coin)" }}>
                                {p.price}
                              </span>
                            )}
                          </div>
                          {pStats && (
                            <p className="text-[10px] mt-1.5" style={{ color: "var(--swatch-text-light)" }}>
                              {pStats.impressions} impressions · {pStats.clicks} clicks
                              {pStats.impressions > 0 ? ` · ${((pStats.clicks / pStats.impressions) * 100).toFixed(1)}% CTR` : ""}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button onClick={() => toggleActive(p)} title={p.is_active ? "Deactivate" : "Activate"}>
                            {p.is_active ? (
                              <ToggleRight className="w-5 h-5" style={{ color: "var(--swatch-teal)" }} />
                            ) : (
                              <ToggleLeft className="w-5 h-5" style={{ color: "var(--swatch-text-light)" }} />
                            )}
                          </button>
                          <button onClick={() => { setEditing(p); setView("form"); }}>
                            <Pencil className="w-4 h-4" style={{ color: "var(--swatch-antique-coin)" }} />
                          </button>
                          <button onClick={() => handleDelete(p.id)}>
                            <Trash2 className="w-4 h-4" style={{ color: "var(--swatch-cedar-grove)" }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}

          {view === "form" && editing && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.75)" }}>
                <h2 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--swatch-teal)" }}>
                  Product Info
                </h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    placeholder="Product name *"
                    value={editing.name || ""}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="col-span-2 px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  />
                  <input
                    placeholder="Brand *"
                    value={editing.brand || ""}
                    onChange={(e) => setEditing({ ...editing, brand: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  />
                  <input
                    placeholder="Price (e.g. $45)"
                    value={editing.price || ""}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  />
                  <select
                    value={editing.category || "clothes"}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    value={editing.placement || "blended"}
                    onChange={(e) => setEditing({ ...editing, placement: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  >
                    {PLACEMENTS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <textarea
                  placeholder="Description"
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none resize-none"
                  style={{ color: "var(--swatch-teal)" }}
                />
              </div>

              <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.75)" }}>
                <h2 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--swatch-teal)" }}>
                  Creative & Copy
                </h2>
                <input
                  placeholder="Hook — why this fits the user"
                  value={editing.hook || ""}
                  onChange={(e) => setEditing({ ...editing, hook: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                  style={{ color: "var(--swatch-teal)" }}
                />
                <input
                  placeholder="Why — deeper explanation"
                  value={editing.why || ""}
                  onChange={(e) => setEditing({ ...editing, why: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                  style={{ color: "var(--swatch-teal)" }}
                />
                <input
                  placeholder="Image URL"
                  value={editing.image_url || ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                  style={{ color: "var(--swatch-teal)" }}
                />
              </div>

              <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.75)" }}>
                <h2 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--swatch-teal)" }}>
                  Affiliate & Tracking
                </h2>
                <input
                  placeholder="Affiliate URL"
                  value={editing.affiliate_url || ""}
                  onChange={(e) => setEditing({ ...editing, affiliate_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                  style={{ color: "var(--swatch-teal)" }}
                />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <input
                    placeholder="utm_source"
                    value={editing.utm_source || ""}
                    onChange={(e) => setEditing({ ...editing, utm_source: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[11px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  />
                  <input
                    placeholder="utm_medium"
                    value={editing.utm_medium || ""}
                    onChange={(e) => setEditing({ ...editing, utm_medium: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[11px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  />
                  <input
                    placeholder="utm_campaign"
                    value={editing.utm_campaign || ""}
                    onChange={(e) => setEditing({ ...editing, utm_campaign: e.target.value })}
                    className="px-3 py-2 rounded-xl text-[11px] bg-white/60 border border-white/80 outline-none"
                    style={{ color: "var(--swatch-teal)" }}
                  />
                </div>
                <input
                  placeholder="Priority (higher = shown first)"
                  type="number"
                  value={editing.priority || 0}
                  onChange={(e) => setEditing({ ...editing, priority: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl text-[13px] bg-white/60 border border-white/80 outline-none"
                  style={{ color: "var(--swatch-teal)" }}
                />
              </div>

              <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.75)" }}>
                <h2 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: "var(--swatch-teal)" }}>
                  Targeting
                </h2>
                <div>
                  <p className="text-[11px] font-medium mb-1.5" style={{ color: "var(--swatch-antique-coin)" }}>Gender</p>
                  <div className="flex gap-2 flex-wrap">
                    {GENDERS.map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          const current = editing.target_gender || [];
                          setEditing({
                            ...editing,
                            target_gender: current.includes(g) ? current.filter((x) => x !== g) : [...current, g],
                          });
                        }}
                        className="px-3 py-1 rounded-full text-[11px] font-medium"
                        style={{
                          background: (editing.target_gender || []).includes(g)
                            ? "var(--swatch-teal)"
                            : "var(--swatch-sand-mid)",
                          color: (editing.target_gender || []).includes(g)
                            ? "var(--swatch-cream-light)"
                            : "var(--swatch-antique-coin)",
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium mb-1.5" style={{ color: "var(--swatch-antique-coin)" }}>Price Tiers</p>
                  <div className="flex gap-2 flex-wrap">
                    {PRICE_TIERS.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          const current = editing.target_price_tiers || [];
                          setEditing({
                            ...editing,
                            target_price_tiers: current.includes(t) ? current.filter((x) => x !== t) : [...current, t],
                          });
                        }}
                        className="px-3 py-1 rounded-full text-[11px] font-medium"
                        style={{
                          background: (editing.target_price_tiers || []).includes(t)
                            ? "var(--swatch-teal)"
                            : "var(--swatch-sand-mid)",
                          color: (editing.target_price_tiers || []).includes(t)
                            ? "var(--swatch-cream-light)"
                            : "var(--swatch-antique-coin)",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 rounded-2xl text-[13px] font-semibold"
                style={{ background: "var(--swatch-teal)", color: "var(--swatch-cream-light)" }}
              >
                {editing.id ? "Update Product" : "Create Product"}
              </button>
            </motion.div>
          )}

          {view === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <h2
                className="text-[15px] font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}
              >
                Ad Performance
              </h2>
              {stats.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No analytics data yet.</p>
              ) : (
                stats.map((s) => {
                  const product = products.find((p) => p.id === s.product_id);
                  return (
                    <div
                      key={s.product_id}
                      className="rounded-2xl p-3.5"
                      style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.75)" }}
                    >
                      <p className="text-[13px] font-semibold" style={{ color: "var(--swatch-teal)" }}>
                        {product?.name || "Unknown"}
                      </p>
                      <p className="text-[11px]" style={{ color: "var(--swatch-teal)" }}>
                        {product?.brand}
                      </p>
                      <div className="flex gap-4 mt-2">
                        <div>
                          <p className="text-[18px] font-bold" style={{ color: "var(--swatch-teal)" }}>
                            {s.impressions}
                          </p>
                          <p className="text-[10px]" style={{ color: "var(--swatch-text-light)" }}>impressions</p>
                        </div>
                        <div>
                          <p className="text-[18px] font-bold" style={{ color: "var(--swatch-teal)" }}>
                            {s.clicks}
                          </p>
                          <p className="text-[10px]" style={{ color: "var(--swatch-text-light)" }}>clicks</p>
                        </div>
                        <div>
                          <p className="text-[18px] font-bold" style={{ color: "var(--swatch-teal)" }}>
                            {s.impressions > 0 ? ((s.clicks / s.impressions) * 100).toFixed(1) : "0.0"}%
                          </p>
                          <p className="text-[10px]" style={{ color: "var(--swatch-text-light)" }}>CTR</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
