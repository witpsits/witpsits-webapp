import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollReveal from "../components/ScrollReveal";
import ShowcaseSidebar from "../components/showcase/ShowcaseSidebar";
import ShowcaseGrid from "../components/showcase/ShowcaseGrid";
import { supabase } from "../lib/supabaseClient";

const Showcase = () => {
  const [activeCategory, setActiveCategory] = useState('All Highlights');
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date_achieved', { ascending: false });

      if (error) throw error;
      
      const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-video"];
      const mappedData = data?.map((item, index) => ({
        ...item,
        aspect: aspects[index % aspects.length]
      })) || [];

      setAchievements(mappedData);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <ScrollReveal width="auto">
            <ShowcaseSidebar 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              achievements={achievements}
            />
          </ScrollReveal>
          
          <ScrollReveal width="100%" delay={0.1}>
            <ShowcaseGrid 
              activeCategory={activeCategory} 
              achievements={achievements} 
              loading={loading}
            />
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Showcase;
