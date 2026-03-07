import { Home, ListChecks, Share2, LayoutTemplate, Settings, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, url: "/dashboard", end: true },
  { icon: ListChecks, url: "/dashboard/lists" },
  { icon: Share2, url: "/dashboard/shared" },
  { icon: LayoutTemplate, url: "/dashboard/templates" },
  { icon: Settings, url: "/dashboard/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] flex flex-col items-center py-6 z-50">
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 shadow-sm p-3 flex flex-col gap-2 mt-20">
        {navItems.map((item) => {
          const isActive = item.end
            ? location.pathname === item.url
            : location.pathname.startsWith(item.url);

          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive
                  ? "bg-secondary/80 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto mb-4">
        <div className="w-10 h-10 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center text-xs font-semibold text-primary">
          AT
        </div>
      </div>
    </aside>
  );
}
