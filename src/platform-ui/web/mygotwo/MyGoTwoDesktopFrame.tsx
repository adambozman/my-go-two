import type { ReactNode } from "react";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

interface MyGoTwoDesktopFrameProps {
  quote: ReactNode;
  children: ReactNode;
}

export default function MyGoTwoDesktopFrame({ quote, children }: MyGoTwoDesktopFrameProps) {
  return (
    <div
      className="relative grid h-full min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-[rgba(39,94,143,0.28)] shadow-[0_24px_80px_rgba(28,33,45,0.12)]"
      style={{
        maxWidth: MYGOTWO_DESKTOP_TOKENS.frameMaxWidth,
        borderRadius: MYGOTWO_DESKTOP_TOKENS.frameRadius,
        paddingLeft: MYGOTWO_DESKTOP_TOKENS.outerPaddingX,
        paddingRight: MYGOTWO_DESKTOP_TOKENS.outerPaddingX,
        paddingTop: MYGOTWO_DESKTOP_TOKENS.outerPaddingY,
        paddingBottom: MYGOTWO_DESKTOP_TOKENS.outerPaddingY,
        backgroundColor: "#f5e9dc",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(255,255,255,0.62), transparent 36%), linear-gradient(0deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18)), linear-gradient(90deg, rgba(220,193,168,0.16) 0, rgba(220,193,168,0.16) 1px, transparent 1px, transparent 12px), linear-gradient(0deg, rgba(220,193,168,0.12) 0, rgba(220,193,168,0.12) 1px, transparent 1px, transparent 12px)",
      }}
    >
      {quote}
      <div className="min-h-0">{children}</div>
    </div>
  );
}
