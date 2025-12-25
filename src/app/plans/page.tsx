"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
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

  /* ---------------- DISCORD PLANS (REVISED, ≤15K) ---------------- */

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

  /* ---------------- SOCIAL MEDIA CONTENT PLANS ---------------- */

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
      className="relative min-h-screen bg-black px-6 py-24 border-t border-white/10"
      aria-labelledby="pricing-heading"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(139,92,246,0.15),transparent_70%)]" />
      </div>

      {/* HEADER */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h1
          id="pricing-heading"
          className="text-4xl sm:text-5xl font-semibold tracking-tight text-white"
        >
          Pricing & Engagements
        </h1>
        <p className="mt-6 text-white/60 text-base sm:text-lg">
          Transparent pricing for websites, Discord community systems,
          and full digital ecosystems.
        </p>
      </div>

      {/* CATEGORY SWITCH */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {[
          { key: "website", label: "Websites" },
          { key: "discord", label: "Discord Systems" },
          { key: "hybrid", label: "Social Media" }

        ].map(item => (
          <button
            key={item.key}
            onClick={() => setCategory(item.key as PlanCategory)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              category === item.key
                ? "bg-white text-black"
                : "border border-white/20 text-white/70 hover:border-white/40"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CURRENCY */}
      <div className="flex justify-center mb-12">
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="bg-black border border-white/20 rounded-full px-5 py-2 text-sm text-white focus:outline-none"
        >
          {Object.keys(currencyRates).map(c => (
            <option key={c} value={c}>
              {currencySymbols[c]} {c}
            </option>
          ))}
        </select>
      </div>

      {/* PLANS GRID */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredPlans.map(plan => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-violet-500 bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-4 py-1 text-xs font-medium text-white">
                  Most chosen
                </span>
              )}

              <h3 className="text-lg font-medium text-white">
                {plan.name}
              </h3>

              <p className="mt-2 text-sm text-white/60">
                {plan.summary}
              </p>

              <div className="mt-6 text-3xl font-semibold text-white">
                {currencySymbols[currency]}
                {price(plan.price)}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {plan.details.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <Check className="w-4 h-4 text-violet-400 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setActivePlan(plan)}
                className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-medium transition ${
                  plan.popular
                    ? "bg-violet-500 text-white hover:opacity-90"
                    : "border border-white/20 text-white hover:border-white/40"
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
        <p className="text-white/50 mb-4">
          Need something custom or not sure where to start?
        </p>
        <a
          href="/contact"
          className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white hover:border-white/40 transition"
        >
          Get a recommendation
        </a>
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
