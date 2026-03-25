import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMyGoTwoCatalogData } from "@/features/mygotwo/useMyGoTwoCatalogData";
import MyGoTwoWebHeader from "@/platform-ui/web/mygotwo/MyGoTwoWebHeader";
import MyGoTwoWebCoverflowStage from "@/platform-ui/web/mygotwo/MyGoTwoWebCoverflowStage";

const MyGoTwo = () => {
  const { user, loading } = useAuth();
  const { webLevelOneItems } = useMyGoTwoCatalogData();

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
      <MyGoTwoWebHeader />
      <MyGoTwoWebCoverflowStage items={webLevelOneItems} />
    </div>
  );
};

export default MyGoTwo;
