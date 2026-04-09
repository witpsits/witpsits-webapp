import React from 'react';

const OrgNode = ({ name, role, imgSrc, size = 'md' }) => {
  const sizeConfig = {
    lg: { card: 'w-52', img: 'w-24 h-24', name: 'text-base', role: 'text-xs' },
    md: { card: 'w-44', img: 'w-20 h-20', name: 'text-sm', role: 'text-[10px]' },
    sm: { card: 'w-36', img: 'w-16 h-16', name: 'text-xs', role: 'text-[9px]' },
  };
  const s = sizeConfig[size];

  return (
    <div className={`${s.card} flex flex-col items-center bg-[#111827] border border-[#5671FF]/30 rounded-2xl px-4 py-5 transition-all duration-300 hover:border-[#5671FF]/70 hover:shadow-[0_0_20px_rgba(86,113,255,0.15)] group`}>
      {/* Circular image with ring */}
      <div className={`${s.img} rounded-full p-0.5 bg-gradient-to-br from-[#5671FF] to-[#5671FF]/30 mb-3 shrink-0`}>
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full rounded-full object-cover object-top"
        />
      </div>
      {/* Name */}
      <p className={`${s.name} font-semibold text-white text-center leading-tight mb-1`}>{name}</p>
      {/* Role */}
      <p className={`${s.role} font-bold text-[#5671FF] uppercase tracking-wider text-center`}>{role}</p>
    </div>
  );
};

export default OrgNode;
