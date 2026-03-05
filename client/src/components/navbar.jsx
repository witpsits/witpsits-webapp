import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Prospectus", path: "/prospectus" },
    { name: "Org Chart", path: "/org-chart" },
    { name: "Showcase", path: "/showcase" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-[#0E1528] border-b border-[#5671FF]/20 shadow-2xl">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-14 md:w-14 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] ring-1 ring-[#5671FF]/30 transition-all group flex-shrink-0">
              <img
                src="/assets/PSITS_logo.png"
                alt="PSITS Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-bold leading-none tracking-tight text-slate-100 uppercase whitespace-nowrap">
                PSITS <span className="text-[#5671FF]">WIT</span>
              </h1>
              <span className="hidden xs:block text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-wider sm:tracking-widest text-[#5671FF]/70 leading-tight">
                Philippine Society of IT Students
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all hover:text-[#5671FF] relative group ${location.pathname === link.path
                  ? "text-[#5671FF]"
                  : "text-slate-300"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#5671FF] transition-all duration-300 ${location.pathname === link.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-shrink-0">
            {/* Search - Hidden on small mobile */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5671FF]/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-32 md:w-48 lg:w-64 rounded-lg border-none bg-[#1a2238] pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#5671FF]/50 transition-all"
              />
            </div>

            {/* Login Button - Hidden on mobile, visible on tablet+ */}
            <Link
              to="/login"
              className="hidden md:flex h-10 items-center justify-center rounded-lg bg-[#FF602D] px-4 lg:px-6 text-sm font-bold text-white transition-all hover:bg-[#FF602D]/90 hover:shadow-[0_0_20px_rgba(255,96,45,0.4)] active:scale-95 whitespace-nowrap"
            >
              Login
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex lg:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] ring-1 ring-[#5671FF]/30 transition-all hover:bg-[#5671FF]/20 active:scale-90 flex-shrink-0"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-[#0E1528]/40 backdrop-blur-md transition-all duration-300 lg:hidden ${isMenuOpen
          ? "opacity-100 z-[110]"
          : "opacity-0 pointer-events-none invisible"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-[90%] xs:w-[85%] max-w-[320px] bg-[#1a2238]/90 backdrop-blur-xl border-l border-[#5671FF]/20 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${isMenuOpen ? "translate-x-0 z-[120]" : "translate-x-full invisible"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#5671FF]/10 bg-[#1a2238]">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] ring-1 ring-[#5671FF]/30 flex-shrink-0">
                <img
                  src="/assets/PSITS_logo.png"
                  alt="PSITS Logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-slate-100">
                Menu
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[#5671FF] hover:bg-[#5671FF]/10 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-4 sm:p-6">
            {/* Search in Mobile Menu */}
            <div className="relative mb-4 sm:mb-6 md:hidden">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/60 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search information..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 sm:h-11 w-full rounded-xl border-none bg-[#0E1528] pl-10 sm:pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#5671FF]/50"
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl transition-all text-sm sm:text-base ${location.pathname === link.path
                    ? "bg-[#5671FF] text-white shadow-[0_0_20px_rgba(86,113,255,0.3)] font-bold"
                    : "text-slate-300 hover:bg-[#5671FF]/10 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 sm:p-5 border-t border-[#5671FF]/10 bg-[#0E1528]/30">
            <Link
              to="/login"
              className="flex h-11 sm:h-12 w-full items-center justify-center rounded-xl bg-[#FF602D] text-sm font-bold text-white shadow-lg transition-all hover:bg-[#FF602D]/90 active:scale-95"
              onClick={() => setIsMenuOpen(false)}
            >
              Log-in
            </Link>
            <p className="mt-2.5 sm:mt-3 text-center text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              PSITS WIT Chapter &copy; 2024
            </p>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
