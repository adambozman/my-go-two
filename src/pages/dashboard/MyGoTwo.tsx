import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";
import CreateCustomCardSheet from "@/components/CreateCustomCardSheet";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

const sectionOrder = ["style-fit", "food-drink", "gifts-wishlist", "home-living", "entertainment"];

const MyGoTwo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { gender, loading: genderLoading } = usePersonalization();
  const navigate = useNavigate();

  const { sections, loading: registryLoading } = useCategoryRegistry(gender, "mygotwo");

  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [creating, setCreating] = useState<string | null>(null);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [createSheetCategory, setCreateSheetCategory] = useState<{ key: string; label: string }>({ key: "", label: "" });

  const fetchCustomTemplates = () => {
    if (user) {
      supabase
        .from("custom_templates")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data }) => {
          setCustomTemplates(data ?? []);
        });
    }
  };

  useEffect(() => {
    fetchCustomTemplates();
  }, [user]);

  const openCreateSheet = (categoryKey: string, categoryLabel: string) => {
    setCreateSheetCategory({ key: categoryKey, label: categoryLabel });
    setCreateSheetOpen(true);
  };

  const handleCategoryClick = (item: CategoryItem) => {
    if (!user) {
      toast({ title: "Please log in first", variant: "destructive" });
      return;
    }

    const subtypes = item.fields || [];
    const subcategories = item.subcategories;

    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      // TODO: new card/navigation UI will handle drill-down
      return;
    }

    createListFromTemplate(item.label, []);
  };

  const handleSubtypeSelect = async (subtype: SubtypeItem, subcategoryName?: string) => {
    if (!user) return;
    const templateName = ""; // will be set by new UI
    const cardTitle = subcategoryName
      ? `${templateName} - ${subcategoryName} - ${subtype.name}`
      : `${templateName} - ${subtype.name}`;
    await createListFromTemplate(cardTitle, subtype.fields as any, undefined, subcategoryName);
  };

  const createListFromTemplate = async (
    name: string,
    fields: any,
    templateId?: string,
    subcategoryName?: string,
  ) => {
    if (!user) return;
    setCreating(name);
    try {
      const { data: newList, error: listError } = await supabase
        .from("lists")
        .insert({ title: name, description: "Created from template", user_id: user.id })
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
        if (cardError)
          toast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });

        navigate(`/dashboard/lists/${newList.id}`);
      }
    } catch (e: any) {
      toast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
  };

  const handleCustomTemplateClick = async (ct: any) => {
    if (!user) return;
    await createListFromTemplate(ct.name, ct.default_fields);
  };

  const handleDeleteCustomTemplate = async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from("custom_templates").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Template deleted" });
      fetchCustomTemplates();
    }
  };

  // Build grouped sections from registry data
  const grouped = sectionOrder
    .map((sectionKey) => {
      const items = sections[sectionKey] || [];
      const customItems = customTemplates.filter((ct) => ct.category === sectionKey);
      return {
        key: sectionKey,
        label: sectionLabels[sectionKey] ?? sectionKey,
        items,
        customItems,
      };
    })
    .filter((g) => g.items.length > 0 || g.customItems.length > 0);

  if (registryLoading || genderLoading) {
    return <p className="text-muted-foreground p-4">Loading...</p>;
  }

  return (
    <div className="h-full relative">
      <CreateCustomCardSheet
        open={createSheetOpen}
        onOpenChange={setCreateSheetOpen}
        category={createSheetCategory.key}
        categoryLabel={createSheetCategory.label}
        onCreated={fetchCustomTemplates}
      />
    </div>
  );
};

export default MyGoTwo;
