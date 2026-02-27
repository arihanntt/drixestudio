"use client";

import React from "react";
import { motion } from "framer-motion";

const ReviewStrip = () => {
  const reviews = [
    {
      service: "Website Development",
      name: "Luna",
      role: "Digital Creator",
      text: "The website setup was clean and fast. Everything worked exactly as promised right out of the box.",
    },
    {
      service: "Discord Server Setup",
      name: "Ayaan",
      role: "E-commerce Founder",
      text: "Clear structure and proper automation. It is exactly what our community needed to scale safely.",
    },
    {
      service: "Social Media Content",
      name: "Yuki",
      role: "Community Lead",
      text: "Our video content finally feels organized. The editing process is seamless and fits our brand perfectly.",
    },
    {
      service: "Website Development",
      name: "Nova",
      role: "Operations Lead",
      text: "They delivered our Next.js website fast and built it to handle our growing traffic without breaking.",
    },
    {
      service: "Discord Server Setup",
      name: "Mira",
      role: "Artist",
      text: "Everything they build is thoughtfully designed. Clean, modern, and incredibly easy for our team to use.",
    },
  ];

  // Duplicate for seamless loop
  const duplicated = [...reviews, ...reviews, ...reviews];

  return (
    <section 
      itemScope 
      itemType="https://schema.org/Review"
      className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-b border-white/10 selection:bg-cyan-500 selection:text-black"
    >
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32 mb-20 md:mb-28">
        
        {/* --- HEADER BLOCK (Split Layout) --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Validation
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85]"
            >
              Client <br />
              <span className="text-white/30">Feedback.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:max-w-sm pb-2"
          >
            <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed italic">
              Verification of results from the creators, startups, and brands within the Drixe ecosystem.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- EDGE-TO-EDGE MARQUEE --- */}
      <div className="relative w-full overflow-hidden py-12 md:py-20 bg-[#030303] border-y border-white/10">
        
        {/* Directional Blur Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent" />

        {/* The Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] perspective-1000">
          {duplicated.map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, borderColor: "rgba(0, 229, 255, 0.3)" }}
              className="group relative flex w-[380px] md:w-[500px] flex-shrink-0 flex-col justify-between p-10 md:p-14 mx-6 bg-black border border-white/10 transition-all duration-500 rounded-none shadow-[20px_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Massive Background Ghost Index */}
              <div className="absolute -top-6 -right-6 z-0 text-[10rem] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-cyan-500/5 transition-colors duration-700">
                {(i % reviews.length) + 1}
              </div>

              {/* Cyan Accent Bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

              <div className="relative z-10">
                {/* Meta Tag */}
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-500 block mb-8">
                  TESTIMONY_0{(i % reviews.length) + 1}
                </span>
                
                {/* Review Text */}
                <p 
                  itemProp="reviewBody"
                  className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white/80 group-hover:text-white leading-[1.2] transition-colors duration-500"
                >
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="relative z-10 mt-16 flex items-center justify-between border-t border-white/10 pt-8">
                <div>
                  <p itemProp="author" className="text-xs font-black uppercase tracking-widest text-white">
                    {review.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1 font-bold">
                    {review.role}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest border border-white/10 px-3 py-1">
                  {review.service}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Marquee Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default ReviewStrip;