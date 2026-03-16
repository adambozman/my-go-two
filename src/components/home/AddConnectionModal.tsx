import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, QrCode, Send, Copy, Check, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface AddConnectionModalProps {
  open: boolean;
  onClose: () => void;
  onConnectionCreated?: () => void;
}

type Tab = "invite" | "qr";

export function AddConnectionModal({ open, onClose, onConnectionCreated }: AddConnectionModalProps) {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("invite");
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteLink = user
    ? `${window.location.origin}/connect?invite=${user.id}`
    : "";

  const handleSendInvite = async () => {
    if (!user || !email.trim()) return;

    setSending(true);
    try {
      // 1. Create the couples row (draft → pending)
      const { error: insertError } = await supabase.from("couples").insert({
        inviter_id: user.id,
        invitee_email: email.trim().toLowerCase(),
        display_label: label.trim() || email.trim().split("@")[0],
        status: "pending",
      });

      if (insertError) {
        // Check for duplicate
        if (insertError.message.includes("duplicate") || insertError.code === "23505") {
          toast.error("An invite for this email already exists.");
        } else {
          toast.error(insertError.message);
        }
        setSending(false);
        return;
      }

      // 2. Send the invite email + notifications via edge function
      await supabase.functions.invoke("collaborations", {
        body: { action: "send-invite-email", invitee_email: email.trim().toLowerCase() },
      });

      toast.success(`Invitation sent to ${email.trim()}`);
      onConnectionCreated?.();
      onClose();
      setLabel("");
      setEmail("");
    } catch (err: any) {
      toast.error("Failed to send invite");
    } finally {
      setSending(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Invite link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(30,74,82,0.40)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 bottom-4 z-50 max-w-[460px] mx-auto rounded-2xl overflow-hidden"
            style={{
              background: "var(--swatch-sand)",
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--swatch-viridian-odyssey)", color: "#fff" }}
                >
                  <UserPlus className="w-4 h-4" />
                </div>
                <h2
                  className="text-[18px] font-semibold"
                  style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Add Connection
                </h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg active:scale-90 transition-transform">
                <X className="w-5 h-5" style={{ color: "var(--swatch-text-light)" }} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 pb-3">
              {([
                { key: "invite" as Tab, icon: Mail, label: "Email Invite" },
                { key: "qr" as Tab, icon: QrCode, label: "Share Link" },
              ]).map(({ key, icon: Icon, label: tabLabel }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold transition-all"
                  style={{
                    background: tab === key ? "var(--swatch-viridian-odyssey)" : "rgba(255,255,255,0.5)",
                    color: tab === key ? "#fff" : "var(--swatch-antique-coin)",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tabLabel}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="px-5 pb-5">
              {tab === "invite" ? (
                <div className="space-y-3">
                  <p className="text-[12px]" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                    Enter their name and email to send a connection invite.
                  </p>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider mb-1 block"
                      style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
                      Label (e.g. Wife, Mom, Dad)
                    </label>
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Wife"
                      className="w-full px-3.5 py-2.5 rounded-xl text-[14px] outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.70)",
                        border: "1px solid rgba(255,255,255,0.85)",
                        color: "var(--swatch-viridian-odyssey)",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider mb-1 block"
                      style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="partner@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-[14px] outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.70)",
                        border: "1px solid rgba(255,255,255,0.85)",
                        color: "var(--swatch-viridian-odyssey)",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    />
                  </div>

                  <button
                    onClick={handleSendInvite}
                    disabled={!email.trim() || sending}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
                    style={{
                      background: "var(--swatch-cedar-grove)",
                      color: "#fff",
                      fontFamily: "'Jost', sans-serif",
                      boxShadow: "0 4px 20px rgba(212, 84, 58, 0.30)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    {sending ? "Sending..." : "Send Invite"}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[12px]" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                    Share this link with anyone you want to connect with. They'll create an account and link automatically.
                  </p>

                  {/* Link display */}
                  <div
                    className="flex items-center gap-2 px-3.5 py-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.70)",
                      border: "1px solid rgba(255,255,255,0.85)",
                    }}
                  >
                    <span
                      className="flex-1 text-[12px] truncate"
                      style={{ color: "var(--swatch-viridian-odyssey)", fontFamily: "'Jost', sans-serif" }}
                    >
                      {inviteLink}
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className="shrink-0 p-2 rounded-lg active:scale-90 transition-transform"
                      style={{ background: "rgba(45,104,112,0.08)" }}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" style={{ color: "var(--swatch-teal)" }} />
                      ) : (
                        <Copy className="w-4 h-4" style={{ color: "var(--swatch-teal)" }} />
                      )}
                    </button>
                  </div>

                  {/* QR Code */}
                  <div
                    className="flex items-center justify-center py-6 rounded-xl"
                    style={{ background: "#fff" }}
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(inviteLink)}&color=1e4a52`}
                      alt="QR Code"
                      className="w-[160px] h-[160px]"
                    />
                  </div>

                  <p className="text-[10px] text-center" style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
                    Scan this QR code to connect instantly
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
