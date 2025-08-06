/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ConfettiAnimation from "./ConfettiAnimation";

const NumberChecker = () => {
  const [selectedGame, setSelectedGame] = useState("lotto");
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  const [checkResult, setCheckResult] = useState<any>(null);
  const [animatingNumbers, setAnimatingNumbers] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const games = {
    lotto: {
      name: "Lotto",
      numberRange: 59,
      maxNumbers: 6,
      color: "bg-red-500",
      drawDays: ["Wednesday", "Saturday"]
    },
    euromillions: {
      name: "AfroMillions",
      numberRange: 50,
      maxNumbers: 5,
      color: "bg-blue-500",
      drawDays: ["Tuesday", "Friday"]
    },
    setForLife: {
      name: "Set For Life",
      numberRange: 47,
      maxNumbers: 5,
      color: "bg-teal-500",
      drawDays: ["Monday", "Thursday"]
    },
    thunderball: {
      name: "Thunderball",
      numberRange: 39,
      maxNumbers: 5,
      color: "bg-purple-500",
      drawDays: ["Tuesday", "Wednesday", "Friday", "Saturday"]
    }
  };

  const currentGame = games[selectedGame as keyof typeof games];

  const handleNumberSelect = (number: number) => {
    setAnimatingNumbers(prev => new Set([...prev, number]));
    setTimeout(() => {
      setAnimatingNumbers(prev => {
        const newSet = new Set(prev);
        newSet.delete(number);
        return newSet;
      });
    }, 300);

    if (userNumbers.includes(number)) {
      setUserNumbers(userNumbers.filter(n => n !== number));
    } else if (userNumbers.length < currentGame.maxNumbers) {
      setUserNumbers([...userNumbers, number]);
    }
  };

  const generateNumbers = () => {
    const allNumbers = Array.from({ length: currentGame.numberRange }, (_, i) => i + 1);
    setAnimatingNumbers(new Set(allNumbers));
    setTimeout(() => {
      setAnimatingNumbers(new Set());
    }, 600);

    const shuffled = [...allNumbers].sort(() => Math.random() - 0.5);
    setUserNumbers(shuffled.slice(0, currentGame.maxNumbers));
  };

  const clearSelection = () => {
    setUserNumbers([]);
    setCheckResult(null);
  };

  const checkNumbers = () => {
    // Simulate checking against winning numbers
    const winningNumbers = [7, 14, 23, 31, 42, 55]; // Example winning numbers
    const matchedNumbers = userNumbers.filter(num => winningNumbers.includes(num));
    
    let prize = "No Prize";
    let tier = "";
    let winning = false;

    if (matchedNumbers.length === 6) {
      prize = "Jackpot!";
      tier = "Match 6";
      winning = true;
    } else if (matchedNumbers.length === 5) {
      prize = "₦1,750";
      tier = "Match 5";
      winning = true;
    } else if (matchedNumbers.length === 4) {
      prize = "₦140";
      tier = "Match 4";
      winning = true;
    } else if (matchedNumbers.length === 3) {
      prize = "₦30";
      tier = "Match 3";
      winning = true;
    } else if (matchedNumbers.length === 2) {
      prize = "₦3";
      tier = "Match 2";
      winning = true;
    }

    const result = { prize, tier, winning, matchedNumbers };
    setCheckResult(result);
    
    if (prize !== "No Prize") {
      setShowConfetti(true);
    }
  };

  return (
    <>
      <ConfettiAnimation
        isActive={showConfetti}
        onComplete={() => setShowConfetti(false)}
        duration={4000}
        particleCount={100}
      />
      
      <div className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Check Your Numbers</h1>
            <p className="text-base md:text-lg text-gray-600">Enter your numbers to see if you've won</p>
          </div>

          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-center">Select Game & Numbers</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                {Object.entries(games).map(([key, game]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedGame(key)}
                    className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedGame === key
                        ? `${game.color} text-white border-current`
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">{game.name}</h3>
                    <p className="text-xs md:text-sm opacity-90">Select {game.maxNumbers} numbers</p>
                    <p className="text-xs opacity-75">Draws: {game.drawDays.join(', ')}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                  <Label className="text-base md:text-lg font-semibold">Enter Your Numbers</Label>
                  <div className="flex space-x-2">
                    <Button
                      onClick={generateNumbers}
                      variant="outline"
                      className="text-xs md:text-sm"
                    >
                      Generate Random
                    </Button>
                    <Button
                      onClick={clearSelection}
                      variant="outline"
                      className="text-xs md:text-sm"
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 md:grid-cols-10 gap-1 md:gap-2 mb-4">
                  {Array.from({ length: currentGame.numberRange }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => handleNumberSelect(number)}
                      disabled={!userNumbers.includes(number) && userNumbers.length >= currentGame.maxNumbers}
                      className={`aspect-square rounded-full text-xs md:text-sm font-bold transition-all duration-300 transform ${
                        userNumbers.includes(number)
                          ? `${currentGame.color} text-white scale-110 shadow-lg animate-pulse-glow`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                      } ${
                        animatingNumbers.has(number) ? 'animate-bounce scale-125' : ''
                      } hover:scale-105`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                  {userNumbers.map((number) => (
                    <Badge
                      key={number}
                      className={`${currentGame.color} text-white animate-fade-in text-xs md:text-sm`}
                    >
                      {number}
                    </Badge>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    Selected {userNumbers.length} of {currentGame.maxNumbers} numbers
                  </p>
                  {userNumbers.length === currentGame.maxNumbers && (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4 animate-slide-up">
                      <p className="text-green-800 font-semibold text-sm md:text-base">✓ Numbers ready to check!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <Button
                  disabled={userNumbers.length !== currentGame.maxNumbers}
                  onClick={checkNumbers}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 text-base md:text-lg animate-fade-in"
                >
                  Check My Numbers
                </Button>
              </div>

              {checkResult && (
                <div className="mt-6 md:mt-8 p-4 md:p-6 border rounded-lg animate-fade-in">
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                      {checkResult.winning ? "🎉 Congratulations! 🎉" : "Better luck next time!"}
                    </h3>
                    
                    <div className={`text-3xl md:text-4xl font-bold mb-4 ${
                      checkResult.winning ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {checkResult.prize}
                    </div>
                    
                    {checkResult.tier && (
                      <p className="text-base md:text-lg text-gray-600 mb-4">
                        {checkResult.tier}
                      </p>
                    )}
                    
                    <div className="bg-gray-100 rounded-lg p-3 md:p-4 mb-4">
                      <p className="text-xs md:text-sm text-gray-600 mb-2">Your numbers:</p>
                      <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                        {userNumbers.map((number) => (
                          <Badge
                            key={number}
                            className={`${
                              checkResult.matchedNumbers.includes(number)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-300 text-gray-700'
                            } text-xs md:text-sm`}
                          >
                            {number}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-500">
                      This is a simulation. Real results may vary.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NumberChecker;