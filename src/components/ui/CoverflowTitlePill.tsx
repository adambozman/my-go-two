import { ChevronLeft } from "lucide-react";
import { Pill } from "@/components/ui/pill";

interface CoverflowTitlePillProps {
  title: string;
  className?: string;
  showBackArrow?: boolean;
  onBack?: () => void;
}

const CoverflowTitlePill = ({
  title,
  className = "",
  showBackArrow = false,
  onBack,
}: CoverflowTitlePillProps) => {
  return (
    <div className="coverflow-stage-title-wrap">
      <Pill
        variant="title"
        className={`coverflow-title-pill ${showBackArrow ? "coverflow-title-pill--with-back" : ""} ${className}`.trim()}
      >
        {showBackArrow ? (
          <button
            type="button"
            className="coverflow-title-pill__back"
            onClick={onBack}
            aria-label="Go back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : null}
        <h2 className="coverflow-stage-title text-center">{title}</h2>
      </Pill>
    </div>
  );
};

export default CoverflowTitlePill;
