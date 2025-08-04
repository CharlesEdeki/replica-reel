import React from 'react';
import { Calendar, Clock, PoundSterling, Play, ArrowRight, Star, Target, LogIn } from 'lucide-react';
import Header from "@/components/Header";
import Footer from '@/components/Footer';

// Mock useAuth hook for demonstration
const useAuth = () => ({
  isAuthenticated: false, // Change this to test different states
  user: null
});

const games = [
  {
    id: 'lotto',
    name: 'Lotto',
    tagline: 'The UK\'s favourite lottery',
    description: 'Play Lotto for your chance to win life-changing jackpots starting from £2 million. With draws twice a week, you have plenty of chances to become a millionaire.',
    ticketPrice: 2.00,
    minJackpot: '£2M+',
    maxNumbers: 6,
    numberRange: '1-59',
    drawDays: ['Wednesday', 'Saturday'],
    drawTime: '8:00 PM',
    colors: {
      primary: 'bg-red-600'
    },
    bonusNumbers: {
      name: 'Bonus Ball',
      count: 1,
      range: '1-59'
    }
  },
  {
    id: 'euromillions',
    name: 'EuroMillions',
    tagline: 'Europe\'s biggest lottery',
    description: 'EuroMillions offers some of the biggest jackpots in the world. Play across 9 European countries for prizes that can change your life forever.',
    ticketPrice: 2.50,
    minJackpot: '£14M+',
    maxNumbers: 5,
    numberRange: '1-50',
    drawDays: ['Tuesday', 'Friday'],
    drawTime: '8:00 PM',
    colors: {
      primary: 'bg-blue-600'
    },
    bonusNumbers: {
      name: 'Lucky Stars',
      count: 2,
      range: '1-12'
    }
  },
  {
    id: 'thunderball',
    name: 'Thunderball',
    tagline: 'Play for £500,000',
    description: 'Thunderball offers a top prize of £500,000 and better odds of winning. With four draws each week, you have more chances to win.',
    ticketPrice: 1.00,
    minJackpot: '£500K',
    maxNumbers: 5,
    numberRange: '1-39',
    drawDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    drawTime: '8:00 PM',
    colors: {
      primary: 'bg-purple-600'
    },
    bonusNumbers: {
      name: 'Thunderball',
      count: 1,
      range: '1-14'
    }
  },
  {
    id: 'set-for-life',
    name: 'Set For Life',
    tagline: 'Win £10,000 every month for 30 years',
    description: 'Set For Life offers a unique prize structure. Win the top prize and receive £10,000 every month for 30 years - that\'s £3.6 million in total!',
    ticketPrice: 1.50,
    minJackpot: '£10K/month',
    maxNumbers: 5,
    numberRange: '1-47',
    drawDays: ['Monday', 'Thursday'],
    drawTime: '8:00 PM',
    colors: {
      primary: 'bg-teal-600'
    },
    bonusNumbers: {
      name: 'Life Ball',
      count: 1,
      range: '1-10'
    }
  }
];

const GamesPage = () => {
  const { isAuthenticated } = useAuth();

  const handlePlayGame = (gameId: string) => {
    if (!isAuthenticated) {
      // In a real app, this would use useNavigate
      window.location.href = `/sign-in?returnTo=/games/${gameId}/play`;
    } else {
      // Navigate to game play interface
      window.location.href = `/games/${gameId}/play`;
    }
  };

  const handleViewDetails = (gameId: string) => {
    window.location.href = `/games/${gameId}`;
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
                <a 
                  href="/sign-in"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sign In
                </a>
                <a 
                  href="/register"
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Register
                </a>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/results"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Check Results
            </a>
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
                      <div className="text-2xl font-bold">£{game.ticketPrice.toFixed(2)}</div>
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
                    <button
                      onClick={() => handleViewDetails(game.id)}
                      className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition flex items-center justify-center gap-2"
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

      {/* Game Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compare Games</h2>
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
                    <tr key={game.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${game.colors.primary}`}></div>
                          <div>
                            <div className="font-semibold text-gray-900">{game.name}</div>
                            <div className="text-sm text-gray-600">{game.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">£{game.ticketPrice.toFixed(2)}</td>
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
                        <button
                          onClick={() => handleViewDetails(game.id)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16">
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

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Playing?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of players and support good causes across the UK.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={isAuthenticated ? "/games/lotto/play" : "/sign-in?returnTo=/games/lotto/play"}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              <Play className="w-5 h-5" />
              {isAuthenticated ? 'Play Now' : 'Sign In to Play'}
            </a>
            <a
              href="/register"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GamesPage;