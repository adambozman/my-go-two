import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardTopBar } from "@/components/DashboardTopBar";

const MyGoTwoLayout = () => {
  const { user, loading } = useAuth();

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
      <DashboardTopBar />
      <main className="overflow-x-hidden px-3 pb-6 sm:px-4 md:px-6 lg:px-8 lg:pb-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MyGoTwoLayout;
