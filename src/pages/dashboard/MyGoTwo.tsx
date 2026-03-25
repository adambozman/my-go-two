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
    <div className="app-page min-h-screen overflow-x-hidden">
      <MyGoTwoWebHeader />
      <MyGoTwoWebCoverflowStage />
    </div>
  );
};

export default MyGoTwo;
