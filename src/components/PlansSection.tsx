"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PlansSection = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      description: "A solid foundation for individuals and early-stage teams.",
      features: [
        "Marketing or portfolio website",
        "Basic Discord server structure",
        "Roles, permissions & clean layout",
        "Launch-ready delivery",
      ],
      buttonText: "Get started",
      isPopular: false,
    },
    {
      name: "Core",
      description: "Built for growing creators and brands.",
      features: [
        "Custom website or landing system",
        "Advanced Discord architecture",
        "Automation & moderation setup",
        "UX, performance & clarity focus",
      ],
      buttonText: "Start a project",
      isPopular: true,
    },
    {
      name: "Advanced",
      description: "For serious products and large communities.",
      features: [
        "Scalable website architecture",
        "Full Discord ecosystem",
        "Custom workflows & integrations",
        "Ongoing iteration & support",
      ],
      buttonText: "Talk to us",
      isPopular: false,
    },
  ];

  return (
    <section
      id="plans"
      className="relative min-h-screen border-t border-white/20 bg-black py-24 font-mono text-zinc-200 sm:py-32"
    >
      {/* --- RETRO BACKGROUND GRID --- */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
             linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400">
            Clear engagement tiers for websites, Discord communities, and digital
            systems — built with focus and intent.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-0 border-l border-t border-white/20 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative flex flex-col border-b border-r border-white/20 bg-black p-8 transition-colors duration-300 ${
                plan.isPopular ? "bg-white/5" : ""
              } hover:bg-zinc-900`}
            >
              
              {/* "Most Chosen" Badge - Styled Retro */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 border-b border-l border-white/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  Most Chosen
                </div>
              )}

              {/* Plan Title */}
              <h3 className="mb-2 text-xl font-bold uppercase tracking-wide text-white">
                {plan.name}
              </h3>
              
              {/* Description */}
              <p className="mb-8 min-h-[40px] text-sm text-zinc-500">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="mb-8 h-px w-full bg-white/20" />

              {/* Features List */}
              <ul className="mb-10 flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    {/* Retro Bullet Point */}
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-white" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => router.push("/contact")}
                className={`relative w-full border border-white px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 
                ${
                  plan.isPopular 
                    ? "bg-white text-black hover:bg-black hover:text-white" 
                    : "bg-transparent text-white hover:bg-white hover:text-black"
                }`}
              >
                {plan.buttonText}
              </button>

              {/* Hover Decorative Corner */}
              <div className={`absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white opacity-0 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : ''}`} />

            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500">
            Not sure which tier fits your needs?
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="group mt-4 inline-flex items-center gap-2 border-b border-white pb-0.5 text-sm font-bold uppercase tracking-wider text-white hover:text-zinc-300 hover:border-zinc-300"
          >
            Get a recommendation
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;