import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Code,
  Shield,
  BookOpen,
  Network,
  Rocket,
  CalendarDays,
  X,
  Clock
} from "lucide-react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { supabase } from "../lib/supabaseClient";

const Homepage = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setLatestEvents(data || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 lg:pb-12">
        {/* Hero Section */}
        <section className="relative mb-16 overflow-hidden rounded-xl border border-[#5671FF]/20 bg-[#1a2238]">
          {/* Pattern Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #5671FF 25%, transparent 25%, transparent 50%, #5671FF 50%, #5671FF 75%, transparent 75%, transparent)",
              backgroundSize: "4px 4px",
            }}
          />

          <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-16">
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#5671FF]/30 bg-[#5671FF]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5671FF]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5671FF] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5671FF]"></span>
                </span>
                {latestEvents[0] ? "Featured Announcement" : "Welcome to PSITS-WIT"}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-100">
                {latestEvents[0]?.title || (
                  <>
                    Empowering Future <br />
                    <span className="text-[#5671FF] italic">IT Leaders</span>
                  </>
                )}
              </h1>

              {/* Description with Truncation */}
              <div className="max-w-md group/desc relative">
                <p className={`text-base leading-relaxed text-slate-400 ${latestEvents[0] ? 'line-clamp-3' : ''}`}>
                  {latestEvents[0]?.description || "Join the PSITS-WIT Chapter. Experience the digital glitch revolution and connect with industry pioneers. Registration is now open for all WIT students."}
                </p>
                {latestEvents[0]?.description && latestEvents[0].description.length > 180 && (
                  <button 
                    onClick={() => setSelectedEvent(latestEvents[0])}
                    className="mt-2 text-[#5671FF] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Read full story</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => latestEvents[0] ? setSelectedEvent(latestEvents[0]) : null}
                  className="group flex h-12 items-center gap-2 rounded-lg bg-[#FF602D] px-8 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(255,96,45,0.5)]">
                  {latestEvents[0] ? "Read Full Post" : "Secure Your Spot"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => document.getElementById('updates-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex h-12 items-center gap-2 rounded-lg border border-[#5671FF]/40 bg-transparent px-8 text-sm font-bold text-[#5671FF] transition-all hover:bg-[#5671FF]/10"
                >
                  View Updates
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden md:flex justify-center">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-2xl border border-[#5671FF]/30 shadow-[0_0_15px_rgba(86,113,255,0.1)] hover:border-[#5671FF] hover:shadow-[0_0_20px_rgba(86,113,255,0.25)] transition-all">
                <img
                  src={latestEvents[0]?.image_url || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop"}
                  alt={latestEvents[0]?.title || "Digital Frontiers"}
                  className="h-full w-full object-cover transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1528]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex flex-col">
                  <span className="text-xs font-bold text-[#5671FF]">
                    {latestEvents[0] ? "Latest Update" : "NITCON 2024"}
                  </span>
                  <span className="text-lg font-bold text-white line-clamp-1">
                    {latestEvents[0]?.title || "Digital Frontiers"}
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 border-r-2 border-t-2 border-[#5671FF]/40 opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-[#5671FF]/40 opacity-50"></div>
            </div>
          </div>
        </section>

        {/* System Updates Section */}
        <section id="updates-section" className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                System <span className="text-[#5671FF]">Updates</span>
              </h2>
              <div className="h-1 w-20 bg-[#5671FF]"></div>
            </div>
            <a
              href="#"
              className="group flex items-center gap-1 text-sm font-bold text-[#5671FF] transition-all"
            >
              Browse Archive
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingEvents ? (
               <div className="col-span-full flex justify-center py-10">
                  <div className="w-8 h-8 rounded-full border-4 border-[#5671FF]/30 border-t-[#5671FF] animate-spin"></div>
               </div>
            ) : latestEvents.length === 0 ? (
               <div className="col-span-full text-center py-10 bg-[#1a2238] rounded-xl border border-[#5671FF]/20">
                  <span className="material-symbols-outlined text-4xl text-[#5671FF]/30 mb-2 block">campaign</span>
                  <h3 className="text-lg font-bold text-slate-300">No recent announcements</h3>
                  <p className="text-sm text-slate-500">Check back later for system updates.</p>
               </div>
            ) : (
                latestEvents.map((item, idx) => (
                  <div 
                    key={item.id || idx} 
                    onClick={() => setSelectedEvent(item)}
                    className="group flex flex-col overflow-hidden rounded-xl bg-[#1a2238] border border-[#5671FF]/20 hover:border-[#5671FF] hover:shadow-[0_0_20px_rgba(86,113,255,0.15)] transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#0E1528] flex items-center justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <CalendarDays className="w-12 h-12 text-[#5671FF]/20" />
                      )}
                      
                      <div className="absolute inset-0 bg-[#FF602D]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute right-4 top-4 rounded-lg bg-[#0E1528]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase text-[#5671FF]">
                        Announcement
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-2 text-xs font-medium text-slate-500">
                        {item.event_date ? new Date(item.event_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                      </span>
                      <h3 className="mb-3 text-lg font-bold text-slate-100 group-hover:text-[#5671FF] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mb-6 text-sm leading-relaxed text-slate-400 line-clamp-2">
                        {item.description || "No further details provided."}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(item);
                          }}
                          className="text-xs font-bold uppercase tracking-widest text-[#5671FF] hover:underline"
                        >
                          Read Entry
                        </button>
                        <BookOpen className="w-5 h-5 text-[#5671FF]/50" />
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="mb-16">
          <div className="mb-12 flex flex-col gap-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-100">
              Core <span className="text-[#5671FF]">Pillars</span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Our mission is to foster a community of tech excellence through
              three strategic focus areas designed for student growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-[#5671FF]/20 bg-[#1a2238] p-8 transition-all hover:bg-[#5671FF]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5671FF]/10 text-[#5671FF]">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-100">
                  Academic Excellence
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Curated modules, study groups, and resource sharing to help
                  you excel in your IT curriculum.
                </p>
              </div>
              <a
                href="#"
                className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5671FF]"
              >
                Access Vault
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-[#5671FF]/20 bg-[#1a2238] p-8 transition-all hover:bg-[#5671FF]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5671FF]/10 text-[#5671FF]">
                <Network className="w-8 h-8" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-100">
                  Leadership Network
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Connect with the student council and alumni mentors who are
                  shaping the chapter's future.
                </p>
              </div>
              <a
                href="#"
                className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5671FF]"
              >
                View Chart
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-[#5671FF]/20 bg-[#1a2238] p-8 transition-all hover:bg-[#5671FF]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5671FF]/10 text-[#5671FF]">
                <Rocket className="w-8 h-8" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-100">
                  Innovation Lab
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Showcasing top-tier student projects, capstones, and
                  open-source contributions.
                </p>
              </div>
              <a
                href="#"
                className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5671FF]"
              >
                View Showcase
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-3xl border border-[#5671FF]/20 bg-[#1a2238] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="mb-2 text-3xl md:text-4xl font-black text-white">
                Ready to join the revolution?
              </h2>
              <p className="text-white/80">
                Become a member of the PSITS WIT Chapter today and unlock
                exclusive access to workshops, resources, and networking events.
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-4">
              <button className="h-14 rounded-xl bg-white px-8 text-sm font-bold text-[#010101] transition-transform hover:scale-105">
                Apply for Membership
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Event Details Modal - Premium Upgrade */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 md:p-12 transition-all duration-500 overflow-hidden"
          onClick={() => setSelectedEvent(null)}
        >
          {/* Immersive Backdrop with Progressive Blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-700 animate-in fade-in"></div>
          
          {/* Pulsing Aura Glow behind modal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-r from-[#5671FF]/20 to-[#FF602D]/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

          <div 
            className="relative bg-[#1a2238]/90 backdrop-blur-2xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[80vh] rounded-none sm:rounded-[2rem] border-0 sm:border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_20px_rgba(86,113,255,0.1)] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (for mobile primarily) */}
            <div className="absolute top-5 right-5 z-[110]">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="group p-2.5 bg-black/40 hover:bg-[#FF602D] text-white rounded-xl transition-all border border-white/10 backdrop-blur-md ring-1 ring-white/5 active:scale-95 shadow-xl"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Left Column: Visual Impact (Cinematic Image) */}
            <div className="relative w-full md:w-[45%] h-64 md:h-auto overflow-hidden group/modal-img shrink-0">
               {selectedEvent.image_url ? (
                  <img 
                    src={selectedEvent.image_url} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/modal-img:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0E1528] flex items-center justify-center">
                    <CalendarDays className="w-24 h-24 text-[#5671FF]/10 animate-pulse" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2238] via-[#1a2238]/40 md:via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1a2238] hidden md:block"></div>
                
                {/* Visual Label (Floating) */}
                <div className="absolute top-8 left-8 hidden md:block">
                  <div className="px-3 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                     <span className="text-[9px] font-black uppercase tracking-widest text-[#5671FF]">Latest Update</span>
                  </div>
                </div>
            </div>

            {/* Right Column: Narrative Content */}
            <div className="flex flex-col w-full md:w-[55%] overflow-y-auto scrollbar-hide bg-gradient-to-br from-[#1a2238] to-[#0E1528]">
               {/* Reading Progress Indicator */}
               <div className="h-0.5 shadow-[0_0_15px_rgba(86,113,255,0.3)] bg-gradient-to-r from-[#5671FF] to-[#FF602D] opacity-40 shrink-0"></div>

               <div className="p-8 sm:p-10 md:p-12 space-y-8">
                  {/* Meta Tags Grid */}
                  <div className="flex flex-wrap gap-3">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-[#5671FF]/10 rounded-lg border border-[#5671FF]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5671FF] animate-pulse"></span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#5671FF]">SYSTEM ANNOUNCEMENT</span>
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[9px] font-bold text-slate-400">
                          {selectedEvent.event_date ? new Date(selectedEvent.event_date).toLocaleDateString() : new Date(selectedEvent.created_at).toLocaleDateString()}
                        </span>
                     </div>
                  </div>

                  {/* Title & Entry Header */}
                  <div className="space-y-3">
                     <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.1] tracking-tight">
                        {selectedEvent.title}
                     </h2>
                     <div className="h-1 w-12 bg-[#5671FF] rounded-full"></div>
                  </div>

                  {/* Main Body Text (Prose) */}
                  <div className="prose prose-invert max-w-none">
                     <p className="text-slate-300 leading-[1.7] text-base font-medium whitespace-pre-wrap selection:bg-[#5671FF]/30">
                        {selectedEvent.description || "The administrators have not provided a detailed description for this transmission at this time."}
                     </p>
                  </div>

                  {/* Footer Action Area */}
                  <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0E1528] border border-white/10 flex items-center justify-center shadow-xl">
                          <Rocket className="w-5 h-5 text-[#5671FF]" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[11px] font-black text-white uppercase tracking-wider">PSITS WIT</span>
                           <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Secure Node</span>
                        </div>
                     </div>
                     
                     <div className="flex gap-4 w-full sm:w-auto">
                        <button 
                          onClick={() => setSelectedEvent(null)}
                          className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-[#5671FF] to-[#455cd9] hover:to-[#5671FF] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 group"
                        >
                          <span className="flex items-center gap-2">
                            CLOSE
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
