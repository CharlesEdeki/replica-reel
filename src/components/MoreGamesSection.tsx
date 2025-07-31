import GameCard from "./GameCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MoreGamesSection = () => {
  const games = [
    {
      game: "LOTTO",
      title: "IT'S A ROLLOVER",
      prize: "£3.9M",
      date: "This Saturday",
      backgroundColor: "bg-red-600",
      textColor: "text-white",
      buttonText: "PLAY FOR",
      buttonPrice: "£2.00"
    },
    {
      game: "INSTANT WIN GAMES",
      title: "£300K Boamin' Lines",
      subtitle: "Scratchcard game up to 200 instant prizes",
      prize: "",
      date: "",
      backgroundColor: "bg-green-600",
      textColor: "text-white",
      buttonText: "PLAY NOW"
    },
    {
      game: "THUNDERBALL",
      title: "£1 could win you",
      prize: "£500K",
      date: "This Friday",
      backgroundColor: "bg-purple-600",
      textColor: "text-white",
      buttonText: "PLAY FOR",
      buttonPrice: "£1.00"
    },
    {
      game: "SET FOR LIFE",
      title: "£10,000 every month for 30 years",
      prize: "",
      date: "Every Monday & Thursday",
      backgroundColor: "bg-teal-600",
      textColor: "text-white",
      buttonText: "PLAY FOR",
      buttonPrice: "£1.50"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 transform transition-all duration-500 hover:scale-105">MORE GAMES</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="p-2 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-2 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div 
              key={index} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <GameCard
                game={game.game}
                title={game.title}
                subtitle={game.subtitle}
                prize={game.prize}
                date={game.date}
                backgroundColor={game.backgroundColor}
                textColor={game.textColor}
                buttonText={game.buttonText}
                buttonPrice={game.buttonPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreGamesSection;