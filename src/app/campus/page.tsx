"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, HeartHandshake, Search, Calendar, Sparkles } from "lucide-react";

export default function CampusConnectPrototype() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center px-6 py-16">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">Campus Connect</h1>
        <p className="text-lg text-gray-300">
          A private, college-exclusive network to help students connect, collaborate,
          and build meaningful campus experiences.
        </p>
      </motion.div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-20">
        {[
          {
            icon: <Users size={36} />,
            title: "Verified College Network",
            desc: "Only students with official college email IDs can join, keeping the space safe and authentic.",
          },
          {
            icon: <Calendar size={36} />,
            title: "Events & Activities",
            desc: "Discover or create college events — fests, meetups, clubs, hackathons, and more.",
          },
          {
            icon: <Search size={36} />,
            title: "Campus Discovery",
            desc: "Find classmates, seniors, mentors, interest groups, and hidden campus opportunities.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 text-center"
          >
            <div className="flex justify-center mb-4 text-blue-400">{f.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* PREMIUM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-4xl p-10 mb-20 text-center shadow-xl"
      >
        <div className="flex justify-center mb-6 text-pink-400">
          <HeartHandshake size={40} />
        </div>

        <h2 className="text-3xl font-bold mb-3">Campus Connect Premium</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Unlock smart matching features that connect you with like-minded people.
          Study buddies, clubmates, gym partners, creative collaborators — and yes, even potential dating matches.
        </p>

        <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
          Unlock Premium
        </button>
      </motion.div>

      {/* VALUE PROPOSITION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full mb-24">
        {[
          { icon: <Sparkles size={32} />, title: "Build Confidence" },
          { icon: <Sparkles size={32} />, title: "Find Real Opportunities" },
          { icon: <Sparkles size={32} />, title: "Feel Included & Connected" },
        ].map((v, i) => (
          <div key={i} className="text-center">
            <div className="flex justify-center mb-4 text-yellow-400">{v.icon}</div>
            <h3 className="text-xl font-semibold">{v.title}</h3>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Campus Life?</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl">
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
