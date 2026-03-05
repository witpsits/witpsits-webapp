import React, { useState } from 'react';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-md">
            {/* Hero Card Section */}
            <div className="relative mb-8 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5671FF] to-[#FF602D] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-[#1a2238] border border-[#5671FF]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(86,113,255,0.05)] backdrop-blur-sm">
                    <div className="h-32 w-full bg-[#5671FF]/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2238] to-transparent opacity-80"></div>
                        <img
                            alt="Cybersecurity and technology pattern"
                            className="w-full h-full object-cover mix-blend-overlay opacity-50"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACCWNdTLi1_p46wYigpfxcvbPV93UBnjbs6jaJZjwMRtcDC9QepfbP0jknyqOScQtmL7EECczOa-vI2E3AfoiQLSU5FC6C6U_srT95F4ldudecytCuTk4bFCvVlIK7WmRdkjNTA1cUYeJZE9Vh1lcXYsJ4gGc8WqzJ8S6XfRv3RHJzPkJQnwVxXaV2ImKuCnRlO0P27BIQLJD5OlzitMv4B7aYPsp-n4_YG08tA8aV6L5yCdlfpC2SqSPe9ruzaRJMqQakodSAMb-7"
                        />
                        <div className="absolute bottom-4 left-6">
                            <h2 className="text-3xl font-black tracking-tight text-white">
                                Student Login
                            </h2>
                            <p className="text-[#5671FF] text-xs font-bold uppercase tracking-widest mt-1">
                                Academic Portal Access
                            </p>
                        </div>
                    </div>
                    <div className="p-8">
                        <form className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">
                                    Student Email
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-lg">
                                        alternate_email
                                    </span>
                                    <input
                                        className="w-full bg-[#0E1528] border border-[#5671FF]/20 focus:border-[#5671FF] focus:ring-1 focus:ring-[#5671FF] rounded-lg py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-500 transition-all outline-none hover:border-[#5671FF]/40"
                                        placeholder="student.name@wit.edu.ph"
                                        type="email"
                                    />
                                </div>
                            </div>
                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-semibold text-slate-300">
                                        Password
                                    </label>
                                    <a
                                        className="text-xs font-bold text-[#5671FF] hover:text-[#5671FF]/80 transition-colors"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5671FF]/50 text-lg">
                                        lock
                                    </span>
                                    <input
                                        className="w-full bg-[#0E1528] border border-[#5671FF]/20 focus:border-[#5671FF] focus:ring-1 focus:ring-[#5671FF] rounded-lg py-3.5 pl-12 pr-12 text-slate-100 placeholder:text-slate-500 transition-all outline-none hover:border-[#5671FF]/40"
                                        placeholder="••••••••••••"
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
                            {/* Remember Me */}
                            <div className="flex items-center gap-2 ml-1">
                                <input
                                    className="rounded border-[#5671FF]/30 bg-[#0E1528] text-[#5671FF] focus:ring-[#5671FF] focus:ring-offset-[#1a2238] form-checkbox transition-colors"
                                    id="remember"
                                    type="checkbox"
                                />
                                <label
                                    className="text-xs text-slate-400 font-medium cursor-pointer hover:text-slate-300 transition-colors"
                                    htmlFor="remember"
                                >
                                    Keep me logged in for 30 days
                                </label>
                            </div>
                            {/* Login Button */}
                            <button className="w-full bg-[#FF602D] hover:bg-[#FF602D]/90 text-white font-bold py-4 rounded-lg shadow-[0_0_15px_rgba(255,96,45,0.3)] hover:shadow-[0_0_25px_rgba(255,96,45,0.5)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">login</span>
                                SIGN IN TO PORTAL
                            </button>
                        </form>
                        <div className="mt-8 pt-6 border-t border-[#5671FF]/10 flex flex-col items-center gap-4">
                            <p className="text-xs text-slate-500">
                                Not a member of PSITS WIT yet?
                            </p>
                            <button className="text-sm font-bold text-[#5671FF] hover:text-[#5671FF]/80 transition-colors uppercase tracking-widest">
                                Apply for Membership
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
                Protected by WIT Secure-Gate Systems
            </p>
        </div>
    );
};

export default LoginForm;
