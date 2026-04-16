import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import { TopBarProvider } from "@/contexts/TopBarContext";
import { AppRuntimeBoundary } from "@/components/AppRuntimeBoundary";
import { DevRuntimeDiagnostics } from "@/components/DevRuntimeDiagnostics";
import { DevModeProvider } from "@/contexts/dev-mode-context";
import Waitlist from "./pages/Waitlist";
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Connect = lazy(() => import("./pages/Connect"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const MyGoTwo = lazy(() => import("./pages/dashboard/MyGoTwo"));
const ForYou = lazy(() => import("./pages/dashboard/Recommendations"));
const KnowMePage = lazy(() => import("./pages/dashboard/KnowMePage"));
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const PublicFeed = lazy(() => import("./pages/dashboard/PublicFeed"));
const ConnectionPage = lazy(() => import("./pages/dashboard/ConnectionPage"));
const ConnectionFeed = lazy(() => import("./pages/dashboard/ConnectionFeed"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
// Internal asset-management tool. Not part of the public hero/login/dashboard journey.
const PhotoGallery = lazy(() => import("./pages/PhotoGallery"));
const ImageBankPage = lazy(() => import("./pages/ImageBankPage"));
const Search = lazy(() => import("./pages/Search"));
// Internal admin surface for sponsored content management.
const SponsoredAdmin = lazy(() => import("./pages/admin/SponsoredAdmin"));

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
    <AppRuntimeBoundary>
      <DevRuntimeDiagnostics />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DevModeProvider>
          <UserProfileProvider>
            <TopBarProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path="/" element={<Waitlist />} />
                      <Route path="/preview" element={<Landing />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ForgotPassword />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      <Route path="/connect" element={<Connect />} />
                      {/* Internal asset-management route, not part of the normal customer website. */}
                      <Route path="/photo-gallery" element={<PhotoGallery />} />
                      <Route path="/image-bank" element={<ImageBankPage />} />
                      <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="my-go-two" element={<MyGoTwo />} />
                        <Route path="recommendations" element={<ForYou />} />
                        <Route path="know-me" element={<KnowMePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="search" element={<Search />} />
                        <Route path="public-feed" element={<PublicFeed />} />
                        <Route path="connection-feed" element={<ConnectionFeed />} />
                        <Route path="connections/:connectionId" element={<ConnectionPage />} />
                        {/* Internal admin route, not part of the normal customer dashboard flow. */}
                        <Route path="sponsored" element={<SponsoredAdmin />} />
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </TopBarProvider>
          </UserProfileProvider>
          </DevModeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </AppRuntimeBoundary>
  );
};

export default App;
// Codebase classification: runtime application routing.
