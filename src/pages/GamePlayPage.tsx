import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shuffle, CreditCard, Calendar, Clock, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { games, getGameById, Game } from '@/data/games';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SelectedNumbers {
  main: number[];
  bonus: number[];
}

interface Ticket {
  id: string;
  gameId: string;
  gameName: string;
  userId: string;
  numbers: SelectedNumbers;
  ticketPrice: number;
  purchaseDate: string;
  drawDate: string;
  status: 'pending' | 'drawn' | 'won' | 'lost';
  winAmount?: number;
}

const GamePlayPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [game, setGame] = useState<Game | null>(null);
  const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbers>({ main: [], bonus: [] });
  const [isLuckyDip, setIsLuckyDip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    if (gameId) {
      const foundGame = getGameById(gameId);
      if (foundGame) {
        setGame(foundGame);
      } else {
        toast.error('Game not found');
        navigate('/games');
      }
    }
  }, [gameId, isAuthenticated, navigate]);

  const generateLuckyNumbers = () => {
    if (!game) return;

    const mainRange = game.numberRange.split('-').map(n => parseInt(n));
    const mainNumbers: number[] = [];
    
    // Generate main numbers
    while (mainNumbers.length < game.maxNumbers) {
      const num = Math.floor(Math.random() * (mainRange[1] - mainRange[0] + 1)) + mainRange[0];
      if (!mainNumbers.includes(num)) {
        mainNumbers.push(num);
      }
    }
    mainNumbers.sort((a, b) => a - b);

    // Generate bonus numbers if applicable
    let bonusNumbers: number[] = [];
    if (game.bonusNumbers) {
      const bonusRange = game.bonusNumbers.range.split('-').map(n => parseInt(n));
      while (bonusNumbers.length < game.bonusNumbers.count) {
        const num = Math.floor(Math.random() * (bonusRange[1] - bonusRange[0] + 1)) + bonusRange[0];
        if (!bonusNumbers.includes(num)) {
          bonusNumbers.push(num);
        }
      }
      bonusNumbers.sort((a, b) => a - b);
    }

    setSelectedNumbers({ main: mainNumbers, bonus: bonusNumbers });
    setIsLuckyDip(true);
  };

  const handleMainNumberSelect = (number: number) => {
    if (!game) return;

    setIsLuckyDip(false);
    setSelectedNumbers(prev => {
      const newMain = [...prev.main];
      const index = newMain.indexOf(number);
      
      if (index > -1) {
        newMain.splice(index, 1);
      } else if (newMain.length < game.maxNumbers) {
        newMain.push(number);
        newMain.sort((a, b) => a - b);
      }
      
      return { ...prev, main: newMain };
    });
  };

  const handleBonusNumberSelect = (number: number) => {
    if (!game?.bonusNumbers) return;

    setIsLuckyDip(false);
    setSelectedNumbers(prev => {
      const newBonus = [...prev.bonus];
      const index = newBonus.indexOf(number);
      
      if (index > -1) {
        newBonus.splice(index, 1);
      } else if (newBonus.length < game.bonusNumbers!.count) {
        newBonus.push(number);
        newBonus.sort((a, b) => a - b);
      }
      
      return { ...prev, bonus: newBonus };
    });
  };

  const isSelectionComplete = () => {
    if (!game) return false;
    
    const mainComplete = selectedNumbers.main.length === game.maxNumbers;
    const bonusComplete = !game.bonusNumbers || selectedNumbers.bonus.length === game.bonusNumbers.count;
    
    return mainComplete && bonusComplete;
  };

  const generateNextDrawDate = () => {
    const now = new Date();
    const today = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Simple logic: next draw is tomorrow (for demo purposes)
    const nextDraw = new Date(now);
    nextDraw.setDate(now.getDate() + 1);
    nextDraw.setHours(20, 0, 0, 0); // 8 PM
    
    return nextDraw.toISOString();
  };

  const handlePurchaseTicket = async () => {
    if (!game || !user || !isSelectionComplete()) return;

    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const ticket: Ticket = {
        id: Date.now().toString(),
        gameId: game.id,
        gameName: game.name,
        userId: user.id,
        numbers: selectedNumbers,
        ticketPrice: game.ticketPrice,
        purchaseDate: new Date().toISOString(),
        drawDate: generateNextDrawDate(),
        status: 'pending'
      };

      // Save ticket to localStorage
      const existingTickets = localStorage.getItem('lotteryTickets');
      let tickets: Ticket[] = [];
      
      if (existingTickets) {
        try {
          tickets = JSON.parse(existingTickets);
        } catch (error) {
          console.error('Error parsing existing tickets:', error);
        }
      }
      
      tickets.push(ticket);
      localStorage.setItem('lotteryTickets', JSON.stringify(tickets));

      toast.success(`Ticket purchased successfully! Good luck in the next ${game.name} draw!`);
      navigate('/dashboard');

    } catch (error) {
      toast.error('Failed to purchase ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderNumberGrid = (
    range: string, 
    selected: number[], 
    onSelect: (num: number) => void,
    maxSelections: number,
    title: string
  ) => {
    const [min, max] = range.split('-').map(n => parseInt(n));
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          {title} (Select {maxSelections})
        </h3>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {numbers.map(num => (
            <button
              key={num}
              onClick={() => onSelect(num)}
              disabled={!selected.includes(num) && selected.length >= maxSelections}
              className={`
                w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200
                ${selected.includes(num)
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }
                ${!selected.includes(num) && selected.length >= maxSelections
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 cursor-pointer'
                }
              `}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Selected: {selected.length} of {maxSelections}
        </div>
      </div>
    );
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </button>
        </div>

        {/* Game Info */}
        <div className={`rounded-2xl p-6 mb-8 text-white ${game.colors.primary}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
              <p className="text-white/90 text-lg">{game.tagline}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">£{game.ticketPrice}</div>
              <div className="text-white/80 text-sm">per line</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Next: Tomorrow</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{game.drawTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{game.maxNumbers} numbers</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Jackpot: {game.minJackpot}</span>
            </div>
          </div>
        </div>

        {/* Number Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Numbers</h2>
            <button
              onClick={generateLuckyNumbers}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              <Shuffle className="w-4 h-4" />
              Lucky Dip
            </button>
          </div>

          {isLuckyDip && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                🍀 Lucky Dip numbers have been selected for you! You can still modify them manually.
              </p>
            </div>
          )}

          {/* Main Numbers */}
          {renderNumberGrid(
            game.numberRange,
            selectedNumbers.main,
            handleMainNumberSelect,
            game.maxNumbers,
            `Main Numbers (${game.numberRange})`
          )}

          {/* Bonus Numbers */}
          {game.bonusNumbers && renderNumberGrid(
            game.bonusNumbers.range,
            selectedNumbers.bonus,
            handleBonusNumberSelect,
            game.bonusNumbers.count,
            `${game.bonusNumbers.name} (${game.bonusNumbers.range})`
          )}

          {/* Selected Numbers Display */}
          {(selectedNumbers.main.length > 0 || selectedNumbers.bonus.length > 0) && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Your Selection</h4>
              <div className="flex flex-wrap gap-4">
                {selectedNumbers.main.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Main Numbers:</span>
                    <div className="flex gap-2">
                      {selectedNumbers.main.map(num => (
                        <span key={num} className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedNumbers.bonus.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">{game.bonusNumbers?.name}:</span>
                    <div className="flex gap-2">
                      {selectedNumbers.bonus.map(num => (
                        <span key={num} className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              {isSelectionComplete() 
                ? `✅ Selection complete - Ready to purchase for £${game.ticketPrice}`
                : `❌ Please complete your number selection`
              }
            </div>
            <button
              onClick={handlePurchaseTicket}
              disabled={!isSelectionComplete() || isLoading}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Buy Ticket - £{game.ticketPrice}
                </>
              )}
            </button>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play {game.name}</h3>
          <ul className="space-y-2 text-gray-700">
            {game.howToPlay.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GamePlayPage;