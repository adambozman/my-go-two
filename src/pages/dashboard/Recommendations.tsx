import { useState, useEffect } from "react";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, RefreshCw, Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Product {
  name: string;
  brand: string;
  price_range: string;
  category: string;
  why_picked: string;
  is_discovery: boolean;
}

const categoryLabels: Record<string, string> = {
  clothing: "Clothing",
  accessories: "Accessories",
  grooming: "Grooming",
  lifestyle: "Lifestyle",
  experiences: "Experiences",
  tech: "Tech",
  home: "Home",
  fragrance: "Fragrance",
};

const Recommendations = () => {
  const { personalization, loading: personalizationLoading } = usePersonalization();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-products");
      if (error) throw error;
      if (data?.products) setProducts(data.products);
    } catch (e: any) {
      console.error("Products error:", e);
      if (e?.status === 429) toast.error("Rate limit reached. Try again shortly.");
      else if (e?.status === 402) toast.error("AI credits exhausted.");
      else toast.error("Failed to load recommendations");
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    if (!personalizationLoading && personalization && !hasLoaded) {
      fetchProducts();
    }
  }, [personalizationLoading, personalization]);

  if (personalizationLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
      </div>
    );
  }

  if (!personalization) {
    return (
      <div className="space-y-4 text-center py-12">
        <Sparkles className="h-10 w-10 mx-auto" style={{ color: "var(--swatch-teal)" }} />
        <p className="text-muted-foreground">Complete your profile to get personalized product picks.</p>
      </div>
    );
  }

  // Group products by category
  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    const cat = p.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}>
            Picked For You
          </h1>
          {personalization.persona_summary && (
            <p className="text-xs text-muted-foreground mt-1 max-w-sm italic">
              Based on your {personalization.price_tier || ""} {(personalization.style_keywords || []).slice(0, 3).join(", ")} style
            </p>
          )}
        </div>
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="p-2 rounded-full transition-colors"
          style={{ color: "var(--swatch-antique-coin)" }}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading && products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
          <p className="text-sm text-muted-foreground">Finding products that match your style...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="space-y-7">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h2
                className="text-[17px] font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-viridian-odyssey)" }}
              >
                {categoryLabels[category] || category}
              </h2>
              <div className="space-y-2.5">
                {items.map((product, i) => (
                  <motion.div
                    key={`${product.brand}-${product.name}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="p-4 rounded-2xl"
                    style={{
                      background: product.is_discovery ? "rgba(45, 104, 112, 0.07)" : "var(--swatch-sand-mid)",
                      border: product.is_discovery ? "1px solid rgba(45, 104, 112, 0.15)" : "1px solid var(--chip-border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold truncate" style={{ color: "var(--swatch-viridian-odyssey)" }}>
                            {product.name}
                          </h3>
                          {product.is_discovery && (
                            <Star className="h-3 w-3 shrink-0" style={{ color: "var(--swatch-cedar-grove)" }} fill="var(--swatch-cedar-grove)" />
                          )}
                        </div>
                        <p className="text-xs font-medium" style={{ color: "var(--swatch-teal)" }}>
                          {product.brand}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {product.why_picked}
                        </p>
                      </div>
                      <span
                        className="text-xs font-semibold shrink-0 px-2.5 py-1 rounded-full"
                        style={{ background: "var(--swatch-sand)", color: "var(--swatch-antique-coin)" }}
                      >
                        {product.price_range}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : hasLoaded ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">Tap refresh to generate product picks.</p>
        </div>
      ) : null}
    </div>
  );
};

export default Recommendations;
