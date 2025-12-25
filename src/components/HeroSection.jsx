"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.6], ["0%", "5%"]);

  return (
    <motion.section
  ref={heroRef}
  aria-labelledby="hero-heading"
  className="
    relative flex min-h-screen items-center justify-center overflow-hidden bg-black
    px-6 text-center
    pt-32 pb-32
    sm:pt-36 sm:pb-36
    md:pt-0 md:pb-0
  "
>

      {/* Advanced background system */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(168,85,247,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_20%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        {/* Eyebrow */}
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/50">
          Web & Community Systems Studio
        </p>

        {/* H1 */}
        <h1
          id="hero-heading"
          className="mb-6 text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Websites and communities
          <span className="block bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            engineered to scale.
          </span>
        </h1>

        {/* Supporting copy */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Drixe Studio designs high-performance websites and structured Discord
          community systems for creators, brands, and online businesses. We
          focus on speed, clarity, user flow, and long-term scalability.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() =>
              document
                .getElementById("plans")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            View Services
          </button>

          <a
            href="/contact"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:border-white/40"
          >
            Start a Project
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator (hidden on very small screens) */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 opacity-60 sm:block">
        <div className="flex h-8 w-4 items-start justify-center rounded-full border border-white/30 p-1">
          <div className="h-2 w-1 animate-scroll rounded-full bg-white" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scroll {
          animation: scroll 1.6s infinite ease-in-out;
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection;
