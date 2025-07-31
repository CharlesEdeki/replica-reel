import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 min-h-[400px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side - EuroMillions branding */}
          <div className="text-left mb-8 lg:mb-0">
            <p className="text-primary font-semibold mb-2">This Friday</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-primary">EUROMILLIONS</div>
            </div>
            <div className="text-6xl lg:text-7xl font-black text-primary mb-2">£145M</div>
            <div className="text-xl text-primary mb-4">Million*</div>
            <div className="text-2xl font-bold text-primary mb-6">Jackpot</div>
            <div className="text-lg text-primary font-semibold">GET THAT EUROMILLIONS FEELING</div>
          </div>

          {/* Right side - Quick play interface */}
          <div className="bg-white/90 rounded-lg p-6 shadow-lg max-w-md w-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Fancy a Lucky Dip?</h3>
              <p className="text-sm text-gray-600">Play a quick Lucky Dip in this Friday's EuroMillions draw</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">How many lines?</span>
              <div className="flex items-center space-x-3">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold text-gray-800 w-8 text-center">1</span>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="text-lg font-bold text-gray-800">Total: £2.50</span>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3">
              QUICK LUCKY DIP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;