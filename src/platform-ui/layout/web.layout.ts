import type { UiLayoutProfile } from "@/platform-ui/types";

/**
 * Web-only layout baseline.
 * This mirrors current behavior and is intended to be evolved for web redesign work.
 */
export const WEB_LAYOUT_PROFILE: UiLayoutProfile = {
  coverflow: {
    stageMarginTop: 44,
    indicatorRight: 18,
    indicatorTop: "calc(var(--header-height) + (100vh - var(--header-height)) / 2 + 23px)",
  },
  dashboard: {
    contentPaddingX: 32,
    contentPaddingBottom: 0,
  },
};

