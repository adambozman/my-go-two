import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import MyGoTwoStripGalleryAsset from "@/platform-ui/web/mygotwo/MyGoTwoStripGalleryAsset";

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
    <div className="flex min-h-0 flex-1 flex-col">
      <MyGoTwoStripGalleryAsset />
    </div>
  );
};

export default MyGoTwo;
