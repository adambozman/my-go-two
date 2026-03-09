import { Home, Heart, Users, Sparkles, ClipboardList, Settings, SlidersHorizontal } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, url: "/dashboard", end: true, label: "Home" },
  { icon: Heart, url: "/dashboard/my-go-two", label: "My Go Two" },
  { icon: Users, url: "/dashboard/collaborations", label: "Collaborations" },
  { icon: Sparkles, url: "/dashboard/recommendations", label: "Recommendations" },
  { icon: ClipboardList, url: "/dashboard/questionnaires", label: "Questionnaires" },
  { icon: SlidersHorizontal, url: "/onboarding?edit=true", label: "Preferences" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
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
              title={item.label}
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
