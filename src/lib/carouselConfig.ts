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

/** Test page desktop layout — Figma originals × 1.4, each offset has its own pill size */
export const CAROUSEL_LAYOUT_TEST_DESKTOP = {
  cardWidth: 725,
  cardHeight: 490,
  flankWidth: 125,
  flankHeight: 405,
  xGap: 440,
  stageHeight: 540,
  maxVisibleOffset: 2,
  flankBlur: 0.2,
  flankOpacity: 1,
  borderRadius: 36,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  pills: [
    { w: 725, h: 490, r: 36  },
    { w: 125, h: 405, r: 999 },
    { w: 74,  h: 333, r: 999 },
    { w: 27,  h: 242, r: 999 },
  ],
};

/** Desktop card dimensions — used by CoverFlowCarousel on md+ screens */
export const CAROUSEL_LAYOUT_DESKTOP = {
  cardWidth: 420,
  cardHeight: 560,
  flankWidth: 220,
  flankHeight: 340,
  xGap: 260,
  stageHeight: 640,
  maxVisibleOffset: 2,
  flankBlur: 0.2,
  flankOpacity: 0.5,
  borderRadius: 16,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
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
