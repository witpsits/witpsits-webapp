import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Bell, Settings, Plus, Search, Calendar, Edit, Trash2, X, UploadCloud, Image as ImageIcon, Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../../lib/supabaseClient";
import imageCompression from 'browser-image-compression';

const ManageEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', event_date: '', is_published: true });
  const [fileToUpload, setFileToUpload] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('type', 'event')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error.message);
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
      maxWidthOrHeight: 2560,
      useWebWorker: true,
      initialQuality: 0.9
    };
    
    try {
      const compressedFile = await imageCompression(file, options);
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `events/${fileName}`;
      
      const { error } = await supabase.storage
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

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let finalImageUrl = null;
      if (fileToUpload) {
         finalImageUrl = await uploadAndCompressImage(fileToUpload);
      }
      
      const { error } = await supabase.from('events').insert([
        { 
          title: newEvent.title, 
          description: newEvent.description,
          image_url: finalImageUrl,
          event_date: newEvent.event_date ? new Date(newEvent.event_date).toISOString() : null,
          is_published: newEvent.is_published,
          type: 'event'
        }
      ]);
      
      if (error) throw error;
      
      // Reset and reload
      setIsModalOpen(false);
      setNewEvent({ title: '', description: '', event_date: '', is_published: true });
      setFileToUpload(null);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error.message);
      alert("Failed to save event: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  }

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-lg lg:text-xl font-bold tracking-tight">Manage Events</h2>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-48 lg:w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search events..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Bell className="w-5 h-5" /></button>
            <button className="hidden sm:block p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors"><Settings className="w-5 h-5" /></button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-4 lg:px-6 py-2.5 rounded-lg text-xs lg:text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Event</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        {/* Modal Overlay */}
        {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-[#1a2238] border border-[#5671FF]/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto relative">
                 <div className="flex items-center justify-between p-6 border-b border-[#5671FF]/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
                    <h3 className="text-xl font-bold">Create New Event</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                 </div>
                 <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                 
                    {/* File Upload Section */}
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Event Poster / Image (Auto-Compressed)</label>
                       <div className="relative border-2 border-dashed border-[#5671FF]/30 hover:border-[#5671FF]/60 rounded-xl p-6 transition-colors bg-[#0E1528] text-center cursor-pointer">
                          <input 
                             type="file" 
                             accept="image/*"
                             onChange={handleFileChange}
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {fileToUpload ? (
                             <div className="flex flex-col items-center gap-2 text-[#5671FF]">
                                <ImageIcon className="w-8 h-8" />
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
                       <label className="text-sm font-bold text-slate-300">Event Title</label>
                       <input 
                         required
                         type="text" 
                         value={newEvent.title}
                         onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors" 
                         placeholder="e.g. IT Week 2024"
                       />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Event Description</label>
                       <textarea 
                         value={newEvent.description}
                         onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors min-h-[90px] resize-y" 
                         placeholder="Describe the announcements or details..."
                       />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-300">Event Date</label>
                       <input 
                         required
                         type="datetime-local" 
                         value={newEvent.event_date}
                         onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
                         className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 px-4 text-white focus:border-[#5671FF] outline-none transition-colors [color-scheme:dark]" 
                       />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                       <input 
                         type="checkbox" 
                         id="publish" 
                         checked={newEvent.is_published}
                         onChange={(e) => setNewEvent({...newEvent, is_published: e.target.checked})}
                         className="w-5 h-5 rounded border-[#5671FF]/30 bg-[#0E1528] text-[#5671FF] focus:ring-[#5671FF] cursor-pointer"
                       />
                       <label htmlFor="publish" className="text-sm font-bold text-slate-300 cursor-pointer">Publish immediately</label>
                    </div>
                    <div className="pt-4 border-t border-[#5671FF]/10 flex justify-end gap-3 pb-2">
                       <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:bg-white/5 transition-colors">Cancel</button>
                       <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#FF602D] text-white hover:bg-[#FF602D]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                         {submitting ? (
                           <>
                             <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                             Processing...
                           </>
                         ) : 'Save Event'}
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
              placeholder="Search events..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center flex-1">
               <p className="text-[#5671FF] font-bold animate-pulse">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-[#5671FF]/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No Events Found</h3>
                <p className="text-slate-400">Click the 'Add Event' button to create your first upcoming event.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                      <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                      <th className="px-6 py-4">Poster</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5">
                        <td className="px-6 py-5">
                           <div className="w-12 h-12 bg-[#0E1528] rounded-lg border border-[#5671FF]/20 overflow-hidden flex items-center justify-center">
                              {event.image_url ? (
                                 <img src={event.image_url} alt="Event" className="w-full h-full object-cover" />
                              ) : (
                                 <Calendar className="w-4 h-4 text-slate-600" />
                              )}
                           </div>
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-white group-hover:text-[#5671FF] transition-colors">
                           {event.title}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-500">
                          {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBA'}
                        </td>
                        <td className="px-6 py-5">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${event.is_published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                             {event.is_published ? 'PUBLISHED' : 'DRAFT'}
                           </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex justify-end gap-2 items-center">
                             <button 
                               onClick={() => navigate(`/admin/edit/${event.id}`)}
                               className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 rounded-lg transition-all" 
                               title="Edit"
                             >
                                <Edit className="w-4 h-4" />
                             </button>
                             <button onClick={() => handleDeleteEvent(event.id)} className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all" title="Delete">
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

export default ManageEvents;
