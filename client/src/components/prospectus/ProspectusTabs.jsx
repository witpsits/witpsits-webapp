import React from 'react';

const ProspectusTabs = () => {
    return (
        <div className="mb-8 border-b border-[#5671FF]/20">
            <div className="flex gap-10">
                <a
                    className="group relative flex items-center gap-2 pb-4 text-[#5671FF]"
                    href="#"
                >
                    <span className="material-symbols-outlined text-[20px]">school</span>
                    <p className="text-base font-bold tracking-tight">
                        Academic Prospectus
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5671FF] rounded-t-full"></div>
                </a>


            </div>
        </div>
    );
};

export default ProspectusTabs;
