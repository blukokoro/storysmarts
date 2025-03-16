
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AccountSettings from "./pages/AccountSettings";
import Plans from "./pages/Plans";
import Marketing from "./pages/Marketing";
import DiyComiCreation from "./pages/DiyComiCreation";
import Navbar from "./components/Navbar";
import Analyze from "./pages/Analyze";
import Storyboard from "./pages/Storyboard";
import AIRefinement from "./pages/AIRefinement"; // Import the new AIRefinement page

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/marketing" element={<Marketing />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/account-settings" element={<AccountSettings />} />
    <Route path="/plans" element={<Plans />} />
    <Route path="/diy-comic-creation" element={<DiyComiCreation />} />
    <Route path="/analyze" element={<Analyze />} />
    <Route path="/storyboard" element={<Storyboard />} />
    <Route path="/ai-refinement" element={<AIRefinement />} /> {/* Add the new AIRefinement route */}
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
