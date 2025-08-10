import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  Trophy, 
  AlertCircle, 
  Play, 
  Eye,
  LogOut,
  Ticket,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getGameById } from '@/data/games';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DRAW_RESULTS, checkTicketAgainstResult } from '@/services/resultsService';

interface SelectedNumbers {
  main: number[];
  bonus: number[];
}

interface LotteryTicket {
  id: string;
  gameId: string;
  gameName: string;
  userId: string;
  numbers: SelectedNumbers;
  ticketPrice: number;
  stakeAmount: number; // Added stake amount field
  purchaseDate: string;
  drawDate: string;
  status: 'pending' | 'drawn' | 'won' | 'lost';
  winAmount?: number;
  stakeMultiplier?: number; // Track the multiplier used
}

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUserTickets = () => {
    try {
      const savedTickets = localStorage.getItem('lotteryTickets');
      if (savedTickets) {
        const allTickets: LotteryTicket[] = JSON.parse(savedTickets);
        const userTickets = allTickets.filter(ticket => ticket.userId === user?.id);
        setTickets(userTickets.sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()));
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
      toast.error('Wahala don happen! We no fit load your tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    loadUserTickets();
  }, [isAuthenticated, navigate]);

  // Check tickets against actual results with stake multiplier
  const checkTicketAgainstResults = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    // Find the corresponding draw result for this game
    const gameResult = DRAW_RESULTS.find(result => result.gameId === ticket.gameId);
    
    if (!gameResult) {
      toast.info(`No draw results available yet for your ${ticket.gameName} ticket.`);
      return;
    }

    // Calculate stake multiplier (minimum stake is ₦50)
    const stakeMultiplier = (ticket.stakeAmount || ticket.ticketPrice || 50) / 50;

    // Use the centralized checking logic with stake multiplier
    const checkResult = checkTicketAgainstResult(ticket, gameResult, stakeMultiplier);
    
    if (!checkResult) return;

    const updatedTicket = {
      ...ticket,
      status: checkResult.isWinner ? 'won' as const : 'lost' as const,
      winAmount: checkResult.winAmount || undefined,
      stakeMultiplier: stakeMultiplier
    };

    // Update in state
    setTickets(prev => prev.map(t => t.id === ticketId ? updatedTicket : t));

    // Update in localStorage
    try {
      const allTickets = JSON.parse(localStorage.getItem('lotteryTickets') || '[]');
      const updatedTickets = allTickets.map((t: LotteryTicket) => 
        t.id === ticketId ? updatedTicket : t
      );
      localStorage.setItem('lotteryTickets', JSON.stringify(updatedTickets));

      if (checkResult.isWinner) {
        const multiplierText = stakeMultiplier > 1 ? ` (${stakeMultiplier}x your stake!)` : '';
        toast.success(`🎉 Omo! You don win! ${checkResult.tier} - ₦${checkResult.winAmount?.toLocaleString()}${multiplierText}! E choke!`);
      } else {
        toast.info(`Your ${ticket.gameName} ticket no enter this time. You get ${checkResult.mainMatches} main matches${checkResult.bonusMatches > 0 ? ` and ${checkResult.bonusMatches} bonus matches` : ''}, but e no reach to win. Better luck next time!`);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const getStatusBadge = (status: string, winAmount?: number, stakeMultiplier?: number) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3" />
            Dey Wait for Draw
          </span>
        );
      case 'won':
        const multiplierBadge = stakeMultiplier && stakeMultiplier > 1 ? ` (${stakeMultiplier}x!)` : '';
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Trophy className="w-3 h-3" />
            You Win ₦{winAmount?.toLocaleString()}{multiplierBadge}! 🔥
          </span>
        );
      case 'lost':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <AlertCircle className="w-3 h-3" />
            No Win This Time
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalSpent = () => {
    return tickets.reduce((total, ticket) => total + (ticket.stakeAmount || ticket.ticketPrice || 50), 0);
  };

  const getTotalWinnings = () => {
    return tickets.reduce((total, ticket) => total + (ticket.winAmount || 0), 0);
  };

  const getWinCount = () => {
    return tickets.filter(ticket => ticket.status === 'won').length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dey load your dashboard...</p>
        </div>
      </div>
    );
  }

  const createInstantWinTicket = (gameId: string, stakeAmount: number = 100) => {
    if (!user?.id) return;
  
    const gameResult = DRAW_RESULTS.find(r => r.gameId === gameId);
    if (!gameResult) return;
  
    const winningTicket: LotteryTicket = {
      id: `instant-win-${gameId}-${stakeAmount}-${Date.now()}`,
      gameId: gameId,
      gameName: gameResult.gameName,
      userId: user.id,
      numbers: {
        main: [...gameResult.numbers.main], // Copy exact winning numbers
        bonus: [...(gameResult.numbers.bonus || [])]
      },
      ticketPrice: stakeAmount, // Use the stake amount as ticket price
      stakeAmount: stakeAmount,
      purchaseDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      drawDate: gameResult.drawDate,
      status: 'pending'
    };

    try {
      const existingTickets = JSON.parse(localStorage.getItem('lotteryTickets') || '[]');
      const updatedTickets = [...existingTickets, winningTicket];
      localStorage.setItem('lotteryTickets', JSON.stringify(updatedTickets));
      
      loadUserTickets();
      const multiplier = stakeAmount / 50;
      toast.success(`🎯 Created ₦${stakeAmount} stake ticket for ${gameResult.gameName}! (${multiplier}x multiplier) Check it now! 🚀`);
    } catch (error) {
      console.error('Error creating instant win ticket:', error);
    }
  };  

  // Create a ticket with some matches but not full win (for testing partial wins)
  const createPartialWinTicket = (gameId: string, matchCount: number = 3, stakeAmount: number = 200) => {
    if (!user?.id) return;
    
    const gameResult = DRAW_RESULTS.find(r => r.gameId === gameId);
    if (!gameResult) return;
    
    // Take some winning numbers + some random ones
    const partialNumbers = [
      ...gameResult.numbers.main.slice(0, matchCount), // Take first X winning numbers
      ...Array.from({length: 6 - matchCount}, () => 
        Math.floor(Math.random() * 49) + 1
      ).filter(num => !gameResult.numbers.main.includes(num)) // Add non-winning numbers
    ];
    
    const partialTicket: LotteryTicket = {
      id: `partial-win-${gameId}-${matchCount}-${stakeAmount}-${Date.now()}`,
      gameId: gameId,
      gameName: gameResult.gameName,
      userId: user.id,
      numbers: {
        main: partialNumbers.slice(0, gameResult.numbers.main.length),
        bonus: matchCount > 4 ? [...(gameResult.numbers.bonus || [])] : [Math.floor(Math.random() * 12) + 1]
      },
      ticketPrice: stakeAmount,
      stakeAmount: stakeAmount,
      purchaseDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      drawDate: gameResult.drawDate,
      status: 'pending'
    };

    try {
      const existingTickets = JSON.parse(localStorage.getItem('lotteryTickets') || '[]');
      const updatedTickets = [...existingTickets, partialTicket];
      localStorage.setItem('lotteryTickets', JSON.stringify(updatedTickets));
      
      loadUserTickets();
      const multiplier = stakeAmount / 50;
      toast.success(`🎲 Created ${matchCount}-match ticket with ₦${stakeAmount} stake (${multiplier}x)! Check it to see win!`);
    } catch (error) {
      console.error('Error creating partial win ticket:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Wetin dey happen, {user?.firstName || user?.email}! 👋
            </h1>
            <p className="text-gray-600">Check your lottery tickets and see if you don win something sweet!</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link
              to="/games"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Play className="w-4 h-4" />
              Make Some Money! 🚀
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <LogOut className="w-4 h-4" />
              Comot
            </button>
          </div>
        </div>

        {/* Testing Tools - Remove in production */}
        {/* <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">🧪 Testing Tools (Dev Only)</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Create Instant Jackpot Winners with Different Stakes:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button 
                  onClick={() => createInstantWinTicket('lotto', 50)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-semibold transition"
                >
                  🎰 Lotto ₦50 (1x)
                </button>
                <button 
                  onClick={() => createInstantWinTicket('lotto', 200)} 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-semibold transition"
                >
                  🎰 Lotto ₦200 (4x)
                </button>
                <button 
                  onClick={() => createInstantWinTicket('afromillions', 100)} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-semibold transition"
                >
                  🌟 AfroMill ₦100 (2x)
                </button>
                <button 
                  onClick={() => createInstantWinTicket('afromillions', 500)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-semibold transition"
                >
                  🌟 AfroMill ₦500 (10x)
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Create Partial Winners with Stakes:</h4>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => createPartialWinTicket('lotto', 5, 100)} 
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition"
                >
                  5 Match ₦100 (₦280K win)
                </button>
                <button 
                  onClick={() => createPartialWinTicket('lotto', 4, 200)} 
                  className="bg-green-400 hover:bg-green-500 text-white px-3 py-2 rounded text-sm transition"
                >
                  4 Match ₦200 (₦120K win)
                </button>
                <button 
                  onClick={() => createPartialWinTicket('lotto', 3, 500)} 
                  className="bg-green-300 hover:bg-green-400 text-white px-3 py-2 rounded text-sm transition"
                >
                  3 Match ₦500 (₦30K win)
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  localStorage.removeItem('lotteryTickets');
                  loadUserTickets();
                  toast.success('All tickets cleared! Fresh start! 🧹');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                🧹 Clear All Tickets
              </button>
            </div>
          </div>
        </div> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
              </div>
              <Ticket className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Money Wey You Spend</p>
                <p className="text-2xl font-bold text-gray-900">₦{getTotalSpent().toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Your Wins 🏆</p>
                <p className="text-2xl font-bold text-green-600">{getWinCount()}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Money Wey You Win</p>
                <p className="text-2xl font-bold text-green-600">₦{getTotalWinnings().toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Your Tickets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Tickets Dem</h2>
            {tickets.length > 0 && (
              <Link
                to="/games"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Buy More Tickets Make You Win Big! →
              </Link>
            )}
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">You never buy ticket yet o!</h3>
              <p className="text-gray-500 mb-6">Start to dey play by buying your first lottery ticket! Na small money wey fit turn big money!</p>
              <Link
                to="/games"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Play className="w-4 h-4" />
                Play Your First Game! 🎲
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => {
                const game = getGameById(ticket.gameId);
                const stakeMultiplier = (ticket.stakeAmount || ticket.ticketPrice || 50) / 50;
                return (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {ticket.gameName}
                          </h3>
                          {getStatusBadge(ticket.status, ticket.winAmount, ticket.stakeMultiplier)}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Bought: {formatDate(ticket.purchaseDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Draw: {formatDate(ticket.drawDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Stake: ₦{(ticket.stakeAmount || ticket.ticketPrice || 50).toLocaleString()}</span>
                          </div>
                          {stakeMultiplier > 1 && (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-semibold">{stakeMultiplier}x Multiplier!</span>
                            </div>
                          )}
                        </div>

                        {/* Numbers Display */}
                        <div className="flex flex-wrap gap-4">
                          {ticket.numbers.main.length > 0 && (
                            <div>
                              <span className="text-xs text-gray-500 block mb-1">Main Numbers:</span>
                              <div className="flex gap-1">
                                {ticket.numbers.main.map(num => (
                                  <span 
                                    key={num} 
                                    className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center text-white ${game?.colors.primary || 'bg-blue-600'}`}
                                  >
                                    {num}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {ticket.numbers.bonus.length > 0 && (
                            <div>
                              <span className="text-xs text-gray-500 block mb-1">{game?.bonusNumbers?.name}:</span>
                              <div className="flex gap-1">
                                {ticket.numbers.bonus.map(num => (
                                  <span 
                                    key={num} 
                                    className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-semibold flex items-center justify-center"
                                  >
                                    {num}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        {ticket.status === 'pending' && (
                          <button
                            onClick={() => checkTicketAgainstResults(ticket.id)}
                            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Check Am! 👀
                          </button>
                        )}
                        <Link
                          to={`/games/${ticket.gameId}`}
                          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                        >
                          <Target className="w-4 h-4" />
                          Game Info
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/games"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
          >
            <Play className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Play Games</h3>
            <p className="text-blue-100">Pick your lucky numbers and choose your stake to multiply winnings! 💰</p>
          </Link>

          <Link
            to="/results"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
          >
            <Trophy className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Latest Results</h3>
            <p className="text-purple-100">Check the latest draw results - see who don win big! 🏆</p>
          </Link>

          <Link
            to="/check-numbers"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg hover:from-green-600 hover:to-green-700 transition"
          >
            <Target className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Check Numbers</h3>
            <p className="text-green-100">See if your numbers don win something sweet! Higher stakes = bigger wins! 🎯</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;