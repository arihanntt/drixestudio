"use client"; // Required for useState & interactivity in Next.js App Router

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Lightweight parallax with capped range
  const yText = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex flex-col justify-center items-center text-center min-h-screen px-4 py-16 sm:py-24 bg-[#0f0f1c] will-change-transform"
      style={{ touchAction: "manipulation" }}
    >
      {/* Background Images with Overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Desktop Image (hidden on mobile) */}
        <img
          src="/background-hero-desktop.jpg" // Replace with your desktop image path
          alt="Hero Background Desktop"
          className="w-full h-full object-cover opacity-80 hidden md:block"
          loading="lazy"
        />
        {/* Mobile Image (hidden on desktop) */}
        <img
          src="/background-hero-mobile.jpg" // Replace with your mobile image path
          alt="Hero Background Mobile"
          className="w-full h-full object-cover opacity-80 md:hidden"
          loading="lazy"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c]/95 via-[#0f0f1c]/70 to-transparent" />
      </div>

      {/* Content with enhanced styling */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        style={{ y: yText }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 drop-shadow-lg">
            Drixe Studio
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-6 w-1/2 sm:w-3/4"
        />

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/90 font-medium mb-4"
        >
          Professional Discord Server Setup & Customization
        </motion.p>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed"
        >
          Designed by <span className="text-white font-semibold">Drixe</span>, inspired by{" "}
          <span className="italic font-semibold text-white">Lua</span>. Trusted by gamers, brands & creators worldwide.
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button
            onClick={() => {
              const el = document.getElementById("plans");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-white bg-white/5 border border-white/20 hover:border-white/40 transition-all duration-300 relative overflow-hidden group focus:outline-none touch-manipulation"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="group-hover:-translate-y-1 transition-transform duration-300">↓</span>
              Explore Plans
            </span>
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/20 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with CSS animation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-8">
        <div className="w-3 h-6 rounded-full border-2 border-white/30 flex justify-center p-0.5 sm:w-3.5 sm:h-7">
          <div className="w-1 h-2 rounded-full bg-white/80 animate-scrollIndicator sm:w-1.5 sm:h-3" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scrollIndicator {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(3px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-bounce { animation: bounce 1.8s infinite ease-in-out; }
        .animate-scrollIndicator { animation: scrollIndicator 1.2s infinite ease-in-out; }
        @media (max-width: 640px) {
          .min-h-screen { min-height: 100vh; }
          .px-4 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .text-4xl { font-size: 2rem; }
          .text-5xl { font-size: 2.5rem; }
          .text-6xl { font-size: 2.75rem; }
          .max-w-3xl { max-width: 100%; }
          .mb-6 { margin-bottom: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;