import type { SVGProps } from "react";

type HandDrawnArrowProps = SVGProps<SVGSVGElement> & {
  direction?: "left" | "right";
};

function HandDrawnArrowBase({
  direction = "right",
  className,
  ...props
}: HandDrawnArrowProps) {
  const flipped = direction === "left";

  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g transform={flipped ? "translate(72 0) scale(-1 1)" : undefined}>
        <path
          d="M9 36.5C14.4 31.8 20 29.4 25.8 29.1C30.6 28.8 34.7 30.1 37.6 32.2C40.8 34.4 42.8 37.7 46.7 39.2C51.4 40.9 56.7 39.6 62.4 35.5"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M53.3 26.8C57.9 29.7 60.8 32.6 62.5 35.4"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M53.7 43.5C58.3 40.7 61.1 38 62.4 35.4"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function HandDrawnArrowRight(props: SVGProps<SVGSVGElement>) {
  return <HandDrawnArrowBase direction="right" {...props} />;
}

export function HandDrawnArrowLeft(props: SVGProps<SVGSVGElement>) {
  return <HandDrawnArrowBase direction="left" {...props} />;
}
