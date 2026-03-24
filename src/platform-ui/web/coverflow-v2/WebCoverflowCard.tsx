import { motion } from "framer-motion";
import { useState } from "react";
import { Pill } from "@/components/ui/pill";
import InlinePhotoSearch from "@/components/InlinePhotoSearch";
import type { WebCoverflowCardPose, WebCoverflowItem } from "@/platform-ui/web/coverflow-v2/types";
import { WEB_COVERFLOW_MOTION } from "@/platform-ui/web/coverflow-v2/webCoverflow.motion";
import { WEB_COVERFLOW_TOKENS } from "@/platform-ui/web/coverflow-v2/webCoverflow.tokens";

interface WebCoverflowCardProps {
  item: WebCoverflowItem;
  pose: WebCoverflowCardPose;
  sectionTitle?: string;
  onActivate: () => void;
  onCommit: () => void;
  imageFailed: boolean;
  onImageError: () => void;
}

export function WebCoverflowCard({
  item,
  pose,
  sectionTitle,
  onActivate,
  onCommit,
  imageFailed,
  onImageError,
}: WebCoverflowCardProps) {
  const isVisible = pose.depth <= WEB_COVERFLOW_TOKENS.visibleEachSide;
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  const hoverLift = isHovered ? (pose.isActive ? -12 : -8) : 0;
  const hoverScale = isHovered ? (pose.isActive ? 1.025 : 1.015) : 1;

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{
        transform: `translate(-50%, -50%) translate3d(${pose.x}px, ${pose.y + hoverLift}px, 0px) rotateY(${pose.rotateY}deg) scale(${pose.scale * hoverScale})`,
        opacity: pose.opacity,
      }}
      transition={WEB_COVERFLOW_MOTION.card}
      className="absolute left-1/2 top-1/2 overflow-hidden border-0 bg-transparent p-0"
      style={{
        width: WEB_COVERFLOW_TOKENS.cardWidth,
        height: WEB_COVERFLOW_TOKENS.cardHeight,
        top: WEB_COVERFLOW_TOKENS.centerY,
        borderRadius: WEB_COVERFLOW_TOKENS.borderRadius,
        zIndex: pose.zIndex,
        boxShadow: pose.isActive ? WEB_COVERFLOW_TOKENS.activeShadow : WEB_COVERFLOW_TOKENS.flankShadow,
        transformStyle: "preserve-3d",
        cursor: pose.isActive ? "pointer" : "pointer",
      }}
      onClick={() => {
        if (pose.isActive) onCommit();
        else onActivate();
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={item.label}
    >
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: WEB_COVERFLOW_TOKENS.borderRadius }}>
        <div className="absolute inset-0" style={{ background: WEB_COVERFLOW_TOKENS.fallbackBackground }} />
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.label}
            className="absolute inset-0 h-full w-full object-cover"
            onError={onImageError}
          />
        ) : null}

        {pose.isActive ? <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-transparent" /> : null}

        {pose.isActive ? (
          <>
            <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2">
              {sectionTitle ? (
                <Pill
                  variant="title"
                  size="default"
                  className="text-[var(--swatch-teal)]"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(250,244,236,0.86) 100%)",
                    border: "1px solid rgba(255,255,255,0.88)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    fontSize: 14,
                  }}
                >
                  {sectionTitle}
                </Pill>
              ) : null}
              <Pill variant="title" size="default">
                {item.label}
              </Pill>
            </div>
            <InlinePhotoSearch imageKey={item.imageKey || item.id} label={item.label} />
          </>
        ) : null}
      </div>
    </motion.button>
  );
}
