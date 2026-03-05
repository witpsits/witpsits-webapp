import React, { useState } from 'react';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-xl">
            {/* Glassmorphism Form Container */}
            <div className="bg-[#1a2238]/80 backdrop-blur-xl border border-[#5671FF]/20 p-8 md:p-12 rounded-xl shadow-[0_0_30px_rgba(86,113,255,0.1)] relative overflow-hidden group">
                {/* Glowing edge effect */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5671FF]/50 to-transparent"></div>
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black mb-2 tracking-tight text-white">
                        Create Student Account
                    </h2>
                    <p className="text-slate-400">
                        Join the WIT Information Technology community
                    </p>
                </div>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-sm">
                                    person
                                </span>
                                <input
                                    className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
                                    placeholder="Juan Dela Cruz"
                                    type="text"
                                />
                            </div>
                        </div>
                        {/* Section/Year */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300 ml-1">
                                Section/Year
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-sm">
                                    grid_view
                                </span>
                                <input
                                    className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
                                    placeholder="BSIT 3-A"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Student Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">
                            Student Email
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-sm">
                                mail
                            </span>
                            <input
                                className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
                                placeholder="student@wit.edu.ph"
                                type="email"
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-sm">
                                lock
                            </span>
                            <input
                                className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5671FF]/50 hover:text-[#5671FF] transition-colors"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button
                            className="w-full bg-[#FF602D] text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(255,96,45,0.4)] hover:shadow-[0_0_30px_rgba(255,96,45,0.6)] hover:bg-[#FF602D]/90 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                            type="submit"
                        >
                            <span>CREATE ACCOUNT</span>
                            <span className="material-symbols-outlined text-lg">bolt</span>
                        </button>
                    </div>
                </form>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                    <span className="text-slate-400">Already have an account?</span>
                    <a className="text-[#5671FF] font-bold hover:underline" href="/login">
                        Log in here
                    </a>
                </div>
            </div>
            {/* Trust Badges */}
            <div className="mt-8 flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#5671FF]">verified_user</span>
                    <span className="text-xs font-medium uppercase tracking-widest text-[#5671FF]">
                        Secure WIT Network
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#5671FF]">school</span>
                    <span className="text-xs font-medium uppercase tracking-widest text-[#5671FF]">
                        IT Chapter Verified
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
