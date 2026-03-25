import { supabase } from "@/integrations/supabase/client";
import { resolveStorageUrl, makeStorageRef } from "@/lib/storageRefs";
import type { CardEntry } from "@/features/mygotwo/types";

export async function fetchMyGoTwoEntries(userId: string, cardKey: string): Promise<CardEntry[]> {
  const { data } = await supabase
    .from("card_entries")
    .select("*")
    .eq("user_id", userId)
    .eq("card_key", cardKey)
    .order("created_at", { ascending: true });

  return (data as CardEntry[]) || [];
}

export async function createMyGoTwoEntry(input: {
  userId: string;
  cardKey: string;
  groupName: string;
  entryName: string;
  fieldValues: Record<string, string>;
  imageUrl?: string | null;
}): Promise<CardEntry> {
  const { data, error } = await supabase
    .from("card_entries")
    .insert({
      user_id: input.userId,
      card_key: input.cardKey,
      group_name: input.groupName,
      entry_name: input.entryName,
      field_values: input.fieldValues,
      image_url: input.imageUrl ?? null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as CardEntry;
}

export async function updateMyGoTwoEntry(input: {
  entryId: string;
  entryName: string;
  fieldValues: Record<string, string>;
  imageUrl?: string | null;
}) {
  const { error } = await supabase
    .from("card_entries")
    .update({
      entry_name: input.entryName,
      field_values: input.fieldValues,
      image_url: input.imageUrl ?? null,
    })
    .eq("id", input.entryId);

  if (error) throw error;
}

export async function deleteMyGoTwoEntry(entryId: string) {
  const { error } = await supabase.from("card_entries").delete().eq("id", entryId);
  if (error) throw error;
}

export async function resolveMyGoTwoImages(imageValues: string[]) {
  const uniqueValues = Array.from(new Set(imageValues.filter(Boolean)));
  if (uniqueValues.length === 0) return {};

  const pairs = await Promise.all(
    uniqueValues.map(async (value) => [value, await resolveStorageUrl(value)] as const),
  );

  return Object.fromEntries(pairs);
}

export async function uploadMyGoTwoCardImage(userId: string, file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const filePath = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("card-images").upload(filePath, file, { upsert: true });
  if (error) throw error;
  return makeStorageRef("card-images", filePath);
}
