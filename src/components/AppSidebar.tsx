import { Home, Share2, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, url: "/dashboard", end: true },
  { icon: Share2, url: "/dashboard/shared" },
  { icon: Settings, url: "/dashboard/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] flex flex-col items-center py-6 z-50">
      <div className="card-design-neumorph p-3 flex flex-col gap-2 mt-20">
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
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={isActive ? { background: 'rgba(232,198,174,0.4)' } : undefined}
            >
              <item.icon className="h-5 w-5" />
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold card-design-neumorph" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
          AT
        </div>
      </div>
    </aside>
  );
}
