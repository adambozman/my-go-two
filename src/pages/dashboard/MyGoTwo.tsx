import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";

// Template images
import imgClothingSizes from "@/assets/templates/clothing-sizes.jpg";
import imgShoeSize from "@/assets/templates/shoe-size.jpg";
import imgScents from "@/assets/templates/scents.jpg";
import imgGrooming from "@/assets/templates/grooming.jpg";
import imgMeasurements from "@/assets/templates/measurements.jpg";
import imgCoffeeOrder from "@/assets/templates/coffee-order.jpg";
import imgDietaryRestrictions from "@/assets/templates/dietary-restrictions.jpg";
import imgFastFoodOrder from "@/assets/templates/fast-food-order.jpg";
import imgFavoriteMeals from "@/assets/templates/favorite-meals.jpg";
import imgGrocerySpecifics from "@/assets/templates/grocery-specifics.jpg";
import imgAnniversaryGifts from "@/assets/templates/anniversary-gifts.jpg";
import imgBirthdayPreferences from "@/assets/templates/birthday-preferences.jpg";
import imgFlowers from "@/assets/templates/flowers.jpg";
import imgFragrances from "@/assets/templates/fragrances.jpg";
import imgJewelry from "@/assets/templates/jewelry.jpg";
import imgWishList from "@/assets/templates/wish-list.jpg";
import imgDateIdeas from "@/assets/templates/date-ideas.jpg";
import imgEvents from "@/assets/templates/events.jpg";
import imgFavoriteRestaurants from "@/assets/templates/favorite-restaurants.jpg";
import imgTravelPreferences from "@/assets/templates/travel-preferences.jpg";
import imgBrandPreferences from "@/assets/templates/brand-preferences.jpg";
import imgLoveLanguage from "@/assets/templates/love-language.jpg";
import imgPetPeeves from "@/assets/templates/pet-peeves.jpg";
import imgSpecificProducts from "@/assets/templates/specific-products.jpg";

interface Template {
  id: string;
  name: string;
  icon: string | null;
  category: string;
  default_fields: any;
}

const templateImageMap: Record<string, string> = {
  "Clothing Sizes": imgClothingSizes,
  "Shoe Size": imgShoeSize,
  "Scents": imgScents,
  "Grooming": imgGrooming,
  "Measurements": imgMeasurements,
  "Coffee Order": imgCoffeeOrder,
  "Dietary Restrictions": imgDietaryRestrictions,
  "Fast Food Order": imgFastFoodOrder,
  "Favorite Meals": imgFavoriteMeals,
  "Grocery Specifics": imgGrocerySpecifics,
  "Anniversary Gifts": imgAnniversaryGifts,
  "Birthday Preferences": imgBirthdayPreferences,
  "Flowers": imgFlowers,
  "Fragrances": imgFragrances,
  "Jewelry": imgJewelry,
  "Wish List Items": imgWishList,
  "Date Ideas": imgDateIdeas,
  "Events": imgEvents,
  "Favorite Restaurants": imgFavoriteRestaurants,
  "Travel Preferences": imgTravelPreferences,
  "Brand Preferences": imgBrandPreferences,
  "Love Language": imgLoveLanguage,
  "Pet Peeves": imgPetPeeves,
  "Specific Product Versions": imgSpecificProducts,
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
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    supabase.from("card_templates").select("*").then(({ data }) => {
      setTemplates(data ?? []);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    const { data: newList } = await supabase
      .from("lists")
      .insert({ title, description, user_id: user.id })
      .select()
      .single();
    setDialogOpen(false);
    setTitle("");
    setDescription("");
    if (newList) {
      navigate(`/dashboard/lists/${newList.id}`);
    }
  };

  const openCreate = () => {
    setTitle("");
    setDescription("");
    setDialogOpen(true);
  };

  const handleTemplateClick = async (template: Template) => {
    if (!user) {
      toast({ title: "Please log in first", variant: "destructive" });
      return;
    }
    setCreating(template.id);
    try {
      const { data: newList, error: listError } = await supabase
        .from("lists")
        .insert({ title: template.name, description: `Created from ${template.name} template`, user_id: user.id })
        .select()
        .single();

      if (listError) {
        toast({ title: "Error creating list", description: listError.message, variant: "destructive" });
        setCreating(null);
        return;
      }

      if (newList) {
        const { error: cardError } = await supabase.from("cards").insert({
          title: template.name,
          fields: template.default_fields,
          list_id: newList.id,
          user_id: user.id,
          template_id: template.id,
        });

        if (cardError) {
          toast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });
        }

        navigate(`/dashboard/lists/${newList.id}`);
      }
    } catch (e: any) {
      toast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
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
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
        My <GoTwoText className="text-2xl" />
      </h1>

      {/* Templates by Category */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-primary mb-6">Start from a Template</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading templates...</p>
        ) : (
          grouped.map((group) => (
            <div key={group.key} className="mb-8">
              <h3 className="text-base font-semibold text-muted-foreground mb-3">{group.label}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((t) => {
                  const img = templateImageMap[t.name];
                  const fieldCount = Array.isArray(t.default_fields) ? t.default_fields.length : 0;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateClick(t)}
                      disabled={creating !== null}
                      className="card-design-neumorph overflow-hidden text-left hover:scale-[1.02] transition-transform group rounded-2xl disabled:opacity-60"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={img}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-primary text-sm group-hover:underline">{t.name}</h4>
                        <p className="text-xs text-muted-foreground">{fieldCount} fields</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
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
            <DialogTitle>Create New List</DialogTitle>
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
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyGoTwo;
