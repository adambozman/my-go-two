import { Link } from "react-router-dom";
import GoTwoText from "@/components/GoTwoText";

const NotFound = () => {
  return (
    <div className="landing-page min-h-screen flex items-center justify-center">
      <div className="text-center">
        <GoTwoText className="text-4xl mb-6" />
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="hover:underline font-medium" style={{ color: 'var(--swatch-cedar-grove)' }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
