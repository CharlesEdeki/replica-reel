import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const HeroSection = () => {
  const [selectedLines, setSelectedLines] = useState(1);
  const [currentRightGame, setCurrentRightGame] = useState(0);

  // Featured games that rotate hourly on the right side
  const featuredGames = [
    {
      id: "instant-win-blue",
      label: "Featured Game",
      title: "INSTANT WIN GAMES",
      subtitle: "100X Blue",
      description: "Will you make the £1,000,000 match?",
      price: "PLAY FOR £5.00",
      bgGradient: "from-green-400 via-emerald-500 to-green-600",
      decorativeElement: "💎",
      image: "/instant-win-bg.png"
    },
    {
      id: "cashword-extra",
      label: "Featured Game", 
      title: "INSTANT WIN GAMES",
      subtitle: "Cashword Extra",
      description: "Cash in on the game with a £50,000 top prize",
      price: "PLAY FOR £2.00",
      bgGradient: "from-purple-500 via-pink-500 to-red-500",
      decorativeElement: "💰",
      image: "/cashword-bg.png"
    },
    {
      id: "lucky-lines",
      label: "Featured Game",
      title: "INSTANT WIN GAMES", 
      subtitle: "Lucky Lines",
      description: "Line up the luck for instant prizes",
      price: "PLAY FOR £3.00",
      bgGradient: "from-blue-500 via-indigo-500 to-purple-600",
      decorativeElement: "🍀",
      image: "/lucky-lines-bg.png"
    },
    {
      id: "monopoly-gold",
      label: "Featured Game",
      title: "INSTANT WIN GAMES",
      subtitle: "Monopoly Gold",
      description: "Pass GO and collect instant wins",
      price: "PLAY FOR £4.00", 
      bgGradient: "from-yellow-400 via-orange-500 to-red-600",
      decorativeElement: "🎩",
      image: "/monopoly-bg.png"
    }
  ];

  // Shuffle games every hour
  useEffect(() => {
    const now = new Date();
    const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60));
    setCurrentRightGame(hoursSinceEpoch % featuredGames.length);

    const minutesToNextHour = 60 - now.getMinutes();
    const millisecondsToNextHour = (minutesToNextHour * 60 - now.getSeconds()) * 1000;

    const timeoutId = setTimeout(() => {
      setCurrentRightGame((prev) => (prev + 1) % featuredGames.length);
      
      // Set up hourly interval after the first change
      const intervalId = setInterval(() => {
        setCurrentRightGame((prev) => (prev + 1) % featuredGames.length);
      }, 60 * 60 * 1000); // 1 hour

      return () => clearInterval(intervalId);
    }, millisecondsToNextHour);

    return () => clearTimeout(timeoutId);
  }, [featuredGames.length]);

  const currentGame = featuredGames[currentRightGame];

  const updateLines = (change: number) => {
    setSelectedLines(Math.max(1, Math.min(10, selectedLines + change)));
  };

  return (
    <>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="max-w-6xl mx-auto flex items-start">
          <div className="flex-shrink-0">
          </div>
          <div className="ml-3">
            
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="relative overflow-hidden">
        <div className="flex min-h-[500px]">
          {/* Left Side - Set For Life */}
          <div className="flex-1 relative group cursor-pointer transition-all duration-300 hover:brightness-95">
            {/* Background with celebration image */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
              }}
            ></div>
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-cyan-500/70"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-white">
              {/* Top label */}
              <div className="mb-6">
                <div className="text-sm font-bold uppercase tracking-wide mb-4 opacity-90">
                  This Monday
                </div>
                <h1 className="text-2xl md:text-3xl font-black mb-2">
                  SET FOR LIFE<span className="text-lg">®</span>
                </h1>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black leading-none mb-4 drop-shadow-lg">
                  WIN £10,000
                </h2>
                <h3 className="text-4xl md:text-6xl font-black leading-none mb-4 drop-shadow-lg">
                  EVERY MONTH
                </h3>
                <h4 className="text-4xl md:text-6xl font-black leading-none mb-6 drop-shadow-lg">
                  FOR 30 YEARS<span className="text-2xl">*</span>
                </h4>
              </div>

              {/* Bottom section with play button */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  PLAY FOR £1.50
                </Button>

                {/* Quick play widget */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 text-gray-800 shadow-lg max-w-xs">
                  <div className="mb-3">
                    <h4 className="font-bold text-sm mb-1">Fancy a Lucky Dip?</h4>
                    <p className="text-xs text-gray-600">
                      Play a quick Lucky Dip in this Monday's Set For Life draw
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">How many lines?</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateLines(-1)}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-2xl font-bold min-w-[3rem] text-center">{selectedLines}</span>
                      <button
                        onClick={() => updateLines(1)}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold">Total: £{(selectedLines * 1.50).toFixed(2)}</span>
                    <Button 
                      variant="outline"
                      className="text-sm py-1 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold"
                    >
                      QUICK LUCKY DIP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Featured Game (Rotates Hourly) */}
          <div className="flex-1 relative group cursor-pointer transition-all duration-300 hover:brightness-95">
            <div className={`absolute inset-0 bg-gradient-to-br ${currentGame.bgGradient}`}></div>
            
            {/* Decorative geometric shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-black/10 transform rotate-45 translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 translate-y-10"></div>
            
            {/* Game logo/decorative element */}
            <div className="absolute bottom-6 right-6 text-6xl opacity-20 transform rotate-12">
              {currentGame.decorativeElement}
            </div>
            
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-white">
              {/* Top label */}
              <div className="mb-6">
                <div className="text-sm font-bold uppercase tracking-wide mb-4 opacity-90 border-b border-white/30 pb-2 inline-block">
                  {currentGame.label}
                </div>
                <h1 className="text-xl md:text-2xl font-black mb-2 leading-tight">
                  {currentGame.title}
                </h1>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <h2 className="text-4xl md:text-5xl font-black leading-none mb-4 drop-shadow-lg">
                  {currentGame.subtitle}
                </h2>
                <p className="text-lg md:text-xl font-bold mb-6 opacity-95">
                  {currentGame.description}
                </p>
              </div>

              {/* Bottom section */}
              <div>
                <Button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {currentGame.price}
                </Button>
                
                {/* Next game indicator */}
                <div className="mt-4 text-xs opacity-75">
                  <p>Game rotates hourly • Next: {featuredGames[(currentRightGame + 1) % featuredGames.length].subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;