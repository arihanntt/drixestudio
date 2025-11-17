"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Shield, HeartHandshake, Star, ArrowRight, Search, MessageCircle, Users2, Briefcase, Zap, Filter } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center py-12 sm:py-20">
        <div className="text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Animated Background */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity },
              }}
              className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-sky-400/20 blur-3xl rounded-full mx-auto w-64 h-64 sm:w-96 sm:h-96 -z-10"
            />
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-pink-600 to-sky-600 bg-clip-text text-transparent px-4">
              CONNECTING EVERY STUDENT ON CAMPUS
            </h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Meet. Collaborate. Grow.
            </motion.p>

            {/* Microcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-slate-500 mb-12"
            >
              College-exclusive. Verified students only.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl flex items-center justify-center space-x-3 transition-all duration-300 w-full sm:w-auto"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/60 backdrop-blur-sm hover:bg-white/80 border border-pink-300 text-slate-800 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                Find Students
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SOLUTION SECTION */}
      <section className="py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-sky-600 bg-clip-text text-transparent">
            Why Campus Connect
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              problem: "No central platform",
              solution: "One unified campus network",
              icon: <Users2 className="text-pink-500" size={24} />,
            },
            {
              problem: "Missed opportunities",
              solution: "Centralized opportunity board",
              icon: <Briefcase className="text-sky-500" size={24} />,
            },
            {
              problem: "Scattered chats",
              solution: "Verified, private campus chats",
              icon: <MessageCircle className="text-emerald-500" size={24} />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 text-center shadow-xl"
            >
              <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <p className="text-slate-600 text-sm mb-2">{item.problem} →</p>
              <p className="font-semibold text-slate-800">{item.solution}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Search className="text-pink-500" size={28} />,
              title: "Find Like-Minded Students",
              desc: "Discover peers with similar interests and goals",
            },
            {
              icon: <HeartHandshake className="text-sky-500" size={28} />,
              title: "Match Connect",
              desc: "Swipe to find your perfect campus matches",
            },
            {
              icon: <Users2 className="text-emerald-500" size={28} />,
              title: "Clubs & Societies Hub",
              desc: "Join and manage all campus organizations",
            },
            {
              icon: <Briefcase className="text-amber-500" size={28} />,
              title: "Opportunity Board",
              desc: "Find gigs, hackathons, and projects",
            },
            {
              icon: <Shield className="text-purple-500" size={28} />,
              title: "Verified Chat",
              desc: "Secure messaging with verified students",
            },
            {
              icon: <Zap className="text-red-500" size={28} />,
              title: "Skill Profiles",
              desc: "Showcase your talents and expertise",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl cursor-pointer transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <button className="text-sky-600 hover:text-sky-700 font-semibold text-lg">
            See All Features →
          </button>
        </motion.div>
      </section>

      {/* MATCH CONNECT PREVIEW */}
      <section className="py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-white/30 backdrop-blur-sm border border-white/50 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
              MATCH CONNECT — FIND YOUR PEOPLE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Mockup */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-pink-400/20 to-sky-400/20 rounded-2xl p-6 aspect-[9/16] max-w-sm mx-auto shadow-xl border border-white/50"
            >
              <div className="bg-white/60 rounded-xl h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-sky-400 rounded-full mx-auto mb-4"></div>
                  <p className="text-slate-600">Swipe card mockup</p>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <div className="space-y-6">
              {[
                "Purpose-driven matching algorithm",
                "Skills and interest-based connections",
                "Social and academic networking",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-sky-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700 font-medium">{item}</p>
                </motion.div>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-400 to-sky-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg w-full sm:w-auto"
              >
                Try Match Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STUDENT PROFILES SNAPSHOT */}
      <section className="py-16 sm:py-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-sky-600 bg-clip-text text-transparent">
            Meet Students
          </h2>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["Branch", "Year", "Skill"].map((filter) => (
            <button
              key={filter}
              className="bg-white/40 backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full text-slate-700 text-sm font-medium hover:bg-white/60 transition-all"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 text-center shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">U{item}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Student {item}</h3>
              <p className="text-slate-600 text-sm mb-3">Computer Science</p>
              <div className="flex justify-center gap-2 mb-4">
                <span className="bg-white/60 px-2 py-1 rounded-full text-xs text-slate-700">React</span>
                <span className="bg-white/60 px-2 py-1 rounded-full text-xs text-slate-700">Design</span>
              </div>
              <button className="bg-gradient-to-r from-pink-400 to-sky-400 text-white px-4 py-2 rounded-xl text-sm font-semibold w-full">
                Connect
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-r from-pink-400/20 to-sky-400/20 backdrop-blur-sm border border-white/50 rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden"
        >
          <motion.div
            animate={{
              x: [0, 100, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -z-10"
          />
          
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
            Create Your Campus Profile
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            College email required
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl"
          >
            Get Started Now
          </motion.button>
          
          <p className="text-sm text-slate-500 mt-4">
            Scan QR to Try Prototype
          </p>
        </motion.div>
      </section>
    </div>
  );
}