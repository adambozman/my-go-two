import CoverFlowCarousel, { type CoverFlowItem } from "@/components/ui/CoverFlowCarousel";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

interface PaginatedCoverFlowProps {
  items: CoverFlowItem[];
  onSelect: (id: string) => void;
  pageSize?: number;
  className?: string;
}

export default function PaginatedCoverFlow({
  items,
  onSelect,
  pageSize = 5,
  className,
}: PaginatedCoverFlowProps) {
  const { currentPage, setCurrentPage, totalPages, paginatedItems } = usePagination({
    items,
    pageSize,
    resetKeys: [items.map((item) => item.id).join("|")],
  });

  return (
    <div className={className ?? "w-full flex flex-col items-center"}>
      <CoverFlowCarousel items={paginatedItems} onSelect={onSelect} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        label={`Page ${currentPage} of ${totalPages}`}
        className="mt-5 space-y-2"
      />
    </div>
  );
}
