import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "Social Media Content & Short-Form Video Editing | Drixe Studio",
  description:
    "Professional short-form video editing and content strategies for TikTok, Instagram Reels, and YouTube Shorts. We help brands grow with consistent, high-quality videos.",
  keywords: [
    "short form video editing",
    "social media content creation",
    "Instagram Reels editor",
    "TikTok video production",
    "YouTube Shorts agency",
    "content creation packages"
  ],
  alternates: {
    canonical: "https://www.drixestudio.services/social-media-content",
  },
};

export default function SocialMediaContentPage() {
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
                Social Media Content
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter"
            >
              Viral Content. <br />
              <span className="text-white/40">Done Consistently.</span>
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
              We produce high-quality short-form videos for creators and brands. We focus on sharp editing, engaging hooks, and reliable delivery to grow your audience.
            </p>
          </motion.div>
        </header>

        {/* --- 2. MASSIVE HERO VISUAL (Pure CSS 3D Abstract Scene) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video md:aspect-[21/9] bg-[#050505] border border-white/10 mb-32 flex items-center justify-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]" />
          
          {/* The 3D Floating Video Frames (9:16 aspect ratio representation) */}
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            
            {/* Background Frame Left */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotateY: 15, rotateX: 5 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[140px] md:w-[200px] aspect-[9/16] bg-black/40 border border-white/10 backdrop-blur-md -ml-[150px] md:-ml-[250px] opacity-40 rounded-md"
            />
            
            {/* Background Frame Right */}
            <motion.div 
              animate={{ y: [10, -10, 10], rotateY: -15, rotateX: -5 }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-[140px] md:w-[200px] aspect-[9/16] bg-black/40 border border-white/10 backdrop-blur-md ml-[150px] md:ml-[250px] opacity-40 rounded-md"
            />

            {/* Center Main Frame */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[180px] md:w-[260px] aspect-[9/16] bg-black border border-white/30 shadow-[0_0_50px_rgba(0,229,255,0.15)] flex flex-col items-center justify-between p-4 z-10 rounded-md"
            >
              {/* Fake UI Elements inside the "phone" */}
              <div className="w-full flex justify-between items-center opacity-50">
                <div className="w-6 h-1 bg-white/50 rounded-full" />
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white/50 rounded-full" />
                  <div className="w-1 h-1 bg-white/50 rounded-full" />
                  <div className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
              </div>
              
              <div className="w-12 h-12 rounded-full border border-cyan-500 flex items-center justify-center mb-10">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-cyan-500 border-b-[6px] border-b-transparent ml-1" />
              </div>

              <div className="w-full space-y-2 opacity-50">
                <div className="w-3/4 h-2 bg-white/50 rounded-full" />
                <div className="w-1/2 h-2 bg-white/30 rounded-full" />
              </div>
            </motion.div>
          </div>
          
          <span className="absolute bottom-6 right-6 z-20 text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">
            Short-Form Layout Render
          </span>
        </motion.div>

        {/* --- 3. BUSINESS VALUE (Brutalist Bento Grid) --- */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Why Professional Editing?
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
             {[
               { t: "Higher Retention", d: "Fast-paced cuts and visuals that keep viewers watching until the end." },
               { t: "Platform Ready", d: "Formatted perfectly for TikTok, Instagram Reels, and YouTube Shorts." },
               { t: "Brand Authority", d: "Build trust with your audience through crisp, high-quality video production." },
               { t: "Steady Output", d: "Stop guessing. We provide a consistent flow of content to keep your channels active." }
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
                "Low-quality, generic bulk editing",
                "Chasing trends without a strategy",
                "Missing weekly upload schedules",
                "Messy audio and unreadable captions"
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
                "Crisp, professional video editing",
                "Hooks designed to grab attention fast",
                "Clean typography and visual branding",
                "Consistent, reliable video delivery"
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
              { t: "Plan & Strategize", d: "We review your brand and help you plan video topics that your target audience actually wants to watch." },
              { t: "Professional Edit", d: "You film the raw clips. We edit them with sharp cuts, color correction, and dynamic captions to keep viewers engaged." },
              { t: "Review & Post", d: "We send you the final videos. You review them, download them, and post them across all your social channels." },
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
              Ready to grow?
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white">
              View our content packages and pricing.
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