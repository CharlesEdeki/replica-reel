import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Play, ArrowRight, Star, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { games } from '@/data/games';

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Game</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            From life-changing jackpots to fixed prizes, find the perfect lottery game for you. 
            Every ticket supports good causes across the UK.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
              Play All Games
            </button>
            <Link 
              to="/check-numbers"
              className="border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Check Results
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Game */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Game</h2>
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 text-white">
                <h3 className="text-4xl font-bold mb-4">Lotto</h3>
                <p className="text-xl text-red-100 mb-6">The UK's favourite lottery game</p>
                <p className="text-red-100 mb-8 leading-relaxed">
                  Play Lotto for your chance to win life-changing jackpots starting from £2 million. 
                  With draws twice a week, you have plenty of chances to become a millionaire.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-red-200 text-sm">Next Jackpot</div>
                    <div className="text-3xl font-bold">£2M+</div>
                  </div>
                  <div>
                    <div className="text-red-200 text-sm">Ticket Price</div>
                    <div className="text-3xl font-bold">£2</div>
                  </div>
                </div>
                <Link
                  to="/games/lotto"
                  className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  <Play className="w-5 h-5" />
                  Play Lotto Now
                </Link>
              </div>
              <div className="p-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h4 className="text-white text-xl font-bold mb-4">Quick Facts</h4>
                  <div className="space-y-4 text-white/90">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5" />
                      <span>Pick 6 numbers from 1-59</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <span>Wednesday & Saturday draws</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span>8:00 PM draw time</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5" />
                      <span>Bonus Ball for extra prizes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Games Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">All Lottery Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((game) => (
              <div key={game.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${game.colors.primary} p-6 text-white text-center`}>
                  <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                  <p className="text-white/90">{game.tagline}</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Jackpot</span>
                      <span className="font-bold text-gray-900">{game.minJackpot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ticket Price</span>
                      <span className="font-bold text-gray-900">£{game.ticketPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Draw Days</span>
                      <span className="font-semibold text-gray-700">{game.drawDays.length}x/week</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to={`/games/${game.id}`}
                      className={`w-full flex items-center justify-center gap-2 ${game.colors.primary} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition`}
                    >
                      <Play className="w-4 h-4" />
                      Play Now
                    </Link>
                    <Link
                      to={`/games/${game.id}`}
                      className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
                      <td className="px-6 py-4 font-semibold text-gray-900">£{game.ticketPrice}</td>
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
                        <Link
                          to={`/games/${game.id}`}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tips for Playing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Numbers</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick your own lucky numbers or use Lucky Dip for randomly selected numbers. 
                Both methods have equal chances of winning.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Play Regularly</h3>
              <p className="text-gray-600 leading-relaxed">
                Set up a regular play pattern with advance play options. 
                Never miss a draw with automatic entries.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Play Responsibly</h3>
              <p className="text-gray-600 leading-relaxed">
                Set a budget and stick to it. Remember, lottery games should be fun entertainment, 
                not a way to make money.
              </p>
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
            <Link
              to="/buy-tickets"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              <Play className="w-5 h-5" />
              Buy Tickets Now
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GamesPage;