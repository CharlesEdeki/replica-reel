import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold">THE NATIONAL LOTTERY</div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-foreground/80">
                <span>GAMES</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-primary-foreground/80">
                <span>RESULTS</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <span className="cursor-pointer hover:text-primary-foreground/80">WINNERS & GOOD CAUSES</span>
              <span className="cursor-pointer hover:text-primary-foreground/80">HEALTHY PLAY</span>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Register
            </Button>
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;