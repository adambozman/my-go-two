import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import MyGoTwoDesktopCoverflow, {
  type MyGoTwoDesktopCoverflowItem,
} from "@/platform-ui/web/mygotwo/MyGoTwoDesktopCoverflow";
import MyGoTwoDesktopPage from "@/platform-ui/web/mygotwo/MyGoTwoDesktopPage";

interface MyGoTwoDesktopBrowserProps {
  pageKey: string;
  items: MyGoTwoDesktopCoverflowItem[];
  focusedItemId?: string | null;
  title?: string;
  onBack?: () => void;
  onCommit: (id: string) => void;
  onRotateSections?: (step: number) => void;
  getStepFromSwipe?: (primaryOffset: number, crossOffset: number, primaryVelocity?: number) => number;
  topSlot?: ReactNode;
  overlay?: ReactNode;
  footer?: ReactNode;
  showControls?: boolean;
  visibleEachSide?: number;
  onActiveIdChange?: (id: string) => void;
}

export default function MyGoTwoDesktopBrowser({
  pageKey,
  items,
  focusedItemId,
  title,
  onBack,
  onCommit,
  onRotateSections,
  getStepFromSwipe,
  topSlot,
  overlay,
  footer,
  showControls,
  visibleEachSide,
  onActiveIdChange,
}: MyGoTwoDesktopBrowserProps) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, x: pageKey === "root" ? 0 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: pageKey === "root" ? 0 : -40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex h-full min-h-0 w-full flex-col"
      style={{ touchAction: "pan-y" }}
      onWheel={onRotateSections ? (event) => {
        if (Math.abs(event.deltaY) < 14) return;
        onRotateSections(event.deltaY > 0 ? 1 : -1);
      } : undefined}
      onPanEnd={onRotateSections && getStepFromSwipe ? (_event, info: PanInfo) => {
        const step = getStepFromSwipe(0, info.offset.x, info.velocity.x);
        if (step !== 0) onRotateSections(step);
      } : undefined}
    >
      <MyGoTwoDesktopPage title={title} onBack={onBack} topSlot={topSlot}>
        <div className="flex h-full min-h-0 flex-col">
          <div className="relative min-h-0 flex-1">
            <MyGoTwoDesktopCoverflow
              items={items}
              focusedItemId={focusedItemId}
              onCommit={onCommit}
              stageHeight="100%"
              showControls={showControls}
              visibleEachSide={visibleEachSide}
              onActiveIdChange={onActiveIdChange}
            />
            {overlay ? (
              <div className="pointer-events-none absolute inset-0 z-20">
                {overlay}
              </div>
            ) : null}
          </div>
          {footer ? <div className="flex-none">{footer}</div> : null}
        </div>
      </MyGoTwoDesktopPage>
    </motion.div>
  );
}
