import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Short-Form Content Systems for Consistent Growth | Drixe Studio",
  description:
    "Systematic short-form video content infrastructure for Instagram Reels, YouTube Shorts, and TikTok. Built for creators and brands focusing on long-term authority.",
  keywords: [
    "short form content systems",
    "reels strategy",
    "content infrastructure",
    "video content systems",
    "brand architecture",
    "short form editor for founders"
  ],
  alternates: {
    canonical: "https://drixestudio.services/social-media-content",
  },
};

export default function SocialMediaContentPage() {
  return (
    <main className="bg-[#0a0a0a] text-white py-32 selection:bg-zinc-800">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        
        {/* --- HEADER BLOCK --- */}
        <header className="mb-24 border-l border-zinc-800 pl-6 sm:pl-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            Content Infrastructure
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight max-w-4xl">
            Short-form content systems <br className="hidden md:block" /> for consistent growth.
          </h1>
          <p className="text-zinc-400 font-light leading-relaxed italic text-base sm:text-lg max-w-3xl">
            Drixe Studio designs repeatable short-form content frameworks for Instagram, YouTube, and TikTok. 
            We focus on sustainable content structures, not one-off edits.
          </p>
        </header>

        {/* --- SYSTEM CAPABILITIES --- */}
        <section className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-12">
            System Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <h3 className="text-lg font-medium mb-4 tracking-tight">Frameworks & Retention</h3>
              <ul className="space-y-4 text-zinc-500 text-sm font-light">
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Repeatable short-form content frameworks
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Editorial pacing systems for maximum retention
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Hook-focused, platform-optimized architectures
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 tracking-tight">Identity & Distribution</h3>
              <ul className="space-y-4 text-zinc-500 text-sm font-light">
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Brand-aligned visuals, typography, and color grading
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Multi-platform distribution readiness (Reels/Shorts/TikTok)
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Systematic posting guidance and cadence mapping
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- THE STRATEGY: CONSISTENCY OVER VIRALITY --- */}
        <section className="mb-32 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-8">
            The Philosophy
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed text-base">
            Consistency beats virality. Most creators fail because they can’t maintain output without burnout. 
            Our system is designed to make short-form sustainable by removing the friction of technical execution.
            <span className="text-zinc-200 block mt-4 italic font-serif text-lg">
              "We build the engine so you can focus on the message."
            </span>
          </p>
        </section>

        {/* --- TARGET AUDIENCE --- */}
        <section className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-12">
            Strategic Alignment
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
             {["Personal Brands", "Founder-Led Startups", "Educational Entities", "Creative Agencies"].map((item) => (
               <div key={item} className="bg-[#0a0a0a] p-8 transition-colors hover:bg-zinc-900/50">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{item}</p>
               </div>
             ))}
          </div>
        </section>

        {/* --- SYSTEM WORKFLOW --- */}
        <section className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-12">
            Workflow Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 font-sans">
            {[
              { t: "Discovery", d: "Analyze brand tone, audience psychology, and content goals." },
              { t: "Systems Design", d: "Define repeatable visual and editorial frameworks." },
              { t: "Execution", d: "Implementation of high-retention structural edits." },
              { t: "Optimization", d: "Refining pacing and hooks based on performance data." },
              { t: "Cadence", d: "Establishing a sustainable delivery and posting schedule." },
              { t: "Maintenance", d: "Ongoing system updates to match platform evolution." },
            ].map((step, i) => (
              <div key={i} className="group">
                <span className="font-mono text-[9px] text-zinc-700 block mb-4 group-hover:text-zinc-400 transition-colors">
                  PROCESS_0{i + 1}
                </span>
                <h4 className="text-lg font-medium mb-2 tracking-tight">{step.t}</h4>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- WHAT WE DON'T PROMISE (Trust Guardrail) --- */}
        <section className="mb-32 border border-zinc-900 bg-zinc-900/10 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">What we don't promise</h2>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-zinc-600">
                <li>• Viral guarantees or overnight fame</li>
                <li>• Trend chasing without brand alignment</li>
                <li>• Low-quality, bulk-resell editing</li>
              </ul>
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">What we do deliver</h2>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-zinc-400">
                <li>• Reliable, high-retention content systems</li>
                <li>• Long-term brand authority and trust</li>
                <li>• Professional, intentional visual identity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA BLOCK --- */}
        <footer className="border-t border-zinc-900 pt-16 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <h2 className="text-2xl font-serif italic mb-2">Build your content engine.</h2>
              <p className="text-sm text-zinc-500 font-light max-w-md">
                We handle the infrastructure. You handle the message. Let's build a sustainable growth system.
              </p>
            </div>
            <div className="flex flex-wrap gap-10">
              <a
                href="https://wa.me/917889386542"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white"
              >
                <span className="border-b border-zinc-800 group-hover:border-white pb-1 transition-all">
                  Discuss on WhatsApp
                </span>
                <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
              </a>
              <Link
                href="/plans"
                className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white"
              >
                <span className="border-b border-zinc-800 group-hover:border-zinc-500 pb-1">
                  View Tiers
                </span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}