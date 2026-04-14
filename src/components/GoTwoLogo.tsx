import type { CSSProperties } from "react";

/**
 * GoTwo logo rendered as inline SVG with the exact brand colors.
 *
 * "go"  — vertical gradient from #ef8555 (top) to #eb4b3f (bottom)
 * "TWO" — solid #00687a
 *
 * Usage:
 *   <GoTwoLogo />                        — default size
 *   <GoTwoLogo style={{ width: 200 }} /> — custom size (height scales)
 */

interface GoTwoLogoProps {
  className?: string;
  style?: CSSProperties;
}

const GoTwoLogo = ({ className, style }: GoTwoLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 180"
    className={className}
    style={{ width: "clamp(180px, 32vw, 300px)", height: "auto", ...style }}
    role="img"
    aria-label="Go Two"
  >
    <defs>
      <linearGradient id="go-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef8555" />
        <stop offset="100%" stopColor="#eb4b3f" />
      </linearGradient>
    </defs>

    {/* "go" in Dancing Script style — gradient fill */}
    <text
      x="0"
      y="140"
      fill="url(#go-grad)"
      fontFamily="'Dancing Script', cursive"
      fontWeight="600"
      fontSize="150"
      letterSpacing="-2"
    >
      go
    </text>

    {/* "TWO" in Cormorant Garamond — solid teal */}
    <text
      x="155"
      y="132"
      fill="#00687a"
      fontFamily="'Cormorant Garamond', serif"
      fontWeight="700"
      fontSize="165"
      letterSpacing="-4"
    >
      TWO
    </text>
  </svg>
);

export default GoTwoLogo;
