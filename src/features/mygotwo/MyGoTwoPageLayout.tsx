import type { ReactNode } from "react";
import MyGoTwoHeader from "@/features/mygotwo/MyGoTwoHeader";

interface MyGoTwoPageLayoutProps {
  children: ReactNode;
  isDesktopViewport: boolean;
}

export default function MyGoTwoPageLayout({ children, isDesktopViewport }: MyGoTwoPageLayoutProps) {
  const desktopHeaderHeight =
    "calc(var(--header-top-padding) + var(--header-icons-row-height) + var(--header-divider-margin-top) + 1px)";

  return (
    <div
      className={`app-page overflow-x-hidden ${
        isDesktopViewport ? "grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden" : "flex min-h-screen flex-col"
      }`}
      style={{
        ["--header-height" as const]: isDesktopViewport ? desktopHeaderHeight : undefined,
      }}
    >
      <MyGoTwoHeader />
      {isDesktopViewport ? (
        <div className="min-h-0 overflow-hidden">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
