'use client';

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const WhyUs = () => {
  const router = useRouter();

  const features = [
    {
      title: "Modular Design",
      description: "Customizable components that grow with your community",
      icon: "🧩"
    },
    {
      title: "AI Integration",
      description: "Smart bots that learn and adapt to your server's needs",
      icon: "🤖"
    },
    {
      title: "24/7 Support",
      description: "Dedicated experts always available to assist you",
      icon: "🛡️"
    },
    {
      title: "Premium Assets",
      description: "Exclusive emojis, banners, and custom artwork",
      icon: "🎨"
    }
  ];

  return (
    <section 
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 overflow-hidden min-h-[80vh] flex items-center justify-center border-t border-neutral-800"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0f0c24] to-[#0a0618]" />
        <div className="absolute -left-[200px] -top-[200px] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] opacity-20" />
        <div className="absolute -right-[200px] -bottom-[200px] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px] opacity-20" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-xs sm:text-sm font-mono text-violet-400 mb-2 block">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-300">
                Style +
              </span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Systems +</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full" />
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                Support
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base sm:text-lg mt-4 sm:mt-6 max-w-3xl mx-auto"
          >
            We architect <span className="text-violet-300">next-generation</span> Discord ecosystems that 
            drive engagement, foster communities, and elevate brands.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-black/40 to-gray-900/30 border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => router.push("/whyus")}
            className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base sm:text-lg overflow-hidden group hover:shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            <span className="relative z-10">Discover Why We're Different</span>
            <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;