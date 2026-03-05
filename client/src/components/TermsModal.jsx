import React, { useState, useEffect } from 'react';

const TermsModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        // Check local storage to see if user has already agreed
        const hasAgreed = localStorage.getItem('psitsTermsAgreed');
        if (!hasAgreed) {
            setIsOpen(true);
        }
    }, []);

    const handleAgree = () => {
        if (agreed) {
            localStorage.setItem('psitsTermsAgreed', 'true');
            setIsOpen(false);
        }
    };

    const handleDecline = () => {
        // In a real app, declining might redirect them or disable app functionality
        alert("You must agree to the Terms and Conditions to use this platform.");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm antialiased font-['Space_Grotesk',sans-serif]">
            {/* Terms and Conditions Modal */}
            <div className="relative w-full max-w-2xl bg-[#0a0608] border border-[#5671FF]/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(86,113,255,0.3),inset_0_0_5px_rgba(86,113,255,0.2)] flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="p-6 border-b border-[#5671FF]/20 flex justify-between items-center bg-[#1a2238]">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                            Terms and Conditions
                        </h2>
                        <p className="text-[#5671FF]/70 text-xs font-medium uppercase tracking-widest mt-1">
                            Legal Agreement & Guidelines
                        </p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-[#5671FF] transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#0E1528] scrollbar-thin scrollbar-thumb-[#5671FF] scrollbar-track-[#5671FF]/10">
                    {/* Section: User Responsibility */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">
                                account_circle
                            </span>
                            <h3 className="text-lg font-bold text-[#5671FF]">User Responsibility</h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>
                                By accessing the PSITS - WIT Chapter platform, you acknowledge that
                                you are a registered student or faculty member of the Western
                                Institute of Technology. You are responsible for maintaining the
                                confidentiality of your account credentials.
                            </p>
                            <p>
                                Any activity performed through your account is your sole
                                responsibility. Users are expected to conduct themselves
                                professionally and ethically, reflecting the values of the
                                Information Technology profession.
                            </p>
                        </div>
                    </section>

                    {/* Section: Organization Guidelines */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">
                                account_tree
                            </span>
                            <h3 className="text-lg font-bold text-[#5671FF]">
                                Organization Guidelines
                            </h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>
                                The PSITS platform is designed to facilitate academic growth,
                                networking, and organizational efficiency. Users must adhere to the
                                following community standards:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-[#5671FF]/80">
                                <li>
                                    <span className="text-slate-300">
                                        No harassment or cyberbullying of fellow members.
                                    </span>
                                </li>
                                <li>
                                    <span className="text-slate-300">
                                        Accurate representation of organizational roles and academic
                                        status.
                                    </span>
                                </li>
                                <li>
                                    <span className="text-slate-300">
                                        Compliance with the WIT Student Handbook and National PSITS
                                        regulations.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section: Content Usage */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">
                                description
                            </span>
                            <h3 className="text-lg font-bold text-[#5671FF]">Content Usage</h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>
                                All resources, academic materials, and news published on this
                                platform are protected by intellectual property rights. You are
                                permitted to use these materials for personal academic purposes
                                only.
                            </p>
                            <p>
                                Redistribution, commercial use, or unauthorized modification of
                                platform content is strictly prohibited without prior written
                                consent from the WIT Chapter Administration.
                            </p>
                        </div>
                    </section>

                    {/* Section: Privacy & Data */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">
                                security
                            </span>
                            <h3 className="text-lg font-bold text-[#5671FF]">
                                Privacy & Data Protection
                            </h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>
                                We value your privacy. Your personal data is collected solely for
                                organizational management and verification. We do not sell or share
                                your information with third-party advertisers.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-[#1a2238] border-t border-[#5671FF]/20 flex flex-col sm:flex-row gap-4 relative z-10">
                    <div className="flex-1 flex items-start gap-3">
                        <input
                            className="mt-1 h-4 w-4 rounded border-[#5671FF]/50 bg-[#0E1528] text-[#5671FF] focus:ring-[#5671FF] focus:ring-offset-[#1a2238] cursor-pointer"
                            id="agree-check"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label
                            className="text-xs text-slate-400 leading-tight cursor-pointer hover:text-slate-300"
                            htmlFor="agree-check"
                        >
                            I confirm that I have read, understood, and agree to be bound by the
                            PSITS - WIT Chapter Terms and Conditions and Privacy Policy.
                        </label>
                    </div>
                    <div className="flex gap-3 justify-end shrink-0">
                        <button
                            onClick={handleDecline}
                            className="px-6 py-2 rounded-lg border border-[#5671FF]/40 text-[#5671FF] font-bold text-sm hover:bg-[#5671FF]/10 transition-all"
                        >
                            Decline
                        </button>
                        <button
                            onClick={handleAgree}
                            disabled={!agreed}
                            className={`px-8 py-2 rounded-lg font-bold text-sm transition-all ${agreed
                                    ? 'bg-[#FF602D] text-white hover:bg-[#FF602D]/90 hover:shadow-[0_0_15px_rgba(255,96,45,0.5)] cursor-pointer'
                                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            I Agree
                        </button>
                    </div>
                </div>

                {/* Accent Decorative Element */}
                <div className="absolute top-0 right-0 p-2 opacity-[0.03] z-0 pointer-events-none">
                    <span className="material-symbols-outlined text-9xl text-[#5671FF] select-none">
                        verified_user
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
