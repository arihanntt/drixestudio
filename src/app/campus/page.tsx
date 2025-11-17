"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Shield, HeartHandshake, Star, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full max-w-7xl px-4">
      {/* HERO SECTION */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity },
            }}
            className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-sky-400/20 blur-3xl rounded-full mx-auto w-96 h-96 -z-10"
          />
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-pink-600 to-sky-600 bg-clip-text text-transparent">
            Campus Connect
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Where campus lives connect. Meet, collaborate, and grow together in your college ecosystem.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl flex items-center justify-center space-x-3 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Create Profile</span>
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

      {/* FEATURES GRID */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
      >
        {[
          {
            icon: <Users className="text-pink-500" size={32} />,
            title: "Verified Network",
            desc: "Exclusive to verified college students with official email IDs",
            gradient: "from-pink-400/20 to-pink-500/20",
            color: "text-pink-500",
          },
          {
            icon: <Calendar className="text-sky-500" size={32} />,
            title: "Campus Events",
            desc: "Discover and create events, fests, and activities",
            gradient: "from-sky-400/20 to-sky-500/20",
            color: "text-sky-500",
          },
          {
            icon: <Shield className="text-emerald-500" size={32} />,
            title: "Safe Space",
            desc: "Secure environment moderated by campus authorities",
            gradient: "from-emerald-400/20 to-emerald-500/20",
            color: "text-emerald-500",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-pink-200 rounded-3xl p-6 text-center shadow-2xl cursor-pointer transition-all duration-500`}
          >
            <motion.div
              className={`w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mx-auto mb-6 ${feature.color}`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* PREMIUM SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-r from-pink-400/20 to-sky-400/20 backdrop-blur-sm border border-pink-300 rounded-3xl p-6 md:p-12 mb-20 text-center shadow-2xl overflow-hidden"
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
        <motion.div whileHover={{ scale: 1.1, rotate: 360 }} className="flex justify-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-pink-400 to-sky-400 rounded-3xl flex items-center justify-center shadow-2xl">
            <HeartHandshake size={28} className="text-white" />
          </div>
        </motion.div>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
          Campus Connect Premium
        </h2>
        <p className="text-base md:text-xl text-slate-700 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Unlock intelligent matching algorithms that connect you with like-minded peers. Find study
          partners, project collaborators, and build meaningful campus relationships.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 114, 182, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300 w-full sm:w-auto"
        >
          <span className="flex items-center justify-center space-x-3">
            <Star size={20} />
            <span>Unlock Premium Features</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}