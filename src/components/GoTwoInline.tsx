import type { CSSProperties } from "react";
import gotwoTransparentNew from "@/assets/GoTwoTransparentNew.png";

/**
 * Inline logo mark for embedding "Go Two" inside running text.
 *
 * Renders the brand PNG at a height that matches the surrounding
 * line height so it reads like a word. Use this EVERYWHERE the
 * phrase "Go Two" would otherwise appear as plain text — this is
 * a trademark / legal requirement.
 *
 * Usage:
 *   <p>Welcome to <GoTwoInline />!</p>
 *   <span>My <GoTwoInline /></span>
 */

interface GoTwoInlineProps {
  /** Override height — defaults to 1em (matches surrounding text). */
  height?: string;
  className?: string;
  style?: CSSProperties;
}

const GoTwoInline = ({
  height = "0.9em",
  className = "",
  style,
}: GoTwoInlineProps) => (
  <img
    src={gotwoTransparentNew}
    alt="Go Two"
    aria-label="Go Two"
    className={className}
    style={{
      display: "inline",
      height,
      width: "auto",
      verticalAlign: "baseline",
      objectFit: "contain",
      ...style,
    }}
  />
);

export default GoTwoInline;
