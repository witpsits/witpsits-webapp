import React, { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";

const ShowcaseGrid = ({ activeCategory, achievements, loading }) => {
    const filteredAchievements = achievements.filter(item => {
        if (activeCategory === 'All Highlights') return true;
        return (item.category || 'Others') === activeCategory;
    });

    return (
        <div className="flex-1">
            <div className="flex flex-col gap-2 mb-8">
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
                    {filteredAchievements.map((item, index) => (
                        <div key={item.id || index} className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-[#1a2238] border border-[#5671FF]/10 hover:border-[#5671FF]/50 transition-all hover:shadow-[0_0_20px_rgba(86,113,255,0.2)]">
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

            {!loading && filteredAchievements.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <button className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#5671FF]/30 text-[#5671FF] font-bold hover:bg-[#5671FF] hover:text-white transition-all">
                        <span>View More Achievements</span>
                        <span className="material-symbols-outlined">expand_more</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShowcaseGrid;
