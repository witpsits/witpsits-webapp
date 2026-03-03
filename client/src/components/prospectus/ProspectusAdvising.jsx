import React from 'react';

const ProspectusAdvising = () => {
    return (
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#5671FF]/20 to-transparent border border-[#5671FF]/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-slate-100">
                    Need help with your curriculum?
                </h3>
                <p className="text-slate-400">
                    Our academic advisors are here to guide you through your degree path.
                </p>
            </div>
            <button className="px-8 py-3 bg-[#5671FF] text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#5671FF]/20">
                Schedule Advising
            </button>
        </div>
    );
};

export default ProspectusAdvising;
