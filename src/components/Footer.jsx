'use client';

import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

const Footer = () => {
  const [submitting, setSubmitting] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const footerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("🎉 Subscription successful!");
      e.target.reset();
      setSubmitting(false);
    }, 1000);
  };

  const navLinks = [
    { label: "💼 PLANS", path: "/plans", color: "from-indigo-400 to-purple-500" },
    { label: "📩 CONTACT", path: "/contact", color: "from-blue-400 to-cyan-500" },
    { label: "💖 WHY US", path: "/whyus", color: "from-pink-400 to-rose-500" },
    { label: "⭐ BLOGS", path: "/blog", color: "from-pink-400 to-rose-500" },
    { label: "❓ FAQ", path: "/faq", color: "from-emerald-400 to-teal-500" }
  ];

  const socialLinks = [
    { label: "💬 Discord", url: "https://discord.com/users/928934131893686292", color: "#5865F2" },
    { label: "📱 Telegram", url: "https://t.me/darkxkid", color: "#26A5E4" },
    { label: "📧 Email", url: "mailto:drixebusiness@gmail.com", color: "#EA4335" }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative z-10 overflow-hidden text-white px-6 py-20 border-t border-neutral-800 bg-black"
    >
      {/* 🌌 Advanced Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base layers */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a20] to-black" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-[120px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.15,
            scale: 1,
            x: ["0%", "5%", "0%"],
            y: ["0%", "-5%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/20 to-teal-600/20 blur-[150px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.15,
            scale: 1,
            x: ["0%", "-5%", "0%"],
            y: ["0%", "5%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: 5
          }}
        />

        {/* Grid lines with animation */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-[0.03] mask-vignette pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.line 
              key={`h-${i}`} 
              x1="0" 
              y1={(i + 1) * 6.66} 
              x2="100" 
              y2={(i + 1) * 6.66} 
              stroke="white" 
              strokeWidth="0.15"
              initial={{ strokeDasharray: "0.5 0.5", strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.line 
              key={`v-${i}`} 
              y1="0" 
              x1={(i + 1) * 6.66} 
              y2="100" 
              x2={(i + 1) * 6.66} 
              stroke="white" 
              strokeWidth="0.15"
              initial={{ strokeDasharray: "0.5 0.5", strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, delay: i * 0.05 + 0.5 }}
            />
          ))}
        </motion.svg>
      </div>

      {/* 👁️ Vignette */}
      <style>{`
        .mask-vignette {
          mask-image: radial-gradient(circle at center, white 30%, transparent 90%);
          -webkit-mask-image: radial-gradient(circle at center, white 30%, transparent 90%);
        }
        .hover-gradient:hover {
          background-size: 200% 200%;
          background-position: 100% 100%;
        }
      `}</style>

      <Toaster position="top-center" />

      {/* Content */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        {/* Brand */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.h2 
            className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"
            whileHover={{ scale: 1.02 }}
          >
            Drixe Studio
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-sm leading-relaxed"
            whileHover={{ x: 5 }}
          >
            Helping creators grow since 2019. We build tools, bots, and experiences for Discord and beyond.
          </motion.p>
          
          {/* Particle effect on brand */}
          <div className="mt-6 relative">
            <div className="absolute -inset-2 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  initial={{ 
                    opacity: 0,
                    x: Math.random() * 40 - 20,
                    y: Math.random() * 40 - 20
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: Math.random() * 80 - 40,
                    y: Math.random() * 80 - 40,
                    transition: {
                      duration: Math.random() * 4 + 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: Math.random() * 2
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.h2 
            className="text-lg font-bold mb-6"
            whileHover={{ x: 5 }}
          >
            Navigation
          </motion.h2>
          <ul className="space-y-3">
            {navLinks.map(({ label, path, color }, i) => (
              <motion.li
                key={label}
                onMouseEnter={() => setHoveredLink(label)}
                onMouseLeave={() => setHoveredLink(null)}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.1 }
                  }
                }}
              >
                <Link href={path} className="group relative text-sm text-gray-400 hover:text-white transition duration-300">
                  <span className="relative z-10 flex items-center">
                    {label.split(' ')[0]} <span className="ml-2">{label.split(' ').slice(1).join(' ')}</span>
                  </span>
                  {hoveredLink === label && (
                    <motion.span 
                      layoutId="navHover"
                      className="absolute left-0 h-full w-[3px] rounded-full"
                      style={{ background: `linear-gradient(to bottom, ${color.replace('from-', '').replace('to-', '').replace(' ', ', ')})` }}
                      transition={{ type: "spring", bounce: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.h2 
            className="text-lg font-bold mb-6"
            whileHover={{ x: 5 }}
          >
            Connect
          </motion.h2>
          <div className="flex flex-col gap-3">
            {socialLinks.map(({ label, url, color }, i) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover-gradient`}
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}33 50%, transparent 100%)`,
                  backgroundSize: "150% 150%",
                  backgroundPosition: "0% 0%",
                  border: `1px solid ${color}33`
                }}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.1 }
                  }
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: `0 4px 15px -3px ${color}40`
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  {label.split(' ')[0]} <span>{label.split(' ').slice(1).join(' ')}</span>
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Subscribe */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.h2 
            className="text-lg font-bold mb-6"
            whileHover={{ x: 5 }}
          >
            Newsletter
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            whileInView={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
          >
            <motion.div
              className="relative"
              whileHover={{ y: -2 }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full bg-[#111] border border-gray-700 text-sm px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <motion.div 
                className="absolute inset-0 rounded-xl border border-purple-500/0 pointer-events-none"
                whileFocus={{
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={submitting}
              className={`relative overflow-hidden py-3 rounded-xl font-medium text-white transition-all ${
                submitting ? "bg-purple-700" : "bg-gradient-to-r from-purple-600 to-indigo-600"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {submitting ? "Submitting..." : "Subscribe Now"}
              </span>
              {!submitting && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Footer note */}
      <motion.div 
        className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>© {new Date().getFullYear()} Drixe Studio · All rights reserved.</p>
        <motion.p 
          className="mt-2 text-xs opacity-70"
          whileHover={{ scale: 1.05 }}
        >
          Crafted with ❤️ for the digital world
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;