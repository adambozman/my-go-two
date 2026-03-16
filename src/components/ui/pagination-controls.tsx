interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  className,
  orientation = "horizontal",
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const isVertical = orientation === "vertical";

  return (
    <div className={className ?? "mt-6"}>
      <div className={`flex items-center justify-center ${isVertical ? "flex-col gap-2" : "gap-2"}`}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className="rounded-full transition-all"
              style={{
                width: isVertical ? 7 : isActive ? 18 : 8,
                height: isVertical ? (isActive ? 20 : 7) : 8,
                background: isActive ? "var(--swatch-teal)" : "rgba(45,104,112,0.28)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
