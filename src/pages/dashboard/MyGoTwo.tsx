import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MyGoTwoWebHeader from "@/platform-ui/web/mygotwo/MyGoTwoWebHeader";

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
    <div className="app-page relative flex h-screen flex-col overflow-hidden">
      <MyGoTwoWebHeader />
    </div>
  );
};

export default MyGoTwo;
