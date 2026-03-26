import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { TopBarProvider } from "@/contexts/TopBarContext";
import Landing from "./pages/Landing";
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Connect = lazy(() => import("./pages/Connect"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const MyGoTwo = lazy(() => import("./pages/dashboard/MyGoTwo"));
const Recommendations = lazy(() => import("./pages/dashboard/Recommendations"));
const Questionnaires = lazy(() => import("./pages/dashboard/Questionnaires"));
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const PublicFeed = lazy(() => import("./pages/dashboard/PublicFeed"));
const ConnectionPage = lazy(() => import("./pages/dashboard/ConnectionPage"));
const ConnectionFeed = lazy(() => import("./pages/dashboard/ConnectionFeed"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const PhotoGallery = lazy(() => import("./pages/PhotoGallery"));
const Search = lazy(() => import("./pages/Search"));
const SponsoredAdmin = lazy(() => import("./pages/admin/SponsoredAdmin"));
const CarouselTest = lazy(() => import("./pages/CarouselTest"));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="app-page flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PersonalizationProvider>
        <TopBarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ForgotPassword />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/photo-gallery" element={<PhotoGallery />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="my-go-two" element={<MyGoTwo />} />
                  <Route path="recommendations" element={<Recommendations />} />
                  <Route path="questionnaires" element={<Questionnaires />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="search" element={<Search />} />
                  <Route path="public-feed" element={<PublicFeed />} />
                  <Route path="connection-feed" element={<ConnectionFeed />} />
                  <Route path="connections/:connectionId" element={<ConnectionPage />} />
                  <Route path="sponsored" element={<SponsoredAdmin />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/carousel-test" element={<CarouselTest />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
        </TopBarProvider>
      </PersonalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
