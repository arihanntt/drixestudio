"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-black selection:bg-cyan-500 selection:text-black flex flex-col border-b border-white/10 pt-32 md:pt-28 xl:pt-32 pb-72 md:pb-40 overflow-visible"
    >

      {/* Background (removed bg-fixed for performance) */}
      <div className="absolute inset-0 z-0 bg-[url('/your-premium-bg.webp')] bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none" />

      {/* Grid Lines */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

     

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 xl:px-32 flex flex-col"
      >

        <div className="mb-8 flex items-center gap-6">
          <span className="h-[2px] w-12 bg-cyan-400 block" />
          <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white">
            Discord. Web. Content.
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex flex-col z-20 w-full"
        >
          <span className="text-[15vw] xl:text-[11rem] font-black tracking-tighter text-white leading-[0.85] uppercase">
            Discord.
          </span>
          <span className="text-[15vw] xl:text-[11rem] font-black tracking-tighter text-white leading-[0.85] uppercase ml-[10%]">
            Websites.
          </span>
          <span className="text-[15vw] xl:text-[11rem] font-light italic text-white leading-[0.85] uppercase ml-[20%] mt-2 relative w-fit">
            <span className="relative z-10">Content.</span>
            <span className="absolute bottom-[15%] left-[-5%] w-[110%] h-[6px] xl:h-[12px] bg-cyan-500 -z-10" />
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 max-w-2xl text-lg sm:text-xl md:text-2xl leading-snug text-white font-medium"
        >
          Custom Next.js web development. Premium Discord server setup. High-retention short-form content.
          <span className="block mt-4 text-cyan-400 font-bold tracking-widest uppercase text-xs">
            Precision-crafted digital systems.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex"
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden bg-white px-12 py-6 border border-white transition-all duration-300 hover:bg-black w-full sm:w-auto text-center"
          >
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors duration-300">
              Start Deployment
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* OVERLAP PANEL – Premium Layered Design */}
     <motion.div
  initial={{ opacity: 0, y: 80 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 1 }}
  className="absolute -bottom-40 md:-bottom-28 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 xl:right-32 w-[92%] md:w-[60%] lg:w-[40%] max-w-[600px] z-30"
>
        <div className="relative bg-zinc-900/95 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

          {/* Glow Edge */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 pointer-events-none" />

          {/* Top Highlight Bar */}
          <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-cyan-400 via-white to-cyan-400" />

          {/* Subtle Animated Shine */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-400/10 blur-3xl animate-pulse" />

          <div className="flex justify-between items-end mb-8 relative z-10">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">
              Services
            </span>
            <span className="text-sm text-cyan-400 font-black">03</span>
          </div>

          <ul className="space-y-6 relative z-10">
            {["Web Development", "Discord Server Setup", "Content Production"].map(
              (item, i) => (
                <li
                  key={i}
                  className="text-lg font-semibold text-white tracking-wide uppercase flex justify-between hover:translate-x-2 transition-transform duration-300"
                >
                  <span>{item}</span>
                  <span className="text-cyan-400">↗</span>
                </li>
              )
            )}
          </ul>
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;