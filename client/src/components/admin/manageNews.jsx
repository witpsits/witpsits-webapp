import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Settings,
  Plus,
  Search,
  FileText,
  Trash2,
  Eye,
  Loader2,
  Calendar
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../lib/supabaseClient";

const ManageNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // We use 'events' table for news as well
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      setNews(news.filter(n => n.id !== id));
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0E1528] text-slate-100 flex overflow-hidden font-['Space_Grotesk',sans-serif]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-20 border-b border-[#5671FF]/10 bg-[#0E1528]/50 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold tracking-tight">Manage News & Announcements</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search news articles..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Settings className="w-5 h-5" /></button>
            <button
              onClick={() => navigate("/admin/create-news")}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add News Post
            </button>
          </div>
        </header>

        <div className="p-10 flex flex-col flex-1">
          {loading ? (
             <div className="flex flex-col items-center justify-center flex-1 gap-4">
               <Loader2 className="w-12 h-12 text-[#5671FF] animate-spin" />
               <p className="text-slate-400 font-medium">Loading organization updates...</p>
             </div>
          ) : filteredNews.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <FileText className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No News Articles</h3>
                <p className="text-slate-400">Your organization's latest stories will appear here.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                    <th className="px-6 py-4">Article Title</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5">
                      <td className="px-6 py-5">
                         <div className="flex flex-col">
                            <p className="font-bold text-white group-hover:text-[#5671FF] transition-colors">{item.title}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${item.is_published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                           {item.is_published ? 'LIVE' : 'DRAFT'}
                         </span>
                      </td>
                      <td className="px-6 py-5 text-right flex justify-end gap-2">
                         <button className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all" title="Delete" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageNews;
