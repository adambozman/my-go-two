import type { ReactNode } from "react";
import MyGoTwoDesktopFrame from "@/platform-ui/web/mygotwo/MyGoTwoDesktopFrame";
import MyGoTwoDesktopStage from "@/platform-ui/web/mygotwo/MyGoTwoDesktopStage";
import WebMyGoTwoQuote from "@/platform-ui/web/mygotwo/WebMyGoTwoQuote";

interface MyGoTwoDesktopPageProps {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
  topSlot?: ReactNode;
}

export default function MyGoTwoDesktopPage({ children, title, onBack, topSlot }: MyGoTwoDesktopPageProps) {
  return (
    <MyGoTwoDesktopFrame quote={<WebMyGoTwoQuote />}>
      <MyGoTwoDesktopStage title={title} onBack={onBack} topSlot={topSlot}>
        {children}
      </MyGoTwoDesktopStage>
    </MyGoTwoDesktopFrame>
  );
}
