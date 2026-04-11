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
    .select("onboarding_completed_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileResult.error) {
    return "/onboarding";
  }

  if (profileResult.data?.onboarding_completed_at) {
    return "/dashboard";
  }

  return "/onboarding";
};
// Codebase classification: runtime post-auth route gate using profile onboarding completion state.
