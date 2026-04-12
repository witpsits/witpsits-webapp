import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  FileText,
  BookOpen,
  Trash2,
  ExternalLink,
  Loader2,
  Menu,
  Edit
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../lib/supabaseClient";

const AcademicResources = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('prospectuses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      const { error } = await supabase.from('prospectuses').delete().eq('id', id);
      if (error) throw error;
      setResources(resources.filter(r => r.id !== id));
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  const filteredResources = resources.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h2 className="text-lg lg:text-xl font-bold tracking-tight">
              Academic Resources
            </h2>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search resources..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => navigate("/admin/create-resource")}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-4 lg:px-6 py-2.5 rounded-lg text-xs lg:text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Resource</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-10 flex flex-col flex-1">
          {/* Mobile Search */}
          <div className="relative md:hidden mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              className="bg-white/5 border border-[#5671FF]/20 rounded-xl py-3 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
              placeholder="Search resources..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center flex-1 gap-4">
                <Loader2 className="w-12 h-12 text-[#5671FF] animate-spin" />
                <p className="text-slate-400 font-medium tracking-wide">Syncing resources...</p>
             </div>
          ) : filteredResources.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No Resources Found</h3>
                <p className="text-slate-400">
                  Click "Add Resource" to upload documents to the prospectus.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Format</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((res) => (
                      <tr key={res.id} className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#5671FF]/50" />
                            <p className="font-bold text-white group-hover:text-[#5671FF] transition-colors">{res.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold border border-[#5671FF]/20 bg-[#5671FF]/5 text-[#5671FF]">
                            {res.category}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm font-mono text-slate-500 uppercase">
                          {res.format}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-1 lg:gap-2">
                            <button 
                              onClick={() => navigate(`/admin/edit/${res.id}`)}
                              className="p-2 hover:bg-[#5671FF]/10 text-slate-400 hover:text-[#5671FF] rounded-lg transition-all" 
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <a 
                              href={res.file_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 rounded-lg transition-all"
                              title="View File"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button 
                              onClick={() => handleDelete(res.id)}
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AcademicResources;
