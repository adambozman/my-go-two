import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import GoTwoText from "@/components/GoTwoText";

export function DashboardTopBar() {
  return (
    <header className="px-8 pt-6 pb-4">
      <div className="flex items-center justify-between gap-4">
        <GoTwoText className="text-[48px] [&_.two]:text-[60px] shrink-0" />

        <div className="relative flex-1 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lists"
            className="pl-10 w-full rounded-full border-border/40"
            style={{ background: 'rgba(232,198,174,0.2)' }}
          />
        </div>

        <button className="relative w-10 h-10 rounded-full card-design-neumorph flex items-center justify-center shrink-0">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center" style={{ background: 'var(--swatch-viridian-odyssey)', color: 'var(--swatch-cream-light)' }}>
            3
          </span>
        </button>
      </div>

      <div className="mt-4 border-b border-border/30" />
    </header>
  );
}
