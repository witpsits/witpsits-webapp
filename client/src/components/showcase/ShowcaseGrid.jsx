import React, { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";
import { X, Calendar, Trophy, ChevronRight, BookOpen } from 'lucide-react';

const ShowcaseGrid = ({ activeCategory, achievements, loading }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    // Reset pagination when category changes
    useEffect(() => {
        setVisibleCount(6);
    }, [activeCategory]);

    const filteredAchievements = achievements.filter(item => {
        if (activeCategory === 'All Highlights') return true;
        return (item.category || 'Others') === activeCategory;
    });

    const displayAchievements = filteredAchievements.slice(0, visibleCount);
    const hasMore = visibleCount < filteredAchievements.length;

    return (
        <div className="flex-1">
            <div className="flex flex-col gap-2 mb-8">
                {/* Breadcrumbs and Header */}
                <nav className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <a className="hover:text-[#5671FF] transition-colors" href="/">Home</a>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="text-[#5671FF] font-medium">Showcase</span>
                </nav>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-100 tracking-tight">
                    Showcase &amp; <span className="text-[#5671FF] underline decoration-[#5671FF]/30 decoration-4 underline-offset-8">Achievements</span>
                </h1>
                <p className="text-slate-400 text-lg mt-4 max-w-2xl font-light">
                    Celebrating student excellence and organizational milestones in Information Technology at WIT.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 rounded-full border-4 border-[#5671FF]/30 border-t-[#5671FF] animate-spin"></div>
                </div>
            ) : filteredAchievements.length === 0 ? (
                <div className="text-center py-20 bg-[#1a2238] rounded-2xl border border-[#5671FF]/10">
                    <span className="material-symbols-outlined text-6xl text-[#5671FF]/30 mb-4 block">emoji_events</span>
                    <h3 className="text-xl font-bold text-slate-300">No achievements recorded in this category</h3>
                    <p className="text-slate-500 mt-2">Check back soon for latest accomplishments.</p>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                    {displayAchievements.map((item, index) => (
                        <div 
                            key={item.id || index} 
                            onClick={() => setSelectedAchievement(item)}
                            className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-[#1a2238] border border-[#5671FF]/10 hover:border-[#5671FF]/50 transition-all hover:shadow-[0_0_20px_rgba(86,113,255,0.2)] cursor-pointer"
                        >
                            <div 
                                className={`${item.aspect} bg-cover bg-center flex items-center justify-center bg-[#5671FF]/5`} 
                                style={{ backgroundImage: item.image_url ? `url('${item.image_url}')` : 'none' }}
                            >
                                {!item.image_url && <span className="material-symbols-outlined text-6xl text-[#5671FF]/20">emoji_events</span>}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1528] via-[#0E1528]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
                            </div>
                            <div className="absolute bottom-0 p-6 w-full">
                                <div className="flex gap-2 mb-3">
                                    {item.date_achieved && (
                                       <span className="inline-block px-3 py-1 rounded-full bg-[#5671FF]/20 text-[#5671FF] text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-[#5671FF]/30">
                                          {new Date(item.date_achieved).getFullYear()}
                                       </span>
                                    )}
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20">
                                       {item.category || 'Achievement'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-[#5671FF] transition-colors">{item.title}</h3>
                                {item.description && (
                                   <p className="text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">{item.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && hasMore && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#5671FF]/30 text-[#5671FF] font-bold hover:bg-[#5671FF] hover:text-white transition-all active:scale-95"
                    >
                        <span>View More Achievements</span>
                        <span className="material-symbols-outlined">expand_more</span>
                    </button>
                </div>
            )}

            {/* Achievement Detail Modal */}
            {selectedAchievement && (
                <div 
                  className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-12 md:p-16 transition-all duration-500 overflow-hidden"
                  onClick={() => setSelectedAchievement(null)}
                >
                  <div className="absolute inset-0 bg-[#0E1528]/95 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"></div>
                  
                  {/* Decorative Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#5671FF]/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

                  <div 
                    className="relative bg-[#1a2238] w-full max-w-5xl h-full sm:h-auto sm:max-h-[85vh] rounded-[2.5rem] border border-[#5671FF]/20 shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(86,113,255,0.1)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button 
                      onClick={() => setSelectedAchievement(null)}
                      className="absolute top-6 right-6 z-[110] p-3 bg-white/5 hover:bg-[#FF602D] text-white rounded-2xl transition-all border border-white/10 hover:scale-110 active:scale-95 shadow-2xl"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Left: Image Canvas */}
                    <div className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden shrink-0 bg-[#0E1528] flex items-center justify-center">
                       {selectedAchievement.image_url ? (
                          <img 
                            src={selectedAchievement.image_url} 
                            alt={selectedAchievement.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Trophy className="w-24 h-24 text-[#5671FF]/20" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a2238] to-transparent"></div>
                    </div>

                    {/* Right: Detailed Content */}
                    <div className="flex flex-col w-full md:w-[55%] overflow-y-auto scrollbar-thin p-8 sm:p-12 md:p-14 pb-20 sm:pb-24">
                        <div className="flex flex-col h-full">
                            <div className="space-y-8 flex-1">
                                {/* Meta Tags */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[#5671FF]/10 rounded-full border border-[#5671FF]/20 shadow-[0_0_15px_rgba(86,113,255,0.05)]">
                                       <Trophy className="w-3.5 h-3.5 text-[#5671FF]" />
                                       <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] text-[#5671FF]">
                                          {selectedAchievement.category || "General Achievement"}
                                       </span>
                                    </div>
                                    {selectedAchievement.date_achieved && (
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-white/50">
                                           <Calendar className="w-3.5 h-3.5" />
                                           <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                                              {new Date(selectedAchievement.date_achieved).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                           </span>
                                        </div>
                                    )}
                                </div>

                                {/* Title Header */}
                                <div className="space-y-5">
                                   <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
                                      {selectedAchievement.title}
                                   </h2>
                                   <div className="flex items-center gap-2 text-[#5671FF]">
                                      <div className="h-1.5 w-16 bg-current rounded-full"></div>
                                      <div className="h-1.5 w-1.5 bg-current/40 rounded-full"></div>
                                      <div className="h-1.5 w-1.5 bg-current/20 rounded-full"></div>
                                   </div>
                                </div>

                                {/* Structured Description Area */}
                                <div className="mt-10 py-2 border-l-2 border-white/5 pl-8">
                                   <div className="prose prose-invert max-w-none space-y-6">
                                      {selectedAchievement.description ? (
                                          selectedAchievement.description.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                                              <p key={i} className="text-slate-200 leading-[1.85] text-lg lg:text-xl font-light selection:bg-[#5671FF]/30 break-words whitespace-pre-wrap">
                                                  {paragraph}
                                              </p>
                                          ))
                                      ) : (
                                          <p className="text-slate-500 italic text-lg opacity-60">The official narrative for this achievement is currently being finalized.</p>
                                      )}
                                   </div>
                                </div>
                            </div>

                            {/* Bottom Identity & Close Prompt */}
                            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4 opacity-70 group/brand">
                                    <div className="p-2 bg-[#5671FF]/5 rounded-lg border border-[#5671FF]/10 group-hover/brand:border-[#5671FF]/30 transition-colors">
                                        <BookOpen className="w-4 h-4 text-[#5671FF]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">PSITS WIT Showcase</span>
                                        <span className="text-[8px] font-medium uppercase tracking-widest text-slate-500">Official Department Record</span>
                                    </div>
                                </div>
                                
                                <button 
                                  onClick={() => setSelectedAchievement(null)}
                                  className="w-full sm:w-auto px-10 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 active:scale-95"
                                >
                                    Return to Gallery
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            )}
        </div>
    );
};

export default ShowcaseGrid;
