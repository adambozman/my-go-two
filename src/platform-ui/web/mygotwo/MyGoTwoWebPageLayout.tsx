import type { ReactNode } from "react";
import MyGoTwoWebHeader from "@/platform-ui/web/mygotwo/MyGoTwoWebHeader";

interface MyGoTwoWebPageLayoutProps {
  children: ReactNode;
}

export default function MyGoTwoWebPageLayout({ children }: MyGoTwoWebPageLayoutProps) {
  const desktopHeaderHeight =
    "calc(var(--header-top-padding) + var(--header-icons-row-height) + var(--header-divider-margin-top) + 1px)";

  return (
    <div
      className="app-page grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden overflow-x-hidden"
      style={{ "--header-height": desktopHeaderHeight } as React.CSSProperties}
    >
      <MyGoTwoWebHeader />
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
