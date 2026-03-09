import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", short: "H", url: "/dashboard", end: true },
  { label: "My Go Two", short: "G", url: "/dashboard/my-go-two" },
  { label: "Collabs", short: "C", url: "/dashboard/collaborations" },
  { label: "Recs", short: "R", url: "/dashboard/recommendations" },
  { label: "Q&A", short: "Q", url: "/dashboard/questionnaires" },
  { label: "Prefs", short: "P", url: "/onboarding?edit=true" },
  { label: "Settings", short: "S", url: "/dashboard/settings" },
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
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all font-semibold text-sm tracking-tight",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={isActive ? { background: 'rgba(232,198,174,0.4)' } : undefined}
            >
              {item.short}
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
