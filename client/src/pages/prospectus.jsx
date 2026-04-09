import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProspectusHero from "../components/prospectus/ProspectusHero";
import ProspectusTabs from "../components/prospectus/ProspectusTabs";
import ProspectusStats from "../components/prospectus/ProspectusStats";
import ProspectusTable from "../components/prospectus/ProspectusTable";
import ProspectusAdvising from "../components/prospectus/ProspectusAdvising";
import Footer from "../components/footer";
import PrivacyModal from "../components/PrivacyModal";

const ProspectusPage = () => {
  // Simulate realtime DB download count anchored to localStorage
  const [downloads, setDownloads] = useState(() => {
    return parseInt(localStorage.getItem("psitsDownloadsCount") || "1200", 10);
  });

  useEffect(() => {
    localStorage.setItem("psitsDownloadsCount", downloads.toString());
  }, [downloads]);

  const handleDownload = () => {
    setDownloads((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100">
      <PrivacyModal />
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-8">
        <div className="layout-content-container flex flex-col gap-4">
          <ProspectusHero />
          <ProspectusTabs />
          <ProspectusStats downloads={downloads} />
          <ProspectusTable onDownload={handleDownload} />
          <ProspectusAdvising />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProspectusPage;
