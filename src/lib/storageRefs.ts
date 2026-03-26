import { supabase } from "@/integrations/supabase/client";

const STORAGE_REF_PREFIX = "storage://";
const signedUrlCache = new Map<string, { url: string; expiresAt: number }>();
const PRIVATE_BUCKETS = new Set([
  "avatars",
  "avatars-1",
  "card-images",
  "connection-photos",
  "photo-bank",
]);

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

export async function resolveStorageUrls(values: Array<string | null | undefined>, expiresIn = 3600) {
  const results = new Array<string>(values.length).fill("");
  const groupedRequests = new Map<
    string,
    Array<{ index: number; path: string }>
  >();
  const now = Date.now();

  values.forEach((value, index) => {
    if (!value) {
      results[index] = "";
      return;
    }

    if (value.startsWith("data:") || value.startsWith("blob:")) {
      results[index] = value;
      return;
    }

    const storageRef = parseStorageRef(value) ?? parseSupabaseStorageUrl(value);
    if (!storageRef) {
      results[index] = value;
      return;
    }

    const { bucket, path } = storageRef;
    if (!PRIVATE_BUCKETS.has(bucket)) {
      results[index] = value;
      return;
    }

    const cacheKey = `${bucket}/${path}`;
    const cached = signedUrlCache.get(cacheKey);
    if (cached && cached.expiresAt > now + 30_000) {
      results[index] = cached.url;
      return;
    }

    const bucketRequests = groupedRequests.get(bucket) ?? [];
    bucketRequests.push({ index, path });
    groupedRequests.set(bucket, bucketRequests);
  });

  await Promise.all(
    Array.from(groupedRequests.entries()).map(async ([bucket, requests]) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrls(
          requests.map((request) => request.path),
          expiresIn,
        );

      if (error || !data) {
        requests.forEach((request) => {
          results[request.index] = "";
        });
        return;
      }

      requests.forEach((request, requestIndex) => {
        const signed = data[requestIndex]?.signedUrl ?? "";
        results[request.index] = signed;
        if (signed) {
          signedUrlCache.set(`${bucket}/${request.path}`, {
            url: signed,
            expiresAt: now + expiresIn * 1000,
          });
        }
      });
    }),
  );

  return results;
}

export async function resolveStorageUrl(value?: string | null, expiresIn = 3600) {
  const [resolved] = await resolveStorageUrls([value], expiresIn);
  return resolved ?? "";
}
