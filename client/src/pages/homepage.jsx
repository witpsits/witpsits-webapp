import React from 'react';
import { ArrowRight, ChevronRight, Code, Shield, BookOpen, Network, Rocket } from 'lucide-react';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-8">
        {/* Hero Section */}
        <section className="relative mb-16 overflow-hidden rounded-xl border border-[#5671FF]/20 bg-[#1a2238]">
          {/* Pattern Background */}
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: 'linear-gradient(45deg, #5671FF 25%, transparent 25%, transparent 50%, #5671FF 50%, #5671FF 75%, transparent 75%, transparent)',
              backgroundSize: '4px 4px'
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
                Latest Announcement
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-100">
                Empowering Future <br />
                <span className="text-[#5671FF] italic">IT Leaders</span>
              </h1>

              {/* Description */}
              <p className="max-w-md text-base leading-relaxed text-slate-400">
                Join the National IT Conference 2024. Experience the digital glitch revolution and connect with industry pioneers. Registration is now open for all WIT students.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="group flex h-12 items-center gap-2 rounded-lg bg-[#FF602D] px-8 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(255,96,45,0.5)]">
                  Secure Your Spot
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex h-12 items-center gap-2 rounded-lg border border-[#5671FF]/40 bg-transparent px-8 text-sm font-bold text-[#5671FF] transition-all hover:bg-[#5671FF]/10">
                  View Schedule
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden md:flex justify-center">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-2xl border border-[#5671FF]/30 shadow-[0_0_15px_rgba(86,113,255,0.1)] hover:border-[#5671FF] hover:shadow-[0_0_20px_rgba(86,113,255,0.25)] transition-all">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop"
                  alt="Digital Frontiers"
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1528]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex flex-col">
                  <span className="text-xs font-bold text-[#5671FF]">NITCON 2024</span>
                  <span className="text-lg font-bold text-white">Digital Frontiers</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 border-r-2 border-t-2 border-[#5671FF]/40 opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-[#5671FF]/40 opacity-50"></div>
            </div>
          </div>
        </section>

        {/* System Updates Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                System <span className="text-[#5671FF]">Updates</span>
              </h2>
              <div className="h-1 w-20 bg-[#5671FF]"></div>
            </div>
            <a href="#" className="group flex items-center gap-1 text-sm font-bold text-[#5671FF] transition-all">
              Browse Archive
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group flex flex-col overflow-hidden rounded-xl bg-[#1a2238] border border-[#5671FF]/20 hover:border-[#5671FF] hover:shadow-[0_0_20px_rgba(86,113,255,0.15)] transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                  alt="Tech Summit 2024"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#FF602D]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute right-4 top-4 rounded-lg bg-[#0E1528]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase text-[#5671FF]">
                  Conference
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 text-xs font-medium text-slate-500">October 25, 2024</span>
                <h3 className="mb-3 text-lg font-bold text-slate-100 group-hover:text-[#5671FF] transition-colors">
                  Tech Summit 2024
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  Join us for a day of innovation featuring guest speakers from leading tech companies in Asia.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <button className="text-xs font-bold uppercase tracking-widest text-[#5671FF] hover:underline">
                    Read Entry
                  </button>
                  <BookOpen className="w-5 h-5 text-[#5671FF]/50" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col overflow-hidden rounded-xl bg-[#1a2238] border border-[#5671FF]/20 hover:border-[#5671FF] hover:shadow-[0_0_20px_rgba(86,113,255,0.15)] transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
                  alt="Coding Bootcamp"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#FF602D]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute right-4 top-4 rounded-lg bg-[#0E1528]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase text-[#5671FF]">
                  Workshop
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 text-xs font-medium text-slate-500">November 10, 2024</span>
                <h3 className="mb-3 text-lg font-bold text-slate-100 group-hover:text-[#5671FF] transition-colors">
                  Coding Bootcamp
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  Master the art of full-stack development. Intense 48-hour challenge for WIT student developers.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <button className="text-xs font-bold uppercase tracking-widest text-[#5671FF] hover:underline">
                    Read Entry
                  </button>
                  <Code className="w-5 h-5 text-[#5671FF]/50" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col overflow-hidden rounded-xl bg-[#1a2238] border border-[#5671FF]/20 hover:border-[#5671FF] hover:shadow-[0_0_20px_rgba(86,113,255,0.15)] transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
                  alt="Cybersecurity Workshop"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#FF602D]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute right-4 top-4 rounded-lg bg-[#0E1528]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase text-[#5671FF]">
                  Alert
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 text-xs font-medium text-slate-500">December 05, 2024</span>
                <h3 className="mb-3 text-lg font-bold text-slate-100 group-hover:text-[#5671FF] transition-colors">
                  Cybersecurity Workshop
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  Protect the digital frontier. Hands-on training on network security and ethical hacking.
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <button className="text-xs font-bold uppercase tracking-widest text-[#5671FF] hover:underline">
                    Read Entry
                  </button>
                  <Shield className="w-5 h-5 text-[#5671FF]/50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="mb-16">
          <div className="mb-12 flex flex-col gap-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-100">
              Core <span className="text-[#5671FF]">Pillars</span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Our mission is to foster a community of tech excellence through three strategic focus areas designed for student growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="flex flex-col gap-6 rounded-2xl border border-[#5671FF]/20 bg-[#1a2238] p-8 transition-all hover:bg-[#5671FF]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5671FF]/10 text-[#5671FF]">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-slate-100">Academic Excellence</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Curated modules, study groups, and resource sharing to help you excel in your IT curriculum.
                </p>
              </div>
              <a href="#" className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5671FF]">
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
                <h3 className="mb-2 text-xl font-bold text-slate-100">Leadership Network</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Connect with the student council and alumni mentors who are shaping the chapter's future.
                </p>
              </div>
              <a href="#" className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5671FF]">
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
                <h3 className="mb-2 text-xl font-bold text-slate-100">Innovation Lab</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Showcasing top-tier student projects, capstones, and open-source contributions.
                </p>
              </div>
              <a href="#" className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5671FF]">
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
                Become a member of the PSITS WIT Chapter today and unlock exclusive access to workshops, resources, and networking events.
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
    </div>
  );
};

export default Homepage;