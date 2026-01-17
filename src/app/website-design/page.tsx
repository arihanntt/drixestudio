import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "High-Performance Web Architecture & Systems | Drixe Studio",
  description:
    "Performance-first website architecture focused on speed, SEO, and conversion. We build websites as scalable infrastructure for serious brands—no page builders, no bloat.",
  keywords: [
    "website architecture",
    "conversion focused website",
    "performance first website",
    "frontend developer for startups",
    "static site architecture",
    "custom web systems"
  ],
  alternates: {
    canonical: "https://drixestudio.services/website-design",
  },
};

export default function WebsiteDesignPage() {
  return (
    <main className="bg-[#0a0a0a] text-white py-32 selection:bg-zinc-800">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        
        {/* --- HEADER BLOCK --- */}
        <header className="mb-24 border-l border-zinc-800 pl-6 sm:pl-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            Web Infrastructure
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight max-w-4xl">
            High-performance websites <br className="hidden md:block" /> built as systems.
          </h1>
          <p className="text-zinc-400 font-light leading-relaxed italic text-base sm:text-lg max-w-3xl">
            Drixe Studio designs fast, clean, and conversion-focused websites for creators and startups. 
            We focus on structure, information hierarchy, and performance—not templates or page builders.
          </p>
        </header>

        {/* --- USE CASES --- */}
        <section className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-12">
            Use cases we design for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <h3 className="text-lg font-medium mb-4 tracking-tight">Market Presence</h3>
              <ul className="space-y-4 text-zinc-500 text-sm font-light">
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Business and strategic brand websites
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  High-conversion, ad-optimized landing pages
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  SaaS and startup marketing infrastructure
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 tracking-tight">Performance Assets</h3>
              <ul className="space-y-4 text-zinc-500 text-sm font-light">
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Portfolio and authority-building personal sites
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  SEO-optimized static architectures
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-px w-3 bg-zinc-800 mt-2.5 shrink-0" />
                  Lightweight, headless CMS integrations
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- OUR APPROACH --- */}
        <section className="mb-32 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-8">
            The Technical Stance
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed text-base">
            We reject the bloat of traditional page builders and legacy CMS platforms. 
            We design with modern component-based frontend architecture that keeps sites fast, maintainable, and easy to evolve.
            <span className="text-zinc-200 block mt-4 italic font-serif text-lg">
              "Every line of code serves a conversion goal."
            </span>
          </p>
        </section>

        {/* --- PERFORMANCE BENEFITS --- */}
        <section className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-12">
            Business Value
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
             {[
               { t: "Speed", d: "Sub-second load times." },
               { t: "SEO", d: "Perfect Lighthouse scores." },
               { t: "Security", d: "Zero server-side vulns." },
               { t: "ROI", d: "Minimal maintenance cost." }
             ].map((item) => (
               <div key={item.t} className="bg-[#0a0a0a] p-8 transition-colors hover:bg-zinc-900/50">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white mb-2">{item.t}</p>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">{item.d}</p>
               </div>
             ))}
          </div>
          <p className="mt-8 text-xs text-zinc-600 italic">
            In short: your site loads faster, ranks better, and costs less to maintain over time.
          </p>
        </section>

        {/* --- THE BOUNDARY (Guardrails) --- */}
        <section className="mb-32 border border-zinc-900 bg-zinc-900/10 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">What we don't do</h2>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-zinc-600">
                <li>• No bloated page builders (Elementor/Divi)</li>
                <li>• No slow, unmanaged CMS installs</li>
                <li>• No generic, resold templates</li>
                <li>• No ongoing platform lock-ins</li>
              </ul>
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">What we deliver</h2>
              <ul className="space-y-3 text-xs uppercase tracking-widest text-zinc-400">
                <li>• Custom frontend architecture</li>
                <li>• Scalable component systems</li>
                <li>• Strategic information design</li>
                <li>• Full ownership & clean handoff</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- PROCESS --- */}
        <section className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white border-b border-zinc-900 pb-4 mb-12">
            Workflow Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
            {[
              { t: "Discovery", d: "Understand brand, audience psychology, and performance goals." },
              { t: "Architecture", d: "Design information hierarchy and layout logic." },
              { t: "Implementation", d: "Build responsive, performance-first frontend components." },
              { t: "Performance", d: "Optimization for SEO, speed, and deep accessibility." },
              { t: "Validation", d: "Stress-testing across browsers and mobile environments." },
              { t: "Launch", d: "Handoff of a stable, production-ready web system." },
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

        {/* --- FINAL CTA BLOCK --- */}
        <footer className="border-t border-zinc-900 pt-16 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <h2 className="text-2xl font-serif italic mb-2">Build your digital infrastructure.</h2>
              <p className="text-sm text-zinc-500 font-light max-w-md">
                We design with intent. Every pixel is placed to support your conversion goals. Let's build your next system.
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