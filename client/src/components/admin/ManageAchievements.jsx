import React, { useEffect, useState } from "react";
import { Plus, Search, Trophy, Edit, Trash2, X, UploadCloud, Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../lib/supabaseClient";
import imageCompression from 'browser-image-compression';

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievementId, setEditingAchievementId] = useState(null);
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', date_achieved: '', category: '' });
  const [fileToUpload, setFileToUpload] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error.message);
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
      maxSizeMB: 1, 
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.9
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `achievements/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('public-assets')
        .upload(filePath, compressedFile);
        
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(filePath);
        
      return publicUrl;
      
    } catch (error) {
      console.error("Image Compression/Upload Error:", error);
      throw error;
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let finalImageUrl = null;
      if (fileToUpload) {
         finalImageUrl = await uploadAndCompressImage(fileToUpload);
      }
      
      const achievementData = {
        title: newAchievement.title,
        description: newAchievement.description,
        date_achieved: newAchievement.date_achieved ? new Date(newAchievement.date_achieved).toISOString() : null,
        category: newAchievement.category || 'Others',
        ...(finalImageUrl && { image_url: finalImageUrl })
      };

      if (editingAchievementId) {
        const { error: updateError } = await supabase.from('achievements').update(achievementData).eq('id', editingAchievementId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('achievements').insert([achievementData]);
        if (insertError) throw insertError;
      }
      
      setIsModalOpen(false);
      setEditingAchievementId(null);
      setNewAchievement({ title: '', description: '', date_achieved: '' });
      setFileToUpload(null);
      fetchAchievements();
      
    } catch (error) {
      console.error("Error inserting achievement:", error.message);
      alert("Failed to save achievement: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (achievement) => {
    setEditingAchievementId(achievement.id);
    setNewAchievement({ 
      title: achievement.title, 
      description: achievement.description || '', 
      date_achieved: achievement.date_achieved ? new Date(achievement.date_achieved).toISOString().split('T')[0] : '',
      category: achievement.category || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAchievementId(null);
    setNewAchievement({ title: '', description: '', date_achieved: '', category: '' });
    setFileToUpload(null);
  }

  const handleDeleteAchievement = async (id) => {
    if(!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) throw error;
      fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error.message);
    }
  }

  const filteredAchievements = achievements.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-lg lg:text-xl font-bold tracking-tight">Manage Achievements</h2>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search achievements..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => {
                setEditingAchievementId(null);
                setNewAchievement({ title: '', description: '', date_achieved: '', category: '' });
                setIsModalOpen(true);
              }}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-4 lg:px-6 py-2.5 rounded-lg text-xs lg:text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Achievement</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        {/* Modal Overlay */}
        {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-[#1a2238] border border-[#5671FF]/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto relative">
                 <div className="flex items-center justify-between p-6 border-b border-[#5671FF]/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                    <h3 className="text-xl font-bold">{editingAchievementId ? 'Edit Achievement' : 'Log Event Achievement'}</h3>
                    <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                 </div>
                 <form onSubmit={handleAddAchievement} className="p-6 space-y-5">
                    
                    {/* File Upload Section */}
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Award Image (Auto-Compressed)</label>
                       <div className="relative border-2 border-dashed border-[#5671FF]/30 hover:border-[#5671FF]/60 rounded-xl p-6 transition-colors bg-[#0E1528] text-center cursor-pointer">
                          <input 
                             type="file" 
                             accept="image/*"
                             onChange={handleFileChange}
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {fileToUpload ? (
                             <div className="flex flex-col items-center gap-2 text-[#5671FF]">
                                <Trophy className="w-8 h-8" />
                                <span className="text-sm font-bold truncate max-w-full px-4">{fileToUpload.name}</span>
                                <span className="text-xs text-slate-400">Ready to compress and upload</span>
                             </div>
                          ) : (
                             <div className="flex flex-col items-center gap-2 text-slate-400">
                                <UploadCloud className="w-8 h-8" />
                                <span className="text-sm font-medium">Click or drag image here</span>
                                <span className="text-xs opacity-60">JPG, PNG, WEBP (Max 5MB)</span>
                             </div>
                          )}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Title / Award</label>
                       <input 
                         required
                         type="text" 
                         value={newAchievement.title}
                         onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors" 
                         placeholder="e.g. 1st Place Hackathon"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Description</label>
                       <textarea 
                         value={newAchievement.description}
                         onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none h-24 resize-none transition-colors" 
                         placeholder="Short description of the achievement..."
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Date Achieved</label>
                       <input 
                         required
                         type="date" 
                         value={newAchievement.date_achieved}
                         onChange={(e) => setNewAchievement({...newAchievement, date_achieved: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none [color-scheme:dark] transition-colors" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Category</label>
                       <div className="relative">
                          <input 
                            list="category-suggestions"
                            value={newAchievement.category}
                            onChange={(e) => setNewAchievement({...newAchievement, category: e.target.value})}
                            className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors" 
                            placeholder="e.g. Competitions, Projects, Certifications"
                          />
                          <datalist id="category-suggestions">
                             {[...new Set(achievements.map(a => a.category).filter(Boolean))].map(cat => (
                                <option key={cat} value={cat} />
                             ))}
                             {!achievements.some(a => a.category === "Competitions") && <option value="Competitions" />}
                             {!achievements.some(a => a.category === "Projects") && <option value="Projects" />}
                             {!achievements.some(a => a.category === "Certifications") && <option value="Certifications" />}
                          </datalist>
                       </div>
                       <p className="text-[10px] text-slate-500">Pick an existing category or type a new one.</p>
                    </div>
                    <div className="pt-4 border-t border-[#5671FF]/10 flex justify-end gap-3 pb-2">
                       <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:bg-white/5 transition-colors">Cancel</button>
                       <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#FF602D] text-white hover:bg-[#FF602D]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                         {submitting ? (
                           <>
                             <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                             Processing...
                           </>
                         ) : editingAchievementId ? 'Update Achievement' : 'Save Achievement'}
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        )}

        <div className="p-4 lg:p-10 flex flex-col flex-1">
          {/* Mobile Search */}
          <div className="relative md:hidden mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              className="bg-white/5 border border-[#5671FF]/20 rounded-xl py-3 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
              placeholder="Search achievements..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center flex-1">
               <p className="text-[#5671FF] font-bold animate-pulse">Loading achievements...</p>
            </div>
          ) : filteredAchievements.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No Achievements Yet</h3>
                <p className="text-slate-400">Click the 'Add Achievement' button to showcase student and faculty victories.</p>
              </div>
            </div>
          ) : (
             <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
               <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                      <th className="px-6 py-4">Title / Award</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAchievements.map((item) => (
                      <tr key={item.id} className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5">
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-3">
                              {item.image_url ? (
                                 <img src={item.image_url} alt="Award" className="w-10 h-10 rounded border border-[#5671FF]/30 object-cover" />
                              ) : (
                                 <div className="w-10 h-10 rounded bg-[#5671FF]/10 border border-[#5671FF]/30 flex items-center justify-center">
                                    <Trophy className="w-4 h-4 text-[#5671FF]/50" />
                                 </div>
                              )}
                              <p className="font-bold text-white group-hover:text-[#5671FF] transition-colors">{item.title}</p>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className="px-2 py-1 rounded bg-[#5671FF]/10 text-[#5671FF] text-[10px] font-bold uppercase border border-[#5671FF]/20">
                             {item.category || 'Uncategorized'}
                           </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-400 max-w-md truncate">
                           {item.description || 'No description provided.'}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-300">
                           {item.date_achieved ? new Date(item.date_achieved).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex justify-end gap-2 items-center">
                             <button 
                               onClick={() => handleEditClick(item)}
                               className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 rounded-lg transition-all" 
                               title="Edit"
                             >
                                <Edit className="w-4 h-4" />
                             </button>
                             <button onClick={() => handleDeleteAchievement(item.id)} className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all" title="Delete">
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

export default ManageAchievements;
