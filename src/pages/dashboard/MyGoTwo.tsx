import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ListChecks, Share2, Plus, Trash2, Edit2, Sparkles, Coffee, Shirt, Gift, Utensils, Heart, FileText, Footprints, Scissors, Ruler, SprayCan, Droplet, UtensilsCrossed, Salad, ShoppingBasket, Flower2, Gem, PartyPopper, Cake, MapPin, Plane, CalendarHeart, ThumbsDown, Languages, Tags, Package, Apple, Store, Calendar, HeartHandshake, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import { Switch } from "@/components/ui/switch";

interface List {
  id: string;
  title: string;
  description: string | null;
  is_shared: boolean | null;
  created_at: string;
}

interface Template {
  id: string;
  name: string;
  icon: string | null;
  category: string;
  default_fields: any;
}

const iconMap: Record<string, any> = {
  shirt: Shirt, footprints: Footprints, sprayCan: SprayCan, scissors: Scissors,
  ruler: Ruler, coffee: Coffee, utensils: Utensils, utensilsCrossed: UtensilsCrossed,
  salad: Salad, shoppingBasket: ShoppingBasket, flower2: Flower2, droplet: Droplet,
  gem: Gem, gift: Gift, partyPopper: PartyPopper, cake: Cake, mapPin: MapPin,
  plane: Plane, calendarHeart: CalendarHeart, thumbsDown: ThumbsDown, languages: Languages,
  tags: Tags, package: Package, heart: Heart, apple: Apple,
  "shopping-basket": ShoppingBasket, "flower-2": Flower2, "list-checks": ListChecks,
  "calendar-heart": CalendarHeart, store: Store, calendar: Calendar,
  "thumbs-down": ThumbsDown, "heart-handshake": HeartHandshake, tag: Tag,
  sparkles: Sparkles, file: FileText,
};

const categoryLabels: Record<string, string> = {
  personal: "Personal",
  "food-drink": "Food & Drink",
  "gifts-occasions": "Gifts & Occasions",
  experiences: "Experiences",
  preferences: "Preferences",
};

const categoryOrder = ["personal", "food-drink", "gifts-occasions", "experiences", "preferences"];

const MyGoTwo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [lists, setLists] = useState<List[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<List | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    try {
      const { data: templatesData } = await supabase.from("card_templates").select("*");
      setTemplates(templatesData ?? []);

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: listsData } = await supabase
        .from("lists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setLists(listsData ?? []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

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
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("lists").delete().eq("id", id);
    fetchData();
    toast({ title: "List deleted" });
  };

  const toggleShared = async (list: List) => {
    await supabase.from("lists").update({ is_shared: !list.is_shared }).eq("id", list.id);
    fetchData();
  };

  const openEdit = (list: List) => {
    setEditingList(list);
    setTitle(list.title);
    setDescription(list.description ?? "");
    setDialogOpen(true);
  };

  const openCreate = () => {
    setEditingList(null);
    setTitle("");
    setDescription("");
    setDialogOpen(true);
  };

  const handleTemplateClick = async (template: Template) => {
    if (!user) return;
    const { data: newList } = await supabase
      .from("lists")
      .insert({ title: template.name, description: `Created from ${template.name} template`, user_id: user.id })
      .select()
      .single();

    if (newList) {
      await supabase.from("cards").insert({
        title: template.name,
        fields: template.default_fields,
        list_id: newList.id,
        user_id: user.id,
        template_id: template.id,
      });
      toast({ title: `Created "${template.name}" list with starter card` });
      fetchData();
    }
  };

  const grouped = categoryOrder
    .map((cat) => ({
      key: cat,
      label: categoryLabels[cat] ?? cat,
      items: templates.filter((t) => t.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="max-w-5xl">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
        My <GoTwoText className="text-2xl" />
      </h1>

      {/* Templates by Category */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-primary mb-6">Start from a Template</h2>
        {grouped.map((group) => (
          <div key={group.key} className="mb-8">
            <h3 className="text-base font-semibold text-muted-foreground mb-3">{group.label}</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((t) => {
                const Icon = iconMap[t.icon ?? ""] || FileText;
                const fieldCount = Array.isArray(t.default_fields) ? t.default_fields.length : 0;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateClick(t)}
                    className="card-design-neumorph p-4 text-left hover:scale-[1.02] transition-transform group"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.3)' }}>
                      <Icon className="w-4 h-4" style={{ color: 'var(--swatch-cedar-grove)' }} />
                    </div>
                    <h4 className="font-semibold text-primary text-sm group-hover:underline">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{fieldCount} fields</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Create Your Own */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-primary mb-4">Create Your Own</h2>
        <button
          onClick={openCreate}
          className="card-design-neumorph p-6 w-full text-left hover:scale-[1.01] transition-transform group flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--swatch-gypsum-rose-rgb), 0.5)' }}>
            <Sparkles className="w-6 h-6" style={{ color: 'var(--swatch-viridian-odyssey)' }} />
          </div>
          <div>
            <h3 className="font-semibold text-primary group-hover:underline text-lg">Start from Scratch</h3>
            <p className="text-sm text-muted-foreground">Create a custom list with your own fields</p>
          </div>
        </button>
      </div>

      {/* Dialog */}
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

export default MyGoTwo;
