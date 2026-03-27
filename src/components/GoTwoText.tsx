import type { CSSProperties } from "react";
import gotwoScriptLockup from "@/assets/logos/gotwo-script-lockup.svg";

interface GoTwoTextProps {
  alt?: string;
  className?: string;
  style?: CSSProperties;
  variant?: "classic" | "script";
}

const GoTwoText = ({
  alt = "GoTwo",
  className = "",
  style,
  variant = "classic",
}: GoTwoTextProps) => {
  if (variant === "script") {
    return (
      <span className={`logo-lockup ${className}`.trim()} style={style}>
        <img
          alt={alt}
          className="logo-mark-script"
          src={gotwoScriptLockup}
        />
      </span>
    );
  }

  return (
    <span className={`logo-text ${className}`.trim()} style={style}>
      <span className="go">Go</span>
      <span className="two">Two</span>
    </span>
  );
};

export default GoTwoText;
