import React, { useRef, useState, useEffect } from "react";
import GameCard from "./GameCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  gameId: string;
  image?: string;
}

const MoreGamesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
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
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      gameId: "euromillions"
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
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      gameId: "instant-win"
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
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      gameId: "euromillions-hotpicks"
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
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      gameId: "lotto"
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
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      gameId: "thunderball"
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
      buttonColor: "bg-blue-800 hover:bg-blue-900",
      gameId: "set-for-life"
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

  // Auto-play functionality for mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) { // Mobile only
      const interval = setInterval(() => {
        if (isAutoPlaying) {
          setCurrentSlide((prev) => (prev + 1) % games.length);
        }
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, games.length]);

  // Pause auto-play on user interaction
  const handleSlideChange = (newSlide: number) => {
    setCurrentSlide(newSlide);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
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
              className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hidden md:flex"
            >
              <ChevronLeft className="h-5 w-5 text-blue-900" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hidden md:flex"
            >
              <ChevronRight className="h-5 w-5 text-blue-900" />
            </Button>
          </div>
        </div>

        {/* Desktop Layout - Scrollable Games Container */}
        <div className="hidden md:block">
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
                <Link
                  to={`/games/${game.gameId}`}
                  className={`${game.bgGradient} ${game.textColor} rounded-2xl overflow-hidden h-80 relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group block`}
                >
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
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Auto-sliding Carousel */}
        <div className="md:hidden">
          {/* Mobile Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-900">More Games</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSlideChange((currentSlide - 1 + games.length) % games.length)}
                className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4 text-blue-900" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSlideChange((currentSlide + 1) % games.length)}
                className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4 text-blue-900" />
              </Button>
            </div>
          </div>

          {/* Mobile Auto-sliding Carousel */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {games.map((game, index) => (
                <div
                  key={game.id}
                  className="w-full flex-shrink-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    to={`/games/${game.gameId}`}
                    className={`${game.bgGradient} ${game.textColor} rounded-2xl overflow-hidden h-80 relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group block`}
                  >
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
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile slide indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {games.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          {/* <div className="text-center mt-2 text-xs text-gray-500">
            Auto-sliding every 5 seconds • {currentSlide + 1} of {games.length}
          </div> */}
        </div>
        
        {/* View All Games Link */}
        <div className="text-center mt-8">
          <Link
            to="/games/:gameId"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Games
            <ChevronRight className="w-5 h-5" />
          </Link>
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
