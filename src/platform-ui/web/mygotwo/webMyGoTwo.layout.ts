import type { CSSProperties } from "react";
import { WEB_LAYOUT_PROFILE } from "@/platform-ui/layout/web.layout";

export const WEB_MYGOTWO_STAGE_CLASS =
  "relative h-full min-h-0 w-full overflow-x-hidden";

export const WEB_MYGOTWO_STAGE_STYLE: CSSProperties = {
  scrollbarWidth: "none",
  overscrollBehavior: "none",
  touchAction: "pan-y",
};

export const WEB_MYGOTWO_STAGE_SHELL_CLASS =
  "grid h-full w-full min-h-0 grid-rows-[auto_minmax(0,1fr)] items-center";

export const WEB_MYGOTWO_FRAME_CLASS =
  "grid h-full min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[32px] border border-[rgba(39,94,143,0.28)] px-6 pb-5 pt-3";

export const WEB_MYGOTWO_QUOTE_BOX_CLASS =
  "flex min-h-[92px] items-start justify-center overflow-visible";

export const WEB_MYGOTWO_CONTENT_BOX_CLASS =
  "relative min-h-0 overflow-hidden";

export const WEB_MYGOTWO_DOT_STYLE: CSSProperties = {
  right: WEB_LAYOUT_PROFILE.coverflow.indicatorRight,
  top: `calc(${WEB_LAYOUT_PROFILE.coverflow.indicatorTop} + var(--coverflow-desktop-y-offset))`,
  transform: "translateY(-50%)",
  zIndex: 50,
};
