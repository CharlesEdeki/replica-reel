import { useEffect, useState } from "react";

const NotFound = () => {
  // Simulating location for demo purposes
  const location = { pathname: "/non-existent-page" };
  const [isRolling, setIsRolling] = useState(true);
  const [diceValues, setDiceValues] = useState([4, 0, 4]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 100);

    // Stop rolling after 2 seconds and show 4-0-4
    const stopRolling = setTimeout(() => {
      setIsRolling(false);
      setDiceValues([4, 0, 4]); // Show 4-0-4 (treating 0 as a special die face)
      clearInterval(rollInterval);
    }, 2000);

    return () => {
      clearInterval(rollInterval);
      clearTimeout(stopRolling);
    };
  }, [location.pathname]);

  const DiceFace = ({ value, isZero = false }) => {
    const getDots = (num) => {
      const dotPositions = {
        1: ["center"],
        2: ["top-left", "bottom-right"],
        3: ["top-left", "center", "bottom-right"],
        4: ["top-left", "top-right", "bottom-left", "bottom-right"],
        5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
        6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]
      };
      return dotPositions[num] || [];
    };

    return (
      <div 
        className={`
          w-20 h-20 bg-white rounded-lg shadow-lg border-2 border-gray-300 
          relative mx-2 transition-transform duration-100
          ${isRolling ? 'animate-spin' : 'animate-bounce'}
        `}
      >
        {isZero ? (
          // Special "0" face for the middle die
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-red-500 rounded-full flex items-center justify-center">
              <span className="text-red-500 font-bold text-lg">✗</span>
            </div>
          </div>
        ) : (
          // Regular dice dots
          getDots(value).map((position, index) => (
            <div
              key={index}
              className={`
                absolute w-3 h-3 bg-red-600 rounded-full
                ${position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}
                ${position === 'top-left' ? 'top-2 left-2' : ''}
                ${position === 'top-right' ? 'top-2 right-2' : ''}
                ${position === 'middle-left' ? 'top-1/2 left-2 transform -translate-y-1/2' : ''}
                ${position === 'middle-right' ? 'top-1/2 right-2 transform -translate-y-1/2' : ''}
                ${position === 'bottom-left' ? 'bottom-2 left-2' : ''}
                ${position === 'bottom-right' ? 'bottom-2 right-2' : ''}
              `}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Floating lottery balls background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-16 h-16 rounded-full opacity-10 animate-float
              ${i % 4 === 0 ? 'bg-yellow-400' : ''}
              ${i % 4 === 1 ? 'bg-red-400' : ''}
              ${i % 4 === 2 ? 'bg-blue-400' : ''}
              ${i % 4 === 3 ? 'bg-green-400' : ''}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
        {/* Dice Display */}
        <div className="flex justify-center items-center mb-8">
          <DiceFace value={diceValues[0]} />
          <DiceFace value={diceValues[1]} isZero={!isRolling && diceValues[1] === 0} />
          <DiceFace value={diceValues[2]} />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 text-white bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            {isRolling ? "Rolling..." : "404"}
          </h1>
          <p className="text-2xl text-gray-200 mb-2">
            {isRolling ? "Let the dice decide..." : "Unlucky Roll!"}
          </p>
          <p className="text-lg text-gray-300 mb-6">
            {isRolling 
              ? "Searching for your page..." 
              : "This page doesn't exist in our lottery draw!"
            }
          </p>
        </div>

        {/* Action Button */}
        {!isRolling && (
          <div className="space-y-4 animate-fade-in">
            <a 
              href="/" 
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🎰 Try Your Luck at Home
            </a>
            <div className="mt-4">
              <button 
                onClick={() => window.location.reload()} 
                className="text-white/70 hover:text-white underline text-sm transition-colors duration-300"
              >
                🎲 Roll the dice again
              </button>
            </div>
          </div>
        )}

        {/* Fun lottery-themed message */}
        {!isRolling && (
          <div className="mt-8 p-4 bg-black/20 rounded-xl border border-yellow-400/30 animate-pulse-slow">
            <p className="text-yellow-300 text-sm">
              🍀 <strong>Fun Fact:</strong> The odds of finding this page were higher than winning the jackpot!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;