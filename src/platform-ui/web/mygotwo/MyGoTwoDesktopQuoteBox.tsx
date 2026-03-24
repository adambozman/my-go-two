import { useRotatingQuote } from "@/hooks/useRotatingQuote";
import { MYGOTWO_DESKTOP_TOKENS } from "@/platform-ui/web/mygotwo/myGoTwoDesktop.tokens";

export default function MyGoTwoDesktopQuoteBox() {
  const quote = useRotatingQuote();

  return (
    <div
      className="pointer-events-none flex w-full items-start justify-center px-6 pt-1 text-center"
      style={{ minHeight: MYGOTWO_DESKTOP_TOKENS.quoteMinHeight }}
    >
      <p
        className="mx-auto max-w-[920px] text-[clamp(30px,2.4vw,48px)] font-semibold italic leading-[1.12] text-[var(--logo-two-color)]"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          opacity: quote.visible ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        "{quote.text}"
      </p>
    </div>
  );
}
