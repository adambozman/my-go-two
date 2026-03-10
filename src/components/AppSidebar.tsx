import { Home, Heart, Users, Sparkles, ClipboardList, Settings, SlidersHorizontal } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { icon: Home, url: "/dashboard", end: true, label: "Home" },
  { icon: Heart, url: "/dashboard/my-go-two", label: "My Go Two" },
  { icon: Users, url: "/dashboard/collaborations", label: "Connections" },
  { icon: Sparkles, url: "/dashboard/recommendations", label: "Recommendations" },
  { icon: ClipboardList, url: "/dashboard/questionnaires", label: "Questionnaires" },
  { icon: SlidersHorizontal, url: "/onboarding?edit=true", label: "Preferences" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <TooltipProvider delayDuration={200}>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
        style={{
          background: "var(--swatch-sand)",
          borderTop: "1px solid rgba(74, 96, 104, 0.12)",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {navItems.map((item) => {
          const isActive = item.end
            ? location.pathname === item.url
            : location.pathname.startsWith(item.url);

          return (
            <Tooltip key={item.url}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={isActive ? { background: 'rgba(232,198,174,0.4)' } : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
