import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, Star, Zap, Calendar, CreditCard } from "lucide-react";

interface TicketLine {
  id: string;
  game: string;
  numbers: number[];
  bonus?: number;
  stars?: number[];
  thunderball?: number;
  draws: number;
  weeks: number;
  price: number;
}

interface CartItem extends TicketLine {
  quantity: number;
}

const TicketPurchase = () => {
  const [selectedGame, setSelectedGame] = useState("lotto");
  const [currentLine, setCurrentLine] = useState<Partial<TicketLine>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userNumbers, setUserNumbers] = useState<number[]>([]);
  const [userBonus, setUserBonus] = useState<number | null>(null);
  const [userStars, setUserStars] = useState<number[]>([]);
  const [userThunderball, setUserThunderball] = useState<number | null>(null);
  const [selectedDraws, setSelectedDraws] = useState(1);
  const [selectedWeeks, setSelectedWeeks] = useState(1);

  const games = [
    { 
      id: "lotto", 
      name: "Lotto", 
      price: 2.00,
      maxNumbers: 6, 
      numberRange: 59, 
      hasBonus: true,
      color: "bg-red-600",
      icon: "🎱"
    },
    { 
      id: "euromillions", 
      name: "EuroMillions", 
      price: 2.50,
      maxNumbers: 5, 
      numberRange: 50, 
      hasStars: true, 
      starRange: 12,
      color: "bg-blue-600",
      icon: "⭐"
    },
    { 
      id: "thunderball", 
      name: "Thunderball", 
      price: 1.00,
      maxNumbers: 5, 
      numberRange: 39, 
      hasThunderball: true, 
      thunderballRange: 14,
      color: "bg-purple-600",
      icon: "⚡"
    },
    { 
      id: "setforlife", 
      name: "Set For Life", 
      price: 1.50,
      maxNumbers: 5, 
      numberRange: 47, 
      hasLifeBall: true, 
      lifeBallRange: 10,
      color: "bg-green-600",
      icon: "💰"
    }
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

  const generateLuckyDip = () => {
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

  const clearNumbers = () => {
    setUserNumbers([]);
    setUserBonus(null);
    setUserStars([]);
    setUserThunderball(null);
  };

  const addToCart = () => {
    if (userNumbers.length < currentGame.maxNumbers) {
      alert(`Please select ${currentGame.maxNumbers} numbers`);
      return;
    }

    const ticket: TicketLine = {
      id: Date.now().toString(),
      game: selectedGame,
      numbers: userNumbers,
      bonus: userBonus,
      stars: userStars,
      thunderball: userThunderball,
      draws: selectedDraws,
      weeks: selectedWeeks,
      price: currentGame.price * selectedDraws * selectedWeeks
    };

    const existingItem = cart.find(item => 
      JSON.stringify(item.numbers) === JSON.stringify(ticket.numbers) &&
      item.game === ticket.game &&
      item.draws === ticket.draws &&
      item.weeks === ticket.weeks
    );

    if (existingItem) {
      setCart(cart.map(item => 
        item.id === existingItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...ticket, quantity: 1 }]);
    }

    clearNumbers();
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalLines = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Purchase Interface */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl">
              <CardHeader className={`${currentGame.color} text-white`}>
                <CardTitle className="flex items-center text-2xl">
                  <span className="text-2xl mr-3">{currentGame.icon}</span>
                  Buy {currentGame.name} Tickets
                </CardTitle>
                <p className="text-white/90">
                  Select your numbers and add to cart - Price: £{currentGame.price.toFixed(2)} per line
                </p>
              </CardHeader>

              <CardContent className="p-6">
                {/* Game Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Choose Your Game
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {games.map((game) => (
                      <Button
                        key={game.id}
                        variant={selectedGame === game.id ? "default" : "outline"}
                        onClick={() => {
                          setSelectedGame(game.id);
                          clearNumbers();
                        }}
                        className="h-auto p-3 flex flex-col items-center space-y-1"
                      >
                        <span className="text-lg">{game.icon}</span>
                        <span className="text-xs font-medium">{game.name}</span>
                        <span className="text-xs text-gray-500">£{game.price.toFixed(2)}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Number Selection */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Select {currentGame.maxNumbers} Numbers ({userNumbers.length}/{currentGame.maxNumbers})
                    </label>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={generateLuckyDip}>
                        <Zap className="h-4 w-4 mr-1" />
                        Lucky Dip
                      </Button>
                      <Button size="sm" variant="outline" onClick={clearNumbers}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-10 gap-2 mb-4">
                    {Array.from({ length: currentGame.numberRange }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => handleNumberSelect(number)}
                        disabled={!userNumbers.includes(number) && userNumbers.length >= currentGame.maxNumbers}
                        className={`aspect-square rounded-full text-sm font-bold transition-all duration-200 ${
                          userNumbers.includes(number)
                            ? `${currentGame.color} text-white scale-110 shadow-lg`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>

                  {/* Selected Numbers Display */}
                  {userNumbers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Your Numbers:</span>
                      {userNumbers.map((number) => (
                        <Badge key={number} className={`${currentGame.color} text-white text-base px-3 py-1`}>
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
                          Bonus Ball (Optional)
                        </label>
                        <div className="grid grid-cols-10 gap-2">
                          {Array.from({ length: currentGame.numberRange }, (_, i) => i + 1)
                            .filter(num => !userNumbers.includes(num))
                            .map((number) => (
                            <button
                              key={number}
                              onClick={() => handleSpecialNumberSelect(number, 'bonus')}
                              className={`aspect-square rounded-full text-sm font-bold transition-all duration-200 ${
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
                              className={`aspect-square rounded-full text-sm font-bold transition-all duration-200 ${
                                userStars.includes(number)
                                  ? 'bg-pink-500 text-white scale-110 shadow-lg'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
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
                              className={`aspect-square rounded-full text-sm font-bold transition-all duration-200 ${
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

                {/* Draw Options */}
                <div className="mb-6 border-t pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Number of Draws
                      </label>
                      <select
                        value={selectedDraws}
                        onChange={(e) => setSelectedDraws(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 Draw</option>
                        <option value={2}>2 Draws</option>
                        <option value={4}>4 Draws</option>
                        <option value={8}>8 Draws</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Weeks
                      </label>
                      <select
                        value={selectedWeeks}
                        onChange={(e) => setSelectedWeeks(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 Week</option>
                        <option value={2}>2 Weeks</option>
                        <option value={4}>4 Weeks</option>
                        <option value={8}>8 Weeks</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Line Cost:</strong> £{(currentGame.price * selectedDraws * selectedWeeks).toFixed(2)}
                      {selectedDraws > 1 && ` (${selectedDraws} draws)`}
                      {selectedWeeks > 1 && ` (${selectedWeeks} weeks)`}
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={addToCart}
                  disabled={userNumbers.length < currentGame.maxNumbers}
                  className={`w-full ${currentGame.color} hover:opacity-90 text-white font-bold py-3 text-lg`}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Line to Cart (£{(currentGame.price * selectedDraws * selectedWeeks).toFixed(2)})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <Card className="shadow-2xl sticky top-4">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Your Cart ({getTotalLines()} lines)
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Your cart is empty</p>
                    <p className="text-sm">Add some lines to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const game = games.find(g => g.id === item.game)!;
                      return (
                        <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{game.icon}</span>
                              <div>
                                <h4 className="font-semibold text-sm">{game.name}</h4>
                                <p className="text-xs text-gray-600">
                                  {item.draws} draw(s) × {item.weeks} week(s)
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.numbers.map((number) => (
                              <Badge key={number} variant="secondary" className="text-xs">
                                {number}
                              </Badge>
                            ))}
                            {item.stars && item.stars.map((star) => (
                              <Badge key={`star-${star}`} className="bg-pink-500 text-xs">
                                ⭐{star}
                              </Badge>
                            ))}
                            {item.thunderball && (
                              <Badge className="bg-purple-600 text-xs">
                                ⚡{item.thunderball}
                              </Badge>
                            )}
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-semibold">
                              £{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-2xl font-bold text-green-600">
                          £{getTotalPrice().toFixed(2)}
                        </span>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Proceed to Checkout
                      </Button>

                      <p className="text-xs text-gray-500 text-center mt-2">
                        🔒 Secure payment • 18+ only
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;