import type { ReactNode } from "react";

interface MyGoTwoWebLayoutProps {
  children: ReactNode;
}

export default function MyGoTwoWebLayout({ children }: MyGoTwoWebLayoutProps) {
  return (
    <main className="h-full min-h-0 overflow-x-hidden overflow-y-visible px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto grid h-full w-full max-w-[1680px] grid-rows-[minmax(0,1fr)] overflow-x-hidden overflow-y-visible">{children}</div>
    </main>
  );
}
