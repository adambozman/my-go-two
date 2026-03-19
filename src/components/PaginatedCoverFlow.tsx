import { useMemo } from "react";
import CoverFlowCarousel, { type CoverFlowItem } from "@/components/ui/CoverFlowCarousel";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

interface PaginatedCoverFlowProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
  pageSize?: number;
  className?: string;
  focusedItemId?: string | null;
  showPagination?: boolean;
}

const RIGHT_SIDE_DOT_STYLE = {
  right: 18,
  top: "calc(var(--header-height) + (100vh - var(--header-height) - var(--footer-height)) / 2 + 23px)",
  transform: "translateY(-50%)",
  zIndex: 50,
} as const;

export default function PaginatedCoverFlow({
  items,
  onSelect,
  pageSize = 5,
  className,
  focusedItemId,
  showPagination = true,
}: PaginatedCoverFlowProps) {
  const focusedIndex = useMemo(
    () => (focusedItemId ? items.findIndex((item) => item.id === focusedItemId) : -1),
    [focusedItemId, items],
  );
  const initialPage = focusedIndex >= 0 ? Math.floor(focusedIndex / pageSize) + 1 : 1;

  const { currentPage, setCurrentPage, totalPages, paginatedItems } = usePagination({
    items,
    pageSize,
    initialPage,
    resetKeys: [items.map((item) => item.id).join("|"), focusedItemId || ""],
  });

  const initialActiveIndex =
    focusedIndex >= 0
      ? Math.max(0, Math.min(focusedIndex - (currentPage - 1) * pageSize, paginatedItems.length - 1))
      : 0;

  return (
    <div className={className ?? "w-full flex flex-col items-center relative"}>
      <CoverFlowCarousel
        items={paginatedItems}
        onSelect={onSelect}
        initialActiveIndex={initialActiveIndex}
      />
      {showPagination ? (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          orientation="vertical"
          className="fixed"
          style={RIGHT_SIDE_DOT_STYLE as never}
        />
      ) : null}
    </div>
  );
}
