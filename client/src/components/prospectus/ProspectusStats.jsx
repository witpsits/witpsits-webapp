import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ target, duration = 1500, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target);
        if (start === end) {
            setCount(end);
            return;
        };

        let totalMiliseconds = duration;
        let incrementTime = (totalMiliseconds / end);

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return (
        <span className="tabular-nums">
            {new Intl.NumberFormat('en-US').format(count)}{suffix}
        </span>
    );
};

const ProspectusStats = ({ downloads = 1200, totalDocs = 0, latestYear = 2024 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Total Documents */}
            <div className="bg-[#1a2238] p-6 rounded-2xl border border-[#5671FF]/10 hover:border-[#5671FF]/40 transition-all group hover:shadow-[0_10px_30px_rgba(86,113,255,0.1)]">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#5671FF]/10 flex items-center justify-center text-[#5671FF] group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                </div>
                <div className="text-3xl font-black text-white">
                    <AnimatedCounter target={totalDocs} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Database Files
                </div>
            </div>

            {/* Latest Revision */}
            <div className="bg-[#1a2238] p-6 rounded-2xl border border-[#5671FF]/10 hover:border-[#5671FF]/40 transition-all group hover:shadow-[0_10px_30px_rgba(86,113,255,0.1)]">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF602D]/10 flex items-center justify-center text-[#FF602D] group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">update</span>
                    </div>
                    <div className="px-2 py-1 rounded-md bg-[#FF602D]/10 text-[#FF602D] text-[10px] font-black uppercase">Recent</div>
                </div>
                <div className="text-3xl font-black text-white">
                    <AnimatedCounter target={latestYear} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Latest Version
                </div>
            </div>

            {/* Total Downloads */}
            <div className="bg-[#1a2238] p-6 rounded-2xl border border-[#5671FF]/10 hover:border-[#5671FF]/40 transition-all group hover:shadow-[0_10px_30px_rgba(86,113,255,0.1)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#5671FF]/10 flex items-center justify-center text-[#5671FF] group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">download</span>
                    </div>
                </div>
                <div className="text-3xl font-black text-white">
                    <AnimatedCounter target={downloads} suffix="+" />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Total Inquiries
                </div>
            </div>

            {/* Status */}
            <div className="bg-[#1a2238] p-6 rounded-2xl border border-[#5671FF]/10 hover:border-[#5671FF]/40 transition-all group hover:shadow-[0_10px_30px_rgba(86,113,255,0.1)]">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">verified</span>
                    </div>
                </div>
                <div className="text-2xl font-black text-white flex items-center gap-2">
                    Official
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Portal Status
                </div>
            </div>
        </div>
    );
};

export default ProspectusStats;
