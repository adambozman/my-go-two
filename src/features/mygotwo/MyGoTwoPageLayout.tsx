import type { ReactNode } from "react";
import MyGoTwoHeader from "@/features/mygotwo/MyGoTwoHeader";

interface MyGoTwoPageLayoutProps {
  children: ReactNode;
  isDesktopViewport: boolean;
}

export default function MyGoTwoPageLayout({ children, isDesktopViewport }: MyGoTwoPageLayoutProps) {
  return (
    <div
      className={`app-page flex flex-col overflow-x-hidden ${
        isDesktopViewport ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      <MyGoTwoHeader />
      {children}
    </div>
  );
}
