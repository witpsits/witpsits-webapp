import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ShowcaseSidebar from "../components/showcase/ShowcaseSidebar";
import ShowcaseGrid from "../components/showcase/ShowcaseGrid";

const Showcase = () => {
  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <ShowcaseSidebar />
          <ShowcaseGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Showcase;
