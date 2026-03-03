import React from 'react';

const ProspectusHeader = () => {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 md:px-20 py-4 bg-background-light dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-primary">
                    <div className="size-8 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">terminal</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
                        PSITS - WIT
                    </h2>
                </div>
                <nav className="hidden md:flex items-center gap-9">
                    <a
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                        href="#"
                    >
                        News
                    </a>
                    <a
                        className="text-primary text-sm font-semibold transition-colors"
                        href="#"
                    >
                        Resources
                    </a>
                    <a
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                        href="#"
                    >
                        Organization
                    </a>
                    <a
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                        href="#"
                    >
                        Admin
                    </a>
                </nav>
            </div>
            <div className="flex flex-1 justify-end gap-6 items-center">
                <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-primary/20">
                        <div className="text-slate-400 flex bg-slate-100 dark:bg-primary/10 items-center justify-center pl-4">
                            <span className="material-symbols-outlined text-[20px]">
                                search
                            </span>
                        </div>
                        <input
                            className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-primary/10 text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 text-sm font-normal px-4 pl-2"
                            placeholder="Search resources..."
                            value=""
                            onChange={() => { }}
                        />
                    </div>
                </label>
                <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <span>Student Portal</span>
                </button>
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30"
                    data-alt="User profile avatar icon"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtxqCuYQtYtnfPASESPrefcYfJ7w_gPqmYu0RQSdSVmFg-EDzs_qkb5Ov_ZN0fS4-VWY96ekSowA-1j0728-yBlvoQBoGwdvcB6Xu5-0YMIjgSvtnhBC38SpNXL13p82l9KUyk-x2YZ8hGdZaYAtz9zFnWJxDHFv-tnox_QMnXQrnWmw_RGAxYVYiIsIWEZm_VOdbTsOxpUuYW5Y7_qey43V4iZOGC-d2tItOA4dwRdnfL_irmRaC3vJn2UG4I9FFP1WpamYvFqpI")',
                    }}
                ></div>
            </div>
        </header>
    );
};

export default ProspectusHeader;
