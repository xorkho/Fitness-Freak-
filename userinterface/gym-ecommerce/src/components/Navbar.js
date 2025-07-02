import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaDumbbell,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();

  const isStorePage = location.pathname === "/store";

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/schedule", label: "Schedule", icon: FaCalendarAlt },
    { path: "/about", label: "About", icon: FaInfoCircle },
  ];

  const isActivePage = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-yellow-400 shadow-2xl fixed w-full z-50 backdrop-blur-md border-b border-yellow-400/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-400/10 rounded-xl border border-yellow-400/30">
              <FaDumbbell className="text-yellow-400 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Fitness Freak
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Right: Navigation Links + Cart + Menu */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? "bg-yellow-400/20 text-yellow-300 shadow-lg shadow-yellow-400/25"
                        : "hover:bg-yellow-400/10 hover:text-yellow-300"
                    }`}
                  >
                    <Icon
                      className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? "text-yellow-300" : ""
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Cart + Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              {isStorePage && (
                <button
                  className="relative p-3 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group"
                  onClick={() => setIsCartOpen(true)}
                >
                  <FaShoppingCart className="text-yellow-400 text-xl group-hover:scale-110 transition-transform duration-300" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-yellow-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-3 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-xl border border-yellow-400/30 transition-all duration-300 focus:outline-none group"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <FaTimes className="text-yellow-400 text-xl group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <FaBars className="text-yellow-400 text-xl group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md transform transition-all duration-500 ease-in-out ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ top: "72px" }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 text-yellow-300 shadow-lg"
                        : "hover:bg-yellow-400/10 hover:text-yellow-300"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: menuOpen
                        ? "slideInFromLeft 0.6s ease-out forwards"
                        : "none",
                    }}
                  >
                    <div
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-yellow-400/20 border border-yellow-400/40"
                          : "bg-yellow-400/10 group-hover:bg-yellow-400/20"
                      }`}
                    >
                      <Icon className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <span className="text-lg font-semibold block">
                        {item.label}
                      </span>
                      <div
                        className={`h-0.5 bg-gradient-to-r from-yellow-400 to-transparent rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-1/2"
                        }`}
                      ></div>
                    </div>
                    {isActive && (
                      <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Cart Button */}
            {isStorePage && (
              <div className="mt-8 pt-8 border-t border-yellow-400/20">
                <button
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 rounded-2xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group"
                  onClick={() => {
                    setIsCartOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  <FaShoppingCart className="text-yellow-400 text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-yellow-400 font-semibold">View Cart</span>
                  {cartItems.length > 0 && (
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
