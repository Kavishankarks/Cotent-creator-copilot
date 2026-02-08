import React from 'react';

const LandingIntro: React.FC = () => {
    const workflowSteps = [
        { icon: 'lightbulb', label: 'Idea' },
        { icon: 'face', label: 'Style Profile' },
        { icon: 'article', label: 'Content Plan' },
        { icon: 'record_voice_over', label: 'Voiceover' },
        { icon: 'graphic_eq', label: 'Transcription' },
        { icon: 'closed_caption', label: 'Captions' },
        { icon: 'download', label: 'Export' },
    ];

    const platforms = [
        { name: 'Reels', icon: 'photo_camera' },
        { name: 'Shorts', icon: 'play_circle' },
        { name: 'YouTube', icon: 'smart_display' },
        { name: 'TikTok', icon: 'music_note' },
        { name: 'LinkedIn', icon: 'work' },
        { name: 'Twitter', icon: 'tag' },
    ];

    const pricingPlans = [
        { name: 'Free Trial', price: '$0', features: ['3 projects', '3 seats', 'Basic support'] },
        { name: 'Creator', price: '$29/mo', features: ['Unlimited projects', '5 seats', 'Priority support'], popular: true },
        { name: 'Team', price: '$79/mo', features: ['Unlimited projects', '15 seats', 'Dedicated support'] },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-3 sm:p-4 justify-between border-b border-slate-200 dark:border-slate-800">
                <div className="text-slate-900 dark:text-white flex size-8 sm:size-10 items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">menu</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-base sm:text-lg font-bold leading-tight tracking-tight flex-1 text-center">Content Creator Copilot</h2>
                <div className="size-8 sm:size-10"></div>
            </div>

            <div className="relative flex w-full flex-col overflow-x-hidden pt-12 sm:pt-14">
                {/* Hero Section */}
                <div className="relative min-h-[80vh] sm:min-h-[85vh] w-full">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiWDcej21qxERmWt1qAzzKAdnNDy4PG2IQvDida4Mgj7PQ3kZCDB_KpolRiS2mYXkTmo7bRTE_j2AOGW-5bZMukcSaNxQ3n1mPtA3MokjCZVbHoKoDF1kRSocbMvui_WM1ybgvwR11NJ9g2TPekcmU3s_aUTfRrwK6HDhkovpnKD0RVkLlJ0mk4u8ybbhKyWnpcqZNy5fkbTHrvBFrlA7XNIPq4FkzrTYiTjgO78LGN76qc3mZUV32xqrepAq0pDP-7mCbOjUVQwvJ")' }}>
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="absolute inset-0 hero-gradient"></div>
                    </div>
                    <div className="relative flex h-full min-h-[80vh] sm:min-h-[85vh] flex-col items-center justify-end px-4 sm:px-6 pb-16 sm:pb-20 text-center">
                        <div className="flex flex-col gap-3 sm:gap-4 max-w-lg">
                            <span className="inline-flex self-center px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-primary/30">Next-Gen AI SaaS</span>
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                                Transform Ideas Into <br className="hidden sm:block" />Video Packages
                            </h1>
                            <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed opacity-90 px-2">
                                A production-grade multi-tenant SaaS platform that helps creators generate short-form and long-form content with AI.
                            </p>
                            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-center">
                                <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 sm:h-14 px-6 sm:px-8 bg-primary text-background-dark text-sm sm:text-base font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                                    Get Started Free
                                </button>
                                <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 sm:h-14 px-6 sm:px-8 bg-white/10 text-white border border-white/20 text-sm sm:text-base font-bold backdrop-blur-sm hover:bg-white/20 transition-colors">
                                    Watch Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Workflow Pipeline Section */}
                <section className="px-4 sm:px-6 py-10 sm:py-16 bg-slate-50 dark:bg-[#0d181c]">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2 sm:mb-3">AI-Powered Workflow</h2>
                            <p className="text-slate-500 dark:text-[#9db2b9] text-sm sm:text-base max-w-md mx-auto">From idea to export pack in minutes, not hours.</p>
                        </div>
                        {/* Desktop: Single row with arrows */}
                        <div className="hidden md:flex items-center justify-center gap-1">
                            {workflowSteps.map((step, index) => (
                                <React.Fragment key={step.label}>
                                    <div className="flex flex-col items-center gap-2 px-3">
                                        <div className="size-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center border border-primary/30">
                                            <span className="material-symbols-outlined text-primary text-2xl">{step.icon}</span>
                                        </div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center whitespace-nowrap">{step.label}</span>
                                    </div>
                                    {index < workflowSteps.length - 1 && (
                                        <div className="flex items-center text-primary/50 px-1">
                                            <span className="material-symbols-outlined text-xl">chevron_right</span>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        {/* Mobile: Horizontal scroll */}
                        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
                            <div className="flex items-center gap-2 min-w-max">
                                {workflowSteps.map((step, index) => (
                                    <React.Fragment key={step.label}>
                                        <div className="flex flex-col items-center gap-1.5 px-2">
                                            <div className="size-11 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center border border-primary/30">
                                                <span className="material-symbols-outlined text-primary text-lg">{step.icon}</span>
                                            </div>
                                            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 text-center whitespace-nowrap">{step.label}</span>
                                        </div>
                                        {index < workflowSteps.length - 1 && (
                                            <div className="flex items-center text-primary/40">
                                                <span className="material-symbols-outlined text-base">chevron_right</span>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Support Section */}
                <section className="px-4 sm:px-6 py-10 sm:py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-10">
                            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2 sm:mb-3">Multi-Platform Ready</h2>
                            <p className="text-slate-500 dark:text-[#9db2b9] text-sm sm:text-base">Optimized exports for all major content platforms.</p>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                            {platforms.map((platform) => (
                                <div key={platform.name} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-slate-100 dark:bg-[#1c2427] border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">{platform.icon}</span>
                                    <span className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">{platform.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Tools Section */}
                <section className="px-4 sm:px-6 py-10 sm:py-16 bg-slate-50 dark:bg-[#0d181c]">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col gap-1 mb-6 sm:mb-8">
                            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight">Core AI Tools</h2>
                            <p className="text-slate-500 dark:text-[#9db2b9] text-sm sm:text-base">Master the core tools in minutes.</p>
                        </div>
                        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
                            {/* Whisper Card */}
                            <div className="flex flex-col overflow-hidden rounded-2xl glass-card shadow-xl group">
                                <div className="w-full h-40 sm:h-48 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUVi_znlflg_LmFTJt6GkrcYn_3tFfdMrn-DCzpWRB3oydnw933LMaYEGWdW4dI7eIjDPa43xG70x9A-9R0_lxMBmYSGA9hZRrQ_RaqkD2vyfAZWIJEY98-9TCAvpqJCFS3sW3X1ZdAJ3rtyDz7GTo1DVy9WbMY5AZU1vBBi0xGhKgpTa35qjPdr6EDhSUGDDJb6lC1md6TBnLWldKWOxYmPZAcXjtoUhjntlxOmTcSrMQkrB1OVJX8EYU71IUusLeUuPyqwM_DfrE")' }}></div>
                                <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg sm:text-xl">graphic_eq</span>
                                        <p className="text-white text-lg sm:text-xl font-bold tracking-tight">Whisper Transcription</p>
                                    </div>
                                    <p className="text-[#9db2b9] text-sm sm:text-base font-normal leading-normal">Flawless audio-to-text with high-detail precision and noise isolation.</p>
                                    <button className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-9 sm:h-10 px-4 bg-primary/10 text-primary border border-primary/30 text-xs sm:text-sm font-bold hover:bg-primary/20 transition-colors">
                                        Explore Whisper
                                    </button>
                                </div>
                            </div>
                            {/* TTS Card */}
                            <div className="flex flex-col overflow-hidden rounded-2xl glass-card shadow-xl group">
                                <div className="w-full h-40 sm:h-48 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYsummO5izRBfm_TwzyGkmOTm-dzjwIiVRKl0p4TCv1UkcBekkm7LVva2FwoVL9FI6M8ABmQkgnrXXyux79G_neWD-SIdW2Uy3Gk1Z7kbCye8t-iLyrFXmdqlvm197GKpAAcn4MKW1jeUCewFyZIRu-MJJtQA2hv7A-aunpKY0RYxKt-0Ia6r7qKqcWzzbx2gKkC3nQmoE-zGBnpOLEoIJsJvtdLgHM3eHBv_qNhxrg7pJyKnowmwBgTNLTYKUiZg6oSSV8WwwreV9")' }}></div>
                                <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg sm:text-xl">record_voice_over</span>
                                        <p className="text-white text-lg sm:text-xl font-bold tracking-tight">TTS Voiceover</p>
                                    </div>
                                    <p className="text-[#9db2b9] text-sm sm:text-base font-normal leading-normal">Human-grade AI voices across 40+ languages.</p>
                                    <button className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-9 sm:h-10 px-4 bg-primary/10 text-primary border border-primary/30 text-xs sm:text-sm font-bold hover:bg-primary/20 transition-colors">
                                        Try Voiceover
                                    </button>
                                </div>
                            </div>
                            {/* GPT Card */}
                            <div className="flex flex-col overflow-hidden rounded-2xl glass-card shadow-xl group">
                                <div className="w-full h-40 sm:h-48 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGLGzT0wEOwlIS9BwYWPeDiMaRN_ymp2IEWagAZ2CrqBbc6ITy_T5yxyCTW9hKdJj0y3u6PK4d2RcxoPklYVUGOzLDVXuGbDwImpLp8q3HuTTrYgStNUc7cewy9_Z8hB84B8mduRo8q8Y7jsPuRaWOr4DR0l9_nGYQ-nTzzioVRoE6-GiOHVCCgTUxO7RH0HqoVN8L47TOMsblHN4W4GPCXJXV5sCJVN3gA9tkiVlcFblVIFE_MPb_0ZGldvMewuRqjretnTbQKSoK")' }}></div>
                                <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-5">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-lg sm:text-xl">auto_fix_high</span>
                                        <p className="text-white text-lg sm:text-xl font-bold tracking-tight">GPT Scripting</p>
                                    </div>
                                    <p className="text-[#9db2b9] text-sm sm:text-base font-normal leading-normal">From idea to storyboard with one prompt.</p>
                                    <button className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-9 sm:h-10 px-4 bg-primary/10 text-primary border border-primary/30 text-xs sm:text-sm font-bold hover:bg-primary/20 transition-colors">
                                        Generate Scripts
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SaaS Features Section */}
                <section className="px-4 sm:px-6 py-10 sm:py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-10">
                            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2 sm:mb-3">Enterprise-Ready Features</h2>
                            <p className="text-slate-500 dark:text-[#9db2b9] text-sm sm:text-base">Built for teams, designed for scale.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            {[
                                { icon: 'domain', title: 'Multi-Tenancy', desc: 'Isolated workspaces' },
                                { icon: 'group', title: 'Team RBAC', desc: 'Owner, Admin, Editor' },
                                { icon: 'payments', title: 'Tiered Billing', desc: 'Usage metering' },
                                { icon: 'analytics', title: 'Analytics', desc: 'Usage insights' },
                            ].map((feature) => (
                                <div key={feature.title} className="p-4 sm:p-5 rounded-xl bg-slate-100 dark:bg-[#1c2427] border border-slate-200 dark:border-white/5 flex flex-col items-center text-center gap-2 sm:gap-3">
                                    <div className="size-10 sm:size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-lg sm:text-xl">{feature.icon}</span>
                                    </div>
                                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{feature.title}</p>
                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-[#9db2b9]">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="px-4 sm:px-6 py-10 sm:py-16 bg-slate-50 dark:bg-[#0d181c] mb-24 sm:mb-28">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 sm:mb-10">
                            <h2 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2 sm:mb-3">Simple, Transparent Pricing</h2>
                            <p className="text-slate-500 dark:text-[#9db2b9] text-sm sm:text-base">Start free, scale as you grow.</p>
                        </div>
                        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
                            {pricingPlans.map((plan) => (
                                <div key={plan.name} className={`p-5 sm:p-6 rounded-2xl border flex flex-col gap-4 ${plan.popular ? 'bg-primary/10 border-primary/50 dark:bg-primary/5' : 'bg-white dark:bg-[#1c2427] border-slate-200 dark:border-white/5'}`}>
                                    {plan.popular && <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest">Most Popular</span>}
                                    <div>
                                        <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{plan.name}</p>
                                        <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">{plan.price}</p>
                                    </div>
                                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={`mt-auto w-full py-3 rounded-xl font-bold text-sm ${plan.popular ? 'bg-primary text-background-dark' : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10'}`}>
                                        {plan.name === 'Free Trial' ? 'Start Free' : 'Get Started'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sticky Bottom CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 pb-6 sm:pb-8 glass-card border-t border-white/5 z-50">
                    <div className="max-w-md mx-auto flex items-center gap-3 sm:gap-4">
                        <button className="flex-1 cursor-pointer items-center justify-center rounded-xl h-12 sm:h-14 bg-primary text-background-dark text-sm sm:text-base font-bold shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
                            Start Your Setup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingIntro;
