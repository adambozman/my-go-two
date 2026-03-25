import { forwardRef, useEffect, useState } from "react";

interface MobileGoTwoCardProps {
  image: string;
  label: string;
  sectionTitle?: string;
  onClick?: () => void;
}

const MobileGoTwoCard = forwardRef<HTMLDivElement, MobileGoTwoCardProps>(
  ({ image, label, sectionTitle, onClick }, ref) => {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
      setImageFailed(false);
    }, [image]);

    return (
      <div
        ref={ref}
        onClick={onClick}
        className="flex w-full cursor-pointer flex-col items-center"
        style={{ width: "min(calc(100vw - 24px), 460px)" }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "min(58vh, 560px)",
            borderRadius: 24,
            boxShadow: "0 0 24px 6px rgba(45,104,112,0.45), 0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, #c3c5c8 0%, #9ea2a8 100%)" }}
          />
          {image && !imageFailed ? (
            <img
              src={image}
              alt={label}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : null}

          <div className="absolute bottom-4 left-4 flex flex-col items-start gap-1.5">
            {sectionTitle ? (
              <span
                className="pill-asset-ivory block truncate px-3 py-1 font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 14,
                  letterSpacing: "0.04em",
                  borderRadius: 999,
                  maxWidth: 200,
                }}
              >
                {sectionTitle}
              </span>
            ) : null}
            <span
              className="pill-asset-ivory block truncate px-3 py-1 font-semibold"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14,
                letterSpacing: "0.04em",
                borderRadius: 999,
                maxWidth: 240,
              }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

MobileGoTwoCard.displayName = "MobileGoTwoCard";

export default MobileGoTwoCard;
