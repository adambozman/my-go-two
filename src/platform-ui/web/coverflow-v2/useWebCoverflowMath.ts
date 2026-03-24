import type { WebCoverflowCardPose } from "@/platform-ui/web/coverflow-v2/types";
import { WEB_COVERFLOW_TOKENS } from "@/platform-ui/web/coverflow-v2/webCoverflow.tokens";

function normalizeIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function shortestRelative(index: number, activeIndex: number, length: number) {
  if (length <= 0) return 0;
  let delta = normalizeIndex(index - activeIndex, length);
  if (delta > length / 2) delta -= length;
  return delta;
}

export function getWebCoverflowPose(index: number, activeIndex: number, itemCount: number): WebCoverflowCardPose {
  const relative = shortestRelative(index, activeIndex, itemCount);
  const depth = Math.abs(relative);
  const isActive = depth === 0;
  const scale = isActive
    ? 1
    : Math.max(WEB_COVERFLOW_TOKENS.minScale, 1 - depth * WEB_COVERFLOW_TOKENS.inactiveScaleStep);
  const opacity = isActive ? 1 : Math.max(0, 1 - depth * WEB_COVERFLOW_TOKENS.opacityStep);

  return {
    relative,
    depth,
    isActive,
    x: relative * WEB_COVERFLOW_TOKENS.xStep,
    y: depth * WEB_COVERFLOW_TOKENS.yStep,
    rotateY: relative * WEB_COVERFLOW_TOKENS.rotateYStep,
    scale,
    opacity,
    zIndex: 200 - depth,
  };
}

export function normalizeActiveIndex(nextIndex: number, itemCount: number) {
  return normalizeIndex(nextIndex, itemCount);
}
