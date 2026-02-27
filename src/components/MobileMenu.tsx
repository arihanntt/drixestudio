"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleNav = (path: string) => {
    setIsOpen(false);
    if (pathname !== path) router.push(path);
  };

  const navLinks = [
    { label: "Why Us", path: "/whyus", num: "01" },
    { label: "Pricing", path: "/plans", num: "02" },
    { label: "Inquiries", path: "/faq", num: "03" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[999]"
        >
          {/* Dark Backdrop Dimmer */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-crosshair"
            onClick={() => setIsOpen(false)}
          />

          {/* RIGHT SLIDING PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full md:w-[500px] xl:w-[600px] bg-[#050505] border-l border-white/10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header / Close Button */}
            <div className="flex items-center justify-between p-6 md:p-12 border-b border-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                Navigation
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="group flex flex-col gap-[6px] p-2"
              >
                {/* Custom X Icon using pure CSS lines */}
                <div className="h-[2px] w-8 bg-white rotate-45 translate-y-[4px] group-hover:bg-white/50 transition-colors" />
                <div className="h-[2px] w-8 bg-white -rotate-45 -translate-y-[4px] group-hover:bg-white/50 transition-colors" />
              </button>
            </div>

            {/* MAIN DIRECTORY */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-12">
              <nav className="flex flex-col gap-10 md:gap-14">
                
                {/* HOME */}
                <button
                  onClick={() => handleNav("/")}
                  className="flex items-baseline gap-6 group w-fit"
                >
                  <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-white/30">
                    00
                  </span>
                  <span className="text-[10vw] md:text-6xl font-black uppercase tracking-tighter text-white group-hover:text-white/50 transition-colors">
                    Home
                  </span>
                </button>

                {/* SERVICES ACCORDION */}
                <div className="flex flex-col gap-6">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-baseline gap-6 group w-fit"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-white/30">
                      ++
                    </span>
                    <span className="text-[10vw] md:text-6xl font-black uppercase tracking-tighter text-white group-hover:text-white/50 transition-colors flex items-center gap-4">
                      Services
                      <ChevronDown size={24} className={`transition-transform duration-500 opacity-50 ${servicesOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6 pl-[15%] md:pl-16 border-l border-white/10 ml-[10px] overflow-hidden"
                      >
                        <div className="pt-2 pb-4 flex flex-col gap-6">
                          {[
                            { l: "Web Architecture", p: "/website-design" },
                            { l: "Discord Systems", p: "/discord-server-setup" },
                            { l: "Content Production", p: "/social-media-content" },
                          ].map((s) => (
                            <button
                              key={s.p}
                              onClick={() => handleNav(s.p)}
                              className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors text-left"
                            >
                              {s.l}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* OTHER LINKS */}
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className="flex items-baseline gap-6 group w-fit"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-white/30">
                      {link.num}
                    </span>
                    <span className="text-[10vw] md:text-6xl font-black uppercase tracking-tighter text-white group-hover:text-white/50 transition-colors">
                      {link.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* BOTTOM CTA */}
            <div className="p-8 md:p-12 border-t border-white/5 bg-white/5">
              <button
                onClick={() => handleNav("/contact")}
                className="w-full border border-white px-6 py-6 text-sm font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Initialize Project
              </button>

              <div className="mt-8 text-[9px] tracking-[0.3em] text-white/30 uppercase flex justify-between">
                <span>© Drixe Studio</span>
                <span>Digital Systems</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;