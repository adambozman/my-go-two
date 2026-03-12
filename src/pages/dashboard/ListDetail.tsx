import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Edit2, ArrowLeft, Save, Sparkles, Loader2 } from "lucide-react";
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
  section?: string;
  gender?: string[];
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
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const fromTemplate = (location.state as any)?.fromTemplate as string | undefined;
  const { toast } = useToast();
  const [listTitle, setListTitle] = useState("");
  const [cards, setCards] = useState<GoTwoCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GoTwoCard | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [fields, setFields] = useState<CardField[]>([{ label: "", type: "text", value: "" }]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [userGender, setUserGender] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [autofillingCardId, setAutofillingCardId] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user || !listId) return;
    const [{ data: list }, { data: cardsData }, { data: templatesData }, { data: profile }] = await Promise.all([
      supabase.from("lists").select("title").eq("id", listId).single(),
      supabase.from("cards").select("*").eq("list_id", listId).order("created_at", { ascending: false }),
      supabase.from("card_templates").select("*"),
      supabase.from("profiles").select("gender").eq("user_id", user.id).single(),
    ]);
    setListTitle(list?.title ?? "");
    setUserGender((profile as any)?.gender ?? null);
    setCards(
      (cardsData ?? []).map((c) => ({
        ...c,
        fields: ((c.fields as unknown as any[]) ?? []).map((f: any) => ({
          ...f,
          label: f.label || f.name || "Untitled",
          value: f.value ?? "",
        })) as CardField[],
      }))
    );
    setTemplates(templatesData ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user, listId]);

  const filterFieldsByGender = (fields: CardField[]): CardField[] => {
    return fields.filter((f) => {
      if (!f.gender || f.gender.length === 0) return true;
      if (!userGender) return true; // show all if no gender set
      return f.gender.includes(userGender);
    });
  };

  const applyTemplate = (templateId: string) => {
    const t = templates.find((t) => t.id === templateId);
    if (!t) return;
    setCardTitle(t.name);
    const rawFields = (t.default_fields as unknown as any[]) ?? [];
    setFields(rawFields.map((f: any) => ({
      ...f,
      label: f.label || f.name || "Untitled",
      value: f.value ?? "",
    })) as CardField[]);
  };

  const addField = () => setFields([...fields, { label: "", type: "text", value: "" }]);
  const removeField = (i: number) => setFields(fields.filter((_, idx) => idx !== i));
  const updateField = (i: number, key: string, val: string) => {
    const updated = [...fields];
    (updated[i] as any)[key] = val;
    setFields(updated);
  };

  // For inline editing on the card detail view
  const updateCardFieldValue = (cardId: string, fieldIndex: number, val: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const updated = [...c.fields];
        updated[fieldIndex] = { ...updated[fieldIndex], value: val };
        return { ...c, fields: updated };
      })
    );
  };

  const saveCardInline = async (card: GoTwoCard) => {
    setSaving(true);
    const fieldsJson = card.fields as unknown as Json;
    await supabase.from("cards").update({ fields: fieldsJson }).eq("id", card.id);
    setSaving(false);
    toast({ title: "Saved!" });
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

  // Group fields by section for display
  const groupFieldsBySection = (fields: CardField[]) => {
    const filtered = filterFieldsByGender(fields);
    const sections: { name: string; fields: { field: CardField; originalIndex: number }[] }[] = [];
    const sectionMap = new Map<string, { field: CardField; originalIndex: number }[]>();

    filtered.forEach((f) => {
      // Find the original index in the unfiltered array
      const originalIndex = fields.indexOf(f);
      const sectionName = f.section || "Details";
      if (!sectionMap.has(sectionName)) {
        sectionMap.set(sectionName, []);
      }
      sectionMap.get(sectionName)!.push({ field: f, originalIndex });
    });

    sectionMap.forEach((items, name) => {
      sections.push({ name, fields: items });
    });

    return sections;
  };

  const handleAiAutofill = async (card: GoTwoCard) => {
    setAutofillingCardId(card.id);
    try {
      const { data, error } = await supabase.functions.invoke('ai-autofill', {
        body: {
          cardTitle: card.title,
          fields: card.fields.map(f => ({
            label: f.label,
            type: f.type,
            options: f.options,
          })),
        },
      });
      if (error) throw error;
      const values: string[] = data?.values ?? [];
      setCards(prev =>
        prev.map(c => {
          if (c.id !== card.id) return c;
          const updated = c.fields.map((f, i) => ({
            ...f,
            value: values[i] ?? f.value,
          }));
          return { ...c, fields: updated };
        })
      );
      toast({ title: "AI autofill complete!", description: "Review the suggestions and save when ready." });
    } catch (e: any) {
      console.error("AI autofill error:", e);
      toast({ title: "Autofill failed", description: e.message || "Please try again.", variant: "destructive" });
    } finally {
      setAutofillingCardId(null);
    }
  };
  const hasSections = (fields: CardField[]) => fields.some((f) => f.section);



  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
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
        <div className="space-y-6">
          {cards.map((card) => {
            const sections = groupFieldsBySection(card.fields);
            const useSections = hasSections(card.fields);

            return (
              <div key={card.id} className="card-design-neumorph p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">{card.title}</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAiAutofill(card)}
                      disabled={autofillingCardId === card.id}
                      title="AI Autofill"
                    >
                      {autofillingCardId === card.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(card)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(card.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {useSections ? (
                  <div className="space-y-6">
                    {sections.map((section) => (
                      <div key={section.name}>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--swatch-cedar-grove)' }}>
                          {section.name}
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {section.fields.map(({ field, originalIndex }) => (
                            <div key={originalIndex} className="space-y-1">
                              <Label className="text-xs text-muted-foreground">{field.label}</Label>
                              {field.type === "select" && field.options ? (
                                <Select
                                  value={field.value}
                                  onValueChange={(val) => updateCardFieldValue(card.id, originalIndex, val)}
                                >
                                  <SelectTrigger className="rounded-xl h-9 text-sm">
                                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}...`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options.map((opt) => (
                                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  value={field.value}
                                  onChange={(e) => updateCardFieldValue(card.id, originalIndex, e.target.value)}
                                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                                  className="rounded-xl h-9 text-sm"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => saveCardInline(card)}
                      disabled={saving}
                    >
                      <Save className="mr-2 h-3.5 w-3.5" />
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filterFieldsByGender(card.fields).map((field, i) => {
                      const originalIndex = card.fields.indexOf(field);
                      return (
                        <div key={i} className="space-y-1">
                          <Label className="text-xs text-muted-foreground">{field.label}</Label>
                          {field.type === "select" && field.options ? (
                            <Select
                              value={field.value}
                              onValueChange={(val) => updateCardFieldValue(card.id, originalIndex, val)}
                            >
                              <SelectTrigger className="rounded-xl h-9 text-sm">
                                <SelectValue placeholder={`Select...`} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((opt) => (
                                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              value={field.value}
                              onChange={(e) => updateCardFieldValue(card.id, originalIndex, e.target.value)}
                              placeholder={`Enter ${field.label.toLowerCase()}...`}
                              className="rounded-xl h-9 text-sm"
                            />
                          )}
                        </div>
                      );
                    })}
                    <Button
                      size="sm"
                      className="rounded-full mt-2"
                      onClick={() => saveCardInline(card)}
                      disabled={saving}
                    >
                      <Save className="mr-2 h-3.5 w-3.5" />
                      {saving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
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
