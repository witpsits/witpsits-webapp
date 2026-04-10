import React, { useState } from "react";
import { Bell, Settings, Search, History, Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const UserLogs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0E1528] text-slate-100 flex overflow-hidden font-['Space_Grotesk',sans-serif]">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        <header className="h-20 border-b border-[#5671FF]/10 bg-[#0E1528]/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg lg:text-xl font-bold tracking-tight">User Logs</h2>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500" 
                placeholder="Search logs..." 
                type="text" 
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="hidden sm:block p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Settings className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="p-4 lg:p-10 flex flex-col flex-1">
          {/* Mobile Search */}
          <div className="relative md:hidden mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              className="bg-white/5 border border-[#5671FF]/20 rounded-xl py-3 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500" 
              placeholder="Search logs..." 
              type="text" 
            />
          </div>

          <div className="flex items-center justify-center flex-1">
            <div className="text-center">
              <History className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">User Logs</h3>
              <p className="text-slate-400">Activity logs interface coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogs;