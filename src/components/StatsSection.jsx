// components/StatsSection.jsx
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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
      className="relative bg-[#0e0e0e] py-16 px-4 border-y border-gray-800"
      ref={ref}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 w-[800px] h-[800px] -translate-x-1/2 bg-blurple blur-[120px] opacity-20 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-10 text-white">
          Why Creators Trust Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] rounded-xl border border-blurple p-6 shadow-md hover:scale-105 transition-all duration-300"
            >
              <h3 className={`text-4xl font-extrabold ${stat.color}`}>
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                ) : (
                  "0" + stat.suffix
                )}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
