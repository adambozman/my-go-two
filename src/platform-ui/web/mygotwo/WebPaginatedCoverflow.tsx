import { useMemo } from "react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/usePagination";
import { WebCoverflowV2, type WebCoverflowItem } from "@/platform-ui/web/coverflow-v2";
import { WEB_MYGOTWO_DOT_STYLE } from "@/platform-ui/web/mygotwo/webMyGoTwo.layout";

interface WebPaginatedCoverflowProps {
  items: WebCoverflowItem[];
  onSelect: (id: string) => void;
  pageSize?: number;
  focusedItemId?: string | null;
  showPagination?: boolean;
  sectionTitle?: string;
  className?: string;
  variant?: "default" | "hero";
  stageHeight?: string;
}

export default function WebPaginatedCoverflow({
  items,
  onSelect,
  pageSize = Number.MAX_SAFE_INTEGER,
  focusedItemId,
  showPagination = true,
  sectionTitle,
  className,
  variant = "default",
  stageHeight,
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
    <div className={className ?? "relative flex w-full flex-1 min-h-0 flex-col items-center justify-center"}>
      <WebCoverflowV2
        items={paginatedItems}
        onSelect={onSelect}
        initialActiveIndex={initialActiveIndex}
        sectionTitle={sectionTitle}
        variant={variant}
        stageHeight={stageHeight}
      />
      {showPagination && totalPages > 1 ? (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          orientation="vertical"
          className="fixed"
          style={WEB_MYGOTWO_DOT_STYLE as never}
        />
      ) : null}
    </div>
  );
}
