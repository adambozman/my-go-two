import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

interface MyGoTwoDesktopStageProps {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}

export default function MyGoTwoDesktopStage({ children, title, onBack }: MyGoTwoDesktopStageProps) {
  return (
    <div
      className="relative h-full min-h-0"
      style={{
        paddingLeft: MYGOTWO_DESKTOP_TOKENS.stagePaddingX,
        paddingRight: MYGOTWO_DESKTOP_TOKENS.stagePaddingX,
        paddingBottom: MYGOTWO_DESKTOP_TOKENS.contentPaddingBottom,
      }}
    >
      {title ? (
        <div
          className="pointer-events-none absolute left-1/2 z-20 flex -translate-x-1/2 items-center justify-center"
          style={{ top: MYGOTWO_DESKTOP_TOKENS.titleOverlayTop }}
        >
          <div
            className="inline-flex max-w-[min(92vw,620px)] items-center gap-3 rounded-full border border-white/70 bg-[rgba(255,255,255,0.52)] px-4 py-2 shadow-[0_8px_24px_rgba(20,20,30,0.08)] backdrop-blur"
          >
            {onBack ? (
              <button
                type="button"
                aria-label="Go back"
                className="pointer-events-auto inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[rgba(45,104,112,0.16)] bg-[rgba(255,255,255,0.52)] text-[var(--logo-two-color)]"
                onClick={onBack}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            ) : null}
            <h2
              className="max-w-[min(72vw,520px)] truncate text-center text-[clamp(18px,1.8vw,34px)] font-semibold leading-none text-[var(--logo-two-color)]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              title={title}
            >
              {title}
            </h2>
          </div>
        </div>
      ) : null}
      <div className="h-full min-h-0">{children}</div>
    </div>
  );
}
