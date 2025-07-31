import Header from "@/components/Header";
import NotificationBanner from "@/components/NotificationBanner";
import HeroSection from "@/components/HeroSection";
import MoreGamesSection from "@/components/MoreGamesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NotificationBanner />
      <HeroSection />
      <MoreGamesSection />
    </div>
  );
};

export default Index;
