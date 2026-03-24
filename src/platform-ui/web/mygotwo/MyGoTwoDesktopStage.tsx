import type { ReactNode } from "react";
import CoverflowTitlePill from "@/components/ui/CoverflowTitlePill";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

interface MyGoTwoDesktopStageProps {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}

export default function MyGoTwoDesktopStage({ children, title, onBack }: MyGoTwoDesktopStageProps) {
  return (
    <div
      className={`grid h-full min-h-0 ${title ? "grid-rows-[auto_minmax(0,1fr)]" : "grid-rows-[minmax(0,1fr)]"}`}
      style={{
        gap: MYGOTWO_DESKTOP_TOKENS.stageGap,
        paddingLeft: MYGOTWO_DESKTOP_TOKENS.stagePaddingX,
        paddingRight: MYGOTWO_DESKTOP_TOKENS.stagePaddingX,
        paddingBottom: MYGOTWO_DESKTOP_TOKENS.contentPaddingBottom,
      }}
    >
      {title ? (
        <div className="flex items-center justify-center">
          <CoverflowTitlePill title={title} showBackArrow={Boolean(onBack)} onBack={onBack} />
        </div>
      ) : null}
      <div className="min-h-0">{children}</div>
    </div>
  );
}
