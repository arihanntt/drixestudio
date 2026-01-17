"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const WhyUs = () => {
  const router = useRouter();

  const features = [
    {
      title: "Conversion-focused websites",
      description: "Landing pages, portfolios, and full sites built for speed, clarity, and real user behavior.",
    },
    {
      title: "Structured Discord servers",
      description: "Clean channel architecture, roles, and permissions designed for community growth and moderation.",
    },
    {
      title: "Consistent social content",
      description: "Visual and written content that fits your brand perfectly—without chasing trends or noise.",
    },
    {
      title: "Modular services",
      description: "Hire us for one service or combine them. Nothing breaks if you decide to expand later.",
    },
  ];

  return (
    <section
      className="relative border-t border-zinc-900 bg-[#0a0a0a] px-6 py-24 sm:py-32 selection:bg-zinc-800"
      aria-labelledby="why-us-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-24 max-w-4xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-8 block">
            The Advantage
          </span>
          
          <h2
            id="why-us-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-white leading-[1.1] tracking-tight"
          >
            Websites, Discord servers, and content — built independently or together.
          </h2>

          <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8">
            <div className="max-w-xl">
              <h3 className="text-lg sm:text-xl text-zinc-200 font-medium leading-relaxed">
                Start with what you need today. <br/> Add the rest when it makes sense.
              </h3>
              <p className="mt-4 text-zinc-500 font-light leading-relaxed">
                We build websites, Discord servers, and social content as standalone services—with 
                the option to integrate them later without rework.
              </p>
            </div>
          </div>
        </div>

        {/* Optimized Grid - Using CSS Border-Gap pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
          {features.map((item, index) => (
            <motion.div
              key={index}
              // Lightest possible animation: simple fade up once
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              // Use standard CSS for hover to save JS cycles
              className="bg-[#0a0a0a] p-8 sm:p-10 flex flex-col min-h-[280px] transition-colors duration-300 hover:bg-[#0f0f0f] group"
            >
              <span className="font-mono text-[9px] text-zinc-700 block mb-10 transition-colors duration-300 group-hover:text-zinc-500">
                SERVICE_0{index + 1}
              </span>
              <h4 className="text-xl font-medium text-white tracking-tight mb-4">
                {item.title}
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed transition-colors duration-300 group-hover:text-zinc-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-16 flex justify-between items-center border-t border-zinc-900 pt-12">
          <button
            onClick={() => router.push("/plans")}
            className="group flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-all duration-300"
          >
            <span className="border-b border-transparent group-hover:border-white pb-1">
              View services & pricing
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          
          <div className="hidden sm:block text-[9px] text-zinc-800 uppercase tracking-widest font-mono">
            No_Rework_Guaranteed
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </section>
  );
};

export default WhyUs;