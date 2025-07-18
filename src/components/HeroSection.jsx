import React, { useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const heroRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="relative z-10 overflow-hidden flex flex-col justify-center items-center text-center min-h-screen px-6 py-24 sm:py-28 bg-[#0f0f1c]"
    >
      {/* ✨ Background Effects */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035]" />
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-blurple/20 blur-[160px] rounded-full opacity-10 animate-pulse" />
        {/* Grid */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-5 mask-vignette"
        >
          {[...Array(12)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={(i + 1) * 8} x2="100" y2={(i + 1) * 8} stroke="white" strokeWidth="0.2" />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={`v-${i}`} y1="0" x1={(i + 1) * 8} y2="100" x2={(i + 1) * 8} stroke="white" strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      <style>
        {`
          .mask-vignette {
            mask-image: radial-gradient(circle at center, white 25%, transparent 85%);
            -webkit-mask-image: radial-gradient(circle at center, white 25%, transparent 85%);
          }
        `}
      </style>

      {/* Hidden SEO H1 */}
      <h1 className="sr-only">Drixe Studio — Premium Discord Server Design & Setup</h1>

      {/* Content */}
     <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
  <motion.h2
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-snug"
  >
    <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 block mb-2">
      Drixe Studio
    </span>
    <span className="block text-base sm:text-lg md:text-xl font-semibold text-white/90">
      Professional Discord Server Setup & Customization
    </span>
  </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Premium Discord setups, uniquely styled and infused with community systems, automation, and engagement design.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto"
        >
          Designed by <span className="text-white font-semibold">Drixe</span>, inspired by <span className="italic font-semibold text-white">Lua</span>. Trusted by gamers, brands & creators worldwide.
        </motion.p>

        {/* CTA Button */}
       <motion.button
  onClick={() => {
    const el = document.getElementById("plans");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.5 }}
  className="mt-12 sm:mt-14 px-8 py-4 sm:py-5 rounded-full font-semibold text-white bg-white/5 border border-white/20 backdrop-blur-sm transition-all relative group text-sm sm:text-base hover:shadow-lg hover:shadow-blurple/30"
>
  <span className="relative z-10">↓ Explore Plans</span>
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
    <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent absolute left-0 top-0 animate-slideShimmer" />
  </div>
</motion.button>

      </div>
    </section>
  );
};

export default HeroSection;
