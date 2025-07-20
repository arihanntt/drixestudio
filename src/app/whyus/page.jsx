"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Rocket,
  Wrench,
  Users,
  Gem,
  Bot,
  LayoutTemplate,
  Shield,
  Zap,
  Clock,
  Palette,
  BarChart2,
  Headphones,
  Code2,
  Gift,
  Lock,
  Star,
  MessageSquare,
  FileText,
  Server
} from "lucide-react";

const features = [
  {
    title: "Complete Brand Customization",
    desc: "Your server becomes an extension of your brand with custom colors, icons, and themed channels.",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Advanced Security Setup",
    desc: "Enterprise-grade permission systems and anti-raid protection with automated moderation.",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "24-Hour Express Setup",
    desc: "Need it urgently? We deliver fully configured servers in under 24 hours.",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Bot Integration Suite",
    desc: "Premium bots for moderation, music, tickets, and custom commands pre-configured.",
    icon: Bot,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Growth-Optimized Structure",
    desc: "Server architecture designed to maximize engagement and member retention.",
    icon: BarChart2,
    color: "from-rose-500 to-fuchsia-500",
  },
  {
    title: "Lifetime Support & Updates",
    desc: "Free lifetime maintenance, updates, and troubleshooting included.",
    icon: Headphones,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Custom Welcome Systems",
    desc: "Interactive onboarding flows with roles, rules screening, and welcome gates.",
    icon: LayoutTemplate,
    color: "from-green-500 to-cyan-500",
  },
  {
    title: "Professional Ticket System",
    desc: "Fully automated support ticket channels with transcript logging.",
    icon: FileText,
    color: "from-yellow-500 to-red-500",
  },
  {
    title: "VC Room Generator",
    desc: "Dynamic voice channels that auto-create when needed.",
    icon: Headphones,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Giveaway & Event Systems",
    desc: "Pre-built contest frameworks with winner selection automation.",
    icon: Gift,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "NSFW Protection",
    desc: "Automated content screening with multiple verification layers.",
    icon: Lock,
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Premium Role Shop",
    desc: "Monetization-ready role stores with purchase logs.",
    icon: Star,
    color: "from-amber-500 to-yellow-500",
  },
  {
    title: "Reaction Role Hubs",
    desc: "Interactive role assignment through reaction messages.",
    icon: MessageSquare,
    color: "from-lime-500 to-green-500",
  },
  {
    title: "Server Backup System",
    desc: "Automatic daily backups of your entire server configuration.",
    icon: Server,
    color: "from-gray-500 to-blue-500",
  },
  {
    title: "Custom Discord Bots",
    desc: "Tailor-made bots with your branding and specific functionality.",
    icon: Code2,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Streamer Mode Setup",
    desc: "Special configurations for Twitch/YouTube streamers.",
    icon: Users,
    color: "from-red-500 to-purple-500",
  },
  {
    title: "Partner Ready Templates",
    desc: "Pre-approved server designs meeting Discord Partner requirements.",
    icon: ShieldCheck,
    color: "from-blue-500 to-teal-500",
  },
  {
    title: "SEO-Optimized Discovery",
    desc: "Server profile optimized for Discord server listing sites.",
    icon: Rocket,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Multi-Language Support",
    desc: "Auto-translation systems and localized channel setups.",
    icon: MessageSquare,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "VIP Member Perks",
    desc: "Exclusive reward systems for premium community members.",
    icon: Gem,
    color: "from-pink-500 to-rose-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.16, 1, 0.3, 1]
    },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      mass: 0.5
    }
  },
  hover: {
    y: -8,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300
    }
  }
};

const WhyUsPage = () => {
  const [openCard, setOpenCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-10 pt-40 pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/15 blur-[200px] rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/10 blur-[160px] rounded-full" />
        
        {/* Floating Particles */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              width: Math.random() * 8 + 2 + "px",
              height: Math.random() * 8 + 2 + "px",
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              x: ["0%", Math.random() * 100 - 50 + "%"],
              y: ["0%", Math.random() * 100 - 50 + "%"],
              transition: {
                duration: Math.random() * 40 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="text-center mb-24 relative z-10">
        <motion.span
          className="inline-block text-xs uppercase tracking-wider bg-gradient-to-r from-violet-500 to-pink-500 text-white px-4 py-1 rounded-full shadow-md border border-white/10 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          Premium Discord Services
        </motion.span>
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        >
          Why Choose <span className="text-white drop-shadow-[0_2px_10px_rgba(139,92,246,0.5)]">Drixe</span>?
        </motion.h1>
        <motion.p
          className="text-gray-400 mt-5 text-sm sm:text-lg max-w-2xl mx-auto italic font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        >
          20 specialized features that make your server stand out
        </motion.p>
      </div>

      {/* Feature Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Tilt 
              key={idx} 
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5} 
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareBorderRadius="1rem"
              transitionSpeed={1500}
              scale={1.02}
              gyroscope={true}
            >
              <motion.div
                variants={itemAnim}
                initial="hidden"
                animate="show"
                whileHover="hover"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setOpenCard(openCard === idx ? null : idx)}
                className={`relative cursor-pointer bg-gradient-to-b from-[#1b1b2b]/50 to-[#1b1b2b]/20 backdrop-blur-xl border rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:shadow-violet-500/20 hover:border-white/20 ${
                  openCard === idx ? "border-violet-500 scale-[1.03] shadow-violet-500/10" : "border-white/10"
                }`}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-${item.color} z-0 opacity-0 ${
                  hoveredIndex === idx ? "opacity-100" : ""
                }`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className={`p-2 rounded-lg bg-gradient-to-br from-${item.color} bg-opacity-20`}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                      <Icon size={24} className={`text-${item.color.split(' ')[1]}`} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300 min-h-[60px]">{item.desc}</p>
                  
                  {/* Animated Indicator */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className={`w-2 h-2 rounded-full bg-gradient-to-br from-${item.color}`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </Tilt>
          );
        })}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        className="text-center mt-24 z-10 relative"
      >
        <Link
          href="/plans"
          className="inline-flex items-center px-8 py-4 text-base font-medium rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:opacity-90 transition-all shadow-xl hover:shadow-violet-500/30 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          <span className="relative flex items-center gap-2">
            <motion.span
              animate={{ x: [-5, 0, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
            View Pricing & Packages
          </span>
        </Link>
        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Advanced Security Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-blue-400" />
            <span>100+ servers optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <Rocket size={14} className="text-purple-400" />
            <span>24-hour express setup</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyUsPage;