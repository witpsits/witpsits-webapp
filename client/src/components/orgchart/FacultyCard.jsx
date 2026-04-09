import React from 'react';

const FacultyCard = ({ name, role, imgSrc, isMain }) => {
  return (
    <div className={`group relative flex flex-col bg-[#1a2238] border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
      isMain
        ? 'border-[#5671FF]/50 shadow-[0_0_30px_rgba(86,113,255,0.15)] hover:shadow-[0_0_40px_rgba(86,113,255,0.25)]'
        : 'border-[#5671FF]/20 hover:border-[#5671FF]/60 hover:shadow-[0_0_25px_rgba(86,113,255,0.12)]'
    }`}>
      {/* Top glow bar */}
      <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#5671FF]/0 via-[#5671FF] to-[#5671FF]/0 transition-opacity duration-300 ${isMain ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

      {/* Portrait Image */}
      <div className={`relative w-full overflow-hidden bg-[#0E1528] ${isMain ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2238] via-[#1a2238]/20 to-transparent"></div>

        {/* Role badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className={`inline-block text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap shadow-lg ${
            isMain ? 'bg-[#5671FF]' : 'bg-[#FF602D]'
          }`}>
            {role}
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col items-center px-4 pt-3 pb-5">
        <h3 className={`font-bold text-white text-center leading-snug group-hover:text-[#5671FF] transition-colors ${isMain ? 'text-base' : 'text-sm'}`}>
          {name}
        </h3>
      </div>
    </div>
  );
};

export default FacultyCard;
