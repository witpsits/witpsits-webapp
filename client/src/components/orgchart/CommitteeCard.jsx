import React from 'react';

const CommitteeCard = ({ icon, members, title, description, avatars, extraCount }) => {
  return (
    <div className="flex flex-col bg-[#1a2238]/80 backdrop-blur-md border border-[#5671FF]/20 hover:border-[#5671FF]/40 rounded-2xl p-6 transition-all hover:shadow-[0_0_20px_rgba(86,113,255,0.05)] group">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#5671FF]/10 flex items-center justify-center text-[#5671FF] group-hover:bg-[#5671FF] group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-xs text-slate-400 font-medium">{members}</span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#5671FF] transition-colors">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">{description}</p>
      
      <div className="flex items-center">
        <div className="flex -space-x-3">
          {avatars.map((avatar, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full border-2 border-[#1a2238] overflow-hidden relative z-10">
              <img src={avatar} alt="Member" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#1a2238] bg-[#FF602D] flex items-center justify-center text-[10px] font-bold text-white relative z-0">
            {extraCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeCard;
