'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaDiscord } from "react-icons/fa";
import Link from "next/link";

const previewFaqs = [
  {
    question: "❓ What is Drixe Studio?",
    answer:
      "Drixe Studio is your go-to service for premium Discord server orders — offering UI design, bot setup, security, and full customization.",
  },
  {
    question: "📦 What services do you offer?",
    answer:
      "We build full Discord communities: setups, bot systems, role management, UI design, branding, moderation tools, and more.",
  },
  {
    question: "💸 What payment methods are accepted?",
    answer:
      "We accept UPI, PayPal, and crypto — all payments are secure and handled directly.",
  },
  {
    question: "⏱️ How long does an order take?",
    answer:
      "Depending on complexity, 1–3 days is standard. You'll get live updates throughout via Discord.",
  },
];

const FAQPreview = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 bg-[#0f0f0f] text-white overflow-hidden border-t border-neutral-800">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/25 blur-[200px] rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/20 blur-[160px] rounded-full" />
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text">
        ✨ Frequently Asked Questions
      </h2>

      {/* FAQs */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {previewFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1a1a1a]/60 border border-blurple/30 rounded-2xl shadow-xl p-5 backdrop-blur-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-lg font-semibold"
            >
              {faq.question}
              <motion.span
                initial={false}
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="mt-3 text-sm text-gray-300"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: "top" }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-14 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blurple text-white font-semibold shadow hover:scale-105 transition-all duration-200"
        >
          <FaDiscord className="text-lg" />
          View All FAQs
        </Link>
      </div>
    </section>
  );
};

export default FAQPreview;
