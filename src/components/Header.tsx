import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Games Mega Menu Component
function GamesMegaMenu({ isOpen, onClose }) {
  const games = [
    {
      title: "This Wednesday",
      subtitle: "LOTTO",
      amount: "£5.3M",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      textColor: "text-white"
    },
    {
      title: "This Tuesday", 
      subtitle: "EUROMILLIONS",
      amount: "£157M",
      color: "bg-gradient-to-br from-orange-400 to-orange-500",
      textColor: "text-white"
    },
    {
      title: "This Monday",
      subtitle: "SET FOR LIFE",
      amount: "WIN £10,000",
      subAmount: "EVERY MONTH",
      extraText: "FOR 30 YEARS",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-500",
      textColor: "text-white"
    }
  ];

  const hotpicks = [
    {
      title: "This Wednesday",
      subtitle: "LOTTO HOTPICKS",
      amount: "£350K",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      textColor: "text-white"
    },
    {
      title: "This Tuesday",
      subtitle: "EUROMILLIONS HOTPICKS", 
      amount: "£1M",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-white"
    },
    {
      title: "This Tuesday",
      subtitle: "THUNDERBALL",
      amount: "£500K",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-white"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className={`absolute top-full left-0 w-full bg-white shadow-2xl z-50 border-t-4 border-blue-600 transform transition-all duration-300 ease-out ${
      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Main Games Row */}
          {games.map((game, idx) => (
            <div 
              key={idx} 
              className={`${game.color} ${game.textColor} p-4 rounded-lg relative overflow-hidden hover:scale-105 hover:shadow-lg transform transition-all duration-300 cursor-pointer`}
            >
              <div className="relative z-10">
                <div className="text-xs font-medium mb-1">{game.title}</div>
                <div className="text-sm font-bold mb-1">{game.subtitle}</div>
                <div className="text-2xl font-bold mb-1">{game.amount}</div>
                {game.subAmount && <div className="text-sm font-semibold">{game.subAmount}</div>}
                {game.extraText && <div className="text-xs">{game.extraText}</div>}
              </div>
              <div className="absolute top-0 right-0 text-4xl opacity-20">*</div>
            </div>
          ))}
          
          {/* Instant Games */}
          <div className="bg-green-500 text-white p-4 rounded-lg hover:scale-105 hover:shadow-lg transform transition-all duration-300 cursor-pointer">
            <div className="text-sm font-bold mb-1">INSTANT</div>
            <div className="text-sm font-bold mb-2">WIN GAMES</div>
            <button className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-700 transition">
              MORE GAMES
            </button>
            <div className="mt-2 flex space-x-1">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">🎯</div>
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm">🎮</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Hotpicks Row */}
          {hotpicks.map((game, idx) => (
            <div 
              key={idx} 
              className={`${game.color} ${game.textColor} p-4 rounded-lg relative hover:scale-105 hover:shadow-lg transform transition-all duration-300 cursor-pointer`}
            >
              <div className="text-xs font-medium mb-1">{game.title}</div>
              <div className="text-sm font-bold mb-1">{game.subtitle}</div>
              <div className="text-2xl font-bold">{game.amount}</div>
            </div>
          ))}
          
          {/* Scratchcards */}
          <div className="bg-blue-600 text-white p-4 rounded-lg hover:scale-105 hover:shadow-lg transform transition-all duration-300 cursor-pointer">
            <div className="text-sm font-bold mb-2">SCRATCHCARDS</div>
            <button className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-semibold hover:bg-gray-100 transition">
              FIND OUT MORE
            </button>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 font-semibold hover:underline text-sm">
            Discover all games
          </a>
        </div>
      </div>
    </div>
  );
}

// Results Mega Menu Component  
function ResultsMegaMenu({ isOpen, onClose }) {
  const resultGames = [
    { name: "LOTTO", color: "bg-red-500", buttonColor: "border-red-500 text-red-500" },
    { name: "EUROMILLIONS", color: "bg-orange-500", buttonColor: "border-orange-500 text-orange-500" },
    { name: "SET FOR LIFE", color: "bg-cyan-500", buttonColor: "border-cyan-500 text-cyan-500" },
    { name: "LOTTO HOTPICKS", color: "bg-red-500", buttonColor: "border-red-500 text-red-500" },
    { name: "EUROMILLIONS HOTPICKS", color: "bg-orange-500", buttonColor: "border-orange-500 text-orange-500" },
    { name: "THUNDERBALL", color: "bg-purple-500", buttonColor: "border-purple-500 text-purple-500" }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results Column */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {resultGames.map((game, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-md transition">
                  <div className={`w-full h-3 ${game.color} rounded mb-4`}></div>
                  <h3 className="font-bold text-lg mb-4">{game.name}</h3>
                  <button className={`w-full border-2 ${game.buttonColor} py-2 px-4 rounded font-semibold hover:bg-gray-50 transition`}>
                    <a href="/check-numbers" className="text-center">
                    CHECK MY NUMBERS
                    </a>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-900 text-white p-6 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm mb-1">🎫</div>
                <div className="font-semibold">Bought your ticket online? Sign in to see if you've won. Fingers crossed!</div>
              </div>
              <button className="bg-white text-blue-900 px-6 py-2 rounded font-semibold ml-4 hover:bg-gray-100 transition">
                CHECK RESULTS
              </button>
            </div>
          </div>

          {/* Side Panel */}
          <div>
            <div className="space-y-4">
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">WATCH THE DRAWS</h3>
              </div>
              
              <div className="bg-blue-900 text-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Did you win?</h3>
              </div>
              
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">HOW TO CLAIM: RETAIL AND ONLINE TICKETS</h3>
              </div>
              
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">UNCLAIMED PRIZES</h3>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                See all results
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  const closeAllMenus = () => {
    setGamesOpen(false);
    setResultsOpen(false);
  };

  const handleGamesClick = () => {
    setGamesOpen(!gamesOpen);
    setResultsOpen(false);
  };

  const handleResultsClick = () => {
    setResultsOpen(!resultsOpen);
    setGamesOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow sticky top-0 z-50 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            National Lottery
          </div>
          
          <nav className="hidden md:flex space-x-8 text-white font-medium">
            <a href="/" className="hover:text-yellow-300 transition-colors duration-200">Home</a>
            <button 
              onClick={handleGamesClick}
              className="hover:text-yellow-300 transition-colors duration-200 flex items-center"
            >
              Games {gamesOpen ? <ChevronDown className="ml-1 rotate-180 transition-transform" size={16} /> : <ChevronDown className="ml-1 transition-transform" size={16} />}
            </button>
            <button 
              onClick={handleResultsClick}
              className="hover:text-yellow-300 transition-colors duration-200 flex items-center"
            >
              Results {resultsOpen ? <ChevronDown className="ml-1 rotate-180 transition-transform" size={16} /> : <ChevronDown className="ml-1 transition-transform" size={16} />}
            </button>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-200">Winners & Good Causes</a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-200">Healthy Play</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/register" 
              className="text-white underline hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}>
              
                Register
              
            </Link>
            <Link 
              to="/sign-in"
              className="text-white underline hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}>
                
              <button className="bg-white text-blue-900 px-6 py-2 rounded font-semibold hover:bg-yellow-300 hover:text-blue-900 transition-colors duration-200">
                SIGN IN
              </button>
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-blue-800 px-4 py-4 space-y-3">
            <a href="#" className="block text-white">Home</a>
            <button onClick={handleGamesClick} className="block text-white text-left w-full">Games</button>
            <button onClick={handleResultsClick} className="block text-white text-left w-full">Results</button>
            <a href="#" className="block text-white">Good Causes</a>
          </div>
        )}
      </header>

      {/* Mega Menus */}
      <div className="relative">
        <GamesMegaMenu isOpen={gamesOpen} onClose={closeAllMenus} />
        <ResultsMegaMenu isOpen={resultsOpen} onClose={closeAllMenus} />
      </div>
      
      {/* Overlay to close menus when clicking outside */}
      {(gamesOpen || resultsOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeAllMenus}
        />
      )}
    </>
  );
}