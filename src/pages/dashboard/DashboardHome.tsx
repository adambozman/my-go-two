import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRegisterCarousel } from "@/contexts/CarouselDotsContext";
import SnapScrollLayout from "@/components/SnapScrollLayout";
import CardEditButton from "@/components/CardEditButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CARD_W = 280;
const CARD_H = 380;
const FLANK_W = 160;
const FLANK_H = 260;
const X_GAP = 180;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

interface PlaceholderCard {
  id: string;
  name: string;
  image: string;
}

interface ConnectionData {
  labels: Record<string, string>;
  images: Record<string, string>;
}

const defaultConnectionCards: PlaceholderCard[] = [
  { id: "conn-1", name: "Partner", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=625&fit=crop&q=80" },
  { id: "conn-2", name: "Best Friend", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=625&fit=crop&q=80" },
  { id: "conn-3", name: "Mom", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=625&fit=crop&q=80" },
  { id: "conn-4", name: "Dad", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
  { id: "conn-5", name: "Sibling", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=625&fit=crop&q=80" },
];

const homeCategories: { id: string; label: string; cards: PlaceholderCard[] }[] = [
  { id: "connections", label: "Your Connections", cards: defaultConnectionCards },
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
   HOME CAROUSEL
   ═══════════════════════════════════════════ */

const HomeCoverFlow = ({
  cards,
  connectionData,
  onSaveConnection,
  isConnectionCategory,
}: {
  cards: PlaceholderCard[];
  connectionData?: ConnectionData;
  onSaveConnection?: (cardId: string, newLabel: string, newImage: string) => void;
  isConnectionCategory?: boolean;
}) => {
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

            const displayName = (isConnectionCategory && connectionData?.labels?.[card.id]) || card.name;
            const displayImage = (isConnectionCategory && connectionData?.images?.[card.id]) || card.image;

            return (
              <motion.div
                key={card.id}
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={SPRING}
                className="absolute cursor-pointer"
                style={{ zIndex }}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
              >
                <div
                  className={`overflow-hidden rounded-2xl transition-shadow duration-300 ${
                    isActive ? "ring-2 ring-primary shadow-2xl" : ""
                  }`}
                  style={{ width: cardW, height: cardH }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <CardEditButton
                      title={displayName}
                      maxLength={20}
                      isConnection={isConnectionCategory}
                      currentImage={displayImage}
                      onSaveConnection={
                        isConnectionCategory && onSaveConnection
                          ? (newLabel, newImage) => onSaveConnection(card.id, newLabel, newImage)
                          : undefined
                      }
                    />
                    <img
                      src={displayImage}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="card-title leading-tight">
                        {displayName}
                      </h3>
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
  const [connectionLabels, setConnectionLabels] = useState<Record<string, string>>({});

  // Load saved connection labels from user_preferences.profile_answers
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("user_preferences")
        .select("profile_answers")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data?.profile_answers && typeof data.profile_answers === "object") {
        const answers = data.profile_answers as Record<string, any>;
        if (answers.connection_labels) {
          setConnectionLabels(answers.connection_labels);
        }
      }
    };
    load();
  }, [user]);

  const handleRenameConnection = useCallback(
    async (cardId: string, newLabel: string) => {
      if (!user) return;
      const updated = { ...connectionLabels, [cardId]: newLabel };
      setConnectionLabels(updated);

      // Persist to DB — merge into profile_answers JSONB
      const { data: existing } = await supabase
        .from("user_preferences")
        .select("profile_answers")
        .eq("user_id", user.id)
        .maybeSingle();

      const currentAnswers =
        existing?.profile_answers && typeof existing.profile_answers === "object"
          ? (existing.profile_answers as Record<string, any>)
          : {};

      const { error } = await supabase
        .from("user_preferences")
        .update({
          profile_answers: { ...currentAnswers, connection_labels: updated },
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Failed to save label:", error);
        toast.error("Failed to save label");
      }
    },
    [user, connectionLabels]
  );

  return (
    <div className="h-full relative">
      <SnapScrollLayout
        sections={homeCategories.map((cat) => ({
          id: cat.id,
          label: cat.label,
          labelStyle: { color: "#d4543a" },
          content: (
            <HomeCoverFlow
              cards={cat.cards}
              isConnectionCategory={cat.id === "connections"}
              connectionLabels={connectionLabels}
              onRenameConnection={handleRenameConnection}
            />
          ),
        }))}
      />
    </div>
  );
};

export default DashboardHome;
