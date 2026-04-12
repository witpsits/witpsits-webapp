import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollReveal from '../components/ScrollReveal';
import LoginForm from '../components/login/LoginForm';

const Login = () => {
    return (
        <div className="min-h-screen bg-[#0E1528] font-['Space_Grotesk',sans-serif] text-slate-100 flex flex-col overflow-x-hidden">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-12 w-full max-w-[1440px] mx-auto">
                <ScrollReveal direction="down">
                    <LoginForm />
                </ScrollReveal>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Login;
