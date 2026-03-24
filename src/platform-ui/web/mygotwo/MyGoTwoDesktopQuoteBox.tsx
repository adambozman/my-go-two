import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

export default function MyGoTwoDesktopQuoteBox() {
  const quote = useRotatingQuote();

  return (
    <div
      className="pointer-events-none relative flex w-full items-start justify-center overflow-hidden px-6 text-center"
      style={{ height: MYGOTWO_DESKTOP_TOKENS.quoteBoxHeight }}
    >
      <div className="flex h-full w-full items-start justify-center pt-1">
        <p
          className="mx-auto text-[clamp(30px,2.4vw,48px)] font-semibold italic leading-[1.12] text-[var(--logo-two-color)]"
          style={{
            maxWidth: MYGOTWO_DESKTOP_TOKENS.quoteMaxWidth,
            fontFamily: "'Cormorant Garamond', serif",
            opacity: quote.visible ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          "{quote.text}"
        </p>
      </div>
    </div>
  );
}
