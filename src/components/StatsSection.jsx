import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Orders Completed",
    value: 100,
    suffix: "+",
    color: "text-blurple",
  },
  {
    label: "Happy Clients",
    value: 98,
    suffix: "%",
    color: "text-green-400",
  },
  {
    label: "Rated Studio",
    value: 5,
    suffix: "⭐",
    color: "text-yellow-400",
  },
];

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative z-10 w-full py-8 sm:py-10 px-2 sm:px-6 bg-[#0c0c0c] overflow-hidden border-t border-b border-neutral-800"
    >
      {/* ✨ Animated Glow Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-blurple/20 blur-[140px] rounded-full animate-pulse opacity-20" />
        <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-blurple/10 to-transparent animate-pulse-x" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-3 sm:gap-6 px-2 sm:px-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="w-[32%] min-w-[100px] flex-1 bg-[#121212]/70 backdrop-blur-md border border-blurple/40 rounded-2xl p-4 sm:p-5 text-center shadow-lg transition-all duration-300 cursor-pointer
                       hover:scale-[1.07] hover:shadow-[0_0_20px_4px_rgba(114,137,218,0.4)] hover:ring-2 hover:ring-blurple"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className={`text-3xl sm:text-4xl font-extrabold ${stat.color}`}>
              {inView ? (
                <CountUp end={stat.value} duration={8} suffix={stat.suffix} />
              ) : (
                "0" + stat.suffix
              )}
            </h3>
            <p className="text-sm text-gray-300 mt-1 tracking-wide">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
