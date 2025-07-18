"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const dropdownVariants = {
  hidden: { opacity: 0, y: -20, scaleY: 0.95, transformOrigin: "top" },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transformOrigin: "top",
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -20,
    scaleY: 0.95,
    transformOrigin: "top",
    transition: { duration: 0.2 },
  },
};

const MobileMenu = ({ setMobileOpen, onContactClick, currency, setCurrency }) => {
  const router = useRouter();
  const pathname = usePathname();

  const currencies = ["INR", "USD", "EUR", "GBP", "AED", "CAD"];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  const handleNavigation = (path, sectionId = null) => {
    if (pathname !== path) {
      router.push(path);
      setMobileOpen(false);
      if (sectionId) {
        setTimeout(() => handleScroll(sectionId), 600); // Give time for DOM to load
      }
    } else {
      if (sectionId) handleScroll(sectionId);
      setMobileOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="dropdown"
        variants={dropdownVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-[65.1px] left-0 w-full z-50 md:hidden"
      >
        <div className="w-full rounded-b-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg px-6 py-6">
          <ul className="space-y-5 text-base text-white font-semibold text-center">
            <li
              onClick={() => handleNavigation("/plans")}
              className="cursor-pointer hover:text-indigo-400 transition"
            >
              💸 PLANS
            </li>
            <li
              onClick={() => handleNavigation("/whyus")}
              className="cursor-pointer hover:text-purple-400 transition"
            >
              🌟 WHY US
            </li>
            <li
              onClick={() => handleNavigation("/faq")}
              className="cursor-pointer hover:text-blue-400 transition"
            >
              ❓ FAQ
            </li>
            <li
              onClick={() => handleNavigation("/blog")}
              className="cursor-pointer hover:text-yellow-400 transition"
            >
              📚 BLOGS
            </li>
            <li
              onClick={() => handleNavigation("/contact")}
              className="cursor-pointer hover:text-indigo-400 transition"
            >
              📞 CONTACT
            </li>

            {/* Currency selector only on homepage */}
            {pathname === "/" && (
              <li>
                <select
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-md p-2 text-white text-center hover:border-indigo-500 transition-all duration-300"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur} className="bg-black text-white">
                      {cur}
                    </option>
                  ))}
                </select>
              </li>
            )}
          </ul>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Close Menu
            </button>
          </div>

          <div className="mt-8 text-xs text-center text-gray-500">
            Drixe Studio © {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
