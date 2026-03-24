import { getCurrentUiPlatform } from "@/platform-ui/platformSelector";
import DashboardShellWeb from "@/platform-ui/components/dashboard/DashboardShell.web";
import DashboardShellMobile from "@/platform-ui/components/dashboard/DashboardShell.mobile";

export interface DashboardShellPlatformProps {
  className?: string;
}

/**
 * Future shared wrapper for platform-specific dashboard shell implementations.
 * Not wired into runtime layouts yet.
 */
export default function DashboardShellPlatform(props: DashboardShellPlatformProps) {
  const platform = getCurrentUiPlatform();
  if (platform === "web") return <DashboardShellWeb {...props} />;
  return <DashboardShellMobile {...props} />;
}

