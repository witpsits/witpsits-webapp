import React from 'react';

const ProspectusHero = () => {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-2 text-[#5671FF]">
                <span className="material-symbols-outlined">folder_open</span>
                <span className="text-sm font-bold uppercase tracking-widest">
                    Academic Hub
                </span>
            </div>
            <h1 className="text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Prospectus &amp; Manual
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                Access the latest academic curricula and institutional guidelines for the
                Western Institute of Technology Chapter. Stay informed and organized.
            </p>
        </div>
    );
};

export default ProspectusHero;
