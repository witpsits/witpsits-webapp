import React from 'react';

const ShowcaseSidebar = () => {
    return (
        <aside className="w-full lg:w-64 flex flex-col gap-8">
            <div className="flex flex-col gap-6 sticky top-24">
                <div className="flex flex-col gap-2">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Filter By Category</h3>
                    <div className="flex flex-col gap-1 mt-2">
                        <button className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#5671FF] text-white font-medium transition-all shadow-lg shadow-[#5671FF]/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[22px]">dashboard</span>
                                <span className="text-sm">All Highlights</span>
                            </div>
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">12</span>
                        </button>
                        <button className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-[#5671FF]/10 transition-all font-medium">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[22px]">emoji_events</span>
                                <span className="text-sm">Competitions</span>
                            </div>
                            <span className="text-xs bg-[#5671FF]/10 text-[#5671FF] px-2 py-0.5 rounded-full">4</span>
                        </button>
                        <button className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-[#5671FF]/10 transition-all font-medium">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[22px]">code</span>
                                <span className="text-sm">Projects</span>
                            </div>
                            <span className="text-xs bg-[#5671FF]/10 text-[#5671FF] px-2 py-0.5 rounded-full">5</span>
                        </button>
                        <button className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-[#5671FF]/10 transition-all font-medium">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[22px]">verified</span>
                                <span className="text-sm">Certifications</span>
                            </div>
                            <span className="text-xs bg-[#5671FF]/10 text-[#5671FF] px-2 py-0.5 rounded-full">3</span>
                        </button>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#5671FF]/20 to-transparent border border-[#5671FF]/20">
                    <h4 className="text-sm font-bold text-[#5671FF] mb-2">Have a new achievement?</h4>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">Share your success with the WIT community. Submit your entry to the showcase.</p>
                    <button className="w-full py-2 bg-[#5671FF] text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all shadow-md shadow-[#5671FF]/20">Submit Showcase</button>
                </div>
            </div>
        </aside>
    );
};

export default ShowcaseSidebar;
