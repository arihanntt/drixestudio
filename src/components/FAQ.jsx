"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);


  const faqs = [
    {
      question: "What services does Drixe Studio provide?",
      answer:
        "We design high-performance websites and structured Discord community systems for creators, brands, and online businesses. Our work focuses on clarity, scalability, and long-term usability rather than unnecessary features."
    },
    {
      question: "Do you only work with Discord communities?",
      answer:
        "No. Discord is one part of our offering. We primarily focus on modern websites, landing pages, and digital frontends, while also building Discord community systems when a project requires structured community infrastructure."
    },
    {
      question: "How does the project process work?",
      answer:
        "Every project starts with a discovery call to understand your goals. We then design, build, and deliver a solution tailored to your use case, with clear milestones and transparent communication throughout."
    },
    {
      question: "Can you customize features or workflows?",
      answer:
        "Yes. All projects are customized based on your requirements. Whether it’s a custom website layout, performance optimization, or a tailored Discord community structure, we design systems that fit your needs."
    },
    {
      question: "Do you offer support after delivery?",
      answer:
        "Yes. Every project includes a post-delivery support period. Ongoing maintenance and long-term support plans are also available if needed."
    }
  ];

  return (
    <section
      className="relative border-t border-white/10 bg-black px-6 py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2
            id="faq-heading"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
            Clear answers to common questions about our services and process.
          </p>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
          {faqs.map((faq, index) => (
            <div key={index} className="px-6">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between py-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-medium text-white sm:text-base">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/50"
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm leading-relaxed text-white/60 sm:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:border-white/40"
          >
            Have more questions? Contact us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
