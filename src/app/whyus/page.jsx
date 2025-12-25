"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const principles = [
  {
    title: "Systems over surface-level work",
    desc: "We don’t just make things look good. We design structures that remain usable, scalable, and maintainable long after launch.",
  },
  {
    title: "Clarity beats complexity",
    desc: "Most projects fail because of over-engineering. We focus on what matters and remove everything that doesn’t.",
  },
  {
    title: "Built to evolve",
    desc: "Whether it’s a website or a Discord community, we build foundations that can grow without breaking.",
  },
];

const services = [
  {
    title: "Websites",
    desc: "Fast, SEO-ready, static websites built for clarity and performance. No bloated stacks, no unnecessary complexity.",
  },
  {
    title: "Discord systems",
    desc: "Structured communities with clear roles, permissions, onboarding flows, automation, and moderation.",
  },
  {
    title: "Content & social presence",
    desc: "Simple, consistent short-form video and content systems designed to support your brand, not distract from it.",
  },
];

const process = [
  {
    step: "01",
    title: "Understand the goal",
    desc: "We start by understanding what you’re building, who it’s for, and what success actually looks like.",
  },
  {
    step: "02",
    title: "Design the structure",
    desc: "Before visuals or tools, we map out architecture — pages, roles, flows, permissions, and systems.",
  },
  {
    step: "03",
    title: "Build with intent",
    desc: "Execution is clean, focused, and documented. No rushed decisions or messy setups.",
  },
  {
    step: "04",
    title: "Refine & support",
    desc: "We help you stabilize, iterate, and improve — not disappear after delivery.",
  },
];

const WhyUsPage = () => {
  return (
    <section className="bg-black text-white px-6 pt-32 pb-32 border-t border-white/10">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}
        <div className="max-w-3xl mb-24">
          <p className="text-xs uppercase tracking-wide text-white/40">
            Why Drixe Studio
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
            We build digital systems<br className="hidden sm:block" />
            that actually last
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed">
            Drixe Studio is a digital systems studio focused on clarity, structure,
            and long-term usability. We work with creators, communities, and brands
            who want things built properly — not rushed.
          </p>
        </div>

        {/* PRINCIPLES */}
        <div className="mb-28">
          <h2 className="text-2xl font-medium mb-10">
            How we think
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-medium">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div className="mb-28 max-w-4xl">
          <h2 className="text-2xl font-medium mb-6">
            What we do
          </h2>
          <p className="text-white/60 mb-10">
            We don’t try to do everything. We focus on a small set of services and
            do them properly.
          </p>

          <div className="space-y-8">
            {services.map((s, i) => (
              <div key={i} className="border-l border-white/10 pl-6">
                <h3 className="text-lg font-medium">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PROCESS */}
        <div className="mb-28">
          <h2 className="text-2xl font-medium mb-10">
            How we work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {process.map((p, i) => (
              <div key={i} className="flex gap-6">
                <span className="text-sm text-white/40 font-mono">
                  {p.step}
                </span>
                <div>
                  <h3 className="text-lg font-medium">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <div className="mb-28 max-w-4xl">
          <h2 className="text-2xl font-medium mb-6">
            Who this is for (and who it isn’t)
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Drixe Studio is for people who care about structure, clarity, and
            long-term results. If you’re looking for the cheapest option or a
            rushed setup, we’re probably not the right fit.
            <br /><br />
            If you want something built cleanly, with thought behind every
            decision — we’ll work well together.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium">
              Ready to build something solid?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Explore our plans or reach out for a recommendation.
            </p>
          </div>
          <Link
            href="/plans"
            className="inline-flex rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white hover:border-white/40 transition"
          >
            View plans & pricing
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyUsPage;
