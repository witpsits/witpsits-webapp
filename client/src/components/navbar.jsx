import React, { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0E1528]/80 border-b border-[#5671FF]/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] ring-1 ring-[#5671FF]/30">
              <img
                src="/assets/PSITS_logo.png"
                alt="PSITS Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold leading-none tracking-tight text-slate-100">
                PSITS <span className="text-[#5671FF]">WIT</span>
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-[#5671FF]/70">
                Philippine Society of <br />
                Information Technology Students
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-[#5671FF]"
            >
              Home
            </Link>
            <Link
              to="/prospectus"
              className="text-sm font-medium transition-colors hover:text-[#5671FF]"
            >
              Prospectus
            </Link>
            <Link
              to="#"
              className="text-sm font-medium transition-colors hover:text-[#5671FF]"
            >
              News
            </Link>
            <Link
              to="/org-chart"
              className="text-sm font-medium transition-colors hover:text-[#5671FF]"
            >
              Org Chart
            </Link>
            <Link
              to="/showcase"
              className="text-sm font-medium transition-colors hover:text-[#5671FF]"
            >
              Showcase
            </Link>
            <Link
              to="/faq"
              className="text-sm font-medium transition-colors hover:text-[#5671FF]"
            >
              FAQ
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5671FF]/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-48 lg:w-64 rounded-lg border-none bg-[#1a2238] pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#5671FF]/50"
              />
            </div>
            <button className="flex h-10 items-center justify-center rounded-lg bg-[#FF602D] px-6 text-sm font-bold text-white transition-all hover:bg-[#FF602D]/90 hover:shadow-[0_0_20px_rgba(255,96,45,0.4)]">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;