"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { CheckCircle, X, ChevronDown, ChevronUp, Check, Gem, Crown, Zap, Shield, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";

interface Plan {
  name: string;
  price: number;
  gems: number;
  bonus: number;
  summary: string;
  details: string[];
  popular?: boolean;
  bestValue?: boolean;
  custom?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter Pack",
    price: 9.99,
    gems: 20,
    bonus: 0,
    summary: "Perfect for beginners looking to get started in Death Ball",
    details: [
      "20 Million Death Ball Gems",
      "Instant Delivery",
      "$0.50 per million",
      "Secure Payment",
    ]
  },
  {
    name: "Warrior Bundle",
    price: 45,
    gems: 100,
    bonus: 0,
    summary: "Great value for regular players wanting more power",
    popular: true,
    details: [
      "100 Million Death Ball Gems",
      "Instant Delivery",
      "Secure Payment",
      "$0.45 per million"
    ]
  },
  {
    name: "Champion Pack",
    price: 120,
    gems: 300,
    bonus: 0,
    summary: "Ultimate package for serious Death Ball competitors",
    bestValue: true,
    details: [
      "300 Million Death Ball Gems",
      "Instant Delivery",
      "VIP Priority Support",
      "Secure Payment",
    ]
  },
  {
    name: "Custom Pack",
    price: 0,
    gems: 0,
    bonus: 0,
    summary: "Contact us for custom gem packages",
    custom: true,
    details: [
      "Custom gem amounts available",
      "Best value for bulk orders",
      "Instant Delivery",
      "VIP Priority Support",
      "24/7 Customer Support",
      "Flexible pricing options"
    ]
  }
];

const currencyRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.35,
  JPY: 148.50,
  INR: 83.20,
};

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥",
  INR: "₹",
};

const PlanCard = React.memo(({ 
  plan, 
  selectedCurrency, 
  openModal
}: { 
  plan: Plan; 
  selectedCurrency: string; 
  openModal: (plan: Plan) => void;
}) => {
  const getConvertedPrice = (price: number) => {
    const rate = currencyRates[selectedCurrency] || 1;
    return (price * rate).toFixed(2);
  };

  const handleCustomContact = () => {
    window.open('mailto:support@deathball.com?subject=Custom Gem Package Request', '_blank');
  };

  if (plan.custom) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative border-2 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden border-cyan-500 ring-4 ring-cyan-500/20 shadow-cyan-500/20"
        whileHover={{
          boxShadow: "0 0 30px 8px rgba(6, 182, 212, 0.3)",
          transform: "translateY(-8px)",
        }}
      >
        {/* Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            <Zap className="w-4 h-4" />
            CUSTOM PACK
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-md mb-2">
            {plan.name}
          </h3>
          
          {/* Custom Gem Icon */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">Custom</span>
          </div>

          {/* Contact Price */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              Contact Us
            </span>
            <div className="text-amber-400 text-sm mt-1">
              Best prices for bulk orders!
            </div>
          </div>
        </div>

        <p className="text-white/70 italic mb-6 text-sm sm:text-base leading-snug bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-white/5">
          {plan.summary}
        </p>

        <ul className="space-y-3 text-sm sm:text-base text-white/90 mb-8">
          {plan.details.map((item: string, idx: number) => (
            <motion.li
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="flex-1">{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
  className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => openModal(plan)}  // <--- FIXED HERE
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    <Mail className="w-4 h-4" />
    CONTACT FOR CUSTOM PACK
  </span>
  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</motion.button>

      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative border-2 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden ${
        plan.popular 
          ? "border-purple-500 ring-4 ring-purple-500/20 shadow-purple-500/20" 
          : plan.bestValue
          ? "border-amber-500 ring-4 ring-amber-500/20 shadow-amber-500/20"
          : "border-gray-700/50"
      }`}
      whileHover={{
        boxShadow: plan.popular 
          ? "0 0 30px 8px rgba(147, 51, 234, 0.3)" 
          : plan.bestValue
          ? "0 0 30px 8px rgba(245, 158, 11, 0.3)"
          : "0 0 20px 5px rgba(99, 102, 241, 0.2)",
        transform: "translateY(-8px)",
      }}
    >
      {/* Badges */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            <Crown className="w-4 h-4" />
            MOST POPULAR
          </div>
        </div>
      )}

      {plan.bestValue && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            <Gem className="w-4 h-4" />
            BEST VALUE
          </div>
        </div>
      )}

      <div className="text-center mb-6 pt-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-md mb-2">
          {plan.name}
        </h3>
        
        {/* Gem Count */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gem className="w-6 h-6 text-purple-400" />
          <span className="text-3xl font-bold text-white">
            {plan.gems} Million
            {plan.bonus > 0 && (
              <span className="text-amber-400 text-lg ml-1">
                +{plan.bonus}M
              </span>
            )}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-white drop-shadow-lg">
            {currencySymbols[selectedCurrency]}
            {getConvertedPrice(plan.price)}
          </span>
          <div className="text-white/60 text-sm mt-1">
            {currencySymbols[selectedCurrency]}
            {(plan.price / plan.gems).toFixed(2)} per million
          </div>
        </div>
      </div>

      <p className="text-white/70 italic mb-6 text-sm sm:text-base leading-snug bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-white/5">
        {plan.summary}
      </p>

      <ul className="space-y-3 text-sm sm:text-base text-white/90 mb-8">
        {plan.details.map((item: string, idx: number) => (
          <motion.li
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="flex-1">{item}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg relative overflow-hidden group ${
          plan.popular
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            : plan.bestValue
            ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => openModal(plan)}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Gem className="w-4 h-4" />
          BUY NOW
        </span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.button>
    </motion.div>
  );
});

export default function DeathBallGemsPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const openModal = useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  }, []);

  const plansGrid = useMemo(() => {
    return plans.map((plan: Plan, index: number) => (
      <div key={index} className="h-full">
        <PlanCard 
          plan={plan} 
          selectedCurrency={selectedCurrency} 
          openModal={openModal}
        />
      </div>
    ));
  }, [plans, selectedCurrency, openModal]);

  return (
    <section className="relative z-10 py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#15152b] text-white border-t border-purple-500/20 overflow-hidden min-h-screen">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#15152b]"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        
        {/* Glowing orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-40 left-1/4 w-72 h-72 bg-cyan-600/10 blur-[80px] rounded-full"></div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: Math.random() * 100,
              x: Math.random() * 100 
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -Math.random() * 200],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Large floating gems */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              rotate: 360,
              y: [0, -20, 0]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-purple-400/20"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              fontSize: `${30 + i * 15}px`
            }}
          >
            <Gem />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-20 max-w-4xl mx-auto px-2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6"
        >
          <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <span className="text-xs sm:text-sm font-semibold text-purple-300 uppercase tracking-wider">
            Premium Death Ball Currency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl mb-4 sm:mb-6 leading-tight"
        >
          DEATH BALL
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GEMS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2"
        >
          Sharp swords, sharper victories. Buy them with gems..
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto"
        >
          {[
            { icon: Zap, text: "Instant Delivery" },
            { icon: Shield, text: "100% Safe" },
            { icon: Crown, text: "Premium Quality" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 justify-center p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="text-white/80 font-medium text-sm sm:text-base">{item.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <div className="flex items-center gap-4 bg-black/30 border border-purple-500/30 rounded-xl px-4 sm:px-6 py-3">
            <span className="text-white/70 font-medium text-sm sm:text-base">Currency:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg text-sm sm:text-base"
            >
              {Object.keys(currencyRates).map((currency) => (
                <option key={currency} value={currency} className="bg-[#1a1a2e] text-white">
                  {currencySymbols[currency]} {currency}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto px-2 sm:px-4">
        <AnimatePresence>
          {plansGrid}
        </AnimatePresence>
      </div>

      {/* Trust Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 sm:mt-20 text-center max-w-4xl mx-auto px-2"
      >
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-white/70">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Instant Delivery</h4>
              <p className="text-xs sm:text-sm">Receive your gems within seconds of payment</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">100% Safe</h4>
              <p className="text-xs sm:text-sm">Compliant with Roblox Terms of Service</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Premium Support</h4>
              <p className="text-xs sm:text-sm">24/7 customer support for all your needs</p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            plan={selectedPlan?.name || "Unknown Plan"}
          />
        )}
      </AnimatePresence>
    </section>
  );
}