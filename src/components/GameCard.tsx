import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  game: string;
  title: string;
  subtitle?: string;
  prize: string;
  date: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonPrice?: string;
}

const GameCard = ({ 
  game, 
  title, 
  subtitle, 
  prize, 
  date, 
  backgroundColor, 
  textColor, 
  buttonText, 
  buttonPrice 
}: GameCardProps) => {
  return (
    <Card className={`${backgroundColor} ${textColor} border-0 overflow-hidden h-full`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="mb-4">
          <p className="text-sm opacity-90 mb-2">{date}</p>
          <h3 className="text-2xl font-bold mb-2">{game}</h3>
        </div>
        
        <div className="flex-1">
          <h4 className="text-xl font-bold mb-2">{title}</h4>
          {subtitle && <p className="text-sm opacity-90 mb-4">{subtitle}</p>}
          <div className="text-4xl font-black mb-4">{prize}</div>
        </div>
        
        <Button 
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 font-bold"
          variant="outline"
        >
          {buttonText} {buttonPrice && <span className="ml-1">{buttonPrice}</span>}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;