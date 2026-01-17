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

const processSteps = [
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

export default function WhyUsPage() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] font-sans text-zinc-300 border-t border-zinc-900 selection:bg-zinc-800 selection:text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-32">

        {/* --- HERO: CLARITY FIX --- */}
        <header className="mb-24 border-l border-zinc-700 pl-6 sm:pl-10 max-w-4xl">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
             Our Philosophy
          </p>
          <h1 className="text-4xl font-serif italic leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
            We build systems <br />
            that <span className="text-zinc-500">actually last.</span>
          </h1>
          <p className="mt-8 text-base leading-relaxed text-zinc-400 sm:text-lg italic font-light">
            Drixe Studio is a digital systems studio. We build systems that actually last — 
            websites and communities designed for long-term use, not quick launches. 
            <span className="block mt-4 text-zinc-200 not-italic font-normal">
              Our work focuses on websites, Discord systems, and content infrastructure.
            </span>
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-zinc-600 font-medium">
            Used by independent creators and early-stage brands
          </p>
        </header>

        {/* --- PRINCIPLES: SEO & STABILITY FIX --- */}
        <div className="mb-32">
          <div className="mb-8 border-b border-zinc-900 pb-4">
             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
               Our Design Principles
             </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-zinc-900 md:grid-cols-3">
            {principles.map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between border-b border-r border-zinc-900 bg-transparent p-8 transition-colors duration-300 hover:bg-zinc-900/40"
              >
                <div>
                    <div className="mb-6 font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
                        Principle_{item.number}
                    </div>
                    <h3 className="mb-4 text-xl font-serif italic text-white leading-tight">
                    {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {item.desc}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SERVICES: SEMANTIC FIX --- */}
        <div className="mb-32 max-w-5xl">
          <div className="mb-8 border-b border-zinc-900 pb-4">
             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
               Our Services
             </h2>
          </div>
          
          <div className="w-full border-t border-zinc-900">
             <p className="mb-8 mt-4 text-sm text-zinc-500 italic">
                We don’t try to do everything. We focus on a small set of services and do them properly.
             </p>

             {services.map((s, i) => (
                 <div key={i} className="group grid grid-cols-1 gap-4 border-b border-zinc-900 py-8 transition-colors duration-300 hover:bg-zinc-900/20 sm:grid-cols-12 sm:gap-8">
                     <div className="col-span-1 sm:col-span-2 pt-1">
                        <span className="text-[10px] font-mono tracking-widest text-zinc-700">
                            {s.id}
                        </span>
                     </div>
                     <div className="col-span-1 sm:col-span-4">
                        <h3 className="text-lg font-medium text-white tracking-tight">
                            {s.title}
                        </h3>
                     </div>
                     <div className="col-span-1 sm:col-span-6">
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            {s.desc}
                        </p>
                     </div>
                 </div>
             ))}
          </div>
        </div>

        {/* --- PROCESS: SEO FIX --- */}
        <div className="mb-32">
          <div className="mb-12 border-b border-zinc-900 pb-4">
             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
               Our Process
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <div key={i} className="relative border-l border-zinc-900 pl-8 pb-12 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-8 sm:pr-8 group">
                <div className="absolute -left-[3px] top-0 h-1.5 w-1.5 bg-zinc-700 sm:-top-[3px] sm:left-0 group-hover:bg-white transition-colors" />
                
                <span className="block text-[10px] font-bold text-zinc-600 mb-2 tracking-widest">
                    STEP {p.step}
                </span>
                <h4 className="mb-4 text-lg font-serif italic text-white tracking-tight">
                  {p.title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- AUDIENCE & CTA: LOGIC FIX --- */}
        <div className="border border-zinc-900 bg-zinc-900/10 p-8 sm:p-12">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center border border-zinc-600 text-[10px] font-bold text-zinc-600 italic font-serif">i</div>
            <div>
                 <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                    The Ideal Fit
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 font-light">
                    Drixe Studio is for people who care about structure, clarity, and
                    long-term results. If you’re looking for the cheapest option or a
                    rushed setup, we’re probably not the right fit.
                    <br /><br />
                    If you want something built cleanly, with thought behind every
                    decision — we’ll work well together.
                </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-zinc-900 pt-8 sm:flex-row sm:items-center">
             <div>
                <h3 className="text-xl font-serif italic text-white tracking-tight">
                    Ready to build something solid?
                </h3>
                <p className="text-[11px] uppercase tracking-widest text-zinc-600 mt-2">
                    Explore our plans or reach out for a recommendation.
                </p>
             </div>
             
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <Link
                  href="/plans"
                  className="text-[11px] font-bold uppercase tracking-[0.3em] bg-white text-black px-8 py-4 hover:bg-zinc-200 transition-colors"
                >
                  View plans & pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white border-b border-transparent hover:border-white transition-all pb-1"
                >
                  Contact us
                </Link>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}