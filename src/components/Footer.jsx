"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/10">
      
      {/* --- THE MASTER GRID LINES (Locks to the entire site) --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- TOP SECTION: MASSIVE BRAND & FINAL CTA --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
          
          <div className="max-w-2xl">
            <h2 className="text-[15vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6">
              DRIXE<span className="text-cyan-500">.</span>
            </h2>
            <p className="text-base md:text-lg font-medium text-white/60 max-w-md leading-relaxed">
              Custom website development, Discord server setup, and social media content for growing brands.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-6 bg-white/5 border border-white/10 p-8 md:p-10 w-full lg:w-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Ready to start?
            </span>
            <Link 
              href="/contact" 
              className="group flex items-center justify-center bg-white px-8 py-4 hover:bg-cyan-400 transition-colors duration-300 w-full md:w-auto"
            >
              <span className="text-xs font-black uppercase tracking-[0.3em] text-black transition-colors duration-300">
                Contact Our Team
              </span>
            </Link>
          </div>
        </div>

        {/* --- SEO-OPTIMIZED DIRECTORY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-16 pb-20">
          
          {/* SERVICES */}
          <div>
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Our Services
            </h3>
            <ul className="space-y-4 text-xs font-bold tracking-[0.15em] uppercase text-white/70">
              <li>
                <Link href="/website-design" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">■</span>
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/discord-server-setup" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">■</span>
                  Discord Server Setup
                </Link>
              </li>
              <li>
                <Link href="/social-media-content" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">■</span>
                  Social Media Content
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Company
            </h3>
            <ul className="space-y-4 text-xs font-bold tracking-[0.15em] uppercase text-white/70">
              <li><Link href="/whyus" className="hover:text-cyan-400 transition-colors">Why Choose Us</Link></li>
              <li><Link href="/plans" className="hover:text-cyan-400 transition-colors">Pricing & Packages</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">Common Questions</Link></li>
            </ul>
          </div>

          {/* DIRECT CONTACT */}
          <div>
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Direct Contact
            </h3>
            <div className="flex flex-col gap-5 text-xs font-bold tracking-[0.15em] uppercase text-white/70">
              <a href="mailto:hello@drixe.studio" className="hover:text-cyan-400 transition-colors normal-case tracking-normal text-base">
                hello@drixe.studio
              </a>
              <div className="flex gap-6 mt-2">
                <a href="https://wa.me/917889386542" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  WhatsApp ↗
                </a>
                <a href="https://t.me/drixe1" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  Telegram ↗
                </a>
              </div>
            </div>
          </div>

          {/* LOCATION / TRUST */}
          <div className="lg:text-right flex flex-col justify-start">
             <h3 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Location
            </h3>
             <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/70 leading-relaxed">
               Operating Globally <br />
               Based in India
             </p>
          </div>

        </div>

        {/* --- BOTTOM BAR: LEGAL & CREDITS --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            © {currentYear} Drixe Studio. All rights reserved.
          </div>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}