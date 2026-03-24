export type UiPlatform = "web" | "mobile";

export type CubicBezier = [number, number, number, number];

export interface SpringMotionToken {
  stiffness: number;
  damping: number;
  mass?: number;
}

export interface TimedMotionToken {
  durationMs: number;
  easing: CubicBezier;
}

export interface CoverflowMotionProfile {
  swipeThresholdPx: number;
  swipeDominanceRatio: number;
  stageEnter: TimedMotionToken;
  stageExit: TimedMotionToken;
  cardSpring: SpringMotionToken;
}

export interface DashboardMotionProfile {
  pageEnter: TimedMotionToken;
  pageExit: TimedMotionToken;
}

export interface UiMotionProfile {
  coverflow: CoverflowMotionProfile;
  dashboard: DashboardMotionProfile;
}

export interface CoverflowLayoutProfile {
  stageMarginTop: number;
  indicatorRight: number;
  indicatorTop: string;
}

export interface DashboardLayoutProfile {
  contentPaddingX: number;
  contentPaddingBottom: number;
}

export interface UiLayoutProfile {
  coverflow: CoverflowLayoutProfile;
  dashboard: DashboardLayoutProfile;
}
