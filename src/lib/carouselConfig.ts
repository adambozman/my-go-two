export const CAROUSEL_LAYOUT = {
  cardWidth: 300,
  cardHeight: 420,
  flankWidth: 160,
  flankHeight: 260,
  xGap: 190,
  stageHeight: 480,
  maxVisibleOffset: 2,
  flankBlur: 0.2,
  flankOpacity: 0.5,
  borderRadius: 16,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

/** Desktop card dimensions — Figma originals × 1.4 × 1.4, website view only (≥1024px) */
export const CAROUSEL_LAYOUT_DESKTOP = {
  cardWidth: 686,
  cardHeight: 686,
  flankWidth: 175,
  flankHeight: 567,
  xGap: 0,
  stageHeight: 686,
  maxVisibleOffset: 2,
  flankBlur: 0.2,
  flankOpacity: 1,
  borderRadius: 36,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  pills: [
    { w: 686,  h: 686, r: 36  }, // center
    { w: 175,  h: 567, r: 999 }, // ±1
    { w: 104,  h: 466, r: 999 }, // ±2
    { w: 38,   h: 339, r: 999 }, // ±3
  ],
};

export const DOT_LAYOUT = {
  size: 8,
  activeColor: "var(--swatch-teal)",
  inactiveColor: "#d0c9be",
  /** Horizontal dots halfway between center-card bottom and bottom of section (nav bar) */
  bottomTopOffset: `calc(75% + ${CAROUSEL_LAYOUT.cardHeight / 4}px)`,
  bottomTransform: "translateY(-50%)",
  /** Vertical dots 16px from right edge, centered with active card */
  rightOffset: 16,
  rightTopOffset: "50%",
};

/** Header row: 24px above center-card top, title starts at 24px from left */
export const HEADER_LAYOUT = {
  /** Exactly 24px above center-card top edge */
  topOffset: (CAROUSEL_LAYOUT.stageHeight - CAROUSEL_LAYOUT.cardHeight) / 2 - 24,
  transform: "translateY(-100%)",
  leftMargin: 24,
  backArrowSize: 16,
  backArrowGap: 16,
  backArrowLeftOffset: 32,
};

/** Question card (SwipeCards) matches center card dimensions + positioning */
export const QUESTION_CARD = {
  width: CAROUSEL_LAYOUT.cardWidth,
  height: CAROUSEL_LAYOUT.cardHeight,
  borderRadius: CAROUSEL_LAYOUT.borderRadius,
  /** Question text & counter: 24px below header divider */
  textTopOffset: 24,
  /** Action buttons: 32px above bottom nav */
  buttonsBottomOffset: 32,
};
