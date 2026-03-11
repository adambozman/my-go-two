import { useState } from "react";
import { Home, Heart, Search, ClipboardList, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

const navItems = [
  { icon: Home, url: "/dashboard", end: true, label: "Home" },
  { icon: Heart, url: "/dashboard/my-go-two", label: "My Go Two" },
  { icon: Search, url: "__search__", label: "Search" },
  { icon: ClipboardList, url: "/dashboard/questionnaires", label: "Know Me" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

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
          const isSearch = item.url === "__search__";
          const isActive = isSearch
            ? searchOpen
            : item.end
              ? location.pathname === item.url
              : location.pathname.startsWith(item.url);

          if (isSearch) {
            return (
              <Tooltip key={item.url}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSearchOpen(true)}
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
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

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

      <Drawer open={searchOpen} onOpenChange={setSearchOpen}>
        <DrawerContent className="min-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif">Search</DrawerTitle>
          </DrawerHeader>
          <div className="px-6 pb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cards, lists, people..."
                className="pl-10 w-full rounded-full border-border/40"
                style={{ background: 'rgba(232,198,174,0.2)' }}
                autoFocus
              />
            </div>
            <div className="mt-8 flex flex-col items-center justify-center text-muted-foreground text-sm">
              <Search className="h-10 w-10 mb-3 opacity-30" />
              <p>Start typing to search</p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </TooltipProvider>
  );
}
