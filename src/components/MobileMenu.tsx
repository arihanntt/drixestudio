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

  const handleWhatsApp = () => {
    setMobileOpen(false);
    window.open(
      "https://wa.me/917889386542?text=Hi%20Drixe%20Studio%2C%20I%20want%20to%20start%20a%20project",
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 md:hidden"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu Panel */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ top: NAV_HEIGHT }}
          className="absolute inset-x-0 bg-black/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">

            {/* HOME */}
            <button
              onClick={() => handleNav("/")}
              className="text-lg font-medium text-white/80 hover:text-white"

            >
              Home
            </button>

            {/* SERVICES DROPDOWN */}
            <div>
  <button
    onClick={() => setServicesOpen(!servicesOpen)}
    className="relative w-full text-center text-lg font-medium text-white/80 hover:text-white"
  >
    Services
    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-white/60">
      {servicesOpen ? "−" : "+"}
    </span>
  </button>


              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 flex flex-col gap-3 pl-4"
                  >
                    <button
                      onClick={() => handleNav("/discord-server-setup")}
                      className="text-sm text-white/60 hover:text-white"
                    >
                      Discord Server Setup
                    </button>
                    <button
                      onClick={() => handleNav("/website-design")}
                      className="text-sm text-white/60 hover:text-white"
                    >
                      Website & Landing Pages
                    </button>
                    <button
                      onClick={() => handleNav("/social-media-content")}
                      className="text-sm text-white/60 hover:text-white"
                    >
                      Social Media Content
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WHY US */}
            <button
              onClick={() => handleNav("/why-us")}
              className="text-left text-lg font-medium text-white/80 hover:text-white"
            >
              Why Us
            </button>

            {/* PLANS */}
            <button
              onClick={() => handleNav("/plans")}
              className="text-left text-lg font-medium text-white/80 hover:text-white"
            >
              Plans
            </button>

            {/* FAQ */}
            <button
              onClick={() => handleNav("/faq")}
              className="text-left text-lg font-medium text-white/80 hover:text-white"
            >
              FAQ
            </button>

            {/* DIVIDER */}
            <div className="h-px bg-white/10" />

            {/* CTA → WHATSAPP */}
            <button
              onClick={handleWhatsApp}
              className="
                w-full rounded-full
                bg-gradient-to-r from-violet-500 to-indigo-500
                px-6 py-3 text-sm font-medium text-white
                hover:opacity-90 transition
              "
            >
              Start a Project
            </button>

            {/* FOOTER */}
            <p className="text-center text-xs text-white/40">
              © {new Date().getFullYear()} Drixe Studio
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
