import type { CSSProperties } from "react";
import { WEB_LAYOUT_PROFILE } from "@/platform-ui/layout/web.layout";

export const WEB_MYGOTWO_STAGE_CLASS =
  "w-full overflow-x-hidden relative";

export const WEB_MYGOTWO_STAGE_STYLE: CSSProperties = {
  scrollbarWidth: "none",
  overscrollBehavior: "none",
  touchAction: "pan-y",
};

export const WEB_MYGOTWO_STAGE_SHELL_CLASS =
  "flex w-full flex-col items-center justify-start gap-6 pt-4";

export const WEB_MYGOTWO_VIEWPORT_FRAME_CLASS =
  "min-h-[calc(100dvh-var(--header-top-padding)-var(--header-icons-row-height)-var(--header-divider-margin-top)-1px)]";

export const WEB_MYGOTWO_DOT_STYLE: CSSProperties = {
  right: WEB_LAYOUT_PROFILE.coverflow.indicatorRight,
  top: `calc(${WEB_LAYOUT_PROFILE.coverflow.indicatorTop} + var(--coverflow-desktop-y-offset))`,
  transform: "translateY(-50%)",
  zIndex: 50,
};
