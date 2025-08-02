import Header from "@/components/Header";
import NotificationBanner from "@/components/NotificationBanner";
import HeroSection from "@/components/HeroSection";
import PromoBannersSection from "@/components/PromoBannersSection";
import MoreGamesSection from "@/components/MoreGamesSection";
import Footer from "@/components/Footer";
import EnhancedGamesShowcase from "@/components/EnhancedGamesShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NotificationBanner />
      <HeroSection />
      <PromoBannersSection />
      <EnhancedGamesShowcase />
      <MoreGamesSection />
      <Footer />
    </div>
  );
};

export default Index;
