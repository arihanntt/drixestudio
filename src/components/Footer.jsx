"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/20 bg-black pt-20 pb-10 font-mono text-zinc-400">
      
      {/* --- RETRO BACKGROUND GRID --- */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
             linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/20 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* BRAND COLUMN */}
          <div className="flex flex-col gap-6">
            <div>
                <h2 className="flex items-center gap-2 text-xl font-bold uppercase tracking-tighter text-white">
                  <div className="h-4 w-4 bg-white" />
                  Drixe_Studio
                </h2>
                <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-green-500">
                    <span className="h-1.5 w-1.5 animate-pulse bg-green-500 rounded-full" />
                    System_Online
                </div>
            </div>

            <p className="max-w-xs text-xs leading-relaxed text-zinc-500">
              We build high-performance websites, Discord servers, and
              content systems for creators. <br />
              <span className="text-zinc-300">Engineered for scale.</span>
            </p>
          </div>

          {/* SERVICES COLUMN */}
          <div>
            <h3 className="mb-6 border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-widest text-white">
              [ Directory: Services ]
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/discord-server-setup" className="group flex items-center gap-2 hover:text-green-500 transition-colors">
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">{`>`}</span>
                  Discord_Server_Setup
                </Link>
              </li>
              <li>
                <Link href="/website-design" className="group flex items-center gap-2 hover:text-green-500 transition-colors">
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">{`>`}</span>
                  Web_Architecture
                </Link>
              </li>
              <li>
                <Link href="/social-media-content" className="group flex items-center gap-2 hover:text-green-500 transition-colors">
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">{`>`}</span>
                  Content_Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY COLUMN */}
          <div>
            <h3 className="mb-6 border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-widest text-white">
              [ Directory: Company ]
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/whyus" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-zinc-600 group-hover:text-white">01.</span> Why_Us
                </Link>
              </li>
              <li>
                <Link href="/plans" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-zinc-600 group-hover:text-white">02.</span> Plans_&_Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-zinc-600 group-hover:text-white">03.</span> Database_FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-zinc-600 group-hover:text-white">04.</span> Dev_Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div>
            <h3 className="mb-6 border-b border-white/20 pb-2 text-xs font-bold uppercase tracking-widest text-white">
              [ Comms_Channels ]
            </h3>
            <ul className="space-y-4 text-xs">
              <li>
                <a
                  href="https://wa.me/917889386542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/10 bg-black px-4 py-3 transition-all hover:border-green-500 hover:text-green-500"
                >
                  <span>WhatsApp</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com/users/928934131893686292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/10 bg-black px-4 py-3 transition-all hover:border-indigo-500 hover:text-indigo-400"
                >
                  <span>Discord</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/drixe1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/10 bg-black px-4 py-3 transition-all hover:border-blue-400 hover:text-blue-400"
                >
                  <span>Telegram</span>
                  <span>↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center text-[10px] uppercase tracking-widest text-zinc-600">
          
          <p>
            © {new Date().getFullYear()} Drixe Studio // All_Rights_Reserved.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="hidden sm:inline">Status: Optimized</span>
            <span className="h-px w-8 bg-zinc-700 hidden sm:inline" />
            <span className="text-zinc-400">Built for speed & clarity.</span>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}