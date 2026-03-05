import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import SignupForm from '../components/login/SignupForm';

const Signup = () => {
    return (
        <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col overflow-x-hidden relative">
            {/* Abstract Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#5671FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#FF602D]/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-12 w-full max-w-[1440px] mx-auto z-10">
                <SignupForm />
            </main>

            {/* Footer */}
            <Footer className="relative z-10" />
        </div>
    );
};

export default Signup;
