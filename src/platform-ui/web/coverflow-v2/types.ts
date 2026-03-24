export interface WebCoverflowItem {
  id: string;
  label: string;
  image: string;
  imageKey?: string;
}

export interface WebCoverflowProps {
  items: WebCoverflowItem[];
  onSelect: (id: string) => void;
  initialActiveIndex?: number;
  sectionTitle?: string;
  className?: string;
  variant?: "default" | "hero";
  stageHeight?: string;
}

export interface WebCoverflowCardPose {
  relative: number;
  depth: number;
  isActive: boolean;
  x: number;
  y: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}
