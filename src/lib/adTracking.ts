import { supabase } from "@/integrations/supabase/client";

export async function trackAdEvent(
  productId: string,
  eventType: "impression" | "click",
  placement: string,
  metadata?: Record<string, unknown>
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("ad_events").insert({
    product_id: productId,
    user_id: user.id,
    event_type: eventType,
    placement,
    metadata: metadata || {},
  });
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
