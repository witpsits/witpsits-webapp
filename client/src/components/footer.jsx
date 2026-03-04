import React from "react";
import { Facebook, Instagram, Mail, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-[#5671FF]/10 bg-[#1a2238]/50 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
              <img
                src="/assets/PSITS_logo.png"
                alt="PSITS Logo"
                className="w-12 h-12 object-contain"
              />
            <span className="text-lg font-bold text-slate-100">PSITS WIT</span>
          </div>
          <p className="max-w-xs text-sm text-slate-500 leading-relaxed">
            The official student organization portal for Western Institute of
            Technology - Information Technology students.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] hover:bg-[#5671FF] hover:text-white transition-colors"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] hover:bg-[#5671FF] hover:text-white transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5671FF]/10 text-[#5671FF] hover:bg-[#5671FF] hover:text-white transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#5671FF]">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-slate-400">
              <a href="#" className="hover:text-[#5671FF]">
                News
              </a>
              <a href="#" className="hover:text-[#5671FF]">
                Org Chart
              </a>
              <a href="#" className="hover:text-[#5671FF]">
                Resources
              </a>
              <a href="/showcase" className="hover:text-[#5671FF]">
                Showcase
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#5671FF]">
              Resources
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-slate-400">
              <a href="#" className="hover:text-[#5671FF]">
                Study Guides
              </a>
              <a href="#" className="hover:text-[#5671FF]">
                Event Photos
              </a>
              <a href="#" className="hover:text-[#5671FF]">
                Tutorials
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#5671FF]">
              Legal
            </h4>
            <nav className="flex flex-col gap-2 text-sm text-slate-400">
              <a href="#" className="hover:text-[#5671FF]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#5671FF]">
                Terms of Use
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
        © 2024 Philippine Society of Information Technology Students - WIT
        Chapter. All digital rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
