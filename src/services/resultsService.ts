// src/services/resultsService.ts
// Create this new file to centralize all draw results


const IS_TEST_MODE = true; // Set to false in production

export interface DrawResult {
  id: string;
  gameId: string;
  gameName: string;
  drawDate: string;
  numbers: {
    main: number[];
    bonus?: number[];
  };
  jackpot: string;
  winners?: {
    tier: string;
    matches: number;
    winners: number;
    prize: string;
  }[];
}

// Centralized draw results - single source of truth
export const DRAW_RESULTS: DrawResult[] = [
  {
    id: "lotto-2024-08-04",
    gameId: "lotto",
    gameName: "Lotto",
    drawDate: "2025-08-08T20:00:00Z", // Yesterday - Changed from future date
    numbers: {
      main: [12, 18, 23, 34, 42, 47],
      bonus: [7]
    },
    jackpot: "₦5,200,000,000",
    winners: [
      { tier: "Match 6", matches: 6, winners: 0, prize: "Rollover o!" },
      { tier: "Match 5 + Bonus", matches: 5, winners: 3, prize: "₦1,750,000" },
      { tier: "Match 5", matches: 5, winners: 156, prize: "₦140,000" },
      { tier: "Match 4", matches: 4, winners: 8234, prize: "₦30,000" },
      { tier: "Match 3", matches: 3, winners: 156789, prize: "₦3,000" }
    ]
  },
  {
    id: "afromillions-2024-08-03",
    gameId: "afromillions",
    gameName: "AfroMillions",
    drawDate: "2025-08-08T19:00:00Z", // Yesterday - Changed from future date
    numbers: {
      main: [3, 14, 28, 33, 44],
      bonus: [2, 11]
    },
    jackpot: "₦157,000,000,000",
    winners: [
      { tier: "Match 5 + 2 Stars", matches: 7, winners: 0, prize: "Rollover sharp!" },
      { tier: "Match 5 + 1 Star", matches: 6, winners: 2, prize: "₦234,567,000" },
      { tier: "Match 5", matches: 5, winners: 4, prize: "₦13,456,000" }
    ]
  },
  {
    id: "thunderball-2024-08-04",
    gameId: "thunderball",
    gameName: "Thunderball",
    drawDate: "2025-08-08T18:00:00Z", // Yesterday - Changed from future date
    numbers: {
      main: [6, 13, 21, 29, 34],
      bonus: [8]
    },
    jackpot: "₦500,000,000",
    winners: [
      { tier: "Match 5 + Thunderball", matches: 6, winners: 1, prize: "₦500,000,000" },
      { tier: "Match 5", matches: 5, winners: 12, prize: "₦5,000,000" },
      { tier: "Match 4 + Thunderball", matches: 5, winners: 89, prize: "₦250,000" }
    ]
  },
  {
    id: "set-for-life-2024-08-05",
    gameId: "set-for-life",
    gameName: "Set For Life",
    drawDate: "2025-08-08T17:00:00Z", // Yesterday - Changed from future date
    numbers: {
      main: [5, 17, 22, 31, 39],
      bonus: [4]
    },
    jackpot: "₦10,000,000/month for 30 years",
    winners: [
      { tier: "Match 5 + Life Ball", matches: 6, winners: 1, prize: "₦10,000,000/month" },
      { tier: "Match 5", matches: 5, winners: 3, prize: "₦10,000/month" },
      { tier: "Match 4 + Life Ball", matches: 5, winners: 45, prize: "₦350,000" }
    ]
  }
];

// Service functions
export const getLatestResults = (): DrawResult[] => {
  return DRAW_RESULTS.sort((a, b) => new Date(b.drawDate).getTime() - new Date(a.drawDate).getTime());
};

export const getResultByGameId = (gameId: string): DrawResult | undefined => {
  return DRAW_RESULTS.find(result => result.gameId === gameId);
};

export const getResultsForGame = (gameId: string): DrawResult[] => {
  return DRAW_RESULTS.filter(result => result.gameId === gameId)
    .sort((a, b) => new Date(b.drawDate).getTime() - new Date(a.drawDate).getTime());
};

// Get the most recent draw for a specific game that happened after a ticket purchase
export const getRelevantResultForTicket = (gameId: string, ticketPurchaseDate: string): DrawResult | undefined => {
  return DRAW_RESULTS
    .filter(result => 
      result.gameId === gameId && 
      new Date(result.drawDate) >= new Date(ticketPurchaseDate)
    )
    .sort((a, b) => new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime())[0]; // Get earliest qualifying draw
};

// Ticket checking logic - centralized
export const checkTicketAgainstResult = (ticket: any, result: DrawResult) => {
  if (ticket.gameId !== result.gameId) return null;

  console.log('Checking ticket:', ticket.numbers);
  console.log('Against result:', result.numbers);

  // Check main number matches
  const mainMatches = ticket.numbers.main.filter((num: number) => 
    result.numbers.main.includes(num)
  ).length;

  // Check bonus number matches
  let bonusMatches = 0;
  if (ticket.numbers.bonus && result.numbers.bonus) {
    bonusMatches = ticket.numbers.bonus.filter((num: number) => 
      result.numbers.bonus?.includes(num)
    ).length;
  }

  console.log(`Main matches: ${mainMatches}, Bonus matches: ${bonusMatches}`);

  // Determine prize based on matches and game type
  let winAmount = 0;
  let tier = "";
  let isWinner = false;
  
  if (result.gameId === 'lotto') {
    if (mainMatches === 6) {
      winAmount = 5200000000;
      tier = "JACKPOT! You don blow! 🎉💰";
      isWinner = true;
    } else if (mainMatches === 5 && bonusMatches >= 1) {
      winAmount = 1750000;
      tier = "Match 5 + Bonus - Big Win!";
      isWinner = true;
    } else if (mainMatches === 5) {
      winAmount = 140000;
      tier = "Match 5 - Sweet Win!";
      isWinner = true;
    } else if (mainMatches === 4) {
      winAmount = 30000;
      tier = "Match 4 - Small Chop!";
      isWinner = true;
    } else if (mainMatches === 3) {
      winAmount = 3000;
      tier = "Match 3 - Something small!";
      isWinner = true;
    }
  } else if (result.gameId === 'afromillions') {
    if (mainMatches === 5 && bonusMatches === 2) {
      winAmount = 157000000000;
      tier = "JACKPOT! Na your time o! 🔥💰";
      isWinner = true;
    } else if (mainMatches === 5 && bonusMatches === 1) {
      winAmount = 234567000;
      tier = "Match 5 + 1 Star - Big Gbege!";
      isWinner = true;
    } else if (mainMatches === 5) {
      winAmount = 13456000;
      tier = "Match 5 - Sweet Money!";
      isWinner = true;
    } else if (mainMatches === 4 && bonusMatches >= 1) {
      winAmount = 500000;
      tier = "Match 4 + Star";
      isWinner = true;
    } else if (mainMatches === 4) {
      winAmount = 150000;
      tier = "Match 4";
      isWinner = true;
    } else if (mainMatches === 3 && bonusMatches >= 1) {
      winAmount = 50000;
      tier = "Match 3 + Star";
      isWinner = true;
    } else if (mainMatches === 3) {
      winAmount = 20000;
      tier = "Match 3";
      isWinner = true;
    } else if (mainMatches === 2 && bonusMatches >= 1) {
      winAmount = 10000;
      tier = "Match 2 + Star";
      isWinner = true;
    }
  } else if (result.gameId === 'thunderball') {
    if (mainMatches === 5 && bonusMatches >= 1) {
      winAmount = 500000000;
      tier = "JACKPOT! Thunder don strike! ⚡💰";
      isWinner = true;
    } else if (mainMatches === 5) {
      winAmount = 5000000;
      tier = "Match 5 - Big Win!";
      isWinner = true;
    } else if (mainMatches === 4 && bonusMatches >= 1) {
      winAmount = 250000;
      tier = "Match 4 + Thunderball";
      isWinner = true;
    } else if (mainMatches === 4) {
      winAmount = 100000;
      tier = "Match 4";
      isWinner = true;
    } else if (mainMatches === 3 && bonusMatches >= 1) {
      winAmount = 20000;
      tier = "Match 3 + Thunderball";
      isWinner = true;
    } else if (mainMatches === 3) {
      winAmount = 10000;
      tier = "Match 3";
      isWinner = true;
    } else if (bonusMatches >= 1) {
      winAmount = 3000;
      tier = "Thunderball Match";
      isWinner = true;
    }
  } else if (result.gameId === 'set-for-life') {
    if (mainMatches === 5 && bonusMatches >= 1) {
      winAmount = 10000000;
      tier = "JACKPOT! Set for life o! 🏆💰";
      isWinner = true;
    } else if (mainMatches === 5) {
      winAmount = 10000;
      tier = "Match 5 - Monthly Pay!";
      isWinner = true;
    } else if (mainMatches === 4 && bonusMatches >= 1) {
      winAmount = 350000;
      tier = "Match 4 + Life Ball";
      isWinner = true;
    } else if (mainMatches === 4) {
      winAmount = 50000;
      tier = "Match 4";
      isWinner = true;
    } else if (mainMatches === 3 && bonusMatches >= 1) {
      winAmount = 30000;
      tier = "Match 3 + Life Ball";
      isWinner = true;
    } else if (mainMatches === 3) {
      winAmount = 10000;
      tier = "Match 3";
      isWinner = true;
    } else if (mainMatches === 2 && bonusMatches >= 1) {
      winAmount = 5000;
      tier = "Match 2 + Life Ball";
      isWinner = true;
    }
  }

  return {
    mainMatches,
    bonusMatches,
    totalMatches: mainMatches + bonusMatches,
    prize: winAmount > 0 ? `₦${winAmount.toLocaleString()}` : "No Prize",
    tier,
    isWinner,
    winAmount
  };
};