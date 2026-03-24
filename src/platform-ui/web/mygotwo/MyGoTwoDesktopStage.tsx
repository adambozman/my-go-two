import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

interface MyGoTwoDesktopStageProps {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
  topSlot?: ReactNode;
}

export default function MyGoTwoDesktopStage({ children, onBack, topSlot }: MyGoTwoDesktopStageProps) {
  return (
    <div
      className="relative h-full min-h-0"
      style={{
        paddingLeft: MYGOTWO_DESKTOP_TOKENS.stagePaddingX,
        paddingRight: MYGOTWO_DESKTOP_TOKENS.stagePaddingX,
        paddingBottom: MYGOTWO_DESKTOP_TOKENS.contentPaddingBottom,
      }}
    >
      {topSlot ? (
        <div
          className="absolute z-20"
          style={{ top: MYGOTWO_DESKTOP_TOKENS.titleOverlayTop }}
        >
          <div className="flex items-center">
            {topSlot}
          </div>
        </div>
      ) : null}
      {!topSlot && onBack ? (
        <div
          className="absolute z-20 flex items-center"
          style={{ top: MYGOTWO_DESKTOP_TOKENS.titleOverlayTop }}
        >
          <button
            type="button"
            aria-label="Go back"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-[rgba(255,255,255,0.72)] text-[var(--logo-two-color)] shadow-[0_10px_26px_rgba(20,20,30,0.08)]"
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      ) : null}
      <div className="h-full min-h-0">{children}</div>
    </div>
  );
}
