import type { ReactNode } from "react";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

interface MyGoTwoDesktopFrameProps {
  quote: ReactNode;
  children: ReactNode;
}

export default function MyGoTwoDesktopFrame({ quote, children }: MyGoTwoDesktopFrameProps) {
  return (
    <div
      className="relative grid h-full min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden"
      style={{
        maxWidth: MYGOTWO_DESKTOP_TOKENS.frameMaxWidth,
        borderRadius: MYGOTWO_DESKTOP_TOKENS.frameRadius,
        paddingLeft: MYGOTWO_DESKTOP_TOKENS.outerPaddingX,
        paddingRight: MYGOTWO_DESKTOP_TOKENS.outerPaddingX,
        paddingTop: MYGOTWO_DESKTOP_TOKENS.outerPaddingY,
        paddingBottom: MYGOTWO_DESKTOP_TOKENS.outerPaddingY,
        background: MYGOTWO_DESKTOP_TOKENS.frameBackground,
      }}
    >
      {quote}
      <div className="min-h-0">{children}</div>
    </div>
  );
}
