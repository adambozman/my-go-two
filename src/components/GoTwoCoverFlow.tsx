import { forwardRef } from "react";
import PaginatedCoverFlow from "@/components/PaginatedCoverFlow";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
  focusedItemId?: string | null;
  showPagination?: boolean;
}

const GoTwoCoverFlow = forwardRef<HTMLDivElement, GoTwoCoverFlowProps>(
  ({ items, onSelect, focusedItemId, showPagination = true }, ref) => (
    <div ref={ref} className="w-full">
      <PaginatedCoverFlow
        items={items}
        onSelect={onSelect}
        focusedItemId={focusedItemId}
        showPagination={showPagination}
      />
    </div>
  )
);

GoTwoCoverFlow.displayName = "GoTwoCoverFlow";

export default GoTwoCoverFlow;
