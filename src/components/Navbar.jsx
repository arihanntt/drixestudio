import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

const Navbar = ({ currency, setCurrency, onContactClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currencies = ["INR", "USD", "EUR", "GBP", "AED", "CAD"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop Blur when Mobile Menu is Open */}
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

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-3 flex items-center justify-between border-b ${
          scrolled ? "border-gray-800 shadow-md backdrop-blur-lg bg-[#111]/80" : "border-transparent bg-[#111]/70"
        }`}
      >
        {/* Logo */}
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Drixe Studio
        </motion.h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          {[{ label: "Plans", scrollTo: "plans" }].map(({ label, scrollTo }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById(scrollTo);
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
              className="group relative text-sm font-semibold text-gray-300 hover:text-white transition"
            >
              {label}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-pink-500 transition-all duration-300" />
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            className="group relative text-sm font-semibold text-gray-300 hover:text-white transition"
          >
            Contact
            <span className="absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-pink-400 to-indigo-500 transition-all duration-300" />
          </motion.button>

          <select
            className="bg-[#1e1e1e] border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-xl z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <MobileMenu
              setMobileOpen={setMobileOpen}
              onContactClick={onContactClick}
              currency={currency}
              setCurrency={setCurrency}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
