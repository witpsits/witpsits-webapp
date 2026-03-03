import React from 'react';

const showcaseData = [
    {
        title: "National Programming Champions 2024",
        description: "Awarded for exceptional performance in the ICPC regional finals.",
        tag: "Competitions",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIwPYvguQ7KKvML3RiI6nEodKF5GT_9L9rwYGmo8sHKsYIRR2Tec3u9gGVDhim05-4WBY6b_6ih1aHc7NhSnElmOGDF0ZrYv6ccKuZN6iHLJ7Dg17NO95Hc05xERLL_kH7_FrSwIphxb15GFv8GpOiJPflCBYnUTn09lfykye5bqJUk-RHTK8ZIB-pwYiIK6lUEFuifHa7-YTx6EZKSsqVjb9H3g639o6vEu8I5hU4rmnozO30Iyisyuiwd_ohRqunvr08yCBXgL4",
        aspect: "aspect-[4/5]"
    },
    {
        title: "WIT Student Portal Redesign",
        description: "A full-stack overhaul of the university student experience platform.",
        tag: "Projects",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyoiYYrdTU6liRRpDNMGe32MTsS69WyDzM3BaQ0Xgtm5jjpL5ANAsUIIRAY8t3QRewrIAnwT20Wgc2LxfhZLMdVhUA0HDOc7ZS743H4Qi8nj1IOjSUvkVVeMvJlVkxsg7AQncBeHJ6-d7DJgtjFJTYINBzejAZ59ubr-pbBjmxdFbXskEcMFwoW-yb91KC5_7Nd2XK0hUQ5fEPSOqriKI3rWbcGNtEQL4etPlmQ0xaNzM4XWs72jC1ivQKD1Yd5hGVtrxKXaQdtvI",
        aspect: "aspect-square"
    },
    {
        title: "AWS Cloud Certified Batch",
        description: "Celebrating 50+ students achieving AWS Solutions Architect certifications.",
        tag: "Certifications",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCvlv208c9_qagnZ6pIpxM032SbtPU34Lno84HutBT_BhjMFXQy-jlje9h5yCpYUgqgIAFpMyB7x8tK6n0mlXP1awt_oQ7khNY8rB6Nsi0gUCfnVmm0kL9bGj09md9hdPgxBOMMspqMaU5G77RwNJfjytC0MSesIbyN-0vgn1N8ZSy6b1qQnzjcorWIqm-z8s6INhClbnyz95fftzbEVs0T6HloZxcdWx175qGvS9nMNayCjn4DCnFzflzY2wfbGvaCxdEhM28lY4",
        aspect: "aspect-[3/4]"
    },
    {
        title: "WIT Tech Expo 2023 First Place",
        description: "Top honors for the IoT Home Security System prototype.",
        tag: "Competitions",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx5ty_f3-BiuDDNiC_gwwzoxabqLmIfjS3cXFagdJadI3vj8Ny2oGBL4VW__4G7wmwtm6yONUcPq_lC5GXuAtF6kKhr9I_3YEbew6wTgEb7K01Lm0KduyF_ZAytxfPYeZ-J0jfUKTqU0vmv8fFpBdLfo1Z1b1LJ7_CPLoMus2zxQjMT9QbQlWvBbURyz3T0BEK2GtYCXJblRjqlXABwV3DuwmgVrjy5em0TQoN7oSZpaRbdcRRh0im1sPly5wbxhrPldPjCnJ0B9k",
        aspect: "aspect-video"
    },
    {
        title: "HealthTech Data Insights",
        description: "A mobile application for predictive health tracking using AI.",
        tag: "Projects",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWN5en4qn4W_8gtCdrRB0Gs1hz9K_UhgCuivB-uubsY_qTzRpDZcFUKC6V3zb_cU3QmnaMVsPiSyCDRMYGKCvrAgYA1hmB8wQoe3lA2Bb7KUP8ZFDZZjDkMLCTBIVjtmHOxfSljp1lTDvysG0wc2sZ6O8o-xtgS9ITIbBzQ9D8ErmJaHgbddM4maG39nr4iaobCxMize9jYbFrZcfnMgymBCQ14BUh7ejl2EqOcL9qNJ09Ibx9gfdAHz1clF3Mtx8js17fydobR9Y",
        aspect: "aspect-[4/5]"
    },
    {
        title: "Regional Startup Pitch Winners",
        description: "WIT entrepreneurs taking the lead in innovation.",
        tag: "Competitions",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAacmv-UN_yxxsL_T_rbgO9ReM1NdrVtn46ICvqPMCwz47PBeCjB4SHeafkP7iTXJxtsIM3zQGg-dnIGy2Ap2kt1sCJK2jEkkPv4jv2NbiIstTyifrDmyUwdhUXwBGgM1-6Wpq8vvlvbS9qRQjFjECOdDZ7f8oKr6e7rQQX2L0i9IjES9pRtAEU9f_cvd-uOuX7RqgRmgfSGYb33tXVp2b7Y9tx3zDYGgbC_pvsCRZDNM4aQNBiwgJw6-EHDEw-gld-VvccRocm3Wc",
        aspect: "aspect-square"
    }
];

const ShowcaseGrid = () => {
    return (
        <div className="flex-1">
            <div className="flex flex-col gap-2 mb-8">
                <nav className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <a className="hover:text-[#5671FF] transition-colors" href="/">Home</a>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="text-[#5671FF] font-medium">Showcase</span>
                </nav>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-100 tracking-tight">
                    Showcase &amp; <span className="text-[#5671FF] underline decoration-[#5671FF]/30 decoration-4 underline-offset-8">Achievements</span>
                </h1>
                <p className="text-slate-400 text-lg mt-4 max-w-2xl font-light">
                    Celebrating student excellence and organizational milestones in Information Technology at WIT.
                </p>
            </div>

            <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                {showcaseData.map((item, index) => (
                    <div key={index} className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-[#1a2238] border border-[#5671FF]/10 hover:border-[#5671FF]/50 transition-all hover:shadow-[0_0_20px_rgba(86,113,255,0.2)]">
                        <div className={`${item.aspect} bg-cover bg-center`} style={{ backgroundImage: `url('${item.image}')` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1528] via-[#0E1528]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
                        </div>
                        <div className="absolute bottom-0 p-6 w-full">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#5671FF]/20 text-[#5671FF] text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-md border border-[#5671FF]/30">{item.tag}</span>
                            <h3 className="text-xl font-bold text-white leading-snug group-hover:text-[#5671FF] transition-colors">{item.title}</h3>
                            <p className="text-slate-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#5671FF]/30 text-[#5671FF] font-bold hover:bg-[#5671FF] hover:text-white transition-all">
                    <span>View More Achievements</span>
                    <span className="material-symbols-outlined">expand_more</span>
                </button>
            </div>
        </div>
    );
};

export default ShowcaseGrid;
