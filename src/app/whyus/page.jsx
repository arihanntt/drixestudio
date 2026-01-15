"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Systems over surface-level work",
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
    title: "Websites",
    desc: "Fast, SEO-ready, static websites built for clarity and performance. No bloated stacks, no unnecessary complexity.",
  },
  {
    id: "DSY",
    title: "Discord systems",
    desc: "Structured communities with clear roles, permissions, onboarding flows, automation, and moderation.",
  },
  {
    id: "CNT",
    title: "Content & social presence",
    desc: "Simple, consistent short-form video and content systems designed to support your brand, not distract from it.",
  },
];

const process = [
  {
    step: "01",
    title: "Understand the goal",
    desc: "We start by understanding what you’re building, who it’s for, and what success actually looks like.",
  },
  {
    step: "02",
    title: "Design the structure",
    desc: "Before visuals or tools, we map out architecture — pages, roles, flows, permissions, and systems.",
  },
  {
    step: "03",
    title: "Build with intent",
    desc: "Execution is clean, focused, and documented. No rushed decisions or messy setups.",
  },
  {
    step: "04",
    title: "Refine & support",
    desc: "We help you stabilize, iterate, and improve — not disappear after delivery.",
  },
];

const WhyUsPage = () => {
  return (
    <section className="min-h-screen bg-black font-mono text-zinc-300 border-t border-white/20">
      
      {/* --- BACKGROUND GRID --- */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
             linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-32">

        {/* --- HERO --- */}
        <div className="mb-24 border-l-2 border-white pl-6 sm:pl-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
             // Why Drixe Studio
          </p>
          <h1 className="text-4xl font-bold uppercase leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-7xl">
            We build systems <br />
            that <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>actually last.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-lg">
            Drixe Studio is a digital systems studio focused on clarity, structure,
            and long-term usability. We work with creators, communities, and brands
            who want things built properly — not rushed.
          </p>
        </div>

        {/* --- PRINCIPLES --- */}
        <div className="mb-32">
          <div className="mb-8 border-b border-white/20 pb-4">
             <h2 className="text-xl font-bold uppercase tracking-widest text-white">
               How we think
             </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-white/20 md:grid-cols-3">
            {principles.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between border-b border-r border-white/20 bg-black p-8 transition-colors hover:bg-white hover:text-black"
              >
                <div>
                    <div className="mb-6 text-xs font-bold text-zinc-600 group-hover:text-black/40">
                        {item.number}
                    </div>
                    <h3 className="mb-4 text-lg font-bold uppercase tracking-wide leading-tight">
                    {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-black/80">
                    {item.desc}
                    </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SERVICES --- */}
        <div className="mb-32 max-w-5xl">
          <div className="mb-8 border-b border-white/20 pb-4">
             <h2 className="text-xl font-bold uppercase tracking-widest text-white">
               What we do
             </h2>
          </div>
          
          <div className="w-full border-t border-white/20">
             <p className="mb-8 mt-4 text-sm text-zinc-400">
                We don’t try to do everything. We focus on a small set of services and do them properly.
             </p>

             {services.map((s, i) => (
                 <div key={i} className="group grid grid-cols-1 gap-4 border-b border-white/20 py-8 transition-colors hover:bg-zinc-900 sm:grid-cols-12 sm:gap-8">
                     <div className="col-span-1 sm:col-span-2">
                        <span className="bg-zinc-900 border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:border-white group-hover:text-white">
                            {s.id}
                        </span>
                     </div>
                     <div className="col-span-1 sm:col-span-4">
                        <h3 className="text-lg font-bold uppercase text-white">
                            {s.title}
                        </h3>
                     </div>
                     <div className="col-span-1 sm:col-span-6">
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                            {s.desc}
                        </p>
                     </div>
                 </div>
             ))}
          </div>
        </div>

        {/* --- PROCESS --- */}
        <div className="mb-32">
          <div className="mb-12 border-b border-white/20 pb-4">
             <h2 className="text-xl font-bold uppercase tracking-widest text-white">
               How we work
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div key={i} className="relative border-l border-white/20 pl-8 pb-12 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-8 sm:pr-8">
                {/* Connector Dot */}
                <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 bg-black border border-white sm:-top-[5px] sm:left-0" />
                
                <span className="block text-xs font-bold text-zinc-600 mb-2">
                    STEP {p.step}
                </span>
                <h4 className="mb-4 text-lg font-bold uppercase text-white">
                  {p.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- AUDIENCE & CTA --- */}
        <div className="border border-white/20 bg-zinc-900/10 p-8 sm:p-12">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-white text-xs font-bold text-white">!</div>
            <div>
                 <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                    Who this is for (and who it isn’t)
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
                    Drixe Studio is for people who care about structure, clarity, and
                    long-term results. If you’re looking for the cheapest option or a
                    rushed setup, we’re probably not the right fit.
                    <br /><br />
                    If you want something built cleanly, with thought behind every
                    decision — we’ll work well together.
                </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
             <div>
                <h3 className="text-xl font-bold uppercase text-white">
                    Ready to build something solid?
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                    Explore our plans or reach out for a recommendation.
                </p>
             </div>
             
             <Link
                href="/plans"
                className="group relative flex h-12 items-center justify-center border border-white bg-white px-8 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
             >
                <span className="relative z-10">View plans & pricing</span>
                <div className="absolute inset-0 -translate-x-full bg-black transition-transform duration-300 group-hover:translate-x-0" />
             </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUsPage;