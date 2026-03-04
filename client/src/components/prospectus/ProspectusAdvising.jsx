import React from "react";

const ProspectusAdvising = () => {
  return (
    <section className="mt-12 p-8 md:p-12 rounded-3xl border border-[#5671FF]/20 bg-[#1a2238] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-3xl md:text-4xl font-black text-white">
          Need help with your curriculum?
        </h3>
        <p className="text-white/80">
          Our academic advisors are here to guide you through your degree path.
        </p>
      </div>
      <button className="h-14 rounded-xl bg-white px-8 text-sm font-bold text-[#010101] transition-transform hover:scale-105">
        Schedule Advising
      </button>
    </section>
  );
};

export default ProspectusAdvising;
