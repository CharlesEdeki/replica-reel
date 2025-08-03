import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
  gameName: string;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, gameName, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className={`bg-red-100 border border-red-300 rounded-lg p-4 ${className}`}>
        <div className="flex items-center text-red-700">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-semibold">{gameName} draw has ended</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-blue-700 mb-2">
          <Clock className="h-5 w-5 mr-2" />
          <span className="font-semibold">Next {gameName} Draw</span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Min</div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Sec</div>
        </div>
      </div>
    </div>
  );
};

// Enhanced GameCard with improved animations
interface EnhancedGameCardProps {
  game: string;
  title: string;
  subtitle?: string;
  prize: string;
  drawDate: Date;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonPrice?: string;
  jackpotEstimate?: string;
}

const EnhancedGameCard: React.FC<EnhancedGameCardProps> = ({ 
  game, 
  title, 
  subtitle, 
  prize, 
  drawDate,
  backgroundColor, 
  textColor, 
  buttonText, 
  buttonPrice,
  jackpotEstimate
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);

  // Generate particles on hover
  useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.vx * 0.98,
        vy: particle.vy * 0.98
      })).filter(p => p.x > 0 && p.x < 100 && p.y > 0 && p.y < 100));
    }, 100);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div 
      className={`${backgroundColor} ${textColor} rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group relative h-full min-h-[400px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/40 rounded-full pointer-events-none animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="p-6 h-full flex flex-col relative z-10">
        {/* Game title and jackpot */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:scale-105">{game}</h3>
          {jackpotEstimate && (
            <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full inline-block mb-2 animate-pulse">
              ESTIMATED JACKPOT: {jackpotEstimate}
            </div>
          )}
        </div>
        
        {/* Game content */}
        <div className="flex-1 mb-4">
          <h4 className="text-xl font-bold mb-2 transition-all duration-300">{title}</h4>
          {subtitle && <p className="text-sm opacity-90 mb-4 transition-opacity duration-300 group-hover:opacity-100">{subtitle}</p>}
          {prize && <div className="text-4xl font-black mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white">{prize}</div>}
        </div>

        {/* Countdown Timer */}
        <div className="mb-4">
          <CountdownTimer 
            targetDate={drawDate} 
            gameName={game}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        
        {/* Play button */}
        <button className="w-full bg-white/20 hover:bg-white/40 text-white border border-white/30 hover:border-white/50 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          {buttonText} {buttonPrice && <span className="ml-1">{buttonPrice}</span>}
        </button>
      </div>

      {/* Shadow effect */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    </div>
  );
};

// Demo component showing multiple enhanced game cards
const EnhancedGamesShowcase = () => {
  const games = [
    {
      game: "LOTTO",
      title: "IT'S A ROLLOVER",
      prize: "£5.2M",
      drawDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      backgroundColor: "bg-red-600",
      textColor: "text-white",
      buttonText: "PLAY FOR",
      buttonPrice: "£2.00",
      jackpotEstimate: "£5.2M"
    },
    {
      game: "EUROMILLIONS",
      title: "MEGA JACKPOT",
      subtitle: "Life-changing prizes await",
      prize: "£14M",
      drawDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      backgroundColor: "bg-blue-600",
      textColor: "text-white",
      buttonText: "PLAY FOR",
      buttonPrice: "£2.50",
      jackpotEstimate: "£14M"
    },
    {
      game: "SET FOR LIFE",
      title: "£10,000 every month for 30 years",
      prize: "",
      drawDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      backgroundColor: "bg-teal-600",
      textColor: "text-white",
      buttonText: "PLAY FOR",
      buttonPrice: "£1.50"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Live Draw Countdown
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <EnhancedGameCard
                game={game.game}
                title={game.title}
                subtitle={game.subtitle}
                prize={game.prize}
                drawDate={game.drawDate}
                backgroundColor={game.backgroundColor}
                textColor={game.textColor}
                buttonText={game.buttonText}
                buttonPrice={game.buttonPrice}
                jackpotEstimate={game.jackpotEstimate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedGamesShowcase;