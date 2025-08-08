import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Play, 
  ArrowLeft, 
  Star, 
  Target, 
  TrendingUp,
  Shield,
  Gift,
  Users,
  Trophy,
  Info,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getGameById, Game } from '@/data/games';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Use the centralized game data
  const game = gameId ? getGameById(gameId) : null;

  console.log('GameId from URL:', gameId);
  console.log('Found game:', game);

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Game Not Found</h1>
          <p className="text-gray-600 mb-4">
            The game "{gameId}" you're looking for doesn't exist.
          </p>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlayGame = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('returnTo', `/games/${game.id}/play`);
      navigate('/sign-in');
    } else {
      navigate(`/games/${game.id}/play`);
    }
  };

  const handleBackToGames = () => {
    navigate('/games');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className={`${game.colors.primary} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBackToGames}
              className="flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Games
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">{game.name}</h1>
              <p className="text-2xl text-white/90 mb-6">{game.tagline}</p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {game.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/80 text-sm mb-1">Ticket Price</div>
                  <div className="text-2xl font-bold">₦{game.ticketPrice.toLocaleString()}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/80 text-sm mb-1">Min Jackpot</div>
                  <div className="text-2xl font-bold">{game.minJackpot}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handlePlayGame}
                  className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition text-lg"
                >
                  <Play className="w-5 h-5" />
                  {isAuthenticated ? 'Play Now!' : 'Sign In to Play'}
                </button>
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="flex items-center gap-2 border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    Register
                  </Link>
                )}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Game Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Numbers to Pick</div>
                    <div className="text-white/80">{game.maxNumbers} from {game.numberRange}</div>
                  </div>
                </div>
                
                {game.bonusNumbers && (
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">{game.bonusNumbers.name}</div>
                      <div className="text-white/80">{game.bonusNumbers.count} from {game.bonusNumbers.range}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Draw Days</div>
                    <div className="text-white/80">{game.drawDays.join(', ')}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Draw Time</div>
                    <div className="text-white/80">{game.drawTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Play {game.name}</h2>
          <div className="grid md:grid-cols-5 gap-8">
            {game.howToPlay.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`${game.colors.secondary} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`${game.colors.accent} font-bold text-xl`}>{index + 1}</span>
                </div>
                <p className="text-gray-600 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Prize Structure & Odds</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${game.colors.primary} text-white`}>
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Prize Tier</th>
                    <th className="px-6 py-4 text-left font-semibold">Match</th>
                    <th className="px-6 py-4 text-left font-semibold">Odds</th>
                    <th className="px-6 py-4 text-left font-semibold">Typical Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {game.prizes.map((prize, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{prize.tier}</td>
                      <td className="px-6 py-4 text-gray-700">{prize.match}</td>
                      <td className="px-6 py-4 text-gray-700">{prize.odds}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{prize.prize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Prize Information</h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Prize amounts shown are typical values and may vary based on ticket sales and number of winners. 
                  Jackpot amounts roll over when there are no winners. All prizes are subject to applicable taxes and regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Game Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {game.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className={`${game.colors.secondary} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Trophy className={`w-5 h-5 ${game.colors.accent}`} />
                  </div>
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics & Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Quick Stats */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <TrendingUp className={`w-5 h-5 ${game.colors.accent}`} />
                    <span className="font-medium text-gray-900">Draws per week</span>
                  </div>
                  <span className="font-bold text-gray-900">{game.drawDays.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <Users className={`w-5 h-5 ${game.colors.accent}`} />
                    <span className="font-medium text-gray-900">Numbers to choose</span>
                  </div>
                  <span className="font-bold text-gray-900">{game.maxNumbers}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <Gift className={`w-5 h-5 ${game.colors.accent}`} />
                    <span className="font-medium text-gray-900">Prize tiers</span>
                  </div>
                  <span className="font-bold text-gray-900">{game.prizes.length}</span>
                </div>
              </div>
            </div>

            {/* Playing Tips */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Playing Tips</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-start gap-3">
                    <Shield className={`w-6 h-6 ${game.colors.accent} flex-shrink-0 mt-1`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Play Responsibly</h4>
                      <p className="text-gray-600 text-sm">Set a budget and stick to it. Only play with money you can afford to lose.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-start gap-3">
                    <Target className={`w-6 h-6 ${game.colors.accent} flex-shrink-0 mt-1`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Number Selection</h4>
                      <p className="text-gray-600 text-sm">Both Lucky Dip and personal numbers have equal chances of winning.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-6 h-6 ${game.colors.accent} flex-shrink-0 mt-1`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Regular Play</h4>
                      <p className="text-gray-600 text-sm">Consider advance play options to never miss a draw.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${game.colors.primary} py-16`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Play {game.name}?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of players and try your luck today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handlePlayGame}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition text-lg"
            >
              <Play className="w-5 h-5" />
              {isAuthenticated ? `Play ${game.name} Now!` : 'Sign In to Play'}
            </button>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Games
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GameDetailPage;