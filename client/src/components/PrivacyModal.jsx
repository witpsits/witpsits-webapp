import React from 'react';

const PrivacyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0608]/80 backdrop-blur-md p-4 antialiased font-['Space_Grotesk',sans-serif]">
            <div className="relative w-full max-w-2xl bg-[#1a2238]/80 border border-[#5671FF]/50 shadow-[0_0_20px_rgba(86,113,255,0.3)] backdrop-blur-xl rounded-xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[10000] text-slate-400 hover:text-[#5671FF] transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>

                <div className="p-6 md:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-[#5671FF] scrollbar-track-transparent">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-[#5671FF]/20 border border-[#5671FF]/40 shrink-0">
                            <span className="material-symbols-outlined text-[#5671FF]">shield_person</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                            Privacy Policy
                        </h2>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-8 relative rounded-lg overflow-hidden border border-[#5671FF]/20 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1528] to-transparent opacity-80 z-10"></div>
                        <div
                            className="w-full h-32 md:h-40 bg-cover bg-center"
                            style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCElGDnG77R5XoH7I3YhOEHe2MtORpXYmFq4IxMwfO2oLVCS0xHRFBAXOFOprThYECBCYvG2Ey6Mia4etRErIFOtvdCYkylimYUMlWozTJlQv0GInURp6zRRA9iKxaa-buWyqXy6COpQajQ_ucGXy8dUcKFrJKGWGUY-eBi4Fwc33Lhv8qlS2HTUMNMOl3redxfFNAce6YaArbf8yYprBeSxt5e-NcKO-N07VHcxJDWzpZn7bOpRS2YChDiiwtTFYV1jCANQwcEi0Sc")',
                            }}
                        ></div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5671FF]">Secure Infrastructure</p>
                            <p className="text-slate-100 text-sm font-medium">Your data is encrypted and protected</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
                                <span className="size-1.5 bg-[#5671FF] rounded-full"></span>
                                Institutional Data Stewardship
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                The PSITS - WIT Chapter exercises uncompromising stewardship over constituent data. In strict adherence to the Data Privacy Act of 2012 (RA 10173), our digital infrastructure deploys cryptographic protocols to ensure the absolute confidentiality and integrity of your academic identity. We categorically prohibit the unauthorized dissemination, commercialization, or third-party brokering of sensitive institutional data.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                                <span className="size-1.5 bg-[#5671FF] rounded-full"></span>
                                Extracted Data Taxonomies
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-[#5671FF]/5 border border-[#5671FF]/10 rounded-lg hover:border-[#5671FF]/40 transition-colors">
                                    <span className="material-symbols-outlined text-[#5671FF] text-xl">badge</span>
                                    <div>
                                        <p className="text-slate-200 text-sm font-medium">Nominal Registration</p>
                                        <p className="text-slate-500 text-xs uppercase tracking-tighter">Cryptographic Identity Verification</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#5671FF]/5 border border-[#5671FF]/10 rounded-lg hover:border-[#5671FF]/40 transition-colors">
                                    <span className="material-symbols-outlined text-[#5671FF] text-xl">alternate_email</span>
                                    <div>
                                        <p className="text-slate-200 text-sm font-medium">Institutional Telemetry</p>
                                        <p className="text-slate-500 text-xs uppercase tracking-tighter">Authorized Academic Dispatch</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#5671FF]/5 border border-[#5671FF]/10 rounded-lg hover:border-[#5671FF]/40 transition-colors md:col-span-2">
                                    <span className="material-symbols-outlined text-[#5671FF] text-xl">groups_3</span>
                                    <div>
                                        <p className="text-slate-200 text-sm font-medium">Cohort & Stratification Designations</p>
                                        <p className="text-slate-500 text-xs uppercase tracking-tighter">Pedagogical Resource Segregation & Access Control</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-[#5671FF]/20">
                        <p className="text-slate-500 text-xs text-center md:text-left">
                            By closing this modal, you acknowledge that you have read and understood our data handling procedures.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-8 py-2.5 bg-[#FF602D] hover:bg-[#FF602D]/90 text-white rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(255,96,45,0.4)] shrink-0"
                        >
                            Accept & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;