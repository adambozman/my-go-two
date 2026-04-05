import { supabase } from "@/integrations/supabase/client";
import type { SavedProductCard } from "@/features/mygotwo/types";

export async function fetchMyGoTwoSavedProductCards(
  userId: string,
  productCardKey: string,
): Promise<SavedProductCard[]> {
  const { data } = await supabase
    .from("saved_product_cards")
    .select("*")
    .eq("user_id", userId)
    .eq("product_card_key", productCardKey)
    .order("created_at", { ascending: true });

  return (data as SavedProductCard[]) || [];
}

export async function createSavedProductCard(input: {
  userId: string;
  productCardKey: string;
  subcategoryLabel: string;
  cardTitle: string;
  fieldValues: Record<string, string>;
}): Promise<SavedProductCard> {
  const { data, error } = await supabase
    .from("saved_product_cards")
    .insert({
      user_id: input.userId,
      product_card_key: input.productCardKey,
      subcategory_label: input.subcategoryLabel,
      card_title: input.cardTitle,
      field_values: input.fieldValues,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as SavedProductCard;
}

export async function updateSavedProductCard(input: {
  savedProductCardId: string;
  cardTitle: string;
  fieldValues: Record<string, string>;
}) {
  const { error } = await supabase
    .from("saved_product_cards")
    .update({
      card_title: input.cardTitle,
      field_values: input.fieldValues,
    })
    .eq("id", input.savedProductCardId);

  if (error) throw error;
}

export async function deleteSavedProductCard(savedProductCardId: string) {
  const { error } = await supabase
    .from("saved_product_cards")
    .delete()
    .eq("id", savedProductCardId);
  if (error) throw error;
}

// Codebase classification: runtime My Go Two data access.
