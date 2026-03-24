import type { ReactNode } from "react";

interface MyGoTwoWebLayoutProps {
  children: ReactNode;
}

export default function MyGoTwoWebLayout({ children }: MyGoTwoWebLayoutProps) {
  return (
    <main className="overflow-x-hidden px-3 pb-6 sm:px-4 md:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col">{children}</div>
    </main>
  );
}
