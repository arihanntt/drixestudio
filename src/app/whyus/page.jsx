"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Rocket,
  Wrench,
  Users,
  Gem,
} from "lucide-react";

const features = [
  {
    title: "Tailored to Your Brand",
    desc: "We design servers that reflect your identity — colors, vibe, and structure just for you.",
    more: "Whether you’re a gamer, community, or business — we capture your unique identity and build from scratch.",
    icon: Sparkles,
    tooltip: "Unique builds for each client",
  },
  {
    title: "Security & Permissions",
    desc: "We ensure secure role setups, permissions, and protection against raids and spam.",
    more: "Anti-raid roles, lockdown procedures, admin separation — your server is safe and scalable.",
    icon: ShieldCheck,
    tooltip: "Safety & anti-spam measures",
  },
  {
    title: "Fast Delivery",
    desc: "Need it urgent? We deliver fully set up servers within 24–48 hours.",
    more: "Rush delivery with quality — even our fastest builds are tailored and polished.",
    icon: Rocket,
    tooltip: "Fastest turnaround",
  },
  {
    title: "Full Customization",
    desc: "Choose your own channels, categories, bots, roles, and themes with unlimited edits.",
    more: "From onboarding flows to ticket systems — you decide how things run.",
    icon: Wrench,
    tooltip: "Build the server your way",
  },
  {
    title: "Community Growth Ready",
    desc: "We optimize your server for engagement, community building, and monetization.",
    more: "Growth channels, engagement bots, role incentives — built to grow and earn.",
    icon: Users,
    tooltip: "For creators, streamers, brands",
  },
  {
    title: "Professional Support",
    desc: "Lifetime support, upgrades, and guidance included in all plans.",
    more: "Bugs? Edits? Add-ons? We’re one DM away. Our team stays with you.",
    icon: Gem,
    tooltip: "Support that lasts",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const WhyUsPage = () => {
  const [openCard, setOpenCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="whyus"
      className="relative min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-10 pt-40 pb-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/25 blur-[200px] rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/20 blur-[160px] rounded-full" />
      </div>

      {/* Slanted Edge (Top) */}
      <div className="absolute top-0 left-0 w-full h-24 bg-[#0f0f0f] rotate-[170deg] origin-top" />

      {/* Section Header */}
      <div className="text-center mb-24 relative z-10">
        <motion.span
          className="inline-block text-xs uppercase tracking-wider bg-gradient-to-r from-violet-500 to-pink-500 text-white px-4 py-1 rounded-full shadow-md border border-white/10 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Our Core Values
        </motion.span>
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Why <span className="drop-shadow text-white">Drixe Studio</span>?
        </motion.h1>
        <motion.p
          className="text-gray-400 mt-5 text-sm sm:text-base max-w-2xl mx-auto italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Explore the features that make your server unforgettable.
        </motion.p>
      </div>

      {/* Feature Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Tilt key={idx} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable>
              <motion.div
                variants={itemAnim}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setOpenCard(openCard === idx ? null : idx)}
                className={`relative cursor-pointer bg-[#1b1b2b]/50 backdrop-blur-xl border rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:shadow-violet-500/30 hover:border-violet-600 ${
                  openCard === idx ? "border-violet-500 scale-[1.03]" : ""
                }`}
                title={item.tooltip}
              >
                <div className="flex items-center gap-3 mb-4 text-violet-400">
                  <div className="p-2 bg-[#2a2a3f] rounded-lg">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 min-h-[52px]">{item.desc}</p>
                {openCard === idx && (
                  <motion.div
                    className="mt-4 text-sm text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {item.more}
                  </motion.div>
                )}
                <div className="absolute top-4 right-5 w-2.5 h-2.5 bg-violet-500 rounded-full animate-ping opacity-50" />
                <div className="flex mt-5 gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === 0
                          ? "bg-violet-500"
                          : "bg-white/10 border border-white/5"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </Tilt>
          );
        })}
      </motion.div>

      {/* Back to Home CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-24 z-10 relative"
      >
        <Link
          href="/"
          className="inline-block px-6 py-3 text-sm rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>

      {/* Bottom slant */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[#0f0f0f] -rotate-[170deg] origin-bottom" />
    </section>
  );
};

export default WhyUsPage;
