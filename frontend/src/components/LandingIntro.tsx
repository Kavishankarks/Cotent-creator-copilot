import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Ring, Torus, Environment, Float, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ----------------------------------------------------
// 3D CAMERA LENS COMPONENT
// ----------------------------------------------------
const CameraLens = () => {
    const groupRef = useRef<THREE.Group>(null);
    const outerRingRef = useRef<THREE.Mesh>(null);
    const innerGlassRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Smooth constant rotation for the whole assembly
            groupRef.current.rotation.y = time * 0.15;
            groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        }
        if (outerRingRef.current) {
            // Counter rotation for focus ring
            outerRingRef.current.rotation.z = -time * 0.5;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={2.5}>
            {/* Main Outer Barrel (Matte Black) */}
            <Cylinder args={[1, 1, 1.5, 64]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#080808" metalness={0.8} roughness={0.3} />
            </Cylinder>

            {/* Orange Accent Ring */}
            <Ring args={[1.02, 1.08, 64]} position={[0, 0, 0.5]}>
                <meshBasicMaterial color="#FFB000" side={THREE.DoubleSide} />
            </Ring>

            {/* Focus Ring Ribs */}
            <Torus ref={outerRingRef} args={[1.05, 0.05, 16, 64]} position={[0, 0, 0.2]}>
                <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.4} />
            </Torus>

            {/* Inner Barrel Stepping */}
            <Cylinder args={[0.85, 0.85, 1.6, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
                <meshStandardMaterial color="#050505" metalness={1} roughness={0.2} />
            </Cylinder>

            {/* Glass Element 1 (Front) */}
            <mesh ref={innerGlassRef} position={[0, 0, 0.75]}>
                <cylinderGeometry args={[0.7, 0.7, 0.1, 64]} />
                <MeshTransmissionMaterial
                    backside
                    thickness={0.5}
                    roughness={0}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={0.06}
                    anisotropy={0.1}
                    color="#ffffff"
                />
            </mesh>

            {/* Internal Sensor Glow */}
            <mesh position={[0, 0, -0.5]}>
                <planeGeometry args={[1.2, 1.2]} />
                <meshBasicMaterial color="#FFB000" transparent opacity={0.2} depthWrite={false} />
            </mesh>

            {/* Inner technical details */}
            <Ring args={[0.5, 0.7, 32]} position={[0, 0, 0.5]}>
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.5} />
            </Ring>
        </group>
    );
};

// ----------------------------------------------------
// HUD OVERLAYS COMPONENT
// ----------------------------------------------------
const HUDOverlays = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* CRT/Scanline Overlay */}
            <div className="scanlines w-full h-full absolute inset-0"></div>
            <div className="animate-scanline"></div>

            {/* Corner Crosshairs */}
            <div className="crosshair-corner top-8 left-8 border-t-2 border-l-2"></div>
            <div className="crosshair-corner top-8 right-8 border-t-2 border-r-2"></div>
            <div className="crosshair-corner bottom-8 left-8 border-b-2 border-l-2"></div>
            <div className="crosshair-corner bottom-8 right-8 border-b-2 border-r-2"></div>

            {/* Rec Indicator */}
            <div className="absolute top-10 right-14 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-blink shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                <span className="hud-text text-red-500 text-sm">REC</span>
            </div>

            {/* Technical Data Readouts */}
            <div className="absolute top-10 left-14 flex flex-col gap-1">
                <span className="hud-text text-xs opacity-70">ISO_AUTO</span>
                <span className="hud-text text-xs opacity-70">SHUTTER_1/1000</span>
            </div>

            <div className="absolute bottom-10 left-14 flex items-end gap-6">
                <div className="flex flex-col gap-1 border-l-2 border-primary/40 pl-3">
                    <span className="hud-text text-xs opacity-60">BATTERY</span>
                    <span className="hud-text font-bold text-sm text-white">94%_SYS_OPT</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-primary/40 pl-3">
                    <span className="hud-text text-xs opacity-60">STORAGE</span>
                    <span className="hud-text font-bold text-sm text-white">1.2TB_REMAINING</span>
                </div>
            </div>

            <div className="absolute bottom-10 right-14 flex flex-col items-end gap-1">
                <span className="hud-text text-xs opacity-70">F/1.4_MASTER_LENS</span>
                <span className="hud-text text-[10px] text-white/40">CALIBRATING_OPTICS...</span>
                <div className="w-24 h-[2px] bg-primary/20 mt-2">
                    <div className="w-1/3 h-full bg-primary animate-[pulse_2s_infinite]"></div>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------
// MAIN PAGE COMPONENT (SCROLLYTELLING)
// ----------------------------------------------------
const LandingIntro: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Animate opacity of 3D canvas based on scroll (fade out slightly as we move away from hero)
    const canvasOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.3, 0.1]);
    const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const storyModules = [
        { id: 'MOD_01', title: 'Image Generation', desc: 'Turn story beats into vivid keyframes. Describe a scene once, then branch it into variants, angles, and art styles on demand.', icon: 'photo_library', meta: ['4:3', '8 variants'] },
        { id: 'MOD_02', title: 'Transcription Engine', desc: 'Instant speech-to-text with speaker detection, timestamps, and clean punctuation for captions or scripts.', icon: 'graphic_eq', meta: ['99% acc', 'SPEAKERS'] },
        { id: 'MOD_03', title: 'Audio Clone', desc: 'Create a natural voice model from a short sample and keep narration consistent across every cut.', icon: 'record_voice_over', meta: ['Voiceprint', '30s seed'] },
        { id: 'MOD_04', title: 'Precision Editing', desc: 'Cut, stitch, and enhance with timeline intelligence. The edit engine preserves rhythm while cleaning audio, color, and pacing.', icon: 'tune', meta: ['Auto-cut', 'Color'] },
        { id: 'MOD_05', title: 'Video Generation', desc: 'From storyboard to cinematic motion. Generate sequences, transitions, and overlays that maintain continuity across shots.', icon: 'movie', meta: ['12s shot', 'Cinematic'] },
        { id: 'MOD_06', title: 'Personalized Profile', desc: 'Your signature tone, brand colors, and pacing locked into every output. The system adapts to you, not the other way around.', icon: 'badge', meta: ['Style lock', 'Tone'] },
        { id: 'MOD_07', title: 'Subtitle Styling', desc: 'Auto-burn captions with kinetic typography, emphasis highlights, and platform-safe readability.', icon: 'closed_caption', meta: ['Kinetic', 'Readable'] },
        { id: 'MOD_08', title: 'Music Bed AI', desc: 'Generate licensed-safe music beds, auto-ducking under voice, and dynamic rises for hooks.', icon: 'music_note', meta: ['Duck', 'Crescendo'] },
        { id: 'MOD_09', title: 'Smart Resize', desc: 'Instantly reframe for Reels, Shorts, TikTok, and YouTube while preserving subject focus.', icon: 'aspect_ratio', meta: ['Auto-pan', 'Safe'] },
        { id: 'MOD_10', title: 'Hook Optimizer', desc: 'Predictive hook testing and CTA suggestions to improve retention in the first 3 seconds.', icon: 'bolt', meta: ['0-3s', 'CTR'] },
        { id: 'MOD_11', title: 'Brand Kit', desc: 'Lock logos, fonts, and color systems across every render for consistent identity.', icon: 'palette', meta: ['Logo', 'Fonts'] },
        { id: 'MOD_12', title: 'Auto B-Roll', desc: 'Scene-aware b-roll recommendations and insert shots aligned to your narrative arc.', icon: 'movie_filter', meta: ['B-roll', 'Arc'] },
        { id: 'MOD_13', title: 'Scene Continuity', desc: 'Match lighting, wardrobe, and motion between shots to keep visual flow seamless.', icon: 'auto_awesome_motion', meta: ['Match', 'Flow'] },
        { id: 'MOD_14', title: 'A/B Variants', desc: 'Generate versions with different hooks, pacing, or edits and compare results.', icon: 'layers', meta: ['Variants', 'Test'] },
        { id: 'MOD_15', title: 'Publish Scheduler', desc: 'Queue and auto-post across platforms with title, tags, and thumbnail presets.', icon: 'schedule', meta: ['Queue', 'Auto-post'] },
        { id: 'MOD_16', title: 'Performance Insights', desc: 'Analytics-driven recommendations for cadence, length, and creative direction.', icon: 'insights', meta: ['Insights', 'Lift'] },
    ];

    return (
        <div className="bg-carbon text-text-main font-sans min-h-screen selection:bg-primary/30 selection:text-white">
            <HUDOverlays />

            {/* Film grain + light leak overlays */}
            <div className="fixed inset-0 z-[2] pointer-events-none mix-blend-screen opacity-[0.18]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,176,0,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,120,80,0.14),transparent_40%),radial-gradient(circle_at_30%_80%,rgba(120,160,255,0.12),transparent_45%)]" />
            </div>
            <div className="fixed inset-0 z-[3] pointer-events-none opacity-[0.08] bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:3px_3px]" />

            {/* Top Navigation Bar - Fixed */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-40 flex items-center bg-white/[0.04] backdrop-blur-2xl p-4 sm:p-6 justify-between border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="size-2 bg-primary/80 group-hover:bg-primary group-hover:shadow-[0_0_10px_#FFB000] rounded-sm transition-all duration-300"></div>
                    <div className="size-2 bg-primary/40 group-hover:bg-primary/80 rounded-sm transition-all duration-300 delay-75"></div>
                    <div className="size-2 bg-primary/20 group-hover:bg-primary/50 rounded-sm transition-all duration-300 delay-150"></div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl hud-glow">photo_camera</span>
                    <h2 className="text-white text-lg font-bold tracking-[0.2em] uppercase">Rolit<span className="text-primary font-mono ml-2">v2.0</span></h2>
                </div>

                <button className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary px-6 py-2 transition-all">
                    [ LOGIN_SYS ]
                </button>
            </motion.div>

            {/* Fixed WebGL Background Container */}
            <motion.div
                className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
                style={{ opacity: canvasOpacity, scale: canvasScale }}
            >
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 35 }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#FFB000" />
                    <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <CameraLens />
                    </Float>
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
                </Canvas>
            </motion.div>

            {/* 
                SCROLLYTELLING WRAPPER 
                Vertical cinema-roll layout.
            */}
            <div ref={targetRef} className="relative">

                {/* CHAPTER 1: HERO */}
                <section className="min-h-screen flex flex-col justify-center px-10 sm:px-24 z-10 relative">
                            {/* Ambient light blobs */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
                                <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-white/5 rounded-full blur-[80px]"></div>
                            </div>
                            <div className="max-w-4xl ml-0 md:ml-12 pointer-events-none bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)] relative">
                                {/* Glass inner top-edge highlight */}
                                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="h-[1px] w-12 bg-primary"></div>
                                    <span className="hud-text text-xs border border-primary/30 px-3 py-1 bg-primary/5">SYS_BOOT_COMPLETE</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-white text-5xl sm:text-7xl md:text-[5.5rem] font-light leading-[1.1] tracking-tight mb-8"
                                >
                                    Capture Reality.<br />
                                    <span className="font-bold text-gradient">Process Infinity.</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-12 border-l border-white/10 pl-6"
                                >
                                    The ultimate Copilot for content creators. From the first spark to the final render, your personalized profile guides tone, pacing, and visual style while the system shapes each scene with production-grade AI.
                                </motion.p>

                                {/* Creator profile card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                    className="pointer-events-auto mb-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 bg-white/[0.04] border border-white/10 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/70 to-primary/20 border border-primary/40 shadow-[0_0_20px_rgba(255,176,0,0.3)]" />
                                        <div>
                                            <div className="text-white font-semibold tracking-wide">Creator Profile</div>
                                            <div className="text-slate-400 text-xs font-mono">VOICEPRINT: LOCKED</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="px-4 py-3 border border-white/10 bg-white/[0.03]">
                                            <div className="text-xs text-slate-400">Brand Kit</div>
                                            <div className="text-white text-sm">Amber / Slate / Mono</div>
                                        </div>
                                        <div className="px-4 py-3 border border-white/10 bg-white/[0.03]">
                                            <div className="text-xs text-slate-400">Cadence</div>
                                            <div className="text-white text-sm">Fast Hook, Slow Burn</div>
                                        </div>
                                        <div className="px-4 py-3 border border-white/10 bg-white/[0.03]">
                                            <div className="text-xs text-slate-400">Style</div>
                                            <div className="text-white text-sm">Cinematic Documentary</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Story timeline strip */}
                                <div className="pointer-events-none mb-12">
                                    <div className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">Story Beat Timeline</div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        {['Hook', 'Build', 'Reveal', 'Peak', 'CTA'].map((beat, idx) => (
                                            <div key={beat} className="flex items-center gap-3">
                                                <div className="px-3 py-1 border border-primary/30 text-primary/90 text-xs font-mono bg-primary/5">{beat}</div>
                                                {idx < 4 && <div className="w-8 h-[1px] bg-white/10"></div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className="flex flex-col sm:flex-row gap-5 pointer-events-auto"
                                >
                                    <button className="group relative flex items-center justify-center h-14 px-8 bg-primary hover:bg-primary-dark text-background font-mono font-bold tracking-widest text-sm transition-all overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                        <span className="relative z-10 flex items-center gap-2">
                                            [ INITIATE_TRIAL ]
                                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </span>
                                    </button>
                                    <button className="flex items-center justify-center h-14 px-8 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/50 font-mono tracking-widest text-sm transition-all">
                                        [ VIEW_DIAGNOSTICS ]
                                    </button>
                                </motion.div>
                            </div>
                        </section>

                {/* CHAPTER 2: FEATURES */}
                <section className="min-h-screen flex flex-col justify-center px-10 sm:px-24 z-10 relative">
                            {/* Ambient light blobs */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px]"></div>
                                <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-[80px]"></div>
                            </div>
                            <div className="max-w-6xl w-full mx-auto">
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-white text-4xl sm:text-6xl font-light tracking-tight">Story <span className="font-bold">Pipeline</span></h2>
                                    <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"></div>
                                </div>
                                <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-12">
                                    Build a narrative that feels authored, not automated. Your creator profile learns your voice, then choreographs image generation, precision editing, and cinematic video output into a single, flowing storyline.
                                </p>

                                {/* Featured module */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="pointer-events-auto mb-10 p-8 border border-primary/40 bg-primary/10 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(255,176,0,0.2)]"
                                >
                                    <div className="flex items-center justify-between gap-6">
                                        <div>
                                            <div className="hud-text text-xs text-primary/80 mb-2">FEATURED MODULE</div>
                                            <div className="text-white text-3xl font-semibold">Creator Control Room</div>
                                            <p className="text-slate-300 mt-3 max-w-2xl">
                                                A single surface that stitches your script, assets, voice, and timelines together. Every choice updates the story arc in real time.
                                            </p>
                                        </div>
                                        <div className="hidden md:flex items-center gap-3">
                                            <span className="px-3 py-2 text-xs font-mono border border-primary/40 bg-primary/10 text-primary">LIVE_PREVIEW</span>
                                            <span className="px-3 py-2 text-xs font-mono border border-white/20 bg-white/[0.04] text-slate-300">SYNCED_ASSETS</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto"
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: {},
                                        show: { transition: { staggerChildren: 0.08 } },
                                    }}
                                >
                                    {storyModules.map((feat) => (
                                        <motion.div
                                            key={feat.id}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0 },
                                            }}
                                            className="group p-8 relative overflow-hidden transition-all duration-500 bg-white/[0.05] backdrop-blur-2xl border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] hover:-translate-y-2 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_30px_rgba(255,176,0,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]"
                                        >
                                            {/* Glass top-edge highlight */}
                                            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
                                            {/* decorative corners */}
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 group-hover:border-primary transition-colors"></div>
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30 group-hover:border-primary transition-colors"></div>
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30 group-hover:border-primary transition-colors"></div>
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 group-hover:border-primary transition-colors"></div>

                                            <div className="flex justify-between items-start mb-6">
                                                <span className="material-symbols-outlined text-4xl text-slate-500 group-hover:text-primary transition-colors drop-shadow-lg">{feat.icon}</span>
                                                <span className="hud-text text-[10px] text-primary/60 border border-primary/20 px-2 py-0.5 bg-primary/5 backdrop-blur-sm">{feat.id}</span>
                                            </div>
                                            <h3 className="text-white text-2xl font-bold mb-3">{feat.title}</h3>
                                            <p className="text-slate-400 font-light leading-relaxed mb-5">{feat.desc}</p>
                                            <div className="flex items-center gap-2">
                                                {feat.meta.map((chip) => (
                                                    <span key={chip} className="text-[10px] font-mono uppercase tracking-widest text-slate-300 border border-white/10 bg-white/[0.03] px-2 py-1">{chip}</span>
                                                ))}
                                            </div>
                                            <div className="mt-4 h-2 w-full bg-white/5">
                                                <div className="h-full w-2/3 bg-gradient-to-r from-primary/70 to-primary/10"></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </section>

                {/* CHAPTER 3: PLATFORMS AND PRICING */}
                <section className="min-h-screen flex flex-col justify-center px-10 sm:px-24 z-10 relative">
                            {/* Ambient light blobs */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"></div>
                                <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-white/5 rounded-full blur-[80px]"></div>
                            </div>
                            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 pointer-events-auto">

                                {/* Export Targets */}
                                <div>
                                    <div className="flex flex-col gap-2 mb-10">
                                        <span className="hud-text text-sm">Target Systems</span>
                                        <h2 className="text-white text-4xl font-light">Export Protocol</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Reels', 'Shorts', 'YouTube', 'TikTok'].map((platform) => (
                                            <div key={platform} className="flex items-center justify-between p-4 border border-white/10 bg-white/[0.04] backdrop-blur-md hover:bg-primary/10 hover:border-primary/30 transition-all group cursor-crosshair shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                                                <span className="text-slate-300 font-mono text-sm group-hover:text-white transition-colors">{platform}</span>
                                                <span className="material-symbols-outlined text-primary/50 group-hover:text-primary text-sm">check_circle</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 p-6 border border-white/10 bg-white/[0.04] backdrop-blur-xl relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)]">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                                        <p className="font-mono text-primary text-xs mb-2">SYSTEM_STATUS_NORMAL</p>
                                        <p className="text-slate-300 text-sm font-light">"Built for ambitious creators and scaling teams. Multi-tenant architecture with granular RBAC permissions."</p>
                                    </div>
                                </div>

                                {/* Access Tiers */}
                                <div>
                                    <div className="flex flex-col gap-2 mb-10">
                                        <span className="hud-text text-sm hover:hud-glow">Clearance Levels</span>
                                        <h2 className="text-white text-4xl font-light">Acquire Access</h2>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        {/* Tier 1 */}
                                        <div className="flex items-center justify-between p-6 border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08] transition-all shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)] relative overflow-hidden">
                                            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                            <div>
                                                <h4 className="text-white font-bold text-xl mb-1">Creator Tier</h4>
                                                <p className="text-slate-500 text-sm font-mono">$29.00 / CYCLE</p>
                                            </div>
                                            <button className="px-6 py-2 border border-primary/60 text-primary font-mono text-xs hover:bg-primary hover:text-black hover:border-primary transition-all backdrop-blur-sm">
                                                [ SELECT ]
                                            </button>
                                        </div>

                                        {/* Tier 2 */}
                                        <div className="flex items-center justify-between p-6 border border-primary/60 bg-white/[0.06] backdrop-blur-xl relative transform hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,176,0,0.15),inset_0_1px_0_rgba(255,176,0,0.15)] overflow-hidden">
                                            {/* Glass amber inner highlight */}
                                            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                                            <div className="absolute -top-3 left-6 bg-primary/90 backdrop-blur-sm text-black font-mono text-[10px] font-bold px-2 py-0.5 tracking-wider shadow-[0_0_10px_rgba(255,176,0,0.5)]">
                                                RECOMMENDED_SYS
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-xl mb-1">Team Tier</h4>
                                                <p className="text-primary text-sm font-mono">$79.00 / CYCLE</p>
                                            </div>
                                            <button className="px-6 py-2 bg-primary/90 backdrop-blur-sm text-black font-mono text-xs font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,176,0,0.5)]">
                                                [ UPGRADE ]
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                </section>
            </div>

        </div>
    );
};

export default LandingIntro;
