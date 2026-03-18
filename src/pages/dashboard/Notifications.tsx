import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Heart, Gift, Sparkles, Check, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import PremiumLockCard from "@/components/PremiumLockCard";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  is_read: boolean;
  created_at: string;
}

const typeIcon: Record<string, typeof Bell> = {
  partner: Heart,
  reminder: Gift,
  recommendation: Sparkles,
  general: Bell,
};

export default function Notifications() {
  const navigate = useNavigate();
  const { user, subscribed } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user || !subscribed) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error && data) setNotifications(data as Notification[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    if (!subscribed) return;

    const channel = supabase
      .channel("user-notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => fetchNotifications()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, subscribed]);

  const markAllRead = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      toast({ title: "All caught up!", description: "Notifications marked as read." });
    }
  };

  const markOneRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const deleteOne = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay}d ago`;
    return d.toLocaleDateString();
  };

  if (!subscribed) {
    return (
      <div className="max-w-4xl mx-auto" style={{ paddingTop: 40 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 mb-3 bg-transparent border-none cursor-pointer"
          style={{ color: "#2d6870", fontFamily: "Jost", fontSize: 13, fontWeight: 500 }}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <div className="mx-auto" style={{ maxWidth: 520 }}>
          <PremiumLockCard
            title="Reminders and notifications are Premium"
            description="Upcoming dates, birthdays, and activity alerts become genuinely useful once the app is part of your routine, so they unlock with Premium."
            bullets={[
              "Get reminders before birthdays and anniversaries",
              "See updates when a connection changes preferences",
              "Keep recommendations and activity in one stream",
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" style={{ paddingTop: 40 }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 mb-3 bg-transparent border-none cursor-pointer"
        style={{ color: "#2d6870", fontFamily: "Jost", fontSize: 13, fontWeight: 500 }}
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <div
        className="card-design-sand mx-auto"
        style={{ maxWidth: 520, padding: "40px 40px 32px" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-center flex-1"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 28,
              fontWeight: 600,
              color: "#1e4a52",
              margin: 0,
            }}
          >
            Notifications
          </h2>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-medium bg-transparent border-none cursor-pointer shrink-0"
              style={{ color: "#2d6870", fontFamily: "Jost" }}
            >
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground text-sm py-8">Loading…</p>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <Bell className="h-10 w-10" style={{ color: "var(--swatch-text-light)" }} />
            <p
              className="text-center"
              style={{ color: "var(--swatch-antique-coin)", fontFamily: "Jost", fontSize: 14 }}
            >
              You're all caught up — no notifications yet.
            </p>
          </div>
        ) : (
          <NotificationList notifications={notifications} markOneRead={markOneRead} deleteOne={deleteOne} formatDate={formatDate} />
        )}
      </div>
    </div>
  );
}

function NotificationList({ notifications, markOneRead, deleteOne, formatDate }: {
  notifications: Notification[];
  markOneRead: (id: string) => void;
  deleteOne: (id: string) => void;
  formatDate: (d: string) => string;
}) {
  const { currentPage, setCurrentPage, totalPages, paginatedItems } = usePagination({
    items: notifications,
    pageSize: 8,
  });

  return (
    <>
      <div className="flex flex-col" style={{ gap: 4 }}>
        {paginatedItems.map((n) => {
              const Icon = typeIcon[n.type] || Bell;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-3 rounded-xl px-4 py-3 transition-colors"
                  style={{
                    background: n.is_read ? "transparent" : "rgba(45,104,112,0.06)",
                    borderLeft: n.is_read ? "3px solid transparent" : "3px solid var(--swatch-teal)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(45,104,112,0.1)" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "var(--swatch-teal)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm leading-snug"
                      style={{
                        fontFamily: "Jost",
                        fontWeight: n.is_read ? 400 : 600,
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      {n.title}
                    </p>
                    {n.body && (
                      <p
                        className="text-xs mt-0.5 leading-snug"
                        style={{ color: "var(--swatch-antique-coin)", fontFamily: "Jost" }}
                      >
                        {n.body}
                      </p>
                    )}
                    <p
                      className="text-[11px] mt-1"
                      style={{ color: "var(--swatch-text-light)", fontFamily: "Jost" }}
                    >
                      {formatDate(n.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    {!n.is_read && (
                      <button
                        onClick={() => markOneRead(n.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-black/5 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="h-3.5 w-3.5" style={{ color: "var(--swatch-teal)" }} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteOne(n.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-black/5 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        label={`Page ${currentPage} of ${totalPages}`}
      />
    </>
  );
}
