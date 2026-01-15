"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const heroRef = useRef(null);
  const [time, setTime] = useState("00:00:00");

  // System Clock Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pt-24 pb-20 font-mono text-zinc-300"
    >
      {/* --- RETRO BACKGROUND GRID --- */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
             linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      />
      
      {/* Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />

      {/* --- SYSTEM HEADER (Status Bar) --- */}
      <div className="absolute top-0 left-0 z-20 w-full border-b border-white/20 bg-black/50 px-6 py-3 backdrop-blur-sm">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 sm:text-xs">
          <div className="flex gap-4">
             <span className="text-green-500">● SYS_ONLINE</span>
             <span className="hidden sm:inline">DRIXE_STUDIO_V2</span>
          </div>
          <div className="flex gap-4">
             <span className="hidden sm:inline">LOC: GLOBAL</span>
             <span className="text-zinc-300">{time}</span>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Eyebrow Tag */}
        <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 border border-white/20 bg-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                <span>[::]</span>
                Web & Community Systems
            </div>
        </div>

        {/* H1 Heading - REDUCED SIZE & TIGHTER SPACING */}
        <h1 className="mb-8 font-bold uppercase leading-[1.1] tracking-tighter text-white">
          {/* Top Line */}
          <span className="block text-3xl sm:text-5xl md:text-6xl">
            Websites and
          </span>
          
          {/* Middle Line (Outline) */}
          <span className="block text-3xl sm:text-5xl md:text-6xl text-transparent" style={{ WebkitTextStroke: "1px white" }}>
            communities
          </span>
          
          {/* Bottom Line (Inverted) */}
          <span className="mt-2 inline-block bg-white px-3 py-1 text-2xl text-black sm:text-4xl md:text-5xl">
            engineered to scale.
          </span>
        </h1>

        {/* Description Box - CLEANER LAYOUT */}
        <div className="mx-auto mb-10 max-w-xl border-l border-white/30 bg-white/5 p-5 text-left backdrop-blur-sm">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-zinc-500">// Mission_Statement</p>
            <p className="text-sm leading-relaxed text-zinc-300">
                Drixe Studio designs high-performance websites and structured Discord
                community systems. We focus on <span className="text-white">speed</span>, <span className="text-white">clarity</span>, and long-term scalability.
            </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() =>
              document
                .getElementById("plans")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative flex h-12 w-full min-w-[180px] items-center justify-center overflow-hidden border border-white bg-white px-6 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white sm:w-auto"
          >
            <span className="relative z-10">View Services</span>
            <div className="absolute inset-0 -translate-x-full bg-black transition-transform duration-300 group-hover:translate-x-0" />
          </button>

          <a
            href="/contact"
            className="group relative flex h-12 w-full min-w-[180px] items-center justify-center border border-white/20 bg-black px-6 text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/5 sm:w-auto"
          >
            Start a Project
            <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
          </a>
        </div>
      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-30">
        <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-500">Scroll_Down</span>
        <div className="h-8 w-px bg-white" />
      </div>

    </motion.section>
  );
};

export default HeroSection;