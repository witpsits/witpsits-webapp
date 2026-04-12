import React, { useState, useEffect } from 'react';

const TermsModal = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);

    // Auto-show on first visit if not controlled externally
    useEffect(() => {
        if (externalIsOpen === undefined) {
            const hasAgreed = localStorage.getItem('psitsTermsAgreed');
            if (!hasAgreed) {
                setInternalIsOpen(true);
            }
        }
    }, [externalIsOpen]);

    // Reset checkbox when modal reopens
    useEffect(() => {
        if (isOpen) setAgreed(false);
    }, [externalIsOpen, internalIsOpen]);

    const isControlled = externalIsOpen !== undefined;
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const handleClose = () => {
        if (isControlled) {
            externalOnClose?.();
        } else {
            setInternalIsOpen(false);
        }
    };

    const handleAgree = () => {
        if (agreed) {
            localStorage.setItem('psitsTermsAgreed', 'true');
            handleClose();
        }
    };

    const handleDecline = () => {
        alert("You must agree to the Terms and Conditions to use this platform.");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm antialiased font-['Space_Grotesk',sans-serif]">
            <div className="relative w-full max-w-2xl bg-[#0a0608] border border-[#5671FF]/50 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(86,113,255,0.3),inset_0_0_5px_rgba(86,113,255,0.2)] flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-[#5671FF]/20 flex justify-between items-center bg-[#1a2238]">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Terms and Conditions</h2>
                        <p className="text-[#5671FF]/70 text-xs font-medium uppercase tracking-widest mt-1">Legal Agreement & Guidelines</p>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-[#5671FF] transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#0E1528] scrollbar-thin scrollbar-thumb-[#5671FF] scrollbar-track-[#5671FF]/10">
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">account_balance</span>
                            <h3 className="text-lg font-bold text-[#5671FF]">Academic Integrity & Institutional Conduct</h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>By accessing the official Information Technology (IT) platform of the Western Institute of Technology (WIT) - PSITS Chapter, you formally acknowledge your status as a registered scholar or faculty member of the institution. You agree to be strictly bound by the academic policies, computing ethics, and behavioral standards dictated by the College of Information Technology and the Office of Student Affairs.</p>
                            <p>You bear incontrovertible responsibility for securing your authenticated credentials. Furthermore, you stipulate that all interactions conducted under your digital identity shall exhibit the highest degree of professionalism, propriety, and intellectual honesty, reflecting the core competencies expected of aspiring IT professionals.</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">policy</span>
                            <h3 className="text-lg font-bold text-[#5671FF]">Platform Utilization & Governance</h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>The PSITS portal is an academic instrument engineered to optimize institutional communication, bureaucratic efficiency, and pedagogical resource distribution. To maintain the integrity of this digital ecosystem, members are categorically enjoined from the following:</p>
                            <ul className="list-disc pl-5 space-y-2 text-[#5671FF]/80">
                                <li><span className="text-slate-300">Perpetrating any form of cyber-harassment, discrimination, or digital malfeasance against institutional peers or faculty.</span></li>
                                <li><span className="text-slate-300">Falsifying academic standing, organizational hierarchy, or institutional affiliation.</span></li>
                                <li><span className="text-slate-300">Engaging in actions that contravene the stipulations outlined in the institutional Student Handbook or the constitutional bylaws of the PSITS National Federation.</span></li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">copyright</span>
                            <h3 className="text-lg font-bold text-[#5671FF]">Intellectual Property Rights</h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>All academic prospectuses, institutional announcements, proprietary frameworks, and ancillary literature disseminated through this platform fall under the purview of strict intellectual property protections held by the Western Institute of Technology. Authorized personnel and active students are granted a non-transferable mandate to utilize these materials strictly for personal scholarly advancement.</p>
                            <p>Any unauthorized replication, commercial exploitation, or extra-institutional distribution of proprietary content is emphatically prohibited, and any infringement thereof shall be subject to disciplinary adjudication by the appropriate academic tribunal.</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#5671FF] text-xl">gpp_good</span>
                            <h3 className="text-lg font-bold text-[#5671FF]">Privacy Jurisprudence</h3>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                            <p>Institutional governance prioritizing your digital privacy is maintained in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173). Personal identifiers are extracted exclusively for verifying academic enrollment and managing organizational logistics. The administration unequivocally renounces the unauthorized monetization or external brokering of constituent demographic data.</p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 bg-[#1a2238] border-t border-[#5671FF]/20 flex flex-col sm:flex-row gap-4 relative z-10">
                    <div className="flex-1 flex items-start gap-3">
                        <input
                            className="mt-1 h-4 w-4 rounded border-[#5671FF]/50 bg-[#0E1528] text-[#5671FF] focus:ring-[#5671FF] focus:ring-offset-[#1a2238] cursor-pointer"
                            id="agree-check"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <label className="text-xs text-slate-400 leading-tight cursor-pointer hover:text-slate-300" htmlFor="agree-check">
                            I confirm that I have read, understood, and agree to be bound by the PSITS - WIT Chapter Terms and Conditions and Privacy Policy.
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
                            className={`px-8 py-2 rounded-lg font-bold text-sm transition-all ${agreed ? 'bg-[#FF602D] text-white hover:bg-[#FF602D]/90 hover:shadow-[0_0_15px_rgba(255,96,45,0.5)] cursor-pointer' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                        >
                            I Agree
                        </button>
                    </div>
                </div>

                <div className="absolute top-0 right-0 p-2 opacity-[0.03] z-0 pointer-events-none">
                    <span className="material-symbols-outlined text-9xl text-[#5671FF] select-none">verified_user</span>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;