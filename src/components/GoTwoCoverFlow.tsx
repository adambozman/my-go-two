import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";
import { CAROUSEL_LAYOUT } from "@/lib/carouselConfig";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
  layoutOverride?: typeof CAROUSEL_LAYOUT;
}

const GoTwoCoverFlow = ({ items, onSelect, layoutOverride }: GoTwoCoverFlowProps) => (
  <CoverFlowCarousel items={items} onSelect={onSelect} layoutOverride={layoutOverride} />
);

export default GoTwoCoverFlow;
