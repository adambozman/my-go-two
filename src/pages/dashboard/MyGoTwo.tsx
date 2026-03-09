import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import GoTwoText from "@/components/GoTwoText";
import TemplateCoverFlow, { templateSubtypes, type SubtypeItem } from "@/components/TemplateCoverFlow";
import CategoryCoverFlow from "@/components/CategoryCoverFlow";
import { AnimatePresence } from "framer-motion";

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
  const location = useLocation();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFlowTemplate, setCoverFlowTemplate] = useState<{ name: string; subtypes: SubtypeItem[] } | null>(null);

  // Reopen cover flow if navigating back from list detail
  useEffect(() => {
    const state = location.state as { openTemplate?: string } | null;
    if (state?.openTemplate && templateSubtypes[state.openTemplate]) {
      setCoverFlowTemplate({ name: state.openTemplate, subtypes: templateSubtypes[state.openTemplate] });
      // Clear state so refresh doesn't reopen
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
    
    // Check if this template has subtypes (cover flow)
    const subtypes = templateSubtypes[template.name];
    if (subtypes) {
      setCoverFlowTemplate({ name: template.name, subtypes });
      return;
    }

    // No subtypes — create list directly
    await createListFromTemplate(template.name, template.default_fields, template.id);
  };

  const handleSubtypeSelect = async (subtype: SubtypeItem) => {
    if (!user) return;
    const templateName = coverFlowTemplate?.name;
    const cardTitle = `${templateName} - ${subtype.name}`;
    await createListFromTemplate(cardTitle, subtype.fields as any, undefined);
  };

  const createListFromTemplate = async (name: string, fields: any, templateId?: string) => {
    if (!user) return;
    setCreating(name);
    try {
      const { data: newList, error: listError } = await supabase
        .from("lists")
        .insert({ title: name, description: `Created from template`, user_id: user.id })
        .select()
        .single();

      if (listError) {
        toast({ title: "Error creating list", description: listError.message, variant: "destructive" });
        setCreating(null);
        return;
      }

      if (newList) {
        const { error: cardError } = await supabase.from("cards").insert({
          title: name,
          fields,
          list_id: newList.id,
          user_id: user.id,
          ...(templateId ? { template_id: templateId } : {}),
        });

        if (cardError) {
          toast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });
        }

        const fromTemplate = coverFlowTemplate?.name;
        setCoverFlowTemplate(null);
        navigate(`/dashboard/lists/${newList.id}`, { state: { fromTemplate } });
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
    <AnimatePresence mode="wait">
    {coverFlowTemplate ? (
      <TemplateCoverFlow
        key="coverflow"
        templateName={coverFlowTemplate.name}
        subtypes={coverFlowTemplate.subtypes}
        onBack={() => setCoverFlowTemplate(null)}
        onSelect={handleSubtypeSelect}
        creating={creating !== null}
      />
    ) : (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--swatch-viridian-odyssey)' }}>
        My <GoTwoText className="text-2xl" />
      </h1>

      {/* Templates by Category - Cover Flows */}
      <div className="mb-10">
        {loading ? (
          <p className="text-muted-foreground">Loading templates...</p>
        ) : (
          grouped.map((group) => (
            <div key={group.key} className="mb-10">
              <h3 className="text-base font-semibold text-muted-foreground mb-4 text-center">{group.label}</h3>
              <CategoryCoverFlow
                items={group.items.map((t) => ({
                  id: t.id,
                  name: t.name,
                  image: templateImageMap[t.name] || "",
                  fieldCount: Array.isArray(t.default_fields) ? t.default_fields.length : 0,
                }))}
                onSelect={(id) => {
                  const t = templates.find((tpl) => tpl.id === id);
                  if (t) handleTemplateClick(t);
                }}
                disabled={creating !== null}
              />
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
    )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
