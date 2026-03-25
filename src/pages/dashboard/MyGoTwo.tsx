import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MyGoTwoWebHeader from "@/platform-ui/web/mygotwo/MyGoTwoWebHeader";
import MyGoTwoWebCoverflowStage from "@/platform-ui/web/mygotwo/MyGoTwoWebCoverflowStage";

const MyGoTwo = () => {
  const { user, loading } = useAuth();

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

  return (
    <div className="app-page flex h-screen flex-col overflow-hidden">
      <div className="relative z-10">
        <MyGoTwoWebHeader />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 z-0"
        style={{
          top: "calc(var(--header-top-padding) + var(--header-icons-row-height) + var(--header-divider-margin-top) + 25px)",
        }}
      >
        <div className="pointer-events-auto px-4 sm:px-6 md:px-8">
          <MyGoTwoWebCoverflowStage />
        </div>
      </div>
    </div>
  );
};

export default MyGoTwo;
