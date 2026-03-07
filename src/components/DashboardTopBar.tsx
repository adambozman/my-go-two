import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import goTwoLogo from "@/assets/GoTwoTransparent.png";

export function DashboardTopBar() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-2xl px-4 py-2 border border-border/30 shadow-sm">
        <img src={goTwoLogo} alt="Go Two" className="h-8" />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lists"
            className="pl-10 w-64 bg-card/60 backdrop-blur-sm border-border/30 rounded-full"
          />
        </div>
        <button className="relative w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm border border-border/30 flex items-center justify-center hover:bg-card/80 transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
