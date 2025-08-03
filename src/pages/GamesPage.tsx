import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, PoundSterling, Play, ArrowRight, Star, Target, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { games } from '@/data/games';

const GamesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePlayGame = (gameId: string) => {
    if (!isAuthenticated) {
      // Redirect to sign-in page with return path
      navigate(`/sign-in?returnTo=/games/${gameId}/play`);
    } else {
      // Navigate to game play interface
      navigate(`/games/${gameId}/play`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Lottery Game</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            From life-changing jackpots to fixed prizes, find the perfect lottery game for you. 
            Play responsibly and good luck!
          </p>
          {!isAuthenticated && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto mb-8">
              <div className="flex items-center gap-3 text-white/90 mb-4">
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Sign in required to play</span>
              </div>
              <div className="flex gap-3 justify-center">
                <Link 
                  to="/sign-in"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/results"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Check Results
            </Link>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Available Lottery Games</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {games.map((game) => (
              <div key={game.id} className={`rounded-2xl overflow-hidden shadow-2xl ${game.colors.primary}`}>
                <div className="p-8 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{game.name}</h3>
                      <p className="text-white/90 text-lg">{game.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">£{game.ticketPrice}</div>
                      <div className="text-white/80 text-sm">per line</div>
                    </div>
                  </div>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Draw Days</span>
                      </div>
                      <div className="text-white/90">
                        {game.drawDays.join(', ')}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Draw Time</span>
                      </div>
                      <div className="text-white/90">{game.drawTime}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <PoundSterling className="w-4 h-4" />
                        <span className="text-sm font-medium">Min Jackpot</span>
                      </div>
                      <div className="text-white/90 font-bold">{game.minJackpot}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-medium">Numbers</span>
                      </div>
                      <div className="text-white/90">
                        {game.maxNumbers} from {game.numberRange}
                      </div>
                    </div>
                  </div>

                  {game.bonusNumbers && (
                    <div className="bg-white/10 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">{game.bonusNumbers.name}</span>
                      </div>
                      <div className="text-white/90">
                        {game.bonusNumbers.count} number{game.bonusNumbers.count > 1 ? 's' : ''} from {game.bonusNumbers.range}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => handlePlayGame(game.id)}
                      className="flex-1 bg-white text-gray-900 px-6 py-4 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      {isAuthenticated ? 'Play Now' : 'Sign In to Play'}
                    </button>
                    <Link
                      to={`/games/${game.id}`}
                      className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition flex items-center justify-center gap-2"
                    >
                      Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Play</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Game</h3>
              <p className="text-gray-600">Select from our range of lottery games, each with different jackpots and odds.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick Your Numbers</h3>
              <p className="text-gray-600">Choose your lucky numbers or let our Lucky Dip feature select them for you.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Check Results</h3>
              <p className="text-gray-600">Watch the draw live or check your dashboard to see if you've won!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GamesPage;