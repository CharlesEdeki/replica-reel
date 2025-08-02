import React, { useRef, useState } from "react";
import GameCard from "./GameCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameCardData {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  prize: string;
  description?: string;
  price: string;
  bgGradient: string;
  textColor: string;
  buttonColor: string;
  image?: string;
}

const MoreGamesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
 const games: GameCardData[] = [
    {
      id: "euromillions",
      label: "This Tuesday",
      title: "EUROMILLIONS",
      prize: "£157M",
      description: "JACKPOT",
      subtitle: "GET THAT EUROMILLIONS FEELING",
      price: "PLAY FOR £2.50",
      bgGradient: "bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600",
      textColor: "text-white",
      buttonColor: "bg-blue-800 hover:bg-blue-900"
    },
    {
      id: "instant-win",
      label: "Featured game",
      title: "INSTANT WIN GAMES",
      prize: "£300K",
      description: "Boomin' Lines",
      subtitle: "Goming for a £300,000 top prize",
      price: "PLAY FOR £3.00",
      bgGradient: "bg-gradient-to-br from-green-400 via-emerald-500 to-green-600",
      textColor: "text-white",
      buttonColor: "bg-blue-800 hover:bg-blue-900"
    },
    {
      id: "euromillions-hotpicks",
      label: "This Tuesday",
      title: "EUROMILLIONS HOTPICKS",
      prize: "£1500",
      description: "Pick & match 3 balls, win",
      subtitle: "",
      price: "PLAY FOR £1.50",
      bgGradient: "bg-gradient-to-br from-orange-400 via-red-400 to-red-500",
      textColor: "text-white",
      buttonColor: "bg-blue-800 hover:bg-blue-900"
    },
    {
      id: "lotto",
      label: "Today",
      title: "LOTTO",
      prize: "£5.2M",
      description: "IT'S A ROLLOVER",
      subtitle: "Triple rollover jackpot",
      price: "PLAY FOR £2.00",
      bgGradient: "bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600",
      textColor: "text-white",
      buttonColor: "bg-blue-800 hover:bg-blue-900"
    },
    {
      id: "thunderball",
      label: "This Friday",
      title: "THUNDERBALL",
      prize: "£500K",
      description: "TOP PRIZE",
      subtitle: "£1 could win you £500,000",
      price: "PLAY FOR £1.00",
      bgGradient: "bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600",
      textColor: "text-white",
      buttonColor: "bg-blue-800 hover:bg-blue-900"
    },
    {
      id: "set-for-life",
      label: "Monday & Thursday",
      title: "SET FOR LIFE",
      prize: "£10,000",
      description: "every month for 30 years",
      subtitle: "Life-changing prizes",
      price: "PLAY FOR £1.50",
      bgGradient: "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500",
      textColor: "text-white",
      buttonColor: "bg-blue-800 hover:bg-blue-900"
    }
  ];

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black text-blue-900 tracking-tight">MORE GAMES</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-blue-900" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5 text-blue-900" />
            </Button>
          </div>
        </div>

        {/* Scrollable Games Container */}
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollButtons}
        >
          {games.map((game, index) => (
            <div
              key={game.id}
              className="flex-shrink-0 w-72 snap-start"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${game.bgGradient} ${game.textColor} rounded-2xl overflow-hidden h-80 relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}>
                {/* Diagonal overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Top Label */}
                  <div className="mb-4">
                    <div className="text-sm font-bold uppercase tracking-wide opacity-90 mb-3">
                      {game.label}
                    </div>
                    <h3 className="text-xl font-black mb-2 leading-tight">
                      {game.title}
                      {game.title === "EUROMILLIONS" && <span className="text-lg">®</span>}
                      {game.title === "EUROMILLIONS HOTPICKS" && <span className="text-lg">®</span>}
                    </h3>
                  </div>

                  {/* Prize Section */}
                  <div className="flex-1 flex flex-col justify-center mb-4">
                    <div className="text-5xl font-black mb-2 leading-none drop-shadow-lg">
                      {game.prize}
                    </div>
                    <div className="text-lg font-bold mb-2 leading-tight">
                      {game.description}
                    </div>
                    {game.subtitle && (
                      <div className="text-sm opacity-90 leading-tight">
                        {game.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Play Button */}
                  <button className={`${game.buttonColor} text-white font-bold py-3 px-6 rounded-full text-sm transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg border-2 border-transparent hover:border-white/20`}>
                    {game.price}
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-4 space-x-1 md:hidden">
          {games.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MoreGamesSection;

// function useState(arg0: boolean): [any, any] {
//   throw new Error("Function not implemented.");
// }
