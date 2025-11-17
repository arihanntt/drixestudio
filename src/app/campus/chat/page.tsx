"use client";
import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="w-full max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-pink-600 bg-clip-text text-transparent">
          Campus Connect Chat
        </h1>
        <p className="text-lg md:text-xl text-slate-700">Real-time messaging - Connect faster than ever!</p>
      </motion.div>
      
      <div className="bg-gradient-to-br from-white/60 to-pink-50/60 backdrop-blur-sm border border-pink-200 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-white/80 border-b border-pink-200 p-4 md:p-6">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-2xl flex items-center justify-center text-xl md:text-2xl">
              👩‍💻
            </div>
            <div>
              <h3 className="text-slate-800 font-semibold text-sm md:text-base">Aditi Sharma</h3>
              <p className="text-emerald-600 text-xs md:text-sm">Online - Typing...</p>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="h-80 md:h-96 p-4 md:p-6 space-y-4 overflow-y-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-start">
            <div className="bg-sky-400/20 backdrop-blur-sm rounded-3xl rounded-bl-none p-3 md:p-4 max-w-xs md:max-w-md">
              <p className="text-slate-800 text-sm md:text-base">
                Hey! Are you joining the study group tomorrow? We're working on the AI project.
              </p>
              <span className="text-sky-600 text-xs mt-2 block">2:30 PM</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end"
          >
            <div className="bg-pink-400/20 backdrop-blur-sm rounded-3xl rounded-br-none p-3 md:p-4 max-w-xs md:max-w-md">
              <p className="text-slate-800 text-sm md:text-base">
                Yes! I've completed the data preprocessing part. What time are we meeting?
              </p>
              <span className="text-pink-600 text-xs mt-2 block">2:31 PM</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-start"
          >
            <div className="bg-sky-400/20 backdrop-blur-sm rounded-3xl rounded-bl-none p-3 md:p-4 max-w-xs md:max-w-md">
              <p className="text-slate-800 text-sm md:text-base">
                Let's meet at 3 PM in the central library. I'll bring the research papers!
              </p>
              <span className="text-sky-600 text-xs mt-2 block">2:32 PM</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <span className="bg-white/60 text-slate-600 text-xs px-3 py-1 rounded-full">Today</span>
          </motion.div>
        </div>
        
        {/* Input */}
        <div className="border-t border-pink-200 p-4 md:p-6">
          <div className="flex space-x-3 md:space-x-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-white/60 border border-pink-200 rounded-2xl px-4 md:px-6 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-all text-sm md:text-base"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all"
            >
              <Send size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}