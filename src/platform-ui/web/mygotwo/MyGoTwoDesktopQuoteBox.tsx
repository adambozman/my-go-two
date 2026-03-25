import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

export default function MyGoTwoDesktopQuoteBox() {
  const quote = useRotatingQuote();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-30 flex justify-center"
      style={{ top: MYGOTWO_DESKTOP_TOKENS.quoteOverlayTop }}
    >
      <div
        className="flex items-start justify-center"
        style={{
          maxWidth: MYGOTWO_DESKTOP_TOKENS.quoteMaxWidth,
          paddingTop: MYGOTWO_DESKTOP_TOKENS.quoteBoxPaddingTop,
          paddingLeft: MYGOTWO_DESKTOP_TOKENS.quoteBoxPaddingX,
          paddingRight: MYGOTWO_DESKTOP_TOKENS.quoteBoxPaddingX,
          width: "fit-content",
        }}
      >
        <p
          className="mx-auto text-center text-[clamp(18px,1.45vw,28px)] font-semibold italic leading-[1.08] text-[var(--logo-two-color)]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            opacity: quote.visible ? 1 : 0,
            transition: "opacity 300ms ease",
            maxWidth: "30ch",
          }}
        >
          "{quote.text}"
        </p>
      </div>
    </div>
  );
}
