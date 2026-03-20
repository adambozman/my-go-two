import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { TopBarProvider } from "@/contexts/TopBarContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import Connect from "./pages/Connect";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import MyGoTwo from "./pages/dashboard/MyGoTwo";

import Recommendations from "./pages/dashboard/Recommendations";
import Questionnaires from "./pages/dashboard/Questionnaires";
import Notifications from "./pages/dashboard/Notifications";
import SettingsPage from "./pages/dashboard/SettingsPage";
import PublicFeed from "./pages/dashboard/PublicFeed";
import ConnectionPage from "./pages/dashboard/ConnectionPage";

import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import PhotoGallery from "./pages/PhotoGallery";
import Search from "./pages/Search";
import CategorySync from "./pages/admin/CategorySync";
import SponsoredAdmin from "./pages/admin/SponsoredAdmin";

import CarouselTest from "./pages/CarouselTest";
import ProductEntryCardPreview from "./pages/test/ProductEntryCardPreview";
import { initBlocklist, isBlocklistReady } from "@/data/imageBlocklist";

const queryClient = new QueryClient();

const App = () => {
  const [ready, setReady] = useState(isBlocklistReady());

  useEffect(() => {
    if (ready) return;
    initBlocklist().then(() => setReady(true));
  }, [ready]);

  if (!ready) {
    return null; // Nothing renders until blocklist cache is warm
  }

  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PersonalizationProvider>
        <TopBarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
                <Route path="connections/:connectionId" element={<ConnectionPage />} />
                <Route path="data-sync" element={<CategorySync />} />
                <Route path="sponsored" element={<SponsoredAdmin />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/carousel-test" element={<CarouselTest />} />
              <Route path="/product-entry-card-preview" element={<ProductEntryCardPreview />} />
              
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </TopBarProvider>
      </PersonalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
