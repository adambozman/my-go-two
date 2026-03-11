import { Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";

export function DashboardTopBar() {
  const navigate = useNavigate();

  return (
    <header className="px-8" style={{ paddingTop: 28, paddingBottom: 0 }}>
      <div className="flex items-center justify-between gap-4">
        <GoTwoText className="text-[48px] [&_.two]:text-[60px] shrink-0" />

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="relative w-10 h-10 rounded-full card-design-neumorph flex items-center justify-center"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="relative w-10 h-10 rounded-full card-design-neumorph flex items-center justify-center">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full flex items-center justify-center" style={{ background: 'var(--swatch-viridian-odyssey)', color: 'var(--swatch-cream-light)' }}>
              3
            </span>
          </button>
        </div>
      </div>

      <div style={{ marginTop: 28 }} className="border-b border-border/30" />
    </header>
  );
}
