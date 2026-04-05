import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/runtime-types";

const normalizeJsonValue = (value: unknown): Json | undefined => {
  if (value === null) return null;
  if (value === undefined || typeof value === "function" || typeof value === "symbol" || typeof value === "bigint") {
    return undefined;
  }

  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return value;
    case "object":
      if (typeof (value as { toJSON?: () => unknown }).toJSON === "function") {
        return normalizeJsonValue((value as { toJSON: () => unknown }).toJSON());
      }

      if (Array.isArray(value)) {
        return value.map((item) => normalizeJsonValue(item) ?? null);
      }

      return Object.fromEntries(
        Object.entries(value).flatMap(([key, nestedValue]) => {
          const normalized = normalizeJsonValue(nestedValue);
          return normalized === undefined ? [] : [[key, normalized]];
        }),
      );
    default:
      return undefined;
  }
};

export async function trackAdEvent(
  productId: string,
  eventType: "impression" | "click",
  placement: string,
  metadata?: Record<string, unknown>
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("ad_events").insert([{
    product_id: productId,
    user_id: user.id,
    event_type: eventType,
    placement,
    metadata: normalizeJsonValue(metadata) ?? {},
  }]);
}

export function buildAffiliateUrl(
  baseUrl: string,
  utmSource = "gotwo",
  utmMedium = "app",
  utmCampaign = "recs"
): string {
  if (!baseUrl) return "";
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
}

// Codebase classification: runtime ad tracking utilities.
