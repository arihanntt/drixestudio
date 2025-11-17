"use client";
import React from "react";
import { motion } from "framer-motion";
import { QrCode, Zap, Users, Calendar, Shield } from "lucide-react";

export default function GetAppPage() {
  return (
    <div className="w-full max-w-4xl px-4 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-slate-800 to-pink-600 bg-clip-text text-transparent">
          Get Campus Connect
        </h1>
        <p className="text-lg md:text-2xl text-slate-700 mb-6 md:mb-8">Start Your Campus Journey Today!</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* QR */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="bg-white p-6 md:p-8 rounded-3xl inline-block shadow-2xl"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-pink-400 via-sky-400 to-emerald-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"
              />
              <div className="text-center text-white relative z-10">
                <QrCode size={36} className="mx-auto mb-2 md:mb-3" />
                <p className="font-bold text-base md:text-lg">CAMPUS CONNECT</p>
                <p className="text-xs md:text-sm opacity-90">Scan to Download</p>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent"
          >
            SCAN TO START CONNECTING
          </motion.p>
        </motion.div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-left space-y-4 md:space-y-6"
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Why Download Campus Connect?</h3>
          {[
            { icon: <Zap className="text-amber-500" size={20} />, text: "Instant campus notifications" },
            { icon: <Users className="text-pink-500" size={20} />, text: "Connect with peers instantly" },
            { icon: <Calendar className="text-emerald-500" size={20} />, text: "Never miss campus events" },
            { icon: <Shield className="text-sky-500" size={20} />, text: "Secure verified network" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 md:p-4 bg-white/60 rounded-2xl hover:bg-white/80 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/80 rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="text-slate-700 text-sm md:text-lg">{feature.text}</span>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white py-4 md:py-5 rounded-2xl text-lg md:text-xl font-bold shadow-2xl transition-all duration-300 mt-4 md:mt-6"
          >
            Download Now - It's Free!
          </motion.button>
        </motion.div>
      </div>
      
      {/* Store badges */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 md:mt-12"
      >
        {["Play Store", "App Store", "Web App"].map((store, index) => (
          <motion.div
            key={store}
            whileHover={{ scale: 1.1, y: -5 }}
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-pink-300 px-6 py-3 rounded-2xl cursor-pointer transition-all duration-300 text-center"
          >
            <span className="text-slate-800 font-semibold text-sm md:text-base">Download on {store}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}