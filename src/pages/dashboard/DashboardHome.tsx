import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import CardEditButton from "@/components/CardEditButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ConnectionPage from "./ConnectionPage";
import { getDefaultPhotoForLabel, assignUniquePhotos } from "@/data/stockPhotos";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";
import { useCategoryRegistry } from "@/hooks/useCategoryRegistry";

const CARD_W = CAROUSEL_LAYOUT.cardWidth;
const CARD_H = CAROUSEL_LAYOUT.cardHeight;
const FLANK_W = CAROUSEL_LAYOUT.flankWidth;
const FLANK_H = CAROUSEL_LAYOUT.flankHeight;
const X_GAP = CAROUSEL_LAYOUT.xGap;
const SPRING = CAROUSEL_LAYOUT.spring;

const DEFAULT_IMAGE = getDefaultPhotoForLabel("friend");

interface ConnectionCard {
  id: string;
  name: string;
  image: string;
  email: string;
  status: string;
  isNew?: boolean;
}

interface PlaceholderCard {
  id: string;
  name: string;
  image: string;
}

const PLACEHOLDER_CONNECTIONS: ConnectionCard[] = [
  { id: "placeholder-wife", name: "Wife", image: "", email: "", status: "placeholder" },
  { id: "demo-sig-other", name: "Significant Other", image: "", email: "demo@example.com", status: "accepted" },
  { id: "placeholder-mom", name: "Mom", image: "", email: "", status: "placeholder" },
  { id: "placeholder-dad", name: "Dad", image: "", email: "", status: "placeholder" },
];

/* ═══════════════════════════════════════════
   CONNECTIONS CAROUSEL — backed by couples table
   ═══════════════════════════════════════════ */

const ConnectionsCoverFlow = ({
  cards,
  onSaveConnection,
  onAddConnection,
  onOpenConnection,
}: {
  cards: ConnectionCard[];
  onSaveConnection: (cardId: string, newLabel: string, newImage: string, email?: string) => void;
  onAddConnection: () => void;
  onOpenConnection?: (card: ConnectionCard, rect: DOMRect) => void;
}) => {
  // Include a virtual "add" card at the end
  const totalCount = cards.length + 1;
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full overflow-hidden" style={{ height: CAROUSEL_LAYOUT.stageHeight }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, index) => {
            let offset = index - activeIndex;
            const half = totalCount / 2;
            if (offset > half) offset -= totalCount;
            if (offset < -half) offset += totalCount;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > CAROUSEL_LAYOUT.maxVisibleOffset) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : CAROUSEL_LAYOUT.flankBlur;
            const opacity = isActive ? 1 : CAROUSEL_LAYOUT.flankOpacity;

            return (
              <motion.div
                key={card.id}
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ zIndex }}
                onClick={(e) => {
                  if (!isActive) {
                    setActiveIndex(index);
                  } else if (card.status === "accepted" && onOpenConnection) {
                    const el = e.currentTarget as HTMLElement;
                    const rect = el.getBoundingClientRect();
                    onOpenConnection(card, rect);
                  }
                }}
              >
                <div
                  className={`overflow-hidden transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  } ${card.status === "placeholder" ? "border-2 border-dashed" : ""}`}
                  style={{
                    width: cardW,
                    height: cardH,
                    borderRadius: CAROUSEL_LAYOUT.borderRadius,
                    ...(card.status === "placeholder" ? { borderColor: "var(--swatch-viridian-odyssey)", opacity: 0.85 } : {}),
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <CardEditButton
                      title={card.name}
                      maxLength={20}
                      isConnection
                      isNewConnection={card.isNew || card.status === "placeholder"}
                      currentImage={card.image}
                      currentEmail={card.email}
                      onSaveConnection={(newLabel, newImage, newEmail) =>
                        onSaveConnection(card.id, newLabel, newImage, newEmail)
                      }
                    />
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      style={card.status === "placeholder" ? { filter: "saturate(0.4) brightness(0.85)" } : {}}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.style.background = "linear-gradient(135deg, #2D6870, #1e4a52)";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="card-title leading-tight">{card.name}</h3>
                      {card.status === "pending" && (
                        <span className="text-[10px] text-white/60 uppercase tracking-wider">Pending</span>
                      )}
                    </div>
                    {card.status === "placeholder" && isActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                          style={{
                            background: "rgba(47, 95, 109, 0.75)",
                            color: "rgba(246, 226, 212, 0.9)",
                            backdropFilter: "blur(4px)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Tap to invite
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Add New Connection card */}
          {(() => {
            const addIndex = cards.length;
            let offset = addIndex - activeIndex;
            const half = totalCount / 2;
            if (offset > half) offset -= totalCount;
            if (offset < -half) offset += totalCount;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > CAROUSEL_LAYOUT.maxVisibleOffset) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : CAROUSEL_LAYOUT.flankBlur;
            const opacity = isActive ? 1 : CAROUSEL_LAYOUT.flankOpacity;

            return (
              <motion.div
                key="add-new"
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ zIndex }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(addIndex);
                  } else {
                    onAddConnection();
                  }
                }}
              >
                <div
                  className={`overflow-hidden transition-shadow duration-300 border-2 border-dashed border-white/30 flex flex-col items-center justify-center gap-2 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: cardW, height: cardH, borderRadius: CAROUSEL_LAYOUT.borderRadius, background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(45,104,112,0.3)" }}
                  >
                    <Plus className="w-6 h-6 text-white/70" />
                  </div>
                  <span className="text-sm text-white/60 font-medium">Add Connection</span>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   GENERIC CAROUSEL (for other categories)
   ═══════════════════════════════════════════ */

const HomeCoverFlow = ({ cards }: { cards: PlaceholderCard[] }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  useRegisterCarousel(cards.length, activeIndex, setActiveIndex);

  if (cards.length === 0) return null;

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full overflow-hidden" style={{ height: CAROUSEL_LAYOUT.stageHeight }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, index) => {
            let offset = index - activeIndex;
            const half = cards.length / 2;
            if (offset > half) offset -= cards.length;
            if (offset < -half) offset += cards.length;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > CAROUSEL_LAYOUT.maxVisibleOffset) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : CAROUSEL_LAYOUT.flankBlur;
            const opacity = isActive ? 1 : CAROUSEL_LAYOUT.flankOpacity;

            return (
              <motion.div
                key={card.id}
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ zIndex }}
                onClick={() => { if (!isActive) setActiveIndex(index); }}
              >
                <div
                  className={`overflow-hidden transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: cardW, height: cardH, borderRadius: CAROUSEL_LAYOUT.borderRadius }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <CardEditButton title={card.name} />
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.style.background = "linear-gradient(135deg, #2D6870, #1e4a52)";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="card-title leading-tight">{card.name}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   DASHBOARD HOME
   ═══════════════════════════════════════════ */

const DashboardHome = () => {
  const { user } = useAuth();
  const { gender } = usePersonalization();
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [openConnection, setOpenConnection] = useState<{ card: ConnectionCard; rect: { x: number; y: number; width: number; height: number } } | null>(null);

  const { sections: dashboardSections, loading: registryLoading } = useCategoryRegistry(gender, 'dashboard');

  const SECTION_LABELS: Record<string, string> = {
    calendar: "Shared Calendar",
    activity: "Recent Activity",
    occasions: "Occasions",
    memories: "Memories",
  };

  const otherCategories = useMemo(() => {
    return Object.entries(dashboardSections).map(([sectionId, items]) => ({
      id: sectionId,
      label: SECTION_LABELS[sectionId] || sectionId,
      cards: items.map(item => ({
        id: item.key,
        name: item.label,
        image: item.image,
      })),
    }));
  }, [dashboardSections]);

  // Load connections from couples table (both as inviter and invitee)
  const loadConnections = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("couples")
      .select("*")
      .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`);

    if (error) {
      console.error("Failed to load connections:", error);
      return;
    }

    if (!data) return;

    const cards: ConnectionCard[] = data.map((row: any) => {
      const isInviter = row.inviter_id === user.id;
      const label = row.display_label || (isInviter && row.invitee_email ? row.invitee_email.split("@")[0] : "Connection");
      return {
        id: row.id,
        name: label,
        image: row.photo_url || "",
        email: row.invitee_email || "",
        status: row.status,
      };
    });

    // Show placeholder cards when user has few/no real connections
    if (cards.length < 4) {
      const remainingSlots = 4 - cards.length;
      const usedNames = new Set(cards.map(c => c.name.toLowerCase()));
      const placeholders = PLACEHOLDER_CONNECTIONS
        .filter(p => !usedNames.has(p.name.toLowerCase()))
        .slice(0, remainingSlots)
        .map(p => ({ ...p, image: "" })); // clear default so assignUniquePhotos picks
      const allCards = assignUniquePhotos([...cards, ...placeholders], (c) => !!c.image);
      setConnections(allCards);
    } else {
      const uniqueCards = assignUniquePhotos(cards, (c) => !!c.image);
      setConnections(uniqueCards);
    }
  }, [user]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  // Save edits to an existing connection
  const handleSaveConnection = useCallback(
    async (cardId: string, newLabel: string, newImage: string, _email?: string) => {
      if (!user) return;

      // If this is a "new" or placeholder card, create it
      if (cardId.startsWith("new-") || cardId.startsWith("placeholder-")) {
        const { error } = await supabase.from("couples").insert({
          inviter_id: user.id,
          invitee_email: _email || null,
          display_label: newLabel,
          photo_url: newImage || null,
          status: _email ? "pending" : "draft",
        });

        if (error) {
          console.error("Failed to create connection:", error);
          toast.error("Failed to create connection");
          return;
        }

        toast.success(_email ? "Connection invitation sent!" : "Connection saved!");
        setConnections((prev) => prev.filter((c) => c.id !== cardId));
        loadConnections();
        return;
      }

      // Update existing connection
      const { error } = await supabase
        .from("couples")
        .update({
          display_label: newLabel,
          photo_url: newImage || null,
        })
        .eq("id", cardId);

      if (error) {
        console.error("Failed to save connection:", error);
        toast.error("Failed to save connection");
        return;
      }

      // Update local state
      setConnections((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, name: newLabel, image: newImage || DEFAULT_IMAGE } : c
        )
      );
      toast.success("Connection updated!");
    },
    [user, loadConnections]
  );

  // Add a temporary "new connection" card
  const handleAddConnection = useCallback(() => {
    const tempId = `new-${Date.now()}`;
    setConnections((prev) => [
      ...prev,
      {
        id: tempId,
        name: "New Connection",
        image: DEFAULT_IMAGE,
        email: "",
        status: "pending",
        isNew: true,
      },
    ]);
  }, []);

  const handleOpenConnection = useCallback((card: ConnectionCard, rect: DOMRect) => {
    setOpenConnection({ card, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } });
  }, []);

  const allSections = [
    {
      id: "connections",
      label: "Your Connections",
      content: (
        <ConnectionsCoverFlow
          cards={connections}
          onSaveConnection={handleSaveConnection}
          onAddConnection={handleAddConnection}
          onOpenConnection={handleOpenConnection}
        />
      ),
    },
    ...otherCategories.map((cat) => ({
      id: cat.id,
      label: cat.label,
      content: <HomeCoverFlow cards={cat.cards} />,
    })),
  ];

  return (
    <div className="h-full relative">
      <SnapScrollLayout
        sections={allSections.map((s) => ({
          id: s.id,
          label: s.label,
          content: s.content,
        }))}
      />
      <AnimatePresence>
        {openConnection && (
          <ConnectionPage
            key={openConnection.card.id}
            connection={{
              id: openConnection.card.id,
              name: openConnection.card.name,
              image: openConnection.card.image,
            }}
            cardRect={openConnection.rect}
            onClose={() => setOpenConnection(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardHome;
