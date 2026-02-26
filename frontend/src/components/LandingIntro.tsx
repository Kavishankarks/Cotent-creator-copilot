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

    // We map custom vertical scroll progress to horizontal translation
    // 0% scroll -> 0 horizontal
    // 100% scroll -> -66.66% horizontal (moving left by 2 screen widths to show 3 total panels)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

    // Animate opacity of 3D canvas based on scroll (fade out slightly as we move away from hero)
    const canvasOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.3, 0.1]);
    const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <div className="bg-carbon text-text-main font-sans min-h-screen selection:bg-primary/30 selection:text-white">
            <HUDOverlays />

            {/* Top Navigation Bar - Fixed */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-40 flex items-center bg-background/50 backdrop-blur-md p-4 sm:p-6 justify-between border-b border-primary/10"
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
                Height dictates how much vertical scrolling is needed to complete the horizontal track.
                Using 400vh gives a smooth scrolling experience.
            */}
            <div ref={targetRef} className="relative h-[400vh]">

                {/* 
                    STICKY VIEWPORT
                    Stays fixed on screen while the user scrolls down, moving the horizontal container left.
                */}
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    {/* HORIZONTAL TRACK */}
                    <motion.div style={{ x }} className="flex w-[300vw]">

                        {/* CHAPTER 1: HERO */}
                        <section className="w-screen h-screen flex flex-col justify-center px-10 sm:px-24 z-10 relative">
                            <div className="max-w-3xl ml-0 md:ml-12 pointer-events-none">
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
                                    The ultimate Copilot for content creators. From initial spark to final render, armed with production-grade AI tooling in a precision interface.
                                </motion.p>

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
                        <section className="w-screen h-screen flex flex-col justify-center px-10 sm:px-24 z-10 relative">
                            <div className="max-w-6xl w-full mx-auto">
                                <div className="flex items-center gap-4 mb-16">
                                    <h2 className="text-white text-4xl sm:text-6xl font-light tracking-tight">Technical <span className="font-bold">Specs</span></h2>
                                    <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
                                    {[
                                        { id: 'MOD_01', title: 'Whisper Transcode', desc: 'Flawless audio-to-text with high-detail precision, punctuation generation, and noise isolation.', icon: 'graphic_eq' },
                                        { id: 'MOD_02', title: 'Neural Voice Clone', desc: 'Human-grade AI voices that capture emotion. Clone your own vocal signature with 30s of audio payload.', icon: 'record_voice_over' },
                                        { id: 'MOD_03', title: 'Script Engine V4', desc: 'Synthesize full storyboards from a single sentence prompt using advanced GPT-4 architecture.', icon: 'auto_fix_high' },
                                    ].map((feat) => (
                                        <div key={feat.id} className="glass-panel group p-8 relative overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-surface/90 hover:-translate-y-2">
                                            {/* decorative corners */}
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 group-hover:border-primary transition-colors"></div>
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30 group-hover:border-primary transition-colors"></div>
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30 group-hover:border-primary transition-colors"></div>
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 group-hover:border-primary transition-colors"></div>

                                            <div className="flex justify-between items-start mb-8">
                                                <span className="material-symbols-outlined text-4xl text-slate-500 group-hover:text-primary transition-colors drop-shadow-lg">{feat.icon}</span>
                                                <span className="hud-text text-[10px] text-primary/60 border border-primary/20 px-2 py-0.5">{feat.id}</span>
                                            </div>
                                            <h3 className="text-white text-2xl font-bold mb-4">{feat.title}</h3>
                                            <p className="text-slate-400 font-light leading-relaxed">{feat.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* CHAPTER 3: PLATFORMS AND PRICING */}
                        <section className="w-screen h-screen flex flex-col justify-center px-10 sm:px-24 z-10 relative">
                            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 pointer-events-auto">

                                {/* Export Targets */}
                                <div>
                                    <div className="flex flex-col gap-2 mb-10">
                                        <span className="hud-text text-sm">Target Systems</span>
                                        <h2 className="text-white text-4xl font-light">Export Protocol</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Reels', 'Shorts', 'YouTube', 'TikTok'].map((platform) => (
                                            <div key={platform} className="flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-colors group cursor-crosshair">
                                                <span className="text-slate-300 font-mono text-sm group-hover:text-white transition-colors">{platform}</span>
                                                <span className="material-symbols-outlined text-primary/50 group-hover:text-primary text-sm">check_circle</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 p-6 border border-primary/20 bg-primary/5 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
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
                                        <div className="flex items-center justify-between p-6 border border-white/10 bg-surface/50 hover:bg-surface backdrop-blur-md transition-all">
                                            <div>
                                                <h4 className="text-white font-bold text-xl mb-1">Creator Tier</h4>
                                                <p className="text-slate-500 text-sm font-mono">$29.00 / CYCLE</p>
                                            </div>
                                            <button className="px-6 py-2 border border-primary text-primary font-mono text-xs hover:bg-primary hover:text-black transition-colors">
                                                [ SELECT ]
                                            </button>
                                        </div>

                                        {/* Tier 2 */}
                                        <div className="flex items-center justify-between p-6 border border-primary bg-primary/10 backdrop-blur-md relative transform hover:scale-[1.02] transition-transform">
                                            <div className="absolute -top-3 left-6 bg-primary text-black font-mono text-[10px] font-bold px-2 py-0.5 tracking-wider">
                                                RECOMMENDED_SYS
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-xl mb-1">Team Tier</h4>
                                                <p className="text-primary text-sm font-mono">$79.00 / CYCLE</p>
                                            </div>
                                            <button className="px-6 py-2 bg-primary text-black font-mono text-xs font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,176,0,0.4)]">
                                                [ UPGRADE ]
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default LandingIntro;
