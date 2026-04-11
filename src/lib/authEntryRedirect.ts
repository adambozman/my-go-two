import { supabase } from "@/integrations/supabase/client";

const readPendingInviteFlag = () => {
  try {
    return Boolean(
      localStorage.getItem("gotwo_invite")?.trim() || localStorage.getItem("gotwo_invite_token")?.trim(),
    );
  } catch {
    return false;
  }
};

export const resolvePostAuthDestination = async (userId: string) => {
  if (readPendingInviteFlag()) {
    return "/dashboard/settings";
  }

  const profileResult = await supabase
    .from("profiles")
    .select("updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profileResult.error && profileResult.data) {
    // Profile exists — check legacy onboarding flag
    const legacyResult = await supabase
      .from("user_preferences")
      .select("onboarding_complete")
      .eq("user_id", userId)
      .maybeSingle();
    if (!legacyResult.error && legacyResult.data?.onboarding_complete) {
      return "/dashboard";
    }
    return "/onboarding";
  }

  const legacyResult = await supabase
    .from("user_preferences")
    .select("onboarding_complete")
    .eq("user_id", userId)
    .maybeSingle();

  if (!legacyResult.error && legacyResult.data?.onboarding_complete) {
    return "/dashboard";
  }

  return "/onboarding";
};
