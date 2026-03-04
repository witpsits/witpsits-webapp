import React from "react";
import Navbar from "../components/navbar";
import ProspectusHero from "../components/prospectus/ProspectusHero";
import ProspectusTabs from "../components/prospectus/ProspectusTabs";
import ProspectusStats from "../components/prospectus/ProspectusStats";
import ProspectusTable from "../components/prospectus/ProspectusTable";
import ProspectusAdvising from "../components/prospectus/ProspectusAdvising";
import Footer from "../components/footer";

const ProspectusPage = () => {
  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-8">
        <div className="layout-content-container flex flex-col gap-4">
          <ProspectusHero />
          <ProspectusTabs />
          <ProspectusStats />
          <ProspectusTable />
          <ProspectusAdvising />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProspectusPage;
