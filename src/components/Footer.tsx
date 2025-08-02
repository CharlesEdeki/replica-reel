import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const gameLinks = [
    { name: "Lotto", path: "/games/lotto" },
    { name: "EuroMillions", path: "/games/euromillions" },
    { name: "Set For Life", path: "/games/set-for-life" },
    { name: "Thunderball", path: "/games/thunderball" },
    { name: "Instant Win Games", path: "/games/instant-win" },
    { name: "All Games", path: "/games" }
  ];

  const helpLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "Help & FAQs", path: "/help" },
    { name: "How to Play", path: "/how-to-play" },
    { name: "Check My Numbers", path: "/check-numbers" },
    { name: "Results", path: "/results" },
    { name: "Where to Buy", path: "/retailers" }
  ];

  const aboutLinks = [
    { name: "About Us", path: "/about" },
    { name: "Good Causes", path: "/good-causes" },
    { name: "News", path: "/news" },
    { name: "Winners", path: "/winners" },
    { name: "Careers", path: "/careers" },
    { name: "Media Centre", path: "/media" }
  ];

  const legalLinks = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Responsible Gaming", path: "/responsible-gaming" },
    { name: "Complaints", path: "/complaints" },
    { name: "Accessibility", path: "/accessibility" }
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700 text-white">
      {/* Responsible Gaming Banner */}
      <div className="bg-red-600 py-3">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold">
            🚫 You must be 18 or over to play any National Lottery game and to buy scratchcards.
          </p>
          <p className="text-xs mt-1">
            Play responsibly. <a href="/responsible-gaming" className="underline hover:text-yellow-300">Learn more about responsible gaming</a>
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Games Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Games</h3>
            <ul className="space-y-2">
              {gameLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className="text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Help & Support</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className="text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">About</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className="text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Apps Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Legal & Apps</h3>
            <ul className="space-y-2 mb-4">
              {legalLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className="text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Mobile App Downloads */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-yellow-400">Download our app:</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="#" 
                  className="inline-block bg-black rounded-lg px-3 py-2 text-xs hover:bg-gray-800 transition-colors"
                >
                  📱 App Store
                </a>
                <a 
                  href="#" 
                  className="inline-block bg-black rounded-lg px-3 py-2 text-xs hover:bg-gray-800 transition-colors"
                >
                  🤖 Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Additional Legal Links */}
        <div className="border-t border-blue-600 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-yellow-300 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Additional Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-4 text-xs">
              {legalLinks.slice(3).map((link, index) => (
                <a 
                  key={link.name}
                  href={link.path} 
                  className="hover:text-yellow-300 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-600 pt-6 mt-6 text-center">
          <p className="text-xs text-blue-200">
            © 2025 Replica National Lottery. All rights reserved. Licensed and regulated by the Gambling Commission under licence 000-000000-N-000000-000.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            It is illegal for anyone under the age of 18 to open an account or to gamble on the National Lottery website.
          </p>
        </div>
      </div>

      {/* Gambling Commission Logo Area */}
      <div className="bg-indigo-950 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center space-x-4 text-xs text-blue-200">
            <span>🛡️ Licensed by Gambling Commission</span>
            <span>•</span>
            <span>🔒 Secure & Protected</span>
            <span>•</span>
            <span>🎯 Responsible Gaming</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;