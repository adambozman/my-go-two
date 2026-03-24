import { getCurrentUiPlatform } from "@/platform-ui/platformSelector";
import CoverflowWeb from "@/platform-ui/components/coverflow/Coverflow.web";
import CoverflowMobile from "@/platform-ui/components/coverflow/Coverflow.mobile";

export interface CoverflowPlatformProps {
  className?: string;
}

/**
 * Future shared wrapper for platform-specific coverflow implementations.
 * Not wired into runtime pages yet.
 */
export default function CoverflowPlatform(props: CoverflowPlatformProps) {
  const platform = getCurrentUiPlatform();
  if (platform === "web") return <CoverflowWeb {...props} />;
  return <CoverflowMobile {...props} />;
}

