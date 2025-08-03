import React from "react";
import EnhancedGamesShowcase from "@/components/EnhancedGamesShowcase"

const GamePage = () => (
  <div className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-6 text-blue-700">Game Details</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-700 mb-4">
        Select a lottery game to view more details, rules, and how to play.
      </p>
      {/* Add game-specific content here */}
      <ul className="list-disc pl-6 text-gray-600">
        <li>Lotto</li>
        <li>EuroMillions</li>
        <li>Set For Life</li>
        <li>Thunderball</li>
      </ul>
    </div>
  </div>
);

export default GamePage;