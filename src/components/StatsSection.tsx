"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* --- ANIMATED COUNTER COMPONENT --- */
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const stats = [
  {
    value: 40,
    suffix: "+",
    label: "Websites Launched",
  },
  {
    value: 100,
    suffix: "+",
    label: "Discord Servers Setup",
  },
  {
    value: 300,
    suffix: "+",
    label: "Videos Delivered",
  },
  {
    value: 95,
    suffix: "%",
    label: "Client Retention",
  },
];

const StatsSection = () => {
  const router = useRouter();

  return (
    <section
      className="relative w-full bg-black text-white selection:bg-cyan-500 selection:text-black pt-32 pb-32 overflow-hidden border-b border-white/10"
      aria-labelledby="stats-heading"
    >
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- 1. HEADER BLOCK (Split Layout) --- */}
        <div className="mb-20 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Track Record
              </span>
            </motion.div>
            
            <motion.h2
              id="stats-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85]"
            >
              Proven <br />
              <span className="text-white/30">Results.</span>
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
              We focus on delivering high-performance digital systems. Here is our history across web development, Discord setups, and content systems.
            </p>
          </motion.div>
        </div>

        {/* --- 2. STATS GRID (Architectural 1px Borders) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-black p-10 md:p-14 lg:p-16 group relative overflow-hidden"
            >
              {/* Brutalist Cyan Tape Accent (Vertical) */}
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-cyan-500 block mb-10 tracking-[0.3em]">
                  METRIC_0{i + 1}
                </span>
                
                <div className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-black leading-relaxed max-w-[140px] group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </p>
              </div>

              {/* Background Geometry (Reveals on Hover) */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>

        {/* --- 3. BOTTOM ACTION BAR --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border border-white/10 bg-white/5 p-8 md:p-12"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">
              Verified Performance
            </span>
            <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase text-white">
              Trusted by creators and early-stage brands globally.
            </span>
          </div>
          
          <button
            onClick={() => router.push("/plans")}
            className="group flex items-center justify-center bg-white px-10 py-5 hover:bg-cyan-400 transition-all duration-300 w-full md:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">
              Start Project
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;