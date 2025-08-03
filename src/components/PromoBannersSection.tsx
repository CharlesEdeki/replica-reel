import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Gift, Zap } from "lucide-react";

const PromoBannersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promoOffers = [
    {
      id: 1,
      type: "Instant Win",
      title: "Cashword Extra",
      subtitle: "Cash in on the game with a",
      prize: "£50,000",
      prizeLabel: "top prize",
      price: "£2.00",
      bgImage: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500",
      textColor: "text-white",
      icon: <Zap className="h-6 w-6" />,
      description: "Word puzzle scratchcard with cash prizes"
    },
    {
      id: 2,
      type: "Weekly Prize Draw", 
      title: "£10,000 Weekly Prize",
      subtitle: "Could be yours when you spend",
      prize: "£10",
      prizeLabel: "on draw games online this week",
      price: null,
      bgImage: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600",
      textColor: "text-white",
      icon: <Gift className="h-6 w-6" />,
      description: "Online only. Week ends 11pm Sunday. 14 days to accept prize.",
      terms: "Promo Ts&Cs apply."
    },
    {
      id: 3,
      type: "Special Offer",
      title: "Double Bonus Points",
      subtitle: "Earn double points on all",
      prize: "Lotto",
      prizeLabel: "tickets this weekend",
      price: "£2.00",
      bgImage: "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600",
      textColor: "text-white", 
      icon: <Star className="h-6 w-6" />,
      description: "Limited time offer for registered players"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoOffers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoOffers.length) % promoOffers.length);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Layout - Side by Side Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoOffers.map((offer, index) => (
            <Card 
              key={offer.id} 
              className={`${offer.bgImage} ${offer.textColor} border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group`}
            >
              <CardContent className="p-6 h-full flex flex-col relative min-h-[280px]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    {offer.icon}
                    <span className="ml-2 text-sm font-semibold uppercase tracking-wide opacity-90">
                      {offer.type}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-3 leading-tight">
                      {offer.title}
                    </h3>
                    
                    <p className="text-lg mb-2 opacity-95">
                      {offer.subtitle}
                    </p>
                    
                    <div className="text-4xl font-black mb-3 text-yellow-300 drop-shadow-lg">
                      {offer.prize}
                    </div>
                    
                    <p className="text-sm opacity-90 mb-4">
                      {offer.prizeLabel}
                    </p>

                    <p className="text-xs opacity-80 mb-4">
                      {offer.description}
                    </p>

                    {offer.terms && (
                      <p className="text-xs opacity-70 mb-4 italic">
                        {offer.terms}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 font-bold transition-all duration-300 transform hover:scale-105 mt-auto"
                    variant="outline"
                  >
                    {offer.price ? `Play Now for ${offer.price}` : 'Learn More'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Layout - Enhanced Carousel */}
        <div className="md:hidden">
          <div className="relative">
            {/* Carousel Controls */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Special Offers</h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevSlide}
                  className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={nextSlide}
                  className="p-2 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all duration-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Carousel Content */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {promoOffers.map((offer) => (
                  <div key={offer.id} className="w-full flex-shrink-0">
                    <Card 
                      className={`${offer.bgImage} ${offer.textColor} border-0 overflow-hidden min-h-[350px]`}
                    >
                      <CardContent className="p-6 min-h-[350px] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center mb-4">
                          {offer.icon}
                          <span className="ml-2 text-sm font-semibold uppercase tracking-wide opacity-90">
                            {offer.type}
                          </span>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                          <h3 className="text-xl font-black mb-3 leading-tight">
                            {offer.title}
                          </h3>
                          
                          <p className="text-base mb-2 opacity-95">
                            {offer.subtitle}
                          </p>
                          
                          <div className="text-3xl font-black mb-3 text-yellow-300 drop-shadow-lg">
                            {offer.prize}
                          </div>
                          
                          <p className="text-sm opacity-90 mb-4">
                            {offer.prizeLabel}
                          </p>

                          <p className="text-xs opacity-80 mb-4">
                            {offer.description}
                          </p>

                          {offer.terms && (
                            <p className="text-xs opacity-70 mb-4 italic">
                              {offer.terms}
                            </p>
                          )}
                        </div>

                        {/* Action Button */}
                        <Button 
                          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 font-bold transition-all duration-300"
                          variant="outline"
                        >
                          {offer.price ? `Play Now for ${offer.price}` : 'Learn More'}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {promoOffers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-2 text-sm text-gray-500">
              {currentSlide + 1} of {promoOffers.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannersSection;