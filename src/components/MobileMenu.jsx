import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ setMobileOpen, onContactClick, currency, setCurrency }) => {
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

  return (
    <AnimatePresence>
      {/* 🔲 DARK BACKDROP BEHIND SIDEBAR */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
      />

      {/* 📱 SIDEBAR WITH BLUR BACKGROUND */}
      <motion.div
        key="menu"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.x < -100) setMobileOpen(false); // Swipe left to close
        }}
        className="fixed top-0 right-0 h-full w-64 sm:w-72 z-50 shadow-2xl px-6 py-6 flex flex-col bg-black/60 backdrop-blur-xl border-l border-white/10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-sm text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4 text-sm text-white font-medium">
          <li
            onClick={() => handleScroll("plans")}
            className="cursor-pointer hover:text-indigo-400 transition"
          >
            💸 Plans
          </li>
          <li
            onClick={() => {
              onContactClick();
              setMobileOpen(false);
            }}
            className="cursor-pointer hover:text-indigo-400 transition"
          >
            📞 Contact
          </li>
          <li>
            <select
              className="w-full bg-[#1e1e1e]/80 border border-gray-700 rounded-md p-2 text-white"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-10 text-xs text-center text-gray-400">
          Drixe Studio © {new Date().getFullYear()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
