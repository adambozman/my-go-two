import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface CoverflowWheelPill {
  w: number;
  h: number;
  r: number;
}

interface CoverflowWheelRenderArgs<T> {
  item: T;
  itemIndex: number;
  offset: number;
  absOffset: number;
  isActive: boolean;
  pill: CoverflowWheelPill;
}

interface CoverflowWheelProps<T> {
  items: T[];
  activeIndex: number;
  pills: CoverflowWheelPill[];
  spring: Record<string, unknown>;
  orientation?: "horizontal" | "vertical";
  visible?: number;
  gap?: number;
  className?: string;
  renderItem: (args: CoverflowWheelRenderArgs<T>) => ReactNode;
  onItemClick?: (args: CoverflowWheelRenderArgs<T>) => void;
}

function getWheelOffset(offset: number, pills: CoverflowWheelPill[], gap: number, axis: "x" | "y"): number {
  if (offset === 0) return 0;

  const dir = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  let distance = 0;

  for (let i = 0; i < abs; i += 1) {
    const a = pills[Math.min(i, pills.length - 1)];
    const b = pills[Math.min(i + 1, pills.length - 1)];
    const aSize = axis === "x" ? a.w : a.h;
    const bSize = axis === "x" ? b.w : b.h;
    distance += aSize / 2 + gap + bSize / 2;
  }

  return distance * dir;
}

export default function CoverflowWheel<T>({
  items,
  activeIndex,
  pills,
  spring,
  orientation = "horizontal",
  visible = 2,
  gap = 20,
  className,
  renderItem,
  onItemClick,
}: CoverflowWheelProps<T>) {
  if (items.length === 0) return null;

  const slots = Array.from({ length: visible * 2 + 1 }, (_, i) => i - visible);
  const axis = orientation === "vertical" ? "y" : "x";

  return (
    <div className={className ?? "absolute inset-0 flex items-center justify-center"}>
      {slots.map((offset) => {
        const itemIndex = (activeIndex + offset + items.length) % items.length;
        const item = items[itemIndex];
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;
        const pill = pills[Math.min(absOffset, pills.length - 1)];
        const axisOffset = getWheelOffset(offset, pills, gap, axis);
        const itemProps = { item, itemIndex, offset, absOffset, isActive, pill };

        return (
          <motion.div
            key={`slot-${offset}`}
            initial={false}
            animate={{
              [axis]: axisOffset,
              zIndex: visible + 1 - absOffset,
              opacity: 1,
            }}
            transition={spring}
            className="absolute"
            style={{
              width: pill.w,
              height: pill.h,
            }}
            onClick={onItemClick ? () => onItemClick(itemProps) : undefined}
          >
            {renderItem(itemProps)}
          </motion.div>
        );
      })}
    </div>
  );
}
