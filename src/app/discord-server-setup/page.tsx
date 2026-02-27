import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "Professional Discord Server Setup & Design | Drixe Studio",
  description:
    "We design and build custom Discord servers for brands and creators. Get a professional community setup with secure roles, clean channels, and custom bot automation.",
  keywords: [
    "discord server setup",
    "custom discord server design",
    "hire discord developer",
    "discord community manager",
    "discord bot automation",
    "professional discord server"
  ],
  alternates: {
    canonical: "https://www.drixestudio.services/discord-server-setup",
  },
};

export default function DiscordServerSetupPage() {
  // SEO: Clear, product-focused Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Discord Server Setup",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Drixe Studio",
      "url": "https://www.drixestudio.services"
    },
    "areaServed": "Worldwide",
    "description": "Professional Discord server setup including custom roles, channel layouts, bot automation, and server security.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "4500",
      "highPrice": "15000"
    }
  };

  return (
    <main className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

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
                Discord Server Setup
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter"
            >
              Custom Servers. <br />
              <span className="text-white/40">Built for Growth.</span>
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
              We design and build professional Discord servers for creators and brands. We handle the complex roles, channel layouts, and bot automation so you can focus on your community.
            </p>
          </motion.div>
        </header>

        {/* --- 2. MASSIVE HERO VISUAL (Pure CSS 3D UI Scene) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video md:aspect-[21/9] bg-[#050505] border border-white/10 mb-32 flex items-center justify-center relative overflow-hidden"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* 3D Floating Discord Wireframe */}
          <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
            <motion.div 
              animate={{ rotateY: [-10, 10, -10], rotateX: [2, -2, 2], y: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[300px] md:w-[500px] h-[200px] md:h-[320px] bg-[#0a0a0a] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-xl flex overflow-hidden z-10"
            >
              {/* Server List Sidebar */}
              <div className="w-12 md:w-16 bg-black border-r border-white/10 flex flex-col items-center py-4 gap-4">
                <div className="w-8 md:w-10 h-8 md:w-10 bg-white/10 rounded-[16px]" />
                <div className="w-6 md:w-8 h-px bg-white/10 my-1" />
                <div className="w-8 md:w-10 h-8 md:w-10 bg-cyan-500/20 border border-cyan-500 rounded-[16px] relative flex items-center justify-center">
                  {/* Glowing Notification Dot */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-cyan-500 rounded-r-md shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                  <div className="w-4 h-4 bg-cyan-500 rounded-full opacity-50" />
                </div>
                <div className="w-8 md:w-10 h-8 md:w-10 bg-white/5 rounded-[16px]" />
              </div>

              {/* Channel Sidebar */}
              <div className="w-24 md:w-40 bg-[#080808] border-r border-white/5 flex flex-col p-4 gap-4">
                <div className="w-full h-3 bg-white/10 rounded-sm mb-2" />
                <div className="w-3/4 h-2 bg-white/5 rounded-sm" />
                <div className="w-2/3 h-2 bg-white/5 rounded-sm" />
                <div className="w-4/5 h-2 bg-white/5 rounded-sm" />
                <div className="w-full h-3 bg-white/10 rounded-sm mt-4 mb-2" />
                <div className="w-2/3 h-2 bg-cyan-500/50 rounded-sm shadow-[0_0_10px_rgba(0,229,255,0.3)]" />
                <div className="w-3/4 h-2 bg-white/5 rounded-sm" />
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 bg-[#0a0a0a] p-6 flex flex-col gap-6">
                <div className="w-1/3 h-4 bg-white/10 rounded-sm mb-4" />
                
                {/* Chat Message Wireframes */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-24 h-2 bg-white/20 rounded-sm" />
                      <div className={`h-2 rounded-sm bg-white/5 ${i === 2 ? 'w-3/4' : 'w-full'}`} />
                      {i === 2 && <div className="h-2 rounded-sm bg-white/5 w-1/2" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Background floating accent */}
            <motion.div 
              animate={{ y: [10, -10, 10], rotate: 5 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[200px] h-[200px] bg-cyan-500/10 blur-[80px] -ml-[300px] -mt-[100px] rounded-full z-0"
            />
          </div>

          <span className="absolute bottom-6 right-6 z-20 text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">
            Server UI Render
          </span>
        </motion.div>

        {/* --- 3. BUSINESS VALUE (Brutalist Bento Grid) --- */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Why Hire A Professional?
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
             {[
               { t: "Clean Layout", d: "Logical channel categories that make it easy for new members to navigate." },
               { t: "Safe Permissions", d: "Strict role hierarchies to protect your server from spam and raiders." },
               { t: "Bot Automation", d: "Custom bots to handle welcome messages, support tickets, and leveling." },
               { t: "Smooth Onboarding", d: "Verification gates that ensure only real, active members get inside." }
             ].map((item, index) => (
               <motion.div 
                 key={item.t} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-black p-10 md:p-12 transition-colors hover:bg-[#050505] group relative overflow-hidden"
               >
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
                "Messy, confusing channel lists",
                "Broken role and viewing permissions",
                "Annoying 'everyone' spam pings",
                "Generic, copy-pasted server templates"
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
                "Clean, highly organized channel hubs",
                "Bulletproof private staff sections",
                "Automated member welcome flows",
                "Custom branded emojis and graphics"
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
              { t: "Plan & Structure", d: "We meet with you to map out exactly what channels, rules, and bots your community actually needs." },
              { t: "Build & Automate", d: "We build the server from scratch, set up the role permissions, and configure all the automated bots." },
              { t: "Review & Transfer", d: "We invite you in to test it. Once approved, we transfer full server ownership directly to your account." },
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
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
              Ready to launch?
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white">
              Get a professional Discord setup.
            </span>
          </div>

          <Link
            href="/plans"
            className="group flex items-center justify-center border border-white px-10 py-5 hover:bg-white transition-colors duration-500 w-full sm:w-auto bg-black"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
              View Pricing
            </span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}