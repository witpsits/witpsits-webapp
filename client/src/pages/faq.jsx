import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';

const faqs = [
  {
    question: "What is the PSITS - WIT Chapter?",
    answer: "The PSITS - WIT Chapter is the premier student organization for Information Technology students at our institution. We bridge the gap between academic learning and industry demands through seminars, workshops, and networking events."
  },
  {
    question: "How can I apply for membership?",
    answer: "You can apply for membership by filling out the online application form available on our website during the recruitment period at the start of each semester."
  },
  {
    question: "What resources are available for members?",
    answer: "Members have access to our digital library, exclusive technical workshops, mentorship programs, and networking events with industry professionals."
  },
  {
    question: "Can I volunteer for the organization committees?",
    answer: "Yes! We highly encourage members to join our various committees including Events, Technical, Creatives, and Public Relations."
  },
  {
    question: "Who do I contact for partnership inquiries?",
    answer: "For partnership inquiries, you can reach out to our External Vice President via the Contact Support button below or through our official email address."
  }
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-36 pb-16 flex flex-col">
        
        {/* Header Section */}
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked <span className="text-[#5671FF]">Questions</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Find quick answers about the Philippine Society of Information Technology 
              Students - West Visayas Institute of Technology Chapter.
            </p>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#5671FF]" />
            </div>
            <input 
              type="text" 
              placeholder="Search for memberships, events, or resources..." 
              className="w-full bg-[#1a2238] border border-[#5671FF]/40 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#5671FF] shadow-[0_0_15px_rgba(86,113,255,0.15)] transition-all"
            />
          </div>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col gap-4 mb-20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-[#1a2238] border border-[#5671FF]/20 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-[#5671FF] font-bold text-lg">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-[#5671FF] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#5671FF] flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Still Have Questions Section */}
        <ScrollReveal>
          <div className="bg-[#1a2238] rounded-2xl p-10 text-center shadow-[0_0_30px_rgba(86,113,255,0.05)] border border-[#5671FF]/10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              If you couldn't find what you were looking for, our team is ready to assist you personally.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-6 py-3 bg-[#5671FF] text-white font-bold rounded-lg transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(86,113,255,0.4)]">
                Contact Support
              </button>
              <button className="w-full sm:w-auto px-6 py-3 bg-[#0E1528] border border-white/10 text-white font-bold rounded-lg transition-colors hover:bg-white/5">
                Message on Facebook
              </button>
            </div>
          </div>
        </ScrollReveal>

      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
