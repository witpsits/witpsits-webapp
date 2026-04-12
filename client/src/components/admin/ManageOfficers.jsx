import React, { useEffect, useState } from "react";
import { Plus, Search, Users, Edit, Trash2, X, UploadCloud, ChevronDown, Menu, Calendar, Star } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../lib/supabaseClient";
import imageCompression from 'browser-image-compression';

const ManageOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    position: '', 
    academic_year: '2023-2024',
    rank_level: '3',
    is_current: true
  });
  const [fileToUpload, setFileToUpload] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const { data, error } = await supabase
        .from('officers')
        .select('*')
        .order('academic_year', { ascending: false })
        .order('rank_level', { ascending: true });
        
      if (error) throw error;
      setOfficers(data || []);
    } catch (error) {
      console.error("Error fetching officers:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const uploadAndCompressImage = async (file) => {
    if (!file) return null;
    
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      initialQuality: 0.9
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `officers/${fileName}`;
      
      const { error } = await supabase.storage
        .from('public-assets')
        .upload(filePath, compressedFile);
        
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(filePath);
        
      return publicUrl;
    } catch (error) {
      console.error("Image Upload Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Singular Position Validation (Check within the same academic year)
      let targetId = editingId;
      const singularPositions = ["President", "Vice President"];
      const isSingular = singularPositions.some(p => formData.position.toLowerCase().includes(p.toLowerCase()));
      
      if (isSingular) {
        const existing = officers.find(o => 
          o.academic_year === formData.academic_year && 
          o.position.toLowerCase().includes(formData.position.toLowerCase()) &&
          o.id !== editingId
        );
        
        if (existing) {
          const replace = window.confirm(
            `The position "${formData.position}" for ${formData.academic_year} is already held by "${existing.name}". \n\nDo you want to REPLACE "${existing.name}" with "${formData.name}"?`
          );
          if (replace) {
            targetId = existing.id; // Correctly target the existing person's ID for replacement
          }
        }
      }

      let finalImageUrl = null;
      if (fileToUpload) {
         finalImageUrl = await uploadAndCompressImage(fileToUpload);
      }
      
      const payload = {
        name: formData.name,
        position: formData.position,
        academic_year: formData.academic_year,
        rank_level: parseInt(formData.rank_level),
        is_current: formData.is_current,
        ...(finalImageUrl && { image_url: finalImageUrl })
      };

      if (targetId) {
        const { error } = await supabase.from('officers').update(payload).eq('id', targetId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('officers').insert([payload]);
        if (error) throw error;
      }
      
      handleCloseModal();
      fetchOfficers();
      
    } catch (error) {
      console.error("Error saving officer:", error.message);
      alert("Failed to save: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (officer) => {
    setEditingId(officer.id);
    setFormData({ 
      name: officer.name, 
      position: officer.position,
      academic_year: officer.academic_year,
      rank_level: officer.rank_level.toString(),
      is_current: officer.is_current
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', position: '', academic_year: '2023-2024', rank_level: '3', is_current: true });
    setFileToUpload(null);
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this officer record?")) return;
    try {
      const { error } = await supabase.from('officers').delete().eq('id', id);
      if (error) throw error;
      fetchOfficers();
    } catch (error) {
      console.error("Error deleting:", error.message);
    }
  }

  const filtered = officers.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0E1528] text-slate-100 flex overflow-hidden font-['Space_Grotesk',sans-serif]">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        <header className="h-20 border-b border-[#5671FF]/10 bg-[#0E1528]/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4 lg:gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg lg:text-xl font-bold tracking-tight">PSITS Officers</h2>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search officers..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-4 lg:px-6 py-2.5 rounded-lg text-xs lg:text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Officer</span>
            </button>
          </div>
        </header>

        {/* Modal Overlay */}
        {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-[#1a2238] border border-[#5671FF]/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto relative">
                 <div className="flex items-center justify-between p-6 border-b border-[#5671FF]/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                    <h3 className="text-xl font-bold">{editingId ? 'Edit Officer' : 'Register New Officer'}</h3>
                    <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                 </div>
                 <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    <div className="space-y-4">
                       <label className="text-sm font-bold text-slate-300">Profile Image</label>
                       <div className="relative border-2 border-dashed border-[#5671FF]/30 hover:border-[#5671FF]/60 rounded-xl p-6 bg-[#0E1528] text-center cursor-pointer">
                          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                           <div className="flex flex-col items-center gap-2 text-slate-400">
                             <UploadCloud className="w-8 h-8" />
                             {fileToUpload ? <span className="text-sm text-[#5671FF] font-bold">{fileToUpload.name}</span> : <span className="text-sm">Click to upload image</span>}
                           </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Full Name</label>
                       <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none" placeholder="e.g. Jane Doe" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Position</label>
                       <input required type="text" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none" placeholder="e.g. President" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-300">Academic Year</label>
                          <input required type="text" value={formData.academic_year} onChange={(e) => setFormData({...formData, academic_year: e.target.value})} className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none" placeholder="2023-2024" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-300">Hierarchy Rank</label>
                          <select value={formData.rank_level} onChange={(e) => setFormData({...formData, rank_level: e.target.value})} className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none appearance-none">
                            <option value="1">Rank 1 (President)</option>
                            <option value="2">Rank 2 (Vice President)</option>
                            <option value="3">Rank 3 (Board Member)</option>
                            <option value="4">Rank 4 (Representative)</option>
                          </select>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                       <input type="checkbox" checked={formData.is_current} onChange={(e) => setFormData({...formData, is_current: e.target.checked})} className="w-5 h-5 accent-[#5671FF]" />
                       <span className="text-sm font-medium text-slate-300">Set as Current Officer</span>
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-3">
                       <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 text-slate-400 font-bold">Cancel</button>
                       <button type="submit" disabled={submitting} className="px-8 py-2.5 bg-[#FF602D] text-white rounded-lg font-bold disabled:opacity-50">
                          {submitting ? 'Saving...' : editingId ? 'Update' : 'Register'}
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        )}

        <div className="p-4 lg:p-10 flex flex-col flex-1">
          {loading ? (
             <p className="text-[#5671FF] font-bold animate-pulse text-center py-20">Refreshing database...</p>
          ) : filtered.length === 0 ? (
             <div className="text-center py-20 opacity-50"><Users className="mx-auto w-12 h-12 mb-4" /><p>No officers registered yet.</p></div>
          ) : (
             <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <tr>
                         <th className="p-6">Officer Name</th>
                         <th className="p-6">Position / Rank</th>
                         <th className="p-6">Academic Year</th>
                         <th className="p-6 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filtered.map(o => (
                         <tr key={o.id} className="border-t border-white/5 hover:bg-[#5671FF]/5 transition-colors group">
                            <td className="p-6">
                               <div className="flex items-center gap-4">
                                  <img src={o.image_url || 'https://via.placeholder.com/100'} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                  <div className="flex flex-col">
                                     <span className="font-bold text-white group-hover:text-[#5671FF] tracking-tight">{o.name}</span>
                                     {o.is_current && <span className="text-[9px] font-black text-[#5671FF] uppercase leading-none">Actively Serving</span>}
                                  </div>
                               </div>
                            </td>
                            <td className="p-6">
                               <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-slate-200">{o.position}</span>
                                  <span className="text-[10px] text-slate-500">Rank Level {o.rank_level}</span>
                               </div>
                            </td>
                            <td className="p-6">
                               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold">{o.academic_year}</span>
                            </td>
                            <td className="p-6 text-right">
                               <div className="flex justify-end gap-2">
                                  <button onClick={() => handleEditClick(o)} className="p-2 hover:bg-[#5671FF]/10 text-slate-500 hover:text-[#5671FF] rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                                  <button onClick={() => handleDelete(o.id)} className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                               </div>
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

export default ManageOfficers;
