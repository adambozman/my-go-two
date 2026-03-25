import type { ReactNode } from "react";
import MyGoTwoMobileHeader from "@/platform-ui/mobile/mygotwo/MyGoTwoMobileHeader";

interface MyGoTwoMobilePageLayoutProps {
  children: ReactNode;
}

export default function MyGoTwoMobilePageLayout({ children }: MyGoTwoMobilePageLayoutProps) {
  return (
    <div className="app-page flex min-h-screen flex-col overflow-x-hidden">
      <MyGoTwoMobileHeader />
      <main className="min-h-0 flex-1 overflow-x-hidden px-3 pb-6 sm:px-4">
        {children}
      </main>
    </div>
  );
}
