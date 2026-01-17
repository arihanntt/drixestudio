"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const NAV_HEIGHT = 72;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Why Us", path: "/whyus" },
    { label: "pricing", path: "/plans" },
    { label: "Inquiries", path: "/faq" },
  ];

  const services = [
    { label: "Discord Systems", path: "/discord-server-setup" },
    { label: "Web Architecture", path: "/website-design" },
    { label: "Content creation", path: "/social-media-content" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-zinc-900 py-0" 
            : "bg-transparent border-transparent py-2"
        }`}
        style={{ height: NAV_HEIGHT }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          
          {/* BRAND: Editorial Serif */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="h-3 w-3 bg-white transition-transform group-hover:rotate-45 duration-500" />
            <span className="text-xl font-serif italic tracking-tight text-white">
              Drixe Studio.
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10 h-full">
            
            <div className="flex items-center gap-8 h-full border-r border-zinc-800 pr-10">
              {/* SERVICES DROPDOWN */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                  Services
                  <ChevronDown size={10} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[80%] left-0 w-64 bg-[#0f0f0f] border border-zinc-900 shadow-2xl py-2"
                    >
                      {services.map((s) => (
                        <button
                          key={s.path}
                          onClick={() => router.push(s.path)}
                          className="block w-full px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:bg-white hover:text-black transition-all"
                        >
                          {s.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* NAV LINKS */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors ${
                    pathname === link.path ? "text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA: Sharp & Intentional */}
            <button
              onClick={() => router.push("/contact")}
              className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.4em] text-white"
            >
              <span className="border-b border-zinc-800 group-hover:border-white pb-1 transition-all">
                Start a Project
              </span>
              <span className="text-zinc-600 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </div>

          {/* MOBILE TRIGGER */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 items-end group"
          >
            <div className="h-px w-6 bg-white transition-all group-hover:w-4" />
            <div className="h-px w-4 bg-white transition-all group-hover:w-6" />
          </button>
        </nav>
      </header>

      {mobileOpen && <MobileMenu setMobileOpen={setMobileOpen} />}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </>
  );
}