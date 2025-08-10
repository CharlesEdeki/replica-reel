import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const [selectedLines, setSelectedLines] = useState(1);
  const [currentRightGame, setCurrentRightGame] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Featured games that rotate hourly on the right side
  const featuredGames = [
    {
      id: "instant-win-blue",
      label: "Featured Game",
      title: "INSTANT WIN GAMES",
      subtitle: "100X Blue",
      description: "You go make the ₦1,000,000 jackpot?",
      price: "PLAY FOR ₦5,000",
      bgGradient: "from-green-400 via-emerald-500 to-green-600",
      decorativeElement: "💎",
      image: "/instant-win-bg.png",
      gameId: "lotto"
    },
    {
      id: "cashword-extra",
      label: "Featured Game", 
      title: "INSTANT WIN GAMES",
      subtitle: "Cashword Extra",
      description: "Cash in sharp sharp with ₦50,000,000 top prize",
      price: "PLAY FOR ₦2,000",
      bgGradient: "from-purple-500 via-pink-500 to-red-500",
      decorativeElement: "💰",
      image: "/cashword-bg.png",
      gameId: "afromillions"
    },
    {
      id: "lucky-lines",
      label: "Featured Game",
      title: "INSTANT WIN GAMES", 
      subtitle: "Lucky Lines",
      description: "Line up your luck for instant gbege prizes",
      price: "PLAY FOR ₦3,000",
      bgGradient: "from-blue-500 via-indigo-500 to-purple-600",
      decorativeElement: "🍀",
      image: "/lucky-lines-bg.png",
      gameId: "set-for-life"
    },
    {
      id: "monopoly-gold",
      label: "Featured Game",
      title: "INSTANT WIN GAMES",
      subtitle: "Monopoly Gold",
      description: "Pass GO and collect instant wins o!",
      price: "PLAY FOR ₦4,000", 
      bgGradient: "from-yellow-400 via-orange-500 to-red-600",
      decorativeElement: "🎩",
      image: "/monopoly-bg.png",
      gameId: "thunderball"
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

  const handleQuickLuckyDip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Store the intended action and redirect to sign-in
      sessionStorage.setItem('returnTo', '/games/set-for-life/play');
      sessionStorage.setItem('luckyDip', 'true');
      sessionStorage.setItem('selectedLines', selectedLines.toString());
      navigate('/sign-in');
    } else {
      // Store lucky dip preference and navigate to Set For Life game
      sessionStorage.setItem('luckyDip', 'true');
      sessionStorage.setItem('selectedLines', selectedLines.toString());
      navigate('/games/set-for-life/play');
    }
  };

  const handleSetForLifePlay = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('returnTo', '/games/set-for-life/play');
      navigate('/sign-in');
    } else {
      navigate('/games/set-for-life/play');
    }
  };

  const handleFeaturedGamePlay = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('returnTo', `/games/${currentGame.gameId}/play`);
      navigate('/sign-in');
    } else {
      navigate(`/games/${currentGame.gameId}/play`);
    }
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
        {/* Mobile Layout - Stacked Cards */}
        <div className="md:hidden">
          {/* Set For Life Card */}
          <div 
            onClick={handleSetForLifePlay}
            className="relative group cursor-pointer transition-all duration-300 hover:brightness-95 min-h-[400px] block"
          >
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
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
              {/* Top label */}
              <div className="mb-4">
                <div className="text-xs font-bold uppercase tracking-wide mb-2 opacity-90">
                  This Monday O!
                </div>
                <h1 className="text-xl font-black mb-2">
                  SET FOR LIFE<span className="text-sm">®</span>
                </h1>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center mb-6">
                <h2 className="text-3xl font-black leading-none mb-2 drop-shadow-lg">
                  WIN ₦10,000,000
                </h2>
                <h3 className="text-3xl font-black leading-none mb-2 drop-shadow-lg">
                  EVERY MONTH
                </h3>
                <h4 className="text-3xl font-black leading-none mb-4 drop-shadow-lg">
                  FOR 30 YEARS<span className="text-lg">*</span>
                </h4>
                <p className="text-sm opacity-90 font-bold">
                  NA YOUR TIME TO BLOW!!!
                </p>
              </div>

              {/* Bottom section with play button */}
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={handleSetForLifePlay}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  PLAY FOR ₦1,500
                </Button>

                {/* Quick play widget */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 text-gray-800 shadow-lg">
                  <div className="mb-2">
                    <h4 className="font-bold text-xs mb-1">You wan try Lucky Dip?</h4>
                    <p className="text-xs text-gray-600">
                      Play quick Lucky Dip for this Monday Set For Life draw
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">How many lines?</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateLines(-1);
                        }}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-lg font-bold min-w-[2rem] text-center">{selectedLines}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateLines(1);
                        }}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">Total: ₦{(selectedLines * 1500).toLocaleString()}</span>
                    <Button 
                      variant="outline"
                      onClick={handleQuickLuckyDip}
                      className="text-xs py-1 px-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold"
                    >
                      QUICK LUCKY DIP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Game Card */}
          <div 
            onClick={handleFeaturedGamePlay}
            className="relative group cursor-pointer transition-all duration-300 hover:brightness-95 min-h-[300px] mt-4 block"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${currentGame.bgGradient}`}></div>
            
            {/* Decorative geometric shapes */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-black/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-8 translate-y-8"></div>
            
            {/* Game logo/decorative element */}
            <div className="absolute bottom-4 right-4 text-4xl opacity-20 transform rotate-12">
              {currentGame.decorativeElement}
            </div>
            
            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
              {/* Top label */}
              <div className="mb-4">
                <div className="text-xs font-bold uppercase tracking-wide mb-2 opacity-90 border-b border-white/30 pb-1 inline-block">
                  {currentGame.label}
                </div>
                <h1 className="text-lg font-black mb-2 leading-tight">
                  {currentGame.title}
                </h1>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center mb-6">
                <h2 className="text-2xl font-black leading-none mb-2 drop-shadow-lg">
                  {currentGame.subtitle}
                </h2>
                <p className="text-sm font-bold mb-4 opacity-95">
                  {currentGame.description}
                </p>
              </div>

              {/* Bottom section */}
              <div>
                <Button 
                  onClick={handleFeaturedGamePlay}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {currentGame.price}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:flex min-h-[500px]">
          {/* Left Side - Set For Life with Better Text/Image Balance */}
          <div 
            onClick={handleSetForLifePlay}
            className="flex-1 relative group cursor-pointer transition-all duration-300 hover:brightness-95 block"
          >
            {/* Background with win.jpg image positioned to the right */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("/win.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'right center' // Position celebrant on the right side
              }}
            ></div>
            
            {/* Smart gradient overlay - transparent on right, solid on left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/95 via-yellow-400/80 via-yellow-400/50 to-transparent"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-black">
              {/* Top label */}
              <div className="mb-6 max-w-md">
                <div className="text-sm font-bold uppercase tracking-wide mb-4 bg-black/20 text-white px-3 py-1 rounded-full inline-block">
                  This Monday O!
                </div>
                <h1 className="text-2xl md:text-3xl font-black mb-2 text-shadow-lg">
                  SET FOR LIFE<span className="text-lg">®</span>
                </h1>
              </div>

              {/* Main content - positioned on left side, text more visible */}
              <div className="flex-1 flex flex-col justify-center mb-8 max-w-2xl">
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-2xl text-black">
                    WIN ₦10,000,000
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-2xl text-black">
                    EVERY MONTH
                  </h3>
                  <h4 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-2xl text-black">
                    FOR 30 YEARS<span className="text-2xl">*</span>
                  </h4>
                </div>
                <p className="text-lg font-bold text-red-600 drop-shadow-lg mt-4">
                  NA YOUR TIME TO BLOW! 🔥💰
                </p>
              </div>

              {/* Bottom section with play button */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-4xl">
                <Button 
                  onClick={handleSetForLifePlay}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20"
                >
                  PLAY FOR ₦1,500
                </Button>

                {/* Quick play widget */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 text-gray-800 shadow-lg max-w-xs border-2 border-white/30">
                  <div className="mb-3">
                    <h4 className="font-bold text-sm mb-1 text-gray-900">You wan try Lucky Dip?</h4>
                    <p className="text-xs text-gray-600">
                      Play quick Lucky Dip for this Monday Set For Life draw
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">How many lines?</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateLines(-1);
                        }}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors bg-white"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-2xl font-bold min-w-[3rem] text-center text-blue-600">{selectedLines}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateLines(1);
                        }}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors bg-white"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-900">Total: ₦{(selectedLines * 1500).toLocaleString()}</span>
                    <Button 
                      variant="outline"
                      onClick={handleQuickLuckyDip}
                      className="text-sm py-1 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold bg-white"
                    >
                      QUICK LUCKY DIP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Featured Game (Rotates Hourly) */}
          <div 
            onClick={handleFeaturedGamePlay}
            className="flex-1 relative group cursor-pointer transition-all duration-300 hover:brightness-95 block"
          >
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
                <div className="text-sm font-bold uppercase tracking-wide mb-4 opacity-90 border-b border-white/30 pb-2 inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  {currentGame.label}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight text-shadow-lg">
                  {currentGame.title}
                </h1>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center mb-8">
                <h2 className="text-6xl md:text-8xl font-black leading-none mb-6 relative">
                  {/* 3D Text Effect - Front Face */}
                  <span className="relative z-20 text-white">
                    {currentGame.subtitle}
                  </span>
                  {/* 3D Text Effect - Yellow Outline */}
                  <span className="absolute inset-0 text-6xl md:text-8xl font-black leading-none text-yellow-300 transform translate-x-0.5 translate-y-0.5">
                    {currentGame.subtitle}
                  </span>
                  {/* 3D Text Effect - Extruded Depth (Orange to Brown gradient) */}
                  <span className="absolute inset-0 text-6xl md:text-8xl font-black leading-none text-orange-500 transform translate-x-1 translate-y-1">
                    {currentGame.subtitle}
                  </span>
                  {/* 3D Text Effect - Darker Extrusion */}
                  <span className="absolute inset-0 text-6xl md:text-8xl font-black leading-none text-red-700 transform translate-x-2 translate-y-2">
                    {currentGame.subtitle}
                  </span>
                  {/* 3D Text Effect - Shadow on Background */}
                  <span className="absolute inset-0 text-6xl md:text-8xl font-black leading-none text-black/50 transform translate-x-3 translate-y-3 blur-sm">
                    {currentGame.subtitle}
                  </span>
                </h2>
                <p className="text-2xl md:text-3xl font-bold mb-6 opacity-95 relative">
                  {/* 3D Text Effect - Front Face */}
                  <span className="relative z-20 text-white">
                    {currentGame.description}
                  </span>
                  {/* 3D Text Effect - Yellow Outline */}
                  <span className="absolute inset-0 text-2xl md:text-3xl font-bold text-yellow-300 transform translate-x-0.5 translate-y-0.5">
                    {currentGame.description}
                  </span>
                  {/* 3D Text Effect - Extruded Depth */}
                  <span className="absolute inset-0 text-2xl md:text-3xl font-bold bg-gradient-to-br from-orange-500 to-red-700 bg-clip-text text-transparent transform translate-x-1 translate-y-1">
                    {currentGame.description}
                  </span>
                  {/* 3D Text Effect - Shadow */}
                  <span className="absolute inset-0 text-2xl md:text-3xl font-bold text-black/40 transform translate-x-2 translate-y-2 blur-sm">
                    {currentGame.description}
                  </span>
                </p>
              </div>

              {/* Bottom section */}
              <div>
                <Button 
                  onClick={handleFeaturedGamePlay}
                  className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/30 backdrop-blur-sm"
                >
                  {currentGame.price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;