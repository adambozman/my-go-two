import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useRegisterCarousel } from "@/contexts/CarouselDotsContext";
import SnapScrollLayout from "@/components/SnapScrollLayout";
import CardEditButton from "@/components/CardEditButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ConnectionPage from "./ConnectionPage";

const CARD_W = 280;
const CARD_H = 380;
const FLANK_W = 160;
const FLANK_H = 260;
const X_GAP = 180;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=625&fit=crop&q=80";

const PLACEHOLDER_CONNECTIONS: ConnectionCard[] = [
  {
    id: "placeholder-wife",
    name: "Wife",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=625&fit=crop&q=80",
    email: "",
    status: "placeholder",
  },
  {
    id: "placeholder-sig-other",
    name: "Significant Other",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=625&fit=crop&q=80",
    email: "",
    status: "placeholder",
  },
  {
    id: "placeholder-mom",
    name: "Mom",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=500&h=625&fit=crop&q=80",
    email: "",
    status: "placeholder",
  },
  {
    id: "placeholder-dad",
    name: "Dad",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=625&fit=crop&q=80",
    email: "",
    status: "placeholder",
  },
];

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

const otherCategories: { id: string; label: string; cards: PlaceholderCard[] }[] = [
  {
    id: "calendar", label: "Shared Calendar", cards: [
      { id: "cal-1", name: "Birthdays", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&h=625&fit=crop&q=80" },
      { id: "cal-2", name: "Anniversaries", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&h=625&fit=crop&q=80" },
      { id: "cal-3", name: "Holidays", image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500&h=625&fit=crop&q=80" },
      { id: "cal-4", name: "Date Nights", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=625&fit=crop&q=80" },
    ],
  },
  {
    id: "activity", label: "Recent Activity", cards: [
      { id: "act-1", name: "New Lists", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=625&fit=crop&q=80" },
      { id: "act-2", name: "Updated Cards", image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&h=625&fit=crop&q=80" },
      { id: "act-3", name: "Shared Items", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=625&fit=crop&q=80" },
    ],
  },
  {
    id: "occasions", label: "Occasions", cards: [
      { id: "occ-1", name: "Valentine's Day", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=625&fit=crop&q=80" },
      { id: "occ-2", name: "Christmas", image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500&h=625&fit=crop&q=80" },
      { id: "occ-3", name: "Mother's Day", image: "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=500&h=625&fit=crop&q=80" },
      { id: "occ-4", name: "Father's Day", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
      { id: "occ-5", name: "Just Because", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=625&fit=crop&q=80" },
    ],
  },
  {
    id: "memories", label: "Memories", cards: [
      { id: "mem-1", name: "First Date", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=625&fit=crop&q=80" },
      { id: "mem-2", name: "Trips Together", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=625&fit=crop&q=80" },
      { id: "mem-3", name: "Milestones", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&h=625&fit=crop&q=80" },
      { id: "mem-4", name: "Favorite Moments", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=625&fit=crop&q=80" },
    ],
  },
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
  useRegisterCarousel(totalCount, activeIndex, setActiveIndex);

  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="relative w-full h-[420px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, index) => {
            let offset = index - activeIndex;
            const half = totalCount / 2;
            if (offset > half) offset -= totalCount;
            if (offset < -half) offset += totalCount;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : 1.8;
            const opacity = isActive ? 1 : 0.5;

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
                  className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  } ${card.status === "placeholder" ? "border-2 border-dashed" : ""}`}
                  style={{
                    width: cardW,
                    height: cardH,
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

            if (absOffset > 2) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : 1.8;
            const opacity = isActive ? 1 : 0.5;

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
                  className={`overflow-hidden rounded-2xl transition-shadow duration-300 border-2 border-dashed border-white/30 flex flex-col items-center justify-center gap-2 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: cardW, height: cardH, background: "rgba(255,255,255,0.05)" }}
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
    <div className="relative flex items-center justify-center py-4">
      <div className="relative w-full h-[420px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, index) => {
            let offset = index - activeIndex;
            const half = cards.length / 2;
            if (offset > half) offset -= cards.length;
            if (offset < -half) offset += cards.length;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            const xOffset = offset * X_GAP;
            const cardW = isActive ? CARD_W : FLANK_W;
            const cardH = isActive ? CARD_H : FLANK_H;
            const scale = isActive ? 1 : 0.7 - absOffset * 0.05;
            const zIndex = 10 - absOffset;
            const blur = isActive ? 0 : 1.8;
            const opacity = isActive ? 1 : 0.5;

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
                  className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: cardW, height: cardH }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <CardEditButton title={card.name} />
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
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
  const [connections, setConnections] = useState<ConnectionCard[]>([]);
  const [openConnection, setOpenConnection] = useState<{ card: ConnectionCard; rect: { x: number; y: number; width: number; height: number } } | null>(null);

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
      return {
        id: row.id,
        name: row.display_label || (isInviter && row.invitee_email ? row.invitee_email.split("@")[0] : "Connection"),
        image: row.photo_url || DEFAULT_IMAGE,
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
        .slice(0, remainingSlots);
      setConnections([...cards, ...placeholders]);
    } else {
      setConnections(cards);
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
          labelStyle: { color: "#d4543a" },
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
