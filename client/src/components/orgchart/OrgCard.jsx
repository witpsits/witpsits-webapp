import React from 'react';

const OrgCard = ({ name, role, imgSrc, isMain, small }) => {
  return (
    <div className={`flex flex-col items-center bg-[#1a2238]/80 backdrop-blur-md border ${isMain ? 'border-[#5671FF]/50 shadow-[0_0_30px_rgba(86,113,255,0.15)]' : 'border-[#5671FF]/20'} rounded-2xl ${isMain ? 'p-8 min-w-[280px]' : small ? 'p-4 min-w-[180px]' : 'p-6 min-w-[240px]'} transition-all hover:border-[#5671FF]/50 hover:shadow-[0_0_20px_rgba(86,113,255,0.1)] relative group`}>
      {/* Glow effect behind image */}
      <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#5671FF]/30 rounded-full blur-xl group-hover:bg-[#5671FF]/50 transition-all ${small ? 'top-6 w-16 h-16' : ''}`}></div>
      
      <div className={`relative rounded-full p-1 border-2 border-[#5671FF]/50 mb-4 bg-[#0E1528] ${isMain ? 'w-24 h-24' : small ? 'w-16 h-16' : 'w-20 h-20'}`}>
        <img src={imgSrc} alt={name} className="w-full h-full object-cover rounded-full" />
      </div>
      
      <h3 className={`font-bold text-white text-center mb-1 ${isMain ? 'text-xl' : small ? 'text-sm' : 'text-lg'}`}>{name}</h3>
      <p className={`text-[#FF602D] font-bold text-center tracking-wider ${isMain ? 'text-xs' : 'text-[10px]'}`}>{role}</p>
    </div>
  );
};

export default OrgCard;
