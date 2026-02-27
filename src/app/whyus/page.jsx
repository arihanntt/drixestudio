"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Systems over surface",
    desc: "We don’t just make things look good. We design structures that remain usable, scalable, and maintainable long after launch.",
  },
  {
    number: "02",
    title: "Clarity beats complexity",
    desc: "Most projects fail because of over-engineering. We focus on what matters and remove everything that doesn’t.",
  },
  {
    number: "03",
    title: "Built to evolve",
    desc: "Whether it’s a website or a Discord community, we build foundations that can grow without breaking.",
  },
];

const services = [
  {
    id: "WEB",
    title: "Website Development",
    desc: "Fast, custom Next.js websites built for clarity and speed. No templates, no bloat.",
  },
  {
    id: "DSY",
    title: "Discord Architecture",
    desc: "Professional community setups with clear roles, secure permissions, and bot automation.",
  },
  {
    id: "CNT",
    title: "Content Systems",
    desc: "Consistent short-form video frameworks designed to grow your brand on social media.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Goal Alignment",
    desc: "We start by defining what success looks like for your specific brand and audience.",
  },
  {
    step: "02",
    title: "System Design",
    desc: "We map out the architecture—pages, roles, and flows—before writing a single line of code.",
  },
  {
    step: "03",
    title: "Clean Execution",
    desc: "We build your system with intent. Execution is clean, documented, and production-ready.",
  },
  {
    step: "04",
    title: "Live Support",
    desc: "We help you stabilize and improve your system, ensuring it operates perfectly at scale.",
  },
];

export default function WhyUsPage() {
  return (
    <main className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black">
      
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">

        {/* --- 1. HERO BLOCK --- */}
        <header className="mb-32 border-b border-white/10 pb-20">
          <div className="flex items-center gap-6 mb-12">
            <span className="h-[2px] w-12 bg-cyan-500 block" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
               Studio Philosophy
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-end">
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter">
              We Build <br />
              <span className="text-white/30">Systems.</span>
            </h1>
            <div className="max-w-md lg:pb-4">
               <p className="text-lg md:text-xl font-medium text-white/60 leading-relaxed italic">
                 Drixe Studio is a digital systems laboratory. We build websites and communities designed for high-performance use, not just quick launches.
               </p>
            </div>
          </div>
        </header>

        {/* --- 2. PRINCIPLES GRID --- */}
        <section className="mb-40">
          <div className="mb-12 flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Operating Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {principles.map((item, i) => (
              <div
                key={i}
                className="group relative bg-black p-12 transition-colors duration-500 hover:bg-[#050505] overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <span className="block mb-10 font-mono text-[10px] text-cyan-500 tracking-[0.3em]">
                   RULE_{item.number}
                </span>
                <h3 className="mb-6 text-3xl font-black uppercase tracking-tighter text-white">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-white/50">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 3. SERVICES LIST --- */}
        <section className="mb-40">
          <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Core Capabilities
            </span>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
              Focus over variety
            </span>
          </div>
          
          <div className="space-y-0">
             {services.map((s, i) => (
                 <div key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 py-12 transition-colors duration-500 hover:bg-white/[0.02]">
                     <div className="md:col-span-2">
                        <span className="text-xs font-mono tracking-widest text-cyan-500">
                            [{s.id}]
                        </span>
                     </div>
                     <div className="md:col-span-4">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                            {s.title}
                        </h3>
                     </div>
                     <div className="md:col-span-6">
                        <p className="text-base font-medium text-white/50 leading-relaxed max-w-lg">
                            {s.desc}
                        </p>
                     </div>
                 </div>
             ))}
          </div>
        </section>

        {/* --- 4. PROCESS: WITH GHOST NUMBERS --- */}
        <section className="mb-40">
          <div className="mb-20 flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Workflow Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((p, i) => (
              <div key={i} className="relative group">
                {/* Massive Background Ghost Number */}
                <div className="absolute -top-16 -left-4 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-700">
                   {p.step}
                </div>
                
                <div className="relative z-10 pt-10">
                  <span className="block text-[10px] font-black text-cyan-500 mb-4 tracking-[0.3em]">
                      PHASE_{p.step}
                  </span>
                  <h4 className="mb-6 text-2xl font-black uppercase tracking-tighter text-white">
                    {p.title}
                  </h4>
                  <p className="text-sm font-medium text-white/50 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. THE BOUNDARY (Ideal Fit & CTA) --- */}
        <section className="bg-white/5 border border-white/10 p-10 md:p-20 overflow-hidden relative">
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1))] bg-[length:20px_20px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16">
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
                    The Ideal <br />
                    <span className="text-cyan-500">Fit.</span>
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-white/60 font-medium">
                    Drixe Studio is for people who care about structure and long-term results. 
                    If you’re looking for the cheapest option or a rushed setup, we’re probably 
                    not the right studio for you. 
                    <br /><br />
                    But if you want it built cleanly, with thought behind every decision—we should talk.
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-auto">
                <Link
                  href="/plans"
                  className="group flex items-center justify-center bg-white px-10 py-6 hover:bg-cyan-400 transition-colors duration-300 w-full lg:w-72"
                >
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-black transition-colors duration-300">
                    View Pricing
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-center border border-white/20 px-10 py-6 hover:bg-white hover:text-black transition-all duration-300 w-full lg:w-72"
                >
                  <span className="text-xs font-black uppercase tracking-[0.3em] transition-colors duration-300">
                    Contact Us
                  </span>
                </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}