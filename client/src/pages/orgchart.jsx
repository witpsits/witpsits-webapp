import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { GraduationCap, Code2, PartyPopper } from "lucide-react";
import OrgNode from "../components/orgchart/OrgNode.jsx";
import CommitteeCard from "../components/orgchart/CommitteeCard.jsx";

// ─── Image Imports ─────────────────────────────────────────────────────────────
import imgPagatpat from "../assets/faculties/pagatpat.jpg";
import imgBernardino from "../assets/faculties/bernardino.jpg";
import imgRachel from "../assets/faculties/rachel.jpg";
import imgAl from "../assets/faculties/al.jpg";
import imgDerla from "../assets/faculties/derla.jpg";
import imgEspina from "../assets/faculties/espina.jpg";
import imgFirmalino from "../assets/faculties/firmalino.jpg";
import imgJomel from "../assets/faculties/jomel.jpg";
import imgKempee from "../assets/faculties/kempee.jpg";
import imgLilian from "../assets/faculties/lilian.jpg";
import imgMogib from "../assets/faculties/mogib.jpg";
import imgNarte from "../assets/faculties/narte.jpg";
import imgPador from "../assets/faculties/pador.jpg";
import imgRasheed from "../assets/faculties/rasheed.jpg";
import imgSayco from "../assets/faculties/sayco.jpg";
import imgTadifa from "../assets/faculties/tadifa.jpg";
// ──────────────────────────────────────────────────────────────────────────────

const LINE = "bg-[#5671FF]/30";

const facultyMembers = [
  { name: "Al", imgSrc: imgAl },
  { name: "Derla", imgSrc: imgDerla },
  { name: "Espina", imgSrc: imgEspina },
  { name: "Firmalino", imgSrc: imgFirmalino },
  { name: "Jomel", imgSrc: imgJomel },
  { name: "Kempee", imgSrc: imgKempee },
  { name: "Lilian", imgSrc: imgLilian },
  { name: "Mogib", imgSrc: imgMogib },
  { name: "Narte", imgSrc: imgNarte },
  { name: "Pador", imgSrc: imgPador },
  { name: "Rasheed", imgSrc: imgRasheed },
  { name: "Sayco", imgSrc: imgSayco },
  { name: "Tadifa", imgSrc: imgTadifa },
];

const OrgChart = () => {
  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col relative overflow-hidden">

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(86,113,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(86,113,255,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-16 relative z-10">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <section className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Organizational <span className="text-[#5671FF]">Structure</span>
          </h1>
          <p className="max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            The leadership team driving innovation and excellence for the PSITS
            – WIT Chapter Academic Year 2023-2024.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5671FF]/30 bg-[#5671FF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5671FF]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5671FF] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5671FF]"></span>
            </span>
            Executive Board Active
          </div>
        </section>

        {/* ── Org Tree ─────────────────────────────────────────────────────── */}
        <section className="mb-24">
          {/* Outer dashed border container */}
          <div className="border border-dashed border-[#5671FF]/20 rounded-3xl p-8 md:p-12">

            {/* ── Level 1: Program Head ──────────────────── */}
            <div className="flex flex-col items-center">
              <OrgNode
                name="Pagatpat"
                role="Program Head"
                imgSrc={imgPagatpat}
                size="lg"
              />

              {/* Line down from L1 */}
              <div className={`w-px h-10 ${LINE}`}></div>

              {/* ── Horizontal bar for L2 ─────────────── */}
              <div className="relative w-full max-w-lg flex items-start justify-center">
                {/* Horizontal bar */}
                <div className={`absolute top-0 left-1/4 right-1/4 h-px ${LINE}`}></div>
                {/* Left drop */}
                <div className={`absolute top-0 left-1/4 w-px h-10 ${LINE}`}></div>
                {/* Right drop */}
                <div className={`absolute top-0 right-1/4 w-px h-10 ${LINE}`}></div>

                {/* ── Level 2 Cards ─────────────────────── */}
                <div className="flex w-full justify-around pt-10 gap-4">
                  <OrgNode
                    name="Bernardino"
                    role="IT Custodian"
                    imgSrc={imgBernardino}
                    size="md"
                  />
                  <OrgNode
                    name="Rachel"
                    role="IT Clerk"
                    imgSrc={imgRachel}
                    size="md"
                  />
                </div>
              </div>

              {/* Line down from L2 to L3 */}
              <div className={`w-px h-10 mt-0 ${LINE}`}></div>

              {/* ── Level 3: Faculty label ────────────── */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#5671FF]/20 bg-[#5671FF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5671FF] mb-6">
                Faculty
              </div>

              {/* ── Level 3: Faculty grid with connecting lines ─── */}
              <div className="w-full relative">
                {/* Top horizontal bar across all faculty */}
                <div className={`hidden md:block absolute top-0 left-0 right-0 h-px ${LINE}`}></div>

                {/* Faculty grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-4 gap-y-8 pt-0 md:pt-8">
                  {facultyMembers.map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center relative">
                      {/* Vertical drop from top bar to card */}
                      <div className={`hidden md:block w-px h-8 ${LINE} mb-0`}></div>
                      <OrgNode
                        name={member.name}
                        role="Faculty"
                        imgSrc={member.imgSrc}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Technical Committees ────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Technical Committees
              </h2>
              <div className="h-1 w-16 bg-[#5671FF]"></div>
              <p className="text-slate-400 text-sm mt-2">
                Specialized teams focusing on academic and project growth.
              </p>
            </div>
            <button className="bg-[#5671FF]/20 hover:bg-[#5671FF]/30 text-[#5671FF] border border-[#5671FF]/30 px-6 py-2.5 rounded-lg text-sm font-bold transition-all">
              View All Committees
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default OrgChart;
