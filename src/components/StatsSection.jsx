"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const stats = [
  {
    value: "40+",
    label: "Production websites launched",
  },
  {
    value: "100+",
    label: "Discord servers structured",
  },
  {
    value: "300+",
    label: "Short-form videos delivered",
  },
  {
    value: "95%",
    label: "Client retention rate",
  },
];

const StatsSection = () => {
  const router = useRouter();

  return (
    <section
      className="relative border-t border-zinc-900 bg-[#0a0a0a] px-6 py-24 sm:py-32 selection:bg-zinc-800"
      aria-labelledby="stats-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-20 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            The Track Record
          </span>
          <h2
            id="stats-heading"
            className="text-3xl sm:text-5xl font-serif italic text-white leading-tight"
          >
            Systems delivered, not experiments.
          </h2>
          <p className="mt-8 text-base sm:text-lg text-zinc-500 font-light max-w-2xl leading-relaxed italic">
            A precise record of execution across web, community architecture, and content.
          </p>
        </div>

        {/* Stats Grid - Editorial Style (Hairline dividers) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-zinc-900">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="py-12 pr-6 border-zinc-900 group"
            >
              <div className="text-3xl sm:text-4xl font-serif text-white mb-4 tracking-tighter group-hover:italic transition-all duration-300">
                {stat.value}
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium leading-relaxed max-w-[140px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Credibility Footer */}
        <div className="mt-12 pt-12 border-t border-zinc-900">
          <p className="text-[11px] uppercase tracking-widest text-zinc-600 max-w-md leading-loose">
            Work delivered for creators, startups, and independent brands across web, 
            community, and content systems.
          </p>
          
          <div className="mt-12">
            <button
              onClick={() => router.push("/plans")}
              className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-all"
            >
              <span className="border-b border-zinc-800 group-hover:border-white pb-1 transition-all">
                See how we work
              </span>
              <span className="text-zinc-600 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
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

export default StatsSection;