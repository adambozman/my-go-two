import { supabase } from "@/integrations/supabase/client";

const STORAGE_REF_PREFIX = "storage://";
const PRIVATE_BUCKETS = new Set(["avatars", "card-images", "connection-photos"]);

export interface StorageRef {
  bucket: string;
  path: string;
}

export function makeStorageRef(bucket: string, path: string) {
  return `${STORAGE_REF_PREFIX}${bucket}/${path}`;
}

export function parseStorageRef(value?: string | null): StorageRef | null {
  if (!value || !value.startsWith(STORAGE_REF_PREFIX)) return null;
  const withoutPrefix = value.slice(STORAGE_REF_PREFIX.length);
  const firstSlash = withoutPrefix.indexOf("/");
  if (firstSlash <= 0) return null;

  const bucket = withoutPrefix.slice(0, firstSlash);
  const path = withoutPrefix.slice(firstSlash + 1);
  if (!bucket || !path) return null;

  return { bucket, path };
}

function parseSupabaseStorageUrl(value?: string | null): StorageRef | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    const objectIndex = parts.findIndex((part) => part === "object");
    if (objectIndex < 0) return null;

    const mode = parts[objectIndex + 1];
    const bucket = parts[objectIndex + 2];
    const pathParts = parts.slice(objectIndex + 3);

    if (!bucket || pathParts.length === 0) return null;
    if (!["public", "sign"].includes(mode)) return null;

    return {
      bucket,
      path: decodeURIComponent(pathParts.join("/")),
    };
  } catch {
    return null;
  }
}

export function toStorageRefIfPossible(value?: string | null) {
  const directRef = parseStorageRef(value);
  if (directRef) return value || "";

  const parsedUrl = parseSupabaseStorageUrl(value);
  if (!parsedUrl) return value || "";

  return makeStorageRef(parsedUrl.bucket, parsedUrl.path);
}

export async function resolveStorageUrl(value?: string | null, expiresIn = 3600) {
  if (!value) return "";
  if (value.startsWith("data:") || value.startsWith("blob:")) return value;

  const storageRef = parseStorageRef(value) ?? parseSupabaseStorageUrl(value);
  if (!storageRef) return value;

  const { bucket, path } = storageRef;
  if (!PRIVATE_BUCKETS.has(bucket)) {
    return value;
  }

  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) {
    return "";
  }

  return data.signedUrl;
}
