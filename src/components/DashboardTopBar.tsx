import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import GoTwoText from "@/components/GoTwoText";

export function DashboardTopBar() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="card-design-neumorph px-4 py-2 flex items-center gap-2">
        <GoTwoText className="text-[48px] [&_.two]:text-[60px]" />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lists"
            className="pl-10 w-64 rounded-full border-border/40"
            style={{ background: 'rgba(232,198,174,0.2)' }}
          />
        </div>
        <button className="relative w-10 h-10 rounded-full card-design-neumorph flex items-center justify-center">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center" style={{ background: 'var(--swatch-viridian-odyssey)', color: 'var(--swatch-cream-light)' }}>
            3
          </span>
        </button>
      </div>
    </header>
  );
}
