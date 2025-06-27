import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaDiscord } from "react-icons/fa";

const faqs = [
  {
    question: "❓ What is Drixe Studio?",
    answer:
      "Drixe Studio is your go-to service for all premium Discord server orders, offering UI design, bot setup, security, and custom experience.",
  },
  {
    question: "📦 What services do you offer?",
    answer:
      "From server setups and bot automation to UI/UX design, moderation tools, and full branding – we offer complete customization.",
  },
  {
    question: "💸 What payment methods are accepted?",
    answer: "We accept PayPal, UPI, and crypto. All payments are secure and processed manually.",
  },
  {
    question: "⏱️ How long does an order take?",
    answer:
      "Depending on complexity, orders take 1–3 days. You’ll be updated live throughout via Discord.",
  },
  {
    question: "📞 Can I talk to someone before ordering?",
    answer: "Of course! Ping us on Discord and we'll reply within minutes.",
  },
  {
    question: "🔒 Is my server data safe?",
    answer: "Absolutely. We never store or reuse data — everything is customized securely for your needs.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 glow-text text-blurple">
          ✨ Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a]/50 border border-blurple/30 rounded-2xl shadow-lg backdrop-blur-md p-5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold focus:outline-none"
              >
                <span>{faq.question}</span>
                <motion.span
                  initial={false}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    className="mt-3 text-sm text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-blurple/20 to-transparent border border-blurple/40 rounded-2xl p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Still have a question?</h3>
          <p className="text-gray-300 mb-4">Hit us up on Discord and we’ll answer you right away.</p>
<div className="relative group inline-block">
  <a
    href="https://discord.com/users/928934131893686292"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5865F2] text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-blurple/50 ring-1 ring-blurple"
  >
    <FaDiscord className="text-lg" />
    <span className="font-bold">Ask drixeeee</span>
  </a>

  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
    <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
      💬 Click to message drixeeee on Discord!
    </div>
  </div>
</div>




        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
