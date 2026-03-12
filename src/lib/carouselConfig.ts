export const CAROUSEL_LAYOUT = {
  cardWidth: 280,
  cardHeight: 380,
  flankWidth: 160,
  flankHeight: 260,
  xGap: 180,
  stageHeight: 420,
  maxVisibleOffset: 2,
  flankBlur: 1.8,
  flankOpacity: 0.5,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

export const DOT_LAYOUT = {
  size: 8,
  bottomOffset: "4%",
  rightOffsetClass: "right-3",
  rightTopOffset: "25%",
  activeColor: "var(--swatch-teal)",
  inactiveColor: "rgba(200, 200, 200, 0.6)",
};

/** Global section-header positioning above carousel stage */
export const HEADER_LAYOUT = {
  /**
   * Bottom edge of header row sits 24px above active card top.
   * cardTopInStage = (stageHeight - cardHeight) / 2 + 16 (py-4)
   */
  topOffset: ((CAROUSEL_LAYOUT.stageHeight - CAROUSEL_LAYOUT.cardHeight) / 2) + 16 - 24,
  /** CSS transform to shift fully above */
  transform: "translateY(-100%)",
};
