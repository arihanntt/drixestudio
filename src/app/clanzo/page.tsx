"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Zap, Star, ArrowRight, Mail, Users } from "lucide-react";

export default function ClanzoHomepage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">

      {/* 1️⃣ HERO SECTION - Clean & Fast */}
      <section className="min-h-screen flex items-center justify-center py-12 lg:py-20">
        <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <div className="inline-block bg-[#9F56EC]/10 border border-[#9F56EC]/30 rounded-full px-4 py-2 mb-6">
                <span className="text-[#9F56EC] text-sm font-medium">🎓 Campus Exclusive</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Campus.
                <span className="block bg-gradient-to-r from-[#9F56EC] to-[#7B3FE4] bg-clip-text text-transparent mt-2">
                  Connected.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The private campus hub for <span className="text-[#9F56EC]">connecting</span> with classmates, 
                joining <span className="text-[#9F56EC]">groups</span>, finding <span className="text-[#9F56EC]">events</span>, 
                and building real <span className="text-[#9F56EC]">friendships</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#9F56EC] hover:bg-[#8a45e0] px-10 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 shadow-xl shadow-[#9F56EC]/30"
                >
                  <span>Get Early Access</span>
                  <ArrowRight size={20} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#9F56EC] text-[#9F56EC] hover:bg-[#9F56EC] hover:text-white px-10 py-5 rounded-2xl font-semibold transition-all"
                >
                  Join Clanzo Beta
                </motion.button>
              </div>

              <div className="flex justify-center lg:justify-start gap-10 text-center">
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-gray-400 text-sm">Beta tester</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-gray-400 text-sm">Early Supporters</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-gray-400 text-sm">Verified</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Clean Video Mockup (Auto-play, no controls) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative max-w-[340px] w-full">
                {/* Simple Phone Frame */}
                <div className="bg-black rounded-3xl p-4 shadow-2xl border border-black">
                  <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-[9/19]">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      poster="/api/placeholder/340/680"
                    >
                      <source src="/your-mockup-video.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2️⃣ FEATURES SECTION - Lighter */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#9F56EC]/10 border border-[#9F56EC]/30 rounded-full px-6 py-3 text-[#9F56EC] text-sm font-medium mb-6">
              ✨ FEATURES
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Campus Life, <span className="bg-gradient-to-r from-[#9F56EC] to-[#7B3FE4] bg-clip-text text-transparent">Simplified</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Everything you need to make the most of your college experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart size={28} />, title: "Match & Connect", desc: "Find classmates with similar interests and vibes." },
              { icon: <MessageCircle size={28} />, title: "Chat Rooms", desc: "Campus groups, clubs, and friend circles — all secure." },
              { icon: <Star size={28} />, title: "Clanzo Points", desc: "Earn XP for being active and helping others." },
              { icon: <Users size={28} />, title: "Smart Profiles", desc: "Showcase your skills and join communities." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 hover:border-[#9F56EC]/40 transition-all group"
              >
                <div className="w-14 h-14 bg-[#9F56EC]/10 rounded-2xl flex items-center justify-center mb-6 text-[#9F56EC] group-hover:scale-110 transition">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#9F56EC] transition">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ WHY CLANZO + BETA SECTION (kept clean) */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-transparent to-[#1a0f2e]/20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16">
            Why <span className="bg-gradient-to-r from-[#9F56EC] to-[#7B3FE4] bg-clip-text text-transparent">Clanzo</span>?
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {["Build Real Connections", "Campus Exclusive", "Safer & Private", "Modern UI", "Completely Free", "Verified Only"].map((t, i) => (
              <div key={i} className="text-xl text-gray-300">
                ✅ {t}
              </div>
            ))}
          </div>

          {/* Beta Waitlist */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#9F56EC]/10 to-[#7B3FE4]/10 rounded-3xl p-12 border border-[#9F56EC]/30"
          >
            <div className="bg-[#9F56EC] text-white inline-block px-6 py-3 rounded-full font-medium mb-6">
              🚀 LIMITED BETA ACCESS
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              Be Among the First 50 Students
            </h3>
            <p className="text-gray-300 text-lg mb-10">
              Get exclusive features + permanent founder badges
            </p>

            <div className="max-w-xl mx-auto space-y-6">
              <input
                type="email"
                placeholder="Your college email (.edu)"
                className="w-full bg-black/50 border-2 border-gray-700 rounded-2xl px-6 py-5 text-white placeholder-gray-400 focus:border-[#9F56EC] focus:outline-none transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#9F56EC] hover:bg-[#8a45e0] py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-[#9F56EC]/40"
              >
                <Mail size={24} />
                Join Beta Waitlist
              </motion.button>
              <p className="text-gray-400 text-sm">Only verified student emails accepted</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 text-center border-t border-gray-800">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#9F56EC] rounded-lg flex items-center justify-center">
            <Zap size={18} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#9F56EC] to-[#7B3FE4] bg-clip-text text-transparent">
            CLANZO
          </span>
        </div>
        <p className="text-gray-500 text-sm">© 2024 Clanzo • Made for students 💜</p>
      </footer>
    </div>
  );
}