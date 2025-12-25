"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const WhyUs = () => {
  const router = useRouter();

  const features = [
    {
      title: "System-first thinking",
      description:
        "We don’t just design interfaces. We build structured systems that scale cleanly over time."
    },
    {
      title: "Discord & web expertise",
      description:
        "From conversion-focused websites to organized Discord communities — everything works together."
    },
    {
      title: "Lean execution",
      description:
        "No over-engineering. No unnecessary tools. Just what your brand actually needs."
    },
    {
      title: "Direct collaboration",
      description:
        "You work directly with the builder. Clear communication, fast decisions, no middlemen."
    }
  ];

  return (
    <section
      className="border-t border-white/10 bg-black px-6 py-20 sm:py-28"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <h2
            id="why-us-heading"
            className="text-2xl sm:text-3xl font-medium tracking-tight text-white"
          >
            Designed for clarity. Built to scale.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60">
            We help creators and brands launch clean websites, structured Discord
            systems, and consistent content — without unnecessary complexity.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-base font-medium text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <button
            onClick={() => router.push("/plans")}
            className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition"
          >
            View services & pricing →
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
