import React from 'react';

const OrgNode = ({ name, role, imgSrc, size = 'md' }) => {
  const sizeConfig = {
    lg: {
      card: 'w-52',
      img: 'w-24 h-24',
      name: 'text-base',
      role: 'text-xs',
      nameHeight: 'min-h-[2.5rem]',
    },
    md: {
      card: 'w-44',
      img: 'w-20 h-20',
      name: 'text-sm',
      role: 'text-[10px]',
      nameHeight: 'min-h-[2.25rem]',
    },
    sm: {
      card: 'w-36',
      img: 'w-16 h-16',
      name: 'text-xs',
      role: 'text-[9px]',
      nameHeight: 'min-h-[2rem]',
    },
  };
  const s = sizeConfig[size];

  return (
    <div
      className={`${s.card} flex flex-col items-center bg-[#111827] border border-[#5671FF]/30 rounded-2xl px-3 py-5 transition-all duration-300 hover:border-[#5671FF]/70 hover:shadow-[0_0_20px_rgba(86,113,255,0.15)] group`}
    >
      {/* Circular image with gradient ring */}
      <div
        className={`${s.img} rounded-full p-[2px] bg-gradient-to-br from-[#5671FF] to-[#5671FF]/30 mb-3 shrink-0`}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover object-top"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Name — fixed min-height so cards align even with short/long names */}
      <div className={`w-full flex items-center justify-center ${s.nameHeight} mb-1`}>
        <p
          className={`${s.name} font-semibold text-white text-center leading-tight line-clamp-2 w-full`}
        >
          {name}
        </p>
      </div>

      {/* Role */}
      <p
        className={`${s.role} font-bold text-[#5671FF] uppercase tracking-wider text-center line-clamp-2 w-full`}
      >
        {role}
      </p>
    </div>
  );
};

export default OrgNode;