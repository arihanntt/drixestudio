'use client';

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaRocket, FaUsers, FaHeart, FaLightbulb, FaChartLine } from "react-icons/fa";

const AnimatedCounter = ({ value, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // Animation duration in ms
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameRate);
  const increment = value / totalFrames;

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const currentCount = Math.min(increment * frame, value);
      setCount(currentCount);
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const StatCard = ({ icon, value, label, suffix, description, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typically the breakpoint for md in Tailwind
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  // Dynamic gradient colors based on index
  const gradients = [
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-cyan-600",
    "from-pink-500 to-rose-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600"
  ];

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br to-gray-900 from-gray-800 border border-gray-800 shadow-xl"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      whileHover={!isMobile ? {
        y: -8,
        transition: { duration: 0.3 }
      } : undefined}
    >
      {/* Animated border gradient */}
      <motion.div 
        className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          background: [
            `linear-gradient(90deg, rgba(124,58,237,0) 0%, rgba(124,58,237,0) 100%)`,
            `linear-gradient(90deg, rgba(124,58,237,0) 0%, rgba(124,58,237,1) 50%, rgba(124,58,237,0) 100%)`,
            `linear-gradient(90deg, rgba(124,58,237,0) 0%, rgba(124,58,237,0) 100%)`
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          delay: index * 0.5
        }}
      />
      
      {/* Glow effect */}
      <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${gradients[index]} blur-3xl opacity-10`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${gradients[index]} shadow-lg`}>
          {React.cloneElement(icon, { className: "text-white text-xl" })}
        </div>
        
        <div className="mb-2">
          {isInView && <AnimatedCounter value={value} suffix={suffix} decimals={suffix === "%" ? 1 : 0} />}
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{label}</h3>
        <p className="text-gray-400 text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <FaRocket />,
      value: 100,
      suffix: "%",
      label: "Anti-Raid Protection",
      description: "Keeping your server safe."
    },
    {
      icon: <FaUsers />,
      value: 100,
      suffix: "+",
      label: "Servers",
      description: "Trusting our services daily"
    },
    {
      icon: <FaHeart />,
      value: 99.9,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Reliability you can count on"
    },
    {
      icon: <FaLightbulb />,
      value: 24,
      suffix: "/7",
      label: "Support",
      description: "Always here when you need us"
    },
    {
      icon: <FaChartLine />,
      value: 5,
      suffix: "⭐",
      label: "Rating",
      description: "Delivered with excellence"
    }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-6 bg-[#0a0a10]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05)_0%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-900/20 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-900/20 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-sm uppercase tracking-widest text-purple-400 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            By The Numbers
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
              Quantifying Excellence
            </span>
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our impact in measurable terms - because results speak louder than words
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} index={index} {...stat} />
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-gray-400 mb-8 text-sm uppercase tracking-widest"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            Ready to be part of our story?
          </motion.p>
          <motion.a
            href="/plans"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group"
            whileHover={!isMobile ? { scale: 1.05 } : undefined}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Get Started</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;