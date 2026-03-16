import { motion } from "framer-motion";
import { Bell, Gift, Heart, Sparkles, ChevronRight } from "lucide-react";

export interface HomeNotificationItem {
  id: string;
  type: string;
  title: string;
  body: string | null;
  createdAt: string;
  isRead: boolean;
}

interface HomeNotificationsProps {
  notifications: HomeNotificationItem[];
  onOpenAll: () => void;
}

const typeIcon = {
  partner_activity: Heart,
  gift_reminder: Gift,
  recommendation: Sparkles,
  app: Bell,
} as const;

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function HomeNotifications({ notifications, onOpenAll }: HomeNotificationsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between px-1">
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
        >
          Notifications
        </h2>
        <button
          type="button"
          onClick={onOpenAll}
          className="inline-flex items-center gap-1 text-[10px] font-medium"
          style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
        >
          View all
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <Bell className="h-5 w-5" style={{ color: "var(--swatch-text-light)" }} />
            <p
              className="text-[13px] font-medium"
              style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
            >
              No notifications yet
            </p>
            <p className="text-[11px]" style={{ color: "var(--swatch-antique-coin)" }}>
              Updates from invites, reminders, and activity will show up here.
            </p>
          </div>
        ) : (
          notifications.map((notification, index) => {
            const Icon = typeIcon[notification.type as keyof typeof typeIcon] ?? Bell;
            const accent = notification.isRead ? "var(--swatch-antique-coin)" : "var(--swatch-cedar-grove)";

            return (
              <div
                key={notification.id}
                className="flex items-start gap-3 px-4 py-3"
                style={{ borderTop: index > 0 ? "1px solid rgba(0,0,0,0.04)" : undefined }}
              >
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="truncate text-[13px] font-semibold"
                      style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                    >
                      {notification.title}
                    </p>
                    <span className="shrink-0 text-[10px]" style={{ color: "var(--swatch-text-light)" }}>
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                  {notification.body && (
                    <p className="mt-0.5 line-clamp-2 text-[11px]" style={{ color: "var(--swatch-antique-coin)" }}>
                      {notification.body}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.section>
  );
}
