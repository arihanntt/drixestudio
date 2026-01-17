"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const NAV_HEIGHT = 72;
interface MobileMenuProps {
  setMobileOpen: (value: boolean) => void;
}

const MobileMenu = ({ setMobileOpen }: MobileMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleNav = (path: string) => {
    setMobileOpen(false);
    if (pathname !== path) router.push(path);
  };

  const navLinks = [
    { label: "Why Us", path: "/whyus", num: "01" },
    { label: "Engagements", path: "/plans", num: "02" },
    { label: "Inquiries", path: "/faq", num: "03" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 md:hidden"
      >
        {/* Backdrop: Solid & Dark */}
        <div
          className="absolute inset-0 bg-black/95"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-full bg-[#0a0a0a] border-l border-zinc-900 flex flex-col pt-24 pb-12 px-8"
        >
          {/* TOP SECTION: DIRECTORY */}
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-12 block">
              Directory
            </span>

            <nav className="flex flex-col gap-10">
              {/* HOME LINK */}
              <button
                onClick={() => handleNav("/")}
                className="flex items-baseline gap-4 group"
              >
                <span className="font-mono text-[9px] text-zinc-700 group-hover:text-white transition-colors">00</span>
                <span className={`text-3xl font-serif italic ${pathname === "/" ? "text-white" : "text-zinc-500"}`}>
                  Home
                </span>
              </button>

              {/* SERVICES DROPDOWN (Manual Override for mobile clarity) */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-baseline justify-between group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[9px] text-zinc-700 group-hover:text-white transition-colors">++</span>
                    <span className="text-3xl font-serif italic text-zinc-500 group-hover:text-white transition-colors">
                      Services
                    </span>
                  </div>
                  <span className="text-zinc-700 text-lg font-light">{servicesOpen ? "−" : "+"}</span>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-5 pl-12 border-l border-zinc-900"
                    >
                      {[
                        { l: "Discord Architecture", p: "/discord-server-setup" },
                        { l: "Web Development", p: "/website-design" },
                        { l: "Content Systems", p: "/social-media-content" },
                      ].map((s) => (
                        <button
                          key={s.p}
                          onClick={() => handleNav(s.p)}
                          className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600 text-left hover:text-white"
                        >
                          {s.l}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* NAV LINKS */}
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="font-mono text-[9px] text-zinc-700 group-hover:text-white transition-colors">{link.num}</span>
                  <span className={`text-3xl font-serif italic ${pathname === link.path ? "text-white" : "text-zinc-500"} group-hover:text-white transition-colors`}>
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* BOTTOM SECTION: CTA & FOOTER */}
          <div className="mt-auto pt-12 border-t border-zinc-900">
            <button
              onClick={() => handleNav("/contact")}
              className="w-full bg-white text-black py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-colors"
            >
              Start a Project
            </button>
            
            <div className="mt-8 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-zinc-700">
              <p>© Drixe Studio</p>
              <p>Systems_Online</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;