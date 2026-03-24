import type { UiPlatform } from "@/platform-ui/types";

export const WEB_BREAKPOINT_PX = 1024;

export function getUiPlatformFromWidth(width: number): UiPlatform {
  return width >= WEB_BREAKPOINT_PX ? "web" : "mobile";
}

export function getCurrentUiPlatform(): UiPlatform {
  if (typeof window === "undefined") return "web";
  return getUiPlatformFromWidth(window.innerWidth);
}
