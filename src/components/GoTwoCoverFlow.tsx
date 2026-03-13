import CoverFlowCarousel from "@/components/ui/CoverFlowCarousel";

interface GoTwoCoverFlowProps {
  items: { id: string; label: string; image: string }[];
  onSelect: (id: string) => void;
}

const GoTwoCoverFlow = ({ items, onSelect }: GoTwoCoverFlowProps) => (
  <CoverFlowCarousel items={items} onSelect={onSelect} />
);

export default GoTwoCoverFlow;
