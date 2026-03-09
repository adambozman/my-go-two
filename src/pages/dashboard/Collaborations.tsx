import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Users, Mail, QrCode, Copy, Check, Clock, UserCheck, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";

interface Couple {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  invitee_email: string;
  status: string;
  created_at: string;
}

const Collaborations = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [couples, setCouples] = useState<Couple[]>([]);
  const [pendingForMe, setPendingForMe] = useState<Couple[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const inviteLink = user
    ? `${window.location.origin}/signup?invite=${user.id}`
    : "";

  const callEdgeFunction = async (action: string, extra: Record<string, string> = {}) => {
    const { data, error } = await supabase.functions.invoke("collaborations", {
      body: { action, ...extra },
    });
    if (error) throw error;
    return data;
  };

  const fetchData = async () => {
    if (!user) { setLoading(false); return; }
    try {
      // Fetch user's visible couples (RLS: inviter or invitee)
      const { data: myData } = await supabase
        .from("couples")
        .select("*")
        .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
        .order("created_at", { ascending: false });
      setCouples(myData ?? []);

      // Fetch pending invites by email via edge function (bypasses RLS)
      const result = await callEdgeFunction("get-pending");
      setPendingForMe(result?.pending ?? []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  // Check for invite param in URL (from QR code link redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviterId = params.get("invite");
    if (inviterId && user && inviterId !== user.id) {
      callEdgeFunction("link-by-inviter", { inviter_id: inviterId })
        .then(() => {
          toast({ title: "Connected!", description: "You're now linked with your partner." });
          // Clean URL
          window.history.replaceState({}, "", window.location.pathname);
          fetchData();
        })
        .catch(() => {});
    }
  }, [user]);

  const handleEmailInvite = async () => {
    if (!user || !inviteEmail.trim()) return;
    setSending(true);
    const { error } = await supabase.from("couples").insert({
      inviter_id: user.id,
      invitee_email: inviteEmail.trim(),
    });
    setSending(false);

    if (error) {
      toast({ title: "Could not send invite", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Invitation sent!", description: `Invited ${inviteEmail.trim()}` });
      setInviteEmail("");
      setEmailDialogOpen(false);
      fetchData();
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAccept = async (coupleId: string) => {
    try {
      await callEdgeFunction("accept-invite", { invite_id: coupleId });
      toast({ title: "Collaboration accepted!" });
      fetchData();
    } catch {
      toast({ title: "Failed to accept", variant: "destructive" });
    }
  };

  const handleAcceptAll = async () => {
    try {
      await callEdgeFunction("accept-by-email");
      toast({ title: "All invitations accepted!" });
      fetchData();
    } catch {
      toast({ title: "Failed to accept", variant: "destructive" });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <UserCheck className="w-4 h-4" style={{ color: 'var(--swatch-gothic-revival-green)' }} />;
      case "pending": return <Clock className="w-4 h-4" style={{ color: 'var(--swatch-sonoma-chardonnay)' }} />;
      default: return <UserX className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "accepted": return "Connected";
      case "pending": return "Pending";
      default: return status;
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
        Collaborations
      </h1>
      <p className="text-muted-foreground mb-8">
        Link your <GoTwoText className="text-sm" /> account with someone to share lists and preferences.
      </p>

      {/* Invite Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <button
          onClick={() => setQrDialogOpen(true)}
          className="card-design-neumorph p-6 text-left hover:scale-[1.01] transition-transform group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
            <QrCode className="w-6 h-6" style={{ color: 'var(--swatch-viridian-odyssey)' }} />
          </div>
          <div>
            <h3 className="font-semibold text-primary group-hover:underline">Share QR Code</h3>
            <p className="text-sm text-muted-foreground">Scan to connect instantly</p>
          </div>
        </button>

        <button
          onClick={() => setEmailDialogOpen(true)}
          className="card-design-neumorph p-6 text-left hover:scale-[1.01] transition-transform group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
            <Mail className="w-6 h-6" style={{ color: 'var(--swatch-cedar-grove)' }} />
          </div>
          <div>
            <h3 className="font-semibold text-primary group-hover:underline">Invite by Email</h3>
            <p className="text-sm text-muted-foreground">Send an email invitation</p>
          </div>
        </button>
      </div>

      {/* Pending Invites for Me */}
      {pendingForMe.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Pending Invitations</h2>
            {pendingForMe.length > 1 && (
              <Button size="sm" variant="outline" className="rounded-full" onClick={handleAcceptAll}>
                Accept All
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {pendingForMe.map((c) => (
              <div key={c.id} className="card-design-neumorph p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" style={{ color: 'var(--swatch-sonoma-chardonnay)' }} />
                  <span className="text-sm text-muted-foreground">Someone invited you to connect</span>
                </div>
                <Button size="sm" className="rounded-full" onClick={() => handleAccept(c.id)}>Accept</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connections List */}
      <div>
        <h2 className="text-lg font-bold text-primary mb-4">Your Connections</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : couples.length === 0 && pendingForMe.length === 0 ? (
          <div className="card-design-neumorph p-8 text-center">
            <Users className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--swatch-gypsum-rose)' }} />
            <p className="text-muted-foreground">No connections yet. Invite someone using a QR code or email above!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {couples.map((c) => (
              <div key={c.id} className="card-design-neumorph p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(c.status)}
                  <div>
                    <p className="text-sm font-medium text-primary">{c.invitee_email}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.inviter_id === user?.id ? "You invited" : "Invited you"} · {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{
                    background: c.status === "accepted" ? 'rgba(157, 166, 79, 0.2)' : 'rgba(233, 203, 116, 0.2)',
                    color: c.status === "accepted" ? 'var(--swatch-gothic-revival-green)' : 'var(--swatch-sonoma-chardonnay)',
                  }}
                >
                  {getStatusLabel(c.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="card-design-neumorph p-6 rounded-2xl">
              <QRCodeSVG
                value={inviteLink}
                size={200}
                bgColor="transparent"
                fgColor="#2F5F6D"
                level="M"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Have your partner scan this code to link your accounts
            </p>
            <div className="flex items-center gap-2 w-full">
              <Input value={inviteLink} readOnly className="rounded-xl text-xs" />
              <Button variant="outline" size="icon" className="shrink-0" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Invite Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite by Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Partner's Email</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="partner@example.com"
                className="rounded-xl"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              If they already have an account, they'll see the invite on their Collaborations page. Otherwise, share your QR code or invite link.
            </p>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={handleEmailInvite} disabled={!inviteEmail.trim() || sending}>
              {sending ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Collaborations;
