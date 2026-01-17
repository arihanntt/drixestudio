"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What type of clients do you usually work with?",
      answer:
        "We typically work with creators, startups, and online brands that need a clear, scalable digital presence. Projects range from focused marketing websites to structured Discord communities for growing audiences."
    },
    {
      question: "Do you build websites and Discord servers separately?",
      answer:
        "Yes. Websites and Discord systems can be built independently. Some clients choose one, while others combine both depending on their goals and audience."
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Most website or Discord projects take between 1–3 weeks, depending on scope and complexity. Timelines are confirmed before work begins."
    },
    {
      question: "Will I own the website or server after delivery?",
      answer:
        "Yes. Once the project is delivered and finalized, full ownership is transferred to you. You control hosting, access, and future changes."
    },
    {
      question: "What happens after the project is delivered?",
      answer:
        "All projects include a short post-delivery support period for fixes and adjustments. Ongoing maintenance or iteration can be arranged separately if needed."
    }
  ];

  return (
    <section
      className="relative border-t border-zinc-900 bg-[#0a0a0a] px-6 py-24 sm:py-32 selection:bg-zinc-800 selection:text-white"
      aria-labelledby="faq-heading"
    >
      {/* PERFORMANCE FIX: 
         We removed the noiseFilter SVG here. 
         Dynamic height + SVG Filters = Massive Lag.
      */}

      <p className="sr-only">
        Frequently asked questions about website development, Discord server setup,
        pricing, timelines, and post-launch support.
      </p>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header Block */}
        <div className="mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            General Inquiries
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-white leading-[1.1] tracking-tight"
          >
            Common inquiries <br className="hidden md:block" /> & logistics.
          </h2>
          <p className="mt-8 text-base text-zinc-500 font-light max-w-xl leading-relaxed">
            Clear answers to common questions about our delivery process and ownership.
          </p>
        </div>

        {/* FAQ List - Optimized for zero lag */}
        <div className="border-t border-zinc-900">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-zinc-900 group">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-8 text-left transition-colors duration-300 outline-none"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-start gap-6">
                  {/* Numbering */}
                  <span className="font-mono text-[9px] text-zinc-700 mt-1.5 transition-colors duration-300 group-hover:text-zinc-500">
                    0{index + 1}
                  </span>
                  <span className={`text-lg md:text-xl font-medium tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-rose-400' : 'text-white group-hover:text-zinc-300'}`}>
                    {faq.question}
                  </span>
                </div>
                
                {/* Plus/Minus Icon */}
                <div className="text-zinc-700 transition-colors duration-300 group-hover:text-white ml-4 hidden sm:block">
                  <span className="text-xl font-light font-mono leading-none">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
              </button>

              {/* Light Animation Block */}
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-[42px] md:pl-[54px] max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-zinc-500 font-light italic font-serif tracking-wide">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-8">
           <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold">
             Still searching for details?
           </p>
           <Link
             href="/contact"
             className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.35em] text-zinc-400 hover:text-white transition-all duration-300"
           >
             <span className="border-b border-zinc-800 group-hover:border-white pb-1 transition-all">
               Start a conversation
             </span>
             <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
           </Link>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </section>
  );
};

export default FAQSection;