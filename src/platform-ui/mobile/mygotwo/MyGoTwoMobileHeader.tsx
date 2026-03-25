import { ChevronDown, LogOut, Settings, Trash2, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MYGOTWO_NAV_ITEMS, useMyGoTwoHeaderState } from "@/features/mygotwo/headerShared";

export default function MyGoTwoMobileHeader() {
  const {
    user,
    unreadCount,
    avatarUrl,
    displayName,
    initials,
    fileInputRef,
    handleUpload,
    handleRemovePhoto,
    handleSignOut,
    navigate,
  } = useMyGoTwoHeaderState("mygotwo-mobile-notif-count");

  return (
    <header
      className="flex shrink-0 flex-col px-3 sm:px-4"
      style={{
        minHeight: "calc(var(--header-top-padding) + var(--header-icons-row-height) + var(--header-divider-margin-top) + 1px)",
        paddingTop: "var(--header-top-padding)",
      }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5" style={{ height: "var(--header-icons-row-height)" }}>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

        <div className="flex min-w-0 items-center justify-start">
          <GoTwoText className="min-w-0 shrink text-[clamp(18px,5vw,38px)]" />
        </div>

        <nav className="flex min-w-0 items-start justify-center gap-1">
          {MYGOTWO_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.end}
              aria-label={item.label}
              className="flex w-[32px] flex-col items-center gap-1 text-center text-muted-foreground transition-all hover:text-foreground"
            >
              <span
                className="card-design-neumorph relative flex items-center justify-center rounded-full"
                style={{
                  width: "clamp(26px, 5vw, var(--header-icon-btn-size))",
                  height: "clamp(26px, 5vw, var(--header-icon-btn-size))",
                }}
              >
                <item.icon className="h-3 w-3" />
                {item.url === "/dashboard/notifications" && unreadCount > 0 ? (
                  <span
                    className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-0.5 text-[8px] font-bold"
                    style={{ background: "var(--swatch-teal)", color: "var(--swatch-cream-light)" }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                ) : null}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="group flex items-center gap-1.5 rounded-full border border-white/70 px-1.5 py-1 text-left transition-all hover:border-white hover:shadow-[0_10px_28px_rgba(74,96,104,0.12)] focus:outline-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(245,233,220,0.56) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.92), 0 6px 18px rgba(74,96,104,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Avatar className="h-7 w-7 border border-white/70 shadow-[0_4px_10px_rgba(30,74,82,0.12)]">
                  <AvatarImage src={avatarUrl ?? undefined} alt={displayName} className="object-cover" />
                  <AvatarFallback
                    className="text-[11px] font-semibold"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,104,112,0.92) 0%, rgba(30,74,82,0.92) 100%)",
                      color: "var(--swatch-cream-light)",
                    }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl border border-white/70 p-2"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,233,220,0.9) 100%)",
                boxShadow: "0 18px 42px rgba(30,74,82,0.14), inset 0 1px 0 rgba(255,255,255,0.88)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div className="mb-2 flex items-center gap-3 rounded-2xl px-2 py-2">
                <Avatar className="h-10 w-10 border border-white/70">
                  <AvatarImage src={avatarUrl ?? undefined} alt={displayName} className="object-cover" />
                  <AvatarFallback
                    className="text-xs font-semibold"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,104,112,0.92) 0%, rgba(30,74,82,0.92) 100%)",
                      color: "var(--swatch-cream-light)",
                    }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold" style={{ color: "var(--swatch-teal)" }}>
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")} className="rounded-xl">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="rounded-xl">
                <Upload className="mr-2 h-4 w-4" />
                Upload photo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRemovePhoto} className="rounded-xl">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove photo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="rounded-xl text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border-b border-border/30" style={{ marginTop: "var(--header-divider-margin-top)" }} />
    </header>
  );
}
