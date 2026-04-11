import React from 'react';

const ShowcaseSidebar = ({ activeCategory, setActiveCategory, achievements }) => {
    // Dynamically calculate categories and counts
    const categories = achievements.reduce((acc, obj) => {
        const cat = obj.category || 'Others';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});

    const categoryList = Object.keys(categories).map(cat => ({
        name: cat,
        count: categories[cat],
        icon: cat === 'Competitions' ? 'emoji_events' : cat === 'Projects' ? 'code' : cat === 'Certifications' ? 'verified' : 'category'
    }));

    return (
        <aside className="w-full lg:w-64 flex flex-col gap-8">
            <div className="flex flex-col gap-6 sticky top-24">
                <div className="flex flex-col gap-2">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Filter By Category</h3>
                    <div className="flex flex-col gap-1 mt-2">
                        <button 
                            onClick={() => setActiveCategory('All Highlights')}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                                activeCategory === 'All Highlights' 
                                ? 'bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/20' 
                                : 'text-slate-300 hover:bg-[#5671FF]/10'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[22px]">dashboard</span>
                                <span className="text-sm">All Highlights</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                activeCategory === 'All Highlights' ? 'bg-white/20' : 'bg-[#5671FF]/10 text-[#5671FF]'
                            }`}>
                                {achievements.length}
                            </span>
                        </button>

                        {categoryList.map((cat) => (
                            <button 
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                                    activeCategory === cat.name 
                                    ? 'bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/20' 
                                    : 'text-slate-300 hover:bg-[#5671FF]/10'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                                    <span className="text-sm">{cat.name}</span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    activeCategory === cat.name ? 'bg-white/20' : 'bg-[#5671FF]/10 text-[#5671FF]'
                                }`}>
                                    {cat.count}
                                </span>
                            </button>
                        ))}
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
