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
    if (isInView) controls.start("visible");
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
    { label: "PLANS", path: "/plans", gradient: "from-indigo-400 to-purple-500" },
    { label: "CONTACT", path: "/contact", gradient: "from-blue-400 to-cyan-500" },
    { label: "WHY US", path: "/whyus", gradient: "from-pink-400 to-rose-500" },
    { label: "BLOGS", path: "/blog", gradient: "from-pink-400 to-rose-500" },
    { label: "FAQ", path: "/faq", gradient: "from-emerald-400 to-teal-500" }
  ];

  const socialLinks = [
    { label: "💬 Discord", url: "https://discord.com/users/928934131893686292", color: "#5865F2" },
    { label: "📱 Telegram", url: "https://t.me/darkxkid", color: "#26A5E4" },
    { label: "📧 Email", url: "mailto:drixebusiness@gmail.com", color: "#EA4335" }
  ];

  return (
    <footer
      ref={footerRef}
      className="relative z-10 overflow-hidden text-white px-6 py-16 border-t border-neutral-800 bg-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a20] to-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-[120px] opacity-15" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/20 to-teal-600/20 blur-[150px] opacity-15" />
      </div>

      <Toaster position="top-center" />

      {/* Content */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
      >
        {/* Brand */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
            Drixe Studio
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Helping creators grow since 2019. We build tools, bots, and experiences for Discord and beyond.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <ul className="space-y-2">
            {navLinks.map(({ label, path, gradient }, i) => (
              <motion.li
                key={label}
                onMouseEnter={() => setHoveredLink(label)}
                onMouseLeave={() => setHoveredLink(null)}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: i * 0.05 }
                  }
                }}
                className="relative"
              >
                <Link
                  href={path}
                  className="group relative text-sm text-gray-400 hover:text-white transition duration-300 flex items-center py-1.5"
                >
                  {hoveredLink === label && (
                    <motion.span
                      layoutId="navHover"
                      
                      style={{
                        backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-stops))`
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                      className={`absolute left-0 h-full w-[2px] rounded-full bg-gradient-to-b ${gradient}`}
                    />
                  )}
                  <span className="ml-2">{label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-lg font-bold mb-4">Connect</h2>
          <div className="flex flex-col gap-2">
            {socialLinks.map(({ label, url, color }, i) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 border"
                style={{
                  background: `${color}20`,
                  borderColor: `${color}30`
                }}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: i * 0.05 }
                  }
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: `${color}25`
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">{label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-lg font-bold mb-4">Newsletter</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full bg-[#111] border border-gray-700 text-sm px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            />
            <motion.button
              type="submit"
              disabled={submitting}
              className={`relative py-2 rounded-lg font-medium text-white transition-all ${
                submitting
                  ? "bg-purple-700"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitting ? "Submitting..." : "Subscribe Now"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Drixe Studio · All rights reserved.</p>
        <p className="mt-1 text-xs opacity-70">Crafted with ❤️ for the digital world</p>
      </div>
    </footer>
  );
};

export default Footer;
