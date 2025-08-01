import React from "react";

const results = [
  {
    game: "Lotto",
    date: "Wed 30 Jul 2025",
    numbers: [12, 18, 23, 34, 42, 47],
    bonus: 7,
    jackpot: "£5.2M",
  },
  {
    game: "EuroMillions",
    date: "Tue 29 Jul 2025",
    numbers: [3, 14, 28, 33, 44],
    stars: [2, 11],
    jackpot: "£14M",
  },
  {
    game: "Thunderball",
    date: "Wed 30 Jul 2025",
    numbers: [6, 13, 21, 29, 34],
    thunderball: 8,
    jackpot: "£500K",
  },
];

const ResultsPage = () => (
  <div className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-6 text-blue-700">Latest Results</h1>
    <div className="grid md:grid-cols-3 gap-6">
      {results.map((result) => (
        <div key={result.game} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{result.game}</span>
            <span className="text-xs text-gray-500">{result.date}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {result.numbers.map((num, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold"
              >
                {num}
              </span>
            ))}
            {result.bonus && (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black font-bold border-2 border-blue-600">
                {result.bonus}
              </span>
            )}
            {result.stars &&
              result.stars.map((star, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white font-bold"
                >
                  {star}
                </span>
              ))}
            {result.thunderball && (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold border-2 border-gray-400">
                {result.thunderball}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700">
            Jackpot: <span className="font-bold">{result.jackpot}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ResultsPage;