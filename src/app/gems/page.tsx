"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Check, Gem, Crown, Zap, Shield, Mail, Bitcoin, Sparkles, Star, Sword, Target, Trophy, Skull } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  gradient: string;
  glow: string;
  icon: React.ReactNode;
  particleColor: string;
}

const plans: Plan[] = [
  {
    name: "STARTER PACK",
    price: 9.99,
    gems: 20,
    bonus: 0,
    summary: "Begin your Death Ball journey with essential power",
    details: ["20 Million Death Ball Gems", "Instant Delivery", "Starter Bonus", "Secure Encrypted Payment"],
    gradient: "from-blue-600 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.3)",
    icon: <Sparkles className="w-6 h-6" />,
    particleColor: "rgb(59, 130, 246)"
  },
  {
    name: "WARRIOR BUNDLE",
    price: 45,
    gems: 100,
    bonus: 0,
    summary: "Dominate the arena with superior firepower",
    popular: true,
    details: ["100 Million Death Ball Gems", "Priority Delivery", "Warrior Exclusive Badge", "Advanced Support"],
    gradient: "from-purple-600 to-pink-500",
    glow: "rgba(168, 85, 247, 0.4)",
    icon: <Sword className="w-6 h-6" />,
    particleColor: "rgb(168, 85, 247)"
  },
  {
    name: "CHAMPION PACK",
    price: 120,
    gems: 300,
    bonus: 0,
    summary: "Unleash ultimate power and reign supreme",
    bestValue: true,
    details: ["300 Million Death Ball Gems", "Instant VIP Access", "Champion Title", "24/7 Priority Support"],
    gradient: "from-amber-600 to-orange-500",
    glow: "rgba(245, 158, 11, 0.4)",
    icon: <Crown className="w-6 h-6" />,
    particleColor: "rgb(245, 158, 11)"
  },
  {
    name: "LEGENDARY PACK",
    price: 0,
    gems: 0,
    bonus: 0,
    summary: "Forge your own destiny with custom power",
    custom: true,
    details: [
      "Custom Gem Amounts",
      "Dedicated Account Manager",
      "Instant Bulk Delivery",
      "VIP Priority Support",
      "Exclusive Legendary Status",
      "Flexible Payment Options"
    ],
    gradient: "from-emerald-600 to-teal-500",
    glow: "rgba(16, 185, 129, 0.3)",
    icon: <Trophy className="w-6 h-6" />,
    particleColor: "rgb(16, 185, 129)"
  }
];

const currencyRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.20
};

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹"
};

// Particle System Component
const ParticleField = ({ color, count = 50 }: { color: string; count?: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Animated Gem Component
const AnimatedGem = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        rotateY: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Gem className="w-full h-full text-amber-400 drop-shadow-2xl" />
      <motion.div
        className="absolute inset-0 bg-amber-400 blur-xl opacity-30"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

const PlanCard = ({ plan, selectedCurrency, openModal, index }: { plan: Plan; selectedCurrency: string; openModal: (plan: Plan) => void; index: number }) => {
  const getConvertedPrice = (price: number) => {
    const rate = currencyRates[selectedCurrency] || 1;
    return (price * rate).toFixed(2);
  };

  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, y }}
      initial={{ opacity: 0, y: 100, rotateY: 45 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 50 }}
      whileHover={{ y: -20, scale: 1.02, transition: { duration: 0.3 } }}
      className={`relative backdrop-blur-2xl bg-gradient-to-br ${plan.gradient}/20 border-2 ${plan.gradient}/40 p-8 rounded-3xl shadow-2xl hover:shadow-[0_0_80px_var(--glow)] transition-all duration-500 flex flex-col h-full group perspective-1000`}
      style={{ '--glow': plan.glow } as React.CSSProperties}
    >
      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
        <div className="absolute inset-[2px] rounded-3xl bg-slate-900" />
      </div>

      {/* Particle Field */}
      <ParticleField color={plan.particleColor} count={8} />

      {/* Hover Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`} />

      {/* Badges */}
      {plan.popular && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.15 + 0.4, type: "spring", stiffness: 200 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-black shadow-2xl flex items-center gap-3 border-2 border-white/30 backdrop-blur-xl">
            <Crown className="w-5 h-5" />
            <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent tracking-wider">
              MOST POPULAR
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-yellow-400 rounded-full"
            />
          </div>
        </motion.div>
      )}
      {plan.bestValue && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.15 + 0.4, type: "spring", stiffness: 200 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full text-sm font-black shadow-2xl flex items-center gap-3 border-2 border-white/30 backdrop-blur-xl">
            <Gem className="w-5 h-5" />
            <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent tracking-wider">
              BEST VALUE
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          </div>
        </motion.div>
      )}
      {plan.custom && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.15 + 0.4, type: "spring", stiffness: 200 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full text-sm font-black shadow-2xl flex items-center gap-3 border-2 border-white/30 backdrop-blur-xl">
            <Trophy className="w-5 h-5" />
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent tracking-wider">
              LEGENDARY
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-8 pt-6 relative z-20">
        {/* Icon with Glow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className={`p-4 rounded-3xl bg-gradient-to-r ${plan.gradient} shadow-2xl relative`}>
            {plan.icon}
            <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-lg opacity-50`} />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.3 }}
          className="text-2xl font-black text-white mb-4 tracking-wider"
        >
          {plan.name}
        </motion.h3>

        {!plan.custom ? (
          <>
            {/* Gem Count with Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.4 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <AnimatedGem className="w-10 h-10" />
              <span className="text-5xl font-black bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent tracking-tight">
                {plan.gems}M
              </span>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.5 }}
              className="mb-6"
            >
              <span className="text-4xl font-black text-white">
                {currencySymbols[selectedCurrency]}
                {getConvertedPrice(plan.price)}
              </span>
              <div className="text-white/70 text-lg mt-3 font-semibold tracking-wide">
                {currencySymbols[selectedCurrency]}{(plan.price / plan.gems).toFixed(2)} per million
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 + 0.4 }}
            className="mb-6"
          >
            <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CUSTOM POWER
            </span>
            <div className="text-amber-300 text-lg mt-3 font-semibold tracking-wide drop-shadow-lg">
              Ultimate deals for champions
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.6 }}
        className="text-white/80 text-center mb-8 text-lg leading-relaxed font-medium tracking-wide relative z-20"
      >
        {plan.summary}
      </motion.p>

      {/* Details */}
      <ul className="space-y-4 text-lg text-white/90 mb-10 relative z-20 flex-1">
        {plan.details.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + 0.7 + idx * 0.1 }}
            className="flex items-center gap-4 group/item"
          >
            <motion.div
              className={`w-7 h-7 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center shadow-2xl flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-semibold tracking-wide">{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 1 }}
        className={`mt-auto w-full py-5 rounded-2xl font-black text-white transition-all duration-500 shadow-2xl relative overflow-hidden group/btn bg-gradient-to-r ${plan.gradient} hover:shadow-[0_0_50px_var(--glow)] border-2 border-white/20`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => openModal(plan)}
      >
        {/* Button Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
        
        {/* Button Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.5,
                repeat: Infinity,
              }}
              style={{
                left: `${20 + i * 30}%`,
                bottom: "0%",
              }}
            />
          ))}
        </div>

        <span className="relative z-10 flex items-center justify-center gap-4 text-xl tracking-wider">
          {plan.custom ? (
            <>
              <Mail className="w-6 h-6" /> 
              <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                BECOME LEGEND
              </span>
            </>
          ) : (
            <>
              <Gem className="w-6 h-6" />
              <span className="bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                ACQUIRE POWER
              </span>
            </>
          )}
        </span>
      </motion.button>
    </motion.div>
  );
};

// Enhanced Floating Elements
const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Large Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 100, 0],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Small Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          animate={{
            y: [0, -50, 0],
            x: [0, Math.cos(i) * 30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          style={{
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Animated Title Component
const AnimatedTitle = () => {
  const letters = "DEATH BALL GEMS".split("");
  
  return (
    <motion.h1
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-5xl sm:text-7xl lg:text-8xl font-black text-center mb-8 tracking-tighter"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 100, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : (
            <span className="bg-gradient-to-r from-white via-purple-200 to-amber-200 bg-clip-text text-transparent">
              {letter}
            </span>
          )}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default function DeathBallGemsPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <PlanCard 
        key={index} 
        plan={plan} 
        selectedCurrency={selectedCurrency} 
        openModal={openModal} 
        index={index}
      />
    ));
  }, [plans, selectedCurrency, openModal]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-900 to-slate-900" />
      <CinematicBackground />
      
      {/* Main Content */}
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`text-center mb-16 lg:mb-24 pt-16 lg:pt-24 transition-all duration-700 ${
            isScrolled ? 'lg:pt-8 scale-90' : 'lg:pt-24 scale-100'
          }`}
        >
          {/* Main Title */}
          <div className="relative">
            <AnimatedTitle />
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-2xl sm:text-3xl lg:text-4xl text-white/80 max-w-4xl mx-auto font-light tracking-wider mb-12"
            >
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-bold">
                FORGE YOUR LEGACY
              </span>
              <br />
              <span className="text-xl sm:text-2xl text-white/60">
                Acquire power, dominate the arena, become immortal
              </span>
            </motion.p>

            {/* Animated Gem Decoration */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.5, type: "spring" }}
              className="absolute -top-4 -right-4 lg:-right-12"
            >
              <AnimatedGem className="w-16 h-16 lg:w-24 lg:h-24" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.7, type: "spring" }}
              className="absolute -bottom-4 -left-4 lg:-left-12"
            >
              <AnimatedGem className="w-12 h-12 lg:w-20 lg:h-20" />
            </motion.div>
          </div>

          {/* Currency Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex justify-center mb-16 lg:mb-20"
          >
            <div className="relative">
              <motion.select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="appearance-none bg-black/60 backdrop-blur-2xl border-2 border-purple-500/60 px-8 py-4 rounded-2xl text-white font-black text-lg shadow-2xl focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                {Object.keys(currencyRates).map((currency) => (
                  <option key={currency} value={currency} className="bg-slate-900 text-white py-2">
                    {currencySymbols[currency]} {currency}
                  </option>
                ))}
              </motion.select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 border-r-2 border-b-2 border-amber-400 rotate-45"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10 max-w-7xl mx-auto mb-20"
        >
          {plansGrid}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 lg:mt-40 text-center"
        >
          <motion.h3 
            className="text-3xl lg:text-5xl font-black mb-16 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-wider"
            whileInView={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            ACCEPTED PAYMENTS
          </motion.h3>
          <div className="flex justify-center gap-8 lg:gap-16 text-white/80 flex-wrap">
            {[
              { name: "PayPal", icon: "/images/paypal.png", color: "from-blue-500 to-cyan-500" },
              { name: "UPI", icon: "/images/upi.png", color: "from-green-500 to-emerald-500" },
              { name: "Crypto", icon: <Bitcoin className="w-12 h-12" />, color: "from-yellow-500 to-amber-500" },
              { name: "Credit Card", icon: "💳", color: "from-purple-500 to-pink-500" }
            ].map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                whileHover={{ scale: 1.15, y: -10 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <motion.div
                  className={`p-6 rounded-3xl bg-gradient-to-r ${method.color}/20 border-2 ${method.color}/30 backdrop-blur-2xl transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden`}
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  {typeof method.icon === 'string' && method.icon.length > 2 ? (
                    <img src={method.icon} alt={method.name} className="h-12 lg:h-16" />
                  ) : (
                    <div className="text-3xl lg:text-4xl">
                      {method.icon}
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </motion.div>
                <span className="text-lg lg:text-xl mt-4 font-bold group-hover:text-white transition-colors duration-300 tracking-wide">
                  {method.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Space */}
        <div className="h-32 lg:h-48" />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal} plan={selectedPlan?.name || "Unknown Plan"} />
        )}
      </AnimatePresence>
    </section>
  );
}