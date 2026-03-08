import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Edit2, Share2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

interface List {
  id: string;
  title: string;
  description: string | null;
  is_shared: boolean | null;
  created_at: string;
}

const MyLists = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<List | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchLists = async () => {
    if (!user) return;
    const { data } = await supabase.from("lists").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setLists(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLists(); }, [user]);

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    if (editingList) {
      await supabase.from("lists").update({ title, description }).eq("id", editingList.id);
    } else {
      await supabase.from("lists").insert({ title, description, user_id: user.id });
    }
    setDialogOpen(false);
    setEditingList(null);
    setTitle("");
    setDescription("");
    fetchLists();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("lists").delete().eq("id", id);
    fetchLists();
    toast({ title: "List deleted" });
  };

  const toggleShared = async (list: List) => {
    await supabase.from("lists").update({ is_shared: !list.is_shared }).eq("id", list.id);
    fetchLists();
  };

  const openEdit = (list: List) => {
    setEditingList(list);
    setTitle(list.title);
    setDescription(list.description ?? "");
    setDialogOpen(true);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">My Lists</h1>
          <p className="text-muted-foreground">My lists, organized and ready to use.</p>
        </div>
        <Button className="rounded-full" onClick={() => { setEditingList(null); setTitle(""); setDescription(""); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> New List
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : lists.length === 0 ? (
        <div className="card-design-neumorph p-12 text-center">
          <p className="text-muted-foreground mb-4">No lists yet. Create your first one!</p>
          <Button className="rounded-full" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create List
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {lists.map((list) => (
            <div key={list.id} className="card-design-neumorph p-6">
              <div className="flex items-start justify-between mb-2">
                <Link to={`/dashboard/lists/${list.id}`} className="flex-1">
                  <h3 className="text-lg font-bold text-primary hover:underline cursor-pointer">{list.title}</h3>
                </Link>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(list)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(list.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {list.description && <p className="text-sm text-muted-foreground mb-3">{list.description}</p>}
              <div className="flex items-center gap-2 text-sm">
                <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Shared</span>
                <Switch checked={list.is_shared ?? false} onCheckedChange={() => toggleShared(list)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingList ? "Edit List" : "Create New List"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Food & Drinks" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What's this list about?" className="rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={handleSave} disabled={!title.trim()}>
              {editingList ? "Save Changes" : "Create List"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyLists;
