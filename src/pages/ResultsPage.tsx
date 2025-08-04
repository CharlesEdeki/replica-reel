/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Calendar, Trophy, CheckCircle, XCircle, Target, Clock } from "lucide-react";
import Header from "@/components/Header";

interface DrawResult {
  id: string;
  gameId: string;
  gameName: string;
  drawDate: string;
  numbers: {
    main: number[];
    bonus?: number[];
  };
  jackpot: string;
  winners?: {
    tier: string;
    matches: number;
    winners: number;
    prize: string;
  }[];
}

const ResultsPage = () => {
  const [results, setResults] = useState<DrawResult[]>([]);
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('all');

  // Sample draw results - in a real app, this would come from an API
  const sampleResults: DrawResult[] = [
    {
      id: "lotto-2024-08-04",
      gameId: "lotto",
      gameName: "Lotto",
      drawDate: "2024-08-04T20:00:00Z",
      numbers: {
        main: [12, 18, 23, 34, 42, 47],
        bonus: [7]
      },
      jackpot: "£5.2M",
      winners: [
        { tier: "Match 6", matches: 6, winners: 0, prize: "Rollover" },
        { tier: "Match 5 + Bonus", matches: 5, winners: 3, prize: "£1,750" },
        { tier: "Match 5", matches: 5, winners: 156, prize: "£140" },
        { tier: "Match 4", matches: 4, winners: 8234, prize: "£30" },
        { tier: "Match 3", matches: 3, winners: 156789, prize: "£3" }
      ]
    },
    {
      id: "euromillions-2024-08-03",
      gameId: "euromillions",
      gameName: "EuroMillions",
      drawDate: "2024-08-03T20:00:00Z",
      numbers: {
        main: [3, 14, 28, 33, 44],
        bonus: [2, 11]
      },
      jackpot: "£14M",
      winners: [
        { tier: "Match 5 + 2 Stars", matches: 7, winners: 0, prize: "Rollover" },
        { tier: "Match 5 + 1 Star", matches: 6, winners: 2, prize: "£234,567" },
        { tier: "Match 5", matches: 5, winners: 4, prize: "£13,456" }
      ]
    },
    {
      id: "thunderball-2024-08-04",
      gameId: "thunderball",
      gameName: "Thunderball",
      drawDate: "2024-08-04T20:00:00Z",
      numbers: {
        main: [6, 13, 21, 29, 34],
        bonus: [8]
      },
      jackpot: "£500K",
      winners: [
        { tier: "Match 5 + Thunderball", matches: 6, winners: 1, prize: "£500,000" },
        { tier: "Match 5", matches: 5, winners: 12, prize: "£5,000" },
        { tier: "Match 4 + Thunderball", matches: 5, winners: 89, prize: "£250" }
      ]
    }
  ];

  useEffect(() => {
    // Load results
    setResults(sampleResults);
    
    // Load user tickets from localStorage
    try {
      const savedTickets = localStorage.getItem('lotteryTickets');
      if (savedTickets) {
        const tickets = JSON.parse(savedTickets);
        setUserTickets(tickets);
      }
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkTicketAgainstResult = (ticket: any, result: DrawResult) => {
    if (ticket.gameId !== result.gameId) return null;

    const mainMatches = ticket.numbers.main.filter((num: number) => 
      result.numbers.main.includes(num)
    ).length;

    const bonusMatches = ticket.numbers.bonus ? 
      ticket.numbers.bonus.filter((num: number) => 
        result.numbers.bonus?.includes(num)
      ).length : 0;

    const totalMatches = mainMatches + bonusMatches;

    // Determine prize based on matches
    let prize = "No Prize";
    let tier = "";
    
    if (result.gameId === 'lotto') {
      if (mainMatches === 6) {
        prize = result.jackpot;
        tier = "Jackpot!";
      } else if (mainMatches === 5 && bonusMatches === 1) {
        prize = "£1,750";
        tier = "Match 5 + Bonus";
      } else if (mainMatches === 5) {
        prize = "£140";
        tier = "Match 5";
      } else if (mainMatches === 4) {
        prize = "£30";
        tier = "Match 4";
      } else if (mainMatches === 3) {
        prize = "£3";
        tier = "Match 3";
      }
    } else if (result.gameId === 'euromillions') {
      if (mainMatches === 5 && bonusMatches === 2) {
        prize = result.jackpot;
        tier = "Jackpot!";
      } else if (mainMatches === 5 && bonusMatches === 1) {
        prize = "£234,567";
        tier = "Match 5 + 1 Star";
      } else if (mainMatches === 5) {
        prize = "£13,456";
        tier = "Match 5";
      }
    }

    return {
      mainMatches,
      bonusMatches,
      totalMatches,
      prize,
      tier,
      isWinner: prize !== "No Prize"
    };
  };

  const getGameColor = (gameId: string) => {
    const colors: { [key: string]: string } = {
      'lotto': 'bg-red-500',
      'euromillions': 'bg-blue-500',
      'thunderball': 'bg-purple-500',
      'set-for-life': 'bg-teal-500'
    };
    return colors[gameId] || 'bg-gray-500';
  };

  const filteredResults = selectedGame === 'all' ? results : results.filter(r => r.gameId === selectedGame);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> 
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Results</h1>
          <p className="text-lg text-gray-600">Check the latest lottery draw results and see if you've won!</p>
        </div>

        {/* Game Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedGame('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedGame === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Games
            </button>
            {results.map(result => (
              <button
                key={result.gameId}
                onClick={() => setSelectedGame(result.gameId)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedGame === result.gameId 
                    ? `${getGameColor(result.gameId)} text-white` 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {result.gameName}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-8">
          {filteredResults.map((result) => {
            const userTicketsForGame = userTickets.filter(ticket => ticket.gameId === result.gameId);
            
            return (
              <div key={result.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${getGameColor(result.gameId)} text-white p-6`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{result.gameName}</h2>
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          <span>{formatDate(result.drawDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span>{formatTime(result.drawDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Jackpot</div>
                      <div className="text-3xl font-bold">{result.jackpot}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Winning Numbers */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Winning Numbers</h3>
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Main Numbers</div>
                        <div className="flex gap-2">
                          {result.numbers.main.map(num => (
                            <span 
                              key={num} 
                              className={`w-12 h-12 rounded-full ${getGameColor(result.gameId)} text-white font-bold flex items-center justify-center text-lg`}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                      {result.numbers.bonus && result.numbers.bonus.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-600 mb-2">
                            {result.gameId === 'lotto' ? 'Bonus Ball' : 
                             result.gameId === 'euromillions' ? 'Lucky Stars' : 
                             'Special Numbers'}
                          </div>
                          <div className="flex gap-2">
                            {result.numbers.bonus.map(num => (
                              <span 
                                key={num} 
                                className="w-12 h-12 rounded-full bg-yellow-500 text-white font-bold flex items-center justify-center text-lg"
                              >
                                {num}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prize Breakdown */}
                  {result.winners && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-4">Prize Breakdown</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Prize Tier</th>
                              <th className="text-center py-2">Winners</th>
                              <th className="text-right py-2">Prize</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.winners.map((winner, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="py-2">{winner.tier}</td>
                                <td className="text-center py-2">{winner.winners.toLocaleString()}</td>
                                <td className="text-right py-2 font-semibold">{winner.prize}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* User Tickets Check */}
                  {userTicketsForGame.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Your Tickets for this Draw
                      </h3>
                      <div className="space-y-4">
                        {userTicketsForGame.map((ticket) => {
                          const checkResult = checkTicketAgainstResult(ticket, result);
                          
                          return (
                            <div key={ticket.id} className="bg-white rounded-lg p-4 border">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <div className="text-sm text-gray-600">Ticket #{ticket.id.slice(-6)}</div>
                                  <div className="text-xs text-gray-500">
                                    Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                                  </div>
                                </div>
                                {checkResult && (
                                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                                    checkResult.isWinner 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {checkResult.isWinner ? (
                                      <>
                                        <CheckCircle className="w-4 h-4" />
                                        WINNER!
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="w-4 h-4" />
                                        No Win
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-4 mb-3">
                                <div>
                                  <div className="text-xs text-gray-600 mb-1">Your Numbers</div>
                                  <div className="flex gap-1">
                                    {ticket.numbers.main.map((num: number) => {
                                      const isMatch = result.numbers.main.includes(num);
                                      return (
                                        <span 
                                          key={num} 
                                          className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${
                                            isMatch 
                                              ? `${getGameColor(result.gameId)} text-white ring-2 ring-yellow-400` 
                                              : 'bg-gray-200 text-gray-600'
                                          }`}
                                        >
                                          {num}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                                {ticket.numbers.bonus && ticket.numbers.bonus.length > 0 && (
                                  <div>
                                    <div className="text-xs text-gray-600 mb-1">Bonus</div>
                                    <div className="flex gap-1">
                                      {ticket.numbers.bonus.map((num: number) => {
                                        const isMatch = result.numbers.bonus?.includes(num);
                                        return (
                                          <span 
                                            key={num} 
                                            className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${
                                              isMatch 
                                                ? 'bg-yellow-500 text-white ring-2 ring-yellow-400' 
                                                : 'bg-gray-200 text-gray-600'
                                            }`}
                                          >
                                            {num}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {checkResult && (
                                <div className="flex justify-between items-center pt-3 border-t">
                                  <div className="text-sm">
                                    <span className="text-gray-600">Matches: </span>
                                    <span className="font-semibold">
                                      {checkResult.mainMatches} main
                                      {checkResult.bonusMatches > 0 && ` + ${checkResult.bonusMatches} bonus`}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    {checkResult.tier && (
                                      <div className="text-sm font-semibold text-gray-700">{checkResult.tier}</div>
                                    )}
                                    <div className={`text-lg font-bold ${
                                      checkResult.isWinner ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                      {checkResult.prize}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Results for the selected game will appear here when available.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-blue-100 mb-6">
              Don't miss out on the next draw! Pick your numbers and play today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/games"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Play Now
              </a>
              <a
                href="/dashboard"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                My Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;