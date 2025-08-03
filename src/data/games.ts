// src/data/games.ts
export interface Game {
  id: string;
  name: string;
  tagline: string;
  description: string;
  howToPlay: string[];
  drawDays: string[];
  drawTime: string;
  ticketPrice: number;
  minJackpot: string;
  maxNumbers: number;
  numberRange: string;
  bonusNumbers?: {
    count: number;
    range: string;
    name: string;
  };
  prizes: {
    tier: string;
    match: string;
    odds: string;
    prize: string;
  }[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  image: string;
}

export const games: Game[] = [
  {
    id: 'lotto',
    name: 'Lotto',
    tagline: 'The UK\'s favourite lottery game',
    description: 'Play Lotto for your chance to win life-changing jackpots starting from £2 million. Pick 6 numbers from 1 to 59 or try a Lucky Dip for randomly selected numbers.',
    howToPlay: [
      'Choose 6 numbers from 1 to 59',
      'Or select Lucky Dip for random numbers',
      'Each line costs £2',
      'Draws take place twice a week',
      'Match numbers to win prizes'
    ],
    drawDays: ['Wednesday', 'Saturday'],
    drawTime: '8:00 PM',
    ticketPrice: 2,
    minJackpot: '£2 Million',
    maxNumbers: 6,
    numberRange: '1-59',
    bonusNumbers: {
      count: 1,
      range: '1-59',
      name: 'Bonus Ball'
    },
    prizes: [
      { tier: 'Jackpot', match: '6 numbers', odds: '1 in 45,057,474', prize: '£2M+' },
      { tier: 'Match 5 + Bonus', match: '5 numbers + bonus', odds: '1 in 7,509,579', prize: '£1M' },
      { tier: 'Match 5', match: '5 numbers', odds: '1 in 144,415', prize: '£1,750' },
      { tier: 'Match 4', match: '4 numbers', odds: '1 in 2,180', prize: '£140' },
      { tier: 'Match 3', match: '3 numbers', odds: '1 in 97', prize: '£30' },
      { tier: 'Match 2', match: '2 numbers', odds: '1 in 10.3', prize: 'Free Lucky Dip' }
    ],
    colors: {
      primary: 'bg-red-600',
      secondary: 'bg-red-500',
      accent: 'text-red-600'
    },
    features: ['Twice weekly draws', 'Lucky Dip available', 'System entries', 'Advance play'],
    image: '/images/lotto-card.jpg'
  },
  {
    id: 'euromillions',
    name: 'EuroMillions',
    tagline: 'Europe\'s biggest lottery',
    description: 'EuroMillions offers some of the biggest jackpots in the world. Pick 5 main numbers and 2 Lucky Stars for your chance to win up to £220 million.',
    howToPlay: [
      'Choose 5 main numbers from 1 to 50',
      'Choose 2 Lucky Star numbers from 1 to 12',
      'Or select Lucky Dip for random numbers',
      'Each line costs £2.50',
      'Draws take place twice a week'
    ],
    drawDays: ['Tuesday', 'Friday'],
    drawTime: '8:45 PM',
    ticketPrice: 2.5,
    minJackpot: '£14 Million',
    maxNumbers: 5,
    numberRange: '1-50',
    bonusNumbers: {
      count: 2,
      range: '1-12',
      name: 'Lucky Stars'
    },
    prizes: [
      { tier: 'Jackpot', match: '5 + 2 Lucky Stars', odds: '1 in 139,838,160', prize: '£14M+' },
      { tier: 'Match 5 + 1 Star', match: '5 + 1 Lucky Star', odds: '1 in 6,991,908', prize: '£500K+' },
      { tier: 'Match 5', match: '5 numbers', odds: '1 in 3,107,515', prize: '£50K+' },
      { tier: 'Match 4 + 2 Stars', match: '4 + 2 Lucky Stars', odds: '1 in 621,503', prize: '£5K+' },
      { tier: 'Match 4 + 1 Star', match: '4 + 1 Lucky Star', odds: '1 in 31,075', prize: '£300+' },
      { tier: 'Match 3 + 2 Stars', match: '3 + 2 Lucky Stars', odds: '1 in 14,125', prize: '£150+' }
    ],
    colors: {
      primary: 'bg-yellow-500',
      secondary: 'bg-yellow-400',
      accent: 'text-yellow-600'
    },
    features: ['European jackpots', 'Lucky Stars', 'Millionaire Maker', 'HotPicks'],
    image: '/images/euromillions-card.jpg'
  },
  {
    id: 'thunderball',
    name: 'Thunderball',
    tagline: 'Your chance to win £500,000',
    description: 'Play Thunderball for your chance to win the top prize of £500,000. Pick 5 main numbers and 1 Thunderball number, with draws four times a week.',
    howToPlay: [
      'Choose 5 main numbers from 1 to 39',
      'Choose 1 Thunderball from 1 to 14',
      'Or select Lucky Dip for random numbers',
      'Each line costs £1',
      'Draws take place four times a week'
    ],
    drawDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    drawTime: '8:15 PM',
    ticketPrice: 1,
    minJackpot: '£500,000',
    maxNumbers: 5,
    numberRange: '1-39',
    bonusNumbers: {
      count: 1,
      range: '1-14',
      name: 'Thunderball'
    },
    prizes: [
      { tier: 'Top Prize', match: '5 + Thunderball', odds: '1 in 8,060,598', prize: '£500,000' },
      { tier: 'Match 5', match: '5 numbers', odds: '1 in 620,046', prize: '£5,000' },
      { tier: 'Match 4 + Thunderball', match: '4 + Thunderball', odds: '1 in 47,415', prize: '£250' },
      { tier: 'Match 4', match: '4 numbers', odds: '1 in 3,647', prize: '£100' },
      { tier: 'Match 3 + Thunderball', match: '3 + Thunderball', odds: '1 in 1,437', prize: '£20' },
      { tier: 'Match 3', match: '3 numbers', odds: '1 in 111', prize: '£10' }
    ],
    colors: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-500',
      accent: 'text-purple-600'
    },
    features: ['Four draws per week', 'Fixed top prize', 'Better odds', 'Quick play'],
    image: '/images/thunderball-card.jpg'
  },
  {
    id: 'set-for-life',
    name: 'Set For Life',
    tagline: 'Win £10,000 every month for 30 years',
    description: 'Set For Life offers a unique prize - £10,000 every month for 30 years. Pick 5 main numbers and 1 Life Ball for your chance to be set for life.',
    howToPlay: [
      'Choose 5 main numbers from 1 to 47',
      'Choose 1 Life Ball from 1 to 10',
      'Or select Lucky Dip for random numbers',
      'Each line costs £1.50',
      'Draws take place twice a week'
    ],
    drawDays: ['Monday', 'Thursday'],
    drawTime: '8:00 PM',
    ticketPrice: 1.5,
    minJackpot: '£10,000/month',
    maxNumbers: 5,
    numberRange: '1-47',
    bonusNumbers: {
      count: 1,
      range: '1-10',
      name: 'Life Ball'
    },
    prizes: [
      { tier: 'Top Prize', match: '5 + Life Ball', odds: '1 in 15,339,390', prize: '£10K/month for 30 years' },
      { tier: 'Match 5', match: '5 numbers', odds: '1 in 1,704,377', prize: '£10K/month for 1 year' },
      { tier: 'Match 4 + Life Ball', match: '4 + Life Ball', odds: '1 in 73,045', prize: '£250' },
      { tier: 'Match 4', match: '4 numbers', odds: '1 in 8,116', prize: '£50' },
      { tier: 'Match 3 + Life Ball', match: '3 + Life Ball', odds: '1 in 1,782', prize: '£30' },
      { tier: 'Match 3', match: '3 numbers', odds: '1 in 198', prize: '£20' }
    ],
    colors: {
      primary: 'bg-green-600',
      secondary: 'bg-green-500',
      accent: 'text-green-600'
    },
    features: ['Monthly payments', 'Life-changing prizes', 'Unique format', 'Better odds than Lotto'],
    image: '/images/set-for-life-card.jpg'
  }
];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};