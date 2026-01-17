import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Discord Server Setup & Architecture | Drixe Studio",
  description:
    "Expert Discord server setup agency. We design custom community infrastructure, advanced bot automation, and hardened security systems for brands and creators.",
  keywords: [
    "custom discord server design",
    "discord server setup service",
    "professional discord community architect",
    "discord automation agency",
    "discord moderation infrastructure",
    "discord server designer for hire"
  ],
  alternates: {
    canonical: "https://drixestudio.services/discord-server-setup",
  },
};

export default function DiscordServerSetupPage() {
  // ✅ SEO: Service Schema to tell Google exactly what you sell
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Discord Server Setup & Community Architecture",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Drixe Studio",
      "url": "https://drixestudio.services"
    },
    "areaServed": "Worldwide",
    "description": "Professional Discord server setup including custom role hierarchies, bot automation, security hardening, and community retention systems.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "4500",
      "highPrice": "15000"
    }
  };

  return (
    <main className="bg-[#050505] text-[#e5e5e5] min-h-screen py-32 selection:bg-amber-500/30 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        
        {/* --- 1. THE HERO (Intent-Based Heading) --- */}
        <header className="mb-32 border-l border-amber-500/50 pl-8 md:pl-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500 mb-6 block">
            Custom Discord Server Design Agency
          </span>
          <h1 className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none mb-10">
            Community <br className="hidden md:block" /> 
            <span className="italic font-serif text-amber-500">Architecture.</span>
          </h1>
          <p className="text-zinc-400 font-light leading-relaxed text-lg md:text-2xl max-w-3xl italic">
            We don’t just build chat rooms; we engineer operational ecosystems. 
            Drixe Studio delivers <strong className="text-zinc-200">custom Discord server setups</strong> 
            built for retention, security, and professional branding.
          </p>
        </header>

        {/* --- 2. CAPABILITIES (Feature SEO) --- */}
        <section className="mb-40 grid md:grid-cols-3 gap-16">
          <div className="md:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 sticky top-32">
              System Capabilities
            </h2>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-medium mb-6 text-white italic font-serif">Logic & Automation</h3>
              <ul className="space-y-5 text-zinc-500 text-sm font-light">
                <li className="flex items-start gap-4">
                  <span className="h-px w-4 bg-amber-500 mt-2.5 shrink-0" />
                  <span>Custom Role Hierarchies & Permission Logic</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-px w-4 bg-zinc-800 mt-2.5 shrink-0" />
                  <span>Webhook Integrations & Custom Bot Workflows</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-px w-4 bg-zinc-800 mt-2.5 shrink-0" />
                  <span>Automated Onboarding & Member Funnels</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6 text-white italic font-serif">Security & UX</h3>
              <ul className="space-y-5 text-zinc-500 text-sm font-light">
                <li className="flex items-start gap-4">
                  <span className="h-px w-4 bg-amber-500 mt-2.5 shrink-0" />
                  <span>Anti-Raid, Verification & Multi-Layer Security</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-px w-4 bg-zinc-800 mt-2.5 shrink-0" />
                  <span>Ticket-Based Support & Internal Staff Systems</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-px w-4 bg-zinc-800 mt-2.5 shrink-0" />
                  <span>Branded UI Design, Emojis & Iconography</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- 3. TARGET VERTICALS (Niche Authority) --- */}
        <section className="mb-40">
          <h2 className="text-center text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600 mb-16">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            {["SaaS & Startups", "Web3 & NFT Projects", "Professional Gamers", "Paid Communities"].map((item) => (
              <div key={item} className="bg-[#050505] p-10 text-center group hover:bg-neutral-900/50 transition-colors">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-amber-500 transition-colors">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. THE EDITORIAL PROCESS --- */}
        <section className="mb-40">
          <div className="flex items-baseline justify-between mb-20 border-b border-zinc-900 pb-6">
            <h2 className="text-3xl font-light italic font-serif text-white">The Setup Process</h2>
            <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Phase 01 — 06</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              { t: "discovery", d: "Deep analysis of community goals and engagement bottlenecks." },
              { t: "architecture", d: "Mapping role trees and granular channel visibility permissions." },
              { t: "integration", d: "Deployment of automation bots and custom security APIs." },
              { t: "branding", d: "Designing unique server banners, icons, and interface polish." },
              { t: "hardening", d: "Stress-testing anti-raid systems and bypass vulnerabilities." },
              { t: "handoff", d: "Complete administrative transfer with operation guides." },
            ].map((step, i) => (
              <div key={i} className="group">
                <div className="text-amber-500 font-mono text-[10px] mb-4">0{i + 1} //</div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tighter mb-3 group-hover:text-amber-500 transition-colors">{step.t}</h4>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. CONVERSION FOOTER --- */}
        <footer className="bg-neutral-900/30 border border-white/5 rounded-sm p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-6xl font-light italic font-serif text-white mb-8">
            Build for <span className="text-amber-500">Growth.</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-12 font-light text-lg">
            Stop losing members to chaotic server structures. Get a professional Discord setup that scales with your brand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a
              href="tel:+917889386542"
              className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-amber-500 transition-all"
            >
              Call Concierge
            </a>
            <Link
              href="/plans"
              className="px-10 py-4 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
            >
              Explore Tiers
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}