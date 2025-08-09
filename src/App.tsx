import "@/index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResultsPage from "./pages/ResultsPage";
import GamesListPage from "./pages/GamesListPage";
import GameDetailPage from "./pages/GameDetailPage"; // Fixed import - now points to the correct file
import GamePlayPage from "./pages/GamePlayPage";
import DashboardPage from "./pages/DashboardPage";
import CheckNumbersPage from "./pages/CheckNumbersPage";
import BuyTicketsPage from "./pages/BuyTicketsPage";
import SignInPage from "./pages/SignInPage";
import RegistrationPage from "./pages/RegistrationPage";
import GameOverviewPage from "./pages/GamesOverviewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/results" element={<ResultsPage />} />
            
            {/* Game-related routes */}
            <Route path="/games" element={<GameOverviewPage />} />
            <Route path="/games/:gameId" element={<GameDetailPage />} />
            <Route path="/games/:gameId/play" element={<GamePlayPage />} />
            
            {/* Other routes */}
            <Route path="/check-numbers" element={<CheckNumbersPage />} />
            <Route path="/buy-tickets" element={<BuyTicketsPage />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;