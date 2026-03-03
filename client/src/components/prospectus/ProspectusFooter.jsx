import React from 'react';

const ProspectusFooter = () => {
    return (
        <footer className="border-t border-primary/10 py-8 px-6 md:px-20 bg-slate-100 dark:bg-black/20 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-primary opacity-50">
                    <span className="material-symbols-outlined">terminal</span>
                    <span className="text-sm font-medium">© 2024 PSITS WIT Chapter</span>
                </div>
                <div className="flex gap-8">
                    <a
                        className="text-slate-400 hover:text-primary text-sm transition-colors"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                    <a
                        className="text-slate-400 hover:text-primary text-sm transition-colors"
                        href="#"
                    >
                        Terms of Service
                    </a>
                    <a
                        className="text-slate-400 hover:text-primary text-sm transition-colors"
                        href="#"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default ProspectusFooter;
