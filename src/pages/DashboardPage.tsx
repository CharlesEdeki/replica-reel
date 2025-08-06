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
  purchaseDate: string;
  drawDate: string;
  status: 'pending' | 'drawn' | 'won' | 'lost';
  winAmount?: number;
}

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [loading, setLoading] = useState(true);

  

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [isAuthenticated, loadUserTickets, navigate]);

  const simulateDrawResults = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    // Simple random win/lose simulation (10% chance to win something)
    const isWinner = Math.random() < 0.1;
    const winAmount = isWinner ? Math.floor(Math.random() * 50000) + 500 : 0;

    const updatedTicket = {
      ...ticket,
      status: isWinner ? 'won' as const : 'lost' as const,
      winAmount: winAmount || undefined
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

      if (isWinner) {
        toast.success(`🎉 Omo! You don win! ₦${winAmount.toLocaleString()} for your ${ticket.gameName} ticket! E choke!`);
      } else {
        toast.info(`Your ${ticket.gameName} ticket no enter this time. No wahala, better luck next time! Keep trying!`);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const getStatusBadge = (status: string, winAmount?: number) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3" />
            Dey Wait for Draw
          </span>
        );
      case 'won':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Trophy className="w-3 h-3" />
            You Win ₦{winAmount?.toLocaleString()}! 🔥
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
    return tickets.reduce((total, ticket) => total + ticket.ticketPrice, 0);
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
                return (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {ticket.gameName}
                          </h3>
                          {getStatusBadge(ticket.status, ticket.winAmount)}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>You Buy: {formatDate(ticket.purchaseDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Draw Date: {formatDate(ticket.drawDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Cost: ₦{ticket.ticketPrice.toLocaleString()}</span>
                          </div>
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
                            onClick={() => simulateDrawResults(ticket.id)}
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
            <p className="text-blue-100">Pick your lucky numbers and buy tickets wey go make you rich! 💰</p>
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
            <p className="text-green-100">See if your numbers don win something sweet! 🎯</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;