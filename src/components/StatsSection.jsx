'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaBriefcase, FaSmile, FaStar, FaDiscord } from "react-icons/fa";

const AnimatedNumber = ({ value, suffix, decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        scale: [1, 1.2, 1],
        color: ["#fff", "#a78bfa", "#fff"],
        transition: { duration: 0.6 }
      });
    };
    animate();
    
    let start = 0;
    const end = value;
    const duration = 2500;
    const startTime = Date.now();

    const counter = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = progress * end;
      setDisplayValue(currentValue);
      if (progress === 1) clearInterval(counter);
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.span 
      className="text-white text-4xl md:text-5xl font-bold mb-2"
      animate={controls}
    >
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue)}{suffix}
    </motion.span>
  );
};

const StatCard = ({ icon, label, value, suffix, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="relative bg-gradient-to-br from-[#1a1a2a] to-[#12101f] rounded-2xl border border-white/10 p-8 text-center shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: 45 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            delay: index * 0.15,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 100,
            damping: 10
          }
        }
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-20"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-violet-600 blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-indigo-600 blur-[80px]"></div>
      </motion.div>

      <div className="flex justify-center mb-6">
        <motion.div
          className="p-4 rounded-full bg-gradient-to-br from-violet-600/30 to-indigo-500/30 backdrop-blur-sm"
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          {icon}
        </motion.div>
      </div>
      
      {isInView && <AnimatedNumber value={value} suffix={suffix} decimals={suffix === "%" ? 1 : 0} />}
      
      <motion.h3 
        className="text-white/80 text-lg md:text-xl font-medium mt-4"
        whileHover={{ color: "#ffffff" }}
      >
        {label}
      </motion.h3>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 1.5 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <FaBriefcase className="text-white text-3xl" />,
      label: "Projects Delivered",
      value: 100,
      suffix: "+",
    },
    {
      icon: <FaSmile className="text-white text-3xl" />,
      label: "Client Satisfaction",
      value: 98.7,
      suffix: "%",
    },
    {
      icon: <FaStar className="text-yellow-400 text-3xl" />,
      label: "Rated Studio",
      value: 5,
      suffix: "⭐",
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(124,58,237,0.1)_0%,transparent_70%)] animate-spin-slow"></div>
          <div className="absolute -top-1/3 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] animate-spin-slow-reverse"></div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-widest text-violet-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Quantified Excellence
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
              Our Impact in Motion
            </span>
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-white/70 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Numbers that tell our story of innovation and success
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} index={index} {...stat} />
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://discord.gg/E22K7T4p"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-medium px-8 py-4 rounded-full shadow-xl hover:shadow-violet-500/40 transition-all duration-300 group"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="mr-3 group-hover:rotate-12 transition-transform duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FaDiscord className="text-xl" />
            </motion.div>
            <span>Join Our Creative Community</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;