// app/plans/page.jsx

"use client"; // Required for useState & interactivity in Next.js App Router

import React, { useState } from "react";
import { plans } from "@/components/plans"; // ✅ Adjust path as needed
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const currencyRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
  CAD: 0.016,
  JPY: 1.76,
  CNY: 0.085,
  AED: 0.044,
  SGD: 0.016,
  MYR: 0.056,
  KRW: 16.0,
};

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥",
  CNY: "¥",
  AED: "د.إ",
  SGD: "S$",
  MYR: "RM",
  KRW: "₩",
};

export default function PlansPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");

  const getConvertedPrice = (price) => {
    const rate = currencyRates[selectedCurrency] || 1;
    return (price * rate).toFixed(0);
  };

  return (
    <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 bg-[#0e0e10] text-white border-t border-neutral-800 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#11101c]" />
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/20 blur-[180px] rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/10 blur-[160px] rounded-full" />
      </div>

      {/* Heading + Currency Selector */}
      <div className="text-center mb-20 max-w-3xl mx-auto px-2">
        <p className="text-sm font-semibold text-white/60 tracking-wide uppercase mb-2">
          Our Discord Setup Packages
        </p>
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          Explore Our Server Plans
        </h2>
        <p className="text-white/50 max-w-xl mx-auto mt-4">
          Whether you're starting fresh or scaling your server to the next level — we’ve got you covered.
        </p>

        <div className="mt-6">
          <label className="text-sm text-white/60 mr-2">Currency:</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="bg-[#1d1d2b] text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none hover:border-violet-500 transition-all"
          >
            {Object.keys(currencyRates).map((currency) => (
              <option key={currency} value={currency}>
                {currencySymbols[currency]} {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 sm:px-0">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative border border-white/10 bg-[#161622] p-6 sm:p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.025] hover:shadow-violet-700/30 ${
              plan.popular ? "border-violet-500 ring-2 ring-violet-500/30" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <span className="text-xl font-bold text-violet-400">
                {currencySymbols[selectedCurrency]}
                {getConvertedPrice(plan.price)}
              </span>
            </div>

            <p className="text-white/70 italic mb-6">{plan.summary}</p>

            <ul className="space-y-3 text-sm sm:text-base text-white/90">
              {plan.details.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-violet-500 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {plan.popular && (
              <div className="mt-6 inline-block text-xs text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full uppercase font-semibold tracking-widest">
                Most Popular
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
