"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Handle scroll for the minimal header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HYBRID LOCK: Stop Lenis + Lock Native Body
  useEffect(() => {
    if (menuOpen) {
      (window as any).toggleLenis?.("stop");
      document.body.style.overflow = "hidden"; // Backup for mobile
    } else {
      (window as any).toggleLenis?.("start");
      document.body.style.overflow = "auto";
    }
    
    // Cleanup to ensure we never get permanently locked
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const coreServices = [
    { label: "Website Development", path: "/website-design", number: "01" },
    { label: "Discord Server Setup", path: "/discord-server-setup", number: "02" },
    { label: "Content Production", path: "/social-media-content", number: "03" },
  ];

  const studioLinks = [
    { label: "Why Us", path: "/whyus" },
    { label: "Pricing", path: "/plans" },
    { label: "Faq", path: "/faq" },
  ];

  return (
    <>
      {/* --- MINIMALIST HEADER --- */}
      <motion.header
        initial={false}
        animate={{
          height: isScrolled ? 80 : 100,
          backgroundColor: isScrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/5 hidden md:block" />
          <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/5 hidden md:block" />
        </div>

        <nav className="relative mx-auto h-full w-full max-w-[120rem] px-6 md:px-12 xl:px-32 flex items-center justify-between">
          
          <div className="w-1/3 flex justify-start">
            <button
              onClick={() => router.push("/contact")}
              className="hidden md:block text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-white/60 transition-colors"
            >
              [ Contact ]
            </button>
          </div>

          <div className="w-1/3 flex justify-center">
            <Link href="/" className="text-xl md:text-2xl font-black tracking-[0.35em] text-white whitespace-nowrap">
              DRIXE<span className="text-white/30 ml-1">STUDIO</span>
            </Link>
          </div>

          <div className="w-1/3 flex justify-end">
            <button 
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-4"
            >
              <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-white/60 transition-colors">
                Menu
              </span>
              <div className="flex flex-col gap-[6px] items-end">
                <div className="h-[2px] w-8 bg-white transition-all duration-300 group-hover:w-6" />
                <div className="h-[2px] w-6 bg-white transition-all duration-300 group-hover:w-8" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* --- THE UNIVERSAL DRAWER --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] cursor-crosshair"
            />

            {/* The Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-[100dvh] w-full md:w-[500px] xl:w-[600px] bg-[#050505] border-l border-white/10 z-[999] flex flex-col overflow-hidden"
            >
              
              {/* Drawer Header - FIXED TOP */}
              <div className="flex items-center justify-between p-6 md:p-12 border-b border-white/5 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  Navigation
                </span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-white/50 transition-colors flex items-center gap-2"
                >
                  [ Close ]
                </button>
              </div>

              {/* Drawer Content - SCROLLABLE MIDDLE (Fixed for Lenis) */}
              <div 
                className="flex flex-col px-6 py-12 md:px-12 flex-1 overflow-y-auto overscroll-contain"
                data-lenis-prevent="true" // <--- THIS FIXES THE BUG
              >
                
                {/* Core Services */}
                <div className="mb-16">
                  <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-b border-white/5 pb-4">
                    Services
                  </span>
                  <div className="flex flex-col gap-6">
                    {coreServices.map((service, i) => (
                      <motion.div
                        key={service.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link 
                          href={service.path}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-baseline gap-4 w-fit"
                        >
                          <span className="text-xs font-mono text-white/30">{service.number}</span>
                          <span className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/30 transition-all duration-300">
                            {service.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Studio Links */}
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-b border-white/5 pb-4">
                    Drixe Studio
                  </span>
                  <div className="flex flex-col gap-4">
                    {studioLinks.map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link 
                          href={link.path}
                          onClick={() => setMenuOpen(false)}
                          className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors w-fit"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer / CTA - FIXED BOTTOM */}
              <div className="p-6 md:p-12 border-t border-white/5 bg-white/5 shrink-0">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/contact");
                  }}
                  className="w-full flex items-center justify-between group"
                >
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-white">
                    Start a Project
                  </span>
                  <span className="text-white group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}