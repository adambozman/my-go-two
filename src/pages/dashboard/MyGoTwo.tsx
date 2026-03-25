import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMyGoTwoController } from "@/features/mygotwo/useMyGoTwoController";
import MyGoTwoMobileExperience from "@/platform-ui/mobile/mygotwo/MyGoTwoMobileExperience";
import { getUiPlatformFromWidth } from "@/platform-ui/platformSelector";
import MyGoTwoDesktopExperience from "@/platform-ui/web/mygotwo/MyGoTwoDesktopExperience";

const MyGoTwo = () => {
  const { user, loading } = useAuth();
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== "undefined" ? getUiPlatformFromWidth(window.innerWidth) === "web" : false,
  );
  const controller = useMyGoTwoController();

  useEffect(() => {
    const updateViewport = () => setIsDesktopViewport(getUiPlatformFromWidth(window.innerWidth) === "web");
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (loading) {
    return (
      <div className="app-page flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return isDesktopViewport
    ? <MyGoTwoDesktopExperience controller={controller} />
    : <MyGoTwoMobileExperience controller={controller} />;
};

export default MyGoTwo;
