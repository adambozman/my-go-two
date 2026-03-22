/** Fluid helper: scales a base px value between 320px and 1024px viewports */
function fluidPx(min: number, max: number): number {
  if (typeof window === "undefined") return max;
  const vw = window.innerWidth;
  if (vw >= 1024) return max;
  if (vw <= 320) return min;
  return Math.round(min + (max - min) * ((vw - 320) / (1024 - 320)));
}

/** Returns fluid mobile layout values — call at render time */
export function getFluidMobileLayout() {
  const cardW = fluidPx(200, 260);
  const cardH = cardW; // keep square
  const xGap = fluidPx(120, 160);
  const stageH = fluidPx(260, 320);
  const flankW = fluidPx(100, 140);
  const flankH = fluidPx(170, 220);
  const pillCenter = { w: cardW, h: cardH, r: 16 };
  const pill1 = { w: fluidPx(50, 66), h: fluidPx(160, 210), r: 999 };
  const pill2 = { w: fluidPx(30, 40), h: fluidPx(130, 170), r: 999 };
  const pill3 = { w: fluidPx(12, 15), h: fluidPx(95, 124), r: 999 };
  return {
    cardWidth: cardW,
    cardHeight: cardH,
    flankWidth: flankW,
    flankHeight: flankH,
    xGap,
    stageHeight: stageH,
    maxVisibleOffset: 2,
    flankBlur: 0.2,
    flankOpacity: 1,
    borderRadius: 16,
    spring: { type: "spring" as const, stiffness: 300, damping: 30 },
    pills: [pillCenter, pill1, pill2, pill3],
  };
}

export const CAROUSEL_LAYOUT = {
  cardWidth: 260,
  cardHeight: 260,
  flankWidth: 140,
  flankHeight: 220,
  xGap: 160,
  stageHeight: 320,
  maxVisibleOffset: 2,
  flankBlur: 0.2,
  flankOpacity: 1,
  borderRadius: 16,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  pills: [
    { w: 260, h: 260, r: 16  }, // center
    { w: 66,  h: 210, r: 999 }, // ±1
    { w: 40,  h: 170, r: 999 }, // ±2
    { w: 15,  h: 124, r: 999 }, // ±3
  ],
};

/** Desktop card dimensions — Figma originals × 1.4 × 1.4, website view only (≥1024px) */
export const CAROUSEL_LAYOUT_DESKTOP = {
  cardWidth: 686,
  cardHeight: 734,
  flankWidth: 178,
  flankHeight: 598,
  xGap: 0,
  stageHeight: 734,
  maxVisibleOffset: 2,
  flankBlur: 0.2,
  flankOpacity: 1,
  borderRadius: 36,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  pills: [
    { w: 686,  h: 734, r: 36  }, // center
    { w: 178,  h: 598, r: 999 }, // ±1
    { w: 106,  h: 488, r: 999 }, // ±2
    { w: 40,   h: 354, r: 999 }, // ±3
  ],
};

/** Form card layout — taller active card for entry forms */
export const FORM_CAROUSEL_LAYOUT = {
  ...CAROUSEL_LAYOUT,
  cardWidth: 280,
  cardHeight: 460,
  stageHeight: 520,
  pills: [
    { w: 280, h: 460, r: 16  }, // center
    { w: 66,  h: 290, r: 999 }, // ±1
    { w: 40,  h: 230, r: 999 }, // ±2
    { w: 15,  h: 170, r: 999 }, // ±3
  ],
};

export const FORM_CAROUSEL_LAYOUT_DESKTOP = {
  ...CAROUSEL_LAYOUT_DESKTOP,
  cardWidth: 460,
  cardHeight: 686,
  stageHeight: 686,
  pills: [
    { w: 460,  h: 686, r: 36  }, // center
    { w: 120,  h: 567, r: 999 }, // ±1
    { w: 70,   h: 466, r: 999 }, // ±2
    { w: 30,   h: 339, r: 999 }, // ±3
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
