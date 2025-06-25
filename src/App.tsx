import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import OnboardingFlow from "./pages/OnboardingFlow";
import ParentalDashboard from "./pages/ParentalDashboard";
import SavingsPotDetailPage from "./pages/SavingsPotDetailPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import YouthDashboard from "./pages/YouthDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<OnboardingFlow />} />
          <Route path="/parental-dashboard" element={<ParentalDashboard />} />
          <Route path="/savings-pot-detail" element={<SavingsPotDetailPage />} />
          <Route path="/transaction-history" element={<TransactionHistoryPage />} />
          <Route path="/youth-dashboard" element={<YouthDashboard />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
