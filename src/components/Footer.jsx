import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900 bg-[#0a0a0a] pt-20 pb-10 text-zinc-400 selection:bg-zinc-800 selection:text-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* TOP SECTION: CONCRETE VALUE & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xl">
            <h2 className="text-xl font-serif italic text-white mb-4 tracking-tight">
              Drixe Studio.
            </h2>
            <p className="text-base font-light leading-relaxed text-zinc-400">
              We design and build high-performance websites and scalable community systems for online brands. 
              <span className="block text-zinc-500 mt-2">Strategy, architecture, and execution — handled end-to-end.</span>
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-5">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Bottom-of-page intent</span>
             <Link href="/contact" className="group text-lg font-serif italic text-white border-b border-zinc-800 hover:border-white transition-all duration-300 flex items-center gap-4">
                Discuss your project
                <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
             </Link>
          </div>
        </div>

        {/* SEO-OPTIMIZED DIRECTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-12 border-t border-zinc-900/50 pt-12 pb-16 font-sans">
          
          {/* SERVICES (Keyword-bearing labels) */}
          <div>
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Services
            </h3>
            <ul className="space-y-3 text-xs font-medium tracking-widest uppercase">
              <li>
                <Link href="/discord-server-setup" className="hover:text-white transition-colors">
                  Community Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/website-design" className="hover:text-white transition-colors">
                  Web Architecture
                </Link>
              </li>
              <li>
                <Link href="/social-media-content" className="hover:text-white transition-colors">
                  Content Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Company
            </h3>
            <ul className="space-y-3 text-xs font-medium tracking-widest uppercase">
              <li><Link href="/whyus" className="hover:text-white transition-colors">Why Us</Link></li>
              <li><Link href="/plans" className="hover:text-white transition-colors">Plans & Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Client FAQ</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-xs font-medium tracking-widest uppercase">
              <a href="mailto:hello@drixe.studio" className="hover:text-white transition-colors lowercase font-sans tracking-normal text-[13px]">hello@drixe.studio</a>
              <a href="https://wa.me/917889386542" target="_blank" rel="noopener" className="hover:text-white transition-colors">WhatsApp ↗</a>
              <a href="https://t.me/drixe1" target="_blank" rel="noopener" className="hover:text-white transition-colors">Telegram ↗</a>
            </div>
          </div>

          {/* LOCATION/TRUST */}
          <div className="lg:text-right flex flex-col justify-between h-full py-0.5">
             
             <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mt-4 lg:mt-0">
                © {currentYear} Drixe Studio
             </div>
          </div>
        </div>

        {/* BOTTOM BAR: LEGAL & CREDITS */}
        <div className="pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-700 font-medium">
            <Link href="/privacy" className="hover:text-zinc-400">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-400">Terms</Link>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 italic font-serif">
                Built for speed & clarity
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}