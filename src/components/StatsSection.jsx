"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "40+",
    label: "Websites delivered",
  },
  {
    value: "100+",
    label: "Discord communities built",
  },
  {
    value: "300+",
    label: "Short-form videos edited",
  },
  {
    value: "95%",
    label: "Client retention",
  },
];

const StatsSection = () => {
  return (
    <section
      className="border-t border-white/10 bg-black px-6 py-20 sm:py-28"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <h2
            id="stats-heading"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-white"
          >
            Proven, consistent delivery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">
            A snapshot of the work we’ve delivered across websites, communities,
            and content.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <a
            href="/plans"
            className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition"
          >
            View services & pricing →
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
