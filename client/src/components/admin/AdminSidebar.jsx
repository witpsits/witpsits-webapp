import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, FileText, ChevronLeft, Users, Calendar, Award, BookOpen, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/", { replace: true });
    await supabase.auth.signOut();
  };

  const navLinks = [
    { name: "Manage Announcements", path: "/admin", icon: Bell },
    { name: "Manage News", path: "/admin/news", icon: FileText },
    { name: "Academic Resources", path: "/admin/resources", icon: FileText },
    { name: "Manage Org Chart", path: "/admin/org-chart", icon: Users },
    { name: "Manage PSITS Officers", path: "/admin/officers", icon: Users },
    { name: "Manage Events", path: "/admin/events", icon: Calendar },
    { name: "Manage Achievements", path: "/admin/achievements", icon: Award },
    { name: "Manage Prospectus", path: "/admin/prospectus", icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed lg:static top-0 left-0 z-50 w-72 bg-[#0E1528] border-r border-[#5671FF]/20 flex flex-col justify-between p-6 h-screen overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#5671FF]/10 rounded-full p-2 ring-1 ring-[#5671FF]/30">
                <img src="/assets/PSITS_logo.png" alt="PSITS Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-white text-base font-bold leading-tight">PSITS-WIT</h1>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/20 font-semibold"
                      : "text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] font-medium"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <p className="text-sm">{link.name}</p>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-3 p-3 bg-[#5671FF]/5 rounded-xl border border-[#5671FF]/10">
            <div className="h-10 w-10 rounded-full bg-[#5671FF]/20 flex items-center justify-center text-[#5671FF] font-bold">AD</div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-xs font-bold truncate">Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 text-slate-200 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
