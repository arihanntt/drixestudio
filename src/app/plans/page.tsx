"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";
import Link from "next/link";

/* ---------------- TYPES ---------------- */
type PlanCategory = "website" | "discord" | "content";

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
    name: "Starter Website",
    price: 9000,
    category: "website",
    summary: "Best for individuals or small teams launching their first website.",
    details: [
      "1 to 3 page Next.js website",
      "Clean, professional design",
      "Basic SEO optimization",
      "Fast loading speeds",
      "Mobile and tablet friendly"
    ]
  },
  {
    name: "Pro Website",
    price: 18000,
    category: "website",
    popular: true,
    summary: "Custom websites built for growing brands that need better conversion.",
    details: [
      "Custom multi-page website",
      "Smooth scroll and animations",
      "Advanced SEO setup",
      "Analytics and tracking integration",
      "Priority performance optimization"
    ]
  },
  /* ---------------- DISCORD PLANS ---------------- */
  {
    name: "Basic Setup",
    price: 4500,
    category: "discord",
    summary: "Simple server setup for brand new communities.",
    details: [
      "Organized channels and categories",
      "Basic roles and permissions",
      "Automated welcome messages",
      "Standard moderation bots",
      "1 day delivery time"
    ]
  },
  {
    name: "Standard Setup",
    price: 8000,
    category: "discord",
    summary: "Professional layout for growing brands with active members.",
    details: [
      "Everything in Basic Setup",
      "Member verification system",
      "Leveling and reward mechanics",
      "Custom emoji setup",
      "1 to 2 days delivery time"
    ]
  },
  {
    name: "Pro Setup",
    price: 11500,
    category: "discord",
    summary: "Advanced servers with ticket support and custom bots.",
    details: [
      "Everything in Standard Setup",
      "Private ticket support system",
      "Server branding and banners",
      "Advanced security and anti-spam",
      "2 days delivery time"
    ]
  },
  {
    name: "Premium Setup",
    price: 13500,
    category: "discord",
    popular: true,
    summary: "Highly automated server designed for large audiences.",
    details: [
      "Everything in Pro Setup",
      "Unlimited channel setup",
      "Auto-response bots",
      "Temporary voice channels",
      "2 to 3 days delivery time"
    ]
  },
  {
    name: "Enterprise Setup",
    price: 15000,
    category: "discord",
    summary: "Massive community setups with custom onboarding flows.",
    details: [
      "Everything in Premium Setup",
      "Complete server template backup",
      "Custom member onboarding guides",
      "Themed role systems",
      "20 days of priority support",
      "3 to 4 days delivery time"
    ]
  },
  /* ---------------- CONTENT SYSTEMS ---------------- */
  {
    name: "Monthly Content",
    price: 10000,
    category: "content",
    popular: true,
    summary: "Consistent short-form videos to grow your social media audience.",
    details: [
      "12 to 15 short-form videos",
      "Professional video editing",
      "Engaging hooks and captions",
      "Formatted for TikTok, Reels, and Shorts",
      "Posting schedule guidance"
    ]
  }
];

const categories = [
  { key: "website", label: "Website Development" },
  { key: "discord", label: "Discord Setup" },
  { key: "content", label: "Social Content" }
];

const currencyRates: Record<string, number> = { INR: 1, USD: 0.012, EUR: 0.011 };
const currencySymbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€" };

/* --- DYNAMIC CSS VISUAL COMPONENT --- */
const CategoryVisual = ({ category }: { category: PlanCategory }) => {
  if (category === "website") {
    return (
      <div className="relative w-full h-full flex items-center justify-center [perspective:800px]">
        <div className="absolute w-[180px] h-[120px] bg-black border border-white/20 rounded-md shadow-[0_0_30px_rgba(0,229,255,0.15)] flex flex-col overflow-hidden rotate-x-12 rotate-y-[-10deg] scale-110">
          <div className="h-4 border-b border-white/10 flex items-center px-2 gap-1 bg-[#0a0a0a]">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2 relative overflow-hidden">
            <div className="w-1/2 h-2 bg-white/20 rounded-sm" />
            <div className="w-full h-1 bg-white/5 rounded-sm" />
            <div className="w-3/4 h-1 bg-white/5 rounded-sm" />
            <div className="absolute bottom-[-20px] right-[-20px] w-20 h-20 bg-cyan-500/20 blur-[20px] rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (category === "discord") {
    return (
      <div className="relative w-full h-full flex items-center justify-center [perspective:800px]">
        <div className="absolute w-[180px] h-[120px] bg-[#050505] border border-white/20 rounded-md shadow-[0_0_30px_rgba(0,229,255,0.15)] flex overflow-hidden rotate-x-12 rotate-y-[10deg] scale-110">
          <div className="w-6 bg-black border-r border-white/10 flex flex-col items-center py-2 gap-2">
            <div className="w-3 h-3 rounded-[4px] bg-cyan-500/30 border border-cyan-500/50" />
            <div className="w-3 h-3 rounded-[4px] bg-white/10" />
          </div>
          <div className="w-12 bg-[#0a0a0a] border-r border-white/5 p-2 flex flex-col gap-1.5">
            <div className="w-full h-1 bg-white/20 rounded-sm" />
            <div className="w-3/4 h-1 bg-white/10 rounded-sm" />
            <div className="w-1/2 h-1 bg-white/10 rounded-sm" />
          </div>
          <div className="flex-1 p-2 flex flex-col justify-end gap-1 relative">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-16 h-1 bg-white/10 rounded-sm" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500/40" />
              <div className="w-12 h-1 bg-cyan-500/30 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center [perspective:800px]">
      <div className="absolute w-[80px] h-[140px] bg-black border border-white/20 rounded-md shadow-[0_0_40px_rgba(0,229,255,0.2)] flex flex-col items-center justify-between p-2 rotate-x-[-10deg] rotate-y-[-15deg] scale-110">
        <div className="w-full flex justify-between items-center opacity-50">
           <div className="w-3 h-0.5 bg-white/50 rounded-full" />
           <div className="flex gap-0.5">
             <div className="w-0.5 h-0.5 bg-white/50 rounded-full" />
             <div className="w-0.5 h-0.5 bg-white/50 rounded-full" />
           </div>
        </div>
        <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center">
          <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-cyan-500 border-b-[3px] border-b-transparent ml-0.5" />
        </div>
        <div className="w-full flex flex-col gap-1 opacity-50">
          <div className="w-3/4 h-1 bg-white/50 rounded-full" />
          <div className="w-1/2 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default function PlansPage() {
  const [category, setCategory] = useState<PlanCategory>("website");
  const [currency, setCurrency] = useState("INR");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const filteredPlans = useMemo(() => plans.filter(p => p.category === category), [category]);
  const formatPrice = (p: number) => Math.round(p * (currencyRates[currency] || 1)).toLocaleString();

  // SEO: Clear JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Drixe Studio Digital Services",
    "description": "Professional website development, Discord server setup, and social media content creation packages.",
    "brand": { "@type": "Brand", "name": "Drixe Studio" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "4500",
      "highPrice": "18000",
      "offerCount": plans.length,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* 1. HEADER BLOCK */}
        <header className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Service Pricing
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[6rem] font-black uppercase leading-[0.85] tracking-tighter"
            >
              Clear Pricing. <br />
              <span className="text-white/40">No Surprises.</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:max-w-sm pb-2"
          >
            <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed">
              We provide upfront pricing for website development, Discord server setups, and social media content packages.
            </p>
          </motion.div>
        </header>

        {/* 2. MASSIVE MASKED SWITCHER & CURRENCY */}
        <div className="mb-20 flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between border-y border-white/10 py-8">
          
          {/* Segmented Control */}
          <div className="flex w-full xl:w-2/3 bg-[#0a0a0a] border border-white/10 p-2 relative z-10">
            {categories.map((item) => (
              <button
                key={item.key}
                onClick={() => setCategory(item.key as PlanCategory)}
                className="relative flex-1 py-6 md:py-8 text-center outline-none group"
              >
                {/* The Sliding White Mask */}
                {category === item.key && (
                  <motion.div
                    layoutId="activeTabMask"
                    className="absolute inset-0 bg-white z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* The Text */}
                <span className={`relative z-10 text-xs md:text-sm lg:text-base font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                  category === item.key ? "text-black" : "text-white/40 group-hover:text-white"
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-5 shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Currency:</span>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="bg-transparent text-[12px] font-black uppercase text-white outline-none cursor-pointer"
            >
              {Object.keys(currencyRates).map(c => <option key={c} value={c} className="bg-black text-white">{c}</option>)}
            </select>
          </div>
        </div>

        {/* 3. PLANS GRID (With AnimatePresence and Z-Depth Overlap) */}
        <div className="relative min-h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 md:grid-cols-2 ${filteredPlans.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2 max-w-5xl mx-auto'} gap-8 lg:gap-0 items-center`}
            >
              {filteredPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col group transition-all duration-500 ${
                    plan.popular 
                      ? "bg-[#0f0f0f] border border-white/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] lg:scale-[1.08] z-30 lg:-mx-4" 
                      : "bg-[#050505] border border-white/10 hover:border-white/20 z-10 lg:my-8"
                  }`}
                >
                  {plan.popular && <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 z-40" />}

                  <div className="h-12 border-b border-white/10 flex items-center px-8">
                     <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${plan.popular ? "text-cyan-400" : "text-white/20"}`}>
                        {plan.popular ? "Most Popular" : "Standard Package"}
                     </span>
                  </div>

                  {/* DYNAMIC CSS VISUAL HEADER */}
                  <div className="w-full aspect-[16/9] bg-[#0a0a0a] border-b border-white/10 relative overflow-hidden group-hover:bg-black transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1))] bg-[length:20px_20px] pointer-events-none" />
                    
                    {/* Render the specific CSS visual based on the category */}
                    <CategoryVisual category={plan.category} />
                  </div>

                  {/* Text Content */}
                  <div className="p-8 xl:p-12 flex flex-col flex-1">
                    <div className="mb-8 min-h-[90px]">
                      <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">
                        {plan.name}
                      </h2>
                      <p className="text-sm text-white/50 leading-relaxed font-medium">
                        {plan.summary}
                      </p>
                    </div>

                    <div className="mb-10 flex items-baseline gap-2">
                      <span className="text-white/40 text-2xl font-bold">{currencySymbols[currency]}</span>
                      <span className="text-5xl font-black text-white tracking-tighter">
                        {formatPrice(plan.price)}
                      </span>
                    </div>

                    {/* Feature List */}
                    <ul className="flex-1 space-y-5 mb-12">
                      {plan.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-white/70">
                          <span className={`mt-[2px] ${plan.popular ? 'text-cyan-500' : 'text-white/30'}`}>■</span>
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <button
                      onClick={() => setActivePlan(plan)}
                      aria-label={`Select ${plan.name} package`}
                      className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${
                        plan.popular 
                          ? "bg-white text-black border-white hover:bg-black hover:text-white" 
                          : "bg-transparent text-white/60 border-white/20 hover:border-white hover:text-white hover:bg-white/5"
                      }`}
                    >
                      Select Package
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. BOTTOM ROUTING BLOCK */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 bg-white/5 p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 border border-white/10"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
              Need something different?
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white">
              Contact us for a custom quote.
            </span>
          </div>

          <Link
            href="/contact"
            className="group flex items-center justify-center border border-white px-10 py-5 hover:bg-white transition-colors duration-500 w-full sm:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
              Get in touch
            </span>
          </Link>
        </motion.footer>

      </div>

      {activePlan && (
        <Modal
          isOpen={true}
          onClose={() => setActivePlan(null)}
          plan={activePlan.name}
        />
      )}
    </section>
  );
}