import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import Connect from "./pages/Connect";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ListDetail from "./pages/dashboard/ListDetail";
import MyGoTwo from "./pages/dashboard/MyGoTwo";
import Collaborations from "./pages/dashboard/Collaborations";
import Recommendations from "./pages/dashboard/Recommendations";
import Questionnaires from "./pages/dashboard/Questionnaires";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PersonalizationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="lists/:listId" element={<ListDetail />} />
                <Route path="my-go-two" element={<MyGoTwo />} />
                <Route path="collaborations" element={<Collaborations />} />
                <Route path="recommendations" element={<Recommendations />} />
                <Route path="questionnaires" element={<Questionnaires />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PersonalizationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
