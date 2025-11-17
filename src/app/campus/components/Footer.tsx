"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CampusFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="w-full max-w-7xl mt-20 py-12 px-4"
    >
      <div className="text-center space-y-6">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-pink-200 bg-clip-text text-transparent">
            CAMPUS CONNECT
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-black-300 text-lg"
        >
          The Future of Student Networking.
        </motion.p>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-6 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm">
            All Rights Reserved — 2025
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}