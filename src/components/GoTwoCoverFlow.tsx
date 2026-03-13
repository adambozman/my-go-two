import { forwardRef } from "react";
import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
}

const GoTwoCoverFlow = forwardRef<HTMLDivElement, GoTwoCoverFlowProps>(
  ({ items, onSelect }, ref) => (
    <CoverFlowCarousel ref={ref} items={items} onSelect={onSelect} />
  )
);

GoTwoCoverFlow.displayName = "GoTwoCoverFlow";

export default GoTwoCoverFlow;
