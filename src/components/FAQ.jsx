'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "What makes your service unique?",
      answer: "We combine premium design with functional automation to create living Discord ecosystems, not just pretty interfaces.",
      emoji: "✨",
      gradient: "from-violet-600/20 to-indigo-600/20"
    },
    {
      question: "How does the process work?",
      answer: "After purchase, we schedule a consultation call to understand your needs before designing your perfect server.",
      emoji: "⚙️",
      gradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      question: "Can I request custom features?",
      answer: "Absolutely! Our Pro and Enterprise plans include fully customized solutions tailored to your community.",
      emoji: "🔧", 
      gradient: "from-emerald-600/20 to-teal-600/20"
    },
    {
      question: "Do you offer ongoing support?",
      answer: "All plans include 30 days of support, with extended maintenance options available.",
      emoji: "🛡️",
      gradient: "from-amber-600/20 to-orange-600/20"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden bg-[#0f0f1c] border-t border-neutral-800">
      {/* Static background (no animations) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0f0c24] to-[#0a0618]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/10" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-xs sm:text-sm font-mono text-violet-400 mb-2 block">
              NEED ANSWERS?
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-300">
                Frequently
              </span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Asked</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full" />
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                Questions
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base sm:text-lg mt-6 max-w-3xl mx-auto"
          >
            Quick answers to common questions about our services and process.
          </motion.p>
        </div>

        {/* FAQ Items - Optimized accordion */}
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden ${openIndex === index ? 'shadow-lg' : 'shadow-md'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-gradient-to-br ${faq.gradient}`}>
                      {faq.emoji}
                    </div>
                    <h3 className="font-semibold text-gray-100">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-gray-400"
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 25 },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 25 },
                          opacity: { duration: 0.15 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-300 text-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-700 hover:to-violet-700 transition-colors"
          >
            <FaQuestionCircle className="text-xl" />
            <span>View Full FAQ</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;