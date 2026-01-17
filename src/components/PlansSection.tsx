"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PlansSection = () => {
  const router = useRouter();

  const plans = [
    {
      name: "Foundation",
      description: "For individuals or small teams launching their first serious presence.",
      features: [
        "Single marketing or portfolio site",
        "OR structured Discord server",
        "Roles, permissions & clean layout",
        "Launch-ready delivery",
      ],
      buttonText: "Get started",
      isPopular: false,
    },
    {
      name: "Growth",
      description: "Built for growing creators and brands looking to scale conversion.",
      subText: "Chosen by most creators & brands",
      features: [
        "Custom site or landing system",
        "OR advanced Discord architecture",
        "Automation & moderation setup",
        "UX, performance & clarity focus",
      ],
      buttonText: "Start a project",
      isPopular: true,
    },
    {
      name: "Scale",
      description: "For serious products and large-scale community ecosystems.",
      features: [
        "Scalable website architecture",
        "Full Discord ecosystem design",
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
      className="relative border-t border-zinc-900 bg-[#0a0a0a] px-6 py-24 sm:py-32 selection:bg-zinc-800"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-24 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            Pricing & Engagement
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif italic text-white leading-tight">
            Simple, transparent <br className="hidden md:block" /> engagement tiers.
          </h2>
          <div className="mt-8 space-y-4">
            <p className="text-base sm:text-lg text-zinc-500 font-light max-w-2xl leading-relaxed">
              Clear tiers for websites, Discord communities, and digital
              systems — built with focus and intent.
            </p>
            {/* Scope Clarity Line */}
            <p className="text-sm text-zinc-600 max-w-xl italic font-serif">
              *Each plan covers either a website or a Discord system. Combined builds are scoped separately.
            </p>
          </div>
        </div>

        {/* SEO Hidden Header */}
        <h3 className="sr-only">Website and Discord development pricing plans</h3>

        {/* Pricing Layout - Editorial Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-zinc-900">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative flex flex-col pt-12 pb-16 md:pr-12 border-b border-zinc-900 md:border-b-0 group"
            >
              {/* Popular Indicator */}
              {plan.isPopular && (
                <span className="absolute top-6 left-0 text-[9px] font-bold uppercase tracking-[0.3em] text-rose-500">
                  // Recommended
                </span>
              )}

              {/* Plan Name */}
              <h3 className="text-3xl font-serif italic text-white mb-4 group-hover:text-rose-400 transition-colors duration-300">
                {plan.name}
              </h3>
              
              <div className="mb-10 min-h-[64px]">
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  {plan.description}
                </p>
                {plan.subText && (
                   <p className="text-[11px] text-zinc-600 italic mt-2">
                    {plan.subText}
                   </p>
                )}
              </div>

              {/* Feature List */}
              <ul className="flex-1 space-y-5 mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-xs text-zinc-400 uppercase tracking-widest font-medium">
                    <span className="h-px w-3 bg-zinc-800" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => router.push("/contact")}
                className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 border ${
                  plan.isPopular 
                    ? "bg-white text-black border-white hover:bg-black hover:text-white" 
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:border-white hover:text-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Recommendation */}
        <div className="mt-20 pt-12 border-t border-zinc-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">
            Not sure which tier fits your needs?
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-all"
          >
            <span className="border-b border-zinc-800 group-hover:border-white pb-1 transition-all">
              Get a recommendation
            </span>
            <span className="text-zinc-600 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </section>
  );
};

export default PlansSection;