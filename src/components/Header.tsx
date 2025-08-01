import React, { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Games", path: "/games" },
  { name: "Results", path: "/results" },
  { name: "Winners", path: "#" },
  { name: "Help", path: "#" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Lottery Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-white drop-shadow">
            Replica Lottery
          </span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-white hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {/* Actions */}
        <div className="space-x-2 hidden md:block">
          <button className="px-4 py-1 rounded bg-yellow-400 text-indigo-900 font-semibold hover:bg-yellow-300 transition shadow">
            Login
          </button>
          <button className="px-4 py-1 rounded bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition shadow">
            Register
          </button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-2 py-1 border rounded text-white border-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="currentColor">
            <rect y="6" width="24" height="2" rx="1" />
            <rect y="12" width="24" height="2" rx="1" />
            <rect y="18" width="24" height="2" rx="1" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 border-t">
          <div className="px-4 py-2 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:text-yellow-300 font-medium transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="px-4 py-1 rounded bg-yellow-400 text-indigo-900 font-semibold hover:bg-yellow-300 transition shadow">
              Login
            </button>
            <button className="px-4 py-1 rounded bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition shadow">
              Register
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;