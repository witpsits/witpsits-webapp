import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ShowcaseSidebar from '../components/showcase/ShowcaseSidebar';
import ShowcaseGrid from '../components/showcase/ShowcaseGrid';

const Showcase = () => {
    return (
        <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100">
            <Navbar />

            <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-8">
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    <ShowcaseSidebar />
                    <ShowcaseGrid />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Showcase;
