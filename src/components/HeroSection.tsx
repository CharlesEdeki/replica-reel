import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 min-h-[400px] flex items-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side - EuroMillions branding */}
          <div className="text-left mb-8 lg:mb-0 animate-fade-in">
            <p className="text-primary font-semibold mb-2 transform transition-all duration-500 hover:scale-105">This Friday</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-primary transform transition-all duration-700 hover:scale-110">EUROMILLIONS</div>
            </div>
            <div className="text-6xl lg:text-7xl font-black text-primary mb-2 transform transition-all duration-700 hover:scale-105 animate-pulse-glow">£145M</div>
            <div className="text-xl text-primary mb-4 transform transition-all duration-500 hover:scale-105">Million*</div>
            <div className="text-2xl font-bold text-primary mb-6 transform transition-all duration-500 hover:scale-105">Jackpot</div>
            <div className="text-lg text-primary font-semibold transform transition-all duration-500 hover:scale-105">GET THAT EUROMILLIONS FEELING</div>
          </div>

          {/* Right side - Quick play interface */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl max-w-md w-full transform transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-slide-up">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-primary">Fancy a Lucky Dip?</h3>
              <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-800">Play a quick Lucky Dip in this Friday's EuroMillions draw</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">How many lines?</span>
              <div className="flex items-center space-x-3">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold text-gray-800 w-8 text-center transition-all duration-300 hover:scale-110 hover:text-primary">1</span>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-lg font-bold text-gray-800 transition-all duration-300 hover:text-primary hover:scale-105 inline-block">Total: £2.50</span>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
              QUICK LUCKY DIP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;