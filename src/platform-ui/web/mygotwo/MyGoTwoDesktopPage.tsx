import type { ReactNode } from "react";
import MyGoTwoDesktopFrame from "@/platform-ui/web/mygotwo/MyGoTwoDesktopFrame";
import MyGoTwoDesktopQuoteBox from "@/platform-ui/web/mygotwo/MyGoTwoDesktopQuoteBox";
import MyGoTwoDesktopStage from "@/platform-ui/web/mygotwo/MyGoTwoDesktopStage";

interface MyGoTwoDesktopPageProps {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
  topSlot?: ReactNode;
}

export default function MyGoTwoDesktopPage({ children, title, onBack, topSlot }: MyGoTwoDesktopPageProps) {
  return (
    <MyGoTwoDesktopFrame quote={<MyGoTwoDesktopQuoteBox />}>
      <MyGoTwoDesktopStage title={title} onBack={onBack} topSlot={topSlot}>
        {children}
      </MyGoTwoDesktopStage>
    </MyGoTwoDesktopFrame>
  );
}
