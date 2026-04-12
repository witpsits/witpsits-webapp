import React, { useEffect, useState } from 'react';
import { supabase } from "../../lib/supabaseClient";
import { X, Calendar, Trophy, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShowcaseGrid = ({ activeCategory, achievements, loading }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [descExpanded, setDescExpanded] = useState(false);

    useEffect(() => {
        setVisibleCount(6);
    }, [activeCategory]);

    // Reset expanded state when modal changes
    useEffect(() => {
        setDescExpanded(false);
    }, [selectedAchievement]);

    const filteredAchievements = achievements.filter(item => {
        if (activeCategory === 'All Highlights') return true;
        return (item.category || 'Others') === activeCategory;
    });

    const displayAchievements = filteredAchievements.slice(0, visibleCount);
    const hasMore = visibleCount < filteredAchievements.length;

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
            <AnimatePresence>
                {selectedAchievement && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAchievement(null)}
                            className="absolute inset-0 bg-[#0E1528]/98 backdrop-blur-2xl"
                        />

                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5671FF]/10 rounded-full blur-[120px] animate-pulse" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5671FF]/5 rounded-full blur-[100px]" />
                        </div>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full h-full lg:h-[90vh] lg:max-w-7xl lg:rounded-[3rem] bg-[#1a2238] border border-[#5671FF]/20 shadow-[0_0_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row z-10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute top-6 right-6 lg:top-8 lg:right-8 z-[110] p-4 bg-white/5 hover:bg-[#FF602D] text-white rounded-2xl transition-all border border-white/10 hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Left: Hero Image */}
                            <div className="relative w-full lg:w-1/2 h-[45vh] lg:h-full overflow-hidden shrink-0 bg-[#0E1528] flex items-center justify-center">
                                {selectedAchievement.image_url ? (
                                    <motion.img
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.8 }}
                                        src={selectedAchievement.image_url}
                                        alt={selectedAchievement.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Trophy className="w-32 h-32 text-[#5671FF]/20" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2238] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1a2238]/40" />
                                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 lg:hidden">
                                    <span className="px-3 py-1 bg-[#5671FF] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {selectedAchievement.category}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="flex flex-col w-full lg:w-1/2 h-[55vh] lg:h-full overflow-y-auto p-8 lg:p-20">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="space-y-8 flex-1">
                                        {/* Header Metadata */}
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="px-5 py-2 bg-[#5671FF]/10 rounded-2xl border border-[#5671FF]/20">
                                                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#5671FF]">
                                                    {selectedAchievement.category || "Achievement"}
                                                </span>
                                            </div>
                                            {selectedAchievement.date_achieved && (
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-widest">
                                                        {new Date(selectedAchievement.date_achieved).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                                            {selectedAchievement.title}
                                        </h2>

                                        {/* Separator */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-20 bg-[#5671FF] rounded-full shadow-[0_0_10px_rgba(86,113,255,0.4)]" />
                                            <div className="h-2 w-2 bg-[#5671FF]/30 rounded-full" />
                                        </div>

                                        {/* Description with Read More toggle */}
                                        {selectedAchievement.description && (
                                            <div className="space-y-3">
                                                <p className={`text-slate-300 text-base leading-relaxed transition-all ${!descExpanded ? 'line-clamp-4' : ''}`}>
                                                    {selectedAchievement.description}
                                                </p>
                                                {selectedAchievement.description.length > 200 && (
                                                    <button
                                                        onClick={() => setDescExpanded(prev => !prev)}
                                                        className="flex items-center gap-1.5 text-[#5671FF] text-sm font-bold hover:text-[#5671FF]/80 transition-colors"
                                                    >
                                                        <span>{descExpanded ? 'Show less' : 'Read more'}</span>
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            {descExpanded ? 'expand_less' : 'expand_more'}
                                                        </span>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4 opacity-50">
                                        <BookOpen className="w-5 h-5 text-[#5671FF]" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Department Records</span>
                                            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-widest">PSITS-WIT Official Registry</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShowcaseGrid;