import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useCategoryRegistry, type CategoryItem } from "@/hooks/useCategoryRegistry";
import { supabase } from "@/integrations/supabase/client";
import CategoryCoverFlow from "@/components/CategoryCoverFlow";
import CoverFlowWithDots from "@/components/CoverFlowWithDots";
import SnapScrollLayout from "@/components/SnapScrollLayout";
import TemplateCoverFlow from "@/components/TemplateCoverFlow";
import CreateCustomCardSheet from "@/components/CreateCustomCardSheet";
import type { SubtypeItem, SubcategoryGroup } from "@/data/templateSubtypes";

const sectionLabels: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
  "health-wellness": "Health & Wellness",
  "travel": "Travel",
};

const sectionOrder = [
  "style-fit",
  "food-drink",
  "gifts-wishlist",
  "home-living",
  "entertainment",
  "health-wellness",
  "travel",
];

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
  const [coverFlowState, setCoverFlowState] = useState<{
    name: string;
    subtypes: SubtypeItem[];
    subcategories?: SubcategoryGroup[];
  } | null>(null);

  const fetchCustomTemplates = () => {
    if (user) {
      supabase
        .from("custom_templates")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data }) => setCustomTemplates(data ?? []));
    }
  };

  useEffect(() => { fetchCustomTemplates(); }, [user]);

  const handleCategoryClick = (item: CategoryItem) => {
    if (!user) { toast({ title: "Please log in first", variant: "destructive" }); return; }
    const subtypes = item.fields || [];
    const subcategories = item.subcategories;
    if (subtypes.length > 0 || (subcategories && subcategories.length > 0)) {
      setCoverFlowState({ name: item.label, subtypes, subcategories });
      return;
    }
    createListFromTemplate(item.label, []);
  };

  const handleSubtypeSelect = async (subtype: SubtypeItem, subcategoryName?: string) => {
    if (!user) return;
    const cardTitle = subcategoryName
      ? `${coverFlowState?.name} - ${subcategoryName} - ${subtype.name}`
      : `${coverFlowState?.name} - ${subtype.name}`;
    await createListFromTemplate(cardTitle, subtype.fields as any);
  };

  const createListFromTemplate = async (name: string, fields: any, templateId?: string) => {
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
        if (cardError) toast({ title: "List created but card failed", description: cardError.message, variant: "destructive" });
        setCoverFlowState(null);
        navigate(`/dashboard/lists/${newList.id}`);
      }
    } catch (e: any) {
      toast({ title: "Something went wrong", description: e.message, variant: "destructive" });
    }
    setCreating(null);
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

  if (registryLoading || genderLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Build sections: each section = one screen, its items = the coverflow cards
  const dbSectionKeys = Object.keys(sections);
  const unknownKeys = dbSectionKeys.filter((k) => !sectionOrder.includes(k));
  const mergedOrder = [...sectionOrder, ...unknownKeys];

  const grouped = mergedOrder
    .map((sectionKey) => {
      const registryItems = sections[sectionKey] || [];
      const customItems = customTemplates.filter((ct) => ct.category === sectionKey);
      return {
        key: sectionKey,
        label: sectionLabels[sectionKey] ?? sectionKey.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" & "),
        registryItems,
        customItems,
      };
    })
    .filter((g) => g.registryItems.length > 0 || g.customItems.length > 0);

  const snapSections = grouped.map((group) => {
    const allItems = [
      ...group.registryItems.map((cat) => ({
        id: cat.key,
        name: cat.label,
        image: cat.image,
        fieldCount: cat.fields?.length || 0,
        isCustom: false,
      })),
      ...group.customItems.map((ct) => ({
        id: ct.id,
        name: ct.name,
        image: ct.image_url || "",
        fieldCount: Array.isArray(ct.default_fields) ? ct.default_fields.length : 0,
        isCustom: true,
      })),
    ];

    return {
      id: group.key,
      label: group.label,
      content: (
        <CategoryCoverFlow
          items={allItems}
          onSelect={(id) => {
            const cat = group.registryItems.find((c) => c.key === id);
            if (cat) { handleCategoryClick(cat); return; }
            const ct = customTemplates.find((c) => c.id === id);
            if (ct) createListFromTemplate(ct.name, ct.default_fields);
          }}
          onAdd={() => {
            setCreateSheetCategory({ key: group.key, label: group.label });
            setCreateSheetOpen(true);
          }}
          onDelete={handleDeleteCustomTemplate}
          disabled={creating !== null}
        />
      ),
    };
  });

  return (
    <AnimatePresence mode="wait">
      {coverFlowState ? (
        <CoverFlowWithDots key="template-coverflow">
          <TemplateCoverFlow
            templateName={coverFlowState.name}
            subtypes={coverFlowState.subtypes}
            subcategories={coverFlowState.subcategories}
            onBack={() => setCoverFlowState(null)}
            onSelect={handleSubtypeSelect}
            creating={creating !== null}
            gender={gender}
          />
        </CoverFlowWithDots>
      ) : (
        <div key="sections" className="h-full relative">
          {snapSections.length > 0 ? (
            <SnapScrollLayout sections={snapSections} />
          ) : (
            <p className="text-muted-foreground text-center mt-16 text-sm">
              No categories found. Check back soon.
            </p>
          )}

          <CreateCustomCardSheet
            open={createSheetOpen}
            onOpenChange={setCreateSheetOpen}
            category={createSheetCategory.key}
            categoryLabel={createSheetCategory.label}
            onCreated={fetchCustomTemplates}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default MyGoTwo;
