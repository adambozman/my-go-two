import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, QrCode, Send, Copy, Check, UserPlus, Search, Loader2, AtSign, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface AddConnectionModalProps {
  open: boolean;
  onClose: () => void;
  onConnectionCreated?: () => void;
}

type Tab = "search" | "invite" | "qr";

interface SearchResult {
  user_id: string;
  display_name: string;
  discovery_avatar_url: string | null;
  match_type: "name" | "phone" | "email";
}

export function AddConnectionModal({ open, onClose, onConnectionCreated }: AddConnectionModalProps) {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [connectingUserId, setConnectingUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareToken, setShareToken] = useState("");
  const [loadingShareToken, setLoadingShareToken] = useState(false);
  const [shareTokenError, setShareTokenError] = useState("");
  const [seedingDemoProfiles, setSeedingDemoProfiles] = useState(false);

  const inviteLink = useMemo(
    () => (shareToken ? `${window.location.origin}/connect?token=${shareToken}` : ""),
    [shareToken],
  );

  const runSearchQuery = async (rawQuery: string) => {
    const { data: newSearchData, error: newSearchError } = await supabase.functions.invoke("searchforaddprofile", {
      body: { action: "search", query: rawQuery },
    });

    if (newSearchError) {
      throw newSearchError;
    }

    if (newSearchData?.error) {
      throw new Error(newSearchData.error);
    }

    const rows = Array.isArray(newSearchData?.users) ? newSearchData.users : [];

    const aggregateResults = new Map<string, SearchResult>();
    for (const row of rows) {
      if (!row?.user_id) continue;
      if (!aggregateResults.has(row.user_id)) {
        aggregateResults.set(row.user_id, {
          user_id: row.user_id,
          display_name: row.display_name ?? "User",
          discovery_avatar_url: row.discovery_avatar_url ?? null,
          match_type: (row.match_type as SearchResult["match_type"]) || "name",
        });
      }
    }

    return Array.from(aggregateResults.values()).slice(0, 10);
  };

  const seedDemoProfiles = async (showToast = true) => {
    const { data, error } = await supabase.functions.invoke("searchforaddprofile", {
      body: { action: "seed-demo-profiles" },
    });

    if (error) {
      throw error;
    }
    if (data?.error) {
      throw new Error(data.error);
    }

    if (showToast) {
      toast.success("Demo profiles created: Abby and Jules");
    }
  };

  useEffect(() => {
    if (!open) return;

    setTab("search");
    setSearchQuery("");
    setSearchResults([]);
    setEmail("");
    setInvitePhone("");
    setInviteUsername("");
    setCopied(false);
    setShareToken("");
    setShareTokenError("");
  }, [open]);

  useEffect(() => {
    if (!open || !user || tab !== "qr" || shareToken || loadingShareToken) return;

    const loadShareToken = async () => {
      setLoadingShareToken(true);
      setShareTokenError("");
      try {
        const { data, error } = await supabase.functions.invoke("searchforaddprofile", {
          body: { action: "create-connection-share-token", channel: "qr", days_valid: 30 },
        });

        if (error) {
          throw error;
        }

        const tokenValue = data?.share_token?.token;
        if (tokenValue) {
          setShareToken(tokenValue);
        }
      } catch (error: any) {
        setShareTokenError(error?.message || "Could not create a QR invite link right now.");
      } finally {
        setLoadingShareToken(false);
      }
    };

    loadShareToken();
  }, [loadingShareToken, open, shareToken, tab, user]);

  const handleSendInvite = async () => {
    if (!user || (!email.trim() && !invitePhone.trim() && !inviteUsername.trim())) return;

    setSending(true);
    try {
      let generatedInviteLink = inviteLink;
      if (!generatedInviteLink) {
        const { data: tokenData, error: tokenError } = await supabase.functions.invoke("searchforaddprofile", {
          body: { action: "create-connection-share-token", channel: "link", days_valid: 30 },
        });

        if (tokenError) {
          throw tokenError;
        }

        const tokenValue = tokenData?.share_token?.token;
        if (!tokenValue) {
          throw new Error("Could not create an invite link.");
        }

        generatedInviteLink = `${window.location.origin}/connect?token=${tokenValue}`;
        setShareToken(tokenValue);
      }

      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.functions.invoke("searchforaddprofile", {
        body: {
          action: "send-invite-email",
          invitee_email: normalizedEmail || null,
          invite_link: generatedInviteLink,
          invitee_phone: invitePhone.trim() || null,
          invitee_username: inviteUsername.trim() || null,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (normalizedEmail) {
        toast.success(`Invite link sent to ${normalizedEmail}`);
      } else {
        await navigator.clipboard.writeText(generatedInviteLink);
        setCopied(true);
        toast.success("Invite link copied. Send it to them directly.");
      }
      onConnectionCreated?.();
      onClose();
      setEmail("");
      setInvitePhone("");
      setInviteUsername("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to send invite");
    } finally {
      setSending(false);
    }
  };

  const handleSearch = async () => {
    if (!user || !searchQuery.trim()) return;

    setSearching(true);
    try {
      const rawQuery = searchQuery.trim();
      let results = await runSearchQuery(rawQuery);

      // Auto-heal demo account setup in environments where seed data wasn't created yet.
      if (
        results.length === 0 &&
        /(abby|jules|gotwo\.local)/i.test(rawQuery)
      ) {
        await seedDemoProfiles(false);
        results = await runSearchQuery(rawQuery);
      }

      setSearchResults(results);
    } catch (error: any) {
      const message = error?.message || "Search failed";
      toast.error(
        /edge function/i.test(message) || /failed to send a request/i.test(message)
          ? "Add Connection search is calling an edge function that is not deployed or not responding."
          : message,
      );
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleCreateConnection = async (targetUserId: string) => {
    setConnectingUserId(targetUserId);
    try {
      const { data, error } = await supabase.functions.invoke("searchforaddprofile", {
        body: {
          action: "create-connection-request",
          target_user_id: targetUserId,
        },
      });

      if (error) {
        throw error;
      }

      const status = data?.status;

      if (status === "already_connected") {
        toast.success("You are already connected.");
      } else if (status === "pending_exists") {
        toast.success("A connection invite is already pending.");
      } else {
        toast.success("Connection invite sent.");
      }

      onConnectionCreated?.();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Could not send connection invite");
    } finally {
      setConnectingUserId(null);
    }
  };

  const handleSeedDemoProfiles = async () => {
    if (!user || seedingDemoProfiles) return;
    setSeedingDemoProfiles(true);
    try {
      await seedDemoProfiles(true);
      if (searchQuery.trim()) {
        await handleSearch();
      }
    } catch (error: any) {
      toast.error(error?.message || "Could not create demo profiles");
    } finally {
      setSeedingDemoProfiles(false);
    }
  };

  const handleCopyLink = async () => {
    if (!inviteLink) return;
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(30,74,82,0.40)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-connection-title"
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[calc(100vh-2rem)] w-auto max-w-[620px] -translate-y-1/2 overflow-y-auto rounded-[28px] md:inset-x-0"
            style={{
              background: "linear-gradient(165deg, rgba(255,255,255,0.74) 0%, rgba(245,233,220,0.5) 100%)",
              border: "1px solid rgba(255,255,255,0.88)",
              boxShadow: "0 20px 48px rgba(74,96,104,0.14), inset 0 1px 0 rgba(255,255,255,0.94)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--swatch-teal)", color: "#fff" }}
                >
                  <UserPlus className="w-4 h-4" />
                </div>
                <h2
                  id="add-connection-title"
                  className="text-[18px] font-semibold"
                  style={{ color: "var(--swatch-teal)", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Add Connection
                </h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg active:scale-90 transition-transform">
                <X className="w-5 h-5" style={{ color: "var(--swatch-text-light)" }} />
              </button>
            </div>

            <div
              className="mx-5 mb-3 grid grid-cols-3 gap-2 rounded-[22px] p-1.5"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(245,233,220,0.34) 100%)",
                border: "1px solid rgba(255,255,255,0.72)",
              }}
            >
              {([
                { key: "search" as Tab, icon: Search, label: "Search" },
                { key: "invite" as Tab, icon: Mail, label: "Add User" },
                { key: "qr" as Tab, icon: QrCode, label: "Share QR" },
              ]).map(({ key, icon: Icon, label: tabLabel }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className="surface-pill min-w-0 flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[11px] font-semibold transition-all"
                  style={{
                    background: tab === key ? "var(--swatch-teal)" : undefined,
                    color: tab === key ? "hsl(var(--primary-foreground))" : "var(--swatch-antique-coin)",
                    fontFamily: "'Jost', sans-serif",
                    boxShadow: tab === key ? "0 8px 20px rgba(30,74,82,0.22), inset 0 1px 0 rgba(255,255,255,0.18)" : undefined,
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate whitespace-nowrap">{tabLabel}</span>
                </button>
              ))}
            </div>

            <div className="px-5 pb-5">
              {tab === "search" ? (
                <div className="space-y-3">
                  <p className="text-[12px]" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                    Search by email, phone, or username first. If they are already on Go Two, send them a direct connection invite.
                  </p>

                  <button
                    type="button"
                    onClick={handleSeedDemoProfiles}
                    disabled={seedingDemoProfiles}
                    className="surface-pill inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] disabled:opacity-50"
                    style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                  >
                    {seedingDemoProfiles ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserPlus className="h-3.5 w-3.5" />}
                    {seedingDemoProfiles ? "Creating Demo Profiles..." : "Create Demo Profiles"}
                  </button>

                  <div>
                    <label
                      className="text-[10px] font-semibold uppercase tracking-wider mb-1 block"
                      style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
                    >
                      Email, Phone, or Username
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleSearch();
                          }
                        }}
                        placeholder="Search by email, phone, or username"
                        className="surface-field w-full px-3.5 py-2.5 rounded-2xl text-[14px] outline-none transition-all"
                        style={{
                          color: "var(--swatch-teal)",
                          fontFamily: "'Jost', sans-serif",
                        }}
                      />
                      <button
                        onClick={handleSearch}
                        disabled={!searchQuery.trim() || searching}
                        className="surface-pill inline-flex items-center justify-center rounded-2xl px-4 active:scale-[0.98] disabled:opacity-50"
                        style={{ color: "var(--swatch-teal)" }}
                      >
                        {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {searching ? (
                      <div className="surface-pill flex items-center gap-2 rounded-2xl px-3.5 py-3 text-[12px]" style={{ color: "var(--swatch-antique-coin)" }}>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Searching...
                      </div>
                    ) : searchQuery.trim() && searchResults.length === 0 ? (
                      <div className="surface-pill rounded-2xl px-3.5 py-3 text-[12px]" style={{ color: "var(--swatch-antique-coin)" }}>
                        No user found. Use Add User if they are not on Go Two yet.
                      </div>
                    ) : (
                      searchResults.map((result) => (
                        <div
                          key={result.user_id}
                          className="surface-pill flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold" style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}>
                              {result.display_name}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
                              Found by {result.match_type}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCreateConnection(result.user_id)}
                            disabled={connectingUserId === result.user_id}
                            className="surface-button-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] disabled:opacity-50"
                            style={{
                              background: "var(--swatch-teal)",
                              color: "white",
                              fontFamily: "'Jost', sans-serif",
                            }}
                          >
                            {connectingUserId === result.user_id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserPlus className="h-3.5 w-3.5" />}
                            Connect
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : tab === "invite" ? (
                <div className="space-y-3">
                  <p className="text-[12px]" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                    Add their email, phone, or username. If they are not on Go Two yet, we will generate an invite link for you to send.
                  </p>

                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                    <label
                      className="text-[10px] font-semibold uppercase tracking-wider mb-1 block"
                      style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
                    >
                      Email Address
                    </label>
                      <div className="relative">
                        <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--swatch-text-light)" }} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@email.com"
                          className="surface-field w-full rounded-2xl py-2.5 pr-3.5 pl-9 text-[14px] outline-none transition-all"
                          style={{
                            color: "var(--swatch-teal)",
                            fontFamily: "'Jost', sans-serif",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-[10px] font-semibold uppercase tracking-wider mb-1 block"
                        style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
                      >
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--swatch-text-light)" }} />
                        <input
                          type="tel"
                          value={invitePhone}
                          onChange={(e) => setInvitePhone(e.target.value)}
                          placeholder="(555) 555-5555"
                          className="surface-field w-full rounded-2xl py-2.5 pr-3.5 pl-9 text-[14px] outline-none transition-all"
                          style={{
                            color: "var(--swatch-teal)",
                            fontFamily: "'Jost', sans-serif",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-[10px] font-semibold uppercase tracking-wider mb-1 block"
                        style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}
                      >
                        Username
                      </label>
                      <div className="relative">
                        <UserPlus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--swatch-text-light)" }} />
                        <input
                          value={inviteUsername}
                          onChange={(e) => setInviteUsername(e.target.value)}
                          placeholder="@abby"
                          className="surface-field w-full rounded-2xl py-2.5 pr-3.5 pl-9 text-[14px] outline-none transition-all"
                          style={{
                            color: "var(--swatch-teal)",
                            fontFamily: "'Jost', sans-serif",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSendInvite}
                    disabled={(!email.trim() && !invitePhone.trim() && !inviteUsername.trim()) || sending}
                    className="surface-button-primary w-full flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
                    style={{
                      background: "var(--swatch-cedar-grove)",
                      color: "hsl(var(--destructive-foreground))",
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    {sending ? "Sending..." : "Send Invite Link"}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[12px]" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                    Share this link or QR code with someone to send them a connection invite safely.
                  </p>

                  <div
                    className="surface-pill flex items-center gap-2 px-3.5 py-3 rounded-2xl"
                    style={{}}
                  >
                    <span
                      className="flex-1 text-[12px] truncate"
                      style={{ color: "var(--swatch-teal)", fontFamily: "'Jost', sans-serif" }}
                    >
                      {inviteLink}
                    </span>
                    <button
                      onClick={handleCopyLink}
                       className="surface-pill shrink-0 p-2 rounded-full active:scale-90 transition-transform"
                       style={{}}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" style={{ color: "var(--swatch-teal)" }} />
                      ) : (
                        <Copy className="w-4 h-4" style={{ color: "var(--swatch-teal)" }} />
                      )}
                    </button>
                  </div>

                  <div className="surface-pill flex items-center justify-center py-6 rounded-2xl" style={{}}>
                    {loadingShareToken ? (
                      <div className="flex h-[160px] w-[160px] items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--swatch-teal)" }} />
                      </div>
                    ) : shareTokenError ? (
                      <div
                        className="flex h-[160px] w-[160px] items-center justify-center text-center text-[12px]"
                        style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}
                      >
                        {shareTokenError}
                      </div>
                    ) : inviteLink ? (
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(inviteLink)}&color=1e4a52`}
                        alt="QR Code"
                        className="w-[160px] h-[160px]"
                      />
                    ) : (
                      <div className="flex h-[160px] w-[160px] items-center justify-center text-center text-[12px]" style={{ color: "var(--swatch-antique-coin)", fontFamily: "'Jost', sans-serif" }}>
                        QR link unavailable
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] text-center" style={{ color: "var(--swatch-text-light)", fontFamily: "'Jost', sans-serif" }}>
                    Scan this QR code to send a connection invite
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
