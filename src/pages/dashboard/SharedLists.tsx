import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserPlus, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SharedLists = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [couples, setCouples] = useState<any[]>([]);
  const [sharedLists, setSharedLists] = useState<any[]>([]);
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);

  const fetchData = async () => {
    if (!user) return;
    const [{ data: couplesData }, { data: listsData }, { data: pendingData }] = await Promise.all([
      supabase.from("couples").select("*").eq("status", "accepted"),
      supabase.from("lists").select("*").eq("is_shared", true).neq("user_id", user.id),
      supabase.from("couples").select("*").eq("invitee_email", user.email).eq("status", "pending"),
    ]);
    setCouples(couplesData ?? []);
    setSharedLists(listsData ?? []);
    setPendingInvites(pendingData ?? []);
  };

  useEffect(() => { fetchData(); }, [user]);

  const sendInvite = async () => {
    if (!user || !email.trim()) return;
    const { error } = await supabase.from("couples").insert({ inviter_id: user.id, invitee_email: email });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Invite sent!" });
      setInviteOpen(false);
      setEmail("");
      fetchData();
    }
  };

  const respondInvite = async (id: string, accept: boolean) => {
    if (!user) return;
    await supabase.from("couples").update({
      status: accept ? "accepted" : "declined",
      invitee_id: user.id,
    }).eq("id", id);
    toast({ title: accept ? "Invitation accepted!" : "Invitation declined" });
    fetchData();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Shared</h1>
          <p className="text-muted-foreground">Lists shared with you by your partner.</p>
        </div>
        <Button onClick={() => setInviteOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Invite Partner
        </Button>
      </div>

      {pendingInvites.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-3">Pending Invitations</h2>
          <div className="space-y-3">
            {pendingInvites.map((inv) => (
              <Card key={inv.id} className="border-accent/30 bg-accent/5">
                <CardContent className="flex items-center justify-between py-4">
                  <p className="text-sm">Someone invited you to connect as partners</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => respondInvite(inv.id, true)}>
                      <Check className="mr-1 h-3.5 w-3.5" /> Accept
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => respondInvite(inv.id, false)}>
                      <X className="mr-1 h-3.5 w-3.5" /> Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {sharedLists.length === 0 ? (
        <Card className="border-border/50 border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {couples.length === 0
                ? "No partner connected yet. Invite someone to start sharing!"
                : "Your partner hasn't shared any lists yet."}
            </p>
            {couples.length === 0 && (
              <Button onClick={() => setInviteOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" /> Invite Partner
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sharedLists.map((list) => (
            <Card key={list.id} className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">{list.title}</CardTitle>
              </CardHeader>
              {list.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{list.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Your Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Partner's email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="partner@example.com" type="email" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={sendInvite} disabled={!email.trim()}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SharedLists;
