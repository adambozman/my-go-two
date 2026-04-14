import type { CSSProperties } from "react";

/**
 * Inline styled text for embedding "Go Two" inside running text.
 *
 * Renders "Go" in the brand coral gradient and "Two" in the brand teal,
 * matching the surrounding font size so it reads naturally as a word.
 *
 * Usage:
 *   <p>Welcome to <GoTwoInline />!</p>
 *   <span>My <GoTwoInline /></span>
 */

interface GoTwoInlineProps {
  className?: string;
  style?: CSSProperties;
}

const GoTwoInline = ({ className = "", style }: GoTwoInlineProps) => (
  <span
    className={className}
    style={{
      fontWeight: 700,
      letterSpacing: "-0.01em",
      whiteSpace: "nowrap",
      ...style,
    }}
    aria-label="Go Two"
  >
    <span
      style={{
        background: "linear-gradient(180deg, #ef8555, #eb4b3f)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Go
    </span>
    {" "}
    <span style={{ color: "#00687a" }}>Two</span>
  </span>
);

export default GoTwoInline;
