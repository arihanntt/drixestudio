'use client';

import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const navbarRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  // Enhanced scroll effects
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);
  const backgroundBlur = useTransform(scrollY, [0, 100], [8, 16]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = pathname.split('/')[1] || 'home';
    setActiveLink(currentPath);
  }, [pathname]);

  const navLinks = [
    { label: "PLANS", path: "/plans", icon: "💸", color: "from-indigo-400 to-purple-500" },
    { label: "WHY US", path: "/whyus", icon: "🌟", color: "from-amber-400 to-orange-500" },
    { label: "FAQ", path: "/faq", icon: "❓", color: "from-blue-400 to-cyan-500" },
    { label: "BLOGS", path: "/blog", icon: "📚", color: "from-emerald-400 to-teal-500" },
    { label: "CONTACT", path: "/contact", icon: "📞", color: "from-pink-400 to-rose-500" },
    // Added Support link
    { 
      label: "SUPPORT", 
      path: "/support", 
      icon: "❤️", 
      color: "from-red-400 to-pink-500",
      special: true // Mark this as a special button
    },
  ];

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        ref={navbarRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: useTransform(
            scrollY,
            [0, 100],
            ['rgba(15, 15, 18, 0.85)', 'rgba(10, 10, 12, 0.95)']
          ),
          backdropFilter: backgroundBlur,
          borderBottom: useTransform(
            scrollY,
            [0, 100],
            ['1px solid rgba(255,255,255,0.05)', '1px solid rgba(255,255,255,0.1)']
          )
        }}
        className={`fixed top-0 inset-x-0 z-50 w-full px-4 py-3 flex items-center justify-between transition-all duration-500 ${
          mobileOpen ? "bg-gray-900/95" : ""
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navLinks.map(({ label, path, color, special }) => (
            <motion.button
              key={label}
              onHoverStart={() => setHoveredLink(label)}
              onHoverEnd={() => setHoveredLink(null)}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(path)}
              className={`relative px-5 py-3 text-sm font-semibold transition-all z-10 ${
                activeLink === path.slice(1) 
                  ? special
                    ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-lg"
                    : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  : special
                    ? "text-white bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-400/20 hover:border-red-400/30 rounded-lg"
                    : "text-gray-200 hover:text-white"
              }`}
            >
              {label}
              
              {activeLink === path.slice(1) && !special && (
                <motion.span 
                  layoutId="navActiveIndicator"
                  className="absolute left-0 right-0 bottom-1 h-[2px] bg-gradient-to-r via-80%"
                  style={{ background: `linear-gradient(to right, ${color.replace('from-', '').replace('to-', '').replace(' ', ', ')})` }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
          
          <AnimatePresence>
            {hoveredLink && !navLinks.find(link => link.label === hoveredLink)?.special && (
              <motion.div
                layoutId="hoverBg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-sm"
                style={{
                  width: '100px',
                  left: navLinks.findIndex(link => link.label === hoveredLink) * 100 + 'px'
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Optimized Logo for Mobile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        >
          <div className="relative whitespace-nowrap">
            {/* Responsive logo text */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none px-1">
              DRIXE STUDIO
            </h1>
            
            {/* Preserved hover effects */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"
              initial={{ opacity: 0 }}
            />
            
            {/* Preserved particle effects - reduced for mobile */}
            <div className="absolute -inset-2 overflow-hidden pointer-events-none">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: Math.random() * 30 - 15,
                    y: Math.random() * 30 - 15,
                    transition: {
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: Math.random() * 2
                    }
                  }}
                  className="absolute w-0.5 h-0.5 rounded-full bg-white"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden">
          <motion.button
            initial={false}
            animate={mobileOpen ? "open" : "closed"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 p-2 space-y-1.5"
            aria-label="Toggle Menu"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0, width: "20px" },
                open: { rotate: 45, y: 6, width: "20px" }
              }}
              className="block h-0.5 bg-white origin-center"
            />
            <motion.span
              variants={{
                closed: { opacity: 1, width: "20px" },
                open: { opacity: 0, width: 0 }
              }}
              className="block h-0.5 bg-white"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0, width: "20px" },
                open: { rotate: -45, y: -6, width: "20px" }
              }}
              className="block h-0.5 bg-white origin-center"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <MobileMenu
              setMobileOpen={setMobileOpen}
              activeLink={activeLink}
              navLinks={navLinks}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;