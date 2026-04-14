// VibeIcon.tsx — Maps onboarding option IDs to Phosphor duotone icons
// Used across ALL onboarding screens for consistent iconography.

import type { Icon } from "@phosphor-icons/react";
import {
  // ── Vibe icons ──────────────────────────────────────────────
  Fire, FlowerLotus, Lightning, GameController, Hoodie, Sunglasses,
  Sneaker, Barbell, SquaresFour, ShirtFolded, Mountains, Laptop,
  Sparkle, SneakerMove, Leaf, Dress, PersonSimpleRun, Books,
  Rainbow, GridFour, Palette, Armchair, Heart, Plant,
  Coffee, Tent, Briefcase, Buildings, PersonSimpleHike,
  Diamond, PersonSimpleTaiChi, Crown, Flower, Airplane,
  PaintBrush, FlowerTulip, MusicNotes, Eyeglasses, Couch,
  Watch, Golf, Wine, Globe, House, HouseLine,
  Star, Pill, TennisBall, MaskHappy,
  BookOpen, Brain, Tree, SuitcaseRolling,

  // ── Category priority icons (Screen 2) ──────────────────────
  TShirt, HandHeart, Heartbeat, Gift, ForkKnife, CoffeeBean,
  HouseSimple, MusicNote, MapPin,

  // ── Shopping behavior icons (Screen 7) ──────────────────────
  ShoppingCart, Storefront, ArrowsLeftRight, MagnifyingGlass,
  LightningA, Tag,

  // ── Subscription icons (Screen 7) ────────────────────────────
  Package, Scooter, Basket, CookingPot, FilmStrip, Cube, XCircle,
  MusicNotesPlus, Headphones, YoutubeLogo, CloudArrowUp,
  Newspaper, BookBookmark,

  // ── Gift personality icons (Screen 7) ────────────────────────
  Confetti, Wrench, Ticket, HandsPraying, Question,
} from "@phosphor-icons/react";

// ── Master icon map: option ID → Phosphor component ───────────────────────────

const ICON_MAP: Record<string, Icon> = {
  // ── Screen 2: Category Priority ─────────────────────────────
  clothes:       TShirt,
  personal:      Sparkle,
  health:        Heartbeat,
  gifts:         Gift,
  dining:        ForkKnife,
  beverages:     CoffeeBean,
  household:     HouseSimple,
  entertainment: MusicNote,
  travel:        MapPin,

  // ── Screen 3: Vibe — Teen Neutral ───────────────────────────
  trendy_explorer:   Fire,
  chill_aesthetic:    FlowerLotus,
  hype_sports:       Lightning,
  gamer_tech:        GameController,
  alt_edge:          Hoodie,
  laid_back:         Sunglasses,

  // ── Screen 3: Vibe — Young Man ──────────────────────────────
  streetwear:        Sneaker,
  athletic_hustle:   Barbell,
  clean_minimal:     SquaresFour,
  business_casual:   ShirtFolded,
  outdoorsy:         Mountains,
  tech_forward:      Laptop,

  // ── Screen 3: Vibe — Young Woman ────────────────────────────
  clean_girl:        Sparkle,
  streetwear_queen:  SneakerMove,
  cottage_core:      Leaf,
  glam_going_out:    Dress,
  athleisure:        PersonSimpleRun,
  dark_academia:     Books,

  // ── Screen 3: Vibe — Young NB ──────────────────────────────
  gender_fluid:      Rainbow,
  minimal_cool:      GridFour,
  alt_experimental:  Palette,
  cozy_casual:       Armchair,
  streetwear_edge:   Heart,
  wellness_first:    Plant,

  // ── Screen 3: Vibe — Adult Man ──────────────────────────────
  smart_casual:      ShirtFolded,
  outdoorsy_dad:     Tent,
  minimalist_pro:    SquaresFour,
  urban_explorer:    Buildings,
  fitness_focused:   Barbell,
  homebody_quality:  Coffee,

  // ── Screen 3: Vibe — Adult Woman ────────────────────────────
  polished_minimal:  Diamond,
  wellness_ritual:   PersonSimpleTaiChi,
  fashion_forward:   Crown,
  cozy_home_lover:   Flower,
  career_driven:     Briefcase,
  adventure_seeker:  Airplane,

  // ── Screen 3: Vibe — Adult NB ──────────────────────────────
  quiet_luxury_nb:   Diamond,
  creative_class:    PaintBrush,
  wellness_centered: FlowerTulip,
  urban_culture:     MusicNotes,
  practical_smart:   Eyeglasses,
  comfort_aesthetic: Couch,

  // ── Screen 3: Vibe — Mature Man ────────────────────────────
  classic_refined:   Watch,
  active_outdoors:   PersonSimpleHike,
  home_entertainer:  Wine,
  tech_savvy_pro:    Laptop,
  traveler_explorer: Globe,
  no_fuss_quality:   House,

  // ── Screen 3: Vibe — Mature Woman ──────────────────────────
  effortlessly_chic: Star,
  wellness_expert:   Pill,
  home_luxury:       HouseLine,
  active_living:     TennisBall,
  experience_seeker: MaskHappy,
  understated_style: Diamond,

  // ── Screen 3: Vibe — Mature NB ─────────────────────────────
  contemplative:     BookOpen,
  active_wellness:   PersonSimpleTaiChi,
  creative_spirit:   Palette,
  homebody_curator:  Flower,
  seasoned_traveler: SuitcaseRolling,
  invest_in_quality: Diamond,

  // ── Screen 7: Shopping Behavior ─────────────────────────────
  online_mostly:     ShoppingCart,
  instore_mostly:    Storefront,
  mix:               ArrowsLeftRight,
  research_then_buy: MagnifyingGlass,
  impulse:           LightningA,
  deal_hunter:       Tag,

  // ── Screen 7: Subscription Habits (age-segmented) ─────────────
  amazon_prime:      Package,
  doordash:          Scooter,
  grocery_del:       Basket,
  meal_kit:          CookingPot,
  streaming:         FilmStrip,
  sub_box:           Cube,
  none:              XCircle,
  spotify:           MusicNotesPlus,
  gaming_sub:        GameController,
  youtube_premium:   YoutubeLogo,
  roblox_premium:    GameController,
  kindle_unlimited:  BookBookmark,
  food_delivery:     Scooter,
  gym_membership:    Barbell,
  cloud_storage:     CloudArrowUp,
  grocery_delivery:  Basket,
  wine_club:         Wine,
  news_sub:          Newspaper,
  audible:           Headphones,

  // ── Screen 7: Gift Personality ──────────────────────────────
  splurge:           Confetti,
  practical:         Wrench,
  experience:        Ticket,
  thoughtful:        HandsPraying,
  surprise:          Question,
};

interface VibeIconProps {
  vibeId: string;
  size?: number;
  className?: string;
}

/** Renders a Phosphor duotone icon for a given option ID. Returns null if no icon mapped. */
const VibeIcon = ({ vibeId, size = 22, className }: VibeIconProps) => {
  const IconComponent = ICON_MAP[vibeId];
  if (!IconComponent) return null;
  return (
    <IconComponent
      weight="duotone"
      size={size}
      className={className}
      style={{ flexShrink: 0 }}
    />
  );
};

export default VibeIcon;
