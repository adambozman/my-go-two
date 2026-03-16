import { forwardRef } from "react";
import PaginatedCoverFlow from "@/components/PaginatedCoverFlow";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
  focusedItemId?: string | null;
}

const GoTwoCoverFlow = forwardRef<HTMLDivElement, GoTwoCoverFlowProps>(
  ({ items, onSelect, focusedItemId }, ref) => (
    <div ref={ref} className="w-full">
      <PaginatedCoverFlow items={items} onSelect={onSelect} focusedItemId={focusedItemId} />
    </div>
  )
);

GoTwoCoverFlow.displayName = "GoTwoCoverFlow";

export default GoTwoCoverFlow;
