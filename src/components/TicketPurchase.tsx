import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const TicketPurchase = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState("lotto");
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  const [bonusNumbers, setBonusNumbers] = useState<number[]>([]);
  const [selectedLines, setSelectedLines] = useState(1);
  const [stakeAmount, setStakeAmount] = useState(50); // Minimum stake of ₦50
  const [animatingNumbers, setAnimatingNumbers] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const games = {
    lotto: {
      name: "Lotto",
      numberRange: 59,
      maxNumbers: 6,
      basePrice: 50, // Base price in Naira
      color: "bg-red-500",
      drawDays: ["Wednesday", "Saturday"],
      hasBonus: true,
      bonusName: "Bonus Ball",
      bonusRange: 12,
      maxBonus: 1
    },
    afromillions: {
      name: "AfroMillions", 
      numberRange: 50,
      maxNumbers: 5,
      basePrice: 50,
      color: "bg-blue-500",
      drawDays: ["Tuesday", "Friday"],
      hasBonus: true,
      bonusName: "Lucky Stars",
      bonusRange: 12,
      maxBonus: 2
    },
    thunderball: {
      name: "Thunderball",
      numberRange: 39,
      maxNumbers: 5,
      basePrice: 50,
      color: "bg-purple-500", 
      drawDays: ["Tuesday", "Wednesday", "Friday", "Saturday"],
      hasBonus: true,
      bonusName: "Thunderball",
      bonusRange: 14,
      maxBonus: 1
    },
    "set-for-life": {
      name: "Set For Life",
      numberRange: 47,
      maxNumbers: 5,
      basePrice: 50,
      color: "bg-teal-500",
      drawDays: ["Monday", "Thursday"],
      hasBonus: true,
      bonusName: "Life Ball",
      bonusRange: 10,
      maxBonus: 1
    }
  };

  const currentGame = games[selectedGame as keyof typeof games];

  const handleNumberSelect = (number: number, isBonus = false) => {
    setAnimatingNumbers(prev => new Set([...prev, number]));
    setTimeout(() => {
      setAnimatingNumbers(prev => {
        const newSet = new Set(prev);
        newSet.delete(number);
        return newSet;
      });
    }, 300);

    if (isBonus) {
      if (bonusNumbers.includes(number)) {
        setBonusNumbers(bonusNumbers.filter(n => n !== number));
      } else if (bonusNumbers.length < currentGame.maxBonus) {
        setBonusNumbers([...bonusNumbers, number]);
      }
    } else {
      if (userNumbers.includes(number)) {
        setUserNumbers(userNumbers.filter(n => n !== number));
      } else if (userNumbers.length < currentGame.maxNumbers) {
        setUserNumbers([...userNumbers, number]);
      }
    }
  };

  const generateLuckyDip = () => {
    // Animate all numbers
    const allNumbers = Array.from({ length: currentGame.numberRange }, (_, i) => i + 1);
    const bonusRange = currentGame.hasBonus ? Array.from({ length: currentGame.bonusRange }, (_, i) => i + 1) : [];
    
    setAnimatingNumbers(new Set([...allNumbers, ...bonusRange]));
    setTimeout(() => {
      setAnimatingNumbers(new Set());
    }, 600);

    // Generate main numbers
    const shuffledMain = [...allNumbers].sort(() => Math.random() - 0.5);
    setUserNumbers(shuffledMain.slice(0, currentGame.maxNumbers));

    // Generate bonus numbers if applicable
    if (currentGame.hasBonus) {
      const shuffledBonus = [...bonusRange].sort(() => Math.random() - 0.5);
      setBonusNumbers(shuffledBonus.slice(0, currentGame.maxBonus));
    }
  };

  const clearSelection = () => {
    setUserNumbers([]);
    setBonusNumbers([]);
  };

  const handleStakeChange = (value: string) => {
    const numValue = parseInt(value);
    if (numValue >= 50) {
      setStakeAmount(numValue);
    }
  };

  const getStakeMultiplier = () => {
    return stakeAmount / currentGame.basePrice;
  };

  const totalCost = selectedLines * stakeAmount;
  const isReadyToPurchase = userNumbers.length === currentGame.maxNumbers && 
    (!currentGame.hasBonus || bonusNumbers.length === currentGame.maxBonus);

  const resetGameState = () => {
    setUserNumbers([]);
    setBonusNumbers([]);
  };

  // Helper function to get next draw date
  const getNextDrawDate = (gameId: string): string => {
    const now = new Date();
    const drawDays: { [key: string]: number[] } = {
      'lotto': [3, 6], // Wednesday (3) and Saturday (6)
      'afromillions': [2, 5], // Tuesday (2) and Friday (5)
      'thunderball': [2, 3, 5, 6], // Tue, Wed, Fri, Sat
      'set-for-life': [1, 4] // Monday (1) and Thursday (4)
    };

    const gameDays = drawDays[gameId] || [6]; // Default to Saturday
    const nextDraw = new Date(now);
    
    // Find next draw day
    while (!gameDays.includes(nextDraw.getDay())) {
      nextDraw.setDate(nextDraw.getDate() + 1);
    }
    
    // Set draw time to 8 PM
    nextDraw.setHours(20, 0, 0, 0);
    
    // If it's today but past 6 PM, move to next draw day
    if (nextDraw.getDate() === now.getDate() && now.getHours() >= 18) {
      nextDraw.setDate(nextDraw.getDate() + 1);
      while (!gameDays.includes(nextDraw.getDay())) {
        nextDraw.setDate(nextDraw.getDate() + 1);
      }
    }
    
    return nextDraw.toISOString();
  };

  // Purchase tickets function
  const handlePurchaseTickets = async () => {
    if (!isAuthenticated || !user?.id) {
      toast.error('You need to sign in first! Abeg login make you buy ticket.');
      navigate('/sign-in');
      return;
    }

    if (!isReadyToPurchase) {
      toast.error('Please select all required numbers first!');
      return;
    }

    setIsProcessing(true);

    try {
      const tickets = [];
      
      // Create tickets for each line
      for (let i = 0; i < selectedLines; i++) {
        const ticket = {
          id: `ticket-${selectedGame}-${Date.now()}-${i}`,
          gameId: selectedGame,
          gameName: currentGame.name,
          userId: user.id,
          numbers: {
            main: [...userNumbers],
            bonus: [...bonusNumbers]
          },
          ticketPrice: stakeAmount,
          stakeAmount: stakeAmount,
          purchaseDate: new Date().toISOString(),
          drawDate: getNextDrawDate(selectedGame),
          status: 'pending'
        };
        
        tickets.push(ticket);
      }
      
      // Save tickets to localStorage
      const existingTickets = JSON.parse(localStorage.getItem('lotteryTickets') || '[]');
      const updatedTickets = [...existingTickets, ...tickets];
      localStorage.setItem('lotteryTickets', JSON.stringify(updatedTickets));
      
      // Show success message with stake multiplier info
      const stakeMultiplier = stakeAmount / 50;
      const multiplierText = stakeMultiplier > 1 ? ` with ${stakeMultiplier}x stake multiplier` : '';
      
      toast.success(
        `🎉 Gbam! You don buy ${selectedLines} ticket${selectedLines > 1 ? 's' : ''} for ${currentGame.name}${multiplierText}! Total cost: ₦${totalCost.toLocaleString()}. Your winnings go multiply by ${stakeMultiplier}x! Good luck! 🍀`,
        { duration: 6000 }
      );
      
      // Clear selections after successful purchase
      setUserNumbers([]);
      setBonusNumbers([]);
      setSelectedLines(1);
      setStakeAmount(50);
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error purchasing tickets:', error);
      toast.error('Wahala! Something go wrong with your ticket purchase. Try again!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Buy Tickets</h1>
          <p className="text-base md:text-lg text-gray-600">Select your numbers and choose your stake amount</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-center">Choose Your Game</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {/* Game Selection */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {Object.entries(games).map(([key, game]) => (
                <div
                  key={key}
                  onClick={() => {
                    setSelectedGame(key);
                    resetGameState();
                  }}
                  className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedGame === key
                      ? `${game.color} text-white border-current`
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">{game.name}</h3>
                  <p className="text-xs md:text-sm opacity-90">From ₦{game.basePrice} per line</p>
                  <p className="text-xs opacity-75">Draws: {game.drawDays.join(', ')}</p>
                </div>
              ))}
            </div>

            {/* Stake Amount Selection */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <Label className="text-base md:text-lg font-semibold">Choose Your Stake Amount</Label>
                  <p className="text-sm text-gray-600">Higher stakes = Higher potential winnings!</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">₦</span>
                    <Input
                      type="number"
                      min="50"
                      step="50"
                      value={stakeAmount}
                      onChange={(e) => handleStakeChange(e.target.value)}
                      className="w-24 text-center font-semibold"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[50, 100, 200, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setStakeAmount(amount)}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          stakeAmount === amount
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ₦{amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {getStakeMultiplier() > 1 && (
                <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded">
                  <p className="text-green-800 font-semibold text-sm">
                    🚀 {getStakeMultiplier()}x multiplier active! Your winnings will be {getStakeMultiplier()}x bigger!
                  </p>
                </div>
              )}
            </div>

            {/* Main Numbers Selection */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <Label className="text-base md:text-lg font-semibold">Select Your Main Numbers</Label>
                <div className="flex space-x-2">
                  <Button
                    onClick={generateLuckyDip}
                    variant="outline"
                    className="text-xs md:text-sm"
                  >
                    Lucky Dip
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
                    onClick={() => handleNumberSelect(number, false)}
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
                  Selected {userNumbers.length} of {currentGame.maxNumbers} main numbers
                </p>
              </div>
            </div>

            {/* Bonus Numbers Section */}
            {currentGame.hasBonus && (
              <div className="mb-6 border-t pt-6">
                <div className="mb-4">
                  <Label className="text-base md:text-lg font-semibold">{currentGame.bonusName}</Label>
                  <p className="text-sm text-gray-600">Pick {currentGame.maxBonus} {currentGame.bonusName.toLowerCase()}</p>
                </div>

                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-2 mb-4">
                  {Array.from({ length: currentGame.bonusRange }, (_, i) => i + 1).map((number) => (
                    <button
                      key={`bonus-${number}`}
                      onClick={() => handleNumberSelect(number, true)}
                      disabled={!bonusNumbers.includes(number) && bonusNumbers.length >= currentGame.maxBonus}
                      className={`aspect-square rounded-full text-xs md:text-sm font-bold transition-all duration-300 transform ${
                        bonusNumbers.includes(number)
                          ? 'bg-yellow-500 text-white scale-110 shadow-lg animate-pulse-glow'
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
                  {bonusNumbers.map((number) => (
                    <Badge
                      key={`bonus-badge-${number}`}
                      className="bg-yellow-500 text-white animate-fade-in text-xs md:text-sm"
                    >
                      {number}
                    </Badge>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    Selected {bonusNumbers.length} of {currentGame.maxBonus} {currentGame.bonusName.toLowerCase()}
                  </p>
                </div>
              </div>
            )}

            {/* Ready to Purchase Indicator */}
            {isReadyToPurchase && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4 animate-slide-up">
                <p className="text-green-800 font-semibold text-sm md:text-base">✓ All numbers selected! Ready to purchase.</p>
              </div>
            )}

            {/* Lines and Purchase Section */}
            <div className="border-t pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <Label className="text-base md:text-lg font-semibold">Number of Lines</Label>
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
                  <span className="font-semibold text-sm md:text-base">Total Cost:</span>
                  <span className="text-xl md:text-2xl font-bold text-blue-600">₦{totalCost.toLocaleString()}</span>
                </div>
                <div className="text-xs md:text-sm text-gray-600 space-y-1">
                  <p>{selectedLines} line{selectedLines > 1 ? 's' : ''} × ₦{stakeAmount.toLocaleString()} per line</p>
                  {getStakeMultiplier() > 1 && (
                    <p className="text-green-600 font-medium">
                      🎯 Potential winnings multiplied by {getStakeMultiplier()}x!
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={handlePurchaseTickets}
                disabled={!isReadyToPurchase || isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 text-base md:text-lg animate-fade-in disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : !isReadyToPurchase ? (
                  `Select ${currentGame.maxNumbers} main numbers${currentGame.hasBonus ? ` and ${currentGame.maxBonus} ${currentGame.bonusName.toLowerCase()}` : ''}`
                ) : (
                  `Purchase Tickets - ₦${totalCost.toLocaleString()}`
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketPurchase;