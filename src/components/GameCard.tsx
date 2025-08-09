import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  id: string;
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
  id,
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
    <Link to={`/games/${id}`}>
      <Card
        className={`${backgroundColor} ${textColor} border-0 overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group animate-slide-up`}
      >
        <CardContent className="p-6 h-full flex flex-col relative">
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-lg"></div>

          <div className="mb-4 relative z-10">
            <p className="text-sm opacity-90 mb-2">{date}</p>
            <h3 className="text-2xl font-bold mb-2">{game}</h3>
          </div>

          <div className="flex-1 relative z-10">
            <h4 className="text-xl font-bold mb-2">{title}</h4>
            {subtitle && <p className="text-sm opacity-90 mb-4">{subtitle}</p>}
            {prize && <div className="text-4xl font-black mb-4">{prize}</div>}
          </div>

          <Button
            className="w-full bg-white/20 hover:bg-white/40 text-white border-white/30 hover:border-white/50 font-bold"
            variant="outline"
          >
            {buttonText} {buttonPrice && <span className="ml-1">{buttonPrice}</span>}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GameCard;