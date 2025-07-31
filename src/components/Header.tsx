import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold transform transition-all duration-300 hover:scale-105 cursor-pointer">THE NATIONAL LOTTERY</div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-foreground/80 transition-all duration-300 transform hover:scale-105">
                <span>GAMES</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-foreground/80 transition-all duration-300 transform hover:scale-105">
                <span>RESULTS</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
              </div>
              <span className="cursor-pointer hover:text-primary-foreground/80 transition-all duration-300 transform hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">WINNERS & GOOD CAUSES</span>
              <span className="cursor-pointer hover:text-primary-foreground/80 transition-all duration-300 transform hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">HEALTHY PLAY</span>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 transform hover:scale-105">
              Register
            </Button>
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;