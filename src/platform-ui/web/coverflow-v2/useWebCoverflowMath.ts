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
  const direction = relative === 0 ? 0 : relative > 0 ? 1 : -1;
  const poseByDepth = [
    { x: 0, y: -26, rotateY: 0, scale: 1, opacity: 1 },
    { x: 152, y: -6, rotateY: -10, scale: 0.93, opacity: 1 },
    { x: 266, y: 8, rotateY: -16, scale: 0.86, opacity: 0.98 },
    { x: 358, y: 18, rotateY: -22, scale: 0.8, opacity: 0.96 },
  ] as const;
  const cappedDepth = Math.min(depth, poseByDepth.length - 1);
  const basePose = poseByDepth[cappedDepth];
  const scale = basePose.scale;
  const opacity = basePose.opacity;

  return {
    relative,
    depth,
    isActive,
    x: basePose.x * direction,
    y: basePose.y,
    rotateY: basePose.rotateY * direction,
    scale,
    opacity,
    zIndex: 200 - depth,
  };
}

export function normalizeActiveIndex(nextIndex: number, itemCount: number) {
  return normalizeIndex(nextIndex, itemCount);
}
