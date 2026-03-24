import { useMemo } from "react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
import { WebCoverflowV2, type WebCoverflowItem } from "@/platform-ui/web/coverflow-v2";
import { COVERFLOW_DESKTOP_Y_OFFSET } from "@/lib/carouselConfig";

interface WebPaginatedCoverflowProps {
  items: WebCoverflowItem[];
  onSelect: (id: string) => void;
  pageSize?: number;
  focusedItemId?: string | null;
  showPagination?: boolean;
  sectionTitle?: string;
  className?: string;
}

const RIGHT_SIDE_DOT_STYLE = {
  right: 18,
  top: `calc(var(--header-height) + (100vh - var(--header-height)) / 2 + 23px + ${COVERFLOW_DESKTOP_Y_OFFSET}px)`,
  transform: "translateY(-50%)",
  zIndex: 50,
} as const;

export default function WebPaginatedCoverflow({
  items,
  onSelect,
  pageSize = 7,
  focusedItemId,
  showPagination = true,
  sectionTitle,
  className,
}: WebPaginatedCoverflowProps) {
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
      <WebCoverflowV2
        items={paginatedItems}
        onSelect={onSelect}
        initialActiveIndex={initialActiveIndex}
        sectionTitle={sectionTitle}
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
