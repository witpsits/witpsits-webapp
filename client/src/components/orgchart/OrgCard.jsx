import React from 'react';
import { Plus } from 'lucide-react';

const OrgCard = ({ name, role, imgSrc, isMain, small, isAddRole, highlights }) => {
  if (isAddRole) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#1a2238]/40 backdrop-blur-md border-2 border-dashed border-[#5671FF]/40 rounded-2xl p-6 w-full min-h-[200px] transition-all hover:border-[#5671FF]/80 hover:bg-[#1a2238]/60 hover:shadow-[0_0_25px_rgba(86,113,255,0.15)] group cursor-pointer relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#5671FF]/10 rounded-full blur-xl group-hover:bg-[#5671FF]/20 transition-all"></div>
        <div className="w-14 h-14 rounded-full border-2 border-[#5671FF]/40 bg-[#0E1528] flex items-center justify-center mb-3 group-hover:border-[#5671FF] group-hover:scale-110 transition-all relative z-10">
          <Plus className="w-7 h-7 text-[#5671FF]" />
        </div>
        <h3 className="font-bold text-[#5671FF] text-center text-sm relative z-10">Add Role</h3>
        <p className="text-slate-500 font-medium text-center tracking-wider text-[10px] relative z-10 mt-1">EXPAND STRUCTURE</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center bg-[#1a2238] border ${isMain ? 'border-[#5671FF]/50 shadow-[0_0_30px_rgba(86,113,255,0.15)]' : 'border-[#5671FF]/20'} rounded-2xl ${isMain ? 'p-8 w-full max-w-sm' : 'p-5 w-full'} transition-all hover:border-[#5671FF]/50 hover:shadow-[0_0_20px_rgba(86,113,255,0.1)] relative group overflow-hidden`}>
      {/* Top accent bar */}
      {isMain && <div className="absolute top-0 left-0 w-full h-1 bg-[#5671FF]"></div>}
      {/* Glow effect behind image */}
      <div className={`absolute top-6 left-1/2 -translate-x-1/2 ${isMain ? 'w-24 h-24' : 'w-16 h-16'} bg-[#5671FF]/20 rounded-full blur-xl group-hover:bg-[#5671FF]/30 transition-all`}></div>
      
      <div className={`relative rounded-full p-1 border-2 border-[#5671FF]/50 mb-3 bg-[#0E1528] ${isMain ? 'w-24 h-24' : 'w-20 h-20'} z-10 shrink-0`}>
        <img src={imgSrc} alt={name} className="w-full h-full object-cover rounded-full" />
      </div>
      
      <h3 className={`font-bold text-white text-center mb-1 relative z-10 leading-tight ${isMain ? 'text-lg' : 'text-sm'}`}>{name}</h3>
      <p className={`text-[#FF602D] font-bold text-center tracking-wider relative z-10 mb-2 ${isMain ? 'text-xs' : 'text-[10px]'}`}>{role}</p>

      {highlights && highlights.length > 0 && (
        <ul className="mt-1 space-y-1 w-full relative z-10">
          {highlights.map((h, i) => (
            <li key={i} className="text-[10px] text-slate-400 text-center leading-snug">{h}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrgCard;
