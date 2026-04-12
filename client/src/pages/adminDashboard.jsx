import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  TrendingUp,
  Eye,
  FileText,
  Edit,
  EyeOff,
  Trash2,
  Loader2,
  Menu
} from "lucide-react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { supabase } from "../lib/supabaseClient";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState([
    { label: "Total Posts", value: "0", icon: FileText, iconBg: "bg-[#5671FF]/10", iconColor: "text-[#5671FF]" },
    { label: "Public Events", value: "0", icon: Eye, iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
    { label: "Drafts", value: "0", icon: FileText, iconBg: "bg-amber-500/10", iconColor: "text-amber-500" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Announcements (Events)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('type', 'announcement')
        .or(`event_date.gte.${todayISO},event_date.is.null`)
        .order('created_at', { ascending: false });
      
      if (eventsError) throw eventsError;
      
      const { count: resCount } = await supabase.from('prospectuses').select('*', { count: 'exact', head: true });

      setAnnouncements(eventsData || []);
      
      // Calculate real stats
      const totalEvents = (eventsData || []).length;
      const published = (eventsData || []).filter(e => e.is_published).length;
      const drafts = totalEvents - published;
      
      setStats([
        { label: "Total Site Posts", value: totalEvents, change: `+${resCount || 0} resources`, icon: FileText, iconBg: "bg-[#5671FF]/10", iconColor: "text-[#5671FF]" },
        { label: "Live Announcements", value: published, subtitle: "Visible on homepage", icon: Eye, iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
        { label: "Pending Drafts", value: drafts, subtitle: "Awaiting publication", icon: FileText, iconBg: "bg-amber-500/10", iconColor: "text-amber-500" },
      ]);

    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) fetchData();
  };

  const togglePublish = async (id, currentStatus) => {
    const { error } = await supabase.from('events').update({ is_published: !currentStatus }).eq('id', id);
    if (!error) fetchData();
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "published") return matchesSearch && a.is_published;
    if (activeTab === "drafts") return matchesSearch && !a.is_published;
    return matchesSearch;
  });

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
            <h2 className="text-lg lg:text-xl font-bold tracking-tight">Admin Console</h2>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Find announcements..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">

            <button
              onClick={() => navigate('/admin/create-announcement')}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-4 lg:px-6 py-2.5 rounded-lg text-xs lg:text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">BroadCast News</span>
              <span className="sm:hidden">Post</span>
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-10 space-y-8">
          {/* Mobile Search - Visible only on mobile */}
          <div className="relative md:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              className="bg-white/5 border border-[#5671FF]/20 rounded-xl py-3 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
              placeholder="Find announcements..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 p-4 lg:p-6 rounded-2xl border border-[#5671FF]/5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-500 text-[10px] lg:text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                  <div className={`p-2 ${stat.iconBg} ${stat.iconColor} rounded-lg`}><stat.icon className="w-4 lg:w-5 h-4 lg:h-5" /></div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold">{stat.value}</h3>
                {stat.change && (
                  <p className="text-green-400 text-xs lg:text-sm mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 lg:w-4 h-3 lg:h-4" />
                    {stat.change}
                  </p>
                )}
                {stat.subtitle && <p className="text-slate-500 text-xs lg:text-sm mt-2">{stat.subtitle}</p>}
              </div>
            ))}
          </div>

          <div className="flex border-b border-[#5671FF]/10 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {["all", "published", "drafts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 lg:px-6 py-3 border-b-2 text-xs lg:text-sm font-bold capitalize transition-all ${
                  activeTab === tab ? "border-[#5671FF] text-[#5671FF]" : "border-transparent text-slate-500 hover:text-white"
                }`}
              >
                {tab === "all" ? "All Activity" : tab}
              </button>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
            {loading ? (
              <div className="flex items-center justify-center p-20">
                <Loader2 className="w-10 h-10 text-[#5671FF] animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                      <th className="px-6 py-4">Title & Context</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Creation Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnnouncements.map((ann) => (
                      <tr key={ann.id} className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5">
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <p className="font-bold text-white group-hover:text-[#5671FF] transition-colors">{ann.title}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{ann.description || "No preview available"}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${ann.is_published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                            {ann.is_published ? 'LIVE' : 'DRAFT'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">
                          {new Date(ann.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-1 lg:gap-2">
                            <button 
                              onClick={() => navigate(`/admin/edit/${ann.id}`)}
                              className="p-2 hover:bg-[#5671FF]/10 text-slate-400 hover:text-[#5671FF] rounded-lg transition-all" 
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => togglePublish(ann.id, ann.is_published)}
                              className="p-2 hover:bg-amber-500/10 text-slate-400 hover:text-amber-500 rounded-lg transition-all" 
                              title={ann.is_published ? "Unpublish" : "Publish"}
                            >
                              {ann.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => handleDelete(ann.id)}
                              className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all" 
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
