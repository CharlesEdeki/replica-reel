import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TicketPurchase = () => {
  const [selectedGame, setSelectedGame] = useState("lotto");
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  const [selectedLines, setSelectedLines] = useState(1);
  const [animatingNumbers, setAnimatingNumbers] = useState<Set<number>>(new Set());

  const games = {
    lotto: {
      name: "Lotto",
      numberRange: 59,
      maxNumbers: 6,
      price: 2.00,
      color: "bg-red-500",
      drawDays: ["Wednesday", "Saturday"]
    },
    euromillions: {
      name: "EuroMillions",
      numberRange: 50,
      maxNumbers: 5,
      price: 2.50,
      color: "bg-blue-500",
      drawDays: ["Tuesday", "Friday"]
    },
    setForLife: {
      name: "Set For Life",
      numberRange: 47,
      maxNumbers: 5,
      price: 1.50,
      color: "bg-teal-500",
      drawDays: ["Monday", "Thursday"]
    },
    thunderball: {
      name: "Thunderball",
      numberRange: 39,
      maxNumbers: 5,
      price: 1.00,
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

  const generateLuckyDip = () => {
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
  };

  const totalCost = selectedLines * currentGame.price;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Buy Tickets</h1>
          <p className="text-lg text-gray-600">Select your numbers and purchase your tickets</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Choose Your Game</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(games).map(([key, game]) => (
                <div
                  key={key}
                  onClick={() => setSelectedGame(key)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGame === key
                      ? `${game.color} text-white border-current`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-lg mb-2">{game.name}</h3>
                  <p className="text-sm opacity-90">£{game.price.toFixed(2)} per line</p>
                  <p className="text-xs opacity-75">Draws: {game.drawDays.join(', ')}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Select Your Numbers</Label>
                <div className="flex space-x-2">
                  <Button
                    onClick={generateLuckyDip}
                    variant="outline"
                    className="text-sm"
                  >
                    Lucky Dip
                  </Button>
                  <Button
                    onClick={clearSelection}
                    variant="outline"
                    className="text-sm"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 md:grid-cols-10 gap-2 mb-4">
                {Array.from({ length: currentGame.numberRange }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberSelect(number)}
                    disabled={!userNumbers.includes(number) && userNumbers.length >= currentGame.maxNumbers}
                    className={`aspect-square rounded-full text-sm font-bold transition-all duration-300 transform ${
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

              <div className="flex flex-wrap gap-2 mb-4">
                {userNumbers.map((number) => (
                  <Badge
                    key={number}
                    className={`${currentGame.color} text-white animate-fade-in`}
                  >
                    {number}
                  </Badge>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Selected {userNumbers.length} of {currentGame.maxNumbers} numbers
                </p>
                {userNumbers.length === currentGame.maxNumbers && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4 animate-slide-up">
                    <p className="text-green-800 font-semibold">✓ Numbers selected! Ready to purchase.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Number of Lines</Label>
                <Select value={selectedLines.toString()} onValueChange={(value) => setSelectedLines(parseInt(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="text-2xl font-bold text-blue-600">£{totalCost.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedLines} line{selectedLines > 1 ? 's' : ''} × £{currentGame.price.toFixed(2)} per line
                </p>
              </div>

              <Button
                disabled={userNumbers.length !== currentGame.maxNumbers}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg animate-fade-in"
              >
                Purchase Tickets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketPurchase;