'use client';

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ currency, setCurrency }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currencies = ["INR", "USD", "EUR", "GBP", "AED", "CAD"];

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-6 inset-x-0 mx-auto z-50 w-[95%] max-w-7xl px-6 py-5 rounded-2xl flex items-center justify-between backdrop-blur-lg border bg-white/5 shadow-lg transition-all duration-500
        ${
          mobileOpen
            ? "border-0 rounded-t-2xl rounded-b-none"
            : scrolled
            ? "border border-white/10 rounded-2xl"
            : "border border-transparent rounded-2xl"
        }`}
      >
        {/* Left: Navigation Buttons */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "PLANS", path: "/plans", gradient: "from-indigo-400 to-pink-500" },
            { label: "WHY US", path: "/whyus", gradient: "from-violet-400 to-purple-500" },
            { label: "FAQ", path: "/faq", gradient: "from-blue-400 to-indigo-500" },
            { label: "BLOGS", path: "/blog", gradient: "from-yellow-400 to-red-500" },
            { label: "CONTACT", path: "/contact", gradient: "from-pink-400 to-indigo-500" },
          ].map(({ label, path, gradient }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push(path)}
              className="group relative text-sm font-semibold text-gray-300 hover:text-white tracking-wide transition"
            >
              {label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${gradient} transition-all duration-300 rounded-full`}
              />
            </motion.button>
          ))}
        </div>

        {/* Center: Logo */}
        <div
          onClick={() => router.push("/")}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap cursor-pointer"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-widest bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent select-none">
            DRIXE STUDIO
          </h1>
        </div>

        {/* Right: Currency Selector + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {isHome && (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="hidden md:flex items-center bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-[6px] gap-2 text-gray-300 hover:border-indigo-500 transition-all duration-300"
            >
              <MdCurrencyExchange className="text-indigo-400 text-lg" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent outline-none text-sm uppercase"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur} className="bg-black text-white">
                    {cur}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-2xl z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <MobileMenu
              setMobileOpen={setMobileOpen}
              currency={currency}
              setCurrency={setCurrency}
              isHome={isHome}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
