import type { CSSProperties } from "react";
import gotwoTransparentNew from "@/assets/GoTwoTransparentNew.png";

interface GoTwoTextProps {
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

const GoTwoText = ({
  alt = "GoTwo",
  className = "",
  style,
}: GoTwoTextProps) => {
  return (
    <span className={`logo-lockup ${className}`.trim()} style={style}>
      <img
        alt={alt}
        className="logo-mark-script"
        src={gotwoTransparentNew}
      />
    </span>
  );
};

export default GoTwoText;
