import React from "react";
import { Link } from "react-router-dom";
import { Bell, Settings, Search, FileText, ChevronLeft, BarChart3, History } from "lucide-react";

const UserLogs = () => {
  return (
    <div className="min-h-screen bg-[#0E1528] text-slate-100 flex overflow-hidden font-['Space_Grotesk',sans-serif]">
      <aside className="w-72 bg-[#0E1528] border-r border-[#5671FF]/20 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#5671FF]/10 rounded-full p-2 ring-1 ring-[#5671FF]/30">
              <img src="/assets/PSITS_logo.png" alt="PSITS Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-tight">PSITS-WIT</h1>
              <p className="text-[#5671FF]/60 text-xs font-medium">Super Admin</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] transition-all">
              <Bell className="w-5 h-5" />
              <p className="text-sm font-medium">Manage Announcements</p>
            </Link>
            <Link to="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] transition-all">
              <FileText className="w-5 h-5" />
              <p className="text-sm font-medium">Manage News</p>
            </Link>
            <Link to="/admin/resources" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] transition-all">
              <FileText className="w-5 h-5" />
              <p className="text-sm font-medium">Academic Resources</p>
            </Link>
            <Link to="/admin/logs" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/20">
              <History className="w-5 h-5" />
              <p className="text-sm font-semibold">User Logs</p>
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-[#5671FF]/5 rounded-xl border border-[#5671FF]/10">
            <div className="h-10 w-10 rounded-full bg-[#5671FF]/20 flex items-center justify-center text-[#5671FF] font-bold">JD</div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-xs font-bold truncate">John Doe</p>
              <p className="text-[10px] text-slate-500">admin@wit.edu.ph</p>
            </div>
          </div>
          <button className="w-full bg-slate-800 text-slate-200 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-20 border-b border-[#5671FF]/10 bg-[#0E1528]/50 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold tracking-tight">User Logs</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500" placeholder="Search logs..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Settings className="w-5 h-5" /></button>
          </div>
        </header>
        <div className="p-10 flex items-center justify-center flex-1">
          <div className="text-center">
            <History className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">User Logs</h3>
            <p className="text-slate-400">Activity logs interface coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogs;