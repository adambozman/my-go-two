import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import SnapScrollLayout from "@/components/SnapScrollLayout";
import CategoryCoverFlow from "@/components/CategoryCoverFlow";
import { getTemplateImage as resolveTemplateImage } from "@/data/templateImageResolver";

interface ConnectionPageProps {
  connection: {
    id: string; // couple_id
    name: string;
    image: string;
    partnerId?: string;
  };
  cardRect: { x: number; y: number; width: number; height: number } | null;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  personal: "Personal",
  "food-drink": "Food & Drink",
  "gifts-occasions": "Gifts & Occasions",
  experiences: "Experiences",
};

const categoryOrder = ["personal", "food-drink", "gifts-occasions", "experiences"];

// Map sharing permission keys to template categories
const permissionToCategoryMap: Record<string, string[]> = {
  sizes: ["personal"],
  brands: ["personal"],
  food_preferences: ["food-drink"],
  gift_ideas: ["gifts-occasions"],
  wish_list: ["gifts-occasions"],
  occasions: ["gifts-occasions"],
  memories: ["experiences"],
  saved_items: ["experiences"],
};

const ConnectionPage = ({ connection, cardRect, onClose }: ConnectionPageProps) => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<Record<string, boolean> | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch sharing permissions — what has the partner shared with me?
  useEffect(() => {
    if (!user) return;
    const fetchPermissions = async () => {
      const { data } = await supabase
        .from("sharing_permissions")
        .select("*")
        .eq("couple_id", connection.id)
        .eq("partner_id", user.id)
        .maybeSingle();

      if (data) {
        setPermissions({
          sizes: data.sizes,
          brands: data.brands,
          saved_items: data.saved_items,
          food_preferences: data.food_preferences,
          gift_ideas: data.gift_ideas,
          wish_list: data.wish_list,
          occasions: data.occasions,
          memories: data.memories,
        });
      } else {
        // No permissions row = nothing shared
        setPermissions({});
      }
    };
    fetchPermissions();
  }, [user, connection.id]);

  // Fetch templates
  useEffect(() => {
    supabase.from("card_templates").select("*").then(({ data }) => {
      setTemplates(data ?? []);
      setLoading(false);
    });
  }, []);

  // Determine which categories are permitted
  const permittedCategories = new Set<string>();
  if (permissions) {
    for (const [permKey, cats] of Object.entries(permissionToCategoryMap)) {
      if (permissions[permKey]) {
        cats.forEach((c) => permittedCategories.add(c));
      }
    }
  }

  const getTemplateImage = (name: string) => resolveTemplateImage(name, "neutral");

  const grouped = categoryOrder
    .filter((cat) => permittedCategories.has(cat))
    .map((cat) => {
      const items = templates.filter((t: any) => t.category === cat);
      return {
        key: cat,
        label: categoryLabels[cat] ?? cat,
        items,
      };
    })
    .filter((g) => g.items.length > 0);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 350);
  }, [onClose]);

  // Swipe down to close
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (dy > 100) {
      handleClose();
    }
  }, [handleClose]);

  const isExpanded = !closing;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#f5ede0" }}
      initial={
        cardRect
          ? {
              clipPath: `inset(${cardRect.y}px ${window.innerWidth - cardRect.x - cardRect.width}px ${window.innerHeight - cardRect.y - cardRect.height}px ${cardRect.x}px round 16px)`,
              opacity: 0.8,
            }
          : { opacity: 0 }
      }
      animate={
        isExpanded
          ? {
              clipPath: "inset(0px 0px 0px 0px round 0px)",
              opacity: 1,
            }
          : cardRect
          ? {
              clipPath: `inset(${cardRect.y}px ${window.innerWidth - cardRect.x - cardRect.width}px ${window.innerHeight - cardRect.y - cardRect.height}px ${cardRect.x}px round 16px)`,
              opacity: 0.8,
            }
          : { opacity: 0 }
      }
      exit={
        cardRect
          ? {
              clipPath: `inset(${cardRect.y}px ${window.innerWidth - cardRect.x - cardRect.width}px ${window.innerHeight - cardRect.y - cardRect.height}px ${cardRect.x}px round 16px)`,
              opacity: 0,
            }
          : { opacity: 0 }
      }
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur"
        style={{ background: "rgba(45,104,112,0.15)" }}
      >
        <X className="w-5 h-5" style={{ color: "#2D6870" }} />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center pt-8 pb-2 px-4">
        <div
          className="w-16 h-16 rounded-full overflow-hidden mb-2 ring-2"
          style={{ ringColor: "#2D6870" }}
        >
          <img
            src={connection.image}
            alt={connection.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2
          className="text-xl font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2D6870" }}
        >
          {connection.name}
        </h2>
        <span
          className="mt-1 px-3 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
          style={{
            background: "rgba(45,104,112,0.1)",
            color: "#2D6870",
            letterSpacing: "0.08em",
          }}
        >
          Shared with you
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {loading || permissions === null ? (
          <p className="text-muted-foreground p-4 text-center text-sm">Loading...</p>
        ) : grouped.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p
              className="text-sm text-center px-8"
              style={{ color: "#2D6870", fontFamily: "'Cormorant Garamond', serif" }}
            >
              {connection.name} hasn't shared any categories with you yet.
            </p>
          </div>
        ) : (
          <SnapScrollLayout
            sections={grouped.map((group) => ({
              id: group.key,
              label: group.label,
              labelStyle: { color: "#d4543a" },
              content: (
                <CategoryCoverFlow
                  items={group.items.map((t: any) => ({
                    id: t.id,
                    name: t.name,
                    image: getTemplateImage(t.name),
                    fieldCount: Array.isArray(t.default_fields) ? t.default_fields.length : 0,
                    isCustom: false,
                  }))}
                  onSelect={() => {}}
                  disabled={false}
                />
              ),
            }))}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ConnectionPage;
