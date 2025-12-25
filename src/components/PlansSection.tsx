"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PlansSection = () => {
  const router = useRouter();

  return (
    <section
      id="plans"
      className="border-t border-white/10 bg-black px-6 py-24 sm:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            id="pricing-heading"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base text-white/60 sm:text-lg">
            Clear engagement tiers for websites, Discord communities, and digital
            systems — built with focus and intent.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="text-lg font-medium text-white">Starter</h3>
            <p className="mt-2 text-sm text-white/60">
              A solid foundation for individuals and early-stage teams.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>• Marketing or portfolio website</li>
              <li>• Basic Discord server structure</li>
              <li>• Roles, permissions & clean layout</li>
              <li>• Launch-ready delivery</li>
            </ul>

            <button
              onClick={() => router.push("/contact")}
              className="mt-8 w-full rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              Get started
            </button>
          </motion.div>

          {/* Core */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/20 bg-white/10 p-8"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-4 py-1 text-xs font-medium text-white">
              Most chosen
            </span>

            <h3 className="text-lg font-medium text-white">Core</h3>
            <p className="mt-2 text-sm text-white/60">
              Built for growing creators and brands.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>• Custom website or landing system</li>
              <li>• Advanced Discord architecture</li>
              <li>• Automation & moderation setup</li>
              <li>• UX, performance & clarity focus</li>
            </ul>

            <button
              onClick={() => router.push("/contact")}
              className="mt-8 w-full rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Start a project
            </button>
          </motion.div>

          {/* Advanced */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="text-lg font-medium text-white">Advanced</h3>
            <p className="mt-2 text-sm text-white/60">
              For serious products and large communities.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>• Scalable website architecture</li>
              <li>• Full Discord ecosystem</li>
              <li>• Custom workflows & integrations</li>
              <li>• Ongoing iteration & support</li>
            </ul>

            <button
              onClick={() => router.push("/contact")}
              className="mt-8 w-full rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              Talk to us
            </button>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-white/50">
            Not sure which tier fits your needs?
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="mt-4 inline-flex items-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:border-white/40"
          >
            Get a recommendation
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
