"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 text-white">
      
      {/* TOP */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Drixe
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Studio
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-sm">
            We build high-performance websites, Discord servers, and
            content systems for creators, startups, and online brands.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-white/80">
            Services
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/discord-server-setup"
                className="text-white/60 hover:text-white transition"
              >
                Discord Server Setup
              </Link>
            </li>

            <li>
              <Link
                href="/website-design"
                className="text-white/60 hover:text-white transition"
              >
                Website & Landing Pages
              </Link>
            </li>

            <li>
              <Link
                href="/social-media-content"
                className="text-white/60 hover:text-white transition"
              >
                Social Media Content
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-white/80">
            Company
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/whyus" className="text-white/60 hover:text-white transition">
                Why Us
              </Link>
            </li>

            <li>
              <Link href="/plans" className="text-white/60 hover:text-white transition">
                Plans & Pricing
              </Link>
            </li>

            <li>
              <Link href="/faq" className="text-white/60 hover:text-white transition">
                FAQ
              </Link>
            </li>

            <li>
              <Link href="/blog" className="text-white/60 hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-white/80">
            Contact
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <a
                href="https://wa.me/917889386542"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                WhatsApp
              </a>
            </li>

            <li>
              <a
                href="https://discord.com/users/928934131893686292"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Discord (drixeeee)
              </a>
            </li>

            <li>
              <a
                href="https://t.me/drixe1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Drixe Studio. All rights reserved.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-white/40"
          >
            Built for speed, clarity, and conversion.
          </motion.p>

        </div>
      </div>
    </footer>
  );
}
