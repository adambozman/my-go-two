// VibeIcon.tsx — Maps vibe option IDs to Phosphor duotone icons
// Used by Onboarding.tsx to render proper icons instead of emoji on vibe cards.

import type { Icon } from "@phosphor-icons/react";
import {
  // Teen neutral
  Fire, FlowerLotus, Lightning, GameController, Hoodie, Sunglasses,
  // Young man
  Sneaker, Barbell, SquaresFour, ShirtFolded, Mountains, Laptop,
  // Young woman
  Sparkle, SneakerMove, Leaf, Dress, PersonSimpleRun, Books,
  // Young NB
  Rainbow, GridFour, Palette, Armchair, Heart, Plant,
  // Adult man
  Coffee, Tent, Briefcase, Buildings, PersonSimpleHike,
  // Adult woman
  Diamond, PersonSimpleTaiChi, Crown, Flower, Airplane,
  // Adult NB
  PaintBrush, FlowerTulip, MusicNotes, Eyeglasses, Couch,
  // Mature man
  Watch, Golf, Wine, Globe, House,
  // Mature woman
  Star, Pill, HouseLine, TennisBall, MaskHappy,
  // Mature NB
  BookOpen, Brain, Tree, SuitcaseRolling,
} from "@phosphor-icons/react";

// Map vibe IDs → Phosphor icon component
const VIBE_ICON_MAP: Record<string, Icon> = {
  // ── Teen Neutral ──────────────────────────────────
  trendy_explorer:   Fire,
  chill_aesthetic:    FlowerLotus,
  hype_sports:       Lightning,
  gamer_tech:        GameController,
  alt_edge:          Hoodie,
  laid_back:         Sunglasses,

  // ── Young Man ─────────────────────────────────────
  streetwear:        Sneaker,
  athletic_hustle:   Barbell,
  clean_minimal:     SquaresFour,
  business_casual:   ShirtFolded,
  outdoorsy:         Mountains,
  tech_forward:      Laptop,

  // ── Young Woman ───────────────────────────────────
  clean_girl:        Sparkle,
  streetwear_queen:  SneakerMove,
  cottage_core:      Leaf,
  glam_going_out:    Dress,
  athleisure:        PersonSimpleRun,
  dark_academia:     Books,

  // ── Young NB ──────────────────────────────────────
  gender_fluid:      Rainbow,
  minimal_cool:      GridFour,
  alt_experimental:  Palette,
  cozy_casual:       Armchair,
  streetwear_edge:   Heart,
  wellness_first:    Plant,

  // ── Adult Man ─────────────────────────────────────
  smart_casual:      ShirtFolded,
  outdoorsy_dad:     Tent,
  minimalist_pro:    SquaresFour,
  urban_explorer:    Buildings,
  fitness_focused:   Barbell,
  homebody_quality:  Coffee,

  // ── Adult Woman ───────────────────────────────────
  polished_minimal:  Diamond,
  wellness_ritual:   PersonSimpleTaiChi,
  fashion_forward:   Crown,
  cozy_home_lover:   Flower,
  career_driven:     Briefcase,
  adventure_seeker:  Airplane,

  // ── Adult NB ──────────────────────────────────────
  quiet_luxury_nb:   Diamond,
  creative_class:    PaintBrush,
  wellness_centered: FlowerTulip,
  urban_culture:     MusicNotes,
  practical_smart:   Eyeglasses,
  comfort_aesthetic: Couch,

  // ── Mature Man ────────────────────────────────────
  classic_refined:   Watch,
  active_outdoors:   PersonSimpleHike,
  home_entertainer:  Wine,
  tech_savvy_pro:    Laptop,
  traveler_explorer: Globe,
  no_fuss_quality:   House,

  // ── Mature Woman ──────────────────────────────────
  effortlessly_chic: Star,
  wellness_expert:   Pill,
  home_luxury:       HouseLine,
  active_living:     TennisBall,
  experience_seeker: MaskHappy,
  understated_style: Diamond,

  // ── Mature NB ─────────────────────────────────────
  contemplative:     BookOpen,
  active_wellness:   PersonSimpleTaiChi,
  creative_spirit:   Palette,
  homebody_curator:  Flower,
  seasoned_traveler: SuitcaseRolling,
  invest_in_quality: Diamond,
};

interface VibeIconProps {
  vibeId: string;
  size?: number;
  className?: string;
}

/** Renders a Phosphor duotone icon for a given vibe option ID. Falls back to Sparkle. */
const VibeIcon = ({ vibeId, size = 22, className }: VibeIconProps) => {
  const IconComponent = VIBE_ICON_MAP[vibeId] ?? Sparkle;
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
