import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "framer-motion/client"; // Next.js 14/15 server-safe motion import
import Image from "next/image"; // ✅ Imported to replace placeholder

export const metadata: Metadata = {
  title: "Custom Website Development & Design | Drixe Studio",
  description:
    "We design and build fast, custom Next.js websites. No bloated page builders or slow templates. Just clean code focused on speed, SEO, and higher conversion rates.",
  keywords: [
    "custom website development",
    "Next.js web design",
    "conversion focused website",
    "fast loading websites",
    "hire frontend developer",
    "startup website design"
  ],
  alternates: {
    canonical: "https://www.drixestudio.services/website-design",
  },
};

export default function WebsiteDesignPage() {
  return (
    <main className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black">
      
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- 1. HEADER BLOCK (Split Layout) --- */}
        <header className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Website Development
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter"
            >
              Custom Sites. <br />
              <span className="text-white/40">Built to Convert.</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:max-w-sm pb-2"
          >
            <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed">
              We design fast, clean, and professional websites for creators and startups. We focus on clear layouts and fast loading speeds—not slow templates or bloated page builders.
            </p>
          </motion.div>
        </header>

        {/* --- 2. MASSIVE HERO VISUAL (3D Architectural System) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video md:aspect-[21/9] bg-[#050505] border border-white/10 mb-32 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          {/* ✅ The placeholder is replaced with a custom high-fidelity 3D visualization */}
          <Image 
            src="/assets/image_0.png" 
            alt="Drixe Studio Website Development System: 3D Brutalist Architecture showcasing structure, speed, and conversion goals." 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
            priority
          />
          {/* The subtle grid overlay can stay for depth */}
          <div className="absolute inset-0 z-10 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </motion.div>

        {/* --- 3. BUSINESS VALUE (Brutalist Bento Grid) --- */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Why Custom Code?
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
             {[
               { t: "Lightning Fast", d: "Pages load instantly, keeping visitors on your site longer." },
               { t: "SEO Optimized", d: "Built from the ground up to rank higher on Google searches." },
               { t: "Highly Secure", d: "No vulnerable plugins or messy backend databases to hack." },
               { t: "Lower Costs", d: "No expensive monthly plugins or ongoing maintenance fees." }
             ].map((item, index) => (
               <motion.div 
                 key={item.t} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-black p-10 md:p-12 transition-colors hover:bg-[#050505] group relative overflow-hidden"
               >
                 {/* Cyan hover tape */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                 
                 <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                   {item.t}
                 </h3>
                 <p className="text-sm text-white/50 font-medium leading-relaxed">
                   {item.d}
                 </p>
               </motion.div>
             ))}
          </div>
        </section>

        {/* --- 4. EXTREME CONTRAST BOUNDARY (What we do vs don't) --- */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 grid grid-cols-1 lg:grid-cols-2 border border-white/10"
        >
          {/* Left: Dark Side */}
          <div className="bg-black p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
              What We <br/> Avoid.
            </h2>
            <ul className="space-y-6">
              {[
                "Bloated page builders (Elementor, Divi)",
                "Slow, unmanaged WordPress installs",
                "Generic, resold templates",
                "Holding your domain hostage"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-xs md:text-sm font-bold uppercase tracking-[0.1em] text-white/40">
                  <span className="text-white/20 mt-[2px]">✕</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Light Side (High Contrast) */}
          <div className="bg-white p-12 md:p-20 flex flex-col justify-center text-black">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black mb-8">
              What We <br/> Deliver.
            </h2>
            <ul className="space-y-6">
              {[
                "Custom Next.js React code",
                "Clean, strategic page layouts",
                "Perfect mobile responsiveness",
                "Full ownership handed to you"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-xs md:text-sm font-black uppercase tracking-[0.1em] text-black/70">
                  <span className="text-cyan-600 mt-[2px]">■</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* --- 5. CLEAR PROCESS --- */}
        <section className="mb-20">
          <div className="mb-16 flex items-center gap-6 border-b border-white/10 pb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Our Process
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { t: "Discovery & Layout", d: "We learn about your brand and plan exactly what information needs to go on the page to drive sales." },
              { t: "Custom Development", d: "We write clean, custom code to build your site from scratch, ensuring it loads fast on all devices." },
              { t: "Launch & Handoff", d: "We test everything, put the website live on your domain, and give you full ownership." },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative"
              >
                {/* Ghost Number Behind Text */}
                <div className="absolute -top-10 -left-4 text-[8rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors duration-500">
                  0{i + 1}
                </div>
                
                <div className="relative z-10 pt-8">
                  <span className="font-mono text-[10px] text-cyan-500 block mb-4">
                    STEP_0{i + 1}
                  </span>
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {step.t}
                  </h4>
                  <p className="text-sm text-white/50 font-medium leading-relaxed pr-4">
                    {step.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 6. FINAL CTA BLOCK --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 bg-white/5 p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border border-white/10"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
              Ready to build?
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white">
              Get a custom quote for your website.
            </span>
          </div>

          <Link
            href="/contact"
            className="group flex items-center justify-center border border-white px-10 py-5 hover:bg-white transition-colors duration-500 w-full sm:w-auto bg-black"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
              Start a Project
            </span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}