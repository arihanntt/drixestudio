"use client";

import React, { useState, useMemo } from "react";
import { Info } from "lucide-react";
import Modal from "@/components/Modal";
import Head from "next/head";
import Link from "next/link"; // ✅ Add this line to fix the red error

/* ---------------- TYPES ---------------- */
type PlanCategory = "website" | "discord" | "hybrid";

interface Plan {
  name: string;
  price: number;
  summary: string;
  details: string[];
  category: PlanCategory;
  popular?: boolean;
}

const plans: Plan[] = [
  /* ---------------- WEBSITE PLANS ---------------- */
  {
    name: "Foundation",
    price: 9000,
    category: "website",
    summary: "For individuals or small teams launching their first serious presence.",
    details: [
      "1–3 page responsive website",
      "Editorial typography system",
      "Basic SEO & Performance tuning",
      "Fast loading & zero-bloat UI",
      "Deployed & launch-ready"
    ]
  },
  {
    name: "Growth",
    price: 18000,
    category: "website",
    popular: true,
    summary: "High-performance websites built for growing brands and startups.",
    details: [
      "Custom multi-page architecture",
      "Advanced UI & smooth interactions",
      "Strategic SEO optimization",
      "Analytics & Conversion tracking",
      "Priority performance scaling"
    ]
  },
  /* ---------------- DISCORD PLANS ---------------- */
  {
    name: "Essential",
    price: 4500,
    category: "discord",
    summary: "Basic architecture for new communities focusing on core structure.",
    details: [
      "Custom channel & role hierarchy",
      "Automated welcome & role system",
      "Invite tracking & security setup",
      "Essential moderation bots",
      "Delivery: 1 day"
    ]
  },
  {
    name: "Standard",
    price: 8000,
    category: "discord",
    summary: "Professional layout for growing brands requiring higher engagement.",
    details: [
      "Everything in Essential plan",
      "Verification system & gated access",
      "Level & engagement mechanics",
      "Static & animated emojis",
      "Delivery: 1–2 days"
    ]
  },
  {
    name: "Pro",
    price: 11500,
    category: "discord",
    summary: "Advanced systems with custom automation and support infrastructure.",
    details: [
      "Everything in Standard plan",
      "Ticket support system",
      "Full branding (icons & banners)",
      "Anti-raid & advanced logging",
      "Delivery: 2 days"
    ]
  },
  {
    name: "Ultimate",
    price: 13500,
    category: "discord",
    popular: true,
    summary: "Highly automated ecosystem with advanced AI and dynamic customization.",
    details: [
      "Everything in Pro plan",
      "Unlimited channels & full automation",
      "Advanced AI auto-responses",
      "Dynamic / Temporary channels",
      "Delivery: 2–3 days"
    ]
  },
  {
    name: "Empire",
    price: 15000,
    category: "discord",
    summary: "Enterprise-grade ecosystem with onboarding flows and long-term support.",
    details: [
      "Everything in Ultimate plan",
      "Server backup (structure only)",
      "Custom onboarding & DM guides",
      "Themed Rank & Perk systems",
      "20-day priority support",
      "Delivery: 3–4 days"
    ]
  },
  /* ---------------- CONTENT SYSTEMS ---------------- */
  {
    name: "Content Engine",
    price: 10000,
    category: "hybrid",
    popular: true,
    summary: "Systematic short-form content for consistent audience growth.",
    details: [
      "12–15 structured short videos",
      "Brand-aligned visual pacing",
      "Strategic hook & caption design",
      "Optimized for Reels & Shorts",
      "Content distribution guidance"
    ]
  }
];

const currencyRates: Record<string, number> = { INR: 1, USD: 0.012, EUR: 0.011 };
const currencySymbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€" };

export default function PlansPage() {
  const [category, setCategory] = useState<PlanCategory>("website");
  const [currency, setCurrency] = useState("INR");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const filteredPlans = useMemo(() => plans.filter(p => p.category === category), [category]);
  const formatPrice = (p: number) => Math.round(p * (currencyRates[currency] || 1)).toLocaleString();

  // ✅ SEO: Generate Price Schema for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Drixe Studio ${category === 'discord' ? 'Discord' : 'Web'} Design Plans`,
    "description": "Professional custom Discord server design and high-performance web architecture pricing.",
    "brand": {
      "@type": "Brand",
      "name": "Drixe Studio"
    },
    "offers": filteredPlans.map((plan) => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price,
      "priceCurrency": "INR",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }))
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] px-6 py-24 sm:py-32 selection:bg-zinc-800 selection:text-white border-t border-zinc-900">
      <Head>
        <title>Pricing | Drixe Studio - Custom Discord & Web Architecture</title>
        <meta name="description" content="Explore transparent pricing for Drixe Studio's premium Discord server setups, high-performance web architecture, and viral content systems." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="mx-auto max-w-7xl">
        {/* 1. EDITORIAL HEADER */}
        <header className="mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            Investment Strategy
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif italic text-white leading-tight mb-8">
            Transparent pricing, <br className="hidden md:block" /> built on intent.
          </h1>
          
          <div className="max-w-2xl border-l border-zinc-800 pl-6 sm:pl-10 py-2">
            <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed italic">
              All plans include structured setup and post-delivery guidance. 
              <span className="text-zinc-200 block mt-2 underline decoration-zinc-800 underline-offset-4">No templates, no reselling, no rushed work.</span>
            </p>
          </div>
        </header>

        {/* 2. CONTROLS (TABS + CURRENCY) */}
        <div className="mb-16 flex flex-col items-start justify-between gap-10 border-b border-zinc-900 pb-12 sm:flex-row sm:items-center">
          <nav className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.3em]" aria-label="Service Categories">
            {[
              { key: "website", label: "Web Architecture" },
              { key: "discord", label: "Discord Systems" },
              { key: "hybrid", label: "Content Systems" }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setCategory(item.key as PlanCategory)}
                className={`transition-all duration-300 pb-2 border-b-2 ${
                  category === item.key ? "text-white border-white" : "text-zinc-600 border-transparent hover:text-zinc-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600">Currency Preference:</span>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="bg-transparent text-[11px] font-bold uppercase text-white outline-none cursor-pointer hover:text-zinc-300 transition-colors"
              >
                {Object.keys(currencyRates).map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
              </select>
            </div>
            <p className="text-[9px] text-zinc-700 uppercase tracking-tighter flex items-center gap-1">
              <Info size={10} /> Market rates applied. Final quote provided upon project scope.
            </p>
          </div>
        </div>

        {/* 3. PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
          {filteredPlans.map((plan) => (
            <article
              key={plan.name}
              className="relative bg-[#0a0a0a] p-10 flex flex-col min-h-[500px] transition-colors duration-500 hover:bg-[#0f0f0f] group"
            >
              {plan.popular && (
                <div className="absolute top-6 left-10 text-[9px] font-bold uppercase tracking-[0.3em] text-rose-500 font-mono">
                  // OPTIMIZED_SELECTION
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-2xl font-serif italic text-white mb-4 transition-colors group-hover:text-rose-400">
                  {plan.name}
                </h2>
                <p className="text-sm text-zinc-500 font-light leading-relaxed min-h-[48px]">
                  {plan.summary}
                </p>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-zinc-600 text-lg font-serif italic">{currencySymbols[currency]}</span>
                <span className="text-4xl font-serif text-white tracking-tighter">
                  {formatPrice(plan.price)}
                </span>
              </div>

              <hr className="my-10 border-zinc-900" />

              <ul className="flex-1 space-y-5 mb-12">
                {plan.details.map((d, i) => (
                  <li key={i} className="flex gap-4 items-start text-xs text-zinc-400 uppercase tracking-widest leading-relaxed">
                    <span className="h-px w-3 bg-zinc-800 mt-2 shrink-0 transition-colors group-hover:bg-zinc-600" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setActivePlan(plan)}
                aria-label={`Inquire about the ${plan.name} plan`}
                className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 border ${
                  plan.popular 
                    ? "bg-white text-black border-white hover:bg-transparent hover:text-white" 
                    : "bg-transparent text-zinc-500 border-zinc-800 hover:border-white hover:text-white"
                }`}
              >
                Begin Onboarding
              </button>
            </article>
          ))}
        </div>

        {/* 4. BOTTOM CTA */}
        <footer className="mt-24 text-center">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-6">
            Seeking a highly customized architecture or enterprise ecosystem?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-all border-b border-zinc-900 hover:border-white pb-1"
          >
            Request Private Consultation
            <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
          </Link>
        </footer>
      </div>

      {activePlan && (
        <Modal
          isOpen={true}
          onClose={() => setActivePlan(null)}
          plan={activePlan.name}
        />
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </section>
  );
}