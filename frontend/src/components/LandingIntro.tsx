import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Auto-cycling active step for animation
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % workflowSteps.length);
        }, 2000); // Slower interval for 3D effect
        return () => clearInterval(interval);
    }, [workflowSteps.length]);

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
        <div className="bg-background text-text-main font-display min-h-screen selection:bg-primary/30 selection:text-primary-light">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center bg-background/80 backdrop-blur-md p-3 sm:p-4 justify-between border-b border-white/5">
                <div className="text-white flex size-8 sm:size-10 items-center justify-center cursor-pointer hover:bg-white/5 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">menu</span>
                </div>
                <h2 className="text-white text-base sm:text-lg font-bold leading-tight tracking-tight flex-1 text-center">Rolit Copilot</h2>
                <div className="size-8 sm:size-10"></div>
            </div>

            <div className="relative flex w-full flex-col overflow-x-hidden pt-12 sm:pt-14">
                {/* Hero Section */}
                <div className="relative min-h-[80vh] sm:min-h-[85vh] w-full">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiWDcej21qxERmWt1qAzzKAdnNDy4PG2IQvDida4Mgj7PQ3kZCDB_KpolRiS2mYXkTmo7bRTE_j2AOGW-5bZMukcSaNxQ3n1mPtA3MokjCZVbHoKoDF1kRSocbMvui_WM1ybgvwR11NJ9g2TPekcmU3s_aUTfRrwK6HDhkovpnKD0RVkLlJ0mk4u8ybbhKyWnpcqZNy5fkbTHrvBFrlA7XNIPq4FkzrTYiTjgO78LGN76qc3mZUV32xqrepAq0pDP-7mCbOjUVQwvJ")' }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background"></div>
                    <div className="absolute inset-0 hero-gradient"></div>

                    <div className="relative flex h-full min-h-[80vh] sm:min-h-[85vh] flex-col items-center justify-end px-4 sm:px-6 pb-16 sm:pb-20 text-center z-10">
                        <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl mx-auto">
                            <span className="inline-flex self-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-primary/20 shadow-[0_0_15px_rgba(14,165,233,0.3)] backdrop-blur-sm">
                                Copilot for Content Creators
                            </span>
                            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-[-0.033em] drop-shadow-2xl">
                                Transform Ideas Into <br className="hidden sm:block" />
                                <span className="text-gradient">Video Packages</span>
                            </h1>
                            <div className="h-16 sm:h-20 flex items-start justify-center mt-2">
                                <p className="text-text-muted text-sm sm:text-lg font-normal leading-relaxed max-w-xl">
                                    <TypingEffect
                                        words={[
                                            "Automate your creative workflow from rough ideas to polished exports.",
                                            "Your personal AI studio: scripting, voicing, captioning, 24/7.",
                                            "Generate viral-ready shorts with a production-grade AI Copilot."
                                        ]}
                                    />
                                </p>
                            </div>
                            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-center">
                                <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 sm:h-14 px-8 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]">
                                    Get Started Free
                                </button>
                                <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 sm:h-14 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm sm:text-base font-bold backdrop-blur-sm transition-all hover:border-white/20">
                                    Watch Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Workflow Pipeline Section */}
                <section className="px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-surface/30 skew-y-3 transform origin-top-left scale-110"></div>
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-12 sm:mb-20">
                            <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight tracking-tight mb-3">AI-Powered Workflow</h2>
                            <p className="text-text-muted text-sm sm:text-base max-w-md mx-auto">From idea to export pack in minutes, not hours.</p>
                        </div>

                        {/* 3D Workflow Animation Container */}
                        <div className="relative flex items-center justify-center py-10 perspective-1000">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden md:block"></div>
                            {/* Active Beam */}
                            <motion.div
                                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2 hidden md:block z-0 blur-[2px]"
                                animate={{
                                    left: `${(activeStep / (workflowSteps.length - 1)) * 100}%`,
                                    translateX: '-50%'
                                }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                style={{ width: '300px' }}
                            />

                            {/* Steps Container */}
                            <div className="flex flex-row items-center justify-center gap-2 md:gap-8 w-full">
                                {workflowSteps.map((step, index) => {
                                    const isActive = index === activeStep;
                                    const isPast = index < activeStep;

                                    return (
                                        <div key={step.label} className="relative z-10 flex flex-col items-center gap-5">
                                            {/* 3D Icon Container */}
                                            <div className="relative group">
                                                <AnimatePresence mode="wait">
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1.5 }}
                                                            exit={{ opacity: 0, scale: 0.5 }}
                                                            className="absolute inset-0 bg-primary/40 blur-xl rounded-full"
                                                        />
                                                    )}
                                                </AnimatePresence>

                                                <motion.div
                                                    className={`relative size-12 md:size-16 rounded-2xl flex items-center justify-center border transition-all duration-300 ${isActive
                                                        ? 'bg-primary border-primary shadow-[0_0_30px_rgba(14,165,233,0.5)] z-20'
                                                        : isPast
                                                            ? 'bg-primary/10 border-primary/30'
                                                            : 'bg-surface border-white/5'
                                                        }`}
                                                    animate={{
                                                        y: isActive ? -15 : 0,
                                                        scale: isActive ? 1.25 : 1,
                                                        rotateY: isActive ? 360 : 0,
                                                        z: isActive ? 50 : 0
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 20,
                                                        rotateY: { duration: 0.8, ease: "easeInOut" }
                                                    }}
                                                >
                                                    <span className={`material-symbols-outlined text-xl md:text-3xl ${isActive ? 'text-white' : isPast ? 'text-primary' : 'text-slate-600'
                                                        }`}>
                                                        {step.icon}
                                                    </span>
                                                </motion.div>
                                            </div>

                                            {/* Label with 3D fade */}
                                            <motion.span
                                                className={`text-[10px] md:text-sm font-bold text-center absolute -bottom-10 md:-bottom-12 whitespace-nowrap ${isActive ? 'text-primary' : 'text-slate-600'
                                                    }`}
                                                animate={{
                                                    opacity: isActive ? 1 : 0.4,
                                                    y: isActive ? 0 : 5,
                                                    scale: isActive ? 1.1 : 1
                                                }}
                                            >
                                                {step.label}
                                            </motion.span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Support Section */}
                <section className="px-4 sm:px-6 py-16 sm:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-16">
                            <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight tracking-tight mb-3">Multi-Platform Ready</h2>
                            <p className="text-text-muted text-sm sm:text-base">Optimized exports for all major content platforms.</p>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
                            {platforms.map((platform) => (
                                <div key={platform.name} className="flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 hover:bg-surface-highlight hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                                    <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl group-hover:scale-110 transition-transform">{platform.icon}</span>
                                    <span className="text-xs sm:text-sm font-medium text-text-muted group-hover:text-white transition-colors">{platform.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Tools Section */}
                <section className="px-4 sm:px-6 py-16 sm:py-24 bg-surface/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col gap-2 mb-10 sm:mb-16 text-center sm:text-left">
                            <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight tracking-tight">Core AI Tools</h2>
                            <p className="text-text-muted text-sm sm:text-base">Master the core tools in minutes.</p>
                        </div>
                        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                            {/* Whisper Card */}
                            <div className="glass-card glass-card-hover flex flex-col overflow-hidden rounded-3xl group">
                                <div className="w-full h-48 sm:h-56 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUVi_znlflg_LmFTJt6GkrcYn_3tFfdMrn-DCzpWRB3oydnw933LMaYEGWdW4dI7eIjDPa43xG70x9A-9R0_lxMBmYSGA9hZRrQ_RaqkD2vyfAZWIJEY98-9TCAvpqJCFS3sW3X1ZdAJ3rtyDz7GTo1DVy9WbMY5AZU1vBBi0xGhKgpTa35qjPdr6EDhSUGDDJb6lC1md6TBnLWldKWOxYmPZAcXjtoUhjntlxOmTcSrMQkrB1OVJX8EYU71IUusLeUuPyqwM_DfrE")' }}></div>
                                <div className="flex flex-col gap-3 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <span className="material-symbols-outlined text-primary text-xl">graphic_eq</span>
                                        </div>
                                        <p className="text-white text-xl font-bold tracking-tight">Whisper Transcription</p>
                                    </div>
                                    <p className="text-text-muted text-sm sm:text-base font-normal leading-relaxed">Flawless audio-to-text with high-detail precision and noise isolation.</p>
                                    <button className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-white/5 text-primary border border-white/10 text-xs sm:text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        Explore Whisper
                                    </button>
                                </div>
                            </div>
                            {/* TTS Card */}
                            <div className="glass-card glass-card-hover flex flex-col overflow-hidden rounded-3xl group">
                                <div className="w-full h-48 sm:h-56 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYsummO5izRBfm_TwzyGkmOTm-dzjwIiVRKl0p4TCv1UkcBekkm7LVva2FwoVL9FI6M8ABmQkgnrXXyux79G_neWD-SIdW2Uy3Gk1Z7kbCye8t-iLyrFXmdqlvm197GKpAAcn4MKW1jeUCewFyZIRu-MJJtQA2hv7A-aunpKY0RYxKt-0Ia6r7qKqcWzzbx2gKkC3nQmoE-zGBnpOLEoIJsJvtdLgHM3eHBv_qNhxrg7pJyKnowmwBgTNLTYKUiZg6oSSV8WwwreV9")' }}></div>
                                <div className="flex flex-col gap-3 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <span className="material-symbols-outlined text-primary text-xl">record_voice_over</span>
                                        </div>
                                        <p className="text-white text-xl font-bold tracking-tight">TTS Voiceover</p>
                                    </div>
                                    <p className="text-text-muted text-sm sm:text-base font-normal leading-relaxed">Human-grade AI voices across 40+ languages.</p>
                                    <button className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-white/5 text-primary border border-white/10 text-xs sm:text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        Try Voiceover
                                    </button>
                                </div>
                            </div>
                            {/* GPT Card */}
                            <div className="glass-card glass-card-hover flex flex-col overflow-hidden rounded-3xl group">
                                <div className="w-full h-48 sm:h-56 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGLGzT0wEOwlIS9BwYWPeDiMaRN_ymp2IEWagAZ2CrqBbc6ITy_T5yxyCTW9hKdJj0y3u6PK4d2RcxoPklYVUGOzLDVXuGbDwImpLp8q3HuTTrYgStNUc7cewy9_Z8hB84B8mduRo8q8Y7jsPuRaWOr4DR0l9_nGYQ-nTzzioVRoE6-GiOHVCCgTUxO7RH0HqoVN8L47TOMsblHN4W4GPCXJXV5sCJVN3gA9tkiVlcFblVIFE_MPb_0ZGldvMewuRqjretnTbQKSoK")' }}></div>
                                <div className="flex flex-col gap-3 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
                                        </div>
                                        <p className="text-white text-xl font-bold tracking-tight">GPT Scripting</p>
                                    </div>
                                    <p className="text-text-muted text-sm sm:text-base font-normal leading-relaxed">From idea to storyboard with one prompt.</p>
                                    <button className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-white/5 text-primary border border-white/10 text-xs sm:text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        Generate Scripts
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SaaS Features Section */}
                <section className="px-4 sm:px-6 py-16 sm:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-16">
                            <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight tracking-tight mb-3">Enterprise-Ready Features</h2>
                            <p className="text-text-muted text-sm sm:text-base">Built for teams, designed for scale.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {[
                                { icon: 'domain', title: 'Multi-Tenancy', desc: 'Isolated workspaces' },
                                { icon: 'group', title: 'Team RBAC', desc: 'Owner, Admin, Editor' },
                                { icon: 'payments', title: 'Tiered Billing', desc: 'Usage metering' },
                                { icon: 'analytics', title: 'Analytics', desc: 'Usage insights' },
                            ].map((feature) => (
                                <div key={feature.title} className="p-6 rounded-2xl bg-surface border border-white/5 flex flex-col items-center text-center gap-4 hover:bg-surface-highlight transition-colors duration-300 group">
                                    <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-2xl">{feature.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-base sm:text-lg font-bold text-white mb-1">{feature.title}</p>
                                        <p className="text-xs sm:text-sm text-text-muted">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="px-4 sm:px-6 py-16 sm:py-24 mb-24 sm:mb-28">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 sm:mb-16">
                            <h2 className="text-white text-2xl sm:text-4xl font-bold leading-tight tracking-tight mb-3">Simple, Transparent Pricing</h2>
                            <p className="text-text-muted text-sm sm:text-base">Start free, scale as you grow.</p>
                        </div>
                        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                            {pricingPlans.map((plan) => (
                                <div key={plan.name} className={`p-6 sm:p-8 rounded-3xl border flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${plan.popular
                                    ? 'bg-gradient-to-b from-primary/10 to-surface border-primary/50 shadow-2xl shadow-primary/10'
                                    : 'bg-surface border-white/5 hover:border-white/10'}`}>

                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-primary text-[10px] font-bold text-white uppercase tracking-widest">
                                                Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-2">
                                        <p className="text-lg sm:text-xl font-bold text-white">{plan.name}</p>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <p className="text-3xl sm:text-4xl font-black text-white">{plan.price}</p>
                                            {plan.price !== '$0' && <span className="text-text-muted text-sm">/month</span>}
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-white/10 my-2"></div>

                                    <ul className="space-y-3 text-sm text-text-muted flex-1">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-center gap-3">
                                                <span className={`material-symbols-outlined text-lg ${plan.popular ? 'text-primary' : 'text-slate-500'}`}>check_circle</span>
                                                <span className="text-slate-300">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`mt-6 w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.popular
                                        ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25'
                                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                                        {plan.name === 'Free Trial' ? 'Start Free' : 'Get Started'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sticky Bottom CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 border-t border-white/5 bg-background/80 backdrop-blur-xl z-50">
                    <div className="max-w-md mx-auto flex items-center gap-4">
                        <div className="hidden sm:block flex-1">
                            <p className="text-white font-bold text-sm">Ready to automate?</p>
                            <p className="text-text-muted text-xs">Join 10,000+ creators today.</p>
                        </div>
                        <button className="flex-1 cursor-pointer items-center justify-center rounded-xl h-12 bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                            Start Your Setup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingIntro;

const TypingEffect: React.FC<{ words: string[] }> = ({ words }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout);
    }, [blink]);

    // Typing logic
    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            // Finished typing word, wait before deleting
            const timeout = setTimeout(() => {
                setReverse(true);
            }, 3000);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            // Finished deleting, move to next word
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 30 : 50); // Typing speed vs deleting speed

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span>
            {words[index].substring(0, subIndex)}
            <span className={`inline-block w-0.5 h-4 ml-1 bg-primary align-middle ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
        </span>
    );
};
