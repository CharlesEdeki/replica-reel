import React, { useState } from "react";

const games = [
  {
    name: "Lotto",
    logo: "/lotto-logo.png",
    jackpot: "£5.2 Million",
    nextDraw: "Wed 30 Jul, 7:30pm",
    color: "from-yellow-400 via-yellow-300 to-yellow-500",
    ballsImg: "/lotto-balls.png",
  },
  {
    name: "EuroMillions",
    logo: "/euromillions-logo.png",
    jackpot: "£14 Million",
    nextDraw: "Tue 29 Jul, 8:30pm",
    color: "from-pink-500 via-pink-400 to-pink-600",
    ballsImg: "/euromillions-balls.png",
  },
  {
    name: "Set For Life",
    logo: "/setforlife-logo.png",
    jackpot: "£10,000/month for 30 years",
    nextDraw: "Mon 4 Aug, 8:00pm",
    color: "from-green-400 via-green-300 to-green-500",
    ballsImg: "/setforlife-balls.png",
  },
];

const HeroSection = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section
      className={`bg-gradient-to-r ${games[selected].color} text-white py-12 shadow-lg transition-all duration-500`}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 flex-1">
          <div className="flex items-center mb-4 space-x-3">
            <img
              src={games[selected].logo}
              alt={`${games[selected].name} Logo`}
              className="h-12 w-12 rounded-full shadow-lg bg-white p-1"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">
              {games[selected].name}
            </h1>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
            {games[selected].jackpot}
          </p>
          <p className="text-lg mb-6 font-medium">
            {games[selected].nextDraw}
          </p>
          <a
            href="#"
            className="inline-block bg-white text-indigo-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Play Now
          </a>
          <div className="mt-6 flex space-x-2">
            {games.map((game, idx) => (
              <button
                key={game.name}
                aria-label={`Show ${game.name} details`}
                className={`w-8 h-8 rounded-full border-2 ${
                  selected === idx
                    ? "border-white bg-white"
                    : "border-white bg-transparent"
                } flex items-center justify-center transition-all duration-200`}
                onClick={() => setSelected(idx)}
              >
                <img src={game.logo} alt={game.name} className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>
        <img
          src={games[selected].ballsImg}
          alt={`${games[selected].name} Balls`}
          className="w-44 h-44 md:w-56 md:h-56 drop-shadow-xl flex-1"
        />
      </div>
    </section>
  );
};

export default HeroSection;