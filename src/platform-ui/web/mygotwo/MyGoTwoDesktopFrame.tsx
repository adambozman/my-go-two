import type { ReactNode } from "react";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

interface MyGoTwoDesktopFrameProps {
  quote: ReactNode;
  children: ReactNode;
}

export default function MyGoTwoDesktopFrame({ quote, children }: MyGoTwoDesktopFrameProps) {
  return (
    <div
      className="relative h-full min-h-0 w-full overflow-visible"
      style={{
        maxWidth: MYGOTWO_DESKTOP_TOKENS.frameMaxWidth,
        borderRadius: MYGOTWO_DESKTOP_TOKENS.frameRadius,
        paddingLeft: MYGOTWO_DESKTOP_TOKENS.outerPaddingX,
        paddingRight: MYGOTWO_DESKTOP_TOKENS.outerPaddingX,
        paddingTop: "clamp(34px, 5vh, 56px)",
        paddingBottom: MYGOTWO_DESKTOP_TOKENS.outerPaddingY,
        background: MYGOTWO_DESKTOP_TOKENS.frameBackground,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 z-10 flex justify-center"
        style={{ top: MYGOTWO_DESKTOP_TOKENS.quoteOverlayTop }}
      >
        {quote}
      </div>
      <div className="relative h-full min-h-0">{children}</div>
    </div>
  );
}
