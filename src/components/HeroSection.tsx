"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 selection:bg-zinc-800 selection:text-white">
      {/* --- VISUAL LAYERS (Restrained) --- */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-900/20 blur-[120px] pointer-events-none" />

      {/* --- MAIN CONTENT (Centered & Focused) --- */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        
        {/* Eyebrow - Audience Qualification */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600"
        >
          For creators, startups, and online brands
        </motion.div>

        {/* H1 Heading - SEO & Editorial Core */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10 flex flex-col items-center"
        >
          <span className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-light tracking-tight text-white leading-none">
            Websites and
          </span>
          <span className="mt-2 text-5xl sm:text-7xl md:text-8xl font-serif italic font-light tracking-tight text-zinc-500 leading-none">
            Discord systems
          </span>
          
          <div className="mt-6 text-[11px] uppercase tracking-[0.35em] text-zinc-500 font-medium">
             built to scale with your brand
          </div>
        </motion.h1>

        {/* Description - Concrete Value Proposition */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mb-14 max-w-2xl text-center px-4"
        >
          <p className="text-base sm:text-lg leading-relaxed text-zinc-400 font-light italic">
            We design and build high-performance websites and structured Discord servers. 
            <span className="text-zinc-200 block mt-1">Clear systems, clean execution, no unnecessary layers.</span>
          </p>
        </motion.div>

        {/* CTA Hierarchy - Decision Focused */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-10 sm:flex-row"
        >
          {/* Primary CTA (High Contrast) */}
          <Link href="/contact" className="group relative">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white border border-white/20 px-10 py-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
              Start a Project
            </span>
          </Link>

          {/* Secondary CTA (Subtle Link) */}
          <Link href="/services" className="group text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-zinc-300 transition-all">
            <span className="border-b border-zinc-800 group-hover:border-zinc-500 pb-1">
              View services
            </span>
          </Link>
        </motion.div>
      </div>

      {/* --- HIDDEN SEO SUPPORT --- */}
      <h2 className="sr-only">
        Website development, Discord server setup, and digital systems for creators and brands
      </h2>

      {/* --- COMPRESSED SCROLL INDICATOR --- */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20">
        <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;