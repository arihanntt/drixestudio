"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Modal from "@/components/Modal";

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
    name: "Website Starter",
    price: 9000,
    category: "website",
    summary: "Clean, modern website for individuals and small brands.",
    details: [
      "1–3 page responsive website",
      "Mobile-first design",
      "Basic SEO structure",
      "Fast loading & clean UI",
      "Deployed & launch-ready"
    ]
  },
  {
    name: "Website Pro",
    price: 18000,
    category: "website",
    popular: true,
    summary: "Conversion-focused website built for growing brands.",
    details: [
      "Multi-page custom website",
      "Advanced UI & smooth animations",
      "SEO optimization",
      "Performance optimization",
      "Analytics & tracking setup"
    ]
  },

  /* ---------------- DISCORD PLANS ---------------- */
  {
    name: "Discord Basic",
    price: 4500,
    category: "discord",
    summary: "Essential Discord server setup for new communities.",
    details: [
      "Custom text & voice channels",
      "Automated welcome & role system",
      "Invite tracking",
      "Essential moderation bots",
      "Basic security setup",
      "Delivery: 1 day"
    ]
  },
  {
    name: "Discord Standard",
    price: 8000,
    category: "discord",
    summary: "Structured Discord server for growing communities.",
    details: [
      "Everything in Discord Basic",
      "Professional server layout",
      "Verification system",
      "Level & engagement system",
      "Static & animated emojis",
      "Delivery: 1–2 days"
    ]
  },
  {
    name: "Discord Pro",
    price: 11500,
    category: "discord",
    popular: true,
    summary: "Advanced Discord system with automation and branding.",
    details: [
      "Everything in Discord Standard",
      "Ticket support system",
      "Full branding (icons & banners)",
      "Anti-raid & spam protection",
      "Advanced logging",
      "AI-based chat engagement",
      "Delivery: 2–3 days"
    ]
  },
  {
    name: "Discord Empire",
    price: 15000,
    category: "discord",
    summary: "Enterprise-grade Discord setup built to scale.",
    details: [
      "Everything in Discord Pro",
      "Custom onboarding flow",
      "Auto-DM server guide",
      "Rank & perk system",
      "Server backup (no messages)",
      "20 days priority support",
      "Delivery: 3–4 days"
    ]
  },

  /* ---------------- SOCIAL PLANS ---------------- */
  {
    name: "Social Starter",
    price: 6000,
    category: "hybrid",
    summary: "Consistent short-form content to get your brand active online.",
    details: [
      "8 short videos per month",
      "Basic video editing",
      "Captions & formatting",
      "Instagram / Reels / Shorts ready",
      "Best for new creators & brands"
    ]
  },
  {
    name: "Social Growth",
    price: 10000,
    category: "hybrid",
    popular: true,
    summary: "Regular short-form content for audience growth.",
    details: [
      "12–15 short videos per month",
      "Better pacing & transitions",
      "Brand-style captions",
      "Optimized for Reels & Shorts",
      "Posting guidance included"
    ]
  },
  {
    name: "Social Advanced",
    price: 15000,
    category: "hybrid",
    summary: "High-consistency content for serious personal brands.",
    details: [
      "20–30 short videos per month",
      "Daily or near-daily content",
      "Advanced edits & hooks",
      "Brand tone & consistency",
      "Priority delivery"
    ]
  }
];

/* ---------------- CURRENCY ---------------- */

const currencyRates: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
};

const currencySymbols: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

/* ---------------- COMPONENT ---------------- */

export default function PlansPage() {
  const [category, setCategory] = useState<PlanCategory>("website");
  const [currency, setCurrency] = useState("INR");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const filteredPlans = useMemo(
    () => plans.filter(p => p.category === category),
    [category]
  );

  const price = useCallback(
    (p: number) => Math.round(p * (currencyRates[currency] || 1)),
    [currency]
  );

  return (
    <section
      className="relative min-h-screen bg-black px-6 py-24 font-mono text-zinc-300 border-t border-white/20 sm:py-32"
      aria-labelledby="pricing-heading"
    >
      {/* --- RETRO BACKGROUND GRID --- */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
             linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1
            id="pricing-heading"
            className="text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl"
          >
            Pricing & Engagements
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400">
            Transparent pricing for websites, Discord community systems,
            and full digital ecosystems.
          </p>
        </div>

        {/* CONTROLS (TABS + CURRENCY) */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-white/20 pb-8 sm:flex-row">
          
          {/* CATEGORY TABS (SQUARED OFF) */}
          <div className="flex flex-wrap justify-center gap-0 border border-white/20">
            {[
              { key: "website", label: "Websites" },
              { key: "discord", label: "Discord Systems" },
              { key: "hybrid", label: "Social Media" }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setCategory(item.key as PlanCategory)}
                className={`border-r border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all last:border-r-0 hover:bg-white/10 ${
                  category === item.key
                    ? "bg-white text-black hover:bg-white"
                    : "bg-black text-zinc-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CURRENCY SELECTOR (RETRO INPUT) */}
          <div className="flex items-center gap-3">
             <span className="text-xs font-bold uppercase text-zinc-500">Currency:</span>
             <div className="relative">
                <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    className="appearance-none border border-white/20 bg-black py-2 pl-4 pr-10 text-xs font-bold uppercase text-white hover:border-white focus:outline-none"
                >
                    {Object.keys(currencyRates).map(c => (
                    <option key={c} value={c}>
                        {currencySymbols[c]} {c}
                    </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white">▼</div>
             </div>
          </div>
        </div>

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`group relative flex flex-col border p-8 transition-colors duration-300 ${
                  plan.popular
                    ? "border-white bg-white/5"
                    : "border-white/20 bg-black hover:border-white/40"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-0 bg-black px-2">
                     <span className="border border-white bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
                        Most chosen
                     </span>
                  </div>
                )}

                <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                  {plan.name}
                </h3>

                <p className="mt-4 min-h-[40px] text-sm text-zinc-400">
                  {plan.summary}
                </p>

                <div className="mt-6 text-3xl font-bold text-white">
                  <span className="text-xl text-zinc-500 mr-1">{currencySymbols[currency]}</span>
                  {price(plan.price).toLocaleString()}
                </div>

                <div className="my-8 h-px w-full bg-white/10" />

                <ul className="mb-8 flex-1 space-y-4 text-sm text-zinc-300">
                  {plan.details.map((d, i) => (
                    <li key={i} className="flex gap-3">
                      {/* Custom Retro Checkbox */}
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center border border-zinc-600 bg-black text-white">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setActivePlan(plan)}
                  className={`w-full border py-4 text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-1 ${
                    plan.popular
                      ? "border-white bg-white text-black hover:bg-transparent hover:text-white"
                      : "border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-black"
                  }`}
                >
                  Start project
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 text-center">
          <p className="mb-4 text-sm text-zinc-500">
            Need something custom or not sure where to start?
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 border-b border-white pb-0.5 text-sm font-bold uppercase tracking-widest text-white hover:border-zinc-500 hover:text-zinc-500 transition-colors"
          >
            Get a recommendation
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activePlan && (
          <Modal
            isOpen={true}
            onClose={() => setActivePlan(null)}
            plan={activePlan.name}
          />
        )}
      </AnimatePresence>
    </section>
  );
}