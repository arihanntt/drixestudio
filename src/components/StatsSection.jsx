import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaBriefcase, FaSmile, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: <FaBriefcase className="text-white text-xl mb-1" />,
    label: "Orders Completed",
    value: 100,
    suffix: "+",
  },
  {
    icon: <FaSmile className="text-white text-xl mb-1" />,
    label: "Happy Clients",
    value: 98,
    suffix: "%",
  },
  {
    icon: <FaStar className="text-yellow-400 text-xl mb-1" />,
    label: "Rated Studio",
    value: 5,
    suffix: "⭐",
  },
];

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative z-10 w-full py-10 px-6 bg-[#0f0f0f] text-white border-t border-neutral-800 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <div className="absolute -top-32 left-1/3 w-[700px] h-[700px] bg-violet-700/25 blur-[160px] rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[600px] h-[600px] bg-indigo-400/20 blur-[140px] rounded-full" />
      </div>

      {/* Section Header */}
      <div className="text-center mb-8">
        <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">
          Statistics
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
          Our studio speaks through numbers.
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-[#1a1a2a]/50 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center shadow-md hover:shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {stat.icon}
            <div className="text-white text-2xl font-bold mb-1">
              {inView ? (
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              ) : (
                "0" + stat.suffix
              )}
            </div>
            <p className="text-[13px] text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <p className="text-white/80 text-sm mb-2">
          Ready to build something awesome?
        </p>
        <a
          href="https://discord.gg/E22K7T4p"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md hover:scale-105 transition"
        >
          🚀 Join Our Discord
        </a>
      </div>
    </section>
  );
};

export default StatsSection;
