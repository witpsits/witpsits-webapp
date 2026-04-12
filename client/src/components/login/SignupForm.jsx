import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative mb-8 group">
                <div className="relative bg-[#1a2238] border border-[#5671FF]/20 rounded-xl overflow-hidden shadow-xl backdrop-blur-sm p-8">
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
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-lg">
                                    person
                                </span>
                                <input
                                    className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
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
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-lg">
                                    grid_view
                                </span>
                                <input
                                    className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
                                    placeholder="BSIT 3-A"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300 ml-1">
                            Email
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-lg">
                                mail
                            </span>
                            <input
                                className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
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
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-lg">
                                lock
                            </span>
                            <input
                                className="w-full bg-[#0E1528] border border-[#5671FF]/20 rounded-lg py-3.5 pl-12 pr-12 text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-[#5671FF] focus:border-[#5671FF] outline-none transition-all hover:border-[#5671FF]/40"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 hover:text-[#5671FF] transition-colors"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined text-lg">
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
                    <Link className="text-[#5671FF] font-bold hover:underline" to="/login">
                        Log in here
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
