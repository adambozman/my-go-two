import type { ReactNode } from "react";

interface MyGoTwoWebLayoutProps {
  children: ReactNode;
}

export default function MyGoTwoWebLayout({ children }: MyGoTwoWebLayoutProps) {
  return (
    <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col">{children}</div>
    </main>
  );
}
