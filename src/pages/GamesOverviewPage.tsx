import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Play, ArrowRight, Star, Target, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { games } from '@/data/games'; // Import centralized games data
import Header from "@/components/Header";
import Footer from '@/components/Footer';

const GameOverviewPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePlayGame = (gameId: string) => {
    if (!isAuthenticated) {
      // Store the intended destination and redirect to sign-in
      sessionStorage.setItem('returnTo', `/games/${gameId}/play`);
      navigate('/sign-in');
    } else {
      // Navigate directly to game play interface
      navigate(`/games/${gameId}/play`);
    }
  };

  const handleViewDetails = (gameId: string) => {
    // Navigate to the detailed game page
    navigate(`/games/${gameId}`);
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleCheckResults = () => {
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Game Make You Win Big! 🎲</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            From life-changing jackpots to sweet prizes, find the perfect lottery game wey fit make you rich! 
            Play responsibly and good luck! Make money dey enter your pocket! 💰
          </p>
          {!isAuthenticated && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto mb-8">
              <div className="flex items-center gap-3 text-white/90 mb-4">
                <LogIn className="w-5 h-5" />
                <span className="font-medium">You need sign in first before you fit play o!</span>
              </div>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={handleSignIn}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleRegister}
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Register
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleCheckResults}
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Check Results See If You Win! 👀
            </button>
          </div>
        </div>
      </section>

      {/* Games Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compare Games See Which One Sweet Pass! 📊</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Game</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Jackpot</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Numbers</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Draws/Week</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, index) => (
                    <tr 
                      key={game.id} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors group`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${game.colors.primary}`}></div>
                          <div>
                            <div className="font-semibold text-gray-900">{game.name}</div>
                            <div className="text-sm text-gray-600">{game.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">₦{game.ticketPrice.toLocaleString()}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{game.minJackpot}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {game.maxNumbers} from {game.numberRange}
                        {game.bonusNumbers && (
                          <div className="text-sm text-gray-500">
                            + {game.bonusNumbers.count} {game.bonusNumbers.name}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{game.drawDays.length}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3 opacity-100 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handlePlayGame(game.id)}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                            title={`Play ${game.name}`}
                          >
                            <Play className="w-3 h-3" />
                            Play 🎮
                          </button>
                          <button
                            onClick={() => handleViewDetails(game.id)}
                            className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold text-sm bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-md transition-colors"
                            title={`View ${game.name} details`}
                          >
                            <ArrowRight className="w-3 h-3" />
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick tip about viewing details */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-blue-800 font-medium">Want to know more about a game?</p>
                <p className="text-blue-700 text-sm">Click "Details" to see prize structures, odds, and complete game information!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Available Lottery Games Wey Go Make You Rich! 💸</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {games.map((game) => (
              <div 
                key={game.id} 
                className={`rounded-2xl overflow-hidden shadow-2xl ${game.colors.primary} cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group`}
              >
                <div className="p-8 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{game.name}</h3>
                      <p className="text-white/90 text-lg">{game.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">₦{game.ticketPrice.toLocaleString()}</div>
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
                      {isAuthenticated ? 'Play Now Make Money! 🚀' : 'Sign In to Play'}
                    </button>
                    <button
                      onClick={() => handleViewDetails(game.id)}
                      className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition flex items-center justify-center gap-2 group-hover:animate-pulse"
                      title={`View complete details for ${game.name}`}
                    >
                      Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Play and Win Big Money! 💰</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Game</h3>
              <p className="text-gray-600">Pick from our sweet lottery games, each one get different jackpots and chances to win big!</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick Your Lucky Numbers</h3>
              <p className="text-gray-600">Choose your lucky numbers or let our Lucky Dip feature select them for you. Na your choice!</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Check Results</h3>
              <p className="text-gray-600">Watch the draw live or check your dashboard to see if you don win big money! E go sweet you!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Playing and Win Big? 🚀</h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of players and support good causes across Nigeria. Make your money work for you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handlePlayGame('lotto')}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              <Play className="w-5 h-5" />
              {isAuthenticated ? 'Play Naija Lotto Now! 🎲' : 'Sign In to Play'}
            </button>
            <button
              onClick={handleRegister}
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Create Account Make You Win! 💸
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GameOverviewPage;