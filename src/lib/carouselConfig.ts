export const CAROUSEL_LAYOUT = {
  cardWidth: 300,
  cardHeight: 420,
  flankWidth: 160,
  flankHeight: 260,
  xGap: 190,
  stageHeight: 480,
  maxVisibleOffset: 2,
  flankBlur: 1.8,
  flankOpacity: 0.5,
  borderRadius: 16,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

export const DOT_LAYOUT = {
  size: 8,
  activeColor: "var(--swatch-teal)",
  inactiveColor: "#d0c9be",
  /** Horizontal dots centered 24px below center-card bottom */
  bottomTopOffset: `calc(50% + ${CAROUSEL_LAYOUT.cardHeight / 2 + 24}px)`,
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
