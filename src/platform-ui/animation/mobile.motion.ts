import type { UiMotionProfile } from "@/platform-ui/types";

/**
 * Mobile motion baseline.
 * Keep this equivalent to current mobile behavior unless explicitly approved.
 */
export const MOBILE_MOTION_PROFILE: UiMotionProfile = {
  coverflow: {
    swipeThresholdPx: 40,
    swipeDominanceRatio: 1.2,
    stageEnter: {
      durationMs: 300,
      easing: [0.22, 1, 0.36, 1],
    },
    stageExit: {
      durationMs: 220,
      easing: [0.4, 0, 0.2, 1],
    },
    cardSpring: {
      stiffness: 300,
      damping: 30,
      mass: 1,
    },
  },
  dashboard: {
    pageEnter: {
      durationMs: 220,
      easing: [0.22, 1, 0.36, 1],
    },
    pageExit: {
      durationMs: 180,
      easing: [0.4, 0, 0.2, 1],
    },
  },
};

