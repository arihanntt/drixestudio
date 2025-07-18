'use client';

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const WhyUs = () => {
  const router = useRouter();

  return (
    <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-[#0f0f0f] text-white border-t border-neutral-800">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/25 blur-[200px] rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/20 blur-[160px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400"
        >
          Why <span className="drop-shadow text-white">Drixe Studio</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm mt-4 max-w-xl mx-auto"
        >
          We don’t just build servers — we craft scalable ecosystems for your brand.
        </motion.p>
      </div>

      {/* Animated Text Block */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <div className="inline-block text-lg sm:text-xl text-gray-300 leading-relaxed">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-white/80 via-violet-400 to-white/70 bg-[length:200%_auto] animate-text-reveal">
            Modular automation, smart permissions, blazing-fast delivery — and a lifetime of reliable support.
          </p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <div className="text-center mt-14">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push("/whyus")}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold hover:opacity-90 transition shadow-lg"
        >
          Explore More →
        </motion.button>
      </div>

      {/* Glow Bubbles */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 blur-3xl rounded-full animate-pulse opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/20 blur-3xl rounded-full animate-pulse opacity-30 pointer-events-none" />

      {/* Reveal Animation */}
      <style>
        {`
          .animate-text-reveal {
            background-position: 200% center;
            animation: gradientReveal 6s ease-in-out forwards;
          }

          @keyframes gradientReveal {
            0% { background-position: 200% center; opacity: 0; }
            100% { background-position: 0% center; opacity: 1; }
          }
        `}
      </style>
    </section>
  );
};

export default WhyUs;
