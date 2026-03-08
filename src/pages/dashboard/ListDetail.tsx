import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Edit2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import type { Json } from "@/integrations/supabase/types";

interface CardField {
  label: string;
  type: "text" | "select";
  value: string;
  options?: string[];
}

interface GoTwoCard {
  id: string;
  title: string;
  category: string | null;
  fields: CardField[];
  created_at: string;
}

const ListDetail = () => {
  const { listId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [listTitle, setListTitle] = useState("");
  const [cards, setCards] = useState<GoTwoCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GoTwoCard | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [fields, setFields] = useState<CardField[]>([{ label: "", type: "text", value: "" }]);
  const [templates, setTemplates] = useState<any[]>([]);

  const fetchData = async () => {
    if (!user || !listId) return;
    const [{ data: list }, { data: cardsData }, { data: templatesData }] = await Promise.all([
      supabase.from("lists").select("title").eq("id", listId).single(),
      supabase.from("cards").select("*").eq("list_id", listId).order("created_at", { ascending: false }),
      supabase.from("card_templates").select("*"),
    ]);
    setListTitle(list?.title ?? "");
    setCards(
      (cardsData ?? []).map((c) => ({
        ...c,
        fields: (c.fields as unknown as CardField[]) ?? [],
      }))
    );
    setTemplates(templatesData ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user, listId]);

  const applyTemplate = (templateId: string) => {
    const t = templates.find((t) => t.id === templateId);
    if (!t) return;
    setCardTitle(t.name);
    setFields((t.default_fields as unknown as CardField[]) ?? []);
  };

  const addField = () => setFields([...fields, { label: "", type: "text", value: "" }]);
  const removeField = (i: number) => setFields(fields.filter((_, idx) => idx !== i));
  const updateField = (i: number, key: string, val: string) => {
    const updated = [...fields];
    (updated[i] as any)[key] = val;
    setFields(updated);
  };

  const handleSave = async () => {
    if (!user || !listId || !cardTitle.trim()) return;
    const fieldsJson = fields as unknown as Json;
    if (editingCard) {
      await supabase.from("cards").update({ title: cardTitle, fields: fieldsJson }).eq("id", editingCard.id);
    } else {
      await supabase.from("cards").insert({ title: cardTitle, fields: fieldsJson, list_id: listId, user_id: user.id });
    }
    setDialogOpen(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("cards").delete().eq("id", id);
    fetchData();
    toast({ title: "Card deleted" });
  };

  const openEdit = (card: GoTwoCard) => {
    setEditingCard(card);
    setCardTitle(card.title);
    setFields(card.fields.length > 0 ? card.fields : [{ label: "", type: "text", value: "" }]);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCard(null);
    setCardTitle("");
    setFields([{ label: "", type: "text", value: "" }]);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard/lists">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">{listTitle}</h1>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Button className="rounded-full" onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Card
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : cards.length === 0 ? (
        <div className="card-design-neumorph p-12 text-center">
          <p className="text-muted-foreground mb-4">No cards in this list yet.</p>
          <Button className="rounded-full" onClick={() => { resetForm(); setDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add Your First Card
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.id} className="card-design-neumorph p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-primary">{card.title}</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(card)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(card.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {card.fields.map((field, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{field.label}</span>
                    <span className="font-medium text-primary">{field.value || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCard ? "Edit Card" : <>Create <GoTwoText className="text-lg" /> Card</>}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!editingCard && templates.length > 0 && (
              <div className="space-y-2">
                <Label>Start from template (optional)</Label>
                <Select onValueChange={applyTemplate}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Choose a template..." /></SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Card Title</Label>
              <Input value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="e.g. My Coffee Order" className="rounded-xl" />
            </div>
            <div className="space-y-3">
              <Label>Fields</Label>
              {fields.map((field, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    <Input
                      placeholder="Field name"
                      value={field.label}
                      onChange={(e) => updateField(i, "label", e.target.value)}
                      className="text-sm rounded-xl"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Input
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) => updateField(i, "value", e.target.value)}
                      className="text-sm rounded-xl"
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeField(i)} disabled={fields.length <= 1}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="rounded-full" onClick={addField}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Field
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={handleSave} disabled={!cardTitle.trim()}>
              {editingCard ? "Save Changes" : "Create Card"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListDetail;
