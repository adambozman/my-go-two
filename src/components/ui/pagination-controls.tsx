interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label?: string;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={className ?? "mt-6"}>
      <div className="flex items-center justify-center gap-2">
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
                width: isActive ? 18 : 8,
                height: 8,
                background: isActive ? "var(--swatch-teal)" : "rgba(45,104,112,0.22)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
