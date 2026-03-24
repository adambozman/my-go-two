import type { UiMotionProfile } from "@/platform-ui/types";

/**
 * Web-only motion baseline.
 * Intended to evolve independently for web animation redesign.
 */
export const WEB_MOTION_PROFILE: UiMotionProfile = {
  coverflow: {
    swipeThresholdPx: 50,
    swipeDominanceRatio: 1.5,
    stageEnter: {
      durationMs: 320,
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
      durationMs: 240,
      easing: [0.22, 1, 0.36, 1],
    },
    pageExit: {
      durationMs: 180,
      easing: [0.4, 0, 0.2, 1],
    },
  },
};

