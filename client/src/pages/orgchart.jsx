import React from 'react';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import { GraduationCap, Code2, PartyPopper } from 'lucide-react';
import OrgCard from '../components/orgchart/OrgCard.jsx';
import CommitteeCard from '../components/orgchart/CommitteeCard.jsx';

const OrgChart = () => {
  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(86, 113, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(86, 113, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Navigation */}
      <div className="relative z-10 w-full border-b border-[#5671FF]/10 bg-[#0E1528]/80 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Organizational <span className="text-[#5671FF]">Structure</span>
          </h1>
          <p className="max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            The leadership team driving innovation and excellence for the PSITS - WIT Chapter Academic Year 2023-2024.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5671FF]/30 bg-[#5671FF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5671FF]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5671FF] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5671FF]"></span>
            </span>
            Executive Board Active
          </div>
        </section>

        {/* Org Chart Section */}
        <section className="mb-32 relative pb-8 px-4 md:px-0">
          
          {/* Mobile Org Chart Stack (Visible only on small screens) */}
          <div className="flex md:hidden flex-col items-center w-full max-w-sm mx-auto space-y-8">
            {/* President Box */}
            <div className="w-full flex flex-col items-center bg-[#1a2238]/30 rounded-2xl p-6 border border-[#5671FF]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#5671FF]"></div>
              <OrgCard 
                name="Juan Dela Cruz" 
                role="CHAPTER PRESIDENT" 
                imgSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
                isMain
              />
            </div>
            
            {/* VP Internal Box */}
            <div className="w-full flex flex-col items-center bg-[#1a2238]/20 rounded-2xl p-6 border border-[#5671FF]/10 space-y-6">
              <OrgCard 
                name="Maria Clara" 
                role="VP INTERNAL" 
                imgSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
              />
              <div className="flex w-full justify-center gap-4 pt-4 border-t border-[#5671FF]/10">
                <div className="w-1/2 flex justify-end">
                  <OrgCard 
                    name="Ana Maria" 
                    role="SECRETARY" 
                    imgSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
                    small
                  />
                </div>
                <div className="w-1/2 flex justify-start">
                  <OrgCard 
                    name="Andres B." 
                    role="TREASURER" 
                    imgSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
                    small
                  />
                </div>
              </div>
            </div>

            {/* VP External Box */}
            <div className="w-full flex flex-col items-center bg-[#1a2238]/20 rounded-2xl p-6 border border-[#5671FF]/10 space-y-6">
              <OrgCard 
                name="Leonor Rivera" 
                role="VP EXTERNAL" 
                imgSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces"
              />
              <div className="flex w-full justify-center gap-4 pt-4 border-t border-[#5671FF]/10">
                <div className="w-1/2 flex justify-end">
                  <OrgCard 
                    name="Gregorio D." 
                    role="AUDITOR" 
                    imgSrc="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces"
                    small
                  />
                </div>
                <div className="w-1/2 flex justify-start">
                  <OrgCard 
                    name="Josefa L." 
                    role="P.R.O." 
                    imgSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
                    small
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Org Chart Tree (Visible only on medium/large screens) */}
          <div className="hidden md:flex flex-col items-center w-full max-w-5xl mx-auto space-y-8 md:space-y-0">
            
            {/* President */}
            <div className="flex flex-col items-center w-full">
              <OrgCard 
                name="Juan Dela Cruz" 
                role="CHAPTER PRESIDENT" 
                imgSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
                isMain
              />
              {/* Vertical line down */}
              <div className="hidden md:block w-px h-8 bg-[#5671FF]/40"></div>
            </div>

            {/* VPs Tier */}
            <div className="flex flex-col md:flex-row relative w-full gap-8 md:gap-0">
              {/* Horizontal line connecting VPs */}
              <div className="hidden md:block absolute top-0 left-[25%] right-[25%] border-t border-[#5671FF]/40">
                <div className="absolute left-0 top-0 w-px h-8 bg-[#5671FF]/40"></div>
                <div className="absolute right-0 top-0 w-px h-8 bg-[#5671FF]/40"></div>
              </div>
              
              {/* VP Internal Branch */}
              <div className="flex flex-col items-center w-full md:w-1/2 md:pt-8 gap-8 md:gap-0">
                <OrgCard 
                  name="Maria Clara" 
                  role="VP INTERNAL" 
                  imgSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
                />
                <div className="hidden md:block w-px h-8 bg-[#5671FF]/40 mt-0"></div>
                
                {/* Third Tier - Internal */}
                <div className="flex flex-col sm:flex-row relative w-full gap-8 md:gap-0">
                  <div className="hidden md:block absolute top-0 left-[25%] right-[25%] border-t border-[#5671FF]/40">
                    <div className="absolute left-0 top-0 w-px h-8 bg-[#5671FF]/40"></div>
                    <div className="absolute right-0 top-0 w-px h-8 bg-[#5671FF]/40"></div>
                  </div>
                  
                  <div className="flex flex-col items-center w-full sm:w-1/2 md:pt-8">
                    <OrgCard 
                      name="Ana Maria" 
                      role="SECRETARY" 
                      imgSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
                      small
                    />
                  </div>
                  <div className="flex flex-col items-center w-full sm:w-1/2 md:pt-8">
                    <OrgCard 
                      name="Andres B." 
                      role="TREASURER" 
                      imgSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
                      small
                    />
                  </div>
                </div>
              </div>

              {/* VP External Branch */}
              <div className="flex flex-col items-center w-full md:w-1/2 md:pt-8 gap-8 md:gap-0 mt-8 md:mt-0">
                <OrgCard 
                  name="Leonor Rivera" 
                  role="VP EXTERNAL" 
                  imgSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces"
                />
                <div className="hidden md:block w-px h-8 bg-[#5671FF]/40 mt-0"></div>
                
                {/* Third Tier - External */}
                <div className="flex flex-col sm:flex-row relative w-full gap-8 md:gap-0">
                  <div className="hidden md:block absolute top-0 left-[25%] right-[25%] border-t border-[#5671FF]/40">
                    <div className="absolute left-0 top-0 w-px h-8 bg-[#5671FF]/40"></div>
                    <div className="absolute right-0 top-0 w-px h-8 bg-[#5671FF]/40"></div>
                  </div>
                  
                  <div className="flex flex-col items-center w-full sm:w-1/2 md:pt-8">
                    <OrgCard 
                      name="Gregorio D." 
                      role="AUDITOR" 
                      imgSrc="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces"
                      small
                    />
                  </div>
                  <div className="flex flex-col items-center w-full sm:w-1/2 md:pt-8">
                    <OrgCard 
                      name="Josefa L." 
                      role="P.R.O." 
                      imgSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
                      small
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Technical Committees Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Technical Committees</h2>
              <p className="text-slate-400 text-sm">Specialized teams focusing on academic and project growth.</p>
            </div>
            <button className="bg-[#5671FF]/20 hover:bg-[#5671FF]/30 text-[#5671FF] border border-[#5671FF]/30 px-6 py-2.5 rounded-lg text-sm font-bold transition-all">
              View All Committees
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Committee Card 1 */}
            <CommitteeCard 
              icon={<GraduationCap className="w-5 h-5" />}
              members="12 Members"
              title="Academic Affairs"
              description="Oversees tutoring sessions, workshops, and educational resources for IT students."
              extraCount="+10"
              avatars={[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=faces",
              ]}
            />
            {/* Committee Card 2 */}
            <CommitteeCard 
              icon={<Code2 className="w-5 h-5" />}
              members="8 Members"
              title="Tech & Innovation"
              description="Managing the PSITS digital ecosystem and organizing annual hackathons."
              extraCount="+6"
              avatars={[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=faces",
              ]}
            />
            {/* Committee Card 3 */}
            <CommitteeCard 
              icon={<PartyPopper className="w-5 h-5" />}
              members="15 Members"
              title="Events & Logistics"
              description="Planning and executing student seminars, conferences, and social mixers."
              extraCount="+13"
              avatars={[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop&crop=faces",
              ]}
            />
          </div>
        </section>

      </main>

      {/* Footer */}
      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};



export default OrgChart;
