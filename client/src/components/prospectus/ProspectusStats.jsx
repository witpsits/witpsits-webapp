import React from 'react';

const ProspectusStats = ({ downloads = 1200 }) => {
    // Format the number to look nice (e.g. 1200 -> 1,200)
    const formattedDownloads = new Intl.NumberFormat('en-US').format(downloads);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#1a2238] p-6 rounded-xl border border-[#5671FF]/20">
                <span className="material-symbols-outlined text-[#5671FF] mb-2">
                    description
                </span>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-slate-400">
                    Total Documents
                </div>
            </div>
            <div className="bg-[#1a2238] p-6 rounded-xl border border-[#5671FF]/20">
                <span className="material-symbols-outlined text-[#5671FF] mb-2">
                    update
                </span>
                <div className="text-2xl font-bold">2024</div>
                <div className="text-sm text-slate-400">
                    Latest Revision
                </div>
            </div>
            <div className="bg-[#1a2238] p-6 rounded-xl border border-[#5671FF]/20">
                <span className="material-symbols-outlined text-[#5671FF] mb-2">
                    download
                </span>
                <div className="text-2xl font-bold">
                    <span className="animate-pulse-once">{formattedDownloads}</span>
                </div>
                <div className="text-sm text-slate-400">
                    Total Downloads
                </div>
            </div>
            <div className="bg-[#1a2238] p-6 rounded-xl border border-[#5671FF]/20">
                <span className="material-symbols-outlined text-[#5671FF] mb-2">
                    verified
                </span>
                <div className="text-2xl font-bold">Official</div>
                <div className="text-sm text-slate-400">Status</div>
            </div>
        </div>
    );
};

export default ProspectusStats;
