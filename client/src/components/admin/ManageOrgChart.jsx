import React, { useEffect, useState } from "react";
import { Bell, Settings, Plus, Search, Users, Edit, Trash2, X, UploadCloud, ChevronDown } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../lib/supabaseClient";
import imageCompression from 'browser-image-compression';

const ManageOrgChart = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: 'Faculty' });
  const [fileToUpload, setFileToUpload] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase.from('org_chart').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching members:", error.message);
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
      maxWidthOrHeight: 1280,
      useWebWorker: true
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `faculties/${fileName}`;
      
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

  const handleAddMember = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let finalImageUrl = null;
      if (fileToUpload) {
         finalImageUrl = await uploadAndCompressImage(fileToUpload);
      }
      
      const { error } = await supabase.from('org_chart').insert([
        { 
          name: newMember.name, 
          role: newMember.role,
          image_url: finalImageUrl 
        }
      ]);
      
      if (error) throw error;
      
      setIsModalOpen(false);
      setNewMember({ name: '', role: 'Faculty' });
      setFileToUpload(null);
      fetchMembers();
      
    } catch (error) {
      console.error("Error inserting member:", error.message);
      alert("Failed to save member: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if(!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const { error } = await supabase.from('org_chart').delete().eq('id', id);
      if (error) throw error;
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#0E1528] text-slate-100 flex overflow-hidden font-['Space_Grotesk',sans-serif]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        <header className="h-20 border-b border-[#5671FF]/10 bg-[#0E1528]/50 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold tracking-tight">Manage Org Chart</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search members..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Settings className="w-5 h-5" /></button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        </header>

        {/* Modal Overlay */}
        {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-[#1a2238] border border-[#5671FF]/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                 <div className="flex items-center justify-between p-6 border-b border-[#5671FF]/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                    <h3 className="text-xl font-bold">Add Team Member</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                 </div>
                 <form onSubmit={handleAddMember} className="p-6 space-y-5">
                    
                    {/* File Upload Section */}
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Profile Image (Auto-Compressed)</label>
                       <div className="relative border-2 border-dashed border-[#5671FF]/30 hover:border-[#5671FF]/60 rounded-xl p-6 transition-colors bg-[#0E1528] text-center cursor-pointer">
                          <input 
                             type="file" 
                             accept="image/*"
                             onChange={handleFileChange}
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {fileToUpload ? (
                             <div className="flex flex-col items-center gap-2 text-[#5671FF]">
                                <Users className="w-8 h-8" />
                                <span className="text-sm font-bold truncate max-w-full px-4">{fileToUpload.name}</span>
                                <span className="text-xs text-slate-400">Ready to upload</span>
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
                       <label className="text-sm font-bold text-slate-300">Full Name</label>
                       <input 
                         required
                         type="text" 
                         value={newMember.name}
                         onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors" 
                         placeholder="e.g. John Doe"
                       />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Office Role</label>
                       <div className="relative">
                         <select 
                           value={newMember.role}
                           onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                           className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors appearance-none cursor-pointer"
                         >
                           <option value="Program Head">Program Head</option>
                           <option value="IT Custodian">IT Custodian</option>
                           <option value="IT Clerk">IT Clerk</option>
                           <option value="Faculty">Faculty (Standard)</option>
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                       </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#5671FF]/10 flex justify-end gap-3 pb-2">
                       <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:bg-white/5 transition-colors">Cancel</button>
                       <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#FF602D] text-white hover:bg-[#FF602D]/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                         {submitting ? (
                           <>
                             <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                             Processing...
                           </>
                         ) : 'Save Member'}
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        )}

        <div className="p-10 flex flex-col flex-1">
          {loading ? (
            <div className="flex items-center justify-center flex-1">
               <p className="text-[#5671FF] font-bold animate-pulse">Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <Users className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No Members Found</h3>
                <p className="text-slate-400">Click the 'Add Member' button to start building the organization chart.</p>
              </div>
            </div>
          ) : (
             <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5">
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                            <img src={member.image_url || 'https://via.placeholder.com/40'} alt="Avatar" className="w-10 h-10 rounded-full border border-[#5671FF]/30 object-cover" />
                            <p className="font-bold text-white group-hover:text-[#5671FF] transition-colors">{member.name}</p>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-300">
                         {member.role}
                      </td>
                      <td className="px-6 py-5 text-right flex justify-end gap-2 items-center h-[81px]">
                         <button className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 rounded-lg transition-all" title="Edit">
                            <Edit className="w-4 h-4" />
                         </button>
                         <button onClick={() => handleDeleteMember(member.id)} className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all" title="Delete">
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

export default ManageOrgChart;
