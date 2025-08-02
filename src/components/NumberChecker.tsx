/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Star, Calendar } from "lucide-react";

interface WinningNumbers {
  date: string;
  numbers: number[];
  bonus?: number;
  stars?: number[];
  thunderball?: number;
}

const NumberChecker = () => {
  const [selectedGame, setSelectedGame] = useState("lotto");
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  const [userBonus, setUserBonus] = useState<number | null>(null);
  const [userStars, setUserStars] = useState<number[]>([]);
  const [userThunderball, setUserThunderball] = useState<number | null>(null);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");

  // Mock winning numbers data
  const winningNumbers: { [key: string]: WinningNumbers[] } = {
    lotto: [
      {
        date: "2025-08-02",
        numbers: [7, 14, 21, 28, 35, 42],
        bonus: 49
      },
      {
        date: "2025-07-30", 
        numbers: [3, 11, 18, 25, 33, 44],
        bonus: 17
      }
    ],
    euromillions: [
      {
        date: "2025-08-01",
        numbers: [9, 16, 23, 31, 47],
        stars: [2, 8]
      }
    ],
    thunderball: [
      {
        date: "2025-08-02",
        numbers: [5, 12, 19, 26, 34],
        thunderball: 7
      }
    ]
  };

  const games = [
    { id: "lotto", name: "Lotto", maxNumbers: 6, numberRange: 59, hasBonus: true },
    { id: "euromillions", name: "EuroMillions", maxNumbers: 5, numberRange: 50, hasStars: true, starRange: 12 },
    { id: "thunderball", name: "Thunderball", maxNumbers: 5, numberRange: 39, hasThunderball: true, thunderballRange: 14 }
  ];

  const currentGame = games.find(g => g.id === selectedGame)!;

  const handleNumberSelect = (number: number) => {
    if (userNumbers.includes(number)) {
      setUserNumbers(userNumbers.filter(n => n !== number));
    } else if (userNumbers.length < currentGame.maxNumbers) {
      setUserNumbers([...userNumbers, number].sort((a, b) => a - b));
    }
  };

  const handleSpecialNumberSelect = (number: number, type: 'bonus' | 'star' | 'thunderball') => {
    if (type === 'bonus') {
      setUserBonus(userBonus === number ? null : number);
    } else if (type === 'star') {
      if (userStars.includes(number)) {
        setUserStars(userStars.filter(n => n !== number));
      } else if (userStars.length < 2) {
        setUserStars([...userStars, number].sort((a, b) => a - b));
      }
    } else if (type === 'thunderball') {
      setUserThunderball(userThunderball === number ? null : number);
    }
  };

  const checkNumbers = () => {
    if (!selectedDate) {
      alert("Please select a draw date");
      return;
    }

    const winning = winningNumbers[selectedGame]?.find(w => w.date === selectedDate);
    if (!winning) {
      alert("No results found for this date");
      return;
    }

    const matches = userNumbers.filter(num => winning.numbers.includes(num)).length;
    let bonusMatch = false;
    let starMatches = 0;
    let thunderballMatch = false;

    if (currentGame.hasBonus && userBonus && winning.bonus) {
      bonusMatch = userBonus === winning.bonus;
    }

    if (currentGame.hasStars && winning.stars) {
      starMatches = userStars.filter(star => winning.stars!.includes(star)).length;
    }

    if (currentGame.hasThunderball && userThunderball && winning.thunderball) {
      thunderballMatch = userThunderball === winning.thunderball;
    }

    let prize = "No Prize";
    let tier = "";

    // Simplified prize logic for demo
    if (selectedGame === "lotto") {
      if (matches === 6) { prize = "JACKPOT!"; tier = "Match 6"; }
      else if (matches === 5 && bonusMatch) { prize = "£1,000,000"; tier = "Match 5 + Bonus"; }
      else if (matches === 5) { prize = "£1,750"; tier = "Match 5"; }
      else if (matches === 4) { prize = "£140"; tier = "Match 4"; }
      else if (matches === 3) { prize = "£30"; tier = "Match 3"; }
    } else if (selectedGame === "euromillions") {
      if (matches === 5 && starMatches === 2) { prize = "JACKPOT!"; tier = "Match 5 + 2 Stars"; }
      else if (matches === 5 && starMatches === 1) { prize = "£250,000"; tier = "Match 5 + 1 Star"; }
      else if (matches === 4 && starMatches === 2) { prize = "£2,500"; tier = "Match 4 + 2 Stars"; }
      else if (matches === 2 && starMatches === 2) { prize = "£8.10"; tier = "Match 2 + 2 Stars"; }
    } else if (selectedGame === "thunderball") {
      if (matches === 5 && thunderballMatch) { prize = "£500,000"; tier = "Match 5 + Thunderball"; }
      else if (matches === 5) { prize = "£5,000"; tier = "Match 5"; }
      else if (matches === 4 && thunderballMatch) { prize = "£250"; tier = "Match 4 + Thunderball"; }
      else if (matches === 1 && thunderballMatch) { prize = "£5"; tier = "Match 1 + Thunderball"; }
    }

    setCheckResult({
      matches,
      bonusMatch,
      starMatches,
      thunderballMatch,
      prize,
      tier,
      winning
    });
  };

  const clearAll = () => {
    setUserNumbers([]);
    setUserBonus(null);
    setUserStars([]);
    setUserThunderball(null);
    setCheckResult(null);
  };

  const generateNumbers = () => {
    const numbers = [];
    while (numbers.length < currentGame.maxNumbers) {
      const num = Math.floor(Math.random() * currentGame.numberRange) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setUserNumbers(numbers.sort((a, b) => a - b));

    if (currentGame.hasBonus) {
      let bonus;
      do {
        bonus = Math.floor(Math.random() * currentGame.numberRange) + 1;
      } while (numbers.includes(bonus));
      setUserBonus(bonus);
    }

    if (currentGame.hasStars) {
      const stars = [];
      while (stars.length < 2) {
        const star = Math.floor(Math.random() * currentGame.starRange!) + 1;
        if (!stars.includes(star)) {
          stars.push(star);
        }
      }
      setUserStars(stars.sort((a, b) => a - b));
    }

    if (currentGame.hasThunderball) {
      setUserThunderball(Math.floor(Math.random() * currentGame.thunderballRange!) + 1);
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center text-2xl">
              <Search className="h-6 w-6 mr-2" />
              Check My Numbers
            </CardTitle>
            <p className="text-blue-100">
              See if your numbers have won in recent draws
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {/* Game Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Game
              </label>
              <div className="flex flex-wrap gap-2">
                {games.map((game) => (
                  <Button
                    key={game.id}
                    variant={selectedGame === game.id ? "default" : "outline"}
                    onClick={() => {
                      setSelectedGame(game.id);
                      clearAll();
                    }}
                    className="transition-all duration-200"
                  >
                    {game.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Select Draw Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a date...</option>
                {winningNumbers[selectedGame]?.map((draw) => (
                  <option key={draw.date} value={draw.date}>
                    {new Date(draw.date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Number Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Your Numbers ({userNumbers.length}/{currentGame.maxNumbers})
                </label>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={generateNumbers}>
                    Lucky Dip
                  </Button>
                  <Button size="sm" variant="outline" onClick={clearAll}>
                    Clear All
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-10 gap-2 mb-4">
                {Array.from({ length: currentGame.numberRange }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberSelect(number)}
                    disabled={!userNumbers.includes(number) && userNumbers.length >= currentGame.maxNumbers}
                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                      userNumbers.includes(number)
                        ? 'bg-blue-600 text-white scale-110 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              {/* Selected Numbers Display */}
              {userNumbers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm font-medium text-gray-700">Selected:</span>
                  {userNumbers.map((number) => (
                    <Badge key={number} variant="default" className="text-lg px-3 py-1">
                      {number}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Special Numbers */}
            {(currentGame.hasBonus || currentGame.hasStars || currentGame.hasThunderball) && (
              <div className="mb-6 border-t pt-6">
                {currentGame.hasBonus && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bonus Ball
                    </label>
                    <div className="grid grid-cols-10 gap-2">
                      {Array.from({ length: currentGame.numberRange }, (_, i) => i + 1)
                        .filter(num => !userNumbers.includes(num))
                        .map((number) => (
                        <button
                          key={number}
                          onClick={() => handleSpecialNumberSelect(number, 'bonus')}
                          className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                            userBonus === number
                              ? 'bg-yellow-500 text-white scale-110 shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame.hasStars && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Star className="inline h-4 w-4 mr-1" />
                      Lucky Stars ({userStars.length}/2)
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: currentGame.starRange! }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => handleSpecialNumberSelect(number, 'star')}
                          disabled={!userStars.includes(number) && userStars.length >= 2}
                          className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                            userStars.includes(number)
                              ? 'bg-pink-500 text-white scale-110 shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame.hasThunderball && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Thunderball
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: currentGame.thunderballRange! }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => handleSpecialNumberSelect(number, 'thunderball')}
                          className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                            userThunderball === number
                              ? 'bg-purple-600 text-white scale-110 shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Check Button */}
            <div className="text-center mb-6">
              <Button
                onClick={checkNumbers}
                disabled={userNumbers.length < currentGame.maxNumbers}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 text-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Check My Numbers
              </Button>
            </div>

            {/* Results */}
            {checkResult && (
              <Card className="mt-6 border-2 border-gray-200">
                <CardHeader className={`${checkResult.prize !== "No Prize" ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <CardTitle className="flex items-center">
                    {checkResult.prize !== "No Prize" ? (
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 mr-2" />
                    )}
                    Result: {checkResult.prize}
                  </CardTitle>
                  {checkResult.tier && (
                    <p className="text-sm text-gray-600">{checkResult.tier}</p>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Your Numbers</h4>
                      <div className="flex flex-wrap gap-2">
                        {userNumbers.map((number) => (
                          <Badge 
                            key={number} 
                            variant={checkResult.winning.numbers.includes(number) ? "default" : "secondary"}
                            className={checkResult.winning.numbers.includes(number) ? "bg-green-500" : ""}
                          >
                            {number}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Winning Numbers</h4>
                      <div className="flex flex-wrap gap-2">
                        {checkResult.winning.numbers.map((number: number) => (
                          <Badge key={number} variant="default" className="bg-blue-600">
                            {number}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Matches: {checkResult.matches} main numbers</p>
                    {checkResult.bonusMatch && <p>✅ Bonus ball matched!</p>}
                    {checkResult.starMatches > 0 && <p>⭐ {checkResult.starMatches} star(s) matched!</p>}
                    {checkResult.thunderballMatch && <p>⚡ Thunderball matched!</p>}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NumberChecker;