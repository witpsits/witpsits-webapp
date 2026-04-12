import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/navbar";
import ProspectusHero from "../components/prospectus/ProspectusHero";
import ProspectusTabs from "../components/prospectus/ProspectusTabs";
import ProspectusStats from "../components/prospectus/ProspectusStats";
import ProspectusTable from "../components/prospectus/ProspectusTable";
import ProspectusAdvising from "../components/prospectus/ProspectusAdvising";
import Footer from "../components/footer";
import PrivacyModal from "../components/PrivacyModal";
import ScrollReveal from "../components/ScrollReveal";

const ProspectusPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalDocs: 0, latestYear: 2024 });

  // Simulate/Manage download count anchored to localStorage
  const [downloads, setDownloads] = useState(() => {
    return parseInt(localStorage.getItem("psitsDownloadsCount") || "1200", 10);
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('prospectuses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const docs = data || [];
      setDocuments(docs);
      
      // Calculate Stats
      const yrs = docs.map(d => new Date(d.created_at).getFullYear());
      const maxYear = yrs.length > 0 ? Math.max(...yrs) : 2024;
      
      setStats({
        totalDocs: docs.length,
        latestYear: maxYear
      });
    } catch (error) {
      console.error("Error fetching prospectuses:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <ScrollReveal>
            <ProspectusHero />
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <ProspectusTabs />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ProspectusStats 
              downloads={downloads} 
              totalDocs={stats.totalDocs}
              latestYear={stats.latestYear}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <ProspectusTable 
              documents={documents} 
              loading={loading}
              onDownload={handleDownload} 
            />
          </ScrollReveal>

          {/* <ScrollReveal delay={0.4}>
            <ProspectusAdvising />
          </ScrollReveal> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProspectusPage;
