import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import WebMyGoTwoHeader from "@/platform-ui/web/mygotwo/WebMyGoTwoHeader";

const MyGoTwoLayout = () => {
  const { user, loading } = useAuth();
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const updateViewport = () => setIsDesktopViewport(window.innerWidth >= 1024);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (loading) {
    return (
      <div className="app-page min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-page flex min-h-screen flex-col overflow-x-hidden">
      {isDesktopViewport ? <WebMyGoTwoHeader /> : <DashboardTopBar />}
      <main className="flex-1 min-h-0 overflow-x-hidden px-3 pb-4 sm:px-4 md:px-6 lg:px-8 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MyGoTwoLayout;
