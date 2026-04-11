import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { GraduationCap, Code2, PartyPopper, Users, Star, History, Calendar, Award } from "lucide-react";
import OrgNode from "../components/orgchart/OrgNode.jsx";
import CommitteeCard from "../components/orgchart/CommitteeCard.jsx";
import { supabase } from "../lib/supabaseClient";

const LINE = "bg-[#5671FF]/30";

const OrgChart = () => {
  const [activeTab, setActiveTab] = useState("faculty"); // "faculty" or "officers"
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [facRes, offRes] = await Promise.all([
        supabase.from('org_chart').select('*'),
        supabase.from('officers').select('*').order('rank_level', { ascending: true })
      ]);

      if (facRes.error) throw facRes.error;
      if (offRes.error) throw offRes.error;

      setFacultyMembers(facRes.data || []);
      setOfficers(offRes.data || []);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Faculty Hierarchy ──────────────────────────────────────────────────
  const programHead = facultyMembers.find(m => m.role?.toLowerCase().includes('head'));
  const custodian = facultyMembers.find(m => m.role?.toLowerCase().includes('custodian'));
  const clerk = facultyMembers.find(m => m.role?.toLowerCase().includes('clerk'));
  const otherFaculty = facultyMembers.filter(m => 
    !m.role?.toLowerCase().includes('head') && 
    !m.role?.toLowerCase().includes('custodian') && 
    !m.role?.toLowerCase().includes('clerk')
  );

  // ── Officers Hierarchy (Current) ───────────────────────────────────────
  const currentOfficers = officers.filter(o => o.is_current);
  const previousOfficersGrouped = officers
    .filter(o => !o.is_current)
    .reduce((acc, obj) => {
        const key = obj.academic_year;
        if (!acc[key]) acc[key] = [];
        acc[key].push(obj);
        return acc;
    }, {});

  // Sort previous by year descending
  const sortedYears = Object.keys(previousOfficersGrouped).sort((a, b) => b.localeCompare(a));

  const president = currentOfficers.find(o => o.rank_level === 1);
  const vp = currentOfficers.find(o => o.rank_level === 2);
  const boardMembers = currentOfficers.filter(o => o.rank_level === 3);
  const representatives = currentOfficers.filter(o => o.rank_level === 4);

  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col relative overflow-hidden">
      
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#5671FF]/5 to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(86,113,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(86,113,255,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-16 relative z-10">
        
        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5671FF]/10 border border-[#5671FF]/20 text-[#5671FF] text-[10px] font-black uppercase tracking-[2px] mb-6">
             <Star className="w-3 h-3 fill-[#5671FF]" />
             Leadership & Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our <span className="text-[#5671FF]">Organization</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Meet the dedicated individuals who steer the PSITS - WIT Chapter towards digital innovation and community service.
          </p>
        </section>

        {/* ── Tab Switcher ────────────────────────────────────────────────── */}
        <div className="flex justify-center mb-16">
           <div className="bg-white/5 p-1.5 rounded-2xl flex gap-1 border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => setActiveTab('faculty')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'faculty' ? 'bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/30' : 'text-slate-400 hover:text-white'}`}
              >
                <Award className="w-4 h-4" />
                Faculty & Staff
              </button>
              <button 
                onClick={() => setActiveTab('officers')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'officers' ? 'bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/30' : 'text-slate-400 hover:text-white'}`}
              >
                <Users className="w-4 h-4" />
                PSITS Officers
              </button>
           </div>
        </div>

        {/* ── Main Content Area ────────────────────────────────────────────── */}
        {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-[#5671FF]/10 border-t-[#5671FF] animate-spin"></div>
                <p className="text-xs font-bold text-[#5671FF] uppercase tracking-widest animate-pulse">Building Hierarchy...</p>
             </div>
        ) : (
          <div className="space-y-32">
            
            {/* ── FACULTY TAB ──────────────────────────────────────────────── */}
            {activeTab === 'faculty' && (
              <section className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="border border-dashed border-[#5671FF]/20 rounded-[2.5rem] p-8 md:p-20 relative overflow-hidden bg-white/2">
                  <div className="flex flex-col items-center">
                    {programHead && (
                      <div className="flex flex-col items-center">
                        <OrgNode name={programHead.name} role={programHead.role} imgSrc={programHead.image_url} size="lg" />
                        <div className={`w-px h-12 ${LINE}`}></div>
                      </div>
                    )}

                    {(custodian || clerk) && (
                      <div className="flex flex-col items-center w-full">
                         <div className="relative w-full max-w-2xl flex flex-col items-center">
                            <div className={`absolute top-0 h-px w-1/2 ${LINE}`}></div>
                            <div className="flex w-full justify-between pt-12 gap-8">
                               <div className="flex-1 flex flex-col items-center">
                                  <div className={`absolute top-0 w-px h-12 ${LINE}`}></div>
                                  {custodian && <OrgNode name={custodian.name} role={custodian.role} imgSrc={custodian.image_url} size="md" />}
                               </div>
                               <div className="flex-1 flex flex-col items-center">
                                  <div className={`absolute top-0 w-px h-12 ${LINE}`}></div>
                                  {clerk && <OrgNode name={clerk.name} role={clerk.role} imgSrc={clerk.image_url} size="md" />}
                               </div>
                            </div>
                         </div>
                         <div className={`w-px h-12 ${LINE}`}></div>
                      </div>
                    )}

                    {otherFaculty.length > 0 && (
                      <div className="w-full flex flex-col items-center mt-8">
                         <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12">Faculty Members</div>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full">
                            {otherFaculty.map((m, i) => (
                               <div key={i} className="flex flex-col items-center gap-4">
                                  <OrgNode name={m.name} role={m.role} imgSrc={m.image_url} size="sm" />
                               </div>
                            ))}
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ── OFFICERS TAB ─────────────────────────────────────────────── */}
            {activeTab === 'officers' && (
              <section className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-32">
                
                {/* Current Active Chart */}
                <div className="space-y-12">
                   <div className="text-center">
                      <h2 className="text-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                         Current Board of Officers
                      </h2>
                   </div>

                   <div className="border border-dashed border-[#5671FF]/20 rounded-[2.5rem] p-8 md:p-20 bg-white/2">
                      <div className="flex flex-col items-center">
                         {/* Rank 1: President */}
                         {president && (
                           <div className="flex flex-col items-center">
                              <OrgNode name={president.name} role={president.position} imgSrc={president.image_url} size="lg" />
                              <div className={`w-px h-12 ${LINE}`}></div>
                           </div>
                         )}

                         {/* Rank 2: VP */}
                         {vp && (
                           <div className="flex flex-col items-center">
                              <OrgNode name={vp.name} role={vp.position} imgSrc={vp.image_url} size="md" />
                              <div className={`w-px h-12 ${LINE}`}></div>
                           </div>
                         )}

                         {/* Rank 3: Executive Board */}
                         {boardMembers.length > 0 && (
                           <div className="w-full flex flex-col items-center">
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                 {boardMembers.map((o, i) => (
                                    <OrgNode key={i} name={o.name} role={o.position} imgSrc={o.image_url} size="sm" />
                                 ))}
                              </div>
                              <div className={`w-px h-16 ${LINE} mt-12`}></div>
                           </div>
                         )}

                         {/* Rank 4: Representatives (Stacked Separately) */}
                         {representatives.length > 0 && (
                           <div className="w-full flex flex-col items-center">
                              <div className="text-[10px] font-black uppercase tracking-[4px] text-slate-500 mb-12">Year Representatives</div>
                              <div className="flex flex-col gap-12 w-full max-w-sm">
                                 {representatives.map((o, i) => (
                                    <div key={i} className="flex flex-col items-center relative">
                                       <OrgNode name={o.name} role={o.position} imgSrc={o.image_url} size="sm" />
                                       {i !== representatives.length - 1 && <div className={`w-px h-12 ${LINE} absolute top-full`}></div>}
                                    </div>
                                 ))}
                              </div>
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                {/* ── Historical Archive ───────────────────────────────────── */}
                <div className="space-y-12">
                   <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/5"></div>
                      <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                         <History className="w-4 h-4 text-slate-400" />
                         <span className="text-xs font-black uppercase tracking-widest text-slate-400">Previous Generations</span>
                      </div>
                      <div className="h-px flex-1 bg-white/5"></div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {sortedYears.map((year) => (
                         <div key={year} className="bg-white/2 border border-white/5 rounded-3xl p-8 hover:border-[#5671FF]/30 transition-all group">
                            <div className="flex items-center justify-between mb-8">
                               <h3 className="text-xl font-bold flex items-center gap-3">
                                  <Calendar className="w-5 h-5 text-[#5671FF]" />
                                  Batch {year}
                               </h3>
                               <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#5671FF] transition-colors">OFFICIAL ARCHIVE</span>
                            </div>
                            
                            <div className="space-y-4">
                               {previousOfficersGrouped[year].sort((a,b) => a.rank_level - b.rank_level).map((o, i) => (
                                  <div key={i} className="flex items-center gap-4 p-3 bg-[#0E1528] rounded-2xl border border-white/5 group-hover:bg-[#5671FF]/5 transition-colors">
                                     <img src={o.image_url || 'https://via.placeholder.com/100'} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                     <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white leading-none mb-1">{o.name}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{o.position}</span>
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* ── Tech Committees (Moved here as global section) ─────────── */}
                <section className="pt-32">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight">
                        Technical Committees
                      </h2>
                      <p className="text-slate-400 text-sm mt-2">
                        Specialized teams focusing on academic and project growth.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CommitteeCard
                      icon={<GraduationCap className="w-5 h-5" />}
                      members="12 Members"
                      title="Academic Affairs"
                      description="Oversees tutoring sessions, workshops, and educational resources."
                      extraCount="+10"
                      avatars={["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50"]}
                    />
                    <CommitteeCard
                      icon={<Code2 className="w-5 h-5" />}
                      members="8 Members"
                      title="Tech & Innovation"
                      description="Managing the PSITS digital ecosystem and hackathons."
                      extraCount="+6"
                      avatars={["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50"]}
                    />
                    <CommitteeCard
                      icon={<PartyPopper className="w-5 h-5" />}
                      members="15 Members"
                      title="Events & Logistics"
                      description="Planning and executing student seminars and mixers."
                      extraCount="+13"
                      avatars={["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50", "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50"]}
                    />
                  </div>
                </section>
              </section>
            )}
          </div>
        )}
      </main>

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default OrgChart;
