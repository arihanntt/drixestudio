"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const WhyUs = () => {
  const features = [
    {
      title: "Website Development",
      description: "Custom Next.js websites built for fast loading, clear navigation, and higher conversion rates.",
      abstract: "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
    },
    {
      title: "Discord Server Setup",
      description: "Professional Discord communities with clear channels, secure permissions, and custom bot automation.",
      abstract: "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"
    },
    {
      title: "Social Media Content",
      description: "High-quality short-form videos designed to grow your audience and build long-term brand authority.",
      abstract: "bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02)),linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02))] bg-[size:60px_60px] bg-[position:0_0,30px_30px]"
    },
    {
      title: "Flexible Packages",
      description: "Hire us for a single project or combine our services. Everything is engineered to work together.",
      abstract: "bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:100%_40px]"
    },
  ];

  return (
    <section
      className="relative w-full bg-black text-white selection:bg-cyan-500 selection:text-black pt-32 pb-40 overflow-hidden border-t border-white/10"
      aria-labelledby="why-us-heading"
    >
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- MASSIVE HEADER BLOCK --- */}
        <div className="mb-24 md:mb-32 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-6 mb-12"
          >
            <span className="h-[2px] w-12 bg-cyan-500 block" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Operational Standards
            </span>
          </motion.div>
          
          <motion.h2
            id="why-us-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[6rem] lg:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter"
          >
            Clear Work. <br />
            <span className="text-white/30">Real</span> Results.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-12 text-lg md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed italic"
          >
            Start with the services you need today and expand when you're ready. We build clear, fast, and scalable digital products for your brand.
          </motion.p>
        </div>

        {/* --- BRUTALIST BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-black p-10 md:p-16 lg:p-24 min-h-[450px] flex flex-col justify-between overflow-hidden cursor-crosshair"
            >
              {/* CSS Abstract Pattern Background (Reveals on Hover) */}
              <div className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${item.abstract}`} />
              
              {/* Massive Ghost Number (Reacts to hover) */}
              <motion.div 
                whileHover={{ x: -20, y: 10 }}
                className="absolute -top-10 -right-10 z-0 text-[18rem] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.04] transition-colors duration-700"
              >
                0{index + 1}
              </motion.div>

              {/* Box Content */}
              <div className="relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-500 block mb-10">
                  SERVICE_CORE_0{index + 1}
                </span>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              <div className="relative z-10 mt-12">
                <p className="text-base md:text-lg text-white/40 font-medium leading-relaxed max-w-sm group-hover:text-white/80 transition-colors duration-500">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- ARCHITECTURAL ACTION BAR --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-px bg-white/5 border border-white/10 p-10 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
              Service Delivery
            </span>
            <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white">
              Professional execution. No shortcuts.
            </span>
          </div>

          <Link
            href="/plans"
            className="group flex items-center justify-center bg-white px-12 py-5 hover:bg-cyan-400 transition-colors duration-300 w-full md:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">
              View All Tiers
            </span>
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
};

export default WhyUs;