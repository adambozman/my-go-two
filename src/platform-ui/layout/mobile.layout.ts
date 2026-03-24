import type { UiLayoutProfile } from "@/platform-ui/types";

/**
 * Mobile baseline layout profile.
 * Keep aligned with current mobile behavior unless explicitly approved to change.
 */
export const MOBILE_LAYOUT_PROFILE: UiLayoutProfile = {
  coverflow: {
    stageMarginTop: 24,
    indicatorRight: 16,
    indicatorTop: "50%",
  },
  dashboard: {
    contentPaddingX: 12,
    contentPaddingBottom: 16,
  },
};

